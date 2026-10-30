import test from "node:test";
import assert from "node:assert/strict";
import { seed } from "./seed.js";
import { generate, movesFor, validate } from "./planner.js";
import { themes } from "../shared/types.js";
import {
  createRoom,
  applyArrangement,
  roomPlacementWarnings,
  fixtureSize,
  interiorStyles,
  shopFocuses,
  validateRoom,
} from "../shared/room.js";

test("all taste lenses and baseline respect stock, dimensions, locks, movement budgets, and stable ordering", () => {
  for (const theme of themes)
    for (const budget of [0, 4, 12, 60]) {
      const state = seed();
      const current = state.plans[0];
      assert.equal(validate(state, current.placements, []).valid, true);
      const locks = current.placements.slice(0, 2);
      const plans = generate(state, theme.id, budget, locks);
      assert.equal(plans.length, 3);
      for (const plan of plans) {
        assert.deepEqual(
          validate(state, plan.placements, current.placements, locks, budget)
            .errors,
          [],
        );
        assert.deepEqual(
          plan.placements,
          generate(state, theme.id, budget, locks).find(
            (p) => p.name === plan.name,
          )!.placements,
        );
        assert.equal(plan.status, "draft");
        for (const evidence of plan.evidence) {
          assert.equal(
            state.products.find((p) => p.id === evidence.sku)!.mapping.status,
            "approved",
          );
          assert.match(evidence.entityId, /^demo:/);
          assert.equal(evidence.source, "synthetic-fixture");
        }
      }
      assert.equal(plans[2].components.culture, null);
      assert.deepEqual(plans[2].evidence, []);
      assert.equal(state.currentId, current.id);
      assert.equal(state.plans.length, 1);
    }
});

test("a changed taste changes fixture placements, while the baseline stays theme-independent", () => {
  const state = seed();
  const midnight = generate(state, "midnight", 60),
    quiet = generate(state, "quiet", 60);
  assert.notDeepEqual(midnight[0].placements, quiet[0].placements);
  assert.deepEqual(midnight[2].placements, quiet[2].placements);
  const unmapped = state.products.find(
    (p) => p.mapping.status === "unmapped" && p.stock > 0,
  )!;
  assert.ok(
    midnight.some((p) => p.placements.some((item) => item.sku === unmapped.id)),
  );
  assert.ok(
    midnight.every((p) => !p.evidence.some((e) => e.sku === unmapped.id)),
  );
  state.provider = "unavailable";
  const fallback = generate(state, "quiet", 60);
  assert.deepEqual(
    fallback.map((p) => p.variant),
    ["baseline"],
  );
  assert.equal(fallback[0].components.culture, null);
});

test("hard validator rejects impossible stock, width, height, depth, zones, duplicate slots and missing references", () => {
  const state = seed(),
    p = state.plans[0].placements[0];
  const product = state.products.find((product) => product.id === p.sku)!;
  const shelf = state.shelves.find((s) => s.id === p.shelf)!;
  assert.equal(
    validate(state, [{ ...p, facings: product.stock + 1 }], []).valid,
    false,
  );
  assert.equal(validate(state, [{ ...p, facings: 0 }], []).valid, false);
  assert.equal(validate(state, [{ ...p, facings: 1.5 }], []).valid, false);
  assert.equal(validate(state, [p, p], []).valid, false);
  assert.equal(validate(state, [{ ...p, sku: "missing" }], []).valid, false);
  assert.equal(validate(state, [{ ...p, shelf: "missing" }], []).valid, false);
  assert.equal(validate(state, [{ ...p, position: -1 }], []).valid, false);
  assert.equal(validate(state, [], [p], [p]).valid, false);
  assert.equal(validate(state, [], [p], [], 0).valid, false);
  for (const dimension of ["width", "height", "depth"] as const) {
    const original = shelf[dimension];
    shelf[dimension] = product[dimension] - 1;
    assert.equal(validate(state, [p], []).valid, false, dimension);
    shelf[dimension] = original;
  }
  product.zones = ["not-this-zone"];
  assert.equal(validate(state, [p], []).valid, false);
});

