"use client";

/* eslint-disable @next/next/no-img-element */
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Lead } from "@/components/atoms/Lead";
import { Button } from "@/components/atoms/Button";
import { ArrowIcon } from "@/components/atoms/ArrowIcon";
import { ImageFrame } from "@/components/atoms/ImageFrame";
import { Reveal } from "@/components/molecules/Reveal";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import type { ClinicPromotion } from "@/content/pages/locationDetail";

export function InPersonClinicsBand({
  id,
  intro,
  clinics,
}: {
  id?: string;
  intro: { eyebrow: string; title: string; lead: string };
  clinics: readonly ClinicPromotion[];
}) {
  const { theme } = useTheme();
  const c = theme.colors;

  if (clinics.length === 0) return null;

  const cols =
    clinics.length === 1
      ? "md:grid-cols-1 max-w-3xl"
      : clinics.length === 2
      ? "md:grid-cols-2"
      : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section id={id} style={{ padding: "clamp(56px, 10vw, 96px) 0", background: c.sand }}>
      <Container>
        <SectionHeader
          eyebrow={intro.eyebrow}
          title={intro.title}
          lead={intro.lead}
        />
        <div className={`mt-12 grid ${cols} gap-6 md:gap-8 mx-auto`}>
          {clinics.map((clinic, i) => (
            <Reveal
              key={clinic.city}
              className="rounded-[2rem] overflow-hidden flex flex-col group"
              style={{
                background: c.cream,
                border: `1px solid ${alpha(c.ink, 0.06)}`,
                animationDelay: `${i * 80}ms`,
              }}
            >
              <ImageFrame radius="1.25rem" className="m-3 mb-0">
                <img
                  src={clinic.image}
                  alt={clinic.imageAlt}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] aspect-[4/3] sm:aspect-[16/10]"
                  loading="lazy"
                />
              </ImageFrame>
              <div className="p-6 md:p-7 flex flex-col flex-1 min-w-0">
                <p
                  className="font-semibold break-words"
                  style={{
                    fontFamily: theme.fonts.body,
                    fontSize: typeScale.bodySm,
                    color: c.accentText,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}
                >
                  Mindspan {clinic.city}
                </p>
                <Heading
                  as="h3"
                  variant="h4"
                  color={c.ink}
                  fontFamily={theme.fonts.heading}
                  className="mt-3 break-words"
                >
                  In-person care in {clinic.city}, {clinic.state}.
                </Heading>
                <p
                  className="mt-3 inline-flex items-start gap-2 break-words"
                  style={{
                    fontFamily: theme.fonts.body,
                    fontSize: typeScale.body,
                    color: alpha(c.ink, 0.7),
                    fontWeight: 500,
                  }}
                >
                  <PinIcon color={c.brandGreen} />
                  <span>{clinic.address}</span>
                </p>
                <Lead
                  size="bodyCard"
                  color={alpha(c.ink, 0.7)}
                  maxWidth={false}
                  className="mt-4 break-words"
                >
                  {clinic.blurb}
                </Lead>
                <div className="mt-auto pt-7">
                  <Button
                    href={clinic.cta.href}
                    variant="primary"
                    size="md"
                    iconRight={<ArrowIcon />}
                  >
                    {clinic.cta.label}
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function PinIcon({ color }: { color: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
