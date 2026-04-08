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
    <div className={`max-w-3xl ${alignCls} ${className}`}>
      <p className="studio-eyebrow" style={{ color: ORANGE }}>
        {eyebrow}
      </p>
      <h2 className="studio-h2 mt-4" style={{ color }}>
        {title}
      </h2>
      {lead && (
        <p className="studio-lead mt-5" style={{ color: leadColor }}>
          {lead}
        </p>
      )}
    </div>
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
      <section className="pt-16 md:pt-24 pb-10 md:pb-14">
        <div className="studio-container grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
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
            <p
              className="mt-5 text-sm studio-fade studio-fade-4"
              style={{ color: "rgba(8,54,48,0.6)" }}
            >
              Not ready for a visit?{" "}
              <a
                href="https://assessment.mindspan.co/"
                target="_blank"
                rel="noopener"
                className="underline underline-offset-4 font-semibold"
                style={{ color: ORANGE }}
              >
                Take a free online assessment
              </a>{" "}
              in 10 minutes.
            </p>
          </div>

          <div className="lg:col-span-5 studio-fade studio-fade-3">
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-[2.5rem] -z-10"
                style={{
                  background: `radial-gradient(120% 80% at 50% 20%, ${SAND} 0%, transparent 70%)`,
                }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/hero.png"
                alt="A Mindspan neurologist meeting with a patient and family member"
                className="w-full rounded-[2rem] shadow-[0_30px_60px_-30px_rgba(8,54,48,0.45)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* REASSURANCE BAR */}
      <section className="py-10 md:py-12" style={{ background: GREEN }}>
        <div className="studio-container grid sm:grid-cols-3 gap-8 text-white">
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
            <div key={item.k} className="flex items-start gap-4">
              <span
                className="mt-1.5 h-2 w-2 rounded-full flex-shrink-0"
                style={{ background: ORANGE }}
              />
              <div>
                <p className="font-semibold text-[15px] text-white">{item.k}</p>
                <p className="text-[14px] text-white/70 mt-1 leading-[1.5]">{item.v}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EMPATHY LETTER */}
      <section className="studio-section" style={{ background: SAND }}>
        <div className="studio-container max-w-3xl text-center">
          <p className="studio-eyebrow" style={{ color: ORANGE }}>
            A note from our team
          </p>
          <h2 className="studio-h2 mt-5" style={{ color: GREEN }}>
            You are not overreacting. You are in the right place.
          </h2>
          <p
            className="studio-lead mt-6 mx-auto"
            style={{ color: "rgba(8,54,48,0.8)" }}
          >
            If you have noticed changes in memory, attention, or mood, whether for yourself or
            someone you love, it is worth taking seriously. Early matters. Clarity matters. We are
            here when you are ready to talk.
          </p>
          <div className="mt-9 flex justify-center">
            <a
              href={brand.primaryCtaHref}
              target="_blank"
              rel="noopener"
              className="studio-btn studio-btn-primary"
            >
              {brand.primaryCta}
              <Arrow />
            </a>
          </div>
        </div>
      </section>

      {/* FREE ONLINE ASSESSMENT — low-friction first step */}
      <section className="studio-section" style={{ background: "#fff" }}>
        <div className="studio-container">
          <SectionHeader
            eyebrow="A no-pressure first step"
            title="Not ready to book? Start with a free online assessment."
            lead="Ten minutes. No cost. No clinic visit required. Answer a few honest questions about memory, thinking, and daily life, and we'll give you clear feedback right away. If our team thinks a visit with a neurologist would help, we'll connect you with one of our clinics. If not, you will still walk away with something useful."
          />

          <div className="mt-14 grid md:grid-cols-2 gap-6 md:gap-8">
            <article className="studio-card flex flex-col">
              <p className="studio-eyebrow" style={{ color: ORANGE }}>
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
            </article>

            <article className="studio-card flex flex-col">
              <p className="studio-eyebrow" style={{ color: ORANGE }}>
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
            </article>
          </div>

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

          <div className="mt-14 grid md:grid-cols-2 gap-6 md:gap-8">
            {expectations.map((e) => (
              <article key={e.title} className="studio-card">
                <p className="studio-eyebrow" style={{ color: ORANGE }}>
                  {e.kicker}
                </p>
                <h3 className="studio-h3 mt-3" style={{ color: GREEN }}>
                  {e.title}
                </h3>
                <p className="studio-prose mt-3" style={{ color: "rgba(8,54,48,0.72)" }}>
                  {e.body}
                </p>
              </article>
            ))}
          </div>
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

          <ol className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {howItWorks.map((s, i) => (
              <li key={s.title} className="relative">
                <div className="flex items-center gap-4">
                  <span
                    className="flex items-center justify-center h-10 w-10 rounded-full text-sm font-semibold flex-shrink-0"
                    style={{
                      background: CREAM,
                      color: ORANGE,
                      border: `1px solid rgba(251,77,23,0.3)`,
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
              </li>
            ))}
          </ol>
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
          <div className="mt-14 grid lg:grid-cols-2 gap-6 md:gap-8">
            <article
              className="rounded-[1.5rem] p-8 md:p-10"
              style={{
                background: "#fff",
                border: "1px solid rgba(8,54,48,0.1)",
              }}
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
            </article>

            <article
              className="rounded-[1.5rem] p-8 md:p-10 relative overflow-hidden"
              style={{
                background: GREEN,
                color: "#fff",
              }}
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
            </article>
          </div>

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

            <div className="mt-12 grid md:grid-cols-3 gap-5 md:gap-6">
              <article className="studio-card">
                <p className="studio-eyebrow" style={{ color: ORANGE }}>
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
              </article>

              <article className="studio-card">
                <p className="studio-eyebrow" style={{ color: ORANGE }}>
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
              </article>

              <article className="studio-card">
                <p className="studio-eyebrow" style={{ color: ORANGE }}>
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
              </article>
            </div>

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

          <div className="mt-14 grid md:grid-cols-3 gap-5 md:gap-6">
            {audiences.map((a) => (
              <a
                key={a.id}
                id={a.id === "doctors" ? "doctors" : undefined}
                href={a.href}
                className="studio-card flex flex-col"
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
                  className="mt-8 font-semibold text-sm flex items-center gap-2"
                  style={{ color: ORANGE }}
                >
                  {a.cta}
                  <Arrow />
                </p>
              </a>
            ))}
          </div>
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

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {locations.map((l) => (
              <a
                key={l.city + l.state}
                href={l.href}
                className="group relative overflow-hidden rounded-[1.5rem] p-7 min-h-[15rem] flex flex-col justify-between text-white transition-transform hover:-translate-y-1"
                style={{ background: GREEN }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background:
                      "radial-gradient(120% 100% at 0% 0%, rgba(251,77,23,0.25) 0%, transparent 60%)",
                  }}
                />
                <div className="relative">
                  <span className="inline-flex items-center gap-2 text-xs font-medium">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: "#22c55e" }}
                    />
                    Appointments open
                  </span>
                </div>
                <div className="relative">
                  <h3
                    className="!text-[1.75rem] leading-[1.1]"
                    style={{
                      color: "#fff",
                      fontFamily: "var(--font-pt-serif), Georgia, serif",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {l.city}
                  </h3>
                  <p className="mt-1 text-white/70 text-sm">{l.state}</p>
                  <p className="mt-5 text-sm text-white/80 group-hover:text-white flex items-center gap-2">
                    Visit clinic
                    <Arrow />
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="studio-section text-white" style={{ background: GREEN }}>
        <div className="studio-container max-w-3xl text-center">
          <p className="studio-eyebrow" style={{ color: ORANGE }}>
            When you are ready
          </p>
          <h2 className="studio-h2 mt-5">
            The first step is a conversation. That is all.
          </h2>
          <p className="studio-lead mt-6 mx-auto text-white/80">
            No commitment. No pressure. Tell us what is going on, and we will help you figure out
            what comes next, even if it turns out that next isn’t with us.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
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
          </div>
        </div>
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
