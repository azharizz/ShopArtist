import * as THREE from "three";
import { fixtureCatalog, fixtureKinds, createRoom, stylePalettes } from "../shared/room";
import { assetRenderers } from "../shared/asset-renderers";
import { buildGeneratedGeometry } from "../shared/generated-assets";
import type { AssetDefinition } from "../shared/assets/types";
import { api } from "./api";
import type { AssetRenderContext } from "../shared/asset-render-context";
import "./asset-catalog.css";
import "./scrollbars.css";

const root = document.querySelector<HTMLElement>("#catalog")!;
root.innerHTML = `<header><a href="/">← Back to ShopArtist</a><p class="eyebrow">SHOPARTIST / SHARED LIBRARY</p><h1>Asset catalog</h1><p>Browse built-in fixtures and create your own. The AI Agent can search this catalog when designing a shop.</p><p class="note">Previews use the modern room palette. Accent and style colors apply across the room, not individually to a fixture. Width and depth are placement footprints in metres; height is an approximate model size.</p></header><section class="create-asset" aria-labelledby="create-title"><h2 id="create-title">Create an asset</h2><p>Describe a fixture. The AI Agent will refine your brief, build it from simple shapes, review three-angle previews, and save it to your catalog.</p><form id="asset-form"><label for="asset-request">What would you like to create?</label><textarea id="asset-request" required minlength="5" maxlength="500" rows="3" placeholder="A small wooden display table with a warm accent top"></textarea><label for="asset-reference">Reference asset <span class="note">optional</span></label><select id="asset-reference"><option value="">Create from the description</option></select><button type="submit">Create and test asset</button><p class="note">Your description, selected reference and rendered previews are sent to the AI Agent. Up to three visual reviews may take several minutes. Assets use simple 3D shapes.</p><p id="asset-status" role="status" aria-live="polite"></p></form></section><div id="assets" class="assets"></div>`;
const list = document.querySelector<HTMLElement>("#assets")!;
const room = createRoom(["books"], "modern");
const palette = stylePalettes[room.style];
let renderer: THREE.WebGLRenderer | undefined;
try {
  renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
  renderer.setSize(480, 320);
  renderer.setPixelRatio(1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
} catch { /* Cards remain readable if WebGL is unavailable. */ }

let catalog: AssetDefinition[] = [];
const form = document.querySelector<HTMLFormElement>("#asset-form")!;
const status = document.querySelector<HTMLElement>("#asset-status")!;
const request = document.querySelector<HTMLTextAreaElement>("#asset-request")!;
const reference = document.querySelector<HTMLSelectElement>("#asset-reference")!;
const submit = form.querySelector<HTMLButtonElement>("button")!;
let initialAnchorHandled = false;
function renderCatalog() {
list.replaceChildren();
const chosen = reference.value;
reference.replaceChildren(new Option("Create from the description", ""));
for (const item of catalog) reference.add(new Option(item.label, item.id));
reference.value = chosen;
for (const asset of catalog) {
  const kind = asset.id;
  const card = document.createElement("article");
  card.id = kind;
  card.className = "asset";
  const preview = document.createElement("div");
  preview.className = "preview";
  const fallback = document.createElement("span");
  fallback.textContent = "3D preview unavailable";
  preview.append(fallback);
  if (renderer) {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#edece4");
    scene.add(new THREE.AmbientLight("#eef4ff", 1.7));
    const sun = new THREE.DirectionalLight("#ffffff", 3.5);
    sun.position.set(3, 12, 8); scene.add(sun);
    const fill = new THREE.DirectionalLight("#ccdfff", 1.2);
    fill.position.set(-8, 5, 0); scene.add(fill);
    const camera = new THREE.PerspectiveCamera(35, 1.5, 0.1, 100);
    camera.position.set(3.9, 2.8, 4.6); camera.lookAt(0, 0.8, 0);
    const group = new THREE.Group(); scene.add(group);
    const geometries: THREE.BufferGeometry[] = [], materials: THREE.Material[] = [], textures: THREE.Texture[] = [];
    const box: AssetRenderContext["box"] = (w, h, d, x, y, z, color, parent = scene, glow = false) => {
      const geometry = new THREE.BoxGeometry(w, h, d);
      const material = new THREE.MeshStandardMaterial({ color, roughness: 0.8, metalness: 0.05, ...(glow ? { emissive: color, emissiveIntensity: 1.5 } : {}) });
      geometries.push(geometry); materials.push(material);
      const mesh = new THREE.Mesh(geometry, material); mesh.position.set(x, y, z); parent.add(mesh); return mesh;
    };
    const round: AssetRenderContext["round"] = (radius, height, x, y, z, color, parent) => {
      const geometry = new THREE.CylinderGeometry(radius, radius * 0.9, height, 24);
      const material = new THREE.MeshStandardMaterial({ color, roughness: 0.6 });
      geometries.push(geometry); materials.push(material);
      const mesh = new THREE.Mesh(geometry, material); mesh.position.set(x, y, z); parent.add(mesh); return mesh;
    };
    const label: AssetRenderContext["label"] = (text, sub, w, h, color = room.wall, ink = "#303b32") => {
      const canvas = document.createElement("canvas"); canvas.width = 768; canvas.height = Math.round(768 * h / w);
      const ctx = canvas.getContext("2d")!; ctx.fillStyle = color; ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = ink; ctx.textAlign = "center"; ctx.font = "500 62px Georgia"; ctx.fillText(text, 384, canvas.height * 0.45, 720);
      ctx.font = "22px sans-serif"; ctx.fillText(sub, 384, canvas.height * 0.76, 720);
      const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; textures.push(texture);
      const geometry = new THREE.PlaneGeometry(w, h); const material = new THREE.MeshStandardMaterial({ map: texture, side: THREE.DoubleSide });
      geometries.push(geometry); materials.push(material); return new THREE.Mesh(geometry, material);
    };
    try {
      if (asset.geometry) {
        const generated = buildGeneratedGeometry(asset.geometry, { wood: palette.furniture, frame: palette.frame, accent: room.accent });
        generated.traverse(item => { if (item instanceof THREE.Mesh) { geometries.push(item.geometry); materials.push(item.material as THREE.Material); } });
        group.add(generated);
      } else {
      const render = assetRenderers[kind as keyof typeof assetRenderers];
      if (!render) throw new Error("Missing built-in renderer");
      render({ fixture: { id: kind, kind: kind as keyof typeof assetRenderers, label: asset.label, x: 0, z: 0, rotation: 0, ...(kind === "shelf" ? { shelfId: "A" } : {}) }, room,
        shelves: [{ id: "A", name: "Merchandise", zone: "display", width: 160, height: 135, depth: 35 }],
        products: [], placements: [], selected: null, editMode: false, group, w: asset.width, d: asset.depth,
        wood: palette.furniture, frame: palette.frame, accent: room.accent, box, round, label, geometries, materials, productMeshes: [] });
      }
      renderer.render(scene, camera);
      const img = document.createElement("img"); img.src = renderer.domElement.toDataURL("image/png"); img.alt = `3D preview of ${asset.label}`;
      preview.replaceChildren(img);
    } catch (error) { console.error(`Could not render ${kind}`, error); }
    geometries.forEach(item => item.dispose()); materials.forEach(item => item.dispose()); textures.forEach(item => item.dispose());
  }
  const content = document.createElement("div"); content.className = "content";
  const title = document.createElement("h2"); title.textContent = asset.label;
  const identity = document.createElement("code"); identity.textContent = asset.id;
  const description = document.createElement("p"); description.textContent = asset.description;
  const details = document.createElement("dl");
  const fields: [string, string][] = [
    ["Dimensions", `${asset.width} m wide × ${asset.depth} m deep; approx. ${asset.heightApprox} m high.${asset.dimensionNote ? ` ${asset.dimensionNote}` : ""}`],
    ["Function", asset.function], ["Style & mood", asset.moodTags.join(" · ")],
    ["Coloring", asset.coloring], ["Rendering code", asset.implementation],
    ["Catalog entry", asset.catalogPath ?? (asset.source === "mcp" ? "Shared MCP asset" : asset.geometry ? "Saved in your asset catalog" : `shared/assets/${asset.id}.ts`)],
    ...(asset.visualReviews?.length ? [["Visual review", `${asset.visualReviews.length} of 3 reviews · ${asset.visualReviews.at(-1)!.acceptable ? "Reviewer accepted" : "Saved with concerns"}. ${asset.visualReviews.at(-1)!.critique}`] as [string, string]] : []),
    ...(asset.referenceId ? [["Reference", catalog.find(item => item.id === asset.referenceId)?.label ?? asset.referenceId] as [string, string]] : []),
  ];
  for (const [name, value] of fields) {
    const dt = document.createElement("dt"); dt.textContent = name;
    const dd = document.createElement("dd"); dd.textContent = value; details.append(dt, dd);
  }
  content.append(title, identity, description, details);
  if (asset.geometry) {
    const link = document.createElement("a"); link.href = `/api/assets/${encodeURIComponent(asset.id)}/preview`; link.target = "_blank"; link.rel = "noreferrer"; link.textContent = "View three angles ↗"; content.append(link);
    if (asset.visualReviews?.length) {
    const history = document.createElement("details");
    const summary = document.createElement("summary"); summary.textContent = "Review history"; history.append(summary);
    asset.visualReviews.forEach((review, index) => { const entry = document.createElement("p"); entry.textContent = `Review ${index + 1}: ${review.acceptable ? "Accepted" : "Needs revision"}. ${review.critique} ${review.improvements}`; history.append(entry); });
    content.append(history);
    }
  }
  card.append(preview, content); list.append(card);
}
if (!initialAnchorHandled && location.hash) {
  document.getElementById(location.hash.slice(1))?.scrollIntoView();
  initialAnchorHandled = true;
}
}
async function loadCatalog() { catalog = await api<AssetDefinition[]>("/assets"); renderCatalog(); }
form.addEventListener("submit", async event => {
  event.preventDefault();
  submit.disabled = true; status.textContent = "Planning, building and reviewing up to three versions…";
  try {
    const result = await api<{ asset: AssetDefinition; optimizedBrief: string }>("/assets/generate", { request: request.value, ...(reference.value ? { referenceId: reference.value } : {}) });
    await loadCatalog();
    status.textContent = `${result.asset.label} was tested and saved. Refined brief: ${result.optimizedBrief}`;
    request.value = "";
    document.getElementById(result.asset.id)?.scrollIntoView({ behavior: "smooth", block: "center" });
  } catch (error) { status.textContent = error instanceof Error ? error.message : "Could not create this asset. Try again."; }
  finally { submit.disabled = false; }
});
void loadCatalog().catch(() => { catalog = fixtureKinds.map(kind => fixtureCatalog[kind]); renderCatalog(); status.textContent = "Could not load saved assets. Refresh to try again."; });
window.addEventListener("pagehide", () => renderer?.dispose(), { once: true });
