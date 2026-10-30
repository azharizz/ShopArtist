import type { AssetDefinition } from "./types.js";

export default {
  "id": "cafe-table",
  "label": "Café table & chairs",
  "width": 1.6,
  "heightApprox": 0.92,
  "depth": 1.6,
  "description": "Round pedestal table with two attached chairs and two cups.",
  "function": "Create a seating area for drinks or reading.",
  "moodTags": [
    "social",
    "intimate",
    "cafe"
  ],
  "coloring": "Table top and legs follow the room style; chair seats and backs follow the room accent. Cups have a fixed color.",
  "visualReference": "/asset-catalog.html#cafe-table",
  "implementation": "src/assets/cafe-table.ts",
  "focus": "coffee"
} satisfies AssetDefinition;
