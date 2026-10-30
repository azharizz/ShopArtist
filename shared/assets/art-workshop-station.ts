import type { AssetDefinition } from "./types.js";

export default {
  "label": "Art Workshop Station",
  "description": "A creative station with table, stool, and a freestanding framed canvas.",
  "function": "Set up an art workshop area.",
  "moodTags": [
    "art",
    "workshop",
    "creative"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.2,
      "height": 0.08,
      "depth": 0.65,
      "x": 0,
      "y": 0.75,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.71,
      "depth": 0.06,
      "x": -0.51,
      "y": 0.355,
      "z": -0.23500000000000001,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.71,
      "depth": 0.06,
      "x": -0.51,
      "y": 0.355,
      "z": 0.23500000000000001,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.71,
      "depth": 0.06,
      "x": 0.51,
      "y": 0.355,
      "z": -0.23500000000000001,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 0.71,
      "depth": 0.06,
      "x": 0.51,
      "y": 0.355,
      "z": 0.23500000000000001,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.33,
      "height": 0.08,
      "depth": 0.33,
      "x": -0.65,
      "y": 0.45,
      "z": 0.6,
      "color": "accent"
    },
    {
      "shape": "cylinder",
      "width": 0.06,
      "height": 0.4,
      "depth": 0.06,
      "x": -0.65,
      "y": 0.2,
      "z": 0.6,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.27,
      "height": 0.04,
      "depth": 0.27,
      "x": -0.65,
      "y": 0.02,
      "z": 0.6,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.5,
      "height": 0.04,
      "depth": 0.4,
      "x": 0.2,
      "y": 0.81,
      "z": 0,
      "color": "#f0dfc8"
    },
    {
      "shape": "box",
      "width": 0.07,
      "height": 1.2,
      "depth": 0.07,
      "x": 0.85,
      "y": 0.6,
      "z": -0.1,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.55,
      "height": 0.65,
      "depth": 0.06,
      "x": 0.85,
      "y": 1.25,
      "z": -0.1,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.44,
      "height": 0.54,
      "depth": 0.025,
      "x": 0.85,
      "y": 1.25,
      "z": -0.055,
      "color": "#d8abb6"
    },
    {
      "shape": "box",
      "width": 0.5,
      "height": 0.06,
      "depth": 0.4,
      "x": 0.85,
      "y": 0.03,
      "z": -0.1,
      "color": "frame"
    }
  ],
  "id": "generated-f2e6e652-8691-44a0-8d93-693ec74e1fca",
  "width": 2.25,
  "depth": 1.53,
  "heightApprox": 1.58,
  "coloring": "Room-linked colors: wood, frame, accent. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-f2e6e652-8691-44a0-8d93-693ec74e1fca",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/art-workshop-station.ts"
} satisfies AssetDefinition;
