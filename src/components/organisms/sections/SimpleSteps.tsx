"use client";

import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";
import { Container } from "@/components/atoms/Container";
import { ArrowIcon } from "@/components/atoms/ArrowIcon";
import { Reveal } from "@/components/molecules/Reveal";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import type { JourneyStage } from "@/content/journey";

export function SimpleSteps({
  stages,
  intro,
}: {
  stages: readonly JourneyStage[];
  intro?: { eyebrow: string; title: string; lead: string };
}) {
  const { theme } = useTheme();
  const c = theme.colors;

  if (stages.length === 0) return null;

  return (
    <section style={{ background: c.cream, color: c.ink, padding: "96px 0" }}>
      <Container>
        {intro && (
          <SectionHeader
            align="center"
            eyebrow={intro.eyebrow}
            title={intro.title}
            lead={intro.lead}
          />
        )}

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {stages.map((step, i) => (
            <Reveal
              key={step.title}
              className="flex flex-col rounded-[1.5rem] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_-18px_rgba(0,0,0,0.18)]"
              style={{
                background: c.sand,
                padding: "28px",
                animationDelay: `${i * 80}ms`,
              }}
            >
              <div
                className="flex items-center justify-center rounded-full text-xs font-semibold flex-shrink-0"
                style={{
                  fontFamily: theme.fonts.body,
                  width: 36,
                  height: 36,
                  border: `1.5px solid ${c.brandGreen}`,
                  color: c.brandGreen,
                  background: c.skySoft,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <p
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: typeScale.micro,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: c.accentText,
                  marginTop: 24,
                }}
              >
                {step.kicker}
              </p>
              <h3
                style={{
                  fontFamily: theme.fonts.heading,
                  fontSize: typeScale.h4,
                  fontWeight: 500,
                  marginTop: 8,
                  lineHeight: 1.2,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: typeScale.body,
                  color: alpha(c.ink, 0.7),
                  lineHeight: 1.55,
                  marginTop: 12,
                }}
              >
                {step.body}
              </p>
              {step.cta && (
                <a
                  href={step.cta.href}
                  className="inline-flex items-center gap-2 font-semibold transition-all hover:-translate-y-0.5 self-start"
                  style={{
                    fontFamily: theme.fonts.body,
                    fontSize: typeScale.bodySm,
                    padding: "12px 24px",
                    background: c.brandGreen,
                    color: "#fff",
                    borderRadius: "10rem",
                    marginTop: 24,
                  }}
                >
                  {step.cta.label} <ArrowIcon />
                </a>
              )}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
