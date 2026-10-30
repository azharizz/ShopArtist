import type { AssetDefinition } from "./types.js";

export default {
  "label": "Art Supply Island",
  "description": "Double-sided central display with shelves, a top and small supply blocks.",
  "function": "Display art materials from both sides.",
  "moodTags": [
    "art",
    "retail",
    "organized"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.5,
      "height": 0.1,
      "depth": 0.75,
      "x": 0,
      "y": 0.05,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.5,
      "height": 0.07,
      "depth": 0.75,
      "x": 0,
      "y": 1.05,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.9,
      "depth": 0.7,
      "x": 0,
      "y": 0.55,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.9,
      "depth": 0.7,
      "x": -0.69,
      "y": 0.55,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.9,
      "depth": 0.7,
      "x": 0.69,
      "y": 0.55,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.35,
      "height": 0.05,
      "depth": 0.7,
      "x": 0,
      "y": 0.4,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.35,
      "height": 0.05,
      "depth": 0.7,
      "x": 0,
      "y": 0.7,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.18,
      "height": 0.2,
      "depth": 0.12,
      "x": -0.4,
      "y": 0.82,
      "z": 0.22,
      "color": "#b9786c"
    },
    {
      "shape": "box",
      "width": 0.18,
      "height": 0.2,
      "depth": 0.12,
      "x": 0,
      "y": 0.82,
      "z": 0.22,
      "color": "#72916b"
    },
    {
      "shape": "box",
      "width": 0.18,
      "height": 0.2,
      "depth": 0.12,
      "x": 0.4,
      "y": 0.82,
      "z": 0.22,
      "color": "#394454"
    }
  ],
  "id": "generated-7556e689-5184-4bd7-8253-2a208eb54ba4",
  "width": 1.5,
  "depth": 0.75,
  "heightApprox": 1.09,
  "coloring": "Room-linked colors: frame, wood. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-7556e689-5184-4bd7-8253-2a208eb54ba4",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/art-supply-island.ts"
} satisfies AssetDefinition;
