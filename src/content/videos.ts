/**
 * Video files, shared by every page that plays them (/watch, /clinic-videos).
 *
 * Files live in the R2 bucket "mindspan-media" and are served by worker.ts
 * at /media/<key> with byte-range support. Keys are versioned: upload a new
 * cut under a new key and point `src` at it; never overwrite a key.
 * Posters live in public/assets/watch/ (kept out of the TV signage manifest).
 *
 * Each video has a 1080p file (`src`) and, optionally, a 4K file (`uhd`).
 * The player streams 4K only on large screens such as clinic TVs and falls
 * back to 1080p if the 4K file will not play. Both sizes can be downloaded.
 */

export type VideoChapter = {
  label: string;
  /** Seconds into the video where this chapter starts. */
  start: number;
};

export type VideoFile = {
  src: string;
  /** Shown on its download button, e.g. "HD" or "4K". */
  qualityLabel: string;
  /** File name people get when they download this file. */
  downloadName: string;
  sizeLabel: string;
};

export type VideoAsset = VideoFile & {
  poster: string;
  width: number;
  height: number;
  /** Seconds. */
  duration: number;
  durationLabel: string;
  /** Optional 4K version of the same cut. */
  uhd?: VideoFile;
  chapters: VideoChapter[];
};

/** worker.ts sends the file as an attachment when ?download=<name> is set. */
export function downloadHref(file: VideoFile): string {
  return `${file.src}?download=${encodeURIComponent(file.downloadName)}`;
}

export const firstVisitIntro = {
  src: "/media/watch/first-visit-intro-v11.mp4",
  qualityLabel: "HD",
  downloadName: "Mindspan First Visit Intro.mp4",
  sizeLabel: "40 MB",
  uhd: {
    src: "/media/watch/first-visit-intro-v11-4k.mp4",
    qualityLabel: "4K",
    downloadName: "Mindspan First Visit Intro 4K.mp4",
    sizeLabel: "90 MB",
  },
  poster: "/assets/watch/first-visit-poster-v11.webp",
  width: 1920,
  height: 1080,
  duration: 368.6,
  durationLabel: "6 min",
  // Start times measured from the chapter bar burned into the film (v11).
  chapters: [
    { label: "Welcome", start: 0 },
    { label: "Discover", start: 123.4 },
    { label: "Decide", start: 214.1 },
    { label: "Care", start: 246.5 },
  ],
} satisfies VideoAsset;

export const referralOverview = {
  src: "/media/watch/referral-overview-v2.mp4",
  qualityLabel: "HD",
  downloadName: "Mindspan Referral Overview.mp4",
  sizeLabel: "21 MB",
  uhd: {
    src: "/media/watch/referral-overview-v2-4k.mp4",
    qualityLabel: "4K",
    downloadName: "Mindspan Referral Overview 4K.mp4",
    sizeLabel: "49 MB",
  },
  poster: "/assets/watch/referral-overview-poster-v2.webp",
  width: 1920,
  height: 1080,
  duration: 175.4,
  durationLabel: "3 min",
  // Start times measured from the chapter bar burned into the film (v2).
  chapters: [
    { label: "About us", start: 0 },
    { label: "Discover", start: 46.0 },
    { label: "Decide", start: 62.5 },
    { label: "Care", start: 77.5 },
    { label: "Science", start: 94.75 },
    { label: "Your visit", start: 115.25 },
  ],
} satisfies VideoAsset;

export const carePlanVisitIntro = {
  src: "/media/watch/care-plan-visit-intro-v3.mp4",
  qualityLabel: "HD",
  downloadName: "Mindspan Care Plan Visit Intro.mp4",
  sizeLabel: "27 MB",
  uhd: {
    src: "/media/watch/care-plan-visit-intro-v3-4k.mp4",
    qualityLabel: "4K",
    downloadName: "Mindspan Care Plan Visit Intro 4K.mp4",
    sizeLabel: "65 MB",
  },
  poster: "/assets/watch/care-plan-visit-poster-v3.webp",
  width: 1920,
  height: 1080,
  duration: 232.1,
  durationLabel: "4 min",
  // Start times measured from the chapter bar burned into the film (v3).
  chapters: [
    { label: "Welcome", start: 0 },
    { label: "What we learned", start: 48.25 },
    { label: "Your plan", start: 109.75 },
    { label: "Together", start: 176.25 },
  ],
} satisfies VideoAsset;
