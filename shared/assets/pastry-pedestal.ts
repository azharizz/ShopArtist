import type { AssetDefinition } from "./types.js";

export default {
  "label": "Pastry Pedestal",
  "description": "Compact pedestal with tiers of pastry-like forms.",
  "function": "Use as a pastry pedestal in a coffee shop layout.",
  "moodTags": [
    "coffee",
    "pastry",
    "pedestal"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 0.65,
      "height": 0.65,
      "depth": 0.55,
      "x": 0,
      "y": 0.325,
      "z": 0,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.71,
      "height": 0.06,
      "depth": 0.6100000000000001,
      "x": 0,
      "y": 0.68,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "cylinder",
      "width": 0.45,
      "height": 0.06,
      "depth": 0.45,
      "x": 0,
      "y": 0.74,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.32,
      "height": 0.06,
      "depth": 0.32,
      "x": 0,
      "y": 0.95,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.05,
      "height": 0.18,
      "depth": 0.05,
      "x": 0,
      "y": 0.86,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.12,
      "height": 0.08,
      "depth": 0.12,
      "x": -0.12,
      "y": 0.81,
      "z": 0.03,
      "color": "#b8756b"
    },
    {
      "shape": "cylinder",
      "width": 0.12,
      "height": 0.08,
      "depth": 0.12,
      "x": 0.12,
      "y": 0.81,
      "z": 0.03,
      "color": "#b8756b"
    }
  ],
  "id": "generated-885fce7c-140f-425d-bfeb-7df7993cf271",
  "width": 0.71,
  "depth": 0.61,
  "heightApprox": 0.98,
  "coloring": "Room-linked colors: accent, wood, frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-885fce7c-140f-425d-bfeb-7df7993cf271",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/pastry-pedestal.ts"
} satisfies AssetDefinition;
