"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

type Variant = "primary" | "secondary" | "danger" | "ghost";

type Props = Omit<HTMLMotionProps<"button">, "children"> & {
  children: React.ReactNode;
  variant?: Variant;
  size?: "sm" | "md" | "lg" | "xl";
  icon?: React.ReactNode;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-cereal-yellow via-cereal-orange to-cereal-red text-black",
  secondary:
    "bg-gradient-to-r from-cereal-purple via-cereal-blue to-cereal-green text-black",
  danger:
    "bg-gradient-to-r from-cereal-red via-cereal-pink to-cereal-purple text-white",
  ghost:
    "bg-white/10 backdrop-blur-xl text-white border border-white/30",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
  xl: "px-12 py-6 text-2xl",
};

const MagicButton = forwardRef<HTMLButtonElement, Props>(function MagicButton(
  { children, variant = "primary", size = "md", icon, className = "", ...rest },
  ref
) {
  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.06, y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 320, damping: 18 }}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-display uppercase tracking-widest shadow-[0_10px_40px_rgba(197,91,255,0.45)] ring-2 ring-white/30 transition-colors ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {/* Shimmer sheen */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:translate-x-full group-hover:opacity-70" />
      {/* Glow on hover */}
      <span className="pointer-events-none absolute -inset-1 -z-10 rounded-full bg-gradient-to-r from-cereal-yellow via-cereal-pink to-cereal-purple opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-80" />
      {icon ? <span className="text-xl">{icon}</span> : null}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
});

export default MagicButton;
