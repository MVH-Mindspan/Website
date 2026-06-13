import type { CSSProperties, ReactNode } from "react";
import { grid } from "@/lib/tokens";

/**
 * Modular column grid (Mueller-Brockmann / International Typographic Style).
 *
 * `Grid` is a single-column stack below `md` and a real `grid.columns`-column
 * field at `md` and up; `GridCol` places a child by column line via `span`
 * (and optional `start`) so every heading, lede, and card snaps to the same
 * lines. Both read the shared gutter from `grid.columnGap` (one source of
 * truth), matching the existing `md:grid-cols-12` idiom in the section organisms.
 *
 * NOTE: Tailwind v4 only keeps class names it can see as literal strings, so the
 * span/start utilities live in the lookup maps below (a template like
 * `md:col-span-${n}` would be purged from the production stylesheet).
 */
const SPAN: Record<number, string> = {
  4: "md:col-span-4",
  5: "md:col-span-5",
  6: "md:col-span-6",
  7: "md:col-span-7",
  8: "md:col-span-8",
  12: "md:col-span-12",
};

const START: Record<number, string> = {
  1: "md:col-start-1",
  7: "md:col-start-7",
};

export function Grid({
  children,
  className,
  style,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "section" | "ul" | "ol";
}) {
  return (
    <Tag
      className={`grid grid-cols-1 md:grid-cols-12 ${className ?? ""}`.trim()}
      style={{
        columnGap: grid.columnGap,
        rowGap: grid.columnGap,
        minWidth: 0,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

export function GridCol({
  span,
  start,
  className,
  style,
  children,
  as: Tag = "div",
}: {
  /** Columns to span at `md`+ (one of the keys in SPAN). Full width below `md`. */
  span: keyof typeof SPAN;
  /** Optional starting column line at `md`+ (one of the keys in START). */
  start?: keyof typeof START;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  as?: "div" | "section" | "article" | "p" | "h2" | "li";
}) {
  const classes = [SPAN[span], start ? START[start] : "", className ?? ""]
    .filter(Boolean)
    .join(" ");
  return (
    <Tag className={classes} style={{ minWidth: 0, ...style }}>
      {children}
    </Tag>
  );
}
