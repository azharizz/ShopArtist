import * as THREE from "three";
import type { AssetRenderContext } from "./context";

export function renderAsset(ctx: AssetRenderContext) {
  const { fixture, room, shelves, placements, products, selected, editMode, group, w, d, wood, frame, accent, box, round, label, geometries, materials, productMeshes } = ctx;


          box(0.7, 0.8, 0.7, 0, 0.4, 0, wood, group);
          const geometry = new THREE.TorusKnotGeometry(0.18, 0.055, 48, 8),
            material = new THREE.MeshStandardMaterial({
              color: accent,
              metalness: 0.5,
              roughness: 0.3,
            });
          geometries.push(geometry);
          materials.push(material);
          const sculpture = new THREE.Mesh(geometry, material);
          sculpture.position.y = 1.1;
          sculpture.castShadow = true;
          group.add(sculpture);

}
