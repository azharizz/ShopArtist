#!/usr/bin/env bash
# Removes everything aws-deploy.sh created (shopartist-* only). Deletes the bucket's data permanently.
#   deploy/aws-teardown.sh <aws-profile>
set -uo pipefail
PROFILE=${1:?aws profile}; REGION=${AWS_REGION:-us-east-1}; NAME=shopartist
aws() { command aws --profile "$PROFILE" --region "$REGION" --no-cli-pager "$@"; }
ACCOUNT=$(aws sts get-caller-identity --query Account --output text)
BUCKET=$NAME-data-$ACCOUNT-$REGION
aws lambda delete-function-url-config --function-name $NAME 2>/dev/null
aws lambda delete-function --function-name $NAME 2>/dev/null
aws logs delete-log-group --log-group-name /aws/lambda/$NAME 2>/dev/null
aws dynamodb delete-table --table-name $NAME-usage >/dev/null 2>&1
aws iam delete-role-policy --role-name $NAME-lambda-role --policy-name data-access 2>/dev/null
aws iam detach-role-policy --role-name $NAME-lambda-role --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole 2>/dev/null
aws iam delete-role --role-name $NAME-lambda-role 2>/dev/null
# The bucket is versioned, so every version and delete marker has to go before the bucket can.
aws s3api list-object-versions --bucket "$BUCKET" --output json --query '{Objects: [Versions, DeleteMarkers][][].{Key: Key, VersionId: VersionId}}' 2>/dev/null > /tmp/shopartist-versions.json
[ -s /tmp/shopartist-versions.json ] && aws s3api delete-objects --bucket "$BUCKET" --delete "file:///tmp/shopartist-versions.json" >/dev/null 2>&1
rm -f /tmp/shopartist-versions.json
aws s3api delete-bucket --bucket "$BUCKET" 2>/dev/null
echo "Removed shopartist-* resources (check the AWS console if any step above printed an error)."
