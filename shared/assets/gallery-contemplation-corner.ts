import type { AssetDefinition } from "./types.js";

export default {
  "label": "Gallery Contemplation Corner",
  "description": "Artwork wall paired with a low viewing bench and plinth.",
  "function": "Use as a gallery contemplation corner in a art shop layout.",
  "moodTags": [
    "art",
    "gallery",
    "contemplation",
    "corner"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.4,
      "height": 1.7,
      "depth": 0.08,
      "x": 0,
      "y": 0.85,
      "z": -0.5,
      "color": "#efe2cd"
    },
    {
      "shape": "box",
      "width": 1.5,
      "height": 0.08,
      "depth": 0.42,
      "x": 0,
      "y": 0.04,
      "z": -0.5,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.8,
      "height": 0.7,
      "depth": 0.04,
      "x": 0,
      "y": 1.05,
      "z": -0.43,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.7,
      "height": 0.6,
      "depth": 0.025,
      "x": 0,
      "y": 1.05,
      "z": -0.39,
      "color": "#6e916c"
    },
    {
      "shape": "box",
      "width": 0.85,
      "height": 0.12,
      "depth": 0.4,
      "x": 0,
      "y": 0.45,
      "z": 0.55,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.07,
      "height": 0.39,
      "depth": 0.35,
      "x": -0.3,
      "y": 0.195,
      "z": 0.55,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.07,
      "height": 0.39,
      "depth": 0.35,
      "x": 0.3,
      "y": 0.195,
      "z": 0.55,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.3,
      "height": 0.5,
      "depth": 0.3,
      "x": 0.75,
      "y": 0.25,
      "z": 0.2,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.36,
      "height": 0.06,
      "depth": 0.36,
      "x": 0.75,
      "y": 0.53,
      "z": 0.2,
      "color": "wood"
    }
  ],
  "id": "generated-800fe80a-6c3c-4661-a506-f26e1eef1711",
  "width": 1.86,
  "depth": 1.5,
  "heightApprox": 1.7,
  "coloring": "Room-linked colors: frame, accent, wood. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-800fe80a-6c3c-4661-a506-f26e1eef1711",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/gallery-contemplation-corner.ts"
} satisfies AssetDefinition;
