import express from "express";
import { DatabaseSync } from "node:sqlite";
import { randomUUID } from "node:crypto";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "csv-parse/sync";
import { z } from "zod";
import { seed } from "./seed.js";
import { generate, movesFor, score, validate } from "./planner.js";
import { fixtureEvidence } from "./culture.js";
import { proposeDesign } from "./agent.js";
import { runDesignAgent } from "./design-agent.js";
import { createAssetWithAgent } from "./asset-creator.js";
import { allSharedAssets } from "./shared-assets.js";
import { renderAssetViews } from "./asset-preview.js";
import { buildDirectionAsset } from "./design-build.js";
import type { AssetDefinition } from "../shared/assets/types.js";
import type { DesignStudy } from "../shared/research.js";
import { researchQloo, searchQloo, searchQlooTags } from "./qloo.js";
import { inspirationCatalog, researchQueries } from "../shared/design.js";
import type { StoreState, Plan, Product } from "../shared/types.js";
import {
  createRoom,
  fixtureKinds,
  fixtureCatalog,
  interiorStyles,
  shopFocuses,
  roomChanges,
  validateRoom,
  type FixtureKind,
} from "../shared/room.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
if (existsSync(path.join(root, ".env")))
  process.loadEnvFile(path.join(root, ".env"));
if (existsSync(path.join(root, "..", ".env")))
  process.loadEnvFile(path.join(root, "..", ".env"));
const dataDir = process.env.DATA_DIR || path.join(root, "data");
mkdirSync(dataDir, { recursive: true });
const db = new DatabaseSync(path.join(dataDir, "shopartist.sqlite"));
db.exec(
  "PRAGMA journal_mode=WAL; CREATE TABLE IF NOT EXISTS sandboxes (id TEXT PRIMARY KEY, state TEXT NOT NULL, updated_at TEXT NOT NULL)",
);
db.exec(
  "CREATE TABLE IF NOT EXISTS projects (owner TEXT NOT NULL, id TEXT NOT NULL, state TEXT NOT NULL, updated_at TEXT NOT NULL, PRIMARY KEY(owner, id))",
);
db.exec("CREATE TABLE IF NOT EXISTS custom_assets (owner TEXT NOT NULL, id TEXT NOT NULL, asset TEXT NOT NULL, created_at TEXT NOT NULL, PRIMARY KEY(owner,id))");
function assetsFor(owner: string): AssetDefinition[] {
  const rows = db.prepare("SELECT asset FROM custom_assets WHERE owner = ? ORDER BY created_at, id").all(owner) as { asset: string }[];
  return [...Object.values(fixtureCatalog), ...allSharedAssets(), ...rows.map(row => JSON.parse(row.asset) as AssetDefinition)];
}
// One-time migration: existing approved plans gain a versioned interior without losing inventory.
for (const row of db.prepare("SELECT id, state FROM sandboxes").all() as {
  id: string;
  state: string;
}[]) {
  const state: StoreState = JSON.parse(row.state);
  let changed = false;
  for (const plan of state.plans)
    if (!plan.room) {
      plan.room = createRoom(["books"], "classic");
      changed = true;
    }
  if (changed)
    db.prepare("UPDATE sandboxes SET state = ? WHERE id = ?").run(
      JSON.stringify(state),
      row.id,
    );
}
const app = express();
app.disable("x-powered-by");
app.use(express.json({ limit: "1mb" }));
const sessions = new WeakMap<
  express.Request,
  { id: string; state: StoreState }
