import type { AssetDefinition } from "./types.js";

export default {
  "label": "Window Display Backdrop",
  "description": "Wide panel with layered geometric decorations.",
  "function": "Use as a window display backdrop in a retail shop layout.",
  "moodTags": [
    "retail",
    "window",
    "backdrop"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.8,
      "height": 1.8,
      "depth": 0.08,
      "x": 0,
      "y": 0.9,
      "z": 0,
      "color": "#efe2cd"
    },
    {
      "shape": "box",
      "width": 1.9000000000000001,
      "height": 0.08,
      "depth": 0.42,
      "x": 0,
      "y": 0.04,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.6,
      "height": 0.9,
      "depth": 0.04,
      "x": -0.4,
      "y": 1,
      "z": 0.07,
      "color": "#d8a8b7"
    },
    {
      "shape": "cylinder",
      "width": 0.55,
      "height": 0.05,
      "depth": 0.55,
      "x": 0.42,
      "y": 1,
      "z": 0.08,
      "color": "#c3a36d"
    },
    {
      "shape": "box",
      "width": 0.8,
      "height": 0.2,
      "depth": 0.04,
      "x": 0.25,
      "y": 0.45,
      "z": 0.07,
      "color": "#6e916c"
    }
  ],
  "id": "generated-4e7e31fd-297c-41fd-a9b8-d0d93afb6c9a",
  "width": 1.9,
  "depth": 0.71,
  "heightApprox": 1.8,
  "coloring": "Room-linked colors: frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-4e7e31fd-297c-41fd-a9b8-d0d93afb6c9a",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/window-display-backdrop.ts"
} satisfies AssetDefinition;
