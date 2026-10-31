<p align="center">
  <img src="https://raw.githubusercontent.com/azharizz/ShopArtist/main/submission/assets/shopartist-banner.png" alt="ShopArtist: Good taste. Great space. Describe a feeling; an AI agent reads real cultural taste from Qloo and builds the shop in 3D." width="100%">
</p>

# SHOPARTIST

## Describe the feeling. ShopArtist builds the shop.

**ShopArtist** is an AI design agent for independent shop owners. Tell it what your shop is for, where it is and what inspires it. The agent asks **Qloo** what people with that taste actually love, across books, artists, brands, places and neighbourhoods, then turns that evidence into **four genuinely different, buildable shop interiors** in a live 3D studio. Every design choice cites the Qloo signal behind it, and every layout is checked for fit and walkability before you see it.

A chatbot will tell you a cozy bookshop café needs "warm wood and Edison bulbs". ShopArtist tells you what *your* crowd loves, and shows you where to put it.

<p align="center">
  <a href="https://k2cmgsjmnkueye2dargcqkb5n40gpuqg.lambda-url.us-east-1.on.aws/"><img src="https://img.shields.io/badge/TRY%20IT%20LIVE-FF2E3F?style=for-the-badge&logo=awslambda&logoColor=white" alt="Live demo on AWS Lambda"></a>
  <a href="https://github.com/azharizz/ShopArtist"><img src="https://img.shields.io/badge/OPEN%20SOURCE-14121A?style=for-the-badge&logo=github&logoColor=white" alt="Source repository"></a>
  <img src="https://img.shields.io/badge/POWERED%20BY%20QLOO%20%C2%B7%20AGENTIC%20TOOL%20LOOP-FFD400?style=for-the-badge" alt="Powered by Qloo, agentic tool loop">
</p>

## Inspiration

Opening a small shop is a bet on taste. The owner of a new bookshop-café knows the *feeling* they want: a place where neighbours linger, couples read side by side, someone discovers a new author. Turning that feeling into a floor plan is the hard part. Designers are expensive, and generic AI tools answer with the average of the internet: neutral tones, a few plants, Edison bulbs. That is a guess dressed up as a design, and it looks like every other shop.

What a small shop really needs to know is cultural: *what do the people I want to attract actually love, and what does that mean for this room?* That is exactly what Qloo's taste graph knows. We wanted an agent that asks Qloo first and designs second.

## What it does

<p align="center">
  <img src="https://raw.githubusercontent.com/azharizz/ShopArtist/main/submission/assets/film-hero.gif" alt="The ShopArtist logo slams in from a speech bubble that morphs into its starburst" width="64%">
</p>

| ShopArtist capability | What it does | Why it matters |
| --- | --- | --- |
| **1 · Name the idea** | Name the shop, mix what it sells (books, coffee, fashion, art, your own idea) and say why it exists. | The agent starts from the owner's intent, not a template. |
| **2 · Ground it in real taste** | City, vibe and an inspiration. Qloo `/search` resolves "Blue Bottle Coffee" to the real place at 450 W 15th St, New York. | The research starts from facts the owner can recognise. |
| **3 · An agent researches it** | A real tool-calling loop: Qloo taste tags, cross-domain insights (books, artists, brands, movies), taste-ranked places, a heatmap; then it browses 200+ fixtures and drafts layouts. | Cultural intelligence, not an LLM's average, decides the design. |
| **4 · Four directions, with evidence** | Four distinct interiors: different styles, palettes, windows and shelf formations. Each decision cites a Qloo result, kept separate from the AI's own interpretation. | The owner sees *why*, and can trust or challenge it. |
| **5 · Build it in 3D** | One click builds the chosen direction into a live three.js shop: orbit, move fixtures, recolour, save versions. | From a feeling to a room you can walk around, in minutes. |
| **6 · A sidekick that edits** | "Rearrange the shop and add 8 bookshelves" in plain words. The AI spawns real catalog fixtures, deletes and rearranges, and every change is validated before it lands. | Iterating is a conversation, not a CAD course. |
| **7 · 200+ fixtures, and new ones** | 210 preloaded fixtures. Need one that doesn't exist? Describe it; the asset agent drafts it, tests the geometry, renders three views, gets a vision review, and saves it as a reference for next time. | The catalog grows with every shop. |

## Product walkthrough

