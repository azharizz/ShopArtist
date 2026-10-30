import type { AssetDefinition } from "./types.js";
import shelf from "./shelf.js";
import cashier from "./cashier.js";
import clothing_rack from "./clothing-rack.js";
import art_wall from "./art-wall.js";
import coffee_bar from "./coffee-bar.js";
import cafe_table from "./cafe-table.js";
import bench from "./bench.js";
import plinth from "./plinth.js";
import plant from "./plant.js";

export const fixtureCatalog: Record<(typeof import("../room.js").fixtureKinds)[number], AssetDefinition> = {
  "shelf": shelf,
  "cashier": cashier,
  "clothing-rack": clothing_rack,
  "art-wall": art_wall,
  "coffee-bar": coffee_bar,
  "cafe-table": cafe_table,
  "bench": bench,
  "plinth": plinth,
  "plant": plant,
};
