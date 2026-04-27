"use client";

type Props = {
  size?: number;
  color?: string;
  hole?: string;
  className?: string;
};

const PALETTE = [
  "#ff3b5c",
  "#ff8a1f",
  "#ffd93d",
  "#3bff9a",
  "#3bb6ff",
  "#c55bff",
  "#ff6fd8",
];

export function randomLoopColor(seed?: number) {
  const i =
    typeof seed === "number"
      ? Math.abs(Math.floor(seed)) % PALETTE.length
      : Math.floor(Math.random() * PALETTE.length);
  return PALETTE[i];
}

export default function CerealLoop({
  size = 40,
  color = "#ffd93d",
  hole = "rgba(255,255,255,0.35)",
  className,
}: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={{ filter: `drop-shadow(0 0 10px ${color}aa)` }}
    >
      <defs>
        <radialGradient id={`g-${color}`} cx="35%" cy="35%" r="70%">
          <stop offset="0%" stopColor="white" stopOpacity="0.9" />
          <stop offset="25%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.85" />
        </radialGradient>
      </defs>
      <circle
        cx="50"
        cy="50"
        r="42"
        fill={`url(#g-${color})`}
        stroke={color}
        strokeWidth="2"
      />
      <circle cx="50" cy="50" r="16" fill={hole} />
      <circle
        cx="38"
        cy="38"
        r="5"
        fill="white"
        opacity="0.75"
      />
    </svg>
  );
}
