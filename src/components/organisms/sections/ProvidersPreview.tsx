"use client";

import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";
import { Container } from "@/components/atoms/Container";
import { ArrowIcon } from "@/components/atoms/ArrowIcon";
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

  return (
    <section style={{ background: bg, padding: "96px 0" }}>
      <Container>
        <SectionHeader
          eyebrow={intro.eyebrow}
          title={intro.title}
          lead={intro.lead}
        />
        <div className="mt-12 grid md:grid-cols-3 gap-5 md:gap-6">
          {providers.map((p, i) => (
            <Reveal
              key={p.id}
              as="article"
              className="rounded-[2rem] p-8 flex flex-col items-center text-center"
              style={{
                background: "#fff",
                border: `1px solid ${alpha(c.ink, 0.06)}`,
                animationDelay: `${i * 80}ms`,
              }}
            >
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
              <div
                style={{
                  fontFamily: theme.fonts.heading,
                  fontSize: typeScale.leadMd,
                  color: c.ink,
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
        <div className="mt-10 flex justify-center">
          <a
            href="/providers"
            className="inline-flex items-center gap-2 font-semibold transition-all hover:-translate-y-0.5"
            style={{
              fontFamily: theme.fonts.body,
              fontSize: typeScale.body,
              color: c.ink,
              padding: "14px 28px",
              background: "#fff",
              border: `1px solid ${alpha(c.ink, 0.12)}`,
              borderRadius: "10rem",
              textDecoration: "none",
            }}
          >
            Meet the full team <ArrowIcon />
          </a>
        </div>
      </Container>
    </section>
  );
}
