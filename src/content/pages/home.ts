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
    title: "See how the next ten years may go, for you or someone you love.",
    body:
      "Answer plain questions from home, for yourself or a loved one, in about ten minutes. See how memory and daily life may change over the next ten years, and how the latest science may change that path. It is an estimate, not a diagnosis, and a good way to start a conversation with a neurologist.",
    image: "/assets/digital-brain.webp",
    imageAlt: "A sculpture of a brain on a plinth, lit in segments of different colors.",
    secondary: {
      label: "See the ten-year projection",
      href: digitalTwinHref("home-projection"),
    },
  },
} as const;
