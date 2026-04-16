import { buildMetadata } from "@/lib/seo";

export const careersPage = {
  metadata: buildMetadata({
    title: "Careers | Mindspan",
    description:
      "Join Mindspan. We are hiring neurologists, clinical psychologists, nurse practitioners, and care partners who want to practice the medicine they trained for.",
    canonical: "/careers",
  }),
  hero: {
    eyebrow: "Join Mindspan",
    title: "Practice the medicine you wanted to when you trained.",
    lead:
      "Unhurried visits, real tools, a team culture that respects craft. If you are tired of fifteen-minute visits and broken handoffs, come talk to us.",
  },
} as const;
