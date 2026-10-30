import type { AssetDefinition } from "./types.js";

export default {
  "label": "Tiered Plant Stand",
  "description": "Three staggered platforms holding potted plants.",
  "function": "Use as a tiered plant stand in a decor shop layout.",
  "moodTags": [
    "decor",
    "tiered",
    "plant",
    "stand"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.2,
      "height": 0.1,
      "depth": 0.45,
      "x": 0,
      "y": 0.05,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.3,
      "height": 0.2,
      "depth": 0.3,
      "x": -0.4,
      "y": 0.2,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "cylinder",
      "width": 0.175,
      "height": 0.175,
      "depth": 0.175,
      "x": -0.4,
      "y": 0.38749999999999996,
      "z": 0,
      "color": "#b8756b"
    },
    {
      "shape": "cylinder",
      "width": 0.049,
      "height": 0.24499999999999997,
      "depth": 0.049,
      "x": -0.435,
      "y": 0.5974999999999999,
      "z": 0,
      "color": "#6e916c"
    },
    {
      "shape": "cylinder",
      "width": 0.049,
      "height": 0.31499999999999995,
      "depth": 0.049,
      "x": -0.36500000000000005,
      "y": 0.6325,
      "z": 0,
      "color": "#6e916c"
    },
    {
      "shape": "box",
      "width": 0.3,
      "height": 0.38,
      "depth": 0.3,
      "x": 0,
      "y": 0.29000000000000004,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "cylinder",
      "width": 0.175,
      "height": 0.175,
      "depth": 0.175,
      "x": 0,
      "y": 0.5675,
      "z": 0,
      "color": "#b8756b"
    },
    {
      "shape": "cylinder",
      "width": 0.049,
      "height": 0.24499999999999997,
      "depth": 0.049,
      "x": -0.034999999999999996,
      "y": 0.7775,
      "z": 0,
      "color": "#6e916c"
    },
    {
      "shape": "cylinder",
      "width": 0.049,
      "height": 0.31499999999999995,
      "depth": 0.049,
      "x": 0.034999999999999996,
      "y": 0.8125,
      "z": 0,
      "color": "#6e916c"
    },
    {
      "shape": "box",
      "width": 0.3,
      "height": 0.56,
      "depth": 0.3,
      "x": 0.4,
      "y": 0.38,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "cylinder",
      "width": 0.175,
      "height": 0.175,
      "depth": 0.175,
      "x": 0.4,
      "y": 0.7474999999999999,
      "z": 0,
      "color": "#b8756b"
    },
    {
      "shape": "cylinder",
      "width": 0.049,
      "height": 0.24499999999999997,
      "depth": 0.049,
      "x": 0.36500000000000005,
      "y": 0.9574999999999999,
      "z": 0,
      "color": "#6e916c"
    },
    {
      "shape": "cylinder",
      "width": 0.049,
      "height": 0.31499999999999995,
      "depth": 0.049,
      "x": 0.435,
      "y": 0.9924999999999999,
      "z": 0,
      "color": "#6e916c"
    }
  ],
  "id": "generated-dd903b6a-9ed8-48b8-af7f-d8cdb0f6dddd",
  "width": 1.2,
  "depth": 0.45,
  "heightApprox": 1.15,
  "coloring": "Room-linked colors: frame, wood. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-dd903b6a-9ed8-48b8-af7f-d8cdb0f6dddd",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/tiered-plant-stand.ts"
} satisfies AssetDefinition;
