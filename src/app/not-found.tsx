import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Lead } from "@/components/atoms/Lead";
import { brand } from "@/content/brand";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Page not found | Mindspan",
  description:
    "We could not find that page. Head back to the homepage, browse our locations, or book a visit with a Mindspan neurologist.",
  canonical: "/404",
  noIndex: true,
});

const GREEN = "#083630";
const CREAM = "#FBF7F0";
const INK_MUTED = "rgba(8,54,48,0.7)";
const INK_DIM = "rgba(8,54,48,0.55)";

const helpfulLinks = [
  { label: "Locations", href: "/locations", description: "Clinics in MA and CA" },
  { label: "Providers", href: "/providers", description: "Meet our neurologists" },
  { label: "How it works", href: "/about/how-it-works", description: "What to expect" },
  { label: brand.primaryCta, href: brand.primaryCtaHref, description: "Talk to our care team" },
] as const;

export default function NotFound() {
  return (
    <main
      role="main"
      className="min-h-screen flex items-center px-6 py-24"
      style={{ background: CREAM }}
    >
      <Container width="narrow">
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
            color: INK_DIM,
          }}
        >
          404
        </p>
        <Heading
          as="h1"
          variant="h1"
          color={GREEN}
          fontFamily="var(--font-eb-garamond), Georgia, serif"
          style={{ marginTop: "1.25rem" }}
        >
          We could not find that page.
        </Heading>
        <Lead
          color={INK_MUTED}
          maxWidth="48ch"
          style={{ marginTop: "1.25rem" }}
        >
          The link may be outdated, or the page has moved. Head back to the
          homepage, or pick up where you wanted to go below.
        </Lead>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center font-semibold rounded-full transition-transform hover:-translate-y-0.5"
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

        <nav
          aria-label="Helpful links"
          className="mt-12 grid gap-3"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        >
          {helpfulLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-2xl px-5 py-4 transition-colors"
              style={{
                background: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(8,54,48,0.08)",
                color: GREEN,
                textDecoration: "none",
              }}
            >
              <span
                className="block font-semibold"
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "0.9375rem",
                }}
              >
                {link.label}
              </span>
              <span
                className="mt-1 block"
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "0.875rem",
                  color: "rgba(8,54,48,0.65)",
                }}
              >
                {link.description}
              </span>
            </Link>
          ))}
        </nav>

        <p
          className="mt-10"
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
      </Container>
    </main>
  );
}
