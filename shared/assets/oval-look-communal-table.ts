import type { AssetDefinition } from "./types.js";

export default {
  "label": "Oval Look Communal Table",
  "description": "Long table with rounded-looking cylindrical ends.",
  "function": "Use as a oval look communal table in a coffee shop layout.",
  "moodTags": [
    "coffee",
    "oval",
    "communal",
    "table"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.8,
      "height": 0.08,
      "depth": 0.75,
      "x": 0,
      "y": 0.75,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.71,
      "depth": 0.06,
      "x": -0.8200000000000001,
      "y": 0.355,
      "z": -0.295,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.71,
      "depth": 0.06,
      "x": -0.8200000000000001,
      "y": 0.355,
      "z": 0.295,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.71,
      "depth": 0.06,
      "x": 0.8200000000000001,
      "y": 0.355,
      "z": -0.295,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.71,
      "depth": 0.06,
      "x": 0.8200000000000001,
      "y": 0.355,
      "z": 0.295,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.75,
      "height": 0.079,
      "depth": 0.75,
      "x": -0.9,
      "y": 0.75,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.75,
      "height": 0.079,
      "depth": 0.75,
      "x": 0.9,
      "y": 0.75,
      "z": 0,
      "color": "frame"
    }
  ],
  "id": "generated-952bf5bf-a02a-4a9d-986d-30e34c878048",
  "width": 2.55,
  "depth": 0.75,
  "heightApprox": 0.79,
  "coloring": "Room-linked colors: wood, frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-952bf5bf-a02a-4a9d-986d-30e34c878048",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/oval-look-communal-table.ts"
} satisfies AssetDefinition;
