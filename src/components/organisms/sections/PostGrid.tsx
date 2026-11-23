"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale, radius } from "@/lib/tokens";
import { Container } from "@/components/atoms/Container";
import { ImageFrame } from "@/components/atoms/ImageFrame";
import { Reveal } from "@/components/molecules/Reveal";

export type PostCard = {
  slug: string;
  title: string;
  description: string;
  dateLabel: string;
  authorName: string;
  tag?: string;
  image?: string;
  imageAlt?: string;
  readingMinutes: number;
};

export function PostGrid({
  posts,
  emptyText,
  feed,
}: {
  posts: readonly PostCard[];
  emptyText: string;
  feed?: { label: string; href: string };
}) {
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <section style={{ padding: "0 0 clamp(72px, 10vw, 120px)", background: c.cream }}>
      <Container>
        {posts.length === 0 ? (
          <p
            style={{
              fontFamily: theme.fonts.body,
              fontSize: typeScale.leadMd,
              color: alpha(c.ink, 0.6),
            }}
          >
            {emptyText}
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={Math.min(i, 4) as 0 | 1 | 2 | 3 | 4}>
                <article className="group flex h-full flex-col">
                  <Link
                    href={`/learn/${p.slug}`}
                    className="flex h-full flex-col"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {p.image ? (
                      <ImageFrame radius={radius.lg}>
                        <img
                          src={p.image}
                          alt={p.imageAlt ?? ""}
                          loading={i < 3 ? "eager" : "lazy"}
                          style={{
                            display: "block",
                            width: "100%",
                            aspectRatio: "16 / 9",
                            objectFit: "cover",
                            transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                          }}
                          className="group-hover:scale-[1.02]"
                        />
                      </ImageFrame>
                    ) : (
                      <div
                        aria-hidden
                        style={{
                          aspectRatio: "16 / 9",
                          borderRadius: radius.lg,
                          background: c.sand,
                          border: `1px solid ${alpha(c.ink, 0.08)}`,
                        }}
                      />
                    )}
                    <div className="mt-6 flex flex-1 flex-col">
                      <p
                        style={{
                          fontFamily: theme.fonts.body,
                          fontSize: typeScale.micro,
                          fontWeight: 600,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: c.accentText,
                        }}
                      >
                        {p.tag ?? "Article"}
                        <span style={{ color: alpha(c.ink, 0.45), fontWeight: 500, letterSpacing: 0, textTransform: "none", marginLeft: 10 }}>
                          {p.readingMinutes} min read
                        </span>
                      </p>
                      <h3
                        className="mt-3"
                        style={{
                          fontFamily: theme.fonts.heading,
                          fontSize: typeScale.h4,
                          lineHeight: 1.18,
                          letterSpacing: "-0.015em",
                          fontWeight: 500,
                          color: c.ink,
                          textWrap: "balance",
                        }}
                      >
                        {p.title}
                      </h3>
                      <p
                        className="mt-3"
                        style={{
                          fontFamily: theme.fonts.body,
                          fontSize: typeScale.bodySm,
                          lineHeight: 1.55,
                          color: alpha(c.ink, 0.72),
                        }}
                      >
                        {p.description}
                      </p>
                      <p
                        className="mt-auto pt-5"
                        style={{
                          fontFamily: theme.fonts.body,
                          fontSize: typeScale.micro,
                          color: alpha(c.ink, 0.55),
                        }}
                      >
                        {p.authorName} · {p.dateLabel}
                      </p>
                    </div>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        )}

        {feed && (
          <p
            className="mt-14"
            style={{
              fontFamily: theme.fonts.body,
              fontSize: typeScale.micro,
              color: alpha(c.ink, 0.5),
            }}
          >
            <a href={feed.href} style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: 3 }}>
              {feed.label}
            </a>
          </p>
        )}
      </Container>
    </section>
  );
}
