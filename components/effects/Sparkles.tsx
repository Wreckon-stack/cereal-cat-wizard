"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
};

/**
 * Lightweight canvas sparkle particle system.
 * Spawns a few particles per frame at random positions.
 */
export default function Sparkles({
  density = 0.9,
  zIndex = 5,
}: {
  density?: number;
  zIndex?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = (canvas.width = window.innerWidth * devicePixelRatio);
    let h = (canvas.height = window.innerHeight * devicePixelRatio);
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    const particles: Particle[] = [];

    function spawn() {
      const count = Math.max(1, Math.round(2 * density));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.8 * devicePixelRatio,
          vy: (Math.random() - 0.2) * -0.6 * devicePixelRatio,
          life: 0,
          maxLife: 60 + Math.random() * 80,
          size: (Math.random() * 2.4 + 0.8) * devicePixelRatio,
          hue: Math.floor(Math.random() * 360),
        });
      }
    }

    function drawStar(x: number, y: number, r: number, color: string) {
      if (!ctx) return;
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = color;
      ctx.shadowBlur = r * 6;
      ctx.shadowColor = color;
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const a = (i * Math.PI * 2) / 5 - Math.PI / 2;
        ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
        const a2 = a + Math.PI / 5;
        ctx.lineTo(Math.cos(a2) * r * 0.45, Math.sin(a2) * r * 0.45);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    function loop() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      if (Math.random() < 0.6) spawn();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.002 * devicePixelRatio;
        const t = p.life / p.maxLife;
        const alpha = Math.sin(t * Math.PI);
        drawStar(
          p.x,
          p.y,
          p.size * (0.7 + 0.5 * Math.sin(p.life * 0.18)),
          `hsla(${p.hue}, 100%, 75%, ${alpha})`
        );
        if (p.life >= p.maxLife) particles.splice(i, 1);
      }

      raf = requestAnimationFrame(loop);
    }

    function onResize() {
      w = canvas!.width = window.innerWidth * devicePixelRatio;
      h = canvas!.height = window.innerHeight * devicePixelRatio;
      canvas!.style.width = window.innerWidth + "px";
      canvas!.style.height = window.innerHeight + "px";
    }

    window.addEventListener("resize", onResize);
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0"
      style={{ zIndex }}
      aria-hidden
    />
  );
}
