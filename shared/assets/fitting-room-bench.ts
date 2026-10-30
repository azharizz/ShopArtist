import type { AssetDefinition } from "./types.js";

export default {
  "label": "Fitting Room Bench",
  "description": "A compact padded bench with a low storage shelf.",
  "function": "Provide seating while trying on clothes.",
  "moodTags": [
    "fashion",
    "fitting",
    "seating"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 0.95,
      "height": 0.18,
      "depth": 0.42,
      "x": 0,
      "y": 0.48,
      "z": 0,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.83,
      "height": 0.05,
      "depth": 0.36,
      "x": 0,
      "y": 0.18,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.39,
      "depth": 0.06,
      "x": -0.4,
      "y": 0.195,
      "z": -0.15,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.39,
      "depth": 0.06,
      "x": -0.4,
      "y": 0.195,
      "z": 0.15,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.39,
      "depth": 0.06,
      "x": 0.4,
      "y": 0.195,
      "z": -0.15,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.39,
      "depth": 0.06,
      "x": 0.4,
      "y": 0.195,
      "z": 0.15,
      "color": "frame"
    }
  ],
  "id": "generated-064ead63-9f69-45ca-a1ba-501f70cac3fb",
  "width": 0.95,
  "depth": 0.42,
  "heightApprox": 0.57,
  "coloring": "Room-linked colors: accent, wood, frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-064ead63-9f69-45ca-a1ba-501f70cac3fb",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/fitting-room-bench.ts"
} satisfies AssetDefinition;
