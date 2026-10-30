import type { AssetDefinition } from "./types.js";

export default {
  "label": "Seasonal Product Island",
  "description": "Tiered central display with a tall sign frame.",
  "function": "Use as a seasonal product island in a retail shop layout.",
  "moodTags": [
    "retail",
    "seasonal",
    "product",
    "island"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.2,
      "height": 0.5,
      "depth": 0.7,
      "x": 0,
      "y": 0.25,
      "z": 0,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 1.26,
      "height": 0.06,
      "depth": 0.76,
      "x": 0,
      "y": 0.53,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.8,
      "height": 0.18,
      "depth": 0.45,
      "x": 0,
      "y": 0.65,
      "z": 0,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.9,
      "depth": 0.06,
      "x": 0,
      "y": 1.1,
      "z": -0.2,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.6,
      "height": 0.35,
      "depth": 0.08,
      "x": 0,
      "y": 1.725,
      "z": -0.2,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.5,
      "height": 0.24999999999999997,
      "depth": 0.025,
      "x": 0,
      "y": 1.725,
      "z": -0.14500000000000002,
      "color": "#394454"
    }
  ],
  "id": "generated-17827912-ce22-432c-a8b2-cb8f25ffe8c3",
  "width": 1.26,
  "depth": 0.76,
  "heightApprox": 1.9,
  "coloring": "Room-linked colors: accent, wood, frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-17827912-ce22-432c-a8b2-cb8f25ffe8c3",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/seasonal-product-island.ts"
} satisfies AssetDefinition;
