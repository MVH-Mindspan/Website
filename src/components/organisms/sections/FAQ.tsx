"use client";

import { useState } from "react";
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale, ease } from "@/lib/tokens";
import { Container } from "@/components/atoms/Container";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import type { FAQItem } from "@/content/faq";

export function FAQ({
  intro,
  items,
  tone = "sand",
}: {
  intro: { eyebrow: string; title: string };
  items: readonly FAQItem[];
  tone?: "sand" | "cream";
}) {
  const { theme } = useTheme();
  const c = theme.colors;
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  if (items.length === 0) return null;

  const bg = tone === "cream" ? c.cream : c.sand;

  return (
    <section
      data-analytics-location="faq"
      style={{ background: bg, padding: "clamp(56px, 10vw, 96px) 0" }}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(280px,360px)_1fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-24">
            <SectionHeader eyebrow={intro.eyebrow} title={intro.title} />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            {items.map((it) => {
            const isOpen = openId === it.id;
            const panelId = `faq-panel-${it.id}`;
            const buttonId = `faq-button-${it.id}`;
            return (
              <div
                key={it.id}
                className="v2-card"
                style={{
                  background: "rgba(255, 255, 255, 0.7)",
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                }}
              >
                <button
                  type="button"
                  id={buttonId}
                  onClick={() => setOpenId(isOpen ? null : it.id)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="w-full text-left flex items-center justify-between gap-6"
                  style={{
                    padding: "22px 28px",
                    fontFamily: theme.fonts.heading,
                    fontSize: typeScale.leadMd,
                    color: c.ink,
                    lineHeight: 1.3,
                    background: "transparent",
                    border: 0,
                    cursor: "pointer",
                  }}
                >
                  <span className="min-w-0 break-words">{it.question}</span>
                  <span
                    aria-hidden
                    style={{
                      flexShrink: 0,
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: isOpen ? c.brandGreen : alpha(c.ink, 0.06),
                      color: isOpen ? "#fff" : c.ink,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: `background 0.2s ease, transform 0.3s ${ease.expressive}`,
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      aria-hidden
                    >
                      <line x1="6" y1="1" x2="6" y2="11" />
                      <line x1="1" y1="6" x2="11" y2="6" />
                    </svg>
                  </span>
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  style={{
                    padding: isOpen ? "0 28px 24px" : 0,
                    fontFamily: theme.fonts.body,
                    fontSize: typeScale.body,
                    color: alpha(c.ink, 0.75),
                    lineHeight: 1.6,
                  }}
                >
                  {it.answer}
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </Container>
    </section>
  );
}
