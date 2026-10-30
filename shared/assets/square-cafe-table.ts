import type { AssetDefinition } from "./types.js";

export default {
  "label": "Square Cafe Table",
  "description": "A compact square-top cafe table on four slender legs.",
  "function": "Seat customers for coffee or reading.",
  "moodTags": [
    "cafe",
    "modern",
    "compact"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 0.8,
      "height": 0.07,
      "depth": 0.8,
      "x": 0,
      "y": 0.73,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.07,
      "height": 0.695,
      "depth": 0.07,
      "x": -0.32,
      "y": 0.3475,
      "z": -0.32,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.07,
      "height": 0.695,
      "depth": 0.07,
      "x": -0.32,
      "y": 0.3475,
      "z": 0.32,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.07,
      "height": 0.695,
      "depth": 0.07,
      "x": 0.32,
      "y": 0.3475,
      "z": -0.32,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.07,
      "height": 0.695,
      "depth": 0.07,
      "x": 0.32,
      "y": 0.3475,
      "z": 0.32,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.58,
      "height": 0.04,
      "depth": 0.04,
      "x": 0,
      "y": 0.55,
      "z": -0.32,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.58,
      "height": 0.04,
      "depth": 0.04,
      "x": 0,
      "y": 0.55,
      "z": 0.32,
      "color": "frame"
    }
  ],
  "id": "generated-274894fe-5a0a-441e-9496-71eea670cf89",
  "width": 0.8,
  "depth": 0.8,
  "heightApprox": 0.77,
  "coloring": "Room-linked colors: wood, frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-274894fe-5a0a-441e-9496-71eea670cf89",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/square-cafe-table.ts"
} satisfies AssetDefinition;
