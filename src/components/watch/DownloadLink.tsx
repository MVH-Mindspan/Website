"use client";

import { ANALYTICS_EVENTS, track } from "@/lib/analytics";
import { downloadHref, type VideoAsset } from "@/content/videos";

/** Downloads the video file (the Worker sends it as an attachment). */
export function DownloadLink({
  video,
  slug,
  label,
  className = "video-download",
}: {
  video: VideoAsset;
  slug: string;
  label: string;
  className?: string;
}) {
  return (
    <a
      href={downloadHref(video)}
      download={video.downloadName}
      className={className}
      aria-label={`${label}, ${video.sizeLabel}`}
      onClick={() => track(ANALYTICS_EVENTS.videoDownload, { video: slug })}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M8 1.5v9M4 7l4 4 4-4M2 14.5h12" />
      </svg>
      <span>{label}</span>
      <span className="video-download-size">{video.sizeLabel}</span>
    </a>
  );
}
