import type { AssetDefinition } from "./types.js";

export default {
  "label": "Self Service Water Station",
  "description": "Compact unit with a tall drink dispenser and cup storage.",
  "function": "Use as a self service water station in a coffee shop layout.",
  "moodTags": [
    "coffee",
    "self",
    "service",
    "water"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 0.9,
      "height": 0.8,
      "depth": 0.5,
      "x": 0,
      "y": 0.4,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.98,
      "height": 0.08,
      "depth": 0.58,
      "x": 0,
      "y": 0.8400000000000001,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.7,
      "height": 0.55,
      "depth": 0.025,
      "x": 0,
      "y": 0.4,
      "z": 0.265,
      "color": "accent"
    },
    {
      "shape": "cylinder",
      "width": 0.28,
      "height": 0.48,
      "depth": 0.28,
      "x": -0.1,
      "y": 1.12,
      "z": 0,
      "color": "#b5c8c7"
    },
    {
      "shape": "cylinder",
      "width": 0.12,
      "height": 0.08,
      "depth": 0.12,
      "x": 0.25,
      "y": 0.93,
      "z": 0.12,
      "color": "#efe2cd"
    },
    {
      "shape": "box",
      "width": 0.45,
      "height": 0.25,
      "depth": 0.025,
      "x": 0,
      "y": 0.4,
      "z": 0.27,
      "color": "#efe2cd"
    }
  ],
  "id": "generated-584cc900-d88a-45ea-886e-868ede557092",
  "width": 0.98,
  "depth": 0.58,
  "heightApprox": 1.36,
  "coloring": "Room-linked colors: frame, wood, accent. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-584cc900-d88a-45ea-886e-868ede557092",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/self-service-water-station.ts"
} satisfies AssetDefinition;
