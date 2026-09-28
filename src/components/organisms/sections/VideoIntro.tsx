"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { radius, type as typeScale } from "@/lib/tokens";
import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";

// A large, self-hosted explainer video section.
// Click to play with sound and native controls (keyboard and captions
// friendly); nothing downloads until the visitor presses play. An optional
// transcript of the on-screen text sits underneath for anyone who can't or
// won't watch.

export function VideoIntro({
  id,
  eyebrow,
  src,
  poster,
  playLabel,
  duration,
  captions,
  transcript,
}: {
  id?: string;
  eyebrow: string;
  src: string;
  poster: string;
  /** Accessible name for the play button, e.g. "Play the 2-minute introduction". */
  playLabel: string;
  /** Shown beside the play button, e.g. "2:37". */
  duration?: string;
  /** Optional WebVTT captions file. */
  captions?: { src: string; label: string; lang: string };
  transcript?: { summary: string; lines: readonly string[] };
}) {
  const { theme } = useTheme();
  const c = theme.colors;
  const [playing, setPlaying] = useState(false);

  return (
    <section
      id={id}
      style={{
        background: c.primary,
        color: c.cream,
        padding: "clamp(56px, 9vw, 96px) 0",
        scrollMarginTop: "96px",
      }}
    >
      <Container>
        <div style={{ maxWidth: 1120, marginInline: "auto" }}>
          <Eyebrow color={alpha(c.cream, 0.75)} style={{ textAlign: "center", marginBottom: 20, textWrap: "balance" }}>
            {eyebrow.split(" \u00b7 ").map((part, i) => (
              <span key={part} style={{ display: "inline-block" }}>
                {i > 0 && <span aria-hidden="true">{"\u00a0\u00b7 "}</span>}
                {part}
              </span>
            ))}
          </Eyebrow>

          <div
            style={{
              position: "relative",
              // Never taller than the screen (landscape phones), minus the header.
              width: "min(100%, calc((100svh - 120px) * 16 / 9))",
              marginInline: "auto",
              aspectRatio: "16 / 9",
              borderRadius: radius.lg,
              overflow: "hidden",
              background: "#000",
              boxShadow: "0 40px 80px -40px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08)",
            }}
          >
            {playing ? (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <video
                src={src}
                poster={poster}
                controls
                autoPlay
                playsInline
                preload="auto"
                style={{ width: "100%", height: "100%", display: "block", background: "#000" }}
              >
                {captions && (
                  <track kind="captions" src={captions.src} srcLang={captions.lang} label={captions.label} default />
                )}
              </video>
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={playLabel}
                className="group"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  padding: 0,
                  border: 0,
                  cursor: "pointer",
                  background: "transparent",
                }}
              >
                <img
                  src={poster}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    borderRadius: radius.pill,
                    background: c.cream,
                    color: c.primary,
                    fontFamily: theme.fonts.body,
                    fontWeight: 600,
                    boxShadow: "0 16px 40px -12px rgba(0, 0, 0, 0.55)",
                    transition: "transform 0.2s ease",
                  }}
                  // Centered on the player at every size.
                  className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center whitespace-nowrap gap-2.5 py-1.5 pl-1.5 pr-4 text-[15px] sm:gap-3.5 sm:py-3.5 sm:pl-4 sm:pr-6 sm:text-[17px] group-hover:scale-105 group-focus-visible:scale-105"
                >
                  <span
                    className="w-9 h-9 sm:w-12 sm:h-12"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      background: c.primary,
                      color: c.cream,
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true">
                      <path d="M5 3.2v11.6c0 .6.7 1 1.2.6l9-5.8c.5-.3.5-1 0-1.3l-9-5.7C5.7 2.2 5 2.6 5 3.2Z" />
                    </svg>
                  </span>
                  <span>
                    Play
                    {duration && <span style={{ fontWeight: 500, opacity: 0.7 }}>{` · ${duration}`}</span>}
                  </span>
                </span>
              </button>
            )}
          </div>

          {transcript && (
            <details style={{ marginTop: 20, fontFamily: theme.fonts.body, color: alpha(c.cream, 0.85) }}>
              <summary
                style={{
                  cursor: "pointer",
                  fontSize: typeScale.bodySm,
                  fontWeight: 600,
                  textAlign: "center",
                  textDecoration: "underline",
                  textUnderlineOffset: "0.2em",
                  textDecorationColor: alpha(c.cream, 0.4),
                }}
              >
                {transcript.summary}
              </summary>
              <div
                style={{
                  marginTop: 16,
                  marginInline: "auto",
                  maxWidth: 720,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  fontSize: typeScale.body,
                  lineHeight: 1.6,
                }}
              >
                {transcript.lines.map((line) => (
                  <p key={line} style={{ margin: 0 }}>
                    {line}
                  </p>
                ))}
              </div>
            </details>
          )}
        </div>
      </Container>
    </section>
  );
}
