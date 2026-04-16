import type { CSSProperties, ReactNode } from "react";
import { type, lineHeight } from "@/lib/tokens";

type Size = "lg" | "md" | "sm";

const sizeStyles: Record<Size, CSSProperties> = {
  lg: { fontSize: type.leadLg, lineHeight: lineHeight.lead },
  md: { fontSize: type.leadMd, lineHeight: lineHeight.lead },
  sm: { fontSize: type.bodySm, lineHeight: lineHeight.lead },
};

export function Lead({
  children,
  size = "lg",
  color,
  maxWidth = "62ch",
  className,
  style,
}: {
  children: ReactNode;
  size?: Size;
  color?: string;
  maxWidth?: string | number | false;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <p
      className={className}
      style={{
        ...sizeStyles[size],
        color,
        ...(maxWidth === false ? {} : { maxWidth }),
        ...style,
      }}
    >
      {children}
    </p>
  );
}
