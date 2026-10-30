import * as THREE from "three";
import type { AssetRenderContext } from "./context";

export function renderAsset(ctx: AssetRenderContext) {
  const { fixture, room, shelves, placements, products, selected, editMode, group, w, d, wood, frame, accent, box, round, label, geometries, materials, productMeshes } = ctx;

          box(
            w - 0.08,
            0.94,
            d - 0.08,
            0,
            0.47,
            0,
            fixture.kind === "coffee-bar" ? wood : accent,
            group,
          );
          box(
            w,
            0.1,
            d,
            0,
            1,
            0,
            room.style === "industrial" ? frame : wood,
            group,
          );
          for (let x = -w / 2 + 0.15; x < w / 2; x += 0.15)
            box(0.023, 0.8, 0.024, x, 0.47, d / 2 - 0.025, frame, group);

            box(0.85, 0.42, 0.5, -0.3, 1.26, -0.03, frame, group);
            box(0.83, 0.08, 0.54, -0.3, 1.48, -0.03, "#b8c3c4", group);
            for (const x of [-0.55, -0.14]) {
              round(0.075, 0.11, x, 1.12, 0.27, "#eee8db", group);
              box(0.045, 0.1, 0.09, x, 1.32, 0.26, "#c3cac8", group);
            }
            for (let i = 0; i < 3; i++)
              round(0.065, 0.11, 0.45 + i * 0.16, 1.1, 0.05, "#f4efde", group);
}
