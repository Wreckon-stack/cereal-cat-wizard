"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type Props = HTMLMotionProps<"div"> & {
  children: React.ReactNode;
  intense?: boolean;
};

export default function GlowCard({
  children,
  intense,
  className = "",
  ...rest
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative rounded-3xl glass-card p-6 md:p-8 shadow-[0_20px_80px_rgba(197,91,255,0.25)] ${className}`}
      {...rest}
    >
      <span
        className={`pointer-events-none absolute -inset-[2px] rounded-3xl bg-rainbow-shimmer bg-[length:200%_auto] opacity-40 blur-md animate-shimmer ${
          intense ? "opacity-80" : ""
        }`}
        aria-hidden
      />
      <span className="pointer-events-none absolute inset-0 rounded-3xl border border-white/20" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
