"use client";

import React, { useState, useRef, useEffect } from "react";

interface AudioPlayerProps {
  autoPlay?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ autoPlay = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasAutoStartedRef = useRef(false);

  useEffect(() => {
    let audio: HTMLAudioElement | null = null;
    try {
      audio = new Audio("/audio 2.mp3");
      audio.loop = true;
      try { audio.volume = 0.45; } catch (_) {}
      audioRef.current = audio;
    } catch (e) {
      console.warn("Audio 2 init error:", e);
    }

    return () => {
      if (audio) {
        try { audio.pause(); } catch (_) {}
      }
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (autoPlay && !hasAutoStartedRef.current && audioRef.current) {
      hasAutoStartedRef.current = true;
      const audio = audioRef.current;
      try { audio.volume = 0; } catch (_) {}
      
      audio.play().then(() => {
        setIsPlaying(true);
        // Smooth crossfade: ramp volume from 0 to 0.45 over 1800ms
        const targetVol = 0.45;
        const steps = 30;
        const stepTime = 60; // 1800ms total
        let step = 0;
        const fadeInInterval = setInterval(() => {
          step++;
          if (audio) {
            try {
              audio.volume = Math.min(targetVol, (step / steps) * targetVol);
            } catch (_) {}
          }
          if (step >= steps) {
            clearInterval(fadeInInterval);
            if (audio) {
              try { audio.volume = targetVol; } catch (_) {}
            }
          }
        }, stepTime);
      }).catch((e) => {
        console.warn("Audio 2 autoplay:", e);
      });
    } else if (!autoPlay && audioRef.current) {
      hasAutoStartedRef.current = false;
      try {
        audioRef.current.pause();
        audioRef.current.volume = 0.45;
      } catch (_) {}
      setIsPlaying(false);
    }
  }, [autoPlay]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
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
      className={`fixed top-4 right-4 z-40 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-md backdrop-blur-md border ${
        isPlaying 
          ? "bg-[#6B1D2F] border-[#D4AF37] text-[#FFF8E7] shadow-[0_0_12px_rgba(212,175,55,0.4)]" 
          : "bg-white/80 border-[#C9A34E]/50 text-[#6B1D2F] hover:bg-white"
      }`}
      title={isPlaying ? "Mute Music" : "Play Festive Music"}
    >
      <span className={isPlaying ? "animate-spin text-sm" : "text-sm"}>
        {isPlaying ? "🎵" : "🔇"}
      </span>
      <span className="font-tamil">{isPlaying ? "இசை" : "இசை"}</span>
    </button>
  );
};

