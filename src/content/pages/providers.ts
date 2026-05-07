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
    video: "/assets/providers-hero-video.mp4",
    poster: "/assets/providers-hero-poster.webp",
    headline: "Specialty cognitive care, with you still in the lead.",
    subTagline: "True co-management, not a hand-off.",
    subhead:
      "We absorb the dementia-specific work, assessment, biomarkers, infusion oversight, behavioral support, and send a structured note back to your chart after every visit. Your patient stays your patient.",
    cta: { label: "See how we partner", href: "#how-we-work" },
  },
  finalCta: {
    eyebrow: "Let's work together",
    title: "A quiet specialty partner, ready when you are.",
    lead:
      "We accept your existing referral workflow, Athena, fax, or secure email. Your patient is in front of a neurologist in two to three weeks, and a structured note arrives in your chart days later.",
    primary: { label: "Refer a patient", href: "/providers/refer" },
    secondary: { label: `Call us: ${brand.phone}`, href: brand.phoneHref },
    signature: "With care, the Mindspan team",
  },
} as const;
