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

test("AI bridge preserves a clear signal for malformed tool arguments", async () => {
  const oldFetch = globalThis.fetch, key = process.env.NEBIUS_API_KEY, base = process.env.NEBIUS_BASE_URL;
  process.env.NEBIUS_API_KEY = "test"; process.env.NEBIUS_BASE_URL = "https://example.test/v1";
  globalThis.fetch = async () => Response.json({ id: "test", choices: [{ finish_reason: "tool_calls", message: { role: "assistant", content: null, tool_calls: [{ id: "call-1", type: "function", function: { name: "create_design_directions", arguments: "{invalid" } }] } }], usage: { prompt_tokens: 1, completion_tokens: 1 } });
  try {
    const result = await createAgentClient().messages.create({ model: "test", max_tokens: 32, messages: [{ role: "user", content: "Create a direction" }] });
    const call = result.content.find(block => block.type === "tool_use");
    assert.ok(call && call.type === "tool_use");
    assert.deepEqual(call.input, { __invalid_tool_json: true });
  } finally {
    globalThis.fetch = oldFetch;
    for (const [name, value] of [["NEBIUS_API_KEY", key], ["NEBIUS_BASE_URL", base]]) if (value === undefined) delete process.env[name!]; else process.env[name!] = value;
  }
});
