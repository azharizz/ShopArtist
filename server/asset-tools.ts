import { z } from "zod";
import { fixtureCatalog, fixtureKinds } from "../shared/room.js";
import type { AssetDefinition } from "../shared/assets/types.js";

const listInput = z.object({
  query: z.string().trim().max(120).optional(),
  offset: z.number().int().min(0).max(1_000_000).optional(),
  limit: z.number().int().min(1).max(25).optional(),
}).strict();
const detailsInput = z.object({ ids: z.array(z.string().min(1).max(80)).min(1).max(12) }).strict();

export function listAssets(input: unknown, listedIds: Set<string>, catalog: AssetDefinition[] = fixtureKinds.map(kind => fixtureCatalog[kind])) {
  const { query = "", offset = 0, limit = 20 } = listInput.parse(input);
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const matches = catalog.filter(asset => {
    const text = [asset.id, asset.label, asset.description, asset.function, asset.focus, ...asset.moodTags].join(" ").toLowerCase();
    return terms.every(term => text.includes(term));
  });
  const page = matches.slice(offset, offset + limit);
  page.forEach(asset => listedIds.add(asset.id));
  return {
    assets: page.map(({ id, label, focus, moodTags }) => ({ id, label, ...(focus ? { focus } : {}), moodTags })),
    total: matches.length,
    next_offset: offset + page.length < matches.length ? offset + page.length : null,
  };
}

export function getAssetDetails(input: unknown, listedIds: Set<string>, catalog: AssetDefinition[] = fixtureKinds.map(kind => fixtureCatalog[kind])) {
  const { ids } = detailsInput.parse(input);
  const uniqueIds = [...new Set(ids)];
  if (uniqueIds.some(id => !listedIds.has(id))) throw new Error("Only request asset IDs returned by list_assets in this session.");
  const assets = uniqueIds.map(id => catalog.find(asset => asset.id === id));
  if (assets.some(asset => !asset)) throw new Error("An asset ID is no longer available in the catalog.");
  return { assets: assets as AssetDefinition[] };
}
