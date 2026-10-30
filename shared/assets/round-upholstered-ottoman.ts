import type { AssetDefinition } from "./types.js";

export default {
  "label": "Round Upholstered Ottoman",
  "description": "A low round upholstered seat with a contrasting base and top cushion.",
  "function": "Offer flexible casual seating.",
  "moodTags": [
    "cozy",
    "soft",
    "lounge"
  ],
  "geometry": [
    {
      "shape": "cylinder",
      "width": 0.7,
      "height": 0.1,
      "depth": 0.7,
      "x": 0,
      "y": 0.05,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.66,
      "height": 0.32,
      "depth": 0.66,
      "x": 0,
      "y": 0.26,
      "z": 0,
      "color": "accent"
    },
    {
      "shape": "cylinder",
      "width": 0.68,
      "height": 0.07,
      "depth": 0.68,
      "x": 0,
      "y": 0.455,
      "z": 0,
      "color": "#f1dfcb"
    }
  ],
  "id": "generated-c014a22f-234e-4fd7-817d-19bcca8fada8",
  "width": 0.7,
  "depth": 0.7,
  "heightApprox": 0.49,
  "coloring": "Room-linked colors: frame, accent. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-c014a22f-234e-4fd7-817d-19bcca8fada8",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/round-upholstered-ottoman.ts"
} satisfies AssetDefinition;
