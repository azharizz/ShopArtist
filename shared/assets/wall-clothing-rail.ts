import type { AssetDefinition } from "./types.js";

export default {
  "label": "Wall Clothing Rail",
  "description": "Back panel with a projecting garment rail and colored garments.",
  "function": "Use as a wall clothing rail in a fashion shop layout.",
  "moodTags": [
    "fashion",
    "wall",
    "clothing",
    "rail"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.4,
      "height": 1.8,
      "depth": 0.08,
      "x": 0,
      "y": 0.9,
      "z": 0,
      "color": "#efe2cd"
    },
    {
      "shape": "box",
      "width": 1.5,
      "height": 0.08,
      "depth": 0.42,
      "x": 0,
      "y": 0.04,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.06,
      "depth": 0.34,
      "x": -0.55,
      "y": 1.6,
      "z": 0.2,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.06,
      "depth": 0.34,
      "x": 0.55,
      "y": 1.6,
      "z": 0.2,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.15,
      "height": 0.06,
      "depth": 0.06,
      "x": 0,
      "y": 1.6,
      "z": 0.35,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.2,
      "height": 0.55,
      "depth": 0.06,
      "x": -0.3,
      "y": 1.295,
      "z": 0.35,
      "color": "#d8a8b7"
    },
    {
      "shape": "box",
      "width": 0.2,
      "height": 0.55,
      "depth": 0.06,
      "x": 0,
      "y": 1.295,
      "z": 0.35,
      "color": "#efe2cd"
    },
    {
      "shape": "box",
      "width": 0.2,
      "height": 0.55,
      "depth": 0.06,
      "x": 0.3,
      "y": 1.295,
      "z": 0.35,
      "color": "#6e916c"
    }
  ],
  "id": "generated-42783f0e-2b39-4bd9-8061-ddfc81a3ab36",
  "width": 1.5,
  "depth": 0.76,
  "heightApprox": 1.8,
  "coloring": "Room-linked colors: frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-42783f0e-2b39-4bd9-8061-ddfc81a3ab36",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/wall-clothing-rail.ts"
} satisfies AssetDefinition;
