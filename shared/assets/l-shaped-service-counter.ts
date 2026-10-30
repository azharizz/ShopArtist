import type { AssetDefinition } from "./types.js";

export default {
  "label": "L Shaped Service Counter",
  "description": "Two worktops forming an L, with a recessed dark base.",
  "function": "Create a checkout or service area.",
  "moodTags": [
    "modern",
    "service",
    "functional"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.8,
      "height": 0.85,
      "depth": 0.6,
      "x": 0,
      "y": 0.425,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.6,
      "height": 0.85,
      "depth": 1.45,
      "x": -0.6,
      "y": 0.425,
      "z": -0.425,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.86,
      "height": 0.08,
      "depth": 0.66,
      "x": 0,
      "y": 0.89,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.66,
      "height": 0.08,
      "depth": 1.45,
      "x": -0.6,
      "y": 0.89,
      "z": -0.425,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.58,
      "height": 0.5,
      "depth": 0.025,
      "x": 0.05,
      "y": 0.48,
      "z": 0.305,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.025,
      "height": 0.5,
      "depth": 0.83,
      "x": -0.905,
      "y": 0.48,
      "z": -0.67,
      "color": "accent"
    }
  ],
  "id": "generated-e3580942-9b57-428c-a469-b8586bfd0abf",
  "width": 1.86,
  "depth": 2.3,
  "heightApprox": 0.93,
  "coloring": "Room-linked colors: frame, wood, accent. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-e3580942-9b57-428c-a469-b8586bfd0abf",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/l-shaped-service-counter.ts"
} satisfies AssetDefinition;
