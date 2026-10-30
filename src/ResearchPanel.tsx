import { useState } from "react";
import type { DesignBrief } from "../shared/design";
import type { RoomDesign } from "../shared/room";
import type { DesignStudy } from "../shared/research";
import { TasteStudio } from "./TasteStudio";

export const emptyBrief: DesignBrief = {
  location: "", latitude: null, longitude: null, radius: 1500,
  purpose: "", direction: "", inspirations: [], tags: [], theme: "analog",
};

export function ResearchPanel({ brief: initial, room, savedStudy, onApply }: {
  brief?: DesignBrief; room: RoomDesign; savedStudy?: DesignStudy;
  onApply: (study: DesignStudy, directionId: string) => Promise<void>;
}) {
  const [brief, setBrief] = useState(initial ?? emptyBrief);
  const [study, setStudy] = useState<DesignStudy | null>(savedStudy ?? null);
  const [selectedId, setSelectedId] = useState(savedStudy?.selectedId ?? "");
  return <section className="research-panel">
    <div className="research-intro"><h2>Research your next idea.</h2><p>The AI Agent explores Qloo for your concept, then proposes options you can review in 3D.</p></div>
    <TasteStudio brief={brief} onBrief={setBrief} room={room} forNewProject={false} study={study} onStudy={setStudy} selectedId={selectedId} onSelect={setSelectedId}
      onApply={async () => { if (study) await onApply(study, selectedId); }} />
  </section>;
}
