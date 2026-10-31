import Anthropic from "@anthropic-ai/sdk";

/** Translate the Claude SDK's non-streaming Messages requests to the configured model gateway. */
export function createAgentClient() {
  const key = process.env.AGENT_API_KEY;
  if (!key) throw new Error("AI Agent is not configured. Add the server's AI API key and try again.");
  const base = (process.env.AGENT_BASE_URL || "https://api.tokenfactory.nebius.com/v1").replace(/\/$/, "");
  if (!/^https:\/\//i.test(base)) throw new Error("AI Agent requires an HTTPS provider URL.");
  return new Anthropic({
    apiKey: "local-agent-bridge", baseURL: "https://agent.invalid", maxRetries: 0, timeout: 90000,
    fetch: async (_url, init) => {
      const input = JSON.parse(String(init?.body ?? "{}"));
      const messages: any[] = [];
      if (input.system) messages.push({ role: "system", content: typeof input.system === "string" ? input.system : JSON.stringify(input.system) });
      for (const message of input.messages ?? []) {
        if (typeof message.content === "string") { messages.push({ role: message.role, content: message.content }); continue; }
        const blocks = message.content ?? [];
        if (message.role === "assistant") {
          const text = blocks.filter((b: any) => b.type === "text").map((b: any) => b.text).join("\n");
          const calls = blocks.filter((b: any) => b.type === "tool_use").map((b: any) => ({ id: b.id, type: "function", function: { name: b.name, arguments: JSON.stringify(b.input) } }));
          messages.push({ role: "assistant", content: text || null, ...(calls.length ? { tool_calls: calls } : {}) });
        } else {
          const content = blocks.flatMap((b: any) => {
            if (b.type === "text") return [{ type: "text", text: b.text }];
            if (b.type === "image" && b.source?.type === "base64") return [{ type: "image_url", image_url: { url: `data:${b.source.media_type};base64,${b.source.data}` } }];
            if (b.type === "image" && b.source?.type === "url") return [{ type: "image_url", image_url: { url: b.source.url } }];
            return [];
          });
          if (content.length) messages.push({ role: "user", content });
          for (const block of blocks.filter((b: any) => b.type === "tool_result"))
            messages.push({ role: "tool", tool_call_id: block.tool_use_id, content: typeof block.content === "string" ? block.content : JSON.stringify(block.content) });
        }
      }
      const body = {
        model: input.model, messages, max_tokens: input.max_tokens, temperature: typeof input.temperature === "number" ? input.temperature : 0.35,
        ...(input.tools?.length ? { tools: input.tools.map((tool: any) => ({ type: "function", function: { name: tool.name, description: tool.description, parameters: tool.input_schema } })), tool_choice: input.tool_choice?.type === "tool" ? { type: "function", function: { name: input.tool_choice.name } } : "auto" } : {}),
      };
      const response = await fetch(`${base}/chat/completions`, {
        method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, body: JSON.stringify(body), signal: init?.signal,
      });
      if (!response.ok) return Response.json({ type: "error", error: { type: "api_error", message: `AI Agent provider returned ${response.status}.` } }, { status: response.status });
      const result = await response.json() as any;
      const choice = result.choices?.[0], message = choice?.message;
      if (!message) return Response.json({ type: "error", error: { type: "api_error", message: "AI Agent returned no response." } }, { status: 502 });
      const content: any[] = [];
      if (typeof message.content === "string" && message.content) content.push({ type: "text", text: message.content });
      for (const call of message.tool_calls ?? []) {
        let args: unknown;
        try { args = JSON.parse(call.function?.arguments ?? "{}"); } catch { args = { __invalid_tool_json: true }; }
        content.push({ type: "tool_use", id: call.id, name: call.function?.name, input: args });
      }
      return Response.json({ id: result.id || "agent-message", type: "message", role: "assistant", model: input.model, content,
        stop_reason: content.some(b => b.type === "tool_use") ? "tool_use" : choice.finish_reason === "length" ? "max_tokens" : "end_turn",
        stop_sequence: null, usage: { input_tokens: result.usage?.prompt_tokens ?? 0, output_tokens: result.usage?.completion_tokens ?? 0 } });
    },
  });
}
