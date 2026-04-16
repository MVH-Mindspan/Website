"use client";

/* eslint-disable @next/next/no-img-element */
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";
import { ArrowIcon } from "@/components/atoms/ArrowIcon";
import { Reveal } from "@/components/molecules/Reveal";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import type { JourneyStage } from "@/content/journey";

export function EditorialStages({
  stages,
  intro,
}: {
  stages: readonly JourneyStage[];
  intro?: { eyebrow: string; title: string; lead: string };
}) {
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <section style={{ background: c.cream, color: c.ink, padding: "48px 0" }}>
      <div style={{ maxWidth: "min(1320px, 92vw)", marginInline: "auto" }}>
        {intro && (
          <div style={{ padding: "48px 0 24px" }}>
            <SectionHeader
              eyebrow={intro.eyebrow}
              title={intro.title}
              lead={intro.lead}
            />
          </div>
        )}
        {stages.map((step, i) => (
          <Reveal
            key={step.title}
            className="stage-row group"
            style={{
              display: "grid",
              gridTemplateColumns: "80px 1fr 1fr",
              gap: "0 32px",
              padding: "48px 0",
              borderBottom:
                i < stages.length - 1 ? `1px solid ${c.sand}` : "none",
              position: "relative",
              animationDelay: `${i * 80}ms`,
            }}
          >
            <div
              className="flex flex-col items-center"
              style={{ paddingTop: 8 }}
            >
              <div
                className="stage-num flex items-center justify-center rounded-full text-xs font-semibold flex-shrink-0 transition-all duration-300"
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
              {i < stages.length - 1 && (
                <div
                  className="flex-1"
                  style={{
                    width: 1,
                    background: `linear-gradient(to bottom, ${alpha(
                      c.brandGreen,
                      0.25
                    )}, ${alpha(c.sky, 0.4)})`,
                    marginTop: 12,
                  }}
                />
              )}
            </div>

            <div style={{ paddingRight: 32 }}>
              <p
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: typeScale.micro,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: c.accent,
                  marginBottom: 12,
                }}
              >
                {step.kicker}
              </p>
              <h3
                style={{
                  fontFamily: theme.fonts.heading,
                  fontSize: typeScale.h3,
                  fontWeight: 500,
                  marginBottom: 4,
                  lineHeight: 1.15,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: typeScale.leadMd,
                  color: alpha(c.ink, 0.65),
                  lineHeight: 1.55,
                  maxWidth: "42ch",
                }}
              >
                {step.body}
              </p>
              {step.cta && (
                <a
                  href={step.cta.href}
                  className="inline-flex items-center gap-2 font-semibold transition-all hover:-translate-y-0.5 mt-6"
                  style={{
                    fontFamily: theme.fonts.body,
                    fontSize: typeScale.bodySm,
                    padding: "12px 24px",
                    background: c.brandGreen,
                    color: "#fff",
                    borderRadius: "10rem",
                  }}
                >
                  {step.cta.label} <ArrowIcon />
                </a>
              )}
            </div>

            <div className="flex flex-col justify-center stage-image">
              {step.image && (
                <img
                  src={step.image}
                  alt=""
                  className="rounded-2xl w-full object-cover"
                  style={{ aspectRatio: "16/10" }}
                  loading="lazy"
                />
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
