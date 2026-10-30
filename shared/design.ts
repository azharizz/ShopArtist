import type { ThemeId } from "./types.js";
import type { RoomDesign } from "./room.js";

export interface DesignBrief {
  location: string;
  latitude: number | null;
  longitude: number | null;
  radius: number;
  purpose: string;
  direction?: string;
  inspirations: string[];
  tags: string[];
  theme: ThemeId;
}
export interface ProjectSummary {
  id: string;
  name: string;
  updatedAt: string;
  style: RoomDesign["style"];
  focuses: RoomDesign["focuses"];
  location: string;
  versions: number;
}
export const inspirationCatalog = [
  {
    id: "demo:artist:0",
    name: "Blue Hour Quartet",
    domain: "Music",
    theme: "midnight",
  },
  {
    id: "demo:artist:1",
    name: "Paper Satellites",
    domain: "Music",
    theme: "analog",
  },
  {
    id: "demo:artist:2",
    name: "Moss & Morning",
    domain: "Music",
    theme: "quiet",
  },
  {
    id: "demo:artist:3",
    name: "Neon Orchestra",
    domain: "Music",
    theme: "electric",
  },
  {
    id: "demo:book:0",
    name: "City After Dark",
    domain: "Books",
    theme: "midnight",
  },
  {
    id: "demo:book:1",
    name: "The Printed Weekend",
    domain: "Books",
    theme: "analog",
  },
  {
    id: "demo:book:2",
    name: "A Field Guide to Slowing Down",
    domain: "Books",
    theme: "quiet",
  },
  {
    id: "demo:book:3",
    name: "Tomorrow in Colour",
    domain: "Books",
    theme: "electric",
  },
  {
    id: "demo:brand:0",
    name: "Midnight Atelier",
    domain: "Fashion",
    theme: "midnight",
  },
  {
    id: "demo:movie:1",
    name: "The Saturday Project",
    domain: "Film",
    theme: "analog",
  },
  {
    id: "demo:place:2",
    name: "The Quiet Courtyard",
    domain: "Places",
    theme: "quiet",
  },
  {
    id: "demo:brand:3",
    name: "Electric Objects",
    domain: "Design",
    theme: "electric",
  },
] as const;
export const tasteTags = [
  "jazz",
  "independent print",
  "slow living",
  "new wave",
  "streetwear",
  "craft",
  "architecture",
  "specialty coffee",
];
export interface ResearchQuery {
  title: string;
  endpoint: string;
  parameters: Record<string, string | number>;
  note: string;
  source: string;
}
export function researchQueries(brief: DesignBrief): ResearchQuery[] {
  const location =
    brief.latitude !== null && brief.longitude !== null
      ? `POINT(${brief.longitude} ${brief.latitude})`
      : brief.location;
  const signal =
    brief.latitude !== null ? "signal.location" : "signal.location.query";
  const filter =
    brief.latitude !== null ? "filter.location" : "filter.location.query";
  const context: Record<string, string | number> = {};
  if (location) context[signal] = location;
  // Demo IDs must be resolved to verified Qloo IDs before any live request.
  if (brief.inspirations.length)
    context["signal.interests.entities"] = brief.inspirations.join(",");
  if (brief.tags.length)
    context["signal.interests.tags"] = brief.tags
      .map((t) => `demo:tag:${t}`)
      .join(",");
  return [
    {
      title: "Discover & resolve inspirations",
      endpoint: "/search",
      parameters: {
        query: brief.inspirations
          .map((id) => inspirationCatalog.find((a) => a.id === id)?.name ?? id)
          .join(", "),
        take: 10,
      },
      note: "Resolve each name separately and review ambiguous matches. Search radius uses miles; Insights radius uses metres.",
      source: "get-search",
    },
    {
      title: "Discover taste tags",
      endpoint: "/v2/tags",
      parameters: { "filter.query": brief.tags.join(" "), take: 10 },
      note: "Resolve each interest to an actual tag ID. Free text and demo IDs are not valid live signals.",
      source: "get-tags",
    },
    ...(
      ["artist", "book", "brand", "movie", "place", "destination"] as const
    ).map((type) => ({
      title: `${type[0].toUpperCase() + type.slice(1)} connections`,
      endpoint: "/v2/insights",
      parameters: { ...context, "filter.type": `urn:entity:${type}`, take: 10 },
      note: "Cross-category affinity informs a creative interpretation—not an interior-design recommendation from Qloo.",
      source: "basic-insights-use-case",
    })),
    {
      title: "Taste vocabulary",
      endpoint: "/v2/insights",
      parameters: { ...context, "filter.type": "urn:tag", take: 10 },
      note: "Use associated themes to brief materials, artwork and music. No customer-level profiling.",
      source: "taste-analysis",
    },
    {
      title: "Nearby places",
      endpoint: "/v2/insights",
      parameters: {
        ...context,
        "filter.type": "urn:entity:place",
        [filter]: location,
        "filter.location.radius": brief.radius,
        take: 10,
      },
      note: "A location signal influences taste; a location filter restricts where returned places are. Named locality matching must be reviewed.",
      source: "insights-with-location-use-case",
    },
    {
      title: "Geographic taste map",
      endpoint: "/v2/insights",
      parameters: {
        ...context,
        "filter.type": "urn:heatmap",
        [filter]: location,
      },
      note: "Needs a resolved entity or tag signal and a location filter. Affinity, affinity rank and popularity are distinct; none means foot traffic or sales.",
      source: "heatmaps-use-case",
    },
    {
      title: "Compare two taste directions",
      endpoint: "/v2/analysis/compare",
      parameters: {
        "a.signal.interests.entities": brief.inspirations.slice(0, 1).join(","),
        "b.signal.interests.entities": brief.inspirations.slice(1).join(","),
      },
      note: "Requires two non-empty resolved entity groups. Compare signals before committing to a shop direction.",
      source: "analysis-compare",
    },
    {
      title: "Trend context",
      endpoint: "/trends/entity",
      parameters: {
        entity_id: brief.inspirations[0] ?? "",
        start_date: "Select a start date",
        end_date: "Select an end date",
      },
      note: "Entity trend coverage depends on entitlement. Category trends have limited categories; never infer a sales forecast.",
      source: "get-trends-entity",
    },
  ];
}