>();
const generationTimes = new Map<string, number[]>();
const roomSchema = z.object({
  focuses: z
    .array(z.enum(shopFocuses))
    .min(1)
    .max(shopFocuses.length)
    .refine(
      (values) => new Set(values).size === values.length,
      "Choose distinct shop focuses.",
    ),
  style: z.enum(interiorStyles),
  width: z.number().min(8).max(20),
  depth: z.number().min(8).max(20),
  wall: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  floor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  accent: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  furniture: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  frame: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  window: z.enum(["panoramic", "grid", "arched", "ribbon"]),
  fixtures: z
    .array(
      z.object({
        id: z.string().min(1).max(80),
        kind: z.string().min(1).max(80).refine(kind => (fixtureKinds as readonly string[]).includes(kind) || /^generated-[0-9a-f-]{36}$/.test(kind)).transform(kind => kind as FixtureKind),
        label: z.string().trim().min(1).max(80),
        x: z.number().finite(),
        z: z.number().finite(),
        rotation: z.number().finite().min(0).max(360),
        shelfId: z.string().max(64).optional(),
        asset: z.any().optional(),
      }),
    )
    .min(1)
    .max(40),
});
function validatePlan(state: StoreState, plan: Plan) {
  const result = validate(
    state,
    plan.placements,
    state.plans.find((p) => p.id === plan.parentId)?.placements ?? [],
    plan.locks,
    plan.maxMoves,
  );
  result.errors.push(...validateRoom(plan.room, state.shelves));
  result.valid = result.errors.length === 0;
  return result;
}
app.use("/api", (req, res, next) => {
  res.set({
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "same-origin",
  });
  if (
    req.method !== "GET" &&
    req.headers.origin &&
    new URL(req.headers.origin).host !== req.headers.host
  ) {
    res.status(403).json({ error: "Cross-origin changes are not allowed." });
    return;
  }
  const cookie = req.headers.cookie?.match(
    /(?:^|;\s*)shopartist=([a-f0-9-]{36})(?:;|$)/,
  )?.[1];
  const stored = cookie
    ? (db.prepare("SELECT state FROM sandboxes WHERE id = ?").get(cookie) as
        | { state: string }
        | undefined)
    : undefined;
  const id = stored ? cookie! : randomUUID();
  const state: StoreState = stored ? JSON.parse(stored.state) : seed();
  state.projectId ??= id;
  if (
    req.method !== "GET" &&
    req.headers["x-project-id"] &&
    req.headers["x-project-id"] !== state.projectId
  ) {
    res.status(409).json({
      error: "Another tab switched the active design. Reload before editing.",
    });
    return;
  }
  if (!stored) {
    db.prepare("INSERT INTO sandboxes VALUES (?, ?, ?)").run(
      id,
      JSON.stringify(state),
      new Date().toISOString(),
    );
    res.cookie("shopartist", id, {
      httpOnly: true,
      sameSite: "strict",
      secure: req.secure,
      maxAge: 30 * 86400000,
    });
  }
  sessions.set(req, { id, state });
  if (req.body?.room && Array.isArray(req.body.room.fixtures)) {
    const owned = new Map(assetsFor(id).filter(asset => asset.geometry).map(asset => [asset.id, asset]));
    for (const fixture of req.body.room.fixtures) {
      if (!fixture || typeof fixture !== "object") continue;
      if (typeof fixture.kind === "string" && fixture.kind.startsWith("generated-")) {
        const asset = owned.get(fixture.kind);
        if (!asset) { res.status(422).json({ error: "The room references an unavailable asset." }); return; }
        fixture.asset = asset;
      } else delete fixture.asset;
    }
  }
  next();
});
function persist(req: express.Request) {
  const { id, state } = sessions.get(req)!;
  db.prepare("UPDATE sandboxes SET state = ?, updated_at = ? WHERE id = ?").run(
    JSON.stringify(state),
    new Date().toISOString(),
    id,
  );
  db.prepare(
    "INSERT INTO projects VALUES (?, ?, ?, ?) ON CONFLICT(owner,id) DO UPDATE SET state=excluded.state, updated_at=excluded.updated_at",
  ).run(
    id,
    state.projectId ?? id,
    JSON.stringify(state),
    new Date().toISOString(),
  );
  return state;
}
function save(req: express.Request, res: express.Response, extra: object = {}) {
  res.json({ state: persist(req), ...extra });
}
function getPlan(state: StoreState, id: string): Plan {
  const plan = state.plans.find((p) => p.id === id);
  if (!plan) throw Object.assign(new Error("Plan not found."), { status: 404 });
  return plan;
}
function editable(state: StoreState, plan: Plan) {
  if (plan.status !== "draft")
    throw Object.assign(
      new Error(
        "Approved layouts are immutable. Create an editable proposal first.",
      ),
      { status: 409 },
    );
  if (plan.parentId !== state.currentId || plan.revision !== state.revision)
    throw Object.assign(
      new Error(
        "This proposal is stale. Generate again with the current inventory and layout.",
      ),
      { status: 409 },
    );
}
const placementSchema = z.object({
  sku: z.string().min(1).max(64),
  shelf: z.string().min(1).max(64),
  position: z.number().int().min(0).max(499),
  facings: z.number().int().min(1).max(100000),
});
const shelfSchema = z.object({
  id: z.enum(["A", "B", "C", "D"]),
  name: z.string().trim().min(1).max(80),
  zone: z.enum(["wall", "island"]),
  width: z.number().min(10).max(1000),
  height: z.number().min(1).max(300),
  depth: z.number().min(1).max(300),
});
const briefSchema = z
  .object({
    location: z.string().trim().max(160),
    latitude: z.number().min(-90).max(90).nullable(),
    longitude: z.number().min(-180).max(180).nullable(),
    radius: z.number().int().min(100).max(50000),
    purpose: z.string().trim().max(500),
    direction: z.string().trim().max(500).optional(),
    inspirations: z.array(z.string().max(160)).max(12),
    tags: z.array(z.string().max(80)).max(12),
    theme: z.enum(["midnight", "analog", "quiet", "electric"]),
  })
  .refine(
    (b) => (b.latitude === null) === (b.longitude === null),
    "Provide both latitude and longitude, or neither.",
  );
