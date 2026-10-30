import type { AssetDefinition } from "./types.js";

export default {
  "label": "Mixed Storage Cabinet",
  "description": "Cabinet with closed lower bays and open upper shelving.",
  "function": "Use as a mixed storage cabinet in a retail shop layout.",
  "moodTags": [
    "retail",
    "mixed",
    "storage",
    "cabinet"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.4,
      "height": 0.08,
      "depth": 0.4,
      "x": 0,
      "y": 0.04,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.2799999999999998,
      "height": 1.6400000000000001,
      "depth": 0.035,
      "x": 0,
      "y": 0.9,
      "z": -0.17500000000000002,
      "color": "#efe2cd"
    },
    {
      "shape": "box",
      "width": 0.08,
      "height": 1.72,
      "depth": 0.4,
      "x": -0.6599999999999999,
      "y": 0.9400000000000001,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.08,
      "height": 1.72,
      "depth": 0.4,
      "x": 0.6599999999999999,
      "y": 0.9400000000000001,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.24,
      "height": 0.05,
      "depth": 0.35000000000000003,
      "x": 0,
      "y": 0.36,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.24,
      "height": 0.05,
      "depth": 0.35000000000000003,
      "x": 0,
      "y": 0.7,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.24,
      "height": 0.05,
      "depth": 0.35000000000000003,
      "x": 0,
      "y": 1.04,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.24,
      "height": 0.05,
      "depth": 0.35000000000000003,
      "x": 0,
      "y": 1.38,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.4,
      "height": 0.08,
      "depth": 0.4,
      "x": 0,
      "y": 1.76,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.25,
      "height": 0.48,
      "depth": 0.35,
      "x": 0,
      "y": 0.3,
      "z": 0.01,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.55,
      "height": 0.35,
      "depth": 0.025,
      "x": -0.31,
      "y": 0.3,
      "z": 0.2,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.55,
      "height": 0.35,
      "depth": 0.025,
      "x": 0.31,
      "y": 0.3,
      "z": 0.2,
      "color": "accent"
    }
  ],
  "id": "generated-da64e553-bd98-44cd-b097-7d7927c62cc7",
  "width": 1.4,
  "depth": 0.43,
  "heightApprox": 1.8,
  "coloring": "Room-linked colors: frame, wood, accent. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-da64e553-bd98-44cd-b097-7d7927c62cc7",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/mixed-storage-cabinet.ts"
} satisfies AssetDefinition;
