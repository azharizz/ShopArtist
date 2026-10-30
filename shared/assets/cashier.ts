import type { AssetDefinition } from "./types.js";

export default {
  "id": "cashier",
  "label": "Cashier desk",
  "width": 1.8,
  "heightApprox": 1.5,
  "depth": 0.85,
  "description": "Counter with a checkout screen, front slats and a hello sign.",
  "function": "Checkout and customer service.",
  "moodTags": [
    "welcoming",
    "retail",
    "structured"
  ],
  "coloring": "Counter front, screen accent and sign follow the room accent; counter top and frame follow the selected room style. The dark screen has a fixed color.",
  "visualReference": "/asset-catalog.html#cashier",
  "implementation": "src/assets/cashier.ts"
} satisfies AssetDefinition;
