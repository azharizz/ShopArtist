import type { AssetDefinition } from "./types.js";
import * as THREE from "three";
import type { AssetRenderContext } from "../asset-render-context.js";

export default {
  "id": "plant",
  "label": "Indoor plant",
  "width": 0.7,
  "heightApprox": 1.2,
  "depth": 0.7,
  "description": "Terracotta-colored pot with seven stylized green leaves.",
  "function": "Add a natural decorative accent.",
  "moodTags": [
    "natural",
    "relaxed",
    "green"
  ],
  "coloring": "Pot and leaves use fixed colors; neither follows the room accent or style palette.",
  "visualReference": "/asset-catalog.html#plant",
  "implementation": "shared/assets/plant.ts"
} satisfies AssetDefinition;

export function renderAsset(ctx: AssetRenderContext) {
  const { group, round, geometries, materials } = ctx;


          round(0.23, 0.45, 0, 0.23, 0, "#b77e60", group);
          for (let i = 0; i < 7; i++) {
            const geometry = new THREE.SphereGeometry(0.12, 8, 6),
              material = new THREE.MeshStandardMaterial({
                color: i % 2 ? "#637d55" : "#91a176",
              });
            geometries.push(geometry);
            materials.push(material);
            const leaf = new THREE.Mesh(geometry, material),
              a = i * 2.4;
            leaf.scale.set(0.6, 2.5, 0.35);
            leaf.rotation.set(Math.cos(a) * 0.5, a, Math.sin(a) * 0.6);
            leaf.position.set(
              Math.sin(a) * 0.16,
              0.72 + (i % 2) * 0.15,
              Math.cos(a) * 0.16,
            );
            group.add(leaf);
          }
}
