import type { CSSProperties } from "react";
import { Bullet } from "@/components/atoms/Bullet";
import { linkifyNeurologists } from "@/lib/linkify";

export function BulletList({
  items,
  bulletColor,
  color,
  className,
  style,
}: {
  items: readonly string[];
  bulletColor: string;
  color?: string;
  className?: string;
  style?: CSSProperties;
}) {
  // Empty content should produce nothing, not a stray <ul>.
  if (!items || items.length === 0) return null;

  return (
    <ul
      className={`space-y-4 ${className ?? ""}`.trim()}
      style={{ color, ...style }}
    >
      {items.map((item, i) => (
        <li key={`${i}-${item.slice(0, 32)}`} className="flex items-start gap-3">
          <Bullet color={bulletColor} />
          {/* min-w-0 lets long words/URLs wrap inside narrow grid cells. */}
          <span className="min-w-0 break-words">{linkifyNeurologists(item)}</span>
        </li>
      ))}
    </ul>
  );
}
