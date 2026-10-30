import type { AssetDefinition } from "./types.js";

export default {
  "label": "Showcase Frame",
  "description": "A tall frame surrounding a centered display pedestal.",
  "function": "Use as a showcase frame in a retail shop layout.",
  "moodTags": [
    "retail",
    "showcase",
    "frame"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 0.55,
      "height": 0.65,
      "depth": 0.5,
      "x": 0,
      "y": 0.325,
      "z": 0,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.6100000000000001,
      "height": 0.06,
      "depth": 0.56,
      "x": 0,
      "y": 0.68,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.08,
      "height": 1.9,
      "depth": 0.08,
      "x": -0.55,
      "y": 0.95,
      "z": -0.15,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.08,
      "height": 1.9,
      "depth": 0.08,
      "x": 0.55,
      "y": 0.95,
      "z": -0.15,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.18,
      "height": 0.08,
      "depth": 0.08,
      "x": 0,
      "y": 1.94,
      "z": -0.15,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.25,
      "height": 0.08,
      "depth": 0.48,
      "x": 0,
      "y": 0.04,
      "z": 0,
      "color": "frame"
    }
  ],
  "id": "generated-aaf9e452-e9a2-47b1-a51e-1ab3a34aff00",
  "width": 1.25,
  "depth": 0.56,
  "heightApprox": 1.98,
  "coloring": "Room-linked colors: accent, wood, frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-aaf9e452-e9a2-47b1-a51e-1ab3a34aff00",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/showcase-frame.ts"
} satisfies AssetDefinition;
