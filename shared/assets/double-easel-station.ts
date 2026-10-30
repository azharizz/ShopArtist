import type { AssetDefinition } from "./types.js";

export default {
  "label": "Double Easel Station",
  "description": "Two canvas stands arranged beside a shared worktable.",
  "function": "Use as a double easel station in a art shop layout.",
  "moodTags": [
    "art",
    "double",
    "easel"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.2,
      "height": 0.08,
      "depth": 0.65,
      "x": 0,
      "y": 0.75,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.71,
      "depth": 0.06,
      "x": -0.52,
      "y": 0.355,
      "z": -0.245,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.71,
      "depth": 0.06,
      "x": -0.52,
      "y": 0.355,
      "z": 0.245,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.71,
      "depth": 0.06,
      "x": 0.52,
      "y": 0.355,
      "z": -0.245,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.71,
      "depth": 0.06,
      "x": 0.52,
      "y": 0.355,
      "z": 0.245,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.4,
      "height": 0.06,
      "depth": 0.35,
      "x": -0.8,
      "y": 0.03,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 1.3,
      "depth": 0.06,
      "x": -0.8,
      "y": 0.71,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.45,
      "height": 0.58,
      "depth": 0.05,
      "x": -0.8,
      "y": 1.28,
      "z": 0.04,
      "color": "#efe2cd"
    },
    {
      "shape": "box",
      "width": 0.4,
      "height": 0.06,
      "depth": 0.35,
      "x": 0.8,
      "y": 0.03,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 1.3,
      "depth": 0.06,
      "x": 0.8,
      "y": 0.71,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.45,
      "height": 0.58,
      "depth": 0.05,
      "x": 0.8,
      "y": 1.28,
      "z": 0.04,
      "color": "#efe2cd"
    }
  ],
  "id": "generated-67ab792b-f55b-4dae-8ac1-403e4fc74cfd",
  "width": 2.05,
  "depth": 0.65,
  "heightApprox": 1.57,
  "coloring": "Room-linked colors: wood, frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-67ab792b-f55b-4dae-8ac1-403e4fc74cfd",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/double-easel-station.ts"
} satisfies AssetDefinition;
