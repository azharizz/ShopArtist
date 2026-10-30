import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Box,
  Boxes,
  Check,
  CheckCheck,
  ChevronDown,
  CircleHelp,
  Clock3,
  Disc3,
  FlaskConical,
  History,
  LayoutDashboard,
  Leaf,
  LoaderCircle,
  LockKeyhole,
  Move3D,
  Package,
  RotateCcw,
  Search,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Store,
  Upload,
  WandSparkles,
  X,
} from "lucide-react";
import {
  themes,
  type StoreState,
  type Placement,
  type ThemeId,
} from "../shared/types";
import { api, type StateResponse, type PlanResponse } from "./api";
import { Cover, CatalogRow, Shelves } from "./Catalog";
import { RoomEditor } from "./RoomEditor";
import { validateRoom, type RoomDesign } from "../shared/room";
import { AgentChat } from "./AgentChat";
import { ResearchPanel } from "./ResearchPanel";
import { StudyResults } from "./TasteStudio";
import type { DesignStudy } from "../shared/research";

const sections = [
  { name: "The studio", icon: LayoutDashboard },
  { name: "Inventory", icon: Boxes },
  { name: "Cultural library", icon: Sparkles },
  { name: "Version history", icon: History },
  { name: "Store settings", icon: Settings2 },
];

function Modal({
  title,
  children,
  onClose,
  wide = false,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  wide?: boolean;
}) {
  const mountDialog = useCallback((dialog: HTMLDialogElement | null) => {
    if (!dialog) return;
    dialog.showModal();
    return () => dialog.close();
  }, []);
  return (
    <dialog
      ref={mountDialog}
      className={`modal ${wide ? "modal-wide" : ""}`}
      onCancel={onClose}
      aria-labelledby="dialog-title"
    >
      <header>
        <h2 id="dialog-title">{title}</h2>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={19} />
        </button>
      </header>
      {children}
    </dialog>
  );
}

