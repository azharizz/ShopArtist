import type { AssetDefinition } from "./types.js";
import type { AssetRenderContext } from "../asset-render-context.js";

export default {
  "id": "art-wall",
  "label": "Gallery display",
  "width": 1.8,
  "heightApprox": 2.16,
  "depth": 0.55,
  "description": "Freestanding panel with two framed abstract artworks and support feet.",
  "function": "Present artwork and divide a gallery area.",
  "moodTags": [
    "artistic",
    "gallery",
    "expressive"
  ],
  "coloring": "Panel and frames follow the room style; one artwork follows the room accent. The remaining artwork colors are fixed.",
  "visualReference": "/asset-catalog.html#art-wall",
  "implementation": "shared/assets/art-wall.ts",
  "focus": "art"
} satisfies AssetDefinition;

export function renderAsset(ctx: AssetRenderContext) {
  const { group, w, d, wood, frame, accent, box, label } = ctx;

          box(w, 2.15, 0.09, 0, 1.08, 0, wood, group);
          for (const x of [-0.7, 0.7])
            box(0.13, 0.07, d, x, 0.04, 0, frame, group);
          for (let i = 0; i < 2; i++) {
            box(0.72, 1.12, 0.08, -0.43 + i * 0.86, 1.3, 0.09, frame, group);
            const artwork = label(
              i ? "form / 02" : "colour / 01",
              "ORIGINAL STUDIES",
              0.63,
              1.02,
              i ? accent : "#c9856d",
            );
            artwork.position.set(-0.43 + i * 0.86, 1.3, 0.14);
            group.add(artwork);
            box(
              0.27,
              0.28,
              0.016,
              -0.43 + i * 0.86,
              1.49,
              0.16,
              i ? "#f1e5c9" : "#526c70",
              group,
            ).rotation.z = 0.45;
          }
}
