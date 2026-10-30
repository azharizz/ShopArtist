import type { AssetDefinition } from "./types.js";

export default {
  "label": "Gallery Label Stand",
  "description": "Small informational panel on a slim floor-standing pedestal.",
  "function": "Use as a gallery label stand in a art shop layout.",
  "moodTags": [
    "art",
    "gallery",
    "label",
    "stand"
  ],
  "geometry": [
    {
      "shape": "cylinder",
      "width": 0.3,
      "height": 0.06,
      "depth": 0.3,
      "x": 0,
      "y": 0.03,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.04,
      "height": 0.9,
      "depth": 0.04,
      "x": 0,
      "y": 0.51,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.5,
      "height": 0.3,
      "depth": 0.08,
      "x": 0,
      "y": 1.13,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.4,
      "height": 0.19999999999999998,
      "depth": 0.025,
      "x": 0,
      "y": 1.13,
      "z": 0.055,
      "color": "#394454"
    }
  ],
  "id": "generated-7851e752-925f-45c4-9914-ce541de003c2",
  "width": 0.5,
  "depth": 0.3,
  "heightApprox": 1.28,
  "coloring": "Room-linked colors: frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-7851e752-925f-45c4-9914-ce541de003c2",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/gallery-label-stand.ts"
} satisfies AssetDefinition;
