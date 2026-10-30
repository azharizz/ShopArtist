import type { AssetDefinition } from "./types.js";

export default {
  "label": "Spiral Look Book Tower",
  "description": "Central post with staggered rectangular shelves.",
  "function": "Use as a spiral look book tower in a book shop layout.",
  "moodTags": [
    "book",
    "spiral",
    "tower"
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
      "width": 0.09,
      "height": 1.75,
      "depth": 0.09,
      "x": 0,
      "y": 0.955,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.65,
      "height": 0.05,
      "depth": 0.42,
      "x": -0.18,
      "y": 0.35,
      "z": 0.1,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.65,
      "height": 0.05,
      "depth": 0.42,
      "x": 0.18,
      "y": 0.62,
      "z": -0.1,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.65,
      "height": 0.05,
      "depth": 0.42,
      "x": -0.18,
      "y": 0.89,
      "z": -0.1,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.65,
      "height": 0.05,
      "depth": 0.42,
      "x": 0.18,
      "y": 1.16,
      "z": 0.1,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.65,
      "height": 0.05,
      "depth": 0.42,
      "x": -0.18,
      "y": 1.43,
      "z": -0.1,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.65,
      "height": 0.05,
      "depth": 0.42,
      "x": 0.18,
      "y": 1.7,
      "z": -0.1,
      "color": "wood"
    }
  ],
  "id": "generated-0dd117a3-30a5-4661-8991-4f4b554b8525",
  "width": 1.01,
  "depth": 0.62,
  "heightApprox": 1.83,
  "coloring": "Room-linked colors: frame, wood. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-0dd117a3-30a5-4661-8991-4f4b554b8525",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/spiral-look-book-tower.ts"
} satisfies AssetDefinition;
