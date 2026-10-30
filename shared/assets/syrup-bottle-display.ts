import type { AssetDefinition } from "./types.js";

export default {
  "label": "Syrup Bottle Display",
  "description": "Stepped counter rack containing a row of colored bottles.",
  "function": "Use as a syrup bottle display in a coffee shop layout.",
  "moodTags": [
    "coffee",
    "syrup",
    "bottle"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1,
      "height": 0.08,
      "depth": 0.4,
      "x": 0,
      "y": 0.04,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.9,
      "height": 0.12,
      "depth": 0.3,
      "x": 0,
      "y": 0.14,
      "z": -0.03,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.8,
      "height": 0.12,
      "depth": 0.2,
      "x": 0,
      "y": 0.26,
      "z": -0.08,
      "color": "wood"
    },
    {
      "shape": "cylinder",
      "width": 0.12,
      "height": 0.24,
      "depth": 0.12,
      "x": -0.3,
      "y": 0.26,
      "z": 0.08,
      "color": "#b8756b"
    },
    {
      "shape": "cylinder",
      "width": 0.12,
      "height": 0.24,
      "depth": 0.12,
      "x": -0.1,
      "y": 0.26,
      "z": 0.08,
      "color": "#efe2cd"
    },
    {
      "shape": "cylinder",
      "width": 0.12,
      "height": 0.24,
      "depth": 0.12,
      "x": 0.1,
      "y": 0.26,
      "z": 0.08,
      "color": "#6e916c"
    },
    {
      "shape": "cylinder",
      "width": 0.12,
      "height": 0.24,
      "depth": 0.12,
      "x": 0.3,
      "y": 0.26,
      "z": 0.08,
      "color": "#c3a36d"
    }
  ],
  "id": "generated-dcacf678-cbe3-43c2-9c34-1cf40942c3ca",
  "width": 1,
  "depth": 0.4,
  "heightApprox": 0.38,
  "coloring": "Room-linked colors: frame, wood. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-dcacf678-cbe3-43c2-9c34-1cf40942c3ca",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/syrup-bottle-display.ts"
} satisfies AssetDefinition;
