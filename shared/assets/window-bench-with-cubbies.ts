import type { AssetDefinition } from "./types.js";

export default {
  "label": "Window Bench with Cubbies",
  "description": "Low bench above three open storage compartments.",
  "function": "Use as a window bench with cubbies in a book shop layout.",
  "moodTags": [
    "book",
    "window",
    "bench",
    "cubbies"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.6,
      "height": 0.07,
      "depth": 0.48,
      "x": 0,
      "y": 0.035,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.38,
      "depth": 0.44,
      "x": -0.76,
      "y": 0.26,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.38,
      "depth": 0.44,
      "x": -0.25,
      "y": 0.26,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.38,
      "depth": 0.44,
      "x": 0.25,
      "y": 0.26,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.38,
      "depth": 0.44,
      "x": 0.76,
      "y": 0.26,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.6,
      "height": 0.14,
      "depth": 0.52,
      "x": 0,
      "y": 0.52,
      "z": 0,
      "color": "accent"
    }
  ],
  "id": "generated-4c6b17ba-88b7-4a05-97dc-57e0ac56ef40",
  "width": 1.6,
  "depth": 0.52,
  "heightApprox": 0.59,
  "coloring": "Room-linked colors: frame, wood, accent. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-4c6b17ba-88b7-4a05-97dc-57e0ac56ef40",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/window-bench-with-cubbies.ts"
} satisfies AssetDefinition;
