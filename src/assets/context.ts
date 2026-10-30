import * as THREE from "three";
import type { Fixture, RoomDesign } from "../../shared/room";
import type { Placement, Product, Shelf } from "../../shared/types";

export interface AssetRenderContext {
  fixture: Fixture;
  room: RoomDesign;
  shelves: Shelf[];
  placements: Placement[];
  products: Product[];
  selected: string | null;
  editMode: boolean;
  group: THREE.Group;
  w: number;
  d: number;
  wood: string;
  frame: string;
  accent: string;
  box: (w: number, h: number, d: number, x: number, y: number, z: number, color: string, parent?: THREE.Object3D, glow?: boolean) => THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>;
  round: (radius: number, height: number, x: number, y: number, z: number, color: string, parent: THREE.Object3D) => THREE.Mesh;
  label: (text: string, sub: string, w: number, h: number, color?: string, ink?: string) => THREE.Mesh;
  geometries: THREE.BufferGeometry[];
  materials: THREE.Material[];
  productMeshes: THREE.Object3D[];
}
