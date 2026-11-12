"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

interface AudioPlayerProps {
  autoPlay?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ autoPlay = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasAutoStartedRef = useRef(false);
  const fadeInIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Dedicated function to immediately stop audio, reset playback, and clear timers
  const stopAudio = useCallback(() => {
    if (fadeInIntervalRef.current) {
      clearInterval(fadeInIntervalRef.current);
      fadeInIntervalRef.current = null;
    }
    const audio = audioRef.current;
    if (audio) {
      try {
        audio.pause();
        audio.currentTime = 0;
        audio.volume = 0.25;
      } catch (_) { }
    }
    // Prevent autoPlay from automatically resuming when returning to the app
    hasAutoStartedRef.current = true;
    setIsPlaying(false);
  }, []);

  // Initialize single audio element and attach lifecycle event listeners
  useEffect(() => {
    let audio: HTMLAudioElement | null = null;
    try {
      audio = new Audio("/audio 2.mp3");
      audio.loop = true;
      audio.preload = "auto";
      try { audio.volume = 0.25; } catch (_) { }
      audioRef.current = audio;
    } catch (e) {
      console.warn("Audio 2 init error:", e);
    }

    const handleVisibilityChange = () => {
      if (document.hidden || document.visibilityState === "hidden") {
        stopAudio();
      }
    };

    const handlePageInactive = () => {
      stopAudio();
    };

    // Mobile & Desktop Lifecycle Events
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageInactive);
    window.addEventListener("blur", handlePageInactive);
    window.addEventListener("freeze", handlePageInactive);
    window.addEventListener("beforeunload", handlePageInactive);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageInactive);
      window.removeEventListener("blur", handlePageInactive);
      window.removeEventListener("freeze", handlePageInactive);
      window.removeEventListener("beforeunload", handlePageInactive);

      if (fadeInIntervalRef.current) {
        clearInterval(fadeInIntervalRef.current);
        fadeInIntervalRef.current = null;
      }
      if (audio) {
        try { audio.pause(); } catch (_) { }
      }
      audioRef.current = null;
    };
  }, [stopAudio]);

  // Handle autoPlay trigger from Intro completion
  useEffect(() => {
    if (autoPlay && !hasAutoStartedRef.current && audioRef.current) {
      // If user switched away or tab is hidden, do NOT start playing
      if (typeof document !== "undefined" && (document.hidden || document.visibilityState === "hidden")) {
        hasAutoStartedRef.current = true;
        return;
      }

      hasAutoStartedRef.current = true;
      const audio = audioRef.current;
      try { audio.volume = 0; } catch (_) { }

      audio.play().then(() => {
        setIsPlaying(true);
        // Smooth crossfade: ramp volume from 0 to 0.25 over 1800ms
        const targetVol = 0.25;
        const steps = 30;
        const stepTime = 60; // 1800ms total
        let step = 0;
        if (fadeInIntervalRef.current) clearInterval(fadeInIntervalRef.current);
        fadeInIntervalRef.current = setInterval(() => {
          step++;
          if (audio) {
            try {
              audio.volume = Math.min(targetVol, (step / steps) * targetVol);
            } catch (_) { }
          }
          if (step >= steps) {
            if (fadeInIntervalRef.current) {
              clearInterval(fadeInIntervalRef.current);
              fadeInIntervalRef.current = null;
            }
            if (audio) {
              try { audio.volume = targetVol; } catch (_) { }
            }
          }
        }, stepTime);
      }).catch((e) => {
        console.warn("Audio 2 autoplay blocked:", e);
      });
    } else if (!autoPlay && audioRef.current) {
      hasAutoStartedRef.current = false;
      stopAudio();
    }
  }, [autoPlay, stopAudio]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeInIntervalRef.current) {
      clearInterval(fadeInIntervalRef.current);
      fadeInIntervalRef.current = null;
    }

    if (isPlaying) {
      try {
        audio.pause();
      } catch (_) { }
      setIsPlaying(false);
    } else {
      audio.volume = 0.25;
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.warn("Audio toggle blocked:", e);
      });
    }
  };

  return (
    <button
      onClick={toggleMusic}
      className={`fixed top-4 right-4 z-40 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-md backdrop-blur-md border ${isPlaying
        ? "bg-[#6B1D2F] border-[#D4AF37] text-[#FFF8E7] shadow-[0_0_12px_rgba(212,175,55,0.4)]"
        : "bg-white/80 border-[#C9A34E]/50 text-[#6B1D2F] hover:bg-white"
        }`}
      title={isPlaying ? "Mute Music" : "Play Festive Music"}
      aria-label={isPlaying ? "Mute Music" : "Play Festive Music"}
    >
      <span className={isPlaying ? "animate-spin text-sm" : "text-sm"}>
        {isPlaying ? "🎵" : "🔇"}
      </span>
      <span className="font-tamil">இசை</span>
    </button>
  );
};
