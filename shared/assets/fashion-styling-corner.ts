import type { AssetDefinition } from "./types.js";

export default {
  "label": "Fashion Styling Corner",
  "description": "Mirror-like panel beside a padded bench and accessory shelf.",
  "function": "Use as a fashion styling corner in a fashion shop layout.",
  "moodTags": [
    "fashion",
    "styling",
    "corner"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 0.75,
      "height": 1.7,
      "depth": 0.08,
      "x": -0.5,
      "y": 0.89,
      "z": -0.15,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.62,
      "height": 1.55,
      "depth": 0.025,
      "x": -0.5,
      "y": 0.89,
      "z": -0.095,
      "color": "#adbfbe"
    },
    {
      "shape": "box",
      "width": 0.85,
      "height": 0.08,
      "depth": 0.4,
      "x": -0.5,
      "y": 0.04,
      "z": -0.15,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.8,
      "height": 0.14,
      "depth": 0.42,
      "x": 0.45,
      "y": 0.48,
      "z": 0.05,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.41,
      "depth": 0.38,
      "x": 0.15000000000000002,
      "y": 0.205,
      "z": 0.05,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.41,
      "depth": 0.38,
      "x": 0.75,
      "y": 0.205,
      "z": 0.05,
      "color": "frame"
    }
  ],
  "id": "generated-262d633d-ffa4-4ead-bfdd-38d1b2333892",
  "width": 1.85,
  "depth": 0.7,
  "heightApprox": 1.74,
  "coloring": "Room-linked colors: frame, accent. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-262d633d-ffa4-4ead-bfdd-38d1b2333892",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/fashion-styling-corner.ts"
} satisfies AssetDefinition;
