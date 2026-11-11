"use client";

import React, { useRef, useState, useEffect } from "react";
import { INVITATION_CONFIG } from "@/config/invitation";

interface IntroScreenProps {
  onComplete: () => void;
  onTransitionStart?: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete, onTransitionStart }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audio1Ref = useRef<HTMLAudioElement | null>(null);
  const fadeOutTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isOpened, setIsOpened] = useState(false);
  const [flashActive, setFlashActive] = useState(false);
  const [videoFading, setVideoFading] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    let audio: HTMLAudioElement | null = null;
    try {
      audio = new Audio("/audio 1.mp3");
      audio.preload = "auto";
      try { audio.volume = 0.5; } catch (_) {}
      audio1Ref.current = audio;
    } catch (e) {
      console.warn("Audio 1 init error:", e);
    }

    const video = videoRef.current;
    if (video) {
      try {
        video.currentTime = 0;
        video.pause();
      } catch (_) {}
    }

    return () => {
      if (fadeOutTimerRef.current) {
        clearInterval(fadeOutTimerRef.current);
      }
      if (audio) {
        try { audio.pause(); } catch (_) {}
      }
      audio1Ref.current = null;
    };
  }, []);

  const handleOpen = () => {
    if (isOpened) return;
    setIsOpened(true);

    // Play Audio 1 immediately from user touch/click gesture
    if (audio1Ref.current) {
      audio1Ref.current.currentTime = 0;
      audio1Ref.current.play().catch((err) => console.warn("Audio 1 playback:", err));
    }

    const video = videoRef.current;
    if (!video) {
      triggerFlashAndComplete();
      return;
    }

    // Play video
    video.play().catch((err) => {
      console.warn("Video playback blocked or failed:", err);
      setVideoError(true);
      triggerFlashAndComplete();
    });

    // Watch for 5.1s golden sparkle explosion
    const handleTimeUpdate = () => {
      if (video.currentTime >= 5.1) {
        video.removeEventListener("timeupdate", handleTimeUpdate);
        triggerFlashAndComplete();
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", triggerFlashAndComplete);
  };

  const triggerFlashAndComplete = () => {
    // 1. Smoothly fade out Audio 1 over 1000ms
    const audio1 = audio1Ref.current;
    if (audio1) {
      let initialVol = 0.5;
      try { initialVol = audio1.volume; } catch (_) {}
      const steps = 20;
      const stepTime = 50; // 1000ms total fade-out
      let step = 0;
      fadeOutTimerRef.current = setInterval(() => {
        step++;
        if (audio1) {
          try {
            audio1.volume = Math.max(0, initialVol * (1 - step / steps));
          } catch (_) {}
        }
        if (step >= steps) {
          if (fadeOutTimerRef.current) {
            clearInterval(fadeOutTimerRef.current);
            fadeOutTimerRef.current = null;
          }
          if (audio1) {
            try {
              audio1.pause();
              audio1.volume = 0.5; // Reset for potential replay
            } catch (_) {}
          }
        }
      }, stepTime);
    }

    // 2. Trigger Audio 2 fade-in right at the start of the flash
    if (onTransitionStart) {
      onTransitionStart();
    }

    // 3. Expand cinematic champagne-gold & warm-white flash
    setFlashActive(true);

    setTimeout(() => {
      // 4. Video dissolves smoothly
      setVideoFading(true);

      setTimeout(() => {
        setFlashActive(false);
        onComplete();
      }, 1000);
    }, 250);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#FDF0F3] via-[#FAF3F5] to-[#F5E6EB] transition-opacity duration-1000 ${videoFading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
    >
      {/* 9:16 Video Container */}
      <div className="relative w-full h-full max-w-[430px] aspect-[9/16] overflow-hidden bg-[#FFF8F0] shadow-[0_16px_48px_rgba(107,29,47,0.12),0_0_24px_rgba(212,175,55,0.22)] md:rounded-[36px] md:border-4 md:border-[#D4AF37]/60">

        {/* Intro Video */}
        <video
          ref={videoRef}
          src={INVITATION_CONFIG.assets.introVideo}
          playsInline
          webkit-playsinline="true"
          preload="auto"
          muted
          className="w-full h-full object-cover"
          onError={() => setVideoError(true)}
        />

        {/* Fallback Static Envelope if video fails */}
        {videoError && (
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAD2E1] to-[#E8B7C4] flex items-center justify-center p-6 text-center">
            <div className="p-8 rounded-3xl bg-white/80 border-2 border-[#D4AF37] shadow-2xl">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#FFF2A6] via-[#D4AF37] to-[#996515] flex items-center justify-center text-[#521120] text-3xl font-bold mb-4 shadow-lg">
                ❤️
              </div>
              <h2 className="text-xl font-bold text-[#6B1D2F]">JEESHIKA</h2>
              <p className="text-xs text-[#9B3459] mt-2">TAP TO OPEN INVITATION</p>
            </div>
          </div>
        )}

        {/* Center Heart Seal Hotspot & "TAP TO OPEN" Prompt */}
        {!isOpened && (
          <div
            onClick={handleOpen}
            className="absolute top-[47%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center cursor-pointer z-30 transition-transform active:scale-95"
            role="button"
            aria-label="Tap to Open Seal"
          >
            {/* Glowing Golden Ring Animation */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-[#FFEAA7] animate-ping opacity-60"></div>
              <div className="absolute -inset-2 rounded-full border border-[#D4AF37] animate-pulse"></div>

              {/* 3D Gold Heart Icon Core */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#996515] via-[#D4AF37] to-[#FFF2A6] border-2 border-white/90 shadow-[0_0_25px_rgba(212,175,55,0.9)] flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
                <svg className="w-8 h-8 text-[#521120] drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            </div>

            {/* Elegant "TAP TO OPEN" Badge */}
            <div className="mt-3.5 bg-[#6B1D2F]/90 backdrop-blur-md border border-[#D4AF37] text-[#FFF8E7] text-xs font-tamil font-bold px-4 py-1.5 rounded-full shadow-[0_4px_16px_rgba(107,29,47,0.35)] whitespace-nowrap animate-bounce">
              ✨ சீலைத் திறக்க தட்டவும் • TAP TO OPEN
            </div>
          </div>
        )}

        {/* Expanding Champagne-Gold & Warm-White Cinematic Flash */}
        <div
          className={`absolute inset-0 pointer-events-none z-40 transition-opacity duration-1000 ${flashActive ? "opacity-100" : "opacity-0"
            }`}
          style={{
            background: "radial-gradient(circle, rgba(255,255,245,1) 0%, rgba(255,235,170,0.95) 45%, rgba(212,175,55,0.85) 75%, rgba(201,120,145,0.4) 100%)",
          }}
        />

      </div>
    </div>
  );
};

