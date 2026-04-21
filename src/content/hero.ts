import { brand } from "./brand";

export const homeHero = {
  video: "/assets/hero-video.mp4",
  poster: "/assets/hero-poster.png",
  headline: brand.headline,
  subTagline: brand.subTagline,
  subhead: brand.subhead,
  cta: { label: "Book an appointment", href: "/book-a-visit" },
} as const;
