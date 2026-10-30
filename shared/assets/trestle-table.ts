import type { AssetDefinition } from "./types.js";

export default {
  "label": "Trestle Table",
  "description": "Wide tabletop resting on two framed trestle supports.",
  "function": "Use as a trestle table in a coffee shop layout.",
  "moodTags": [
    "coffee",
    "trestle",
    "table"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 2,
      "height": 0.09,
      "depth": 0.8,
      "x": 0,
      "y": 0.75,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.1,
      "height": 0.71,
      "depth": 0.1,
      "x": -0.8,
      "y": 0.355,
      "z": -0.3,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.1,
      "height": 0.71,
      "depth": 0.1,
      "x": -0.8,
      "y": 0.355,
      "z": 0.3,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.1,
      "height": 0.08,
      "depth": 0.7,
      "x": -0.8,
      "y": 0.24,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.1,
      "height": 0.71,
      "depth": 0.1,
      "x": 0.8,
      "y": 0.355,
      "z": -0.3,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.1,
      "height": 0.71,
      "depth": 0.1,
      "x": 0.8,
      "y": 0.355,
      "z": 0.3,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.1,
      "height": 0.08,
      "depth": 0.7,
      "x": 0.8,
      "y": 0.24,
      "z": 0,
      "color": "frame"
    }
  ],
  "id": "generated-123ea7fa-e7aa-46ef-bb43-d61fd876611a",
  "width": 2,
  "depth": 0.8,
  "heightApprox": 0.8,
  "coloring": "Room-linked colors: wood, frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-123ea7fa-e7aa-46ef-bb43-d61fd876611a",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/trestle-table.ts"
} satisfies AssetDefinition;
