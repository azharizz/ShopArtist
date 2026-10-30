import assert from "node:assert/strict";
import { test } from "node:test";
import { createAgentClient } from "./ai-bridge.js";

test("AI bridge forwards image and text blocks in order", async () => {
  const oldFetch = globalThis.fetch, oldKey = process.env.NEBIUS_API_KEY, oldBase = process.env.NEBIUS_BASE_URL;
  process.env.NEBIUS_API_KEY = "test"; process.env.NEBIUS_BASE_URL = "https://example.test/v1";
  globalThis.fetch = async (_input, init) => {
    const body = JSON.parse(String(init?.body));
    assert.deepEqual(body.messages[0].content, [{ type: "text", text: "Inspect" }, { type: "image_url", image_url: { url: "data:image/png;base64,aGVsbG8=" } }]);
    return Response.json({ id: "test", choices: [{ finish_reason: "stop", message: { role: "assistant", content: "OK" } }], usage: { prompt_tokens: 1, completion_tokens: 1 } });
  };
  try {
    await createAgentClient().messages.create({ model: "test", max_tokens: 32, messages: [{ role: "user", content: [{ type: "text", text: "Inspect" }, { type: "image", source: { type: "base64", media_type: "image/png", data: "aGVsbG8=" } }] }] });
  } finally { globalThis.fetch = oldFetch; if (oldKey === undefined) delete process.env.NEBIUS_API_KEY; else process.env.NEBIUS_API_KEY = oldKey; if (oldBase === undefined) delete process.env.NEBIUS_BASE_URL; else process.env.NEBIUS_BASE_URL = oldBase; }
});
