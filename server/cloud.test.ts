import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import type { AddressInfo } from "node:net";
import { test } from "node:test";
import { DatabaseSync } from "node:sqlite";
import express from "express";
import { agentUseLimit, cloudStore, type Blobs } from "./cloud.js";

test("a user's rows survive between requests through the blob store and are cleared from memory", async () => {
  const objects = new Map<string, string>();
  let puts = 0;
  const blobs: Blobs = {
    async get(key) { return objects.get(key); },
    async put(key, body) { puts++; objects.set(key, body); },
    async list(prefix) { return [...objects.keys()].filter(key => key.startsWith(prefix)); },
  };
  const db = new DatabaseSync(":memory:");
  db.exec("CREATE TABLE sandboxes (id TEXT PRIMARY KEY, state TEXT NOT NULL, updated_at TEXT NOT NULL); CREATE TABLE projects (owner TEXT NOT NULL, id TEXT NOT NULL, state TEXT NOT NULL, updated_at TEXT NOT NULL, PRIMARY KEY(owner, id)); CREATE TABLE custom_assets (owner TEXT NOT NULL, id TEXT NOT NULL, asset TEXT NOT NULL, created_at TEXT NOT NULL, PRIMARY KEY(owner, id))");
  const studies = new Map<string, { owner: string }>();
  const owners = new WeakMap<express.Request, string>();
  const app = express();
  cloudStore(app, db, blobs, req => owners.get(req), () => studies);
  app.use((req, res, next) => { // stands in for the app's own session middleware
    const cookie = req.headers.cookie?.match(/shopartist=([a-f0-9-]{36})/)?.[1];
    const known = cookie && db.prepare("SELECT 1 FROM sandboxes WHERE id = ?").get(cookie);
    const id = known ? cookie! : randomUUID();
    if (!known) { db.prepare("INSERT INTO sandboxes VALUES (?, '0', 't')").run(id); res.setHeader("set-cookie", `shopartist=${id}`); }
    owners.set(req, id);
    next();
  });
  app.post("/api/inc", (req, res) => {
    const id = owners.get(req)!;
    const next = Number((db.prepare("SELECT state FROM sandboxes WHERE id = ?").get(id) as { state: string }).state) + 1;
    db.prepare("UPDATE sandboxes SET state = ?, updated_at = 't' WHERE id = ?").run(String(next), id);
    db.prepare("INSERT OR REPLACE INTO projects VALUES (?, 'p1', ?, 't')").run(id, String(next));
    studies.set(`study-${id}`, { owner: id });
    res.json({ next });
  });
  app.get("/api/peek", (req, res) => res.json({ state: (db.prepare("SELECT state FROM sandboxes WHERE id = ?").get(owners.get(req)!) as { state: string }).state }));
  const server = app.listen(0, "127.0.0.1");
  await new Promise(resolve => server.once("listening", resolve));
  const base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  try {
    const first = await fetch(`${base}/api/inc`, { method: "POST" });
    const cookie = first.headers.get("set-cookie")!.split(";")[0];
    assert.equal((await first.json() as { next: number }).next, 1);
    assert.equal((db.prepare("SELECT COUNT(*) AS c FROM sandboxes").get() as { c: number }).c, 0, "rows are cleared after the request");
    assert.equal(studies.size, 0);
    const second = await fetch(`${base}/api/inc`, { method: "POST", headers: { cookie } });
    assert.equal((await second.json() as { next: number }).next, 2, "the second request sees the first one's write");
    const writes = puts;
    assert.equal((await (await fetch(`${base}/api/peek`, { headers: { cookie } })).json() as { state: string }).state, "2");
    assert.equal(puts, writes, "a read-only request writes nothing");
    assert.ok([...objects.keys()].some(key => key.startsWith("projects/") && key.endsWith("/p1.json")));
    assert.ok([...objects.keys()].some(key => key.startsWith("studies/")));
  } finally { server.close(); }
});

test("without a usage table the agent limit lets everything through", async () => {
  let passed = false;
  (await agentUseLimit(undefined, 200))({} as express.Request, {} as express.Response, () => { passed = true; });
  assert.ok(passed);
});
