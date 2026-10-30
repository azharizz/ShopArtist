import React from "react";
import ReactDOM from "react-dom/client";
import Workspace from "./Workspace";
import { api, type StateResponse } from "./api";
import type { ProjectSummary } from "../shared/design";
import "./styles.css";
import "./pop.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);
async function start() {
  root.render(
    <div className="loading-screen">
      <img src="/shopartist-mark.svg" alt="" width="88" height="88" />
      <h1>SHOPARTIST</h1>
      <p>Opening your little worlds…</p>
    </div>,
  );
  try {
    const { state } = await api<StateResponse>("/state");
    const { projects } = await api<{ projects: ProjectSummary[] }>("/projects");
    root.render(
      <React.StrictMode>
        <Workspace initialState={state} initialProjects={projects} />
      </React.StrictMode>,
    );
  } catch (error) {
    root.render(
      <div className="loading-screen" role="alert">
        <h1>LET’S TRY AGAIN.</h1>
        <p>{(error as Error).message}</p>
        <button className="button primary" onClick={() => void start()}>
          Retry loading
        </button>
      </div>,
    );
  }
}
void start();
