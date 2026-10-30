import assert from "node:assert/strict";
import { test } from "node:test";
import { buildDirectionAsset } from "./design-build.js";
import { fixtureCatalog, createRoom, fixturesOverlap, validateRoom } from "../shared/room.js";
import type { AssetDefinition } from "../shared/assets/types.js";
import type { DesignStudy, DesignDirection } from "../shared/research.js";
import { seed } from "./seed.js";

const asset: AssetDefinition = { id: "generated-00000000-0000-4000-8000-000000000001", label: "Featured books display", description: "A small book display", function: "Display featured books", moodTags: ["cozy"], width: 0.8, depth: 0.8, heightApprox: 1, coloring: "Room accent", visualReference: "/asset-catalog.html#custom", implementation: "shared/generated-assets.ts", geometry: [{ shape: "box", width: .8, depth: .8, height: 1, x: 0, y: .5, z: 0, color: "accent" }] };
const direction: DesignDirection = { id: "direction", name: "Cozy reading", description: "A warm space", evidence: [{ id: "tag", name: "Charming", type: "tag" }], room: createRoom(["books", "coffee"], "modern"), changes: [], assetIdea: { brief: "A small display for featured books", reason: "Gives readers a place to discover books", referenceId: "bench" } };
const study = { brief: { direction: "Romantic bookshop and cafe", purpose: "Books and coffee" } } as DesignStudy;
const shelves = seed().shelves;

test("building a direction creates a referenced fixture, places it and leaves the proposal untouched", async () => {
  const before = structuredClone(direction);
  const create = async (request: string, reference: AssetDefinition | undefined, save: (asset: AssetDefinition) => void) => {
    assert.match(request, /Romantic bookshop and cafe/); assert.match(request, /Charming/); assert.equal(reference?.id, "bench");
    save(asset); return { asset, optimizedBrief: "Test", test: { meshes: 1, width: .8, depth: .8, height: 1 } };
  };
  const result = await buildDirectionAsset(study, direction, shelves, Object.values(fixtureCatalog), create);
  assert.equal(result.asset?.id, asset.id);
  const fixture = result.direction.room.fixtures.find(item => item.kind === asset.id)!;
  assert.ok(fixture); assert.deepEqual(fixture.asset, asset);
  assert.ok(result.direction.room.fixtures.filter(item => item.id !== fixture.id).every(item => !fixturesOverlap(item, fixture, shelves)));
  assert.deepEqual(validateRoom(result.direction.room, shelves), []);
  assert.deepEqual(direction, before);
});

test("failed or unplaceable generation does not change the direction", async () => {
  const before = structuredClone(direction);
  const failure = async (): ReturnType<typeof import("./asset-creator.js").createAssetWithAgent> => { throw new Error("Generation failed"); };
  await assert.rejects(buildDirectionAsset(study, direction, shelves, Object.values(fixtureCatalog), failure), /Generation failed/);
  const create = async (_request: string, _reference: AssetDefinition | undefined, save: (asset: AssetDefinition) => void) => {
    const oversized = { ...asset, width: 25 }; save(oversized); return { asset: oversized, optimizedBrief: "Test", test: { meshes: 1, width: 25, depth: .8, height: 1 } };
  };
  await assert.rejects(buildDirectionAsset(study, direction, shelves, Object.values(fixtureCatalog), create), /did not fit/);
  assert.deepEqual(direction, before);
  await assert.rejects(buildDirectionAsset(study, direction, shelves, [], create), /reference is no longer/);
  assert.equal((await buildDirectionAsset(study, { ...direction, assetIdea: undefined }, shelves, [], create)).asset, undefined);
});
