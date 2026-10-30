import type { AssetDefinition } from "./types.js";
import * as THREE from "three";
import type { AssetRenderContext } from "../asset-render-context.js";

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
  "implementation": "shared/assets/shelf.ts",
  "dimensionNote": "Width and depth follow the linked shelf; this is the default footprint, not a fixed model size."
} satisfies AssetDefinition;

export function renderAsset(ctx: AssetRenderContext) {
  const { fixture, room, shelves, placements, products, selected, editMode, group, w, d, wood, frame, box, label, geometries, materials, productMeshes } = ctx;

          const shelf = shelves.find((s) => s.id === fixture.shelfId)!;
          const usable = shelf.width / 100;
          for (const y of [0.22, 0.7, 1.25])
            box(w, 0.08, d, 0, y, 0, wood, group);
          for (const x of [-w / 2 + 0.04, w / 2 - 0.04])
            box(0.08, 1.35, d, x, 0.67, 0, frame, group);
          box(w, 1.2, 0.045, 0, 0.63, -d / 2 + 0.03, wood, group);
          // Lower shelf books are architectural dressing, not mapped inventory.
          if (room.focuses.includes("books"))
            for (let i = 0; i < Math.floor(usable / 0.12); i++)
              box(
                0.075,
                0.3 + (i % 3) * 0.03,
                d * 0.55,
                -usable / 2 + 0.08 + i * 0.12,
                0.42,
                0,
                ["#72806a", "#ce9c72", "#b9b8a3"][i % 3],
                group,
              );
          const tag = label(
            shelf.id + " / " + shelf.name,
            "MERCHANDISE DISPLAY",
            Math.min(w - 0.1, 1.5),
            0.17,
            "#f0ece2",
            "#303b32",
          );
          tag.position.set(0, 1.13, d / 2 + 0.01);
          group.add(tag);
          let offset = -usable / 2;
          for (const placement of placements
            .filter((p) => p.shelf === shelf.id)
            .sort((a, b) => a.position - b.position)) {
            const product = products.find((p) => p.id === placement.sku);
            if (!product) continue;
            for (let facing = 0; facing < placement.facings; facing++) {
              const pw = product.width / 100,
                ph = product.height / 100,
                pd = Math.max(product.depth / 100, 0.035);
              const item = new THREE.Group();
              item.position.set(offset + pw / 2, 1.3, 0.02);
              group.add(item);
              const body = box(
                Math.max(0.025, pw - 0.01),
                ph,
                pd,
                0,
                ph / 2,
                0,
                product.color,
                item,
              );
              const cover = label(
                product.title,
                product.creator,
                Math.max(0.025, pw - 0.008),
                ph,
                product.color,
                "#fffae9",
              );
              cover.position.set(0, ph / 2, pd / 2 + 0.003);
              item.add(cover);
              body.userData.sku = product.id;
              cover.userData.sku = product.id;
              productMeshes.push(body, cover);
              if (selected === product.id && !editMode) {
                const edge = new THREE.EdgesGeometry(body.geometry),
                  mat = new THREE.LineBasicMaterial({ color: "#d2ff70" });
                geometries.push(edge);
                materials.push(mat);
                const outline = new THREE.LineSegments(edge, mat);
                outline.position.copy(body.position);
                item.add(outline);
              }
              offset += pw;
            }
          }
}
