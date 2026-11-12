"use client";

import React, { useRef, useState, useEffect } from "react";
import { INVITATION_CONFIG } from "@/config/invitation";
import { FloralHeaderDivider } from "@/components/FloralDecorations";
import { BabyJeeshikaCalligraphy } from "@/components/BabyJeeshikaCalligraphy";

interface HeroSectionProps {
  active?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ active = true }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready
        .then(() => setFontsLoaded(true))
        .catch(() => setFontsLoaded(true));
      const timer = setTimeout(() => setFontsLoaded(true), 350);
      return () => clearTimeout(timer);
    } else {
      setFontsLoaded(true);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!active) {
      try {
        video.pause();
      } catch (_) {}
      return;
    }

    // Play video smoothly when active
    try {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } catch (_) {}

    // Performance: Pause video when scrolled out of viewport to save mobile GPU/CPU
    let observer: IntersectionObserver | null = null;
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      try {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!video) return;
              if (entry.isIntersecting && active) {
                if (video.paused) {
                  video.play().catch(() => {});
                }
              } else {
                if (!video.paused) {
                  video.pause();
                }
              }
            });
          },
          { threshold: 0.1 }
        );

        const section = sectionRef.current;
        if (section) observer.observe(section);
      } catch (err) {
        console.warn("Hero intersection observer error:", err);
      }
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [active]);

  return (
    <section 
      ref={sectionRef}
      className={`relative min-h-[96vh] flex flex-col items-center justify-between p-6 text-center overflow-hidden bg-gradient-to-b from-[#FFF5F7] via-[#FDF0F3] to-[#FCE8ED] transition-opacity duration-300 ${
        fontsLoaded ? "opacity-100" : "opacity-95"
      }`}
    >
      {/* Baby Jeeshika Video as Main Hero Background (Optimized H.264 FastStart + Poster) */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src={INVITATION_CONFIG.assets.heroVideo}
          poster="/baby_scene_poster.jpg"
          loop
          muted
          playsInline
          webkit-playsinline="true"
          preload={active ? "auto" : "metadata"}
          className="w-full h-full object-cover object-bottom"
        />
        {/* Bright Soft Pink Atmospheric Illumination — 100% Free of Dark Shadows or Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF5F7] via-[#FFF5F7]/80 to-transparent h-[62%] pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#FCE8ED] to-transparent pointer-events-none" />
      </div>

      {/* Top Homepage Content Hierarchy */}
      <div className="relative z-10 pt-4 sm:pt-3 flex flex-col items-center max-w-[390px] w-full mx-auto px-1">
        
        {/* Small Top Heading: அன்புடன் அழைக்கின்றோம் (Noto Sans Tamil 600, ZERO tracking) */}
        <div 
          className="inline-block bg-gradient-to-r from-[#6B1D2F] via-[#8A263E] to-[#6B1D2F] text-[#FFF8E7] border-2 border-[#D4AF37] px-3.5 py-0.5 sm:px-5 sm:py-1 rounded-full shadow-[0_2px_10px_rgba(212,175,55,0.3)] text-[10.5px] sm:text-xs font-semibold mb-2"
          style={{ fontFamily: "'Noto Sans Tamil', 'JeeshikaTamil', sans-serif", fontWeight: 600, letterSpacing: "normal" }}
        >
          {INVITATION_CONFIG.baby.tamilBadge}
        </div>

        {/* Main Title: செவிப்பொன் சேர்ப்பு விழா (Dedicated Nilavu Display Title Font - STRICT SINGLE LINE) */}
        <h1 className="text-[clamp(1.18rem,5.4vw,1.85rem)] sm:text-2xl md:text-3xl font-tamil-title font-bold text-[#6B1D2F] drop-shadow-[0_2px_4px_rgba(212,175,55,0.4)] leading-tight my-1 whitespace-nowrap tracking-normal">
          {INVITATION_CONFIG.baby.tamilTitle}
        </h1>

        {/* Supporting text: எங்கள் அன்பு மகள் (Noto Sans Tamil 600) */}
        <p 
          className="text-xs font-semibold text-[#7A2638] mt-2.5"
          style={{ fontFamily: "'Noto Sans Tamil', 'JeeshikaTamil', sans-serif", fontWeight: 600, letterSpacing: "normal" }}
        >
          {INVITATION_CONFIG.baby.tamilSubtitle}
        </p>

        {/* Premium Tamil Calligraphy Logo Treatment: பேபி. ஜீஷிகா (Inspired by Behance Reference) */}
        <BabyJeeshikaCalligraphy className="my-1.5" />

        {/* Refined Botanical Floral Divider */}
        <FloralHeaderDivider className="my-2" />

        {/* Warm Supporting Message (Noto Sans Tamil 500) */}
        <div className="bg-gradient-to-r from-white/95 via-[#FFF8FA]/95 to-white/95 border border-[#D4AF37]/45 rounded-2xl px-4 py-3 shadow-[0_4px_16px_rgba(212,175,55,0.1)] mt-1">
          <p 
            className="text-xs md:text-[13px] font-medium text-[#521120] leading-relaxed"
            style={{ fontFamily: "'Noto Sans Tamil', 'JeeshikaTamil', sans-serif", fontWeight: 500, letterSpacing: "normal" }}
          >
            "{INVITATION_CONFIG.baby.homepageMessage}"
          </p>
        </div>

      </div>

      {/* Elegant Bottom Scroll Indicator to Scratch-to-Reveal */}
      <div className="relative z-10 pb-2 mt-4 animate-bounce text-[#6B1D2F] text-xs flex flex-col items-center font-bold">
        <span 
          className="text-[11px] font-medium"
          style={{ fontFamily: "'Noto Sans Tamil', 'JeeshikaTamil', sans-serif", fontWeight: 500, letterSpacing: "normal" }}
        >
          தேதியைத் திறக்க கீழே தொடரவும் • SCROLL
        </span>
        <span>▼</span>
      </div>

    </section>
  );
};
