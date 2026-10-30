import type { AssetDefinition } from "./types.js";

export default {
  "label": "Circular Clothing Rack",
  "description": "A central pedestal with a rounded concept suggested by a square frame and stylized garments.",
  "function": "Display clothing around a central point.",
  "moodTags": [
    "fashion",
    "round",
    "display"
  ],
  "geometry": [
    {
      "shape": "cylinder",
      "width": 0.65,
      "height": 0.08,
      "depth": 0.65,
      "x": 0,
      "y": 0.04,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.07,
      "height": 1.6,
      "depth": 0.07,
      "x": 0,
      "y": 0.88,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.8,
      "height": 0.05,
      "depth": 0.05,
      "x": 0,
      "y": 1.64,
      "z": -0.4,
      "color": "#c3a46b"
    },
    {
      "shape": "box",
      "width": 0.8,
      "height": 0.05,
      "depth": 0.05,
      "x": 0,
      "y": 1.64,
      "z": 0.4,
      "color": "#c3a46b"
    },
    {
      "shape": "box",
      "width": 0.05,
      "height": 0.05,
      "depth": 0.8,
      "x": -0.4,
      "y": 1.64,
      "z": 0,
      "color": "#c3a46b"
    },
    {
      "shape": "box",
      "width": 0.05,
      "height": 0.05,
      "depth": 0.8,
      "x": 0.4,
      "y": 1.64,
      "z": 0,
      "color": "#c3a46b"
    },
    {
      "shape": "box",
      "width": 0.17,
      "height": 0.52,
      "depth": 0.08,
      "x": 0.42,
      "y": 1.345,
      "z": 0,
      "color": "#d8abb6"
    },
    {
      "shape": "box",
      "width": 0.17,
      "height": 0.52,
      "depth": 0.08,
      "x": -0.42,
      "y": 1.345,
      "z": 0,
      "color": "#f0dfc8"
    },
    {
      "shape": "box",
      "width": 0.17,
      "height": 0.52,
      "depth": 0.08,
      "x": 0,
      "y": 1.345,
      "z": 0.42,
      "color": "#72916b"
    },
    {
      "shape": "box",
      "width": 0.17,
      "height": 0.52,
      "depth": 0.08,
      "x": 0,
      "y": 1.345,
      "z": -0.42,
      "color": "#b9786c"
    }
  ],
  "id": "generated-cb2ec5e0-c797-4eb1-9dd4-a657be236be0",
  "width": 1.01,
  "depth": 0.92,
  "heightApprox": 1.68,
  "coloring": "Room-linked colors: frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-cb2ec5e0-c797-4eb1-9dd4-a657be236be0",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/circular-clothing-rack.ts"
} satisfies AssetDefinition;
