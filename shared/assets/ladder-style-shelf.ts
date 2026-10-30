import type { AssetDefinition } from "./types.js";

export default {
  "label": "Ladder Style Shelf",
  "description": "A stepped open shelf with progressively shallower upper tiers and slim rails.",
  "function": "Display small books and plants along a wall.",
  "moodTags": [
    "airy",
    "modern",
    "natural"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.05,
      "height": 0.1,
      "depth": 0.52,
      "x": 0,
      "y": 0.05,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.05,
      "height": 1.86,
      "depth": 0.05,
      "x": -0.48,
      "y": 1.03,
      "z": -0.2,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.05,
      "height": 1.86,
      "depth": 0.05,
      "x": 0.48,
      "y": 1.03,
      "z": -0.2,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.91,
      "height": 0.06,
      "depth": 0.48,
      "x": 0,
      "y": 0.36,
      "z": 0.04999999999999999,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.91,
      "height": 0.06,
      "depth": 0.41,
      "x": 0,
      "y": 0.72,
      "z": 0.014999999999999986,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.91,
      "height": 0.06,
      "depth": 0.33999999999999997,
      "x": 0,
      "y": 1.08,
      "z": -0.020000000000000018,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.91,
      "height": 0.06,
      "depth": 0.26999999999999996,
      "x": 0,
      "y": 1.44,
      "z": -0.05500000000000002,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.91,
      "height": 0.06,
      "depth": 0.19999999999999996,
      "x": 0,
      "y": 1.8,
      "z": -0.09000000000000002,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.95,
      "height": 0.06,
      "depth": 0.05,
      "x": 0,
      "y": 1.97,
      "z": -0.2,
      "color": "frame"
    }
  ],
  "id": "generated-048a6f45-547e-4071-88a0-6a0f2656fdc5",
  "width": 1.05,
  "depth": 0.58,
  "heightApprox": 2,
  "coloring": "Room-linked colors: frame, wood. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-048a6f45-547e-4071-88a0-6a0f2656fdc5",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/ladder-style-shelf.ts"
} satisfies AssetDefinition;
