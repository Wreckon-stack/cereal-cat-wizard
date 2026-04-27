"use client";

import { motion } from "framer-motion";
import { playClick } from "../effects/SoundSystem";

const X_COMMUNITY_URL =
  "https://x.com/i/communities/2038739179878633926";

export function XCommunityFloating() {
  return (
    <motion.a
      href={X_COMMUNITY_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => playClick("mystic")}
      initial={{ opacity: 0, y: -20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 240, damping: 18 }}
      whileHover={{ scale: 1.07, rotate: -2 }}
      whileTap={{ scale: 0.94 }}
      className="group fixed right-5 top-5 z-[300] flex items-center gap-2 rounded-full glass-card px-4 py-2.5 font-display text-xs uppercase tracking-[0.3em] text-white shadow-[0_0_30px_rgba(255,217,61,0.45)] hover:shadow-[0_0_45px_rgba(255,217,61,0.85)]"
      aria-label="Join the Cereal Wizard Cat community on X"
    >
      <span
        className="pointer-events-none absolute -inset-[2px] rounded-full bg-rainbow-shimmer bg-[length:200%_auto] opacity-50 blur-md transition-opacity duration-500 animate-shimmer group-hover:opacity-90"
        aria-hidden
      />
      <XLogo className="relative z-10 h-4 w-4" />
      <span className="relative z-10">Join the Cult</span>
    </motion.a>
  );
}

export function XCommunityButton({
  size = "lg",
}: {
  size?: "md" | "lg" | "xl";
}) {
  const sizeCls =
    size === "xl"
      ? "px-12 py-6 text-2xl"
      : size === "lg"
      ? "px-8 py-4 text-lg"
      : "px-6 py-3 text-base";

  return (
    <motion.a
      href={X_COMMUNITY_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => playClick("mystic")}
      whileHover={{ scale: 1.06, y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 320, damping: 18 }}
      className={`group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full font-display uppercase tracking-widest shadow-[0_10px_40px_rgba(0,0,0,0.45)] ring-2 ring-white/30 bg-black text-white ${sizeCls}`}
    >
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:translate-x-full group-hover:opacity-90" />
      <span className="pointer-events-none absolute -inset-1 -z-10 rounded-full bg-gradient-to-r from-cereal-yellow via-cereal-pink to-cereal-purple opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-90" />
      <XLogo className="relative z-10 h-5 w-5" />
      <span className="relative z-10">Join the X Community</span>
    </motion.a>
  );
}

export function XLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
