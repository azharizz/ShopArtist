import { assetRenderers } from "../shared/asset-renderers";
import { buildGeneratedGeometry } from "../shared/generated-assets";
import { useCallback, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import type { Placement, Product, Shelf } from "../shared/types";
import {
  fixtureSize,
  focusLabels,
  stylePalettes,
  validateRoom,
  type Fixture,
  type RoomDesign,
} from "../shared/room";

interface Props {
  products: Product[];
  shelves: Shelf[];
  placements: Placement[];
  selected: string | null;
  onSelect: (sku: string) => void;
  reset: number;
  room: RoomDesign;
  name: string;
  editMode: boolean;
  selectedFixture: string | null;
  onFixtureSelect: (id: string) => void;
  onMove: (id: string, x: number, z: number) => void;
  onError: (message: string) => void;
  topView: boolean;
}

export function ShopScene({
  products,
  shelves,
  placements,
  selected,
  onSelect,
  reset,
  room,
  name,
  editMode,
  selectedFixture,
  onFixtureSelect,
  onMove,
  onError,
  topView,
}: Props) {
  const [failed, setFailed] = useState(false);
  const callbacks = useRef({ onSelect, onFixtureSelect, onMove, onError });
  callbacks.current = { onSelect, onFixtureSelect, onMove, onError };
  const cameraState = useRef<{
    position: THREE.Vector3;
    target: THREE.Vector3;
    reset: number;
    topView: boolean;
    fitScale: number;
    extent: number;
  } | null>(null);
  const mountScene = useCallback(
    (element: HTMLDivElement | null) => {
      if (!element) return;
      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      } catch {
        setFailed(true);
        return;
      }
      setFailed(false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = room.style === "futuristic" ? 1.1 : 1.25;
      renderer.domElement.setAttribute(
        "aria-label",
        editMode
          ? "3D floor plan. Drag a fixture to move it. All fixture positions are also editable in the labelled controls below."
          : "Interactive shop. Drag empty space to orbit, scroll to zoom, click merchandise to inspect.",
      );
      renderer.domElement.setAttribute("role", "img");
      renderer.domElement.style.touchAction = "none";
      element.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(37, 1, 0.1, 100);
      const controls = new OrbitControls(camera, renderer.domElement);
      const extent = Math.max(room.width, room.depth);
      let fitScale = 1;
      camera.position.set(extent * 1.04, extent * 0.94, extent * 1.22);
      controls.target.set(0, 0.5, 0);
      if (topView) camera.position.set(0, extent * 1.65, 0.01);
      if (
        cameraState.current?.reset === reset &&
        cameraState.current.topView === topView
      ) {
        camera.position.copy(cameraState.current.position);
        controls.target.copy(cameraState.current.target);
        fitScale = cameraState.current.fitScale;
        camera.position
          .sub(controls.target)
          .multiplyScalar(extent / cameraState.current.extent)
          .add(controls.target);
      }
      controls.minDistance = 5;
      controls.maxDistance = 70;
      controls.maxPolarAngle = Math.PI / 2.15;
      controls.minPolarAngle = topView ? 0 : 0.15;
      controls.enablePan = true;
      controls.enableRotate = !topView;
      controls.update();
      const palette = { ...stylePalettes[room.style], furniture: room.furniture ?? stylePalettes[room.style].furniture, frame: room.frame ?? stylePalettes[room.style].frame };
      scene.add(new THREE.AmbientLight("#eef4ff", 1.7));
      const sun = new THREE.DirectionalLight(
        room.style === "classic" ? "#ffe0b0" : "#ffffff",
        3.5,
      );
      sun.position.set(3, 12, 8);
      sun.castShadow = true;
      sun.shadow.mapSize.set(2048, 2048);
      Object.assign(sun.shadow.camera, {
        left: -12,
        right: 12,
        top: 12,
        bottom: -12,
      });
      sun.shadow.bias = -0.001;
      scene.add(sun);
      const fill = new THREE.DirectionalLight("#ccdfff", 1.2);
      fill.position.set(-8, 5, 0);
      scene.add(fill);
      const geometries: THREE.BufferGeometry[] = [],
        materials: THREE.Material[] = [],
        textures: THREE.Texture[] = [];
      const productMeshes: THREE.Object3D[] = [],
        fixtureGroups: THREE.Group[] = [];
      function box(
        w: number,
        h: number,
        d: number,
        x: number,
        y: number,
        z: number,
        color: string,
        parent: THREE.Object3D = scene,
        glow = false,
      ) {
        const geometry = new THREE.BoxGeometry(w, h, d);
        const material = new THREE.MeshStandardMaterial({
          color,
          roughness: room.style === "futuristic" ? 0.35 : 0.8,
          metalness: room.style === "industrial" ? 0.25 : 0.05,
          ...(glow ? { emissive: color, emissiveIntensity: 1.5 } : {}),
        });
        geometries.push(geometry);
        materials.push(material);
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        parent.add(mesh);
        return mesh;
      }
      function round(
        radius: number,
        height: number,
        x: number,
        y: number,
        z: number,
        color: string,
        parent: THREE.Object3D,
      ) {
        const geometry = new THREE.CylinderGeometry(
            radius,
            radius * 0.9,
            height,
            24,
          ),
          material = new THREE.MeshStandardMaterial({ color, roughness: 0.6 });
        geometries.push(geometry);
        materials.push(material);
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        parent.add(mesh);
        return mesh;
      }
      function label(
        text: string,
        sub: string,
        w: number,
        h: number,
        color = room.wall,
        ink = room.style === "futuristic" ? "#d9f9f4" : "#303b32",
      ) {
        const canvas = document.createElement("canvas");
        canvas.width = 768;
        canvas.height = Math.round((768 * h) / w);
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = ink;
        ctx.textAlign = "center";
        ctx.font = "500 62px Georgia";
        ctx.fillText(text, 384, canvas.height * 0.45, 720);
        ctx.font = "22px sans-serif";
        ctx.fillText(sub, 384, canvas.height * 0.76, 720);
        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        textures.push(texture);
        const material = new THREE.MeshStandardMaterial({
          map: texture,
          side: THREE.DoubleSide,
        });
        materials.push(material);
        const geometry = new THREE.PlaneGeometry(w, h);
        geometries.push(geometry);
        return new THREE.Mesh(geometry, material);
      }
      const hw = room.width / 2,
        hd = room.depth / 2;
      box(room.width, 0.2, room.depth, 0, -0.14, 0, room.floor);
      if (room.style === "classic") {
        for (let x = -hw + 0.35; x < hw; x += 0.35)
          box(0.012, 0.003, room.depth, x, -0.038, 0, palette.frame);
      } else {
        for (let x = -hw + 1; x < hw; x++)
          box(0.013, 0.003, room.depth, x, -0.038, 0, palette.frame);
        for (let z = -hd + 1; z < hd; z++)
          box(room.width, 0.003, 0.013, 0, -0.038, z, palette.frame);
      }
      if (!topView) {
        box(room.width, 3.6, 0.14, 0, 1.72, -hd, room.wall);
        box(0.14, 3.6, room.depth, -hw, 1.72, 0, room.wall);
        box(room.width, 0.12, 0.14, 0, 0.03, -hd + 0.08, palette.frame);
        if (room.style === "industrial") {
          for (let y = 0.35; y < 3.5; y += 0.3) {
            box(room.width, 0.017, 0.018, 0, y, -hd + 0.08, "#c1aaa0");
            for (
              let x = -hw + (Math.round(y * 10) % 2 ? 0.4 : 0.8);
              x < hw;
              x += 0.8
            )
              box(0.014, 0.28, 0.018, x, y - 0.15, -hd + 0.08, "#c1aaa0");
          }
          for (const x of [-hw + 0.2, hw - 0.2])
            box(0.12, 3.6, 0.12, x, 1.72, -hd + 0.13, palette.frame);
        } else if (room.style === "classic") {
          for (let x = -hw + 0.25; x < hw - 0.25; x += 1.1) {
            box(0.04, 1.1, 0.035, x, 0.6, -hd + 0.1, palette.frame);
            const railWidth = Math.min(1.06, hw - 0.15 - x);
            box(
              railWidth,
              0.04,
              0.035,
              x + railWidth / 2,
              1.13,
              -hd + 0.1,
              palette.frame,
            );
          }
          box(room.width, 0.12, 0.16, 0, 3.38, -hd + 0.09, palette.frame);
        } else if (room.style === "futuristic") {
          for (let x = -hw + 0.5; x < hw; x += 2)
            box(0.035, 2.5, 0.03, x, 1.8, -hd + 0.1, room.accent, scene, true);
          box(
            room.width,
            0.055,
            0.18,
            0,
            3.35,
            -hd + 0.1,
            room.accent,
            scene,
            true,
          );
          box(
            0.055,
            0.025,
            room.depth,
            hw - 0.15,
            0,
            0,
            room.accent,
            scene,
            true,
          );
        }
        const sign = label(
          name.toLowerCase(),
          room.focuses
            .map((f) => focusLabels[f].replace(" shop", "").toUpperCase())
            .join(" / "),
          4,
          0.75,
        );
        sign.position.set(0.25, 2.8, -hd + 0.1);
        scene.add(sign);
        // Window geometry changes with its style; glazing is inset on the cutaway wall.
        const windowWidth =
          room.window === "ribbon"
            ? room.depth - 1.5
            : room.window === "panoramic"
              ? 4.5
              : 3;
        const windowHeight = room.window === "ribbon" ? 0.8 : 2.1;
        const windowY = room.window === "ribbon" ? 2.5 : 2;
        const windowGroup = new THREE.Group();
        windowGroup.position.set(-hw + 0.1, windowY, -0.4);
        windowGroup.rotation.y = Math.PI / 2;
        scene.add(windowGroup);
        if (room.window === "arched") {
          const r = windowWidth / 2;
          const shape = new THREE.Shape();
          shape.moveTo(-r, -1);
          shape.lineTo(r, -1);
          shape.lineTo(r, 0);
          shape.absarc(0, 0, r, 0, Math.PI, false);
          shape.lineTo(-r, -1);
          const geometry = new THREE.ShapeGeometry(shape),
            material = new THREE.MeshStandardMaterial({
              color: "#bad5d9",
              side: THREE.DoubleSide,
            });
          geometries.push(geometry);
          materials.push(material);
          const pane = new THREE.Mesh(geometry, material);
          windowGroup.add(pane);
          const curve = new THREE.EllipseCurve(
            0,
            0,
            r,
            r,
            0,
            Math.PI,
            false,
            0,
          );
          const points = curve
            .getPoints(36)
            .map((p) => new THREE.Vector3(p.x, p.y, 0.04));
          const edgeGeometry = new THREE.TubeGeometry(
            new THREE.CatmullRomCurve3(points),
            36,
            0.045,
            6,
            false,
          );
          geometries.push(edgeGeometry);
          const edgeMaterial = new THREE.MeshStandardMaterial({
            color: palette.frame,
          });
          materials.push(edgeMaterial);
          windowGroup.add(new THREE.Mesh(edgeGeometry, edgeMaterial));
          for (const x of [-r, 0, r])
            box(0.055, 1, 0.08, x, -0.5, 0.05, palette.frame, windowGroup);
        } else {
          box(
            windowWidth + 0.12,
            windowHeight + 0.12,
            0.08,
            0,
            0,
            0,
            palette.frame,
            windowGroup,
          );
          box(
            windowWidth,
            windowHeight,
            0.05,
            0,
            0,
            0.07,
            "#b7d9df",
            windowGroup,
          );
          if (room.window === "grid") {
            for (let x = -windowWidth / 2 + 0.6; x < windowWidth / 2; x += 0.6)
              box(
                0.045,
                windowHeight,
                0.08,
                x,
                0,
                0.11,
                palette.frame,
                windowGroup,
              );
            box(
              windowWidth,
              0.055,
              0.08,
              0,
              0,
              0.11,
              palette.frame,
              windowGroup,
            );
          }
        }
        box(
          windowWidth + 0.18,
          0.08,
          0.28,
          0,
          -windowHeight / 2 - 0.02,
          0.1,
          palette.frame,
          windowGroup,
        );
      }
      const entrance = label(
        "WELCOME",
        "KEEP ENTRANCE CLEAR · 1.8 M",
        1.8,
        0.45,
        room.floor,
        palette.frame,
      );
      entrance.rotation.x = -Math.PI / 2;
      entrance.position.set(0, -0.028, hd - 0.5);
      scene.add(entrance);
      for (const fixture of room.fixtures) {
        const group = new THREE.Group();
        group.position.set(fixture.x, 0, fixture.z);
        group.rotation.y = (fixture.rotation * Math.PI) / 180;
        group.userData.fixtureId = fixture.id;
        fixtureGroups.push(group);
        scene.add(group);
        const size = fixtureSize({ ...fixture, rotation: 0 }, shelves),
          w = size.width,
          d = size.depth;
        const wood = palette.furniture,
          frame = palette.frame,
          accent = room.accent;
        if (fixture.asset?.geometry) {
          const generated = buildGeneratedGeometry(fixture.asset.geometry, { wood, frame, accent });
          generated.traverse(item => {
            if (item instanceof THREE.Mesh) { geometries.push(item.geometry); materials.push(item.material as THREE.Material); }
          });
          group.add(generated);
        } else {
          const render = assetRenderers[fixture.kind as keyof typeof assetRenderers];
          if (render) render({ fixture, room, shelves, placements, products, selected, editMode, group, w, d, wood, frame, accent, box, round, label, geometries, materials, productMeshes });
        }
        if (editMode) {
          const isSelected = selectedFixture === fixture.id;
          const footprint = box(
            w,
            0.014,
            d,
            0,
            -0.025,
            0,
            isSelected ? "#86b946" : room.accent,
            group,
          );
          const material = footprint.material as THREE.MeshStandardMaterial;
          material.transparent = true;
          material.opacity = isSelected ? 0.5 : 0.16;
          const caption = label(
            fixture.label,
            "DRAG TO MOVE",
            Math.min(w + 0.3, 2),
            0.3,
            isSelected ? "#d0ed96" : "#f3efe2",
            "#303b32",
          );
          caption.rotation.x = -Math.PI / 2;
          caption.position.set(0, 0.012, d / 2 + 0.22);
          group.add(caption);
        }
      }
      function render() {
        renderer.render(scene, camera);
      }
      const observer = new ResizeObserver(() => {
        const { width, height } = element.getBoundingClientRect();
        if (!width || !height) return;
        camera.aspect = width / height;
        const nextScale = Math.max(1, (topView ? 1 : 1.4) / camera.aspect);
        camera.position
          .sub(controls.target)
          .multiplyScalar(nextScale / fitScale)
          .add(controls.target);
        fitScale = nextScale;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        render();
      });
      observer.observe(element);
      controls.addEventListener("change", render);
      const raycaster = new THREE.Raycaster(),
        pointer = new THREE.Vector2(),
        floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0),
        hitPoint = new THREE.Vector3();
      let downX = 0,
        downY = 0,
        drag: {
          group: THREE.Group;
          fixture: Fixture;
          offsetX: number;
          offsetZ: number;
          pointerId: number;
        } | null = null;
      function aim(event: PointerEvent) {
        const bounds = renderer.domElement.getBoundingClientRect();
        pointer.set(
          ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
          (-(event.clientY - bounds.top) / bounds.height) * 2 + 1,
        );
        raycaster.setFromCamera(pointer, camera);
      }
      function pointerDown(event: PointerEvent) {
        if (event.button !== 0 || !event.isPrimary) return;
        downX = event.clientX;
        downY = event.clientY;
        aim(event);
        if (!editMode) return;
        const hit = raycaster.intersectObjects(fixtureGroups, true)[0];
        if (!hit) return;
        let object: THREE.Object3D = hit.object;
        while (object.parent && !object.userData.fixtureId)
          object = object.parent;
        const fixture = room.fixtures.find(
          (f) => f.id === object.userData.fixtureId,
        );
        if (!fixture || !raycaster.ray.intersectPlane(floorPlane, hitPoint))
          return;
        drag = {
          group: object as THREE.Group,
          fixture,
          offsetX: hitPoint.x - fixture.x,
          offsetZ: hitPoint.z - fixture.z,
          pointerId: event.pointerId,
        };
        controls.enabled = false;
        event.stopImmediatePropagation();
        renderer.domElement.setPointerCapture(event.pointerId);
        renderer.domElement.style.cursor = "grabbing";
      }
      function pointerMove(event: PointerEvent) {
        if (!drag || event.pointerId !== drag.pointerId) return;
        aim(event);
        if (!raycaster.ray.intersectPlane(floorPlane, hitPoint)) return;
        const size = fixtureSize(drag.fixture, shelves);
        drag.group.position.x =
          Math.round(
            Math.max(
              -hw + size.width / 2,
              Math.min(hw - size.width / 2, hitPoint.x - drag.offsetX),
            ) * 100,
          ) / 100;
        drag.group.position.z =
          Math.round(
            Math.max(
              -hd + size.depth / 2,
              Math.min(hd - size.depth / 2, hitPoint.z - drag.offsetZ),
            ) * 100,
          ) / 100;
        render();
      }
      function finishDrag(event: PointerEvent) {
        if (!drag || event.pointerId !== drag.pointerId) return false;
        const active = drag;
        drag = null;
        controls.enabled = true;
        renderer.domElement.style.cursor = "";
        if (renderer.domElement.hasPointerCapture(event.pointerId))
          renderer.domElement.releasePointerCapture(event.pointerId);
        const moved =
          Math.hypot(event.clientX - downX, event.clientY - downY) > 5;
        if (event.type === "pointercancel" || !moved)
          active.group.position.set(active.fixture.x, 0, active.fixture.z);
        else {
          const x = active.group.position.x,
            z = active.group.position.z;
          const errors = validateRoom(
            {
              ...room,
              fixtures: room.fixtures.map((f) =>
                f.id === active.fixture.id ? { ...f, x, z } : f,
              ),
            },
            shelves,
          );
          if (errors.length) {
            active.group.position.set(active.fixture.x, 0, active.fixture.z);
            callbacks.current.onError(errors[0]);
          } else callbacks.current.onMove(active.fixture.id, x, z);
        }
        callbacks.current.onFixtureSelect(active.fixture.id);
        render();
        return true;
      }
      function pointerUp(event: PointerEvent) {
        if (
          finishDrag(event) ||
          editMode ||
          Math.hypot(event.clientX - downX, event.clientY - downY) > 5
        )
          return;
        aim(event);
        const hit = raycaster.intersectObjects(productMeshes)[0];
        if (hit) callbacks.current.onSelect(hit.object.userData.sku);
      }
      renderer.domElement.addEventListener("pointerdown", pointerDown, true);
      renderer.domElement.addEventListener("pointermove", pointerMove);
      renderer.domElement.addEventListener("pointerup", pointerUp);
      renderer.domElement.addEventListener("pointercancel", finishDrag);
      render();
      return () => {
        cameraState.current = {
          position: camera.position.clone(),
          target: controls.target.clone(),
          reset,
          topView,
          fitScale,
          extent,
        };
        observer.disconnect();
        controls.dispose();
        renderer.domElement.removeEventListener(
          "pointerdown",
          pointerDown,
          true,
        );
        renderer.domElement.removeEventListener("pointermove", pointerMove);
        renderer.domElement.removeEventListener("pointerup", pointerUp);
        renderer.domElement.removeEventListener("pointercancel", finishDrag);
        geometries.forEach((g) => g.dispose());
        materials.forEach((m) => m.dispose());
        textures.forEach((t) => t.dispose());
        renderer.dispose();
        renderer.domElement.remove();
      };
    },
    [
      products,
      shelves,
      placements,
      selected,
      reset,
      room,
      name,
      editMode,
      selectedFixture,
      topView,
    ],
  );
  return (
    <div ref={mountScene} className="shop-scene">
      {failed && (
        <div className="scene-fallback">
          <strong>3D is unavailable on this device.</strong>
          <p>
            Use the fixture list and position controls below to edit the full
            shop, or Shelves to edit merchandise.
          </p>
        </div>
      )}
    </div>
  );
}
