# 🧙‍♂️🐱 CEREAL CAT WIZARD

A chaotic, magical, absurd meme website. Built with Next.js (App Router) +
Tailwind CSS + Framer Motion.

## Run it

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Drop the hero image

Place the provided cat/cereal reference image at `public/hero-bg.jpg` to use
it as the fullscreen parallax background. If absent, the site renders a
painted cloud + sun fallback automatically.

## What's inside

- **Hero** — giant rainbow title, halo glow, orbiting loops, two CTA buttons
- **Consult the Wizard** — randomized prophecy generator with mystical card
- **Ritual Panel** — chaos buttons: Crunchstorm, Holy Milk wave, Bless
  (green flash), Summon Loops (adds floating swarm)
- **Lore** — dramatic, fade-in breakfast origin myth
- **Temple of Crunch** — 6-tile gallery with hover zoom + modal relic viewer
- **The Bowl Awaits** — final CTA with particle burst on hover + Ascend

Global effects run over every section:

- Parallax fullscreen background with drifting clouds
- Floating cereal loops (Framer Motion, deterministic per seed)
- Sparkle canvas particle system
- Custom cursor trail (glowing stars + mini loops)
- Random prophecy texts drifting on-screen every few seconds
- Procedural WebAudio ambient loop + crunch/pop/mystic SFX (toggle in
  bottom-right)

## Structure

```
app/
  layout.tsx
  page.tsx
  globals.css
components/
  ui/            MagicButton, GlowCard, CerealLoop (SVG)
  effects/       ParallaxBackground, FloatingLoops, Sparkles, CursorTrail,
                 RandomProphecies, ChaosFX (provider), ChaosSwarm,
                 SoundSystem
  sections/      Hero, ProphecySection, ChaosButtons, LoreSection,
                 Gallery, FinalCTA
```
