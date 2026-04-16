import type { CSSProperties } from "react";
import { Bullet } from "@/components/atoms/Bullet";

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
  return (
    <ul
      className={`space-y-2.5 ${className ?? ""}`.trim()}
      style={{ color, ...style }}
    >
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <Bullet color={bulletColor} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
