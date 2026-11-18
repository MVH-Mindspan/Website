"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { ANALYTICS_EVENTS, track } from "@/lib/analytics";
import { brand } from "@/content/brand";
import type { Film } from "@/content/watch";

const TEAL = "#083630";
const PROGRESS_MILESTONES = [25, 50, 75] as const;
// Completion fires at 95% so people who close during the closing card count.
const COMPLETE_AT = 0.95;

type IOSVideo = HTMLVideoElement & {
  webkitSupportsFullscreen?: boolean;
  webkitEnterFullscreen?: () => void;
  webkitExitFullscreen?: () => void;
};

type LockableOrientation = ScreenOrientation & {
  lock?: (orientation: string) => Promise<void>;
};

function formatTime(seconds: number): string {
  const s = Math.floor(seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/**
 * Plays an unlisted film. A branded poster with one play button; the first
 * tap plays with sound and hands over to the browser's native controls
 * (scrubbing, AirPlay, Cast, PiP and keyboard support come free). Chapter
 * buttons and the end panel sit outside the picture.
 */
export function FilmPlayer({ film }: { film: Film }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const sentMilestones = useRef(new Set<number>());
  const sentComplete = useRef(false);

  const { video } = film;
  const chapters = video.chapters;

  // Must run synchronously inside the click/tap handler: iOS only allows
  // playback with sound from a direct user gesture.
  const playFrom = useCallback(
    (seconds: number | null, source: string) => {
      const el = videoRef.current;
      if (!el) return;
      el.controls = true;
      if (seconds !== null) {
        if (el.readyState >= 1) {
          el.currentTime = seconds;
        } else {
          el.addEventListener(
            "loadedmetadata",
            () => {
              el.currentTime = seconds;
            },
            { once: true },
          );
        }
      }
      el.play().catch(() => {
        // Playback refused (rare). Native controls stay visible as a fallback.
      });
      if (!started) {
        setStarted(true);
        track(ANALYTICS_EVENTS.videoPlay, { video: film.slug, source });
      }
      setEnded(false);
    },
    [film.slug, started],
  );

  // Also synchronous inside the tap: fullscreen needs the user gesture too.
  const enterFullscreen = useCallback(
    (source = "fullscreen") => {
      const el = videoRef.current as IOSVideo | null;
      if (!el) return;
      if (!started) playFrom(null, source);
      try {
        if (el.requestFullscreen && document.fullscreenEnabled) {
          el.requestFullscreen()
            .then(() => {
              const orientation = screen.orientation as LockableOrientation | undefined;
              orientation?.lock?.("landscape").catch(() => {});
            })
            .catch(() => {});
        } else if (el.webkitSupportsFullscreen && el.webkitEnterFullscreen) {
          // iPhone: no element fullscreen, only the native video player.
          el.webkitEnterFullscreen();
        }
      } catch {
        // Fullscreen unavailable (some in-app browsers). Inline still works.
      }
    },
    [playFrom, started],
  );

  useEffect(() => {
    const el = videoRef.current as IOSVideo | null;
    if (!el) return;

    const onTimeUpdate = () => {
      const t = el.currentTime;
      let index = 0;
      chapters.forEach((chapter, i) => {
        if (t >= chapter.start) index = i;
      });
      setActiveChapter(index);

      const pct = (t / video.duration) * 100;
      for (const milestone of PROGRESS_MILESTONES) {
        if (pct >= milestone && !sentMilestones.current.has(milestone)) {
          sentMilestones.current.add(milestone);
          track(ANALYTICS_EVENTS.videoProgress, { video: film.slug, percent: milestone });
        }
      }
      if (t >= video.duration * COMPLETE_AT && !sentComplete.current) {
        sentComplete.current = true;
        track(ANALYTICS_EVENTS.videoComplete, { video: film.slug });
      }
    };

    const onEnded = () => {
      setEnded(true);
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
      try {
        el.webkitExitFullscreen?.();
      } catch {
        // Not in iOS fullscreen.
      }
    };

    const onFullscreenChange = () => {
      if (!document.fullscreenElement) {
        (screen.orientation as LockableOrientation | undefined)?.unlock?.();
      }
    };

    el.addEventListener("timeupdate", onTimeUpdate);
    el.addEventListener("ended", onEnded);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => {
      el.removeEventListener("timeupdate", onTimeUpdate);
      el.removeEventListener("ended", onEnded);
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
  }, [chapters, film.slug, video.duration]);

  return (
    <div className="watch-player">
      <div className="watch-frame">
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          width={video.width}
          height={video.height}
          preload="metadata"
          playsInline
          aria-label={video.ariaLabel}
          className="watch-video"
        />

        {!started && (
          <button
            type="button"
            className="watch-cover"
            onClick={() =>
              film.playFullscreen ? enterFullscreen("poster") : playFrom(null, "poster")
            }
            aria-label={`${film.playLabel}: ${video.ariaLabel}`}
          >
            <span className="watch-play-pill">
              <span className="watch-play-icon" aria-hidden="true">
                <svg width="16" height="18" viewBox="0 0 16 18" fill={TEAL}>
                  <path d="M15 7.27a2 2 0 0 1 0 3.46L3 17.66A2 2 0 0 1 0 15.93V2.07A2 2 0 0 1 3 .34z" />
                </svg>
              </span>
              <span>{film.playLabel}</span>
              <span className="watch-play-duration">{video.durationLabel}</span>
            </span>
          </button>
        )}

        {ended && (
          <div className="watch-end" role="region" aria-label={film.end.heading}>
            <p className="watch-end-heading">{film.end.heading}</p>
            <div className="watch-end-actions">
              <Button variant="secondary" size="lg" onClick={() => playFrom(0, "replay")}>
                {film.end.replayLabel}
              </Button>
              <Button variant="ghostLight" size="lg" href={film.end.link.href}>
                {film.end.link.label}
              </Button>
            </div>
            {film.end.phonePrompt && (
              <a
                className="watch-end-phone"
                href={brand.phoneHref}
                data-analytics-location={`watch_${film.slug}`}
              >
                {film.end.phonePrompt}
              </a>
            )}
          </div>
        )}
      </div>

      <div className="watch-touch-row">
        <p className="watch-rotate-hint">{film.rotateHint}</p>
        <button type="button" className="watch-fullscreen" onClick={() => enterFullscreen()}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M1 5V1h4M11 1h4v4M15 11v4h-4M5 15H1v-4" />
          </svg>
          {film.fullscreenLabel}
        </button>
      </div>

      <nav aria-label={film.chaptersLabel} className="watch-chapters">
        <ol data-count={chapters.length}>
          {chapters.map((chapter, i) => {
            const active = started && i === activeChapter;
            return (
              <li key={chapter.label}>
                <button
                  type="button"
                  aria-current={active ? "true" : undefined}
                  aria-label={`${chapter.label}, starts at ${formatTime(chapter.start)}`}
                  data-active={active || undefined}
                  onClick={() => {
                    track(ANALYTICS_EVENTS.videoChapterSelect, {
                      video: film.slug,
                      chapter: chapter.label,
                    });
                    playFrom(chapter.start, "chapter");
                  }}
                >
                  <span className="watch-chapter-label">{chapter.label}</span>
                  <span className="watch-chapter-time">{formatTime(chapter.start)}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
