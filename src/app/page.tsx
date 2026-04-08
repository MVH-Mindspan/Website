"use client";

import { motion, type Variants } from "framer-motion";
import {
  brand,
  nav,
  expectations,
  howItWorks,
  locations,
  audiences,
} from "@/lib/content";

const GREEN = "#083630";
const ORANGE = "#fb4d17";
const CREAM = "#efeeeb";
const SAND = "#dad6c9";
const SKY = "#bdd8f5";
const SKY_SOFT = "#d9e6f3";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const VIEWPORT = { once: true, margin: "-80px" } as const;

const Arrow = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);


function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "dark",
  className = "",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  const alignCls = align === "center" ? "mx-auto text-center" : "";
  const color = tone === "light" ? "#fff" : GREEN;
  const leadColor = tone === "light" ? "rgba(255,255,255,0.72)" : "rgba(8,54,48,0.7)";
  return (
    <motion.div
      className={`max-w-3xl ${alignCls} ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={staggerContainer}
    >
      <motion.p className="studio-eyebrow" style={{ color: ORANGE }} variants={fadeUp}>
        {eyebrow}
      </motion.p>
      <motion.h2 className="studio-h2 mt-4" style={{ color }} variants={fadeUp}>
        {title}
      </motion.h2>
      {lead && (
        <motion.p className="studio-lead mt-5" style={{ color: leadColor }} variants={fadeUp}>
          {lead}
        </motion.p>
      )}
    </motion.div>
  );
}

export default function Home() {
  return (
    <div style={{ background: CREAM, color: GREEN }}>
      {/* NAV */}
      <header
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{ background: "rgba(239,238,235,0.82)" }}
      >
        <div className="studio-container flex items-center justify-between py-4 md:py-5">
          <a href="/" className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/logo-green.png" alt="Mindspan" className="h-7 md:h-8 w-auto" />
          </a>
          <nav
            className="hidden lg:flex items-center gap-9 text-sm"
            style={{ color: GREEN }}
          >
            {nav.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="font-medium transition-opacity hover:opacity-60"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href={brand.primaryCtaHref}
            target="_blank"
            rel="noopener"
            className="studio-btn studio-btn-accent !py-2.5 !px-5 !text-sm"
          >
            {brand.primaryCta}
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="pt-12 md:pt-20 pb-20 md:pb-28">
        <div className="studio-container grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <p
              className="studio-eyebrow studio-fade studio-fade-1"
              style={{ color: ORANGE }}
            >
              {brand.subTagline}
            </p>
            <h1
              className="studio-display mt-5 studio-fade studio-fade-2"
              style={{ color: GREEN }}
            >
              {brand.headline}
            </h1>
            <p
              className="studio-lead mt-6 studio-fade studio-fade-3 max-w-xl"
              style={{ color: "rgba(8,54,48,0.78)" }}
            >
              {brand.subhead}
            </p>
            <div className="mt-8 flex flex-wrap gap-3 studio-fade studio-fade-4">
              <a
                href={brand.primaryCtaHref}
                target="_blank"
                rel="noopener"
                className="studio-btn studio-btn-accent"
              >
                {brand.primaryCta}
                <Arrow />
              </a>
              <a
                href={brand.secondaryCtaHref}
                className="studio-btn studio-btn-ghost"
              >
                {brand.secondaryCta}
              </a>
            </div>
            <div
              className="mt-7 flex items-center gap-3 text-sm studio-fade studio-fade-4"
              style={{ color: "rgba(8,54,48,0.7)" }}
            >
              <span
                className="h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: SKY, color: GREEN }}
                aria-hidden
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </span>
              <span>
                Not ready for a visit?{" "}
                <a
                  href="https://assessment.mindspan.co/"
                  target="_blank"
                  rel="noopener"
                  className="font-semibold underline underline-offset-4 decoration-1 hover:decoration-2 transition-all"
                  style={{ color: GREEN }}
                >
                  Take a free online assessment
                </a>{" "}
                in 10 minutes.
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 studio-fade studio-fade-3">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div
                className="absolute -inset-4 rounded-[2.5rem] -z-10"
                style={{
                  background: `radial-gradient(120% 80% at 50% 20%, ${SKY} 0%, transparent 70%)`,
                }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/hero.png"
                alt="A Mindspan neurologist meeting with a patient and family member"
                className="w-full aspect-[4/5] object-cover rounded-[2rem] shadow-[0_30px_60px_-30px_rgba(8,54,48,0.45)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* REASSURANCE BAR */}
      <section className="py-10 md:py-12" style={{ background: GREEN }}>
        <motion.div
          className="studio-container grid sm:grid-cols-3 gap-8 text-white"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {[
            {
              k: "Seen in weeks, not months",
              v: "Talk to our team this week. Meet a neurologist soon after.",
            },
            {
              k: "In-clinic or on video",
              v: "Four clinics across MA and CA, plus video visits anywhere in those states.",
            },
            {
              k: "Covered by insurance",
              v: "We bill insurance, just like your primary care doctor.",
            },
          ].map((item) => (
            <motion.div key={item.k} className="flex items-start gap-4" variants={fadeUp}>
              <span
                className="mt-1.5 h-2 w-2 rounded-full flex-shrink-0"
                style={{ background: ORANGE }}
              />
              <div>
                <p className="font-semibold text-[15px] text-white">{item.k}</p>
                <p className="text-[14px] text-white/70 mt-1 leading-[1.5]">{item.v}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* EMPATHY LETTER */}
      <section className="studio-section" style={{ background: SAND }}>
        <motion.div
          className="studio-container max-w-3xl text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <motion.p className="studio-eyebrow" style={{ color: ORANGE }} variants={fadeUp}>
            A note from our team
          </motion.p>
          <motion.h2 className="studio-h2 mt-5" style={{ color: GREEN }} variants={fadeUp}>
            You are not overreacting. You are in the right place.
          </motion.h2>
          <motion.p
            className="studio-lead mt-6 mx-auto"
            style={{ color: "rgba(8,54,48,0.8)" }}
            variants={fadeUp}
          >
            If you have noticed changes in memory, attention, or mood, whether for yourself or
            someone you love, it is worth taking seriously. Early matters. Clarity matters. We are
            here when you are ready to talk.
          </motion.p>
          <motion.div className="mt-9 flex justify-center" variants={fadeUp}>
            <a
              href={brand.primaryCtaHref}
              target="_blank"
              rel="noopener"
              className="studio-btn studio-btn-primary"
            >
              {brand.primaryCta}
              <Arrow />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* FREE ONLINE ASSESSMENT — low-friction first step */}
      <section className="studio-section" style={{ background: "#fff" }}>
        <div className="studio-container">
          <SectionHeader
            eyebrow="A no-pressure first step"
            title="Not ready to book? Start with a free online assessment."
            lead="Ten minutes. No cost. No clinic visit required. Answer a few honest questions about memory, thinking, and daily life, and we'll give you clear feedback right away. If our team thinks a visit with a neurologist would help, we'll connect you with one of our clinics. If not, you will still walk away with something useful."
          />

          <motion.div
            className="mt-14 grid md:grid-cols-2 gap-6 md:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.article className="studio-card flex flex-col" variants={fadeUp}>
              <div
                className="h-12 w-12 rounded-2xl flex items-center justify-center"
                style={{ background: SKY, color: GREEN }}
                aria-hidden
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </div>
              <p className="studio-eyebrow mt-6" style={{ color: ORANGE }}>
                For yourself
              </p>
              <h3 className="studio-h3 mt-3" style={{ color: GREEN }}>
                Check in on your own brain health.
              </h3>
              <p className="studio-prose mt-4 flex-1" style={{ color: "rgba(8,54,48,0.72)" }}>
                Completely private. Take it at your kitchen table, on your phone, whenever you have
                ten quiet minutes. Honest feedback, plus a clear view of whether talking to one of
                our neurologists makes sense for you.
              </p>
              <div className="mt-8">
                <a
                  href="https://assessment.mindspan.co/"
                  target="_blank"
                  rel="noopener"
                  className="studio-btn studio-btn-primary"
                >
                  Take the assessment
                  <Arrow />
                </a>
              </div>
            </motion.article>

            <motion.article className="studio-card flex flex-col" variants={fadeUp}>
              <div
                className="h-12 w-12 rounded-2xl flex items-center justify-center"
                style={{ background: SKY, color: GREEN }}
                aria-hidden
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
                  <circle cx="10" cy="8" r="4" />
                  <path d="M21 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M17 4a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <p className="studio-eyebrow mt-6" style={{ color: ORANGE }}>
                For someone you love
              </p>
              <h3 className="studio-h3 mt-3" style={{ color: GREEN }}>
                Do it together, in person or over video.
              </h3>
              <p className="studio-prose mt-4 flex-1" style={{ color: "rgba(8,54,48,0.72)" }}>
                Our assessment is built to be done with a helper. Sit next to them at the kitchen
                table, or screen-share over a video call from across the country. You guide the
                conversation. They stay comfortable. And at the end, you both know what a good
                next step looks like.
              </p>
              <div className="mt-8">
                <a
                  href="https://assessment.mindspan.co/"
                  target="_blank"
                  rel="noopener"
                  className="studio-btn studio-btn-primary"
                >
                  Start one together
                  <Arrow />
                </a>
              </div>
            </motion.article>
          </motion.div>

          <p
            className="mt-10 text-center text-sm"
            style={{ color: "rgba(8,54,48,0.6)" }}
          >
            The easiest, worry-free way to get started with Mindspan. No credit card. No account
            required. Nothing scheduled unless you want it to be.
          </p>
        </div>
      </section>

      {/* WHAT TO EXPECT */}
      <section id="expect" className="studio-section">
        <div className="studio-container">
          <SectionHeader
            eyebrow="What to expect"
            title="The questions families ask us first, answered honestly."
          />

          <motion.div
            className="mt-14 grid md:grid-cols-2 gap-6 md:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {expectations.map((e, i) => {
              const icons = [
                // How soon - clock
                <svg key="clock" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>,
                // Who - users
                <svg key="users" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
                  <circle cx="10" cy="8" r="4" />
                  <path d="M21 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M17 4a4 4 0 0 1 0 7.75" />
                </svg>,
                // What we do - clipboard
                <svg key="clipboard" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
                  <rect x="5" y="4" width="14" height="17" rx="2" />
                  <path d="M9 2h6v4H9z" />
                  <path d="M9 12h6M9 16h4" />
                </svg>,
                // Next steps - compass / arrow
                <svg key="compass" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
                  <circle cx="12" cy="12" r="9" />
                  <path d="m15 9-3.5 6.5L8 12l7-3Z" />
                </svg>,
              ];
              return (
                <motion.article key={e.title} className="studio-card" variants={fadeUp}>
                  <div
                    className="h-12 w-12 rounded-2xl flex items-center justify-center"
                    style={{ background: SKY, color: GREEN }}
                    aria-hidden
                  >
                    {icons[i]}
                  </div>
                  <p className="studio-eyebrow mt-6" style={{ color: ORANGE }}>
                    {e.kicker}
                  </p>
                  <h3 className="studio-h3 mt-3" style={{ color: GREEN }}>
                    {e.title}
                  </h3>
                  <p className="studio-prose mt-3" style={{ color: "rgba(8,54,48,0.72)" }}>
                    {e.body}
                  </p>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="visit" className="studio-section" style={{ background: "#fff" }}>
        <div className="studio-container">
          <SectionHeader
            eyebrow="How it works"
            title="From first call to a plan that fits your life."
            lead="Here is exactly what happens when you reach out. Step by step, no surprises."
          />

          <motion.ol
            className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {howItWorks.map((s, i) => (
              <motion.li key={s.title} className="relative" variants={fadeUp}>
                <div className="flex items-center gap-4">
                  <span
                    className="flex items-center justify-center h-10 w-10 rounded-full text-sm font-semibold flex-shrink-0"
                    style={{
                      background: SKY,
                      color: GREEN,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="flex-1 h-px"
                    style={{ background: "rgba(8,54,48,0.15)" }}
                  />
                </div>
                <h3 className="studio-h3 mt-5" style={{ color: GREEN }}>
                  {s.title}
                </h3>
                <p className="studio-prose mt-3" style={{ color: "rgba(8,54,48,0.72)" }}>
                  {s.body}
                </p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* WHY CARE AT MINDSPAN IS DIFFERENT — Core + Edge protocols, plus the tech stack */}
      <section id="how-we-think" className="studio-section">
        <div className="studio-container">
          <SectionHeader
            eyebrow="Why care at Mindspan is different"
            title="Standard of care, made better by precision medicine."
            lead="Every Mindspan patient gets the full standard of neurological care. And every patient gets access to breakthroughs that were sitting in research papers a year ago, translated into their plan, explained in their language, covered by their insurance."
          />

          {/* Protocol comparison */}
          <motion.div
            className="mt-14 grid lg:grid-cols-2 gap-6 md:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.article
              className="rounded-[1.5rem] p-8 md:p-10"
              style={{
                background: SKY_SOFT,
                border: "1px solid rgba(8,54,48,0.08)",
              }}
              variants={fadeUp}
            >
              <p className="studio-eyebrow" style={{ color: "rgba(8,54,48,0.6)" }}>
                The Core Protocol
              </p>
              <h3 className="studio-h3 mt-3" style={{ color: GREEN }}>
                The full standard of care, delivered without compromise.
              </h3>
              <p className="studio-prose mt-4" style={{ color: "rgba(8,54,48,0.72)" }}>
                Everything a great neurology clinic should offer. No waiting. No rushed visits.
                Every patient is treated like the complex person they are.
              </p>
              <ul className="mt-6 space-y-2.5 text-[15px]" style={{ color: "rgba(8,54,48,0.82)" }}>
                {[
                  "Unhurried time with a board-certified neurologist",
                  "Comprehensive cognitive testing and functional assessment",
                  "MRI, PET imaging, and full dementia lab panel when indicated",
                  "FDA-approved anti-amyloid therapies (Leqembi, Kisunla) for eligible patients",
                  "Caregiver included. Your primary care doctor kept in the loop.",
                  "Billed through insurance, just like any other specialist visit",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-2 h-1.5 w-1.5 rounded-full flex-shrink-0"
                      style={{ background: "rgba(8,54,48,0.5)" }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.article>

            <motion.article
              className="rounded-[1.5rem] p-8 md:p-10 relative overflow-hidden"
              style={{
                background: GREEN,
                color: "#fff",
              }}
              variants={fadeUp}
            >
              <div
                className="absolute inset-0 opacity-60 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(120% 100% at 100% 0%, rgba(251,77,23,0.18) 0%, transparent 55%)",
                }}
              />
              <div className="relative">
                <p className="studio-eyebrow" style={{ color: ORANGE }}>
                  The Edge Protocol
                </p>
                <h3
                  className="studio-h3 mt-3"
                  style={{ color: "#fff", fontFamily: "var(--font-pt-serif), Georgia, serif" }}
                >
                  Precision medicine, layered on top.
                </h3>
                <p className="studio-prose mt-4 text-white/80">
                  The breakthroughs that move the needle, delivered to you as part of normal care.
                  Not clinical trial, not concierge, just better medicine.
                </p>
                <ul className="mt-6 space-y-2.5 text-[15px] text-white/85">
                  {[
                    "Blood biomarker panel that can confirm amyloid status without needing a PET scan",
                    "Genetic testing (APOE) for personalized risk and safer treatment decisions",
                    "2024 biological disease staging framework (A/T/N)",
                    "Your own Cognitive Digital Twin, built and updated visit by visit",
                    "Structured plan across 9 lifestyle factors with actual targets, not generic advice",
                    "Both anti-amyloid therapies, with genotype-informed safety planning",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="mt-2 h-1.5 w-1.5 rounded-full flex-shrink-0"
                        style={{ background: ORANGE }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          </motion.div>

          {/* Technology sub-section */}
          <div
            className="mt-20 pt-16 border-t"
            style={{ borderColor: "rgba(8,54,48,0.1)" }}
          >
            <div className="max-w-3xl">
              <p className="studio-eyebrow" style={{ color: ORANGE }}>
                The technology behind your care
              </p>
              <h3 className="studio-h2 mt-4" style={{ color: GREEN }}>
                Three quiet systems that make all of this possible.
              </h3>
              <p className="studio-lead mt-5" style={{ color: "rgba(8,54,48,0.7)" }}>
                You will never have to learn how any of this works. Your neurologist uses it so
                your experience with us feels unhurried, personal, and safe.
              </p>
            </div>

            <motion.div
              className="mt-12 grid md:grid-cols-3 gap-5 md:gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
            >
              <motion.article className="studio-card" variants={fadeUp}>
                <div
                  className="h-12 w-12 rounded-2xl flex items-center justify-center"
                  style={{ background: SKY, color: GREEN }}
                  aria-hidden
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6">
                    <path d="M12 3a4.5 4.5 0 0 0-4.5 4.5v.3A3.5 3.5 0 0 0 5 11.1a3.6 3.6 0 0 0 1.2 5.6A3.6 3.6 0 0 0 12 20a3.6 3.6 0 0 0 5.8-3.3 3.6 3.6 0 0 0 1.2-5.6 3.5 3.5 0 0 0-2.5-3.3v-.3A4.5 4.5 0 0 0 12 3Z" />
                    <path d="M12 8v8M9 11.5h6M9 14.5h6" />
                  </svg>
                </div>
                <p className="studio-eyebrow mt-6" style={{ color: ORANGE }}>
                  Cognitive Digital Twin
                </p>
                <h4 className="studio-h3 mt-3" style={{ color: GREEN }}>
                  A model of your brain, built from your own data.
                </h4>
                <p className="studio-prose mt-4" style={{ color: "rgba(8,54,48,0.72)" }}>
                  We bring together your history, labs, imaging, biomarkers, genetics, and
                  cognitive testing into a personalized model of your brain health. Your
                  neurologist uses it to show you where you are biologically, where you might be
                  heading, and which changes could actually shift that trajectory for <em>you</em>.
                </p>
              </motion.article>

              <motion.article className="studio-card" variants={fadeUp}>
                <div
                  className="h-12 w-12 rounded-2xl flex items-center justify-center"
                  style={{ background: SKY, color: GREEN }}
                  aria-hidden
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6">
                    <circle cx="12" cy="5" r="2" />
                    <circle cx="5" cy="19" r="2" />
                    <circle cx="19" cy="19" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <path d="M12 7v3M10.5 13.3 6.5 17.5M13.5 13.3l4 4.2" />
                  </svg>
                </div>
                <p className="studio-eyebrow mt-6" style={{ color: ORANGE }}>
                  Care Orchestration Engine
                </p>
                <h4 className="studio-h3 mt-3" style={{ color: GREEN }}>
                  Nothing falls through the cracks.
                </h4>
                <p className="studio-prose mt-4" style={{ color: "rgba(8,54,48,0.72)" }}>
                  Our operational brain quietly tracks every safety checkpoint, every required MRI,
                  every follow-up, every medication decision. If a scan is due before your next
                  infusion, it is already scheduled. If a symptom could signal something urgent, it
                  routes straight to your care team. Protocol without memorization. Safety without
                  gaps.
                </p>
              </motion.article>

              <motion.article className="studio-card" variants={fadeUp}>
                <div
                  className="h-12 w-12 rounded-2xl flex items-center justify-center"
                  style={{ background: SKY, color: GREEN }}
                  aria-hidden
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8Z" />
                    <path d="M9 10h.01M12 10h.01M15 10h.01" />
                  </svg>
                </div>
                <p className="studio-eyebrow mt-6" style={{ color: ORANGE }}>
                  Mindy, your care companion
                </p>
                <h4 className="studio-h3 mt-3" style={{ color: GREEN }}>
                  A familiar voice between visits.
                </h4>
                <p className="studio-prose mt-4" style={{ color: "rgba(8,54,48,0.72)" }}>
                  Mindy is our AI care companion for the weeks and months between appointments.
                  She helps track symptoms, supports adherence, answers common questions, and pages
                  your clinical team when something needs real attention. A friendly, always-on
                  helper that never forgets you.
                </p>
              </motion.article>
            </motion.div>

            <div className="mt-12 flex flex-wrap gap-3">
              <a
                href={brand.primaryCtaHref}
                target="_blank"
                rel="noopener"
                className="studio-btn studio-btn-accent"
              >
                {brand.primaryCta}
                <Arrow />
              </a>
              <a href={brand.secondaryCtaHref} className="studio-btn studio-btn-ghost">
                {brand.secondaryCta}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE SEE — audience split */}
      <section id="families" className="studio-section" style={{ background: SAND }}>
        <div className="studio-container">
          <SectionHeader
            eyebrow="Who we see"
            title="Wherever you are coming from, you are in the right place."
            lead="A short note, directly to you."
          />

          <motion.div
            className="mt-14 grid md:grid-cols-3 gap-5 md:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {audiences.map((a) => (
              <motion.a
                key={a.id}
                id={a.id === "doctors" ? "doctors" : undefined}
                href={a.href}
                className="studio-card flex flex-col group"
                variants={fadeUp}
              >
                <p className="studio-eyebrow" style={{ color: ORANGE }}>
                  {a.kicker}
                </p>
                <h3 className="studio-h3 mt-3" style={{ color: GREEN }}>
                  {a.title}
                </h3>
                <p
                  className="studio-prose mt-4 flex-1"
                  style={{ color: "rgba(8,54,48,0.72)" }}
                >
                  {a.body}
                </p>
                <p
                  className="mt-8 font-semibold text-sm flex items-center gap-2 transition-all group-hover:gap-3"
                  style={{ color: ORANGE }}
                >
                  {a.cta}
                  <Arrow />
                </p>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section id="locations" className="studio-section">
        <div className="studio-container">
          <SectionHeader
            eyebrow="Where we see patients"
            title="Come see us. Or let us come to you, on video."
            lead="Clinics in Massachusetts and California, plus video visits anywhere in those two states."
          />

          <motion.div
            className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {locations.map((l) => {
              const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${l.bbox}&layer=mapnik&marker=${l.marker}`;
              const isTelehealth = l.kind === "telehealth";
              return (
                <motion.a
                  key={l.city + l.state}
                  href={l.href}
                  className="group relative overflow-hidden rounded-[1.5rem] flex flex-col transition-transform hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(8,54,48,0.35)]"
                  style={{
                    background: "#fff",
                    border: "1px solid rgba(8,54,48,0.1)",
                  }}
                  variants={fadeUp}
                >
                  {/* Map teaser */}
                  <div
                    className="relative overflow-hidden h-40"
                    style={{ background: CREAM }}
                  >
                    <iframe
                      src={mapSrc}
                      className="absolute left-0 right-0 top-0 w-full border-0 pointer-events-none transition-transform duration-500 group-hover:scale-[1.05]"
                      style={{ height: "calc(100% + 60px)" }}
                      loading="lazy"
                      title={`Map of ${l.city}, ${l.state}`}
                      aria-hidden="true"
                    />
                    {/* Overlay so map reads as texture, not an interactive element */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(8,54,48,0.0) 0%, rgba(8,54,48,0.08) 60%, rgba(8,54,48,0.2) 100%)",
                      }}
                    />
                    {isTelehealth && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span
                          className="rounded-full px-4 py-2 text-xs font-semibold backdrop-blur"
                          style={{
                            background: "rgba(255,255,255,0.92)",
                            color: GREEN,
                            border: "1px solid rgba(8,54,48,0.1)",
                          }}
                        >
                          Video visits statewide
                        </span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 flex items-center gap-2 rounded-full bg-white/95 backdrop-blur px-3 py-1.5 text-[11px] font-semibold shadow-sm" style={{ color: GREEN }}>
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: "#22c55e" }}
                      />
                      Open
                    </div>
                  </div>

                  {/* Text block */}
                  <div className="flex flex-col flex-1 p-6">
                    <h3
                      className="!text-[1.65rem] leading-[1.05]"
                      style={{
                        color: GREEN,
                        fontFamily: "var(--font-pt-serif), Georgia, serif",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {l.city}
                    </h3>
                    <p
                      className="mt-1 text-sm"
                      style={{ color: "rgba(8,54,48,0.6)" }}
                    >
                      {l.state}
                    </p>
                    <p
                      className="mt-5 text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all"
                      style={{ color: ORANGE }}
                    >
                      {isTelehealth ? "Book a video visit" : "Visit clinic"}
                      <Arrow />
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* FOR PROVIDERS */}
      <section id="for-providers" className="studio-section" style={{ background: "#fff" }}>
        <div className="studio-container">
          <SectionHeader
            eyebrow="For providers"
            title="Two ways to work with Mindspan."
            lead="Whether you are referring a patient you already care about or looking for a place to practice this kind of medicine yourself, we would love to hear from you."
          />

          <motion.div
            className="mt-14 grid md:grid-cols-2 gap-6 md:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.article
              className="rounded-[1.5rem] p-8 md:p-10 relative overflow-hidden group"
              style={{
                background: CREAM,
                border: "1px solid rgba(8,54,48,0.1)",
              }}
              variants={fadeUp}
            >
              <div
                className="absolute -top-12 -right-12 h-48 w-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(60% 60% at 50% 50%, rgba(251,77,23,0.18) 0%, transparent 70%)",
                }}
              />
              <div className="relative">
                <p className="studio-eyebrow" style={{ color: ORANGE }}>
                  Refer a patient
                </p>
                <h3 className="studio-h3 mt-3" style={{ color: GREEN }}>
                  Get your patient seen by a neurologist in weeks.
                </h3>
                <p className="studio-prose mt-4" style={{ color: "rgba(8,54,48,0.72)" }}>
                  You are already the trusted doctor. We are the specialist partner who makes that
                  job easier. Fast access for your patient, a thoughtful assessment, and clean
                  notes back in your chart. Nothing slips. Nothing gets handed off and forgotten.
                </p>

                <ul className="mt-6 space-y-2.5 text-[15px]" style={{ color: "rgba(8,54,48,0.82)" }}>
                  {[
                    "First appointment typically within two to three weeks",
                    "Integrated with Athena and most referral workflows",
                    "Structured notes back to your office, in the format you prefer",
                    "APOE, biomarkers, imaging coordinated on our side",
                    "Your patient stays yours, we handle the cognitive specialty piece",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="mt-2 h-1.5 w-1.5 rounded-full flex-shrink-0"
                        style={{ background: ORANGE }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="/providers/refer" className="studio-btn studio-btn-primary">
                    Start a referral
                    <Arrow />
                  </a>
                  <a href="/providers" className="studio-btn studio-btn-ghost">
                    Referral pathway
                  </a>
                </div>
              </div>
            </motion.article>

            <motion.article
              className="rounded-[1.5rem] p-8 md:p-10 relative overflow-hidden group text-white"
              style={{
                background: GREEN,
              }}
              variants={fadeUp}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(120% 100% at 100% 0%, rgba(251,77,23,0.18) 0%, transparent 55%)",
                }}
              />
              <div className="relative">
                <p className="studio-eyebrow" style={{ color: ORANGE }}>
                  Join Mindspan
                </p>
                <h3
                  className="studio-h3 mt-3"
                  style={{
                    color: "#fff",
                    fontFamily: "var(--font-pt-serif), Georgia, serif",
                  }}
                >
                  Practice the medicine you wanted to when you trained.
                </h3>
                <p className="studio-prose mt-4 text-white/80">
                  If you are a neurologist, a clinical psychologist, a nurse practitioner, or a
                  care partner who is tired of fifteen-minute visits and broken handoffs, come talk
                  to us. We built Mindspan so clinicians can give their patients the time,
                  attention, and science these families deserve.
                </p>

                <ul className="mt-6 space-y-2.5 text-[15px] text-white/85">
                  {[
                    "Unhurried visits, structured around the patient, not the clock",
                    "Real tools that make your clinical work safer and more precise",
                    "A care orchestration engine that handles protocol compliance for you",
                    "A team culture that respects craft and rewards seniority",
                    "Competitive compensation, meaningful equity, and real work-life balance",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="mt-2 h-1.5 w-1.5 rounded-full flex-shrink-0"
                        style={{ background: ORANGE }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="/careers"
                    className="studio-btn studio-btn-accent"
                  >
                    See open roles
                    <Arrow />
                  </a>
                  <a
                    href="mailto:clinicians@mindspan.co"
                    className="studio-btn"
                    style={{
                      background: "transparent",
                      color: "#fff",
                      border: "1px solid rgba(255,255,255,0.35)",
                    }}
                  >
                    Talk to our team
                  </a>
                </div>
              </div>
            </motion.article>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="studio-section text-white" style={{ background: GREEN }}>
        <motion.div
          className="studio-container max-w-3xl text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <motion.p className="studio-eyebrow" style={{ color: ORANGE }} variants={fadeUp}>
            When you are ready
          </motion.p>
          <motion.h2 className="studio-h2 mt-5" variants={fadeUp}>
            The first step is a conversation. That is all.
          </motion.h2>
          <motion.p className="studio-lead mt-6 mx-auto text-white/80" variants={fadeUp}>
            No commitment. No pressure. Tell us what is going on, and we will help you figure out
            what comes next, even if it turns out that next isn’t with us.
          </motion.p>
          <motion.div className="mt-10 flex flex-wrap justify-center gap-3" variants={fadeUp}>
            <a
              href={brand.primaryCtaHref}
              target="_blank"
              rel="noopener"
              className="studio-btn studio-btn-accent"
            >
              {brand.primaryCta}
              <Arrow />
            </a>
            <a
              href={brand.secondaryCtaHref}
              className="studio-btn"
              style={{
                background: "transparent",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.35)",
              }}
            >
              {brand.secondaryCta}
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer
        className="pt-20 pb-12 text-white/75"
        style={{ background: GREEN, borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="studio-container grid md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/logo-white.png" alt="Mindspan" className="h-10 w-auto" />
            <p className="mt-6 text-sm max-w-sm leading-relaxed">
              Specialist neurologists for Alzheimer’s, dementia, and cognitive change. Clinics in
              Massachusetts and California, plus video visits. We bill insurance.
            </p>
          </div>
          {[
            {
              title: "Getting started",
              links: [
                ["Book a visit", "https://assessment.mindspan.co/"],
                ["Find a clinic", "#locations"],
                ["What to expect", "#expect"],
              ],
            },
            {
              title: "For families",
              links: [
                ["If you are caring for someone", "#families"],
                ["How it works", "#visit"],
              ],
            },
            {
              title: "For doctors",
              links: [
                ["Refer a patient", "#doctors"],
                ["About Mindspan", "/about"],
                ["Contact", "/contact"],
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-white font-semibold mb-4 text-sm">{col.title}</p>
              <ul className="space-y-2 text-sm">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="hover:text-white transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          className="studio-container mt-16 pt-8 flex flex-wrap gap-4 justify-between text-xs"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <p>© 2026 Mindspan</p>
          <div className="flex gap-6">
            <a href="/legal/terms" className="hover:text-white">Terms</a>
            <a href="/legal/privacy" className="hover:text-white">Privacy</a>
            <a href="/legal/consent" className="hover:text-white">Informed consent</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
