"use client";

import { useTheme } from "@/lib/theme-context";
import { Container } from "@/components/atoms/Container";
import { brand } from "@/content/brand";
import { footer } from "@/content/footer";

export function SiteFooter() {
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <footer
      className="text-white/75"
      style={{
        background: c.primary,
        padding: "80px 0 48px",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Container>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logo-white.png"
              alt={brand.name}
              width={160}
              height={40}
              className="h-10 w-auto"
              style={{ aspectRatio: "160 / 40" }}
            />
            <p className="mt-6 text-sm max-w-sm leading-relaxed">
              {brand.footerTagline}
            </p>
            <address className="mt-3 text-xs text-white/55 leading-relaxed not-italic">
              {footer.mailingAddress.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>
          {footer.columns.map((col) => (
            <div key={col.title}>
              <p className="text-white font-semibold mb-4 text-sm">{col.title}</p>
              <ul className="space-y-2 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="v2-link hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          className="mt-12 sm:mt-16 pt-6 sm:pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 text-sm"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <p>{footer.copyright}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {footer.legal.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="v2-link hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
