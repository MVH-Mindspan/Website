import { brand } from "./brand";

export const homeHero = {
  video: "/assets/hero-video.mp4",
  poster: "/assets/hero-poster.webp",
  headline: "When memory starts to change, you shouldn’t have to wait. Covered by Medicare.",
  subTagline: brand.subTagline,
  subhead: brand.subhead,
  cta: { label: "Book an appointment", href: "/book-a-visit" },
} as const;
