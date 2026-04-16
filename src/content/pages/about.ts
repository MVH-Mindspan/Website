import { buildMetadata } from "@/lib/seo";

export const aboutPage = {
  metadata: buildMetadata({
    title: "About Mindspan | Cognitive Care & Dementia Specialists",
    description:
      "Why we started Mindspan, what we believe about cognitive care, and the team bringing it to life.",
    canonical: "/about",
  }),
  hero: {
    eyebrow: "About Mindspan",
    title: "A clinic built around the people who need it most.",
    lead:
      "We built Mindspan so that families worried about memory do not have to wait, and so neurologists can practice the medicine they trained for.",
  },
} as const;
