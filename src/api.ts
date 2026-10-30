import type { StoreState, Validation, Move, Plan } from "../shared/types";
export interface StateResponse {
  state: StoreState;
  proposalIds?: string[];
  planId?: string;
  imported?: number;
}
export interface PlanResponse {
  plan: Plan;
  validation: Validation;
  moves: Move[];
  roomMoves: { label: string; instruction: string }[];
}
let activeProject: string | undefined;
export async function api<T>(path: string, body?: unknown): Promise<T> {
  const response = await fetch(`/api${path}`, {
    method: body === undefined ? "GET" : "POST",
    headers: {
      ...(body === undefined ? {} : { "Content-Type": "application/json" }),
      ...(activeProject ? { "X-Project-Id": activeProject } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const payload = await response.json();
  if (!response.ok)
    throw new Error(
      [payload.error || "Request failed.", ...(payload.errors || [])].join(
        "\n",
      ),
    );
  if (payload.state?.projectId) activeProject = payload.state.projectId;
  return payload as T;
}

export interface ProgressEvent {
  phase: string;
  label: string;
  detail?: string;
  status: "active" | "done" | "warn";
}
/**
 * POSTs and reads a text/event-stream, calling onProgress per `progress` event and
 * resolving on the named result event. Falls back to a plain JSON response when the
 * server does not stream, so an older/proxied server still works.
 */
export async function apiStream<T>(
  path: string,
  body: unknown,
  onProgress: (event: ProgressEvent) => void,
  signal?: AbortSignal,
  resultEvent = "study",
  isValidResult: (payload: unknown) => boolean = payload =>
    !!payload && typeof payload === "object" &&
    Array.isArray((payload as { directions?: unknown }).directions) &&
    !!(payload as { research?: unknown }).research,
): Promise<T> {
  const response = await fetch(`/api${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
      ...(activeProject ? { "X-Project-Id": activeProject } : {}),
    },
    body: JSON.stringify(body),
    signal,
  });
  if (!response.ok || !response.body?.getReader) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(
      [payload.error || "Request failed.", ...(payload.errors || [])].join("\n"),
    );
  }
  const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
  if (contentType.includes("application/json")) {
    const payload = await response.json();
    if (payload?.error) throw new Error(payload.error);
    if (!isValidResult(payload)) {
      throw new Error("The server returned an unexpected response. Restart the app and try again.");
    }
    if (payload?.state?.projectId) activeProject = payload.state.projectId;
    return payload as T;
  }
  if (!contentType.includes("text/event-stream")) {
    throw new Error("The research server did not return a stream. Restart the app and try again.");
  }
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let result: T | null = null;
  let failure = "";
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const frames = buffer.split(/\r?\n\r?\n/);
    buffer = frames.pop() ?? "";
    for (const frame of frames) {
      const event = /^event:\s*(.+?)\s*$/m.exec(frame)?.[1];
      const raw = frame
        .split(/\r?\n/)
        .filter((line) => line.startsWith("data:"))
        .map((line) => line.slice(5).replace(/^ /, ""))
        .join("\n");
      if (!event || !raw) continue;
      const data = JSON.parse(raw);
      if (event === "progress") onProgress(data as ProgressEvent);
      else if (event === resultEvent) {
        if (data?.state?.projectId) activeProject = data.state.projectId;
        result = data as T;
      } else if (event === "failed") failure = data.error;
    }
  }
  if (failure) throw new Error(failure);
  if (!result) throw new Error("The research connection ended before the design was ready. Please retry; if it happens again, restart the server.");
  return result;
}
