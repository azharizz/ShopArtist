import assert from "node:assert/strict";
import { test } from "node:test";
import { createRoom, validateRoom } from "../shared/room.js";
import type { DesignBrief } from "../shared/design.js";
import { seed } from "./seed.js";
import { designFromTaste, researchQloo, searchQloo, searchQlooTags } from "./qloo.js";

const anchor = "22B1BC87-CDFE-4340-86F8-8E0E6E1E6A7D";
const brief: DesignBrief = { location: "New York City", latitude: null, longitude: null, radius: 1500, purpose: "coffee and art", direction: "cozy terracotta café", inspirations: [`${anchor}|Blue Bottle Coffee`], tags: [], theme: "analog" };

test("live Qloo research uses resolved inspiration, location and real results to create an editable room", async () => {
  const originalFetch = globalThis.fetch;
  const originalKey = process.env.QLOO_API_KEY;
  process.env.QLOO_API_KEY = "test-key";
  const calls: URL[] = [];
  globalThis.fetch = async (input, init) => {
    const url = new URL(String(input)); calls.push(url);
    assert.equal(url.origin, "https://hackathon.api.qloo.com");
    assert.equal((init?.headers as Record<string, string>)["X-Api-Key"], "test-key");
    if (url.pathname === "/search") return Response.json({ results: [{ entity_id: anchor, name: "Blue Bottle Coffee", types: ["urn:entity:brand"] }] });
    if (url.pathname === "/v2/tags") return Response.json({ results: { tags: [{ id: "urn:tag:genre:music:jazz", name: "Jazz", type: "urn:tag:genre:music" }] } });
    assert.equal(url.searchParams.get("signal.interests.entities"), anchor);
    const type = url.searchParams.get("filter.type");
    if (type === "urn:entity:place") return Response.json({ results: { entities: [{ entity_id: anchor, name: "Reference café", location: { lat: 40.7, lon: -73.9 }, properties: { short_description: "A café" } }] } });
    if (type === "urn:heatmap") return Response.json({ results: { heatmap: [{ location: { latitude: 40.7, longitude: -73.9 }, query: { affinity: 0.8 } }] } });
    if (type === "urn:tag") return Response.json({ results: { tags: [{ tag_id: "urn:tag:ambience:qloo:cozy", name: "Cozy" }] } });
    return Response.json({ results: { entities: [{ entity_id: anchor, name: "Sample", query: { affinity: 0.9 } }] } });
  };
  try {
    assert.equal((await searchQloo("Blue Bottle"))[0].id, anchor);
    assert.equal((await searchQlooTags("jazz"))[0].id, "urn:tag:genre:music:jazz");
    const room = createRoom(["coffee", "art"], "modern");
    const result = await researchQloo({ ...brief, tags: ["urn:tag:genre:music:jazz"] }, room, seed().shelves);
    const agentResearch = await researchQloo({ ...brief, tags: ["urn:tag:genre:music:jazz"] }, room, seed().shelves, { placeTags: ["urn:tag:category:place:cafe"], includeProposal: false });
    assert.equal(agentResearch.proposal, undefined);
    assert.ok(calls.some(url => url.searchParams.get("filter.type") === "urn:entity:place" && url.searchParams.get("filter.tags") === "urn:tag:category:place:cafe"));
    assert.ok(calls.some(url => url.searchParams.get("filter.tag.types") === "urn:tag:decor:qloo"));
    assert.equal(result.source, "qloo");
    assert.equal(result.tags[0].name, "Cozy");
    assert.equal(result.points.length, 1);
    assert.equal(result.places?.[0].latitude, 40.7);
    assert.equal(result.places?.[0].description, "A café");
    assert.ok(calls.some(url => url.searchParams.get("filter.type") === "urn:heatmap" && url.searchParams.get("filter.location.radius") === "1500"));
    assert.equal(result.proposal!.room.accent, "#c9765b");
    assert.deepEqual(validateRoom(result.proposal!.room, seed().shelves), []);
    assert.equal(result.proposal!.room.fixtures.length, room.fixtures.length);
    assert.ok(calls.some(url => url.searchParams.get("filter.location.query") === "New York City"));
    assert.ok(calls.some(url => url.searchParams.get("filter.tag.types") === "urn:tag:ambience:qloo"));
    assert.ok(calls.some(url => url.searchParams.get("signal.interests.tags") === "urn:tag:genre:music:jazz"));
    assert.ok(calls.some(url => url.searchParams.get("filter.type") === "urn:heatmap" && url.searchParams.has("signal.interests.tags")));
  } finally {
    globalThis.fetch = originalFetch;
    if (originalKey === undefined) delete process.env.QLOO_API_KEY; else process.env.QLOO_API_KEY = originalKey;
  }
});

test("taste signals influence the editable proposal and room sizes remain valid", () => {
  const room = createRoom(["coffee"], "modern");
  room.width = 8; room.depth = 8;
  const warm = designFromTaste({ ...brief, direction: "", purpose: "coffee" }, room, [{ id: "tag", name: "Cozy", type: "" }], seed().shelves);
  const vivid = designFromTaste({ ...brief, direction: "", purpose: "coffee" }, room, [{ id: "tag", name: "New wave", type: "" }], seed().shelves);
  assert.notEqual(warm.room.accent, vivid.room.accent);
  assert.deepEqual(validateRoom(warm.room, seed().shelves), []);
  assert.deepEqual(validateRoom(vivid.room, seed().shelves), []);
});
