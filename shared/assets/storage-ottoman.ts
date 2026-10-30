import type { AssetDefinition } from "./types.js";

export default {
  "label": "Storage Ottoman",
  "description": "Padded rectangular ottoman with a contrasting storage base.",
  "function": "Use as a storage ottoman in a coffee shop layout.",
  "moodTags": [
    "coffee",
    "storage",
    "ottoman"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 0.75,
      "height": 0.32,
      "depth": 0.55,
      "x": 0,
      "y": 0.16,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.8,
      "height": 0.13,
      "depth": 0.6,
      "x": 0,
      "y": 0.385,
      "z": 0,
      "color": "accent"
    }
  ],
  "id": "generated-7aad4190-a2c4-4c8d-bb77-c359b1476bca",
  "width": 0.8,
  "depth": 0.6,
  "heightApprox": 0.45,
  "coloring": "Room-linked colors: frame, accent. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-7aad4190-a2c4-4c8d-bb77-c359b1476bca",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/storage-ottoman.ts"
} satisfies AssetDefinition;
