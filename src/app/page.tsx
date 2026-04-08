import {
  brand,
  nav,
  pillars,
  howItWorks,
  locations,
  audiences,
  digitalTwinBullets,
} from "@/lib/content";

const GREEN = "#083630";
const ORANGE = "#fb4d17";
const CREAM = "#efeeeb";
const SAND = "#dad6c9";

const Arrow = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

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
          <nav className="hidden lg:flex items-center gap-9 text-sm" style={{ color: GREEN }}>
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
      <section className="studio-section pt-14 md:pt-20">
        <div className="studio-container grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <p className="studio-eyebrow studio-fade studio-fade-1" style={{ color: ORANGE }}>
              {brand.subTagline}
            </p>
            <h1 className="studio-display mt-4 studio-fade studio-fade-2" style={{ color: GREEN }}>
              {brand.headline}
              <br />
              <span style={{ color: ORANGE, fontStyle: "italic" }}>Personal. Accessible. Today.</span>
            </h1>
            <p
              className="studio-lead mt-6 studio-fade studio-fade-3"
              style={{ color: "rgba(8,54,48,0.78)" }}
            >
              Mindspan is a clinical-grade cognitive care company built by neurologists. We see
              patients in our clinics and virtually anywhere. We build a personalized model of your
              brain health \u2014 your Cognitive Digital Twin \u2014 and use it to match you to the
              interventions most likely to help.
            </p>
            <div className="mt-9 flex flex-wrap gap-3 studio-fade studio-fade-4">
              <a
                href={brand.primaryCtaHref}
                target="_blank"
                rel="noopener"
                className="studio-btn studio-btn-accent"
              >
                {brand.primaryCta}
                <Arrow />
              </a>
              <a href="#digital-twin" className="studio-btn studio-btn-ghost">
                See how the Digital Twin works
              </a>
            </div>
            <p className="mt-6 text-sm studio-fade studio-fade-4" style={{ color: "rgba(8,54,48,0.6)" }}>
              {brand.reassurance}
            </p>
          </div>

          <div className="lg:col-span-5 relative studio-fade studio-fade-3">
            <div
              className="absolute -inset-6 rounded-[2.5rem] -z-10"
              style={{
                background: `radial-gradient(120% 80% at 50% 20%, ${SAND} 0%, transparent 70%)`,
              }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/hero.png"
              alt="Mindspan neurology care team with patient"
              className="w-full rounded-[2rem] shadow-[0_30px_60px_-30px_rgba(8,54,48,0.45)]"
            />
            <div className="hidden md:flex absolute -left-6 bottom-8 items-center gap-3 rounded-full bg-white/95 backdrop-blur px-4 py-3 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.25)]">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#22c55e" }} />
              <span className="text-sm font-medium" style={{ color: GREEN }}>
                Consultations open this week
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* REASSURANCE BAR */}
      <section className="py-6 md:py-8" style={{ background: GREEN }}>
        <div className="studio-container grid sm:grid-cols-3 gap-6 text-white/90 text-sm">
          {[
            { k: "Clinical identity", v: "Board-certified neurologists \u2014 not a wellness brand" },
            { k: "Access", v: "In-person clinics in MA & CA, and virtual care anywhere" },
            { k: "Coverage", v: "We bill insurance. Consultations are a path, not a sales call." },
          ].map((item) => (
            <div key={item.k} className="flex items-start gap-3">
              <span className="mt-1 h-1.5 w-1.5 rounded-full" style={{ background: ORANGE }} />
              <div>
                <p className="font-semibold text-white">{item.k}</p>
                <p className="text-white/70">{item.v}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EMPATHY BAND */}
      <section className="studio-section" style={{ background: SAND }}>
        <div className="studio-container grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <p className="studio-eyebrow" style={{ color: ORANGE }}>
              A message to caregivers
            </p>
            <h2 className="studio-h2 mt-4" style={{ color: GREEN }}>
              Supporting someone through cognitive change is exhausting. The system rarely meets you
              halfway. <span style={{ color: ORANGE }}>We do.</span>
            </h2>
            <p className="studio-lead mt-6" style={{ color: "rgba(8,54,48,0.75)" }}>
              Clear answers. A real plan. A team that stays with you and your loved one \u2014 in clinic
              or wherever you are.
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
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

      {/* FOUR PROOF POINT PILLARS */}
      <section className="studio-section">
        <div className="studio-container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="studio-eyebrow" style={{ color: ORANGE }}>
                Why Mindspan
              </p>
              <h2 className="studio-h2 mt-4 max-w-2xl" style={{ color: GREEN }}>
                Four things we do that the system doesn\u2019t.
              </h2>
            </div>
            <p className="studio-lead" style={{ color: "rgba(8,54,48,0.7)" }}>
              We don\u2019t replace the healthcare system. We strengthen it, connect it, and move it
              faster \u2014 with neurologists, not chatbots.
            </p>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {pillars.map((p, i) => (
              <article key={p.title} className="studio-card flex flex-col">
                <span
                  className="h-9 w-9 rounded-full flex items-center justify-center text-xs font-semibold"
                  style={{ background: CREAM, color: ORANGE }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="studio-eyebrow mt-6" style={{ color: ORANGE }}>
                  {p.kicker}
                </p>
                <h3 className="studio-h3 mt-2" style={{ color: GREEN }}>
                  {p.title}
                </h3>
                <p className="studio-prose mt-3" style={{ color: "rgba(8,54,48,0.7)" }}>
                  {p.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* COGNITIVE DIGITAL TWIN */}
      <section id="digital-twin" className="studio-section text-white" style={{ background: GREEN }}>
        <div className="studio-container grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <p className="studio-eyebrow" style={{ color: ORANGE }}>
              The Cognitive Digital Twin
            </p>
            <h2 className="studio-h2 mt-4">
              A living, personalized model of your brain health.
            </h2>
            <p className="studio-lead mt-5 text-white/80">
              For the millions of families navigating Alzheimer\u2019s and dementia, most guidance is
              generic at best. Our Cognitive Digital Twin changes that. It integrates your medical
              history, EHR, labs, imaging, genetics, and cognitive assessments into a living model of
              your brain health \u2014 one that evolves as new clinical data and research emerge.
            </p>
            <p className="studio-lead mt-5 text-white/80">
              The result: a projection of which interventions are actually likely to work for{" "}
              <em>you</em>, and by how much. For some patients, the model shows the potential to slow
              cognitive decline by six to eighteen months. That\u2019s not a guarantee \u2014 it\u2019s
              a prediction grounded in real science. Every recommendation a Mindspan provider makes is
              traceable back to the evidence and to your specific biology.
            </p>
            <ul className="mt-8 space-y-3">
              {digitalTwinBullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-white/85 text-[15px]">
                  <span
                    className="mt-2 h-1.5 w-1.5 rounded-full flex-shrink-0"
                    style={{ background: ORANGE }}
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
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
                href="/technology"
                className="studio-btn"
                style={{
                  background: "transparent",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.35)",
                }}
              >
                Explore the research
              </a>
            </div>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/digital-brain.jpg"
                alt="Cognitive Digital Twin \u2014 a personalized model of brain health"
                className="w-full rounded-[2rem] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="studio-section" style={{ background: "#fff" }}>
        <div className="studio-container">
          <div className="max-w-3xl">
            <p className="studio-eyebrow" style={{ color: ORANGE }}>
              The path
            </p>
            <h2 className="studio-h2 mt-4" style={{ color: GREEN }}>
              From consultation to a plan that\u2019s actually yours.
            </h2>
            <p className="studio-lead mt-5" style={{ color: "rgba(8,54,48,0.7)" }}>
              No waitlists. No gatekeeping. Clinical care built around your life \u2014 and refined as
              the science evolves.
            </p>
          </div>

          <ol className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((s, i) => (
              <li key={s.title} className="relative">
                <div className="flex items-baseline gap-4">
                  <span className="studio-eyebrow" style={{ color: ORANGE, fontSize: "0.75rem" }}>
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 h-px" style={{ background: "rgba(8,54,48,0.15)" }} />
                </div>
                <h3 className="studio-h3 mt-4" style={{ color: GREEN }}>
                  {s.title}
                </h3>
                <p className="studio-prose mt-3" style={{ color: "rgba(8,54,48,0.7)" }}>
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* AUDIENCE SPLIT */}
      <section className="studio-section" style={{ background: SAND }}>
        <div className="studio-container">
          <div className="max-w-3xl">
            <p className="studio-eyebrow" style={{ color: ORANGE }}>
              Find your starting point
            </p>
            <h2 className="studio-h2 mt-4" style={{ color: GREEN }}>
              Built for everyone in the room.
            </h2>
            <p className="studio-lead mt-5" style={{ color: "rgba(8,54,48,0.7)" }}>
              Whether you\u2019re supporting a loved one, experiencing changes yourself, or referring a
              patient \u2014 there\u2019s a clear next step.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-5 md:gap-6">
            {audiences.map((a) => (
              <a key={a.title} href={a.href} className="studio-card flex flex-col">
                <p className="studio-eyebrow" style={{ color: ORANGE }}>
                  {a.kicker}
                </p>
                <h3 className="studio-h3 mt-3" style={{ color: GREEN }}>
                  {a.title}
                </h3>
                <p className="studio-prose mt-4 flex-1" style={{ color: "rgba(8,54,48,0.7)" }}>
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
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="studio-eyebrow" style={{ color: ORANGE }}>
                In person or virtually anywhere
              </p>
              <h2 className="studio-h2 mt-4" style={{ color: GREEN }}>
                Clinics where we are. Care where you are.
              </h2>
            </div>
            <p className="studio-lead" style={{ color: "rgba(8,54,48,0.7)" }}>
              Seeing patients across Massachusetts and California \u2014 and virtually, wherever you
              live.
            </p>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {locations.map((l) => (
              <a
                key={l.city + l.state}
                href={l.href}
                className="group relative overflow-hidden rounded-[1.5rem] p-7 min-h-[14rem] flex flex-col justify-between text-white transition-transform hover:-translate-y-1"
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
                    <span className="h-2 w-2 rounded-full" style={{ background: "#22c55e" }} />
                    Consultations open
                  </span>
                </div>
                <div className="relative">
                  <h3
                    className="studio-h3 !text-[1.75rem]"
                    style={{ color: "#fff", fontFamily: "var(--font-pt-serif), Georgia, serif" }}
                  >
                    {l.city}
                  </h3>
                  <p className="mt-1 text-white/70">{l.state}</p>
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

      {/* FOOTER CTA */}
      <section className="studio-section text-white" style={{ background: GREEN }}>
        <div className="studio-container text-center">
          <p className="studio-eyebrow" style={{ color: ORANGE }}>
            Start here
          </p>
          <h2 className="studio-h2 mt-5 mx-auto max-w-3xl">
            Understand what\u2019s actually happening \u2014 and what can be done about it.
          </h2>
          <p className="studio-lead mt-5 mx-auto text-white/75">
            A Mindspan consultation is a path to understanding, not a sales call. We\u2019re
            neurologists. We bill insurance. We see you in clinic or virtually \u2014 wherever you are.
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
              href="/about/how-it-works"
              className="studio-btn"
              style={{
                background: "transparent",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.35)",
              }}
            >
              How it works
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
              Clinical-grade cognitive care, powered by the Cognitive Digital Twin. Neurologists in
              Massachusetts and California \u2014 and virtually, anywhere.
            </p>
          </div>
          {[
            {
              title: "Care",
              links: [
                ["How it works", "/about/how-it-works"],
                ["Schedule a consultation", "https://assessment.mindspan.co/"],
                ["Digital Twin", "#digital-twin"],
              ],
            },
            {
              title: "For families",
              links: [
                ["Caregiver support", "/family"],
                ["Introduce a loved one", "/family/assist"],
              ],
            },
            {
              title: "For providers",
              links: [
                ["Referral pathway", "/providers"],
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
                    <a href={href} className="hover:text-white transition-colors">
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
          <p>&copy; 2026 Mindspan</p>
          <div className="flex gap-6">
            <a href="/legal/terms" className="hover:text-white">
              Terms
            </a>
            <a href="/legal/privacy" className="hover:text-white">
              Privacy
            </a>
            <a href="/legal/consent" className="hover:text-white">
              Informed consent
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
