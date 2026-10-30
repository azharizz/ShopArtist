import type { AssetDefinition } from "./types.js";

export default {
  "label": "Decorative Column",
  "description": "A tall column with a contrasting stepped base and capital.",
  "function": "Use as a decorative column in a decor shop layout.",
  "moodTags": [
    "decor",
    "decorative",
    "column"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 0.55,
      "height": 0.1,
      "depth": 0.55,
      "x": 0,
      "y": 0.05,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.35,
      "height": 1.6,
      "depth": 0.35,
      "x": 0,
      "y": 0.9,
      "z": 0,
      "color": "#efe2cd"
    },
    {
      "shape": "box",
      "width": 0.48,
      "height": 0.1,
      "depth": 0.48,
      "x": 0,
      "y": 1.75,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.6,
      "height": 0.08,
      "depth": 0.6,
      "x": 0,
      "y": 1.84,
      "z": 0,
      "color": "frame"
    }
  ],
  "id": "generated-0e3cca66-b7d9-4d03-a126-5d0cef5924c9",
  "width": 0.6,
  "depth": 0.6,
  "heightApprox": 1.88,
  "coloring": "Room-linked colors: frame, wood. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-0e3cca66-b7d9-4d03-a126-5d0cef5924c9",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/decorative-column.ts"
} satisfies AssetDefinition;
