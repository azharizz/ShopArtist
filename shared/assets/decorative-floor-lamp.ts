import type { AssetDefinition } from "./types.js";

export default {
  "label": "Decorative Floor Lamp",
  "description": "A floor lamp with a round base, slim stem and cylindrical shade.",
  "function": "Add a visual lighting feature to a reading corner.",
  "moodTags": [
    "cozy",
    "modern",
    "reading"
  ],
  "geometry": [
    {
      "shape": "cylinder",
      "width": 0.38,
      "height": 0.06,
      "depth": 0.38,
      "x": 0,
      "y": 0.03,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.045,
      "height": 1.42,
      "depth": 0.045,
      "x": 0,
      "y": 0.77,
      "z": 0,
      "color": "#c2a06a"
    },
    {
      "shape": "cylinder",
      "width": 0.42,
      "height": 0.3,
      "depth": 0.42,
      "x": 0,
      "y": 1.58,
      "z": 0,
      "color": "#f1dfcb"
    },
    {
      "shape": "cylinder",
      "width": 0.12,
      "height": 0.025,
      "depth": 0.12,
      "x": 0,
      "y": 1.745,
      "z": 0,
      "color": "#c2a06a"
    }
  ],
  "id": "generated-ecd2bd02-f738-49bf-afb1-6469debf27d9",
  "width": 0.42,
  "depth": 0.42,
  "heightApprox": 1.76,
  "coloring": "Room-linked colors: frame. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-ecd2bd02-f738-49bf-afb1-6469debf27d9",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/decorative-floor-lamp.ts"
} satisfies AssetDefinition;
