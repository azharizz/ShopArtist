import type { AssetDefinition } from "./types.js";

export default {
  "label": "Book and Plant Divider",
  "description": "A low open bookcase with integrated planters and upright greenery.",
  "function": "Divide a room while displaying books and plants.",
  "moodTags": [
    "books",
    "natural",
    "zoning"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.6,
      "height": 0.09,
      "depth": 0.45,
      "x": 0,
      "y": 0.045,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.84,
      "depth": 0.42,
      "x": -0.75,
      "y": 0.51,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.84,
      "depth": 0.42,
      "x": 0,
      "y": 0.51,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.84,
      "depth": 0.42,
      "x": 0.75,
      "y": 0.51,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.5,
      "height": 0.06,
      "depth": 0.4,
      "x": 0,
      "y": 0.45,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.6,
      "height": 0.08,
      "depth": 0.46,
      "x": 0,
      "y": 0.95,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "cylinder",
      "width": 0.24,
      "height": 0.18,
      "depth": 0.24,
      "x": -0.48,
      "y": 1.08,
      "z": 0,
      "color": "#b7816b"
    },
    {
      "shape": "cylinder",
      "width": 0.24,
      "height": 0.18,
      "depth": 0.24,
      "x": 0.48,
      "y": 1.08,
      "z": 0,
      "color": "#b7816b"
    },
    {
      "shape": "cylinder",
      "width": 0.09,
      "height": 0.38,
      "depth": 0.09,
      "x": -0.54,
      "y": 1.35,
      "z": 0,
      "color": "#72916b"
    },
    {
      "shape": "cylinder",
      "width": 0.09,
      "height": 0.38,
      "depth": 0.09,
      "x": -0.42,
      "y": 1.35,
      "z": 0,
      "color": "#72916b"
    },
    {
      "shape": "cylinder",
      "width": 0.09,
      "height": 0.38,
      "depth": 0.09,
      "x": 0.42,
      "y": 1.35,
      "z": 0,
      "color": "#72916b"
    },
    {
      "shape": "cylinder",
      "width": 0.09,
      "height": 0.38,
      "depth": 0.09,
      "x": 0.54,
      "y": 1.35,
      "z": 0,
      "color": "#72916b"
    },
    {
      "shape": "box",
      "width": 0.12,
      "height": 0.25,
      "depth": 0.09,
      "x": -0.5,
      "y": 0.605,
      "z": 0.04,
      "color": "#b9786c"
    },
    {
      "shape": "box",
      "width": 0.12,
      "height": 0.25,
      "depth": 0.09,
      "x": -0.32,
      "y": 0.605,
      "z": 0.04,
      "color": "#f0dfc8"
    },
    {
      "shape": "box",
      "width": 0.12,
      "height": 0.25,
      "depth": 0.09,
      "x": 0.25,
      "y": 0.605,
      "z": 0.04,
      "color": "#394454"
    },
    {
      "shape": "box",
      "width": 0.12,
      "height": 0.25,
      "depth": 0.09,
      "x": 0.43,
      "y": 0.605,
      "z": 0.04,
      "color": "#d8abb6"
    }
  ],
  "id": "generated-7bb7302b-d87f-437d-aa45-dd4b6ce52689",
  "width": 1.6,
  "depth": 0.46,
  "heightApprox": 1.54,
  "coloring": "Room-linked colors: frame, wood. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-7bb7302b-d87f-437d-aa45-dd4b6ce52689",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/book-and-plant-divider.ts"
} satisfies AssetDefinition;
