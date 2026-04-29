import type { CSSProperties } from "react";

export function Bullet({ color, style }: { color: string; style?: CSSProperties }) {
  return (
    <span
      className="mt-2.5 h-2 w-2 rounded-full flex-shrink-0"
      style={{ background: color, ...style }}
      aria-hidden="true"
    />
  );
}
