import Link from "next/link";
import { nav } from "@/lib/content";

export default function Nav() {
  return (
    <header className="sticky top-4 z-50 mx-4 md:mx-8">
      <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-md border border-black/5 rounded-3xl px-5 py-3 flex items-center justify-between shadow-sm">
        <Link href="/" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo-green.png" alt="Mindspan" className="h-7 w-auto" />
        </Link>
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium" style={{ color: "#083630" }}>
          {nav.map((n) => (
            <Link key={n.label} href={n.href} className="hover:opacity-70 transition-opacity">
              {n.label}
            </Link>
          ))}
        </nav>
        <a
          href="https://assessment.mindspan.co/"
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 text-white font-semibold text-sm px-5 py-2.5 rounded-full hover:scale-[0.975] transition-transform"
          style={{ background: "#fb4d17" }}
        >
          Get assessed today
        </a>
      </div>
    </header>
  );
}
