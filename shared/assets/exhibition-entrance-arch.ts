import type { AssetDefinition } from "./types.js";

export default {
  "label": "Exhibition Entrance Arch",
  "description": "A freestanding stepped portal with a geometric arch-like top.",
  "function": "Mark the entrance to an exhibition area.",
  "moodTags": [
    "art",
    "gallery",
    "architectural"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 0.2,
      "height": 2,
      "depth": 0.35,
      "x": -0.9,
      "y": 1,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.2,
      "height": 2,
      "depth": 0.35,
      "x": 0.9,
      "y": 1,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 2,
      "height": 0.2,
      "depth": 0.35,
      "x": 0,
      "y": 2.1,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.2,
      "height": 0.16,
      "depth": 0.35,
      "x": -0.7,
      "y": 1.94,
      "z": 0,
      "color": "#c3a46b"
    },
    {
      "shape": "box",
      "width": 0.2,
      "height": 0.16,
      "depth": 0.35,
      "x": 0.7,
      "y": 1.94,
      "z": 0,
      "color": "#c3a46b"
    },
    {
      "shape": "box",
      "width": 1.2,
      "height": 0.08,
      "depth": 0.37,
      "x": 0,
      "y": 2.05,
      "z": 0,
      "color": "#c3a46b"
    },
    {
      "shape": "box",
      "width": 0.4,
      "height": 0.08,
      "depth": 0.65,
      "x": -0.9,
      "y": 0.04,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.4,
      "height": 0.08,
      "depth": 0.65,
      "x": 0.9,
      "y": 0.04,
      "z": 0,
      "color": "frame"
    }
  ],
  "id": "generated-8a387daa-2dde-4aea-850f-12225184d547",
  "width": 2.2,
  "depth": 0.65,
  "heightApprox": 2.2,
  "coloring": "Room-linked colors: frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-8a387daa-2dde-4aea-850f-12225184d547",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/exhibition-entrance-arch.ts"
} satisfies AssetDefinition;
