import type { ProgressEvent } from "./api";

export function reduceLog(current: ProgressEvent[], event: ProgressEvent): ProgressEvent[] {
  const kept = current.filter(item => item.phase !== "thinking");
  const open = event.status === "active" ? -1 : kept.findIndex(item => item.status === "active" && item.label === event.label);
  if (event.status === "warn") {
    const previous = kept.findLastIndex((item, i) => i !== open && item.status === "warn" && item.phase === event.phase && item.label === event.label && item.detail === event.detail);
    if (previous !== -1 && (open === -1 ? previous === kept.length - 1 : previous === open - 1)) {
      return kept.flatMap((item, i) => i === open ? [] : [i === previous ? { ...item, count: (item.count ?? 1) + 1 } : item]);
    }
  }
  if (open !== -1) return kept.map((item, i) => i === open ? event : item);
  return [...kept, event];
}
