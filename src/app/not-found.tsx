import Link from "next/link";
import type { Metadata } from "next";
import { brand } from "@/content/brand";

export const metadata: Metadata = {
  title: "Page not found | Mindspan",
  description: "The page you’re looking for doesn’t exist.",
  robots: { index: false, follow: true },
};

const INK = "#111111";
const GREEN = "#083630";
const CREAM = "#efeeeb";

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: CREAM, color: INK }}
    >
      <div
        className="w-full"
        style={{ maxWidth: "min(560px, 92vw)" }}
      >
        <div
          aria-hidden="true"
          style={{
            width: 64,
            height: 1,
            background: "rgba(8,54,48,0.25)",
            marginBottom: 24,
          }}
        />
        <p
          className="font-semibold uppercase"
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "0.8125rem",
            letterSpacing: "0.18em",
            color: "rgba(8,54,48,0.55)",
          }}
        >
          404
        </p>
        <h1
          className="mt-5"
          style={{
            fontFamily: "var(--font-pt-serif), Georgia, serif",
            fontSize: "clamp(2.25rem, 4vw + 1rem, 3.5rem)",
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            color: INK,
          }}
        >
          We couldn’t find that page.
        </h1>
        <p
          className="mt-5"
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            color: "rgba(8,54,48,0.7)",
            fontSize: "1.0625rem",
            lineHeight: 1.6,
            maxWidth: "44ch",
          }}
        >
          The link may be outdated, or the page has moved. Head back to the
          homepage, book a visit, or give us a call.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center font-semibold rounded-full transition-all hover:-translate-y-0.5"
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "0.9375rem",
              padding: "14px 28px",
              background: GREEN,
              color: "#fff",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.18), 0 1px 2px rgba(8,54,48,0.08), 0 4px 10px -2px rgba(8,54,48,0.18)",
            }}
          >
            Back to home
          </Link>
          <Link
            href={brand.primaryCtaHref}
            className="inline-flex items-center font-semibold rounded-full transition-colors"
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "0.9375rem",
              padding: "14px 28px",
              border: "1px solid rgba(8,54,48,0.25)",
              color: GREEN,
            }}
          >
            {brand.primaryCta}
          </Link>
        </div>
        <p
          className="mt-8"
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            color: "rgba(8,54,48,0.65)",
            fontSize: "0.9375rem",
          }}
        >
          Need help finding something?{" "}
          <a
            href={brand.phoneHref}
            className="v2-link"
            style={{
              color: GREEN,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Call {brand.phone}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
