import type { AssetDefinition } from "./types.js";

export default {
  "label": "Art and Book Feature Wall",
  "description": "Shared backdrop with open shelves and a framed artwork.",
  "function": "Use as a art and book feature wall in a art shop layout.",
  "moodTags": [
    "art",
    "book",
    "feature",
    "wall"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.7,
      "height": 1.9,
      "depth": 0.08,
      "x": 0,
      "y": 0.95,
      "z": 0,
      "color": "#efe2cd"
    },
    {
      "shape": "box",
      "width": 1.8,
      "height": 0.08,
      "depth": 0.42,
      "x": 0,
      "y": 0.04,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.7,
      "height": 0.05,
      "depth": 0.3,
      "x": -0.4,
      "y": 0.45,
      "z": 0.15,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.7,
      "height": 0.05,
      "depth": 0.3,
      "x": -0.4,
      "y": 0.8,
      "z": 0.15,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.7,
      "height": 0.05,
      "depth": 0.3,
      "x": -0.4,
      "y": 1.15,
      "z": 0.15,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.1,
      "height": 0.24,
      "depth": 0.1,
      "x": -0.6,
      "y": 0.6,
      "z": 0.18,
      "color": "#b8756b"
    },
    {
      "shape": "box",
      "width": 0.1,
      "height": 0.24,
      "depth": 0.1,
      "x": -0.4,
      "y": 0.6,
      "z": 0.18,
      "color": "#6e916c"
    },
    {
      "shape": "box",
      "width": 0.1,
      "height": 0.24,
      "depth": 0.1,
      "x": -0.2,
      "y": 0.6,
      "z": 0.18,
      "color": "#d8a8b7"
    },
    {
      "shape": "box",
      "width": 0.6,
      "height": 0.75,
      "depth": 0.04,
      "x": 0.45,
      "y": 1,
      "z": 0.07,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.5,
      "height": 0.65,
      "depth": 0.025,
      "x": 0.45,
      "y": 1,
      "z": 0.105,
      "color": "#d8a8b7"
    }
  ],
  "id": "generated-7c5d61df-fa20-4787-ab6f-6998c1a1cbe5",
  "width": 1.8,
  "depth": 0.6,
  "heightApprox": 1.9,
  "coloring": "Room-linked colors: frame, wood. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-7c5d61df-fa20-4787-ab6f-6998c1a1cbe5",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/art-and-book-feature-wall.ts"
} satisfies AssetDefinition;
