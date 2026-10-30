import type { RoomDesign } from "./room.js";

export interface TasteEntity {
  id: string;
  name: string;
  type: string;
  detail?: string;
  affinity?: number;
  latitude?: number;
  longitude?: number;
  description?: string;
}
export interface TastePoint {
  latitude: number;
  longitude: number;
  affinity: number;
}
export interface TasteResearch {
  source: "qloo";
  location: string;
  anchors: TasteEntity[];
  tags: TasteEntity[];
  artists: TasteEntity[];
  brands: TasteEntity[];
  places?: TasteEntity[];
  points: TastePoint[];
  warnings: string[];
  proposal?: { room: RoomDesign; explanation: string; influences: string[] };
}

export interface DesignDirection {
  id: string;
  name: string;
  description: string;
  evidence: TasteEntity[];
  room: RoomDesign;
  changes: string[];
  decisions?: { choice: string; interpretation: string; evidence: TasteEntity[] }[];
  assetIdea?: { brief: string; reason: string; referenceId?: string };
}
export interface DesignStudy {
  id: string;
  brief: import("./design.js").DesignBrief;
  research: TasteResearch;
  directions: DesignDirection[];
  selectedId?: string;
  createdAt: string;
}
