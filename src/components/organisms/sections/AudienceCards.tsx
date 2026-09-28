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
import { IconBadge } from "@/components/atoms/IconBadge";
import { SectionIcon } from "./icons";
import { BulletList } from "@/components/molecules/BulletList";
import { CardCaption } from "@/components/molecules/CardCaption";
import { Reveal } from "@/components/molecules/Reveal";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { externalLinkProps } from "@/lib/links";
import { grid, type as typeScale } from "@/lib/tokens";
import type { Audience } from "@/content/audiences";

export function AudienceCards({
  intro,
  audiences,
  tone = "sand",
}: {
  intro: {
    eyebrow: string;
    title: string;
    lead?: string;
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
          layout="split"
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
          // One gutter everywhere: card columns share the section's modular-grid
          // gutter (grid.columnGap) instead of an ad-hoc gap-5/gap-6.
          style={{ gap: grid.columnGap }}
          className={`mt-12 grid grid-cols-1 ${
            audiences.length === 2
              ? "md:grid-cols-2"
              : audiences.length === 1
              ? "md:grid-cols-1"
              : "sm:grid-cols-2 md:grid-cols-3"
          }`}
        >
          {audiences.map((a, i) => {
            const cardLinkProps = externalLinkProps(a.href);
            return (
              <Reveal
                key={a.id}
                as="article"
                dataProximity="subtle"
                className="v2-card rounded-[2rem] p-5 sm:p-6 md:p-8 flex flex-col group"
                style={{
                  background: alpha(c.skySoft, 0.7),
                  animationDelay: `${i * 80}ms`,
                }}
              >
                <a href={a.href} {...cardLinkProps} className="flex flex-col flex-1 min-w-0">
                  {a.icon && (
                    <IconBadge background={c.sky} color={c.brandGreen} className="mb-5">
                      <SectionIcon name={a.icon} />
                    </IconBadge>
                  )}
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
                    className="mt-4 break-words"
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
                      className="inline-flex items-center gap-2 font-semibold text-sm transition-all prox-inner-cta"
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
                  {cardLinkProps.target === "_blank" && (
                    <span className="sr-only"> (opens in new tab)</span>
                  )}
                </a>
                {/* Secondary link sits outside the card link: anchors can't nest. */}
                {a.link && (
                  <a
                    href={a.link.href}
                    {...externalLinkProps(a.link.href)}
                    className="self-start"
                    style={{
                      display: "inline-block",
                      // 10px padding + matching negative margins: 44px touch target, same layout.
                    padding: "10px 0",
                    margin: "10px 0 -10px",
                      fontFamily: theme.fonts.body,
                      fontSize: typeScale.bodySm,
                      color: c.brandGreen,
                      textDecoration: "underline",
                      textUnderlineOffset: "0.2em",
                      textDecorationThickness: "1px",
                      textDecorationColor: alpha(c.brandGreen, 0.4),
                    }}
                  >
                    {a.link.label}
                  </a>
                )}
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
