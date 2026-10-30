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
