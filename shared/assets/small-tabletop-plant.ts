import type { AssetDefinition } from "./types.js";

export default {
  "label": "Small Tabletop Plant",
  "description": "Small pot containing a cluster of upright greenery.",
  "function": "Use as a small tabletop plant in a decor shop layout.",
  "moodTags": [
    "decor",
    "small",
    "tabletop",
    "plant"
  ],
  "geometry": [
    {
      "shape": "cylinder",
      "width": 0.25,
      "height": 0.25,
      "depth": 0.25,
      "x": 0,
      "y": 0.125,
      "z": 0,
      "color": "#b8756b"
    },
    {
      "shape": "cylinder",
      "width": 0.07,
      "height": 0.35,
      "depth": 0.07,
      "x": -0.05,
      "y": 0.425,
      "z": 0,
      "color": "#6e916c"
    },
    {
      "shape": "cylinder",
      "width": 0.07,
      "height": 0.44999999999999996,
      "depth": 0.07,
      "x": 0.05,
      "y": 0.475,
      "z": 0,
      "color": "#6e916c"
    }
  ],
  "id": "generated-49894a43-02ec-4335-b84d-a30a2cef589e",
  "width": 0.25,
  "depth": 0.25,
  "heightApprox": 0.7,
  "coloring": "All part colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-49894a43-02ec-4335-b84d-a30a2cef589e",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/small-tabletop-plant.ts"
} satisfies AssetDefinition;
