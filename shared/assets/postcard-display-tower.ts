import type { AssetDefinition } from "./types.js";

export default {
  "label": "Postcard Display Tower",
  "description": "A tall display with small postcard-like panels on four faces.",
  "function": "Use as a postcard display tower in a art shop layout.",
  "moodTags": [
    "art",
    "postcard",
    "tower"
  ],
  "geometry": [
    {
      "shape": "cylinder",
      "width": 0.55,
      "height": 0.08,
      "depth": 0.55,
      "x": 0,
      "y": 0.04,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.48,
      "height": 1.5,
      "depth": 0.48,
      "x": 0,
      "y": 0.83,
      "z": 0,
      "color": "#efe2cd"
    },
    {
      "shape": "box",
      "width": 0.18,
      "height": 0.22,
      "depth": 0.025,
      "x": -0.12,
      "y": 0.4,
      "z": 0.255,
      "color": "#d8a8b7"
    },
    {
      "shape": "box",
      "width": 0.18,
      "height": 0.22,
      "depth": 0.025,
      "x": -0.12,
      "y": 0.7,
      "z": 0.255,
      "color": "#6e916c"
    },
    {
      "shape": "box",
      "width": 0.18,
      "height": 0.22,
      "depth": 0.025,
      "x": -0.12,
      "y": 1,
      "z": 0.255,
      "color": "#b8756b"
    },
    {
      "shape": "box",
      "width": 0.18,
      "height": 0.22,
      "depth": 0.025,
      "x": -0.12,
      "y": 1.3,
      "z": 0.255,
      "color": "#c3a36d"
    },
    {
      "shape": "box",
      "width": 0.18,
      "height": 0.22,
      "depth": 0.025,
      "x": 0.12,
      "y": 0.4,
      "z": 0.255,
      "color": "#d8a8b7"
    },
    {
      "shape": "box",
      "width": 0.18,
      "height": 0.22,
      "depth": 0.025,
      "x": 0.12,
      "y": 0.7,
      "z": 0.255,
      "color": "#6e916c"
    },
    {
      "shape": "box",
      "width": 0.18,
      "height": 0.22,
      "depth": 0.025,
      "x": 0.12,
      "y": 1,
      "z": 0.255,
      "color": "#b8756b"
    },
    {
      "shape": "box",
      "width": 0.18,
      "height": 0.22,
      "depth": 0.025,
      "x": 0.12,
      "y": 1.3,
      "z": 0.255,
      "color": "#c3a36d"
    }
  ],
  "id": "generated-3c9dbe13-72ee-4fa2-8053-59a2e98ed038",
  "width": 0.55,
  "depth": 0.55,
  "heightApprox": 1.58,
  "coloring": "Room-linked colors: frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-3c9dbe13-72ee-4fa2-8053-59a2e98ed038",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/postcard-display-tower.ts"
} satisfies AssetDefinition;
