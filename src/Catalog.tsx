import { LockKeyhole, ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import type { Product, Plan, StoreState } from "../shared/types";

export function Cover({
  product,
  small = false,
}: {
  product: Product;
  small?: boolean;
}) {
  return (
    <div
      className={`cover motif-${product.motif} ${small ? "cover-small" : ""} ${product.category === "Records" ? "record-cover" : ""}`}
      style={{ "--cover": product.color } as CSSProperties}
      aria-hidden="true"
    >
      <span className="cover-creator">{product.creator}</span>
      <div className="cover-art">
        <i />
        <i />
        <i />
      </div>
      <span className="cover-title">{product.title}</span>
      <span className="cover-edition">COMMON GROUND / EDITIONS</span>
    </div>
  );
}

export function Shelves({
  state,
  plan,
  selected,
  onSelect,
  onDrop,
  compact = false,
}: {
  state: StoreState;
  plan: Plan;
  selected?: string | null;
  onSelect?: (sku: string) => void;
  onDrop?: (sku: string, shelf: string) => void;
  compact?: boolean;
}) {
  return (
    <div className={`shelf-grid ${compact ? "compact" : ""}`}>
      {state.shelves.map((shelf) => {
        const items = plan.placements
          .filter((p) => p.shelf === shelf.id)
          .sort((a, b) => a.position - b.position);
        const used = items.reduce(
          (sum, p) =>
            sum +
            (state.products.find((product) => product.id === p.sku)?.width ??
              0) *
              p.facings,
          0,
        );
        return (
          <section
            key={shelf.id}
            className="shelf-card"
            onDragOver={
              onDrop
                ? (event) => {
                    event.preventDefault();
                    event.dataTransfer.dropEffect = "move";
                  }
                : undefined
            }
            onDrop={
              onDrop
                ? (event) => {
                    event.preventDefault();
                    const sku = event.dataTransfer.getData("text/plain");
                    if (sku) onDrop(sku, shelf.id);
                  }
                : undefined
            }
          >
            <header>
              <span className="shelf-letter">{shelf.id}</span>
              <div>
                <strong>{shelf.name}</strong>
                <small>
                  {used.toFixed(0)} / {shelf.width} cm · {shelf.zone}
                </small>
              </div>
              <span className="shelf-percent">
                {Math.round((used / shelf.width) * 100)}%
              </span>
            </header>
            <div className="shelf-products">
              {items.map((p) => {
                const product = state.products.find(
                  (item) => item.id === p.sku,
                )!;
                return (
                  <button
                    key={p.sku}
                    className={`shelf-product ${selected === p.sku ? "selected" : ""}`}
                    title={`${product.title} · ${p.facings} facing(s) · position ${p.position + 1}`}
                    aria-label={`Inspect ${product.title}`}
                    onClick={() => onSelect?.(p.sku)}
                    draggable={
                      !!onDrop && !plan.locks.some((l) => l.sku === p.sku)
                    }
                    onDragStart={(event) =>
                      event.dataTransfer.setData("text/plain", p.sku)
                    }
                  >
                    <Cover product={product} small />
                    <span className="shelf-product-title">{product.title}</span>
                    {plan.locks.some((l) => l.sku === p.sku) && (
                      <LockKeyhole size={10} className="lock-mark" />
                    )}
                    {p.facings > 1 && (
                      <span className="facing-mark">×{p.facings}</span>
                    )}
                  </button>
                );
              })}
              {!items.length && (
                <p className="empty-shelf">
                  {onDrop
                    ? "Drop a product here, or use the placement editor."
                    : "Room for something good."}
                </p>
              )}
            </div>
            <div className="wood-shelf" />
            <div className="capacity-track">
              <span
                style={{
                  width: `${Math.min(100, (used / shelf.width) * 100)}%`,
                }}
              />
            </div>
          </section>
        );
      })}
    </div>
  );
}

export function CatalogRow({
  product,
  onSelect,
}: {
  product: Product;
  onSelect: () => void;
}) {
  return (
    <tr>
      <td>
        <button className="catalog-product" onClick={onSelect}>
          <Cover product={product} small />
          <span>
            <strong>{product.title}</strong>
            <small>
              {product.id} · {product.creator || "Independent edition"}
            </small>
          </span>
        </button>
      </td>
      <td>
        <span className="category-tag">{product.category}</span>
      </td>
      <td>
        {product.width} × {product.height} × {product.depth}
        <small>cm · W × H × D</small>
      </td>
      <td>
        <span className={product.stock === 0 ? "stock-empty" : ""}>
          {product.stock}
        </span>
        <small>available</small>
      </td>
      <td>
        <span className={`mapping-status ${product.mapping.status}`}>
          {product.mapping.status === "approved"
            ? "Fixture reviewed"
            : product.mapping.status === "pending"
              ? "Needs review"
              : "Unmapped"}
        </span>
      </td>
      <td>
        <button
          className="icon-button"
          aria-label={`Open ${product.title}`}
          onClick={onSelect}
        >
          <ArrowUpRight size={17} />
        </button>
      </td>
    </tr>
  );
}
