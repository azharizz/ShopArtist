import type { AssetDefinition } from "./types.js";

export default {
  "label": "Checkout and Wrapping Station",
  "description": "Checkout counter with rolls and a wrapping surface.",
  "function": "Use as a checkout and wrapping station in a retail shop layout.",
  "moodTags": [
    "retail",
    "checkout",
    "wrapping"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.55,
      "height": 0.85,
      "depth": 0.65,
      "x": 0,
      "y": 0.425,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.6300000000000001,
      "height": 0.08,
      "depth": 0.73,
      "x": 0,
      "y": 0.89,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.35,
      "height": 0.6,
      "depth": 0.025,
      "x": 0,
      "y": 0.425,
      "z": 0.34,
      "color": "accent"
    },
    {
      "shape": "cylinder",
      "width": 0.1,
      "height": 0.45,
      "depth": 0.1,
      "x": -0.4,
      "y": 1.155,
      "z": -0.15,
      "color": "#efe2cd"
    },
    {
      "shape": "cylinder",
      "width": 0.1,
      "height": 0.45,
      "depth": 0.1,
      "x": -0.2,
      "y": 1.155,
      "z": -0.15,
      "color": "#d8a8b7"
    },
    {
      "shape": "cylinder",
      "width": 0.1,
      "height": 0.45,
      "depth": 0.1,
      "x": 0,
      "y": 1.155,
      "z": -0.15,
      "color": "#6e916c"
    },
    {
      "shape": "box",
      "width": 0.25,
      "height": 0.12,
      "depth": 0.18,
      "x": 0.45,
      "y": 1,
      "z": 0.1,
      "color": "#d8a8b7"
    }
  ],
  "id": "generated-02c73312-e925-4937-a406-4f63d0f495a3",
  "width": 1.63,
  "depth": 0.73,
  "heightApprox": 1.38,
  "coloring": "Room-linked colors: frame, wood, accent. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-02c73312-e925-4937-a406-4f63d0f495a3",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/checkout-and-wrapping-station.ts"
} satisfies AssetDefinition;
