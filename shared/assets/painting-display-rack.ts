import type { AssetDefinition } from "./types.js";

export default {
  "label": "Painting Display Rack",
  "description": "Tiered freestanding rack with framed artwork panels set at staggered depths.",
  "function": "Present paintings or framed prints.",
  "moodTags": [
    "art",
    "gallery",
    "display"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.25,
      "height": 0.08,
      "depth": 0.65,
      "x": 0,
      "y": 0.04,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.07,
      "height": 1.35,
      "depth": 0.07,
      "x": -0.58,
      "y": 0.755,
      "z": -0.26,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.07,
      "height": 1.35,
      "depth": 0.07,
      "x": 0.58,
      "y": 0.755,
      "z": -0.26,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.1,
      "height": 0.06,
      "depth": 0.18,
      "x": 0,
      "y": 0.35,
      "z": 0.18,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.1,
      "height": 0.06,
      "depth": 0.18,
      "x": 0,
      "y": 0.65,
      "z": -0.02,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.1,
      "height": 0.06,
      "depth": 0.18,
      "x": 0,
      "y": 0.95,
      "z": -0.22,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.72,
      "height": 0.42,
      "depth": 0.05,
      "x": 0,
      "y": 0.59,
      "z": 0.17,
      "color": "#d8abb6"
    },
    {
      "shape": "box",
      "width": 0.72,
      "height": 0.42,
      "depth": 0.05,
      "x": 0,
      "y": 0.89,
      "z": -0.03,
      "color": "#72916b"
    },
    {
      "shape": "box",
      "width": 0.72,
      "height": 0.42,
      "depth": 0.05,
      "x": 0,
      "y": 1.19,
      "z": -0.23,
      "color": "#394454"
    }
  ],
  "id": "generated-e238757b-4e12-4e5d-ae4a-ee7de9f964ab",
  "width": 1.25,
  "depth": 0.65,
  "heightApprox": 1.43,
  "coloring": "Room-linked colors: frame, wood. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-e238757b-4e12-4e5d-ae4a-ee7de9f964ab",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/painting-display-rack.ts"
} satisfies AssetDefinition;
