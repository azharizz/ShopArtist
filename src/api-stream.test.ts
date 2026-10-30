import assert from "node:assert/strict";
import { test } from "node:test";
import { apiStream } from "./api.js";

const study = { research: { source: "qloo" }, directions: [{ name: "Test" }] };
test("research accepts a completed JSON response from an older server", async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async () => Response.json(study);
  try { assert.deepEqual(await apiStream("/ai/research", {}, () => {}), study); }
  finally { globalThis.fetch = original; }
});
test("research handles streamed progress and study frames across chunk boundaries", async () => {
  const original = globalThis.fetch;
  const encoder = new TextEncoder();
  globalThis.fetch = async () => new Response(new ReadableStream({ start(controller) {
    for (const chunk of ['event: progress\r\ndata: {"phase":"taste",', '"label":"Searching","status":"active"}\r\n\r\nevent: study\r\ndata: ', JSON.stringify(study), '\r\n\r\n']) controller.enqueue(encoder.encode(chunk));
    controller.close();
  } }), { headers: { "content-type": "text/event-stream" } });
  const progress: string[] = [];
  try { assert.deepEqual(await apiStream("/ai/research", {}, event => progress.push(event.label)), study); assert.deepEqual(progress, ["Searching"]); }
  finally { globalThis.fetch = original; }
});
test("research reports incomplete streams and server failures", async () => {
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async () => new Response('event: progress\ndata: {"label":"working"}\n\n', { headers: { "content-type": "text/event-stream" } });
    await assert.rejects(apiStream("/ai/research", {}, () => {}), /connection ended/);
    globalThis.fetch = async () => Response.json({ error: "Research failed" }, { status: 500 });
    await assert.rejects(apiStream("/ai/research", {}, () => {}), /Research failed/);
  } finally { globalThis.fetch = original; }
});
