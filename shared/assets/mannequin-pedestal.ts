import type { AssetDefinition } from "./types.js";

export default {
  "label": "Mannequin Pedestal",
  "description": "A stepped pedestal designed as a base for a mannequin or featured outfit.",
  "function": "Raise a mannequin or featured display.",
  "moodTags": [
    "fashion",
    "display",
    "minimal"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 0.85,
      "height": 0.1,
      "depth": 0.65,
      "x": 0,
      "y": 0.05,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.72,
      "height": 0.35,
      "depth": 0.52,
      "x": 0,
      "y": 0.275,
      "z": 0,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.78,
      "height": 0.07,
      "depth": 0.58,
      "x": 0,
      "y": 0.485,
      "z": 0,
      "color": "wood"
    }
  ],
  "id": "generated-4a633442-eca6-4ea9-b101-aaa6f0cda0cf",
  "width": 0.85,
  "depth": 0.65,
  "heightApprox": 0.52,
  "coloring": "Room-linked colors: frame, accent, wood. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-4a633442-eca6-4ea9-b101-aaa6f0cda0cf",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/mannequin-pedestal.ts"
} satisfies AssetDefinition;
