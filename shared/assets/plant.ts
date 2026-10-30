import type { AssetDefinition } from "./types.js";

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
  "implementation": "src/assets/plant.ts"
} satisfies AssetDefinition;
