import type { AssetDefinition } from "./types.js";

export default {
  "label": "Low Perimeter Cabinet",
  "description": "A long closed cabinet with a contrasting top.",
  "function": "Use as a low perimeter cabinet in a retail shop layout.",
  "moodTags": [
    "retail",
    "perimeter",
    "cabinet"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.8,
      "height": 0.75,
      "depth": 0.45,
      "x": 0,
      "y": 0.375,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.8800000000000001,
      "height": 0.08,
      "depth": 0.53,
      "x": 0,
      "y": 0.79,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.6,
      "height": 0.5,
      "depth": 0.025,
      "x": 0,
      "y": 0.375,
      "z": 0.24,
      "color": "accent"
    }
  ],
  "id": "generated-a7a2c000-2515-4cf2-b468-acc71183faa9",
  "width": 1.88,
  "depth": 0.53,
  "heightApprox": 0.83,
  "coloring": "Room-linked colors: frame, wood, accent. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-a7a2c000-2515-4cf2-b468-acc71183faa9",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/low-perimeter-cabinet.ts"
} satisfies AssetDefinition;
