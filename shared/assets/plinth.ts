import type { AssetDefinition } from "./types.js";

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
  "implementation": "src/assets/plinth.ts"
} satisfies AssetDefinition;
