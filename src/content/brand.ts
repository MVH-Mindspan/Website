export const brand = {
  name: "Mindspan",
  headline: "When memory starts to change, you shouldn\u2019t have to wait.",
  subhead:
    "Specialist neurologists for Alzheimer\u2019s, dementia, and cognitive change. Real answers, in weeks, not months.",
  subTagline: "Specialist cognitive care for families",
  reassurance:
    "Board-certified neurologists. In-clinic and video visits. Covered by insurance.",
  primaryCta: "Book a visit",
  primaryCtaHref: "/book-a-visit",
  secondaryCta: "Find a clinic",
  secondaryCtaHref: "#locations",
  footerTagline:
    "Specialist neurologists for Alzheimer\u2019s, dementia, and cognitive change. Clinics in Massachusetts and California, plus video visits. We bill insurance.",
  signature: "With care, the Mindspan team",
} as const;

export type Brand = typeof brand;
