import type { Shelf } from "./types.js";

export const shopFocuses = ["fashion", "art", "coffee", "books", "other"] as const;
export type ShopFocus = (typeof shopFocuses)[number];
export const interiorStyles = [
  "futuristic",
  "industrial",
  "modern",
  "classic",
] as const;
export type InteriorStyle = (typeof interiorStyles)[number];
export const fixtureKinds = [
  "shelf",
  "cashier",
  "clothing-rack",
  "art-wall",
  "coffee-bar",
  "cafe-table",
  "bench",
  "plinth",
  "plant",
] as const;
export type FixtureKind = (typeof fixtureKinds)[number] | `generated-${string}`;
export interface Fixture {
  id: string;
  kind: FixtureKind;
  label: string;
  x: number;
  z: number;
  rotation: number;
  shelfId?: string;
  asset?: import("./assets/types.js").AssetDefinition;
}
export interface RoomDesign {
  focuses: ShopFocus[];
  style: InteriorStyle;
  width: number;
  depth: number;
  wall: string;
  floor: string;
  accent: string;
  window: "panoramic" | "grid" | "arched" | "ribbon";
  fixtures: Fixture[];
}
export const focusLabels: Record<ShopFocus, string> = {
  fashion: "Fashion shop",
  art: "Art shop",
  coffee: "Coffee shop",
  books: "Book shop",
  other: "Other shop",
};
export const stylePalettes: Record<
  InteriorStyle,
  {
    wall: string;
    floor: string;
    accent: string;
    frame: string;
    furniture: string;
    window: RoomDesign["window"];
    description: string;
  }
> = {
  futuristic: {
    wall: "#202c48",
    floor: "#8595ad",
    accent: "#65eddf",
    frame: "#94b6cb",
    furniture: "#e4edf3",
    window: "ribbon",
    description: "Luminous strips · cool metal · ribbon glazing",
  },
  industrial: {
    wall: "#9b6753",
    floor: "#8b8983",
    accent: "#ce8544",
    frame: "#303b3e",
    furniture: "#987351",
    window: "grid",
    description: "Brickwork · steel frames · concrete floor",
  },
  modern: {
    wall: "#f0ede5",
    floor: "#d5d1c6",
    accent: "#658c78",
    frame: "#424e47",
    furniture: "#dac9aa",
    window: "panoramic",
    description: "Clean volumes · terrazzo tiles · open glazing",
  },
  classic: {
    wall: "#e8dfcb",
    floor: "#ac825c",
    accent: "#7a8b61",
    frame: "#856b43",
    furniture: "#b99266",
    window: "arched",
    description: "Wall panelling · oak boards · arched windows",
  },
};
export { fixtureCatalog } from "./assets/index.js";
import { fixtureCatalog } from "./assets/index.js";

export function fixtureSize(
  fixture: Fixture,
  shelves: Shelf[],
): { width: number; depth: number } {
  const shelf =
    fixture.kind === "shelf"
      ? shelves.find((s) => s.id === fixture.shelfId)
      : undefined;
  const width = shelf
    ? shelf.width / 100 + 0.12
    : (fixture.asset?.width ?? fixtureCatalog[fixture.kind as keyof typeof fixtureCatalog]?.width ?? 0);
  const depth = shelf
    ? Math.max(0.55, shelf.depth / 100 + 0.08)
    : (fixture.asset?.depth ?? fixtureCatalog[fixture.kind as keyof typeof fixtureCatalog]?.depth ?? 0);
  const radians = (fixture.rotation * Math.PI) / 180;
  const cos = Math.abs(Math.cos(radians)), sin = Math.abs(Math.sin(radians));
  return { width: Math.round((width * cos + depth * sin) * 1e10) / 1e10, depth: Math.round((width * sin + depth * cos) * 1e10) / 1e10 };
}

export function createRoom(
  focuses: ShopFocus[] = ["books"],
  style: InteriorStyle = "classic",
  arrangement: "perimeter" | "islands" | "gallery" = "perimeter",
): RoomDesign {
  const palette = stylePalettes[style];
  const fixtures: Fixture[] = ["A", "B", "C", "D"].map((shelfId, i) => ({
    id: `shelf-${shelfId}`,
    kind: "shelf",
    label: `Display shelf ${shelfId}`,
    shelfId,
    x: arrangement === "gallery" ? -4.6 : -3.3 + i * 2.2,
    z:
      arrangement === "gallery"
        ? -3.5 + i * 2
        : arrangement === "islands"
          ? -2.8
          : -4.25,
    rotation: arrangement === "gallery" ? 90 : 0,
  }));
  fixtures.push({
    id: "cashier",
    kind: "cashier",
    label: "Cashier desk",
    x: 4.3,
    z: 3.2,
    rotation: 0,
  });
  if (focuses.includes("fashion"))
    fixtures.push({
      id: "fashion-rack",
      kind: "clothing-rack",
      label: "Fashion collection",
      x: -2,
      z: -0.6,
      rotation: 0,
    });
  if (focuses.includes("art"))
    fixtures.push(
      {
        id: "art-gallery",
        kind: "art-wall",
        label: "Art collection",
        x: 2.2,
        z: -0.6,
        rotation: 0,
      },
      {
        id: "art-plinth",
        kind: "plinth",
        label: "Sculpture plinth",
        x: 4.4,
        z: -1.7,
        rotation: 0,
      },
    );
  if (focuses.includes("coffee"))
    fixtures.push(
      {
        id: "coffee-bar",
        kind: "coffee-bar",
        label: "Coffee bar",
        x: -2.5,
        z: 1.4,
        rotation: 0,
      },
      {
        id: "coffee-table",
        kind: "cafe-table",
        label: "Coffee & conversation",
        x: 0.2,
        z: 1.5,
        rotation: 0,
      },
    );
  if (focuses.includes("books"))
    fixtures.push({
      id: "reading-bench",
      kind: "bench",
      label: "Reading corner",
      x: 2.7,
      z: 1.2,
      rotation: 0,
    });
  fixtures.push({
    id: "plant",
    kind: "plant",
    label: "A little greenery",
    x: -4.7,
    z: 4.4,
    rotation: 0,
  });
  return {
    focuses: [...focuses],
    style,
    width: 12,
    depth: 10,
    wall: palette.wall,
    floor: palette.floor,
    accent: palette.accent,
    window: palette.window,
    fixtures,
  };
}

