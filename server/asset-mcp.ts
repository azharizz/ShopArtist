import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { fixtureCatalog } from "../shared/room.js";
import { inspectGeneratedGeometry } from "../shared/generated-assets.js";
import { renderAssetViews } from "./asset-preview.js";
import { assetInputSchema, saveSharedAsset, allSharedAssets } from "./shared-assets.js";

const server = new McpServer({ name: "shopartist-assets", version: "1.0.0" });
const previewed = new Set<string>();
const digest = (value: unknown) => createHash("sha256").update(JSON.stringify(value)).digest("hex");
server.registerTool("list_assets", { description: "List the built-in and locally shared MCP asset catalog; browser-private assets are not exposed.", inputSchema: {} }, async () => ({
  content: [{ type: "text", text: JSON.stringify([...Object.values(fixtureCatalog), ...allSharedAssets()].map(({ id, label, description, function: purpose, moodTags, width, depth, heightApprox }) => ({ id, label, description, function: purpose, moodTags, width, depth, heightApprox }))) }],
}));
server.registerTool("inspect_asset", { description: "Inspect one built-in or shared asset, including its geometry or built-in source code.", inputSchema: { id: z.string().min(1).max(80) } }, async ({ id }) => {
  const asset = [...Object.values(fixtureCatalog), ...allSharedAssets()].find(item => item.id === id);
  if (!asset) return { isError: true, content: [{ type: "text", text: "Asset not found." }] };
  const source = Object.hasOwn(fixtureCatalog, id) ? readFileSync(new URL(`../shared/assets/${id}.ts`, import.meta.url), "utf8") : undefined;
  return { content: [{ type: "text", text: JSON.stringify({ asset, ...(source ? { source } : {}) }) }] };
});
server.registerTool("preview_asset", { description: "Validate an asset draft and render front, side, and three-quarter images. Review the returned image before saving. Coordinates and dimensions are in metres; y is part centre. Supported shapes: box and vertical cylinder; colors: accent, wood, frame or #RRGGBB.", inputSchema: assetInputSchema.shape }, async input => {
  const draft = assetInputSchema.parse(input), dimensions = inspectGeneratedGeometry(draft.geometry);
  const png = await renderAssetViews(draft.geometry);
  previewed.add(digest(draft));
  return { content: [{ type: "text", text: JSON.stringify({ width: dimensions.width, depth: dimensions.depth, height: dimensions.heightApprox, parts: dimensions.meshes, note: "Front, side, and three-quarter views; review visually before saving." }) }, { type: "image", data: png.toString("base64"), mimeType: "image/png" }] };
});
server.registerTool("save_asset", { description: "Persist a draft as a shared asset visible to the app and design agent. You must successfully preview this exact draft in this MCP session first.", inputSchema: assetInputSchema.shape }, async input => {
  const draft = assetInputSchema.parse(input);
  if (!previewed.has(digest(draft))) return { isError: true, content: [{ type: "text", text: "Preview this exact draft before saving it." }] };
  const asset = saveSharedAsset(draft);
  return { content: [{ type: "text", text: JSON.stringify({ asset, catalogUrl: asset.visualReference }) }] };
});
await server.connect(new StdioServerTransport());
