"use client";

import { motion } from "framer-motion";
import MagicButton from "../ui/MagicButton";
import GlowCard from "../ui/GlowCard";
import { useChaos } from "../effects/ChaosFX";
import { playClick } from "../effects/SoundSystem";

export default function ChaosButtons() {
  const { trigger } = useChaos();

  const buttons = [
    {
      label: "Cast Crunchstorm",
      icon: "🌧",
      desc: "Rain cereal upon thine browser for 3 seconds.",
      action: () => {
        playClick("crunch");
        trigger("crunchstorm");
      },
      variant: "primary" as const,
    },
    {
      label: "Pour the Holy Milk",
      icon: "🥛",
      desc: "A creamy wave floods the screen from above.",
      action: () => {
        playClick("pop");
        trigger("holymilk");
      },
      variant: "ghost" as const,
    },
    {
      label: "Bless This Portfolio",
      icon: "💚",
      desc: "Emerald flash of supposed green candles.",
      action: () => {
        playClick("mystic");
        trigger("bless");
      },
      variant: "secondary" as const,
    },
    {
      label: "Summon Loops",
      icon: "🌀",
      desc: "Spawn extra loops into the ambient swarm.",
      action: () => {
        playClick("pop");
        trigger("summon");
      },
      variant: "danger" as const,
    },
  ];

  return (
    <section
      id="chaos"
      className="relative w-full px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14 text-center"
        >
          <h2 className="font-display text-5xl uppercase tracking-tight text-gradient-rainbow text-glow md:text-7xl">
            Ritual Panel
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/80 md:text-lg">
            Cast chaos spells. The wizard encourages excess. Click often. Click
            all of them at once if thou art brave.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {buttons.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7 }}
            >
              <GlowCard className="flex h-full flex-col items-center text-center">
                <div className="text-5xl">{b.icon}</div>
                <p className="mt-4 font-display text-sm uppercase tracking-[0.3em] text-white/70">
                  Ritual {i + 1}
                </p>
                <p className="mt-2 min-h-[48px] text-white/85">{b.desc}</p>
                <div className="mt-6">
                  <MagicButton variant={b.variant} size="md" onClick={b.action}>
                    {b.label}
                  </MagicButton>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
