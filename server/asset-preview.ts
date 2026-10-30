import * as THREE from "three";
import sharp from "sharp";
import { buildGeneratedGeometry, type GeneratedPart } from "../shared/generated-assets.js";

/** Render the editor's Three.js geometry in three orthographic views with a depth buffer. */
export async function renderAssetViews(parts: GeneratedPart[]): Promise<Buffer> {
  const group = buildGeneratedGeometry(parts, { accent: "#658c78", wood: "#dac9aa", frame: "#424e47" });
  const width = 1200, height = 500;
  const pixels = Buffer.alloc(width * height * 4);
  for (let i = 0; i < pixels.length; i += 4) { pixels[i] = 237; pixels[i + 1] = 236; pixels[i + 2] = 228; pixels[i + 3] = 255; }
  const depthBuffer = new Float64Array(width * height).fill(Infinity);
  try {
    group.updateMatrixWorld(true);
    const bounds = new THREE.Box3().setFromObject(group), center = bounds.getCenter(new THREE.Vector3());
    const size = bounds.getSize(new THREE.Vector3()), extent = Math.max(size.x, size.y, size.z, .3) * .78;
    const views = [ { name: "Front", position: [0, .15, 5] }, { name: "Side", position: [5, .15, 0] }, { name: "Three-quarter", position: [4, 3, 5] } ];
    views.forEach((view, panel) => {
      const camera = new THREE.OrthographicCamera(-extent, extent, extent, -extent, .01, 100);
      camera.position.copy(center).addScaledVector(new THREE.Vector3(...view.position as [number, number, number]).normalize(), 12);
      camera.lookAt(center); camera.updateMatrixWorld(); camera.updateProjectionMatrix();
      group.traverse(object => {
        if (!(object instanceof THREE.Mesh)) return;
        const mesh = object as THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>;
        const position = mesh.geometry.getAttribute("position"), index = mesh.geometry.getIndex();
        const count = index ? index.count : position.count;
        for (let i = 0; i < count; i += 3) {
          const world = [0, 1, 2].map(j => new THREE.Vector3().fromBufferAttribute(position, index ? index.getX(i + j) : i + j).applyMatrix4(mesh.matrixWorld));
          const normal = new THREE.Vector3().subVectors(world[1], world[0]).cross(new THREE.Vector3().subVectors(world[2], world[0])).normalize();
          const midpoint = world[0].clone().add(world[1]).add(world[2]).multiplyScalar(1 / 3);
          if (normal.dot(camera.position.clone().sub(midpoint)) <= 0) continue;
          const light = Math.max(.45, Math.min(1, .7 + .3 * normal.dot(new THREE.Vector3(1, 2, 3).normalize())));
          const rgb = mesh.material.color.clone().multiplyScalar(light).getHex(THREE.SRGBColorSpace);
          const vertex = world.map(point => { const v = point.clone().project(camera); return { x: panel * 400 + (v.x + 1) * 200, y: 50 + (1 - v.y) * 200, z: v.z }; });
          const [a,b,c] = vertex, area = (b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x);
          if (Math.abs(area) < 1e-8) continue;
          const minX = Math.max(panel*400, Math.floor(Math.min(a.x,b.x,c.x))), maxX = Math.min(panel*400+399, Math.ceil(Math.max(a.x,b.x,c.x)));
          const minY = Math.max(0, Math.floor(Math.min(a.y,b.y,c.y))), maxY = Math.min(height-1, Math.ceil(Math.max(a.y,b.y,c.y)));
          for (let y=minY;y<=maxY;y++) for (let x=minX;x<=maxX;x++) {
            const px=x+.5, py=y+.5;
            const u=((b.x-px)*(c.y-py)-(b.y-py)*(c.x-px))/area;
            const v=((c.x-px)*(a.y-py)-(c.y-py)*(a.x-px))/area;
            const w=1-u-v;
            if (u < -1e-6 || v < -1e-6 || w < -1e-6) continue;
            const z=u*a.z+v*b.z+w*c.z, pixel=y*width+x;
            if (z >= depthBuffer[pixel]) continue;
            depthBuffer[pixel]=z; const offset=pixel*4;
            pixels[offset]=(rgb>>16)&255; pixels[offset+1]=(rgb>>8)&255; pixels[offset+2]=rgb&255;
          }
        }
      });
    });
    const labels = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="500">${views.map((v,i)=>`<text x="${i*400+18}" y="30" font-family="sans-serif" font-size="18" fill="#354238">${v.name}</text>`).join("")}</svg>`;
    return await sharp(pixels, { raw: { width, height, channels: 4 } }).composite([{ input: Buffer.from(labels) }]).png().toBuffer();
  } finally { group.traverse(object => { if (object instanceof THREE.Mesh) { object.geometry.dispose(); object.material.dispose(); } }); }
}
