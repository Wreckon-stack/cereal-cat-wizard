import ParallaxBackground from "@/components/effects/ParallaxBackground";
import FloatingLoops from "@/components/effects/FloatingLoops";
import Sparkles from "@/components/effects/Sparkles";
import CursorTrail from "@/components/effects/CursorTrail";
import RandomProphecies from "@/components/effects/RandomProphecies";
import { ChaosProvider } from "@/components/effects/ChaosFX";
import ChaosSwarm from "@/components/effects/ChaosSwarm";
import SoundSystem from "@/components/effects/SoundSystem";
import { XCommunityFloating } from "@/components/ui/XCommunityButton";

import Hero from "@/components/sections/Hero";
import ProphecySection from "@/components/sections/ProphecySection";
import ChaosButtons from "@/components/sections/ChaosButtons";
import LoreSection from "@/components/sections/LoreSection";
import Gallery from "@/components/sections/Gallery";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <ChaosProvider>
      {/* Layered background effects */}
      <ParallaxBackground />
      <Sparkles density={1} zIndex={4} />
      <FloatingLoops count={22} seed={7} zIndex={10} />
      <ChaosSwarm />
      <RandomProphecies />
      <CursorTrail />
      <SoundSystem />
      <XCommunityFloating />

      {/* Main content */}
      <main className="relative z-40">
        <Hero />
        <ProphecySection />
        <ChaosButtons />
        <LoreSection />
        <Gallery />
        <FinalCTA />
      </main>
    </ChaosProvider>
  );
}
