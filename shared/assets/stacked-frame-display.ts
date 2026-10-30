import type { AssetDefinition } from "./types.js";

export default {
  "label": "Stacked Frame Display",
  "description": "Multiple framed art pieces arranged on two wall ledges.",
  "function": "Use as a stacked frame display in a art shop layout.",
  "moodTags": [
    "art",
    "stacked",
    "frame"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.4,
      "height": 1.7,
      "depth": 0.08,
      "x": 0,
      "y": 0.85,
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
      "width": 1.25,
      "height": 0.05,
      "depth": 0.25,
      "x": 0,
      "y": 0.45,
      "z": 0.12,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.25,
      "height": 0.05,
      "depth": 0.25,
      "x": 0,
      "y": 0.95,
      "z": 0.12,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.45,
      "height": 0.48,
      "depth": 0.05,
      "x": -0.35,
      "y": 0.72,
      "z": 0.12,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.35,
      "height": 0.38,
      "depth": 0.025,
      "x": -0.35,
      "y": 0.72,
      "z": 0.16,
      "color": "#6e916c"
    },
    {
      "shape": "box",
      "width": 0.45,
      "height": 0.48,
      "depth": 0.05,
      "x": 0.35,
      "y": 0.72,
      "z": 0.12,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.35,
      "height": 0.38,
      "depth": 0.025,
      "x": 0.35,
      "y": 0.72,
      "z": 0.16,
      "color": "#d8a8b7"
    }
  ],
  "id": "generated-84cf9e01-21c4-434e-a471-a2a1e8da0f43",
  "width": 1.5,
  "depth": 0.49,
  "heightApprox": 1.7,
  "coloring": "Room-linked colors: frame, wood. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-84cf9e01-21c4-434e-a471-a2a1e8da0f43",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/stacked-frame-display.ts"
} satisfies AssetDefinition;
