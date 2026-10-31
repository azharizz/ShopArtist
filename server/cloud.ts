import type express from "express";
import type { DatabaseSync } from "node:sqlite";

/**
 * Lambda keeps nothing between invocations, so in the cloud the app still runs on an in-memory SQLite and this
 * module makes it durable: a user's rows are loaded from S3 before their request and any change is written back
 * before the response ends. Locally (no STORE_BUCKET) none of this runs.
 */
export interface Blobs {
  get(key: string): Promise<string | undefined>;
  put(key: string, body: string): Promise<void>;
  list(prefix: string): Promise<string[]>;
}

export async function s3Blobs(bucket: string): Promise<Blobs> {
  // @ts-ignore the SDK is bundled into the Lambda package, not installed in the repo
  const { S3Client, GetObjectCommand, PutObjectCommand, ListObjectsV2Command } = await import("@aws-sdk/client-s3");
  const s3 = new S3Client({});
  return {
    async get(Key) {
      try { return await (await s3.send(new GetObjectCommand({ Bucket: bucket, Key }))).Body!.transformToString(); }
      catch (error) { if ((error as { name?: string }).name === "NoSuchKey") return undefined; throw error; }
    },
    async put(Key, Body) { await s3.send(new PutObjectCommand({ Bucket: bucket, Key, Body, ContentType: "application/json" })); },
    async list(Prefix) {
      const keys: string[] = [];
      let token: string | undefined;
      do {
        const page = await s3.send(new ListObjectsV2Command({ Bucket: bucket, Prefix, ContinuationToken: token }));
        keys.push(...(page.Contents ?? []).map((object: { Key: string }) => object.Key));
        token = page.NextContinuationToken;
      } while (token);
      return keys;
    },
  };
}

type Studies = Map<string, { owner: string }>;

export function cloudStore(app: express.Express, db: DatabaseSync, blobs: Blobs, ownerOf: (req: express.Request) => string | undefined, studies: () => Studies) {
  async function hydrate(owner: string, req: express.Request, seen: Map<string, string>) {
    const read = async (key: string) => { const body = await blobs.get(key); if (body !== undefined) seen.set(key, body); return body; };
    const sandbox = await read(`sandboxes/${owner}.json`);
    if (!sandbox) return; // unknown cookie: the app starts a fresh session
    const { state, updated_at } = JSON.parse(sandbox) as { state: string; updated_at: string };
    db.prepare("INSERT OR REPLACE INTO sandboxes VALUES (?, ?, ?)").run(owner, state, updated_at);
    const assets = await read(`assets/${owner}.json`);
    for (const row of assets ? JSON.parse(assets) as { id: string; asset: string; created_at: string }[] : [])
      db.prepare("INSERT OR REPLACE INTO custom_assets (owner, id, asset, created_at) VALUES (?, ?, ?, ?)").run(owner, row.id, row.asset, row.created_at);
    if (req.path.startsWith("/api/projects"))
      for (const body of await Promise.all((await blobs.list(`projects/${owner}/`)).map(read))) {
        if (!body) continue;
        const project = JSON.parse(body) as { id: string; state: string; updated_at: string };
        db.prepare("INSERT OR REPLACE INTO projects VALUES (?, ?, ?, ?)").run(owner, project.id, project.state, project.updated_at);
      }
    if (req.method !== "GET") {
      const saved = await read(`studies/${owner}.json`);
      for (const [key, record] of saved ? JSON.parse(saved) as [string, { owner: string }][] : []) studies().set(key, record);
    }
  }

  async function flush(owner: string, seen: Map<string, string>) {
    try {
      const writes: Promise<void>[] = [];
      const put = (key: string, body: string) => { if (seen.get(key) !== body) writes.push(blobs.put(key, body)); };
      const sandbox = db.prepare("SELECT state, updated_at FROM sandboxes WHERE id = ?").get(owner);
      if (sandbox) put(`sandboxes/${owner}.json`, JSON.stringify(sandbox));
      const assets = db.prepare("SELECT id, asset, created_at FROM custom_assets WHERE owner = ? ORDER BY created_at, id").all(owner);
      if (assets.length || seen.has(`assets/${owner}.json`)) put(`assets/${owner}.json`, JSON.stringify(assets));
      for (const project of db.prepare("SELECT id, state, updated_at FROM projects WHERE owner = ?").all(owner) as { id: string }[])
        put(`projects/${owner}/${project.id}.json`, JSON.stringify(project));
      const mine = [...studies()].filter(([, record]) => record.owner === owner);
      if (mine.length || seen.has(`studies/${owner}.json`)) put(`studies/${owner}.json`, JSON.stringify(mine));
      await Promise.all(writes);
    } finally {
      db.prepare("DELETE FROM sandboxes WHERE id = ?").run(owner);
      db.prepare("DELETE FROM custom_assets WHERE owner = ?").run(owner);
      db.prepare("DELETE FROM projects WHERE owner = ?").run(owner);
      for (const [key, record] of studies()) if (record.owner === owner) studies().delete(key);
    }
  }

  app.use(async (req, res, next) => {
    if (!req.path.startsWith("/api/")) return next();
    try {
      const cookie = req.headers.cookie?.match(/(?:^|;\s*)shopartist=([a-f0-9-]{36})(?:;|$)/)?.[1];
      const seen = new Map<string, string>();
      if (cookie) await hydrate(cookie, req, seen);
      const end = res.end.bind(res) as (...args: unknown[]) => express.Response;
      let ending = false;
      // Writes must finish before the response does: Lambda may freeze the instance once the response is complete.
      res.end = ((...args: unknown[]) => {
        if (ending) return end(...args);
        ending = true;
        const owner = ownerOf(req) ?? cookie;
        (owner ? flush(owner, seen) : Promise.resolve()).catch(error => console.error("Saving to S3 failed:", error)).then(() => end(...args));
        return res;
      }) as typeof res.end;
      next();
    } catch (error) { next(error); }
  });
}

/** A global cap on AI actions (Nebius cannot limit per key). Counts user-triggered actions, not agent steps. Unlimited without a table. */
export async function agentUseLimit(table: string | undefined, limit: number): Promise<express.RequestHandler> {
  if (!table) return (_req, _res, next) => next();
  // @ts-ignore the SDK is bundled into the Lambda package, not installed in the repo
  const { DynamoDBClient, UpdateItemCommand } = await import("@aws-sdk/client-dynamodb");
  const dynamo = new DynamoDBClient({});
  return async (_req, res, next) => {
    try {
      await dynamo.send(new UpdateItemCommand({
        TableName: table, Key: { pk: { S: "agent-uses" } }, UpdateExpression: "ADD used :one",
        ConditionExpression: "attribute_not_exists(used) OR used < :limit", ExpressionAttributeValues: { ":one": { N: "1" }, ":limit": { N: String(limit) } },
      }));
      next();
    } catch (error) {
      if ((error as { name?: string }).name === "ConditionalCheckFailedException")
        res.status(429).json({ error: "This demo has reached its limit of AI actions. Please try again later." });
      else next(error);
    }
  };
}
