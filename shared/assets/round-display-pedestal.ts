import type { AssetDefinition } from "./types.js";

export default {
  "label": "Round Display Pedestal",
  "description": "A cylindrical pedestal with a wider top and a contrasting foot.",
  "function": "Feature a single product or sculpture.",
  "moodTags": [
    "minimal",
    "gallery",
    "modern"
  ],
  "geometry": [
    {
      "shape": "cylinder",
      "width": 0.62,
      "height": 0.1,
      "depth": 0.62,
      "x": 0,
      "y": 0.05,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.52,
      "height": 0.8,
      "depth": 0.52,
      "x": 0,
      "y": 0.5,
      "z": 0,
      "color": "accent"
    },
    {
      "shape": "cylinder",
      "width": 0.68,
      "height": 0.08,
      "depth": 0.68,
      "x": 0,
      "y": 0.94,
      "z": 0,
      "color": "frame"
    }
  ],
  "id": "generated-80cefdec-77da-4deb-bab6-3514d83f811f",
  "width": 0.68,
  "depth": 0.68,
  "heightApprox": 0.98,
  "coloring": "Room-linked colors: frame, accent. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-80cefdec-77da-4deb-bab6-3514d83f811f",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/round-display-pedestal.ts"
} satisfies AssetDefinition;
