import type { AssetDefinition } from "./types.js";

export default {
  "label": "Fashion Window Vignette",
  "description": "Stepped display stage, backdrop and featured outfit silhouette.",
  "function": "Use as a fashion window vignette in a fashion shop layout.",
  "moodTags": [
    "fashion",
    "window",
    "vignette"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.5,
      "height": 1.8,
      "depth": 0.08,
      "x": 0,
      "y": 0.9,
      "z": 0,
      "color": "#efe2cd"
    },
    {
      "shape": "box",
      "width": 1.6,
      "height": 0.08,
      "depth": 0.42,
      "x": 0,
      "y": 0.04,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.65,
      "height": 0.35,
      "depth": 0.5,
      "x": 0,
      "y": 0.175,
      "z": 0.3,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.71,
      "height": 0.06,
      "depth": 0.56,
      "x": 0,
      "y": 0.38,
      "z": 0.3,
      "color": "wood"
    },
    {
      "shape": "cylinder",
      "width": 0.22,
      "height": 0.2,
      "depth": 0.22,
      "x": 0,
      "y": 0.56,
      "z": 0.3,
      "color": "#efe2cd"
    },
    {
      "shape": "box",
      "width": 0.35,
      "height": 0.52,
      "depth": 0.16,
      "x": 0,
      "y": 0.92,
      "z": 0.3,
      "color": "#d8a8b7"
    },
    {
      "shape": "cylinder",
      "width": 0.18,
      "height": 0.18,
      "depth": 0.18,
      "x": 0,
      "y": 1.27,
      "z": 0.3,
      "color": "#efe2cd"
    }
  ],
  "id": "generated-1a640d9f-7f9e-4dc7-8604-2ccc964b9dbe",
  "width": 1.6,
  "depth": 1.16,
  "heightApprox": 1.8,
  "coloring": "Room-linked colors: frame, accent, wood. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-1a640d9f-7f9e-4dc7-8604-2ccc964b9dbe",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/fashion-window-vignette.ts"
} satisfies AssetDefinition;
