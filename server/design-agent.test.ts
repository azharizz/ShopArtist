import assert from "node:assert/strict";
import { test } from "node:test";
import { createRoom, fixtureCatalog, fixtureKinds, validateRoom } from "../shared/room.js";
import { assetRenderers } from "../src/assets/index.js";
import { existsSync } from "node:fs";
import { seed } from "./seed.js";
import { runDesignAgent } from "./design-agent.js";
import { getAssetDetails, listAssets } from "./asset-tools.js";
import type { AssetDefinition } from "../shared/assets/types.js";

const tag = "urn:tag:ambience:qloo:romantic";
const evidence = "urn:tag:ambience:qloo:charming";
const brief = { location: "New York City", latitude: null, longitude: null, radius: 1500, purpose: "Bookshop and cafe", direction: "Romantic bookshop cafe", inspirations: [], tags: [], theme: "analog" as const };
const customAsset: AssetDefinition = { id: "generated-00000000-0000-4000-8000-000000000001", label: "Custom display", description: "A small display", function: "Display objects", moodTags: ["cozy"], width: 0.7, depth: 0.7, heightApprox: 0.8, coloring: "Room accent", visualReference: "/asset-catalog.html#custom", implementation: "shared/generated-assets.ts", geometry: [{ shape: "box", width: 0.7, height: 0.8, depth: 0.7, x: 0, y: 0.4, z: 0, color: "accent" }] };

test("every fixture has a shared catalog entry and matching renderer", () => {
  assert.deepEqual(Object.keys(fixtureCatalog).sort(), [...fixtureKinds].sort());
  assert.deepEqual(Object.keys(assetRenderers).sort(), [...fixtureKinds].sort());
  for (const kind of fixtureKinds) {
    const asset = fixtureCatalog[kind];
    assert.equal(asset.id, kind);
    assert.ok(asset.width > 0 && asset.depth > 0 && asset.heightApprox > 0 && asset.description && asset.function && asset.coloring);
    assert.ok(asset.moodTags.length > 0);
    assert.equal(asset.visualReference, `/asset-catalog.html#${kind}`);
    assert.equal(asset.implementation, `src/assets/${kind}.ts`);
    assert.ok(existsSync(asset.implementation));
    assert.equal(typeof assetRenderers[kind], "function");
  }
});

test("catalog listing is paginated and details only accept previously listed IDs", () => {
  const seen = new Set<string>();
  const first = listAssets({ limit: 2 }, seen);
  assert.equal(first.assets.length, 2);
  assert.equal(first.total, fixtureKinds.length);
  assert.equal(first.next_offset, 2);
  assert.equal("description" in first.assets[0], false);
  assert.throws(() => getAssetDetails({ ids: ["bench"] }, seen), /returned by list_assets/);
  const matches = listAssets({ query: "cozy" }, seen);
  assert.ok(matches.assets.some(asset => asset.id === "bench"));
  const details = getAssetDetails({ ids: ["bench", "bench"] }, seen);
  assert.equal(details.assets.length, 1);
  assert.equal(details.assets[0].id, "bench");
  assert.ok(details.assets[0].coloring);
  assert.throws(() => getAssetDetails({ ids: Array(13).fill("bench") }, seen));
  assert.throws(() => listAssets({ limit: 26 }, seen));
});

