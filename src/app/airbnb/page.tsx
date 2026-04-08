import { startingPoints } from "@/lib/content";

const categories = [
  "In weeks",
  "Early diagnosis",
  "Family care",
  "Telehealth MA",
  "Telehealth CA",
  "In-person Danvers",
  "In-person Irvine",
  "Bay Area",
  "CMS GUIDE",
  "Digital twin",
  "Caregiver support",
  "Provider partnerships",
];

const listings = [
  {
    image: "/assets/clinic-consultation.png",
    tag: "Appointments open",
    title: "Danvers, Massachusetts",
    subtitle: "In-person neurology clinic",
    meta: "Weeks, not months",
    price: "Book a visit",
  },
  {
    image: "/assets/hero.png",
    tag: "Guest favorite",
    title: "Irvine, California",
    subtitle: "In-person cognitive care",
    meta: "Weeks, not months",
    price: "Book a visit",
  },
  {
    image: "/assets/clinic-interior.jpg",
    tag: "New",
    title: "Bay Area, California",
    subtitle: "In-person cognitive care",
    meta: "Weeks, not months",
    price: "Book a visit",
  },
  {
    image: "/assets/digital-brain.jpg",
    tag: "Innovative",
    title: "Digital twin program",
    subtitle: "Personalized brain model",
    meta: "AI-powered",
    price: "Learn more",
  },
  {
    image: "/assets/clinic-consultation.png",
    tag: "Telehealth",
    title: "Telehealth, Massachusetts",
    subtitle: "From the comfort of home",
    meta: "30-minute screening",
    price: "Start today",
  },
  {
    image: "/assets/hero.png",
    tag: "Telehealth",
    title: "Telehealth, California",
    subtitle: "From the comfort of home",
    meta: "30-minute screening",
    price: "Start today",
  },
  {
    image: "/assets/clinic-interior.jpg",
    tag: "CMS GUIDE",
    title: "Medicare-covered dementia care",
    subtitle: "$0 copays, 24/7 access",
    meta: "Up to $2,500 respite",
    price: "Check eligibility",
  },
  {
    image: "/assets/digital-brain.jpg",
    tag: "For providers",
    title: "Provider partnerships",
    subtitle: "Fewer admin burdens",
    meta: "Clinical leadership",
    price: "Partner with us",
  },
];

export const metadata = { title: "Mindspan — Airbnb style preview" };

