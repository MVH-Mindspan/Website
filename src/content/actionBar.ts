import { brand } from "./brand";

// Sticky mobile action bar on the homepage: the three funnel entry points,
// in thumb reach, for caregivers arriving on phones.
export const actionBar = {
  call: {
    label: "Call",
    href: brand.phoneHref,
    ariaLabel: `Call Mindspan at ${brand.phone}`,
  },
  assessment: {
    label: "Free assessment",
    href: "https://assessment.mindspan.co/",
  },
  book: { label: "Book", href: brand.primaryCtaHref },
} as const;
