import assert from "node:assert/strict";
import { test } from "node:test";
import { reviewAssetImage } from "./asset-review.js";

test("visual reviewer receives the rendered image and returns a specific critique", async () => {
  const oldFetch = globalThis.fetch, key = process.env.NEBIUS_API_KEY, base = process.env.NEBIUS_BASE_URL, model = process.env.AI_VISION_MODEL;
  process.env.NEBIUS_API_KEY = "fake"; process.env.NEBIUS_BASE_URL = "https://example.test/v1"; process.env.AI_VISION_MODEL = "vision-test";
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
    for (const [name, value] of [["NEBIUS_API_KEY", key], ["NEBIUS_BASE_URL", base], ["AI_VISION_MODEL", model]]) if (value === undefined) delete process.env[name!]; else process.env[name!] = value;
  }
});
