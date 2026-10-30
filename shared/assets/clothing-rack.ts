import type { AssetDefinition } from "./types.js";

export default {
  "id": "clothing-rack",
  "label": "Clothing rack",
  "width": 1.8,
  "heightApprox": 1.88,
  "depth": 0.75,
  "description": "Freestanding rail with two supports and six simplified shirts.",
  "function": "Display clothing in a fashion or mixed-use shop.",
  "moodTags": [
    "fashion",
    "casual",
    "open"
  ],
  "coloring": "Frame follows the room style; one shirt follows the room accent and another follows the frame. Other shirt colors are fixed.",
  "visualReference": "/asset-catalog.html#clothing-rack",
  "implementation": "src/assets/clothing-rack.ts",
  "focus": "fashion"
} satisfies AssetDefinition;
