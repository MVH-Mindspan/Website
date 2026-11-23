"use client";

import { useTheme } from "@/lib/theme-context";
import { Container } from "@/components/atoms/Container";

/**
 * Renders markdown that was converted to HTML at build time (src/lib/learn.ts).
 * Typography lives in `.learn-prose` in globals.css so writers' headings,
 * lists and quotes pick up the brand scale without per-element styling.
 */
export function ArticleBody({ html }: { html: string }) {
  const { theme } = useTheme();
  const c = theme.colors;
  return (
    <section style={{ background: c.cream, color: c.ink, padding: "clamp(48px, 7vw, 80px) 0 0" }}>
      <Container width="prose">
        <div className="learn-prose" dangerouslySetInnerHTML={{ __html: html }} />
      </Container>
    </section>
  );
}
