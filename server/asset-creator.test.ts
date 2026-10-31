import assert from "node:assert/strict";
import { test } from "node:test";
import { checkShelfConstruction, createAssetWithAgent } from "./asset-creator.js";
import { fixtureCatalog, createRoom, fixtureSize, validateRoom } from "../shared/room.js";
import { inspectGeneratedGeometry } from "../shared/generated-assets.js";
import { seed } from "./seed.js";
import type { AssetDefinition } from "../shared/assets/types.js";

test("bookshelf check rejects a blocked shelf", () => {
  const shelf = { shape: "box" as const, width: 1, height: .06, depth: .4, x: 0, y: .4, z: 0, color: "wood" };
  const blocker = { ...shelf, shape: "cylinder" as const, width: .8, height: 1, depth: .6 };
  assert.throws(() => checkShelfConstruction("Bookshelf", [shelf, { ...shelf, y: .9 }, blocker]), /blocks/);
  assert.doesNotThrow(() => checkShelfConstruction("Bookshelf", [shelf, { ...shelf, y: .9 }]));
});

test("asset creator inspects reference, repairs invalid geometry, tests and saves a usable asset", async () => {
  const originalFetch = globalThis.fetch;
  const keys = ["AGENT_API_KEY", "AGENT_BASE_URL", "AGENT_MODEL"] as const;
  const original = Object.fromEntries(keys.map(key => [key, process.env[key]]));
  process.env.AGENT_API_KEY = "fake"; process.env.AGENT_BASE_URL = "https://example.test/v1"; process.env.AGENT_MODEL = "test-model";
  let calls = 0, saved: AssetDefinition | undefined;
  const part = { shape: "box", width: 1.2, height: 0.8, depth: 0.6, x: 0, y: 0.4, z: 0, color: "accent" };
  const draft = { label: "DisplayTable", description: "A small display table.", function: "Display books and objects.", moodTags: ["cozy"], parts: [part] };
  const expected = ["inspect_reference", "plan_asset", "draft_asset", "test_asset", "draft_asset", "test_asset", "preview_asset", "review_asset", "save_asset"];
  globalThis.fetch = async (_input, init) => {
    const body = JSON.parse(String(init?.body));
    const name = body.tool_choice.function.name;
    assert.equal(name, expected[calls]);
    let args: unknown = {};
    if (name === "plan_asset") {
      assert.ok(body.messages.some((m: { role: string; content: string }) => m.role === "tool" && m.content.includes("Padded bench") && m.content.includes("box(")));
      args = { brief: "Create a cozy small display table.", construction: "Use a simple solid rectangular shape." };
    } else if (name === "draft_asset") {
      args = calls === 2 ? { ...draft, parts: [{ ...part, y: 0.1 }] } : draft;
      if (calls === 4) assert.ok(body.messages.some((m: { role: string; content: string }) => m.role === "tool" && m.content.includes("below the floor")));
    }
    calls++;
    return Response.json({ id: "message", choices: [{ finish_reason: "tool_calls", message: { role: "assistant", content: null, tool_calls: [{ id: `call-${calls}`, type: "function", function: { name, arguments: JSON.stringify(args) } }] } }], usage: { prompt_tokens: 5, completion_tokens: 5 } });
  };
  try {
    const result = await createAssetWithAgent("A cozy table", fixtureCatalog.bench, asset => { saved = asset; }, { renderAssetViews: async () => Buffer.from("image"), reviewAssetImage: async () => ({ acceptable: true, critique: "The table is recognizable.", improvements: "" }) });
    assert.equal(calls, 9); assert.deepEqual(saved, result.asset); assert.equal(result.asset.referenceId, "bench"); assert.equal(result.asset.label, "Display Table");
    assert.deepEqual({ width: result.asset.width, depth: result.asset.depth, height: result.asset.heightApprox }, { width: 1.2, depth: 0.6, height: 0.8 });
    const room = createRoom(["books"], "modern"), shelves = seed().shelves;
    room.fixtures.push({ id: "custom", kind: result.asset.id as `generated-${string}`, label: result.asset.label, x: 0, z: 0, rotation: 0, asset: result.asset });
    assert.equal(fixtureSize(room.fixtures.at(-1)!, shelves).width, result.asset.width);
    assert.deepEqual(validateRoom(room, shelves), []);
    assert.throws(() => inspectGeneratedGeometry([{ ...part, width: Infinity }]));
    assert.throws(() => inspectGeneratedGeometry([{ ...part, shape: "script" }]));
  } finally { globalThis.fetch = originalFetch; for (const key of keys) { if (original[key] === undefined) delete process.env[key]; else process.env[key] = original[key]; } }
});

test("visual review revises twice, stops at three reviews, and saves with concerns", async () => {
  const originalFetch = globalThis.fetch;
  const oldKey = process.env.AGENT_API_KEY, oldBase = process.env.AGENT_BASE_URL;
  process.env.AGENT_API_KEY = "fake"; process.env.AGENT_BASE_URL = "https://example.test/v1";
  const stages: string[] = [], feedback: string[] = [];
  const shape = { shape: "box", width: 1, height: .8, depth: .6, x: 0, y: .4, z: 0, color: "accent" };
  globalThis.fetch = async (_input, init) => {
    const body = JSON.parse(String(init?.body)), name = body.tool_choice.function.name;
    stages.push(name);
    if (name === "draft_asset") feedback.push(JSON.stringify(body.messages.filter((m: { role: string }) => m.role === "tool")));
    const args = name === "plan_asset" ? { brief: "A small display bookshelf.", construction: "Use a rectangular form." } : name === "draft_asset" ? { label: "Bookshelf", description: "A compact display bookshelf.", function: "Display items.", moodTags: ["quiet"], parts: [shape] } : {};
    return Response.json({ id: "message", choices: [{ finish_reason: "tool_calls", message: { role: "assistant", content: null, tool_calls: [{ id: `call-${stages.length}`, type: "function", function: { name, arguments: JSON.stringify(args) } }] } }], usage: { prompt_tokens: 1, completion_tokens: 1 } });
  };
  let reviews = 0, saved: AssetDefinition | undefined;
  try {
    const result = await createAssetWithAgent("A compact table", undefined, asset => { saved = asset; }, {
      renderAssetViews: async () => Buffer.from("three views"),
      reviewAssetImage: async () => ({ acceptable: false, critique: `Visible flaw ${++reviews}`, improvements: "Make supports connect." }),
    });
    assert.equal(reviews, 3);
    assert.equal(stages.filter(name => name === "draft_asset").length, 3);
    assert.equal(stages.filter(name => name === "review_asset").length, 3);
    assert.equal(stages.at(-1), "save_asset");
    assert.ok(feedback[1].includes("Visible flaw 1"));
    assert.equal(result.asset.visualReviews?.length, 3);
    assert.equal(result.asset.visualReviews?.at(-1)?.acceptable, false);
    assert.deepEqual(saved, result.asset);
  } finally { globalThis.fetch = originalFetch; if (oldKey === undefined) delete process.env.AGENT_API_KEY; else process.env.AGENT_API_KEY = oldKey; if (oldBase === undefined) delete process.env.AGENT_BASE_URL; else process.env.AGENT_BASE_URL = oldBase; }
});
