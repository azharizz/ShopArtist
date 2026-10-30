import type { DesignBrief } from "../shared/design.js";
import type { TasteEntity, TastePoint, TasteResearch } from "../shared/research.js";
import { applyArrangement, stylePalettes, type InteriorStyle, type RoomDesign } from "../shared/room.js";

const base = "https://hackathon.api.qloo.com";
const tagPattern = /^urn:tag:[a-z0-9_:.\-]+$/i;
const idPattern = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;

async function qloo(path: string, params: Record<string, string>) {
  const key = process.env.QLOO_API_KEY;
  if (!key) throw new Error("Qloo is not configured. Add QLOO_API_KEY to the server environment.");
  const url = new URL(path, base);
  for (const [name, value] of Object.entries(params)) url.searchParams.set(name, value);
  let response: Response;
  try {
    response = await fetch(url, { headers: { "X-Api-Key": key, Accept: "application/json" }, signal: AbortSignal.timeout(15000) });
  } catch {
    throw new Error("Could not reach Qloo. Please try again.");
  }
  if (!response.ok) throw new Error(`Qloo returned ${response.status}. Check your location, API key, or try again.`);
  return response.json() as Promise<any>;
}

function entity(item: any): TasteEntity | null {
  const id = item?.entity_id ?? item?.tag_id ?? item?.id;
  if (typeof id !== "string" || typeof item?.name !== "string") return null;
  return {
    id, name: item.name.trim(),
    type: Array.isArray(item.types) ? item.types[0] ?? "" : item.type ?? "",
    ...(typeof item.disambiguation === "string" && item.disambiguation ? { detail: item.disambiguation } : {}),
    ...(Number.isFinite(item.location?.lat) && Number.isFinite(item.location?.lon) ? { latitude: item.location.lat, longitude: item.location.lon } : {}),
    ...(typeof item.properties?.short_description === "string" ? { description: item.properties.short_description.slice(0, 500) } : {}),
    ...(typeof item.query?.affinity === "number" ? { affinity: item.query.affinity } : {}),
  };
}

export async function searchQloo(query: string): Promise<TasteEntity[]> {
  const responses = await Promise.all([
    qloo("/search", { query, take: "8", types: "urn:entity:artist,urn:entity:brand,urn:entity:book,urn:entity:movie" }),
    qloo("/search", { query, take: "8", types: "urn:entity:place" }),
  ]);
  if (responses.some(response => !Array.isArray(response.results))) throw new Error("Qloo returned an unexpected search response.");
  const matches: TasteEntity[] = responses.flatMap(response => response.results.map(entity)).filter((item: TasteEntity | null): item is TasteEntity => !!item && idPattern.test(item.id));
  return matches.filter((item, i) => matches.findIndex(other => other.id === item.id) === i)
    .sort((a, b) => Number(b.name.toLowerCase() === query.toLowerCase()) - Number(a.name.toLowerCase() === query.toLowerCase()));
}

export async function searchQlooTags(query: string): Promise<TasteEntity[]> {
  const response = await qloo("/v2/tags", { "filter.query": query, take: "12" });
  if (!Array.isArray(response.results?.tags)) throw new Error("Qloo returned an unexpected tag response.");
  return response.results.tags.map(entity).filter((item: TasteEntity | null): item is TasteEntity => !!item && item.id.length <= 80 && tagPattern.test(item.id));
}

