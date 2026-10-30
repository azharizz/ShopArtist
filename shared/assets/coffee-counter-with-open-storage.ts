import type { AssetDefinition } from "./types.js";

export default {
  "label": "Coffee Counter with Open Storage",
  "description": "Service counter with open shelves and supplies.",
  "function": "Use as a coffee counter with open storage in a coffee shop layout.",
  "moodTags": [
    "coffee",
    "counter",
    "open",
    "storage"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.6,
      "height": 0.1,
      "depth": 0.6,
      "x": 0,
      "y": 0.05,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.7,
      "height": 0.08,
      "depth": 0.68,
      "x": 0,
      "y": 0.91,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.08,
      "height": 0.82,
      "depth": 0.6,
      "x": -0.75,
      "y": 0.51,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.08,
      "height": 0.82,
      "depth": 0.6,
      "x": 0.75,
      "y": 0.51,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.42,
      "height": 0.06,
      "depth": 0.52,
      "x": 0,
      "y": 0.48,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "cylinder",
      "width": 0.14,
      "height": 0.2,
      "depth": 0.14,
      "x": -0.4,
      "y": 0.61,
      "z": 0.1,
      "color": "#efe2cd"
    },
    {
      "shape": "cylinder",
      "width": 0.14,
      "height": 0.2,
      "depth": 0.14,
      "x": 0,
      "y": 0.61,
      "z": 0.1,
      "color": "#efe2cd"
    },
    {
      "shape": "cylinder",
      "width": 0.14,
      "height": 0.2,
      "depth": 0.14,
      "x": 0.4,
      "y": 0.61,
      "z": 0.1,
      "color": "#efe2cd"
    }
  ],
  "id": "generated-563452fe-a588-41d3-8b17-ee24dd2c1fda",
  "width": 1.7,
  "depth": 0.68,
  "heightApprox": 0.95,
  "coloring": "Room-linked colors: frame, wood. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-563452fe-a588-41d3-8b17-ee24dd2c1fda",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/coffee-counter-with-open-storage.ts"
} satisfies AssetDefinition;
