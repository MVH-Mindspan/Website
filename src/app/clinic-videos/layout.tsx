import type { Viewport } from "next";
import "../watch/watch.css";
import "./clinic-videos.css";

// Staff video library for clinic TVs. Pages set noindex through
// buildMetadata; never add /clinic-videos to the sitemap, robots.txt, nav
// or footer.
export const viewport: Viewport = {
  themeColor: "#083630",
  colorScheme: "dark",
};

export default function ClinicVideosLayout({ children }: { children: React.ReactNode }) {
  return <div className="watch-root">{children}</div>;
}
