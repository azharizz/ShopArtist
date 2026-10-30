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

import curated22 from "./espresso-bar.js";
import curated23 from "./pastry-display-case.js";
import curated24 from "./condiment-station.js";
import curated25 from "./wall-menu-panel.js";
import curated26 from "./standing-menu-board.js";
import curated27 from "./cafe-banquette-seating.js";
import curated28 from "./cafe-booth.js";
import curated29 from "./barrel-cafe-table.js";
import curated30 from "./outdoor-look-cafe-bench.js";
import curated31 from "./reading-and-coffee-nook.js";
import curated32 from "./boutique-clothing-rail.js";
import curated33 from "./circular-clothing-rack.js";
import curated34 from "./folded-clothing-table.js";
import curated35 from "./shoe-display-wall.js";
import curated36 from "./hat-display-stand.js";
import curated37 from "./full-length-mirror.js";
import curated38 from "./fitting-room-divider.js";
import curated39 from "./fitting-room-bench.js";
import curated40 from "./mannequin-pedestal.js";
import curated41 from "./central-styling-station.js";
import curated42 from "./gallery-display-wall.js";
import curated43 from "./painting-display-rack.js";
import curated44 from "./artist-worktable.js";
import curated45 from "./canvas-storage-rack.js";
import curated46 from "./color-sample-wall.js";
import curated47 from "./art-supply-island.js";
import curated48 from "./art-workshop-station.js";
import curated49 from "./exhibition-entrance-arch.js";
import curated50 from "./featured-artist-display.js";
import curated51 from "./classic-library-bookcase.js";
import curated52 from "./modern-floating-look-shelf.js";
import curated53 from "./bookstore-display-island.js";
import curated54 from "./childrens-story-corner.js";
import curated55 from "./mystery-bookcase.js";
import curated56 from "./fantasy-display-tower.js";
import curated57 from "./book-recommendation-stand.js";
import curated58 from "./reading-armchair.js";
import curated59 from "./book-checkout-counter.js";
import curated60 from "./gift-wrapping-counter.js";
import curated61 from "./reading-lamp-and-side-table.js";
import curated62 from "./book-cart.js";
import curated63 from "./book-and-plant-divider.js";

