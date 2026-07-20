import { brand } from "./brand";

export const homeHero = {
  video: "/assets/hero-video.mp4",
  poster: "/assets/hero-poster.webp",
  headline: "When memory starts to change, you shouldn’t have to wait.",
  subTagline: brand.subTagline,
  subhead: brand.subhead,
  cta: { label: "Start the free assessment", href: "https://assessment.mindspan.co/" },
  ctaNote: "Seen in 2⁠–⁠3 weeks, not 12+ months.",
  secondaryCta: { label: "Book a visit", href: "/book-a-visit" },
  reassurance: brand.coverage,
} as const;
