import type { AssetDefinition } from "./types.js";

export default {
  "label": "Compact Coffee Kiosk",
  "description": "Three-sided counter with a simple overhead frame.",
  "function": "Use as a compact coffee kiosk in a coffee shop layout.",
  "moodTags": [
    "coffee",
    "compact",
    "kiosk"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.6,
      "height": 0.85,
      "depth": 0.7,
      "x": 0,
      "y": 0.425,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.6800000000000002,
      "height": 0.08,
      "depth": 0.7799999999999999,
      "x": 0,
      "y": 0.89,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.4000000000000001,
      "height": 0.6,
      "depth": 0.025,
      "x": 0,
      "y": 0.425,
      "z": 0.365,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.35,
      "height": 0.85,
      "depth": 1.05,
      "x": -0.62,
      "y": 0.425,
      "z": -0.35,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 1.15,
      "depth": 0.06,
      "x": -0.75,
      "y": 1.465,
      "z": -0.3,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 1.15,
      "depth": 0.06,
      "x": 0.75,
      "y": 1.465,
      "z": -0.3,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.6,
      "height": 0.1,
      "depth": 0.12,
      "x": 0,
      "y": 2.07,
      "z": -0.3,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.7,
      "height": 0.3,
      "depth": 0.05,
      "x": 0,
      "y": 1.87,
      "z": -0.22,
      "color": "#394454"
    }
  ],
  "id": "generated-2bb5c8a5-67a6-4f5f-9d3c-703843768b64",
  "width": 1.68,
  "depth": 1.75,
  "heightApprox": 2.12,
  "coloring": "Room-linked colors: frame, wood, accent. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-2bb5c8a5-67a6-4f5f-9d3c-703843768b64",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/compact-coffee-kiosk.ts"
} satisfies AssetDefinition;