export default function App({
  initialState,
  initialDetails,
  onHome,
}: {
  initialState: StoreState;
  initialDetails: PlanResponse;
  onHome: () => void;
}) {
  const [state, setState] = useState<StoreState>(initialState);
  const [section, setSection] = useState("The studio");
  const [planId, setActivePlanId] = useState(initialDetails.plan.id);
  const [details, setDetails] = useState<PlanResponse | null>(initialDetails);
  const [selected, setSelected] = useState<string | null>(null);
  const [theme, setTheme] = useState<ThemeId>(
    initialState.brief?.theme ?? initialDetails.plan.theme,
  );
  const [view, setView] = useState<"3d" | "shelves" | "compare">("3d");
  const [maxMoves, setMaxMoves] = useState(60);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All products");
  const [modal, setModal] = useState<
    "approve" | "export" | "reset" | "help" | "trace" | null
  >(null);
  const [restoreId, setRestoreId] = useState<string | null>(null);
  const [roomDraft, setRoomDraft] = useState<RoomDesign | null>(
    initialDetails.plan.room,
  );
  const [pendingStudy, setPendingStudy] = useState<DesignStudy | null>(null);
  const visibleStudy = pendingStudy ?? state.tasteStudy;
  const fileInput = useRef<HTMLInputElement>(null);
  const selectProduct = useCallback((sku: string) => setSelected(sku), []);
  async function setPlanId(id: string) {
    setBusy(true);
    setError("");
    try {
      const next = await api<PlanResponse>(`/plans/${id}`);
      setActivePlanId(id);
      setDetails(next);
      setRoomDraft(next.plan.room);
      setPendingStudy(null);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setBusy(false);
    }
  }
  const savedRoom = state?.plans.find((p) => p.id === planId)?.room;
  const roomDirty = !!pendingStudy || (
    !!savedRoom && !!roomDraft && JSON.stringify(savedRoom) !== JSON.stringify(roomDraft)
  );
  const guardUnsaved = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || !roomDirty) return;
      const warn = (event: BeforeUnloadEvent) => {
        event.preventDefault();
        event.returnValue = "";
      };
      window.addEventListener("beforeunload", warn);
      return () => window.removeEventListener("beforeunload", warn);
    },
    [roomDirty],
  );
  async function mutate(path: string, body: unknown, message?: string) {
    if (roomDirty && !(body && typeof body === "object" && "room" in body)) {
      setError(
        "Save or discard your interior preview before changing the saved shop.",
      );
      return null;
    }
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const result = await api<StateResponse>(path, body);
      const nextId =
        result.proposalIds?.[0] ??
        result.planId ??
        (result.state.plans.some((p) => p.id === planId)
          ? planId
          : result.state.currentId);
      setState(result.state);
      setActivePlanId(nextId);
      setRoomDraft(result.state.plans.find((p) => p.id === nextId)!.room);
      setDetails(null);
      setDetails(await api<PlanResponse>(`/plans/${nextId}`));
      if (message) setNotice(message);
      return result;
    } catch (e) {
      setError((e as Error).message);
      return null;
    } finally {
      setBusy(false);
    }
  }
  const current = state.plans.find((p) => p.id === state.currentId)!;
  const plan = state.plans.find((p) => p.id === planId) ?? current;
  const product = state.products.find((p) => p.id === selected);
  const placement = plan.placements.find((p) => p.sku === selected);
  const evidence = plan.evidence.find((e) => e.sku === selected);
  const mapped = state.products.filter(
    (p) => p.mapping.status === "approved",
  ).length;
  const stale =
    plan.status === "draft" &&
    (plan.parentId !== state.currentId || plan.revision !== state.revision);
  // Interior edits are saved to the draft a moment after the last change, so nothing depends on pressing Save.
  // An approved layout is never touched: the first autosave forks a draft, later ones update it in place.
  const savedKey = JSON.stringify(plan.room);
  useEffect(() => {
    if (!roomDraft || pendingStudy || busy || stale || JSON.stringify(roomDraft) === savedKey) return;
    if (plan.status === "approved" && plan.id !== state.currentId) return;
    if (validateRoom(roomDraft, state.shelves).length) return;
    const timer = window.setTimeout(async () => {
      try {
        const result = await api<StateResponse>(`/plans/${plan.id}/edit`, {
          placements: plan.placements,
          lockedSkus: plan.locks.map((p) => p.sku),
          room: roomDraft,
        });
        const nextId = result.planId ?? plan.id;
        setState(result.state);
        setActivePlanId(nextId);
        setDetails(await api<PlanResponse>(`/plans/${nextId}`));
        setNotice("Interior saved automatically to your draft. Approve when you are ready.");
      } catch {
        // Keep the unsaved draft and its warning; the manual Save button reports the reason.
      }
    }, 1500);
    return () => window.clearTimeout(timer);
  }, [roomDraft, savedKey, pendingStudy, busy, stale, plan.id, plan.status]);
  const proposals = state.plans.filter(
    (p) => p.runId === plan.runId && p.variant !== "initial",
  );
  const baseline = state.plans.find(
    (p) => p.runId === plan.runId && p.variant === "baseline",
  );
  const filtered = state.products.filter(
    (p) =>
      (category === "All products" || p.category === category) &&
      `${p.id} ${p.title} ${p.creator}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  const provider = state.provider;
  const usedWidth = plan.placements.reduce(
    (n, p) =>
      n + (state.products.find((i) => i.id === p.sku)?.width ?? 0) * p.facings,
    0,
  );
  const capacity = state.shelves.reduce((n, s) => n + s.width, 0);
  async function edit(
    placements: Placement[],
    lockedSkus = plan.locks.map((p) => p.sku),
  ) {
    await mutate(
      `/plans/${plan.id}/edit`,
      { placements, lockedSkus },
      "Draft updated. Your approved store is unchanged.",
    );
  }
  async function drop(sku: string, shelf: string) {
    if (busy || stale) return;
    const existing = plan.placements.find((p) => p.sku === sku);
    let position = 0;
    while (
      plan.placements.some(
        (p) => p.shelf === shelf && p.position === position && p.sku !== sku,
      )
    )
      position++;
    await edit([
      ...plan.placements.filter((p) => p.sku !== sku),
      { sku, shelf, position, facings: existing?.facings ?? 1 },
    ]);
    setSelected(sku);
  }
  async function generatePlans() {
    const result = await mutate(
      "/plans/generate",
      { theme, maxMoves, sourcePlanId: stale ? current.id : plan.id },
      provider === "fixture"
        ? "Three feasible options, one shared inventory. Explore the differences."
        : "Cultural evidence unavailable. A feasible category baseline is ready.",
    );
    if (result) {
      setSelected(null);
      setSection("The studio");
    }
  }
  async function upload(file: File | undefined) {
    if (!file) return;
    if (!/\.csv$/i.test(file.name) || file.size > 900000) {
      setError("Choose a CSV file smaller than 900 KB.");
      return;
    }
    await mutate(
      "/inventory/import",
      { filename: file.name, csv: await file.text() },
      "Inventory imported. Existing SKUs updated; new SKUs remain unmapped. Regenerate any drafts.",
    );
    if (fileInput.current) fileInput.current.value = "";
  }
  const inspector = (
    <aside className="inspector">
      {product ? (
        <>
          <div className="panel-heading">
            <span className="eyebrow">THE DETAILS</span>
            <button
              className="icon-button"
              onClick={() => setSelected(null)}
              aria-label="Close product details"
            >
              <X size={17} />
            </button>
          </div>
          <div className="product-preview">
            <Cover product={product} />
          </div>
          <span className="eyebrow">
            {product.category} / {product.id}
          </span>
          <h2>{product.title}</h2>
          <p className="muted small">{product.creator}</p>
          <div className="product-facts">
            <span>
              <strong>{product.stock}</strong>in stock
            </span>
            <span>
              <strong>{product.width} cm</strong>per facing
            </span>
            <span>
              <strong>{product.priority.toFixed(1)}</strong>priority
            </span>
          </div>
          <div className="evidence-box">
            <div className="row">
              <Sparkles size={15} />
              <strong>
                {evidence ? "A cultural connection" : "Room for your intuition"}
              </strong>
            </div>
            <p>
              {evidence
                ? evidence.interpretation
                : product.mapping.status === "approved"
                  ? "Reviewed synthetic mapping. This layout makes no cultural claim for this placement."
                  : "No approved cultural mapping. This product remains usable, with no invented affinity score."}
            </p>
            {evidence && (
              <>
                <div className="affinity-bar">
                  <span style={{ width: `${evidence.affinity * 100}%` }} />
                </div>
                <small>
                  Fixture affinity index {evidence.affinity.toFixed(2)} · not
                  probability
                </small>
                <details>
                  <summary>View provenance</summary>
                  <dl>
                    <dt>Provider</dt>
                    <dd>Synthetic fixture · not live Qloo</dd>
                    <dt>Reviewed entity</dt>
                    <dd>{evidence.entityId}</dd>
                    <dt>Public anchors</dt>
                    <dd>{evidence.sourceEntities.join(", ")}</dd>
                    <dt>Query / run</dt>
                    <dd>{evidence.requestId}</dd>
                    <dt>Our interpretation</dt>
                    <dd>
                      Greedy packing balances authored affinity, owner priority,
                      and available shelf capacity.
                    </dd>
                  </dl>
                </details>
              </>
            )}
          </div>
          <form
            key={`${plan.id}-${selected}-${placement?.shelf}-${placement?.position}-${placement?.facings}`}
            className="placement-form"
            onSubmit={(event) => {
              event.preventDefault();
              const form = new FormData(event.currentTarget);
              void edit([
                ...plan.placements.filter((p) => p.sku !== product.id),
                {
                  sku: product.id,
                  shelf: String(form.get("shelf")),
                  position: Number(form.get("position")) - 1,
                  facings: Number(form.get("facings")),
                },
              ]);
            }}
          >
            <span className="eyebrow">PLACEMENT EDITOR</span>
            <label>
              Shelf
              <select name="shelf" defaultValue={placement?.shelf ?? "A"}>
                {state.shelves.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.id} · {s.name}
                  </option>
                ))}
              </select>
            </label>
            <div className="form-grid">
              <label>
                Position
                <input
                  name="position"
                  type="number"
                  min="1"
                  max="500"
                  defaultValue={(placement?.position ?? 0) + 1}
                  required
                />
              </label>
              <label>
                Facings
                <input
                  name="facings"
                  type="number"
                  min="1"
                  max={Math.max(product.stock, 1)}
                  defaultValue={placement?.facings ?? 1}
                  required
                />
              </label>
            </div>
            <button
              className="button dark full"
              disabled={
                busy ||
                stale ||
                product.stock === 0 ||
                plan.locks.some((p) => p.sku === product.id)
              }
            >
              <Move3D size={15} />
              {placement ? "Update placement" : "Add to display"}
            </button>
          </form>
          {placement && (
            <div className="product-actions">
              <button
                className="text-button"
                disabled={busy || stale}
                onClick={() =>
                  edit(
                    plan.placements,
                    plan.locks.some((p) => p.sku === product.id)
                      ? plan.locks
                          .filter((p) => p.sku !== product.id)
                          .map((p) => p.sku)
                      : [...plan.locks.map((p) => p.sku), product.id],
                  )
                }
              >
                <LockKeyhole size={14} />
                {plan.locks.some((p) => p.sku === product.id)
                  ? "Unlock location"
                  : "Lock location"}
              </button>
              <button
                className="text-button"
                disabled={
                  busy || stale || plan.locks.some((p) => p.sku === product.id)
                }
                onClick={() =>
                  edit(plan.placements.filter((p) => p.sku !== product.id))
                }
              >
                Return to stock
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="panel-heading">
            <span className="eyebrow">THE CURATOR’S NOTE</span>
            <Sparkles size={17} />
          </div>
          <div className="curator-symbol" aria-hidden="true" />
          <h2>
            Good things
            <br />
            belong together.
          </h2>
          <p className="muted">
            Fashion finds its setting. Art starts a conversation. Coffee and
            books give people a reason to stay.
          </p>
          <div className="note-divider" />
          <span className="eyebrow">THIS ARRANGEMENT</span>
          <h3>{plan.name}</h3>
          <p className="small muted">
            {plan.variant === "fixture"
              ? "An exploration of aggregate cultural relationships, using openly synthetic fixture data."
              : plan.variant === "baseline"
                ? "Category-first merchandising. Same inventory, same physical constraints. No cultural score."
                : "Your independent shop, ready for a new point of view."}
          </p>
          <div className="check-list">
            <span>
              <ShieldCheck size={16} /> Stock & dimensions checked
            </span>
            <span>
              <LockKeyhole size={16} /> {plan.locks.length} product locations
              locked
            </span>
            <span>
              <Box size={16} /> {state.products.length - plan.placements.length}{" "}
              products in stockroom
            </span>
          </div>
          <button
            className="button subtle full"
            onClick={() => {
              setView("shelves");
              setSelected(plan.placements[0]?.sku ?? state.products[0]?.id);
            }}
          >
            Explore a product <ArrowUpRight size={15} />
          </button>
          <div className="tip">
            <span className="tip-icon">
              <Leaf size={17} />
            </span>
            <p>
              <strong>Curated, not predicted.</strong>
              <br />
              Taste is a starting point. Your judgment makes it a shop.
            </p>
          </div>
        </>
      )}
    </aside>
  );

  return (
    <div className="app-shell pop-editor" ref={guardUnsaved}>
      <main className="main">
        <header className="topbar">
          <button
            className="brand"
            disabled={busy}
            onClick={() => {
              if (roomDirty) {
                setError(
                  "Save or discard your interior before returning to designs.",
                );
                return;
              }
              onHome();
            }}
          >
            <img className="brand-mark" src="/shopartist-mark.svg" alt="" width="30" height="30" />
            SHOP<span>ARTIST</span>
            <small>← My designs</small>
          </button>
          <div className="editor-project">
            <strong>{state.store.name}</strong>
            <small>
              {state.brief?.location || "Your independent shop"} · {plan.status}
            </small>
          </div>
          <div className="topbar-right">
            <span className="provider-pill">Qloo taste studio</span>
            <details className="tools-menu">
              <summary>
                Design tools <ChevronDown size={14} />
              </summary>
              <div
                onClick={(event) => {
                  if ((event.target as HTMLElement).closest("button"))
                    event.currentTarget.closest("details")!.open = false;
                }}
              >
                {sections.slice(1).map(({ name, icon: Icon }) => (
                  <button key={name} onClick={() => setSection(name)}>
                    <Icon size={16} />
                    {name}
                  </button>
                ))}
                <button onClick={() => setSection("Research")}>
                  <Sparkles size={16} />
                  Taste research
                </button>
                <button onClick={() => setModal("help")}>
                  <CircleHelp size={16} />
                  Quick tour
                </button>
              </div>
            </details>
          </div>
        </header>
        <div className="page-content">
          {error && (
            <div className="alert error" role="alert">
              <div>
                <strong>Let’s fix that.</strong>
                <p>{error}</p>
              </div>
              <button
                className="icon-button"
                onClick={() => setError("")}
                aria-label="Dismiss error"
              >
                <X size={17} />
              </button>
            </div>
          )}
          {notice && (
            <div className="alert success" role="status">
              <span>
                <Check size={16} />
                {notice}
              </span>
              <button
                className="icon-button"
                onClick={() => setNotice("")}
                aria-label="Dismiss notification"
              >
                <X size={16} />
              </button>
            </div>
          )}
          {
            <>
              <div className="page-heading">
                <div>
                  <div className="eyebrow green">
                    <span /> YOUR SPACE. YOUR RULES.
                  </div>
                  <h1>
                    Make some space for WOW
                    <span className="lime-period">.</span>
                  </h1>
                  <p>
                    Sculpt the shop. Mix the culture. Make it unmistakably
                    yours.
                  </p>
                </div>
                <button
                  className="button primary generate-button"
                  onClick={() => setSection("Research")}
                  disabled={busy}
                >
                  {busy ? (
                    <LoaderCircle size={17} className="spin" />
                  ) : (
                    <WandSparkles size={17} />
                  )}{" "}
                  Generate with Qloo <ArrowUpRight size={17} />
                </button>
              </div>
              {visibleStudy && <section className="editor-taste-overview" aria-label="Saved Qloo taste research">
                <div className="editor-taste-header"><div><h2>Your taste research</h2><p>Selected direction: <strong>{visibleStudy.directions.find(d => d.id === visibleStudy.selectedId)?.name ?? "Not selected"}</strong></p></div><button className="button subtle small" onClick={() => setSection("Research")}>Explore directions & map <ArrowUpRight size={15} /></button></div>
                <StudyResults study={visibleStudy} compact />
              </section>}
              <details className="demo-shelf-settings"><summary>Optional shelf planning · demo presets</summary>
              <div className="theme-strip">
                <div className="theme-intro">
                  <Sparkles size={18} />
                  <div>
                    <strong>Shelf planning · demo</strong>
                    <span>These presets apply only to the demo merchandise planner.</span>
                  </div>
                </div>
                <div className="theme-options">
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      className={`theme-chip ${theme === t.id ? "selected" : ""}`}
                      onClick={() => setTheme(t.id)}
                      title={t.subtitle}
                    >
                      <i style={{ background: t.color }} />
                      {t.name}
                      {theme === t.id && <Check size={12} />}
                    </button>
                  ))}
                </div>
              </div>
              </details>
              <div className="studio-layout">
                <div className="studio-main">
                  <section className="studio-card">
                    <header className="studio-toolbar">
                      <div className="row">
                        <span className={`status-dot ${plan.status}`} />
                        <strong>
                          {plan.status === "draft"
                            ? "Proposed arrangement"
                            : plan.id === state.currentId
                              ? "Current arrangement"
                              : "Previous arrangement"}
                        </strong>
                        <span className="version-chip">
                          {plan.status === "draft"
                            ? "DRAFT"
                            : `V${state.plans.filter((p) => p.status === "approved").findIndex((p) => p.id === plan.id) + 1}`}
                        </span>
                      </div>
                      <div
                        className="view-switch"
                        role="group"
                        aria-label="Layout view"
                      >
                        <button
                          className={view === "3d" ? "active" : ""}
                          onClick={() => setView("3d")}
                        >
                          <Box size={14} />
                          3D shop
                        </button>
                        <button
                          className={view === "shelves" ? "active" : ""}
                          onClick={() => setView("shelves")}
                        >
                          Shelves
                        </button>
                        <button
                          className={view === "compare" ? "active" : ""}
                          onClick={() => setView("compare")}
                        >
                          Compare
                        </button>
                      </div>
                    </header>
                    {stale && (
                      <div className="stale-warning">
                        Inventory, mappings, settings, or the approved layout
                        changed. Generate again before editing or approval.
                      </div>
                    )}
                    {view === "3d" ? (
                      <RoomEditor
                        state={state}
                        plan={plan}
                        room={roomDraft ?? plan.room}
                        pendingResearch={!!pendingStudy}
                        onChange={(next) => { setRoomDraft(next); if (JSON.stringify(next) === JSON.stringify(plan.room)) setPendingStudy(null); }}
                        onSave={() => {
                          void mutate(
                            `/plans/${plan.id}/edit`,
                            {
                              placements: plan.placements,
                              lockedSkus: plan.locks.map((p) => p.sku),
                              room: roomDraft ?? plan.room,
                              ...(pendingStudy ? { studyId: pendingStudy.id, directionId: pendingStudy.selectedId } : {}),
                            },
                            "Whole-shop interior saved to draft. Approve when you are ready.",
                          ).then(result => { if (result) setPendingStudy(null); });
                        }}
                        busy={busy}
                        disabled={
                          stale ||
                          (plan.status === "approved" &&
                            plan.id !== state.currentId)
                        }
                        selected={selected}
                        onSelect={selectProduct}
                      />
                    ) : view === "shelves" ? (
                      <div className="shelves-view">
                        <div className="view-hint">
                          <Move3D size={14} /> Drag a product between shelves,
                          or click to edit with your keyboard.
                        </div>
                        <Shelves
                          state={state}
                          plan={plan}
                          selected={selected}
                          onSelect={selectProduct}
                          onDrop={drop}
                        />
                        <details className="stockroom">
                          <summary>
                            <Package size={16} /> Stockroom ·{" "}
                            {state.products.length - plan.placements.length}{" "}
                            undisplayed products
                          </summary>
                          <div className="stockroom-items">
                            {state.products
                              .filter(
                                (p) =>
                                  !plan.placements.some((i) => i.sku === p.id),
                              )
                              .map((p) => (
                                <button
                                  key={p.id}
                                  draggable={p.stock > 0}
                                  onDragStart={(event) =>
                                    event.dataTransfer.setData(
                                      "text/plain",
                                      p.id,
                                    )
                                  }
                                  onClick={() => setSelected(p.id)}
                                >
                                  <Cover product={p} small />
                                  <span>
                                    {p.title}
                                    <small>{p.stock} available</small>
                                  </span>
                                </button>
                              ))}
                          </div>
                        </details>
                      </div>
                    ) : (
                      <div className="compare-view">
                        <p className="view-hint">
                          Same inventory, stock, capacity, locks and movement
                          budget for each generated option.
                        </p>
                        {!!details?.roomMoves.length && (
                          <details className="interior-work-order">
                            <summary>
                              Interior changes from the parent version ·{" "}
                              {details.roomMoves.length}
                            </summary>
                            <ul>
                              {details.roomMoves.map((move, index) => (
                                <li key={index}>
                                  <strong>{move.label}</strong> —{" "}
                                  {move.instruction}
                                </li>
                              ))}
                            </ul>
                          </details>
                        )}
                        <div className="comparison-grid">
                          <section>
                            <div className="compare-heading">
                              <span className="eyebrow">
                                {plan.variant === "fixture"
                                  ? "TASTE-INFORMED · SYNTHETIC"
                                  : "SELECTED LAYOUT"}
                              </span>
                              <h3>{plan.name}</h3>
                            </div>
                            <Shelves
                              state={state}
                              plan={plan}
                              compact
                              onSelect={selectProduct}
                            />
                          </section>
                          <section>
                            <div className="compare-heading">
                              <span className="eyebrow">
                                {baseline && baseline.id !== plan.id
                                  ? "CATEGORY-ONLY BASELINE"
                                  : "APPROVED STORE"}
                              </span>
                              <h3>
                                {baseline && baseline.id !== plan.id
                                  ? baseline.name
                                  : current.name}
                              </h3>
                            </div>
                            <Shelves
                              state={state}
                              plan={
                                baseline && baseline.id !== plan.id
                                  ? baseline
                                  : current
                              }
                              compact
                              onSelect={selectProduct}
                            />
                          </section>
                        </div>
                        {!baseline && (
                          <button
                            className="button subtle"
                            disabled={busy}
                            onClick={generatePlans}
                          >
                            Generate a fair category comparison{" "}
                            <ArrowRight size={15} />
                          </button>
                        )}
                      </div>
                    )}
                    <footer className="studio-stats">
                      <div>
                        <span className="stat-icon">
                          <Package size={17} />
                        </span>
                        <strong>
                          {plan.placements.length}
                          <small>on display</small>
                        </strong>
                      </div>
                      <div>
                        <span className="stat-icon">
                          <SlidersHorizontal size={17} />
                        </span>
                        <strong>
                          {Math.round((usedWidth / capacity) * 100)}%
                          <small>shelf space used</small>
                        </strong>
                      </div>
                      <div>
                        <span className="stat-icon">
                          <ShieldCheck size={17} />
                        </span>
                        <strong>
                          {details?.validation.valid
                            ? "All clear"
                            : details
                              ? "Needs attention"
                              : "Checking…"}
                          <small>inventory & room bounds</small>
                        </strong>
                      </div>
                      <button
                        className="text-button"
                        onClick={() => setModal("trace")}
                      >
                        Planning notes <ArrowUpRight size={14} />
                      </button>
                    </footer>
                  </section>
                  <div className="options-header">
                    <div>
                      <span className="eyebrow">A FEW WAYS TO SEE IT</span>
                      <h2>
                        {proposals.length
                          ? "Find your kind of arrangement."
                          : "Start with a little curiosity."}
                      </h2>
                    </div>
                    <label className="move-budget">
                      Move budget{" "}
                      <input
                        aria-label="Maximum changed SKUs"
                        type="number"
                        min="0"
                        max={500}
                        value={maxMoves}
                        onChange={(event) =>
                          setMaxMoves(
                            Math.max(
                              0,
                              Math.min(500, Number(event.target.value)),
                            ),
                          )
                        }
                      />
                      <span>SKUs</span>
                    </label>
                  </div>
                  {proposals.length ? (
                    <div className="proposal-grid">
                      {proposals.map((p, i) => (
                        <button
                          className={`proposal-card ${p.id === plan.id ? "active" : ""}`}
                          key={p.id}
                          onClick={() => {
                            if (roomDirty) {
                              setError(
                                "Save or discard the interior preview before switching versions.",
                              );
                              return;
                            }
                            setPlanId(p.id);
                            setSelected(null);
                          }}
                        >
                          <div className="proposal-top">
                            <span>
                              {p.variant === "baseline" ? (
                                <Boxes size={16} />
                              ) : (
                                <Sparkles size={16} />
                              )}{" "}
                              {p.variant === "baseline"
                                ? "THE BASELINE"
                                : i === 0
                                  ? "YOUR SELECTED TASTE"
                                  : "ANOTHER PERSPECTIVE"}
                            </span>
                            <span className="radio-dot">
                              {p.id === plan.id && <Check size={10} />}
                            </span>
                          </div>
                          <h3>{p.name}</h3>
                          <div className="mini-products">
                            {p.placements.slice(0, 8).map((placement) => (
                              <span
                                key={placement.sku}
                                style={{
                                  background: state.products.find(
                                    (s) => s.id === placement.sku,
                                  )!.color,
                                }}
                              />
                            ))}
                          </div>
                          <p>
                            {p.placements.length} displayed <span>·</span>{" "}
                            {p.variant === "fixture"
                              ? "Synthetic cultural lens"
                              : "No shelf taste score"}
                          </p>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="first-run-card">
                      <div className="first-run-art">
                        <Disc3 size={38} />
                        <BookOpen size={30} />
                        <Leaf size={27} />
                      </div>
                      <div>
                        <h3>
                          A jazz record. A city story. Something unexpected.
                        </h3>
                        <p>
                          Choose a mood above. We’ll make two taste-led options
                          and a category-first baseline.
                        </p>
                      </div>
                      <button
                        className="icon-button"
                        aria-label="Generate first layouts"
                        disabled={busy}
                        onClick={generatePlans}
                      >
                        <ArrowRight size={21} />
                      </button>
                    </div>
                  )}
                  <div className="approval-bar">
                    <div>
                      <span className={`approval-icon ${plan.status}`}>
                        <CheckCheck size={18} />
                      </span>
                      <p>
                        <strong>
                          {plan.status === "draft"
                            ? "Your call, always."
                            : "This is an approved digital layout."}
                        </strong>
                        <small>
                          {plan.status === "draft"
                            ? "Nothing changes in the shop until you approve."
                            : "Download the move list or keep exploring a new arrangement."}
                        </small>
                      </p>
                    </div>
                    {plan.status === "draft" ? (
                      <button
                        className="button dark"
                        disabled={busy || stale || !details?.validation.valid}
                        onClick={() => setModal("approve")}
                      >
                        Review & approve <ArrowRight size={16} />
                      </button>
                    ) : (
                      <button
                        className="button dark"
                        onClick={() => setModal("export")}
                        disabled={!details}
                      >
                        <ArrowDownToLine size={16} /> Staff work order
                      </button>
                    )}
                  </div>
                </div>
                <div className="editor-companion">
                  <AgentChat
                    room={roomDraft ?? plan.room}
                    disabled={
                      busy ||
                      stale ||
                      (plan.status === "approved" &&
                        plan.id !== state.currentId)
                    }
                    onPreview={setRoomDraft}
                  />
                  {product && inspector}
                </div>
              </div>
              <div className="honesty-note">
                <FlaskConical size={13} /> Taste research uses live Qloo data. Shelf merchandising scores
                remain demo fixtures and are not sales predictions.
              </div>
            </>
          }

          {section !== "The studio" && (
            <Modal
              title={section}
              wide
              onClose={() => setSection("The studio")}
            >
              <div className="modal-body">
                {section === "Research" && (
                  <ResearchPanel
                    brief={visibleStudy?.brief ?? state.brief}
                    room={roomDraft ?? plan.room}
                    savedStudy={visibleStudy}
                    onApply={async (study, directionId) => {
                      if (stale || (plan.status === "approved" && plan.id !== state.currentId))
                        throw new Error("Select a current or editable design before applying a preview.");
                      const result = await api<{ room: RoomDesign }>("/ai/apply", { studyId: study.id, directionId });
                      setPendingStudy({ ...study, selectedId: directionId });
                      setRoomDraft(result.room);
                      setView("3d");
                      setNotice("AI design preview ready. Review and save it when you are happy.");
                      setSection("The studio");
                    }}
                  />
                )}
                {section === "Inventory" && (
                  <>
                    <div className="page-heading">
                      <div>
                        <span className="eyebrow green">
                          THE GOOD THINGS YOU HAVE
                        </span>
                        <h1>A shelf full of possibilities.</h1>
                        <p>
                          Your catalog, not a shopping list. Work with what’s
                          already in store.
                        </p>
                      </div>
                      <button
                        className="button primary"
                        disabled={busy}
                        onClick={() => fileInput.current?.click()}
                      >
                        <Upload size={16} /> Import CSV
                      </button>
                    </div>
                    <input
                      hidden
                      ref={fileInput}
                      type="file"
                      accept=".csv,text/csv"
                      onChange={(event) => void upload(event.target.files?.[0])}
                    />
                    <div className="inventory-metrics">
                      <div>
                        <Package />
                        <strong>
                          {state.products.length}
                          <span>unique products</span>
                        </strong>
                      </div>
                      <div>
                        <Boxes />
                        <strong>
                          {state.products.reduce((n, p) => n + p.stock, 0)}
                          <span>units available</span>
                        </strong>
                      </div>
                      <div>
                        <Sparkles />
                        <strong>
                          {Math.round((mapped / state.products.length) * 100)}%
                          <span>reviewed fixture coverage</span>
                        </strong>
                      </div>
                      <div>
                        <Clock3 />
                        <strong>
                          {state.products.filter((p) => p.stock === 0).length}
                          <span>out of stock</span>
                        </strong>
                      </div>
                    </div>
                    <div className="inventory-layout">
                      <section className="table-card">
                        <div className="table-toolbar">
                          <div className="search-field">
                            <Search size={17} />
                            <input
                              aria-label="Search inventory"
                              placeholder="Find a record, a book, a good thing…"
                              value={search}
                              onChange={(event) =>
                                setSearch(event.target.value)
                              }
                            />
                          </div>
                          <select
                            aria-label="Filter category"
                            value={category}
                            onChange={(event) =>
                              setCategory(event.target.value)
                            }
                          >
                            {[
                              "All products",
                              "Records",
                              "Books",
                              "Objects",
                              "Stationery",
                            ].map((c) => (
                              <option key={c}>{c}</option>
                            ))}
                          </select>
                        </div>
                        <div className="table-scroll">
                          <table>
                            <thead>
                              <tr>
                                <th>Product / SKU</th>
                                <th>Category</th>
                                <th>Dimensions</th>
                                <th>Stock</th>
                                <th>Cultural mapping</th>
                                <th />
                              </tr>
                            </thead>
                            <tbody>
                              {filtered.map((p) => (
                                <CatalogRow
                                  key={p.id}
                                  product={p}
                                  onSelect={() => setSelected(p.id)}
                                />
                              ))}
                            </tbody>
                          </table>
                          {!filtered.length && (
                            <div className="empty-state">
                              <Search />
                              <h3>No products found.</h3>
                              <p>Try another title, SKU or category.</p>
                            </div>
                          )}
                        </div>
                        <footer className="table-footer">
                          {filtered.length} of {state.products.length} products
                          · Unmapped products are always usable.
                        </footer>
                      </section>
                      {product && inspector}
                    </div>
                    <details className="import-guide">
                      <summary>
                        CSV format & sample download <ChevronDown size={15} />
                      </summary>
                      <p>
                        Import upserts by SKU, without deleting other inventory.
                        Invalid rows reject the whole file. Updates that break
                        your approved layout are blocked. Maximum 500 SKUs and
                        900 KB.
                      </p>
                      <code>
                        sku,title,category,width_cm,height_cm,depth_cm,stock,creator,priority,zones
                      </code>
                      <p>
                        Categories: Records, Books, Objects, Stationery.
                        Optional priority: 0–1. Optional zones: wall|island.
                        Cultural mappings are never silently created from
                        imported text.
                      </p>
                      <a
                        className="button subtle"
                        href="/sample-inventory.csv"
                        download
                      >
                        <ArrowDownToLine size={15} /> Download sample CSV
                      </a>
                    </details>
                  </>
                )}

                {section === "Cultural library" && (
                  <>
                    <div className="page-heading">
                      <div>
                        <span className="eyebrow green">
                          CONNECTIONS, WITH CONTEXT
                        </span>
                        <h1>A language of shared taste.</h1>
                        <p>
                          Review the anchors. Know where every connection comes
                          from.
                        </p>
                      </div>
                      <span className="large-pill">
                        <Sparkles size={17} />
                        {mapped} / {state.products.length} reviewed
                      </span>
                    </div>
                    <div className="library-intro">
                      <div>
                        <FlaskConical size={27} />
                        <h2>Honest about the dummy.</h2>
                        <p>
                          These are authored cultural fixtures using original,
                          fictional catalog titles. Every <code>demo:</code>{" "}
                          identifier is synthetic. Approval here reviews the
                          demo association—not a verified Qloo entity. New
                          imported products remain unmapped.
                        </p>
                      </div>
                      <div
                        className="coverage-circle"
                        style={
                          {
                            "--coverage": `${(mapped / state.products.length) * 100}%`,
                          } as React.CSSProperties
                        }
                      >
                        <span>
                          <strong>
                            {Math.round((mapped / state.products.length) * 100)}
                            %
                          </strong>
                          <small>fixture coverage</small>
                        </span>
                      </div>
                    </div>
                    <div className="library-themes">
                      {themes.map((t) => (
                        <button
                          key={t.id}
                          className={`library-theme ${theme === t.id ? "active" : ""}`}
                          onClick={() => {
                            setTheme(t.id);
                            setSection("The studio");
                          }}
                        >
                          <span style={{ background: t.color }}>
                            <Disc3 size={25} />
                          </span>
                          <h3>{t.name}</h3>
                          <p>{t.subtitle}</p>
                          <small>{t.anchors.join(" + ")}</small>
                          <ArrowUpRight size={17} />
                        </button>
                      ))}
                    </div>
                    <div className="section-title">
                      <h2>Review your catalog anchors</h2>
                      <span>
                        {
                          state.products.filter(
                            (p) => p.mapping.status === "pending",
                          ).length
                        }{" "}
                        waiting for a human
                      </span>
                    </div>
                    <div className="mapping-list">
                      {state.products
                        .filter((p) => p.mapping.candidates.length)
                        .map((p) => (
                          <MappingCard
                            key={`${p.id}-${p.mapping.status}-${p.mapping.entityId}`}
                            product={p}
                            busy={busy}
                            onReview={(entityId) =>
                              mutate(
                                "/cultural-mappings/resolve",
                                { sku: p.id, entityId },
                                "Mapping reviewed. Existing proposals must be regenerated.",
                              )
                            }
                          />
                        ))}
                    </div>
                    <div className="neutral-note">
                      <Leaf size={20} />
                      <div>
                        <strong>
                          {
                            state.products.filter(
                              (p) => !p.mapping.candidates.length,
                            ).length
                          }{" "}
                          products without cultural candidates
                        </strong>
                        <p>
                          Objects, stationery and unmatched imports stay visible
                          in inventory and eligible for traditional placement.
                          No guessed entities. No made-up scores.
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {section === "Version history" && (
                  <>
                    <div className="page-heading">
                      <div>
                        <span className="eyebrow green">
                          A SHOP IS ALWAYS EVOLVING
                        </span>
                        <h1>Every arrangement has a story.</h1>
                        <p>
                          Approved versions are immutable. Restore one as a new,
                          validated version.
                        </p>
                      </div>
                      <span className="large-pill">
                        <History size={16} />
                        {
                          state.plans.filter((p) => p.status === "approved")
                            .length
                        }{" "}
                        approved versions
                      </span>
                    </div>
                    <div className="history-list">
                      {state.plans
                        .slice()
                        .reverse()
                        .map((p) => (
                          <article className="history-card" key={p.id}>
                            <span className="history-version">
                              {p.status === "draft"
                                ? "Draft"
                                : `V${state.plans.filter((item) => item.status === "approved").findIndex((item) => item.id === p.id) + 1}`}
                            </span>
                            <div>
                              <div className="row">
                                <h2>{p.name}</h2>
                                {p.id === state.currentId && (
                                  <span className="mapping-status approved">
                                    Current
                                  </span>
                                )}
                              </div>
                              <p>
                                {new Date(
                                  p.approvedAt ?? p.createdAt,
                                ).toLocaleString()}{" "}
                                · {p.actor ?? "Saved draft"} ·{" "}
                                {p.placements.length} products
                              </p>
                              <small>
                                Parent: {p.parentId ?? "Opening layout"} ·{" "}
                                {p.id}
                              </small>
                            </div>
                            <div className="history-actions">
                              <button
                                className="button subtle"
                                onClick={() => {
                                  if (roomDirty) {
                                    setError(
                                      "Save or discard the interior preview before switching versions.",
                                    );
                                    return;
                                  }
                                  setPlanId(p.id);
                                  setSelected(null);
                                  setSection("The studio");
                                }}
                              >
                                View layout <ArrowUpRight size={14} />
                              </button>
                              {p.status === "approved" &&
                                p.id !== state.currentId && (
                                  <button
                                    className="text-button"
                                    disabled={busy}
                                    onClick={() => setRestoreId(p.id)}
                                  >
                                    <RotateCcw size={14} /> Restore version
                                  </button>
                                )}
                            </div>
                          </article>
                        ))}
                    </div>
                    <div className="section-title">
                      <h2>Owner activity</h2>
                      <span>Append-only action log</span>
                    </div>
                    <section className="audit-log">
                      {state.audit.length ? (
                        state.audit
                          .slice()
                          .reverse()
                          .map((entry, i) => (
                            <div key={i}>
                              <BadgeCheck size={17} />
                              <span>
                                <strong>{entry.action}</strong>
                                <small>
                                  {entry.actor} ·{" "}
                                  {new Date(entry.timestamp).toLocaleString()}
                                </small>
                              </span>
                            </div>
                          ))
                      ) : (
                        <div>
                          <Clock3 size={18} />
                          <span>
                            No changes yet. Your first decision starts the
                            story.
                          </span>
                        </div>
                      )}
                    </section>
                  </>
                )}

                {section === "Store settings" && (
                  <>
                    <div className="page-heading">
                      <div>
                        <span className="eyebrow green">
                          THE SPACE YOU WORK WITH
                        </span>
                        <h1>Make it your kind of shop.</h1>
                        <p>Physical limits are promises, not suggestions.</p>
                      </div>
                    </div>
                    <StoreSettings
                      key={state.revision}
                      state={state}
                      busy={busy}
                      onSave={(body) =>
                        mutate(
                          "/store",
                          body,
                          "Store saved. Drafts now need regeneration against the new constraints.",
                        )
                      }
                    />
                    <div className="reset-panel">
                      <div>
                        <h3>A fresh start?</h3>
                        <p>
                          Reset only your sandbox. This replaces its inventory,
                          drafts and approval history.
                        </p>
                      </div>
                      <button
                        className="button subtle"
                        onClick={() => setModal("reset")}
                      >
                        <RotateCcw size={15} /> Reset sample shop
                      </button>
                    </div>
                  </>
                )}
              </div>
            </Modal>
          )}
          <footer className="page-footer">
            <span>
              SHOPARTIST <i>—</i> The art of a good shop.
            </span>
            <span>Built for the independent spirit.</span>
          </footer>
        </div>
      </main>
      {busy && (
        <div className="busy-status" role="status">
          <LoaderCircle size={17} className="spin" />{" "}
          {section === "The studio"
            ? "Planning, checking, making room…"
            : "Saving your changes…"}
        </div>
      )}
      {modal === "approve" && (
        <Modal
          title="Make this the new arrangement?"
          onClose={() => setModal(null)}
        >
          <div className="modal-body">
            <div className="approval-summary">
              <ShieldCheck size={28} />
              <h3>{plan.name}</h3>
              <p>
                {plan.placements.length} displayed SKUs ·{" "}
                {details?.validation.moves ?? "…"} changes · {plan.locks.length}{" "}
                locked locations
                {" · "}
                {details?.roomMoves.length ?? 0} interior changes
              </p>
            </div>
            <p>
              You’re approving the <strong>digital layout only</strong>. Stock
              is not purchased or moved automatically. Your previous approved
              version stays in history.
            </p>
            <p className="small muted">
              {plan.variant === "fixture"
                ? "Cultural evidence is synthetic. This is not a live Qloo-backed plan."
                : "This layout makes no live Qloo cultural claim."}
            </p>
            <div className="modal-actions">
              <button className="button subtle" onClick={() => setModal(null)}>
                Keep reviewing
              </button>
              <button
                className="button primary"
                disabled={
                  busy || stale || roomDirty || !details?.validation.valid
                }
                onClick={async () => {
                  if (
                    await mutate(
                      `/plans/${plan.id}/approve`,
                      { ownerConfirmed: true },
                      "Approved. Your staff work order is ready.",
                    )
                  )
                    setModal("export");
                }}
              >
                <Check size={16} /> Approve digital layout
              </button>
            </div>
          </div>
        </Modal>
      )}
      {modal === "export" && (
        <Modal
          title="A good plan, ready for the floor."
          wide
          onClose={() => setModal(null)}
        >
          <div className="modal-body work-order">
            <div className="print-heading">
              <span className="eyebrow">SHOPARTIST / STAFF WORK ORDER</span>
              <h2>
                {state.store.name} · {plan.name}
              </h2>
              <p>
                Approved by {plan.actor} ·{" "}
                {plan.approvedAt && new Date(plan.approvedAt).toLocaleString()}
              </p>
              <small>
                Version {plan.id} · Parent {plan.parentId ?? "none"}
              </small>
            </div>
            <div className="work-instructions">
              <strong>1. Clear changed locations into a staging area.</strong>
              <p>
                Clear all old locations below before placing anything. Return
                excess facings to the stockroom.
              </p>
              <strong>2. Place products at their new locations.</strong>
              <p>
                Use the facing counts below. Stockroom destinations mean the
                product is removed from display. Positions are numbered left to
                right.
              </p>
            </div>
            {!!details?.roomMoves.length && (
              <section className="interior-work-order">
                <h3>Interior work · before placing merchandise</h3>
                <p>
                  Clear merchandise from any fixtures being moved. Reposition
                  fixtures first, then restore unchanged shelf contents and
                  place changed products. Coordinates are measured from the room
                  centre.
                </p>
                <ul>
                  {details.roomMoves.map((move, index) => (
                    <li key={index}>
                      <strong>{move.label}</strong> — {move.instruction}
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Done</th>
                    <th>Product / SKU</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Facings</th>
                  </tr>
                </thead>
                <tbody>
                  {details?.moves.map((move) => (
                    <tr key={move.sku}>
                      <td>
                        <input
                          type="checkbox"
                          aria-label={`Completed ${move.title}`}
                        />
                      </td>
                      <td>
                        <strong>{move.title}</strong>
                        <small>{move.sku}</small>
                      </td>
                      <td>{move.from}</td>
                      <td>{move.to}</td>
                      <td>{move.facings}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!details?.moves.length && (
                <p className="empty-state">
                  No shelf movements in this version.
                </p>
              )}
            </div>
            <div className="modal-actions no-print">
              <button className="button subtle" onClick={() => window.print()}>
                Print work order
              </button>
              <a
                className="button primary"
                href={`/api/plans/${plan.id}/move-list.csv`}
                download
              >
                <ArrowDownToLine size={16} /> Download CSV
              </a>
            </div>
          </div>
        </Modal>
      )}
      {modal === "trace" && (
        <Modal
          title="Behind this arrangement"
          wide
          onClose={() => setModal(null)}
        >
          <div className="modal-body">
            <span className="eyebrow">BOUNDED PLANNING WORKFLOW</span>
            <ol className="trace-list">
              {plan.trace.map((step, i) => (
                <li key={i}>
                  <Check size={15} />
                  {step}
                </li>
              ))}
            </ol>
            <h3>ShopArtist objective components</h3>
            <p className="small muted">
              Internal normalized merchandising measures, not Qloo predictions.
              Fixture culture uses within-shelf pair strength. The category
              baseline has no cultural utility.
            </p>
            <div className="component-grid">
              {Object.entries(plan.components).map(([name, value]) => (
                <div key={name}>
                  <span>{name}</span>
                  <strong>{value === null ? "N/A" : value.toFixed(3)}</strong>
                </div>
              ))}
            </div>
            <p className="small muted">Run: {plan.runId} · Qloo API calls: 0</p>
            <details>
              <summary>{plan.rejected.length} packing exclusions</summary>
              <ul className="rejection-list">
                {plan.rejected.map((r) => (
                  <li key={r.sku}>
                    <strong>{r.sku}</strong> {r.reason}
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </Modal>
      )}
      {modal === "reset" && (
        <Modal title="Reset your sample shop?" onClose={() => setModal(null)}>
          <div className="modal-body">
            <p>
              This deletes this sandbox’s inventory changes, plans and history.
              Other demo visitors are not affected.
            </p>
            <div className="modal-actions">
              <button className="button subtle" onClick={() => setModal(null)}>
                Keep my shop
              </button>
              <button
                className="button danger"
                disabled={busy}
                onClick={async () => {
                  const result = await mutate(
                    "/stores/demo/load",
                    {},
                    "Your sample shop is ready.",
                  );
                  if (result) {
                    setPlanId(result.state.currentId);
                    setSelected(null);
                    setModal(null);
                    setSection("The studio");
                  }
                }}
              >
                Reset this sandbox
              </button>
            </div>
          </div>
        </Modal>
      )}
      {restoreId && (
        <Modal
          title="Restore a previous arrangement?"
          onClose={() => setRestoreId(null)}
        >
          <div className="modal-body">
            <p>
              This creates a new approved version from{" "}
              <strong>
                {state.plans.find((p) => p.id === restoreId)?.name}
              </strong>
              . Current stock, dimensions, zones and locked locations are
              checked again. History is preserved.
            </p>
            <div className="modal-actions">
              <button
                className="button subtle"
                onClick={() => setRestoreId(null)}
              >
                Cancel
              </button>
              <button
                className="button primary"
                disabled={busy}
                onClick={async () => {
                  if (
                    await mutate(
                      `/plans/${restoreId}/restore`,
                      { ownerConfirmed: true },
                      "Previous arrangement restored as a new approved version.",
                    )
                  )
                    setRestoreId(null);
                }}
              >
                <RotateCcw size={15} /> Restore & approve
              </button>
            </div>
          </div>
        </Modal>
      )}
      {modal === "help" && (
        <Modal title="The art of a good shop." onClose={() => setModal(null)}>
          <div className="modal-body help-copy">
            <p>
              ShopArtist brings your inventory, your physical space and your
              shop’s taste into one planning studio.
            </p>
            <ol>
              <li>
                <strong>Make it yours.</strong> Load the sample or import a CSV.
                Set shelf dimensions and review synthetic cultural mappings.
              </li>
              <li>
                <strong>Explore your taste.</strong> Use Generate with Qloo to research your idea and preview a 3D design. Shelf planning uses separate demo evidence.
              </li>
              <li>
                <strong>Get hands-on.</strong> Orbit the 3D shop, click a
                product, or drag between shelves in 2D. Locks and physical
                constraints always apply.
              </li>
              <li>
                <strong>Make the call.</strong> Approve a digital version,
                export the two-phase staff checklist, and restore an earlier
                version any time constraints allow.
              </li>
            </ol>
            <p className="small muted">
              This is a cookie-isolated demo sandbox, not production owner
              authentication. Cultural data is fictional. The local command
              agent needs no key. Optional AI mode sends your prompt and room to
              the configured AI provider only when you explicitly select it. Approvals always stay
              with you.
            </p>
            <button
              className="button primary full"
              onClick={() => setModal(null)}
            >
              Let’s make room for good things <ArrowRight size={16} />
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function MappingCard({
  product,
  busy,
  onReview,
}: {
  product: StoreState["products"][number];
  busy: boolean;
  onReview: (id: string | null) => unknown;
}) {
  const [candidate, setCandidate] = useState(product.mapping.entityId ?? "");
  return (
    <article className="mapping-card">
      <Cover product={product} small />
      <div className="mapping-product">
        <h3>{product.title}</h3>
        <small>
          {product.category} · {product.id}
        </small>
      </div>
      <div className="mapping-choice">
        <label htmlFor={`mapping-${product.id}`}>
          Synthetic candidate
          {product.mapping.candidates.length > 1
            ? " · ambiguous, choose explicitly"
            : ""}
        </label>
        <select
          id={`mapping-${product.id}`}
          value={candidate}
          onChange={(event) => setCandidate(event.target.value)}
        >
          <option value="">Choose a candidate…</option>
          {product.mapping.candidates.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label} ({c.id})
            </option>
          ))}
        </select>
      </div>
      <div className="mapping-actions">
        <button
          className={`button ${product.mapping.status === "approved" ? "subtle" : "primary"}`}
          disabled={
            busy || !candidate || candidate === product.mapping.entityId
          }
          onClick={() => onReview(candidate)}
        >
          {product.mapping.status === "approved" &&
          candidate === product.mapping.entityId ? (
            <>
              <Check size={14} /> Reviewed
            </>
          ) : (
            "Approve mapping"
          )}
        </button>
        <button
          className="text-button"
          disabled={busy || product.mapping.status === "unmapped"}
          onClick={() => onReview(null)}
        >
          Keep unmapped
        </button>
      </div>
    </article>
  );
}

function StoreSettings({
  state,
  busy,
  onSave,
}: {
  state: StoreState;
  busy: boolean;
  onSave: (body: unknown) => unknown;
}) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onSave({
      name: data.get("name"),
      type: data.get("type"),
      timezone: data.get("timezone"),
      provider: data.get("provider"),
      shelves: state.shelves.map((shelf) => ({
        id: shelf.id,
        name: data.get(`${shelf.id}-name`),
        zone: data.get(`${shelf.id}-zone`),
        width: Number(data.get(`${shelf.id}-width`)),
        height: Number(data.get(`${shelf.id}-height`)),
        depth: Number(data.get(`${shelf.id}-depth`)),
      })),
    });
  }
  return (
    <form className="settings-form" onSubmit={submit}>
      <section className="settings-card">
        <div className="section-title">
          <h2>Your shop</h2>
          <Store size={20} />
        </div>
        <div className="form-grid">
          <label>
            Store name
            <input
              name="name"
              defaultValue={state.store.name}
              maxLength={80}
              required
            />
          </label>
          <label>
            Store type
            <input
              name="type"
              defaultValue={state.store.type}
              maxLength={100}
              required
            />
          </label>
          <label>
            Timezone
            <input
              name="timezone"
              defaultValue={state.store.timezone}
              required
              placeholder="Asia/Jakarta"
            />
          </label>
          <label>
            Cultural provider
            <select name="provider" defaultValue={state.provider}>
              <option value="fixture">
                Synthetic Qloo fixtures (no network)
              </option>
              <option value="unavailable">
                Unavailable — honest baseline only
              </option>
            </select>
          </label>
        </div>
        <p className="small muted">
          No API key required. Live Qloo is deliberately not enabled until
          endpoint schemas, supported entity IDs and event permissions are
          verified.
        </p>
      </section>
      <section className="settings-card">
        <div className="section-title">
          <h2>The physical space</h2>
          <SlidersHorizontal size={20} />
        </div>
        <p className="small muted">
          All dimensions are usable interior centimeters. Changes that make the
          approved layout impossible are rejected.
        </p>
        <div className="shelf-settings">
          {state.shelves.map((shelf) => (
            <div key={shelf.id}>
              <span className="shelf-letter">{shelf.id}</span>
              <label>
                Shelf name
                <input
                  name={`${shelf.id}-name`}
                  defaultValue={shelf.name}
                  maxLength={80}
                  required
                />
              </label>
              <label>
                Zone
                <select name={`${shelf.id}-zone`} defaultValue={shelf.zone}>
                  <option value="wall">Wall</option>
                  <option value="island">Island</option>
                </select>
              </label>
              {(["width", "height", "depth"] as const).map((field) => (
                <label key={field}>
                  {field} (cm)
                  <input
                    name={`${shelf.id}-${field}`}
                    type="number"
                    step="0.1"
                    min={field === "width" ? 10 : 1}
                    max={field === "width" ? 1000 : 300}
                    defaultValue={shelf[field]}
                    required
                  />
                </label>
              ))}
            </div>
          ))}
        </div>
      </section>
      <button className="button primary" disabled={busy}>
        <Check size={16} /> Save store settings
      </button>
    </form>
  );
}
