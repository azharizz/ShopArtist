import type { AssetDefinition } from "./types.js";

export default {
  "label": "Double Shade Floor Lamp",
  "description": "Standing lamp with two offset cylindrical shades.",
  "function": "Use as a double shade floor lamp in a decor shop layout.",
  "moodTags": [
    "decor",
    "double",
    "shade",
    "floor",
    "lamp"
  ],
  "geometry": [
    {
      "shape": "cylinder",
      "width": 0.35,
      "height": 0.06,
      "depth": 0.35,
      "x": 0,
      "y": 0.03,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.045,
      "height": 1.6,
      "depth": 0.045,
      "x": 0,
      "y": 0.86,
      "z": 0,
      "color": "#c3a36d"
    },
    {
      "shape": "box",
      "width": 0.65,
      "height": 0.04,
      "depth": 0.04,
      "x": 0,
      "y": 1.5,
      "z": 0,
      "color": "#c3a36d"
    },
    {
      "shape": "cylinder",
      "width": 0.25,
      "height": 0.22,
      "depth": 0.25,
      "x": -0.28,
      "y": 1.63,
      "z": 0,
      "color": "#efe2cd"
    },
    {
      "shape": "cylinder",
      "width": 0.25,
      "height": 0.22,
      "depth": 0.25,
      "x": 0.28,
      "y": 1.63,
      "z": 0,
      "color": "#efe2cd"
    }
  ],
  "id": "generated-1cd26e88-8400-4c16-9bd8-c1cf46c15ba7",
  "width": 0.81,
  "depth": 0.35,
  "heightApprox": 1.74,
  "coloring": "Room-linked colors: frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-1cd26e88-8400-4c16-9bd8-c1cf46c15ba7",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/double-shade-floor-lamp.ts"
} satisfies AssetDefinition;
