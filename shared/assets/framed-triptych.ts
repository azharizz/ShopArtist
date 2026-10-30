import type { AssetDefinition } from "./types.js";

export default {
  "label": "Framed Triptych",
  "description": "Three framed artwork panels displayed together.",
  "function": "Use as a framed triptych in a art shop layout.",
  "moodTags": [
    "art",
    "framed",
    "triptych"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.65,
      "height": 1.7,
      "depth": 0.08,
      "x": 0,
      "y": 0.85,
      "z": 0,
      "color": "#efe2cd"
    },
    {
      "shape": "box",
      "width": 1.75,
      "height": 0.08,
      "depth": 0.42,
      "x": 0,
      "y": 0.04,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.44,
      "height": 0.7,
      "depth": 0.04,
      "x": -0.5,
      "y": 1,
      "z": 0.06,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.34,
      "height": 0.6,
      "depth": 0.025,
      "x": -0.5,
      "y": 1,
      "z": 0.09,
      "color": "#d8a8b7"
    },
    {
      "shape": "box",
      "width": 0.44,
      "height": 0.7,
      "depth": 0.04,
      "x": 0,
      "y": 1,
      "z": 0.06,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.34,
      "height": 0.6,
      "depth": 0.025,
      "x": 0,
      "y": 1,
      "z": 0.09,
      "color": "#6e916c"
    },
    {
      "shape": "box",
      "width": 0.44,
      "height": 0.7,
      "depth": 0.04,
      "x": 0.5,
      "y": 1,
      "z": 0.06,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.34,
      "height": 0.6,
      "depth": 0.025,
      "x": 0.5,
      "y": 1,
      "z": 0.09,
      "color": "#b8756b"
    }
  ],
  "id": "generated-d27c3f47-30bd-400c-baf4-c0b8f2b58ff5",
  "width": 1.75,
  "depth": 0.42,
  "heightApprox": 1.7,
  "coloring": "Room-linked colors: frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-d27c3f47-30bd-400c-baf4-c0b8f2b58ff5",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/framed-triptych.ts"
} satisfies AssetDefinition;
