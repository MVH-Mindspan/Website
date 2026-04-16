import type { CSSProperties } from "react";

export function Bullet({ color, style }: { color: string; style?: CSSProperties }) {
  return (
    <span
      className="mt-2 h-1.5 w-1.5 rounded-full flex-shrink-0"
      style={{ background: color, ...style }}
      aria-hidden="true"
    />
  );
}
