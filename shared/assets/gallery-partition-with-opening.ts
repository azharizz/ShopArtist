import type { AssetDefinition } from "./types.js";

export default {
  "label": "Gallery Partition with Opening",
  "description": "Wide freestanding gallery wall with a doorway opening.",
  "function": "Use as a gallery partition with opening in a art shop layout.",
  "moodTags": [
    "art",
    "gallery",
    "partition",
    "opening"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 0.5,
      "height": 1.9,
      "depth": 0.12,
      "x": -0.75,
      "y": 0.95,
      "z": 0,
      "color": "#efe2cd"
    },
    {
      "shape": "box",
      "width": 0.5,
      "height": 1.9,
      "depth": 0.12,
      "x": 0.75,
      "y": 0.95,
      "z": 0,
      "color": "#efe2cd"
    },
    {
      "shape": "box",
      "width": 2,
      "height": 0.3,
      "depth": 0.12,
      "x": 0,
      "y": 2.05,
      "z": 0,
      "color": "#efe2cd"
    },
    {
      "shape": "box",
      "width": 0.5,
      "height": 0.08,
      "depth": 0.45,
      "x": -0.75,
      "y": 0.04,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.5,
      "height": 0.08,
      "depth": 0.45,
      "x": 0.75,
      "y": 0.04,
      "z": 0,
      "color": "frame"
    }
  ],
  "id": "generated-ed8f6ab3-93c1-4cdd-8283-7e4fdbc5b942",
  "width": 2,
  "depth": 0.45,
  "heightApprox": 2.2,
  "coloring": "Room-linked colors: frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-ed8f6ab3-93c1-4cdd-8283-7e4fdbc5b942",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/gallery-partition-with-opening.ts"
} satisfies AssetDefinition;
