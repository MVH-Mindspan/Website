"use client";

/* eslint-disable @next/next/no-img-element */
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Heading } from "@/components/atoms/Heading";
import { ImageFrame } from "@/components/atoms/ImageFrame";
import { Lead } from "@/components/atoms/Lead";
import { ArrowIcon } from "@/components/atoms/ArrowIcon";
import { BulletList } from "@/components/molecules/BulletList";
import { CardCaption } from "@/components/molecules/CardCaption";
import { Reveal } from "@/components/molecules/Reveal";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { externalLinkProps } from "@/lib/links";
import type { Audience } from "@/content/audiences";

export function AudienceCards({
  intro,
  audiences,
  tone = "sand",
}: {
  intro: {
    eyebrow: string;
    title: string;
    lead: string;
    image?: string;
    imageAlt?: string;
  };
  audiences: readonly Audience[];
  tone?: "sand" | "cream";
}) {
  const { theme } = useTheme();
  const c = theme.colors;
  const bg = tone === "cream" ? c.cream : c.sand;

  if (audiences.length === 0) return null;

  return (
    <section id="families" style={{ background: bg, padding: "clamp(56px, 10vw, 96px) 0" }}>
      <Container>
        <SectionHeader
          eyebrow={intro.eyebrow}
          title={intro.title}
          lead={intro.lead}
        />

        {intro.image && (
          <Reveal className="mt-12">
            <ImageFrame>
              <img
                src={intro.image}
                alt={intro.imageAlt ?? ""}
                width={1600}
                height={800}
                className="w-full object-cover aspect-[3/2] sm:aspect-[1600/800]"
                style={{ maxHeight: 400 }}
                loading="lazy"
              />
            </ImageFrame>
          </Reveal>
        )}

        <div
          className={`mt-12 grid grid-cols-1 gap-5 md:gap-6 ${
            audiences.length === 2
              ? "md:grid-cols-2"
              : audiences.length === 1
              ? "md:grid-cols-1"
              : "sm:grid-cols-2 md:grid-cols-3"
          }`}
        >
          {audiences.map((a, i) => (
            <Reveal
              key={a.id}
              as="article"
              className="v2-card rounded-[2rem] p-5 sm:p-6 md:p-8 flex flex-col group"
              style={{
                background: alpha(c.skySoft, 0.7),
                animationDelay: `${i * 80}ms`,
              }}
            >
              <a href={a.href} {...externalLinkProps(a.href)} className="flex flex-col flex-1 min-w-0">
                <Eyebrow color={c.accentText}>{a.kicker}</Eyebrow>
                <Heading
                  as="h3"
                  variant="h4"
                  color={c.ink}
                  fontFamily={theme.fonts.heading}
                  className="mt-4 break-words"
                >
                  {a.title}
                </Heading>
                <Lead
                  size="bodyCard"
                  maxWidth={false}
                  color={alpha(c.ink, 0.72)}
                  className="mt-5 break-words"
                >
                  {a.body}
                </Lead>
                {a.bullets && a.bullets.length > 0 && (
                  <BulletList
                    items={a.bullets}
                    bulletColor={c.brandGreen}
                    color={alpha(c.ink, 0.78)}
                    className="mt-8 text-base"
                  />
                )}
                {a.caption && (
                  <CardCaption color={alpha(c.ink, 0.55)} className="mt-6">
                    {a.caption}
                  </CardCaption>
                )}
                <div className="mt-auto pt-8">
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
