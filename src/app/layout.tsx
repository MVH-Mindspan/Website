import type { Metadata } from "next";
import { PT_Serif, Bitter, Inter } from "next/font/google";
import "./globals.css";
import VersionToggle from "@/components/VersionToggle";

const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const bitter = Bitter({
  variable: "--font-bitter",
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cognitive Care & Dementia Specialists | Mindspan",
  description:
    "See a neurologist in weeks, not months. Expert Alzheimer\u2019s and dementia assessments, personalized care plans, and family support. Book a visit in MA or CA.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${ptSerif.variable} ${bitter.variable} ${inter.variable} antialiased`}
    >
      <body>
        {children}
        <VersionToggle />
      </body>
    </html>
  );
}
