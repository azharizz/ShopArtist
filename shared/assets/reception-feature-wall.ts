import type { AssetDefinition } from "./types.js";

export default {
  "label": "Reception Feature Wall",
  "description": "A framed backdrop with a central sign and small shelf.",
  "function": "Use as a reception feature wall in a retail shop layout.",
  "moodTags": [
    "retail",
    "reception",
    "feature",
    "wall"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.65,
      "height": 1.9,
      "depth": 0.08,
      "x": 0,
      "y": 0.95,
      "z": 0,
      "color": "#efe2cd"
    },
    {
      "shape": "box",
      "width": 1.75,
      "height": 0.08,
      "depth": 0.42,
      "x": 0,
      "y": 0.04,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.1,
      "height": 0.55,
      "depth": 0.04,
      "x": 0,
      "y": 1.25,
      "z": 0.07,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.9,
      "height": 0.35,
      "depth": 0.025,
      "x": 0,
      "y": 1.25,
      "z": 0.105,
      "color": "#d8a8b7"
    },
    {
      "shape": "box",
      "width": 0.9,
      "height": 0.06,
      "depth": 0.3,
      "x": 0,
      "y": 0.55,
      "z": 0.15,
      "color": "wood"
    }
  ],
  "id": "generated-3156c59a-3438-405c-9bf2-7ec4440a5000",
  "width": 1.75,
  "depth": 0.6,
  "heightApprox": 1.9,
  "coloring": "Room-linked colors: frame, wood. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-3156c59a-3438-405c-9bf2-7ec4440a5000",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/reception-feature-wall.ts"
} satisfies AssetDefinition;
