import type { AssetDefinition } from "./types.js";

export default {
  "label": "Large Canvas Display",
  "description": "Large framed artwork on a stable freestanding support.",
  "function": "Use as a large canvas display in a art shop layout.",
  "moodTags": [
    "art",
    "large",
    "canvas"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.5,
      "height": 1.9,
      "depth": 0.08,
      "x": 0,
      "y": 0.95,
      "z": 0,
      "color": "#efe2cd"
    },
    {
      "shape": "box",
      "width": 1.6,
      "height": 0.08,
      "depth": 0.42,
      "x": 0,
      "y": 0.04,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.2,
      "height": 1.2,
      "depth": 0.04,
      "x": 0,
      "y": 1.1,
      "z": 0.07,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.08,
      "height": 1.08,
      "depth": 0.025,
      "x": 0,
      "y": 1.1,
      "z": 0.105,
      "color": "#6e916c"
    }
  ],
  "id": "generated-f815ca76-ac1a-439a-9be6-5570b7cd7afb",
  "width": 1.6,
  "depth": 0.42,
  "heightApprox": 1.9,
  "coloring": "Room-linked colors: frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-f815ca76-ac1a-439a-9be6-5570b7cd7afb",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/large-canvas-display.ts"
} satisfies AssetDefinition;
