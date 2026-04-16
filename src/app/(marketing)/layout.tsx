"use client";

import { useTheme } from "@/lib/theme-context";
import { SiteHeader } from "@/components/organisms/SiteHeader";
import { SiteFooter } from "@/components/organisms/SiteFooter";
import { StyleSwitcher } from "@/components/dev/StyleSwitcher";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  const isLegacy = theme.structure === "v1";

  return (
    <div className={isLegacy ? undefined : "v2-scope"}>
      {!isLegacy && <SiteHeader />}
      <main>{children}</main>
      {!isLegacy && <SiteFooter />}
      <StyleSwitcher />
    </div>
  );
}
