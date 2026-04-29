"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[mindspan] route error", error);
  }, [error]);

  return (
    <main
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "#FBF7F0", color: "#083630" }}
    >
      <div
        className="w-full text-center"
        style={{ maxWidth: "min(640px, 92vw)" }}
      >
        <p
          className="text-xs font-semibold tracking-[0.18em] uppercase"
          style={{ color: "rgba(8,54,48,0.55)" }}
        >
          Something broke
        </p>
        <h1
          className="mt-4"
          style={{
            fontFamily: "var(--font-eb-garamond), serif",
            fontSize: "clamp(2.25rem, 4vw + 1rem, 3.5rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
          }}
        >
          We’re sorry — something went wrong.
        </h1>
        <p
          className="mt-5 mx-auto"
          style={{
            color: "rgba(8,54,48,0.7)",
            fontSize: "1.0625rem",
            lineHeight: 1.6,
            maxWidth: "48ch",
          }}
        >
          An unexpected error interrupted this page. You can try again, or head back home.
          {error.digest && (
            <span className="block mt-3 text-xs" style={{ color: "rgba(8,54,48,0.45)" }}>
              Reference: {error.digest}
            </span>
          )}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 font-semibold rounded-full px-7 py-3 transition-transform hover:-translate-y-0.5"
            style={{ background: "#083630", color: "#fff" }}
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-semibold rounded-full px-7 py-3 transition-colors"
            style={{
              border: "1px solid rgba(8,54,48,0.25)",
              color: "#083630",
            }}
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
