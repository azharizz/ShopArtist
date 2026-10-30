import type { AssetDefinition } from "./types.js";

export default {
  "label": "Gallery Display Wall",
  "description": "Freestanding white gallery panel with three framed abstract artworks.",
  "function": "Display artwork or separate exhibition zones.",
  "moodTags": [
    "art",
    "gallery",
    "minimal"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 2,
      "height": 0.12,
      "depth": 0.5,
      "x": 0,
      "y": 0.06,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.9,
      "height": 1.8,
      "depth": 0.08,
      "x": 0,
      "y": 1.02,
      "z": 0,
      "color": "#f0dfc8"
    },
    {
      "shape": "box",
      "width": 0.5,
      "height": 0.65,
      "depth": 0.04,
      "x": -0.6,
      "y": 1.2,
      "z": 0.06,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.5,
      "height": 0.65,
      "depth": 0.04,
      "x": 0,
      "y": 1.2,
      "z": 0.06,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.5,
      "height": 0.65,
      "depth": 0.04,
      "x": 0.6,
      "y": 1.2,
      "z": 0.06,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.4,
      "height": 0.55,
      "depth": 0.025,
      "x": -0.6,
      "y": 1.2,
      "z": 0.095,
      "color": "#d8abb6"
    },
    {
      "shape": "box",
      "width": 0.4,
      "height": 0.55,
      "depth": 0.025,
      "x": 0,
      "y": 1.2,
      "z": 0.095,
      "color": "#72916b"
    },
    {
      "shape": "box",
      "width": 0.4,
      "height": 0.55,
      "depth": 0.025,
      "x": 0.6,
      "y": 1.2,
      "z": 0.095,
      "color": "#394454"
    }
  ],
  "id": "generated-2aed59ed-8677-410a-b2a9-e2312f2a043a",
  "width": 2,
  "depth": 0.5,
  "heightApprox": 1.92,
  "coloring": "Room-linked colors: frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-2aed59ed-8677-410a-b2a9-e2312f2a043a",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/gallery-display-wall.ts"
} satisfies AssetDefinition;
