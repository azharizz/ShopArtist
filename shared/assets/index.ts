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

import curated0 from "./modern-romantic-bookcase.js";
import curated1 from "./asymmetrical-bookcase.js";
import curated2 from "./ladder-style-shelf.js";
import curated3 from "./low-bookstore-display.js";
import curated4 from "./library-wall-unit.js";
import curated5 from "./cubby-display.js";
import curated6 from "./round-display-pedestal.js";
import curated7 from "./open-display-cabinet.js";
import curated8 from "./romantic-cafe-counter.js";
import curated9 from "./l-shaped-service-counter.js";
import curated10 from "./bakery-display-counter.js";
import curated11 from "./small-espresso-station.js";
import curated12 from "./square-cafe-table.js";
import curated13 from "./communal-table.js";
import curated14 from "./cozy-two-seat-sofa.js";
import curated15 from "./round-upholstered-ottoman.js";
import curated16 from "./clothing-rack-with-lower-shelf.js";
import curated17 from "./large-potted-plant.js";
import curated18 from "./slatted-room-divider.js";
import curated19 from "./decorative-floor-lamp.js";
import curated20 from "./parisian-romantic-library.js";
import curated21 from "./blush-reading-nook-bookcase.js";

export const curatedAssets: AssetDefinition[] = [
  curated0,
  curated1,
  curated2,
  curated3,
  curated4,
  curated5,
  curated6,
  curated7,
  curated8,
  curated9,
  curated10,
  curated11,
  curated12,
  curated13,
  curated14,
  curated15,
  curated16,
  curated17,
  curated18,
  curated19,
  curated20,
  curated21,
];
