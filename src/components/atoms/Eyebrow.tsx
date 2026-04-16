import type { CSSProperties, ReactNode } from "react";
import { tracking } from "@/lib/tokens";

export function Eyebrow({
  children,
  color,
  className,
  style,
}: {
  children: ReactNode;
  color?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <p
      className={className}
      style={{
        fontWeight: 600,
        fontSize: "0.8125rem",
        letterSpacing: tracking.eyebrow,
        textTransform: "uppercase",
        color,
        ...style,
      }}
    >
      {children}
    </p>
  );
}
