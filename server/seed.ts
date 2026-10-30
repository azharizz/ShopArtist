import type { Product, StoreState, Plan } from "../shared/types.js";
import { createRoom } from "../shared/room.js";

const titles = [
  [
    "Blue Hour",
    "Side Streets",
    "Moss & Memory",
    "Neon Weather",
    "Night Windows",
    "Sunday Service",
    "A Quiet Place",
    "Soft Machines",
    "Last Train Home",
    "Golden Days",
    "Field Recordings",
    "Future Nostalgia",
    "After the Rain",
    "Warm Frequencies",
    "Open Water",
  ],
  [
    "The City After Dark",
    "The Art of Noticing",
    "A Field Guide to Stillness",
    "Color Outside the Lines",
    "Small Hours",
    "Independent by Design",
    "In Praise of Slow",
    "Imagined Futures",
    "Notes from a Jazz Bar",
    "A Life in Print",
    "The Garden Journal",
    "Ways of Seeing Tomorrow",
    "Midnight Conversations",
    "Everyday Architecture",
    "Walking the Coast",
  ],
  [
    "Listening Club Tote",
    "Studio Ceramic Cup",
    "Forest Incense",
    "Cobalt Bookend",
    "Midnight Candle",
    "Market Canvas Bag",
    "Stoneware Bud Vase",
    "Electric Blue Tray",
    "Brass Record Stand",
    "Everyday Coffee Cup",
    "Cedar Room Spray",
    "Color Study Tote",
    "Amber Glass Cup",
    "Woven Coaster Set",
    "River Stone Holder",
  ],
  [
    "Night Notes",
    "Weekend Sketchbook",
    "Botanical Postcards",
    "Colorblock Notebook",
    "Graphite Pencil Set",
    "Studio Grid Pad",
    "Wildflower Bookmark",
    "Risograph Print",
    "Pocket Journal",
    "Analog Planner",
    "Forest Green Pen",
    "Electric Sticker Pack",
    "Letterpress Cards",
    "Weekly Desk Pad",
    "Seafoam Notebook",
  ],
];
const colors = [
  "#59717c",
  "#cf7547",
  "#83936c",
  "#b584b5",
  "#d7ae53",
  "#d49c94",
  "#d1ccb3",
  "#466183",
  "#a45044",
  "#a3a99a",
  "#6f8586",
  "#e39f51",
];
export function seed(): StoreState {
  const categories = ["Records", "Books", "Objects", "Stationery"] as const;
  const products: Product[] = categories.flatMap((category, c) =>
    titles[c].map((title, i) => ({
      id: `SA-${String(c * 15 + i + 1).padStart(3, "0")}`,
      title,
      category,
      creator:
        c === 0
          ? [
              "The Blue Ensemble",
              "Juniper Radio",
              "Isla North",
              "Modern Shapes",
            ][i % 4]
          : c === 1
            ? ["Nora Ellis", "Theo Lane", "Ada Green", "Jules Moon"][i % 4]
            : "Common Ground Studio",
      width: [18, 14, 12, 10][c],
      height: [31, 24, 18, 20][c],
      depth: [3, 4, 12, 2][c],
      stock: i === 14 ? 0 : 3 + ((i * 7 + c) % 18),
      priority: i < 4 ? 0.8 : 0.3,
      zones: ["wall", "island"],
      color: colors[(i + c * 3) % colors.length],
      motif: i % 4,
      mapping:
        c < 2
          ? {
              status: i < 12 ? "approved" : "pending",
              entityId:
                i < 12 ? `demo:${c === 0 ? "artist" : "book"}:${i}` : null,
              candidates: [
                {
                  id: `demo:${c === 0 ? "artist" : "book"}:${i}`,
                  label: c === 0 ? `${title} — artist association` : title,
                  type: c === 0 ? "artist" : "book",
                },
                ...(i >= 12
                  ? [
                      {
                        id: `demo:${c === 0 ? "artist" : "book"}:${(i + 1) % 15}`,
                        label: `${title} — alternate fixture`,
                        type: c === 0 ? "artist" : "book",
                      },
                    ]
                  : []),
              ],
            }
          : { status: "unmapped", entityId: null, candidates: [] },
    })),
  );
  const shelves = [
    {
      id: "A",
      name: "The listening wall",
      zone: "wall",
      width: 160,
      height: 40,
      depth: 35,
    },
    {
      id: "B",
      name: "Stories & discoveries",
      zone: "wall",
      width: 160,
      height: 40,
      depth: 35,
    },
    {
      id: "C",
      name: "The gathering table",
      zone: "island",
      width: 160,
      height: 40,
      depth: 40,
    },
    {
      id: "D",
      name: "Little everyday things",
      zone: "island",
      width: 160,
      height: 40,
      depth: 40,
    },
  ];
  const stocked = products.filter((product) => product.stock > 0);
  const plan: Plan = {
    room: createRoom(["fashion", "art", "coffee", "books"], "modern"),
    id: "opening-layout",
    name: "Opening arrangement",
    variant: "initial",
    theme: "midnight",
    status: "approved",
    parentId: null,
    revision: 0,
    createdAt: new Date().toISOString(),
    approvedAt: new Date().toISOString(),
    placements: Array.from({ length: 24 }, (_, i) => ({
      sku: stocked[(i * 7) % 55].id,
      shelf: shelves[Math.floor(i / 6)].id,
      position: i % 6,
      facings: 1,
    })),
    locks: [],
    maxMoves: 60,
    evidence: [],
    components: {
      culture: null,
      coverage: 0,
      diversity: 0,
      priority: 0,
      movement: 0,
      utility: 0,
    },
    runId: "seed",
    trace: ["Seeded original catalog; no external data."],
    rejected: [],
    actor: "Demo owner",
  };
  return {
    store: {
      name: "Common Ground",
      type: "Fashion, art, coffee & books",
      timezone: "Asia/Jakarta",
    },
    shelves,
    products,
    plans: [plan],
    currentId: plan.id,
    revision: 0,
    audit: [],
    provider: "fixture",
  };
}
