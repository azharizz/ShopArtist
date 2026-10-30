import * as THREE from "three";
import { assetRenderers } from "../src/assets/index.js";
import { buildGeneratedGeometry } from "../shared/generated-assets.js";
import { fixtureSize, stylePalettes, type RoomDesign } from "../shared/room.js";
import type { Shelf } from "../shared/types.js";
import { renderGroupViews } from "./asset-preview.js";
import { createAgentClient } from "./ai-bridge.js";

export async function renderRoomViews(room: RoomDesign, shelves: Shelf[]) {
  const scene = new THREE.Group();
  const palette = { ...stylePalettes[room.style], furniture: room.furniture ?? stylePalettes[room.style].furniture, frame: room.frame ?? stylePalettes[room.style].frame };
  const box = (w: number, h: number, d: number, x: number, y: number, z: number, color: string, parent: THREE.Object3D = scene) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshStandardMaterial({ color }));
    mesh.position.set(x, y, z); parent.add(mesh); return mesh;
  };
  const round = (radius: number, height: number, x: number, y: number, z: number, color: string, parent: THREE.Object3D) => {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, 24), new THREE.MeshStandardMaterial({ color }));
    mesh.position.set(x, y, z); parent.add(mesh); return mesh;
  };
  const label = (_text: string, _sub: string, w: number, h: number, color = "#eee5d5") => new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.01), new THREE.MeshStandardMaterial({ color }));
  box(room.width, .05, room.depth, 0, -.04, 0, room.floor);
  for (const fixture of room.fixtures) {
    const group = new THREE.Group(); group.position.set(fixture.x, 0, fixture.z); group.rotation.y = fixture.rotation * Math.PI / 180; scene.add(group);
    const { width: w, depth: d } = fixtureSize({ ...fixture, rotation: 0 }, shelves);
    const wood = palette.furniture, frame = palette.frame, accent = room.accent;
    if (fixture.asset?.geometry) group.add(buildGeneratedGeometry(fixture.asset.geometry, { wood, frame, accent }));
    else {
      const render = assetRenderers[fixture.kind as keyof typeof assetRenderers];
      if (render) render({ fixture, room, shelves, placements: [], products: [], selected: null, editMode: false, group, w, d, wood, frame, accent, box, round, label, geometries: [], materials: [], productMeshes: [] });
    }
  }
  return renderGroupViews(scene, [{ name: "Top", position: [0, 5, .01] }, { name: "Entrance", position: [0, 2, 5] }, { name: "Three-quarter", position: [4, 3, 5] }]);
}

export async function reviewRoom(room: RoomDesign, shelves: Shelf[], brief: string) {
  const image = await renderRoomViews(room, shelves);
  const response = await createAgentClient().messages.create({ model: process.env.AI_VISION_MODEL || "nvidia/Nemotron-3.5-Super-VL", max_tokens: 4096,
    system: "You are a skeptical, honest and accurate shop layout reviewer. Assess only the visible geometry. These are the same room from three rotated camera viewpoints; apparent left/right wall changes are expected. The floor is visible, but walls, door, lighting, textures and text are omitted. Do not infer the door or wall positions. Mention only clearly visible layout problems. Do not invent features or claim compliance. Return exactly VERDICT: PASS or FAIL followed by CRITIQUE: and a concise explanation.",
    messages: [{ role: "user", content: [{ type: "text", text: `Shop concept: ${brief}. Review these top, entrance and three-quarter views for coherence and obstruction.` }, { type: "image", source: { type: "base64", media_type: "image/png", data: image.toString("base64") } }] }],
  }, { timeout: 20000 });
  const text = response.content.filter(block => block.type === "text").map(block => block.text).join("\n");
  return parseRoomReview(text);
}

export function parseRoomReview(text: string) {
  const verdict = text.match(/VERDICT\s*:\s*(PASS|FAIL)/i), critique = text.match(/CRITIQUE\s*:\s*([\s\S]+)/i);
  if (!verdict || !critique) { if (process.env.AI_DEBUG === "1") console.warn("Room review response:", text.slice(0, 1200)); throw new Error("Visual reviewer returned an invalid assessment."); }
  const description = critique[1].trim().slice(0, 1000);
  // shortcut: reject unverified cross-view contradiction claims until the model can reference individual fixtures reliably.
  const uncertain = /(?:view|perspective)[\s\S]{0,180}(?:mismatch|inconsisten|contradict|incoheren)|(?:mismatch|inconsisten|contradict|incoheren)[\s\S]{0,180}(?:view|perspective)/i.test(description);
  return { acceptable: verdict[1].toUpperCase() === "PASS" && !uncertain, critique: uncertain ? `Unverified visual critique; inspect manually: ${description}` : description, uncertain };
}
