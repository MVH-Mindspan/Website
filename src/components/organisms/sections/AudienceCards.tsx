"use client";

/* eslint-disable @next/next/no-img-element */
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";
import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Heading } from "@/components/atoms/Heading";
import { Lead } from "@/components/atoms/Lead";
import { ArrowIcon } from "@/components/atoms/ArrowIcon";
import { BulletList } from "@/components/molecules/BulletList";
import { Reveal } from "@/components/molecules/Reveal";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import type { Audience } from "@/content/audiences";

export function AudienceCards({
  intro,
  audiences,
}: {
  intro: {
    eyebrow: string;
    title: string;
    lead: string;
    image?: string;
    imageAlt?: string;
  };
  audiences: readonly Audience[];
}) {
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <section id="families" style={{ background: c.sand, padding: "96px 0" }}>
      <Container>
        <SectionHeader
          eyebrow={intro.eyebrow}
          title={intro.title}
          lead={intro.lead}
        />

        {intro.image && (
          <Reveal className="mt-12 overflow-hidden rounded-[2rem]">
            <img
              src={intro.image}
              alt={intro.imageAlt ?? ""}
              className="w-full object-cover"
              style={{ maxHeight: 400 }}
              loading="lazy"
            />
          </Reveal>
        )}

        <div className="mt-12 grid md:grid-cols-3 gap-5 md:gap-6">
          {audiences.map((a, i) => (
            <Reveal
              key={a.id}
              as="article"
              className="rounded-[2rem] p-6 md:p-8 flex flex-col group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-16px_rgba(32,30,23,0.18)]"
              style={{
                background: c.skySoft,
                border: `1px solid ${alpha(c.ink, 0.06)}`,
                animationDelay: `${i * 80}ms`,
              }}
            >
              <a href={a.href} className="flex flex-col flex-1">
                <Eyebrow color={c.accent}>{a.kicker}</Eyebrow>
                <Heading
                  as="h3"
                  variant="h4"
                  color={c.ink}
                  fontFamily={theme.fonts.heading}
                  className="mt-3"
                >
                  {a.title}
                </Heading>
                <Lead
                  size="md"
                  maxWidth={false}
                  color={alpha(c.ink, 0.72)}
                  className={a.bullets && a.bullets.length > 0 ? "mt-4" : "mt-4 flex-1"}
                  style={{ fontSize: typeScale.body, lineHeight: 1.6 }}
                >
                  {a.body}
                </Lead>
                {a.bullets && a.bullets.length > 0 && (
                  <BulletList
                    items={a.bullets}
                    bulletColor={c.brandGreen}
                    color={alpha(c.ink, 0.78)}
                    className="mt-5 text-[14.5px] flex-1"
                  />
                )}
                <div className="mt-8">
                  <span
                    className="inline-flex items-center gap-2 font-semibold text-sm transition-all group-hover:-translate-y-0.5"
                    style={{
                      padding: "10px 20px",
                      background: c.brandGreen,
                      color: "#fff",
                      borderRadius: "10rem",
                    }}
                  >
                    {a.cta} <ArrowIcon />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
