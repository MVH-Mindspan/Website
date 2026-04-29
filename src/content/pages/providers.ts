import { brand } from "@/content/brand";
import { buildMetadata } from "@/lib/seo";

export const providersPage = {
  metadata: buildMetadata({
    title: "For Referring Clinicians | Mindspan",
    description:
      "Refer a patient with cognitive concerns. Mindspan sees them in two to three weeks, takes the dementia-specific work off your desk, and sends a structured note back to your chart.",
    canonical: "/providers",
  }),
  hero: {
    eyebrow: "For referring clinicians",
    title: "Cognitive care without the eighteen-month wait.",
    availability: {
      text: "Seeing referrals this month",
      cta: { label: "Start a referral", href: "/providers/refer" },
    },
    image: "/assets/providers-hero.webp",
    imageAlt:
      "A Mindspan neurologist in conversation with a patient across a desk in a sunlit consultation room",
    subTagline: "Refer in under five minutes.",
    subhead:
      "In-person clinics in Danvers (MA), Irvine (CA), and San Jose (CA), and video visits across Massachusetts and California. We see your patient in two to three weeks and send a structured note back to your chart.",
    primaryCta: { label: "Start a referral", href: "/providers/refer" },
    secondaryCta: { label: "See locations", href: "/locations" },
  },
  finalCta: {
    eyebrow: "When you are ready",
    title: "Send us your first referral.",
    lead:
      "We will reach your patient within forty-eight hours and have them in front of a neurologist in two to three weeks. We will keep you in the loop the whole way.",
    primary: { label: "Start a referral", href: "/providers/refer" },
    secondary: { label: `Call us: ${brand.phone}`, href: brand.phoneHref },
    signature: "With care, the Mindspan team",
  },
} as const;
