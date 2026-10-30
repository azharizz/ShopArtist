import type { AssetDefinition } from "./types.js";

export default {
  "label": "Corner Banquette",
  "description": "Two cushioned bench sections arranged in an L.",
  "function": "Use as a corner banquette in a coffee shop layout.",
  "moodTags": [
    "coffee",
    "corner",
    "banquette"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.7,
      "height": 0.18,
      "depth": 0.55,
      "x": 0,
      "y": 0.4,
      "z": -0.3,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 1.7,
      "height": 0.55,
      "depth": 0.1,
      "x": 0,
      "y": 0.7,
      "z": -0.53,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.55,
      "height": 0.18,
      "depth": 1.05,
      "x": -0.575,
      "y": 0.4,
      "z": 0.4,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.1,
      "height": 0.55,
      "depth": 1.05,
      "x": -0.8,
      "y": 0.7,
      "z": 0.4,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 1.7,
      "height": 0.27,
      "depth": 0.55,
      "x": 0,
      "y": 0.135,
      "z": -0.3,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.55,
      "height": 0.27,
      "depth": 1.05,
      "x": -0.575,
      "y": 0.135,
      "z": 0.4,
      "color": "frame"
    }
  ],
  "id": "generated-bf1bc103-5dd2-4c3d-90ed-1d01aeb3b9a1",
  "width": 1.7,
  "depth": 1.85,
  "heightApprox": 0.98,
  "coloring": "Room-linked colors: accent, frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-bf1bc103-5dd2-4c3d-90ed-1d01aeb3b9a1",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/corner-banquette.ts"
} satisfies AssetDefinition;
