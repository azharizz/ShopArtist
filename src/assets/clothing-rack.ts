import * as THREE from "three";
import type { AssetRenderContext } from "./context";

export function renderAsset(ctx: AssetRenderContext) {
  const { group, frame, accent, box } = ctx;

          for (const x of [-0.82, 0.82]) {
            box(0.07, 1.85, 0.07, x, 0.93, 0, frame, group);
            box(0.22, 0.06, 0.7, x, 0.04, 0, frame, group);
          }
          box(1.78, 0.055, 0.055, 0, 1.85, 0, frame, group);
          for (let i = 0; i < 6; i++) {
            const shirt = new THREE.Group();
            shirt.position.set(-0.64 + i * 0.25, 1.28, 0);
            shirt.rotation.y = Math.PI / 2;
            group.add(shirt);
            const color = [
              accent,
              "#d4bca8",
              "#ede7d8",
              "#556873",
              "#b98375",
              frame,
            ][i];
            box(0.33, 0.52, 0.07, 0, -0.08, 0, color, shirt);
            for (const sign of [-1, 1]) {
              const sleeve = box(
                0.13,
                0.25,
                0.07,
                sign * 0.21,
                0.05,
                0,
                color,
                shirt,
              );
              sleeve.rotation.z = sign * 0.5;
            }
            box(0.025, 0.22, 0.025, 0, 0.45, 0, frame, shirt);
          }
}