<table>
  <tr>
    <td width="50%"><img src="https://raw.githubusercontent.com/azharizz/ShopArtist/main/submission/assets/film-problem.gif" alt="An LLM alone answers beige and gets stamped GUESS; ShopArtist asks Qloo's taste graph instead"><br><sub><strong>The problem.</strong> An LLM on its own answers "beige". ShopArtist asks Qloo's taste graph instead.</sub></td>
    <td width="50%"><img src="https://raw.githubusercontent.com/azharizz/ShopArtist/main/submission/assets/film-setup.gif" alt="Naming the shop and choosing the mix in the real app"><br><sub><strong>1 · Name the idea.</strong> The real setup flow: name, mix, the reason the shop exists.</sub></td>
  </tr>
  <tr>
    <td width="50%"><img src="https://raw.githubusercontent.com/azharizz/ShopArtist/main/submission/assets/film-search.gif" alt="Qloo search resolves Blue Bottle Coffee to real places"><br><sub><strong>2 · Real inspirations.</strong> Qloo search turns a name into real entities.</sub></td>
    <td width="50%"><img src="https://raw.githubusercontent.com/azharizz/ShopArtist/main/submission/assets/film-agent.gif" alt="The agent's tool calls lighting up beside a time-lapse of the real research run"><br><sub><strong>3 · The agent.</strong> Each tool call lights up as the real 3 min 41 s run plays at ×9.</sub></td>
  </tr>
  <tr>
    <td width="50%"><img src="https://raw.githubusercontent.com/azharizz/ShopArtist/main/submission/assets/film-evidence.gif" alt="Four direction cards fan out; Qloo evidence and AI interpretation are highlighted separately"><br><sub><strong>4 · Evidence, not vibes.</strong> Qloo evidence in red, the AI's interpretation in blue.</sub></td>
    <td width="50%"><img src="https://raw.githubusercontent.com/azharizz/ShopArtist/main/submission/assets/film-map.gif" alt="Qloo heatmap of New York with 1,519 map cells"><br><sub><strong>Where the taste lives.</strong> Qloo's heatmap returned 1,519 cells for this idea.</sub></td>
  </tr>
  <tr>
    <td width="50%"><img src="https://raw.githubusercontent.com/azharizz/ShopArtist/main/submission/assets/film-build.gif" alt="Build this direction: setup, build, place, open"><br><sub><strong>5 · Build it.</strong> The real build run, then "Your shop is ready!".</sub></td>
    <td width="50%"><img src="https://raw.githubusercontent.com/azharizz/ShopArtist/main/submission/assets/film-studio.gif" alt="The live 3D studio and the AI sidekick checking an edit"><br><sub><strong>6 · The studio.</strong> Live 3D, a sidekick that edits in plain words, checked before it lands.</sub></td>
  </tr>
  <tr>
    <td width="50%"><img src="https://raw.githubusercontent.com/azharizz/ShopArtist/main/submission/assets/film-catalog.gif" alt="200+ fixtures scroll by; a new fixture is described with an existing one as reference"><br><sub><strong>7 · 200+ fixtures, and new ones.</strong> Describe it, pick a reference, the agent builds and reviews it.</sub></td>
    <td width="50%"><img src="https://raw.githubusercontent.com/azharizz/ShopArtist/main/submission/assets/film-why.gif" alt="Six Qloo capability tiles: search, tags, insights, cross-domain, places, heatmap"><br><sub><strong>Why Qloo.</strong> Six Qloo capabilities, each doing a real job in the agent.</sub></td>
  </tr>
</table>

