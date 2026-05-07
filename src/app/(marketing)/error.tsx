"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/atoms/Container";

const GREEN = "#083630";
const INK = "rgba(8,54,48,0.7)";
const MUTED = "rgba(8,54,48,0.55)";

/**
 * Marketing-segment error boundary. Renders inside the marketing layout
 * (header + footer remain visible), so this only owns the page body.
 * Calm, on-brand, never shows stack traces.
 */
export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error("[mindspan] marketing route error", error);
    }
  }, [error]);

  return (
    <section
      role="alert"
      aria-live="polite"
      style={{
        paddingBlock: "clamp(4rem, 9vw, 8rem)",
        background: "var(--theme-cream, #FBF7F0)",
      }}
    >
      <Container width="narrow">
        <div className="text-center">
          <p
            className="text-xs font-semibold tracking-[0.18em] uppercase"
            style={{ color: MUTED }}
          >
            Something went wrong on this page
          </p>
          <h1
            className="mt-4"
            style={{
              fontFamily: "var(--font-eb-garamond), Georgia, serif",
              fontSize: "clamp(1.875rem, 3vw + 1rem, 2.75rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              color: GREEN,
            }}
          >
            We hit an unexpected snag.
          </h1>
          <p
            className="mt-4 mx-auto"
            style={{
              color: INK,
              fontSize: "1.0625rem",
              lineHeight: 1.6,
              maxWidth: "48ch",
            }}
          >
            Try reloading this section, or jump to a different page from the
            menu above. The rest of the site is still working.
            {error.digest ? (
              <span
                className="block mt-3 text-xs"
                style={{ color: "rgba(8,54,48,0.6)" }}
              >
                Reference: {error.digest}
              </span>
            ) : null}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 font-semibold rounded-full px-7 py-3 transition-transform hover:-translate-y-0.5"
              style={{
                background: GREEN,
                color: "#fff",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.18), 0 1px 2px rgba(8,54,48,0.08), 0 4px 10px -2px rgba(8,54,48,0.18)",
              }}
            >
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-semibold rounded-full px-7 py-3 transition-colors"
              style={{
                border: "1px solid rgba(8,54,48,0.25)",
                color: GREEN,
              }}
            >
              Back to home
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
