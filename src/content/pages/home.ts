import { buildMetadata } from "@/lib/seo";
import { digitalTwinHref } from "../digitalTwin";

export const homePage = {
  metadata: buildMetadata({
    title: "Cognitive Care & Dementia Specialists in MA & CA | Mindspan",
    description:
      "See a neurologist in weeks, not months. Expert Alzheimer\u2019s and dementia assessments, personalized care plans, and family support. Book a visit in MA or CA.",
    canonical: "/",
  }),
  // Homepage section for the 10-year projection (Digital Twin introduction).
  // Outline button only, so it never outranks the existing booking CTAs.
  projection: {
    id: "ten-year-projection",
    eyebrow: "An introduction to our Digital Twin",
    title: "What might the next 10 years look like?",
    body:
      "Answer simple questions from home, for yourself or for someone you love. It is free and takes about 10 minutes. A chart then shows how memory may change over 10 years, with and without care. It is an estimate, not a diagnosis.",
    image: "/assets/digital-brain.webp",
    imageAlt: "A sculpture of a brain on a plinth, lit in segments of different colors.",
    secondary: {
      label: "Learn about the 10-year projection",
      href: digitalTwinHref("home-projection"),
    },
  },
} as const;
