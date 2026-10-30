import assert from "node:assert/strict";
import { test } from "node:test";
import sharp from "sharp";
import { renderAssetViews } from "./asset-preview.js";

test("asset preview renders a PNG containing three views", async () => {
  const png = await renderAssetViews([{ shape: "box", width: 1, height: 1, depth: .5, x: 0, y: .5, z: 0, color: "wood" }]);
  const metadata = await sharp(png).metadata();
  assert.equal(metadata.format, "png"); assert.equal(metadata.width, 1200); assert.equal(metadata.height, 500);
});

test("front preview resolves overlapping surfaces by depth", async () => {
  const box = { shape: "box" as const, width: 1, height: 1, depth: .1, x: 0, y: .5 };
  const png = await renderAssetViews([{ ...box, z: .3, color: "#ff0000" }, { ...box, z: -.3, color: "#0000ff" }]);
  const { data, info } = await sharp(png).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const pixel = (250 * info.width + 200) * info.channels;
  assert.ok(data[pixel] > data[pixel + 2], "the nearer red box must hide the blue box");
});

test("room review renders actual catalog fixtures in three views", async () => {
  const { renderRoomViews } = await import("./room-review.js");
  const { createRoom } = await import("../shared/room.js");
  const { seed } = await import("./seed.js");
  const image = await renderRoomViews(createRoom(["coffee", "books"], "modern"), seed().shelves);
  const meta = await sharp(image).metadata();
  assert.equal(meta.width, 1200);
  assert.equal(meta.height, 500);
  assert.ok(image.length > 10000);
});
