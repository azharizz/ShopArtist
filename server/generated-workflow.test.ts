import assert from "node:assert/strict";
import { test } from "node:test";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { DatabaseSync } from "node:sqlite";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import type { AssetDefinition } from "../shared/assets/types.js";
import type { StoreState } from "../shared/types.js";

test("generated assets stay owner-scoped and survive server restart and saved room reload", { timeout: 30000 }, async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "shopartist-assets-"));
  let server: ReturnType<typeof spawn> | undefined;
  let exited: Promise<unknown> | undefined;
  async function start() {
    server = spawn(process.execPath, ["--import", "tsx", "server/index.ts"], { env: { ...process.env, HOST: "127.0.0.1", PORT: "0", DATA_DIR: directory }, stdio: ["ignore", "pipe", "pipe"] });
    exited = once(server, "exit");
    return new Promise<string>((resolve, reject) => {
      let output = "";
      server!.stdout!.on("data", chunk => { output += chunk; const match = output.match(/ready on port (\d+)/); if (match) resolve(`http://127.0.0.1:${match[1]}/api`); });
      server!.once("error", reject);
      server!.once("exit", () => reject(new Error("Server exited before startup")));
    });
  }
  async function stop() { if (server) { server.kill("SIGTERM"); await exited; server = undefined; } }
  try {
    let base = await start();
    const initialResponse = await fetch(`${base}/state`);
    const cookie = initialResponse.headers.get("set-cookie")!.split(";")[0];
    const owner = cookie.split("=")[1];
    const state: StoreState = (await initialResponse.json()).state;
    const id = "generated-00000000-0000-4000-8000-000000000001";
    const asset: AssetDefinition = { id, label: "Test display", description: "A small display", function: "Display objects", moodTags: ["cozy"], width: 1, depth: 1, heightApprox: 1, coloring: "Fixed", visualReference: `/asset-catalog.html#${id}`, implementation: "shared/generated-assets.ts", geometry: [{ shape: "box", width: 1, depth: 1, height: 1, x: 0, y: 0.5, z: 0, color: "#abcdef" }] };
    const db = new DatabaseSync(path.join(directory, "shopartist.sqlite"));
    db.prepare("INSERT INTO custom_assets VALUES (?, ?, ?, ?)").run(owner, id, JSON.stringify(asset), new Date().toISOString()); db.close();
    const get = async (route: string) => fetch(base + route, { headers: { Cookie: cookie } });
    assert.ok((await (await get("/assets")).json()).some((item: AssetDefinition) => item.id === id));
    const plan = state.plans.find(p => p.id === state.currentId)!;
    const room = structuredClone(plan.room);
    room.fixtures.push({ id: "custom-test", kind: id as `generated-${string}`, label: asset.label, x: 0, z: 0, rotation: 0, asset: { ...asset, width: 0.01 } });
    const body = { placements: plan.placements, lockedSkus: [], room };
    const edit = await fetch(`${base}/plans/${plan.id}/edit`, { method: "POST", headers: { Cookie: cookie, "Content-Type": "application/json" }, body: JSON.stringify(body) });
    assert.equal(edit.status, 200, await edit.clone().text());
    const edited: StoreState = (await edit.json()).state;
    const saved = edited.plans.find(p => p.id !== plan.id)!.room.fixtures.find(f => f.id === "custom-test")!;
    assert.equal(saved.asset?.width, 1, "server replaces client-supplied geometry with the owned catalog entry");
    const other = await fetch(`${base}/plans/${plan.id}/edit`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    assert.equal(other.status, 422);
    await stop(); base = await start();
    assert.ok((await (await get("/assets")).json()).some((item: AssetDefinition) => item.id === id));
    const reopened: StoreState = (await (await get("/state")).json()).state;
    assert.ok(reopened.plans.some(p => p.room.fixtures.some(f => f.id === "custom-test" && f.asset?.geometry?.length === 1)));
  } finally { await stop(); await rm(directory, { recursive: true, force: true }); }
});
