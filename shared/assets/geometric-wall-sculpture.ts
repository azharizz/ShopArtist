import type { AssetDefinition } from "./types.js";

export default {
  "label": "Geometric Wall Sculpture",
  "description": "Layered rectangular and round forms on a backing panel.",
  "function": "Use as a geometric wall sculpture in a decor shop layout.",
  "moodTags": [
    "decor",
    "geometric",
    "wall",
    "sculpture"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.3,
      "height": 1.5,
      "depth": 0.08,
      "x": 0,
      "y": 0.75,
      "z": 0,
      "color": "#efe2cd"
    },
    {
      "shape": "box",
      "width": 1.4000000000000001,
      "height": 0.08,
      "depth": 0.42,
      "x": 0,
      "y": 0.04,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.45,
      "height": 0.7,
      "depth": 0.05,
      "x": -0.3,
      "y": 0.8,
      "z": 0.08,
      "color": "#d8a8b7"
    },
    {
      "shape": "cylinder",
      "width": 0.48,
      "height": 0.07,
      "depth": 0.48,
      "x": 0.3,
      "y": 0.75,
      "z": 0.08,
      "color": "#c3a36d"
    },
    {
      "shape": "box",
      "width": 0.6,
      "height": 0.16,
      "depth": 0.05,
      "x": 0.1,
      "y": 0.4,
      "z": 0.09,
      "color": "#6e916c"
    }
  ],
  "id": "generated-23fe5298-da3b-4fe7-804e-b41f7db6afe5",
  "width": 1.4,
  "depth": 0.64,
  "heightApprox": 1.5,
  "coloring": "Room-linked colors: frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-23fe5298-da3b-4fe7-804e-b41f7db6afe5",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/geometric-wall-sculpture.ts"
} satisfies AssetDefinition;
