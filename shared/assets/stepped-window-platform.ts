import type { AssetDefinition } from "./types.js";

export default {
  "label": "Stepped Window Platform",
  "description": "Three connected display platforms at different heights.",
  "function": "Use as a stepped window platform in a retail shop layout.",
  "moodTags": [
    "retail",
    "stepped",
    "window",
    "platform"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.5,
      "height": 0.12,
      "depth": 0.65,
      "x": 0,
      "y": 0.06,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.95,
      "height": 0.16,
      "depth": 0.5,
      "x": -0.2,
      "y": 0.2,
      "z": 0,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.45,
      "height": 0.18,
      "depth": 0.35,
      "x": -0.42,
      "y": 0.37,
      "z": 0,
      "color": "wood"
    }
  ],
  "id": "generated-d493df08-0bb3-4ff3-bae9-f47b44364716",
  "width": 1.5,
  "depth": 0.65,
  "heightApprox": 0.46,
  "coloring": "Room-linked colors: frame, accent, wood. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-d493df08-0bb3-4ff3-bae9-f47b44364716",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/stepped-window-platform.ts"
} satisfies AssetDefinition;
