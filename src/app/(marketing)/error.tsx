"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[mindspan] marketing route error", error);
  }, [error]);

  return (
    <section
      className="px-6 py-24 text-center"
      style={{ background: "#FBF7F0", color: "#083630" }}
    >
      <div className="mx-auto" style={{ maxWidth: "min(640px, 92vw)" }}>
        <p
          className="text-xs font-semibold tracking-[0.18em] uppercase"
          style={{ color: "rgba(8,54,48,0.55)" }}
        >
          Something broke on this page
        </p>
        <h1
          className="mt-4"
          style={{
            fontFamily: "var(--font-eb-garamond), serif",
            fontSize: "clamp(1.875rem, 3vw + 1rem, 2.75rem)",
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
          }}
        >
          We hit an unexpected snag.
        </h1>
        <p
          className="mt-4 mx-auto"
          style={{
            color: "rgba(8,54,48,0.7)",
            fontSize: "1rem",
            lineHeight: 1.6,
            maxWidth: "48ch",
          }}
        >
          Try reloading this section, or jump to a different page from the menu above.
          {error.digest && (
            <span className="block mt-3 text-xs" style={{ color: "rgba(8,54,48,0.72)" }}>
              Reference: {error.digest}
            </span>
          )}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 font-semibold rounded-full px-6 py-2.5 transition-transform hover:-translate-y-0.5"
            style={{ background: "#083630", color: "#fff" }}
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-semibold rounded-full px-6 py-2.5 transition-colors"
            style={{
              border: "1px solid rgba(8,54,48,0.25)",
              color: "#083630",
            }}
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
