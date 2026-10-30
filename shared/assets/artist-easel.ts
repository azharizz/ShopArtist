import type { AssetDefinition } from "./types.js";

export default {
  "label": "Artist Easel",
  "description": "Floor-standing frame supporting a rectangular canvas.",
  "function": "Use as a artist easel in a art shop layout.",
  "moodTags": [
    "art",
    "artist",
    "easel"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 0.75,
      "height": 0.08,
      "depth": 0.45,
      "x": 0,
      "y": 0.04,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.07,
      "height": 1.65,
      "depth": 0.07,
      "x": 0,
      "y": 0.9,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.9,
      "height": 0.07,
      "depth": 0.25,
      "x": 0,
      "y": 0.65,
      "z": 0.04,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.75,
      "height": 0.85,
      "depth": 0.06,
      "x": 0,
      "y": 1.12,
      "z": 0.04,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.64,
      "height": 0.74,
      "depth": 0.025,
      "x": 0,
      "y": 1.12,
      "z": 0.09,
      "color": "#d8a8b7"
    }
  ],
  "id": "generated-bbb2813b-d5f7-458d-b0b2-58f02c2a1a3b",
  "width": 0.9,
  "depth": 0.45,
  "heightApprox": 1.73,
  "coloring": "Room-linked colors: frame, wood. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-bbb2813b-d5f7-458d-b0b2-58f02c2a1a3b",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/artist-easel.ts"
} satisfies AssetDefinition;
