import type { AssetDefinition } from "./types.js";

export default {
  "label": "Full Length Mirror",
  "description": "Tall framed mirror-like panel with a stable floor base; the surface is opaque.",
  "function": "Provide a visual fitting area.",
  "moodTags": [
    "fashion",
    "fitting",
    "minimal"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 0.72,
      "height": 0.08,
      "depth": 0.42,
      "x": 0,
      "y": 0.04,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.68,
      "height": 1.75,
      "depth": 0.07,
      "x": 0,
      "y": 0.955,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.57,
      "height": 1.61,
      "depth": 0.025,
      "x": 0,
      "y": 0.955,
      "z": 0.05,
      "color": "#aebebc"
    },
    {
      "shape": "box",
      "width": 0.025,
      "height": 1.48,
      "depth": 0.025,
      "x": -0.22,
      "y": 0.96,
      "z": 0.075,
      "color": "#f0dfc8"
    }
  ],
  "id": "generated-5ed59c51-2b26-4577-9a1d-c38b19aff347",
  "width": 0.72,
  "depth": 0.42,
  "heightApprox": 1.83,
  "coloring": "Room-linked colors: frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-5ed59c51-2b26-4577-9a1d-c38b19aff347",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/full-length-mirror.ts"
} satisfies AssetDefinition;
