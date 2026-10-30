import { useCallback, useState } from "react";
import type { ProgressEvent } from "./api";

/** The visible acts of each run, in order. Server phases map onto these. */
const scripts = {
  research: {
    heading: ["RESEARCH", "IN PROGRESS"],
    kicker: "THE AGENT IS ON THE CASE",
    footer:
      "This can take a few minutes. Qloo research, catalog study and a visual review all happen before you see the options.",
    acts: [
      { id: "taste", title: "TASTE", line: "Hunting Qloo tags" },
      { id: "research", title: "SIGNAL", line: "Reading affinities" },
      { id: "catalog", title: "PROPS", line: "Browsing fixtures" },
      { id: "directions", title: "DRAFT", line: "Sketching directions" },
      { id: "review", title: "CHECK", line: "Reviewing the room" },
    ],
    actOf: {
      brief: "taste", connect: "taste", taste: "taste", research: "research",
      catalog: "catalog", directions: "directions", review: "review", done: "review",
    } as Record<string, string>,
    quips: [
      "GOOD TASTE TAKES A MINUTE.",
      "MIXING THE INKS…",
      "NO TWO SHOPS ALIKE!",
      "CONSULTING THE CULTURE.",
      "MEANWHILE, IN THE STOCKROOM…",
      "THIS IS THE FUN PART.",
    ],
  },
  build: {
    heading: ["BUILDING", "YOUR SHOP"],
    kicker: "THE WORKSHOP IS OPEN",
    footer:
      "Your direction may need a custom fixture. It is drafted, tested, rendered and visually reviewed before it is placed.",
    acts: [
      { id: "brief", title: "SETUP", line: "Preparing the shop" },
      { id: "fixture", title: "BUILD", line: "Making the fixture" },
      { id: "place", title: "PLACE", line: "Fitting the floor" },
      { id: "done", title: "OPEN", line: "Unlocking the doors" },
    ],
    actOf: { brief: "brief", fixture: "fixture", place: "place", done: "done" } as Record<string, string>,
    quips: [
      "SAWDUST AND SCREEN PRINT!",
      "MEASURE TWICE…",
      "BUILT TO ORDER.",
      "ALMOST SHOWTIME!",
      "ONE OF A KIND.",
    ],
  },
} as const;

export function ResearchLoader({
  events,
  step,
  idea,
  location,
  onCancel,
  variant = "research",
}: {
  events: ProgressEvent[];
  step: number;
  idea: string;
  location?: string;
  onCancel?: () => void;
  variant?: keyof typeof scripts;
}) {
  const script = scripts[variant];
  const { acts, actOf, quips } = script;
  const [elapsed, setElapsed] = useState(0);
  const [quip, setQuip] = useState(0);
  const timerRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const tick = window.setInterval(() => setElapsed((n) => n + 1), 1000);
    const rotate = window.setInterval(
      () => setQuip((n) => (n + 1) % quips.length),
      4200,
    );
    return () => {
      window.clearInterval(tick);
      window.clearInterval(rotate);
    };
  }, [quips.length]);
  const logEndRef = useCallback((node: HTMLDivElement | null) => {
    node?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [events.length]);

  const latest = events.at(-1);
  const currentAct = actOf[latest?.phase ?? ""] ?? acts[0].id;
  const currentIndex = acts.findIndex((act) => act.id === currentAct);
  const reached = new Set(
    events.map((event) => actOf[event.phase]).filter(Boolean),
  );
  // Completed acts are the ones we have passed, not merely touched.
  const done = acts.filter((_, i) => i < currentIndex).map((act) => act.id);
  const minutes = Math.floor(elapsed / 60);
  const seconds = String(elapsed % 60).padStart(2, "0");

  return (
    <div ref={timerRef} className="research-loader" role="status" aria-live="polite">
      <div className="loader-rays" aria-hidden="true" />
      <div className="loader-dots" aria-hidden="true" />

      <div className="loader-stage">
        <header className="loader-head">
          <span className="loader-kicker">
            <i />
            {script.kicker}
          </span>
          <h1>
            {script.heading[0]}
            <br />
            <span>{script.heading[1]}</span>
          </h1>
          <p className="loader-idea">
            “{idea.trim().slice(0, 150) || "Your shop idea"}”
            {location ? <small>{location}</small> : null}
          </p>
        </header>

        <div className="loader-burst" aria-hidden="true">
          <svg viewBox="0 0 120 120">
            <path
              d="M60 2 70 26 92 12 90 38 116 36 100 56 120 70 95 76 106 100 80 95 78 118 60 102 42 118 40 95 14 100 25 76 0 70 20 56 4 36 30 38 28 12 50 26Z"
              fill="var(--pop-red)"
              stroke="var(--ink)"
              strokeWidth="3"
              strokeLinejoin="round"
            />
          </svg>
          <strong>{quips[quip]}</strong>
        </div>

        <ol className="loader-acts">
          {acts.map((act, i) => {
            const state = done.includes(act.id)
              ? "done"
              : act.id === currentAct
                ? "active"
                : reached.has(act.id)
                  ? "done"
                  : "waiting";
            return (
              <li key={act.id} className={state} data-act={i + 1}>
                <span className="act-chip">
                  {state === "done" ? "✓" : `0${i + 1}`}
                </span>
                <strong>{act.title}</strong>
                <small>{act.line}</small>
                {state === "active" && (
                  <span className="act-pulse" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                )}
              </li>
            );
          })}
        </ol>

        <section className="loader-log" aria-label="Agent progress log">
          <header>
            <span className="eyebrow">LIVE AGENT LOG</span>
            <span className="loader-meta">
              {step > 0 && <b>STEP {step}</b>}
              <span className="loader-clock">
                {minutes}:{seconds}
              </span>
            </span>
          </header>
          <div className="loader-log-scroll">
            {events.length === 0 && (
              <p className="loader-log-empty">Opening the line to the agent…</p>
            )}
            {/* Only the tail is kept on screen; the agent can emit dozens of steps. */}
            {events.slice(-40).map((event, i) => (
              <div className={`loader-line ${event.status}`} key={i}>
                <span className="loader-mark" aria-hidden="true">
                  {event.status === "done"
                    ? "✓"
                    : event.status === "warn"
                      ? "!"
                      : "▸"}
                </span>
                <span className="loader-text">
                  <strong>{event.label}{event.count && event.count > 1 ? ` (${event.count} attempts)` : ""}</strong>
                  {event.detail && <small>{event.detail}</small>}
                </span>
              </div>
            ))}
            <div ref={logEndRef} />
          </div>
          <footer>
            <span className="loader-bar" aria-hidden="true">
              <i />
            </span>
            {script.footer}
          </footer>
        </section>

        {onCancel && (
          <button type="button" className="button subtle loader-cancel" onClick={onCancel}>
            Stop and go back
          </button>
        )}
      </div>
    </div>
  );
}
