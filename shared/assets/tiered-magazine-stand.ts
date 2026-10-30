import type { AssetDefinition } from "./types.js";

export default {
  "label": "Tiered Magazine Stand",
  "description": "Stepped display with three magazine ledges.",
  "function": "Use as a tiered magazine stand in a book shop layout.",
  "moodTags": [
    "book",
    "tiered",
    "magazine",
    "stand"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1,
      "height": 0.08,
      "depth": 0.55,
      "x": 0,
      "y": 0.04,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.08,
      "height": 1.15,
      "depth": 0.5,
      "x": -0.46,
      "y": 0.655,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.08,
      "height": 1.15,
      "depth": 0.5,
      "x": 0.46,
      "y": 0.655,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.86,
      "height": 0.06,
      "depth": 0.3,
      "x": 0,
      "y": 0.3,
      "z": 0.1,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.86,
      "height": 0.06,
      "depth": 0.3,
      "x": 0,
      "y": 0.6,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.86,
      "height": 0.06,
      "depth": 0.3,
      "x": 0,
      "y": 0.9,
      "z": -0.1,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.18,
      "height": 0.27,
      "depth": 0.04,
      "x": -0.24,
      "y": 0.46,
      "z": 0.17,
      "color": "#b8756b"
    },
    {
      "shape": "box",
      "width": 0.18,
      "height": 0.27,
      "depth": 0.04,
      "x": 0,
      "y": 0.46,
      "z": 0.17,
      "color": "#6e916c"
    },
    {
      "shape": "box",
      "width": 0.18,
      "height": 0.27,
      "depth": 0.04,
      "x": 0.24,
      "y": 0.46,
      "z": 0.17,
      "color": "#d8a8b7"
    }
  ],
  "id": "generated-e6155c40-17a5-4505-a5fe-88606c0a03f1",
  "width": 1,
  "depth": 0.55,
  "heightApprox": 1.23,
  "coloring": "Room-linked colors: frame, wood. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-e6155c40-17a5-4505-a5fe-88606c0a03f1",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/tiered-magazine-stand.ts"
} satisfies AssetDefinition;
