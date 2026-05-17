"use client";

/* eslint-disable @next/next/no-img-element */
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";
import { Container } from "@/components/atoms/Container";
import { ImageFrame } from "@/components/atoms/ImageFrame";
import { Reveal } from "@/components/molecules/Reveal";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import type { ProviderPreview } from "@/content/providersPreview";

export function ProvidersPreview({
  intro,
  providers,
  tone = "sand",
}: {
  intro: { eyebrow: string; title: string; lead: string };
  providers: readonly ProviderPreview[];
  tone?: "sand" | "cream";
}) {
  const { theme } = useTheme();
  const c = theme.colors;
  const bg = tone === "cream" ? c.cream : c.sand;

  if (providers.length === 0) return null;

  return (
    <section id="our-neurologists" style={{ background: bg, padding: "clamp(56px, 10vw, 96px) 0" }}>
      <Container>
        <SectionHeader
          eyebrow={intro.eyebrow}
          title={intro.title}
          lead={intro.lead}
        />
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
          {providers.map((p, i) => (
            <Reveal
              key={p.id}
              as="article"
              className="rounded-[2rem] p-5 sm:p-6 md:p-8 flex flex-col items-center text-center"
              style={{
                background: "#fff",
                border: `1px solid ${alpha(c.ink, 0.06)}`,
                animationDelay: `${i * 80}ms`,
              }}
            >
              {p.image ? (
                <ImageFrame radius="50%" style={{ marginBottom: 20 }}>
                  <img
                    src={p.image}
                    alt={p.imageAlt ?? p.name}
                    width={96}
                    height={96}
                    loading="lazy"
                    style={{
                      display: "block",
                      width: 96,
                      height: 96,
                      objectFit: "cover",
                      objectPosition: "center top",
                    }}
                  />
                </ImageFrame>
              ) : (
                <div
                  aria-hidden
                  style={{
                    width: 96,
                    height: 96,
                    borderRadius: "50%",
                    background: c.brandGreen,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: theme.fonts.heading,
                    fontSize: "2rem",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                    marginBottom: 20,
                  }}
                >
                  {p.initials}
                </div>
              )}
              <div
                style={{
                  fontFamily: theme.fonts.heading,
                  fontSize: typeScale.leadMd,
                  color: c.ink,
                  lineHeight: 1.2,
                  maxWidth: "20ch",
                  wordBreak: "break-word",
                }}
              >
                {p.name}
              </div>
              <div
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: typeScale.bodySm,
                  color: c.brandGreen,
                  fontWeight: 600,
                  marginTop: 6,
                }}
              >
                {p.role}
              </div>
              <p
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: typeScale.bodySm,
                  color: alpha(c.ink, 0.72),
                  lineHeight: 1.55,
                  marginTop: 14,
                }}
              >
                {p.bio}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
