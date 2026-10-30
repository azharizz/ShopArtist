import type { AssetDefinition } from "./types.js";

export default {
  "label": "Product Sampling Station",
  "description": "A service table with separate sample platforms.",
  "function": "Use as a product sampling station in a retail shop layout.",
  "moodTags": [
    "retail",
    "product",
    "sampling"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.2,
      "height": 0.8,
      "depth": 0.6,
      "x": 0,
      "y": 0.4,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.28,
      "height": 0.08,
      "depth": 0.6799999999999999,
      "x": 0,
      "y": 0.8400000000000001,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1,
      "height": 0.55,
      "depth": 0.025,
      "x": 0,
      "y": 0.4,
      "z": 0.315,
      "color": "accent"
    },
    {
      "shape": "cylinder",
      "width": 0.2,
      "height": 0.08,
      "depth": 0.2,
      "x": -0.35,
      "y": 0.92,
      "z": 0,
      "color": "#efe2cd"
    },
    {
      "shape": "cylinder",
      "width": 0.2,
      "height": 0.08,
      "depth": 0.2,
      "x": 0,
      "y": 0.92,
      "z": 0,
      "color": "#d8a8b7"
    },
    {
      "shape": "cylinder",
      "width": 0.2,
      "height": 0.08,
      "depth": 0.2,
      "x": 0.35,
      "y": 0.92,
      "z": 0,
      "color": "#6e916c"
    }
  ],
  "id": "generated-e92e33f3-e402-40c4-aa88-497dea3c4044",
  "width": 1.28,
  "depth": 0.68,
  "heightApprox": 0.96,
  "coloring": "Room-linked colors: frame, wood, accent. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-e92e33f3-e402-40c4-aa88-497dea3c4044",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/product-sampling-station.ts"
} satisfies AssetDefinition;
