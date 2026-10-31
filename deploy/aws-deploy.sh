#!/usr/bin/env bash
# Deploys ShopArtist to AWS: one Lambda behind a streaming Function URL, with S3 (durable data) and
# DynamoDB (global cap on AI actions). Safe to re-run; it updates what exists. Creates only shopartist-* resources.
#
#   deploy/aws-deploy.sh <aws-profile> <env-file with NEBIUS_API_KEY, NEBIUS_BASE_URL, NEBIUS_MODEL, QLOO_API_KEY>
#
# Optional: AWS_REGION (default us-east-1), AGENT_USE_LIMIT (default 200), LWA_VERSION (Lambda Web Adapter layer version).
set -euo pipefail
PROFILE=${1:?aws profile}; ENVFILE=${2:?env file}
REGION=${AWS_REGION:-us-east-1}; LIMIT=${AGENT_USE_LIMIT:-200}; NAME=shopartist
cd "$(dirname "$0")/.."
aws() { command aws --profile "$PROFILE" --region "$REGION" --no-cli-pager "$@"; }
ACCOUNT=$(aws sts get-caller-identity --query Account --output text)
BUCKET=$NAME-data-$ACCOUNT-$REGION; TABLE=$NAME-usage; ROLE=$NAME-lambda-role
OUT=.lambda-build; PKG=$OUT/pkg
echo "Deploying to account ending ${ACCOUNT: -4} in $REGION"

echo "1/6 Build"
rm -rf "$OUT" && mkdir -p "$PKG/server" "$OUT/deps"
./node_modules/.bin/vite build >/dev/null
cp -R dist "$PKG/dist"
npm install --prefix "$OUT/deps" @aws-sdk/client-s3 @aws-sdk/client-dynamodb --no-package-lock --no-audit --no-fund --silent
NODE_PATH="$OUT/deps/node_modules" ./node_modules/.bin/esbuild server/index.ts --bundle --platform=node --format=esm --target=node22 \
  --outfile="$PKG/server/index.mjs" --external:sharp --log-level=warning \
  --banner:js='import { createRequire as __cr } from "node:module"; const require = __cr(import.meta.url);'
npm install --prefix "$PKG" sharp --os=linux --cpu=arm64 --libc=glibc --no-package-lock --no-audit --no-fund --silent
printf '#!/bin/sh\nexec node server/index.mjs\n' > "$PKG/run.sh" && chmod +x "$PKG/run.sh"
(cd "$PKG" && zip -qr ../function.zip .)
echo "   package $(du -h "$OUT/function.zip" | cut -f1)"

echo "2/6 Storage (S3 bucket $BUCKET, DynamoDB table $TABLE)"
aws s3api head-bucket --bucket "$BUCKET" 2>/dev/null || {
  if [ "$REGION" = us-east-1 ]; then aws s3api create-bucket --bucket "$BUCKET" >/dev/null
  else aws s3api create-bucket --bucket "$BUCKET" --create-bucket-configuration LocationConstraint="$REGION" >/dev/null; fi; }
aws s3api put-public-access-block --bucket "$BUCKET" --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
aws s3api put-bucket-versioning --bucket "$BUCKET" --versioning-configuration Status=Enabled
aws s3api put-bucket-lifecycle-configuration --bucket "$BUCKET" --lifecycle-configuration '{"Rules":[{"ID":"expire-old-versions","Status":"Enabled","Filter":{"Prefix":""},"NoncurrentVersionExpiration":{"NoncurrentDays":30}}]}'
aws dynamodb describe-table --table-name "$TABLE" >/dev/null 2>&1 || {
  aws dynamodb create-table --table-name "$TABLE" --attribute-definitions AttributeName=pk,AttributeType=S --key-schema AttributeName=pk,KeyType=HASH --billing-mode PAY_PER_REQUEST >/dev/null
  aws dynamodb wait table-exists --table-name "$TABLE"; }

echo "3/6 IAM role $ROLE"
if ! aws iam get-role --role-name "$ROLE" >/dev/null 2>&1; then
  aws iam create-role --role-name "$ROLE" --assume-role-policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"lambda.amazonaws.com"},"Action":"sts:AssumeRole"}]}' >/dev/null
  aws iam attach-role-policy --role-name "$ROLE" --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
  NEW_ROLE=1
