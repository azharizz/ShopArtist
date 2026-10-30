import { fixtureSize, type RoomDesign } from "./room.js";
import type { Shelf } from "./types.js";

/** Approximate circulation on a 0.25 m grid with 0.35 m clearance around fixture footprints.
 * The editor's entrance is at the middle of the front edge (+z). This is not a code-compliance check. */
export function assessCirculation(room: RoomDesign, shelves: Shelf[]) {
  const step = .25, clearance = .35;
  const cols = Math.floor(room.width / step), rows = Math.floor(room.depth / step);
  const free = new Uint8Array(cols * rows);
  const bounds = room.fixtures.map(fixture => ({ fixture, ...fixtureSize(fixture, shelves) }));
  for (let z = 0; z < rows; z++) for (let x = 0; x < cols; x++) {
    const px = -room.width / 2 + (x + .5) * step, pz = -room.depth / 2 + (z + .5) * step;
    free[z * cols + x] = bounds.some(({ fixture, width, depth }) => Math.abs(px - fixture.x) < width / 2 + clearance && Math.abs(pz - fixture.z) < depth / 2 + clearance) ? 0 : 1;
  }
  const visited = new Uint8Array(free.length), queue: number[] = [];
  for (let x = 0; x < cols; x++) {
    const px = -room.width / 2 + (x + .5) * step, i = (rows - 1) * cols + x;
    if (Math.abs(px) <= .9 && free[i]) { queue.push(i); visited[i] = 1; }
  }
  for (let head = 0; head < queue.length; head++) {
    const i = queue[head], x = i % cols, z = Math.floor(i / cols);
    for (const [nx, nz] of [[x - 1, z], [x + 1, z], [x, z - 1], [x, z + 1]]) {
      if (nx < 0 || nx >= cols || nz < 0 || nz >= rows) continue;
      const next = nz * cols + nx;
      if (free[next] && !visited[next]) { visited[next] = 1; queue.push(next); }
    }
  }
  const freeCells = free.reduce((sum, value) => sum + value, 0);
  return { entranceBlocked: queue.length === 0, reachableFreeAreaPercent: freeCells ? Math.round(queue.length / freeCells * 100) : 0, clearanceMeters: clearance, gridMeters: step, note: "Approximate circulation using enlarged rectangular footprints; not an accessibility or building-code assessment." };
}
