"use client";

/* eslint-disable @next/next/no-img-element */
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale, radius } from "@/lib/tokens";
import { Container } from "@/components/atoms/Container";

export function AuthorCard({
  name,
  role,
  bio,
  photo,
  label,
}: {
  name: string;
  role: string;
  bio: string;
  photo?: string;
  label: string;
}) {
  const { theme } = useTheme();
  const c = theme.colors;
  return (
    <section style={{ background: c.cream, padding: "clamp(48px, 7vw, 80px) 0 clamp(72px, 10vw, 112px)" }}>
      <Container width="prose">
        <div
          className="flex gap-6 items-start"
          style={{
            background: c.sand,
            borderRadius: radius.xl,
            padding: "28px 32px",
            border: `1px solid ${alpha(c.ink, 0.06)}`,
          }}
        >
          {photo ? (
            <img
              src={photo}
              alt=""
              width={72}
              height={72}
              style={{ borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
            />
          ) : (
            <div
              aria-hidden
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: c.primary,
                color: c.cream,
                display: "grid",
                placeItems: "center",
                fontFamily: theme.fonts.heading,
                fontSize: "1.75rem",
                flexShrink: 0,
              }}
            >
              {name.charAt(0)}
            </div>
          )}
          <div style={{ minWidth: 0 }}>
            <p
              style={{
                fontFamily: theme.fonts.body,
                fontSize: typeScale.micro,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: alpha(c.ink, 0.55),
              }}
            >
              {label}
            </p>
            <p
              className="mt-2"
              style={{ fontFamily: theme.fonts.heading, fontSize: typeScale.h4, lineHeight: 1.2, color: c.ink }}
            >
              {name}
            </p>
            <p
              className="mt-1"
              style={{ fontFamily: theme.fonts.body, fontSize: typeScale.bodySm, color: alpha(c.ink, 0.65) }}
            >
              {role}
            </p>
            <p
              className="mt-3"
              style={{ fontFamily: theme.fonts.body, fontSize: typeScale.bodySm, lineHeight: 1.55, color: alpha(c.ink, 0.8) }}
            >
              {bio}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
