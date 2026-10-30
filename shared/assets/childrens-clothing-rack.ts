import type { AssetDefinition } from "./types.js";

export default {
  "label": "Childrens Clothing Rack",
  "description": "Low garment rail with bright illustrative clothing panels.",
  "function": "Use as a childrens clothing rack in a fashion shop layout.",
  "moodTags": [
    "fashion",
    "childrens",
    "clothing",
    "rack"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.1,
      "height": 0.08,
      "depth": 0.4,
      "x": 0,
      "y": 0.04,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 1.1,
      "depth": 0.06,
      "x": -0.5,
      "y": 0.63,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 1.1,
      "depth": 0.06,
      "x": 0.5,
      "y": 0.63,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.05,
      "height": 0.06,
      "depth": 0.06,
      "x": 0,
      "y": 1.2,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.18,
      "height": 0.42,
      "depth": 0.05,
      "x": -0.3,
      "y": 0.96,
      "z": 0,
      "color": "#d8a8b7"
    },
    {
      "shape": "box",
      "width": 0.18,
      "height": 0.42,
      "depth": 0.05,
      "x": 0,
      "y": 0.96,
      "z": 0,
      "color": "#6e916c"
    },
    {
      "shape": "box",
      "width": 0.18,
      "height": 0.42,
      "depth": 0.05,
      "x": 0.3,
      "y": 0.96,
      "z": 0,
      "color": "#c3a36d"
    }
  ],
  "id": "generated-0d5cc649-f40e-4b92-843b-6eb1c0ac6645",
  "width": 1.1,
  "depth": 0.4,
  "heightApprox": 1.23,
  "coloring": "Room-linked colors: frame, wood. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-0d5cc649-f40e-4b92-843b-6eb1c0ac6645",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/childrens-clothing-rack.ts"
} satisfies AssetDefinition;
