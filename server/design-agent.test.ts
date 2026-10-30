import assert from "node:assert/strict";
import { test } from "node:test";
import { createRoom, fixtureCatalog, fixtureKinds, validateRoom } from "../shared/room.js";
import { assetRenderers } from "../shared/asset-renderers.js";
import { existsSync } from "node:fs";
import { seed } from "./seed.js";
import { runDesignAgent, buildDirection, researchToolNames, validateTasteTagIds, reviewFailureReason, selectPlaceTags } from "./design-agent.js";
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
    assert.equal(asset.implementation, `shared/assets/${kind}.ts`);
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
      const make = (name: string, accent: string) => ({ name, description: "A welcoming space informed by the charming taste signal.", evidence_ids: [evidence], furniture: null, frame: null, decisions: [{ choice: "Mood", interpretation: "A welcoming palette expresses the charming signal. ".repeat(7), evidence_ids: [evidence] }], style: "modern", wall: "#fffafa", floor: "#ccbbaa", accent, window: "grid", asset_idea: { brief: "A small display for featured books", reason: "Highlights books in the shop", reference_id: "bench" }, moves: [], additions: [] as { kind: string; x: number; z: number; rotation: number; reason: string }[] });
      const direction = calls >= 10 ? make(`Vibrant stories ${calls}`, ["#50a080", "#304080", "#a05020"][calls - 10] ?? "#a05020") : make("Quiet romance", "#c05080");
      if (calls === 5) direction.description = "Short description under 500 chars";
      if (calls === 6) {
        assert.ok(body.messages.some((m: { role: string; content: string }) => m.role === "tool" && m.content.includes("not a placeholder")));
        direction.wall = "not-a-colour";
      }
      if (calls === 7) {
        assert.ok(body.messages.some((m: { role: string; content: string }) => m.role === "tool" && m.content.includes("wall:")));
        direction.additions = [{ kind: "plant", x: 0, z: 0, rotation: 0, reason: "Natural accent" }];
      }
      if (calls === 8) {
        direction.additions = [{ kind: customAsset.id, x: 0, z: -2, rotation: 0, reason: "Cozy display" }];
        assert.ok(body.messages.some((m: { role: string; content: string }) => m.role === "tool" && m.content.includes("Only add non-shelf assets whose details")));
      }
      if (calls === 9) { direction.name = "Same room, new title"; direction.additions = [{ kind: customAsset.id, x: 0, z: -2, rotation: 0, reason: "Cozy display" }]; }
      if (calls === 10) assert.ok(body.messages.some((m: { role: string; content: string }) => m.role === "tool" && m.content.includes("visually identical")));
      if (calls === 9) assert.ok(body.messages.some((m: { role: string; content: string }) => m.role === "tool" && m.content.includes("Rejected proposals") && m.content.includes("Quiet romance")));
      args = { directions: calls === 8 ? [{ ...make("Invalid decoration", "#aabbcc"), evidence_ids: [] }, direction] : calls === 9 ? JSON.stringify([direction]) : [direction] };
      assert.ok(body.messages.some((m: { role: string; content: string }) => m.role === "tool" && m.content.includes("Charming")));
      assert.ok(body.messages.some((m: { role: string; content: string }) => m.role === "tool" && m.content.includes("Padded bench") && m.content.includes("coloring")));
    }
    assert.ok(body.tools.some((tool: { function: { name: string } }) => tool.function.name === name), `${name} should be offered at this step`);
    return Response.json({ id: "message", choices: [{ finish_reason: "tool_calls", message: { role: "assistant", content: null, tool_calls: [{ id: `call-${calls}`, type: "function", function: { name, arguments: JSON.stringify(args) } }] } }], usage: { prompt_tokens: 5, completion_tokens: 5 } });
  };
  try {
    const shelves = seed().shelves;
    let reviews = 0;
    const result = await runDesignAgent(brief, createRoom(["coffee", "books"], "modern"), shelves, [...Object.values(fixtureCatalog), customAsset], async () => { if (reviews++ === 0) return { acceptable: false, critique: "The layout needs inspection.", uncertain: false }; throw new Error("review service unavailable"); });
    assert.equal(calls, 12); assert.equal(result.research.source, "qloo"); assert.equal(result.research.points.length, 1);
    assert.deepEqual(result.brief.tags, [tag]); assert.equal(result.directions.length, 4);
    assert.equal(result.directions[0].visualReview?.acceptable, false);
    assert.match(result.directions[0].visualReview?.critique ?? "", /inspection/);
    assert.equal(result.directions[1].visualReview?.available, false);
    assert.match(result.directions[1].visualReview?.critique ?? "", /unavailable/);
    assert.equal(result.directions[0].evidence[0].id, evidence);
    assert.equal(result.directions[0].decisions?.[0].evidence[0].id, evidence);
    assert.ok((result.directions[0].decisions?.[0].interpretation.length ?? 0) > 250);
    assert.notEqual(result.directions[0].room.accent, result.directions[1].room.accent);
    assert.deepEqual(result.directions[0].room.fixtures.find(f => f.kind === customAsset.id)?.asset, customAsset);
    for (const direction of result.directions) assert.deepEqual(validateRoom(direction.room, shelves), []);
  } finally { globalThis.fetch = originalFetch; for (const key of keys) { if (original[key] === undefined) delete process.env[key]; else process.env[key] = original[key]; } }
});


