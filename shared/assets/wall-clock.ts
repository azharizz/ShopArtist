import type { AssetDefinition } from "./types.js";

export default {
  "label": "Wall Clock",
  "description": "A stepped round-look clock face with contrasting hands on a backing panel.",
  "function": "Use as a wall clock in a decor shop layout.",
  "moodTags": [
    "decor",
    "wall",
    "clock"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 0.55,
      "height": 0.55,
      "depth": 0.06,
      "x": 0,
      "y": 0.275,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.32,
      "height": 0.46,
      "depth": 0.025,
      "x": 0,
      "y": 0.275,
      "z": 0.05,
      "color": "#efe2cd"
    },
    {
      "shape": "box",
      "width": 0.44,
      "height": 0.32,
      "depth": 0.025,
      "x": 0,
      "y": 0.275,
      "z": 0.05,
      "color": "#efe2cd"
    },
    {
      "shape": "box",
      "width": 0.025,
      "height": 0.15,
      "depth": 0.025,
      "x": 0,
      "y": 0.34,
      "z": 0.08,
      "color": "#394454"
    },
    {
      "shape": "box",
      "width": 0.12,
      "height": 0.025,
      "depth": 0.025,
      "x": 0.045,
      "y": 0.275,
      "z": 0.08,
      "color": "#394454"
    }
  ],
  "id": "generated-1297c5d7-a763-4bdb-929d-1dd97785524a",
  "width": 0.55,
  "depth": 0.19,
  "heightApprox": 0.55,
  "coloring": "Room-linked colors: frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-1297c5d7-a763-4bdb-929d-1dd97785524a",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/wall-clock.ts"
} satisfies AssetDefinition;
