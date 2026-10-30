import type { AssetDefinition } from "./types.js";

export default {
  "label": "Three Panel Fitting Mirror",
  "description": "Three framed opaque mirror-like panels arranged side by side.",
  "function": "Use as a three panel fitting mirror in a fashion shop layout.",
  "moodTags": [
    "fashion",
    "three",
    "panel",
    "fitting",
    "mirror"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 0.52,
      "height": 1.7,
      "depth": 0.08,
      "x": -0.55,
      "y": 0.89,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.42,
      "height": 1.58,
      "depth": 0.025,
      "x": -0.55,
      "y": 0.89,
      "z": 0.055,
      "color": "#adbfbe"
    },
    {
      "shape": "box",
      "width": 0.52,
      "height": 1.7,
      "depth": 0.08,
      "x": 0,
      "y": 0.89,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.42,
      "height": 1.58,
      "depth": 0.025,
      "x": 0,
      "y": 0.89,
      "z": 0.055,
      "color": "#adbfbe"
    },
    {
      "shape": "box",
      "width": 0.52,
      "height": 1.7,
      "depth": 0.08,
      "x": 0.55,
      "y": 0.89,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.42,
      "height": 1.58,
      "depth": 0.025,
      "x": 0.55,
      "y": 0.89,
      "z": 0.055,
      "color": "#adbfbe"
    },
    {
      "shape": "box",
      "width": 1.7,
      "height": 0.08,
      "depth": 0.4,
      "x": 0,
      "y": 0.04,
      "z": 0,
      "color": "frame"
    }
  ],
  "id": "generated-c3790dcb-8491-4bb6-9960-0d10b5565c6f",
  "width": 1.7,
  "depth": 0.4,
  "heightApprox": 1.74,
  "coloring": "Room-linked colors: frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-c3790dcb-8491-4bb6-9960-0d10b5565c6f",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/three-panel-fitting-mirror.ts"
} satisfies AssetDefinition;
