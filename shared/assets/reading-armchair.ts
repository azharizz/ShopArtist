import type { AssetDefinition } from "./types.js";

export default {
  "label": "Reading Armchair",
  "description": "An upholstered armchair with a wide back, arms and short dark legs.",
  "function": "Offer a comfortable reading seat.",
  "moodTags": [
    "books",
    "reading",
    "cozy"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 0.9,
      "height": 0.18,
      "depth": 0.65,
      "x": 0,
      "y": 0.42,
      "z": 0,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.9,
      "height": 0.48,
      "depth": 0.12,
      "x": 0,
      "y": 0.72,
      "z": -0.26,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.08,
      "height": 0.34,
      "depth": 0.56,
      "x": -0.3,
      "y": 0.25,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.08,
      "height": 0.34,
      "depth": 0.56,
      "x": 0.3,
      "y": 0.25,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.12,
      "height": 0.4,
      "depth": 0.65,
      "x": -0.41,
      "y": 0.6,
      "z": 0,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.12,
      "height": 0.4,
      "depth": 0.65,
      "x": 0.41,
      "y": 0.6,
      "z": 0,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.65,
      "height": 0.31,
      "depth": 0.09,
      "x": 0,
      "y": 0.76,
      "z": -0.17,
      "color": "#f0dfc8"
    }
  ],
  "id": "generated-08f0cf3a-4717-4a38-b63c-9e0e7df597c0",
  "width": 0.94,
  "depth": 0.65,
  "heightApprox": 0.96,
  "coloring": "Room-linked colors: accent, frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-08f0cf3a-4717-4a38-b63c-9e0e7df597c0",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/reading-armchair.ts"
} satisfies AssetDefinition;