// Qloo supplies taste signals; these transparent rules interpret them into the app's existing editable assets.
export function designFromTaste(brief: DesignBrief, room: RoomDesign, tags: TasteEntity[], shelves: import("../shared/types.js").Shelf[]) {
  const text = `${brief.direction ?? ""} ${brief.purpose} ${brief.tags.join(" ")} ${tags.map(t => t.name).join(" ")}`.toLowerCase();
  let style: InteriorStyle = room.style;
  if (/industrial|urban|warehouse|brick|metal/.test(text)) style = "industrial";
  else if (/futur|neon|cyber|space.age/.test(text)) style = "futuristic";
  else if (/vintage|classic|heritage|retro|antique/.test(text)) style = "classic";
  else if (/modern|minimal|scandinavian|japandi|japanese|clean/.test(text)) style = "modern";
  else if (/cozy|cosy|intimate|warm|authentic/.test(text)) style = "classic";
  else if (/energetic|playful|new wave|disco/.test(text)) style = "futuristic";
  const palette = stylePalettes[style];
  const arrangement = /gallery|art|exhibit/.test(text) ? "gallery" : /social|communal|gather|community/.test(text) ? "islands" : "perimeter";
  const next = applyArrangement(room, shelves, arrangement);
  Object.assign(next, { style, wall: palette.wall, floor: palette.floor, accent: palette.accent, window: palette.window });
  if (/cozy|cosy|intimate|warm/.test(text)) Object.assign(next, { wall: "#eee2d0", floor: "#c9a983", accent: "#956d5a" });
  else if (/energetic|playful|colorful|colourful|disco|new wave/.test(text)) next.accent = "#e36385";
  if (/botanical|garden|nature|earthy/.test(text)) next.accent = "#718b70";
  if (/dark|moody/.test(text)) Object.assign(next, { wall: "#303b3a", floor: "#59534b" });
  // Explicit color words in the owner's brief take precedence over the starter palette.
  const words = `${brief.direction ?? ""} ${brief.purpose}`.toLowerCase();
  const colors: [RegExp, string][] = [[/\bpink\b/, "#e99db5"], [/\bblue\b/, "#648bb5"], [/\bgreen\b/, "#7f9b77"], [/\byellow\b/, "#e5c764"], [/\bterracotta\b/, "#c9765b"], [/\bpurple\b/, "#a18cba"], [/\bred\b/, "#c45f59"]];
  const color = colors.find(([pattern]) => pattern.test(words));
  if (color) next.accent = color[1];
  const influences = tags.slice(0, 4).map(t => t.name);
  return { room: next, influences, explanation: `ShopArtist uses matching words from your brief and Qloo tags to suggest a ${style} starting palette and ${arrangement} arrangement. Unmatched ideas keep the starting style. Your existing furniture is retained; edit the preview freely before saving.` };
}

