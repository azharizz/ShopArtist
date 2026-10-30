import { renderAsset as renderShelf } from "./assets/shelf.js";
import { renderAsset as renderCashier } from "./assets/cashier.js";
import { renderAsset as renderClothingRack } from "./assets/clothing-rack.js";
import { renderAsset as renderArtWall } from "./assets/art-wall.js";
import { renderAsset as renderCoffeeBar } from "./assets/coffee-bar.js";
import { renderAsset as renderCafeTable } from "./assets/cafe-table.js";
import { renderAsset as renderBench } from "./assets/bench.js";
import { renderAsset as renderPlinth } from "./assets/plinth.js";
import { renderAsset as renderPlant } from "./assets/plant.js";

export const assetRenderers = { shelf: renderShelf, cashier: renderCashier, "clothing-rack": renderClothingRack, "art-wall": renderArtWall, "coffee-bar": renderCoffeeBar, "cafe-table": renderCafeTable, bench: renderBench, plinth: renderPlinth, plant: renderPlant };
