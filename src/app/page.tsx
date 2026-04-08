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

      {/* WHY CARE AT MINDSPAN IS DIFFERENT — names the tech */}
      <section id="how-we-think" className="studio-section">
        <div className="studio-container">
          <SectionHeader
            eyebrow="Why care at Mindspan is different"
            title="Neurologists who take the time, with the tools to back it up."
            lead="A lot of the technology in healthcare is invisible to patients. At Mindspan, we want you to see what is under the hood, because it is part of what makes your care feel different."
          />

          <div className="mt-14 grid md:grid-cols-2 gap-6 md:gap-8">
            <article className="studio-card">
              <p className="studio-eyebrow" style={{ color: ORANGE }}>
                A care team that stays with you
              </p>
              <h3 className="studio-h3 mt-3" style={{ color: GREEN }}>
                One team for the whole family.
              </h3>
              <p className="studio-prose mt-4" style={{ color: "rgba(8,54,48,0.72)" }}>
                You have a neurologist and a care partner who know your name, your history, and
                what matters most to you. They talk to each other. They talk to your primary care
                doctor. And they talk to your family, because cognitive care affects everyone in
                the house, not just the patient.
              </p>
            </article>

            <article className="studio-card">
              <p className="studio-eyebrow" style={{ color: ORANGE }}>
                Your Cognitive Digital Twin
              </p>
              <h3 className="studio-h3 mt-3" style={{ color: GREEN }}>
                A personalized model of your brain.
              </h3>
              <p className="studio-prose mt-4" style={{ color: "rgba(8,54,48,0.72)" }}>
                Behind the scenes, our team builds something we call your Cognitive Digital Twin, a
                personalized picture of your brain health, put together from your medical history,
                labs, imaging, and cognitive assessments. It helps your neurologist see what is
                most likely going on and what is most likely to help <em>you</em>, drawing on
                research from tens of thousands of other patient journeys.
              </p>
            </article>

            <article className="studio-card">
              <p className="studio-eyebrow" style={{ color: ORANGE }}>
                Our Care Orchestration Engine
              </p>
              <h3 className="studio-h3 mt-3" style={{ color: GREEN }}>
                The latest science, matched to you.
              </h3>
              <p className="studio-prose mt-4" style={{ color: "rgba(8,54,48,0.72)" }}>
                Cognitive medicine is moving fast. Our Care Orchestration Engine quietly tracks
                emerging research and pairs it with your twin, so your neurologist can see which of
                today’s options are actually worth considering for your situation. The benefit of
                tomorrow’s neurology, explained in plain language today.
              </p>
            </article>

            <article className="studio-card">
              <p className="studio-eyebrow" style={{ color: ORANGE }}>
                In clinic or on video
              </p>
              <h3 className="studio-h3 mt-3" style={{ color: GREEN }}>
                Full visits, however you want to be seen.
              </h3>
              <p className="studio-prose mt-4" style={{ color: "rgba(8,54,48,0.72)" }}>
                Whether you sit across from a neurologist in one of our clinics or join from your
                living room with a family member on the couch beside you, you get the same
                attention and the same time. Video visits are full visits. And we bill insurance
                either way.
              </p>
            </article>
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
