import type { AssetDefinition } from "./types.js";

export default {
  "label": "Modular Pop Up Kiosk",
  "description": "Compact counter with overhead frame and side display.",
  "function": "Use as a modular pop up kiosk in a retail shop layout.",
  "moodTags": [
    "retail",
    "modular",
    "kiosk"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.35,
      "height": 0.85,
      "depth": 0.65,
      "x": 0,
      "y": 0.425,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.4300000000000002,
      "height": 0.08,
      "depth": 0.73,
      "x": 0,
      "y": 0.89,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 1.1500000000000001,
      "height": 0.6,
      "depth": 0.025,
      "x": 0,
      "y": 0.425,
      "z": 0.34,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 1.2,
      "depth": 0.06,
      "x": -0.62,
      "y": 1.49,
      "z": -0.25,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.06,
      "height": 1.2,
      "depth": 0.06,
      "x": 0.62,
      "y": 1.49,
      "z": -0.25,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.3,
      "height": 0.1,
      "depth": 0.1,
      "x": 0,
      "y": 2.14,
      "z": -0.25,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.55,
      "height": 0.08,
      "depth": 0.35,
      "x": 0.95,
      "y": 0.04,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.43000000000000005,
      "height": 0.9400000000000001,
      "depth": 0.035,
      "x": 0.95,
      "y": 0.55,
      "z": -0.15,
      "color": "#efe2cd"
    },
    {
      "shape": "box",
      "width": 0.08,
      "height": 1.02,
      "depth": 0.35,
      "x": 0.715,
      "y": 0.5900000000000001,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.08,
      "height": 1.02,
      "depth": 0.35,
      "x": 1.185,
      "y": 0.5900000000000001,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.39,
      "height": 0.05,
      "depth": 0.3,
      "x": 0.95,
      "y": 0.36,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.39,
      "height": 0.05,
      "depth": 0.3,
      "x": 0.95,
      "y": 0.7,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.55,
      "height": 0.08,
      "depth": 0.35,
      "x": 0.95,
      "y": 1.06,
      "z": 0,
      "color": "frame"
    }
  ],
  "id": "generated-a4ee4026-e4b1-437c-aee8-6eedf6a92f1d",
  "width": 2.45,
  "depth": 0.73,
  "heightApprox": 2.19,
  "coloring": "Room-linked colors: frame, wood, accent. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-a4ee4026-e4b1-437c-aee8-6eedf6a92f1d",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/modular-pop-up-kiosk.ts"
} satisfies AssetDefinition;
