import type { AssetDefinition } from "./types.js";

export default {
  "label": "Featured Artist Display",
  "description": "A framed artwork above a small pedestal and information panel.",
  "function": "Highlight an artist or featured artwork.",
  "moodTags": [
    "art",
    "gallery",
    "featured"
  ],
  "geometry": [
    {
      "shape": "box",
      "width": 1.35,
      "height": 0.08,
      "depth": 0.48,
      "x": 0,
      "y": 0.04,
      "z": 0,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 1.2,
      "height": 1.7,
      "depth": 0.08,
      "x": 0,
      "y": 0.93,
      "z": -0.16,
      "color": "#f0dfc8"
    },
    {
      "shape": "box",
      "width": 0.75,
      "height": 0.8,
      "depth": 0.04,
      "x": 0,
      "y": 1.23,
      "z": -0.09,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.65,
      "height": 0.7,
      "depth": 0.025,
      "x": 0,
      "y": 1.23,
      "z": -0.055,
      "color": "#72916b"
    },
    {
      "shape": "box",
      "width": 0.55,
      "height": 0.6,
      "depth": 0.35,
      "x": 0,
      "y": 0.38,
      "z": 0.08,
      "color": "wood"
    },
    {
      "shape": "box",
      "width": 0.56,
      "height": 0.06,
      "depth": 0.37,
      "x": 0,
      "y": 0.71,
      "z": 0.08,
      "color": "frame"
    },
    {
      "shape": "box",
      "width": 0.3,
      "height": 0.12,
      "depth": 0.025,
      "x": 0.4,
      "y": 0.55,
      "z": -0.09,
      "color": "#ede8d9"
    }
  ],
  "id": "generated-2a2bee16-e08a-4f7f-a2e0-9247af2b506c",
  "width": 1.35,
  "depth": 0.53,
  "heightApprox": 1.78,
  "coloring": "Room-linked colors: frame, wood. Other colors are fixed.",
  "visualReference": "/asset-catalog.html#generated-2a2bee16-e08a-4f7f-a2e0-9247af2b506c",
  "implementation": "shared/generated-assets.ts",
  "source": "catalog",
  "catalogPath": "shared/assets/featured-artist-display.ts"
} satisfies AssetDefinition;
