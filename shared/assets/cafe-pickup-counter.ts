import type { AssetDefinition } from "./types.js";

export default {
  "label": "Cafe Pickup Counter",
  "description": "Low service counter with three separate pickup cubbies.",
  "function": "Use as a cafe pickup counter in a coffee shop layout.",
  "moodTags": [
    "coffee",
    "cafe",
    "pickup",
    "counter"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.5,
      "height": 0.8,
      "depth": 0.6,
      "x": 0,
      "y": 0.4,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.58,
      "height": 0.08,
      "depth": 0.6799999999999999,
      "x": 0,
      "y": 0.8400000000000001,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.3,
      "height": 0.55,
      "depth": 0.025,
      "x": 0,
      "y": 0.4,
      "z": 0.315,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.42,
      "height": 0.28,
      "depth": 0.3,
      "x": -0.5,
      "y": 1.02,
      "z": -0.05,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.42,
      "height": 0.28,
      "depth": 0.3,
      "x": 0,
      "y": 1.02,
      "z": -0.05,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.42,
      "height": 0.28,
      "depth": 0.3,
      "x": 0.5,
      "y": 1.02,
      "z": -0.05,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.32,
      "height": 0.17,
      "depth": 0.025,
      "x": -0.5,
      "y": 1.02,
      "z": 0.115,
      "color": "#394454"
    },
    {
      "shape": "box",
      "width": 0.32,
      "height": 0.17,
      "depth": 0.025,
      "x": 0,
      "y": 1.02,
      "z": 0.115,
      "color": "#394454"
    },
    {
      "shape": "box",
      "width": 0.32,
      "height": 0.17,
      "depth": 0.025,
      "x": 0.5,
      "y": 1.02,
      "z": 0.115,
      "color": "#394454"
    }
  ],
  "id": "generated-74dd2252-7dfd-4818-93c1-b3e03347f5e7",
  "width": 1.58,
  "depth": 0.68,
  "heightApprox": 1.16,
  "coloring": "Room-linked colors: frame, wood, accent. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-74dd2252-7dfd-4818-93c1-b3e03347f5e7",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/cafe-pickup-counter.ts"
} satisfies AssetDefinition;
