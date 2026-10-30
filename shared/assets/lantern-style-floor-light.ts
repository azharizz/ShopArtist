import type { AssetDefinition } from "./types.js";

export default {
  "label": "Lantern Style Floor Light",
  "description": "Rectangular frame with a central light-like column.",
  "function": "Use as a lantern style floor light in a decor shop layout.",
  "moodTags": [
    "decor",
    "lantern",
    "floor",
    "light"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 0.45,
      "height": 0.08,
      "depth": 0.4,
      "x": 0,
      "y": 0.04,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.04,
      "height": 0.8,
      "depth": 0.04,
      "x": -0.19,
      "y": 0.48,
      "z": -0.16,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.04,
      "height": 0.8,
      "depth": 0.04,
      "x": -0.19,
      "y": 0.48,
      "z": 0.16,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.04,
      "height": 0.8,
      "depth": 0.04,
      "x": 0.19,
      "y": 0.48,
      "z": -0.16,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.04,
      "height": 0.8,
      "depth": 0.04,
      "x": 0.19,
      "y": 0.48,
      "z": 0.16,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.45,
      "height": 0.06,
      "depth": 0.4,
      "x": 0,
      "y": 0.91,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.17,
      "height": 0.45,
      "depth": 0.17,
      "x": 0,
      "y": 0.34,
      "z": 0,
      "color": "#efe2cd"
    }
  ],
  "id": "generated-9d9895ba-1f32-4365-a2df-a0f6d4896ef2",
  "width": 0.45,
  "depth": 0.4,
  "heightApprox": 0.94,
  "coloring": "Room-linked colors: frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-9d9895ba-1f32-4365-a2df-a0f6d4896ef2",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/lantern-style-floor-light.ts"
} satisfies AssetDefinition;