export default function AirbnbPage() {
  return (
    <div className="airbnb-scope min-h-screen">
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white border-b border-black/5">
        <div className="max-w-[1760px] mx-auto px-6 lg:px-10 py-5 flex items-center justify-between gap-6">
          <a href="/airbnb" className="font-bold text-2xl tracking-tight flex items-center gap-2" style={{ color: "#ff385c" }}>
            <svg viewBox="0 0 32 32" className="h-8 w-8 fill-current" aria-hidden="true">
              <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.01.415.001.228c0 4.062-2.877 6.478-6.357 6.478-2.224 0-4.556-1.258-6.709-3.386l-.257-.26-.172-.179h-.011c-2.253 2.304-4.707 3.825-7.185 3.825-3.48 0-6.357-2.416-6.357-6.478l.004-.393c.035-.923.288-1.813.992-3.443l.33-.766c.683-1.51 2.087-4.514 4.093-8.632l1.9-3.93C10.054 3.996 11.84 2 14.001 2 14.927 2 15.5 1.33 16 1z" />
            </svg>
            airbnb
          </a>
          <div className="hidden lg:flex items-center gap-2 bg-white border border-black/10 rounded-full airbnb-card-shadow px-2 py-2 min-w-[520px]">
            <button className="px-5 py-2 font-semibold text-sm hover:bg-black/5 rounded-full">Location</button>
            <span className="w-px h-6 bg-black/10" />
            <button className="px-5 py-2 font-semibold text-sm hover:bg-black/5 rounded-full">Any week</button>
            <span className="w-px h-6 bg-black/10" />
            <button className="px-5 py-2 text-sm hover:bg-black/5 rounded-full flex-1 text-left" style={{ color: "#6a6a6a" }}>
              Add concerns
            </button>
            <button
              className="h-10 w-10 rounded-full text-white flex items-center justify-center airbnb-hover-shadow"
              style={{ background: "#ff385c" }}
              aria-label="Search"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-4 w-4">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <a href="#" className="hidden md:inline-block text-sm font-semibold px-4 py-3 rounded-full hover:bg-black/5">
              Become a provider
            </a>
            <button className="flex items-center gap-2 border border-black/10 rounded-full p-1 pl-3 airbnb-hover-shadow" aria-label="Menu">
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 4h12M2 8h12M2 12h12" />
              </svg>
              <div className="h-8 w-8 rounded-full text-white flex items-center justify-center text-xs font-semibold" style={{ background: "#222222" }}>
                M
              </div>
            </button>
          </div>
        </div>

        {/* CATEGORY PILLS */}
        <div className="max-w-[1760px] mx-auto px-6 lg:px-10 pb-5">
          <div className="flex gap-8 overflow-x-auto no-scrollbar text-xs font-semibold" style={{ color: "#6a6a6a" }}>
            {categories.map((c, i) => (
              <button
                key={c}
                className={
                  "flex flex-col items-center gap-2 py-2 whitespace-nowrap transition-colors border-b-2 " +
                  (i === 0 ? "border-[#222]" : "border-transparent hover:border-black/20")
                }
                style={i === 0 ? { color: "#222" } : undefined}
              >
                <div className="h-6 w-6 rounded-full flex items-center justify-center text-[10px]" style={{ background: "#f2f2f2" }}>
                  •
                </div>
                {c}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* HERO BAR */}
      <section className="max-w-[1760px] mx-auto px-6 lg:px-10 pt-10">
        <h1 className="text-[32px] font-bold tracking-[-0.44px] leading-[1.18]">Expert cognitive care, without the wait</h1>
        <p className="mt-2 text-[14px]" style={{ color: "#6a6a6a" }}>
          See a neurologist in weeks, not months. Book across Massachusetts & California.
        </p>
      </section>

      {/* LISTING GRID */}
      <section className="max-w-[1760px] mx-auto px-6 lg:px-10 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 gap-y-10">
          {listings.map((l) => (
            <a key={l.title} href="#" className="group">
              <div className="relative aspect-[10/11] overflow-hidden rounded-[20px]" style={{ background: "#f2f2f2" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={l.image}
                  alt={l.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <span
                  className="absolute top-3 left-3 bg-white text-[11px] font-semibold px-3 py-1.5 rounded-[14px] airbnb-card-shadow"
                  style={{ color: "#222" }}
                >
                  {l.tag}
                </span>
                <button className="absolute top-3 right-3 h-8 w-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform" aria-label="Save">
                  <svg viewBox="0 0 32 32" className="h-6 w-6 fill-black/40 stroke-white" strokeWidth="2">
                    <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z" />
                  </svg>
                </button>
              </div>
              <div className="mt-3 flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="text-[15px] font-semibold tracking-[-0.18px] truncate" style={{ color: "#222" }}>
                    {l.title}
                  </h3>
                  <p className="text-[14px] truncate" style={{ color: "#6a6a6a" }}>{l.subtitle}</p>
                  <p className="text-[14px]" style={{ color: "#6a6a6a" }}>{l.meta}</p>
                </div>
              </div>
              <p className="mt-1 text-[14px]" style={{ color: "#222" }}>
                <span className="font-semibold underline">{l.price}</span>
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* FEATURE ROW */}
      <section className="max-w-[1760px] mx-auto px-6 lg:px-10 py-16">
        <h2 className="text-[28px] font-bold tracking-[-0.44px]">Find your starting point</h2>
        <p className="mt-2 text-[14px]" style={{ color: "#6a6a6a" }}>
          Pick the option that sounds like you. We&rsquo;ll point you in the right direction.
        </p>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {startingPoints.map((s) => (
            <a
              key={s.title}
              href={s.href}
              className="bg-white rounded-[20px] p-6 airbnb-card-shadow airbnb-hover-shadow transition-shadow flex flex-col"
            >
              <p className="text-[13px]" style={{ color: "#6a6a6a" }}>{s.kicker}</p>
              <h3 className="mt-1 text-[22px] font-semibold tracking-[-0.44px] leading-[1.18]" style={{ color: "#222" }}>
                {s.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.43] flex-1" style={{ color: "#6a6a6a" }}>
                {s.body}
              </p>
              <button
                className="mt-6 self-start text-white text-[16px] font-medium px-6 py-3 rounded-[8px] transition-colors"
                style={{ background: "#222" }}
              >
                {s.cta}
              </button>
            </a>
          ))}
        </div>
      </section>

      {/* DIGITAL TWIN FEATURE */}
      <section className="max-w-[1760px] mx-auto px-6 lg:px-10 py-16">
        <div className="rounded-[32px] overflow-hidden grid lg:grid-cols-2" style={{ background: "#f2f2f2" }}>
          <div className="p-10 lg:p-16 flex flex-col justify-center">
            <p className="text-[8px] uppercase tracking-[0.32px] font-bold" style={{ color: "#ff385c" }}>
              The future of cognitive health
            </p>
            <h2 className="mt-3 text-[28px] font-bold tracking-[-0.44px] leading-[1.18]">Your own digital twin</h2>
            <p className="mt-4 text-[14px] leading-[1.43] max-w-md" style={{ color: "#6a6a6a" }}>
              A personal digital version of your brain. Trained on real-patient data from over 70,000 Alzheimer&rsquo;s
              patients and 20 years of studies to pinpoint strengths, challenges, and tailor your care.
            </p>
            <button
              className="mt-8 self-start text-white text-[16px] font-medium px-6 py-3 rounded-[8px] transition-colors"
              style={{ background: "#ff385c" }}
            >
              Explore the program
            </button>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/digital-brain.jpg" alt="Digital brain twin" className="h-full w-full object-cover min-h-[320px]" />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-black/10 mt-10">
        <div className="max-w-[1760px] mx-auto px-6 lg:px-10 py-10 grid md:grid-cols-4 gap-8 text-[14px]">
          <div>
            <p className="font-semibold mb-3">Support</p>
            <ul className="space-y-2" style={{ color: "#6a6a6a" }}>
              <li><a href="#" className="hover:underline">Help center</a></li>
              <li><a href="#" className="hover:underline">Get in touch</a></li>
              <li><a href="#" className="hover:underline">Accessibility</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-3">Patients</p>
            <ul className="space-y-2" style={{ color: "#6a6a6a" }}>
              <li><a href="#" className="hover:underline">How it works</a></li>
              <li><a href="#" className="hover:underline">Free assessment</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-3">Family</p>
            <ul className="space-y-2" style={{ color: "#6a6a6a" }}>
              <li><a href="#" className="hover:underline">For families</a></li>
              <li><a href="#" className="hover:underline">Introduce a loved one</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-3">About</p>
            <ul className="space-y-2" style={{ color: "#6a6a6a" }}>
              <li><a href="#" className="hover:underline">About Mindspan</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-black/10">
          <div className="max-w-[1760px] mx-auto px-6 lg:px-10 py-6 text-[13px] flex flex-wrap gap-3 justify-between" style={{ color: "#6a6a6a" }}>
            <p>&copy; 2026 Mindspan, Inc. · Privacy · Terms · Sitemap</p>
            <p>English (US) · USD</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
