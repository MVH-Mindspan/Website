"use client";

/* eslint-disable @next/next/no-img-element */
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";
import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Reveal } from "@/components/molecules/Reveal";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import type { JourneyStage } from "@/content/journey";

export function EditorialPillars({
  pillars,
  intro,
}: {
  pillars: readonly JourneyStage[];
  intro?: { eyebrow: string; title: string; lead: string };
}) {
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <section style={{ background: c.cream, color: c.ink, padding: "96px 0" }}>
      <Container>
        {intro && (
          <div className="mb-16 md:mb-24">
            <SectionHeader
              eyebrow={intro.eyebrow}
              title={intro.title}
              lead={intro.lead}
            />
          </div>
        )}

        <div className="flex flex-col gap-20 md:gap-28">
          {pillars.map((p, i) => {
            const reverse = i % 2 === 1;
            return (
              <Reveal
                key={p.title}
                className="grid md:grid-cols-12 items-center gap-10 md:gap-16"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div
                  className={`md:col-span-7 ${reverse ? "md:order-2" : ""}`}
                >
                  {p.image && (
                    <div
                      className="relative overflow-hidden rounded-[1.75rem]"
                      style={{
                        boxShadow:
                          "0 30px 60px -30px rgba(32,30,23,0.28), 0 2px 8px rgba(32,30,23,0.06)",
                      }}
                    >
                      <img
                        src={p.image}
                        alt=""
                        className="w-full object-cover"
                        style={{ aspectRatio: "5/4" }}
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>

                <div
                  className={`md:col-span-5 ${
                    reverse ? "md:order-1 md:pr-4" : "md:pl-4"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      style={{
                        fontFamily: theme.fonts.body,
                        fontSize: typeScale.micro,
                        fontWeight: 600,
                        color: alpha(c.ink, 0.45),
                        letterSpacing: "0.08em",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden
                      style={{
                        height: 1,
                        width: 40,
                        background: alpha(c.ink, 0.2),
                      }}
                    />
                    <Eyebrow color={c.accent} style={{ margin: 0 }}>
                      {p.kicker}
                    </Eyebrow>
                  </div>

                  <h3
                    className="mt-6"
                    style={{
                      fontFamily: theme.fonts.heading,
                      fontSize: typeScale.h2,
                      fontWeight: 400,
                      lineHeight: 1.08,
                      letterSpacing: "-0.015em",
                    }}
                  >
                    {p.title}
                  </h3>

                  <p
                    className="mt-5"
                    style={{
                      fontFamily: theme.fonts.body,
                      fontSize: typeScale.leadMd,
                      color: alpha(c.ink, 0.68),
                      lineHeight: 1.65,
                      maxWidth: "46ch",
                    }}
                  >
                    {p.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
