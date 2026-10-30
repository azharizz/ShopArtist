import type { AssetDefinition } from "./types.js";

export default {
  "label": "Cafe Banquette Seating",
  "description": "Long upholstered wall bench with a padded back and a dark plinth.",
  "function": "Seat guests along a wall.",
  "moodTags": [
    "cafe",
    "seating",
    "cozy"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 2,
      "height": 0.24,
      "depth": 0.65,
      "x": 0,
      "y": 0.12,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 2,
      "height": 0.24,
      "depth": 0.65,
      "x": 0,
      "y": 0.36,
      "z": 0,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 2,
      "height": 0.68,
      "depth": 0.15,
      "x": 0,
      "y": 0.79,
      "z": -0.25,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.6,
      "height": 0.5,
      "depth": 0.07,
      "x": -0.67,
      "y": 0.8,
      "z": -0.14,
      "color": "#f0dfc8"
    },
    {
      "shape": "box",
      "width": 0.6,
      "height": 0.5,
      "depth": 0.07,
      "x": 0,
      "y": 0.8,
      "z": -0.14,
      "color": "#f0dfc8"
    },
    {
      "shape": "box",
      "width": 0.6,
      "height": 0.5,
      "depth": 0.07,
      "x": 0.67,
      "y": 0.8,
      "z": -0.14,
      "color": "#f0dfc8"
    }
  ],
  "id": "generated-1927f461-7ef8-4691-9100-3d1b3b5d2ed4",
  "width": 2,
  "depth": 0.65,
  "heightApprox": 1.13,
  "coloring": "Room-linked colors: frame, accent. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-1927f461-7ef8-4691-9100-3d1b3b5d2ed4",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/cafe-banquette-seating.ts"
} satisfies AssetDefinition;
