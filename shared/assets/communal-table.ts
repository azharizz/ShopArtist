import type { AssetDefinition } from "./types.js";

export default {
  "label": "Communal Table",
  "description": "A long shared table with stout legs and a central stretcher.",
  "function": "Seat several customers or host workshops.",
  "moodTags": [
    "community",
    "natural",
    "cafe"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 2.4,
      "height": 0.09,
      "depth": 0.95,
      "x": 0,
      "y": 0.75,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.07,
      "height": 0.705,
      "depth": 0.07,
      "x": -1.05,
      "y": 0.3525,
      "z": -0.38,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.07,
      "height": 0.705,
      "depth": 0.07,
      "x": -1.05,
      "y": 0.3525,
      "z": 0.38,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.07,
      "height": 0.705,
      "depth": 0.07,
      "x": 1.05,
      "y": 0.3525,
      "z": -0.38,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.07,
      "height": 0.705,
      "depth": 0.07,
      "x": 1.05,
      "y": 0.3525,
      "z": 0.38,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 2.1,
      "height": 0.08,
      "depth": 0.08,
      "x": 0,
      "y": 0.23,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.08,
      "height": 0.08,
      "depth": 0.74,
      "x": -1.05,
      "y": 0.23,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.08,
      "height": 0.08,
      "depth": 0.74,
      "x": 1.05,
      "y": 0.23,
      "z": 0,
      "color": "frame"
    }
  ],
  "id": "generated-09454dd3-9599-46c0-aea7-d3af97bc1972",
  "width": 2.4,
  "depth": 0.95,
  "heightApprox": 0.8,
  "coloring": "Room-linked colors: wood, frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-09454dd3-9599-46c0-aea7-d3af97bc1972",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/communal-table.ts"
} satisfies AssetDefinition;
