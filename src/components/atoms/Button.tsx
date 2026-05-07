"use client";

import type { CSSProperties, ReactNode } from "react";
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { ease } from "@/lib/tokens";

type Variant = "primary" | "secondary" | "accent" | "ghostDark" | "ghostLight";
type Size = "sm" | "md" | "lg";

const sizeStyles: Record<Size, CSSProperties> = {
  sm: { padding: "12px 20px", fontSize: "0.875rem", minHeight: 44 },
  md: { padding: "14px 28px", fontSize: "0.9375rem", minHeight: 44 },
  lg: { padding: "16px 32px", fontSize: "1rem", minHeight: 48 },
};

type Props = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  iconRight?: ReactNode;
  target?: string;
  rel?: string;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  "aria-label"?: string;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  type = "button",
  iconRight,
  target,
  rel,
  disabled,
  className,
  style,
  "aria-label": ariaLabel,
}: Props) {
  const { theme } = useTheme();
  const c = theme.colors;

  const variantStyles: Record<Variant, CSSProperties> = {
    primary: { background: c.brandGreen, color: "#fff" },
    secondary: { background: "#fff", color: c.brandGreen },
    accent: { background: c.accent, color: "#fff" },
    ghostDark: {
      background: "transparent",
      color: c.ink,
      border: `1px solid ${alpha(c.ink, 0.25)}`,
    },
    ghostLight: {
      background: "transparent",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.35)",
    },
  };

  const baseStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontFamily: theme.fonts.body,
    fontWeight: 600,
    borderRadius: "10rem",
    transition: `transform 0.2s ${ease.standard}, background 0.25s ease, color 0.25s ease, box-shadow 0.25s ${ease.standard}`,
    textWrap: "balance",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    maxWidth: "100%",
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...style,
  };

  const content = (
    <>
      {children}
      {iconRight}
    </>
  );

  const hoverClass = disabled
    ? ""
    : "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]";
  const combined = `${hoverClass} ${className ?? ""}`.trim();

  if (href && !disabled) {
    // Treat anything that isn't relative, an in-page anchor, or a mindspan.co host as external.
    const isExternal =
      /^https?:\/\//i.test(href) && !/^https?:\/\/(www\.)?mindspan\.co(\/|$|\?|#)/i.test(href);
    const finalTarget = target ?? (isExternal ? "_blank" : undefined);
    // When opening in a new tab, always set rel for security; preserve any caller-supplied tokens.
    let finalRel = rel;
    if (finalTarget === "_blank") {
      const tokens = new Set((rel ?? "").split(/\s+/).filter(Boolean));
      tokens.add("noopener");
      tokens.add("noreferrer");
      finalRel = Array.from(tokens).join(" ");
    }

    return (
      <a
        href={href}
        onClick={onClick}
        target={finalTarget}
        rel={finalRel}
        aria-label={ariaLabel}
        className={combined}
        style={baseStyle}
      >
        {content}
      </a>
    );
  }

  // Disabled link: render as a non-interactive anchor with aria-disabled for AT.
  if (href && disabled) {
    return (
      <a
        role="link"
        aria-disabled="true"
        tabIndex={-1}
        aria-label={ariaLabel}
        className={combined}
        style={{ ...baseStyle, pointerEvents: "none" }}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      aria-label={ariaLabel}
      className={combined}
      style={baseStyle}
    >
      {content}
    </button>
  );
}
