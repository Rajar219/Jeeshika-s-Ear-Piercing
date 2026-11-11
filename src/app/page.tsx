"use client";

import React, { useState } from "react";
import { IntroScreen } from "@/components/IntroScreen";
import { HeroSection } from "@/components/HeroSection";
import { ScratchToReveal } from "@/components/ScratchToReveal";
import { FullPageCelebration } from "@/components/FullPageCelebration";
import { EventDetailsSection } from "@/components/EventDetailsSection";
import { VerseSection } from "@/components/VerseSection";
import { GrandparentsSection } from "@/components/GrandparentsSection";
import { FamilySection } from "@/components/FamilySection";
import { ClosingSection } from "@/components/ClosingSection";
import { ParticleCanvas } from "@/components/ParticleCanvas";
import { AudioPlayer } from "@/components/AudioPlayer";
import { BotanicalVineConnector } from "@/components/FloralDecorations";

export default function Home() {
  const [introCompleted, setIntroCompleted] = useState(false);
  const [bgmActive, setBgmActive] = useState(false);
  const [celebrationActive, setCelebrationActive] = useState(false);
  const [celebrationFired, setCelebrationFired] = useState(false);

  const handleScratchSuccess = () => {
    if (celebrationFired) return;
    setCelebrationFired(true);
    setCelebrationActive(true);
  };

  const handleReplayIntro = () => {
    setBgmActive(false);
    setIntroCompleted(false);
  };

  return (
    <main className="min-h-screen bg-[#0d040a] flex items-center justify-center p-0 md:py-8">
      
      {/* Centered 9:16 Mobile Portrait Showcase Frame on Desktop / Full Screen on Mobile */}
      <div className="relative w-full h-full max-w-[430px] min-h-screen md:min-h-[880px] md:max-h-[92vh] md:aspect-[9/16] bg-[#FFF8F0] md:rounded-[36px] md:border-4 md:border-[#D4AF37]/65 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.8),0_0_40px_rgba(212,175,55,0.3)] overflow-x-hidden overflow-y-auto scroll-smooth">
        
        {/* Floating Ambient Particle Canvas */}
        <ParticleCanvas />

        {/* Floating Festive Audio Player (Controlled by Intro Transition & Top Button) */}
        <AudioPlayer autoPlay={bgmActive} />

        {/* Full-Page Celebration Fireworks Canvas (Triggered on Scratch Completion) */}
        <FullPageCelebration 
          active={celebrationActive} 
          onFinish={() => setCelebrationActive(false)} 
        />

        {/* Exact Invitation Flow */}
        <div className="relative z-10 flex flex-col">
          
          {/* 2. Baby Jeeshika Video Homepage */}
          <HeroSection />

          <BotanicalVineConnector />

          {/* 3. Scratch to Reveal Date Section */}
          <ScratchToReveal onCelebrationTrigger={handleScratchSuccess} />

          <BotanicalVineConnector />

          {/* 5. The Celebration Event Details (Tamil & English) */}
          <EventDetailsSection />

          <BotanicalVineConnector />

          {/* 6. Tamil and English Invitation Messages */}
          <VerseSection />

          <BotanicalVineConnector />

          {/* 7. Grandparents' Blessings */}
          <GrandparentsSection />

          <BotanicalVineConnector />

          {/* 8. Family Details & Warm Regards */}
          <FamilySection />

          <BotanicalVineConnector />

          {/* 9. Premium Closing Section */}
          <ClosingSection onReplay={handleReplayIntro} />
        </div>

        {/* 1. Cinematic Heart-Seal Intro Overlay */}
        {!introCompleted && (
          <IntroScreen 
            onTransitionStart={() => setBgmActive(true)}
            onComplete={() => setIntroCompleted(true)} 
          />
        )}

      </div>

    </main>
  );
}
