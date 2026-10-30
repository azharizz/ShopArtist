import type { AssetDefinition } from "./types.js";

export default {
  "label": "Table Lamp",
  "description": "A compact lamp with a round base and cylindrical shade.",
  "function": "Use as a table lamp in a decor shop layout.",
  "moodTags": [
    "decor",
    "table",
    "lamp"
  ],
  "geometry": [
    {
      "shape": "cylinder",
      "width": 0.2,
      "height": 0.05,
      "depth": 0.2,
      "x": 0,
      "y": 0.025,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.035,
      "height": 0.32,
      "depth": 0.035,
      "x": 0,
      "y": 0.21,
      "z": 0,
      "color": "#c3a36d"
    },
    {
      "shape": "cylinder",
      "width": 0.25,
      "height": 0.2,
      "depth": 0.25,
      "x": 0,
      "y": 0.47,
      "z": 0,
      "color": "#efe2cd"
    }
  ],
  "id": "generated-cf2204f5-4108-493b-a309-99e2a85534be",
  "width": 0.25,
  "depth": 0.25,
  "heightApprox": 0.57,
  "coloring": "Room-linked colors: frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-cf2204f5-4108-493b-a309-99e2a85534be",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/table-lamp.ts"
} satisfies AssetDefinition;
