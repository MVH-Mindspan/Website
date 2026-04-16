import type { CSSProperties, ReactNode } from "react";
import { type, lineHeight, tracking } from "@/lib/tokens";

type Variant = "display" | "h1" | "h2" | "h3" | "h4";

const variantStyles: Record<Variant, CSSProperties> = {
  display: {
    fontSize: type.display,
    lineHeight: lineHeight.display,
    letterSpacing: tracking.tight,
    fontWeight: 400,
  },
  h1: {
    fontSize: type.h1,
    lineHeight: lineHeight.h1,
    letterSpacing: tracking.display,
    fontWeight: 400,
  },
  h2: {
    fontSize: type.h2,
    lineHeight: lineHeight.h2,
    letterSpacing: tracking.tight,
    fontWeight: 400,
  },
  h3: {
    fontSize: type.h3,
    lineHeight: lineHeight.h3,
    letterSpacing: tracking.tight,
    fontWeight: 500,
  },
  h4: {
    fontSize: type.h4,
    lineHeight: lineHeight.h4,
    letterSpacing: tracking.tight,
    fontWeight: 500,
  },
};

export function Heading({
  children,
  as,
  variant = "h2",
  color,
  fontFamily,
  className,
  style,
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4";
  variant?: Variant;
  color?: string;
  fontFamily?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const Tag = as ?? (variant === "display" ? "h1" : (variant as "h1" | "h2" | "h3" | "h4"));
  return (
    <Tag
      className={className}
      style={{ ...variantStyles[variant], color, fontFamily, ...style }}
    >
      {children}
    </Tag>
  );
}
