import { useEffect, useRef, useState } from "react";
import { ArrowUp, Bot, Check, Sparkles, X } from "lucide-react";
import type { RoomDesign } from "../shared/room";
import { api } from "./api";

interface Proposal {
  message: string;
  room: RoomDesign;
  changed: boolean;
  mode: string;
  changes: { label: string; instruction: string }[];
}
export function AgentChat({
  room,
  disabled,
  onPreview,
}: {
  room: RoomDesign;
  disabled: boolean;
  onPreview: (room: RoomDesign) => void;
}) {
  const [messages, setMessages] = useState<
    { role: "user" | "agent"; text: string }[]
  >([]);
  const [prompt, setPrompt] = useState("");
  const [useAI, setUseAI] = useState(false);
  const [aiReady, setAiReady] = useState(false);
  const touched = useRef(false);
  // The real agent is the default whenever the server has a key; local commands stay as the fallback.
  useEffect(() => {
    api<{ available: boolean }>("/agent")
      .then(({ available }) => { setAiReady(available); if (available && !touched.current) setUseAI(true); })
      .catch(() => {});
  }, []);
  const [pending, setPending] = useState(false);
  const [proposal, setProposal] = useState<{
    result: Proposal;
    base: string;
  } | null>(null);
  const [error, setError] = useState("");
  const sending = useRef(false);
  const snapshot = JSON.stringify(room);
  async function send(text: string) {
    if (!text.trim() || disabled || sending.current) return;
    sending.current = true;
    setPending(true);
    setError("");
    setProposal(null);
    setPrompt("");
    setMessages((current) => [...current, { role: "user", text }]);
    try {
      const result = await api<Proposal>("/agent", {
        message: text,
        room,
        mode: useAI ? "ai" : "local",
      });
      setMessages((current) => [
        ...current,
        { role: "agent", text: result.message },
      ]);
      if (result.changed) setProposal({ result, base: snapshot });
    } catch (error) {
      setError((error as Error).message);
    } finally {
      sending.current = false;
      setPending(false);
    }
  }
  return (
    <aside className="agent-chat" aria-label="Design agent">
      <header>
        <div className="agent-avatar">
          <Bot size={27} />
        </div>
        <div>
          <span className="eyebrow">YOUR CREATIVE SIDEKICK</span>
          <h2>Hey, Artist!</h2>
        </div>
        <Sparkles size={22} />
      </header>
      <div className="chat-intro">
        <strong>Big idea? Say the word.</strong>
        <p>
          Change the mood. Spawn or delete fixtures. Rearrange the whole
          floor. You have the final say.
        </p>
      </div>
      <label className="agent-mode">
        <input
          type="checkbox"
          checked={useAI}
          disabled={pending || !aiReady}
          onChange={(e) => { touched.current = true; setUseAI(e.target.checked); }}
        />
        {useAI ? "AI AGENT · natural language" : aiReady ? "LOCAL commands · tick to use the AI Agent" : "LOCAL commands · AI Agent key not configured"}
      </label>
      <div
        className="chat-messages"
        role="log"
        aria-live="polite"
        aria-label="Conversation"
      >
        {messages.length === 0 && (
          <div className="chat-empty">
            <span className="chat-empty-mark" aria-hidden="true" />
            <p>
              Your next “what if”
              <br />
              starts here.
            </p>
          </div>
        )}
        {messages.map((m, i) => (
          <div className={`chat-message ${m.role}`} key={i}>
            <small>{m.role === "user" ? "YOU" : "ARTIST"}</small>
            <p>{m.text}</p>
          </div>
        ))}
        {pending && <p role="status">Checking space & constraints…</p>}
      </div>
      {error && (
        <p className="chat-error" role="alert">
          {error}
        </p>
      )}
      {proposal && (
        <div className="agent-proposal">
          <strong>CHECKED EDIT PLAN</strong>
          <ul>
            {proposal.result.changes.map((c, i) => (
              <li key={i}>{c.instruction}</li>
            ))}
          </ul>
          {proposal.base !== snapshot && (
            <p>The room changed. Send the request again before applying.</p>
          )}
          <div className="row">
            <button
              className="button primary small"
              disabled={disabled || proposal.base !== snapshot}
              onClick={() => {
                onPreview(proposal.result.room);
                setProposal(null);
                setMessages((m) => [
                  ...m,
                  {
                    role: "agent",
                    text: "Preview applied and saved to your draft automatically. Your approved shop is unchanged; approval is still yours.",
                  },
                ]);
              }}
            >
              <Check size={15} />
              Apply preview
            </button>
            <button
              className="icon-button"
              aria-label="Dismiss agent proposal"
              onClick={() => setProposal(null)}
            >
              <X size={17} />
            </button>
          </div>
        </div>
      )}
      <div className="chat-suggestions">
        {["Add two plants", "Make it industrial", "Wall pink"].map((text) => (
          <button
            disabled={pending || disabled}
            key={text}
            onClick={() => void send(text)}
          >
            {text} ↗
          </button>
        ))}
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void send(prompt);
        }}
      >
        <label className="sr-only" htmlFor="agent-prompt">
          Message the design agent
        </label>
        <textarea
          id="agent-prompt"
          maxLength={2000}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Try ‘add a plant; accent yellow’"
          rows={3}
          required
          disabled={pending || disabled}
        />
        <button
          className="chat-send"
          aria-label="Send message"
          disabled={pending || disabled || !prompt.trim()}
        >
          <ArrowUp size={20} />
        </button>
      </form>
      <details className="agent-options">
        <summary>Commands & AI mode</summary>
        <p>
          Local commands: add [asset]; make it [style]; wall/floor/accent
          [colour]; move [exact fixture name or ID] to x, z rotate 90; remove
          [ID]; resize 14 x 12; arched windows. Separate edits with semicolons.
        </p>
        <p>
          Original procedural assets—not arbitrary generated 3D models. Shelf
          IDs and stock stay protected.
        </p>
        <p>
          This sends your message and room layout to the configured AI provider.
          Requires the server’s AI Agent key. No location, catalog or customer data is sent.
          Never approves automatically.
        </p>
      </details>
    </aside>
  );
}
