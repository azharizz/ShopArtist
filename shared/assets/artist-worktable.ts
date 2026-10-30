import type { AssetDefinition } from "./types.js";

export default {
  "label": "Artist Worktable",
  "description": "Worktable with an art board and containers of brushes and paint.",
  "function": "Provide a creative work surface.",
  "moodTags": [
    "art",
    "workshop",
    "creative"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.5,
      "height": 0.08,
      "depth": 0.85,
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
      "x": -0.66,
      "y": 0.355,
      "z": -0.33499999999999996,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.71,
      "depth": 0.06,
      "x": -0.66,
      "y": 0.355,
      "z": 0.33499999999999996,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.71,
      "depth": 0.06,
      "x": 0.66,
      "y": 0.355,
      "z": -0.33499999999999996,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.71,
      "depth": 0.06,
      "x": 0.66,
      "y": 0.355,
      "z": 0.33499999999999996,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.62,
      "height": 0.06,
      "depth": 0.42,
      "x": -0.2,
      "y": 0.83,
      "z": 0,
      "color": "#f0dfc8"
    },
    {
      "shape": "cylinder",
      "width": 0.15,
      "height": 0.18,
      "depth": 0.15,
      "x": 0.45,
      "y": 0.88,
      "z": 0.12,
      "color": "#b68e75"
    },
    {
      "shape": "cylinder",
      "width": 0.025,
      "height": 0.32,
      "depth": 0.025,
      "x": 0.41000000000000003,
      "y": 1.12,
      "z": 0.12,
      "color": "#394454"
    },
    {
      "shape": "cylinder",
      "width": 0.025,
      "height": 0.32,
      "depth": 0.025,
      "x": 0.45,
      "y": 1.12,
      "z": 0.12,
      "color": "#394454"
    },
    {
      "shape": "cylinder",
      "width": 0.025,
      "height": 0.32,
      "depth": 0.025,
      "x": 0.49,
      "y": 1.12,
      "z": 0.12,
      "color": "#394454"
    },
    {
      "shape": "cylinder",
      "width": 0.1,
      "height": 0.08,
      "depth": 0.1,
      "x": 0.62,
      "y": 0.83,
      "z": -0.12,
      "color": "#b9786c"
    }
  ],
  "id": "generated-af6472c5-8a26-4822-888a-43e602637bc4",
  "width": 1.5,
  "depth": 0.85,
  "heightApprox": 1.28,
  "coloring": "Room-linked colors: wood, frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-af6472c5-8a26-4822-888a-43e602637bc4",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/artist-worktable.ts"
} satisfies AssetDefinition;
