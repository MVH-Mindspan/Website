"use client";

import { Fragment, type ReactNode } from "react";
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale, lineHeight, tracking } from "@/lib/tokens";
import { Container } from "@/components/atoms/Container";

export type LegalText = string;

export type LegalBlock =
  | { kind: "p"; text: LegalText }
  | { kind: "callout"; text: LegalText }
  | { kind: "list"; items: LegalText[] }
  | { kind: "definitions"; items: { term: string; description: LegalText }[] };

export type LegalSubsection = {
  number?: string;
  heading?: string;
  blocks: LegalBlock[];
};

export type LegalSection = {
  number?: string;
  heading: string;
  anchor?: string;
  blocks?: LegalBlock[];
  subsections?: LegalSubsection[];
};

export type LegalDocumentContent = {
  intro?: LegalBlock[];
  sections: LegalSection[];
};

export function LegalDocument({
  intro,
  sections,
  showToc = true,
}: LegalDocumentContent & { showToc?: boolean }) {
  const { theme } = useTheme();
  const c = theme.colors;
  const tocItems =
    showToc && sections.length > 1
      ? sections
          .filter((s) => s.number)
          .map((s) => ({
            id: s.anchor ?? slugify(s.heading),
            number: s.number!,
            heading: s.heading,
          }))
      : [];

  return (
    <section
      style={{
        background: c.cream,
        color: c.ink,
        padding: "32px 0 120px",
      }}
    >
      <Container>
        <div
          className="legal-grid"
          style={{
            display: "grid",
            gridTemplateColumns:
              tocItems.length > 0 ? "minmax(0, 1fr)" : "minmax(0, 1fr)",
            gap: 64,
          }}
        >
          <style>{`
            @media (min-width: 1024px) {
              .legal-grid.with-toc {
                grid-template-columns: 240px minmax(0, 1fr) !important;
              }
            }
          `}</style>
          {tocItems.length > 0 && (
            <aside
              className="hidden lg:block"
              style={{
                position: "sticky",
                top: 96,
                alignSelf: "start",
                maxHeight: "calc(100vh - 120px)",
                overflowY: "auto",
                paddingRight: 8,
              }}
            >
              <p
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: typeScale.micro,
                  letterSpacing: tracking.eyebrow,
                  textTransform: "uppercase",
                  color: c.accentText,
                  fontWeight: 600,
                  marginBottom: 16,
                }}
              >
                Contents
              </p>
              <ol
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  margin: 0,
                  padding: 0,
                  listStyle: "none",
                  fontFamily: theme.fonts.body,
                  fontSize: "0.95rem",
                  lineHeight: 1.4,
                }}
              >
                {tocItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="v2-link"
                      style={{
                        color: alpha(c.ink, 0.7),
                        textDecoration: "none",
                        display: "flex",
                        gap: 8,
                      }}
                    >
                      <span style={{ color: c.accentText, fontVariantNumeric: "tabular-nums" }}>
                        {item.number}.
                      </span>
                      <span>{item.heading}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </aside>
          )}

          <div
            className={tocItems.length > 0 ? "with-toc-body" : undefined}
            style={{ maxWidth: "min(820px, 92vw)" }}
          >
            {intro && intro.length > 0 && (
              <div style={{ marginBottom: 56 }}>
                {intro.map((b, i) => (
                  <BlockRenderer key={i} block={b} />
                ))}
              </div>
            )}

            {sections.map((section, idx) => {
              const id = section.anchor ?? slugify(section.heading);
              return (
                <article
                  key={id}
                  id={id}
                  style={{
                    marginTop: idx === 0 ? 0 : 64,
                    scrollMarginTop: 96,
                  }}
                >
                  <SectionHeading
                    number={section.number}
                    heading={section.heading}
                  />
                  {section.blocks?.map((b, i) => (
                    <BlockRenderer key={i} block={b} />
                  ))}
                  {section.subsections?.map((sub, i) => (
                    <Subsection key={i} sub={sub} />
                  ))}
                </article>
              );
            })}
          </div>
        </div>
        {tocItems.length > 0 && (
          <style>{`
            @media (min-width: 1024px) {
              .legal-grid {
                grid-template-columns: 240px minmax(0, 1fr) !important;
                gap: 80px !important;
              }
              .with-toc-body {
                max-width: 720px !important;
              }
            }
          `}</style>
        )}
      </Container>
    </section>
  );
}

