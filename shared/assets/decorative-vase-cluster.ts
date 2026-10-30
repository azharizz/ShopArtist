import type { AssetDefinition } from "./types.js";

export default {
  "label": "Decorative Vase Cluster",
  "description": "Three cylindrical vessels of different sizes.",
  "function": "Use as a decorative vase cluster in a decor shop layout.",
  "moodTags": [
    "decor",
    "decorative",
    "vase",
    "cluster"
  ],
  "geometry": [
    {
      "shape": "cylinder",
      "width": 0.25,
      "height": 0.4,
      "depth": 0.25,
      "x": -0.25,
      "y": 0.2,
      "z": 0,
      "color": "#b8756b"
    },
    {
      "shape": "cylinder",
      "width": 0.2,
      "height": 0.6,
      "depth": 0.2,
      "x": 0,
      "y": 0.3,
      "z": 0,
      "color": "#efe2cd"
    },
    {
      "shape": "cylinder",
      "width": 0.18,
      "height": 0.3,
      "depth": 0.18,
      "x": 0.23,
      "y": 0.15,
      "z": 0,
      "color": "#6e916c"
    }
  ],
  "id": "generated-7e422de2-d54a-4f09-968a-4af3b9b4bf9d",
  "width": 0.75,
  "depth": 0.25,
  "heightApprox": 0.6,
  "coloring": "All part colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-7e422de2-d54a-4f09-968a-4af3b9b4bf9d",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/decorative-vase-cluster.ts"
} satisfies AssetDefinition;
