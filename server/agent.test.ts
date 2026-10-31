import assert from "node:assert/strict";
import { test } from "node:test";
import { proposeDesign } from "./agent.js";
import { seed } from "./seed.js";
import { fixtureCatalog } from "../shared/room.js";
import { allSharedAssets } from "./shared-assets.js";

test("AI sidekick validates tool plans and leaves the original room unchanged", async () => {
  const originalFetch = globalThis.fetch;
  const previousKey = process.env.AGENT_API_KEY;
  process.env.AGENT_API_KEY = "test-key";
  const state = seed();
  const room = state.plans[0].room;
  const original = structuredClone(room);
  let argumentsText = JSON.stringify({ message: "A pink wall.", commands: [{ action: "color", target: "wall", value: "#ffb6c1" }] });
  globalThis.fetch = async (_url, init) => {
    const body = JSON.parse(String(init?.body));
    assert.equal(body.tools[0].function.name, "propose_edits");
    return Response.json({ choices: [{ message: { tool_calls: [{ id: "call-1", function: { name: "propose_edits", arguments: argumentsText } }] }, finish_reason: "tool_calls" }] });
  };
  try {
    const result = await proposeDesign("make it pink", room, state.shelves, "ai");
    assert.equal(result.room.wall, "#ffb6c1");
    assert.deepEqual(room, original);
    argumentsText = JSON.stringify({ message: "Bad edit", commands: [{ action: "color", target: "wall", value: "not-a-color" }] });
    await assert.rejects(proposeDesign("bad", room, state.shelves, "ai"), /valid edit plan/);
    assert.deepEqual(room, original);
  } finally {
    globalThis.fetch = originalFetch;
    if (previousKey === undefined) delete process.env.AGENT_API_KEY;
    else process.env.AGENT_API_KEY = previousKey;
  }
});

test("local commands spawn catalog bookcases by count and delete fixtures by kind", async () => {
  const state = seed(), room = state.plans[0].room, catalog = [...Object.values(fixtureCatalog), ...allSharedAssets()];
  const spawned = await proposeDesign("add 8 bookshelf", room, state.shelves, "local", catalog);
  const added = spawned.room.fixtures.slice(room.fixtures.length);
  assert.equal(added.length, 8);
  assert.ok(added.every(fixture => /book/i.test(fixture.label)));
  assert.ok(room.fixtures.some(fixture => fixture.kind === "plant"));
  const removed = await proposeDesign("delete the plants", room, state.shelves, "local", catalog);
  assert.ok(removed.room.fixtures.every(fixture => fixture.kind !== "plant"));
  const bookcase = catalog.find(asset => /bookcase/i.test(asset.label))!;
  const originalFetch = globalThis.fetch, previousKey = process.env.AGENT_API_KEY;
  process.env.AGENT_API_KEY = "test-key";
  globalThis.fetch = async () => Response.json({ choices: [{ message: { tool_calls: [{ id: "c", function: { name: "propose_edits", arguments: JSON.stringify({ message: "Added.", commands: [{ action: "spawn", kind: bookcase.label, count: 1 }] }) } }] }, finish_reason: "tool_calls" }] });
  try {
    const byLabel = await proposeDesign("add a bookcase", room, state.shelves, "ai", catalog);
    assert.equal(byLabel.room.fixtures.at(-1)?.kind, bookcase.id);
  } finally { globalThis.fetch = originalFetch; if (previousKey === undefined) delete process.env.AGENT_API_KEY; else process.env.AGENT_API_KEY = previousKey; }
  await assert.rejects(proposeDesign("delete the shelves", room, state.shelves, "local", catalog), /cannot be removed|Nothing called/);
});