export function applyArrangement(room: RoomDesign, shelves: Shelf[], arrangement: "perimeter" | "islands" | "gallery"): RoomDesign {
  const template = createRoom(room.focuses, room.style, arrangement);
  return { ...room, fixtures: room.fixtures.map(fixture => {
    const candidate = template.fixtures.find(item => item.id === fixture.id);
    if (!candidate) return fixture;
    const proposed = { ...fixture, rotation: candidate.rotation };
    const size = fixtureSize(proposed, shelves);
    const maxX = Math.max(0, room.width / 2 - size.width / 2);
    const maxZ = Math.max(0, room.depth / 2 - size.depth / 2);
    return { ...proposed, x: Math.max(-maxX, Math.min(maxX, candidate.x * room.width / template.width)), z: Math.max(-maxZ, Math.min(maxZ, candidate.z * room.depth / template.depth)) };
  }) };
}

export function fixturesOverlap(a: Fixture, b: Fixture, shelves: Shelf[]): boolean {
  const first = fixtureSize(a, shelves), second = fixtureSize(b, shelves);
  return Math.abs(a.x - b.x) < (first.width + second.width) / 2 - 1e-6 &&
    Math.abs(a.z - b.z) < (first.depth + second.depth) / 2 - 1e-6;
}

export function roomPlacementWarnings(room: RoomDesign, shelves: Shelf[]): string[] {
  const warnings: string[] = [];
  for (let i = 0; i < room.fixtures.length; i++) {
    const a = room.fixtures[i], size = fixtureSize(a, shelves);
    if (Math.abs(a.x) < size.width / 2 + 0.9 && a.z + size.depth / 2 > room.depth / 2 - 1.5)
      warnings.push(`${a.label} is near the entrance.`);
    for (let j = i + 1; j < room.fixtures.length; j++)
      if (fixturesOverlap(a, room.fixtures[j], shelves)) warnings.push(`${a.label} overlaps ${room.fixtures[j].label}.`);
  }
  return warnings;
}

export function validateRoom(room: RoomDesign, shelves: Shelf[]): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  const bounds = room.fixtures.map((f) => ({
    fixture: f,
    ...fixtureSize(f, shelves),
  }));
  for (const { fixture: f, width, depth } of bounds) {
    if (!fixtureCatalog[f.kind as keyof typeof fixtureCatalog] && (!f.asset?.geometry || f.asset.id !== f.kind)) errors.push(`${f.label} references an unknown asset.`);
    if (ids.has(f.id)) errors.push(`Duplicate fixture: ${f.id}.`);
    ids.add(f.id);
    if (
      Math.abs(f.x) + width / 2 > room.width / 2 + 1e-6 ||
      Math.abs(f.z) + depth / 2 > room.depth / 2 + 1e-6
    )
      errors.push(`${f.label} must stay inside the room.`);
    if (f.kind === "shelf" && !shelves.some((s) => s.id === f.shelfId))
      errors.push(`${f.label} references an unknown shelf.`);
  }
  for (const shelf of shelves)
    if (
      room.fixtures.filter((f) => f.kind === "shelf" && f.shelfId === shelf.id)
        .length !== 1
    )
      errors.push(`Shelf ${shelf.id} must have exactly one fixture.`);
  if (!room.fixtures.some((f) => f.kind === "cashier"))
    errors.push("Keep at least one cashier desk.");
  return errors;
}

export function roomChanges(
  before: RoomDesign,
  after: RoomDesign,
): { label: string; instruction: string }[] {
  const changes: { label: string; instruction: string }[] = [];
  if (
    before.style !== after.style ||
    before.wall !== after.wall ||
    before.floor !== after.floor ||
    before.accent !== after.accent ||
    before.window !== after.window ||
    before.width !== after.width ||
    before.depth !== after.depth ||
    before.focuses.join() !== after.focuses.join()
  )
    changes.push({
      label: "Interior design",
      instruction: `${after.focuses.map((f) => focusLabels[f]).join(" + ")}; ${after.style}; ${after.width} × ${after.depth} m; walls ${after.wall}; floor ${after.floor}; accent ${after.accent}; ${after.window} windows.`,
    });
  for (const old of before.fixtures)
    if (!after.fixtures.some((f) => f.id === old.id))
      changes.push({
        label: old.label,
        instruction: "Remove fixture from the floor plan.",
      });
  for (const f of after.fixtures) {
    const old = before.fixtures.find((item) => item.id === f.id);
    if (
      !old ||
      old.x !== f.x ||
      old.z !== f.z ||
      old.rotation !== f.rotation ||
      old.kind !== f.kind
    )
      changes.push({
        label: f.label,
        instruction: `${old ? "Move" : "Add"} ${f.asset?.label ?? fixtureCatalog[f.kind as keyof typeof fixtureCatalog]?.label ?? f.label}: X ${f.x.toFixed(1)} m, Z ${f.z.toFixed(1)} m, rotation ${f.rotation}°. Coordinates from room centre; clear furniture before repositioning.`,
      });
  }
  return changes;
}
