import type { RoomDesign } from "./room.js";
import type { DesignBrief } from "./design.js";
import type { DesignStudy } from "./research.js";
export type Category = "Records" | "Books" | "Objects" | "Stationery";
export type ThemeId = "midnight" | "analog" | "quiet" | "electric";
export interface Product {
  id: string;
  title: string;
  category: Category;
  creator: string;
  width: number;
  height: number;
  depth: number;
  stock: number;
  priority: number;
  zones: string[];
  color: string;
  motif: number;
  mapping: {
    status: "approved" | "pending" | "unmapped";
    entityId: string | null;
    candidates: { id: string; label: string; type: string }[];
  };
}
export interface Shelf {
  id: string;
  name: string;
  zone: string;
  width: number;
  height: number;
  depth: number;
}
export interface Placement {
  sku: string;
  shelf: string;
  position: number;
  facings: number;
}
export interface Evidence {
  sku: string;
  entityId: string;
  sourceEntities: string[];
  requestId: string;
  affinity: number;
  interpretation: string;
  source: "synthetic-fixture";
}
export interface Components {
  culture: number | null;
  coverage: number;
  diversity: number;
  priority: number;
  movement: number;
  utility: number;
}
export interface Plan {
  id: string;
  name: string;
  variant: "fixture" | "baseline" | "manual" | "initial" | "restore";
  theme: ThemeId;
  status: "draft" | "approved";
  parentId: string | null;
  revision: number;
  createdAt: string;
  approvedAt: string | null;
  placements: Placement[];
  room: RoomDesign;
  locks: Placement[];
  maxMoves: number;
  evidence: Evidence[];
  components: Components;
  runId: string;
  trace: string[];
  rejected: { sku: string; reason: string }[];
  actor: string | null;
}
export interface Audit {
  action: string;
  planId: string;
  actor: string;
  timestamp: string;
}
export interface StoreState {
  projectId?: string;
  brief?: DesignBrief;
  tasteStudy?: DesignStudy;
  store: { name: string; type: string; timezone: string };
  shelves: Shelf[];
  products: Product[];
  plans: Plan[];
  currentId: string;
  revision: number;
  audit: Audit[];
  provider: "fixture" | "unavailable";
}
export interface Move {
  sku: string;
  title: string;
  from: string;
  to: string;
  facings: number;
  instruction: string;
}
export interface Validation {
  valid: boolean;
  errors: string[];
  moves: number;
  used: Record<string, number>;
}
export const themes: {
  id: ThemeId;
  name: string;
  subtitle: string;
  color: string;
  anchors: string[];
}[] = [
  {
    id: "midnight",
    name: "Midnight listening",
    subtitle: "Jazz, city stories & slow evenings",
    color: "#677db5",
    anchors: ["demo:artist:0", "demo:book:0"],
  },
  {
    id: "analog",
    name: "The analog weekend",
    subtitle: "Indie sounds, print & everyday rituals",
    color: "#ca7850",
    anchors: ["demo:artist:1", "demo:book:1"],
  },
  {
    id: "quiet",
    name: "A slower kind of Sunday",
    subtitle: "Ambient, nature & thoughtful objects",
    color: "#789775",
    anchors: ["demo:artist:2", "demo:book:2"],
  },
  {
    id: "electric",
    name: "Electric daydream",
    subtitle: "New-wave energy & colorful ideas",
    color: "#bb7795",
    anchors: ["demo:artist:3", "demo:book:3"],
  },
];
export const samePlacement = (
  a: Placement | undefined,
  b: Placement | undefined,
) =>
  a?.shelf === b?.shelf &&
  a?.position === b?.position &&
  a?.facings === b?.facings;
