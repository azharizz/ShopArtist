import type { AssetDefinition } from "./types.js";

export default {
  "label": "Gift Wrapping Counter",
  "description": "A compact work counter with paper rolls, ribbon-like bands and open lower storage.",
  "function": "Wrap purchases and store packing materials.",
  "moodTags": [
    "books",
    "gifts",
    "service"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.35,
      "height": 0.08,
      "depth": 0.65,
      "x": 0,
      "y": 0.88,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.84,
      "depth": 0.06,
      "x": -0.5850000000000001,
      "y": 0.42,
      "z": -0.23500000000000001,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.84,
      "depth": 0.06,
      "x": -0.5850000000000001,
      "y": 0.42,
      "z": 0.23500000000000001,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.84,
      "depth": 0.06,
      "x": 0.5850000000000001,
      "y": 0.42,
      "z": -0.23500000000000001,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.84,
      "depth": 0.06,
      "x": 0.5850000000000001,
      "y": 0.42,
      "z": 0.23500000000000001,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.22,
      "height": 0.06,
      "depth": 0.55,
      "x": 0,
      "y": 0.25,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "cylinder",
      "width": 0.12,
      "height": 0.55,
      "depth": 0.12,
      "x": -0.42,
      "y": 1.195,
      "z": -0.18,
      "color": "#f0dfc8"
    },
    {
      "shape": "cylinder",
      "width": 0.12,
      "height": 0.55,
      "depth": 0.12,
      "x": -0.14,
      "y": 1.195,
      "z": -0.18,
      "color": "#d8abb6"
    },
    {
      "shape": "cylinder",
      "width": 0.12,
      "height": 0.55,
      "depth": 0.12,
      "x": 0.14,
      "y": 1.195,
      "z": -0.18,
      "color": "#72916b"
    },
    {
      "shape": "box",
      "width": 0.26,
      "height": 0.12,
      "depth": 0.2,
      "x": 0.45,
      "y": 0.98,
      "z": 0.1,
      "color": "#d8abb6"
    },
    {
      "shape": "box",
      "width": 0.04,
      "height": 0.13,
      "depth": 0.21,
      "x": 0.45,
      "y": 0.98,
      "z": 0.1,
      "color": "#c3a46b"
    }
  ],
  "id": "generated-eefea515-c50f-48a1-8d44-b914ae560a6c",
  "width": 1.35,
  "depth": 0.65,
  "heightApprox": 1.47,
  "coloring": "Room-linked colors: wood, frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-eefea515-c50f-48a1-8d44-b914ae560a6c",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/gift-wrapping-counter.ts"
} satisfies AssetDefinition;
