import type { AssetDefinition } from "./types.js";

export default {
  "id": "shelf",
  "label": "Merchandise shelf",
  "width": 1.72,
  "heightApprox": 1.35,
  "depth": 0.55,
  "description": "Three-tier merchandise display with side panels, a back and a shelf label. When the shop includes books, decorative books appear on the lower tier.",
  "function": "Display merchandise and organize a retail collection.",
  "moodTags": [
    "organized",
    "bookish",
    "retail"
  ],
  "coloring": "Shelf boards and back use the room style furniture color; sides use its frame color. Product colors come from inventory, while decorative books and the label use fixed colors.",
  "visualReference": "/asset-catalog.html#shelf",
  "implementation": "src/assets/shelf.ts",
  "dimensionNote": "Width and depth follow the linked shelf; this is the default footprint, not a fixed model size."
} satisfies AssetDefinition;
