import { pillars, howItWorks, locations, startingPoints, nav } from "@/lib/content";

export const metadata = { title: "Mindspan \u2014 Studio edition" };

const GREEN = "#083630";
const ORANGE = "#fb4d17";
const CREAM = "#efeeeb";
const SAND = "#dad6c9";

export default function StudioPage() {
  return (
    <div style={{ background: CREAM, color: GREEN }}>
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-md" style={{ background: "rgba(239,238,235,0.82)" }}>
        <div className="studio-container flex items-center justify-between py-4 md:py-5">
          <a href="/studio" className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/logo-green.png" alt="Mindspan" className="h-7 md:h-8 w-auto" />
          </a>
          <nav className="hidden lg:flex items-center gap-9 text-sm" style={{ color: GREEN }}>
            {nav.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="relative font-medium transition-opacity hover:opacity-60"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="#locations" className="hidden md:inline studio-btn studio-btn-ghost !py-2.5 !px-5 !text-sm">
              Find a clinic
            </a>
            <a
              href="https://assessment.mindspan.co/"
              target="_blank"
              rel="noopener"
              className="studio-btn studio-btn-accent !py-2.5 !px-5 !text-sm"
            >
              Get assessed
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="studio-section pt-14 md:pt-20">
        <div className="studio-container grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <p className="studio-eyebrow studio-fade studio-fade-1" style={{ color: ORANGE }}>
              Cognitive care, without the wait
            </p>
            <h1 className="studio-display mt-4 studio-fade studio-fade-2" style={{ color: GREEN }}>
              Cognitive health,
              <br />
              made personal <span style={{ color: ORANGE, fontStyle: "italic" }}>today</span>.
            </h1>
            <p className="studio-lead mt-6 studio-fade studio-fade-3" style={{ color: "rgba(8,54,48,0.78)" }}>
              In Alzheimer&rsquo;s care, timing changes everything. We move fast — so we can start the
              right treatment while it can still slow the disease and protect what matters. Detect
              early. Treat comprehensively. Connect you to the latest science.
            </p>
            <div className="mt-9 flex flex-wrap gap-3 studio-fade studio-fade-4">
              <a href="/about/how-it-works" className="studio-btn studio-btn-primary">
                How it works
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="https://assessment.mindspan.co/"
                target="_blank"
                rel="noopener"
                className="studio-btn studio-btn-ghost"
              >
                Take a free assessment
              </a>
            </div>
            <dl className="mt-14 grid grid-cols-3 gap-6 max-w-xl">
              <div>
                <dt className="studio-eyebrow" style={{ color: "rgba(8,54,48,0.55)" }}>
                  Seen in
                </dt>
                <dd className="studio-h3 mt-1" style={{ color: GREEN }}>Weeks</dd>
              </div>
              <div>
                <dt className="studio-eyebrow" style={{ color: "rgba(8,54,48,0.55)" }}>
                  Patients
                </dt>
                <dd className="studio-h3 mt-1" style={{ color: GREEN }}>70K+</dd>
              </div>
              <div>
                <dt className="studio-eyebrow" style={{ color: "rgba(8,54,48,0.55)" }}>
                  States
                </dt>
                <dd className="studio-h3 mt-1" style={{ color: GREEN }}>MA / CA</dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-5 relative studio-fade studio-fade-3">
            <div
              className="absolute -inset-6 rounded-[2.5rem] -z-10"
              style={{ background: `radial-gradient(120% 80% at 50% 20%, ${SAND} 0%, transparent 70%)` }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/hero.png"
              alt="Mindspan care team with patient"
              className="w-full rounded-[2rem] shadow-[0_30px_60px_-30px_rgba(8,54,48,0.45)]"
            />
            <div
              className="hidden md:flex absolute -left-6 bottom-8 items-center gap-3 rounded-full bg-white/95 backdrop-blur px-4 py-3 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.25)]"
            >
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#22c55e" }} />
              <span className="text-sm font-medium" style={{ color: GREEN }}>
                Appointments open this week
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* GOALS BAND */}
      <section className="studio-section" style={{ background: SAND }}>
        <div className="studio-container grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <p className="studio-eyebrow" style={{ color: ORANGE }}>A promise</p>
            <h2 className="studio-h2 mt-4" style={{ color: GREEN }}>
              Dealing with dementia is difficult. We&rsquo;ve been there. Whether you&rsquo;re a PCP,
              caregiver, or patient — <span style={{ color: ORANGE }}>we&rsquo;ve got you</span>.
            </h2>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <a href="/about/how-it-works" className="studio-btn studio-btn-primary">
              Learn how it works
            </a>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="studio-section">
        <div className="studio-container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="studio-eyebrow" style={{ color: ORANGE }}>Why Mindspan</p>
              <h2 className="studio-h2 mt-4 max-w-2xl" style={{ color: GREEN }}>
                Cognitive care at the speed of real life.
              </h2>
            </div>
            <p className="studio-lead" style={{ color: "rgba(8,54,48,0.7)" }}>
              We don&rsquo;t replace the healthcare system. We strengthen it, connect it, and move it
              faster.
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
                <p className="studio-eyebrow mt-6" style={{ color: ORANGE }}>{p.kicker}</p>
                <h3 className="studio-h3 mt-2" style={{ color: GREEN }}>{p.title}</h3>
                <p className="studio-prose mt-3" style={{ color: "rgba(8,54,48,0.7)" }}>{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="studio-section" style={{ background: "#fff" }}>
        <div className="studio-container">
          <div className="max-w-3xl">
            <p className="studio-eyebrow" style={{ color: ORANGE }}>The path</p>
            <h2 className="studio-h2 mt-4" style={{ color: GREEN }}>How it works</h2>
            <p className="studio-lead mt-5" style={{ color: "rgba(8,54,48,0.7)" }}>
              A clear path forward, starting with answers this month. No lengthy waitlists, no
              uncertainty — just straightforward care when you need it.
            </p>
          </div>

          <ol className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((s, i) => (
              <li key={s.title} className="relative pl-0">
                <div className="flex items-baseline gap-4">
                  <span
                    className="studio-eyebrow"
                    style={{ color: ORANGE, fontSize: "0.75rem" }}
                  >
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="flex-1 h-px"
                    style={{ background: "rgba(8,54,48,0.15)" }}
                  />
                </div>
                <h3 className="studio-h3 mt-4" style={{ color: GREEN }}>{s.title}</h3>
                <p className="studio-prose mt-3" style={{ color: "rgba(8,54,48,0.7)" }}>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* DIGITAL TWIN */}
      <section className="studio-section text-white" style={{ background: GREEN }}>
        <div className="studio-container grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <p className="studio-eyebrow" style={{ color: ORANGE }}>
              The future of cognitive health
            </p>
            <h2 className="studio-h2 mt-4">Your own digital twin</h2>
            <p className="studio-lead mt-5 text-white/75">
              A personal digital version of your brain — helping your care team truly understand and
              support your cognitive health. Trained on real-patient data from 70,000+ Alzheimer&rsquo;s
              patients and 20 years of research.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="/technology" className="studio-btn studio-btn-accent">
                Explore the technology
              </a>
              <a
                href="/about"
                className="studio-btn"
                style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.35)" }}
              >
                About our research
              </a>
            </div>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/digital-brain.jpg"
                alt="Digital brain twin"
                className="w-full rounded-[2rem] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section id="locations" className="studio-section">
        <div className="studio-container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="studio-eyebrow" style={{ color: ORANGE }}>Where we are</p>
              <h2 className="studio-h2 mt-4" style={{ color: GREEN }}>Our locations</h2>
            </div>
            <p className="studio-lead" style={{ color: "rgba(8,54,48,0.7)" }}>
              Open and seeing patients across Massachusetts and California.
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
                    Appointments open
                  </span>
                </div>
                <div className="relative">
                  <h3 className="studio-h3 !text-[1.75rem]" style={{ color: "#fff", fontFamily: "var(--font-pt-serif), Georgia, serif" }}>
                    {l.city}
                  </h3>
                  <p className="mt-1 text-white/70">{l.state}</p>
                  <p className="mt-5 text-sm text-white/80 group-hover:text-white flex items-center gap-2">
                    Visit clinic
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* STARTING POINTS */}
      <section className="studio-section" style={{ background: SAND }}>
        <div className="studio-container">
          <div className="max-w-3xl">
            <p className="studio-eyebrow" style={{ color: ORANGE }}>We&rsquo;re here to help</p>
            <h2 className="studio-h2 mt-4" style={{ color: GREEN }}>
              Let&rsquo;s find your starting point.
            </h2>
            <p className="studio-lead mt-5" style={{ color: "rgba(8,54,48,0.7)" }}>
              Pick the option that sounds like you — we&rsquo;ll point you in the right direction.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-5 md:gap-6">
            {startingPoints.map((s) => (
              <a key={s.title} href={s.href} className="studio-card flex flex-col">
                <p className="studio-eyebrow" style={{ color: "rgba(8,54,48,0.6)" }}>{s.kicker}</p>
                <h3 className="studio-h3 mt-2" style={{ color: GREEN }}>{s.title}</h3>
                <p className="studio-prose mt-4 flex-1" style={{ color: "rgba(8,54,48,0.7)" }}>
                  {s.body}
                </p>
                <p className="mt-8 font-semibold text-sm flex items-center gap-2" style={{ color: ORANGE }}>
                  {s.cta}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="studio-section text-white" style={{ background: GREEN }}>
        <div className="studio-container text-center">
          <p className="studio-eyebrow" style={{ color: ORANGE }}>Start today</p>
          <h2 className="studio-h2 mt-5 mx-auto max-w-3xl">
            See a specialist in weeks, not months or years.
          </h2>
          <p className="studio-lead mt-5 mx-auto text-white/70">
            Early diagnosis means better outcomes — and more time with the people who matter most.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="https://assessment.mindspan.co/"
              target="_blank"
              rel="noopener"
              className="studio-btn studio-btn-accent"
            >
              Begin today
            </a>
            <a
              href="/about/how-it-works"
              className="studio-btn"
              style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.35)" }}
            >
              How it works
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pt-20 pb-12 text-white/75" style={{ background: GREEN, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="studio-container grid md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/logo-white.png" alt="Mindspan" className="h-10 w-auto" />
            <p className="mt-6 text-sm max-w-sm leading-relaxed">
              Expert cognitive care, without the wait. Clinics in Massachusetts and California.
            </p>
          </div>
          {[
            { title: "Patients", links: [["How it works", "/about/how-it-works"], ["Free assessment", "https://assessment.mindspan.co/"]] },
            { title: "Family", links: [["For families", "/family"], ["Introduce a loved one", "/family/assist"]] },
            { title: "About", links: [["About Mindspan", "/about"], ["Contact", "/contact"]] },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-white font-semibold mb-4 text-sm">{col.title}</p>
              <ul className="space-y-2 text-sm">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="hover:text-white transition-colors">{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="studio-container mt-16 pt-8 flex flex-wrap gap-4 justify-between text-xs" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <p>&copy; 2026 Mindspan</p>
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