import curated64 from "./arched-look-bookcase.js";
import curated65 from "./bookcase-with-base-drawers.js";
import curated66 from "./bookcase-with-central-niche.js";
import curated67 from "./narrow-corner-bookshelf.js";
import curated68 from "./low-rolling-bookcase.js";
import curated69 from "./zigzag-bookcase.js";
import curated70 from "./staggered-cubby-bookcase.js";
import curated71 from "./stackable-book-cubes.js";
import curated72 from "./bookcase-with-integrated-bench.js";
import curated73 from "./bookcase-with-reading-light.js";
import curated74 from "./double-sided-library-shelf.js";
import curated75 from "./face-out-picture-book-rack.js";
import curated76 from "./tiered-magazine-stand.js";
import curated77 from "./book-browsing-trough.js";
import curated78 from "./spiral-look-book-tower.js";
import curated79 from "./bookcase-and-library-ladder.js";
import curated80 from "./shelf-with-signage-header.js";
import curated81 from "./compact-coffee-kiosk.js";
import curated82 from "./two-level-espresso-bar.js";
import curated83 from "./coffee-counter-with-open-storage.js";
import curated84 from "./coffee-counter-with-tile-front.js";
import curated85 from "./corner-cafe-counter.js";
import curated86 from "./freestanding-menu-kiosk.js";
import curated87 from "./pastry-pedestal.js";
import curated88 from "./bakery-bread-rack.js";
import curated89 from "./cake-display-stand.js";
import curated90 from "./tea-service-station.js";
import curated91 from "./self-service-water-station.js";
import curated92 from "./coffee-grinder-station.js";
import curated93 from "./coffee-bean-retail-island.js";
import curated94 from "./cafe-tray-return-unit.js";
import curated95 from "./barista-tool-wall.js";
import curated96 from "./syrup-bottle-display.js";
import curated97 from "./cafe-pickup-counter.js";
import curated98 from "./pedestal-bistro-table.js";
import curated99 from "./two-person-cafe-table-set.js";
import curated100 from "./high-cafe-table-and-stools.js";
import curated101 from "./nesting-coffee-tables.js";
import curated102 from "./coffee-table-with-shelf.js";
import curated103 from "./oval-look-communal-table.js";
import curated104 from "./trestle-table.js";
import curated105 from "./reading-chair-with-footstool.js";
import curated106 from "./high-back-lounge-chair.js";
import curated107 from "./two-seat-conversation-set.js";
import curated108 from "./sectional-sofa.js";
import curated109 from "./sofa-with-side-shelves.js";
import curated110 from "./slatted-wooden-stool.js";
import curated111 from "./upholstered-bar-stool.js";
import curated112 from "./storage-ottoman.js";
import curated113 from "./window-bench-with-cubbies.js";
import curated114 from "./corner-banquette.js";
import curated115 from "./industrial-garment-rack.js";
import curated116 from "./wall-clothing-rail.js";
import curated117 from "./double-sided-garment-display.js";
import curated118 from "./childrens-clothing-rack.js";
import curated119 from "./accessories-ladder.js";
import curated120 from "./handbag-cubby-wall.js";
import curated121 from "./handbag-pedestal-cluster.js";
import curated122 from "./shoe-display-staircase.js";
import curated123 from "./shoe-fitting-bench.js";
import curated124 from "./hat-shelf-with-pegs.js";
import curated125 from "./sunglasses-display-tower.js";
import curated126 from "./jewelry-tray-table.js";
import curated127 from "./necklace-display-bust.js";
import curated128 from "./scarf-display-wall.js";
import curated129 from "./fitting-room-entrance.js";
import curated130 from "./three-panel-fitting-mirror.js";
import curated131 from "./fashion-window-vignette.js";
import curated132 from "./artist-easel.js";
import curated133 from "./double-easel-station.js";
import curated134 from "./large-canvas-display.js";
import curated135 from "./art-print-browser.js";
import curated136 from "./stacked-frame-display.js";
import curated137 from "./postcard-display-tower.js";
import curated138 from "./paint-bottle-shelf.js";
import curated139 from "./brush-and-pencil-bar.js";
import curated140 from "./drawing-paper-station.js";
import curated141 from "./art-supply-pegboard.js";
import curated142 from "./ceramic-vessel-display.js";
import curated143 from "./sculpture-display-wall.js";
import curated144 from "./gallery-label-stand.js";
import curated145 from "./framed-triptych.js";
import curated146 from "./gallery-partition-with-opening.js";
import curated147 from "./workshop-materials-cart.js";
import curated148 from "./artist-demonstration-area.js";
import curated149 from "./low-perimeter-cabinet.js";
import curated150 from "./mixed-storage-cabinet.js";
import curated151 from "./pegboard-display.js";
import curated152 from "./slatwall-merchandise-panel.js";
import curated153 from "./grid-merchandise-wall.js";
import curated154 from "./stepped-window-platform.js";
import curated155 from "./bridge-display.js";
import curated156 from "./showcase-frame.js";
import curated157 from "./corner-feature-display.js";
import curated158 from "./window-display-backdrop.js";
import curated159 from "./folded-screen-divider.js";
import curated160 from "./open-cubby-divider.js";
import curated161 from "./planter-and-slat-divider.js";
import curated162 from "./reception-feature-wall.js";
import curated163 from "./product-sampling-station.js";
import curated164 from "./display-crate-stack.js";
import curated165 from "./lockable-look-storage-cabinet.js";
import curated166 from "./tripod-style-floor-lamp.js";
import curated167 from "./double-shade-floor-lamp.js";
import curated168 from "./table-lamp.js";
import curated169 from "./lantern-style-floor-light.js";
import curated170 from "./pendant-look-lighting-frame.js";
import curated171 from "./long-planter-box.js";
import curated172 from "./tiered-plant-stand.js";
import curated173 from "./indoor-geometric-tree.js";
import curated174 from "./tall-cactus-planter.js";
import curated175 from "./flower-arrangement-stand.js";
import curated176 from "./small-tabletop-plant.js";
import curated177 from "./decorative-vase-cluster.js";
import curated178 from "./wall-clock.js";
import curated179 from "./decorative-column.js";
import curated180 from "./faux-fireplace.js";
import curated181 from "./geometric-wall-sculpture.js";
import curated182 from "./patterned-rug-look-platform.js";
import curated183 from "./romantic-reading-alcove.js";
import curated184 from "./minimal-cafe-corner.js";
import curated185 from "./bookshop-window-nook.js";
import curated186 from "./fashion-styling-corner.js";
import curated187 from "./gallery-contemplation-corner.js";
import curated188 from "./childrens-activity-corner.js";
import curated189 from "./community-workshop-table.js";
import curated190 from "./seasonal-product-island.js";
import curated191 from "./shop-entrance-welcome-station.js";
import curated192 from "./checkout-and-wrapping-station.js";
import curated193 from "./cafe-booth-with-divider.js";
import curated194 from "./art-and-book-feature-wall.js";
import curated195 from "./fashion-accessories-island.js";
import curated196 from "./bakery-and-coffee-pairing-station.js";
import curated197 from "./plant-filled-reading-divider.js";
import curated198 from "./premium-product-showcase.js";
import curated199 from "./modular-pop-up-kiosk.js";
import curated200 from "./the-storyhouse-bookcase.js";

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
  curated22,
  curated23,
  curated24,
  curated25,
  curated26,
  curated27,
  curated28,
  curated29,
  curated30,
  curated31,
  curated32,
  curated33,
  curated34,
  curated35,
  curated36,
  curated37,
  curated38,
  curated39,
  curated40,
  curated41,
  curated42,
  curated43,
  curated44,
  curated45,
  curated46,
  curated47,
  curated48,
  curated49,
  curated50,
  curated51,
  curated52,
  curated53,
  curated54,
  curated55,
  curated56,
  curated57,
  curated58,
  curated59,
  curated60,
  curated61,
  curated62,
  curated63,
  curated64,
  curated65,
  curated66,
  curated67,
  curated68,
  curated69,
  curated70,
  curated71,
  curated72,
  curated73,
  curated74,
  curated75,
  curated76,
  curated77,
  curated78,
  curated79,
  curated80,
  curated81,
  curated82,
  curated83,
  curated84,
  curated85,
  curated86,
  curated87,
  curated88,
  curated89,
  curated90,
  curated91,
  curated92,
  curated93,
  curated94,
  curated95,
  curated96,
  curated97,
  curated98,
  curated99,
  curated100,
  curated101,
  curated102,
  curated103,
  curated104,
  curated105,
  curated106,
  curated107,
  curated108,
  curated109,
  curated110,
  curated111,
  curated112,
  curated113,
  curated114,
  curated115,
  curated116,
  curated117,
  curated118,
  curated119,
  curated120,
  curated121,
  curated122,
  curated123,
  curated124,
  curated125,
  curated126,
  curated127,
  curated128,
  curated129,
  curated130,
  curated131,
  curated132,
  curated133,
  curated134,
  curated135,
  curated136,
  curated137,
  curated138,
  curated139,
  curated140,
  curated141,
  curated142,
  curated143,
  curated144,
  curated145,
  curated146,
  curated147,
  curated148,
  curated149,
  curated150,
  curated151,
  curated152,
  curated153,
  curated154,
  curated155,
  curated156,
  curated157,
  curated158,
  curated159,
  curated160,
  curated161,
  curated162,
  curated163,
  curated164,
  curated165,
  curated166,
  curated167,
  curated168,
  curated169,
  curated170,
  curated171,
  curated172,
  curated173,
  curated174,
  curated175,
  curated176,
  curated177,
  curated178,
  curated179,
  curated180,
  curated181,
  curated182,
  curated183,
  curated184,
  curated185,
  curated186,
  curated187,
  curated188,
  curated189,
  curated190,
  curated191,
  curated192,
  curated193,
  curated194,
  curated195,
  curated196,
  curated197,
  curated198,
  curated199,
  curated200,
];
