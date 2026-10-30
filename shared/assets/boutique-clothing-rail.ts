import type { AssetDefinition } from "./types.js";

export default {
  "label": "Boutique Clothing Rail",
  "description": "A slim rail with a stable rectangular frame and stylized garments.",
  "function": "Hang clothing for browsing.",
  "moodTags": [
    "fashion",
    "boutique",
    "minimal"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.4,
      "height": 0.08,
      "depth": 0.5,
      "x": 0,
      "y": 0.04,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.05,
      "height": 1.68,
      "depth": 0.05,
      "x": -0.65,
      "y": 0.92,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.05,
      "height": 1.68,
      "depth": 0.05,
      "x": 0.65,
      "y": 0.92,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.35,
      "height": 0.05,
      "depth": 0.05,
      "x": 0,
      "y": 1.78,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.2,
      "height": 0.54,
      "depth": 0.06,
      "x": -0.43,
      "y": 1.485,
      "z": 0,
      "color": "#d8abb6"
    },
    {
      "shape": "box",
      "width": 0.2,
      "height": 0.54,
      "depth": 0.06,
      "x": -0.15,
      "y": 1.485,
      "z": 0,
      "color": "#f0dfc8"
    },
    {
      "shape": "box",
      "width": 0.2,
      "height": 0.54,
      "depth": 0.06,
      "x": 0.13,
      "y": 1.485,
      "z": 0,
      "color": "#72916b"
    },
    {
      "shape": "box",
      "width": 0.2,
      "height": 0.54,
      "depth": 0.06,
      "x": 0.41,
      "y": 1.485,
      "z": 0,
      "color": "#394454"
    }
  ],
  "id": "generated-2f8d7dbd-e657-4660-ba4b-73458a7fdf28",
  "width": 1.4,
  "depth": 0.5,
  "heightApprox": 1.81,
  "coloring": "Room-linked colors: frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-2f8d7dbd-e657-4660-ba4b-73458a7fdf28",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/boutique-clothing-rail.ts"
} satisfies AssetDefinition;
