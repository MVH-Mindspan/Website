import type { CSSProperties, ReactNode } from "react";
import { container } from "@/lib/tokens";

type Width = "default" | "wide" | "narrow" | "prose";

const widthMap: Record<Width, string> = {
  default: container.width,
  wide: container.widthWide,
  narrow: container.widthNarrow,
  prose: container.widthProse,
};

export function Container({
  children,
  width = "default",
  className,
  style,
  as: Tag = "div",
}: {
  children: ReactNode;
  width?: Width;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "section" | "header" | "footer" | "main" | "nav";
}) {
  return (
    <Tag
      className={className}
      style={{ maxWidth: widthMap[width], marginInline: "auto", ...style }}
    >
      {children}
    </Tag>
  );
}
