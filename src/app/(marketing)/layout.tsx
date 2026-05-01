import { SiteHeader } from "@/components/organisms/SiteHeader";
import { SiteFooter } from "@/components/organisms/SiteFooter";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="v2-scope">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
