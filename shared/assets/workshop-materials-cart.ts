import type { AssetDefinition } from "./types.js";

export default {
  "label": "Workshop Materials Cart",
  "description": "Two-tier rolling-look cart with supply containers.",
  "function": "Use as a workshop materials cart in a art shop layout.",
  "moodTags": [
    "art",
    "workshop",
    "materials",
    "cart"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 0.8,
      "height": 0.08,
      "depth": 0.45,
      "x": 0,
      "y": 0.8,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.76,
      "depth": 0.06,
      "x": -0.32,
      "y": 0.38,
      "z": -0.14500000000000002,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.76,
      "depth": 0.06,
      "x": -0.32,
      "y": 0.38,
      "z": 0.14500000000000002,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.76,
      "depth": 0.06,
      "x": 0.32,
      "y": 0.38,
      "z": -0.14500000000000002,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.76,
      "depth": 0.06,
      "x": 0.32,
      "y": 0.38,
      "z": 0.14500000000000002,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.68,
      "height": 0.06,
      "depth": 0.38,
      "x": 0,
      "y": 0.25,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "cylinder",
      "width": 0.1,
      "height": 0.08,
      "depth": 0.1,
      "x": -0.32,
      "y": 0.04,
      "z": -0.14,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.1,
      "height": 0.08,
      "depth": 0.1,
      "x": -0.32,
      "y": 0.04,
      "z": 0.14,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.1,
      "height": 0.08,
      "depth": 0.1,
      "x": 0.32,
      "y": 0.04,
      "z": -0.14,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.1,
      "height": 0.08,
      "depth": 0.1,
      "x": 0.32,
      "y": 0.04,
      "z": 0.14,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.1,
      "height": 0.16,
      "depth": 0.1,
      "x": -0.2,
      "y": 0.92,
      "z": 0,
      "color": "#d8a8b7"
    },
    {
      "shape": "cylinder",
      "width": 0.1,
      "height": 0.16,
      "depth": 0.1,
      "x": 0,
      "y": 0.92,
      "z": 0,
      "color": "#6e916c"
    },
    {
      "shape": "cylinder",
      "width": 0.1,
      "height": 0.16,
      "depth": 0.1,
      "x": 0.2,
      "y": 0.92,
      "z": 0,
      "color": "#c3a36d"
    }
  ],
  "id": "generated-892ae51f-421b-4f3f-94bb-6bdee966c712",
  "width": 0.8,
  "depth": 0.45,
  "heightApprox": 1,
  "coloring": "Room-linked colors: wood, frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-892ae51f-421b-4f3f-94bb-6bdee966c712",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/workshop-materials-cart.ts"
} satisfies AssetDefinition;
