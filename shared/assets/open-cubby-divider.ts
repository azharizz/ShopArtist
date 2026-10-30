import type { AssetDefinition } from "./types.js";

export default {
  "label": "Open Cubby Divider",
  "description": "Double-sided compartment grid on a floor base.",
  "function": "Use as a open cubby divider in a retail shop layout.",
  "moodTags": [
    "retail",
    "open",
    "cubby",
    "divider"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.5,
      "height": 0.08,
      "depth": 0.4,
      "x": 0,
      "y": 0.04,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.5,
      "height": 0.08,
      "depth": 0.4,
      "x": 0,
      "y": 1.54,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 1.42,
      "depth": 0.4,
      "x": -0.7,
      "y": 0.81,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 1.42,
      "depth": 0.4,
      "x": -0.23,
      "y": 0.81,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 1.42,
      "depth": 0.4,
      "x": 0.23,
      "y": 0.81,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 1.42,
      "depth": 0.4,
      "x": 0.7,
      "y": 0.81,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.4,
      "height": 0.06,
      "depth": 0.4,
      "x": 0,
      "y": 0.55,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.4,
      "height": 0.06,
      "depth": 0.4,
      "x": 0,
      "y": 1.05,
      "z": 0,
      "color": "wood"
    }
  ],
  "id": "generated-99e61205-99bb-4c84-9199-35cb34d58c5b",
  "width": 1.5,
  "depth": 0.4,
  "heightApprox": 1.58,
  "coloring": "Room-linked colors: frame, wood. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-99e61205-99bb-4c84-9199-35cb34d58c5b",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/open-cubby-divider.ts"
} satisfies AssetDefinition;
