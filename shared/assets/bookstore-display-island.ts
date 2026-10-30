import type { AssetDefinition } from "./types.js";

export default {
  "label": "Bookstore Display Island",
  "description": "A low double-sided central bookshelf for books and featured titles.",
  "function": "Display books from either side.",
  "moodTags": [
    "books",
    "retail",
    "browsing"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.5,
      "height": 0.1,
      "depth": 0.7,
      "x": 0,
      "y": 0.05,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.9,
      "depth": 0.65,
      "x": 0,
      "y": 0.55,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.08,
      "height": 0.9,
      "depth": 0.65,
      "x": -0.7,
      "y": 0.55,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.08,
      "height": 0.9,
      "depth": 0.65,
      "x": 0.7,
      "y": 0.55,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.32,
      "height": 0.06,
      "depth": 0.65,
      "x": 0,
      "y": 0.35,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.32,
      "height": 0.06,
      "depth": 0.65,
      "x": 0,
      "y": 0.65,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.32,
      "height": 0.06,
      "depth": 0.65,
      "x": 0,
      "y": 0.95,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.13,
      "height": 0.2,
      "depth": 0.09,
      "x": -0.4,
      "y": 0.49,
      "z": 0.16,
      "color": "#d8abb6"
    },
    {
      "shape": "box",
      "width": 0.13,
      "height": 0.2,
      "depth": 0.09,
      "x": -0.18,
      "y": 0.49,
      "z": 0.16,
      "color": "#f0dfc8"
    },
    {
      "shape": "box",
      "width": 0.13,
      "height": 0.2,
      "depth": 0.09,
      "x": 0.2,
      "y": 0.7899999999999999,
      "z": 0.16,
      "color": "#72916b"
    },
    {
      "shape": "box",
      "width": 0.13,
      "height": 0.2,
      "depth": 0.09,
      "x": 0.42,
      "y": 0.7899999999999999,
      "z": 0.16,
      "color": "#394454"
    }
  ],
  "id": "generated-832ec569-6725-42d7-8cb5-058fefe25349",
  "width": 1.5,
  "depth": 0.7,
  "heightApprox": 1,
  "coloring": "Room-linked colors: frame, wood. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-832ec569-6725-42d7-8cb5-058fefe25349",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/bookstore-display-island.ts"
} satisfies AssetDefinition;
