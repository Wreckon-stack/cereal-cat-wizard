"use client";

import { useEffect, useRef } from "react";

type Trail = {
  x: number;
  y: number;
  life: number;
  maxLife: number;
  hue: number;
  size: number;
  shape: "star" | "loop";
};

/**
 * Replaces the cursor with a glowing cereal/star trail.
 */
export default function CursorTrail() {
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

    const trail: Trail[] = [];
    let mx = w / 2;
    let my = h / 2;
    let tx = mx;
    let ty = my;
    let lastSpawn = 0;
    let pressed = false;

    function onMove(e: MouseEvent) {
      mx = e.clientX * devicePixelRatio;
      my = e.clientY * devicePixelRatio;
    }
    function onDown() {
      pressed = true;
      for (let i = 0; i < 14; i++) {
        const a = (i / 14) * Math.PI * 2;
        trail.push({
          x: mx,
          y: my,
          life: 0,
          maxLife: 40,
          hue: Math.random() * 360,
          size: 6 * devicePixelRatio,
          shape: "star",
        });
        trail[trail.length - 1].x += Math.cos(a) * 4;
        trail[trail.length - 1].y += Math.sin(a) * 4;
      }
    }
    function onUp() {
      pressed = false;
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    function drawStar(
      x: number,
      y: number,
      r: number,
      color: string,
      shape: "star" | "loop"
    ) {
      if (!ctx) return;
      ctx.save();
      ctx.translate(x, y);
      ctx.shadowBlur = r * 3;
      ctx.shadowColor = color;
      if (shape === "loop") {
        ctx.strokeStyle = color;
        ctx.lineWidth = Math.max(1.5, r * 0.4);
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        ctx.fillStyle = color;
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const a = (i * Math.PI * 2) / 5 - Math.PI / 2;
          ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
          const a2 = a + Math.PI / 5;
          ctx.lineTo(Math.cos(a2) * r * 0.45, Math.sin(a2) * r * 0.45);
        }
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    }

    function loop(ts: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      // ease the trailing cursor "head"
      tx += (mx - tx) * 0.35;
      ty += (my - ty) * 0.35;

      if (ts - lastSpawn > 14) {
        trail.push({
          x: tx + (Math.random() - 0.5) * 10,
          y: ty + (Math.random() - 0.5) * 10,
          life: 0,
          maxLife: 32,
          hue: Math.floor(Math.random() * 360),
          size: (3 + Math.random() * 3) * devicePixelRatio,
          shape: Math.random() < 0.25 ? "loop" : "star",
        });
        lastSpawn = ts;
      }

      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.life++;
        const t = p.life / p.maxLife;
        const alpha = 1 - t;
        const r = p.size * (1 - t * 0.6);
        drawStar(p.x, p.y, r, `hsla(${p.hue}, 100%, 70%, ${alpha})`, p.shape);
        if (p.life >= p.maxLife) trail.splice(i, 1);
      }

      // Primary glowing cursor "wand" tip
      const tipR = (pressed ? 16 : 10) * devicePixelRatio;
      const tipColor = pressed ? "#ffd93d" : "#ffffff";
      drawStar(tx, ty, tipR, tipColor, "star");

      raf = requestAnimationFrame(loop);
    }

    function onResize() {
      w = canvas!.width = window.innerWidth * devicePixelRatio;
      h = canvas!.height = window.innerHeight * devicePixelRatio;
      canvas!.style.width = window.innerWidth + "px";
      canvas!.style.height = window.innerHeight + "px";
    }

    window.addEventListener("resize", onResize);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 9999 }}
      aria-hidden
    />
  );
}
