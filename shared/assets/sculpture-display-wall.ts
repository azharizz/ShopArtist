import type { AssetDefinition } from "./types.js";

export default {
  "label": "Sculpture Display Wall",
  "description": "Freestanding backdrop with three projecting display plinths.",
  "function": "Use as a sculpture display wall in a art shop layout.",
  "moodTags": [
    "art",
    "sculpture",
    "wall"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.5,
      "height": 1.85,
      "depth": 0.08,
      "x": 0,
      "y": 0.925,
      "z": 0,
      "color": "#efe2cd"
    },
    {
      "shape": "box",
      "width": 1.6,
      "height": 0.08,
      "depth": 0.42,
      "x": 0,
      "y": 0.04,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.32,
      "height": 0.06,
      "depth": 0.35,
      "x": -0.45,
      "y": 0.5,
      "z": 0.18,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.32,
      "height": 0.06,
      "depth": 0.35,
      "x": 0,
      "y": 1.1,
      "z": 0.18,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.32,
      "height": 0.06,
      "depth": 0.35,
      "x": 0.45,
      "y": 0.75,
      "z": 0.18,
      "color": "wood"
    },
    {
      "shape": "cylinder",
      "width": 0.14,
      "height": 0.2,
      "depth": 0.14,
      "x": -0.45,
      "y": 0.63,
      "z": 0.18,
      "color": "#c3a36d"
    },
    {
      "shape": "cylinder",
      "width": 0.14,
      "height": 0.2,
      "depth": 0.14,
      "x": 0,
      "y": 1.23,
      "z": 0.18,
      "color": "#c3a36d"
    },
    {
      "shape": "cylinder",
      "width": 0.14,
      "height": 0.2,
      "depth": 0.14,
      "x": 0.45,
      "y": 0.88,
      "z": 0.18,
      "color": "#c3a36d"
    }
  ],
  "id": "generated-c5b55c71-7c8c-47d5-8dce-66b552a7f0dc",
  "width": 1.6,
  "depth": 0.71,
  "heightApprox": 1.85,
  "coloring": "Room-linked colors: frame, wood. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-c5b55c71-7c8c-47d5-8dce-66b552a7f0dc",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/sculpture-display-wall.ts"
} satisfies AssetDefinition;
