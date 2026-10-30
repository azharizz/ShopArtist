import { useCallback, useState } from "react";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { DesignBrief } from "../shared/design";
import type { RoomDesign } from "../shared/room";
import type { DesignStudy, TastePoint, TasteEntity } from "../shared/research";
import { api } from "./api";

export function GeographicTasteMap({ points, location, places = [] }: { points: TastePoint[]; location: string; places?: TasteEntity[] }) {
  const mountMap = useCallback((node: HTMLDivElement | null) => {
    if (!node || (!points.length && !places.some(p => p.latitude != null && p.longitude != null))) return;
    const map = L.map(node, { scrollWheelZoom: false, preferCanvas: true, zoomControl: true });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>', maxZoom: 19,
    }).addTo(map);
    const bounds = L.latLngBounds([]);
    for (const point of points) {
      const latLng: L.LatLngExpression = [point.latitude, point.longitude]; bounds.extend(latLng);
      const color = point.affinity >= .75 ? "#dc476b" : point.affinity >= .5 ? "#d89844" : "#5b9388";
      L.circleMarker(latLng, { radius: 3, stroke: false, fillColor: color, fillOpacity: .72 }).bindTooltip(`Affinity ${Math.round(point.affinity * 100)}%`).addTo(map);
    }
    for (const place of places) {
      if (place.latitude == null || place.longitude == null) continue;
      const latLng: L.LatLngExpression = [place.latitude, place.longitude]; bounds.extend(latLng);
      const label = document.createElement("span"); label.textContent = place.name;
      L.circleMarker(latLng, { radius: 6, color: "#25212c", weight: 2, fillColor: "#ffffff", fillOpacity: 1 }).bindTooltip(label).addTo(map);
    }
    map.fitBounds(bounds, { padding: [15, 15], maxZoom: 13 });
    const timer = window.setTimeout(() => map.invalidateSize(), 150);
    return () => { window.clearTimeout(timer); map.remove(); };
  }, [points, places]);
  if (!points.length && !places.some(p => p.latitude != null && p.longitude != null)) return <div className="taste-map-empty"><MapPin size={22} /><p>No geographic data returned. Add a location and research again.</p></div>;
  return <div className="geographic-map-wrap">
    <div className="geographic-map" ref={mountMap} role="img" aria-label={`Qloo geographic affinity map for ${location}; ${points.length} cells`} />
    <div className="map-legend"><span><i className="legend-low" /> Lower</span><span><i className="legend-mid" /> Medium</span><span><i className="legend-high" /> Higher affinity</span><span>{points.length.toLocaleString()} cells</span><span>○ Reference place</span></div>
    <p className="small muted">Aggregate cultural affinity, not reviews, foot traffic or a sales forecast. Map tiles © OpenStreetMap contributors.</p>
  </div>;
}

export function StudyResults({ study, selectedId, onSelect, compact = false, buildAssets = false }: { study: DesignStudy; selectedId?: string; onSelect?: (id: string) => void; compact?: boolean; buildAssets?: boolean }) {
  const research = study.research;
  return <div className={`study-results ${compact ? "compact" : ""}`}>
    <div className="study-summary"><div><p className="study-kicker">QLOO RESEARCH · AI AGENT</p><h3>What fits your idea?</h3><p>Qloo connects {research.anchors.map(a => a.name).join(", ") || "your location"} with these cultural signals{research.location !== "No location" ? ` in ${research.location}` : ""}. The AI Agent groups the evidence into design directions.</p></div><div className="study-cues">{research.tags.slice(0, 8).map(tag => <span key={tag.id}>{tag.name}</span>)}</div><p className="small muted">Percentages are Qloo affinity scores, not star ratings or a probability of sales.</p></div>
    {!compact && <div className="direction-section"><div className="direction-heading"><h3>Choose your direction</h3><p>Each concept uses the research differently. Pick one to generate your 3D starting point. Material and lighting ideas are descriptive; the preview uses the available colors, windows, and fixtures.{buildAssets && " If the agent identifies a catalog gap, building may also create and review a custom fixture."}</p></div>
      <div className="direction-grid">{study.directions.map((direction, i) => <button type="button" key={direction.id} className={`direction-card ${selectedId === direction.id ? "selected" : ""}`} aria-pressed={selectedId === direction.id} onClick={() => onSelect?.(direction.id)}>
        <span className="direction-number">0{i + 1} <span>{selectedId === direction.id ? "SELECTED" : "EXPLORE"}</span></span>
        <h4>{direction.name}</h4><p>{direction.description}</p>
        <span className="direction-evidence">Qloo evidence: {direction.evidence.map(item => item.name).join(" · ")}</span>
        <span className="direction-colors" aria-label="Proposed colours">{[direction.room.wall, direction.room.floor, direction.room.accent].map((color, index) => <i key={index} style={{ background: color }} />)}</span>
        {direction.visualReview && <span className="direction-review"><strong>Visual review {direction.visualReview.acceptable ? "passed" : "needs attention"}</strong>: {direction.visualReview.critique} <small>Review uses simplified room views without walls or lighting.</small></span>}
        {!!direction.decisions?.length && <span className="direction-decisions">{direction.decisions.map((decision, index) => <span key={index} style={{ display: "block", marginTop: 8 }}><strong>{decision.choice}</strong> — AI interpretation: {decision.interpretation}<br /><small>{decision.evidence.length ? `Qloo signals: ${decision.evidence.map(item => item.name).join(", ")}` : "AI suggestion based on the brief or practical needs"}</small></span>)}</span>}
        <span className="direction-changes">{direction.changes.length ? direction.changes.slice(0, 2).join(" · ") : "No fixture moves accepted; position them yourself in the editor."}</span>
        {buildAssets && direction.assetIdea && <span className="direction-asset"><strong>New fixture idea</strong><br />{direction.assetIdea.brief}<br /><small>{direction.assetIdea.reason}</small></span>}
      </button>)}</div></div>}
    {!!research.places?.length && <section className="study-map-section"><h3>Local reference places</h3><p>{research.placesContext ?? "Qloo returned these places for the selected taste and location."} They are candidates for inspiration; check their relevance to your shop.</p><ul>{research.places.map(place => <li key={place.id}><strong>{place.name}</strong>{place.description && <> — {place.description}</>}</li>)}</ul></section>}
    <div className="study-map-section"><div><h3>Explore the local taste map</h3><p>See where affinity for this idea varies across {research.location || "the area"}.</p></div><GeographicTasteMap points={research.points} location={research.location} places={research.places} /></div>
    {research.warnings.map(w => <p className="taste-warning" key={w}>{w}</p>)}
  </div>;
}

