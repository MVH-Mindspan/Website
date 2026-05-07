"use client";

import { useEffect } from "react";
import Link from "next/link";

const CREAM = "#FBF7F0";
const GREEN = "#083630";
const INK = "rgba(8,54,48,0.7)";
const MUTED = "rgba(8,54,48,0.55)";

/**
 * Root error boundary. Renders when something throws outside the marketing
 * shell (or before the marketing layout has mounted). Calm, on-brand,
 * never shows a stack trace.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface to the browser console for debugging only.
    // In production this is silently captured by the runtime.
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error("[mindspan] route error", error);
    }
  }, [error]);

  return (
    <main
      role="main"
      className="min-h-screen flex items-center justify-center px-6 py-24"
      style={{ background: CREAM, color: GREEN }}
    >
      <div className="w-full text-center" style={{ maxWidth: "min(640px, 92vw)" }}>
        <p
          className="text-xs font-semibold tracking-[0.18em] uppercase"
          style={{ color: MUTED }}
        >
          Something went wrong
        </p>
        <h1
          className="mt-4"
          style={{
            fontFamily: "var(--font-eb-garamond), Georgia, serif",
            fontSize: "clamp(2.25rem, 4vw + 1rem, 3.5rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            color: GREEN,
          }}
        >
          We hit an unexpected error.
        </h1>
        <p
          className="mt-5 mx-auto"
          style={{
            color: INK,
            fontSize: "1.0625rem",
            lineHeight: 1.6,
            maxWidth: "48ch",
          }}
        >
          We are sorry. Try again, or head back to the homepage. If this keeps
          happening, our team can help by phone.
          {error.digest ? (
            <span
              className="block mt-3 text-xs"
              style={{ color: "rgba(8,54,48,0.6)" }}
            >
              Reference: {error.digest}
            </span>
          ) : null}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
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
        <p
          className="mt-8"
          style={{
            color: "rgba(8,54,48,0.65)",
            fontSize: "0.9375rem",
          }}
        >
          Need a hand?{" "}
          <a
            href="tel:+16174209000"
            className="v2-link"
            style={{ color: GREEN, fontWeight: 600, textDecoration: "none" }}
          >
            Call (617) 420-9000
          </a>
          .
        </p>
      </div>
    </main>
  );
}
