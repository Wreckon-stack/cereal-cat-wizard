"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import CerealLoop, { randomLoopColor } from "../ui/CerealLoop";

type Loop = {
  id: string;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
  rotate: number;
  driftX: number;
  driftY: number;
};

function makeLoop(i: number, seed = 0): Loop {
  const rnd = (k: number) => {
    const x = Math.sin((i + 1) * (k + 1) * 12.9898 + seed) * 43758.5453;
    return x - Math.floor(x);
  };
  return {
    id: `loop-${seed}-${i}`,
    left: rnd(1) * 100,
    top: rnd(2) * 100,
    size: 28 + rnd(3) * 60,
    delay: rnd(4) * 10,
    duration: 10 + rnd(5) * 14,
    color: randomLoopColor(Math.floor(rnd(6) * 7)),
    rotate: rnd(7) * 360,
    driftX: (rnd(8) - 0.5) * 120,
    driftY: (rnd(9) - 0.5) * 80,
  };
}

type Props = {
  count?: number;
  seed?: number;
  zIndex?: number;
};

/**
 * Continuous ambient cereal loops drifting across the screen.
 * Deterministic per seed so SSR doesn't mismatch.
 */
export default function FloatingLoops({ count = 22, seed = 0, zIndex = 10 }: Props) {
  const loops = useMemo(
    () => Array.from({ length: count }, (_, i) => makeLoop(i, seed)),
    [count, seed]
  );

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex }}
      aria-hidden
    >
      {loops.map((l) => (
        <motion.div
          key={l.id}
          initial={{
            x: 0,
            y: 0,
            rotate: l.rotate,
            opacity: 0,
          }}
          animate={{
            x: [0, l.driftX, -l.driftX * 0.6, 0],
            y: [0, l.driftY, l.driftY * 0.3, 0],
            rotate: [l.rotate, l.rotate + 360],
            opacity: [0, 0.95, 0.85, 0.95],
          }}
          transition={{
            duration: l.duration,
            delay: l.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute"
          style={{ left: `${l.left}%`, top: `${l.top}%` }}
        >
          <CerealLoop size={l.size} color={l.color} />
        </motion.div>
      ))}
    </div>
  );
}
