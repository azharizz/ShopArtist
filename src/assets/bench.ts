import type { AssetRenderContext } from "./context";

export function renderAsset(ctx: AssetRenderContext) {
  const { group, w, d, frame, accent, box } = ctx;

          box(w, 0.2, d, 0, 0.45, 0, accent, group);
          box(w, 0.48, 0.12, 0, 0.78, -d / 2 + 0.06, accent, group);
          for (const x of [-0.7, 0.7])
            box(0.09, 0.4, 0.5, x, 0.2, 0, frame, group);
          box(0.22, 0.04, 0.27, 0.4, 0.57, 0.05, "#bf795c", group);
}