fi
aws iam put-role-policy --role-name "$ROLE" --policy-name data-access --policy-document "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":[\"s3:GetObject\",\"s3:PutObject\",\"s3:ListBucket\"],\"Resource\":[\"arn:aws:s3:::$BUCKET\",\"arn:aws:s3:::$BUCKET/*\"]},{\"Effect\":\"Allow\",\"Action\":[\"dynamodb:UpdateItem\",\"dynamodb:GetItem\"],\"Resource\":\"arn:aws:dynamodb:$REGION:$ACCOUNT:table/$TABLE\"}]}"
ROLE_ARN=$(aws iam get-role --role-name "$ROLE" --query Role.Arn --output text)
[ -n "${NEW_ROLE:-}" ] && sleep 12

echo "4/6 Upload and configure the function"
aws s3 cp "$OUT/function.zip" "s3://$BUCKET/deploy/function.zip" --only-show-errors
LAYER_BASE=arn:aws:lambda:$REGION:753240598075:layer:LambdaAdapterLayerArm64
# Listing a public layer needs a permission many users lack, so fall back to the newest version known to exist (adapter 1.1.0).
LWA=${LWA_VERSION:-$(aws lambda list-layer-versions --layer-name "$LAYER_BASE" --max-items 1 --query 'LayerVersions[0].Version' --output text 2>/dev/null || echo 30)}
LAYER=$LAYER_BASE:$LWA
# Secrets come from the env file and go straight into a private file for the CLI; they are never printed.
node -e '
const fs = require("fs");
const env = Object.fromEntries(fs.readFileSync(process.argv[1], "utf8").split("\n").filter(l => /^[A-Z_]+=/.test(l)).map(l => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1).replace(/^["\x27]|["\x27]$/g, "")]));
const keep = ["NEBIUS_API_KEY", "NEBIUS_BASE_URL", "NEBIUS_MODEL", "QLOO_API_KEY", "AI_VISION_MODEL"];
const Variables = Object.fromEntries(keep.filter(k => env[k]).map(k => [k, env[k]]));
Object.assign(Variables, { STORE_BUCKET: process.argv[2], USAGE_TABLE: process.argv[3], AGENT_USE_LIMIT: process.argv[4], PORT: "8080", AWS_LAMBDA_EXEC_WRAPPER: "/opt/bootstrap", AWS_LWA_INVOKE_MODE: "response_stream", AWS_LWA_PORT: "8080" });
for (const k of ["NEBIUS_API_KEY", "QLOO_API_KEY"]) if (!Variables[k]) { console.error("Missing " + k + " in the env file"); process.exit(1); }
fs.writeFileSync(process.argv[5], JSON.stringify({ Variables }), { mode: 0o600 });
' "$ENVFILE" "$BUCKET" "$TABLE" "$LIMIT" "$OUT/env.json"
RUNTIME=nodejs24.x
if aws lambda get-function --function-name "$NAME" >/dev/null 2>&1; then
  aws lambda update-function-code --function-name "$NAME" --s3-bucket "$BUCKET" --s3-key deploy/function.zip >/dev/null
  aws lambda wait function-updated --function-name "$NAME"
  aws lambda update-function-configuration --function-name "$NAME" --runtime $RUNTIME --handler run.sh --memory-size 1536 --timeout 900 --layers "$LAYER" --environment "file://$OUT/env.json" >/dev/null
else
  aws lambda create-function --function-name "$NAME" --runtime $RUNTIME --architectures arm64 --role "$ROLE_ARN" --handler run.sh --memory-size 1536 --timeout 900 \
    --layers "$LAYER" --environment "file://$OUT/env.json" --code S3Bucket="$BUCKET",S3Key=deploy/function.zip >/dev/null
fi
aws lambda wait function-active-v2 --function-name "$NAME"
aws lambda wait function-updated-v2 --function-name "$NAME"
rm -f "$OUT/env.json"
aws logs create-log-group --log-group-name "/aws/lambda/$NAME" 2>/dev/null || true
aws logs put-retention-policy --log-group-name "/aws/lambda/$NAME" --retention-in-days 14

echo "5/6 Public Function URL (streaming)"
if aws lambda get-function-url-config --function-name "$NAME" >/dev/null 2>&1; then
  aws lambda update-function-url-config --function-name "$NAME" --auth-type NONE --invoke-mode RESPONSE_STREAM >/dev/null
else
  aws lambda create-function-url-config --function-name "$NAME" --auth-type NONE --invoke-mode RESPONSE_STREAM >/dev/null
fi
aws lambda add-permission --function-name "$NAME" --statement-id FunctionURLAllowPublicAccess --action lambda:InvokeFunctionUrl --principal '*' --function-url-auth-type NONE >/dev/null 2>&1 || true
aws lambda add-permission --function-name "$NAME" --statement-id FunctionURLInvokeAllowPublic --action lambda:InvokeFunction --principal '*' --invoked-via-function-url >/dev/null 2>&1 || true

echo "6/6 Concurrency cap"
aws lambda put-function-concurrency --function-name "$NAME" --reserved-concurrent-executions 5 >/dev/null 2>&1 \
  && echo "   reserved concurrency 5" || echo "   skipped (account concurrency limit too low); the AI action cap still bounds usage"

echo
echo "URL: $(aws lambda get-function-url-config --function-name "$NAME" --query FunctionUrl --output text)"
