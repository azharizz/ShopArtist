import type { AssetDefinition } from "./types.js";

export default {
  "label": "Premium Product Showcase",
  "description": "Large backdrop and three highlighted display pedestals.",
  "function": "Use as a premium product showcase in a retail shop layout.",
  "moodTags": [
    "retail",
    "premium",
    "product",
    "showcase"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.5,
      "height": 1.8,
      "depth": 0.08,
      "x": 0,
      "y": 0.9,
      "z": -0.4,
      "color": "#efe2cd"
    },
    {
      "shape": "box",
      "width": 1.6,
      "height": 0.08,
      "depth": 0.42,
      "x": 0,
      "y": 0.04,
      "z": -0.4,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.45,
      "height": 0.85,
      "depth": 0.4,
      "x": 0,
      "y": 0.425,
      "z": 0,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.51,
      "height": 0.06,
      "depth": 0.46,
      "x": 0,
      "y": 0.88,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.3,
      "height": 0.5,
      "depth": 0.3,
      "x": -0.65,
      "y": 0.25,
      "z": 0.1,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.36,
      "height": 0.06,
      "depth": 0.36,
      "x": -0.65,
      "y": 0.53,
      "z": 0.1,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.3,
      "height": 0.5,
      "depth": 0.3,
      "x": 0.65,
      "y": 0.25,
      "z": 0.1,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.36,
      "height": 0.06,
      "depth": 0.36,
      "x": 0.65,
      "y": 0.53,
      "z": 0.1,
      "color": "wood"
    }
  ],
  "id": "generated-d7247d6f-2be4-4eb7-8aaf-d22ce564ae72",
  "width": 1.66,
  "depth": 1.22,
  "heightApprox": 1.8,
  "coloring": "Room-linked colors: frame, accent, wood. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-d7247d6f-2be4-4eb7-8aaf-d22ce564ae72",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/premium-product-showcase.ts"
} satisfies AssetDefinition;
