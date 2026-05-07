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
              className="rounded-[2rem] p-5 sm:p-6 md:p-8 flex flex-col group transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_1px_2px_rgba(32,30,23,0.06),0_10px_24px_-12px_rgba(32,30,23,0.18)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_2px_4px_rgba(32,30,23,0.08),0_24px_48px_-16px_rgba(32,30,23,0.24)]"
              style={{
                background: c.skySoft,
                border: `1px solid ${alpha(c.ink, 0.08)}`,
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
                  className={a.bullets && a.bullets.length > 0 ? "mt-5 break-words" : "mt-5 flex-1 break-words"}
                >
                  {a.body}
                </Lead>
                {a.bullets && a.bullets.length > 0 && (
                  <BulletList
                    items={a.bullets}
                    bulletColor={c.brandGreen}
                    color={alpha(c.ink, 0.78)}
                    className="mt-8 text-base flex-1"
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
