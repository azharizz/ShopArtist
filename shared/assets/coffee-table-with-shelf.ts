import type { AssetDefinition } from "./types.js";

export default {
  "label": "Coffee Table with Shelf",
  "description": "Low table with an open storage shelf beneath.",
  "function": "Use as a coffee table with shelf in a coffee shop layout.",
  "moodTags": [
    "coffee",
    "table",
    "shelf"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.05,
      "height": 0.08,
      "depth": 0.6,
      "x": 0,
      "y": 0.48,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.44,
      "depth": 0.06,
      "x": -0.445,
      "y": 0.22,
      "z": -0.21999999999999997,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.44,
      "depth": 0.06,
      "x": -0.445,
      "y": 0.22,
      "z": 0.21999999999999997,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.44,
      "depth": 0.06,
      "x": 0.445,
      "y": 0.22,
      "z": -0.21999999999999997,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.44,
      "depth": 0.06,
      "x": 0.445,
      "y": 0.22,
      "z": 0.21999999999999997,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.9,
      "height": 0.05,
      "depth": 0.48,
      "x": 0,
      "y": 0.2,
      "z": 0,
      "color": "wood"
    }
  ],
  "id": "generated-6046ac46-c370-4148-a5d0-7e1786b0b1b9",
  "width": 1.05,
  "depth": 0.6,
  "heightApprox": 0.52,
  "coloring": "Room-linked colors: wood, frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-6046ac46-c370-4148-a5d0-7e1786b0b1b9",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/coffee-table-with-shelf.ts"
} satisfies AssetDefinition;
