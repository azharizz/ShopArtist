import type { AssetDefinition } from "./types.js";

export default {
  "id": "bench",
  "label": "Reading bench",
  "width": 1.8,
  "heightApprox": 1.02,
  "depth": 0.75,
  "description": "Padded bench with a backrest, two legs and a decorative book.",
  "function": "Provide seating for a reading or waiting area.",
  "moodTags": [
    "cozy",
    "reading",
    "relaxed"
  ],
  "coloring": "Seat and back follow the room accent; legs follow the room style. The decorative book has a fixed color.",
  "visualReference": "/asset-catalog.html#bench",
  "implementation": "src/assets/bench.ts",
  "focus": "books"
} satisfies AssetDefinition;
