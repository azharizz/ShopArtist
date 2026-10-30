import type { AssetDefinition } from "./types.js";

export default {
  "label": "Two Person Cafe Table Set",
  "description": "Small square table with two opposing cafe seats.",
  "function": "Use as a two person cafe table set in a coffee shop layout.",
  "moodTags": [
    "coffee",
    "person",
    "cafe",
    "table"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 0.75,
      "height": 0.08,
      "depth": 0.7,
      "x": 0,
      "y": 0.75,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.71,
      "depth": 0.06,
      "x": -0.295,
      "y": 0.355,
      "z": -0.26999999999999996,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.71,
      "depth": 0.06,
      "x": -0.295,
      "y": 0.355,
      "z": 0.26999999999999996,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.71,
      "depth": 0.06,
      "x": 0.295,
      "y": 0.355,
      "z": -0.26999999999999996,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.71,
      "depth": 0.06,
      "x": 0.295,
      "y": 0.355,
      "z": 0.26999999999999996,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.32,
      "height": 0.08,
      "depth": 0.32,
      "x": -0.68,
      "y": 0.45,
      "z": 0,
      "color": "accent"
    },
    {
      "shape": "cylinder",
      "width": 0.05,
      "height": 0.41000000000000003,
      "depth": 0.05,
      "x": -0.68,
      "y": 0.20500000000000002,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.28,
      "height": 0.04,
      "depth": 0.28,
      "x": -0.68,
      "y": 0.02,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.32,
      "height": 0.08,
      "depth": 0.32,
      "x": 0.68,
      "y": 0.45,
      "z": 0,
      "color": "accent"
    },
    {
      "shape": "cylinder",
      "width": 0.05,
      "height": 0.41000000000000003,
      "depth": 0.05,
      "x": 0.68,
      "y": 0.20500000000000002,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.28,
      "height": 0.04,
      "depth": 0.28,
      "x": 0.68,
      "y": 0.02,
      "z": 0,
      "color": "frame"
    }
  ],
  "id": "generated-013a1077-ba29-47a4-a56e-09f91c72175a",
  "width": 1.68,
  "depth": 0.7,
  "heightApprox": 0.79,
  "coloring": "Room-linked colors: wood, frame, accent. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-013a1077-ba29-47a4-a56e-09f91c72175a",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/two-person-cafe-table-set.ts"
} satisfies AssetDefinition;
