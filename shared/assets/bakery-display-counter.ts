import type { AssetDefinition } from "./types.js";

export default {
  "label": "Bakery Display Counter",
  "description": "A bakery counter with a framed open display, two tiers and tray-like details.",
  "function": "Show pastries or small packaged goods at a service counter.",
  "moodTags": [
    "bakery",
    "cafe",
    "warm"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.65,
      "height": 0.65,
      "depth": 0.7,
      "x": 0,
      "y": 0.325,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.72,
      "height": 0.08,
      "depth": 0.75,
      "x": 0,
      "y": 0.69,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.04,
      "height": 0.65,
      "depth": 0.04,
      "x": -0.79,
      "y": 1.055,
      "z": -0.3,
      "color": "#c2a06a"
    },
    {
      "shape": "box",
      "width": 0.04,
      "height": 0.65,
      "depth": 0.04,
      "x": -0.79,
      "y": 1.055,
      "z": 0.3,
      "color": "#c2a06a"
    },
    {
      "shape": "box",
      "width": 0.04,
      "height": 0.65,
      "depth": 0.04,
      "x": 0.79,
      "y": 1.055,
      "z": -0.3,
      "color": "#c2a06a"
    },
    {
      "shape": "box",
      "width": 0.04,
      "height": 0.65,
      "depth": 0.04,
      "x": 0.79,
      "y": 1.055,
      "z": 0.3,
      "color": "#c2a06a"
    },
    {
      "shape": "box",
      "width": 1.65,
      "height": 0.05,
      "depth": 0.7,
      "x": 0,
      "y": 1.405,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.53,
      "height": 0.05,
      "depth": 0.6,
      "x": 0,
      "y": 0.91,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.53,
      "height": 0.05,
      "depth": 0.6,
      "x": 0,
      "y": 1.16,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.28,
      "height": 0.06,
      "depth": 0.18,
      "x": -0.45,
      "y": 0.97,
      "z": 0.08,
      "color": "#f1dfcb"
    },
    {
      "shape": "box",
      "width": 0.28,
      "height": 0.06,
      "depth": 0.18,
      "x": -0.05,
      "y": 0.97,
      "z": 0.08,
      "color": "#f1dfcb"
    },
    {
      "shape": "box",
      "width": 0.28,
      "height": 0.06,
      "depth": 0.18,
      "x": 0.35,
      "y": 0.97,
      "z": 0.08,
      "color": "#f1dfcb"
    },
    {
      "shape": "box",
      "width": 0.28,
      "height": 0.06,
      "depth": 0.18,
      "x": -0.3,
      "y": 1.22,
      "z": 0.08,
      "color": "#f1dfcb"
    },
    {
      "shape": "box",
      "width": 0.28,
      "height": 0.06,
      "depth": 0.18,
      "x": 0.2,
      "y": 1.22,
      "z": 0.08,
      "color": "#f1dfcb"
    },
    {
      "shape": "box",
      "width": 1.5,
      "height": 0.03,
      "depth": 0.03,
      "x": 0,
      "y": 0.72,
      "z": 0.37,
      "color": "#c2a06a"
    }
  ],
  "id": "generated-0a0d26a6-c587-482c-9fea-7aa76febbf91",
  "width": 1.72,
  "depth": 0.77,
  "heightApprox": 1.43,
  "coloring": "Room-linked colors: frame, wood. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-0a0d26a6-c587-482c-9fea-7aa76febbf91",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/bakery-display-counter.ts"
} satisfies AssetDefinition;
