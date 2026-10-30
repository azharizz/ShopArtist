import type { AssetDefinition } from "./types.js";

export default {
  "label": "Standing Menu Board",
  "description": "A freestanding framed menu board with a stable pedestal.",
  "function": "Display a menu or shop announcement.",
  "moodTags": [
    "cafe",
    "menu",
    "signage"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 0.55,
      "height": 0.06,
      "depth": 0.38,
      "x": 0,
      "y": 0.03,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.75,
      "depth": 0.06,
      "x": 0,
      "y": 0.435,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.72,
      "height": 0.68,
      "depth": 0.08,
      "x": 0,
      "y": 1.15,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.62,
      "height": 0.57,
      "depth": 0.025,
      "x": 0,
      "y": 1.15,
      "z": 0.055,
      "color": "#394454"
    },
    {
      "shape": "box",
      "width": 0.46,
      "height": 0.025,
      "depth": 0.025,
      "x": -0.03,
      "y": 1.32,
      "z": 0.08,
      "color": "#f0dfc8"
    },
    {
      "shape": "box",
      "width": 0.36,
      "height": 0.025,
      "depth": 0.025,
      "x": -0.03,
      "y": 1.2,
      "z": 0.08,
      "color": "#f0dfc8"
    },
    {
      "shape": "box",
      "width": 0.46,
      "height": 0.025,
      "depth": 0.025,
      "x": -0.03,
      "y": 1.08,
      "z": 0.08,
      "color": "#f0dfc8"
    },
    {
      "shape": "box",
      "width": 0.36,
      "height": 0.025,
      "depth": 0.025,
      "x": -0.03,
      "y": 0.96,
      "z": 0.08,
      "color": "#f0dfc8"
    }
  ],
  "id": "generated-1f84f663-5f5d-4dba-bbf0-4f4a7ef28346",
  "width": 0.72,
  "depth": 0.38,
  "heightApprox": 1.49,
  "coloring": "Room-linked colors: frame, wood. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-1f84f663-5f5d-4dba-bbf0-4f4a7ef28346",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/standing-menu-board.ts"
} satisfies AssetDefinition;
