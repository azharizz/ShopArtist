import type { AssetDefinition } from "./types.js";

export default {
  "label": "Modern Floating Look Shelf",
  "description": "A thin dark frame supporting open shelves with a floating appearance.",
  "function": "Display books and objects with an airy profile.",
  "moodTags": [
    "books",
    "modern",
    "minimal"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.5,
      "height": 0.08,
      "depth": 0.38,
      "x": 0,
      "y": 0.04,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.04,
      "height": 1.75,
      "depth": 0.04,
      "x": -0.7,
      "y": 0.955,
      "z": -0.15,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.04,
      "height": 1.75,
      "depth": 0.04,
      "x": 0.7,
      "y": 0.955,
      "z": -0.15,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.42,
      "height": 0.05,
      "depth": 0.35,
      "x": 0,
      "y": 0.34,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.42,
      "height": 0.05,
      "depth": 0.35,
      "x": 0,
      "y": 0.68,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.42,
      "height": 0.05,
      "depth": 0.35,
      "x": 0,
      "y": 1.02,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.42,
      "height": 0.05,
      "depth": 0.35,
      "x": 0,
      "y": 1.36,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.42,
      "height": 0.05,
      "depth": 0.35,
      "x": 0,
      "y": 1.7,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.44,
      "height": 0.05,
      "depth": 0.05,
      "x": 0,
      "y": 1.85,
      "z": -0.15,
      "color": "frame"
    }
  ],
  "id": "generated-dfc83d53-1f0d-462f-9bdf-e97fa33b2723",
  "width": 1.5,
  "depth": 0.38,
  "heightApprox": 1.88,
  "coloring": "Room-linked colors: frame, wood. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-dfc83d53-1f0d-462f-9bdf-e97fa33b2723",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/modern-floating-look-shelf.ts"
} satisfies AssetDefinition;