test("out-of-bounds proposals report a boundary failure instead of silently moving fixtures", () => {
  const room = createRoom(["coffee", "books"], "modern"), shelves = seed().shelves;
  const direction = buildDirection({ name: "Test", description: "A practical and welcoming place for people.", evidence_ids: [evidence], furniture: null, frame: null, decisions: [], style: "modern", wall: "#ffffff", floor: "#ffffff", accent: "#ffffff", window: "grid", moves: [{ fixture_id: room.fixtures[0].id, x: 999, z: 999, rotation: 0, reason: "Test" }], additions: [], asset_idea: { brief: "", reason: "", reference_id: "" } }, room, shelves, [{ id: evidence, name: "Charming", type: "tag" }], Object.values(fixtureCatalog));
  assert.match(direction.changes[0], /could not fit/);
  assert.match(direction.changes[0], /footprint.*Room/);
  assert.equal(direction.room.fixtures[0].x, room.fixtures[0].x);
});

test("review failure diagnostics classify errors without exposing details", () => {
  assert.equal(reviewFailureReason(new Error("request timed out secret")), "timed out");
  assert.equal(reviewFailureReason(new Error("Visual reviewer returned an invalid assessment.")), "invalid or empty response");
  assert.equal(reviewFailureReason({ status: 503 }), "provider error 503");
  assert.equal(reviewFailureReason(new Error("secret internal details")), "unexpected error");
});

test("place categories use exact returned IDs and a repeated omission falls back without inventing a filter", () => {
  const id = "urn:tag:category:place:coffee", categories = [{ id, name: "Coffee", type: "tag" }];
  assert.throws(() => selectPlaceTags(undefined, categories, true, 0), /Coffee/);
  assert.deepEqual(selectPlaceTags(undefined, categories, true, 1), []);
  assert.deepEqual(selectPlaceTags([], categories, true, 0), []);
  assert.deepEqual(selectPlaceTags([id], categories, true, 0), [id]);
  assert.throws(() => selectPlaceTags(["invented"], categories, true, 0), /exact place category IDs/);
});

test("circulation estimate detects a blocked entrance and keeps its limitation explicit", async () => {
  const { assessCirculation } = await import("../shared/room-circulation.js");
  const room = createRoom(["coffee"], "modern"), shelves = seed().shelves;
  room.fixtures = [];
  assert.equal(assessCirculation(room, shelves).entranceBlocked, false);
  room.fixtures = [{ id: "block", kind: "cashier", label: "Block", x: 0, z: room.depth / 2 - .25, rotation: 0, asset: { ...fixtureCatalog.cashier, width: 2.5, depth: 1 } }];
  const result = assessCirculation(room, shelves);
  assert.equal(result.entranceBlocked, true);
  assert.match(result.note, /not an accessibility/);
});


test("invalid taste IDs receive valid Qloo choices and searches remain available", () => {
  const allowed = new Map([[tag, { id: tag, name: "Romantic", type: "urn:tag:ambience:qloo" }]]);
  assert.throws(() => validateTasteTagIds(["invented"], allowed), error => error instanceof Error && error.message.includes(tag));
  assert.doesNotThrow(() => validateTasteTagIds([tag], allowed));
  assert.ok(researchToolNames(5).includes("search_taste_tags"));
  assert.throws(() => validateTasteTagIds(["invented"], new Map()), /different term/);
});
