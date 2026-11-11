"use client";

import React from "react";

interface BabyJeeshikaCalligraphyProps {
  className?: string;
}

/**
 * Premium Custom Tamil Calligraphy Artwork — பேபி. ஜீஷிகா
 * Inspired by the Behance Song Title Typography reference:
 * - Two-tier cinematic typography lockup
 * - Beautiful dramatic thick-and-thin curves
 * - Golden heart dot on "பேபி."
 * - Soaring calligraphic terminal swash & crest flourish on "ா" of "ஜீஷிகா"
 * - Deep royal burgundy tones with subtle metallic champagne-gold detailing
 */
export const BabyJeeshikaCalligraphy: React.FC<BabyJeeshikaCalligraphyProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`relative flex flex-col items-center justify-center my-2 text-center select-none ${className}`}
      style={{ isolation: "isolate" }}
    >
      {/* ----------------------------------------------------
          TOP LINE: பேபி. (Calligraphic Hand-Lettered with Gold Heart)
          ---------------------------------------------------- */}
      <div className="flex items-center justify-center gap-1.5 leading-none">
        <span
          className="text-3xl sm:text-4xl md:text-4xl font-bold tracking-normal"
          style={{
            fontFamily: "'JeeshikaKurinji', 'TAU-Kurinji', cursive, sans-serif",
            fontWeight: 800,
            background: "linear-gradient(135deg, #941E3D 0%, #70132B 50%, #8A1E3D 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 1px 2px rgba(255,255,255,0.95)) drop-shadow(0 2px 4px rgba(212,175,55,0.35))",
            letterSpacing: "normal",
          }}
        >
          பேபி
        </span>

        {/* Decorative Metallic Champagne-Gold Heart Dot (pulli) */}
        <span className="inline-flex items-center justify-center -mt-1 ml-0.5">
          <svg
            className="w-4 h-4 sm:w-4.5 sm:h-4.5 filter drop-shadow-[0_2px_4px_rgba(212,175,55,0.6)]"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="heartGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF4B8" />
                <stop offset="35%" stopColor="#D4AF37" />
                <stop offset="70%" stopColor="#996515" />
                <stop offset="100%" stopColor="#FFEAA7" />
              </linearGradient>
            </defs>
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="url(#heartGold)"
              stroke="#FFF9D2"
              strokeWidth="0.75"
            />
            {/* Soft specular dot */}
            <circle cx="8" cy="7" r="1.2" fill="#FFFFFF" opacity="0.85" />
          </svg>
        </span>
      </div>

      {/* ----------------------------------------------------
          BOTTOM LINE: ஜீஷிகா (Cinematic Hero Title Typography + Soaring Swash)
          ---------------------------------------------------- */}
      <div className="relative inline-flex items-center justify-center leading-none mt-1 px-4">
        
        {/* Left Balancing Champagne Gold Swash under the baseline */}
        <div className="absolute -left-2 -bottom-2 pointer-events-none w-14 h-7 hidden sm:block">
          <svg viewBox="0 0 60 30" fill="none" className="w-full h-full opacity-80">
            <path
              d="M 5 22 C 22 28, 45 25, 58 10"
              stroke="url(#swashGold)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="58" cy="10" r="2.2" fill="#D4AF37" />
          </svg>
        </div>

        {/* Main Grand Title: ஜீஷிகா */}
        <h2
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-normal"
          style={{
            fontFamily: "'JeeshikaKurinji', 'TAU-Kurinji', cursive, sans-serif",
            fontWeight: 800,
            background: "linear-gradient(180deg, #8A1E3D 0%, #5E0E22 55%, #831843 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 2px 4px rgba(212,175,55,0.4), 0 1px 2px rgba(255,255,255,0.9)",
            letterSpacing: "normal",
          }}
        >
          ஜீஷிகா
        </h2>

        {/* Signature Behance-Style Soaring Calligraphic Swash on the right */}
        <div className="absolute -right-6 -top-5 sm:-right-8 sm:-top-7 pointer-events-none w-14 h-20 sm:w-16 sm:h-24">
          <svg
            viewBox="0 0 70 95"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full filter drop-shadow-[0_3px_6px_rgba(212,175,55,0.45)]"
          >
            <defs>
              <linearGradient id="swashGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF2A6" />
                <stop offset="35%" stopColor="#D4AF37" />
                <stop offset="70%" stopColor="#996515" />
                <stop offset="100%" stopColor="#FFEAA7" />
              </linearGradient>
              <linearGradient id="swashBurgundy" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8A1E3D" />
                <stop offset="100%" stopColor="#5E0E22" />
              </linearGradient>
            </defs>

            {/* Graceful Soaring Spiral Arch (Tracing terminal of ா) */}
            <path
              d="M 6 82 C 24 82, 45 70, 56 50 C 66 30, 66 10, 50 -2 C 34 -14, 18 0, 22 14 C 25 24, 38 26, 44 18 C 50 10, 42 2, 36 5"
              stroke="url(#swashGold)"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            {/* Inner Burgundy Core Stroke for Dynamic Contrast */}
            <path
              d="M 8 82 C 25 80, 43 68, 54 50 C 62 33, 62 14, 48 3 C 36 -6, 23 4, 25 13 C 27 20, 36 22, 40 16"
              stroke="url(#swashBurgundy)"
              strokeWidth="1.4"
              strokeLinecap="round"
            />

            {/* Delicate Golden Heart perched at the crest of the flourish */}
            <g transform="translate(44, -7) scale(0.7)">
              <path
                d="M 10 3.2 C 10 1.4, 7.8 0, 5.5 0 C 3.2 0, 1.2 1.5, 0 3.4 C -1.2 1.5, -3.2 0, -5.5 0 C -7.8 0, -10 1.4, -10 3.2 C -10 6.8, -3.5 10.5, 0 14 C 3.5 10.5, 10 6.8, 10 3.2 Z"
                fill="url(#swashGold)"
                stroke="#FFF2A6"
                strokeWidth="0.75"
              />
              <circle cx="-2" cy="3" r="1.2" fill="#FFFFFF" opacity="0.8" />
            </g>
          </svg>
        </div>

      </div>

      {/* ----------------------------------------------------
          ENGLISH SCRIPT SUBTITLE: Baby Jeeshika
          ---------------------------------------------------- */}
      <span className="text-4xl sm:text-5xl md:text-5xl font-script text-[#6B1D2F] font-bold block mt-1 drop-shadow-sm tracking-wide">
        Baby Jeeshika
      </span>
    </div>
  );
};
