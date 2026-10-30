import type { AssetDefinition } from "./types.js";

export default {
  "label": "Fitting Room Entrance",
  "description": "A rectangular entrance portal with a curtain-like rear screen.",
  "function": "Use as a fitting room entrance in a fashion shop layout.",
  "moodTags": [
    "fashion",
    "fitting",
    "room",
    "entrance"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 0.1,
      "height": 2,
      "depth": 0.38,
      "x": -0.7,
      "y": 1,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.1,
      "height": 2,
      "depth": 0.38,
      "x": 0.7,
      "y": 1,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.5,
      "height": 0.1,
      "depth": 0.38,
      "x": 0,
      "y": 2.05,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.2,
      "height": 1.8,
      "depth": 0.05,
      "x": 0,
      "y": 1,
      "z": -0.12,
      "color": "#d8a8b7"
    }
  ],
  "id": "generated-caa8f3f1-b151-4134-87a2-62b57b51e4db",
  "width": 1.5,
  "depth": 0.38,
  "heightApprox": 2.1,
  "coloring": "Room-linked colors: frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-caa8f3f1-b151-4134-87a2-62b57b51e4db",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/fitting-room-entrance.ts"
} satisfies AssetDefinition;
