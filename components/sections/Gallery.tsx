"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { playClick } from "../effects/SoundSystem";

type Piece = {
  id: number;
  title: string;
  caption: string;
  gradient: string;
  emoji: string;
};

const PIECES: Piece[] = [
  {
    id: 1,
    title: "The First Bowl",
    caption: "Painted by a milk-drunk acolyte, ~pre-breakfast.",
    gradient: "from-cereal-yellow via-cereal-orange to-cereal-red",
    emoji: "🥣",
  },
  {
    id: 2,
    title: "Whiskers of Destiny",
    caption: "Nine lives, nine loops, one choice.",
    gradient: "from-cereal-blue via-cereal-purple to-cereal-pink",
    emoji: "🐱",
  },
  {
    id: 3,
    title: "The Crunchstorm",
    caption: "Witnesses described it as deliciously loud.",
    gradient: "from-cereal-purple via-cereal-pink to-cereal-red",
    emoji: "🌩",
  },
  {
    id: 4,
    title: "Wizard, Mid-Spell",
    caption: "He pointed at the fridge. Milk appeared.",
    gradient: "from-cereal-green via-cereal-blue to-cereal-purple",
    emoji: "🪄",
  },
  {
    id: 5,
    title: "The Sacred Spoon",
    caption: "Bent slightly from the weight of prophecy.",
    gradient: "from-cereal-orange via-cereal-yellow to-cereal-green",
    emoji: "🥄",
  },
  {
    id: 6,
    title: "Heavenly Aisle 7",
    caption: "Cloud-stocked. Fiber-rich. Slightly haunted.",
    gradient: "from-cereal-pink via-cereal-orange to-cereal-yellow",
    emoji: "☁️",
  },
];

export default function Gallery() {
  const [active, setActive] = useState<Piece | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section id="gallery" className="relative w-full px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14 text-center"
        >
          <span className="font-display text-xs uppercase tracking-[0.5em] text-cereal-yellow text-glow">
            Holy Exhibit
          </span>
          <h2 className="mt-3 font-display text-5xl uppercase tracking-tight text-gradient-rainbow text-glow md:text-7xl">
            Temple of Crunch
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/80 md:text-lg">
            Six relics excavated from the cereal dimension. Click one to stare
            into its colorful soul.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PIECES.map((p, i) => (
            <motion.button
              key={p.id}
              initial={{ opacity: 0, y: 40, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
              whileHover={{ scale: 1.04, rotate: i % 2 === 0 ? 1.5 : -1.5 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                playClick("pop");
                setActive(p);
              }}
              className="group relative aspect-[4/5] overflow-hidden rounded-3xl text-left focus:outline-none focus:ring-4 focus:ring-cereal-yellow/60"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-90 transition-opacity group-hover:opacity-100`}
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.4),transparent_60%)]" />
              <div className="absolute inset-0 flex items-center justify-center text-[10rem] drop-shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[8deg]">
                {p.emoji}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-display text-xs uppercase tracking-[0.35em] text-white/70">
                  Relic #{p.id.toString().padStart(3, "0")}
                </p>
                <h3 className="mt-1 font-display text-2xl uppercase text-white text-glow">
                  {p.title}
                </h3>
              </div>
              <span className="pointer-events-none absolute -inset-[2px] rounded-3xl bg-rainbow-shimmer bg-[length:200%_auto] opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-70 animate-shimmer" />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 40, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ duration: 0.5, ease: [0.2, 1.2, 0.2, 1] }}
              className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="pointer-events-none absolute -inset-1 rounded-3xl bg-rainbow-shimmer bg-[length:200%_auto] opacity-90 blur-2xl animate-shimmer" />
              <div className="relative glass-card rounded-3xl p-8">
                <div
                  className={`mb-6 flex aspect-video items-center justify-center rounded-2xl bg-gradient-to-br ${active.gradient} text-[12rem]`}
                >
                  {active.emoji}
                </div>
                <span className="font-display text-xs uppercase tracking-[0.4em] text-cereal-yellow">
                  Relic #{active.id.toString().padStart(3, "0")}
                </span>
                <h3 className="mt-2 font-display text-4xl uppercase text-white text-glow">
                  {active.title}
                </h3>
                <p className="mt-3 text-white/90">{active.caption}</p>
                <button
                  onClick={() => {
                    playClick("pop");
                    setActive(null);
                  }}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 font-display text-sm uppercase tracking-[0.3em] text-white/90 transition hover:bg-white/25"
                >
                  Close the Vault
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
