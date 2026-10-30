import type { AssetDefinition } from "./types.js";

export default {
  "label": "Tea Service Station",
  "description": "Cabinet with cups and a simplified tea vessel.",
  "function": "Use as a tea service station in a coffee shop layout.",
  "moodTags": [
    "coffee",
    "service"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.1,
      "height": 0.8,
      "depth": 0.55,
      "x": 0,
      "y": 0.4,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.1800000000000002,
      "height": 0.08,
      "depth": 0.63,
      "x": 0,
      "y": 0.8400000000000001,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.9000000000000001,
      "height": 0.55,
      "depth": 0.025,
      "x": 0,
      "y": 0.4,
      "z": 0.29000000000000004,
      "color": "accent"
    },
    {
      "shape": "cylinder",
      "width": 0.22,
      "height": 0.22,
      "depth": 0.22,
      "x": -0.2,
      "y": 1,
      "z": 0,
      "color": "#efe2cd"
    },
    {
      "shape": "cylinder",
      "width": 0.12,
      "height": 0.07,
      "depth": 0.12,
      "x": -0.2,
      "y": 1.15,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.1,
      "height": 0.1,
      "depth": 0.1,
      "x": 0.12,
      "y": 0.93,
      "z": 0.1,
      "color": "#efe2cd"
    },
    {
      "shape": "cylinder",
      "width": 0.1,
      "height": 0.1,
      "depth": 0.1,
      "x": 0.32,
      "y": 0.93,
      "z": 0.1,
      "color": "#efe2cd"
    }
  ],
  "id": "generated-eb97baf5-8a3f-4752-9c79-cbc5b5070d81",
  "width": 1.18,
  "depth": 0.63,
  "heightApprox": 1.19,
  "coloring": "Room-linked colors: frame, wood, accent. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-eb97baf5-8a3f-4752-9c79-cbc5b5070d81",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/tea-service-station.ts"
} satisfies AssetDefinition;
