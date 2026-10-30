import { useEffect, useState } from "react";
import type { AssetDefinition } from "../shared/assets/types";
import { api } from "./api";
import {
  Armchair,
  BookOpen,
  Check,
  Coffee,
  Expand,
  Grid2X2,
  Move3D,
  Palette,
  Plus,
  RotateCcw,
  Save,
  Shirt,
  Store,
  Trash2,
} from "lucide-react";
import {
  applyArrangement,
  fixtureCatalog,
  fixtureKinds,
  fixturesOverlap,
  roomPlacementWarnings,
  focusLabels,
  interiorStyles,
  shopFocuses,
  stylePalettes,
  validateRoom,
  type Fixture,
  type FixtureKind,
  type RoomDesign,
} from "../shared/room";
import type { Plan, StoreState } from "../shared/types";
import { ShopScene } from "./ShopScene";
import "./RoomEditor.css";

const focusIcons = {
  fashion: Shirt,
  art: Palette,
  coffee: Coffee,
  books: BookOpen,
  other: Store,
};
interface Props {
  state: StoreState;
  plan: Plan;
  room: RoomDesign;
  onChange: (room: RoomDesign) => void;
  pendingResearch?: boolean;
  onSave: () => void;
  busy: boolean;
  disabled: boolean;
  selected: string | null;
  onSelect: (sku: string) => void;
}
export function RoomEditor({
  state,
  plan,
  room,
  onChange,
  pendingResearch = false,
  onSave,
  busy,
  disabled,
  selected,
  onSelect,
}: Props) {
  const [editMode, setEditMode] = useState(false);
  const [topView, setTopView] = useState(false);
  const [selectedId, setSelectedId] = useState("cashier");
  const [reset, setReset] = useState(0);
  const [error, setError] = useState("");
  const [addKind, setAddKind] = useState<FixtureKind>("plant");
  const [assets, setAssets] = useState<AssetDefinition[]>(Object.values(fixtureCatalog));
  useEffect(() => {
    let active = true;
    const refresh = () => { void api<AssetDefinition[]>("/assets").then(items => { if (active) setAssets(items); }).catch(() => { if (active) setError("Could not load your asset catalog. Reopen the editor to retry."); }); };
    refresh(); window.addEventListener("focus", refresh);
    return () => { active = false; window.removeEventListener("focus", refresh); };
  }, []);
  const [controlsOpen, setControlsOpen] = useState(false);
  const fixture = room.fixtures.find((f) => f.id === selectedId);
  const dirty = pendingResearch || JSON.stringify(room) !== JSON.stringify(plan.room);
  const errors = validateRoom(room, state.shelves);
  const warnings = roomPlacementWarnings(room, state.shelves);
  function update(next: RoomDesign) {
    if (disabled || busy) return;
    const issues = validateRoom(next, state.shelves);
    if (issues.length) {
      setError(issues[0]);
      return;
    }
    setError("");
    onChange(next);
  }
  function move(id: string, patch: Partial<Fixture>) {
    update({
      ...room,
      fixtures: room.fixtures.map((f) =>
        f.id === id ? { ...f, ...patch } : f,
      ),
    });
  }
  function addFixture() {
    const entry = assets.find(asset => asset.id === addKind);
    if (!entry) { setError("This asset is no longer available. Refresh the editor."); return; }
    if (room.fixtures.length >= 40) {
      setError("This floor plan supports up to 40 fixtures.");
      return;
    }
    const added: Fixture = {
      id: crypto.randomUUID(),
      kind: addKind,
      label: entry.label,
      x: 0,
      z: 0,
      rotation: 0,
      ...(entry.geometry ? { asset: entry } : {}),
    };
    for (let z = -room.depth / 2 + 0.6; z < room.depth / 2 - 0.6; z += 0.5)
      for (let x = -room.width / 2 + 0.6; x < room.width / 2 - 0.6; x += 0.5) {
        const candidate = {
          ...added,
          x: Math.round(x * 10) / 10,
          z: Math.round(z * 10) / 10,
        };
        const next = { ...room, fixtures: [...room.fixtures, candidate] };
        if (!validateRoom(next, state.shelves).length && !room.fixtures.some(f => fixturesOverlap(f, candidate, state.shelves))) {
          update(next);
          setSelectedId(added.id);
          setEditMode(true);
          return;
        }
      }
    setError(
      "No clear space found. Move another fixture or increase the room dimensions first.",
    );
  }
  return (
    <div className="interior-studio">
      <div className="design-header">
        <div>
          <span className="eyebrow">THE WHOLE SHOP, YOUR WAY</span>
          <h3>Make room for your kind of shop.</h3>
          <p>
            Mix your worlds. Style the space. Move everything inside it.
          </p>
        </div>
        <span className="design-dimensions">
          {room.width} × {room.depth} m<br />
          <small>{room.fixtures.length} fixtures</small>
        </span>
      </div>
      <details className="shop-style-controls">
        <summary>
          <Palette size={17} /> Shop & style{" "}
          <span>Mix, materials, colours & windows</span>
        </summary>
        <fieldset className="focus-fieldset" disabled={disabled || busy}>
          <legend>01 / Choose your shop mix</legend>
          <div className="focus-grid">
            {shopFocuses.map((focus) => {
              const Icon = focusIcons[focus],
                active = room.focuses.includes(focus);
              return (
                <button
                  type="button"
                  key={focus}
                  aria-pressed={active}
                  className={`focus-card ${active ? "active" : ""}`}
                  onClick={() => {
                    const focuses = active
                      ? room.focuses.filter((f) => f !== focus)
                      : shopFocuses.filter(
                          (f) => room.focuses.includes(f) || f === focus,
                        );
                    if (!focuses.length) {
                      setError("Keep at least one shop focus.");
                      return;
                    }
                    update({
                      ...room,
                      focuses,
                      fixtures: room.fixtures,
                    });
                    setAddKind("plant");
                  }}
                >
                  <Icon size={20} />
                  <span>{focusLabels[focus]}</span>
                  <span className="focus-check">
                    {active ? <Check size={13} /> : "+"}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="design-hint">
            Mix any shop types, or choose Other for your own concept. Existing fixtures stay in place; add any asset below.
          </p>
        </fieldset>
        <fieldset className="style-fieldset" disabled={disabled || busy}>
          <legend>02 / Give it a feeling</legend>
          <div className="interior-themes">
            {interiorStyles.map((style) => {
              const colors = stylePalettes[style];
              return (
                <button
                  key={style}
                  type="button"
                  aria-pressed={room.style === style}
                  className={`interior-theme ${room.style === style ? "active" : ""}`}
                  onClick={() =>
                    update({
                      ...room,
                      style,
                      wall: colors.wall,
                      floor: colors.floor,
                      accent: colors.accent,
                      window: colors.window,
                    })
                  }
                >
                  <span
                    className="palette-preview"
                    style={{ background: colors.wall }}
                  >
                    <i style={{ background: colors.floor }} />
                    <i style={{ background: colors.furniture }} />
                    <i style={{ background: colors.accent }} />
                  </span>
                  <strong>{style}</strong>
                  <small>{colors.description}</small>
                  {room.style === style && <Check size={14} />}
                </button>
              );
            })}
          </div>
          <div className="finish-controls">
            {(["wall", "floor", "accent"] as const).map((key) => (
              <label key={key}>
                <input
                  type="color"
                  aria-label={`${key} colour`}
                  value={room[key]}
                  onChange={(event) =>
                    update({ ...room, [key]: event.target.value })
                  }
                />
                <span>{key}</span>
              </label>
            ))}
            <label className="window-select">
              Windows
              <select
                aria-label="Window style"
                value={room.window}
                onChange={(event) =>
                  update({
                    ...room,
                    window: event.target.value as RoomDesign["window"],
                  })
                }
              >
                <option value="panoramic">Panoramic</option>
                <option value="grid">Steel grid</option>
                <option value="arched">Arched</option>
                <option value="ribbon">Ribbon</option>
              </select>
            </label>
          </div>
        </fieldset>
      </details>
      <div className="floor-toolbar">
        <span className="eyebrow">03 / ARRANGE YOUR SPACE</span>
        <div className="row">
          <button
            type="button"
            className={`button small ${editMode ? "primary" : "subtle"}`}
            aria-pressed={editMode}
            onClick={() => {
              setEditMode(!editMode);
              setControlsOpen(true);
            }}
            disabled={disabled || busy}
          >
            <Move3D size={14} />
            {editMode ? "Moving fixtures" : "Move fixtures"}
          </button>
          <button
            type="button"
            className={`button small ${topView ? "primary" : "subtle"}`}
            aria-pressed={topView}
            onClick={() => setTopView(!topView)}
          >
            <Grid2X2 size={14} />
            Floor plan
          </button>
          <button
            className="icon-button"
            aria-label="Reset camera"
            onClick={() => setReset((n) => n + 1)}
          >
            <Expand size={16} />
          </button>
        </div>
      </div>
      <div className={`scene-wrapper whole-shop ${room.style}`}>
        <div className="scene-shop-label">
          <strong>{state.store.name}</strong>
          <span>
            {room.focuses
              .map((f) => focusLabels[f].replace(" shop", ""))
              .join(" + ")}{" "}
            / {room.style}
          </span>
        </div>
        <div className="scene-badge">
          <span />
          {dirty
            ? "Unsaved interior preview"
            : plan.status === "draft"
              ? "Saved draft"
              : "Approved interior"}
        </div>
        <ShopScene
          products={state.products}
          shelves={state.shelves}
          placements={plan.placements}
          selected={selected}
          onSelect={onSelect}
          reset={reset}
          room={room}
          name={state.store.name}
          editMode={editMode && !disabled && !busy}
          selectedFixture={selectedId}
          onFixtureSelect={(id) => {
            setSelectedId(id);
            setControlsOpen(true);
          }}
          onMove={(id, x, z) => move(id, { x, z })}
          onError={setError}
          topView={topView}
        />
        <div className="scene-caption">
          <span>
            <Move3D size={14} />
            {editMode
              ? "Drag freely · precise to 1 cm · rotate to any angle"
              : "Drag to orbit · scroll to zoom · click merchandise"}
          </span>
        </div>
      </div>
      {(error || errors.length > 0) && (
        <div className="design-error" role="alert">
          {error || errors[0]}
        </div>
      )}
      {!error && !errors.length && !!warnings.length && <div className="design-warning" role="status">
        {warnings[0]} {warnings.length > 1 ? `(+${warnings.length - 1} more)` : ""} You can keep editing; check circulation before building.
      </div>}
      <details
        className="asset-controls"
        open={controlsOpen}
        onToggle={(event) => setControlsOpen(event.currentTarget.open)}
      >
        <summary>
          <Armchair size={17} /> Assets & placement{" "}
          <span>Add, move, rotate & resize</span>
        </summary>
        <p><a href="/asset-catalog.html" target="_blank" rel="noreferrer">View the asset catalog ↗</a></p>
        <fieldset className="fixture-editor" disabled={disabled || busy}>
          <legend className="sr-only">Fixture placement controls</legend>
          <div className="fixture-sidebar">
            <div className="panel-heading">
              <strong>
                <Armchair size={16} /> Fixtures
              </strong>
              <span>{room.fixtures.length}</span>
            </div>
            <div
              className="fixture-list"
              role="group"
              aria-label="Select fixture"
            >
              {room.fixtures.map((f) => (
                <button
                  type="button"
                  key={f.id}
                  aria-pressed={f.id === selectedId}
                  className={f.id === selectedId ? "active" : ""}
                  onClick={() => {
                    setSelectedId(f.id);
                    setEditMode(true);
                  }}
                >
                  <span>{f.label}</span>
                  <small>
                    {f.x.toFixed(1)}, {f.z.toFixed(1)} m
                  </small>
                </button>
              ))}
            </div>
            <div className="fixture-add">
              <select
                aria-label="New fixture type"
                value={addKind}
                onChange={(event) =>
                  setAddKind(event.target.value as FixtureKind)
                }
              >
                {assets
                  .filter((asset) => asset.id !== "shelf")
                  .map((asset) => (
                    <option key={asset.id} value={asset.id}>
                      {asset.label}
                    </option>
                  ))}
              </select>
              <button
                type="button"
                className="icon-button"
                aria-label="Add fixture"
                onClick={addFixture}
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
          <div className="fixture-detail">
            {fixture ? (
              <>
                <div className="panel-heading">
                  <div>
                    <span className="eyebrow">SELECTED FIXTURE</span>
                    <h4>{fixture.label}</h4>
                  </div>
                  <button
                    type="button"
                    className="icon-button"
                    aria-label="Remove selected fixture"
                    disabled={
                      fixture.kind === "shelf" ||
                      (fixture.kind === "cashier" &&
                        room.fixtures.filter((f) => f.kind === "cashier")
                          .length === 1)
                    }
                    onClick={() => {
                      update({
                        ...room,
                        fixtures: room.fixtures.filter(
                          (f) => f.id !== fixture.id,
                        ),
                      });
                      setSelectedId("cashier");
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <form
                  key={`${fixture.id}/${fixture.x}/${fixture.z}/${fixture.rotation}`}
                  onSubmit={(event) => {
                    event.preventDefault();
                    const values = new FormData(event.currentTarget);
                    move(fixture.id, {
                      x: Number(values.get("x")),
                      z: Number(values.get("z")),
                      rotation: Number(values.get("rotation")),
                    });
                  }}
                >
                  <div className="position-controls">
                    <label>
                      X position · m
                      <input
                        aria-label="Fixture X position"
                        type="number"
                        min={-room.width / 2}
                        max={room.width / 2}
                        name="x"
                        step="any"
                        required
                        defaultValue={fixture.x}
                      />
                    </label>
                    <label>
                      Z position · m
                      <input
                        aria-label="Fixture Z position"
                        type="number"
                        min={-room.depth / 2}
                        max={room.depth / 2}
                        name="z"
                        step="any"
                        required
                        defaultValue={fixture.z}
                      />
                    </label>
                    <label>
                      Rotation
                      <input
                        aria-label="Fixture rotation"
                        name="rotation"
                        type="number"
                        min="0"
                        max="360"
                        step="1"
                        defaultValue={fixture.rotation}
                      />
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="button small subtle apply-position"
                  >
                    Apply position
                  </button>
                </form>
                <p className="design-hint">
                  Origin at the centre. Negative Z is the back wall. Moving a
                  shelf carries its displayed products with it.
                </p>
                <div
                  className="fixture-nudge"
                  role="group"
                  aria-label="Nudge selected fixture"
                >
                  <button
                    type="button"
                    onClick={() =>
                      move(fixture.id, {
                        x: Math.round((fixture.x - 0.1) * 10) / 10,
                      })
                    }
                  >
                    ← 10 cm
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      move(fixture.id, {
                        z: Math.round((fixture.z - 0.1) * 10) / 10,
                      })
                    }
                  >
                    ↑ 10 cm
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      move(fixture.id, {
                        z: Math.round((fixture.z + 0.1) * 10) / 10,
                      })
                    }
                  >
                    ↓ 10 cm
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      move(fixture.id, {
                        x: Math.round((fixture.x + 0.1) * 10) / 10,
                      })
                    }
                  >
                    → 10 cm
                  </button>
                </div>
              </>
            ) : (
              <p>Select a fixture to move or rotate it.</p>
            )}
            <details className="room-settings">
              <summary>Room dimensions & arrangement presets</summary>
              <form
                key={`${room.width}/${room.depth}`}
                onSubmit={(event) => {
                  event.preventDefault();
                  const values = new FormData(event.currentTarget);
                  update({
                    ...room,
                    width: Number(values.get("width")),
                    depth: Number(values.get("depth")),
                  });
                }}
              >
                <div className="position-controls">
                  {(["width", "depth"] as const).map((key) => (
                    <label key={key}>
                      Room {key} · m
                      <input
                        aria-label={`Room ${key}`}
                        type="number"
                        min="8"
                        max="20"
                        step="0.5"
                        name={key}
                        required
                        defaultValue={room[key]}
                      />
                    </label>
                  ))}
                </div>
                <button
                  type="submit"
                  className="button small subtle apply-position"
                >
                  Apply room size
                </button>
              </form>
              <div className="arrangement-presets">
                {(["perimeter", "islands", "gallery"] as const).map(
                  (arrangement) => (
                    <button
                      className="button small subtle"
                      type="button"
                      key={arrangement}
                      onClick={() =>
                        update(applyArrangement(room, state.shelves, arrangement))
                      }
                    >
                      {arrangement}
                    </button>
                  ),
                )}
              </div>
              <p className="design-hint">
                Presets reposition matching fixtures and keep your added assets. Room size, colours and windows are retained.
              </p>
            </details>
          </div>
        </fieldset>
      </details>
      <div className="interior-save">
        <p>
          {dirty
            ? "Preview only. Save this interior to your draft, then approve the complete shop."
            : "Interior saved with this version. Furniture and finishes follow approval and restore."}
          <small>
            Conceptual floor plan: overlapping fixtures are allowed. Check circulation,
            accessibility and building requirements before building. Styled fixture contents are illustrative.
          </small>
        </p>
        <div className="row">
          <button
            type="button"
            className="button subtle small"
            disabled={!dirty || busy}
            onClick={() => {
              onChange(structuredClone(plan.room));
              setError("");
            }}
          >
            <RotateCcw size={14} />
            Discard
          </button>
          <button
            type="button"
            className="button primary small"
            disabled={!dirty || busy || disabled || errors.length > 0}
            onClick={onSave}
          >
            <Save size={14} />
            {busy ? "Saving…" : "Save interior draft"}
          </button>
        </div>
      </div>
    </div>
  );
}
