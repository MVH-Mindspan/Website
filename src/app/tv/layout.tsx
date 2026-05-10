import type { Metadata } from "next";
import "./tv.css";

export const metadata: Metadata = {
  title: "Mindspan",
  robots: { index: false, follow: false, nocache: true },
};

export default function TvLayout({ children }: { children: React.ReactNode }) {
  return <div className="tv-root">{children}</div>;
}
