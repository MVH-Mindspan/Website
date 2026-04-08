"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const versions = [
  { href: "/", label: "Mindspan", active: "#083630" },
  { href: "/studio", label: "Studio", active: "#fb4d17" },
  { href: "/airbnb", label: "Airbnb", active: "#ff385c" },
];

export default function VersionToggle() {
  const pathname = usePathname() ?? "/";

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] bg-white/95 backdrop-blur border border-black/10 shadow-[0_4px_18px_rgba(0,0,0,0.12)] rounded-full p-1 flex text-xs font-medium">
      {versions.map((v) => {
        const active = isActive(v.href);
        return (
          <Link
            key={v.href}
            href={v.href}
            className="px-4 py-2 rounded-full transition-colors"
            style={
              active
                ? { background: v.active, color: "#fff" }
                : { color: "#222" }
            }
          >
            {v.label}
          </Link>
        );
      })}
    </div>
  );
}
