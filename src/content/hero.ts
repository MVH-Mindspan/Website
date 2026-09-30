import { brand } from "./brand";
import { MINDSPAN_FIRST_VISIT, TYPICAL_SPECIALIST_WAIT } from "./stats";

// Keep each figure on one line: word joiners around the dash, no-break spaces.
const nowrap = (s: string) => s.replace(/–/g, "\u2060–\u2060").replace(/ /g, "\u00a0");

export const homeHero = {
  video: "/assets/hero-video.mp4",
  poster: "/assets/hero-poster.webp",
  headline: "When memory starts to change, you shouldn’t have to wait.",
  subTagline: brand.subTagline,
  subhead: brand.subhead,
  cta: { label: "Start the free assessment", href: "https://assessment.mindspan.co/" },
  ctaNote: `Seen in ${nowrap(MINDSPAN_FIRST_VISIT)}, not ${nowrap(TYPICAL_SPECIALIST_WAIT)}.`,
  secondaryCta: { label: "Book a visit", href: "/book-a-visit" },
  reassurance: brand.coverage,
} as const;
