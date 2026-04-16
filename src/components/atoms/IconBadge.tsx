import type { CSSProperties, ReactNode } from "react";

export function IconBadge({
  children,
  background,
  color,
  size = 48,
  className,
  style,
}: {
  children: ReactNode;
  background: string;
  color: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: "1rem",
        background,
        color,
        flexShrink: 0,
        ...style,
      }}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}
