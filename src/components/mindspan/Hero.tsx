export default function Hero() {
  return (
    <section className="px-4 md:px-8 pt-12 md:pt-20 pb-16 md:pb-28">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight"
            style={{ color: "#083630", fontFamily: "var(--font-pt-serif), Georgia, serif" }}
          >
            Cognitive health, made personal and accessible{" "}
            <em className="not-italic" style={{ color: "#fb4d17" }}>today</em>.
          </h1>
          <p className="mt-6 text-base sm:text-lg max-w-xl" style={{ color: "rgba(8,54,48,0.8)" }}>
            In Alzheimer&rsquo;s care, timing changes everything. Many patients wait months — even years —
            to see a specialist. We move fast so we can start the right treatment while it can still slow
            the disease and protect what matters. We detect early, treat comprehensively, and connect you
            to the latest science.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/about/how-it-works"
              className="inline-flex items-center gap-3 text-white font-semibold px-7 py-4 rounded-full hover:scale-[0.975] transition-transform"
              style={{ background: "#083630" }}
            >
              How it works
              <span className="text-xs opacity-70">Learn about Mindspan</span>
            </a>
            <a
              href="https://assessment.mindspan.co/"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-3 font-semibold px-7 py-4 rounded-full transition-colors"
              style={{ color: "#083630", border: "1px solid #083630" }}
            >
              Take a free assessment
            </a>
          </div>
          <p className="mt-6 text-sm" style={{ color: "rgba(8,54,48,0.6)" }}>
            Available in Massachusetts &amp; California
          </p>
        </div>
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/hero.png"
            alt="Mindspan care team with patient"
            className="w-full rounded-[20px] shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
