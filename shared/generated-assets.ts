import * as THREE from "three";
import { z } from "zod";

const finite = z.number().finite();
export const generatedPartSchema = z.object({
  shape: z.enum(["box", "cylinder"]),
  width: finite.min(0.02).max(4), height: finite.min(0.02).max(4), depth: finite.min(0.02).max(4),
  x: finite.min(-3).max(3), y: finite.min(0).max(4), z: finite.min(-3).max(3),
  color: z.string().regex(/^(accent|wood|frame|#[0-9a-fA-F]{6})$/),
}).strict();
export const generatedGeometrySchema = z.array(generatedPartSchema).min(1).max(30);
export type GeneratedPart = z.infer<typeof generatedPartSchema>;

/** Shared renderer: accepts data only, never executes generated source code. */
export function buildGeneratedGeometry(parts: GeneratedPart[], colors: { accent: string; wood: string; frame: string }) {
  const group = new THREE.Group();
  for (const part of parts) {
    const geometry = part.shape === "box"
      ? new THREE.BoxGeometry(part.width, part.height, part.depth)
      : new THREE.CylinderGeometry(0.5, 0.5, part.height, 24);
    const color = part.color === "accent" || part.color === "wood" || part.color === "frame" ? colors[part.color] : part.color;
    const material = new THREE.MeshStandardMaterial({ color, roughness: 0.7 });
    const mesh = new THREE.Mesh(geometry, material);
    if (part.shape === "cylinder") mesh.scale.set(part.width, 1, part.depth);
    mesh.position.set(part.x, part.y, part.z);
    mesh.castShadow = true; mesh.receiveShadow = true;
    group.add(mesh);
  }
  return group;
}

export function inspectGeneratedGeometry(input: unknown) {
  const parts = generatedGeometrySchema.parse(input);
  const group = buildGeneratedGeometry(parts, { accent: "#658c78", wood: "#dac9aa", frame: "#424e47" });
  try {
    group.updateMatrixWorld(true);
    const bounds = new THREE.Box3().setFromObject(group);
    if (bounds.isEmpty() || ![bounds.min.x, bounds.min.y, bounds.min.z, bounds.max.x, bounds.max.y, bounds.max.z].every(Number.isFinite)) throw new Error("The asset has invalid geometry bounds.");
    if (bounds.min.y < -0.011) throw new Error("The asset extends below the floor; move its parts upward.");
    const roundUp = (value: number) => Math.ceil((value - 1e-6) * 100) / 100;
    const width = roundUp(2 * Math.max(Math.abs(bounds.min.x), Math.abs(bounds.max.x)));
    const depth = roundUp(2 * Math.max(Math.abs(bounds.min.z), Math.abs(bounds.max.z)));
    const heightApprox = roundUp(bounds.max.y);
    if (width > 6 || depth > 6 || heightApprox > 4) throw new Error("The asset exceeds the 6 m footprint or 4 m height limit.");
    return { parts, width, depth, heightApprox, meshes: group.children.length };
  } finally {
    group.traverse(object => { if (object instanceof THREE.Mesh) { object.geometry.dispose(); object.material.dispose(); } });
  }
}
