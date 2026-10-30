import type { AssetDefinition } from "./types.js";

export default {
  "label": "Freestanding Menu Kiosk",
  "description": "Tall menu panel above a shallow service shelf.",
  "function": "Use as a freestanding menu kiosk in a coffee shop layout.",
  "moodTags": [
    "coffee",
    "freestanding",
    "menu",
    "kiosk"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.05,
      "height": 0.9,
      "depth": 0.08,
      "x": 0,
      "y": 1.3,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.9500000000000001,
      "height": 0.8,
      "depth": 0.025,
      "x": 0,
      "y": 1.3,
      "z": 0.055,
      "color": "#394454"
    },
    {
      "shape": "box",
      "width": 0.6825000000000001,
      "height": 0.025,
      "depth": 0.025,
      "x": 0,
      "y": 1.1,
      "z": 0.08,
      "color": "#efe2cd"
    },
    {
      "shape": "box",
      "width": 0.6825000000000001,
      "height": 0.025,
      "depth": 0.025,
      "x": 0,
      "y": 1.3,
      "z": 0.08,
      "color": "#efe2cd"
    },
    {
      "shape": "box",
      "width": 0.6825000000000001,
      "height": 0.025,
      "depth": 0.025,
      "x": 0,
      "y": 1.5,
      "z": 0.08,
      "color": "#efe2cd"
    },
    {
      "shape": "box",
      "width": 0.07,
      "height": 1.75,
      "depth": 0.07,
      "x": -0.48,
      "y": 0.875,
      "z": -0.06,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.07,
      "height": 1.75,
      "depth": 0.07,
      "x": 0.48,
      "y": 0.875,
      "z": -0.06,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.1,
      "height": 0.07,
      "depth": 0.35,
      "x": 0,
      "y": 0.82,
      "z": 0.07,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.2,
      "height": 0.07,
      "depth": 0.45,
      "x": 0,
      "y": 0.035,
      "z": 0,
      "color": "frame"
    }
  ],
  "id": "generated-162fabe7-11f8-4f83-a540-b86139151795",
  "width": 1.2,
  "depth": 0.49,
  "heightApprox": 1.75,
  "coloring": "Room-linked colors: frame, wood. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-162fabe7-11f8-4f83-a540-b86139151795",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/freestanding-menu-kiosk.ts"
} satisfies AssetDefinition;
