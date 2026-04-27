"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import CerealLoop, { randomLoopColor } from "../ui/CerealLoop";

type ChaosKind = "crunchstorm" | "holymilk" | "bless" | "summon";

type ChaosContextType = {
  trigger: (k: ChaosKind) => void;
  extraLoops: number;
};

const ChaosContext = createContext<ChaosContextType | null>(null);

export function useChaos() {
  const ctx = useContext(ChaosContext);
  if (!ctx) throw new Error("useChaos must be used within ChaosProvider");
  return ctx;
}

type FallingLoop = {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
  rotate: number;
};

let idc = 0;
function makeFalling(count: number): FallingLoop[] {
  return Array.from({ length: count }, () => ({
    id: ++idc,
    left: Math.random() * 100,
    size: 28 + Math.random() * 70,
    delay: Math.random() * 0.6,
    duration: 1.6 + Math.random() * 1.2,
    color: randomLoopColor(Math.floor(Math.random() * 7)),
    rotate: Math.random() * 360,
  }));
}

export function ChaosProvider({ children }: { children: React.ReactNode }) {
  const [storm, setStorm] = useState<FallingLoop[]>([]);
  const [milkOn, setMilkOn] = useState(false);
  const [bless, setBless] = useState(false);
  const [extraLoops, setExtraLoops] = useState(0);
  const stormTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const trigger = useCallback((k: ChaosKind) => {
    if (k === "crunchstorm") {
      setStorm(makeFalling(80));
      if (stormTimeout.current) clearTimeout(stormTimeout.current);
      stormTimeout.current = setTimeout(() => setStorm([]), 3200);
    } else if (k === "holymilk") {
      setMilkOn(true);
      setTimeout(() => setMilkOn(false), 1800);
    } else if (k === "bless") {
      setBless(true);
      setTimeout(() => setBless(false), 1400);
    } else if (k === "summon") {
      setExtraLoops((n) => Math.min(n + 12, 80));
    }
  }, []);

  const value = useMemo(() => ({ trigger, extraLoops }), [trigger, extraLoops]);

  return (
    <ChaosContext.Provider value={value}>
      {children}

      {/* Crunchstorm overlay */}
      <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden" aria-hidden>
        <AnimatePresence>
          {storm.map((l) => (
            <motion.div
              key={l.id}
              initial={{ y: "-20vh", rotate: l.rotate, opacity: 0 }}
              animate={{
                y: "110vh",
                rotate: l.rotate + 720,
                opacity: [0, 1, 1, 0.9],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: l.duration,
                delay: l.delay,
                ease: "easeIn",
              }}
              className="absolute"
              style={{ left: `${l.left}vw` }}
            >
              <CerealLoop size={l.size} color={l.color} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Holy milk wave */}
      <AnimatePresence>
        {milkOn && (
          <motion.div
            key="milk"
            className="pointer-events-none fixed inset-0 z-[70]"
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0 0 0 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            aria-hidden
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0) 100%)",
                backdropFilter: "blur(2px)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(255,240,200,0.5) 0%, rgba(255,240,200,0) 70%)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Green bless flash */}
      <AnimatePresence>
        {bless && (
          <motion.div
            key="bless"
            className="pointer-events-none fixed inset-0 z-[70]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0.2, 0.5, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, times: [0, 0.2, 0.5, 0.8, 1] }}
            aria-hidden
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(60,255,154,0.7) 0%, rgba(60,255,154,0.2) 40%, rgba(0,0,0,0) 80%)",
              }}
            />
            <div
              className="absolute inset-0 mix-blend-screen"
              style={{ background: "rgba(60,255,154,0.25)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </ChaosContext.Provider>
  );
}
