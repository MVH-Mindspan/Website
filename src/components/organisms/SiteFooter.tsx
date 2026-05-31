"use client";

import { useTheme } from "@/lib/theme-context";
import { Container } from "@/components/atoms/Container";
import { brand } from "@/content/brand";
import { footer } from "@/content/footer";

// External links get rel="noopener noreferrer" + target="_blank".
// Internal/anchor/protocol links (/, #, mailto:, tel:) stay in-tab.
function isExternal(href: string) {
  return /^https?:\/\//i.test(href);
}

function FooterLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const external = isExternal(href);
  return (
    <a
      href={href}
      className={className}
      data-proximity=""
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
      {external ? <span className="sr-only"> (opens in new tab)</span> : null}
    </a>
  );
}

export function SiteFooter() {
  const { theme } = useTheme();
  const c = theme.colors;

  const columns = footer.columns ?? [];
  const legal = footer.legal ?? [];
  const mailingAddress = footer.mailingAddress ?? [];

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
            {mailingAddress.length > 0 && (
              <address className="mt-3 text-xs text-white/55 leading-relaxed not-italic">
                {mailingAddress.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            )}
            {brand.phone && brand.phoneHref && (
              <p className="mt-3 text-xs text-white/55">
                <FooterLink
                  href={brand.phoneHref}
                  className="v2-link hover:text-white"
                >
                  {brand.phone}
                </FooterLink>
              </p>
            )}
          </div>
          {columns.map((col) =>
            col.links.length === 0 ? null : (
              <div key={col.title}>
                <p className="text-white font-semibold mb-4 text-sm">
                  {col.title}
                </p>
                <ul className="space-y-2 text-sm">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <FooterLink
                        href={link.href}
                        className="v2-link hover:text-white transition-colors break-words"
                      >
                        {link.label}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
        <div
          className="mt-12 sm:mt-16 pt-6 sm:pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 text-sm"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <p>{footer.copyright}</p>
          {legal.length > 0 && (
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {legal.map((l) => (
                <FooterLink
                  key={l.label}
                  href={l.href}
                  className="v2-link hover:text-white"
                >
                  {l.label}
                </FooterLink>
              ))}
            </div>
          )}
        </div>
      </Container>
    </footer>
  );
}
