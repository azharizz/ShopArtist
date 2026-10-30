import type { AssetDefinition } from "./types.js";

export default {
  "label": "Pedestal Bistro Table",
  "description": "Round tabletop on a slender pedestal and weighted foot.",
  "function": "Use as a pedestal bistro table in a coffee shop layout.",
  "moodTags": [
    "coffee",
    "pedestal",
    "bistro",
    "table"
  ],
  "geometry": [
    {
      "shape": "cylinder",
      "width": 0.72,
      "height": 0.07,
      "depth": 0.72,
      "x": 0,
      "y": 0.75,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.07,
      "height": 0.7,
      "depth": 0.07,
      "x": 0,
      "y": 0.35,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.38,
      "height": 0.05,
      "depth": 0.38,
      "x": 0,
      "y": 0.025,
      "z": 0,
      "color": "frame"
    }
  ],
  "id": "generated-5076d70c-b310-4fb3-9c86-5d6cee29fd48",
  "width": 0.72,
  "depth": 0.72,
  "heightApprox": 0.79,
  "coloring": "Room-linked colors: frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-5076d70c-b310-4fb3-9c86-5d6cee29fd48",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/pedestal-bistro-table.ts"
} satisfies AssetDefinition;
