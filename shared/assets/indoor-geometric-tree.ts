import type { AssetDefinition } from "./types.js";

export default {
  "label": "Indoor Geometric Tree",
  "description": "A slender trunk with a layered geometric green canopy.",
  "function": "Use as a indoor geometric tree in a decor shop layout.",
  "moodTags": [
    "decor",
    "indoor",
    "geometric",
    "tree"
  ],
  "geometry": [
    {
      "shape": "cylinder",
      "width": 0.5,
      "height": 0.4,
      "depth": 0.5,
      "x": 0,
      "y": 0.2,
      "z": 0,
      "color": "#b8756b"
    },
    {
      "shape": "cylinder",
      "width": 0.12,
      "height": 1.2,
      "depth": 0.12,
      "x": 0,
      "y": 1,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.65,
      "height": 0.35,
      "depth": 0.65,
      "x": 0,
      "y": 1.65,
      "z": 0,
      "color": "#6e916c"
    },
    {
      "shape": "cylinder",
      "width": 0.5,
      "height": 0.35,
      "depth": 0.5,
      "x": 0,
      "y": 1.95,
      "z": 0,
      "color": "#52774f"
    },
    {
      "shape": "cylinder",
      "width": 0.35,
      "height": 0.3,
      "depth": 0.35,
      "x": 0,
      "y": 2.25,
      "z": 0,
      "color": "#6e916c"
    }
  ],
  "id": "generated-85dfe965-52f3-45ad-9cad-9a79d180b598",
  "width": 0.65,
  "depth": 0.65,
  "heightApprox": 2.4,
  "coloring": "Room-linked colors: frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-85dfe965-52f3-45ad-9cad-9a79d180b598",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/indoor-geometric-tree.ts"
} satisfies AssetDefinition;
