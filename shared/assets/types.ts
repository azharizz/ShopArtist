import type { ShopFocus } from "../room.js";
import type { GeneratedPart } from "../generated-assets.js";

export interface AssetDefinition {
  id: string;
  label: string;
  width: number;
  depth: number;
  heightApprox: number;
  focus?: ShopFocus;
  description: string;
  function: string;
  moodTags: string[];
  coloring: string;
  dimensionNote?: string;
  visualReference: string;
  implementation: string;
  geometry?: GeneratedPart[];
  source?: "mcp" | "catalog";
  catalogPath?: string;
  referenceId?: string;
  visualReviews?: { acceptable: boolean; critique: string; improvements: string }[];
}