test("generated layouts remain feasible across deterministic varied inventory and capacity cases", () => {
  for (let run = 0; run < 20; run++) {
    const state = seed();
    state.plans[0].placements = [];
    state.shelves.forEach((s, i) => {
      s.width = 35 + ((run * 37 + i * 19) % 150);
      s.height = 20 + (run % 4) * 10;
    });
    state.products.forEach((p, i) => {
      p.stock = (run * 7 + i) % 9;
      p.width = 7 + ((i * 13 + run) % 35);
    });
    for (const plan of generate(state, themes[run % 4].id, run % 2 ? 12 : 60))
      assert.deepEqual(
        validate(state, plan.placements, [], [], plan.maxMoves).errors,
        [],
      );
  }
});

test("work order distinguishes stockroom removals, new displays, position changes and facings", () => {
  const state = seed();
  const old = state.plans[0];
  const plan = structuredClone(old);
  plan.id = "new";
  plan.parentId = old.id;
  const removed = plan.placements.shift()!;
  plan.placements[0].facings = 2;
  const changed = plan.placements[0].sku;
  const added = state.products.find(
    (p) => !old.placements.some((q) => q.sku === p.id),
  )!;
  plan.placements.push({
    sku: added.id,
    shelf: "A",
    position: 100,
    facings: 1,
  });
  const moves = movesFor(state, plan);
  assert.equal(moves.length, 3);
  assert.equal(moves.find((m) => m.sku === removed.sku)!.to, "Stockroom");
  assert.equal(moves.find((m) => m.sku === changed)!.facings, 2);
  assert.equal(moves.find((m) => m.sku === added.id)!.from, "Stockroom");
});

test("all shop mixes have feasible interiors; free placement retains bounds and shelf identity", () => {
  const { shelves } = seed();
  for (let mask = 1; mask < 1 << shopFocuses.length; mask++)
    for (const style of interiorStyles)
      for (const arrangement of ["perimeter", "islands", "gallery"] as const) {
        const focuses = shopFocuses.filter((_, i) => mask & (1 << i));
        assert.deepEqual(
          validateRoom(createRoom(focuses, style, arrangement), shelves),
          [],
          `${focuses}/${style}/${arrangement}`,
        );
      }
  const room = createRoom(["fashion", "art", "coffee", "books"]);
  const moved = structuredClone(room);
  moved.fixtures[0].x = room.width;
  assert.ok(
    validateRoom(moved, shelves).some((error) => error.includes("inside")),
  );
  moved.fixtures[0] = {
    ...room.fixtures[0],
    x: room.fixtures[1].x,
    z: room.fixtures[1].z,
  };
  assert.deepEqual(validateRoom(moved, shelves), [], "overlapping fixtures remain editable");
  assert.ok(roomPlacementWarnings(moved, shelves).some(w => w.includes("overlaps")));
  const cashier = room.fixtures.find((f) => f.kind === "cashier")!;
  assert.deepEqual(fixtureSize({ ...cashier, rotation: 90 }, shelves), {
    width: 0.85,
    depth: 1.8,
  });
  cashier.x = 0;
  cashier.z = 4.2;
  assert.deepEqual(validateRoom(room, shelves), [], "the entrance is not a locked exclusion zone");
  assert.ok(roomPlacementWarnings(room, shelves).some(w => w.includes("entrance")));
  const extra = { id: "extra", kind: "plant" as const, label: "My plant", x: 1.25, z: 0.5, rotation: 37 };
  room.fixtures.push(extra);
  assert.deepEqual(applyArrangement(room, shelves, "gallery").fixtures.find(f => f.id === "extra"), extra);
  const custom = createRoom(["other"]);
  custom.fixtures.push({ id: "rack", kind: "clothing-rack", label: "Display rack", x: 0, z: 0, rotation: 37 });
  assert.deepEqual(validateRoom(custom, shelves), [], "any shop can use any fixture at an arbitrary angle");
  const missing = createRoom();
  missing.fixtures = missing.fixtures.filter((f) => f.shelfId !== "A");
  assert.ok(
    validateRoom(missing, shelves).some((error) => error.includes("Shelf A")),
  );
});
