"use client";

import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";
import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Heading } from "@/components/atoms/Heading";
import { Lead } from "@/components/atoms/Lead";
import { Reveal } from "@/components/molecules/Reveal";
import { Button } from "@/components/atoms/Button";

export function GuideBenefit({
  eyebrow,
  title,
  lead,
  bullets,
  eligibilityTitle,
  eligibility,
  footnote,
  cta,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  bullets: readonly string[];
  eligibilityTitle: string;
  eligibility: readonly string[];
  footnote?: string | readonly string[];
  cta?: { label: string; href: string };
}) {
  const footnoteParagraphs = Array.isArray(footnote)
    ? footnote
    : footnote
      ? [footnote]
      : [];
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <section style={{ background: c.cream, padding: "80px 0" }}>
      <Container>
        <Reveal
          className="rounded-[2rem]"
          style={{
            background: c.sand,
            border: `1px solid ${alpha(c.ink, 0.08)}`,
            padding: "clamp(32px, 5vw, 56px)",
          }}
        >
          <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-14 items-start">
            <div>
              <Eyebrow color={c.brandGreen}>{eyebrow}</Eyebrow>
              <Heading
                as="h2"
                variant="h3"
                color={c.ink}
                fontFamily={theme.fonts.heading}
                className="mt-4"
              >
                {title}
              </Heading>
              <Lead
                size="bodyCard"
                maxWidth={false}
                color={alpha(c.ink, 0.78)}
                className="mt-5"
              >
                {lead}
              </Lead>
              <ul className="mt-8 space-y-4">
                {bullets.map((b) => (
                  <li
                    key={b}
                    style={{
                      fontFamily: theme.fonts.body,
                      fontSize: typeScale.body,
                      color: c.ink,
                      lineHeight: 1.6,
                      paddingLeft: 28,
                      position: "relative",
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "0.55em",
                        width: 14,
                        height: 14,
                        borderRadius: "50%",
                        background: c.brandGreen,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M20 6L9 17l-5-5"
                          stroke="#fff"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              {cta && (
                <div className="mt-8">
                  <Button href={cta.href} variant="primary">
                    {cta.label}
                  </Button>
                </div>
              )}
            </div>
            <div
              style={{
                background: "#fff",
                border: `1px solid ${alpha(c.ink, 0.08)}`,
                borderRadius: "1.5rem",
                padding: "28px 28px",
              }}
            >
              <div
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: typeScale.bodySm,
                  fontWeight: 600,
                  color: c.ink,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 16,
                }}
              >
                {eligibilityTitle}
              </div>
              <ul className="space-y-4">
                {eligibility.map((b) => (
                  <li
                    key={b}
                    style={{
                      fontFamily: theme.fonts.body,
                      fontSize: typeScale.bodySm,
                      color: alpha(c.ink, 0.78),
                      lineHeight: 1.6,
                      paddingLeft: 22,
                      position: "relative",
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "0.5em",
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: c.brandGreen,
                      }}
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {footnoteParagraphs.length > 0 && (
            <div
              className="mt-10"
              style={{
                borderTop: `1px solid ${alpha(c.ink, 0.08)}`,
                paddingTop: 20,
              }}
            >
              {footnoteParagraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={index === 0 ? undefined : "mt-3"}
                  style={{
                    fontFamily: theme.fonts.body,
                    fontSize: typeScale.bodySm,
                    color: alpha(c.ink, 0.55),
                    lineHeight: 1.5,
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
