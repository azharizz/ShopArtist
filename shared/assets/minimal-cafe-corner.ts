import type { AssetDefinition } from "./types.js";

export default {
  "label": "Minimal Cafe Corner",
  "description": "Compact service counter with menu panel and pickup ledge.",
  "function": "Use as a minimal cafe corner in a coffee shop layout.",
  "moodTags": [
    "coffee",
    "minimal",
    "cafe",
    "corner"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.25,
      "height": 0.85,
      "depth": 0.65,
      "x": 0,
      "y": 0.425,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.33,
      "height": 0.08,
      "depth": 0.73,
      "x": 0,
      "y": 0.89,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.05,
      "height": 0.6,
      "depth": 0.025,
      "x": 0,
      "y": 0.425,
      "z": 0.34,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.05,
      "height": 0.25,
      "depth": 0.05,
      "x": 0,
      "y": 1.045,
      "z": -0.2,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.7,
      "height": 0.5,
      "depth": 0.08,
      "x": 0,
      "y": 1.4,
      "z": -0.2,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.6,
      "height": 0.4,
      "depth": 0.025,
      "x": 0,
      "y": 1.4,
      "z": -0.14500000000000002,
      "color": "#394454"
    },
    {
      "shape": "box",
      "width": 0.45499999999999996,
      "height": 0.025,
      "depth": 0.025,
      "x": 0,
      "y": 1.4,
      "z": -0.12000000000000001,
      "color": "#efe2cd"
    },
    {
      "shape": "box",
      "width": 0.55,
      "height": 0.05,
      "depth": 0.2,
      "x": 0.32,
      "y": 0.98,
      "z": 0.12,
      "color": "#efe2cd"
    }
  ],
  "id": "generated-85a87d4d-71ac-4355-afa2-416597dd2b70",
  "width": 1.33,
  "depth": 0.73,
  "heightApprox": 1.65,
  "coloring": "Room-linked colors: frame, wood, accent. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-85a87d4d-71ac-4355-afa2-416597dd2b70",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/minimal-cafe-corner.ts"
} satisfies AssetDefinition;
