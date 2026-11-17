import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { brand } from "./brand";

/**
 * Unlisted films served at /watch/<slug>.
 *
 * These pages are noindex, are not in the sitemap, and must never be linked
 * from the site. Share the URL directly (email, messages).
 *
 * The video file lives in the R2 bucket "mindspan-media" and is served by
 * worker.ts at /media/<key> (with byte-range support). Keys are versioned:
 * upload a new cut under a new key and update `src`; never overwrite a key.
 */

export type FilmChapter = {
  label: string;
  /** Seconds into the film where this chapter starts. */
  start: number;
};

export type Film = {
  slug: string;
  metadata: Metadata;
  eyebrow: string;
  title: string;
  titleEmphasis: string;
  lead: string;
  video: {
    src: string;
    poster: string;
    width: number;
    height: number;
    /** Seconds. */
    duration: number;
    durationLabel: string;
    ariaLabel: string;
  };
  playLabel: string;
  fullscreenLabel: string;
  rotateHint: string;
  chaptersLabel: string;
  chapters: FilmChapter[];
  end: {
    heading: string;
    replayLabel: string;
    siteLabel: string;
    siteHref: string;
    phonePrompt: string;
  };
};

export const films = [
  {
    slug: "first-visit",
    metadata: buildMetadata({
      title: "Your first visit to Mindspan",
      description:
        "A six-minute film. Mindy, our AI assistant, walks through what happens at a first visit to Mindspan, from welcome to care plan.",
      canonical: "/watch/first-visit",
      image: "https://mindspan.co/assets/watch/first-visit-og-v10.jpg",
      imageAlt: "Mindy, Mindspan's AI assistant, welcomes you to Mindspan",
      noIndex: true,
    }),
    eyebrow: "A short film",
    title: "Your first visit to",
    titleEmphasis: "Mindspan.",
    lead: "Six minutes with Mindy, our AI assistant, on what happens at a first visit.",
    video: {
      src: "/media/watch/first-visit-intro-v10.mp4",
      poster: "/assets/watch/first-visit-poster-v10.webp",
      width: 1920,
      height: 1080,
      duration: 368.6,
      durationLabel: "6 min",
      ariaLabel: "Your first visit to Mindspan, a six-minute film",
    },
    playLabel: "Play",
    fullscreenLabel: "Full screen",
    rotateHint: "Turn your phone sideways for a bigger picture.",
    chaptersLabel: "Chapters",
    // Start times measured from the chapter bar burned into the film (v10).
    chapters: [
      { label: "Welcome", start: 0 },
      { label: "Discover", start: 123.4 },
      { label: "Decide", start: 214.1 },
      { label: "Care", start: 246.5 },
    ],
    end: {
      heading: "Thanks for watching.",
      replayLabel: "Watch again",
      siteLabel: "Visit mindspan.co",
      siteHref: "/?from=watch-first-visit",
      phonePrompt: `Questions? Call ${brand.phone}`,
    },
  },
] satisfies Film[];

export function getFilm(slug: string): Film | undefined {
  return films.find((film) => film.slug === slug);
}
