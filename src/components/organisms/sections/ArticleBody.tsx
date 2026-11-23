"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/lib/theme-context";
import { Container } from "@/components/atoms/Container";
import { ANALYTICS_EVENTS, track } from "@/lib/analytics";

// Completion fires at 95% so people who close on the last frame count.
const COMPLETE_AT = 0.95;

/**
 * Renders markdown that was converted to HTML at build time (src/lib/learn.ts).
 * Typography lives in `.learn-prose` in globals.css so writers' headings,
 * lists and quotes pick up the brand scale without per-element styling.
 * Inline Mindspan films (`.learn-film`) report play and completion the same
 * way the /watch player does.
 */
export function ArticleBody({ html }: { html: string }) {
  const { theme } = useTheme();
  const c = theme.colors;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const cleanups: Array<() => void> = [];
    root.querySelectorAll<HTMLElement>("figure.learn-film").forEach((figure) => {
      const video = figure.querySelector("video");
      const slug = figure.dataset.film;
      if (!video || !slug) return;
      let played = false;
      let completed = false;
      const onPlay = () => {
        if (played) return;
        played = true;
        track(ANALYTICS_EVENTS.videoPlay, { video: slug, source: "learn", quality: "hd" });
      };
      const onTime = () => {
        if (completed || !video.duration) return;
        if (video.currentTime >= video.duration * COMPLETE_AT) {
          completed = true;
          track(ANALYTICS_EVENTS.videoComplete, { video: slug });
        }
      };
      video.addEventListener("play", onPlay);
      video.addEventListener("timeupdate", onTime);
      cleanups.push(() => {
        video.removeEventListener("play", onPlay);
        video.removeEventListener("timeupdate", onTime);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, [html]);

  return (
    <section style={{ background: c.cream, color: c.ink, padding: "clamp(48px, 7vw, 80px) 0 0" }}>
      <Container width="prose">
        <div ref={ref} className="learn-prose" dangerouslySetInnerHTML={{ __html: html }} />
      </Container>
    </section>
  );
}
