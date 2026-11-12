"use client";

import React from "react";
import { INVITATION_CONFIG } from "@/config/invitation";
import { FloralCornerCluster, FloralCardCrest, FloralHeaderDivider } from "@/components/FloralDecorations";

export const GrandparentsSection: React.FC = () => {
  return (
    <section className="relative px-3.5 py-4 sm:p-6 flex flex-col items-center my-4">
      
      {/* Grandparents Blessing Card */}
      <div className="w-full max-w-[390px] bg-gradient-to-b from-[#FFFDF9]/95 via-[#FFF6F8]/95 to-[#FFF0F4]/95 backdrop-blur-md border border-[#D4AF37]/55 rounded-3xl px-3.5 py-5 sm:p-6 shadow-[0_16px_36px_rgba(107,29,47,0.12)] relative overflow-hidden">
        
        {/* Botanical Floral Accents */}
        <FloralCornerCluster position="top-left" size={75} />
        <FloralCornerCluster position="bottom-right" size={65} />

        {/* Title */}
        <div className="text-center mb-4 relative z-10">
          <FloralCardCrest />
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#9B3459] uppercase block font-serif">
            WITH THE BLESSINGS OF GRANDPARENTS
          </span>
          <h3 className="text-2xl font-tamil-title font-bold text-[#6B1D2F] mt-1 drop-shadow-sm">
            தாத்தா – பாட்டி ஆசியுடன்
          </h3>
          <FloralHeaderDivider className="my-2" />
        </div>

        {/* Grandparents List — Strictly Single Line per Language (No Word Cutting) */}
        <div className="space-y-3 relative z-10">
          {INVITATION_CONFIG.grandparents.map((gp, idx) => (
            <div 
              key={idx}
              className="bg-gradient-to-r from-[#FFF5F7] via-white to-[#FFF5F7] px-2 py-3 sm:px-4 sm:py-3.5 rounded-2xl border border-[#E8D39A]/70 shadow-[0_2px_8px_rgba(155,52,89,0.04)] text-center flex flex-col items-center justify-center overflow-hidden"
            >
              <span className="text-[clamp(9.5px,2.9vw,12px)] sm:text-[13px] font-serif font-bold text-[#6B1D2F] block tracking-tight sm:tracking-normal whitespace-nowrap leading-tight">
                {gp.names}
              </span>
              <span className="text-[clamp(10.5px,3.3vw,14px)] sm:text-[15px] font-tamil font-bold text-[#9D174D] mt-1 block whitespace-nowrap leading-tight">
                {gp.tamilNames}
              </span>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
};
