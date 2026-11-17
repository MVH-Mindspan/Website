import type { Viewport } from "next";
import "./watch.css";

// Unlisted films. Pages set noindex through buildMetadata; never add /watch
// to the sitemap, robots.txt (that would advertise it), nav or footer.
export const viewport: Viewport = {
  themeColor: "#083630",
  colorScheme: "dark",
};

export default function WatchLayout({ children }: { children: React.ReactNode }) {
  return <div className="watch-root">{children}</div>;
}