function SectionHeading({
  number,
  heading,
}: {
  number?: string;
  heading: string;
}) {
  const { theme } = useTheme();
  const c = theme.colors;
  return (
    <h2
      style={{
        fontFamily: theme.fonts.heading,
        fontSize: typeScale.h3,
        lineHeight: lineHeight.h3,
        letterSpacing: tracking.tight,
        fontWeight: 400,
        color: c.ink,
        margin: 0,
        marginBottom: 20,
        display: "flex",
        gap: 16,
        alignItems: "baseline",
      }}
    >
      {number && (
        <span
          style={{
            fontFamily: theme.fonts.body,
            fontSize: "0.95rem",
            letterSpacing: tracking.eyebrow,
            textTransform: "uppercase",
            color: c.accentText,
            fontWeight: 700,
            flexShrink: 0,
            transform: "translateY(-2px)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {number.padStart(2, "0")}
        </span>
      )}
      <span>{heading}</span>
    </h2>
  );
}

function Subsection({ sub }: { sub: LegalSubsection }) {
  const { theme } = useTheme();
  const c = theme.colors;
  return (
    <div style={{ marginTop: 32 }}>
      {(sub.number || sub.heading) && (
        <h3
          style={{
            fontFamily: theme.fonts.heading,
            fontSize: typeScale.h4,
            lineHeight: lineHeight.h4,
            letterSpacing: tracking.tight,
            fontWeight: 500,
            color: c.ink,
            margin: 0,
            marginBottom: 14,
          }}
        >
          {sub.number && (
            <span
              style={{
                fontFamily: theme.fonts.body,
                fontSize: "0.85rem",
                color: alpha(c.ink, 0.5),
                fontWeight: 600,
                marginRight: 12,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {sub.number}
            </span>
          )}
          {sub.heading}
        </h3>
      )}
      {sub.blocks.map((b, i) => (
        <BlockRenderer key={i} block={b} />
      ))}
    </div>
  );
}

function BlockRenderer({ block }: { block: LegalBlock }) {
  switch (block.kind) {
    case "p":
      return <Paragraph text={block.text} />;
    case "callout":
      return <Callout text={block.text} />;
    case "list":
      return <BulletList items={block.items} />;
    case "definitions":
      return <DefinitionList items={block.items} />;
  }
}

function Paragraph({ text }: { text: string }) {
  const { theme } = useTheme();
  const c = theme.colors;
  return (
    <p
      style={{
        fontFamily: theme.fonts.body,
        fontSize: typeScale.body,
        lineHeight: 1.7,
        color: alpha(c.ink, 0.8),
        margin: 0,
        marginBottom: 16,
      }}
    >
      {renderInline(text)}
    </p>
  );
}

function Callout({ text }: { text: string }) {
  const { theme } = useTheme();
  const c = theme.colors;
  return (
    <div
      style={{
        margin: "24px 0",
        padding: "20px 24px",
        background: alpha(c.accent, 0.06),
        borderLeft: `3px solid ${c.accent}`,
        borderRadius: "0.5rem",
      }}
    >
      <p
        style={{
          fontFamily: theme.fonts.body,
          fontSize: typeScale.bodySm,
          lineHeight: 1.65,
          color: c.ink,
          margin: 0,
          fontWeight: 500,
        }}
      >
        {renderInline(text)}
      </p>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  const { theme } = useTheme();
  const c = theme.colors;
  return (
    <ul
      style={{
        listStyle: "none",
        margin: "0 0 16px",
        padding: 0,
      }}
    >
      {items.map((item, i) => (
        <li
          key={i}
          style={{
            fontFamily: theme.fonts.body,
            fontSize: typeScale.body,
            lineHeight: 1.7,
            color: alpha(c.ink, 0.8),
            marginBottom: 10,
            paddingLeft: 24,
            position: "relative",
          }}
        >
          <span
            aria-hidden
            style={{
              position: "absolute",
              left: 4,
              top: "0.7em",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: c.accent,
            }}
          />
          {renderInline(item)}
        </li>
      ))}
    </ul>
  );
}

function DefinitionList({
  items,
}: {
  items: { term: string; description: string }[];
}) {
  const { theme } = useTheme();
  const c = theme.colors;
  return (
    <dl style={{ margin: "0 0 16px" }}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            marginBottom: 16,
            paddingBottom: 16,
            borderBottom:
              i < items.length - 1 ? `1px solid ${alpha(c.ink, 0.08)}` : undefined,
          }}
        >
          <dt
            style={{
              fontFamily: theme.fonts.body,
              fontSize: typeScale.body,
              fontWeight: 700,
              color: c.ink,
              marginBottom: 6,
            }}
          >
            {item.term}
          </dt>
          <dd
            style={{
              fontFamily: theme.fonts.body,
              fontSize: typeScale.body,
              lineHeight: 1.7,
              color: alpha(c.ink, 0.8),
              margin: 0,
            }}
          >
            {renderInline(item.description)}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function renderInline(text: string): ReactNode {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 0 ? (
      <Fragment key={i}>{part}</Fragment>
    ) : (
      <strong key={i} style={{ fontWeight: 600 }}>
        {part}
      </strong>
    )
  );
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