app.get("/api/assets", (req, res) => res.json(assetsFor(sessions.get(req)!.id)));
app.get("/api/assets/:id/preview", async (req, res) => {
  const asset = assetsFor(sessions.get(req)!.id).find(item => item.id === req.params.id);
  if (!asset?.geometry) { res.status(404).json({ error: "Generated asset not found." }); return; }
  res.type("png").send(await renderAssetViews(asset.geometry));
});
app.get("/api/projects", (req, res) => {
  const { id, state } = sessions.get(req)!;
  const rows = db
    .prepare(
      "SELECT id, state, updated_at FROM projects WHERE owner = ? ORDER BY updated_at DESC",
    )
    .all(id) as { id: string; state: string; updated_at: string }[];
  if (!rows.some((row) => row.id === state.projectId))
    rows.unshift({
      id: state.projectId!,
      state: JSON.stringify(state),
      updated_at: state.plans.at(-1)!.createdAt,
    });
  res.json({
    projects: rows.map((row) => {
      const project: StoreState =
        row.id === state.projectId ? state : JSON.parse(row.state);
      const plan = project.plans.at(-1)!;
      return {
        id: row.id,
        name: project.store.name,
        updatedAt: row.updated_at,
        style: plan.room.style,
        focuses: plan.room.focuses,
        location: project.brief?.location ?? "",
        versions: project.plans.length,
      };
    }),
  });
});
const studies = new Map<string, { owner: string; projectId: string | undefined; forNewProject: boolean; study: DesignStudy; expires: number }>();
function getStudy(id: string, owner: string, forNewProject: boolean, projectId?: string) {
  const record = studies.get(id);
  if (!record || record.expires < Date.now() || record.owner !== owner || record.forNewProject !== forNewProject || (!forNewProject && record.projectId !== projectId))
    throw Object.assign(new Error("This research has expired or belongs to another design. Research again."), { status: 409 });
  return record.study;
}
const activeBuilds = new Set<string>();
app.post("/api/projects/create", async (req, res) => {
  const input = z
    .object({
      name: z.string().trim().min(1).max(80),
      brief: briefSchema,
      focuses: z.array(z.enum(shopFocuses)).min(1).max(shopFocuses.length),
      style: z.enum(interiorStyles),
      studyId: z.string().uuid().optional(),
      directionId: z.string().uuid().optional(),
      generateAsset: z.boolean().default(true),
    })
    .parse(req.body);
  if (new Set(input.focuses).size !== input.focuses.length)
    throw new Error("Choose distinct shop focuses.");
  const session = sessions.get(req)!;
  if (activeBuilds.has(session.id)) throw Object.assign(new Error("A design is already being built. Please wait."), { status: 409 });
  activeBuilds.add(session.id);
  // Streams build progress as SSE when asked; the JSON contract is unchanged otherwise.
  const streaming = req.headers.accept?.includes("text/event-stream");
  let send: (event: string, data: unknown) => void = () => {};
  if (streaming) {
    res.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-cache, no-transform", Connection: "keep-alive", "X-Accel-Buffering": "no" });
    send = (event, data) => { if (!res.writableEnded) res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`); };
    send("progress", { phase: "brief", label: "Setting up your shop", detail: input.name, status: "done" });
  }
  try {
  const count = db
    .prepare("SELECT COUNT(*) AS n FROM projects WHERE owner=?")
    .get(session.id) as { n: number };
  if (count.n >= 40) throw new Error("This sandbox supports up to 40 designs.");
  const initialState = (db.prepare("SELECT state FROM sandboxes WHERE id = ?").get(session.id) as { state: string }).state;
  const state = seed();
  state.projectId = randomUUID();
  state.brief = input.brief;
  state.store.name = input.name;
  state.store.type = input.focuses.join(" + ");
  state.plans[0].room = createRoom(input.focuses, input.style);
  let generatedAsset: AssetDefinition | undefined;
  if (input.studyId && input.directionId) {
    const study = getStudy(input.studyId, session.id, true);
    const direction = study.directions.find(item => item.id === input.directionId);
    if (!direction || direction.room.focuses.join() !== input.focuses.join() || validateRoom(direction.room, state.shelves).length)
      throw new Error("The selected design is no longer valid. Research the current concept again.");
    const catalog = assetsFor(session.id);
    if (input.generateAsset && direction.assetIdea && catalog.filter(asset => asset.geometry && !asset.source).length >= 50) throw new Error("Your catalog is full. This direction needs space for a new generated fixture.");
    const built = await buildDirectionAsset(study, direction, state.shelves, catalog, undefined, input.generateAsset, event => send("progress", event));
    generatedAsset = built.asset;
    state.brief = study.brief;
    state.tasteStudy = { ...study, directions: study.directions.map(item => item.id === direction.id ? built.direction : item), selectedId: direction.id };
    state.plans[0].room = built.direction.room;
  } else if (input.studyId || input.directionId) throw new Error("Choose a research direction before creating the design.");
  state.plans[0].theme = input.brief.theme;
  if ((db.prepare("SELECT state FROM sandboxes WHERE id = ?").get(session.id) as { state: string }).state !== initialState)
    throw Object.assign(new Error("The active design changed while the new fixture was being created. Reload and try again."), { status: 409 });
  db.exec("BEGIN IMMEDIATE");
  try {
    db.prepare("INSERT INTO projects VALUES (?, ?, ?, ?) ON CONFLICT(owner,id) DO UPDATE SET state=excluded.state, updated_at=excluded.updated_at").run(session.id, session.state.projectId!, JSON.stringify(session.state), new Date().toISOString());
    if (generatedAsset) {
      if (assetsFor(session.id).filter(asset => asset.geometry && !asset.source).length >= 50) throw new Error("Your catalog is full. This direction needs space for a new generated fixture.");
      db.prepare("INSERT INTO custom_assets (owner, id, asset, created_at) VALUES (?, ?, ?, ?)").run(session.id, generatedAsset.id, JSON.stringify(generatedAsset), new Date().toISOString());
    }
  session.state = state;
    persist(req);
    db.exec("COMMIT");
  } catch (error) { db.exec("ROLLBACK"); throw error; }
  if (!streaming) { res.json({ state }); return; }
  send("progress", { phase: "done", label: "Your shop is ready", detail: state.store.name, status: "done" });
  send("state", { state });
  res.end();
  } catch (error) {
    if (!streaming) throw error;
    send("failed", { error: error instanceof Error ? error.message : "The design could not be built." });
    res.end();
  } finally { activeBuilds.delete(session.id); }
});
app.post("/api/projects/:id/load", (req, res) => {
  const session = sessions.get(req)!;
  if (req.params.id === session.state.projectId) {
    save(req, res);
    return;
  }
  const row = db
    .prepare("SELECT state FROM projects WHERE owner=? AND id=?")
    .get(session.id, req.params.id) as { state: string } | undefined;
  if (!row)
    throw Object.assign(new Error("Design not found in your sandbox."), {
      status: 404,
    });
  db.prepare(
    "INSERT INTO projects VALUES (?, ?, ?, ?) ON CONFLICT(owner,id) DO UPDATE SET state=excluded.state, updated_at=excluded.updated_at",
  ).run(
    session.id,
    session.state.projectId!,
    JSON.stringify(session.state),
    new Date().toISOString(),
  );
  session.state = JSON.parse(row.state);
  save(req, res);
});
const qlooTimes = new Map<string, number[]>();
let qlooGlobalTimes: number[] = [];
function limitQloo(req: express.Request, res: express.Response, next: express.NextFunction) {
  const id = sessions.get(req)!.id;
  const now = Date.now();
  const times = (qlooTimes.get(id) ?? []).filter(t => now - t < 60000);
  qlooGlobalTimes = qlooGlobalTimes.filter(t => now - t < 60000);
  if (times.length >= 20 || qlooGlobalTimes.length >= 60) { res.status(429).json({ error: "Too many taste requests. Please wait a minute." }); return; }
  qlooTimes.set(id, [...times, now]);
  qlooGlobalTimes.push(now);
  next();
}
app.post("/api/assets/generate", limitQloo, async (req, res) => {
  const input = z.object({ request: z.string().trim().min(5).max(500), referenceId: z.string().max(80).optional() }).strict().parse(req.body);
  const owner = sessions.get(req)!.id;
  const catalog = assetsFor(owner);
  const reference = input.referenceId ? catalog.find(asset => asset.id === input.referenceId) : undefined;
  if (input.referenceId && !reference) { res.status(422).json({ error: "The selected reference is not available in your catalog." }); return; }
  if (catalog.filter(asset => asset.geometry && !asset.source).length >= 50) { res.status(422).json({ error: "The catalog supports up to 50 generated assets." }); return; }
  const result = await createAssetWithAgent(input.request, reference, asset => {
    db.prepare("INSERT INTO custom_assets (owner, id, asset, created_at) VALUES (?, ?, ?, ?)").run(owner, asset.id, JSON.stringify(asset), new Date().toISOString());
  });
  res.json(result);
});
app.post("/api/ai/research", limitQloo, async (req, res) => {
  const input = z.object({ brief: briefSchema, room: roomSchema, forNewProject: z.boolean().default(false) }).parse(req.body);
  const session = sessions.get(req)!;
  const shelves = input.forNewProject ? seed().shelves : session.state.shelves;
  const errors = validateRoom(input.room, shelves);
  if (errors.length) { res.status(422).json({ error: "Invalid room.", errors }); return; }
  // Progress is streamed as SSE when the client asks for it; the JSON contract is unchanged otherwise.
  const streaming = req.headers.accept?.includes("text/event-stream");
  let send: (event: string, data: unknown) => void = () => {};
  if (streaming) {
    res.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-cache, no-transform", Connection: "keep-alive", "X-Accel-Buffering": "no" });
    send = (event, data) => { if (!res.writableEnded) res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`); };
    send("progress", { phase: "connect", label: "Waking the design agent", status: "active" });
  }
  try {
    const study = await runDesignAgent(input.brief, input.room, shelves, assetsFor(session.id), undefined, event => send("progress", event));
    const now = Date.now();
    for (const [key, record] of studies) if (record.expires < now || (record.owner === session.id && record.forNewProject === input.forNewProject)) studies.delete(key);
    studies.set(study.id, { owner: session.id, projectId: session.state.projectId, forNewProject: input.forNewProject, study, expires: now + 30 * 60 * 1000 });
    if (!streaming) { res.json(study); return; }
    send("study", study);
    res.end();
  } catch (error) {
    if (!streaming) throw error;
    send("failed", { error: error instanceof Error ? error.message : "The AI Agent could not finish the research." });
    res.end();
  }
});
app.post("/api/ai/apply", (req, res) => {
  const input = z.object({ studyId: z.string().uuid(), directionId: z.string().uuid() }).parse(req.body);
  const session = sessions.get(req)!;
  const study = session.state.tasteStudy?.id === input.studyId
    ? session.state.tasteStudy
    : getStudy(input.studyId, session.id, false, session.state.projectId);
  const direction = study.directions.find(item => item.id === input.directionId);
  if (!direction || validateRoom(direction.room, session.state.shelves).length) throw new Error("The selected direction is no longer valid.");
  res.json({ room: direction.room });
});
app.get("/api/qloo/search", limitQloo, async (req, res) => {
  const query = z.string().trim().min(2).max(100).parse(req.query.query);
  res.json({ results: await searchQloo(query) });
});
app.get("/api/qloo/tags", limitQloo, async (req, res) => {
  const query = z.string().trim().min(2).max(100).parse(req.query.query);
  res.json({ results: await searchQlooTags(query) });
});
app.post("/api/qloo/research", limitQloo, async (req, res) => {
  const input = z.object({ brief: briefSchema, room: roomSchema }).parse(req.body);
  const errors = validateRoom(input.room, sessions.get(req)!.state.shelves);
  if (errors.length) { res.status(422).json({ error: "Invalid room.", errors }); return; }
  res.json(await researchQloo(input.brief, input.room, sessions.get(req)!.state.shelves));
});
app.post("/api/research", (req, res) => {
  const brief = briefSchema.parse(req.body);
  res.json({
    source: "synthetic-fixture",
    queries: researchQueries(brief),
    inspirations: inspirationCatalog.filter((a) => a.theme === brief.theme),
    warning:
      "Authored demo connections, not Qloo results or local market evidence. Query plans are not executed.",
  });
});
app.post("/api/brief", (req, res) => {
  sessions.get(req)!.state.brief = briefSchema.parse(req.body);
  save(req, res);
});
app.get("/api/agent", (_req, res) =>
  res.json({
    available: Boolean(process.env.OPENAI_API_KEY),
    model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
  }),
);
const agentTimes = new Map<string, number[]>();
app.post("/api/agent", async (req, res) => {
  const { id, state } = sessions.get(req)!;
  const input = z
    .object({
      message: z.string().trim().min(1).max(2000),
      room: roomSchema,
      remote: z.boolean().default(false),
    })
    .parse(req.body);
  const times = (agentTimes.get(id) ?? []).filter(
    (t) => Date.now() - t < 60000,
  );
  if (times.length >= 12) {
    res
      .status(429)
      .json({ error: "Twelve agent requests per minute. Please wait." });
    return;
  }
  agentTimes.set(id, [...times, Date.now()]);
  const result = await proposeDesign(
    input.message,
    input.room,
    state.shelves,
    input.remote,
  );
  res.json({ ...result, changes: roomChanges(input.room, result.room) });
});
app.get("/api/state", (req, res) =>
  res.json({ state: sessions.get(req)!.state }),
);
app.post("/api/stores/demo/load", (req, res) => {
  const projectId = sessions.get(req)!.state.projectId;
  sessions.get(req)!.state = { ...seed(), projectId };
  save(req, res);
});
app.post("/api/store", (req, res) => {
  const input = z
    .object({
      name: z.string().trim().min(1).max(80),
      type: z.string().trim().min(1).max(100),
      timezone: z.string().max(80),
      shelves: z.array(shelfSchema).length(4),
      provider: z.enum(["fixture", "unavailable"]),
    })
    .parse(req.body);
  if (new Set(input.shelves.map((s) => s.id)).size !== 4)
    throw new Error("All four shelf IDs must be unique.");
  try {
    new Intl.DateTimeFormat("en", { timeZone: input.timezone });
  } catch {
    throw new Error("Choose a valid IANA timezone.");
  }
  const { state } = sessions.get(req)!;
  const next = {
    ...state,
    store: { name: input.name, type: input.type, timezone: input.timezone },
    shelves: input.shelves,
    provider: input.provider,
  };
  const result = validate(next, getPlan(state, state.currentId).placements, []);
  result.errors.push(
    ...validateRoom(getPlan(state, state.currentId).room, input.shelves),
  );
  result.valid = result.errors.length === 0;
  if (!result.valid)
    throw new Error(
      `Current layout would become invalid: ${result.errors.join(" ")}`,
    );
  Object.assign(state, next);
  state.revision++;
  state.audit.push({
    actor: "Demo owner",
    action: "Updated store constraints",
    planId: state.currentId,
    timestamp: new Date().toISOString(),
  });
  save(req, res);
});

