import { buildMetadata } from "@/lib/seo";

export const locationsPage = {
  metadata: buildMetadata({
    title: "Our Locations | Mindspan",
    description:
      "Cognitive care clinics in Massachusetts and California, plus video visits statewide in both. Find the one nearest you.",
    canonical: "/locations",
  }),
  hero: {
    eyebrow: "Where we see patients",
    title: "Come see us. Or let us come to you, on video.",
    lead:
      "Clinics in Massachusetts and California, plus video visits anywhere in those two states.",
  },
} as const;
