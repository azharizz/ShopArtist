import assert from "node:assert/strict";
import test from "node:test";
import type { ProgressEvent } from "./api.js";

/** Mirrors the reducer in TasteStudio.research(): transient rows collapse. */
export function reduceLog(current: ProgressEvent[], event: ProgressEvent): ProgressEvent[] {
  const kept = current.filter(item => item.phase !== "thinking");
  if (event.status !== "active") {
    const open = kept.findIndex(item => item.status === "active" && item.label === event.label);
    if (open !== -1) return kept.map((item, i) => (i === open ? event : item));
  }
  return [...kept, event];
}

const run = (events: ProgressEvent[]) => events.reduce(reduceLog, [] as ProgressEvent[]);

test("a tool's result replaces its own active row instead of stacking", () => {
  const log = run([
    { phase: "taste", label: "Finding Qloo taste tags", status: "active" },
    { phase: "taste", label: "Finding Qloo taste tags", detail: "Romantic", status: "done" },
  ]);
  assert.equal(log.length, 1);
  assert.equal(log[0].status, "done");
  assert.equal(log[0].detail, "Romantic");
});

test("thinking ticks never accumulate", () => {
  const log = run([
    { phase: "thinking", label: "Agent step 1", status: "active" },
    { phase: "thinking", label: "Agent step 2", status: "active" },
    { phase: "thinking", label: "Agent step 3", status: "active" },
  ]);
  assert.equal(log.length, 1);
  assert.equal(log[0].label, "Agent step 3");
});

test("repeated calls of the same tool each keep their own row", () => {
  const log = run([
    { phase: "catalog", label: "Browsing the fixture catalog", status: "active" },
    { phase: "catalog", label: "Browsing the fixture catalog", detail: "1 assets seen", status: "done" },
    { phase: "catalog", label: "Browsing the fixture catalog", status: "active" },
    { phase: "catalog", label: "Browsing the fixture catalog", detail: "2 assets seen", status: "done" },
  ]);
  assert.equal(log.length, 2);
  assert.deepEqual(log.map(item => item.detail), ["1 assets seen", "2 assets seen"]);
});

test("a warn result resolves the active row and is kept", () => {
  const log = run([
    { phase: "research", label: "Reading cultural affinities", status: "active" },
    { phase: "research", label: "Reading cultural affinities", detail: "Retrying — …", status: "warn" },
    { phase: "research", label: "Reading cultural affinities", status: "active" },
    { phase: "research", label: "Reading cultural affinities", detail: "12 signals", status: "done" },
  ]);
  assert.deepEqual(log.map(item => item.status), ["warn", "done"]);
});
