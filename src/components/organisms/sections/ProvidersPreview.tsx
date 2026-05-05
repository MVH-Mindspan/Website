"use client";

/* eslint-disable @next/next/no-img-element */
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";
import { Container } from "@/components/atoms/Container";
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
  tone?: "sand" | "cream" | "ink";
}) {
  const { theme } = useTheme();
  const c = theme.colors;
  const isInk = tone === "ink";
  const bg = isInk ? "#201E17" : tone === "cream" ? c.cream : c.sand;

  const portraitSize = isInk ? 144 : 96;
  const nameColor = isInk ? c.cream : c.ink;
  const bioColor = isInk ? alpha(c.cream, 0.7) : alpha(c.ink, 0.72);
  const dividerColor = alpha(c.cream, 0.12);

  return (
    <section style={{ background: bg, padding: isInk ? "120px 0" : "96px 0" }}>
      <Container>
        <SectionHeader
          eyebrow={intro.eyebrow}
          title={intro.title}
          lead={intro.lead}
          tone={isInk ? "light" : "dark"}
        />
        <div
          className="mt-14 grid md:grid-cols-3 gap-5 md:gap-0"
          style={isInk ? undefined : undefined}
        >
          {providers.map((p, i) => (
            <Reveal
              key={p.id}
              as="article"
              className={
                isInk
                  ? "px-8 py-2 flex flex-col items-center text-center"
                  : "rounded-[2rem] p-8 flex flex-col items-center text-center"
              }
              style={{
                background: isInk ? "transparent" : "#fff",
                border: isInk ? "none" : `1px solid ${alpha(c.ink, 0.06)}`,
                borderLeft:
                  isInk && i > 0
                    ? `1px solid ${dividerColor}`
                    : isInk
                    ? "none"
                    : undefined,
                animationDelay: `${i * 80}ms`,
              }}
            >
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.imageAlt ?? p.name}
                  width={portraitSize}
                  height={portraitSize}
                  loading="lazy"
                  style={{
                    width: portraitSize,
                    height: portraitSize,
                    borderRadius: "50%",
                    objectFit: "cover",
                    objectPosition: "center top",
                    marginBottom: isInk ? 28 : 20,
                    border: isInk
                      ? `1px solid ${alpha(c.cream, 0.18)}`
                      : `1px solid ${alpha(c.ink, 0.08)}`,
                  }}
                />
              ) : (
                <div
                  aria-hidden
                  style={{
                    width: portraitSize,
                    height: portraitSize,
                    borderRadius: "50%",
                    background: c.brandGreen,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: theme.fonts.heading,
                    fontSize: isInk ? "2.5rem" : "2rem",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                    marginBottom: isInk ? 28 : 20,
                  }}
                >
                  {p.initials}
                </div>
              )}
              <div
                style={{
                  fontFamily: theme.fonts.heading,
                  fontSize: typeScale.leadMd,
                  color: nameColor,
                  lineHeight: 1.2,
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
                  color: bioColor,
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
