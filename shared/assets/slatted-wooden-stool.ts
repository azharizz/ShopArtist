import type { AssetDefinition } from "./types.js";

export default {
  "label": "Slatted Wooden Stool",
  "description": "Square stool with a slatted timber seat.",
  "function": "Use as a slatted wooden stool in a coffee shop layout.",
  "moodTags": [
    "coffee",
    "slatted",
    "wooden",
    "stool"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 0.05,
      "height": 0.44,
      "depth": 0.05,
      "x": -0.15,
      "y": 0.22,
      "z": -0.15,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.05,
      "height": 0.44,
      "depth": 0.05,
      "x": -0.15,
      "y": 0.22,
      "z": 0.15,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.05,
      "height": 0.44,
      "depth": 0.05,
      "x": 0.15,
      "y": 0.22,
      "z": -0.15,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.05,
      "height": 0.44,
      "depth": 0.05,
      "x": 0.15,
      "y": 0.22,
      "z": 0.15,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.4,
      "height": 0.06,
      "depth": 0.11,
      "x": 0,
      "y": 0.47,
      "z": -0.13,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.4,
      "height": 0.06,
      "depth": 0.11,
      "x": 0,
      "y": 0.47,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.4,
      "height": 0.06,
      "depth": 0.11,
      "x": 0,
      "y": 0.47,
      "z": 0.13,
      "color": "wood"
    }
  ],
  "id": "generated-9284b773-566c-4159-a9f6-89c4dcbfb347",
  "width": 0.4,
  "depth": 0.37,
  "heightApprox": 0.5,
  "coloring": "Room-linked colors: frame, wood. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-9284b773-566c-4159-a9f6-89c4dcbfb347",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/slatted-wooden-stool.ts"
} satisfies AssetDefinition;
