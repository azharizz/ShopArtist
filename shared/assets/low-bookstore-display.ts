import type { AssetDefinition } from "./types.js";

export default {
  "label": "Low Bookstore Display",
  "description": "A waist-height book display with stepped tiers and colorful book-like blocks.",
  "function": "Present book covers and featured titles.",
  "moodTags": [
    "bookshop",
    "welcoming",
    "curated"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.5,
      "height": 0.1,
      "depth": 0.65,
      "x": 0,
      "y": 0.05,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.08,
      "height": 0.72,
      "depth": 0.65,
      "x": -0.71,
      "y": 0.46,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.08,
      "height": 0.72,
      "depth": 0.65,
      "x": 0.71,
      "y": 0.46,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.34,
      "height": 0.62,
      "depth": 0.06,
      "x": 0,
      "y": 0.42,
      "z": -0.29,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.32,
      "height": 0.06,
      "depth": 0.53,
      "x": 0,
      "y": 0.26,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.32,
      "height": 0.06,
      "depth": 0.33,
      "x": 0,
      "y": 0.52,
      "z": -0.1,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.32,
      "height": 0.05,
      "depth": 0.12,
      "x": 0,
      "y": 0.74,
      "z": -0.2,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.2,
      "height": 0.27,
      "depth": 0.045,
      "x": -0.46,
      "y": 0.405,
      "z": 0.12,
      "color": "#ae6d6b"
    },
    {
      "shape": "box",
      "width": 0.2,
      "height": 0.27,
      "depth": 0.045,
      "x": -0.18,
      "y": 0.405,
      "z": 0.12,
      "color": "#f1dfcb"
    },
    {
      "shape": "box",
      "width": 0.2,
      "height": 0.27,
      "depth": 0.045,
      "x": 0.12,
      "y": 0.405,
      "z": 0.12,
      "color": "#748c68"
    },
    {
      "shape": "box",
      "width": 0.2,
      "height": 0.27,
      "depth": 0.045,
      "x": 0.4,
      "y": 0.405,
      "z": 0.12,
      "color": "#8c7894"
    }
  ],
  "id": "generated-2a174e51-5cba-46c8-9e86-c1a4bc8d624c",
  "width": 1.5,
  "depth": 0.65,
  "heightApprox": 0.82,
  "coloring": "Room-linked colors: frame, wood. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-2a174e51-5cba-46c8-9e86-c1a4bc8d624c",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/low-bookstore-display.ts"
} satisfies AssetDefinition;
