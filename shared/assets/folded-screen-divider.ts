import type { AssetDefinition } from "./types.js";

export default {
  "label": "Folded Screen Divider",
  "description": "Three offset panels create a folding-screen silhouette.",
  "function": "Use as a folded screen divider in a retail shop layout.",
  "moodTags": [
    "retail",
    "folded",
    "screen",
    "divider"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 0.6,
      "height": 1.65,
      "depth": 0.08,
      "x": -0.65,
      "y": 0.825,
      "z": -0.08,
      "color": "#d8a8b7"
    },
    {
      "shape": "box",
      "width": 0.6,
      "height": 1.65,
      "depth": 0.08,
      "x": 0,
      "y": 0.825,
      "z": 0.08,
      "color": "#efe2cd"
    },
    {
      "shape": "box",
      "width": 0.6,
      "height": 1.65,
      "depth": 0.08,
      "x": 0.65,
      "y": 0.825,
      "z": -0.08,
      "color": "#6e916c"
    },
    {
      "shape": "box",
      "width": 2,
      "height": 0.08,
      "depth": 0.4,
      "x": 0,
      "y": 0.04,
      "z": 0,
      "color": "frame"
    }
  ],
  "id": "generated-fc4edeac-febc-43bb-8770-eb61444d777c",
  "width": 2,
  "depth": 0.4,
  "heightApprox": 1.65,
  "coloring": "Room-linked colors: frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-fc4edeac-febc-43bb-8770-eb61444d777c",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/folded-screen-divider.ts"
} satisfies AssetDefinition;