app.post("/api/inventory/import", (req, res) => {
  const input = z
    .object({
      filename: z.string().regex(/\.csv$/i, "Upload a .csv file."),
      csv: z.string().min(1).max(900000),
    })
    .parse(req.body);
  let rows: Record<string, string>[];
  try {
    rows = parse(input.csv, {
      bom: true,
      columns: (headers: string[]) => {
        if (new Set(headers).size !== headers.length)
          throw new Error("Duplicate CSV headers.");
        for (const field of [
          "sku",
          "title",
          "category",
          "width_cm",
          "height_cm",
          "depth_cm",
          "stock",
        ])
          if (!headers.includes(field))
            throw new Error(`Missing column: ${field}`);
        return headers;
      },
      skip_empty_lines: true,
      trim: true,
      max_record_size: 5000,
    });
  } catch (error) {
    throw new Error(`CSV parsing failed: ${(error as Error).message}`);
  }
  if (!rows.length || rows.length > 500)
    throw new Error("Import between 1 and 500 product rows.");
  const { state } = sessions.get(req)!;
  const errors: string[] = [],
    imported: Product[] = [],
    seen = new Set<string>();
  const numeric = z.string().min(1).transform(Number).pipe(z.number().finite());
  const rowSchema = z.object({
    sku: z.string().regex(/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,63}$/),
    title: z.string().min(1).max(120),
    category: z.enum(["Records", "Books", "Objects", "Stationery"]),
    width_cm: numeric.pipe(z.number().positive().max(1000)),
    height_cm: numeric.pipe(z.number().positive().max(300)),
    depth_cm: numeric.pipe(z.number().positive().max(300)),
    stock: numeric.pipe(z.number().int().min(0).max(100000)),
    creator: z.string().max(120).optional(),
    priority: numeric.pipe(z.number().min(0).max(1)).optional(),
    zones: z.string().optional(),
  });
  rows.forEach((row, i) => {
    const parsed = rowSchema.safeParse(row);
    if (!parsed.success) {
      errors.push(
        `Row ${i + 2}: ${parsed.error.issues.map((e) => `${e.path.join(".")}: ${e.message}`).join("; ")}`,
      );
      return;
    }
    const r = parsed.data;
    if (seen.has(r.sku)) {
      errors.push(`Row ${i + 2}: duplicate SKU ${r.sku}.`);
      return;
    }
    seen.add(r.sku);
    const zones = r.zones ? r.zones.split("|") : ["wall", "island"];
    if (zones.some((zone) => !["wall", "island"].includes(zone))) {
      errors.push(
        `Row ${i + 2}: zones must be wall and/or island, separated by |.`,
      );
      return;
    }
    const old = state.products.find((p) => p.id === r.sku);
    imported.push({
      id: r.sku,
      title: r.title,
      category: r.category,
      creator: r.creator || "",
      width: r.width_cm,
      height: r.height_cm,
      depth: r.depth_cm,
      stock: r.stock,
      priority: r.priority ?? 0.3,
      zones,
      color: old?.color ?? "#899b87",
      motif: old?.motif ?? 0,
      mapping:
        old &&
        old.title === r.title &&
        old.category === r.category &&
        old.creator === (r.creator || "")
          ? old.mapping
          : { status: "unmapped", entityId: null, candidates: [] },
    });
  });
  if (errors.length) {
    res.status(400).json({
      error: "Inventory was not changed. Correct the CSV errors.",
      errors,
    });
    return;
  }
  const products = [
    ...state.products.filter((p) => !seen.has(p.id)),
    ...imported,
  ];
  if (products.length > 500)
    throw new Error("The demo supports at most 500 SKUs.");
  const result = validate(
    { ...state, products },
    getPlan(state, state.currentId).placements,
    [],
  );
  if (!result.valid)
    throw new Error(
      `Import would invalidate the approved layout. Move affected products first. ${result.errors.join(" ")}`,
    );
  state.products = products;
  state.revision++;
  state.audit.push({
    actor: "Demo owner",
    action: `Imported ${imported.length} inventory rows`,
    planId: state.currentId,
    timestamp: new Date().toISOString(),
  });
  save(req, res, { imported: imported.length });
});
app.post("/api/cultural-mappings/resolve", (req, res) => {
  const input = z
    .object({ sku: z.string(), entityId: z.string().nullable() })
    .parse(req.body);
  const { state } = sessions.get(req)!;
  const product = state.products.find((p) => p.id === input.sku);
  if (!product) throw new Error("Unknown SKU.");
  if (
    input.entityId !== null &&
    !product.mapping.candidates.some((c) => c.id === input.entityId)
  )
    throw new Error(
      "Only listed synthetic candidates can be reviewed in fixture mode.",
    );
  product.mapping.entityId = input.entityId;
  product.mapping.status = input.entityId ? "approved" : "unmapped";
  state.revision++;
  state.audit.push({
    actor: "Demo owner",
    action: `Reviewed mapping for ${product.id}: ${input.entityId ?? "unmapped"}`,
    planId: state.currentId,
    timestamp: new Date().toISOString(),
  });
  save(req, res);
});
app.post("/api/plans/generate", (req, res) => {
  const { id, state } = sessions.get(req)!;
  const now = Date.now(),
    recent = (generationTimes.get(id) ?? []).filter((t) => now - t < 60000);
  if (recent.length >= 8) {
    res.set("Retry-After", "60").status(429).json({
      error: "Eight runs per minute per sandbox. Please wait a minute.",
    });
    return;
  }
  generationTimes.set(id, [...recent, now]);
  const input = z
    .object({
      theme: z.enum(["midnight", "analog", "quiet", "electric"]),
      maxMoves: z.number().int().min(0).max(500),
      sourcePlanId: z.string().optional(),
    })
    .parse(req.body);
  const source = input.sourcePlanId
    ? getPlan(state, input.sourcePlanId)
    : getPlan(state, state.currentId);
  if (source.status === "draft") editable(state, source);
  const proposals = generate(state, input.theme, input.maxMoves, source.locks);
  const roomErrors = validateRoom(source.room, state.shelves);
  if (roomErrors.length) throw new Error(roomErrors.join(" "));
  for (const proposal of proposals)
    proposal.room = structuredClone(source.room);
  state.plans.push(...proposals);
  console.info(
    JSON.stringify({
      event: "plan_generated",
      runId: proposals[0].runId,
      provider: state.provider,
      qlooCalls: 0,
    }),
  );
  save(req, res, { proposalIds: proposals.map((p) => p.id) });
});
app.get("/api/plans/:id", (req, res) => {
  const { state } = sessions.get(req)!;
  const plan = getPlan(state, req.params.id);
  res.json({
    plan,
    validation: validatePlan(state, plan),
    moves: movesFor(state, plan),
    roomMoves: roomChanges(
      state.plans.find((p) => p.id === plan.parentId)?.room ?? plan.room,
      plan.room,
    ),
  });
});
app.post("/api/plans/:id/edit", (req, res) => {
  const input = z
    .object({
      placements: z.array(placementSchema).max(500),
      lockedSkus: z.array(z.string()).max(500),
      room: roomSchema.optional(),
      studyId: z.string().uuid().optional(),
      directionId: z.string().uuid().optional(),
    })
    .parse(req.body);
  const session = sessions.get(req)!;
  const { state } = session;
  let selectedStudy: DesignStudy | undefined;
  if (input.studyId || input.directionId) {
    if (!input.studyId || !input.directionId || !input.room) throw new Error("A research direction requires a room draft.");
    const study = state.tasteStudy?.id === input.studyId ? state.tasteStudy : getStudy(input.studyId, session.id, false, state.projectId);
    if (!study.directions.some(d => d.id === input.directionId)) throw new Error("Research direction not found.");
    selectedStudy = { ...study, selectedId: input.directionId };
  }
  const original = getPlan(state, req.params.id);
  if (original.status === "draft") editable(state, original);
  else if (original.id !== state.currentId)
    throw new Error(
      "Only the current approved layout can be edited. Restore historical layouts first.",
    );
  const retainedLocks = original.locks.filter((p) =>
    input.lockedSkus.includes(p.sku),
  );
  const result = validate(
    state,
    input.placements,
    getPlan(state, state.currentId).placements,
    retainedLocks,
    original.status === "draft" ? original.maxMoves : 500,
  );
  result.errors.push(
    ...validateRoom(input.room ?? original.room, state.shelves),
  );
  result.valid = result.errors.length === 0;
  if (!result.valid) {
    res.status(422).json({
      error: "Placement rejected. The layout was not changed.",
      errors: result.errors,
    });
    return;
  }
  if (
    input.lockedSkus.some((sku) => !input.placements.some((p) => p.sku === sku))
  )
    throw new Error("Only displayed products can be locked.");
  const plan: Plan =
    original.status === "draft"
      ? original
      : {
          ...structuredClone(original),
          id: randomUUID(),
          parentId: state.currentId,
          status: "draft",
          revision: state.revision,
          approvedAt: null,
          createdAt: new Date().toISOString(),
          maxMoves: 500,
          actor: null,
          name: "My arrangement",
          variant: "manual",
          trace: [
            "Manual edit · constraints verified",
            "AWAIT_APPROVAL · digital store unchanged",
          ],
        };
  plan.placements = input.placements;
  if (input.room) plan.room = input.room;
  plan.locks = input.placements.filter((p) => input.lockedSkus.includes(p.sku));
  plan.evidence =
    plan.variant === "fixture"
      ? fixtureEvidence(state.products, plan.theme, plan.runId).filter((e) =>
          plan.placements.some((p) => p.sku === e.sku),
        )
      : [];
  plan.components = score(state, plan);
  if (original.status !== "draft") state.plans.push(plan);
  if (selectedStudy) { state.tasteStudy = selectedStudy; state.brief = selectedStudy.brief; }
  save(req, res, { planId: plan.id });
});
app.post("/api/plans/:id/validate", (req, res) => {
  const { state } = sessions.get(req)!;
  const plan = getPlan(state, req.params.id);
  const result = validatePlan(state, plan);
  res.json(result);
});
app.post("/api/plans/:id/approve", (req, res) => {
  z.object({ ownerConfirmed: z.literal(true) }).parse(req.body);
  const { state } = sessions.get(req)!;
  const plan = getPlan(state, req.params.id);
  editable(state, plan);
  const result = validatePlan(state, plan);
  if (!result.valid) {
    res.status(422).json({ error: "Approval blocked.", errors: result.errors });
    return;
  }
  plan.status = "approved";
  plan.approvedAt = new Date().toISOString();
  plan.actor = "Demo owner";
  plan.trace.push("EXPORT · owner approved digital layout");
  state.currentId = plan.id;
  state.audit.push({
    actor: plan.actor,
    action: "Approved digital layout",
    planId: plan.id,
    timestamp: plan.approvedAt,
  });
  save(req, res);
});
app.post("/api/plans/:id/restore", (req, res) => {
  z.object({ ownerConfirmed: z.literal(true) }).parse(req.body);
  const { state } = sessions.get(req)!;
  const source = getPlan(state, req.params.id);
  if (source.status !== "approved" || source.id === state.currentId)
    throw new Error("Choose a previous approved version.");
  const current = getPlan(state, state.currentId);
  const result = validate(
    state,
    source.placements,
    current.placements,
    current.locks,
  );
  result.errors.push(...validateRoom(source.room, state.shelves));
  result.valid = result.errors.length === 0;
  if (!result.valid)
    throw new Error(
      `Restore blocked by current stock, dimensions, or locks: ${result.errors.join(" ")}`,
    );
  const plan: Plan = {
    ...structuredClone(source),
    id: randomUUID(),
    name: `Restored · ${source.name}`,
    parentId: state.currentId,
    variant: "restore",
    revision: state.revision,
    createdAt: new Date().toISOString(),
    approvedAt: new Date().toISOString(),
    maxMoves: 500,
    locks: current.locks,
    evidence: [],
    actor: "Demo owner",
    trace: [
      `Restored approved version ${source.id}; current hard constraints verified`,
    ],
  };
  plan.components = score(state, plan);
  state.plans.push(plan);
  state.currentId = plan.id;
  state.audit.push({
    actor: "Demo owner",
    action: `Restored ${source.id}`,
    planId: plan.id,
    timestamp: plan.approvedAt!,
  });
  save(req, res, { planId: plan.id });
});
const csvCell = (value: unknown) =>
  `"${String(value)
    .replace(/^[\s\uFEFF]*[=+@-]/, (match) => `'${match}`)
    .replaceAll('"', '""')}"`;
