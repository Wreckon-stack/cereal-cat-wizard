"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const FLOATERS = [
  "MEOW OF THE VOID",
  "CRUNCH IS ETERNAL",
  "THE BOWL SEES YOU",
  "MILK → DESTINY",
  "POUR THE SACRED",
  "THE LOOPS REMEMBER",
  "HE WHO CRUNCHES FIRST",
  "AWAKEN, BREAKFAST CHILD",
  "THE CAT HAS SPOKEN",
  "FIBER & WHOLE GRAIN",
  "ASCEND VIA SPOON",
  "PROPHECY: CEREAL",
];

type Floater = {
  id: number;
  text: string;
  left: number;
  top: number;
  rotate: number;
  hue: number;
};

let idc = 0;

export default function RandomProphecies() {
  const [items, setItems] = useState<Floater[]>([]);

  useEffect(() => {
    let alive = true;
    function spawnOne() {
      if (!alive) return;
      const f: Floater = {
        id: ++idc,
        text: FLOATERS[Math.floor(Math.random() * FLOATERS.length)],
        left: 10 + Math.random() * 80,
        top: 15 + Math.random() * 70,
        rotate: (Math.random() - 0.5) * 10,
        hue: Math.floor(Math.random() * 360),
      };
      setItems((prev) => [...prev, f]);
      const life = 2200 + Math.random() * 1600;
      setTimeout(() => {
        setItems((prev) => prev.filter((x) => x.id !== f.id));
      }, life);
    }

    const t = setInterval(spawnOne, 2600);
    const initial = setTimeout(spawnOne, 900);

    return () => {
      alive = false;
      clearInterval(t);
      clearTimeout(initial);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[15] overflow-hidden" aria-hidden>
      <AnimatePresence>
        {items.map((f) => (
          <motion.div
            key={f.id}
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.4, y: -30 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute font-display text-xl md:text-3xl uppercase tracking-widest text-stroke select-none"
            style={{
              left: `${f.left}%`,
              top: `${f.top}%`,
              transform: `rotate(${f.rotate}deg)`,
              color: `hsl(${f.hue},100%,72%)`,
              textShadow: `0 0 18px hsl(${f.hue},100%,60%), 0 0 36px hsl(${f.hue},100%,45%)`,
            }}
          >
            {f.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
