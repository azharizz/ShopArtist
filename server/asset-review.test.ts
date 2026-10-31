import assert from "node:assert/strict";
import { test } from "node:test";
import { reviewAssetImage } from "./asset-review.js";

test("visual reviewer receives the rendered image and returns a specific critique", async () => {
  const oldFetch = globalThis.fetch, key = process.env.AGENT_API_KEY, base = process.env.AGENT_BASE_URL, model = process.env.AI_VISION_MODEL;
  process.env.AGENT_API_KEY = "fake"; process.env.AGENT_BASE_URL = "https://example.test/v1"; process.env.AI_VISION_MODEL = "vision-test";
  globalThis.fetch = async (_input, init) => {
    const body = JSON.parse(String(init?.body));
    assert.equal(body.model, "vision-test");
    assert.ok(body.messages[0].content.includes("skeptical"));
    const user = body.messages.find((m: { role: string }) => m.role === "user");
    assert.ok(user.content.some((block: { type: string; image_url?: { url: string } }) => block.type === "image_url" && block.image_url?.url === "data:image/png;base64,cHJldmlldw=="));
    return Response.json({ id: "test", choices: [{ finish_reason: "stop", message: { role: "assistant", content: "VERDICT: FAIL\nCRITIQUE: One side support is missing.\nCHANGES: Add a second side support." } }], usage: { prompt_tokens: 1, completion_tokens: 1 } });
  };
  try {
    const result = await reviewAssetImage("A bookshelf", Buffer.from("preview"));
    assert.deepEqual(result, { acceptable: false, critique: "One side support is missing.", improvements: "Add a second side support." });
  } finally {
    globalThis.fetch = oldFetch;
    for (const [name, value] of [["AGENT_API_KEY", key], ["AGENT_BASE_URL", base], ["AI_VISION_MODEL", model]]) if (value === undefined) delete process.env[name!]; else process.env[name!] = value;
  }
});

test("room reviewer marks unsupported cross-view contradictions as uncertain", async () => {
  const { parseRoomReview } = await import("./room-review.js");
  const result = parseRoomReview("VERDICT: FAIL\nCRITIQUE: The top view has an inconsistent shelf count compared with the perspective view.");
  assert.equal(result.uncertain, true);
  assert.match(result.critique, /inspect manually/);
  assert.equal(parseRoomReview("VERDICT: PASS\nCRITIQUE: The furniture is visible.").uncertain, false);
});

test("room reviewer receives the proposed claims and actual fixture list", async () => {
  const { reviewRoom } = await import("./room-review.js");
  const { createRoom } = await import("../shared/room.js");
  const { seed } = await import("./seed.js");
  const oldFetch = globalThis.fetch, key = process.env.AGENT_API_KEY, base = process.env.AGENT_BASE_URL;
  process.env.AGENT_API_KEY = "fake"; process.env.AGENT_BASE_URL = "https://example.test/v1";
  globalThis.fetch = async (_input, init) => {
    const body = JSON.parse(String(init?.body));
    const user = body.messages.find((m: { role: string }) => m.role === "user");
    const payload = JSON.parse(user.content.find((block: { type: string }) => block.type === "text").text);
    assert.equal(payload.proposedDescription, "A reading corner.");
    assert.deepEqual(payload.decisions, ["Add a reading bench"]);
    assert.ok(payload.actualFixtures.some((fixture: { label: string }) => fixture.label === "Cashier desk"));
    return Response.json({ id: "test", choices: [{ finish_reason: "stop", message: { role: "assistant", content: "VERDICT: FAIL\nCRITIQUE: A promised fixture is missing." } }], usage: { prompt_tokens: 1, completion_tokens: 1 } });
  };
  try {
    const review = await reviewRoom(createRoom(["books"], "modern"), seed().shelves, "A bookshop", "A reading corner.", ["Add a reading bench"]);
    assert.equal(review.acceptable, false);
    assert.match(review.critique, /missing/);
  } finally {
    globalThis.fetch = oldFetch;
    for (const [name, value] of [["AGENT_API_KEY", key], ["AGENT_BASE_URL", base]]) if (value === undefined) delete process.env[name!]; else process.env[name!] = value;
  }
});
