import { buildMetadata } from "@/lib/seo";

export const providersPage = {
  metadata: buildMetadata({
    title: "For Providers | Mindspan",
    description:
      "Refer a patient for cognitive assessment, or join Mindspan as a clinician. Two ways to work with us.",
    canonical: "/providers",
  }),
  hero: {
    eyebrow: "For providers",
    title: "Two ways to work with Mindspan.",
    lead:
      "Whether you are referring a patient you already care about or looking for a place to practice this kind of medicine yourself, we would love to hear from you.",
  },
} as const;
