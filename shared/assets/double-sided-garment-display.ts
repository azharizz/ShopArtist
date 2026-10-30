import type { AssetDefinition } from "./types.js";

export default {
  "label": "Double Sided Garment Display",
  "description": "Central frame supports rails on both sides.",
  "function": "Use as a double sided garment display in a fashion shop layout.",
  "moodTags": [
    "fashion",
    "double",
    "sided",
    "garment"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.3,
      "height": 0.08,
      "depth": 0.7,
      "x": 0,
      "y": 0.04,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 1.7,
      "depth": 0.06,
      "x": -0.6,
      "y": 0.93,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 1.7,
      "depth": 0.06,
      "x": 0.6,
      "y": 0.93,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.25,
      "height": 0.06,
      "depth": 0.06,
      "x": 0,
      "y": 1.7,
      "z": -0.3,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.25,
      "height": 0.06,
      "depth": 0.06,
      "x": 0,
      "y": 1.7,
      "z": 0.3,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.06,
      "depth": 0.65,
      "x": -0.6,
      "y": 1.7,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.06,
      "depth": 0.65,
      "x": 0.6,
      "y": 1.7,
      "z": 0,
      "color": "frame"
    }
  ],
  "id": "generated-1d83f724-bd4b-4766-a380-a28aeb53d17d",
  "width": 1.3,
  "depth": 0.7,
  "heightApprox": 1.78,
  "coloring": "Room-linked colors: frame, wood. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-1d83f724-bd4b-4766-a380-a28aeb53d17d",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/double-sided-garment-display.ts"
} satisfies AssetDefinition;
