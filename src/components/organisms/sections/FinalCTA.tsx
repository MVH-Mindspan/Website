"use client";

import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Heading } from "@/components/atoms/Heading";
import { Lead } from "@/components/atoms/Lead";
import { ArrowIcon } from "@/components/atoms/ArrowIcon";
import { Reveal } from "@/components/molecules/Reveal";

export function FinalCTA({
  eyebrow,
  title,
  lead,
  primary,
  secondary,
  signature,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  signature?: string;
}) {
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <section
      className="relative overflow-hidden text-white"
      style={{ background: c.primary, padding: "96px 0" }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute -top-40 -right-40 w-[640px] h-[640px] rounded-full blur-3xl final-glow--warm"
          style={{
            background: `radial-gradient(circle, ${alpha(c.accent, 0.22)} 0%, transparent 62%)`,
          }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[560px] h-[560px] rounded-full blur-3xl final-glow--cool"
          style={{
            background: `radial-gradient(circle, ${alpha(c.sky, 0.18)} 0%, transparent 62%)`,
          }}
        />
      </div>
      <Reveal
        className="relative"
        style={{
          maxWidth: "min(760px, 92vw)",
          marginInline: "auto",
          textAlign: "center",
        }}
      >
        <Eyebrow color="#bdd8f5">{eyebrow}</Eyebrow>
        <Heading
          as="h2"
          variant="h2"
          fontFamily={theme.fonts.heading}
          className="mt-6"
        >
          {title}
        </Heading>
        <Lead
          size="lg"
          maxWidth="62ch"
          className="mt-6 mx-auto text-white/80"
          style={{ marginInline: "auto" }}
        >
          {lead}
        </Lead>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href={primary.href}
            className="inline-flex items-center gap-2 font-semibold transition-all hover:-translate-y-0.5"
            style={{
              fontFamily: theme.fonts.body,
              padding: "16px 32px",
              background: c.brandGreen,
              color: "#fff",
              borderRadius: "10rem",
              fontSize: typeScale.bodySm,
            }}
          >
            {primary.label} <ArrowIcon />
          </a>
          {secondary && (
            <a
              href={secondary.href}
              className="inline-flex items-center gap-2 font-medium transition-all"
              style={{
                fontFamily: theme.fonts.body,
                padding: "16px 32px",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.35)",
                borderRadius: "10rem",
                fontSize: typeScale.bodySm,
              }}
            >
              {secondary.label}
            </a>
          )}
        </div>
        {signature && (
          <p
            className="mt-10 text-[15px]"
            style={{
              color: "rgba(255,255,255,0.52)",
              fontFamily: theme.fonts.accent,
              fontStyle: "italic",
              letterSpacing: "0.01em",
            }}
          >
            {signature}
          </p>
        )}
      </Reveal>
    </section>
  );
}
