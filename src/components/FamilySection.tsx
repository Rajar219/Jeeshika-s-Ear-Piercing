"use client";

import React from "react";
import { INVITATION_CONFIG } from "@/config/invitation";
import { FloralCornerCluster, FloralCardCrest, FloralHeaderDivider } from "@/components/FloralDecorations";

export const FamilySection: React.FC = () => {
  return (
    <section className="relative p-6 flex flex-col items-center my-4">
      
      {/* Family Card with Warm Ivory & Blush Pink Luxury Surface */}
      <div className="w-full max-w-[390px] bg-gradient-to-b from-[#FFFDF9]/95 via-[#FFF6F8]/95 to-[#FFF0F4]/95 backdrop-blur-md border border-[#D4AF37]/55 rounded-3xl p-6 shadow-[0_16px_36px_rgba(107,29,47,0.12)] relative overflow-hidden">
        
        {/* Botanical Floral Corner Accents */}
        <FloralCornerCluster position="top-right" size={75} />
        <FloralCornerCluster position="bottom-left" size={65} />

        {/* Section Heading with Floral Crest */}
        <div className="text-center mb-4 relative z-10">
          <FloralCardCrest />
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#9B3459] uppercase block font-serif">
            WITH LOVE & WARM REGARDS
          </span>
          <h3 className="text-2xl font-tamil font-bold text-[#6B1D2F] mt-1 drop-shadow-sm">
            அன்புடன் அழைக்கும்
          </h3>
          <FloralHeaderDivider className="my-2" />
        </div>

        {/* Family Members List - Refined Blush-Pink & Champagne Gold (NO MINT GREEN) */}
        <div className="space-y-3 relative z-10 text-xs">
          
          {INVITATION_CONFIG.family.map((fam, idx) => (
            <div 
              key={idx}
              className="group bg-gradient-to-r from-[#FFF5F7] via-white to-[#FFF5F7] p-3 rounded-2xl border border-[#E8D39A]/75 shadow-[0_2px_8px_rgba(155,52,89,0.04)] hover:shadow-[0_4px_12px_rgba(212,175,55,0.15)] transition-all duration-300 flex items-center justify-between gap-2.5"
            >
              <div className="flex-1">
                {/* Relationship Tag */}
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                  <span className="font-serif font-bold text-[#7A2638] text-[11px] tracking-wide">
                    {fam.relation}
                  </span>
                  <span className="text-[#9B3459] text-[11px] font-tamil font-semibold">
                    ({fam.tamilRelation})
                  </span>
                </div>
                {/* English Names */}
                <span className="font-serif text-[#9D174D] font-bold text-[12px] block ml-3">
                  {fam.names}
                </span>
              </div>

              {/* Tamil Names - Dedicated Global JeeshikaTamil Font */}
              <div className="text-right pl-2 border-l border-[#E8D39A]/40">
                <span className="font-tamil font-bold text-[#521120] text-[13px] block leading-snug">
                  {fam.tamilNames}
                </span>
              </div>
            </div>
          ))}

        </div>

        {/* Closing Friends & Family Note */}
        <div className="mt-5 pt-3.5 border-t border-[#D4AF37]/35 text-center relative z-10">
          <p className="text-xs font-serif font-bold text-[#6B1D2F] tracking-wide">
            {INVITATION_CONFIG.familyClosingNote}
          </p>
          <p className="text-[13px] font-tamil font-bold text-[#9D174D] mt-1">
            {INVITATION_CONFIG.tamilFamilyClosingNote}
          </p>
        </div>

      </div>

    </section>
  );
};
