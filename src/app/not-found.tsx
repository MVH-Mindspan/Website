import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found | Mindspan",
  description: "The page you’re looking for doesn’t exist.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
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
          404
        </p>
        <h1
          className="mt-4 font-serif"
          style={{
            fontFamily: "var(--font-eb-garamond), serif",
            fontSize: "clamp(2.25rem, 4vw + 1rem, 3.5rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
          }}
        >
          We couldn’t find that page.
        </h1>
        <p
          className="mt-5 mx-auto"
          style={{
            color: "rgba(8,54,48,0.7)",
            fontSize: "1.0625rem",
            lineHeight: 1.6,
            maxWidth: "44ch",
          }}
        >
          The link may be outdated or the page has moved. Let’s get you back on track.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-semibold rounded-full px-7 py-3 transition-transform hover:-translate-y-0.5"
            style={{ background: "#083630", color: "#fff" }}
          >
            Back to home
          </Link>
          <Link
            href="/book-a-visit"
            className="inline-flex items-center gap-2 font-semibold rounded-full px-7 py-3 transition-colors"
            style={{
              border: "1px solid rgba(8,54,48,0.25)",
              color: "#083630",
            }}
          >
            Book a visit
          </Link>
        </div>
      </div>
    </main>
  );
}
