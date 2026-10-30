import type { AssetDefinition } from "./types.js";

export default {
  "label": "Book Checkout Counter",
  "description": "A paneled bookstore checkout with register and stacked books.",
  "function": "Handle bookshop sales and customer service.",
  "moodTags": [
    "books",
    "checkout",
    "service"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.5,
      "height": 0.85,
      "depth": 0.65,
      "x": 0,
      "y": 0.425,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.58,
      "height": 0.08,
      "depth": 0.7,
      "x": 0,
      "y": 0.89,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.28,
      "height": 0.52,
      "depth": 0.025,
      "x": 0,
      "y": 0.46,
      "z": 0.335,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.32,
      "height": 0.04,
      "depth": 0.2,
      "x": -0.4,
      "y": 0.95,
      "z": -0.04,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.25,
      "height": 0.18,
      "depth": 0.05,
      "x": -0.4,
      "y": 1.06,
      "z": -0.1,
      "color": "#394454"
    },
    {
      "shape": "box",
      "width": 0.33,
      "height": 0.06,
      "depth": 0.22,
      "x": 0.4,
      "y": 0.96,
      "z": 0,
      "color": "#b9786c"
    },
    {
      "shape": "box",
      "width": 0.3,
      "height": 0.06,
      "depth": 0.2,
      "x": 0.4,
      "y": 1.02,
      "z": 0,
      "color": "#f0dfc8"
    }
  ],
  "id": "generated-23e91f58-3f15-4c8b-b68b-8c06b684ad8c",
  "width": 1.58,
  "depth": 0.7,
  "heightApprox": 1.15,
  "coloring": "Room-linked colors: frame, wood, accent. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-23e91f58-3f15-4c8b-b68b-8c06b684ad8c",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/book-checkout-counter.ts"
} satisfies AssetDefinition;
