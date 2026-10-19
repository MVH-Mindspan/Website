"use client";

import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { tracking, type as typeScale } from "@/lib/tokens";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Pill } from "@/components/atoms/Pill";
import { Reveal } from "@/components/molecules/Reveal";
import { SectionHeader } from "@/components/molecules/SectionHeader";

export type QuestionCardItem = {
  id: string;
  title: string;
  tag?: string;
  note: { label: string; body: string };
};

/**
 * Numbered question cards: a question, an optional tag pill, and a
 * labelled note. Notes follow the tag in natural flow, so dividers line
 * up across the row whenever titles share a line count.
 */
export function QuestionCards({
  id,
  intro,
  items,
  tone = "cream",
}: {
  id?: string;
  intro: { eyebrow: string; title: string; lead?: string };
  items: readonly QuestionCardItem[];
  tone?: "cream" | "sand";
}) {
  const { theme } = useTheme();
  const c = theme.colors;

  if (items.length === 0) return null;

  const isSand = tone === "sand";
  const sectionBg = isSand ? c.sand : c.cream;
  const cardBg = isSand ? alpha(c.cream, 0.7) : alpha(c.sand, 0.7);
  const tagBg = isSand ? c.sand : c.cream;

  return (
    <section
      id={id}
      style={{
        background: sectionBg,
        color: c.ink,
        padding: "clamp(56px, 10vw, 96px) 0",
        scrollMarginTop: "96px",
      }}
    >
      <Container>
        <SectionHeader eyebrow={intro.eyebrow} title={intro.title} lead={intro.lead} />

        <ol className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {items.map((item, i) => (
            <Reveal
              key={item.id}
              as="li"
              dataProximity="subtle"
              className="v2-card rounded-[2rem] p-6 md:p-8 min-w-0 flex flex-col"
              style={{ background: cardBg }}
            >
              <span
                aria-hidden
                style={{
                  fontFamily: theme.fonts.heading,
                  fontSize: "2.5rem",
                  lineHeight: 1,
                  color: c.accentText,
                }}
              >
                {i + 1}
              </span>
              <Heading
                as="h3"
                variant="h4"
                color={c.ink}
                fontFamily={theme.fonts.heading}
                className="mt-5 break-words"
              >
                {item.title}
              </Heading>
              {item.tag && (
                <Pill background={tagBg} color={c.brandGreen} className="mt-4 self-start">
                  {item.tag}
                </Pill>
              )}
              <div
                className="mt-6"
                style={{
                  borderTop: `1px solid ${alpha(c.ink, 0.14)}`,
                  paddingTop: 16,
                }}
              >
                <p
                  style={{
                    fontFamily: theme.fonts.body,
                    fontSize: typeScale.micro,
                    fontWeight: 600,
                    letterSpacing: tracking.eyebrow,
                    textTransform: "uppercase",
                    color: c.brandGreen,
                  }}
                >
                  {item.note.label}
                </p>
                <p
                  style={{
                    fontFamily: theme.fonts.body,
                    fontSize: typeScale.body,
                    lineHeight: 1.55,
                    color: alpha(c.ink, 0.7),
                    marginTop: 8,
                  }}
                >
                  {item.note.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
