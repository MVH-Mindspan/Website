import {
  brand,
  nav,
  expectations,
  howItWorks,
  locations,
  audiences,
  whatWeLookAt,
  weHelpWith,
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
            </h1>
            <p
              className="studio-lead mt-6 studio-fade studio-fade-3"
              style={{ color: "rgba(8,54,48,0.78)" }}
            >
              {brand.subhead}
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
              <a href={brand.secondaryCtaHref} className="studio-btn studio-btn-ghost">
                {brand.secondaryCta}
              </a>
            </div>
            <p
              className="mt-6 text-sm studio-fade studio-fade-4"
              style={{ color: "rgba(8,54,48,0.6)" }}
            >
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
              alt="A Mindspan neurologist meeting with a patient and family member"
              className="w-full rounded-[2rem] shadow-[0_30px_60px_-30px_rgba(8,54,48,0.45)]"
            />
            <div className="hidden md:flex absolute -left-6 bottom-8 items-center gap-3 rounded-full bg-white/95 backdrop-blur px-4 py-3 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.25)]">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#22c55e" }} />
              <span className="text-sm font-medium" style={{ color: GREEN }}>
                Appointments open this week
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE HELP WITH, anchor chips */}
      <section className="pt-4 md:pt-2 pb-2">
        <div className="studio-container">
          <p className="studio-eyebrow mb-4" style={{ color: "rgba(8,54,48,0.55)" }}>
            We specialize in
          </p>
          <div className="flex flex-wrap gap-2">
            {weHelpWith.map((w) => (
              <span
                key={w}
                className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium"
                style={{
                  background: "rgba(8,54,48,0.06)",
                  color: GREEN,
                  border: "1px solid rgba(8,54,48,0.12)",
                }}
              >
                {w}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* REASSURANCE BAR */}
      <section className="py-6 md:py-8" style={{ background: GREEN }}>
        <div className="studio-container grid sm:grid-cols-3 gap-6 text-white/90 text-sm">
          {[
            {
              k: "Real neurologists",
              v: "Board-certified doctors who specialize in cognition and memory",
            },
            {
              k: "In clinic or from home",
              v: "Visit one of our clinics, or see us on video from anywhere in MA or CA",
            },
            {
              k: "Covered by insurance",
              v: "Most of our visits are billed through insurance, just like your PCP",
            },
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

      {/* LETTER TO THE READER */}
      <section className="studio-section" style={{ background: SAND }}>
        <div className="studio-container max-w-3xl">
          <p className="studio-eyebrow" style={{ color: ORANGE }}>
            A note from our team
          </p>
          <h2 className="studio-h2 mt-5" style={{ color: GREEN }}>
            Maybe your mom has started repeating the same story. Maybe your husband got lost on the
            way home. Maybe you forgot a name at work and it rattled you more than it should have.
          </h2>
          <div className="mt-8 space-y-5 text-[17px] leading-[1.65]" style={{ color: "rgba(8,54,48,0.8)" }}>
            <p>
              Whatever brought you here, you are in the right place, and you are not overreacting.
              Changes in memory, word-finding, mood, or day-to-day judgment are worth taking
              seriously. Early matters. Clarity matters. Just being here is the right first step.
            </p>
            <p>
              Mindspan exists because cognitive care is painfully hard to access almost everywhere
              else. Waitlists of six months or more to see a neurologist. Fifteen-minute
              appointments with a doctor who doesn’t have the full picture. A diagnosis of
              Alzheimer’s or dementia handed over, and then… silence. That isn’t care. That’s
              paperwork.
            </p>
            <p>
              We do it differently. Our team specializes in Alzheimer’s, dementia, and cognitive
              change. We take time. We include your family if you want them there. We talk to your
              primary care doctor. We explain what we see in plain language. And we stay with you
              after the first visit, because that’s usually when the real questions start.
            </p>
          </div>
          <div className="mt-10">
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

      {/* WHAT TO EXPECT, reframed from "pillars" */}
      <section id="expect" className="studio-section">
        <div className="studio-container">
          <div className="max-w-3xl">
            <p className="studio-eyebrow" style={{ color: ORANGE }}>
              What to expect when you come to us
            </p>
            <h2 className="studio-h2 mt-4" style={{ color: GREEN }}>
              The questions families ask us first, answered honestly.
            </h2>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-6 md:gap-8">
            {expectations.map((e) => (
              <article key={e.title} className="studio-card">
                <p className="studio-eyebrow" style={{ color: ORANGE }}>
                  {e.kicker}
                </p>
                <h3 className="studio-h3 mt-3" style={{ color: GREEN }}>
                  {e.title}
                </h3>
                <p className="studio-prose mt-3" style={{ color: "rgba(8,54,48,0.7)" }}>
                  {e.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE THINK ABOUT YOUR CARE, replaces product-like "Digital Twin" pitch */}
      <section
        id="how-we-think"
        className="studio-section text-white"
        style={{ background: GREEN }}
      >
        <div className="studio-container grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <p className="studio-eyebrow" style={{ color: ORANGE }}>
              How we think about your care
            </p>
            <h2 className="studio-h2 mt-4">
              Your brain is yours. Your care should be, too.
            </h2>
            <div className="mt-6 space-y-5 text-white/80 text-[17px] leading-[1.65]">
              <p>
                Most advice about memory loss is general: eat better, sleep more, stay social. None
                of that is wrong. But none of it is about <em>you</em>. Two people sitting in the
                same waiting room can have very different reasons their memory is slipping, and very
                different things that will actually help.
              </p>
              <p>
                At Mindspan, we take the time to understand your specific story, your health
                history, the tests you’ve had, how you’re doing right now, what matters most to you.
                Then we draw on what researchers have learned from tens of thousands of other
                patients to figure out what is most likely to help <em>your</em> brain, not an
                average one.
              </p>
              <p>
                For some of the people we see, that careful, personalized approach can meaningfully
                slow changes and protect things that matter, independence, memory, time with family.
                We can’t promise a specific outcome. What we can promise is that we’ll treat you like
                a person, and that every recommendation we make will be something we can explain.
              </p>
            </div>

            <div className="mt-10 rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <p className="studio-eyebrow" style={{ color: ORANGE }}>
                What your neurologist actually looks at
              </p>
              <ul className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-2 text-[15px] text-white/85">
                {whatWeLookAt.map((w) => (
                  <li key={w} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: ORANGE }} />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>

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
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/digital-brain.jpg"
                alt="A personalized view of a patient’s brain health"
                className="w-full rounded-[2rem] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS, the visit, as a story */}
      <section id="visit" className="studio-section" style={{ background: "#fff" }}>
        <div className="studio-container">
          <div className="max-w-3xl">
            <p className="studio-eyebrow" style={{ color: ORANGE }}>
              What the first visit actually looks like
            </p>
            <h2 className="studio-h2 mt-4" style={{ color: GREEN }}>
              From first call to a plan that fits your life.
            </h2>
            <p className="studio-lead mt-5" style={{ color: "rgba(8,54,48,0.7)" }}>
              We don’t believe in surprise. Here is exactly what happens when you reach out, step by
              step.
            </p>
          </div>

          <ol className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((s, i) => (
              <li key={s.title} className="relative">
                <div className="flex items-baseline gap-4">
                  <span className="studio-eyebrow" style={{ color: ORANGE, fontSize: "0.75rem" }}>
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="flex-1 h-px"
                    style={{ background: "rgba(8,54,48,0.15)" }}
                  />
                </div>
                <h3 className="studio-h3 mt-4" style={{ color: GREEN }}>
                  {s.title}
                </h3>
                <p className="studio-prose mt-3" style={{ color: "rgba(8,54,48,0.75)" }}>
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* AUDIENCE SPLIT, written TO each reader */}
      <section id="families" className="studio-section" style={{ background: SAND }}>
        <div className="studio-container">
          <div className="max-w-3xl">
            <p className="studio-eyebrow" style={{ color: ORANGE }}>
              Who we see
            </p>
            <h2 className="studio-h2 mt-4" style={{ color: GREEN }}>
              Wherever you’re coming from, you’re in the right place.
            </h2>
            <p className="studio-lead mt-5" style={{ color: "rgba(8,54,48,0.7)" }}>
              A short note, directly to you.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-5 md:gap-6">
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
                <p className="studio-prose mt-4 flex-1" style={{ color: "rgba(8,54,48,0.75)" }}>
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
                Where we see patients
              </p>
              <h2 className="studio-h2 mt-4" style={{ color: GREEN }}>
                Come see us. Or let us come to you, on video.
              </h2>
            </div>
            <p className="studio-lead" style={{ color: "rgba(8,54,48,0.7)" }}>
              We have clinics in Massachusetts and California, and we see patients on video anywhere
              in those two states.
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
                  <h3
                    className="studio-h3 !text-[1.75rem]"
                    style={{
                      color: "#fff",
                      fontFamily: "var(--font-pt-serif), Georgia, serif",
                    }}
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

      {/* WHY MINDSPAN IS DIFFERENT */}
      <section className="studio-section" style={{ background: "#fff" }}>
        <div className="studio-container">
          <div className="max-w-3xl">
            <p className="studio-eyebrow" style={{ color: ORANGE }}>
              Why care at Mindspan is different
            </p>
            <h2 className="studio-h2 mt-4" style={{ color: GREEN }}>
              Neurologists who take the time, with the tools to back it up.
            </h2>
            <p className="studio-lead mt-5" style={{ color: "rgba(8,54,48,0.7)" }}>
              A lot of the technology in healthcare is invisible to patients. At Mindspan, we want
              you to see what’s under the hood, because it’s part of what makes your care feel
              different.
            </p>
          </div>

          <div className="mt-14 grid md:grid-cols-2 gap-8 md:gap-10">
            <article>
              <p className="studio-eyebrow" style={{ color: ORANGE }}>
                A care team that actually stays with you
              </p>
              <h3 className="studio-h3 mt-3" style={{ color: GREEN }}>
                One team for the whole family.
              </h3>
              <p className="studio-prose mt-4" style={{ color: "rgba(8,54,48,0.75)" }}>
                You’ll have a neurologist and a care partner who know your name, your history, and
                what matters most to you. They talk to each other. They talk to your primary care
                doctor. And they talk to your family, because cognitive care affects everyone in
                the house, not just the patient.
              </p>
            </article>

            <article>
              <p className="studio-eyebrow" style={{ color: ORANGE }}>
                Your Cognitive Digital Twin
              </p>
              <h3 className="studio-h3 mt-3" style={{ color: GREEN }}>
                A personalized model of your brain.
              </h3>
              <p className="studio-prose mt-4" style={{ color: "rgba(8,54,48,0.75)" }}>
                Behind the scenes, our team builds something we call your Cognitive Digital Twin ,
                a personalized picture of your brain health, put together from your medical
                history, labs, imaging, and cognitive assessments. It helps your neurologist see
                what’s most likely going on and what’s most likely to help <em>you</em>, drawing on
                research from tens of thousands of other patient journeys. Your twin updates as we
                learn more about you.
              </p>
            </article>

            <article>
              <p className="studio-eyebrow" style={{ color: ORANGE }}>
                Our Care Orchestration Engine
              </p>
              <h3 className="studio-h3 mt-3" style={{ color: GREEN }}>
                The latest science, matched to you.
              </h3>
              <p className="studio-prose mt-4" style={{ color: "rgba(8,54,48,0.75)" }}>
                Cognitive medicine is moving fast. New drugs, new diagnostics, new understanding of
                how the brain ages. Our Care Orchestration Engine quietly tracks that research and
                pairs it with your twin, so your neurologist can see which of today’s options are
                actually worth considering for your situation. You get the benefit of tomorrow’s
                neurology, explained in plain language today.
              </p>
            </article>

            <article>
              <p className="studio-eyebrow" style={{ color: ORANGE }}>
                Built for however you want to be seen
              </p>
              <h3 className="studio-h3 mt-3" style={{ color: GREEN }}>
                Visit us, or we’ll come to you on video.
              </h3>
              <p className="studio-prose mt-4" style={{ color: "rgba(8,54,48,0.75)" }}>
                Whether you want to sit across from a neurologist in one of our clinics, or join
                from your living room with a family member on the couch beside you, we make it
                work. Video visits are full visits, not a check-in. And we bill insurance either
                way.
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
      </section>

      {/* FOOTER CTA */}
      <section className="studio-section text-white" style={{ background: GREEN }}>
        <div className="studio-container text-center max-w-3xl">
          <p className="studio-eyebrow" style={{ color: ORANGE }}>
            When you’re ready
          </p>
          <h2 className="studio-h2 mt-5">
            The first step is a conversation. That’s all.
          </h2>
          <p className="studio-lead mt-5 mx-auto text-white/80">
            A Mindspan consultation is a phone call with someone on our team. No commitment, no
            pressure. Tell us what’s going on, and we’ll help you figure out what to do next, even
            if it turns out that “next” isn’t with us.
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
              Neurologists who take the time. Clinics in Massachusetts and California, plus video
              visits. We bill insurance.
            </p>
          </div>
          {[
            {
              title: "Getting started",
              links: [
                ["Schedule a consultation", "https://assessment.mindspan.co/"],
                ["What to expect", "#expect"],
                ["How we think about care", "#how-we-think"],
              ],
            },
            {
              title: "For families",
              links: [
                ["If you’re caring for someone", "#families"],
                ["Locations", "#locations"],
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
          <p>© 2026 Mindspan</p>
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