test("AI Agent searches Qloo, uses real evidence and generates validated distinct interiors", async () => {
  const originalFetch = globalThis.fetch;
  const keys = ["NEBIUS_API_KEY", "NEBIUS_BASE_URL", "NEBIUS_MODEL", "QLOO_API_KEY"] as const;
  const original = Object.fromEntries(keys.map(key => [key, process.env[key]]));
  process.env.NEBIUS_API_KEY = "fake-ai-key"; process.env.NEBIUS_BASE_URL = "https://example.test/v1"; process.env.NEBIUS_MODEL = "test-model"; process.env.QLOO_API_KEY = "fake-qloo-key";
  let calls = 0;
  globalThis.fetch = async (input, init) => {
    const url = new URL(String(input));
    if (url.hostname === "hackathon.api.qloo.com") {
      if (url.pathname === "/v2/tags") return Response.json({ results: { tags: [{ id: tag, name: "Romantic", type: "urn:tag:ambience:qloo" }] } });
      const type = url.searchParams.get("filter.type");
      if (type === "urn:heatmap") return Response.json({ results: { heatmap: [{ location: { latitude: 40.7, longitude: -73.9 }, query: { affinity: 0.8 } }] } });
      if (type === "urn:tag") return Response.json({ results: { tags: [{ tag_id: evidence, name: "Charming", query: { affinity: .91 } }] } });
      return Response.json({ results: { entities: [{ entity_id: "123", name: "Example", query: { affinity: .8 } }] } });
    }
    assert.equal(url.hostname, "example.test");
    const body = JSON.parse(String(init?.body));
    assert.equal(body.model, "test-model");
    const context = JSON.parse(body.messages.find((m: { role: string }) => m.role === "user").content);
    assert.equal(context.availableFixtures, undefined);
    let name: string, args: unknown;
    if (calls++ === 0) { name = "search_taste_tags"; args = { query: "romantic" }; }
    else if (calls === 2) { name = "research_taste"; args = { tag_ids: [tag] }; }
    else if (calls === 3) { name = "list_assets"; args = {}; }
    else if (calls === 4) {
      name = "get_asset_details"; args = { ids: ["bench", "cafe-table", customAsset.id] };
      assert.ok(body.messages.some((m: { role: string; content: string }) => m.role === "tool" && m.content.includes('"id":"bench"') && !m.content.includes('"description"')));
    }
    else {
      name = "create_design_directions";
      const make = (name: string, accent: string) => ({ name, description: "A welcoming space informed by the charming taste signal.", evidence_ids: [evidence], decisions: [{ choice: "Mood", interpretation: "A welcoming palette expresses the charming signal.", evidence_ids: [evidence] }], style: "modern", wall: "#fffafa", floor: "#ccbbaa", accent, window: "grid", asset_idea: { brief: "A small display for featured books", reason: "Highlights books in the shop", reference_id: "bench" }, moves: [], additions: [] as { kind: string; x: number; z: number; rotation: number; reason: string }[] });
      const direction = calls === 9 ? make("Vibrant stories", "#50a080") : make("Quiet romance", "#c05080");
      if (calls === 5) direction.description = "Short description under 500 chars";
      if (calls === 6) {
        assert.ok(body.messages.some((m: { role: string; content: string }) => m.role === "tool" && m.content.includes("not a placeholder")));
        direction.asset_idea.brief = "A reading table with a fabric cover";
      }
      if (calls === 7) {
        assert.ok(body.messages.some((m: { role: string; content: string }) => m.role === "tool" && m.content.includes("lamps, fabric and textures cannot be generated")));
        direction.additions = [{ kind: "plant", x: 0, z: 0, rotation: 0, reason: "Natural accent" }];
      }
      if (calls === 8) {
        direction.additions = [{ kind: customAsset.id, x: 0, z: -2, rotation: 0, reason: "Cozy display" }];
        assert.ok(body.messages.some((m: { role: string; content: string }) => m.role === "tool" && m.content.includes("Only add non-shelf assets whose details")));
      }
      if (calls === 9) assert.ok(body.messages.some((m: { role: string; content: string }) => m.role === "tool" && m.content.includes("Rejected proposals") && m.content.includes("Quiet romance")));
      args = { directions: calls === 8 ? [{ ...make("Invalid decoration", "#aabbcc"), description: "A cozy interior decorated with curtains and reading benches." }, direction] : calls === 9 ? JSON.stringify([direction]) : [direction] };
      assert.ok(body.messages.some((m: { role: string; content: string }) => m.role === "tool" && m.content.includes("Charming")));
      assert.ok(body.messages.some((m: { role: string; content: string }) => m.role === "tool" && m.content.includes("Padded bench") && m.content.includes("coloring")));
    }
    assert.ok(body.tools.some((tool: { function: { name: string } }) => tool.function.name === name), `${name} should be offered at this step`);
    return Response.json({ id: "message", choices: [{ finish_reason: "tool_calls", message: { role: "assistant", content: null, tool_calls: [{ id: `call-${calls}`, type: "function", function: { name, arguments: JSON.stringify(args) } }] } }], usage: { prompt_tokens: 5, completion_tokens: 5 } });
  };
  try {
    const shelves = seed().shelves;
    const result = await runDesignAgent(brief, createRoom(["coffee", "books"], "modern"), shelves, [...Object.values(fixtureCatalog), customAsset], async () => ({ acceptable: true, critique: "The arrangement is visible." }));
    assert.equal(calls, 9); assert.equal(result.research.source, "qloo"); assert.equal(result.research.points.length, 1);
    assert.deepEqual(result.brief.tags, [tag]); assert.equal(result.directions.length, 2);
    assert.equal(result.directions[0].visualReview?.acceptable, true);
    assert.equal(result.directions[0].evidence[0].id, evidence);
    assert.equal(result.directions[0].decisions?.[0].evidence[0].id, evidence);
    assert.notEqual(result.directions[0].room.accent, result.directions[1].room.accent);
    assert.deepEqual(result.directions[0].room.fixtures.find(f => f.kind === customAsset.id)?.asset, customAsset);
    for (const direction of result.directions) assert.deepEqual(validateRoom(direction.room, shelves), []);
  } finally { globalThis.fetch = originalFetch; for (const key of keys) { if (original[key] === undefined) delete process.env[key]; else process.env[key] = original[key]; } }
});
