import type { Metadata } from "next";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { brand } from "./brand";
import { firstVisitIntroV10, referralOverviewV1, type VideoAsset } from "./videos";

/**
 * Unlisted films served at /watch/<slug>.
 *
 * These pages are noindex, are not in the sitemap, and must never be linked
 * from the site. Share the URL directly (email, messages). They link only to
 * the main site, never to /clinic-videos, so a shared link shows one video.
 * Clinic library videos share these pages (ClinicVideo.shareSlug).
 *
 * Video files and chapter times live in ./videos.ts.
 */

export type { VideoChapter as FilmChapter } from "./videos";

export type Film = {
  slug: string;
  metadata: Metadata;
  eyebrow: string;
  title: string;
  titleEmphasis?: string;
  lead: string;
  video: VideoAsset & { ariaLabel: string };
  playLabel: string;
  /** Start playback in full screen (clinic TVs). */
  playFullscreen?: boolean;
  fullscreenLabel: string;
  downloadLabel: string;
  shareLabel: string;
  rotateHint: string;
  chaptersLabel: string;
  end: {
    heading: string;
    replayLabel: string;
    link: { label: string; href: string };
    phonePrompt?: string;
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
      ...firstVisitIntroV10,
      ariaLabel: "Your first visit to Mindspan, a six-minute film",
    },
    playLabel: "Play",
    fullscreenLabel: "Full screen",
    downloadLabel: "Download",
    shareLabel: "Share",
    rotateHint: "Turn your phone sideways for a bigger picture.",
    chaptersLabel: "Chapters",
    end: {
      heading: "Thanks for watching.",
      replayLabel: "Watch again",
      link: { label: "Visit mindspan.co", href: "/?from=watch-first-visit" },
      phonePrompt: `Questions? Call ${brand.phone}`,
    },
  },
  {
    slug: "referral",
    metadata: buildMetadata({
      title: "Your referral to Mindspan",
      description:
        "A three-minute film. Mindy, our AI assistant, explains who we are, what a referral from your doctor means, and what happens next.",
      canonical: "/watch/referral",
      image: "https://mindspan.co/assets/watch/referral-og-v1.jpg",
      imageAlt: "Mindy, Mindspan's AI assistant: your doctor may have referred you to Mindspan",
      noIndex: true,
    }),
    eyebrow: "A short film",
    title: "Your referral to",
    titleEmphasis: "Mindspan.",
    lead: "Three minutes with Mindy, our AI assistant, on who we are and what happens next.",
    video: {
      ...referralOverviewV1,
      ariaLabel: "Your referral to Mindspan, a three-minute film",
    },
    playLabel: "Play",
    fullscreenLabel: "Full screen",
    downloadLabel: "Download",
    shareLabel: "Share",
    rotateHint: "Turn your phone sideways for a bigger picture.",
    chaptersLabel: "Chapters",
    end: {
      heading: "Thanks for watching.",
      replayLabel: "Watch again",
      link: { label: "Visit mindspan.co", href: "/?from=watch-referral" },
      phonePrompt: `Questions? Call ${brand.phone}`,
    },
  },
] satisfies Film[];

export function getFilm(slug: string): Film | undefined {
  return films.find((film) => film.slug === slug);
}

/** The public, standalone URL for a film. This is what Share sends. */
export function filmShareUrl(slug: string): string {
  return `${SITE_URL}/watch/${slug}`;
}
