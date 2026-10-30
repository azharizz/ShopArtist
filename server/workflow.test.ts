import assert from "node:assert/strict";
import { test } from "node:test";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import type { StoreState } from "../shared/types.js";
import { createRoom } from "../shared/room.js";

test(
  "isolated owner workflow: import, mapping, edit, approve, export, restore and unavailable evidence",
  { timeout: 30000 },
  async ({ signal }) => {
    const directory = await mkdtemp(path.join(tmpdir(), "shopartist-check-"));
    const server = spawn(
      process.execPath,
      ["--import", "tsx", "server/index.ts"],
      {
        env: {
          ...process.env,
          HOST: "127.0.0.1",
          PORT: "0",
          DATA_DIR: directory,
        },
        stdio: ["ignore", "pipe", "pipe"],
      },
    );
    const exited = once(server, "exit");
    let diagnostics = "";
    server.stderr.on("data", (chunk) => {
      diagnostics += chunk;
    });
    try {
      const port = await new Promise<string>((resolve, reject) => {
        let output = "";
        signal.addEventListener(
          "abort",
          () => reject(new Error(`Server startup aborted: ${diagnostics}`)),
          { once: true },
        );
        server.stdout.on("data", (chunk) => {
          output += chunk;
          const match = output.match(/ready on port (\d+)/);
          if (match) resolve(match[1]);
        });
        server.once("error", reject);
        server.once("exit", () => reject(new Error(diagnostics)));
      });
      const base = `http://127.0.0.1:${port}/api`;
      let cookie = "";
      async function request(route: string, body?: unknown, expected = 200) {
        const response = await fetch(base + route, {
          method: body === undefined ? "GET" : "POST",
          headers: { "Content-Type": "application/json", Cookie: cookie },
          body: body === undefined ? undefined : JSON.stringify(body),
        });
        cookie = response.headers.get("set-cookie")?.split(";")[0] ?? cookie;
        const result = await response.json();
        assert.equal(response.status, expected, JSON.stringify(result));
        return result;
      }
      const initial: StoreState = (await request("/state")).state;
      const headers =
        "sku,title,category,width_cm,height_cm,depth_cm,stock,creator,priority";
      await request(
        "/inventory/import",
        {
          filename: "bad.csv",
          csv: `${headers}\nBAD,Invalid,Books,-2,20,2,3,Author,0.3`,
        },
        400,
      );
      assert.deepEqual(
        (await request("/state")).state.products,
        initial.products,
      );
      await request("/inventory/import", {
        filename: "new.csv",
        csv: `${headers}\nNEW-BOOK,=1+1,Books,2,20,2,4,Local Author,1`,
      });
      let state: StoreState = (await request("/state")).state;
      assert.equal(
        state.products.find((p) => p.id === "NEW-BOOK")?.mapping.status,
        "unmapped",
      );
      const pending = state.products.find(
        (p) => p.mapping.status === "pending",
      )!;
      assert.ok(pending);
      await request(
        "/cultural-mappings/resolve",
        { sku: pending.id, entityId: "invented" },
        400,
      );
      await request("/cultural-mappings/resolve", {
        sku: pending.id,
        entityId: pending.mapping.candidates[0].id,
      });
      const run = await request("/plans/generate", {
        theme: "midnight",
        maxMoves: 60,
      });
      assert.equal(run.proposalIds.length, 3);
      assert.equal(run.state.currentId, initial.currentId);
      const id = run.proposalIds[0];
      const detail = await request(`/plans/${id}`);
      assert.equal(detail.validation.valid, true);
      assert.ok(
        detail.plan.evidence.some(
          (e: { sku: string; requestId: string }) =>
            e.sku === pending.id && e.requestId.includes(detail.plan.runId),
        ),
      );
      await request(`/plans/${id}/approve`, { ownerConfirmed: false }, 400);
      const placements = structuredClone(detail.plan.placements);
      placements[0].facings = 100000;
      await request(`/plans/${id}/edit`, { placements, lockedSkus: [] }, 422);
      assert.deepEqual(
        (await request(`/plans/${id}`)).plan.placements,
        detail.plan.placements,
      );
      placements[0].facings = detail.plan.placements[0].facings;
      placements[0].position = 499;
      await request(`/plans/${id}/edit`, {
        placements,
        lockedSkus: [placements[0].sku],
      });
      const movedLock = structuredClone(placements);
      movedLock[0].position = 498;
      await request(
        `/plans/${id}/edit`,
        { placements: movedLock, lockedSkus: [placements[0].sku] },
        422,
      );
      await request(`/plans/${id}/edit`, { placements, lockedSkus: [] });
      const interior = createRoom(
        ["fashion", "art", "coffee", "books"],
        "futuristic",
      );
      interior.fixtures.find((f) => f.kind === "cashier")!.rotation = 37;
      interior.fixtures[0].z = -3.7;
      const invalidRoom = structuredClone(interior);
      invalidRoom.fixtures[0].x = 100;
      await request(
        `/plans/${id}/edit`,
        { placements, lockedSkus: [], room: invalidRoom },
        422,
      );
      assert.deepEqual(
        (await request(`/plans/${id}`)).plan.room,
        detail.plan.room,
        "rejected room edits are atomic",
      );
      await request(
        `/plans/${id}/edit`,
        {
          placements,
          lockedSkus: [],
          room: { ...interior, wall: "not-a-colour" },
        },
        400,
      );
      await request(`/plans/${id}/edit`, {
        placements,
        lockedSkus: [],
        room: interior,
      });
      assert.deepEqual(
        (await request("/state")).state.plans.find(
          (p: { id: string }) => p.id === id,
        ).room,
        interior,
      );
      assert.deepEqual(
        (await request("/state")).state.plans[0].room,
        initial.plans[0].room,
        "preview cannot mutate approved interior",
      );
      const regenerated = await request("/plans/generate", {
        theme: "quiet",
        maxMoves: 60,
        sourcePlanId: id,
      });
      for (const generatedId of regenerated.proposalIds)
        assert.deepEqual(
          (await request(`/plans/${generatedId}`)).plan.room,
          interior,
          "merchandise generation retains the selected interior",
        );
      const approved = await request(`/plans/${id}/approve`, {
        ownerConfirmed: true,
      });
      assert.equal(approved.state.currentId, id);
      assert.equal(
        approved.state.plans.find((p: { id: string }) => p.id === id).status,
        "approved",
      );
      await request(
        `/plans/${run.proposalIds[1]}/approve`,
        { ownerConfirmed: true },
        409,
      );
      const csvResponse = await fetch(`${base}/plans/${id}/move-list.csv`, {
        headers: { Cookie: cookie },
      });
      assert.equal(csvResponse.status, 200);
      const csv = await csvResponse.text();
      assert.ok(csv.includes("1 · Clear") && csv.includes("2 · Place"));
      assert.ok(csv.includes("'=1+1"), "spreadsheet formulas must be escaped");
      assert.ok(
        csv.includes("Interior · before placement") &&
          csv.includes("Cashier desk") &&
          csv.includes("futuristic"),
      );
      const foreign = await fetch(`${base}/plans/${id}`);
      assert.equal(foreign.status, 404, "another sandbox cannot see this plan");
      const forbidden = await fetch(`${base}/stores/demo/load`, {
        method: "POST",
        headers: { Origin: "https://untrusted.example", Cookie: cookie },
      });
      assert.equal(forbidden.status, 403);
      const restored = await request(`/plans/${initial.currentId}/restore`, {
        ownerConfirmed: true,
      });
      assert.deepEqual(
        restored.state.plans.find(
          (p: { id: string }) => p.id === restored.planId,
        ).placements,
        initial.plans[0].placements,
      );
      assert.deepEqual(
        restored.state.plans.find(
          (p: { id: string }) => p.id === restored.planId,
        ).room,
        initial.plans[0].room,
        "restore includes the complete interior",
      );
      state = restored.state;
      await request("/store", {
        ...state.store,
        shelves: state.shelves,
        provider: "unavailable",
      });
      const fallback = await request("/plans/generate", {
        theme: "electric",
        maxMoves: 60,
      });
      assert.equal(fallback.proposalIds.length, 1);
      const baseline = await request(`/plans/${fallback.proposalIds[0]}`);
      assert.equal(baseline.plan.variant, "baseline");
      assert.deepEqual(baseline.plan.evidence, []);
      assert.equal(baseline.plan.components.culture, null);
      await request(`/plans/${baseline.plan.id}/approve`, {
        ownerConfirmed: true,
      });
      const saved = await request("/state");
      assert.equal(saved.state.currentId, baseline.plan.id);
      assert.ok(
        saved.state.audit.some(
          (a: { action: string }) => a.action === "Approved digital layout",
        ),
      );
      const brief = {
        location: "Jakarta",
        latitude: -6.2,
        longitude: 106.8,
        radius: 1500,
        purpose: "Neighbourhood reading",
        inspirations: ["demo:artist:0"],
        tags: [],
        theme: "quiet",
      };
      const created = await request("/projects/create", {
        name: "Pop test",
        brief,
        focuses: ["books"],
        style: "modern",
      });
      const projectId = created.state.projectId;
      assert.notEqual(projectId, saved.state.projectId);
      assert.deepEqual(created.state.brief, brief);
      const room = created.state.plans[0].room;
      const proposal = await request("/agent", {
        message: "add two plants; wall pink",
        room,
      });
      assert.equal(proposal.mode, "local");
      assert.equal(proposal.room.wall, "#ff6ba9");
      assert.equal(
        proposal.room.fixtures.filter(
          (f: { kind: string }) => f.kind === "plant",
        ).length,
        room.fixtures.filter((f: { kind: string }) => f.kind === "plant")
          .length + 2,
      );
      assert.deepEqual(
        (await request("/state")).state.plans[0].room,
        room,
        "agent proposals do not save automatically",
      );
      await request(
        "/agent",
        { message: "move cashier to 100, 100", room },
        400,
      );
      await request("/agent", { message: "remove cashier", room }, 400);
      const research = await request("/research", brief);
      assert.equal(research.source, "synthetic-fixture");
      assert.ok(
        research.queries.some(
          (q: { parameters: Record<string, unknown> }) =>
            q.parameters["filter.type"] === "urn:heatmap",
        ),
      );
      const revisedBrief = { ...brief, location: "Bandung", theme: "electric" };
      await request("/brief", revisedBrief);
      await request("/brief", { ...revisedBrief, latitude: null }, 400);
      assert.deepEqual((await request("/state")).state.brief, revisedBrief);
      const otherProject = await fetch(`${base}/projects/${projectId}/load`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{}",
      });
      assert.equal(otherProject.status, 404);
      await request(`/projects/${saved.state.projectId}/load`, {});
      assert.equal(
        (await request("/state")).state.currentId,
        saved.state.currentId,
      );
      const staleTab = await fetch(`${base}/stores/demo/load`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookie,
          "X-Project-Id": projectId,
        },
        body: "{}",
      });
      assert.equal(staleTab.status, 409);
      assert.equal(
        (await request("/state")).state.currentId,
        saved.state.currentId,
      );
      await request(`/projects/${projectId}/load`, {});
      assert.equal((await request("/state")).state.store.name, "Pop test");
      assert.deepEqual((await request("/state")).state.brief, revisedBrief);
    } finally {
      server.kill("SIGTERM");
      await exited;
      await rm(directory, { recursive: true, force: true });
    }
  },
);
