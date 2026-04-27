"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

/**
 * Fullscreen fixed background with parallax + soft drifting clouds.
 * Loads /hero-bg.jpg directly; falls back to a painted sky if the image
 * errors out. Overlay is intentionally light — the image is the hero.
 */
export default function ParallaxBackground() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);
  const [errored, setErrored] = useState(false);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Sky fallback always rendered underneath so there's never a black flash */}
      <PaintedSky />

      {/* Primary image layer */}
      {!errored && (
        <motion.div
          style={{ y, scale }}
          className="absolute inset-0 will-change-transform"
        >
          <img
            src="/hero-bg.jpg"
            alt=""
            onError={() => setErrored(true)}
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
        </motion.div>
      )}

      {/* Soft drifting cloud streaks */}
      <div className="absolute inset-0 opacity-60 mix-blend-screen pointer-events-none">
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />
      </div>

      {/* Lighter top/bottom vignette for readability — NOT a dark veil */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,20,50,0.25) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 70%, rgba(20,8,40,0.55) 100%)",
        }}
      />

      <style jsx>{`
        .cloud {
          position: absolute;
          width: 70vw;
          height: 45vh;
          background: radial-gradient(
            ellipse at center,
            rgba(255, 255, 255, 0.5) 0%,
            rgba(255, 255, 255, 0) 70%
          );
          filter: blur(24px);
          will-change: transform;
        }
        .cloud-1 {
          top: -10vh;
          left: -20vw;
          animation: cloud-drift-1 65s linear infinite;
        }
        .cloud-2 {
          top: 35vh;
          left: 20vw;
          animation: cloud-drift-2 90s linear infinite;
        }
        .cloud-3 {
          top: 65vh;
          left: -30vw;
          animation: cloud-drift-1 80s linear infinite reverse;
        }
        @keyframes cloud-drift-1 {
          0% {
            transform: translateX(-10vw);
          }
          100% {
            transform: translateX(120vw);
          }
        }
        @keyframes cloud-drift-2 {
          0% {
            transform: translateX(-30vw) translateY(0);
          }
          50% {
            transform: translateX(40vw) translateY(-5vh);
          }
          100% {
            transform: translateX(120vw) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

function PaintedSky() {
  return (
    <div className="absolute inset-0" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #7cc0ff 0%, #b8e0ff 45%, #ffe5f2 80%, #ffd9e6 100%)",
        }}
      />
      {/* Sun halo */}
      <div
        className="absolute left-1/2 top-[14%] h-72 w-72 -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,240,180,0.95) 0%, rgba(255,200,120,0.5) 40%, rgba(255,200,120,0) 70%)",
          filter: "blur(4px)",
        }}
      />
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${(i * 11) % 100}%`,
            top: `${(i * 17) % 80}%`,
            width: `${140 + (i % 4) * 70}px`,
            height: `${80 + (i % 3) * 40}px`,
            background:
              "radial-gradient(ellipse, #fff 10%, rgba(255,255,255,0) 70%)",
            filter: "blur(10px)",
            opacity: 0.9,
          }}
        />
      ))}
    </div>
  );
}
