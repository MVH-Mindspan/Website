import { buildMetadata } from "@/lib/seo";
import { VIDEO_VISITS_ENABLED } from "@/lib/flags";

export const locationsPage = {
  metadata: buildMetadata({
    title: "Memory & Dementia Clinics in Danvers, MA and San Jose, CA | Mindspan",
    description: VIDEO_VISITS_ENABLED
      ? "Memory and dementia care clinics in Danvers, MA (North Shore) and San Jose, CA (Bay Area), plus video visits statewide in both states. Find the one nearest you."
      : "Memory and dementia care clinics in Danvers, MA (North Shore) and San Jose, CA (Bay Area). Find the one nearest you.",
    canonical: "/locations",
  }),
  hero: VIDEO_VISITS_ENABLED
    ? ({
        eyebrow: "Where we see patients",
        title: "Come see us. Or let us come to you, on video.",
        lead:
          "Clinics in Massachusetts and California, plus video visits anywhere in those two states.",
      } as const)
    : ({
        eyebrow: "Where we see patients",
        title: "Come see us.",
        lead: "Cognitive care clinics in Massachusetts and California.",
      } as const),
} as const;
