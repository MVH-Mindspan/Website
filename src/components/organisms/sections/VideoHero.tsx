"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { ease, type as typeScale } from "@/lib/tokens";

export function VideoHero({
  video,
  poster,
  headline,
  subTagline,
  subhead,
}: {
  video: string;
  poster?: string;
  headline: string;
  subTagline: string;
  subhead: string;
}) {
  const { theme } = useTheme();
  const c = theme.colors;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "100vh", minHeight: 600, background: "#201E17" }}
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        preload="auto"
      >
        <source src={video} type="video/mp4" />
      </video>
      <div className="absolute inset-0" style={{ background: alpha("#201E17", 0.2) }} />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, ${alpha("#201E17", 0.72)} 0%, ${alpha(
            "#201E17",
            0.18
          )} 45%, ${alpha("#201E17", 0.08)} 100%)`,
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-16 hero-content"
        style={{ padding: "64px clamp(24px, 5vw, 80px)" }}
      >
        <h1
          style={{
            fontFamily: theme.fonts.heading,
            fontSize: typeScale.display,
            fontWeight: 400,
            color: c.cream,
            letterSpacing: "-0.02em",
            lineHeight: 0.98,
            maxWidth: "12ch",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateY(24px)",
            transition: `opacity 0.8s ${ease.expressive}, transform 0.8s ${ease.expressive}`,
          }}
        >
          {headline}
        </h1>
        <div
          style={{
            maxWidth: 400,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateY(18px)",
            transition: `opacity 0.8s ${ease.expressive} 0.2s, transform 0.8s ${ease.expressive} 0.2s`,
          }}
        >
          <p
            className="font-semibold"
            style={{
              fontFamily: theme.fonts.body,
              fontSize: typeScale.leadMd,
              color: c.cream,
              marginBottom: 8,
              lineHeight: 1.4,
            }}
          >
            {subTagline}
          </p>
          <p
            style={{
              fontFamily: theme.fonts.body,
              fontSize: typeScale.bodySm,
              color: alpha(c.cream, 0.7),
              lineHeight: 1.55,
            }}
          >
            {subhead}
          </p>
        </div>
      </div>
    </section>
  );
}
