"use client";

import { motion } from "framer-motion";

const LORE = [
  "In the first breakfast, when the bowls were empty and the skies were dry,",
  "one cat rose above the clouds — whiskers drenched in starlight,",
  "pawing at the boxes of forgotten grain.",
  "He spoke not in words, but in crunches.",
  "He spoke not in riddles, but in loops.",
  "And the loops, oh the loops, multiplied across the heavens.",
  "They called him WIZARD. They called him CAT. They called him…",
  "CEREAL.",
];

export default function LoreSection() {
  return (
    <section
      id="lore"
      className="relative w-full px-6 py-32"
    >
      <div className="relative mx-auto max-w-4xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-6 inline-block font-display text-xs uppercase tracking-[0.5em] text-cereal-yellow text-glow"
        >
          Chapter I · The Book of Crunch
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-14 font-display text-5xl uppercase tracking-tight text-gradient-rainbow text-glow md:text-7xl"
        >
          The Lore
        </motion.h2>

        <div className="space-y-5">
          {LORE.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: i * 0.08, duration: 0.9 }}
              className={`mx-auto max-w-3xl leading-relaxed text-white/90 md:text-2xl ${
                i === LORE.length - 1
                  ? "font-display text-5xl uppercase tracking-wide text-gradient-rainbow text-glow md:text-7xl"
                  : ""
              }`}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mx-auto mt-16 h-px w-48 bg-gradient-to-r from-transparent via-white/60 to-transparent"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-6 font-display text-xs uppercase tracking-[0.5em] text-white/60"
        >
          Translated from the Original Meow
        </motion.p>
      </div>
    </section>
  );
}
