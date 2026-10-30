import type { AssetDefinition } from "./types.js";

export default {
  "label": "Artist Demonstration Area",
  "description": "Worktable, canvas and small visitor-facing sign.",
  "function": "Use as a artist demonstration area in a art shop layout.",
  "moodTags": [
    "art",
    "artist",
    "demonstration",
    "area"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.25,
      "height": 0.08,
      "depth": 0.7,
      "x": 0,
      "y": 0.75,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.71,
      "depth": 0.06,
      "x": -0.545,
      "y": 0.355,
      "z": -0.26999999999999996,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.71,
      "depth": 0.06,
      "x": -0.545,
      "y": 0.355,
      "z": 0.26999999999999996,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.71,
      "depth": 0.06,
      "x": 0.545,
      "y": 0.355,
      "z": -0.26999999999999996,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.71,
      "depth": 0.06,
      "x": 0.545,
      "y": 0.355,
      "z": 0.26999999999999996,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.58,
      "height": 0.75,
      "depth": 0.06,
      "x": -0.2,
      "y": 1.21,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.48,
      "height": 0.65,
      "depth": 0.025,
      "x": -0.2,
      "y": 1.21,
      "z": 0.05,
      "color": "#d8a8b7"
    },
    {
      "shape": "box",
      "width": 0.4,
      "height": 0.3,
      "depth": 0.08,
      "x": 0.42,
      "y": 0.9500000000000001,
      "z": 0.1,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.30000000000000004,
      "height": 0.19999999999999998,
      "depth": 0.025,
      "x": 0.42,
      "y": 0.9500000000000001,
      "z": 0.155,
      "color": "#394454"
    }
  ],
  "id": "generated-b046d158-e6a0-4e02-b9db-93a1019143f0",
  "width": 1.25,
  "depth": 0.7,
  "heightApprox": 1.59,
  "coloring": "Room-linked colors: wood, frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-b046d158-e6a0-4e02-b9db-93a1019143f0",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/artist-demonstration-area.ts"
} satisfies AssetDefinition;
