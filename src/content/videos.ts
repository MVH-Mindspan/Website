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
  chapters: VideoChapter[];
};

export const firstVisitIntroV10 = {
  src: "/media/watch/first-visit-intro-v10.mp4",
  poster: "/assets/watch/first-visit-poster-v10.webp",
  width: 1920,
  height: 1080,
  duration: 368.6,
  durationLabel: "6 min",
  // Start times measured from the chapter bar burned into the film (v10).
  chapters: [
    { label: "Welcome", start: 0 },
    { label: "Discover", start: 123.4 },
    { label: "Decide", start: 214.1 },
    { label: "Care", start: 246.5 },
  ],
} satisfies VideoAsset;
