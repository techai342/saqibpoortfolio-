import type { CSSProperties } from "react";

type TapeProps = {
  className?: string;
  rotate?: number;
  width?: number;
  style?: CSSProperties;
};

export default function Tape({ className = "", rotate = -12, width = 86, style }: TapeProps) {
  return (
    <span
      className={`tape ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, width, ...style }}
      aria-hidden="true"
    />
  );
}
