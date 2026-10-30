import * as THREE from "three";
import type { AssetRenderContext } from "./context";

export function renderAsset(ctx: AssetRenderContext) {
  const { fixture, room, shelves, placements, products, selected, editMode, group, w, d, wood, frame, accent, box, round, label, geometries, materials, productMeshes } = ctx;

          round(0.47, 0.07, 0, 0.78, 0, wood, group);
          round(0.09, 0.72, 0, 0.37, 0, frame, group);
          round(0.3, 0.055, 0, 0.035, 0, frame, group);
          for (const x of [-0.62, 0.62]) {
            round(0.17, 0.09, x, 0.47, 0, accent, group);
            for (const dz of [-0.1, 0.1])
              box(0.045, 0.45, 0.045, x, 0.23, dz, frame, group);
            box(0.07, 0.5, 0.3, x, 0.67, 0, accent, group);
          }
          round(0.055, 0.1, 0.17, 0.87, 0.1, "#f5eee1", group);
          round(0.055, 0.1, -0.17, 0.87, -0.1, "#f5eee1", group);
}
