import type { AssetDefinition } from "./types.js";

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
  "implementation": "src/assets/art-wall.ts",
  "focus": "art"
} satisfies AssetDefinition;
