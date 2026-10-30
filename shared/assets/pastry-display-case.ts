import type { AssetDefinition } from "./types.js";

export default {
  "label": "Pastry Display Case",
  "description": "Countertop framed case with two shelves and illustrative pastry blocks.",
  "function": "Present pastries on a counter.",
  "moodTags": [
    "bakery",
    "cafe",
    "display"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.1,
      "height": 0.08,
      "depth": 0.45,
      "x": 0,
      "y": 0.04,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.035,
      "height": 0.58,
      "depth": 0.035,
      "x": -0.5,
      "y": 0.37,
      "z": -0.19,
      "color": "#c3a46b"
    },
    {
      "shape": "box",
      "width": 0.035,
      "height": 0.58,
      "depth": 0.035,
      "x": -0.5,
      "y": 0.37,
      "z": 0.19,
      "color": "#c3a46b"
    },
    {
      "shape": "box",
      "width": 0.035,
      "height": 0.58,
      "depth": 0.035,
      "x": 0.5,
      "y": 0.37,
      "z": -0.19,
      "color": "#c3a46b"
    },
    {
      "shape": "box",
      "width": 0.035,
      "height": 0.58,
      "depth": 0.035,
      "x": 0.5,
      "y": 0.37,
      "z": 0.19,
      "color": "#c3a46b"
    },
    {
      "shape": "box",
      "width": 1.1,
      "height": 0.05,
      "depth": 0.45,
      "x": 0,
      "y": 0.68,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1,
      "height": 0.04,
      "depth": 0.38,
      "x": 0,
      "y": 0.37,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "cylinder",
      "width": 0.16,
      "height": 0.08,
      "depth": 0.16,
      "x": -0.3,
      "y": 0.12,
      "z": 0.04,
      "color": "#cf956b"
    },
    {
      "shape": "cylinder",
      "width": 0.16,
      "height": 0.08,
      "depth": 0.16,
      "x": 0,
      "y": 0.12,
      "z": 0.04,
      "color": "#cf956b"
    },
    {
      "shape": "cylinder",
      "width": 0.16,
      "height": 0.08,
      "depth": 0.16,
      "x": 0.3,
      "y": 0.12,
      "z": 0.04,
      "color": "#cf956b"
    },
    {
      "shape": "cylinder",
      "width": 0.16,
      "height": 0.08,
      "depth": 0.16,
      "x": -0.27,
      "y": 0.43,
      "z": 0.04,
      "color": "#f0dfc8"
    },
    {
      "shape": "cylinder",
      "width": 0.16,
      "height": 0.08,
      "depth": 0.16,
      "x": 0.12,
      "y": 0.43,
      "z": 0.04,
      "color": "#f0dfc8"
    }
  ],
  "id": "generated-727b1525-24a9-46f8-9fa5-f0a5ffb9a44b",
  "width": 1.1,
  "depth": 0.45,
  "heightApprox": 0.71,
  "coloring": "Room-linked colors: frame, wood. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-727b1525-24a9-46f8-9fa5-f0a5ffb9a44b",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/pastry-display-case.ts"
} satisfies AssetDefinition;
