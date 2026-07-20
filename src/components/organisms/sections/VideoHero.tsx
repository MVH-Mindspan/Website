"use client";

import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";
import { externalLinkProps } from "@/lib/links";
import { useHeroVideo } from "@/lib/use-hero-video";
import { linkifyNeurologists } from "@/lib/linkify";
import { brand } from "@/content/brand";
import { ANALYTICS_EVENTS, funnelFor, track } from "@/lib/analytics";
import { ScrollHint } from "@/components/molecules/ScrollHint";

export function VideoHero({
  video,
  poster,
  headline,
  subTagline,
  subhead,
  cta,
  ctaNote,
  secondaryCta,
  reassurance,
  playbackRate = 1,
}: {
  video: string;
  poster?: string;
  headline: string;
  subTagline: string;
  subhead: string;
  cta?: { label: string; href: string };
  ctaNote?: string;
  secondaryCta?: { label: string; href: string };
  reassurance?: string;
  playbackRate?: number;
}) {
  const { theme } = useTheme();
  const c = theme.colors;
  const { videoRef, showVideo, ended } = useHeroVideo({ playbackRate });

  return (
    <section
      className="relative w-full overflow-hidden hero-section"
      data-analytics-location="video_hero"
      style={{
        height: "100vh",
        minHeight: 600,
        background: "#201E17",
      }}
    >
      {showVideo && (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          poster={poster}
          preload="none"
          aria-hidden
          style={{
            transform: ended ? "scale(1.1)" : "scale(1)",
            transition: "transform 16s linear",
            transformOrigin: "center center",
            willChange: ended ? "transform" : "auto",
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
        className="sm:hidden absolute inset-0"
        style={{ background: alpha("#201E17", 0.15) }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-16 hero-content"
        style={{ padding: "64px clamp(24px, 5vw, 80px)" }}
      >
        <div>
          <h1
            style={{
              fontFamily: theme.fonts.heading,
              fontSize: typeScale.display,
              fontWeight: 400,
              color: c.cream,
              letterSpacing: "-0.02em",
              lineHeight: 0.98,
              maxWidth: "16ch",
              textWrap: "pretty",
            }}
          >
            {headline}
          </h1>
        </div>
        <div style={{ maxWidth: 520 }}>
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
            {linkifyNeurologists(subhead)}
          </p>
          {cta && (
            <>
            <div className="hero-ctas" style={{ alignItems: ctaNote ? "flex-start" : "center" }}>
              <div className="hero-cta-col">
                <a
                  href={cta.href}
                  {...externalLinkProps(cta.href)}
                  onClick={() =>
                    track(ANALYTICS_EVENTS.ctaClicked, {
                      location: "video_hero",
                      variant: "primary",
                      funnel: funnelFor(cta.href),
                      label: cta.label,
                      href: cta.href,
                    })
                  }
                  className="hero-cta-primary prox-cta"
                  data-proximity=""
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
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
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                    <path
                      d="M1 5h8m0 0L5.5 1.5M9 5 5.5 8.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                {ctaNote && (
                  <p
                    className="hero-cta-note"
                    style={{
                      fontFamily: theme.fonts.body,
                      fontSize: typeScale.bodySm,
                      color: alpha(c.cream, 0.95),
                      fontWeight: 500,
                      marginTop: 10,
                      lineHeight: 1.4,
                      letterSpacing: "0.01em",
                      textShadow: `0 1px 12px ${alpha("#201E17", 0.6)}, 0 0 2px ${alpha("#201E17", 0.45)}`,
                    }}
                  >
                    {ctaNote}
                  </p>
                )}
              </div>
              {secondaryCta && (
                <a
                  href={secondaryCta.href}
                  {...externalLinkProps(secondaryCta.href)}
                  onClick={() =>
                    track(ANALYTICS_EVENTS.ctaClicked, {
                      location: "video_hero",
                      variant: "secondary",
                      funnel: funnelFor(secondaryCta.href),
                      label: secondaryCta.label,
                      href: secondaryCta.href,
                    })
                  }
                  className="hero-cta-secondary prox-cta"
                  data-proximity=""
                  style={{
                    display: "inline-block",
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
                  {secondaryCta.label}
                </a>
              )}
            </div>
            {reassurance && (
              <p
                className="hero-reassurance"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: theme.fonts.body,
                  fontSize: typeScale.bodySm,
                  color: alpha(c.cream, 0.92),
                  fontWeight: 500,
                  marginTop: 16,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4" />
                  <path
                    d="M5 8.2 7.2 10.4 11 6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {reassurance}
              </p>
            )}
            <p
              className="hero-hours"
              style={{
                fontFamily: theme.fonts.body,
                fontSize: typeScale.body,
                color: c.cream,
                fontWeight: 500,
                marginTop: reassurance ? 8 : 14,
                letterSpacing: "0.01em",
              }}
            >
              <a
                href={brand.phoneHref}
                onClick={() =>
                  track(ANALYTICS_EVENTS.ctaClicked, {
                    location: "video_hero",
                    variant: "phone",
                    funnel: "booking",
                    label: brand.phone,
                    href: brand.phoneHref,
                  })
                }
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  minHeight: 48,
                  color: c.cream,
                  textDecoration: "underline",
                  textUnderlineOffset: 4,
                  textDecorationColor: alpha(c.cream, 0.5),
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
              <span className="hero-hours-sep" style={{ color: alpha(c.cream, 0.75) }}>
                {" · "}
              </span>
              <span className="hero-hours-time" style={{ color: alpha(c.cream, 0.75) }}>
                {brand.phoneHours}
              </span>
            </p>
            </>
          )}
        </div>
      </div>
      <ScrollHint color={c.cream} />
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
        .hero-cta-col {
          display: flex;
          flex-direction: column;
          /* The pill (nowrap) sets the column width; the note wraps under
             it instead of stretching the pill to the note's length. */
          width: min-content;
        }
        @media (max-width: 640px) {
          .hero-ctas {
            flex-direction: column;
            align-items: stretch !important;
            gap: 10px;
            width: 100%;
          }
          .hero-cta-col {
            width: 100%;
          }
          .hero-cta-primary,
          .hero-cta-secondary {
            width: 100%;
            justify-content: center;
            text-align: center;
            white-space: normal;
          }
          .hero-cta-note {
            text-align: center;
          }
          .hero-hours,
          .hero-reassurance {
            justify-content: center;
            text-align: center;
          }
          /* Stack the hours as their own line so the phone number and the
             time range each stay whole. */
          .hero-hours-sep {
            display: none;
          }
          .hero-hours-time {
            display: block;
            margin-top: 2px;
          }
        }
      `}</style>
    </section>
  );
}
