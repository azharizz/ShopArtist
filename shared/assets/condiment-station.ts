import type { AssetDefinition } from "./types.js";

export default {
  "label": "Condiment Station",
  "description": "Compact cabinet with a wood top, napkin holder and cylindrical dispensers.",
  "function": "Organize cafe condiments and supplies.",
  "moodTags": [
    "cafe",
    "functional",
    "service"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 0.9,
      "height": 0.8,
      "depth": 0.48,
      "x": 0,
      "y": 0.4,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.96,
      "height": 0.08,
      "depth": 0.53,
      "x": 0,
      "y": 0.84,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.75,
      "height": 0.5,
      "depth": 0.025,
      "x": 0,
      "y": 0.43,
      "z": 0.248,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.22,
      "height": 0.16,
      "depth": 0.13,
      "x": -0.25,
      "y": 0.96,
      "z": 0,
      "color": "#f0dfc8"
    },
    {
      "shape": "cylinder",
      "width": 0.1,
      "height": 0.17,
      "depth": 0.1,
      "x": -0.04,
      "y": 0.965,
      "z": 0.04,
      "color": "#b5a497"
    },
    {
      "shape": "cylinder",
      "width": 0.1,
      "height": 0.17,
      "depth": 0.1,
      "x": 0.13,
      "y": 0.965,
      "z": 0.04,
      "color": "#b5a497"
    },
    {
      "shape": "cylinder",
      "width": 0.1,
      "height": 0.17,
      "depth": 0.1,
      "x": 0.3,
      "y": 0.965,
      "z": 0.04,
      "color": "#b5a497"
    }
  ],
  "id": "generated-7da8c26a-35b5-4ab6-871c-37c172120f99",
  "width": 0.96,
  "depth": 0.53,
  "heightApprox": 1.05,
  "coloring": "Room-linked colors: frame, wood, accent. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-7da8c26a-35b5-4ab6-871c-37c172120f99",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/condiment-station.ts"
} satisfies AssetDefinition;
