"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Procedurally generated magical ambient loop + crunch click SFX using the
 * WebAudio API (no external assets needed). A toggle button floats in the
 * bottom-right so the user can opt in — browsers block autoplay on load.
 */
export default function SoundSystem() {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const ambientStopRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!enabled) {
      ambientStopRef.current?.();
      ambientStopRef.current = null;
      return;
    }

    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new AC();
    ctxRef.current = ctx;

    // ---- Magical ambient pad ----
    const master = ctx.createGain();
    master.gain.value = 0.12;
    master.connect(ctx.destination);

    const freqs = [196.0, 261.63, 329.63, 392.0, 523.25]; // G3, C4, E4, G4, C5
    const oscs: OscillatorNode[] = [];
    const gains: GainNode[] = [];
    freqs.forEach((f, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = i % 2 === 0 ? "sine" : "triangle";
      o.frequency.value = f;
      o.detune.value = (Math.random() - 0.5) * 12;
      g.gain.value = 0;
      o.connect(g);
      g.connect(master);
      o.start();
      oscs.push(o);
      gains.push(g);
    });

    // Slow breathing envelope
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.08;
    lfoGain.gain.value = 0.08;
    lfo.connect(lfoGain);
    gains.forEach((g) => lfoGain.connect(g.gain));
    // Set baseline
    gains.forEach((g) => (g.gain.value = 0.1));
    lfo.start();

    // Sparkle arpeggio every few seconds
    const scale = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    let arpInterval: ReturnType<typeof setInterval> | null = setInterval(() => {
      const start = ctx.currentTime;
      scale.forEach((f, i) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sine";
        o.frequency.value = f * (Math.random() < 0.5 ? 1 : 2);
        const t = start + i * 0.12;
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.05, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
        o.connect(g);
        g.connect(master);
        o.start(t);
        o.stop(t + 0.6);
      });
    }, 7000);

    ambientStopRef.current = () => {
      if (arpInterval) clearInterval(arpInterval);
      arpInterval = null;
      oscs.forEach((o) => {
        try {
          o.stop();
        } catch {}
      });
      lfo.stop();
      ctx.close();
    };

    return () => {
      ambientStopRef.current?.();
      ambientStopRef.current = null;
    };
  }, [enabled]);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={() => setEnabled((v) => !v)}
      className="fixed bottom-5 right-5 z-[300] flex h-14 w-14 items-center justify-center rounded-full glass-card text-2xl shadow-[0_0_30px_rgba(197,91,255,0.55)]"
      aria-label={enabled ? "Mute ambient" : "Enable ambient"}
      title={enabled ? "Mute magical ambient" : "Enable magical ambient"}
    >
      <span className="drop-shadow-[0_0_8px_#ffd93d]">{enabled ? "🔊" : "🔈"}</span>
    </motion.button>
  );
}

/**
 * Fire a tiny "crunch/pop" click via a shared AudioContext. Safe to call on
 * every button click; no-ops if audio hasn't been unlocked yet.
 */
let clickCtx: AudioContext | null = null;
export function playClick(variant: "pop" | "crunch" | "mystic" = "pop") {
  if (typeof window === "undefined") return;
  try {
    if (!clickCtx) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      clickCtx = new AC();
    }
    const ctx = clickCtx;
    const now = ctx.currentTime;
    const g = ctx.createGain();
    g.connect(ctx.destination);

    if (variant === "crunch") {
      const buf = ctx.createBuffer(1, 0.2 * ctx.sampleRate, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2);
      }
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const hp = ctx.createBiquadFilter();
      hp.type = "highpass";
      hp.frequency.value = 1200;
      g.gain.value = 0.25;
      src.connect(hp);
      hp.connect(g);
      src.start(now);
      src.stop(now + 0.2);
    } else if (variant === "mystic") {
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.setValueAtTime(880, now);
      o.frequency.exponentialRampToValueAtTime(1760, now + 0.25);
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(0.2, now + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      o.connect(g);
      o.start(now);
      o.stop(now + 0.4);
    } else {
      const o = ctx.createOscillator();
      o.type = "triangle";
      o.frequency.setValueAtTime(1200, now);
      o.frequency.exponentialRampToValueAtTime(400, now + 0.1);
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(0.18, now + 0.005);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      o.connect(g);
      o.start(now);
      o.stop(now + 0.15);
    }
  } catch {
    // noop — audio not allowed yet
  }
}
