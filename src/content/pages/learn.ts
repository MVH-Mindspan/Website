import { buildMetadata } from "@/lib/seo";

export const learnPage = {
  metadata: buildMetadata({
    title: "Learn | Mindspan",
    description:
      "Plain answers about memory, dementia and cognitive care from Mindspan neurologists and care partners. What to expect, what helps, and what to ask.",
    canonical: "/learn",
  }),
  hero: {
    eyebrow: "Learn",
    title: "Plain answers about memory and the brain.",
    lead:
      "Written by the clinicians who see families every day. No jargon, no scare stories. What we know, what we do, and what you can do next.",
  },
  empty: "New articles are on the way. Check back soon.",
  feedLabel: "RSS feed",
} as const;
