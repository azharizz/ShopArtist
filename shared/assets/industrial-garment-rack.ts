import type { AssetDefinition } from "./types.js";

export default {
  "label": "Industrial Garment Rack",
  "description": "Dark freestanding rail with a wood base.",
  "function": "Use as a industrial garment rack in a fashion shop layout.",
  "moodTags": [
    "fashion",
    "industrial",
    "garment",
    "rack"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.4,
      "height": 0.08,
      "depth": 0.45,
      "x": 0,
      "y": 0.04,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 1.7,
      "depth": 0.06,
      "x": -0.65,
      "y": 0.93,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 1.7,
      "depth": 0.06,
      "x": 0.65,
      "y": 0.93,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.35,
      "height": 0.06,
      "depth": 0.06,
      "x": 0,
      "y": 1.81,
      "z": 0,
      "color": "frame"
    }
  ],
  "id": "generated-7af34406-e549-4a47-a8e5-6432d8176f1e",
  "width": 1.4,
  "depth": 0.45,
  "heightApprox": 1.84,
  "coloring": "Room-linked colors: wood, frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-7af34406-e549-4a47-a8e5-6432d8176f1e",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/industrial-garment-rack.ts"
} satisfies AssetDefinition;
