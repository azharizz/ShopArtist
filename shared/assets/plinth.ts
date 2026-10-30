import type { AssetDefinition } from "./types.js";
import * as THREE from "three";
import type { AssetRenderContext } from "../asset-render-context.js";

export default {
  "id": "plinth",
  "label": "Display plinth",
  "width": 0.8,
  "heightApprox": 1.4,
  "depth": 0.8,
  "description": "Square pedestal topped with a small abstract loop sculpture.",
  "function": "Highlight an object or artwork.",
  "moodTags": [
    "gallery",
    "sculptural",
    "minimal"
  ],
  "coloring": "Pedestal follows the room style furniture color; sculpture follows the room accent.",
  "visualReference": "/asset-catalog.html#plinth",
  "implementation": "shared/assets/plinth.ts"
} satisfies AssetDefinition;

export function renderAsset(ctx: AssetRenderContext) {
  const { group, wood, accent, box, geometries, materials } = ctx;


          box(0.7, 0.8, 0.7, 0, 0.4, 0, wood, group);
          const geometry = new THREE.TorusKnotGeometry(0.18, 0.055, 48, 8),
            material = new THREE.MeshStandardMaterial({
              color: accent,
              metalness: 0.5,
              roughness: 0.3,
            });
          geometries.push(geometry);
          materials.push(material);
          const sculpture = new THREE.Mesh(geometry, material);
          sculpture.position.y = 1.1;
          sculpture.castShadow = true;
          group.add(sculpture);

}
