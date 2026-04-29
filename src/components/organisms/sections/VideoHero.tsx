"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { ease, type as typeScale } from "@/lib/tokens";
import { brand } from "@/content/brand";

export function VideoHero({
  video,
  poster,
  headline,
  subTagline,
  subhead,
  cta,
  playbackRate = 1,
}: {
  video: string;
  poster?: string;
  headline: string;
  subTagline: string;
  subhead: string;
  cta?: { label: string; href: string };
  playbackRate?: number;
}) {
  const { theme } = useTheme();
  const c = theme.colors;
  const [loaded, setLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reducedData = (
      window.matchMedia("(prefers-reduced-data: reduce)") as MediaQueryList | undefined
    )?.matches;
    const slow = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } })
      .connection;
    const isSlow = slow?.saveData === true || slow?.effectiveType === "slow-2g" || slow?.effectiveType === "2g";
    if (reducedMotion || reducedData || isSlow) return;
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number })
      .requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1));
    const handle = idle(() => setShowVideo(true));
    return () => {
      const cancel = (window as Window & { cancelIdleCallback?: (h: number) => void })
        .cancelIdleCallback;
      if (cancel) cancel(handle as number);
    };
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden hero-section"
      style={{
        height: "100vh",
        minHeight: 600,
        background: "#201E17",
      }}
    >
      {showVideo && (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          preload="none"
          aria-hidden
          onLoadedMetadata={(e) => {
            if (playbackRate !== 1) e.currentTarget.playbackRate = playbackRate;
          }}
        >
          <source src={video} type="video/mp4" />
        </video>
      )}
      {!showVideo && poster && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
      )}
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
        className="absolute bottom-0 left-0 right-0 flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-16 hero-content"
        style={{ padding: "64px clamp(24px, 5vw, 80px)" }}
      >
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateY(24px)",
            transition: `opacity 0.8s ${ease.expressive}, transform 0.8s ${ease.expressive}`,
          }}
        >
          <h1
            style={{
              fontFamily: theme.fonts.heading,
              fontSize: typeScale.display,
              fontWeight: 400,
              color: c.cream,
              letterSpacing: "-0.02em",
              lineHeight: 0.98,
              maxWidth: "16ch",
            }}
          >
            {headline}
          </h1>
        </div>
        <div
          style={{
            maxWidth: 520,
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
              color: alpha(c.cream, 0.78),
              lineHeight: 1.55,
              marginBottom: cta ? 20 : 0,
            }}
          >
            {subhead}
          </p>
          {cta && (
            <div className="hero-ctas">
              <a
                href={cta.href}
                className="hero-cta-primary"
                style={{
                  display: "inline-block",
                  fontFamily: theme.fonts.body,
                  fontSize: typeScale.bodySm,
                  fontWeight: 600,
                  color: c.brandGreen,
                  background: "#fff",
                  padding: "14px 28px",
                  borderRadius: "10rem",
                  textDecoration: "none",
                  transition: `background 0.2s ease`,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = c.cream)}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
              >
                {cta.label}
              </a>
              <a
                href={brand.phoneHref}
                className="hero-cta-secondary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: theme.fonts.body,
                  fontSize: typeScale.bodySm,
                  fontWeight: 600,
                  color: c.cream,
                  padding: "14px 22px",
                  border: `1px solid ${alpha(c.cream, 0.45)}`,
                  borderRadius: "10rem",
                  textDecoration: "none",
                  background: "transparent",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Talk to us: {brand.phone}
              </a>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .hero-cta-primary,
        .hero-cta-secondary {
          white-space: nowrap;
        }
        .hero-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
        }
        @media (max-width: 480px) {
          .hero-cta-primary,
          .hero-cta-secondary {
            width: 100%;
            justify-content: center;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
