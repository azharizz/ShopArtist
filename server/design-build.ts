import { randomUUID } from "node:crypto";
import { fixtureSize, fixturesOverlap, validateRoom, type Fixture } from "../shared/room.js";
import type { DesignDirection, DesignStudy } from "../shared/research.js";
import type { AssetDefinition } from "../shared/assets/types.js";
import { assessCirculation } from "../shared/room-circulation.js";
import type { Shelf } from "../shared/types.js";
import { createAssetWithAgent, type AssetProgress } from "./asset-creator.js";

export async function buildDirectionAsset(study: DesignStudy, direction: DesignDirection, shelves: Shelf[], catalog: AssetDefinition[], create = createAssetWithAgent, generate = true, onProgress: AssetProgress = () => {}) {
  const report: AssetProgress = event => { try { onProgress(event); } catch {} };
  if (!generate || !direction.assetIdea) {
    report({ phase: "place", label: "Opening your shop", detail: "No custom fixture for this direction", status: "done" });
    return { direction, asset: undefined };
  }
  const reference = direction.assetIdea.referenceId ? catalog.find(item => item.id === direction.assetIdea!.referenceId) : undefined;
  if (direction.assetIdea.referenceId && !reference) throw new Error("The fixture reference is no longer in your catalog. Research the direction again.");
  const idea = direction.assetIdea;
  const evidence = direction.evidence.map(item => item.name).join(", ");
  const request = `Shop concept: ${study.brief.direction || study.brief.purpose}. Design direction: ${direction.name}. Relevant taste cues: ${evidence}. Create one compact fixture: ${idea.brief}. Purpose: ${idea.reason}. Aim for a footprint of at most 1.5 by 1.5 metres and a height under 2 metres; keep it usable in this shop.`;
  let saved: AssetDefinition | undefined;
  report({ phase: "fixture", label: "Commissioning a custom fixture", detail: idea.brief.slice(0, 110), status: "active" });
  const result = await create(request, reference, asset => { saved = asset; }, undefined, report);
  const asset = result.asset;
  if (!saved || saved.id !== asset.id || !asset.geometry) throw new Error("The new fixture could not be validated. Try building the direction again.");
  const room = structuredClone(direction.room);
  if (room.fixtures.length >= 40) throw new Error("There is no room for another fixture in this design.");
  const base: Fixture = { id: randomUUID(), kind: asset.id as `generated-${string}`, label: asset.label, x: 0, z: 0, rotation: 0, asset };
  const size = fixtureSize(base, shelves);
  const candidates: { x: number; z: number }[] = [];
  for (let x = -room.width / 2 + size.width / 2; x <= room.width / 2 - size.width / 2 + 1e-6; x += 0.5)
    for (let z = -room.depth / 2 + size.depth / 2; z <= room.depth / 2 - size.depth / 2 + 1e-6; z += 0.5)
      candidates.push({ x: Math.round(x * 100) / 100, z: Math.round(z * 100) / 100 });
  const target = { x: idea.x ?? 0, z: idea.z ?? 0 };
  candidates.sort((a, b) => (a.x - target.x) ** 2 + (a.z - target.z) ** 2 - (b.x - target.x) ** 2 - (b.z - target.z) ** 2);
  const baseline = assessCirculation(room, shelves);
  const position = candidates.find(({ x, z }) => {
    const fixture = { ...base, x, z };
    const next = { ...room, fixtures: [...room.fixtures, fixture] };
    return !room.fixtures.some(other => fixturesOverlap(other, fixture, shelves)) && !validateRoom(next, shelves).length && (baseline.entranceBlocked || !assessCirculation(next, shelves).entranceBlocked);
  });
  if (!position) { report({ phase: "place", label: "Placing the fixture", detail: "It did not fit without overlapping", status: "warn" }); throw new Error("The generated fixture did not fit in the shop without overlapping another fixture. Try a different direction."); }
  room.fixtures.push({ ...base, ...position });
  report({ phase: "place", label: "Placing the fixture", detail: `${asset.label} at ${position.x}, ${position.z} m`, status: "done" });
  return { asset, direction: { ...direction, room, circulation: assessCirculation(room, shelves), changes: [...direction.changes, `${asset.label}: ${idea.reason}${idea.x !== undefined && idea.z !== undefined ? ` (placed at ${position.x}, ${position.z} m; requested ${idea.x}, ${idea.z} m)` : ""}`] } };
}
