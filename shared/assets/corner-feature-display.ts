import type { AssetDefinition } from "./types.js";

export default {
  "label": "Corner Feature Display",
  "description": "Two intersecting panels framing a small display pedestal.",
  "function": "Use as a corner feature display in a retail shop layout.",
  "moodTags": [
    "retail",
    "corner",
    "feature"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.2,
      "height": 1.75,
      "depth": 0.08,
      "x": -0.25,
      "y": 0.875,
      "z": -0.4,
      "color": "#efe2cd"
    },
    {
      "shape": "box",
      "width": 0.08,
      "height": 1.75,
      "depth": 1,
      "x": 0.35,
      "y": 0.875,
      "z": 0.06,
      "color": "#d8a8b7"
    },
    {
      "shape": "box",
      "width": 0.45,
      "height": 0.65,
      "depth": 0.4,
      "x": -0.15,
      "y": 0.325,
      "z": 0,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.51,
      "height": 0.06,
      "depth": 0.46,
      "x": -0.15,
      "y": 0.68,
      "z": 0,
      "color": "wood"
    }
  ],
  "id": "generated-53939736-7ac8-4378-84f0-59bdf4d93fb4",
  "width": 1.7,
  "depth": 1.12,
  "heightApprox": 1.75,
  "coloring": "Room-linked colors: accent, wood. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-53939736-7ac8-4378-84f0-59bdf4d93fb4",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/corner-feature-display.ts"
} satisfies AssetDefinition;
