import type { AssetDefinition } from "./types.js";

export default {
  "label": "Cafe Tray Return Unit",
  "description": "Low collection cabinet with stacked trays and a return bin.",
  "function": "Use as a cafe tray return unit in a coffee shop layout.",
  "moodTags": [
    "coffee",
    "cafe",
    "tray",
    "return",
    "unit"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 0.9,
      "height": 0.8,
      "depth": 0.5,
      "x": 0,
      "y": 0.4,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.98,
      "height": 0.08,
      "depth": 0.58,
      "x": 0,
      "y": 0.8400000000000001,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.7,
      "height": 0.55,
      "depth": 0.025,
      "x": 0,
      "y": 0.4,
      "z": 0.265,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.38,
      "height": 0.035,
      "depth": 0.26,
      "x": -0.2,
      "y": 0.89,
      "z": 0,
      "color": "#efe2cd"
    },
    {
      "shape": "box",
      "width": 0.38,
      "height": 0.035,
      "depth": 0.26,
      "x": -0.2,
      "y": 0.93,
      "z": 0,
      "color": "#efe2cd"
    },
    {
      "shape": "box",
      "width": 0.38,
      "height": 0.035,
      "depth": 0.26,
      "x": -0.2,
      "y": 0.97,
      "z": 0,
      "color": "#efe2cd"
    },
    {
      "shape": "box",
      "width": 0.28,
      "height": 0.22,
      "depth": 0.28,
      "x": 0.23,
      "y": 0.99,
      "z": 0,
      "color": "#394454"
    }
  ],
  "id": "generated-d0f0deef-6e5e-4d72-a440-446f290e13b2",
  "width": 0.98,
  "depth": 0.58,
  "heightApprox": 1.1,
  "coloring": "Room-linked colors: frame, wood, accent. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-d0f0deef-6e5e-4d72-a440-446f290e13b2",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/cafe-tray-return-unit.ts"
} satisfies AssetDefinition;
