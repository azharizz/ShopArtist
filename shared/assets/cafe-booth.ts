import type { AssetDefinition } from "./types.js";

export default {
  "label": "Cafe Booth",
  "description": "Two facing cushioned benches arranged around a shared table.",
  "function": "Seat a small group for coffee or meals.",
  "moodTags": [
    "cafe",
    "cozy",
    "seating"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.1,
      "height": 0.18,
      "depth": 0.65,
      "x": 0,
      "y": 0.42,
      "z": -0.72,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 1.1,
      "height": 0.48,
      "depth": 0.12,
      "x": 0,
      "y": 0.72,
      "z": -0.98,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.08,
      "height": 0.34,
      "depth": 0.56,
      "x": -0.3,
      "y": 0.25,
      "z": -0.72,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.08,
      "height": 0.34,
      "depth": 0.56,
      "x": 0.3,
      "y": 0.25,
      "z": -0.72,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.1,
      "height": 0.18,
      "depth": 0.65,
      "x": 0,
      "y": 0.42,
      "z": 0.72,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 1.1,
      "height": 0.48,
      "depth": 0.12,
      "x": 0,
      "y": 0.72,
      "z": 0.98,
      "color": "accent"
    },
    {
      "shape": "box",
      "width": 0.08,
      "height": 0.34,
      "depth": 0.56,
      "x": -0.42,
      "y": 0.25,
      "z": 0.72,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.08,
      "height": 0.34,
      "depth": 0.56,
      "x": 0.42,
      "y": 0.25,
      "z": 0.72,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1,
      "height": 0.07,
      "depth": 0.65,
      "x": 0,
      "y": 0.75,
      "z": 0,
      "color": "wood"
    },
    {
      "shape": "cylinder",
      "width": 0.07,
      "height": 0.7,
      "depth": 0.07,
      "x": 0,
      "y": 0.35,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "cylinder",
      "width": 0.4,
      "height": 0.04,
      "depth": 0.4,
      "x": 0,
      "y": 0.02,
      "z": 0,
      "color": "frame"
    }
  ],
  "id": "generated-f5140d85-dcc0-4cff-a111-4b4697516ad5",
  "width": 1.1,
  "depth": 2.09,
  "heightApprox": 0.96,
  "coloring": "Room-linked colors: accent, frame, wood. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-f5140d85-dcc0-4cff-a111-4b4697516ad5",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/cafe-booth.ts"
} satisfies AssetDefinition;
