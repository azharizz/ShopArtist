import {
  themes,
  type Product,
  type ThemeId,
  type Evidence,
} from "../shared/types.js";

/** Deliberately synthetic. demo: identifiers must never be sent to a live Qloo API. */
export function fixtureEvidence(
  products: Product[],
  theme: ThemeId,
  runId: string,
): Evidence[] {
  const lens = themes.findIndex((item) => item.id === theme);
  return products
    .filter(
      (product) =>
        product.mapping.status === "approved" &&
        product.mapping.entityId?.startsWith("demo:"),
    )
    .map((product) => {
      const index = Number(product.mapping.entityId!.split(":").at(-1));
      const distance = ((index % 4) - lens + 4) % 4;
      const affinity = [0.94, 0.61, 0.28, 0.53][distance];
      return {
        sku: product.id,
        entityId: product.mapping.entityId!,
        sourceEntities: themes[lens].anchors,
        requestId: `fixture:${runId}:${theme}`,
        affinity,
        interpretation: `Synthetic relationship to “${themes[lens].name}”. Authored fixture for interaction design; not a Qloo result, buying probability, or sales forecast.`,
        source: "synthetic-fixture",
      };
    });
}