| Landing | Step 1 · the idea | Step 2 · Qloo search |
| --- | --- | --- |
| ![ShopArtist landing page: Good taste. Great space.](https://raw.githubusercontent.com/azharizz/ShopArtist/main/submission/screenshots/landing.jpg) | ![Name the shop and choose the mix](https://raw.githubusercontent.com/azharizz/ShopArtist/main/submission/screenshots/step1-mix.jpg) | ![Inspiration search showing real Blue Bottle Coffee locations from Qloo](https://raw.githubusercontent.com/azharizz/ShopArtist/main/submission/screenshots/step2-search.jpg) |

| The agent at work | Four directions | Places and the taste map |
| --- | --- | --- |
| ![Research in progress with the live agent log](https://raw.githubusercontent.com/azharizz/ShopArtist/main/submission/screenshots/research-live.jpg) | ![Direction cards citing Qloo research references](https://raw.githubusercontent.com/azharizz/ShopArtist/main/submission/screenshots/directions-2.jpg) | ![Local reference places and the Qloo heatmap of New York](https://raw.githubusercontent.com/azharizz/ShopArtist/main/submission/screenshots/places-map.jpg) |

| The live 3D studio | The AI sidekick | The asset catalog |
| --- | --- | --- |
| ![Three.js shop with the sidekick panel](https://raw.githubusercontent.com/azharizz/ShopArtist/main/submission/screenshots/studio-3d.jpg) | ![Sidekick returns a checked edit plan](https://raw.githubusercontent.com/azharizz/ShopArtist/main/submission/screenshots/sidekick.jpg) | ![Asset catalog with Create an asset](https://raw.githubusercontent.com/azharizz/ShopArtist/main/submission/screenshots/asset-catalog.jpg) |

## How the agent works

<p align="center">
  <img src="https://raw.githubusercontent.com/azharizz/ShopArtist/main/submission/assets/agent-loop.gif" alt="The agent's tool loop: brief, Qloo tags, Qloo search, Qloo insights, catalog, draft, checks, four directions; rejected proposals are revised and resubmitted" width="100%">
</p>

1. **Brief.** The owner's idea, purpose, city and inspirations arrive as data, never as instructions.
2. **Taste tags.** `search_taste_tags` calls Qloo `/v2/tags` for two or three precise tags (ambience, décor, genre, place categories).
3. **Real inspirations.** `search_inspirations` calls Qloo `/search` and only uses a candidate whose name and description clearly match.
4. **Insights.** `research_taste` calls Qloo `/v2/insights` with the chosen tags and location: cross-domain affinities (books, artists, brands, movies), taste-ranked places within the radius, and a `urn:heatmap` of where the taste clusters.
5. **Catalog.** `list_assets` and `get_asset_details` browse 200+ fixtures with real footprints, then the agent picks what fits.
6. **Draft.** `create_design_directions` submits directions with moves, additions, palettes and decisions, each citing evidence IDs.
7. **Checks.** The server validates every proposal: inside the room, no overlaps, entrance reachable, evidence IDs that Qloo actually returned, and no duplicate of another direction. A vision model then reviews a three-view render. A rejected proposal goes back with the exact reason, and the agent revises.

| The agent can | The agent cannot |
| --- | --- |
| Cite only IDs that Qloo returned in this session. | Invent a taste signal, a place or a score. |
| Move and add catalog fixtures, choose palettes, windows and formations. | Place a fixture outside the room or block the entrance; the server rejects it. |
| Propose a new custom fixture for the catalog. | Ship it unreviewed: it is drafted, tested, rendered and reviewed first. |
| Explain its interpretation of the evidence. | Present that interpretation as Qloo data; the two are shown apart. |

## Why Qloo is the difference

<p align="center">
  <img src="https://raw.githubusercontent.com/azharizz/ShopArtist/main/submission/assets/qloo-inside-shopartist.png" alt="What Qloo does inside ShopArtist: Search, Tags, Insights, Cross-domain, Places, Heatmap" width="80%">
</p>

Take Qloo away and ShopArtist becomes one more LLM guessing "warm wood and plants". With Qloo, the same idea ("a romantic social bookshop and coffee shop in New York") came back with real signals: *Casual, Intimate, Authentic, Cozy, Trendy, Inviting, Chic, Bustling*; real New York reference places like Voyager Espresso and Café Integral; and a heatmap of 1,519 cells showing where that taste lives. Those signals choose the palette, the formation, the fixtures, and the story each direction tells.

## How we built it

<p align="center">
  <img src="https://raw.githubusercontent.com/azharizz/ShopArtist/main/submission/assets/architecture.gif" alt="Architecture: the browser streams from one AWS Lambda behind a Function URL; the Lambda calls Qloo, the Nebius LLM and a vision reviewer, and persists to S3 and DynamoDB" width="100%">
</p>

| Technology | Role in ShopArtist |
| --- | --- |
| **Qloo API** (`hackathon.api.qloo.com`) | `/search`, `/v2/tags`, `/v2/insights` (cross-domain entities, places with location and radius, `urn:heatmap`). The agent's ground truth. |
| **Agentic tool loop** | A tool-calling agent written on the Claude Messages SDK, bridged to an OpenAI-compatible endpoint. Forced tool order, schema-validated arguments, server-side checks, self-repair of malformed JSON. |
| **Nebius AI Studio** | Nemotron for the agent's reasoning and tool calls; Nemotron VL for visual review of rendered rooms and fixtures. |
| **React 19 · Vite · TypeScript** | The Pop Art product: guided setup, research loader with live agent progress, direction cards, design library. |
| **three.js** | The live 3D studio, plus server-side three-view renders (via `sharp`) for the vision reviewer. |
| **Leaflet + OpenStreetMap** | The interactive Qloo taste heatmap. |
| **Express · Server-Sent Events** | The API; research and builds stream progress to the browser as they happen. |
| **Model Context Protocol** | A local asset MCP server (`list_assets`, `inspect_asset`, `preview_asset`, `save_asset`) for compatible clients. |
| **AWS Lambda + Function URL** | The whole app in one function via the Lambda Web Adapter, with response streaming for long agent runs. |
| **Amazon S3 · Amazon DynamoDB** | S3 keeps each owner's projects, research and custom assets; DynamoDB holds an atomic global cap on AI actions. |
| **Remotion · Qwen3-TTS** | The 3-minute launch film: motion graphics from code, narration by Qwen3-TTS, an original score. |

## Challenges we ran into

- **An agent that loops on its own mistakes.** Early runs spent all 40 steps resubmitting the same invalid proposal. We fixed the structure, not the symptom: short ID aliases instead of UUIDs, failed calls pruned from history, nearest-free-spot placement, schema limits the model can see, and a repair pass when the model's JSON breaks.
- **Four directions that look like one.** The model kept the same row of shelves every time. Distinct renderer styles, preset shelf formations and a duplicate-room check now make the four options genuinely different.
- **Honest evidence.** It is easy for an LLM to "cite" a signal it never received. Evidence IDs are checked against what Qloo returned, and the UI keeps Qloo evidence apart from the AI's interpretation.
- **Long agent runs on serverless.** Research can take minutes. A streaming Function URL, per-request S3 persistence and an atomic DynamoDB counter made it work on AWS Lambda without a server to babysit.

## Accomplishments we're proud of

<p align="center">
  <img src="https://raw.githubusercontent.com/azharizz/ShopArtist/main/submission/assets/film-finale.gif" alt="ShopArtist finale: good taste, great space" width="64%">
</p>

- A real, end-to-end agent: Qloo research to four evidence-backed designs to a live 3D shop, deployed and usable today.
- A design system with a point of view: Pop Art throughout, from the landing page to the loading screen to the 3D studio.
- An asset agent that grows the catalog, with every new fixture tested, rendered and reviewed before it is saved.
- A 3-minute launch film built from the real recording, with an original orchestral score.

## What we learned

The interesting work was not making the model creative. It was making it *grounded*: asking Qloo before designing, citing only what Qloo returned, and letting the server, not the model, decide whether a layout is real. An agent becomes trustworthy when its tools, checks and evidence are stricter than its imagination.

## What's next

- Product-level taste: use Qloo to recommend which books, records and brands to stock, not just how the room should feel.
- Real dimensions in: import a measured floor plan and real fixtures from suppliers.
- A shareable "taste brief" PDF the owner can hand to a carpenter.
- Testing with independent shop owners in a few cities.

## Honest limits

- ShopArtist designs **conceptual layouts**, not CAD or building-code certified plans; check circulation, accessibility and safety before building.
- Qloo affinities are aggregate cultural signals, not foot traffic, sales or individual preference.
- The public demo is limited to 200 AI actions in total, because the model provider cannot rate-limit per key; the demo merchandise data is synthetic and labelled as such.
- AI visual review is advisory and can be unavailable or wrong; inspect the renders.

## Try it

- **Live demo:** [ShopArtist on AWS Lambda](https://k2cmgsjmnkueye2dargcqkb5n40gpuqg.lambda-url.us-east-1.on.aws/)
- **Source:** [github.com/azharizz/ShopArtist](https://github.com/azharizz/ShopArtist)
- **Run locally:** `npm ci && npm run dev` with `QLOO_API_KEY` and `AGENT_*` in `.env`
- **README:** [README.md](https://github.com/azharizz/ShopArtist/blob/main/README.md)
