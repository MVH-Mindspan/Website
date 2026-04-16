import { buildMetadata } from "@/lib/seo";

export const referPage = {
  metadata: buildMetadata({
    title: "Refer a Patient | Mindspan",
    description:
      "Refer a patient to a Mindspan neurologist. First appointments typically within two to three weeks, clean notes back to your chart.",
    canonical: "/providers/refer",
  }),
  hero: {
    eyebrow: "Refer a patient",
    title: "Get your patient seen by a neurologist in weeks.",
    lead:
      "You are already the trusted doctor. We are the specialist partner who makes that job easier. Fast access for your patient, a thoughtful assessment, and clean notes back in your chart.",
  },
} as const;
