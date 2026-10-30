import type { AssetDefinition } from "./types.js";

export default {
  "label": "Book Cart",
  "description": "A small two-level cart with four wheel-like feet and colorful books.",
  "function": "Move or display a selection of books.",
  "moodTags": [
    "books",
    "storage",
    "mobile"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 0.8,
      "height": 0.07,
      "depth": 0.42,
      "x": 0,
      "y": 0.18,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.8,
      "height": 0.07,
      "depth": 0.42,
      "x": 0,
      "y": 0.65,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.8,
      "depth": 0.06,
      "x": -0.37,
      "y": 0.5,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.8,
      "depth": 0.06,
      "x": 0.37,
      "y": 0.5,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.12,
      "height": 0.08,
      "depth": 0.12,
      "x": -0.31,
      "y": 0.04,
      "z": -0.16,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.12,
      "height": 0.08,
      "depth": 0.12,
      "x": -0.31,
      "y": 0.04,
      "z": 0.16,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.12,
      "height": 0.08,
      "depth": 0.12,
      "x": 0.31,
      "y": 0.04,
      "z": -0.16,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.12,
      "height": 0.08,
      "depth": 0.12,
      "x": 0.31,
      "y": 0.04,
      "z": 0.16,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.13,
      "height": 0.25,
      "depth": 0.09,
      "x": -0.22,
      "y": 0.815,
      "z": 0,
      "color": "#d8abb6"
    },
    {
      "shape": "box",
      "width": 0.13,
      "height": 0.25,
      "depth": 0.09,
      "x": -0.05,
      "y": 0.815,
      "z": 0,
      "color": "#f0dfc8"
    },
    {
      "shape": "box",
      "width": 0.13,
      "height": 0.25,
      "depth": 0.09,
      "x": 0.12,
      "y": 0.815,
      "z": 0,
      "color": "#72916b"
    },
    {
      "shape": "box",
      "width": 0.8,
      "height": 0.04,
      "depth": 0.05,
      "x": 0,
      "y": 0.92,
      "z": 0,
      "color": "frame"
    }
  ],
  "id": "generated-76dbedaf-0c69-485a-adc7-05c8122d5d72",
  "width": 0.8,
  "depth": 0.44,
  "heightApprox": 0.94,
  "coloring": "Room-linked colors: frame, wood. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-76dbedaf-0c69-485a-adc7-05c8122d5d72",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/book-cart.ts"
} satisfies AssetDefinition;
