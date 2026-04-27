"use client";

import { motion } from "framer-motion";
import MagicButton from "../ui/MagicButton";
import CerealLoop from "../ui/CerealLoop";
import { playClick } from "../effects/SoundSystem";

export default function Hero() {
  const onEnter = () => {
    playClick("mystic");
    document.getElementById("prophecy")?.scrollIntoView({ behavior: "smooth" });
  };
  const onSummon = () => {
    playClick("pop");
    document.getElementById("chaos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-center justify-center px-6 pt-24 pb-16"
    >
      {/* Central halo */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[90vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,217,61,0.35) 0%, rgba(197,91,255,0.22) 35%, rgba(0,0,0,0) 70%)",
          filter: "blur(20px)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orbiting loops around the title */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2">
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <motion.div
            key={deg}
            className="absolute left-1/2 top-1/2"
            style={{ transformOrigin: "0 0" }}
            animate={{ rotate: [deg, deg + 360] }}
            transition={{
              duration: 22 + i * 1.4,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div
              style={{
                transform: `translate(-50%, -50%) translateX(${
                  26 + i * 1.5
                }vmin)`,
              }}
            >
              <CerealLoop
                size={48 + (i % 3) * 14}
                color={
                  ["#ffd93d", "#ff3b5c", "#3bff9a", "#3bb6ff", "#c55bff", "#ff8a1f"][i]
                }
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="mb-4 inline-flex items-center gap-3 rounded-full glass-card px-5 py-2 font-display text-sm uppercase tracking-[0.35em] text-white/90"
        >
          <span className="h-2 w-2 rounded-full bg-cereal-green shadow-[0_0_10px_#3bff9a] animate-pulse" />
          Live from the Cereal Dimension
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="font-display text-[14vw] leading-[0.9] tracking-tight text-gradient-rainbow text-glow sm:text-8xl md:text-[8rem] lg:text-[11rem]"
          style={{ letterSpacing: "-0.02em" }}
        >
          CEREAL
          <br />
          <span className="inline-block">CAT WIZARD</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="mt-6 font-display text-lg uppercase tracking-[0.45em] text-white/90 text-glow-soft md:text-2xl"
        >
          The Prophecy of the Crunch
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-5"
        >
          <MagicButton variant="primary" size="lg" icon={<span>🪄</span>} onClick={onEnter}>
            Enter the Cereal Realm
          </MagicButton>
          <MagicButton variant="secondary" size="lg" icon={<span>🥣</span>} onClick={onSummon}>
            Summon the Bowl
          </MagicButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.2 }}
          className="mt-16 flex flex-col items-center gap-2 text-white/80"
        >
          <span className="font-display text-xs uppercase tracking-[0.4em]">
            Scroll for prophecy
          </span>
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="text-2xl"
          >
            ⌄
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
