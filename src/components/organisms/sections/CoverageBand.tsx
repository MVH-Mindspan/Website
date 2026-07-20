"use client";

import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";
import { ArrowIcon } from "@/components/atoms/ArrowIcon";
import { brand } from "@/content/brand";
import { ANALYTICS_EVENTS, funnelFor, track } from "@/lib/analytics";

type Appointments = {
  href: string;
  ariaLabel: string;
  primary: string;
  badge: string;
};

export function CoverageBand({ appointments }: { appointments?: Appointments }) {
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <section
      aria-label="Insurance coverage"
      data-analytics-location="coverage_band"
      style={{
        background: c.sand,
        borderBottom: `1px solid ${alpha(c.ink, 0.08)}`,
        padding: "20px 0",
        color: c.ink,
        fontFamily: theme.fonts.body,
        fontSize: typeScale.bodySm,
      }}
    >
      <div
        className="coverage-band-grid"
        style={{
          maxWidth: "min(1320px, 92vw)",
          marginInline: "auto",
          display: "grid",
          gridTemplateColumns: appointments ? "1fr auto 1fr" : "1fr",
          alignItems: "center",
          gap: "12px 32px",
        }}
      >
        <div
          className="coverage-band-coverage"
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 14,
            justifyContent: appointments ? "flex-start" : "center",
            fontWeight: 500,
            letterSpacing: "0.005em",
          }}
        >
          <span className="inline-flex items-center" style={{ gap: 8 }}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
              style={{ flexShrink: 0 }}
            >
              <path
                d="M20 6L9 17l-5-5"
                stroke={c.brandGreen}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{brand.coverage}</span>
          </span>
        </div>

        {appointments ? (
          <>
            <span
              aria-hidden
              className="coverage-band-divider"
              style={{ width: 1, height: 20, background: alpha(c.ink, 0.15) }}
            />
            <a
              href={appointments.href}
              aria-label={appointments.ariaLabel}
              onClick={() =>
                track(ANALYTICS_EVENTS.ctaClicked, {
                  location: "coverage_band",
                  variant: "primary",
                  funnel: funnelFor(appointments.href),
                  label: appointments.primary,
                  href: appointments.href,
                })
              }
              className="coverage-band-appointments inline-flex items-center transition-opacity"
              style={{
                gap: 10,
                color: c.accent,
                fontWeight: 600,
                textDecoration: "none",
                justifyContent: "flex-end",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <span
                className="coverage-band-appointment-line"
                style={{
                  color: c.ink,
                  fontWeight: 500,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span
                  aria-hidden="true"
                  className="coverage-band-dot"
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#22c55e",
                    boxShadow: `0 0 0 4px ${alpha("#22c55e", 0.2)}`,
                    animation: "pulseDot 2.4s ease-in-out infinite",
                    flexShrink: 0,
                  }}
                />
                {appointments.primary}
              </span>
              <span
                className="coverage-band-book"
                style={{
                  background: c.brandGreen,
                  color: c.cream,
                  padding: "6px 16px",
                  borderRadius: "10rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {appointments.badge}
                <ArrowIcon size={14} />
              </span>
            </a>
          </>
        ) : null}
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .coverage-band-grid {
            display: flex !important;
            flex-direction: column;
            align-items: stretch !important;
            gap: 14px !important;
          }
          .coverage-band-divider {
            width: 100% !important;
            height: 1px !important;
            background: ${alpha(c.ink, 0.1)} !important;
          }
          .coverage-band-coverage {
            justify-content: flex-start !important;
          }
          .coverage-band-appointments {
            display: flex !important;
            align-items: center;
            gap: 12px;
            justify-content: space-between !important;
            flex-wrap: wrap;
          }
          .coverage-band-appointment-line {
            flex: 1 1 0 !important;
            min-width: 0 !important;
          }
          .coverage-band-book {
            padding: 10px 20px !important;
            min-height: 40px;
          }
        }
      `}</style>
    </section>
  );
}
