"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import {
  brand,
  nav,
  expectations,
  howItWorks,
  locations,
  audiences,
} from "@/lib/content";
import { StyleSwitcher } from "@/components/dev/StyleSwitcher";

const Arrow = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

// Animated counter for stats
function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [displayed, setDisplayed] = useState(value);
  const hasAnimated = useRef(false);
  const { theme } = useTheme();

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { hasAnimated.current = true; return; }

    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hasAnimated.current) return;
      hasAnimated.current = true;
      obs.disconnect();

      // Extract numeric part
      const match = value.match(/^([\d.]+)/);
      if (!match) return;
      const target = parseFloat(match[1]);
      const suffix = value.slice(match[1].length);
      const isDecimal = match[1].includes(".");
      const duration = 800;
      const start = performance.now();

      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 4); // ease-out-quart
        const current = target * eased;
        setDisplayed((isDecimal ? current.toFixed(1) : Math.round(current).toString()) + suffix);
        if (t < 1) requestAnimationFrame(tick);
        else setDisplayed(value);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div>
      <p
        ref={ref}
        style={{
          fontFamily: theme.fonts.heading,
          fontSize: "clamp(2rem, 1.4rem + 2vw, 3.4rem)",
          fontWeight: 500,
          lineHeight: 1,
          marginBottom: 8,
          color: theme.colors.brandGreen,
        }}
      >
        {displayed}
      </p>
      <p
        style={{
          fontFamily: theme.fonts.body,
          fontSize: "clamp(0.82rem, 0.78rem + 0.2vw, 0.92rem)",
          color: alpha(theme.colors.ink, 0.6),
          lineHeight: 1.4,
        }}
      >
        {label}
      </p>
    </div>
  );
}

