import type { AssetRenderContext } from "./context";

export function renderAsset(ctx: AssetRenderContext) {
  const { fixture, room, group, w, d, wood, frame, accent, box, label } = ctx;

          box(
            w - 0.08,
            0.94,
            d - 0.08,
            0,
            0.47,
            0,
            fixture.kind === "coffee-bar" ? wood : accent,
            group,
          );
          box(
            w,
            0.1,
            d,
            0,
            1,
            0,
            room.style === "industrial" ? frame : wood,
            group,
          );
          for (let x = -w / 2 + 0.15; x < w / 2; x += 0.15)
            box(0.023, 0.8, 0.024, x, 0.47, d / 2 - 0.025, frame, group);

            box(0.25, 0.05, 0.23, 0.35, 1.08, 0, frame, group);
            box(0.06, 0.25, 0.06, 0.35, 1.18, 0, frame, group);
            const screen = box(
              0.4,
              0.28,
              0.035,
              0.35,
              1.36,
              0,
              "#303c42",
              group,
            );
            screen.rotation.x = -0.2;
            box(
              0.3,
              0.18,
              0.03,
              0.35,
              1.36,
              0.025,
              accent,
              group,
              room.style === "futuristic",
            );
            const sign = label("hello.", "CHECKOUT", 0.5, 0.3, accent);
            sign.position.set(-0.42, 0.6, d / 2 + 0.01);
            group.add(sign);
}
