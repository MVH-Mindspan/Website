import { buildMetadata } from "@/lib/seo";
import type {
  LegalBlock,
  LegalSection,
} from "@/components/organisms/sections/LegalDocument";

const intro: LegalBlock[] = [
  {
    kind: "p",
    text: "The Mindspan Services are provided by Mindspan Group, Inc. together with its affiliated medical practices. Listed below are the medical practices owned or operated by Mindspan that deliver clinical care to patients across the country.",
  },
];

const sections: LegalSection[] = [
  {
    heading: "Affiliated medical practices",
    blocks: [
      {
        kind: "list",
        items: [
          "Mindspan Medical P.C.",
          "Riiid Medical Group Irvine, Inc.",
          "New York Remote Medical, P.C.",
          "Perry Medical Group of Florida, P.A.",
          "Perry Medical Group of California, P.C.",
          "Perry Medical Group of New Jersey, P.A.",
        ],
      },
    ],
  },
];

export const affiliatesPage = {
  metadata: buildMetadata({
    title: "Affiliates | Mindspan",
    description:
      "The medical practices affiliated with Mindspan Group, Inc. that deliver care to our patients.",
    canonical: "/affiliates",
  }),
  hero: {
    eyebrow: "Legal",
    title: "Affiliates",
    lead: "Mindspan Group, Inc. and our affiliated medical practices.",
  },
  document: { intro, sections },
} as const;
