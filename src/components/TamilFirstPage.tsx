"use client";

import React from "react";
import Image from "next/image";
import { INVITATION_CONFIG } from "@/config/invitation";

export const TamilFirstPage: React.FC = () => {
  return (
    <section className="relative min-h-[96vh] flex flex-col items-center justify-between p-5 text-center overflow-hidden bg-gradient-to-b from-[#FFF5F7] via-[#FDF0F3] to-[#FCE8ED]">
      
      {/* Decorative Traditional Corner Floral Borders */}
      <div className="absolute top-0 left-0 w-24 h-24 pointer-events-none opacity-40">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#D4AF37]">
          <path d="M0,0 L40,0 C20,10 10,20 0,40 Z" fill="currentColor"/>
          <circle cx="25" cy="25" r="4" fill="currentColor"/>
          <path d="M0,0 Q50,10 60,60 Q10,50 0,0" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-40 transform scale-x-[-1]">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#D4AF37]">
          <path d="M0,0 L40,0 C20,10 10,20 0,40 Z" fill="currentColor"/>
          <circle cx="25" cy="25" r="4" fill="currentColor"/>
          <path d="M0,0 Q50,10 60,60 Q10,50 0,0" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      </div>

      {/* Main Luxury Frame Card */}
      <div className="relative z-10 w-full max-w-[390px] mx-auto flex flex-col items-center pt-2">
        
        {/* Traditional Invocation Mantra */}
        <p className="text-[11px] font-tamil font-semibold text-[#7A2638] mb-1">
          ॥ ஸ்ரீ கணேஷாய நம: ॥ ஸ்ரீ பாலமுருகன் துணை ॥
        </p>

        {/* Top Ornamental Heading Badge */}
        <div className="inline-block bg-[#6B1D2F] text-[#FFF8E7] border-2 border-[#D4AF37] px-5 py-1.5 rounded-full shadow-md text-xs font-tamil font-bold mt-1 mb-2">
          அன்புடன் அழைக்கின்றோம்
        </div>

        {/* Main Title: செவிப்பொன் சேர்ப்பு விழா (Dedicated Bold Display Title Font) */}
        <h1 className="text-3xl md:text-4xl font-tamil-title font-bold text-[#6B1D2F] drop-shadow-[0_2px_4px_rgba(212,175,55,0.4)] leading-tight my-1">
          செவிப்பொன் சேர்ப்பு விழா
        </h1>

        {/* Supporting text */}
        <p className="text-xs font-tamil font-bold text-[#9B3459] mt-0.5">
          எங்கள் அன்பு மகள்
        </p>

        {/* Baby's Name */}
        <div className="my-2 text-center">
          <h2 className="text-4xl md:text-5xl font-tamil-names font-bold text-[#9D174D] drop-shadow-sm leading-tight">
            பேபி. ஜீஷிகா
          </h2>
          <span className="text-4xl md:text-5xl font-script text-[#6B1D2F] block mt-1 font-bold tracking-wide">
            Baby Jeeshika
          </span>
        </div>

        {/* Tastefully Placed Baby Photograph in Ornamental Gold Arch */}
        <div className="my-3 relative">
          {/* Glowing background halo */}
          <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-[28px] blur-md transform scale-105"></div>
          
          <div className="relative w-44 h-48 rounded-[28px] p-1.5 bg-gradient-to-tr from-[#996515] via-[#D4AF37] to-[#FFEAA7] shadow-[0_10px_25px_rgba(107,29,47,0.2)]">
            <div className="w-full h-full rounded-[22px] overflow-hidden bg-white relative">
              <img
                src="/baby_portrait.png"
                alt="Baby Jeeshika"
                className="w-full h-full object-cover object-top"
              />
            </div>
            {/* Small Gold Floral Accent Badge */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#6B1D2F] text-[#FFF8E7] border border-[#D4AF37] text-[10px] font-tamil font-bold px-3 py-0.5 rounded-full shadow">
              🌸 செல்வ மகள் 🌸
            </div>
          </div>
        </div>

        {/* Main Invitation Message */}
        <div className="w-full bg-white/80 backdrop-blur-sm border border-[#D4AF37]/50 rounded-2xl p-3.5 my-2 shadow-sm">
          <p className="text-xs md:text-[13px] font-tamil font-semibold text-[#521120] leading-relaxed text-center">
            "எங்கள் அன்பு மகளின் செவிப்பொன் சேர்ப்பு விழாவிற்கு குடும்பத்துடன் வருகை தந்து வாழ்த்தி சிறப்பிக்குமாறு அன்புடன் கேட்டுக்கொள்கிறோம்."
          </p>
        </div>

        {/* Traditional Ornamental Separator */}
        <div className="flex items-center justify-center gap-2 my-2 w-3/4">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <span className="text-[#D4AF37] text-xs">✦ ✤ ✦</span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>

        {/* Event Information Card */}
        <div className="w-full bg-gradient-to-r from-pink-50/90 via-white/95 to-pink-50/90 border border-pink-200/90 rounded-2xl p-3 shadow-sm text-center font-tamil">
          
          {/* Day & Date */}
          <div className="mb-1">
            <span className="text-xs text-[#9B3459] font-bold block">திங்கட்கிழமை</span>
            <span className="text-lg font-black text-[#6B1D2F] block leading-tight">
              18 ஜனவரி 2027
            </span>
          </div>

          {/* Time */}
          <div className="text-xs font-bold text-[#521120] bg-white/70 py-1 px-3 rounded-full inline-block border border-pink-200/80 my-1">
            மதியம் 12:00 முதல் 1:00 மணி வரை
          </div>

          {/* Venue */}
          <p className="text-xs font-bold text-[#6B1D2F] mt-1 leading-snug">
            ஶ்ரீ அங்காளம்மன் கோவில்,<br/>
            <span className="text-xs font-semibold text-[#7A2638]">கொக்கலை, மரப்பாறை, தமிழ்நாடு – 637410</span>
          </p>

        </div>

      </div>

      {/* Elegant Bottom Scroll Indicator to Scratch-to-Reveal */}
      <div className="relative z-10 pb-2 mt-4 animate-bounce text-[#6B1D2F] text-xs flex flex-col items-center font-bold">
        <span className="text-[10px] font-tamil">
          தேதியைத் திறக்க கீழே தொடர்க • SCROLL
        </span>
        <span>▼</span>
      </div>

    </section>
  );
};

