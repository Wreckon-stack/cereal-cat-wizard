"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import MagicButton from "../ui/MagicButton";
import CerealLoop, { randomLoopColor } from "../ui/CerealLoop";
import { useChaos } from "../effects/ChaosFX";
import { playClick } from "../effects/SoundSystem";
import { XCommunityButton } from "../ui/XCommunityButton";
import ContractAddress from "../ui/ContractAddress";

type Burst = {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
};
let idc = 0;

export default function FinalCTA() {
  const [bursts, setBursts] = useState<Burst[]>([]);
  const { trigger } = useChaos();

  const onAscend = () => {
    playClick("mystic");
    trigger("bless");
    trigger("crunchstorm");
  };

  const onHoverBurst = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    const count = 8;
    const next: Burst[] = Array.from({ length: count }, (_, i) => ({
      id: ++idc,
      x: nx * 100 + (Math.random() - 0.5) * 10,
      y: ny * 100 + (Math.random() - 0.5) * 10,
      color: randomLoopColor(i),
      size: 22 + Math.random() * 30,
    }));
    setBursts((prev) => [...prev, ...next]);
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => !next.find((n) => n.id === b.id)));
    }, 900);
  };

  return (
    <section id="ascend" className="relative w-full px-6 py-32">
      <div
        className="relative mx-auto flex max-w-5xl flex-col items-center overflow-hidden rounded-[40px] px-6 py-24 text-center"
        onMouseMove={onHoverBurst}
      >
        {/* Outer shimmer frame */}
        <span
          className="pointer-events-none absolute -inset-1 rounded-[44px] bg-rainbow-shimmer bg-[length:200%_auto] opacity-80 blur-2xl animate-shimmer"
          aria-hidden
        />
        <span className="pointer-events-none absolute inset-0 rounded-[40px] glass-card" aria-hidden />

        {/* Hover particle bursts */}
        <AnimatePresence>
          {bursts.map((b) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1, y: -40 }}
              exit={{ opacity: 0, scale: 0.2 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="pointer-events-none absolute"
              style={{ left: `${b.x}%`, top: `${b.y}%` }}
            >
              <CerealLoop size={b.size} color={b.color} />
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10 mb-6 font-display text-xs uppercase tracking-[0.5em] text-cereal-yellow text-glow"
        >
          The Final Breakfast
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.2, 1, 0.2, 1] }}
          className="relative z-10 font-display text-7xl uppercase leading-none tracking-tight text-gradient-rainbow text-glow md:text-[12rem]"
        >
          The Bowl
          <br />
          Awaits
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative z-10 mx-auto mt-6 max-w-2xl text-white/90 md:text-xl"
        >
          You have walked the cloud aisles. You have consulted the wizard. Now
          lift thy spoon. The cereal cannot crunch itself.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative z-10 mt-12"
        >
          <div className="relative inline-block animate-pulse-glow rounded-full">
            <MagicButton variant="danger" size="xl" onClick={onAscend} icon={<span>🚀</span>}>
              Ascend Now
            </MagicButton>
          </div>
          <p className="mt-6 font-display text-xs uppercase tracking-[0.5em] text-white/60">
            (side effects: enlightenment, crumbs)
          </p>

          <div className="mt-12 w-full">
            <ContractAddress />
          </div>

          <div className="mt-10 flex flex-col items-center gap-3">
            <span className="font-display text-xs uppercase tracking-[0.5em] text-white/70">
              The Wizard Posts on X
            </span>
            <XCommunityButton size="lg" />
          </div>
        </motion.div>
      </div>

      <footer className="mt-20 text-center">
        <p className="font-display text-xs uppercase tracking-[0.4em] text-white/50">
          © The Cereal Wizard Cat Temple · Fiber &amp; Whole Grain Approved
        </p>
      </footer>
    </section>
  );
}
