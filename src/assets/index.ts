import { renderAsset as renderShelf } from "./shelf";
import { renderAsset as renderCashier } from "./cashier";
import { renderAsset as renderClothingRack } from "./clothing-rack";
import { renderAsset as renderArtWall } from "./art-wall";
import { renderAsset as renderCoffeeBar } from "./coffee-bar";
import { renderAsset as renderCafeTable } from "./cafe-table";
import { renderAsset as renderBench } from "./bench";
import { renderAsset as renderPlinth } from "./plinth";
import { renderAsset as renderPlant } from "./plant";

export const assetRenderers = { shelf: renderShelf, cashier: renderCashier, "clothing-rack": renderClothingRack, "art-wall": renderArtWall, "coffee-bar": renderCoffeeBar, "cafe-table": renderCafeTable, bench: renderBench, plinth: renderPlinth, plant: renderPlant };
