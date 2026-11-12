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
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function Home() {
  const [introCompleted, setIntroCompleted] = useState(false);
  const [bgmActive, setBgmActive] = useState(false);
  const [celebrationActive, setCelebrationActive] = useState(false);
  const celebrationFiredRef = React.useRef(false);
  const bgmTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleScratchSuccess = React.useCallback(() => {
    if (celebrationFiredRef.current) return;
    celebrationFiredRef.current = true;
    setCelebrationActive(true);
  }, []);

  const handleTransitionStart = React.useCallback(() => {
    // 2.5s calm gap between Audio 1 fading out and Audio 2 starting
    if (bgmTimerRef.current) clearTimeout(bgmTimerRef.current);
    bgmTimerRef.current = setTimeout(() => {
      if (typeof document !== "undefined" && !document.hidden && document.visibilityState === "visible") {
        setBgmActive(true);
      }
      bgmTimerRef.current = null;
    }, 2500);
  }, []);

  // Strict page visibility & lifecycle control for background audio scheduling
  React.useEffect(() => {
    const handleInactive = () => {
      if (bgmTimerRef.current) {
        clearTimeout(bgmTimerRef.current);
        bgmTimerRef.current = null;
      }
      setBgmActive(false);
    };

    const handleVisibilityChange = () => {
      if (document.hidden || document.visibilityState === "hidden") {
        handleInactive();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handleInactive);
    window.addEventListener("blur", handleInactive);
    window.addEventListener("freeze", handleInactive);
    window.addEventListener("beforeunload", handleInactive);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handleInactive);
      window.removeEventListener("blur", handleInactive);
      window.removeEventListener("freeze", handleInactive);
      window.removeEventListener("beforeunload", handleInactive);
      if (bgmTimerRef.current) {
        clearTimeout(bgmTimerRef.current);
        bgmTimerRef.current = null;
      }
    };
  }, []);

  const handleReplayIntro = React.useCallback(() => {
    if (bgmTimerRef.current) {
      clearTimeout(bgmTimerRef.current);
      bgmTimerRef.current = null;
    }
    setBgmActive(false);
    setIntroCompleted(false);
  }, []);

  return (
    <main translate="no" className="notranslate min-h-screen bg-gradient-to-b from-[#FDF0F3] via-[#FAF3F5] to-[#F5E6EB] flex items-center justify-center p-0 md:py-8">
      
      {/* Centered 9:16 Mobile Portrait Showcase Frame on Desktop / Full Screen on Mobile */}
      <div translate="no" className="notranslate relative w-full h-full max-w-[430px] min-h-screen md:min-h-[880px] md:max-h-[92vh] md:aspect-[9/16] bg-[#FFF8F0] md:rounded-[36px] md:border-4 md:border-[#D4AF37]/65 shadow-[0_16px_48px_rgba(107,29,47,0.12),0_0_24px_rgba(212,175,55,0.22)] overflow-x-hidden overflow-y-auto scroll-smooth">
        
        {/* Floating Ambient Particle Canvas */}
        <ErrorBoundary>
          <ParticleCanvas />
        </ErrorBoundary>

        {/* Floating Festive Audio Player (Controlled by Intro Transition & Top Button) */}
        <ErrorBoundary>
          <AudioPlayer autoPlay={bgmActive} />
        </ErrorBoundary>

        {/* Full-Page Celebration Fireworks Canvas (Triggered on Scratch Completion) */}
        <ErrorBoundary>
          <FullPageCelebration 
            active={celebrationActive} 
            onFinish={() => setCelebrationActive(false)} 
          />
        </ErrorBoundary>

        {/* Exact Invitation Flow */}
        <div className="relative z-10 flex flex-col">
          
          {/* 2. Baby Jeeshika Video Homepage (Activated only after intro transition to prevent dual video lag) */}
          <HeroSection active={introCompleted} />

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
          <ErrorBoundary>
            <IntroScreen 
              onTransitionStart={handleTransitionStart}
              onComplete={() => setIntroCompleted(true)} 
            />
          </ErrorBoundary>
        )}

      </div>

    </main>
  );
}
