"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import MagicButton from "../ui/MagicButton";
import GlowCard from "../ui/GlowCard";
import { playClick } from "../effects/SoundSystem";

const PROPHECIES = [
  "THE BOWL SHALL OVERFLOW",
  "A GREEN CANDLE APPROACHES",
  "YOU WERE CHOSEN BEFORE BREAKFAST",
  "THE MILK OF DESTINY SWIRLS",
  "CRUNCH LOUDLY, THE WIZARD HEARS",
  "FIBER IS FOREVER",
  "YOUR SPOON WILL TREMBLE WITH TRUTH",
  "SEEK THE LOOP THAT DOES NOT FLOAT",
  "A SECOND BOWL IS A SECOND LIFE",
  "THE CEREAL DIMENSION REMEMBERS YOUR NAME",
  "NINE LIVES. NINE BOWLS. ONE DESTINY.",
  "BEWARE THE DRY SPOON",
  "BREAKFAST IS A PROMISE TO THE FUTURE",
  "THE SKY ITSELF IS FLAVORED",
  "THE CAT BLINKS. THE MARKET LISTENS.",
];

export default function ProphecySection() {
  const [prophecy, setProphecy] = useState<string | null>(null);
  const [spinId, setSpinId] = useState(0);

  const consult = () => {
    playClick("mystic");
    // pick a different prophecy than the last
    let next = PROPHECIES[Math.floor(Math.random() * PROPHECIES.length)];
    if (prophecy && PROPHECIES.length > 1) {
      while (next === prophecy) {
        next = PROPHECIES[Math.floor(Math.random() * PROPHECIES.length)];
      }
    }
    setProphecy(next);
    setSpinId((n) => n + 1);
  };

  return (
    <section
      id="prophecy"
      className="relative flex min-h-screen w-full items-center justify-center px-6 py-24"
    >
      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-6xl uppercase tracking-tight text-gradient-rainbow text-glow md:text-8xl"
        >
          Consult the Wizard
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-4 max-w-xl text-white/80 md:text-lg"
        >
          Press the crystal bowl. The wizard cat will transmit a fragment of
          the crunch prophecy directly into your mortal skull.
        </motion.p>

        <div className="mt-10">
          <MagicButton variant="danger" size="xl" onClick={consult} icon={<span>🔮</span>}>
            Consult the Wizard
          </MagicButton>
        </div>

        <div className="mt-14 w-full">
          <AnimatePresence mode="wait">
            {prophecy && (
              <motion.div
                key={spinId}
                initial={{ opacity: 0, scale: 0.6, rotate: -4, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.3, filter: "blur(14px)" }}
                transition={{ duration: 0.7, ease: [0.2, 1.2, 0.3, 1] }}
              >
                <GlowCard intense className="mx-auto max-w-3xl animate-pulse-glow">
                  <div className="flex flex-col items-center gap-4 px-4 py-6">
                    <span className="font-display text-xs uppercase tracking-[0.4em] text-cereal-yellow">
                      Prophecy Received
                    </span>
                    <p className="font-display text-3xl uppercase leading-tight tracking-wide text-white text-glow md:text-5xl">
                      &ldquo;{prophecy}&rdquo;
                    </p>
                    <span className="font-display text-xs uppercase tracking-[0.4em] text-white/60">
                      — the wizard, probably mid-crunch
                    </span>
                  </div>
                </GlowCard>
              </motion.div>
            )}
          </AnimatePresence>
          {!prophecy && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-display text-sm uppercase tracking-[0.4em] text-white/50"
            >
              (the bowl is silent… for now)
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
