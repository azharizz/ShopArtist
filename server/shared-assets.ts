import { randomUUID } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { generatedGeometrySchema, inspectGeneratedGeometry } from "../shared/generated-assets.js";
import type { AssetDefinition } from "../shared/assets/types.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const directory = () => path.join(process.env.DATA_DIR || path.join(root, "data"), "mcp-assets");
export const assetInputSchema = z.object({
  label: z.string().trim().min(2).max(80), description: z.string().trim().min(5).max(400),
  function: z.string().trim().min(5).max(240), moodTags: z.array(z.string().trim().min(1).max(32)).min(1).max(8),
  geometry: generatedGeometrySchema,
}).strict();
export type AssetInput = z.infer<typeof assetInputSchema>;

export function saveSharedAsset(input: AssetInput): AssetDefinition {
  const draft = assetInputSchema.parse(input), tested = inspectGeneratedGeometry(draft.geometry);
  const id = `generated-${randomUUID()}`;
  const linked = [...new Set(draft.geometry.map(part => part.color).filter(color => ["accent", "wood", "frame"].includes(color)))];
  const asset: AssetDefinition = { ...draft, id, width: tested.width, depth: tested.depth, heightApprox: tested.heightApprox,
    coloring: linked.length ? `Room-linked colors: ${linked.join(", ")}. Other colors are fixed.` : "All part colors are fixed.",
    visualReference: `/asset-catalog.html#${id}`, implementation: "shared/generated-assets.ts", source: "mcp" };
  mkdirSync(directory(), { recursive: true });
  writeFileSync(path.join(directory(), `${id}.json`), JSON.stringify(asset, null, 2), { flag: "wx" });
  return asset;
}

export function sharedAssets(): AssetDefinition[] {
  const dir = directory();
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter(file => /^generated-[0-9a-f-]{36}\.json$/.test(file)).sort().flatMap(file => {
    try {
      const filename = path.join(dir, file);
      if (statSync(filename).size > 256_000) throw new Error("Asset file is too large");
      const stored = JSON.parse(readFileSync(filename, "utf8"));
      const draft = assetInputSchema.parse({ label: stored.label, description: stored.description, function: stored.function, moodTags: stored.moodTags, geometry: stored.geometry });
      const dimensions = inspectGeneratedGeometry(draft.geometry);
      if (stored.id !== file.slice(0, -5)) throw new Error("Asset identity mismatch");
      return [{ ...stored, ...draft, width: dimensions.width, depth: dimensions.depth, heightApprox: dimensions.heightApprox, source: "mcp" } as AssetDefinition];
    } catch (error) { console.error(`Could not load shared asset ${file}:`, error instanceof Error ? error.message : error); return []; }
  });
}
