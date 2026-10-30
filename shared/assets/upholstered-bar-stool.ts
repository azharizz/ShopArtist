import type { AssetDefinition } from "./types.js";

export default {
  "label": "Upholstered Bar Stool",
  "description": "Tall stool with a round cushioned top and weighted foot.",
  "function": "Use as a upholstered bar stool in a coffee shop layout.",
  "moodTags": [
    "coffee",
    "upholstered",
    "stool"
  ],
  "geometry": [
    {
      "shape": "cylinder",
      "width": 0.32,
      "height": 0.08,
      "depth": 0.32,
      "x": 0,
      "y": 0.75,
      "z": 0,
      "color": "accent"
    },
    {
      "shape": "cylinder",
      "width": 0.05,
      "height": 0.71,
      "depth": 0.05,
      "x": 0,
      "y": 0.355,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.28,
      "height": 0.04,
      "depth": 0.28,
      "x": 0,
      "y": 0.02,
      "z": 0,
      "color": "frame"
    }
  ],
  "id": "generated-35467a79-17f4-4998-9a15-93b7b8b96a3f",
  "width": 0.32,
  "depth": 0.32,
  "heightApprox": 0.79,
  "coloring": "Room-linked colors: accent, frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-35467a79-17f4-4998-9a15-93b7b8b96a3f",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/upholstered-bar-stool.ts"
} satisfies AssetDefinition;
