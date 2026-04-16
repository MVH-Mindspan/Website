import type { CSSProperties, ReactNode } from "react";

export function Pill({
  children,
  background,
  color,
  className,
  style,
}: {
  children: ReactNode;
  background?: string;
  color?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 12px",
        borderRadius: "10rem",
        fontSize: "0.8125rem",
        fontWeight: 600,
        background,
        color,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
