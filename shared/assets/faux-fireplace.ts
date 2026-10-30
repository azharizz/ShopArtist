import type { AssetDefinition } from "./types.js";

export default {
  "label": "Faux Fireplace",
  "description": "Framed fireplace surround with a recessed dark opening.",
  "function": "Use as a faux fireplace in a decor shop layout.",
  "moodTags": [
    "decor",
    "faux",
    "fireplace"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.4,
      "height": 0.12,
      "depth": 0.45,
      "x": 0,
      "y": 0.06,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.22,
      "height": 0.8,
      "depth": 0.35,
      "x": -0.57,
      "y": 0.52,
      "z": 0,
      "color": "#efe2cd"
    },
    {
      "shape": "box",
      "width": 0.22,
      "height": 0.8,
      "depth": 0.35,
      "x": 0.57,
      "y": 0.52,
      "z": 0,
      "color": "#efe2cd"
    },
    {
      "shape": "box",
      "width": 1.35,
      "height": 0.15,
      "depth": 0.4,
      "x": 0,
      "y": 1,
      "z": 0,
      "color": "#efe2cd"
    },
    {
      "shape": "box",
      "width": 1.5,
      "height": 0.09,
      "depth": 0.48,
      "x": 0,
      "y": 1.12,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.9,
      "height": 0.75,
      "depth": 0.04,
      "x": 0,
      "y": 0.5,
      "z": -0.16,
      "color": "#394454"
    }
  ],
  "id": "generated-6eea1d7d-c373-40fc-9a83-b3babf87ad51",
  "width": 1.5,
  "depth": 0.48,
  "heightApprox": 1.17,
  "coloring": "Room-linked colors: frame, wood. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-6eea1d7d-c373-40fc-9a83-b3babf87ad51",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/faux-fireplace.ts"
} satisfies AssetDefinition;
