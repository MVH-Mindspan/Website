import { buildMetadata } from "@/lib/seo";

export const homePage = {
  metadata: buildMetadata({
    title: "Cognitive Care & Dementia Specialists | Mindspan",
    description:
      "See a neurologist in weeks, not months. Expert Alzheimer\u2019s and dementia assessments, personalized care plans, and family support. Book a visit in MA or CA.",
    canonical: "/",
  }),
} as const;
