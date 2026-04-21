import { buildMetadata } from "@/lib/seo";
import type { Protocol } from "../protocols";
import type { Stat } from "../stats";

const BOOKING_HREF = "/book-a-visit";

export const coveragePage = {
  metadata: buildMetadata({
    title: "Coverage & Cost | Mindspan",
    description:
      "Mindspan is covered by Medicare and most major insurance plans. We handle the insurance so you can focus on your health.",
    canonical: "/coverage",
  }),

  hero: {
    eyebrow: "Coverage & cost",
    title: "Covered by Medicare and most major plans.",
    lead: "We know cost and coverage anxiety is one of the main reasons people delay care. So let\u2019s answer this upfront: Mindspan accepts Medicare and most major insurance. We handle the insurance so you don\u2019t have to.",
  },

  howItWorks: {
    intro: {
      eyebrow: "How coverage works",
      title: "Billed like any other specialist visit.",
      lead: "Mindspan is an in-network specialist for most major plans. Your visit is billed the same way a visit to any neurologist or specialist would be \u2014 through your insurance.",
      image: "/assets/consultation-2.png",
      imageAlt: "A member of the Mindspan care team",
    },
    insurance: {
      id: "insurance",
      eyebrow: "What we accept",
      title: "Medicare, Medicaid, and most major plans.",
      body: "We accept Medicare, most Medicare Advantage plans, and major commercial insurance including Blue Cross Blue Shield, Aetna, Cigna, United Healthcare, and others. Our team will verify your specific coverage before your first visit.",
      bullets: [
        "Medicare and most Medicare Advantage plans",
        "Blue Cross Blue Shield",
        "Aetna, Cigna, United Healthcare, and other major plans",
        "We verify your coverage before your first visit",
        "No surprise bills \u2014 we\u2019ll tell you what to expect upfront",
        "Our team handles prior authorizations and paperwork",
      ],
      icon: "shield",
    } satisfies Protocol,
    guide: {
      id: "guide",
      eyebrow: "The GUIDE program",
      title: "Structured support for dementia care, through Medicare.",
      body: "Mindspan participates in the GUIDE program \u2014 a Medicare-supported initiative that provides coordinated care, caregiver support, and a dedicated care team for people living with dementia. If you or your loved one qualifies, your care coordinator will walk you through what\u2019s included.",
      bullets: [
        "Coordinated care for people living with dementia",
        "Caregiver education and support built in",
        "A dedicated care coordinator who stays connected between visits",
        "Available to Medicare beneficiaries who qualify",
        "Covered at no additional cost to you",
        "We handle the enrollment \u2014 just let us know you\u2019re interested",
      ],
      icon: "bullseye",
    } satisfies Protocol,
  },

  stats: [
    { value: "100%", label: "Of visits billed through insurance" },
    { value: "Medicare", label: "Most major plans accepted" },
    { value: "2\u20133 wks", label: "Average time to see a neurologist" },
    { value: "0", label: "Out-of-pocket surprises \u2014 we tell you upfront" },
  ] satisfies Stat[],

  notSure: {
    eyebrow: "Not sure about your coverage?",
    title: "We\u2019ll figure it out together.",
    lead: "Don\u2019t let uncertainty about insurance stop you from reaching out. When you book an appointment, our team will verify your coverage before your visit and let you know exactly what to expect. If you\u2019re not covered, we\u2019ll tell you honestly.",
    primary: { label: "Book an appointment", href: BOOKING_HREF },
    secondary: { label: "How it works", href: "/about/how-it-works" },
  },
} as const;
