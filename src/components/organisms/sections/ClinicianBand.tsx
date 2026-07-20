"use client";

import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";
import { ArrowIcon } from "@/components/atoms/ArrowIcon";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Heading } from "@/components/atoms/Heading";
import { Reveal } from "@/components/molecules/Reveal";
import { ANALYTICS_EVENTS, funnelFor, track } from "@/lib/analytics";

type Props = {
  eyebrow: string;
  title: string;
  points: readonly string[];
  cta: { label: string; href: string };
  more?: { label: string; href: string };
  phone: { label: string; href: string };
};

export function ClinicianBand({ eyebrow, title, points, cta, more, phone }: Props) {
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <section
      data-analytics-location="clinician_band"
      style={{
        background: c.sand,
        borderBlock: `1px solid ${alpha(c.ink, 0.08)}`,
        padding: "clamp(48px, 8vw, 72px) 0",
      }}
    >
      <Container>
        <Reveal>
          <div className="clinician-band-grid">
            <div>
              <Eyebrow color={c.brandGreen}>{eyebrow}</Eyebrow>
              <Heading
                as="h2"
                variant="h3"
                fontFamily={theme.fonts.heading}
                color={c.ink}
                className="mt-3"
              >
                {title}
              </Heading>
              <ul
                style={{
                  margin: "20px 0 0",
                  padding: 0,
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  maxWidth: "58ch",
                }}
              >
                {points.map((point) => (
                  <li
                    key={point}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      fontFamily: theme.fonts.body,
                      fontSize: typeScale.body,
                      lineHeight: 1.5,
                      color: alpha(c.ink, 0.8),
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                      style={{ flexShrink: 0, marginTop: 5 }}
                    >
                      <path
                        d="M20 6L9 17l-5-5"
                        stroke={c.brandGreen}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
              {more && (
                <a
                  href={more.href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    marginTop: 18,
                    fontFamily: theme.fonts.body,
                    fontSize: typeScale.bodySm,
                    fontWeight: 500,
                    color: alpha(c.ink, 0.75),
                    textDecoration: "underline",
                    textUnderlineOffset: 4,
                    textDecorationColor: alpha(c.ink, 0.35),
                  }}
                >
                  {more.label}
                  <ArrowIcon size={12} />
                </a>
              )}
            </div>

            <div className="clinician-band-actions">
              <Button
                href={cta.href}
                variant="primary"
                size="lg"
                iconRight={<ArrowIcon />}
                onClick={() =>
                  track(ANALYTICS_EVENTS.ctaClicked, {
                    location: "clinician_band",
                    variant: "primary",
                    funnel: funnelFor(cta.href),
                    label: cta.label,
                    href: cta.href,
                  })
                }
              >
                {cta.label}
              </Button>
              <a
                href={phone.href}
                onClick={() =>
                  track(ANALYTICS_EVENTS.ctaClicked, {
                    location: "clinician_band",
                    variant: "phone",
                    funnel: "referral",
                    label: phone.label,
                    href: phone.href,
                  })
                }
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  minHeight: 48,
                  fontFamily: theme.fonts.body,
                  fontSize: typeScale.bodySm,
                  fontWeight: 600,
                  color: c.brandGreen,
                  textDecoration: "underline",
                  textUnderlineOffset: 4,
                  textDecorationColor: alpha(c.brandGreen, 0.4),
                }}
              >
                {phone.label}
              </a>
            </div>
          </div>
        </Reveal>
      </Container>

      <style jsx>{`
        .clinician-band-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.7fr) minmax(260px, auto);
          gap: 40px 64px;
          align-items: center;
        }
        .clinician-band-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
        }
        @media (max-width: 860px) {
          .clinician-band-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }
      `}</style>
    </section>
  );
}
