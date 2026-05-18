import type { Metadata, Viewport } from "next";
import { PT_Serif, Inter, EB_Garamond, Figtree } from "next/font/google";
import { ThemeProvider } from "@/lib/theme-context";
import { PostHogProvider } from "@/components/PostHogProvider";
import { ConsoleSignature } from "@/components/dev/ConsoleSignature";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Cognitive Care & Dementia Specialists | Mindspan",
  description:
    "See a neurologist in weeks, not months. Expert Alzheimer’s and dementia assessments, personalized care plans, and family support. Book a visit in MA or CA.",
  formatDetection: {
    telephone: true,
    email: true,
    address: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBF7F0" },
    { media: "(prefers-color-scheme: dark)", color: "#201E17" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${ptSerif.variable} ${inter.variable} ${ebGaramond.variable} ${figtree.variable} antialiased`}
    >
      <body style={{ background: "#FBF7F0" }}>
        <PostHogProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </PostHogProvider>
        <ConsoleSignature />
      </body>
    </html>
  );
}
