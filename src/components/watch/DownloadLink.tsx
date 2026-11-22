"use client";

import { ANALYTICS_EVENTS, track } from "@/lib/analytics";
import { downloadHref, type VideoAsset, type VideoFile } from "@/content/videos";

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M8 1.5v9M4 7l4 4 4-4M2 14.5h12" />
    </svg>
  );
}

/**
 * Downloads the video file (the Worker sends it as an attachment). With a 4K
 * version it shows one "Download" control with an HD and a 4K choice.
 */
export function DownloadLink({
  video,
  slug,
  label,
  compact = false,
}: {
  video: VideoAsset;
  slug: string;
  label: string;
  /** Hide the visible "Download" word (cards); screen readers still hear it. */
  compact?: boolean;
}) {
  const files: VideoFile[] = video.uhd ? [video, video.uhd] : [video];
  const onDownload = (file: VideoFile) =>
    track(ANALYTICS_EVENTS.videoDownload, { video: slug, quality: file.qualityLabel });

  if (files.length === 1) {
    return (
      <a
        href={downloadHref(video)}
        download={video.downloadName}
        className="video-download"
        aria-label={`${label}, ${video.sizeLabel}`}
        onClick={() => onDownload(video)}
      >
        <DownloadIcon />
        <span>{label}</span>
        <span className="video-download-size">{video.sizeLabel}</span>
      </a>
    );
  }

  return (
    <div
      className={`video-download-group${compact ? " is-compact" : ""}`}
      role="group"
      aria-label={label}
    >
      <DownloadIcon />
      <span className="video-download-label" aria-hidden="true">
        {label}
      </span>
      {files.map((file) => (
        <a
          key={file.src}
          href={downloadHref(file)}
          download={file.downloadName}
          aria-label={`${label} ${file.qualityLabel}, ${file.sizeLabel}`}
          onClick={() => onDownload(file)}
        >
          {file.qualityLabel}
          <span className="video-download-size">{file.sizeLabel}</span>
        </a>
      ))}
    </div>
  );
}
