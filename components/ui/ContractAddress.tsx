"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { playClick } from "../effects/SoundSystem";

export const CONTRACT_ADDRESS =
  "GtsAamCFbVfxB5SVN2VAUMQBBd9jVnDdYNrvZSPwpump";

export const PUMPFUN_URL = `https://pump.fun/coin/${CONTRACT_ADDRESS}`;
export const DEXSCREENER_URL = `https://dexscreener.com/solana/${CONTRACT_ADDRESS}`;

function trim(addr: string) {
  if (addr.length <= 14) return addr;
  return `${addr.slice(0, 6)}…${addr.slice(-6)}`;
}

type Props = {
  variant?: "hero" | "compact";
  className?: string;
};

export default function ContractAddress({
  variant = "hero",
  className = "",
}: Props) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      playClick("mystic");
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // ignore
    }
  };

  if (variant === "compact") {
    return (
      <div
        className={`inline-flex items-center gap-2 rounded-full glass-card px-3 py-1.5 font-mono text-xs text-white/90 ${className}`}
      >
        <span className="font-display text-[10px] uppercase tracking-[0.3em] text-cereal-yellow">
          CA
        </span>
        <span>{trim(CONTRACT_ADDRESS)}</span>
        <button
          onClick={onCopy}
          className="ml-1 rounded-full bg-white/15 px-2 py-0.5 text-[10px] uppercase tracking-widest hover:bg-white/30 transition"
        >
          {copied ? "✓" : "Copy"}
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className={`relative mx-auto w-full max-w-2xl ${className}`}
    >
      <span
        className="pointer-events-none absolute -inset-1 rounded-3xl bg-rainbow-shimmer bg-[length:200%_auto] opacity-70 blur-xl animate-shimmer"
        aria-hidden
      />
      <div className="relative flex flex-col items-stretch gap-3 rounded-3xl glass-card p-4 md:flex-row md:items-center md:p-5">
        <div className="flex flex-col items-start gap-1 px-2">
          <span className="font-display text-[10px] uppercase tracking-[0.45em] text-cereal-yellow text-glow-soft">
            Contract Address
          </span>
          <span className="font-display text-[10px] uppercase tracking-[0.3em] text-white/60">
            Solana · pump.fun
          </span>
        </div>
        <div className="flex flex-1 items-center justify-between gap-3 rounded-2xl bg-black/40 px-4 py-3 ring-1 ring-white/15">
          <code className="break-all text-left font-mono text-xs text-white sm:text-sm md:text-base">
            {CONTRACT_ADDRESS}
          </code>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCopy}
            className="relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cereal-yellow via-cereal-orange to-cereal-red px-5 py-3 font-display text-xs uppercase tracking-[0.3em] text-black shadow-[0_8px_30px_rgba(255,138,31,0.55)] ring-2 ring-white/40"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="copied"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-center gap-1.5"
                >
                  ✓ Copied
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  Copy CA
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
          <motion.a
            href={PUMPFUN_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => playClick("pop")}
            className="inline-flex items-center justify-center rounded-full bg-white/15 px-4 py-3 font-display text-xs uppercase tracking-[0.3em] text-white ring-1 ring-white/30 hover:bg-white/25 transition"
            title="View on pump.fun"
          >
            pump.fun ↗
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
