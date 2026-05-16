import { buildMetadata } from "@/lib/seo";
import {
  CMS_AUTHOR_DISCLAIMER,
  GUIDE_ELIGIBILITY_FOOTNOTE,
} from "@/content/guide-disclosures";
import type { Protocol } from "../protocols";
import type { Stat } from "../stats";

const BOOKING_HREF = "/book-a-visit";

export const coveragePage = {
  metadata: buildMetadata({
    title: "Coverage & Cost | Mindspan",
    description:
      "Mindspan is covered by Medicare, Medicaid, and many health plans. We handle the insurance so you can focus on your health.",
    canonical: "/coverage",
  }),

  hero: {
    eyebrow: "Coverage & cost",
    title: "Covered by Medicare, Medicaid, and many health plans.",
    lead: "We know cost and coverage anxiety is one of the main reasons people delay care. So let\u2019s answer this upfront: Mindspan accepts Medicare, Medicaid, and many health plans. We handle the insurance so you don\u2019t have to.",
  },

  howItWorks: {
    intro: {
      eyebrow: "How coverage works",
      title: "Billed like any other specialist visit.",
      lead: "Mindspan is an in-network specialist for many health plans. Your visit is billed the same way a visit to any neurologist or specialist would be, through your insurance.",
      image: "/assets/consultation-2.webp",
      imageAlt: "A member of the Mindspan care team",
    },
    insurance: {
      id: "insurance",
      eyebrow: "What we accept",
      title: "Medicare, Medicaid, and many health plans.",
      body: "We accept Medicare, Medicaid, and many health plans. Our team will verify your specific coverage before your first visit.",
      bullets: [
        "We verify your coverage before your first visit",
        "No surprise bills, we\u2019ll tell you what to expect upfront",
        "Our team handles prior authorizations and paperwork",
      ],
      icon: "shield",
    } satisfies Protocol,
  },

  guideBenefit: {
    eyebrow: "If you have Original Medicare",
    title: "An additional benefit for families navigating dementia.",
    lead:
      "If your loved one has a dementia diagnosis and is enrolled in Original Medicare, there may be more support available to you at no additional cost, coordinated through a Medicare-supported care model called GUIDE. It is not something you have to apply for on your own. If you qualify, we handle enrollment.",
    bullets: [
      "$0 copays for covered Mindspan visits",
      "24/7 specialist-staffed access (operated by Ianacare, our GUIDE Partner Organization) for questions and concerns",
      "Up to $2,500 per year in respite benefits for the primary caregiver",
      "A dedicated care coordinator who stays connected between visits",
    ],
    eligibilityTitle: "Who typically qualifies",
    eligibility: [
      "A dementia diagnosis (Alzheimer\u2019s, Lewy Body, vascular, or other)",
      "Enrolled in Original Medicare, Parts A and B (not Medicare Advantage or PACE)",
      "Located in Massachusetts or California (our current service areas for this program)",
    ],
    footnote: [GUIDE_ELIGIBILITY_FOOTNOTE, CMS_AUTHOR_DISCLAIMER],
    cta: { label: "Learn more about GUIDE", href: "/guide" },
  },

  stats: [
    { value: "100%", label: "Of visits billed through insurance" },
    { value: "Medicare", label: "Medicaid and many health plans" },
    { value: "2\u20133 weeks", valueShort: "2\u20133 wks", label: "Average time to see a neurologist" },
    { value: "0", label: "Out-of-pocket surprises, we tell you upfront" },
  ] satisfies Stat[],

  notSure: {
    eyebrow: "Not sure about your coverage?",
    title: "We\u2019ll figure it out together.",
    lead: "Don\u2019t let uncertainty about insurance stop you from reaching out. When you book an appointment, our team will verify your coverage before your visit and let you know exactly what to expect. If you\u2019re not covered, we\u2019ll tell you honestly.",
    primary: { label: "Book an appointment", href: BOOKING_HREF },
    secondary: { label: "How it works", href: "/about/how-it-works" },
  },
} as const;
