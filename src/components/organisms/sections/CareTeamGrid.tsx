"use client";

/* eslint-disable @next/next/no-img-element */
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Button } from "@/components/atoms/Button";
import { ArrowIcon } from "@/components/atoms/ArrowIcon";
import { Pill } from "@/components/atoms/Pill";
import { ImageFrame } from "@/components/atoms/ImageFrame";
import { Reveal } from "@/components/molecules/Reveal";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import type { CareTeamMember } from "@/content/pages/locationDetail";

export function CareTeamGrid({
  id,
  intro,
  providers,
}: {
  id?: string;
  intro: { eyebrow: string; title: string; lead: string };
  providers: readonly CareTeamMember[];
}) {
  const { theme } = useTheme();
  const c = theme.colors;

  if (providers.length === 0) return null;

  const cols =
    providers.length === 1
      ? "md:grid-cols-1 max-w-2xl"
      : providers.length === 2
      ? "md:grid-cols-2"
      : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section id={id} style={{ padding: "96px 0", background: c.cream }}>
      <Container>
        <SectionHeader
          eyebrow={intro.eyebrow}
          title={intro.title}
          lead={intro.lead}
        />
        <div className={`mt-12 grid ${cols} gap-6 md:gap-8 mx-auto`}>
          {providers.map((p, i) => (
            <Reveal
              key={p.name}
              className="rounded-[2rem] overflow-hidden flex flex-col"
              style={{
                background: c.sand,
                border: `1px solid ${alpha(c.ink, 0.06)}`,
                animationDelay: `${i * 80}ms`,
              }}
            >
              <ImageFrame radius="1.25rem" className="m-3 mb-0">
                <img
                  src={p.image}
                  alt={p.imageAlt}
                  className="w-full object-cover"
                  style={{ aspectRatio: "4/3", objectPosition: "center top" }}
                  loading="lazy"
                />
              </ImageFrame>
              <div className="p-6 md:p-7 flex flex-col flex-1">
                <Heading
                  as="h3"
                  variant="h4"
                  color={c.ink}
                  fontFamily={theme.fonts.heading}
                >
                  {p.name}
                </Heading>
                <p
                  className="mt-1"
                  style={{
                    fontFamily: theme.fonts.body,
                    fontSize: typeScale.body,
                    color: alpha(c.ink, 0.7),
                  }}
                >
                  {p.role}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.specialties.map((s) => (
                    <Pill
                      key={s}
                      background={alpha(c.brandGreen, 0.08)}
                      color={c.brandGreen}
                    >
                      {s}
                    </Pill>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap items-center gap-3 mt-auto pt-7">
                  <Button
                    href={p.cta.href}
                    variant="primary"
                    size="md"
                    iconRight={<ArrowIcon />}
                  >
                    {p.cta.label}
                  </Button>
                  {p.profileHref && (
                    <a
                      href={p.profileHref}
                      style={{
                        fontFamily: theme.fonts.body,
                        fontSize: typeScale.body,
                        fontWeight: 600,
                        color: c.brandGreen,
                        textDecoration: "none",
                      }}
                    >
                      Full bio &rarr;
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
