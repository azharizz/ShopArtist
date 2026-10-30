import type { AssetDefinition } from "./types.js";

export default {
  "label": "Tripod Style Floor Lamp",
  "description": "A lamp shade above three straight support legs.",
  "function": "Use as a tripod style floor lamp in a decor shop layout.",
  "moodTags": [
    "decor",
    "tripod",
    "floor",
    "lamp"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 0.05,
      "height": 1.35,
      "depth": 0.05,
      "x": -0.2,
      "y": 0.675,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.05,
      "height": 1.35,
      "depth": 0.05,
      "x": 0,
      "y": 0.675,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.05,
      "height": 1.35,
      "depth": 0.05,
      "x": 0.2,
      "y": 0.675,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.4,
      "height": 0.3,
      "depth": 0.4,
      "x": 0,
      "y": 1.5,
      "z": 0,
      "color": "#efe2cd"
    },
    {
      "shape": "box",
      "width": 0.55,
      "height": 0.06,
      "depth": 0.35,
      "x": 0,
      "y": 0.03,
      "z": 0,
      "color": "frame"
    }
  ],
  "id": "generated-37b61fda-885f-4247-a918-a01599eaf4a8",
  "width": 0.55,
  "depth": 0.4,
  "heightApprox": 1.65,
  "coloring": "Room-linked colors: frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-37b61fda-885f-4247-a918-a01599eaf4a8",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/tripod-style-floor-lamp.ts"
} satisfies AssetDefinition;
