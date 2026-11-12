"use client";

import React from "react";
import { INVITATION_CONFIG } from "@/config/invitation";
import { FloralCornerCluster, FloralCardCrest, FloralHeaderDivider } from "@/components/FloralDecorations";

interface ClosingSectionProps {
  onReplay: () => void;
}

export const ClosingSection: React.FC<ClosingSectionProps> = ({ onReplay }) => {
  const shareOnWhatsapp = () => {
    const text = `🌸 *அன்புடன் அழைக்கின்றோம்!* 🌸\n\n*${INVITATION_CONFIG.baby.tamilTitle} (EAR PIERCING CEREMONY)*\n👑 *${INVITATION_CONFIG.baby.name} (${INVITATION_CONFIG.baby.tamilName})*\n\n📅 *நாள்:* ${INVITATION_CONFIG.event.dateDisplay} (${INVITATION_CONFIG.event.timeDisplay})\n🏛️ *இடம்:* ${INVITATION_CONFIG.event.fullVenueDisplay}\n\n✨ *டிஜிட்டல் அழைப்பிதழ் காண:* ${window.location.href}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <footer className="relative p-6 pb-16 flex flex-col items-center text-center mt-6">
      
      {/* Decorative Closing Card */}
      <div className="w-full max-w-[390px] bg-gradient-to-b from-[#FFFDF9]/95 via-[#FFF6F8]/95 to-[#FFF0F4]/95 backdrop-blur-md border border-[#D4AF37]/60 rounded-3xl p-6 shadow-[0_16px_36px_rgba(107,29,47,0.15)] relative overflow-hidden">
        
        {/* Botanical Floral Corner Accents */}
        <FloralCornerCluster position="top-right" size={75} />
        <FloralCornerCluster position="bottom-left" size={65} />

        {/* Heart Icon */}
        <div className="relative z-10">
          <FloralCardCrest />
          <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-tr from-[#996515] via-[#D4AF37] to-[#FFF2A6] flex items-center justify-center text-[#521120] text-xl shadow-md my-3">
            ❤️
          </div>
        </div>

        {/* Closing Mottos */}
        <div className="relative z-10">
          <h4 className="text-sm font-serif font-black tracking-widest text-[#6B1D2F] uppercase">
            {INVITATION_CONFIG.verses.closingMotto}
          </h4>
          <p className="text-[13px] font-tamil font-bold text-[#9D174D] mt-1.5 flex items-center justify-center gap-1.5">
            {INVITATION_CONFIG.verses.tamilClosingMotto}
          </p>
          <FloralHeaderDivider className="my-3" />
        </div>

        {/* Buttons: WhatsApp Share & Replay Intro */}
        <div className="mt-4 space-y-2.5 relative z-10">
          <button
            onClick={shareOnWhatsapp}
            className="w-full bg-gradient-to-r from-[#25D366] to-[#1EBE5D] hover:from-[#1EBE5D] hover:to-[#18A34F] text-white font-bold py-2.5 px-4 rounded-xl shadow-md text-xs flex items-center justify-center gap-2 transition font-tamil"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
            </svg>
            <span>வாட்ஸ்அப்பில் பகிர • SHARE ON WHATSAPP</span>
          </button>

          <button
            onClick={onReplay}
            className="w-full bg-white/90 hover:bg-white text-[#6B1D2F] border border-[#D4AF37]/65 font-bold py-2 px-4 rounded-xl shadow-sm text-xs flex items-center justify-center gap-1.5 transition font-tamil"
          >
            <span>🔄</span>
            <span>மீண்டும் ஆரம்பத்திலிருந்து பார்க்க • REPLAY INTRO</span>
          </button>
        </div>

      </div>

    </footer>
  );
};
