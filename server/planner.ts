import { randomUUID } from "node:crypto";
import {
  samePlacement,
  themes,
  type StoreState,
  type Placement,
  type Plan,
  type Validation,
  type ThemeId,
  type Move,
} from "../shared/types.js";
import { fixtureEvidence } from "./culture.js";

export function validate(
  state: StoreState,
  placements: Placement[],
  base: Placement[],
  locks: Placement[] = [],
  maxMoves = 500,
): Validation {
  const errors: string[] = [];
  const used: Record<string, number> = Object.fromEntries(
    state.shelves.map((s) => [s.id, 0]),
  );
  const seen = new Set<string>();
  const slots = new Set<string>();
  for (const p of placements) {
    const product = state.products.find((s) => s.id === p.sku);
    const shelf = state.shelves.find((s) => s.id === p.shelf);
    if (!product || !shelf) {
      errors.push(`Unknown product or shelf: ${p.sku} / ${p.shelf}.`);
      continue;
    }
    if (seen.has(p.sku)) errors.push(`${p.sku} is placed more than once.`);
    if (
      !Number.isInteger(p.facings) ||
      p.facings < 1 ||
      p.facings > product.stock
    )
      errors.push(
        `${p.sku}: facings must be between 1 and available stock (${product.stock}).`,
      );
    if (
      !Number.isInteger(p.position) ||
      p.position < 0 ||
      p.position > 499 ||
      slots.has(`${p.shelf}:${p.position}`)
    )
      errors.push(`${p.sku}: display position is invalid or occupied.`);
    if (product.height > shelf.height || product.depth > shelf.depth)
      errors.push(`${p.sku} is too tall or deep for ${shelf.name}.`);
    if (!product.zones.includes(shelf.zone))
      errors.push(`${p.sku} is not permitted in the ${shelf.zone} zone.`);
    used[p.shelf] += product.width * p.facings;
    seen.add(p.sku);
    slots.add(`${p.shelf}:${p.position}`);
  }
  for (const shelf of state.shelves)
    if (used[shelf.id] > shelf.width + 1e-8)
      errors.push(
        `${shelf.name} exceeds width by ${(used[shelf.id] - shelf.width).toFixed(1)} cm.`,
      );
  for (const p of locks)
    if (
      !samePlacement(
        p,
        placements.find((q) => q.sku === p.sku),
      )
    )
      errors.push(
        `${p.sku} is locked to shelf ${p.shelf}, position ${p.position + 1}.`,
      );
  const ids = new Set([...base, ...placements].map((p) => p.sku));
  const moves = [...ids].filter(
    (id) =>
      !samePlacement(
        base.find((p) => p.sku === id),
        placements.find((p) => p.sku === id),
      ),
  ).length;
  if (moves > maxMoves)
    errors.push(
      `Movement budget exceeded: ${moves} changes, maximum ${maxMoves}.`,
    );
  return { valid: errors.length === 0, errors, moves, used };
}

export function score(state: StoreState, plan: Plan): Plan["components"] {
  const current =
    state.plans.find((p) => p.id === plan.parentId)?.placements ?? [];
  const placed = plan.placements.map(
    (p) => state.products.find((s) => s.id === p.sku)!,
  );
  const mapped = state.products.filter(
    (p) => p.stock > 0 && p.mapping.status === "approved",
  );
  const evidence = plan.evidence.filter((e) =>
    plan.placements.some((p) => p.sku === e.sku),
  );
  // Cultural adjacency is an authored fixture proxy: mean pairwise strength within each shelf.
  const pairs: number[] = [];
  for (const shelf of state.shelves) {
    const values = plan.placements
      .filter((p) => p.shelf === shelf.id)
      .flatMap((p) =>
        evidence.filter((e) => e.sku === p.sku).map((e) => e.affinity),
      );
    for (let i = 0; i < values.length; i++)
      for (let j = i + 1; j < values.length; j++)
        pairs.push(Math.min(values[i], values[j]));
  }
  const culture =
    plan.variant === "fixture" && pairs.length
      ? pairs.reduce((a, b) => a + b, 0) / pairs.length
      : null;
  const coverage = mapped.length
    ? placed.filter((p) => p.mapping.status === "approved").length /
      mapped.length
    : 0;
  const diversity =
    state.shelves.reduce(
      (n, s) =>
        n +
        new Set(
          plan.placements
            .filter((p) => p.shelf === s.id)
            .map((p) => state.products.find((i) => i.id === p.sku)!.category),
        ).size /
          4,
      0,
    ) / state.shelves.length;
  const priority =
    placed.reduce((n, p) => n + p.priority, 0) / Math.max(placed.length, 1);
  const movement =
    validate(state, plan.placements, current).moves /
    Math.max(state.products.length, 1);
  return {
    culture,
    coverage,
    diversity,
    priority,
    movement,
    utility:
      0.4 * (culture ?? 0) +
      0.2 * coverage +
      0.1 * diversity +
      0.2 * priority -
      0.1 * movement,
  };
}

