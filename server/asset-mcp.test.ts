import assert from "node:assert/strict";
import { test } from "node:test";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { tmpdir } from "node:os";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { curatedAssets } from "../shared/assets/index.js";
import { inspectGeneratedGeometry } from "../shared/generated-assets.js";

test("curated assets remain valid and old shared copies do not duplicate them", { timeout: 30000 }, async () => {
  assert.equal(curatedAssets.length, 201);
  assert.equal(new Set(curatedAssets.map(asset => asset.id)).size, curatedAssets.length);
  for (const asset of curatedAssets) {
    const dimensions = inspectGeneratedGeometry(asset.geometry);
    assert.deepEqual([asset.width, asset.depth, asset.heightApprox], [dimensions.width, dimensions.depth, dimensions.heightApprox]);
    assert.ok(asset.catalogPath?.startsWith("shared/assets/"));
  }
  const directory = await mkdtemp(path.join(tmpdir(), "shopartist-curated-"));
  const client = new Client({ name: "test", version: "1.0.0" });
  try {
    await mkdir(path.join(directory, "mcp-assets"));
    const asset = curatedAssets[0];
    await writeFile(path.join(directory, "mcp-assets", `${asset.id}.json`), JSON.stringify(asset));
    await client.connect(new StdioClientTransport({ command: process.execPath, args: ["--import", "tsx", "server/asset-mcp.ts"], cwd: process.cwd(), env: { ...process.env, DATA_DIR: directory } as Record<string, string> }));
    const result = await client.callTool({ name: "list_assets", arguments: {} });
    const block = (result.content as Array<{ type: string; text?: string }>).find(item => item.type === "text");
    const entries = JSON.parse(block!.text!) as { id: string }[];
    assert.equal(entries.filter(entry => entry.id === asset.id).length, 1);
    assert.ok(curatedAssets.every(item => entries.some(entry => entry.id === item.id)));
  } finally { await client.close(); await rm(directory, { recursive: true, force: true }); }
});

test("MCP requires a preview before saving and persists the asset in the shared catalog", { timeout: 30000 }, async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "shopartist-mcp-"));
  const client = new Client({ name: "test", version: "1.0.0" });
  const transport = new StdioClientTransport({ command: process.execPath, args: ["--import", "tsx", "server/asset-mcp.ts"], cwd: process.cwd(), env: { ...process.env, DATA_DIR: directory } as Record<string, string> });
  const draft = { label: "Test shelf", description: "A simple rectangular test shelf.", function: "Display a small object.", moodTags: ["simple"], geometry: [{ shape: "box", width: 1, height: .5, depth: .5, x: 0, y: .25, z: 0, color: "wood" }] };
  try {
    await client.connect(transport);
    const names = (await client.listTools()).tools.map(tool => tool.name);
    assert.deepEqual(names.sort(), ["inspect_asset", "list_assets", "preview_asset", "save_asset"]);
    const blocked = await client.callTool({ name: "save_asset", arguments: draft });
    assert.equal(blocked.isError, true);
    const preview = await client.callTool({ name: "preview_asset", arguments: draft });
    assert.ok(Array.isArray(preview.content) && preview.content.some(item => item.type === "image" && item.mimeType === "image/png"));
    const saved = await client.callTool({ name: "save_asset", arguments: draft });
    assert.equal(saved.isError, undefined);
    const text = Array.isArray(saved.content) && saved.content.find(item => item.type === "text");
    assert.ok(text && text.type === "text");
    const asset = JSON.parse(text.text).asset;
    const file = JSON.parse(await readFile(path.join(directory, "mcp-assets", `${asset.id}.json`), "utf8"));
    assert.equal(file.label, draft.label); assert.equal(file.source, "mcp");
    const listing = await client.callTool({ name: "list_assets", arguments: {} });
    assert.ok(JSON.stringify(listing.content).includes(asset.id));
    const inspected = await client.callTool({ name: "inspect_asset", arguments: { id: asset.id } });
    assert.ok(JSON.stringify(inspected.content).includes("Test shelf"));
  } finally { await client.close(); await rm(directory, { recursive: true, force: true }); }
});
