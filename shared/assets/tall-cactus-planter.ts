import type { AssetDefinition } from "./types.js";

export default {
  "label": "Tall Cactus Planter",
  "description": "Round planter with several upright cactus-like columns.",
  "function": "Use as a tall cactus planter in a decor shop layout.",
  "moodTags": [
    "decor",
    "tall",
    "cactus",
    "planter"
  ],
  "geometry": [
    {
      "shape": "cylinder",
      "width": 0.42,
      "height": 0.4,
      "depth": 0.42,
      "x": 0,
      "y": 0.2,
      "z": 0,
      "color": "#b8756b"
    },
    {
      "shape": "cylinder",
      "width": 0.13,
      "height": 1,
      "depth": 0.13,
      "x": -0.12,
      "y": 0.9,
      "z": 0,
      "color": "#6e916c"
    },
    {
      "shape": "cylinder",
      "width": 0.13,
      "height": 1.15,
      "depth": 0.13,
      "x": 0,
      "y": 0.975,
      "z": 0,
      "color": "#6e916c"
    },
    {
      "shape": "cylinder",
      "width": 0.13,
      "height": 1.3,
      "depth": 0.13,
      "x": 0.12,
      "y": 1.05,
      "z": 0,
      "color": "#6e916c"
    }
  ],
  "id": "generated-b82f2a2b-51e0-4d45-a5fe-c9597f847c9b",
  "width": 0.42,
  "depth": 0.42,
  "heightApprox": 1.7,
  "coloring": "All part colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-b82f2a2b-51e0-4d45-a5fe-c9597f847c9b",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/tall-cactus-planter.ts"
} satisfies AssetDefinition;
