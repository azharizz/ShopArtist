import type { AssetDefinition } from "./types.js";

export default {
  "label": "Art Print Browser",
  "description": "Low open bin with separate vertical print compartments.",
  "function": "Use as a art print browser in a art shop layout.",
  "moodTags": [
    "art",
    "print",
    "browser"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.25,
      "height": 0.1,
      "depth": 0.55,
      "x": 0,
      "y": 0.05,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.65,
      "depth": 0.5,
      "x": -0.58,
      "y": 0.425,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.65,
      "depth": 0.5,
      "x": -0.2,
      "y": 0.425,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.65,
      "depth": 0.5,
      "x": 0.2,
      "y": 0.425,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.65,
      "depth": 0.5,
      "x": 0.58,
      "y": 0.425,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.25,
      "height": 0.18,
      "depth": 0.05,
      "x": 0,
      "y": 0.19,
      "z": 0.25,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.27,
      "height": 0.46,
      "depth": 0.04,
      "x": -0.4,
      "y": 0.42,
      "z": -0.05,
      "color": "#d8a8b7"
    },
    {
      "shape": "box",
      "width": 0.27,
      "height": 0.46,
      "depth": 0.04,
      "x": 0,
      "y": 0.42,
      "z": -0.05,
      "color": "#6e916c"
    },
    {
      "shape": "box",
      "width": 0.27,
      "height": 0.46,
      "depth": 0.04,
      "x": 0.4,
      "y": 0.42,
      "z": -0.05,
      "color": "#efe2cd"
    }
  ],
  "id": "generated-025387a8-38c6-4d5e-b8ae-353b42f4132d",
  "width": 1.25,
  "depth": 0.55,
  "heightApprox": 0.75,
  "coloring": "Room-linked colors: frame, wood. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-025387a8-38c6-4d5e-b8ae-353b42f4132d",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/art-print-browser.ts"
} satisfies AssetDefinition;
