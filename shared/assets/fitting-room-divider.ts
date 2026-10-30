import type { AssetDefinition } from "./types.js";

export default {
  "label": "Fitting Room Divider",
  "description": "Freestanding three-panel partition with a curtain-like front.",
  "function": "Define a private fitting area visually.",
  "moodTags": [
    "fashion",
    "fitting",
    "privacy"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.5,
      "height": 0.08,
      "depth": 0.1,
      "x": 0,
      "y": 0.04,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.08,
      "height": 1.95,
      "depth": 0.08,
      "x": -0.72,
      "y": 1.055,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.08,
      "height": 1.95,
      "depth": 0.08,
      "x": 0.72,
      "y": 1.055,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.5,
      "height": 0.08,
      "depth": 0.1,
      "x": 0,
      "y": 2.07,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.23,
      "height": 1.88,
      "depth": 0.06,
      "x": -0.5,
      "y": 1.06,
      "z": 0,
      "color": "#d8abb6"
    },
    {
      "shape": "box",
      "width": 0.23,
      "height": 1.88,
      "depth": 0.06,
      "x": -0.25,
      "y": 1.06,
      "z": 0,
      "color": "#d8abb6"
    },
    {
      "shape": "box",
      "width": 0.23,
      "height": 1.88,
      "depth": 0.06,
      "x": 0,
      "y": 1.06,
      "z": 0,
      "color": "#d8abb6"
    },
    {
      "shape": "box",
      "width": 0.23,
      "height": 1.88,
      "depth": 0.06,
      "x": 0.25,
      "y": 1.06,
      "z": 0,
      "color": "#d8abb6"
    },
    {
      "shape": "box",
      "width": 0.23,
      "height": 1.88,
      "depth": 0.06,
      "x": 0.5,
      "y": 1.06,
      "z": 0,
      "color": "#d8abb6"
    },
    {
      "shape": "box",
      "width": 0.28,
      "height": 0.06,
      "depth": 0.45,
      "x": -0.65,
      "y": 0.07,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.28,
      "height": 0.06,
      "depth": 0.45,
      "x": 0.65,
      "y": 0.07,
      "z": 0,
      "color": "frame"
    }
  ],
  "id": "generated-f01c447d-5ac2-441e-bcfa-bc7204610ff4",
  "width": 1.58,
  "depth": 0.45,
  "heightApprox": 2.11,
  "coloring": "Room-linked colors: frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-f01c447d-5ac2-441e-bcfa-bc7204610ff4",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/fitting-room-divider.ts"
} satisfies AssetDefinition;
