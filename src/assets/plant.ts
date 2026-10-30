import * as THREE from "three";
import type { AssetRenderContext } from "./context";

export function renderAsset(ctx: AssetRenderContext) {
  const { group, round, geometries, materials } = ctx;


          round(0.23, 0.45, 0, 0.23, 0, "#b77e60", group);
          for (let i = 0; i < 7; i++) {
            const geometry = new THREE.SphereGeometry(0.12, 8, 6),
              material = new THREE.MeshStandardMaterial({
                color: i % 2 ? "#637d55" : "#91a176",
              });
            geometries.push(geometry);
            materials.push(material);
            const leaf = new THREE.Mesh(geometry, material),
              a = i * 2.4;
            leaf.scale.set(0.6, 2.5, 0.35);
            leaf.rotation.set(Math.cos(a) * 0.5, a, Math.sin(a) * 0.6);
            leaf.position.set(
              Math.sin(a) * 0.16,
              0.72 + (i % 2) * 0.15,
              Math.cos(a) * 0.16,
            );
            group.add(leaf);
          }
}