export function generate(
  state: StoreState,
  theme: ThemeId,
  maxMoves: number,
  locks: Placement[] = [],
): Plan[] {
  const base = state.plans.find((p) => p.id === state.currentId)!;
  const runId = randomUUID();
  const variants =
    state.provider === "fixture"
      ? (["fixture", "fixture", "baseline"] as const)
      : (["baseline"] as const);
  return variants.map((variant, v) => {
    const selectedTheme =
      variant === "fixture" && v === 1
        ? themes[(themes.findIndex((t) => t.id === theme) + 1) % themes.length]
            .id
        : theme;
    const evidence =
      variant === "fixture"
        ? fixtureEvidence(state.products, selectedTheme, runId)
        : [];
    let desired: Placement[] = locks.map((p) => ({ ...p }));
    const rejected: Plan["rejected"] = [];
    const candidates = state.products
      .filter((p) => !locks.some((l) => l.sku === p.id))
      .sort((a, b) => {
        const av =
          variant === "fixture"
            ? (evidence.find((e) => e.sku === a.id)?.affinity ?? 0) +
              a.priority * 0.2
            : a.priority;
        const bv =
          variant === "fixture"
            ? (evidence.find((e) => e.sku === b.id)?.affinity ?? 0) +
              b.priority * 0.2
            : b.priority;
        return bv - av || a.id.localeCompare(b.id);
      });
    for (const product of candidates) {
      const category = ["Records", "Books", "Objects", "Stationery"].indexOf(
        product.category,
      );
      const affinity = evidence.find((e) => e.sku === product.id)?.affinity;
      const preferred =
        variant === "baseline"
          ? category
          : affinity === undefined
            ? category
            : affinity >= 0.9
              ? 0
              : affinity >= 0.6
                ? 1
                : affinity >= 0.5
                  ? 2
                  : 3;
      const shelves = [
        ...state.shelves.slice(preferred),
        ...state.shelves.slice(0, preferred),
      ];
      let reason = "No available display space.";
      let placed = false;
      for (const shelf of shelves) {
        let position = 0;
        while (
          desired.some((p) => p.shelf === shelf.id && p.position === position)
        )
          position++;
        const next = { sku: product.id, shelf: shelf.id, position, facings: 1 };
        const result = validate(state, [...desired, next], [], locks);
        if (result.valid) {
          desired.push(next);
          placed = true;
          break;
        }
        reason = result.errors.join(" ");
      }
      if (!placed) rejected.push({ sku: product.id, reason });
    }
    if (!validate(state, desired, base.placements, locks, maxMoves).valid) {
      // Bounded greedy reconciliation; never relax constraints to spend the remaining move budget.
      let feasible = base.placements.map((p) => ({ ...p }));
      const initial = validate(
        state,
        feasible,
        base.placements,
        locks,
        maxMoves,
      );
      if (!initial.valid)
        throw new Error(
          "Locks conflict with the current layout or movement budget. Approve the edited layout first, or unlock those products.",
        );
      for (let pass = 0; pass < 3; pass++)
        for (const id of new Set([...feasible, ...desired].map((p) => p.sku))) {
          const target = desired.find((p) => p.sku === id);
          const trial = [
            ...feasible.filter((p) => p.sku !== id),
            ...(target ? [target] : []),
          ];
          if (validate(state, trial, base.placements, locks, maxMoves).valid)
            feasible = trial;
        }
      desired = feasible;
    }
    const result = validate(state, desired, base.placements, locks, maxMoves);
    if (!result.valid) throw new Error(result.errors.join(" "));
    const plan: Plan = {
      room: structuredClone(base.room),
      id: randomUUID(),
      name:
        variant === "baseline"
          ? "Category essentials"
          : themes.find((t) => t.id === selectedTheme)!.name,
      variant,
      theme: selectedTheme,
      status: "draft",
      parentId: base.id,
      revision: state.revision,
      createdAt: new Date().toISOString(),
      approvedAt: null,
      placements: desired,
      locks,
      maxMoves,
      evidence: evidence.filter((e) => desired.some((p) => p.sku === e.sku)),
      components: {
        culture: null,
        coverage: 0,
        diversity: 0,
        priority: 0,
        movement: 0,
        utility: 0,
      },
      runId,
      actor: null,
      trace: [
        "INGEST · catalog normalized",
        "RESOLVE · only owner-reviewed mappings used",
        state.provider === "fixture"
          ? "RESEARCH · synthetic fixtures, 0 Qloo calls"
          : "RESEARCH · provider unavailable; baseline only",
        "OPTIMIZE · deterministic greedy packing",
        `VALIDATE · ${result.moves} moves; all hard constraints passed`,
        "EXPLAIN · source-labeled evidence",
        "AWAIT_APPROVAL · digital store unchanged",
      ],
      rejected,
    };
    plan.components = score(state, plan);
    return plan;
  });
}

export function movesFor(state: StoreState, plan: Plan): Move[] {
  const before =
    state.plans.find((p) => p.id === plan.parentId)?.placements ?? [];
  const location = (p: Placement | undefined) =>
    p ? `Shelf ${p.shelf} / position ${p.position + 1}` : "Stockroom";
  return [...new Set([...before, ...plan.placements].map((p) => p.sku))]
    .sort()
    .flatMap((sku) => {
      const from = before.find((p) => p.sku === sku),
        to = plan.placements.find((p) => p.sku === sku);
      if (samePlacement(from, to)) return [];
      return [
        {
          sku,
          title: state.products.find((p) => p.id === sku)?.title ?? sku,
          from: location(from),
          to: location(to),
          facings: to?.facings ?? 0,
          instruction: !to
            ? "Return all displayed units to stockroom"
            : !from
              ? `Place ${to.facings} unit(s) from stockroom`
              : `Reposition; set ${to.facings} facing(s), returning or retrieving any difference`,
        },
      ];
    });
}
