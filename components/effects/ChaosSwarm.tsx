"use client";

import { useChaos } from "./ChaosFX";
import FloatingLoops from "./FloatingLoops";

/**
 * Renders an additional set of floating loops whenever the user has summoned
 * more via the chaos panel. Each increment adds ~12 loops (capped at 80).
 */
export default function ChaosSwarm() {
  const { extraLoops } = useChaos();
  if (extraLoops <= 0) return null;
  return <FloatingLoops count={extraLoops} seed={extraLoops + 101} zIndex={11} />;
}
