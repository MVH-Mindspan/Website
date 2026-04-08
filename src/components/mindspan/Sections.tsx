import { pillars, howItWorks, locations, startingPoints } from "@/lib/content";

const green = "#083630";
const orange = "#fb4d17";
const sand = "#dad6c9";

export function GoalsBand() {
  return (
    <section className="px-4 md:px-8 py-16 md:py-24" style={{ background: sand }}>
      <div className="max-w-5xl mx-auto text-center">
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl leading-tight"
          style={{ color: green, fontFamily: "var(--font-pt-serif), Georgia, serif" }}
        >
          Dealing with dementia is difficult. We know — we have been there. Whether you&rsquo;re a PCP,
          caregiver, or patient. <strong style={{ color: orange }}>We&rsquo;ve got you.</strong>
        </h2>
        <div className="mt-10 flex justify-center">
          <a
            href="/about/how-it-works"
            className="inline-flex items-center gap-3 text-white font-semibold px-7 py-4 rounded-full hover:scale-[0.975] transition-transform"
            style={{ background: green }}
          >
            Learn how it works
            <span className="text-xs opacity-70">Start today</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function Pillars() {
  return (
    <section className="px-4 md:px-8 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl leading-tight"
            style={{ color: green, fontFamily: "var(--font-pt-serif), Georgia, serif" }}
          >
            Cognitive care at the speed of real life.
          </h2>
          <p className="mt-5 text-lg" style={{ color: "rgba(8,54,48,0.75)" }}>
            We don&rsquo;t replace the healthcare system. We strengthen it, connect it, and move it faster.
          </p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="bg-white border rounded-[20px] p-7 flex flex-col"
              style={{ borderColor: "rgba(0,0,0,0.1)" }}
            >
              <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: orange }}>
                {p.kicker}
              </span>
              <h3
                className="mt-3 text-2xl leading-snug"
                style={{ color: green, fontFamily: "var(--font-pt-serif), Georgia, serif" }}
              >
                {p.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "rgba(8,54,48,0.75)" }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AssistCTA() {
  return (
    <section className="px-4 md:px-8 py-16 md:py-24" style={{ background: sand }}>
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl"
          style={{ color: green, fontFamily: "var(--font-pt-serif), Georgia, serif" }}
        >
          Looking to assist a loved one?
        </h2>
        <div className="mt-8 flex justify-center">
          <a
            href="/family/assist"
            className="inline-flex items-center gap-3 text-white font-semibold px-7 py-4 rounded-full hover:scale-[0.975] transition-transform"
            style={{ background: orange }}
          >
            Learn how to get started
            <span className="text-xs opacity-80">Built for families</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section className="px-4 md:px-8 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl leading-tight"
            style={{ color: green, fontFamily: "var(--font-pt-serif), Georgia, serif" }}
          >
            How it works
          </h2>
          <p className="mt-5 text-lg" style={{ color: "rgba(8,54,48,0.75)" }}>
            A clear path forward, starting with answers this month. No lengthy waitlists, no uncertainty
            — just straightforward care when you need it.
          </p>
        </div>
        <ol className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {howItWorks.map((s, i) => (
            <li
              key={s.title}
              className="bg-white border rounded-[20px] p-7"
              style={{ borderColor: "rgba(0,0,0,0.1)" }}
            >
              <div
                className="text-5xl"
                style={{ color: orange, fontFamily: "var(--font-pt-serif), Georgia, serif" }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3
                className="mt-4 text-2xl"
                style={{ color: green, fontFamily: "var(--font-pt-serif), Georgia, serif" }}
              >
                {s.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "rgba(8,54,48,0.75)" }}>
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function DigitalTwin() {
  return (
    <section className="px-4 md:px-8 py-20 md:py-28 text-white" style={{ background: green }}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: orange }}>
            The future of cognitive health
          </p>
          <h2
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl leading-tight"
            style={{ fontFamily: "var(--font-pt-serif), Georgia, serif" }}
          >
            Your own digital twin
          </h2>
          <p className="mt-5 text-white/75 text-lg leading-relaxed">
            Imagine a personal digital version of your brain — a &ldquo;digital twin&rdquo; — helping
            your care team truly understand and support your cognitive health. Trained on real-patient
            data from over 70,000 Alzheimer&rsquo;s patients and 20 years of studies.
          </p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/digital-brain.jpg"
          alt="Digital brain twin visualization"
          className="w-full rounded-[20px] shadow-xl"
        />
      </div>
    </section>
  );
}

export function Locations() {
  return (
    <section id="locations" className="px-4 md:px-8 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl leading-tight"
            style={{ color: green, fontFamily: "var(--font-pt-serif), Georgia, serif" }}
          >
            Our locations
          </h2>
          <p className="mt-5 text-lg" style={{ color: "rgba(8,54,48,0.75)" }}>
            Mindspan is open and seeing patients across Massachusetts and California. Book an appointment
            at any of our locations today.
          </p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {locations.map((l) => (
            <a
              key={l.city + l.state}
              href={l.href}
              className="loc-card group text-white rounded-[20px] p-7"
            >
              <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: orange }}>
                Appointments open
              </p>
              <h3 className="mt-4 text-3xl" style={{ fontFamily: "var(--font-pt-serif), Georgia, serif" }}>
                {l.city}
              </h3>
              <p className="mt-1 text-white/75">{l.state}</p>
              <p className="mt-6 text-sm text-white/80">Visit {l.city} clinic →</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StartingPoint() {
  return (
    <section className="px-4 md:px-8 py-20 md:py-28" style={{ background: sand }}>
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: orange }}>
            We&rsquo;re here to help
          </p>
          <h2
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl leading-tight"
            style={{ color: green, fontFamily: "var(--font-pt-serif), Georgia, serif" }}
          >
            Mindspan is here for you. Let&rsquo;s find your starting point.
          </h2>
          <p className="mt-5 text-lg" style={{ color: "rgba(8,54,48,0.75)" }}>
            Looking for help with memory concerns can feel overwhelming — we get it. Pick the option below
            that sounds like you, and we&rsquo;ll point you in the right direction.
          </p>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {startingPoints.map((s) => (
            <a
              key={s.title}
              href={s.href}
              className="bg-white border rounded-[20px] p-8 transition-colors flex flex-col"
              style={{ borderColor: "rgba(0,0,0,0.1)" }}
            >
              <p className="text-sm" style={{ color: "rgba(8,54,48,0.6)" }}>{s.kicker}</p>
              <h3
                className="mt-2 text-3xl"
                style={{ color: green, fontFamily: "var(--font-pt-serif), Georgia, serif" }}
              >
                {s.title}
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed flex-1" style={{ color: "rgba(8,54,48,0.75)" }}>
                {s.body}
              </p>
              <p className="mt-6 text-sm font-semibold" style={{ color: orange }}>
                {s.cta} →
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FooterCTA() {
  return (
    <section className="px-4 md:px-8 py-20 md:py-28 text-white" style={{ background: green }}>
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl leading-tight"
          style={{ fontFamily: "var(--font-pt-serif), Georgia, serif" }}
        >
          See a specialist in weeks, not months or years. Early diagnosis means better outcomes — and
          more time with the people who matter most.
        </h2>
        <div className="mt-10 flex justify-center">
          <a
            href="https://assessment.mindspan.co/"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-3 text-white font-semibold px-8 py-4 rounded-full hover:scale-[0.975] transition-transform"
            style={{ background: orange }}
          >
            Begin today
          </a>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer
      className="text-white/80 px-4 md:px-8 pt-16 pb-10 border-t border-white/10"
      style={{ background: green }}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo-white.png" alt="Mindspan" className="h-10 w-auto" />
          <p className="mt-6 text-sm max-w-sm">
            Expert cognitive care, without the wait. Clinics in Massachusetts and California.
          </p>
        </div>
        <div>
          <p className="text-white font-semibold mb-4">Patients</p>
          <ul className="space-y-2 text-sm">
            <li><a href="/about/how-it-works" className="hover:text-white">How it works</a></li>
            <li><a href="https://assessment.mindspan.co/" className="hover:text-white">Free assessment</a></li>
          </ul>
        </div>
        <div>
          <p className="text-white font-semibold mb-4">Family</p>
          <ul className="space-y-2 text-sm">
            <li><a href="/family" className="hover:text-white">Mindspan for families</a></li>
            <li><a href="/family/assist" className="hover:text-white">Introduce a loved one</a></li>
          </ul>
        </div>
        <div>
          <p className="text-white font-semibold mb-4">About</p>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:text-white">About Mindspan</a></li>
            <li><a href="/contact" className="hover:text-white">Contact us</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-14 pt-8 border-t border-white/10 flex flex-wrap gap-4 justify-between text-xs">
        <p>&copy; 2026 Mindspan</p>
        <div className="flex gap-6">
          <a href="/legal/terms" className="hover:text-white">Terms</a>
          <a href="/legal/privacy" className="hover:text-white">Privacy</a>
          <a href="/legal/consent" className="hover:text-white">Informed consent</a>
        </div>
      </div>
    </footer>
  );
}
