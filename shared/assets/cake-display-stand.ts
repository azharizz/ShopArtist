import type { AssetDefinition } from "./types.js";

export default {
  "label": "Cake Display Stand",
  "description": "A central post supports three circular display tiers.",
  "function": "Use as a cake display stand in a coffee shop layout.",
  "moodTags": [
    "coffee",
    "cake",
    "stand"
  ],
  "geometry": [
    {
      "shape": "cylinder",
      "width": 0.55,
      "height": 0.08,
      "depth": 0.55,
      "x": 0,
      "y": 0.04,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.07,
      "height": 1.3,
      "depth": 0.07,
      "x": 0,
      "y": 0.73,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.7,
      "height": 0.06,
      "depth": 0.7,
      "x": 0,
      "y": 0.4,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.58,
      "height": 0.06,
      "depth": 0.58,
      "x": 0,
      "y": 0.8,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.45999999999999996,
      "height": 0.06,
      "depth": 0.45999999999999996,
      "x": 0,
      "y": 1.2,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.18,
      "height": 0.12,
      "depth": 0.18,
      "x": 0,
      "y": 1.29,
      "z": 0,
      "color": "#d8a8b7"
    }
  ],
  "id": "generated-31b494ec-8ee9-4164-a1c1-9dce250c22fc",
  "width": 0.7,
  "depth": 0.7,
  "heightApprox": 1.38,
  "coloring": "Room-linked colors: frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-31b494ec-8ee9-4164-a1c1-9dce250c22fc",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/cake-display-stand.ts"
} satisfies AssetDefinition;
