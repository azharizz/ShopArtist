import type { AssetDefinition } from "./types.js";

export default {
  "label": "Bridge Display",
  "description": "Two pedestals joined by an overhead frame.",
  "function": "Use as a bridge display in a retail shop layout.",
  "moodTags": [
    "retail",
    "bridge"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 0.45,
      "height": 0.55,
      "depth": 0.42,
      "x": -0.65,
      "y": 0.275,
      "z": 0,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.51,
      "height": 0.06,
      "depth": 0.48,
      "x": -0.65,
      "y": 0.5800000000000001,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.45,
      "height": 0.55,
      "depth": 0.42,
      "x": 0.65,
      "y": 0.275,
      "z": 0,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.51,
      "height": 0.06,
      "depth": 0.48,
      "x": 0.65,
      "y": 0.5800000000000001,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 1.35,
      "depth": 0.06,
      "x": -0.65,
      "y": 1.255,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 1.35,
      "depth": 0.06,
      "x": 0.65,
      "y": 1.255,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.36,
      "height": 0.07,
      "depth": 0.07,
      "x": 0,
      "y": 1.96,
      "z": 0,
      "color": "frame"
    }
  ],
  "id": "generated-4a000596-e7a6-45e3-b8ea-063a1d77e76b",
  "width": 1.81,
  "depth": 0.48,
  "heightApprox": 2,
  "coloring": "Room-linked colors: accent, wood, frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-4a000596-e7a6-45e3-b8ea-063a1d77e76b",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/bridge-display.ts"
} satisfies AssetDefinition;