export function ArrivalPage() {
  const { theme } = useTheme();
  const c = theme.colors;
  const [navScrolled, setNavScrolled] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);

  // Nav scroll-aware state
  const handleScroll = useCallback(() => {
    setNavScrolled(window.scrollY > window.innerHeight * 0.6);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Hero stagger entrance
  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Scroll-reveal: IntersectionObserver for .arrival-rv elements
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      document.querySelectorAll(".arrival-rv").forEach((el) => el.classList.add("on"));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("on");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );
    document.querySelectorAll(".arrival-rv").forEach((el) => obs.observe(el));

    // Hero elements reveal immediately (the hero section is the first <section>)
    const timer = setTimeout(() => {
      document
        .querySelectorAll(".arrival-scope .arrival-rv")
        .forEach((el) => {
          // Reveal elements inside the hero (first section with 100vh)
          const section = el.closest("section");
          if (section && section.style.height === "100vh") {
            el.classList.add("on");
          }
        });
    }, 300);

    return () => {
      obs.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="arrival-scope" style={{ background: c.cream, color: c.ink }}>
      {/* ============================================
          NAV — Floating dark pill
          ============================================ */}
      <nav
        className="fixed top-4 left-1/2 -translate-x-1/2 z-[999] flex items-center justify-between"
        style={{
          width: "min(1280px, 94vw)",
          background: navScrolled ? alpha("#201E17", 0.96) : alpha("#201E17", 0.88),
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderRadius: "10rem",
          padding: navScrolled ? "8px 12px 8px 24px" : "12px 12px 12px 24px",
          boxShadow: navScrolled ? "0 8px 32px -8px rgba(0,0,0,0.3)" : "none",
          transition: "padding 0.4s cubic-bezier(0.22, 1, 0.36, 1), background 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        <a
          href="/"
          className="font-extrabold uppercase tracking-tight"
          style={{
            fontFamily: theme.fonts.body,
            fontSize: "clamp(1.2rem, 1.05rem + 0.5vw, 1.5rem)",
            color: c.cream,
            letterSpacing: "-0.01em",
          }}
        >
          Mindspan
        </a>
        <ul className="hidden md:flex items-center gap-8">
          {nav.map((n) => (
            <li key={n.label}>
              <a
                href={n.href}
                className="transition-colors"
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: "clamp(0.82rem, 0.78rem + 0.2vw, 0.92rem)",
                  fontWeight: 450,
                  color: alpha(c.cream, 0.7),
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = c.cream)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = alpha(c.cream, 0.7))
                }
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a
            href={brand.primaryCtaHref}
            className="font-semibold transition-all"
            style={{
              fontFamily: theme.fonts.body,
              fontSize: "clamp(0.82rem, 0.78rem + 0.2vw, 0.92rem)",
              color: c.brandGreen,
              background: "#fff",
              padding: "12px 24px",
              borderRadius: "10rem",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = c.cream)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "#fff")
            }
          >
            {brand.primaryCta}
          </a>
        </div>
      </nav>

      {/* ============================================
          HERO — Full-bleed with gradient overlay
          ============================================ */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: "100vh", minHeight: 600 }}
      >
        {/* Full-bleed background video */}
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/assets/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Dim layer */}
        <div
          className="absolute inset-0"
          style={{ background: alpha("#201E17", 0.2) }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${alpha("#201E17", 0.72)} 0%, ${alpha("#201E17", 0.18)} 45%, ${alpha("#201E17", 0.08)} 100%)`,
          }}
        />
        {/* Content at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-16 arrival-hero-content"
          style={{ padding: "64px clamp(24px, 5vw, 80px)" }}
        >
          <h1
            style={{
              fontFamily: theme.fonts.heading,
              fontSize: "clamp(3rem, 1.8rem + 5vw, 7rem)",
              fontWeight: 400,
              color: c.cream,
              letterSpacing: "-0.02em",
              lineHeight: 0.98,
              maxWidth: "12ch",
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "none" : "translateY(24px)",
              transition: "opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {brand.headline}
          </h1>
          <div style={{
            maxWidth: 400,
            opacity: heroLoaded ? 1 : 0,
            transform: heroLoaded ? "none" : "translateY(18px)",
            transition: "opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s",
          }}>
            <p
              className="font-semibold"
              style={{
                fontFamily: theme.fonts.body,
                fontSize: "clamp(0.95rem, 0.9rem + 0.2vw, 1.08rem)",
                color: c.cream,
                marginBottom: 8,
                lineHeight: 1.4,
              }}
            >
              {brand.subTagline}
            </p>
            <p
              style={{
                fontFamily: theme.fonts.body,
                fontSize: "clamp(0.82rem, 0.78rem + 0.2vw, 0.92rem)",
                color: alpha(c.cream, 0.7),
                lineHeight: 1.55,
              }}
            >
              {brand.subhead}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          JOURNEY HEADER — Dark intro
          ============================================ */}
      <section
        style={{
          background: "#201E17",
          color: c.cream,
          padding: "56px 0",
        }}
      >
        <div
          className="arrival-rv arrival-grid-header"
          style={{
            maxWidth: "min(1320px, 92vw)",
            marginInline: "auto",
            display: "grid",
            gridTemplateColumns: "80px 1fr 1fr",
            gap: "0 32px",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              fontFamily: theme.fonts.heading,
              fontSize: "clamp(2rem, 1.4rem + 2vw, 3.4rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              gridColumn: "1 / 3",
            }}
          >
            The cognitive care clinic of the future.
          </h2>
          <p
            style={{
              fontFamily: theme.fonts.body,
              fontSize: "clamp(0.95rem, 0.9rem + 0.2vw, 1.08rem)",
              color: alpha(c.cream, 0.7),
              lineHeight: 1.6,
              maxWidth: "42ch",
            }}
          >
            Every family&apos;s journey is different, but the shape is the same.
            From first worry through to ongoing care, you&apos;ll know exactly
            what comes next at every step.
          </p>
        </div>
      </section>

      {/* ============================================
          LOCATIONS TEASER BANNER
          ============================================ */}
      <a
        href="#locations"
        className="block transition-colors"
        style={{ background: c.sand, padding: "20px 0" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = alpha(c.sand, 0.7))}
        onMouseLeave={(e) => (e.currentTarget.style.background = c.sand)}
      >
        <div
          className="arrival-grid-banner"
          style={{
            maxWidth: "min(1320px, 92vw)",
            marginInline: "auto",
            display: "grid",
            gridTemplateColumns: "80px 1fr 1fr",
            gap: "0 32px",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontFamily: theme.fonts.body,
              fontSize: "clamp(0.82rem, 0.78rem + 0.2vw, 0.92rem)",
              fontWeight: 600,
              color: c.ink,
              margin: 0,
              gridColumn: "1 / 3",
            }}
          >
            Now seeing patients in Danvers, Irvine, Bay Area. Massachusetts statewide via Telehealth.
          </p>
          <p
            style={{
              fontFamily: theme.fonts.body,
              fontSize: "clamp(0.82rem, 0.78rem + 0.2vw, 0.92rem)",
              color: c.accent,
              fontWeight: 600,
              margin: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 6,
            }}
          >
            Appointments available this month <Arrow size={14} />
          </p>
        </div>
      </a>

      {/* ============================================
          STAGES — Editorial rows on sand
          ============================================ */}
      <section style={{ background: c.cream, color: c.ink, paddingBottom: 48 }}>
        <div style={{ maxWidth: "min(1320px, 92vw)", marginInline: "auto" }}>
          {howItWorks.map((rawStep, i) => {
            // Override first step for Arrival layout
            const step = i === 0
              ? {
                  title: "Get assessed",
                  body: "A free 10-minute online assessment you can take from your kitchen table. No account, no cost, no clinic visit. Answer a few honest questions and get clear feedback on whether a neurologist visit makes sense. The easiest first step in healthcare.",
                }
              : rawStep;
            return (
            <div
              key={step.title}
              className="arrival-rv group"
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr 1fr",
                gap: "0 32px",
                padding: "48px 0",
                borderBottom: `1px solid ${c.sand}`,
                position: "relative",
                animationDelay: `${i * 80}ms`,
              }}
            >
              {/* Number column */}
              <div className="flex flex-col items-center" style={{ paddingTop: 8 }}>
                <div
                  className="arrival-num flex items-center justify-center rounded-full text-xs font-semibold flex-shrink-0 transition-all duration-300"
                  style={{
                    fontFamily: theme.fonts.body,
                    width: 36,
                    height: 36,
                    border: `1.5px solid ${c.brandGreen}`,
                    color: c.brandGreen,
                    background: alpha(c.brandGreen, 0.06),
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                {i < howItWorks.length - 1 && (
                  <div
                    className="flex-1"
                    style={{
                      width: 1,
                      background: alpha(c.brandGreen, 0.2),
                      marginTop: 12,
                    }}
                  />
                )}
              </div>

              {/* Content */}
              <div style={{ paddingRight: 32 }}>
                <p
                  style={{
                    fontFamily: theme.fonts.body,
                    fontSize: "clamp(0.7rem, 0.65rem + 0.2vw, 0.8rem)",
                    fontWeight: 600,
                    textTransform: "uppercase" as const,
                    letterSpacing: "0.08em",
                    color: c.accent,
                    marginBottom: 12,
                  }}
                >
                  {expectations[i]?.kicker || `Step ${i + 1}`}
                </p>
                <h3
                  style={{
                    fontFamily: theme.fonts.heading,
                    fontSize: "clamp(1.5rem, 1.15rem + 1.2vw, 2.2rem)",
                    fontWeight: 500,
                    marginBottom: 4,
                    lineHeight: 1.15,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: theme.fonts.body,
                    fontSize: "clamp(0.95rem, 0.9rem + 0.2vw, 1.08rem)",
                    color: alpha(c.ink, 0.65),
                    lineHeight: 1.55,
                    maxWidth: "42ch",
                  }}
                >
                  {step.body}
                </p>
                {i === 0 && (
                  <a
                    href="/book-a-visit"
                    className="inline-flex items-center gap-2 font-semibold transition-all hover:-translate-y-0.5 mt-6"
                    style={{
                      fontFamily: theme.fonts.body,
                      fontSize: "clamp(0.82rem, 0.78rem + 0.2vw, 0.92rem)",
                      padding: "12px 24px",
                      background: c.brandGreen,
                      color: "#fff",
                      borderRadius: "10rem",
                    }}
                  >
                    Start a free assessment <Arrow />
                  </a>
                )}
                {i === 1 && (
                  <a
                    href="#locations"
                    className="inline-flex items-center gap-2 font-semibold transition-all hover:-translate-y-0.5 mt-6"
                    style={{
                      fontFamily: theme.fonts.body,
                      fontSize: "clamp(0.82rem, 0.78rem + 0.2vw, 0.92rem)",
                      padding: "12px 24px",
                      background: c.brandGreen,
                      color: "#fff",
                      borderRadius: "10rem",
                    }}
                  >
                    View our clinic locations <Arrow />
                  </a>
                )}
              </div>

              {/* Proof column — editorial image (hidden on mobile) */}
              <div className="flex flex-col justify-center arrival-step-image">
                <img
                  src={i === 0 ? "/assets/get-assessed.png" : i === 3 ? "/assets/ongoing-partnership.png" : i % 2 === 0 ? "/assets/consultation-1.png" : "/assets/consultation-2.png"}
                  alt=""
                  className="rounded-2xl w-full object-cover"
                  style={{ aspectRatio: "16/10" }}
                  loading="lazy"
                />
              </div>
            </div>
          ); })}
        </div>
      </section>

      {/* ============================================
          STATS BAND
          ============================================ */}
      <section
        style={{
          background: c.cream,
          padding: "64px 0",
          borderBottom: `1px solid ${c.sand}`,
        }}
      >
        <div
          className="arrival-rv"
          style={{
            maxWidth: "min(1320px, 92vw)",
            marginInline: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 32,
          }}
        >
          {[
            { num: "2\u20133 wks", label: "Average time to see a neurologist" },
            { num: "9", label: "Lifestyle factors tracked in your personal plan" },
            { num: "100%", label: "Of visits billed through insurance" },
            { num: "10 min", label: "Free online assessment, no account needed" },
          ].map((stat) => (
            <AnimatedStat key={stat.label} value={stat.num} label={stat.label} />
          ))}
        </div>
      </section>

      {/* ============================================
          WHY CARE IS DIFFERENT — Protocol comparison
          ============================================ */}
      <section className="arrival-section" style={{ padding: "96px 0" }}>
        <div style={{ maxWidth: "min(1320px, 92vw)", marginInline: "auto" }}>
          <div className="arrival-rv max-w-3xl">
            <p className="arrival-eyebrow" style={{ color: c.accent }}>Why care at Mindspan is different</p>
            <h2 className="arrival-h2 mt-4" style={{ fontFamily: theme.fonts.heading, fontSize: "clamp(2rem, 1.4rem + 2vw, 3.4rem)", lineHeight: 1.08, letterSpacing: "-0.03em" }}>
              Standard of care, made better by precision medicine.
            </h2>
            <p className="mt-5" style={{ fontFamily: theme.fonts.body, fontSize: "clamp(1rem, 0.4vw + 0.95rem, 1.25rem)", lineHeight: 1.55, maxWidth: "62ch", color: alpha(c.ink, 0.7) }}>
              Every Mindspan patient gets the full standard of neurological care. And every patient gets access to breakthroughs that were sitting in research papers a year ago, translated into their plan, explained in their language, covered by their insurance.
            </p>
          </div>

          <div className="arrival-rv mt-12 overflow-hidden rounded-[2rem]">
            <img
              src="/assets/consultation-2.png"
              alt="A patient and neurologist in conversation"
              className="w-full object-cover"
              style={{ maxHeight: 420 }}
              loading="lazy"
            />
          </div>

          <div className="mt-12 grid lg:grid-cols-2 gap-6 md:gap-8">
            <div className="arrival-rv rounded-[2rem] p-8 md:p-10" style={{ background: c.sand, border: `1px solid ${alpha(c.ink, 0.06)}` }}>
              <p className="arrival-eyebrow" style={{ color: alpha(c.ink, 0.6) }}>The Core Protocol</p>
              <h3 className="mt-3" style={{ fontFamily: theme.fonts.heading, fontSize: "clamp(1.375rem, 0.8vw + 1rem, 1.75rem)", lineHeight: 1.18, color: c.ink }}>
                The full standard of care, delivered without compromise.
              </h3>
              <p className="mt-4" style={{ fontFamily: theme.fonts.body, fontSize: "1rem", lineHeight: 1.6, color: alpha(c.ink, 0.72) }}>
                Everything a great neurology clinic should offer. No waiting. No rushed visits. Every patient is treated like the complex person they are.
              </p>
              <ul className="mt-6 space-y-2.5 text-base" style={{ color: alpha(c.ink, 0.82) }}>
                {["Unhurried time with a board-certified neurologist", "Comprehensive cognitive testing and functional assessment", "MRI, PET imaging, and full dementia lab panel when indicated", "FDA-approved anti-amyloid therapies (Leqembi, Kisunla) for eligible patients", "Caregiver included. Your primary care doctor kept in the loop.", "Billed through insurance, just like any other specialist visit"].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: c.brandGreen }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="arrival-rv rounded-[2rem] p-8 md:p-10 relative overflow-hidden" style={{ background: c.brandGreen, color: "#fff" }}>
              <div className="absolute inset-0 opacity-60 pointer-events-none" style={{ background: `radial-gradient(120% 100% at 100% 0%, ${alpha(c.accent, 0.18)} 0%, transparent 55%)` }} />
              <div className="relative">
                <p className="arrival-eyebrow" style={{ color: c.accent }}>The Edge Protocol</p>
                <h3 className="mt-3" style={{ fontFamily: theme.fonts.heading, fontSize: "clamp(1.375rem, 0.8vw + 1rem, 1.75rem)", lineHeight: 1.18 }}>
                  Precision medicine, layered on top.
                </h3>
                <p className="mt-4 text-white/80" style={{ fontFamily: theme.fonts.body, fontSize: "1rem", lineHeight: 1.6 }}>
                  The breakthroughs that move the needle, delivered to you as part of normal care. Not clinical trial, not concierge, just better medicine.
                </p>
                <ul className="mt-6 space-y-2.5 text-[15px] text-white/85">
                  {["Blood biomarker panel that can confirm amyloid status without needing a PET scan", "Genetic testing (APOE) for personalized risk and safer treatment decisions", "2024 biological disease staging framework (A/T/N)", "Your own Cognitive Digital Twin, built and updated visit by visit", "Structured plan across 9 lifestyle factors with actual targets, not generic advice", "Both anti-amyloid therapies, with genotype-informed safety planning"].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: c.accent }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================
          TECHNOLOGY — Dark section for visual rhythm
          ============================================ */}
      <section style={{ background: c.primary, color: c.cream, padding: "96px 0", borderRadius: "2.2rem 2.2rem 0 0" }}>
        <div style={{ maxWidth: "min(1320px, 92vw)", marginInline: "auto" }}>
          <div className="arrival-rv max-w-3xl">
            <p className="arrival-eyebrow" style={{ color: c.accent }}>The technology behind your care</p>
            <h3 className="mt-4" style={{ fontFamily: theme.fonts.heading, fontSize: "clamp(2rem, 1.4rem + 2vw, 3.4rem)", lineHeight: 1.08 }}>
              Three quiet systems that make all of this possible.
            </h3>
            <p className="mt-5" style={{ fontFamily: theme.fonts.body, fontSize: "clamp(1rem, 0.4vw + 0.95rem, 1.25rem)", lineHeight: 1.55, color: alpha(c.cream, 0.65) }}>
              You will never have to learn how any of this works. Your neurologist uses it so your experience with us feels unhurried, personal, and safe.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-5 md:gap-6">
            {[
              { eyebrow: "Cognitive Digital Twin", title: "A model of your brain, built from your own data.", body: "We bring together your history, labs, imaging, biomarkers, genetics, and cognitive testing into a personalized model of your brain health. Your neurologist uses it to show you where you are biologically, where you might be heading, and which changes could actually shift that trajectory for you.", icon: "brain" },
              { eyebrow: "Care Orchestration Engine", title: "Nothing falls through the cracks.", body: "Our operational brain quietly tracks every safety checkpoint, every required MRI, every follow-up, every medication decision. If a scan is due before your next infusion, it is already scheduled. Protocol without memorization. Safety without gaps.", icon: "grid" },
              { eyebrow: "Mindy, your care companion", title: "A familiar voice between visits.", body: "Mindy is our AI care companion for the weeks and months between appointments. She helps track symptoms, supports adherence, answers common questions, and pages your clinical team when something needs real attention.", icon: "chat" },
            ].map((card, i) => (
              <div key={card.eyebrow} className="arrival-rv rounded-[2rem] p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-16px_rgba(0,0,0,0.4)]" style={{ background: c.primaryLight, animationDelay: `${i * 80}ms` }}>
                <div className="h-12 w-12 rounded-2xl flex items-center justify-center" style={{ background: c.brandGreen, color: "#fff" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    {card.icon === "brain" && <><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" /></>}
                    {card.icon === "grid" && <><rect width="8" height="8" x="3" y="3" rx="2" /><path d="M7 11v4a2 2 0 0 0 2 2h4" /><rect width="8" height="8" x="13" y="13" rx="2" /></>}
                    {card.icon === "chat" && <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />}
                  </svg>
                </div>
                <p className="arrival-eyebrow mt-6" style={{ color: alpha(c.cream, 0.6) }}>{card.eyebrow}</p>
                <h4 className="mt-3" style={{ fontFamily: theme.fonts.heading, fontSize: "clamp(1.375rem, 0.8vw + 1rem, 1.75rem)", lineHeight: 1.18 }}>{card.title}</h4>
                <p className="mt-4" style={{ fontFamily: theme.fonts.body, fontSize: "1rem", lineHeight: 1.6, color: alpha(c.cream, 0.65) }}>{card.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href={brand.primaryCtaHref} className="inline-flex items-center gap-2 font-semibold transition-all hover:-translate-y-0.5" style={{ fontFamily: theme.fonts.body, padding: "16px 32px", background: c.brandGreen, color: "#fff", borderRadius: "10rem", fontSize: "clamp(0.82rem, 0.78rem + 0.2vw, 0.92rem)" }}>
              {brand.primaryCta} <Arrow />
            </a>
            <a href={brand.secondaryCtaHref} className="inline-flex items-center gap-2 font-medium transition-all" style={{ fontFamily: theme.fonts.body, padding: "16px 32px", color: alpha(c.cream, 0.7), border: "1px solid rgba(255,255,255,0.2)", borderRadius: "10rem", fontSize: "clamp(0.82rem, 0.78rem + 0.2vw, 0.92rem)" }}>
              {brand.secondaryCta}
            </a>
          </div>
        </div>
      </section>

      {/* ============================================
          WHO WE SEE — Audience split
          ============================================ */}
      <section style={{ background: c.sand, padding: "96px 0" }}>
        <div style={{ maxWidth: "min(1320px, 92vw)", marginInline: "auto" }}>
          <div className="arrival-rv max-w-3xl">
            <p className="arrival-eyebrow" style={{ color: c.accent }}>Who we see</p>
            <h2 className="mt-4" style={{ fontFamily: theme.fonts.heading, fontSize: "clamp(2rem, 1.4rem + 2vw, 3.4rem)", lineHeight: 1.08, color: c.ink }}>
              Wherever you are coming from, you are in the right place.
            </h2>
            <p className="mt-5" style={{ fontFamily: theme.fonts.body, fontSize: "clamp(1rem, 0.4vw + 0.95rem, 1.25rem)", lineHeight: 1.55, color: alpha(c.ink, 0.7) }}>
              A short note, directly to you.
            </p>
          </div>

          <div className="arrival-rv mt-12 overflow-hidden rounded-[2rem]">
            <img
              src="/assets/consultation-1.png"
              alt="A consultation in a sunlit room"
              className="w-full object-cover"
              style={{ maxHeight: 400 }}
              loading="lazy"
            />
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-5 md:gap-6">
            {audiences.map((a, i) => (
              <a key={a.id} href={a.href} className="arrival-rv rounded-[2rem] p-6 md:p-8 flex flex-col group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-16px_rgba(32,30,23,0.18)]" style={{ background: "#FFFDF9", border: `1px solid ${alpha(c.ink, 0.06)}`, animationDelay: `${i * 80}ms` }}>
                <p className="arrival-eyebrow" style={{ color: c.accent }}>{a.kicker}</p>
                <h3 className="mt-3" style={{ fontFamily: theme.fonts.heading, fontSize: "clamp(1.375rem, 0.8vw + 1rem, 1.75rem)", lineHeight: 1.18, color: c.ink }}>{a.title}</h3>
                <p className="mt-4 flex-1" style={{ fontFamily: theme.fonts.body, fontSize: "1rem", lineHeight: 1.6, color: alpha(c.ink, 0.72) }}>{a.body}</p>
                <div className="mt-8">
                  <span className="inline-flex items-center gap-2 font-semibold text-sm transition-all group-hover:-translate-y-0.5" style={{ padding: "10px 20px", background: c.brandGreen, color: "#fff", borderRadius: "10rem" }}>{a.cta} <Arrow /></span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          LOCATIONS
          ============================================ */}
      <section id="locations" style={{ padding: "96px 0" }}>
        <div style={{ maxWidth: "min(1320px, 92vw)", marginInline: "auto" }}>
          <div className="arrival-rv max-w-3xl">
            <p className="arrival-eyebrow" style={{ color: c.accent }}>Where we see patients</p>
            <h2 className="mt-4" style={{ fontFamily: theme.fonts.heading, fontSize: "clamp(2rem, 1.4rem + 2vw, 3.4rem)", lineHeight: 1.08, color: c.ink }}>
              Come see us. Or let us come to you, on video.
            </h2>
            <p className="mt-5" style={{ fontFamily: theme.fonts.body, fontSize: "clamp(1rem, 0.4vw + 0.95rem, 1.25rem)", lineHeight: 1.55, color: alpha(c.ink, 0.7) }}>
              Clinics in Massachusetts and California, plus video visits anywhere in those two states.
            </p>
          </div>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {locations.map((l, i) => {
              const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${l.bbox}&layer=mapnik&marker=${l.marker}`;
              const isTelehealth = l.kind === "telehealth";
              return (
                <a key={l.city + l.state} href={l.href} className="arrival-rv group relative overflow-hidden rounded-[2rem] flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_-12px_rgba(0,0,0,0.4)]" style={{ background: c.primary, animationDelay: `${i * 80}ms` }}>
                  <div className="relative overflow-hidden h-40" style={{ background: c.primaryLight }}>
                    <iframe src={mapSrc} className="absolute left-0 right-0 top-0 w-full border-0 pointer-events-none transition-transform duration-500 group-hover:scale-[1.05]" style={{ height: "calc(100% + 60px)" }} loading="lazy" title={`Map of ${l.city}, ${l.state}`} aria-hidden="true" />
                    {isTelehealth && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="rounded-full px-4 py-2 text-xs font-semibold backdrop-blur" style={{ background: alpha(c.brandGreen, 0.9), color: "#fff" }}>Video visits statewide</span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 flex items-center gap-2 rounded-full backdrop-blur px-3 py-1.5 text-[11px] font-semibold" style={{ background: c.brandGreen, color: "#fff" }}>
                      <span className="h-2 w-2 rounded-full" style={{ background: "#22c55e" }} />{isTelehealth ? "Video" : "Open"}
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="!text-[1.65rem] leading-[1.05]" style={{ color: c.cream, fontFamily: theme.fonts.heading, letterSpacing: "-0.02em" }}>{l.city}</h3>
                    <p className="mt-1 text-sm" style={{ color: alpha(c.cream, 0.5) }}>{l.state}</p>
                    <p className="mt-5 text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all" style={{ color: c.accent }}>{isTelehealth ? "Book a video visit" : "Visit clinic"} <Arrow /></p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          FOR PROVIDERS — Distinct section with sand surface
          ============================================ */}
      <section className="arrival-providers" style={{ background: c.sand, padding: "112px 0" }}>
        <div style={{ maxWidth: "min(1320px, 92vw)", marginInline: "auto" }}>
          {/* Editorial intro with rule */}
          <div style={{ maxWidth: "min(900px, 100%)", marginInline: "auto", textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <div style={{ height: 1, flex: 1, background: alpha(c.ink, 0.15) }} />
              <p className="arrival-eyebrow" style={{ color: c.accent, margin: 0 }}>For providers</p>
              <div style={{ height: 1, flex: 1, background: alpha(c.ink, 0.15) }} />
            </div>
            <h2 style={{ fontFamily: theme.fonts.heading, fontSize: "clamp(2rem, 1.4rem + 2vw, 3.4rem)", lineHeight: 1.08, color: c.ink }}>
              Two ways to work with Mindspan.
            </h2>
            <p className="mt-5" style={{ fontFamily: theme.fonts.body, fontSize: "clamp(1rem, 0.4vw + 0.95rem, 1.25rem)", lineHeight: 1.55, color: alpha(c.ink, 0.7), maxWidth: "58ch", marginInline: "auto" }}>
              Whether you are referring a patient you already care about or looking for a place to practice this kind of medicine yourself, we would love to hear from you.
            </p>
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="arrival-rv rounded-[2rem] p-8 md:p-10 relative overflow-hidden group" style={{ background: c.cream, border: `1px solid ${alpha(c.ink, 0.06)}` }}>
              <div className="relative">
                <p className="arrival-eyebrow" style={{ color: c.accent }}>Refer a patient</p>
                <h3 className="mt-3" style={{ fontFamily: theme.fonts.heading, fontSize: "clamp(1.375rem, 0.8vw + 1rem, 1.75rem)", lineHeight: 1.18, color: c.ink }}>Get your patient seen by a neurologist in weeks.</h3>
                <p className="mt-4" style={{ fontFamily: theme.fonts.body, fontSize: "1rem", lineHeight: 1.6, color: alpha(c.ink, 0.72) }}>
                  You are already the trusted doctor. We are the specialist partner who makes that job easier. Fast access for your patient, a thoughtful assessment, and clean notes back in your chart.
                </p>
                <ul className="mt-6 space-y-2.5 text-base" style={{ color: alpha(c.ink, 0.82) }}>
                  {["First appointment typically within two to three weeks", "Integrated with Athena and most referral workflows", "Structured notes back to your office, in the format you prefer", "APOE, biomarkers, imaging coordinated on our side", "Your patient stays yours, we handle the cognitive specialty piece"].map((item) => (
                    <li key={item} className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: c.accent }} /><span>{item}</span></li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="/providers/refer" className="inline-flex items-center gap-2 font-semibold transition-all hover:-translate-y-0.5" style={{ fontFamily: theme.fonts.body, padding: "14px 28px", background: c.brandGreen, color: "#fff", borderRadius: "10rem", fontSize: "0.9375rem" }}>Start a referral <Arrow /></a>
                  <a href="/providers" className="inline-flex items-center gap-2 font-medium transition-all" style={{ fontFamily: theme.fonts.body, padding: "14px 28px", color: c.ink, border: `1px solid ${alpha(c.ink, 0.25)}`, borderRadius: "10rem", fontSize: "0.9375rem" }}>Referral pathway</a>
                </div>
              </div>
            </div>

            <div className="arrival-rv rounded-[2rem] p-8 md:p-10 relative overflow-hidden group text-white" style={{ background: c.primary }}>
              <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(120% 100% at 100% 0%, ${alpha(c.accent, 0.18)} 0%, transparent 55%)` }} />
              <div className="relative">
                <p className="arrival-eyebrow" style={{ color: c.accent }}>Join Mindspan</p>
                <h3 className="mt-3" style={{ fontFamily: theme.fonts.heading, fontSize: "clamp(1.375rem, 0.8vw + 1rem, 1.75rem)", lineHeight: 1.18 }}>Practice the medicine you wanted to when you trained.</h3>
                <p className="mt-4 text-white/80" style={{ fontFamily: theme.fonts.body, fontSize: "1rem", lineHeight: 1.6 }}>
                  If you are a neurologist, a clinical psychologist, a nurse practitioner, or a care partner who is tired of fifteen-minute visits and broken handoffs, come talk to us.
                </p>
                <ul className="mt-6 space-y-2.5 text-[15px] text-white/85">
                  {["Unhurried visits, structured around the patient, not the clock", "Real tools that make your clinical work safer and more precise", "A care orchestration engine that handles protocol compliance for you", "A team culture that respects craft and rewards seniority", "Competitive compensation, meaningful equity, and real work-life balance"].map((item) => (
                    <li key={item} className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: c.accent }} /><span>{item}</span></li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="/careers" className="inline-flex items-center gap-2 font-semibold transition-all hover:-translate-y-0.5" style={{ fontFamily: theme.fonts.body, padding: "14px 28px", background: c.accent, color: "#fff", borderRadius: "10rem", fontSize: "0.9375rem" }}>See open roles <Arrow /></a>
                  <a href="mailto:clinicians@mindspan.co" className="inline-flex items-center gap-2 font-medium transition-all" style={{ fontFamily: theme.fonts.body, padding: "14px 28px", color: "#fff", border: "1px solid rgba(255,255,255,0.35)", borderRadius: "10rem", fontSize: "0.9375rem" }}>Talk to our team</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          FINAL CTA
          ============================================ */}
      <section className="relative overflow-hidden text-white" style={{ background: c.primary, padding: "96px 0" }}>
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute -top-40 -right-40 w-[640px] h-[640px] rounded-full blur-3xl final-glow--warm" style={{ background: `radial-gradient(circle, ${alpha(c.accent, 0.22)} 0%, transparent 62%)` }} />
          <div className="absolute -bottom-40 -left-40 w-[560px] h-[560px] rounded-full blur-3xl final-glow--cool" style={{ background: `radial-gradient(circle, ${alpha(c.sky, 0.18)} 0%, transparent 62%)` }} />
        </div>
        <div className="arrival-rv relative" style={{ maxWidth: "min(760px, 92vw)", marginInline: "auto", textAlign: "center" }}>
          <p className="arrival-eyebrow" style={{ color: c.accent }}>When you are ready</p>
          <h2 className="mt-6" style={{ fontFamily: theme.fonts.heading, fontSize: "clamp(2rem, 1.4rem + 2vw, 3.4rem)", lineHeight: 1.08 }}>The first step is a conversation. That is all.</h2>
          <p className="mt-6 mx-auto text-white/80" style={{ fontFamily: theme.fonts.body, fontSize: "clamp(1rem, 0.4vw + 0.95rem, 1.25rem)", lineHeight: 1.55, maxWidth: "62ch" }}>
            No commitment. No pressure. Tell us what is going on, and we will help you figure out what comes next, even if it turns out that next isn&apos;t with us.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href={brand.primaryCtaHref} className="inline-flex items-center gap-2 font-semibold transition-all hover:-translate-y-0.5" style={{ fontFamily: theme.fonts.body, padding: "16px 32px", background: c.brandGreen, color: "#fff", borderRadius: "10rem", fontSize: "clamp(0.82rem, 0.78rem + 0.2vw, 0.92rem)" }}>{brand.primaryCta} <Arrow /></a>
            <a href={brand.secondaryCtaHref} className="inline-flex items-center gap-2 font-medium transition-all" style={{ fontFamily: theme.fonts.body, padding: "16px 32px", color: "#fff", border: "1px solid rgba(255,255,255,0.35)", borderRadius: "10rem", fontSize: "clamp(0.82rem, 0.78rem + 0.2vw, 0.92rem)" }}>{brand.secondaryCta}</a>
          </div>
          <p className="mt-10 text-[15px]" style={{ color: "rgba(255,255,255,0.52)", fontFamily: theme.fonts.accent, fontStyle: "italic", letterSpacing: "0.01em" }}>With care, the Mindspan team</p>
        </div>
      </section>

      {/* ============================================
          FOOTER
          ============================================ */}
      <footer className="text-white/75" style={{ background: c.primary, padding: "80px 0 48px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: "min(1320px, 92vw)", marginInline: "auto" }}>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/logo-white.png" alt="Mindspan" className="h-10 w-auto" />
              <p className="mt-6 text-sm max-w-sm leading-relaxed">
                Specialist neurologists for Alzheimer&apos;s, dementia, and cognitive change. Clinics in Massachusetts and California, plus video visits. We bill insurance.
              </p>
            </div>
            {[
              { title: "Getting started", links: [["Book a visit", "/book-a-visit"], ["Find a clinic", "#locations"], ["What to expect", "#expect"]] },
              { title: "For families", links: [["If you are caring for someone", "#families"], ["How it works", "#visit"]] },
              { title: "For doctors", links: [["Refer a patient", "#doctors"], ["About Mindspan", "/about"], ["Contact", "/contact"]] },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-white font-semibold mb-4 text-sm">{col.title}</p>
                <ul className="space-y-2 text-sm">
                  {col.links.map(([label, href]) => (
                    <li key={label}><a href={href} className="hover:text-white transition-colors">{label}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-16 pt-8 flex flex-wrap gap-4 justify-between text-xs" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <p>&copy; 2026 Mindspan</p>
            <div className="flex gap-6">
              <a href="/legal/terms" className="hover:text-white">Terms</a>
              <a href="/legal/privacy" className="hover:text-white">Privacy</a>
              <a href="/legal/consent" className="hover:text-white">Informed consent</a>
            </div>
          </div>
        </div>
      </footer>

      <StyleSwitcher />
    </div>
  );
}
