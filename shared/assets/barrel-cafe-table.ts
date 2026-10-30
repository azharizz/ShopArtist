import type { AssetDefinition } from "./types.js";

export default {
  "label": "Barrel Cafe Table",
  "description": "A circular wooden tabletop on a wide barrel-like cylindrical base.",
  "function": "Provide a casual cafe table or display.",
  "moodTags": [
    "cafe",
    "rustic",
    "round"
  ],
  "geometry": [
    {
      "shape": "cylinder",
      "width": 0.55,
      "height": 0.66,
      "depth": 0.55,
      "x": 0,
      "y": 0.33,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "cylinder",
      "width": 0.58,
      "height": 0.05,
      "depth": 0.58,
      "x": 0,
      "y": 0.12,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.58,
      "height": 0.05,
      "depth": 0.58,
      "x": 0,
      "y": 0.54,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.86,
      "height": 0.08,
      "depth": 0.86,
      "x": 0,
      "y": 0.7,
      "z": 0,
      "color": "frame"
    }
  ],
  "id": "generated-e0832ddd-4b10-4a8b-8242-6421d8c7b5b6",
  "width": 0.86,
  "depth": 0.86,
  "heightApprox": 0.74,
  "coloring": "Room-linked colors: wood, frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-e0832ddd-4b10-4a8b-8242-6421d8c7b5b6",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/barrel-cafe-table.ts"
} satisfies AssetDefinition;
