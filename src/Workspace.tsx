import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Coffee,
  FolderOpen,
  MapPin,
  Palette,
  Plus,
  Shirt,
  Sparkles,
  Store,
} from "lucide-react";
import App from "./App";
import { api, apiStream, type PlanResponse, type ProgressEvent, type StateResponse } from "./api";
import { ResearchLoader } from "./ResearchLoader";
import {
  shopFocuses,
  createRoom,
  type ShopFocus,
} from "../shared/room";
import type { StoreState } from "../shared/types";
import type { ProjectSummary } from "../shared/design";
import { emptyBrief } from "./ResearchPanel";
import { TasteStudio } from "./TasteStudio";
import type { DesignStudy } from "../shared/research";

const focusIcons = {
  fashion: Shirt,
  art: Palette,
  coffee: Coffee,
  books: BookOpen,
  other: Store,
};
export default function Workspace({
  initialState,
  initialProjects,
}: {
  initialState: StoreState;
  initialProjects: ProjectSummary[];
}) {
  const [state, setState] = useState(initialState);
  const [projects, setProjects] = useState(initialProjects);
  const [editor, setEditor] = useState<PlanResponse | null>(null);
  const [step, setStep] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [focuses, setFocuses] = useState<ShopFocus[]>(["coffee", "books"]);
  const [study, setStudy] = useState<DesignStudy | null>(null);
  const [selectedDirection, setSelectedDirection] = useState("");
  const [generateAsset, setGenerateAsset] = useState(false);
  const [brief, setBrief] = useState({ ...emptyBrief });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [building, setBuilding] = useState(false);
  const [buildEvents, setBuildEvents] = useState<ProgressEvent[]>([]);
  async function openDesign(next: StoreState) {
    const latest =
      next.plans.findLast(
        (p) =>
          p.status === "draft" &&
          p.parentId === next.currentId &&
          p.revision === next.revision,
      ) ?? next.plans.find((p) => p.id === next.currentId)!;
    const details = await api<PlanResponse>(`/plans/${latest.id}`);
    setState(next);
    setEditor(details);
    setStep(null);
    window.scrollTo(0, 0);
  }
  async function home() {
    setBusy(true);
    setError("");
    try {
      const result = await api<StateResponse>("/state");
      const library = await api<{ projects: ProjectSummary[] }>("/projects");
      setState(result.state);
      setProjects(library.projects);
      setEditor(null);
      window.scrollTo(0, 0);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  if (editor)
    return (
      <>
        <App
          key={state.projectId}
          initialState={state}
          initialDetails={editor}
          onHome={() => void home()}
        />
        {error && (
          <div className="workspace-error" role="alert">
            {error}
            <button onClick={() => setError("")}>Dismiss</button>
          </div>
        )}
      </>
    );
  return (
    <div className="pop-home">
      <header className="home-header">
        <a className="brand" href="/">
          <img className="brand-mark" src="/shopartist-mark.svg" alt="" width="34" height="34" />
          SHOP<span>ARTIST</span>
          <sup>®</sup>
        </a>
        <div className="home-header-note">
          <a href="/asset-catalog.html" target="_blank" rel="noreferrer">Asset catalog ↗</a>
          <span className="edition">THE CREATIVE SHOP STUDIO</span>
          <span className="demo-stamp">QLOO / TASTE STUDIO</span>
        </div>
      </header>
      {error && (
        <div className="alert error" role="alert">
          {error}
          <button className="icon-button" onClick={() => setError("")}>
            ×
          </button>
        </div>
      )}
      {building ? (
        <section className="onboarding building">
          <ResearchLoader
            events={buildEvents}
            step={0}
            variant="build"
            idea={`${name || "Your shop"} · ${study?.directions.find((d) => d.id === selectedDirection)?.name ?? "selected direction"}`}
            location={brief.location}
          />
        </section>
      ) : step === null ? (
        <>
          <section className="pop-hero">
            <div className="hero-copy">
              <span className="issue-label">
                ISSUE 001 / BIG IDEAS, SMALL SHOPS
              </span>
              <h1>
                GOOD TASTE.
                <br />
                <span>GREAT SPACE.</span>
              </h1>
              <p>
                Your shop is a story.
                <br />
                Let’s make it a page-turner.
              </p>
              <div className="hero-actions">
                <button
                  className="button primary hero-cta"
                  disabled={busy}
                  onClick={() => {
                    setStep(0);
                    setError("");
                  }}
                >
                  Start a new design <Plus size={21} />
                </button>
                <a className="text-button" href="#your-designs">
                  Or pick up where you left off <ArrowRight size={17} />
                </a>
              </div>
              <div className="hero-caption">
                <i />
                NO BLANK-CANVAS PANIC. JUST POSSIBILITIES.
              </div>
            </div>
            <div className="hero-art">
              <img
                src="/pop-shop.svg"
                width="680"
                height="540"
                alt="Original comic illustration of a colourful independent shop with books, a café table and a POP speech burst"
              />
              <span className="art-label">IMAGINATION, OPEN FOR BUSINESS.</span>
            </div>
          </section>
          <div className="pop-ticker" aria-label="Supported shop combinations">
            <div className="ticker-track">
              {[0, 1].map((copy) => (
                <div key={copy} aria-hidden={copy === 1}>
                  {["FASHION", "ART", "COFFEE", "BOOKS", "MIX IT UP"].map(
                    (word) => (
                      <span key={word}>
                        {word}
                        <i aria-hidden="true" />
                      </span>
                    ),
                  )}
                </div>
              ))}
            </div>
          </div>
          <section className="design-library" id="your-designs">
            <div className="library-heading">
              <div>
                <span className="eyebrow">THE NEXT CHAPTER</span>
                <h2>Your little worlds.</h2>
              </div>
              <span>
                {projects.length} saved{" "}
                {projects.length === 1 ? "design" : "designs"} · private sandbox
              </span>
            </div>
            <div className="project-grid">
              <button
                className="new-project-card"
                onClick={() => setStep(0)}
                disabled={busy}
              >
                <span>
                  <Plus size={32} />
                </span>
                <h3>Something new?</h3>
                <p>2 steps. One very you shop.</p>
              </button>
              {projects.map((project) => (
                <button
                  className={`project-card ${project.style}`}
                  key={project.id}
                  disabled={busy}
                  onClick={async () => {
                    setBusy(true);
                    setError("");
                    try {
                      const result = await api<StateResponse>(
                        `/projects/${project.id}/load`,
                        {},
                      );
                      await openDesign(result.state);
                    } catch (e) {
                      setError((e as Error).message);
                    } finally {
                      setBusy(false);
                    }
                  }}
                >
                  <div className="project-art">
                    <img src="/pop-shop.svg" alt="" />
                    <span>{project.style}</span>
                    <i>
                      <ArrowUpRight size={23} />
                    </i>
                  </div>
                  <div className="project-meta">
                    <small>{project.focuses.join(" + ")}</small>
                    <h3>{project.name}</h3>
                    <p>
                      <MapPin size={13} />
                      {project.location || "Location not set"}
                    </p>
                    <footer>
                      <span>
                        {new Date(project.updatedAt).toLocaleDateString()}
                      </span>
                      <span>
                        <FolderOpen size={13} />
                        {project.versions} versions
                      </span>
                    </footer>
                  </div>
                </button>
              ))}
            </div>
          </section>
          <section className="home-how">
            <span className="sticker">PLOT TWIST!</span>
            <p>
              You don’t need to be a designer.
              <br />
              <strong>Just have a point of view.</strong>
            </p>
            <div>
              <span>01 / Tell your story</span>
              <span>02 / Build your world</span>
              <span>03 / Make it real</span>
            </div>
          </section>
        </>
      ) : (
        <section className="onboarding">
          <div className="tour-intro">
            <button
              className="text-button"
              disabled={busy}
              onClick={() => {
                setStep(null);
                setError("");
              }}
            >
              <ArrowLeft size={17} />
              All designs
            </button>
            <span className="sticker">LET’S MEET YOUR SHOP</span>
            <h1>
              {[
                "What’s your\nbig idea?",
                "Find your\nkind of place.",
              ][step]
                .split("\n")
                .map((line, i) => (
                  <span key={line}>
                    {line}
                    {i === 0 && <br />}
                  </span>
                ))}
            </h1>
            <p>
              {
                [
                  "Pick what you’re making room for. Mix the categories, or choose Other for a concept of your own.",
                  "Tell us the feeling and the place. The AI Agent researches cultural taste, then creates different directions for your shop.",
                ][step]
              }
            </p>
            <ol className="tour-steps">
              {["The idea", "Taste & design"].map((label, i) => (
                <li key={label} aria-current={step === i ? "step" : undefined}>
                  <span>{i < step ? "✓" : `0${i + 1}`}</span>
                  {label}
                </li>
              ))}
            </ol>
            <img src="/pop-shop.svg" alt="" />
          </div>
          <form
            className="tour-form"
            onSubmit={async (event) => {
              event.preventDefault();
              if (step < 1) {
                if (!brief.direction?.trim() && brief.purpose.trim()) setBrief({ ...brief, direction: brief.purpose });
                setStep(step + 1);
                return;
              }
              setBusy(true);
              setError("");
              setBuildEvents([]);
              setBuilding(true);
              try {
                const result = await apiStream<StateResponse>(
                  "/projects/create",
                  {
                    name,
                    focuses,
                    style: "modern",
                    brief,
                    studyId: study?.id,
                    directionId: selectedDirection,
                    generateAsset,
                  },
                  (event) =>
                    setBuildEvents((current) => {
                      if (event.status !== "active") {
                        const open = current.findIndex(
                          (item) =>
                            item.status === "active" && item.label === event.label,
                        );
                        if (open !== -1)
                          return current.map((item, i) =>
                            i === open ? event : item,
                          );
                      }
                      return [...current, event];
                    }),
                  undefined,
                  "state",
                  (payload) =>
                    !!payload &&
                    typeof payload === "object" &&
                    !!(payload as { state?: unknown }).state,
                );
                await openDesign(result.state);
              } catch (e) {
                setError((e as Error).message);
              } finally {
                setBuilding(false);
                setBusy(false);
              }
            }}
          >
            <div className="tour-panel" key={step}>
              <fieldset disabled={busy} className="tour-fields">
              <span className="eyebrow">CHAPTER 0{step + 1} / 02</span>
              {step === 0 ? (
                <>
                  <h2>First, give it a name.</h2>
                  <label>
                    Design name
                    <input
                      autoFocus
                      required
                      maxLength={80}
                      placeholder="The Sunday Social"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>
                  <h3>What’s in the mix?</h3>
                  <div className="tour-focuses">
                    {shopFocuses.map((focus) => {
                      const Icon = focusIcons[focus];
                      return (
                        <button
                          type="button"
                          key={focus}
                          aria-pressed={focuses.includes(focus)}
                          onClick={() => {
                            setStudy(null); setSelectedDirection("");
                            setFocuses((current) =>
                              current.includes(focus)
                                ? current.length > 1 ? current.filter((f) => f !== focus) : current
                                : [...current, focus],
                            );
                          }}
                        >
                          <Icon size={32} />
                          <strong>{focus === "other" ? "your own idea" : focus}</strong>
                          <span>{focuses.includes(focus) ? "✓" : "+"}</span>
                        </button>
                      );
                    })}
                  </div>
                  <label>
                    The reason this shop exists
                    <textarea
                      maxLength={500}
                      rows={3}
                      placeholder="A place for neighbours to discover local books over good coffee…"
                      value={brief.purpose}
                      onChange={(e) =>
                        (setStudy(null), setSelectedDirection(""), setBrief({ ...brief, purpose: e.target.value }))
                      }
                    />
                  </label>
                </>
              ) : (
                <>
                  <h2>Discover your shop’s direction.</h2>
                  <TasteStudio brief={brief} onBrief={setBrief} room={createRoom(focuses, "modern")} forNewProject={true} study={study} onStudy={setStudy} selectedId={selectedDirection} onSelect={setSelectedDirection} />
                  {study?.directions.find(direction => direction.id === selectedDirection)?.assetIdea && <label><input type="checkbox" checked={generateAsset} onChange={event => setGenerateAsset(event.target.checked)} /> Generate and review the proposed custom fixture (may take several minutes)</label>}
                </>
              )}
              </fieldset>
            </div>
            <div className="tour-actions">
              {step > 0 ? (
                <button
                  className="button subtle"
                  type="button"
                  disabled={busy}
                  onClick={() => setStep(step - 1)}
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
              ) : (
                <span>Make it yours. You can change it later.</span>
              )}
              <button className="button primary" disabled={busy || (step === 1 && (!study || !selectedDirection || brief.location !== study.brief.location || brief.direction !== study.brief.direction || brief.purpose !== study.brief.purpose || JSON.stringify(brief.inspirations) !== JSON.stringify(study.brief.inspirations)))}>
                {busy
                  ? (step === 1 && generateAsset && study?.directions.find(direction => direction.id === selectedDirection)?.assetIdea ? "Creating & testing your fixture…" : "Opening your world…")
                  : step === 1
                    ? "Build this direction"
                    : "Next chapter"}
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </section>
      )}
      <footer className="home-footer">
        <strong>SHOPARTIST</strong>
        <span>Original artwork. Real possibilities. Powered by Qloo research.</span>
        <span>MADE FOR THE INDEPENDENT SPIRIT ↗</span>
      </footer>
    </div>
  );
}
