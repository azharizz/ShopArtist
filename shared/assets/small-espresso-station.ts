import type { AssetDefinition } from "./types.js";

export default {
  "label": "Small Espresso Station",
  "description": "A compact coffee station with a counter, lower cabinet and simplified espresso machine.",
  "function": "Prepare and serve espresso in a small shop.",
  "moodTags": [
    "cafe",
    "compact",
    "functional"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.2,
      "height": 0.82,
      "depth": 0.6,
      "x": 0,
      "y": 0.41,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.26,
      "height": 0.08,
      "depth": 0.66,
      "x": 0,
      "y": 0.86,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.05,
      "height": 0.5,
      "depth": 0.025,
      "x": 0,
      "y": 0.42,
      "z": 0.305,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.48,
      "height": 0.27,
      "depth": 0.32,
      "x": -0.22,
      "y": 1.035,
      "z": -0.04,
      "color": "#bbb9b4"
    },
    {
      "shape": "box",
      "width": 0.38,
      "height": 0.12,
      "depth": 0.22,
      "x": -0.22,
      "y": 0.96,
      "z": 0.14,
      "color": "#878983"
    },
    {
      "shape": "box",
      "width": 0.1,
      "height": 0.1,
      "depth": 0.08,
      "x": 0.22,
      "y": 0.95,
      "z": 0.1,
      "color": "#f1dfcb"
    },
    {
      "shape": "cylinder",
      "width": 0.1,
      "height": 0.1,
      "depth": 0.1,
      "x": 0.45,
      "y": 0.95,
      "z": 0.12,
      "color": "#f1dfcb"
    },
    {
      "shape": "box",
      "width": 0.12,
      "height": 0.025,
      "depth": 0.14,
      "x": 0.45,
      "y": 0.905,
      "z": 0.12,
      "color": "frame"
    }
  ],
  "id": "generated-34641e63-1a13-4415-9525-057b25b0fa0c",
  "width": 1.26,
  "depth": 0.66,
  "heightApprox": 1.17,
  "coloring": "Room-linked colors: frame, wood, accent. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-34641e63-1a13-4415-9525-057b25b0fa0c",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/small-espresso-station.ts"
} satisfies AssetDefinition;
