import type { AssetDefinition } from "./types.js";

export default {
  "label": "Corner Cafe Counter",
  "description": "Two joined counters forming an L-shaped service area.",
  "function": "Use as a corner cafe counter in a coffee shop layout.",
  "moodTags": [
    "coffee",
    "corner",
    "cafe",
    "counter"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.6,
      "height": 0.85,
      "depth": 0.65,
      "x": 0,
      "y": 0.425,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.6800000000000002,
      "height": 0.08,
      "depth": 0.73,
      "x": 0,
      "y": 0.89,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.4000000000000001,
      "height": 0.6,
      "depth": 0.025,
      "x": 0,
      "y": 0.425,
      "z": 0.34,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.55,
      "height": 0.85,
      "depth": 1.1,
      "x": -0.53,
      "y": 0.425,
      "z": -0.5,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.62,
      "height": 0.08,
      "depth": 1.15,
      "x": -0.53,
      "y": 0.89,
      "z": -0.5,
      "color": "wood"
    }
  ],
  "id": "generated-031c5497-4fe5-4bbe-bacd-a450f1c2ab1d",
  "width": 1.68,
  "depth": 2.15,
  "heightApprox": 0.93,
  "coloring": "Room-linked colors: frame, wood, accent. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-031c5497-4fe5-4bbe-bacd-a450f1c2ab1d",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/corner-cafe-counter.ts"
} satisfies AssetDefinition;
