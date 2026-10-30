import type { AssetDefinition } from "./types.js";

export default {
  "label": "Coffee Grinder Station",
  "description": "Small counter with a grinder-like hopper and cups.",
  "function": "Use as a coffee grinder station in a coffee shop layout.",
  "moodTags": [
    "coffee",
    "grinder"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 0.9,
      "height": 0.8,
      "depth": 0.5,
      "x": 0,
      "y": 0.4,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.98,
      "height": 0.08,
      "depth": 0.58,
      "x": 0,
      "y": 0.8400000000000001,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.7,
      "height": 0.55,
      "depth": 0.025,
      "x": 0,
      "y": 0.4,
      "z": 0.265,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.25,
      "height": 0.32,
      "depth": 0.25,
      "x": -0.15,
      "y": 1.04,
      "z": 0,
      "color": "#394454"
    },
    {
      "shape": "cylinder",
      "width": 0.22,
      "height": 0.19,
      "depth": 0.22,
      "x": -0.15,
      "y": 1.295,
      "z": 0,
      "color": "#efe2cd"
    },
    {
      "shape": "cylinder",
      "width": 0.12,
      "height": 0.12,
      "depth": 0.12,
      "x": 0.2,
      "y": 0.94,
      "z": 0.1,
      "color": "#efe2cd"
    }
  ],
  "id": "generated-6c3027bc-e931-4337-9237-38a203decf47",
  "width": 0.98,
  "depth": 0.58,
  "heightApprox": 1.39,
  "coloring": "Room-linked colors: frame, wood, accent. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-6c3027bc-e931-4337-9237-38a203decf47",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/coffee-grinder-station.ts"
} satisfies AssetDefinition;
