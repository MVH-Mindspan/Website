"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function VersionToggle() {
  const pathname = usePathname();
  const isAirbnb = pathname?.startsWith("/airbnb") ?? false;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] bg-white/95 backdrop-blur border border-black/10 shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-full p-1 flex text-xs font-medium">
      <Link
        href="/"
        className={
          "px-4 py-2 rounded-full transition-colors " +
          (!isAirbnb
            ? "bg-brand-green text-white"
            : "text-[#222] hover:bg-black/5")
        }
        style={!isAirbnb ? { background: "#083630", color: "#fff" } : undefined}
      >
        Mindspan
      </Link>
      <Link
        href="/airbnb"
        className={
          "px-4 py-2 rounded-full transition-colors " +
          (isAirbnb ? "text-white" : "text-[#222] hover:bg-black/5")
        }
        style={isAirbnb ? { background: "#ff385c", color: "#fff" } : undefined}
      >
        Airbnb style
      </Link>
    </div>
  );
}
