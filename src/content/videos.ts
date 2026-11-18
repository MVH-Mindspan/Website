/**
 * Video files, shared by every page that plays them (/watch, /clinic-videos).
 *
 * Files live in the R2 bucket "mindspan-media" and are served by worker.ts
 * at /media/<key> with byte-range support. Keys are versioned: upload a new
 * cut under a new key and point `src` at it; never overwrite a key.
 * Posters live in public/assets/watch/ (kept out of the TV signage manifest).
 */

export type VideoChapter = {
  label: string;
  /** Seconds into the video where this chapter starts. */
  start: number;
};

export type VideoAsset = {
  src: string;
  poster: string;
  width: number;
  height: number;
  /** Seconds. */
  duration: number;
  durationLabel: string;
  /** File name people get when they download the video. */
  downloadName: string;
  sizeLabel: string;
  chapters: VideoChapter[];
};

/** worker.ts sends the file as an attachment when ?download=<name> is set. */
export function downloadHref(video: VideoAsset): string {
  return `${video.src}?download=${encodeURIComponent(video.downloadName)}`;
}

export const firstVisitIntroV10 = {
  src: "/media/watch/first-visit-intro-v10.mp4",
  poster: "/assets/watch/first-visit-poster-v10.webp",
  width: 1920,
  height: 1080,
  duration: 368.6,
  durationLabel: "6 min",
  downloadName: "Mindspan First Visit Intro.mp4",
  sizeLabel: "35 MB",
  // Start times measured from the chapter bar burned into the film (v10).
  chapters: [
    { label: "Welcome", start: 0 },
    { label: "Discover", start: 123.4 },
    { label: "Decide", start: 214.1 },
    { label: "Care", start: 246.5 },
  ],
} satisfies VideoAsset;

export const referralOverviewV1 = {
  src: "/media/watch/referral-overview-v1.mp4",
  poster: "/assets/watch/referral-overview-poster-v1.webp",
  width: 1920,
  height: 1080,
  duration: 175.4,
  durationLabel: "3 min",
  downloadName: "Mindspan Referral Overview.mp4",
  sizeLabel: "21 MB",
  // Start times measured from the chapter bar burned into the film (v1).
  chapters: [
    { label: "About us", start: 0 },
    { label: "Discover", start: 46.0 },
    { label: "Decide", start: 62.5 },
    { label: "Care", start: 77.5 },
    { label: "Science", start: 94.75 },
    { label: "Your visit", start: 115.25 },
  ],
} satisfies VideoAsset;

export const carePlanVisitIntroV2 = {
  src: "/media/watch/care-plan-visit-intro-v2.mp4",
  poster: "/assets/watch/care-plan-visit-poster-v2.webp",
  width: 1920,
  height: 1080,
  duration: 232.1,
  durationLabel: "4 min",
  downloadName: "Mindspan Care Plan Visit Intro.mp4",
  sizeLabel: "27 MB",
  // Start times measured from the chapter bar burned into the film (v2).
  chapters: [
    { label: "Welcome", start: 0 },
    { label: "What we learned", start: 48.25 },
    { label: "Your plan", start: 109.75 },
    { label: "Together", start: 176.25 },
  ],
} satisfies VideoAsset;