export function TasteStudio({ brief, onBrief, room, forNewProject, study, onStudy, selectedId, onSelect, onApply }: {
  brief: DesignBrief; onBrief: (brief: DesignBrief) => void; room: RoomDesign; forNewProject: boolean;
  study: DesignStudy | null; onStudy: (study: DesignStudy | null) => void; selectedId: string; onSelect: (id: string) => void; onApply?: () => Promise<void>;
}) {
  const [busy, setBusy] = useState(false), [error, setError] = useState("");
  const [inspirationQuery, setInspirationQuery] = useState("");
  const [matches, setMatches] = useState<TasteEntity[]>([]);
  const [searchBusy, setSearchBusy] = useState(false);
  async function findInspirations() {
    setSearchBusy(true); setError("");
    try { const result = await api<{ results: TasteEntity[] }>(`/qloo/search?query=${encodeURIComponent(inspirationQuery)}`); setMatches(result.results); }
    catch (e) { setError((e as Error).message); } finally { setSearchBusy(false); }
  }
  const dirty = !!study && (brief.location !== study.brief.location || brief.direction !== study.brief.direction || brief.purpose !== study.brief.purpose || JSON.stringify(brief.inspirations) !== JSON.stringify(study.brief.inspirations));
  async function research() {
    setBusy(true); setError(""); onStudy(null); onSelect("");
    try { const result = await api<DesignStudy>("/ai/research", { brief, room, forNewProject }); onStudy(result); }
    catch (e) { setError((e as Error).message); }
    finally { setBusy(false); }
  }
  return <div className="taste-studio">
    <div className="taste-studio-fields">
      <label>Your shop idea<textarea rows={3} value={brief.direction ?? ""} maxLength={500} placeholder="A romantic bookshop and café with quiet corners and warm light…" onChange={e => onBrief({ ...brief, direction: e.target.value })} /></label>
      <label>Location <small>optional, for local taste and the map</small><input maxLength={160} value={brief.location} placeholder="New York City" onChange={e => onBrief({ ...brief, location: e.target.value, latitude: null, longitude: null })} /></label>
    </div>
    <div className="inspiration-search">
      <label>Inspiration <small>optional: search for a place, book, artist, brand, or film</small><input value={inspirationQuery} maxLength={100} onChange={e => setInspirationQuery(e.target.value)} placeholder="e.g. Blue Bottle Coffee" /></label>
      <button type="button" className="button subtle small" disabled={searchBusy || inspirationQuery.trim().length < 2} onClick={() => void findInspirations()}>{searchBusy ? "Searching…" : "Find inspiration"}</button>
      {!!matches.length && <div className="taste-chips" aria-label="Inspiration search results">{matches.map(item => <button type="button" key={item.id} className="button subtle small" onClick={() => { if (brief.inspirations.length < 12 && !brief.inspirations.some(x => x.startsWith(`${item.id}|`))) onBrief({ ...brief, inspirations: [...brief.inspirations, `${item.id}|${item.name}`] }); setMatches([]); }}>{item.name}{item.detail ? ` — ${item.detail}` : ""}</button>)}</div>}
      {!!brief.inspirations.length && <div className="selected-inspirations">{brief.inspirations.map(item => <button type="button" key={item} onClick={() => onBrief({ ...brief, inspirations: brief.inspirations.filter(value => value !== item) })} aria-label={`Remove ${item.split("|")[1] ?? item}`} >{item.split("|")[1] ?? item} <span>×</span></button>)}</div>}
    </div>
    <button type="button" className="button primary research-submit" disabled={busy || !(brief.direction || brief.purpose).trim()} onClick={() => void research()}><Sparkles size={17} />{busy ? "AI Agent is researching…" : "Research my idea"}</button>
    <p className="small muted">The AI Agent uses your idea and location to research Qloo and propose designs. Relevant taste tags and the location are sent to Qloo.{forNewProject && " When you build a direction, generated fixture previews are sent to the AI Agent for visual review."} This can take several minutes.</p>
    {error && <p role="alert" className="taste-error">{error}</p>}
    {dirty && <p role="status" className="taste-warning">Your idea changed. Research again to update the directions.</p>}
    {study && <><StudyResults study={study} selectedId={selectedId} onSelect={onSelect} buildAssets={forNewProject} />
      {onApply && <button type="button" className="button primary" disabled={busy || dirty || !selectedId} onClick={async () => { setBusy(true); setError(""); try { await onApply(); } catch (e) { setError((e as Error).message); } finally { setBusy(false); } }}>Preview selected direction <ArrowRight size={16} /></button>}
    </>}
  </div>;
}
