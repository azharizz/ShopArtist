import type { AssetDefinition } from "./types.js";

export default {
  "label": "Espresso Bar",
  "description": "Full cafe service bar with espresso machine, cups and a paneled counter.",
  "function": "Prepare and serve coffee.",
  "moodTags": [
    "coffee",
    "cafe",
    "service"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.8,
      "height": 0.85,
      "depth": 0.7,
      "x": 0,
      "y": 0.425,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.9,
      "height": 0.08,
      "depth": 0.75,
      "x": 0,
      "y": 0.89,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.55,
      "height": 0.47,
      "depth": 0.025,
      "x": 0,
      "y": 0.45,
      "z": 0.36,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.62,
      "height": 0.28,
      "depth": 0.34,
      "x": -0.4,
      "y": 1.07,
      "z": -0.08,
      "color": "#aaa8a3"
    },
    {
      "shape": "box",
      "width": 0.42,
      "height": 0.12,
      "depth": 0.16,
      "x": -0.4,
      "y": 0.99,
      "z": 0.16,
      "color": "#777d7b"
    },
    {
      "shape": "cylinder",
      "width": 0.1,
      "height": 0.1,
      "depth": 0.1,
      "x": 0.12,
      "y": 0.98,
      "z": 0.12,
      "color": "#f0dfc8"
    },
    {
      "shape": "cylinder",
      "width": 0.1,
      "height": 0.1,
      "depth": 0.1,
      "x": 0.29,
      "y": 0.98,
      "z": 0.12,
      "color": "#f0dfc8"
    },
    {
      "shape": "box",
      "width": 0.26,
      "height": 0.04,
      "depth": 0.22,
      "x": 0.55,
      "y": 0.95,
      "z": -0.05,
      "color": "#c3a46b"
    }
  ],
  "id": "generated-4e569669-32c3-41b7-9a89-d20dcf19bd99",
  "width": 1.9,
  "depth": 0.75,
  "heightApprox": 1.21,
  "coloring": "Room-linked colors: frame, wood, accent. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-4e569669-32c3-41b7-9a89-d20dcf19bd99",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/espresso-bar.ts"
} satisfies AssetDefinition;
