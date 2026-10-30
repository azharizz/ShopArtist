import type { AssetDefinition } from "./types.js";

export default {
  "label": "Book Recommendation Stand",
  "description": "A small pedestal with a highlighted upright book and caption block.",
  "function": "Feature one recommended title.",
  "moodTags": [
    "books",
    "featured",
    "display"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 0.55,
      "height": 0.08,
      "depth": 0.45,
      "x": 0,
      "y": 0.04,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.38,
      "height": 0.76,
      "depth": 0.32,
      "x": 0,
      "y": 0.46,
      "z": 0,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.55,
      "height": 0.07,
      "depth": 0.45,
      "x": 0,
      "y": 0.875,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.3,
      "height": 0.38,
      "depth": 0.09,
      "x": 0,
      "y": 1.1,
      "z": 0,
      "color": "#b9786c"
    },
    {
      "shape": "box",
      "width": 0.35,
      "height": 0.06,
      "depth": 0.05,
      "x": 0,
      "y": 0.94,
      "z": 0.17,
      "color": "#f0dfc8"
    }
  ],
  "id": "generated-47bc40ab-9f1b-4c6c-95d5-9d084bbf4a66",
  "width": 0.55,
  "depth": 0.45,
  "heightApprox": 1.29,
  "coloring": "Room-linked colors: frame, accent, wood. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-47bc40ab-9f1b-4c6c-95d5-9d084bbf4a66",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/book-recommendation-stand.ts"
} satisfies AssetDefinition;
