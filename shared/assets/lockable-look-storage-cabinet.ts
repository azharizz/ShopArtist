import type { AssetDefinition } from "./types.js";

export default {
  "label": "Lockable Look Storage Cabinet",
  "description": "A tall closed cabinet with door panels and handles.",
  "function": "Use as a lockable look storage cabinet in a retail shop layout.",
  "moodTags": [
    "retail",
    "lockable",
    "storage",
    "cabinet"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.1,
      "height": 1.7,
      "depth": 0.45,
      "x": 0,
      "y": 0.85,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.48,
      "height": 1.48,
      "depth": 0.025,
      "x": -0.26,
      "y": 0.88,
      "z": 0.24,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.48,
      "height": 1.48,
      "depth": 0.025,
      "x": 0.26,
      "y": 0.88,
      "z": 0.24,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.025,
      "height": 0.13,
      "depth": 0.025,
      "x": -0.08,
      "y": 0.88,
      "z": 0.265,
      "color": "#c3a36d"
    },
    {
      "shape": "box",
      "width": 0.025,
      "height": 0.13,
      "depth": 0.025,
      "x": 0.08,
      "y": 0.88,
      "z": 0.265,
      "color": "#c3a36d"
    }
  ],
  "id": "generated-f7d20aa0-4dce-4b71-b24f-d7a4a7bc538c",
  "width": 1.1,
  "depth": 0.56,
  "heightApprox": 1.7,
  "coloring": "Room-linked colors: frame, accent. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-f7d20aa0-4dce-4b71-b24f-d7a4a7bc538c",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/lockable-look-storage-cabinet.ts"
} satisfies AssetDefinition;
