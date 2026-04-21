"use client";

import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";
import { Container } from "@/components/atoms/Container";
import { Reveal } from "@/components/molecules/Reveal";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import type { Testimonial } from "@/content/testimonials";

export function Testimonials({
  intro,
  quotes,
}: {
  intro: { eyebrow: string; title: string };
  quotes: readonly Testimonial[];
}) {
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <section style={{ background: c.cream, padding: "96px 0" }}>
      <Container>
        <SectionHeader eyebrow={intro.eyebrow} title={intro.title} />
        <div className="mt-12 grid md:grid-cols-3 gap-5 md:gap-6">
          {quotes.map((q, i) => (
            <Reveal
              key={q.id}
              as="article"
              className="rounded-[2rem] p-8 flex flex-col"
              style={{
                background: "#fff",
                border: `1px solid ${alpha(c.ink, 0.08)}`,
                animationDelay: `${i * 80}ms`,
              }}
            >
              <div
                aria-hidden
                style={{
                  fontFamily: theme.fonts.heading,
                  fontSize: "3.5rem",
                  lineHeight: 1,
                  color: c.brandGreen,
                  marginBottom: 8,
                }}
              >
                &ldquo;
              </div>
              <blockquote
                style={{
                  fontFamily: theme.fonts.heading,
                  fontSize: typeScale.leadMd,
                  color: c.ink,
                  lineHeight: 1.4,
                  flex: 1,
                }}
              >
                {q.quote}
              </blockquote>
              <div
                style={{
                  marginTop: 24,
                  paddingTop: 20,
                  borderTop: `1px solid ${alpha(c.ink, 0.1)}`,
                }}
              >
                <div
                  style={{
                    fontFamily: theme.fonts.body,
                    fontSize: typeScale.body,
                    fontWeight: 600,
                    color: c.ink,
                  }}
                >
                  {q.name}
                </div>
                <div
                  style={{
                    fontFamily: theme.fonts.body,
                    fontSize: typeScale.bodySm,
                    color: alpha(c.ink, 0.65),
                    marginTop: 2,
                  }}
                >
                  {q.relation}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
