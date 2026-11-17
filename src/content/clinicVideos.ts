import { buildMetadata } from "@/lib/seo";
import type { Film } from "./watch";
import { firstVisitIntroV10, type VideoAsset } from "./videos";

/**
 * Clinic video library at /clinic-videos.
 *
 * Front desk and care team pick a video by situation (the moment in the
 * patient experience) and play it on the clinic TV. Every video has its own
 * URL, /clinic-videos/<slug>, so it can be bookmarked or linked directly.
 *
 * Unlisted: noindex, not in the sitemap, never linked from the site.
 *
 * To add a video: upload the file (see CLOUDFLARE.md), add it to ./videos.ts,
 * then add an entry below. To add a situation, add it to `situations`;
 * situations show in this order, and only when they have videos.
 */

export type ClinicSituation = {
  id: string;
  label: string;
};

export type ClinicVideo = {
  slug: string;
  title: string;
  situationId: string;
  summary: string;
  video: VideoAsset;
};

export const situations = [
  { id: "discover-205", label: "Discover 205 visit" },
] satisfies ClinicSituation[];

export const clinicVideos = [
  {
    slug: "discover-205-intro",
    title: "Intro",
    situationId: "discover-205",
    summary:
      "Mindy welcomes the patient and walks through the visit: Welcome, Discover, Decide and Care.",
    video: firstVisitIntroV10,
  },
] satisfies ClinicVideo[];

export const clinicVideosPage = {
  metadata: buildMetadata({
    title: "Clinic videos | Mindspan",
    description: "Videos for the clinic TV, by moment in the patient visit.",
    canonical: "/clinic-videos",
    noIndex: true,
  }),
  eyebrow: "For the care team",
  title: "Clinic videos",
  lead: "Pick the moment in the visit, then choose a video to play on the TV.",
  situationsLabel: "Situations",
  videoCount: (n: number) => (n === 1 ? "1 video" : `${n} videos`),
  backLabel: "All videos",
};

export function situationFor(id: string): ClinicSituation | undefined {
  return situations.find((s) => s.id === id);
}

export function getClinicVideo(slug: string): ClinicVideo | undefined {
  return clinicVideos.find((v) => v.slug === slug);
}

/** Situations that have at least one video, in display order, with their videos. */
export function situationsWithVideos(): Array<ClinicSituation & { videos: ClinicVideo[] }> {
  return situations
    .map((s) => ({ ...s, videos: clinicVideos.filter((v) => v.situationId === s.id) }))
    .filter((s) => s.videos.length > 0);
}

/** Player page copy for one clinic video. Plays straight into full screen. */
export function clinicVideoFilm(v: ClinicVideo): Film {
  const situation = situationFor(v.situationId);
  const where = situation ? `${v.title}, ${situation.label}` : v.title;
  return {
    slug: v.slug,
    metadata: buildMetadata({
      title: `${where} | Clinic videos | Mindspan`,
      description: v.summary,
      canonical: `/clinic-videos/${v.slug}`,
      noIndex: true,
    }),
    eyebrow: situation?.label ?? clinicVideosPage.title,
    title: v.title,
    lead: v.summary,
    video: { ...v.video, ariaLabel: where },
    playLabel: "Play full screen",
    playFullscreen: true,
    fullscreenLabel: "Full screen",
    rotateHint: "Turn the screen sideways for a bigger picture.",
    chaptersLabel: "Chapters",
    end: {
      heading: "Finished.",
      replayLabel: "Play again",
      link: { label: clinicVideosPage.backLabel, href: "/clinic-videos" },
    },
  };
}
