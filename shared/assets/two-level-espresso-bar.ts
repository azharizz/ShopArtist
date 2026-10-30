import type { AssetDefinition } from "./types.js";

export default {
  "label": "Two Level Espresso Bar",
  "description": "Customer ledge above a lower barista work surface.",
  "function": "Use as a two level espresso bar in a coffee shop layout.",
  "moodTags": [
    "coffee",
    "level",
    "espresso"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.7,
      "height": 0.75,
      "depth": 0.75,
      "x": 0,
      "y": 0.375,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.78,
      "height": 0.08,
      "depth": 0.83,
      "x": 0,
      "y": 0.79,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.5,
      "height": 0.5,
      "depth": 0.025,
      "x": 0,
      "y": 0.375,
      "z": 0.39,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 1.7,
      "height": 0.12,
      "depth": 0.15,
      "x": 0,
      "y": 1.02,
      "z": 0.3,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.55,
      "height": 0.25,
      "depth": 0.32,
      "x": -0.35,
      "y": 0.95,
      "z": -0.05,
      "color": "#394454"
    },
    {
      "shape": "cylinder",
      "width": 0.12,
      "height": 0.12,
      "depth": 0.12,
      "x": 0.35,
      "y": 0.89,
      "z": 0.1,
      "color": "#efe2cd"
    }
  ],
  "id": "generated-5f3f2742-d244-44a8-9217-49a83ea8ac35",
  "width": 1.78,
  "depth": 0.83,
  "heightApprox": 1.08,
  "coloring": "Room-linked colors: frame, wood, accent. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-5f3f2742-d244-44a8-9217-49a83ea8ac35",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/two-level-espresso-bar.ts"
} satisfies AssetDefinition;