app.get("/api/plans/:id/move-list.csv", (req, res) => {
  const { state } = sessions.get(req)!;
  const plan = getPlan(state, req.params.id);
  if (plan.status !== "approved")
    throw new Error("Approve the layout before exporting a staff work order.");
  const moves = movesFor(state, plan);
  const rows: unknown[][] = [
    ["Step", "Phase", "SKU", "Title", "From", "To", "Facings", "Instruction"],
  ];
  // Clear all changed locations before placing: swaps never demand two products in the same slot.
  for (const m of moves.filter((m) => m.from !== "Stockroom"))
    rows.push([
      rows.length,
      "1 · Clear",
      m.sku,
      m.title,
      m.from,
      "Staging / stockroom",
      0,
      "Clear old location; retain units for the placement phase",
    ]);
  for (const change of roomChanges(
    state.plans.find((p) => p.id === plan.parentId)?.room ?? plan.room,
    plan.room,
  ))
    rows.push([
      rows.length,
      "Interior · before placement",
      "",
      change.label,
      "",
      "",
      "",
      change.instruction,
    ]);
  for (const m of moves.filter((m) => m.to !== "Stockroom"))
    rows.push([
      rows.length,
      "2 · Place",
      m.sku,
      m.title,
      "Staging / stockroom",
      m.to,
      m.facings,
      m.instruction,
    ]);
  res
    .type("text/csv")
    .attachment(`shopartist-${plan.id}.csv`)
    .send(rows.map((row) => row.map(csvCell).join(",")).join("\r\n"));
});
app.use(express.static(path.join(root, "dist")));
app.get("/{*splat}", (req, res) => {
  if (req.path.startsWith("/api/"))
    res.status(404).json({ error: "Endpoint not found." });
  else res.sendFile(path.join(root, "dist/index.html"));
});
app.use(
  (
    error: Error & { status?: number },
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    res.status(error instanceof z.ZodError ? 400 : (error.status ?? 400)).json({
      error:
        error instanceof z.ZodError
          ? error.issues
              .map((e) => `${e.path.join(".")}: ${e.message}`)
              .join("; ")
          : error.message,
    });
  },
);
const server = app.listen(
  Number(process.env.PORT || 4317),
  process.env.HOST || "127.0.0.1",
  (error?: Error) => {
    if (error) throw error;
    const address = server.address();
    console.info(
      "ShopArtist server ready on port " +
        (typeof address === "object" && address
          ? address.port
          : process.env.PORT || 4317),
    );
  },
);
process.on("SIGTERM", () =>
  server.close(() => {
    db.close();
    process.exit(0);
  }),
);