export async function researchQloo(brief: DesignBrief, room: RoomDesign, shelves: import("../shared/types.js").Shelf[], options: { placeTags?: string[]; includeProposal?: boolean; culturalTypes?: ("artist" | "brand" | "book" | "movie")[] } = {}): Promise<TasteResearch> {
  const anchors = brief.inspirations.flatMap(value => {
    const [id, ...parts] = value.split("|");
    return idPattern.test(id) ? [{ id, name: parts.join("|") || id, type: "" }] : [];
  });
  const tagSignals = brief.tags.filter(tag => tagPattern.test(tag));
  const location = brief.location.trim();
  if (!anchors.length && !tagSignals.length && !location && brief.latitude === null) throw new Error("Choose an inspiration or taste tag, or add a location to research its taste.");
  const signal: Record<string, string> = {};
  if (anchors.length) signal["signal.interests.entities"] = anchors.map(a => a.id).join(",");
  if (tagSignals.length) signal["signal.interests.tags"] = tagSignals.join(",");
  if (brief.latitude !== null && brief.longitude !== null) signal["signal.location"] = `POINT(${brief.longitude} ${brief.latitude})`;
  else if (location) signal["signal.location.query"] = location;
  const query = (type: string) => qloo("/v2/insights", { ...signal, "filter.type": type, take: "8" });
  const heatmap = (anchors.length || tagSignals.length) && (location || brief.latitude !== null)
    ? qloo("/v2/insights", { "filter.type": "urn:heatmap", ...(anchors.length ? { "signal.interests.entities": anchors.map(a => a.id).join(",") } : {}), ...(tagSignals.length ? { "signal.interests.tags": tagSignals.join(",") } : {}), ...(brief.latitude !== null && brief.longitude !== null ? { "filter.location": `POINT(${brief.longitude} ${brief.latitude})`, "filter.location.radius": String(brief.radius) } : { "filter.location.query": location, "filter.location.radius": String(brief.radius) }) })
    : Promise.resolve(null);
  const culturalTypes = options.culturalTypes ?? ["artist", "brand"];
  const placeLocation: Record<string, string> = location ? { "filter.location.query": location } : { "filter.location": `POINT(${brief.longitude} ${brief.latitude})`, "filter.location.radius": String(brief.radius) };
  async function findPlaces() {
    if (!location && brief.latitude === null) return { results: { entities: [] } };
    const categories = options.placeTags?.length ? options.placeTags : [undefined];
    const batches = await Promise.allSettled(categories.map(tag => qloo("/v2/insights", { ...signal, "filter.type": "urn:entity:place", ...(tag ? { "filter.tags": tag } : {}), ...placeLocation, take: "8" })));
    const succeeded = batches.filter((batch): batch is PromiseFulfilledResult<any> => batch.status === "fulfilled");
    if (!succeeded.length) throw new Error("Place searches failed.");
    const lists = succeeded.map(batch => Array.isArray(batch.value?.results?.entities) ? batch.value.results.entities : []);
    const entities: any[] = [];
    for (let index = 0; index < 8 && entities.length < 8; index++) for (const list of lists) {
      const item = list[index];
      if (item && !entities.some(existing => (existing.entity_id ?? existing.id) === (item.entity_id ?? item.id))) entities.push(item);
      if (entities.length >= 8) break;
    }
    return { results: { entities }, partial: succeeded.length < batches.length };
  }
  const [tagResult, ambienceResult, mapResult, placeResult, decorResult, ...culturalResults] = await Promise.allSettled([
    query("urn:tag"),
    qloo("/v2/insights", { ...signal, "filter.type": "urn:tag", "filter.tag.types": "urn:tag:ambience:qloo", take: "8" }),
    heatmap,
    findPlaces(),
    qloo("/v2/insights", { ...signal, "filter.type": "urn:tag", "filter.tag.types": "urn:tag:decor:qloo", take: "8" }),
    ...culturalTypes.map(type => query(`urn:entity:${type}`)),
  ]);
  const warnings: string[] = [];
  if ((location || brief.latitude !== null) && !options.placeTags?.length && options.includeProposal === false) warnings.push("No place category was selected; local results may not match the shop type.");
  function unpack(result: PromiseSettledResult<any>, key: string, label: string): TasteEntity[] {
    if (result.status === "rejected") { warnings.push(`${label} could not be loaded.`); return []; }
    const list = result.value?.results?.[key];
    if (!Array.isArray(list)) { warnings.push(`${label} returned an unexpected response.`); return []; }
    return list.map(entity).filter((item: TasteEntity | null): item is TasteEntity => !!item);
  }
  const generalTags = unpack(tagResult, "tags", "Taste tags");
  const ambience = ambienceResult.status === "fulfilled" && Array.isArray(ambienceResult.value?.results?.tags)
    ? ambienceResult.value.results.tags.map(entity).filter((item: TasteEntity | null): item is TasteEntity => !!item) : [];
  const decor = decorResult.status === "fulfilled" && Array.isArray(decorResult.value?.results?.tags) ? decorResult.value.results.tags.map(entity).filter((tag: TasteEntity | null): tag is TasteEntity => !!tag) : [];
  const tags: TasteEntity[] = [...ambience, ...decor, ...generalTags].filter((tag, i, all) => all.findIndex(t => t.id === tag.id) === i).slice(0, 12);
  const cultural = Object.fromEntries(culturalTypes.map((type, index) => [type, unpack(culturalResults[index], "entities", type)]));
  const artists = cultural.artist ?? [];
  const brands = cultural.brand ?? [];
  let places: TasteEntity[];
  let placesContext = options.placeTags?.length ? "Category-filtered taste-related places" : "Taste-related places; category not filtered";
  if (placeResult.status === "rejected" && (location || brief.latitude !== null)) {
    // shortcut: locality-only fallback is not taste-ranked; upgrade when Qloo supports the original signal combination.
    try {
      const fallback = await qloo("/v2/insights", { "filter.type": "urn:entity:place", ...(options.placeTags?.length ? { "filter.tags": options.placeTags.join(",") } : {}), ...(location ? { "filter.location.query": location } : { "filter.location": `POINT(${brief.longitude} ${brief.latitude})`, "filter.location.radius": String(brief.radius) }), take: "8" });
      places = Array.isArray(fallback.results?.entities) ? fallback.results.entities.map(entity).filter((item: TasteEntity | null): item is TasteEntity => !!item) : [];
      placesContext = "Local category candidates only; taste affinity unavailable";
      warnings.push("Taste-ranked places were unavailable; showing local category candidates without a taste ranking.");
    } catch { places = []; warnings.push("Local reference places could not be loaded."); }
  } else {
    places = unpack(placeResult, "entities", "Local reference places");
    if (placeResult.status === "fulfilled" && placeResult.value.partial) warnings.push("Some local place categories could not be loaded.");
  }
  if (!tags.length && !Object.values(cultural).some(items => items.length)) {
    const cause = [tagResult, ...culturalResults].find(r => r.status === "rejected");
    throw new Error(cause?.status === "rejected" ? cause.reason.message : "Qloo returned no taste results for this brief. Try another location or inspiration.");
  }
  let points: TastePoint[] = [];
  if (mapResult.status === "rejected") warnings.push("The geographic taste map is unavailable for this selection.");
  else if (mapResult.value) {
    const cells = mapResult.value.results?.heatmap;
    if (Array.isArray(cells)) points = cells.flatMap((cell: any) => {
      const latitude = cell?.location?.latitude, longitude = cell?.location?.longitude, affinity = cell?.query?.affinity;
      return Number.isFinite(latitude) && Number.isFinite(longitude) && Number.isFinite(affinity) ? [{ latitude, longitude, affinity }] : [];
    });
  }
  const ordered = [...points].sort((a, b) => b.affinity - a.affinity);
  const centroid = ordered.length ? { latitude: ordered.reduce((sum, point) => sum + point.latitude, 0) / ordered.length, longitude: ordered.reduce((sum, point) => sum + point.longitude, 0) / ordered.length } : undefined;
  const regions = centroid ? ["northwest", "northeast", "southwest", "southeast"].map(name => {
    const matching = ordered.filter(point => (point.latitude >= centroid.latitude ? "north" : "south") + (point.longitude >= centroid.longitude ? "east" : "west") === name);
    return { name, count: matching.length, meanAffinity: matching.length ? matching.reduce((sum, point) => sum + point.affinity, 0) / matching.length : 0 };
  }).filter(region => region.count > 0) : [];
  const geographicSummary = centroid ? { cellCount: ordered.length, minAffinity: ordered[ordered.length - 1].affinity, maxAffinity: ordered[0].affinity, centroid, regions, highest: ordered.slice(0, 5), lowest: ordered.slice(-5).reverse() } : undefined;
  return { source: "qloo", geographicSummary, cultural, location: location || (brief.latitude !== null ? "Selected coordinates" : "No location"), anchors: [...anchors, ...tagSignals.map(id => ({ id, name: id.split(":").at(-1)!.replaceAll("_", " "), type: "tag" }))], tags, artists, brands, places, placesContext, points, warnings, ...(options.includeProposal === false ? {} : { proposal: designFromTaste(brief, room, tags, shelves) }) };
}
