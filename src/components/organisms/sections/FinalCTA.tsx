"use client";

import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Heading } from "@/components/atoms/Heading";
import { Lead } from "@/components/atoms/Lead";
import { ArrowIcon } from "@/components/atoms/ArrowIcon";
import { Reveal } from "@/components/molecules/Reveal";
import { externalLinkProps } from "@/lib/links";

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
          maxWidth: "min(880px, 92vw)",
          marginInline: "auto",
          textAlign: "center",
        }}
      >
        <Eyebrow color="#A8D2FB">{eyebrow}</Eyebrow>
        <Heading
          as="h2"
          variant="h2"
          fontFamily={theme.fonts.heading}
          className="mt-6 final-cta-title"
        >
          {title}
        </Heading>
        <Lead
          size="lg"
          maxWidth="58ch"
          className="mt-6 mx-auto text-white/85"
          style={{
            marginInline: "auto",
            fontSize: typeScale.leadLg,
            textWrap: "pretty",
          }}
        >
          {lead}
        </Lead>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {secondary && (
            <a
              href={secondary.href}
              {...externalLinkProps(secondary.href)}
              className="inline-flex items-center gap-2 font-semibold transition-all"
              style={{
                fontFamily: theme.fonts.body,
                padding: "16px 32px",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.45)",
                background: "transparent",
                borderRadius: "10rem",
                fontSize: typeScale.body,
              }}
            >
              {secondary.label}
            </a>
          )}
          <a
            href={primary.href}
            {...externalLinkProps(primary.href)}
            className="inline-flex items-center gap-2 font-semibold transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.4)]"
            style={{
              fontFamily: theme.fonts.body,
              padding: "16px 32px",
              background: "#fff",
              color: c.brandGreen,
              borderRadius: "10rem",
              fontSize: typeScale.body,
              boxShadow: "0 4px 16px -4px rgba(0,0,0,0.25)",
            }}
          >
            {primary.label} <ArrowIcon />
          </a>
        </div>
        {signature && (
          <p
            className="mt-10"
            style={{
              color: "rgba(255,255,255,0.7)",
              fontFamily: theme.fonts.accent,
              fontStyle: "italic",
              letterSpacing: "0.01em",
              fontSize: typeScale.leadMd,
            }}
          >
            {signature}
          </p>
        )}
      </Reveal>
      <style jsx>{`
        :global(.final-cta-title) {
          text-wrap: balance;
        }
      `}</style>
    </section>
  );
}
