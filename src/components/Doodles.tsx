type SvgProps = {
  className?: string;
  color?: string;
};

export function StarDoodle({ className = "w-8 h-8", color = "#1a1814" }: SvgProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path
        d="M32 4 L36 24 L56 20 L40 34 L54 50 L32 40 L10 52 L24 34 L6 22 L28 24 Z"
        stroke={color}
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SparkDoodle({ className = "w-6 h-6", color = "#1a1814" }: SvgProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M24 4 v40 M8 24 h32 M12 12 l24 24 M36 12 L12 36" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function ArrowDoodle({ className = "w-16 h-10", color = "#5c49d4" }: SvgProps) {
  return (
    <svg className={className} viewBox="0 0 120 60" fill="none" aria-hidden="true">
      <path
        d="M8 38 C 28 12, 62 8, 96 28"
        stroke={color}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path d="M84 16 l18 14 -22 6" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CircleScribble({ className = "w-28 h-28", color = "#1a1814" }: SvgProps) {
  return (
    <svg className={className} viewBox="0 0 160 160" fill="none" aria-hidden="true">
      <path
        d="M82 18 C 128 22, 148 64, 140 100 C 132 138, 88 150, 52 138 C 16 124, 12 78, 28 46 C 44 16, 78 14, 108 28"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PaperPlane({ className = "w-16 h-16", color = "#5c49d4" }: SvgProps) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <path d="M8 40 L72 12 L40 68 L36 44 Z" fill={color} stroke="#1a1814" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M36 44 L72 12" stroke="#1a1814" strokeWidth="2.2" />
      <path d="M36 44 L40 68" stroke="#faf6ee" strokeWidth="1.6" />
    </svg>
  );
}

export function SmileDoodle({ className = "w-10 h-10", color = "#1a1814" }: SvgProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="22" cy="24" r="3" fill={color} />
      <circle cx="42" cy="24" r="3" fill={color} />
      <path d="M18 40 Q32 52 46 38" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

export function HeartDoodle({ className = "w-8 h-8", color = "#5c49d4" }: SvgProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path
        d="M32 54 C 10 38, 8 20, 20 14 C 28 10, 32 18, 32 18 C 32 18, 36 10, 44 14 C 56 20, 54 38, 32 54 Z"
        fill={color}
        stroke="#1a1814"
        strokeWidth="2.2"
      />
    </svg>
  );
}

export function Paperclip({ className = "w-8 h-12" }: SvgProps) {
  return (
    <svg className={className} viewBox="0 0 40 70" fill="none" aria-hidden="true">
      <path
        d="M14 24 v28 c0 8 12 8 12 0 V16 c0 -10 -16 -10 -16 0 v30 c0 14 22 14 22 0 V22"
        stroke="#9aa0a8"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CrownDoodle({ className = "w-10 h-8", color = "#f4d35e" }: SvgProps) {
  return (
    <svg className={className} viewBox="0 0 70 48" fill="none" aria-hidden="true">
      <path
        d="M8 38 L12 12 L26 26 L35 8 L46 26 L58 12 L62 38 Z"
        fill={color}
        stroke="#1a1814"
        strokeWidth="2.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TornEdge({
  fill = "#f3eee4",
  flip = false,
  className = "",
}: {
  fill?: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={`block w-full h-8 md:h-12 ${className}`}
      viewBox="0 0 1440 48"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ transform: flip ? "scaleY(-1)" : undefined }}
    >
      <path
        fill={fill}
        d="M0 18 C 18 8, 28 32, 46 20 C 64 8, 78 34, 96 18 C 118 4, 132 30, 154 16 C 176 4, 190 36, 214 20 C 236 6, 254 34, 276 18 C 298 4, 318 32, 340 16 C 364 2, 382 34, 406 18 C 428 6, 446 32, 470 18 C 494 4, 512 34, 536 16 C 560 2, 578 32, 602 18 C 626 4, 644 34, 668 16 C 692 2, 710 32, 734 18 C 758 4, 776 34, 800 16 C 824 2, 842 32, 866 18 C 890 4, 908 34, 932 16 C 956 2, 974 32, 998 18 C 1022 4, 1040 34, 1064 16 C 1088 2, 1106 32, 1130 18 C 1154 4, 1172 34, 1196 16 C 1220 2, 1238 32, 1262 18 C 1286 4, 1304 34, 1328 16 C 1352 2, 1370 32, 1394 18 C 1414 8, 1428 28, 1440 16 L1440 48 L0 48 Z"
      />
    </svg>
  );
}

export function BrushBlob({ className = "w-64 h-20" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 360 90" aria-hidden="true">
      <path
        d="M12 48 C 20 18, 70 22, 110 28 C 170 36, 210 14, 270 22 C 320 28, 348 18, 350 42 C 352 66, 310 78, 250 74 C 190 70, 150 82, 90 74 C 40 68, 8 72, 12 48 Z"
        fill="#1a1814"
      />
    </svg>
  );
}

export function UnderlineSquiggle({ className = "w-40 h-4", color = "#5c49d4" }: SvgProps) {
  return (
    <svg className={className} viewBox="0 0 200 16" fill="none" aria-hidden="true">
      <path
        className="draw-path"
        d="M4 10 C 30 4, 50 14, 76 8 C 102 2, 120 14, 148 8 C 168 4, 184 12, 196 7"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Lanyard({ className = "w-16 h-40" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 220" fill="none" aria-hidden="true">
      <path d="M28 0 C 18 70, 18 130, 28 210" stroke="#5c49d4" strokeWidth="14" strokeLinecap="round" />
      <path d="M52 0 C 62 70, 62 130, 52 210" stroke="#5c49d4" strokeWidth="14" strokeLinecap="round" />
      <rect x="22" y="198" width="36" height="16" rx="3" fill="#3e2eae" stroke="#1a1814" strokeWidth="1.5" />
    </svg>
  );
}
