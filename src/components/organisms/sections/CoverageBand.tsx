"use client";

import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";
import { brand } from "@/content/brand";
import { ArrowIcon } from "@/components/atoms/ArrowIcon";

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
      aria-label="Insurance coverage and phone"
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
            <span>Covered by Medicare and most Medicare Advantage plans</span>
          </span>
          <span
            aria-hidden
            className="hidden sm:inline-block"
            style={{ width: 1, height: 14, background: alpha(c.ink, 0.2) }}
          />
          <a
            href={brand.phoneHref}
            className="inline-flex items-center transition-colors"
            style={{
              gap: 8,
              color: c.brandGreen,
              fontWeight: 600,
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = c.ink)}
            onMouseLeave={(e) => (e.currentTarget.style.color = c.brandGreen)}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
              style={{ flexShrink: 0 }}
            >
              <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {brand.phone}
          </a>
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
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .coverage-band-divider {
            display: none;
          }
          .coverage-band-coverage {
            justify-content: center !important;
          }
          .coverage-band-appointments {
            justify-content: center !important;
            flex-wrap: wrap;
          }
        }
      `}</style>
    </section>
  );
}
