"use client";

import React from "react";
import { INVITATION_CONFIG } from "@/config/invitation";
import { FloralCornerCluster, FloralCardCrest, FloralHeaderDivider } from "@/components/FloralDecorations";

export const VerseSection: React.FC = () => {
  return (
    <section className="relative p-6 flex flex-col items-center text-center my-4">
      
      {/* Frosted Glass Invitation Card with Floral Framing */}
      <div className="w-full max-w-[390px] bg-gradient-to-b from-[#FFFDF9]/95 via-[#FFF6F8]/95 to-[#FFF0F4]/95 backdrop-blur-md border border-[#D4AF37]/55 rounded-3xl p-6 shadow-[0_16px_36px_rgba(107,29,47,0.12)] relative overflow-hidden">
        
        {/* Botanical Floral Corner Accents */}
        <FloralCornerCluster position="top-left" size={75} />
        <FloralCornerCluster position="bottom-right" size={65} />

        {/* Decorative Top Accent */}
        <div className="relative z-10 mb-3">
          <FloralCardCrest />
          <FloralHeaderDivider className="my-1.5" />
        </div>

        {/* English Poetic Verse */}
        <div className="space-y-1 text-xs md:text-sm font-serif italic text-[#6B1D2F] leading-relaxed relative z-10">
          {INVITATION_CONFIG.verses.englishPoem.map((line, idx) => (
            <p key={idx} className="tracking-wide">{line}</p>
          ))}
        </div>

        {/* Floral Divider */}
        <div className="relative z-10 my-3">
          <FloralHeaderDivider />
        </div>

        {/* English Welcome Note */}
        <p className="text-xs font-serif font-semibold text-[#9B3459] leading-snug relative z-10">
          "{INVITATION_CONFIG.verses.englishWelcome}"
        </p>

        {/* Tamil Welcome Note - Global JeeshikaTamil Typography */}
        <div className="mt-4 p-4 bg-gradient-to-r from-[#FFF5F7] via-white to-[#FFF5F7] border border-[#E8D39A]/80 rounded-2xl shadow-sm relative z-10">
          <p className="text-[13px] md:text-[14px] font-tamil font-normal text-[#521120] leading-relaxed">
            "{INVITATION_CONFIG.verses.tamilWelcome}"
          </p>
        </div>

      </div>

    </section>
  );
};
