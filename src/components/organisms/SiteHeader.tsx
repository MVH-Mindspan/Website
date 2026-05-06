"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { ease, type as typeScale } from "@/lib/tokens";
import { brand } from "@/content/brand";
import { audienceNav, nav } from "@/content/nav";
import { ANALYTICS_EVENTS, track } from "@/lib/analytics";

export function SiteHeader() {
  const { theme } = useTheme();
  const c = theme.colors;
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const isActive = useCallback(
    (href: string) => {
      if (!pathname) return false;
      if (pathname === href) return true;
      return pathname.startsWith(href + "/");
    },
    [pathname]
  );

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > window.innerHeight * 0.6);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close menu on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Close menu when viewport crosses nav (1200px)
  useEffect(() => {
    if (!open) return;
    const mql = window.matchMedia("(min-width: 1200px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [open]);

  // Body scroll lock (iOS-safe: pin via position fixed and restore)
  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    const body = document.body;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  // Restore focus to hamburger on close
  const closeMenu = useCallback(() => {
    setOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  const linkBase = {
    fontFamily: theme.fonts.body,
    fontSize: typeScale.bodySm,
    fontWeight: 450,
    whiteSpace: "nowrap",
  } as const;

  const navStyle = useMemo<React.CSSProperties>(() => {
    const baseShadow =
      "inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 16px -8px rgba(0,0,0,0.22), 0 1px 3px -1px rgba(0,0,0,0.12)";
    const scrolledShadow =
      "inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 32px -8px rgba(0,0,0,0.35), 0 2px 8px -2px rgba(0,0,0,0.18)";
    return {
      width: "min(1320px, 92vw)",
      background: "rgba(32,30,23,0.85)",
      backdropFilter: "blur(20px) saturate(140%)",
      WebkitBackdropFilter: "blur(20px) saturate(140%)",
      borderRadius: "10rem",
      padding: scrolled ? "8px 12px 8px 24px" : "12px 12px 12px 24px",
      boxShadow: scrolled ? scrolledShadow : baseShadow,
      transition: `padding 0.4s ${ease.expressive}, box-shadow 0.4s ease`,
      ["--nav-fg" as string]: alpha(c.cream, 0.7),
      ["--nav-fg-strong" as string]: c.cream,
      ["--cta-hover-bg" as string]: c.cream,
    } as React.CSSProperties;
  }, [c.cream, scrolled]);

  const panelInitial = reduceMotion
    ? { opacity: 0 }
    : { opacity: 0, y: -8, scaleY: 0.96 };
  const panelAnimate = reduceMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, scaleY: 1 };
  const panelExit = reduceMotion
    ? { opacity: 0 }
    : { opacity: 0, y: -6, scaleY: 0.98 };

  return (
    <>
      {/* Scrim — mobile only, behind the panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            aria-hidden="true"
            onClick={closeMenu}
            className="fixed inset-0 z-[998] nav:hidden"
            style={{ background: "rgba(32,30,23,0.45)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: ease.expressive }}
          />
        )}
      </AnimatePresence>

      <nav
        className="fixed top-4 left-1/2 -translate-x-1/2 z-[999] flex items-center justify-between"
        style={navStyle}
      >
        <a href="/" className="inline-flex items-center" aria-label={brand.name}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/mindspan-wordmark-white.png"
            srcSet="/assets/mindspan-wordmark-white.png 1x, /assets/mindspan-wordmark-white@2x.png 2x"
            alt={brand.name}
            width={175}
            height={28}
            style={{
              height: 28,
              width: "auto",
              maxWidth: "min(175px, 38vw)",
              aspectRatio: "850 / 136",
              display: "block",
            }}
          />
        </a>

        <ul className="hidden nav:flex items-center gap-8">
          {[...nav, audienceNav.providers].map((n) => {
            const active = isActive(n.href);
            return (
              <li key={n.label}>
                <a
                  href={n.href}
                  className="v2-header-link"
                  data-active={active ? "true" : undefined}
                  aria-current={active ? "page" : undefined}
                  style={linkBase}
                >
                  {n.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2 nav:gap-3">
          <a
            href={audienceNav.refer.href}
            className="hidden nav:inline-flex v2-header-refer items-center gap-2 font-medium px-5 py-3"
            style={{
              fontFamily: theme.fonts.body,
              fontSize: typeScale.bodySm,
              color: c.cream,
              background: "transparent",
              border: `1px solid ${alpha(c.cream, 0.32)}`,
              borderRadius: "10rem",
              whiteSpace: "nowrap",
              textDecoration: "none",
            }}
          >
            {audienceNav.refer.label}
          </a>
          <a
            href={brand.primaryCtaHref}
            onClick={() =>
              track(ANALYTICS_EVENTS.ctaClicked, {
                location: "site_header",
                variant: "primary",
                href: brand.primaryCtaHref,
              })
            }
            className="v2-header-cta font-semibold px-4 nav:px-6 py-2 nav:py-3"
            style={{
              fontFamily: theme.fonts.body,
              fontSize: typeScale.bodySm,
              color: c.brandGreen,
              background: "#fff",
              borderRadius: "10rem",
              whiteSpace: "nowrap",
            }}
          >
            <span className="nav:hidden">{brand.primaryCta}</span>
            <span className="hidden nav:inline-flex nav:items-center nav:gap-2">
              Book an appointment
              <svg
                className="v2-header-cta-arrow"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1 5h8m0 0L5.5 1.5M9 5 5.5 8.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>

          <button
            ref={hamburgerRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="nav:hidden inline-flex items-center justify-center"
            style={{
              width: 44,
              height: 44,
              borderRadius: "9999px",
              color: alpha(c.cream, 0.85),
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                position: "relative",
                width: 20,
                height: 14,
                display: "block",
              }}
            >
              <motion.span
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 6,
                  height: 2,
                  borderRadius: 2,
                  background: "currentColor",
                  transformOrigin: "center",
                }}
                initial={false}
                animate={{
                  y: open ? 0 : -5,
                  rotate: open ? 45 : 0,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.2,
                  ease: ease.expressive,
                }}
              />
              <motion.span
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 6,
                  height: 2,
                  borderRadius: 2,
                  background: "currentColor",
                  transformOrigin: "center",
                }}
                initial={false}
                animate={{
                  y: open ? 0 : 5,
                  rotate: open ? -45 : 0,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.2,
                  ease: ease.expressive,
                }}
              />
            </span>
          </button>
        </div>

        {/* Mobile drop-down panel */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="site-mobile-menu"
              role="menu"
              className="nav:hidden absolute inset-x-3"
              style={{
                top: "100%",
                marginTop: 8,
                maxHeight: "calc(100vh - 120px)",
                overflowY: "auto",
                background: "rgba(32,30,23,0.92)",
                backdropFilter: "blur(24px) saturate(140%)",
                WebkitBackdropFilter: "blur(24px) saturate(140%)",
                borderRadius: "2rem",
                padding: "12px",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.08), 0 16px 40px -12px rgba(0,0,0,0.45)",
                transformOrigin: "top center",
              }}
              initial={panelInitial}
              animate={panelAnimate}
              exit={panelExit}
              transition={{ duration: reduceMotion ? 0.12 : 0.22, ease: ease.expressive }}
            >
              <div className="flex flex-col">
                {[...nav, audienceNav.providers].map((n, i, arr) => {
                  const active = isActive(n.href);
                  return (
                    <a
                      key={n.label}
                      href={n.href}
                      role="menuitem"
                      className="v2-header-mobile-link"
                      data-active={active ? "true" : undefined}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      style={{
                        fontFamily: theme.fonts.heading,
                        fontSize: "1.5rem",
                        lineHeight: 1.15,
                        color: c.cream,
                        padding: "14px 16px",
                        display: "flex",
                        alignItems: "center",
                        minHeight: 48,
                        borderBottom:
                          i < arr.length - 1
                            ? `1px solid ${alpha(c.cream, 0.08)}`
                            : "none",
                        textDecoration: "none",
                      }}
                    >
                      {n.label}
                    </a>
                  );
                })}
              </div>

              <div
                aria-hidden="true"
                style={{
                  height: 1,
                  background: alpha(c.cream, 0.12),
                  margin: "8px 4px",
                }}
              />

              <div className="flex flex-col">
                <a
                  href={brand.phoneHref}
                  onClick={() => {
                    track(ANALYTICS_EVENTS.ctaClicked, {
                      location: "site_header_mobile",
                      variant: "phone",
                      href: brand.phoneHref,
                    });
                    setOpen(false);
                  }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 12,
                    color: alpha(c.cream, 0.8),
                    fontFamily: theme.fonts.body,
                    fontSize: typeScale.bodySm,
                    padding: "12px 16px",
                    minHeight: 48,
                    textDecoration: "none",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 2.5h2.4l1.2 3-1.6 1a8 8 0 0 0 4.5 4.5l1-1.6 3 1.2V13a.5.5 0 0 1-.5.5A11 11 0 0 1 2.5 3a.5.5 0 0 1 .5-.5Z"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {brand.phone}
                </a>
                <a
                  href="/locations"
                  onClick={() => setOpen(false)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 12,
                    color: alpha(c.cream, 0.8),
                    fontFamily: theme.fonts.body,
                    fontSize: typeScale.bodySm,
                    padding: "12px 16px",
                    minHeight: 48,
                    textDecoration: "none",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M8 14s5-4.5 5-8.5a5 5 0 0 0-10 0C3 9.5 8 14 8 14Z"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="8"
                      cy="5.5"
                      r="1.6"
                      stroke="currentColor"
                      strokeWidth="1.4"
                    />
                  </svg>
                  {brand.secondaryCta}
                </a>
              </div>

              <a
                href={audienceNav.refer.href}
                onClick={() => setOpen(false)}
                style={{
                  display: "block",
                  textAlign: "center",
                  fontFamily: theme.fonts.body,
                  fontWeight: 500,
                  fontSize: typeScale.bodySm,
                  color: c.cream,
                  background: "transparent",
                  border: `1px solid ${alpha(c.cream, 0.32)}`,
                  padding: "13px 24px",
                  borderRadius: "10rem",
                  marginTop: 12,
                  marginInline: 4,
                  textDecoration: "none",
                }}
              >
                {audienceNav.refer.label}
              </a>
              <a
                href={brand.primaryCtaHref}
                onClick={() => {
                  track(ANALYTICS_EVENTS.ctaClicked, {
                    location: "site_header_mobile",
                    variant: "primary",
                    href: brand.primaryCtaHref,
                  });
                  setOpen(false);
                }}
                style={{
                  display: "block",
                  textAlign: "center",
                  fontFamily: theme.fonts.body,
                  fontWeight: 600,
                  fontSize: typeScale.bodySm,
                  color: c.brandGreen,
                  background: "#fff",
                  padding: "14px 24px",
                  borderRadius: "10rem",
                  marginTop: 8,
                  marginInline: 4,
                  textDecoration: "none",
                }}
              >
                {brand.primaryCta}
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
