import type { AssetDefinition } from "./types.js";

export default {
  "label": "Book Browsing Trough",
  "description": "Wide open bin with several book dividers.",
  "function": "Use as a book browsing trough in a book shop layout.",
  "moodTags": [
    "book",
    "browsing",
    "trough"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.3,
      "height": 0.08,
      "depth": 0.5,
      "x": 0,
      "y": 0.04,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.3,
      "height": 0.25,
      "depth": 0.05,
      "x": 0,
      "y": 0.205,
      "z": 0.23,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.3,
      "height": 0.25,
      "depth": 0.05,
      "x": 0,
      "y": 0.205,
      "z": -0.23,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.25,
      "depth": 0.46,
      "x": -0.62,
      "y": 0.205,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.25,
      "depth": 0.46,
      "x": -0.2,
      "y": 0.205,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.25,
      "depth": 0.46,
      "x": 0.2,
      "y": 0.205,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.25,
      "depth": 0.46,
      "x": 0.62,
      "y": 0.205,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.1,
      "height": 0.24,
      "depth": 0.1,
      "x": -0.4,
      "y": 0.2,
      "z": 0.08,
      "color": "#b8756b"
    },
    {
      "shape": "box",
      "width": 0.1,
      "height": 0.24,
      "depth": 0.1,
      "x": 0,
      "y": 0.2,
      "z": 0.08,
      "color": "#6e916c"
    },
    {
      "shape": "box",
      "width": 0.1,
      "height": 0.24,
      "depth": 0.1,
      "x": 0.4,
      "y": 0.2,
      "z": 0.08,
      "color": "#d8a8b7"
    }
  ],
  "id": "generated-002bc5cc-1f49-4f50-b009-b0d58580c2b7",
  "width": 1.3,
  "depth": 0.51,
  "heightApprox": 0.33,
  "coloring": "Room-linked colors: frame, wood. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-002bc5cc-1f49-4f50-b009-b0d58580c2b7",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/book-browsing-trough.ts"
} satisfies AssetDefinition;
