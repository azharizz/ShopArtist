# ShopArtist

A whole-shop design studio with a guided design library and interactive 3D editor. Mix coffee, fashion, art, books, or your own concept. An AI Agent searches live Qloo taste data for the owner’s concept and location, compares the evidence and proposes editable interior directions. The separate merchandise planner still uses synthetic sample evidence.

## Run

Requires **Node.js 24+** (the server uses built-in SQLite) and npm.

Put `QLOO_API_KEY`, `NEBIUS_API_KEY`, `NEBIUS_BASE_URL` and `NEBIUS_MODEL` in `shopartist-app/.env` or its parent `.env` (server environment variables take precedence). Obtain a hackathon key from the [Qloo developer guide](https://docs.qloo.com/reference/qloo-llm-hackathon-developer-guide). Credentials stay on the server. The AI Agent uses the Claude Messages SDK with a server-side compatibility adapter for the configured OpenAI-compatible model; it does not imply the configured model is Claude.

```sh
cd shopartist-app
npm ci
npm run dev
```

Open the Vite URL printed in the terminal, normally `http://localhost:5173`. The API runs on `127.0.0.1:4317`.

For a single-server production build:

```sh
npm run build
npm start
```

Open `http://127.0.0.1:4317`. `npm test` runs local deterministic planner checks and an isolated HTTP workflow against a temporary SQLite database. Automated tests mock Qloo; they never contact the live service.

## Asset catalog

Open `/asset-catalog.html` (also linked from the design library and editor) for 3D previews and descriptions of the shared fixtures. Each entry in `shared/assets/` describes the asset, footprint, purpose, suggested mood tags, color behavior, visual reference and rendering code path. The nine original fixtures have individual renderers in `src/assets/`; curated geometry-based fixtures contain their parts in their TypeScript catalog files and use the shared renderer in `shared/generated-assets.ts`. Curated assets retain their original IDs, and older local copies with the same IDs are hidden to avoid duplicates. The previews use the same rendering functions as the editor with the modern palette. `GET /api/assets` returns this shared catalog as JSON. The AI Agent calls `list_assets` for paginated summaries, then `get_asset_details` for a batch of selected IDs; it can only propose new assets whose details it retrieved. Listing search matches words literally. Mood tags are editorial descriptions, not Qloo results. Width and depth are plan footprints and height is approximate, not physical product specifications; shelf footprints depend on the linked shelf and displayed products can change its visible height. Colors are controlled by the room palette or accent where noted, not per fixture.

In the catalog, **Create an asset** accepts a description and an optional existing asset as reference. The agent inspects the selected reference, refines the brief, drafts a model, tests its Three.js mesh construction and bounds, renders front, side and angled views, and sends those images to a vision reviewer. It can revise the model in response to the critique, with a maximum of three visual reviews. The final technically valid reviewed model is saved through `POST /api/assets/generate`, even if the last review still has concerns. The catalog shows the review history and final three-angle preview. Configure an available image-capable model using `AI_VISION_MODEL` (default `nvidia/Nemotron-3.5-Super-VL`); the existing AI API key and base URL are used. Review failure is reported rather than silently claiming a visual review. During new-shop research, the AI Agent also proposes a signature fixture for each direction; **Build this direction** creates and tests the chosen fixture, then places it in a clear space and saves it with the design. If creation or placement fails, the build returns an error and saves neither the new design nor the asset. Models are restricted to at most 30 boxes and vertical cylinders; no model-written JavaScript is executed. Generated assets are stored per browser sandbox in `DATA_DIR/shopartist.sqlite`, can serve as references later, and appear in **Assets & placement** and the design agent's catalog tools. Saved room versions retain their geometry. The test checks construction and bounds, not whether the model looks good or faithfully matches the brief; review the preview. WebGL availability still depends on the browser. Back up the database to retain projects and generated assets.

### Local asset MCP

`npm run mcp:assets` starts a local MCP server over standard input/output for a compatible MCP client. It offers `list_assets`, `inspect_asset`, `preview_asset` and `save_asset`. A client creates a draft from the same box and cylinder geometry format as the app, visually inspects its front, side and angled PNG, then saves the exact previewed draft during the same MCP session. Save validates geometry and writes a new JSON file under `DATA_DIR/mcp-assets` (or `data/mcp-assets` by default). These MCP assets are **shared across browser sandboxes** on this server and appear in the app catalog, editor and AI Agent's catalog tools; browser-private assets are not exposed to this MCP server. Use the same `DATA_DIR` for the app and the MCP server. Give MCP access only to trusted local clients, since they can create shared assets. Back up the `mcp-assets` folder alongside the SQLite database. The project-scoped `.codex/config.toml` registers this server for Codex in the trusted project; a new session may be needed to refresh the tool list. Other MCP clients can connect using the same stdio command.

## What works

- Seeded 60-SKU store, four configurable shelves, stockroom, stock and dimension visibility.
- Private multi-design library and two-step onboarding for the shop concept, location, Qloo research and AI-generated design direction. Existing projects are retained when creating another design.
- Original comic-style SVG illustration, halftone patterns, bold outlines and responsive pop-art controls. Inventory, research, history and settings are dialogs under **Design tools**, not extra pages.
- Chat-based fixture spawning, positioning and finish changes. Every response is a validated preview: apply it, save a draft, then explicitly approve.
- AI Agent researches the free-form shop brief by calling Qloo tag search and location-aware Insights. It groups source-backed affinity signals into distinct selectable interior directions, with an interactive geographic map when Qloo returns cells.
- Interactive Three.js whole-shop editor with orbit, zoom, top-down floor plan, product picking and camera reset. Furniture groups carry their contents when moved; keyboard position forms provide the same editing path without WebGL.
- Any combination of fashion, art, coffee, books and a custom shop concept, with clothing racks, gallery displays, sculpture plinths, coffee bars, tables/chairs and reading benches. Cashier desks, plants and all four merchandise shelves can be moved and rotated. Non-shelf fixtures can be added and removed; one cashier is required.
- Futuristic, industrial, modern and classic interiors, each with different wall/floor detailing, furniture materials and window geometry. Override wall, floor and accent colours, or choose panoramic, grid, arched and ribbon windows independently.
- Drag fixtures at 1 cm precision, enter coordinates and arbitrary rotation, use keyboard nudges, or choose perimeter/islands/gallery arrangements. Room dimensions are editable from 8 to 20 metres per side. Shop-mix changes and arrangement presets preserve added fixtures.
- Four shop-level taste lenses: Midnight listening, The analog weekend, A slower kind of Sunday, and Electric daydream.
- Two synthetic culturally informed proposals plus a category-only baseline using the same catalog and physical restrictions; side-by-side comparison and scoring breakdown.
- CSV upload with atomic validation and row errors; search/category filtering; review of ambiguous synthetic entity mappings. Unmapped products remain eligible without fabricated evidence.
- Shelf drag-and-drop and keyboard-accessible placement editing, facings, location locks, move budgets, and regeneration.
- Server-side checks for stock, width, height, depth, permitted zones, duplicate positions, missing references, locks, and changed-SKU budget.
- Shared browser/server fixture validation retains room bounds, rotated footprints, unique fixture IDs and exactly one fixture per merchandise shelf. Up to 40 fixtures. Overlap and entrance placement are allowed for creative freedom; check circulation and accessibility separately. This is a conceptual floor plan, **not CAD or building-code certification**.
- Explicit approval, persistent version history, audit events and validated restoration include the entire interior. Printable staff checklists and spreadsheet-safe CSV exports include furniture and finish changes before merchandise placement. Existing SQLite plans are migrated with an initial interior at startup; previous product data is retained.
- An unavailable-provider setting that produces only a clearly labeled category baseline.

Proposals never change the current approved layout. Catalog, mapping, or shelf changes invalidate existing drafts. Editing an approved layout creates a draft rather than mutating history. Restore creates a new approved version and respects current constraints and locks. If a locked edited location conflicts with a small regeneration budget, approve it first or unlock it; constraints are never silently relaxed.

## Try the workflow

1. Choose **New design** on the library page. Give the shop a name, choose its mix and describe the purpose. In the second step, refine the idea, add a location and select **Research my idea**. Choose an evidence-backed AI direction and build the design. Or open an existing design.
2. In the editor, expand **Shop & style** or **Assets & placement** as needed. Click **Move fixtures** to drag furniture, or enter X/Z/rotation and **Apply position**. Save or discard interior previews before changing saved versions.
3. Ask the sidekick to `add two plants`, `wall pink`, `make it industrial`, or `move cashier to -2, 2`. Separate commands with `;`. Review the changes, **Apply preview**, then **Save interior draft**. The default command agent is deterministic, not an LLM.
4. Choose **Generate with Qloo** or **Design tools → Taste research** to research another idea. The AI Agent searches Qloo for relevant tags and requests local insights; select a direction and preview it in 3D. Saved research, evidence and the interactive map are displayed in the editor and persist with the design.
5. Choose a merchandising taste and generate layouts. Compare cultural proposals with Category essentials. In Shelves, inspect provenance or edit placement; impossible edits are rejected without changing the draft.
6. **Review & approve → Approve digital layout**, then download CSV or print the staff work order. History can restore approved versions; **My designs** returns to the library.

## Optional AI assistant

Create a local `.env` in this folder with `OPENAI_API_KEY` and optionally `OPENAI_MODEL` (default `gpt-4.1-mini`), then restart the server. Keep this file private; it is gitignored. Enable **Use OpenAI** under **Commands & AI mode** only when you want to send the prompt and current room configuration to OpenAI. The server calls Chat Completions; credentials never enter browser responses. Local commands remain available without credentials.

Model responses are parsed into a bounded command schema and checked against the same physical constraints as manual edits. Neither mode automatically saves or approves changes. Assets are original procedural fixture types, **not arbitrary AI-generated 3D meshes**. No external model calls were used in local verification.

## Inventory format

Required columns:

```csv
sku,title,category,width_cm,height_cm,depth_cm,stock
LOCAL-001,Independent Journal,Books,3,22,2,8
```

Optional columns: `creator`, `priority` (0–1), `zones` (`wall`, `island`, or `wall|island`). Categories are `Records`, `Books`, `Objects`, and `Stationery`. Dimensions are positive centimetres; stock is a nonnegative integer. SKU IDs contain letters, numbers, underscores or hyphens and begin with a letter/number.

Imports upsert by SKU rather than deleting omitted products. Maximum 500 catalog items and 900 KB per CSV. Existing approved placements must remain feasible; move affected products out of the approved layout before importing incompatible stock or dimensions. Changing a product's identity clears its reviewed mapping. Newly imported products remain unmapped in dummy mode.

## Project structure

```text
src/Workspace.tsx    Two-page navigation, design library and guided setup
src/App.tsx          Editor, approval, inventory and tools dialogs
src/AgentChat.tsx    Command/AI conversation and explicit preview review
src/ResearchPanel.tsx Editor research panel
src/TasteStudio.tsx AI research, direction selection and interactive taste map
src/ShopScene.tsx    Three.js rendering and callback-ref resource cleanup
shared/types.ts     Domain types and taste themes
shared/design.ts    Design briefs and legacy research query plans
shared/room.ts      Interior presets, footprint validation and work orders
server/index.ts     Validated HTTP endpoints, private projects, SQLite, exports
server/agent.ts     Local command parser and optional server-side OpenAI adapter
server/qloo.ts      Server-side Qloo search, taste insights and heatmap
server/design-agent.ts Claude SDK tool loop for Qloo research and design options
server/ai-bridge.ts Server-side translation to the configured model API
server/planner.ts   Deterministic packing, hard validator, scores, move lists
server/culture.ts   Explicitly synthetic cultural evidence
server/seed.ts      Fictional sample catalog and initial layout
server/*.test.ts    Constraint and isolated local workflow regressions
public/            Original pop-art SVG and example inventory CSV
```

React + Vite + TypeScript, Express, built-in SQLite, Three.js, Zod, and csv-parse. No external model files, scraped catalogs or paid fonts. React uses explicit event-driven fetching and callback refs with cleanup for the canvas, native dialogs and unload guard; there are no effect hooks. The planner is deterministic greedy packing with bounded reconciliation, not a global optimality guarantee. Scoring components are explanatory ShopArtist metrics; fixture affinity is not a buying probability or sales prediction.

## Persistence and deployment

Each browser receives an opaque HttpOnly, SameSite=Strict sandbox cookie. SQLite stores a private library of up to 40 projects, including catalogs, plans, research briefs and audit events. Reloads and restarts retain them; another browser gets a separate library. Clearing cookies loses access. Reset replaces only the active project's demo content, not other projects. Project-aware mutation headers reject edits from stale tabs after switching projects.

| Variable         | Default                           | Purpose                                                     |
| ---------------- | --------------------------------- | ----------------------------------------------------------- |
| `HOST`           | `127.0.0.1`                       | Bind address; use `0.0.0.0` on hosting                      |
| `PORT`           | `4317`                            | Single-server/API port                                      |
| `DATA_DIR`       | `./data` relative to project root | SQLite directory; mount persistent storage                  |
| `QLOO_API_KEY`   | Unset                             | Server-only hackathon Qloo API credential                   |
| `NEBIUS_API_KEY` | Unset                             | Server-only key for AI Agent inference                       |
| `NEBIUS_BASE_URL` | Provider API endpoint            | OpenAI-compatible model API endpoint                         |
| `NEBIUS_MODEL` | Provider model | Tool-capable model used by the AI Agent |
| `OPENAI_API_KEY` | Unset                             | Optional server-only model access; local commands otherwise |
| `OPENAI_MODEL`   | `gpt-4.1-mini`                    | Model used only when explicitly enabled in chat             |

Deploy with `npm ci && npm run build`, then `HOST=0.0.0.0 npm start`. Use one Node process with a persistent disk and an HTTPS reverse proxy. This is a **restricted demo sandbox**, not production identity authentication or a multi-tenant business account system. Do not upload sensitive inventory to a public demo or expose a configured paid AI key through this anonymous service. Shelf generation is limited to eight requests, Qloo research/search to twenty requests, and agent previews to twelve requests per minute per sandbox; production also needs authenticated owners, infrastructure abuse controls, billing limits and backup/retention. No hosting or public repository was created.

## Qloo and AI boundary

The agent uses the Claude Messages SDK with explicit Qloo search, research and direction tools. The configured model receives the shop brief, room geometry and returned Qloo data. A server-side adapter translates Messages and tool calls to the configured model gateway. The selected model may not be a Claude model. Agent output is validated; unrecognized evidence is excluded, positions are checked against room bounds, and changes remain editable. No API credentials enter the browser.

Qloo returns aggregate affinity signals for cultural interests and locations. Displayed percentages are Qloo affinity scores, not star ratings, individual preference, foot traffic or sales forecasts. The local map draws Qloo geographic cells on OpenStreetMap tiles; availability depends on the location and signal. Map tiles require network access. Selected research and directions are persisted in the sandbox database, which must stay private and out of the public repository. The separate shelf-merchandising planner and its `demo:` mappings remain synthetic and are labelled as such.

AI-generated designs use the existing procedural asset library and editable room model, not arbitrary generated 3D meshes. Overlaps are allowed in manual editing and shown as warnings. Check circulation, accessibility, safety and building requirements before building. No public hosting is included.

## License

MIT. See `LICENSE`. Dependency licenses remain their respective authors' licenses.
