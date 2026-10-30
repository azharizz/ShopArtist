import assert from "node:assert/strict";
import { test } from "node:test";
import { proposeDesign } from "./agent.js";
import { seed } from "./seed.js";

test("AI sidekick validates tool plans and leaves the original room unchanged", async () => {
  const originalFetch = globalThis.fetch;
  const previousKey = process.env.NEBIUS_API_KEY;
  process.env.NEBIUS_API_KEY = "test-key";
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
    if (previousKey === undefined) delete process.env.NEBIUS_API_KEY;
    else process.env.NEBIUS_API_KEY = previousKey;
  }
});
