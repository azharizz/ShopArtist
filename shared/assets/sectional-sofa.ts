import type { AssetDefinition } from "./types.js";

export default {
  "label": "Sectional Sofa",
  "description": "Two upholstered seating sections forming an L.",
  "function": "Use as a sectional sofa in a coffee shop layout.",
  "moodTags": [
    "coffee",
    "sectional",
    "sofa"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.8,
      "height": 0.22,
      "depth": 0.68,
      "x": 0,
      "y": 0.37,
      "z": -0.25,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 1.8,
      "height": 0.5,
      "depth": 0.12,
      "x": 0,
      "y": 0.72,
      "z": -0.53,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.68,
      "height": 0.22,
      "depth": 1.25,
      "x": -0.56,
      "y": 0.37,
      "z": 0.3,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.12,
      "height": 0.5,
      "depth": 1.25,
      "x": -0.84,
      "y": 0.72,
      "z": 0.3,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.1,
      "height": 0.26,
      "depth": 0.6,
      "x": -0.75,
      "y": 0.13,
      "z": -0.25,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.1,
      "height": 0.26,
      "depth": 0.6,
      "x": 0.75,
      "y": 0.13,
      "z": -0.25,
      "color": "frame"
    }
  ],
  "id": "generated-bc68c58d-7ce9-423b-bc91-37242dbc4b53",
  "width": 1.8,
  "depth": 1.85,
  "heightApprox": 0.97,
  "coloring": "Room-linked colors: accent, frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-bc68c58d-7ce9-423b-bc91-37242dbc4b53",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/sectional-sofa.ts"
} satisfies AssetDefinition;
