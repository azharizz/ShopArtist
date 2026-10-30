import type { AssetDefinition } from "./types.js";

export default {
  "id": "coffee-bar",
  "label": "Coffee bar",
  "width": 2.2,
  "heightApprox": 1.52,
  "depth": 0.9,
  "description": "Counter with front slats, a simplified espresso machine and cups.",
  "function": "Define a coffee preparation and service area.",
  "moodTags": [
    "cafe",
    "social",
    "welcoming"
  ],
  "coloring": "Counter and machine frame follow the room style. Cups and machine details have fixed colors; the room accent is not used.",
  "visualReference": "/asset-catalog.html#coffee-bar",
  "implementation": "src/assets/coffee-bar.ts",
  "focus": "coffee"
} satisfies AssetDefinition;
