"use client";

import { useRef, useState } from "react";
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";
import { Container } from "@/components/atoms/Container";
import { Button } from "@/components/atoms/Button";
import { Reveal } from "@/components/molecules/Reveal";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { ANALYTICS_EVENTS, track } from "@/lib/analytics";

type Tone = "cream" | "sand";

type FullscreenVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void };

/** Large controls sized for older viewers: 60px targets, 1.125rem labels. */
const bigButton = { minHeight: 60, fontSize: "1.125rem", padding: "18px 32px" } as const;

/**
 * Full-width, self-hosted video with oversized controls. Built for an older
 * audience: a big centred play target on the poster, plus labelled Play/Pause
 * and Full screen buttons under the frame. Nothing downloads until play.
 * Self-hosted files must carry burned-in captions (there is no <track>).
 */
export function VideoShowcase({
  id,
  eyebrow,
  title,
  body,
  src,
  poster,
  posterAlt,
  meta,
  labels,
  tone = "cream",
}: {
  id?: string;
  eyebrow: string;
  title: string;
  body: string;
  src: string;
  poster: string;
  posterAlt: string;
  meta?: string;
  labels: { play: string; pause: string; fullscreen: string };
  tone?: Tone;
}) {
  const { theme } = useTheme();
  const c = theme.colors;
  const videoRef = useRef<FullscreenVideo>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    const video = videoRef.current;
    if (!video) return;
    if (!started) {
      setStarted(true);
      track(ANALYTICS_EVENTS.videoPlayed, { location: id ?? "video_showcase", src });
    }
    void video.play().catch(() => {});
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) play();
    else video.pause();
  };

  const enterFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) play();
    try {
      if (video.requestFullscreen) void video.requestFullscreen().catch(() => {});
      // iPhone Safari only supports fullscreen through the WebKit-prefixed API.
      else video.webkitEnterFullscreen?.();
    } catch {
      // Inline playback still works; the native controls offer fullscreen too.
    }
  };

  return (
    <section
      id={id}
      style={{
        background: tone === "sand" ? c.sand : c.cream,
        color: c.ink,
        padding: "clamp(56px, 10vw, 96px) 0",
        scrollMarginTop: "96px",
      }}
    >
      <Container>
        <SectionHeader align="center" eyebrow={eyebrow} title={title} lead={body} />

        <Reveal className="mt-10 md:mt-12">
          <div
            className="relative mx-auto overflow-hidden rounded-[1.5rem] md:rounded-[2rem]"
            style={{
              // As wide as the page allows, but short enough that the frame and
              // the buttons below it fit on one laptop screen.
              width: "min(100%, calc((100vh - 220px) * 16 / 9))",
              minWidth: "min(100%, 640px)",
              aspectRatio: "16 / 9",
              background: "#000",
              boxShadow:
                "0 40px 80px -40px rgba(32,30,23,0.45), 0 2px 8px rgba(32,30,23,0.08)",
            }}
          >
            {/* Captions are burned into the file. */}
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              ref={videoRef}
              src={src}
              poster={poster}
              preload="none"
              playsInline
              controls={started}
              aria-label={posterAlt}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
              className="absolute inset-0 h-full w-full"
            />

            {!started && (
              <button
                type="button"
                onClick={play}
                aria-label={`${labels.play}: ${posterAlt}`}
                className="group absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-4"
                style={{
                  border: 0,
                  padding: 0,
                  background: `radial-gradient(circle at center, ${alpha("#0e0d0a", 0.45)} 0%, ${alpha("#0e0d0a", 0.18)} 60%, ${alpha("#0e0d0a", 0.1)} 100%)`,
                }}
              >
                <span
                  aria-hidden
                  className="flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-105"
                  style={{
                    width: "clamp(80px, 10vw, 132px)",
                    height: "clamp(80px, 10vw, 132px)",
                    borderRadius: "50%",
                    background: c.brandGreen,
                    boxShadow:
                      "0 18px 36px -12px rgba(8,54,48,0.6), 0 0 0 8px rgba(255,255,255,0.22)",
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="#ffffff" style={{ width: "42%", height: "42%", marginLeft: "6%" }}>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <span
                  aria-hidden
                  style={{
                    fontFamily: theme.fonts.body,
                    fontSize: "clamp(1.125rem, 1rem + 0.6vw, 1.5rem)",
                    fontWeight: 600,
                    color: "#fff",
                    background: alpha("#0e0d0a", 0.6),
                    padding: "10px 22px",
                    borderRadius: "10rem",
                  }}
                >
                  {labels.play}
                </span>
              </button>
            )}
          </div>

          <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
            <Button
              onClick={togglePlay}
              size="lg"
              className="w-full sm:w-auto"
              // Transparent border matches the ghost button's 1px outline height.
              style={{ ...bigButton, border: "1px solid transparent" }}
            >
              {playing ? <PauseIcon /> : <PlayIcon />}
              {playing ? labels.pause : labels.play}
            </Button>
            <Button
              onClick={enterFullscreen}
              variant="ghostDark"
              size="lg"
              className="w-full sm:w-auto"
              style={bigButton}
            >
              <FullscreenIcon />
              {labels.fullscreen}
            </Button>
          </div>
          {meta && (
            <p
              className="mt-4 text-center"
              style={{
                fontFamily: theme.fonts.body,
                fontSize: typeScale.body,
                color: alpha(c.ink, 0.72),
              }}
            >
              {meta}
            </p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden>
      <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
    </svg>
  );
}

function FullscreenIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
    </svg>
  );
}
