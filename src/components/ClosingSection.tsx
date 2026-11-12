"use client";

import React, { useState, useEffect, useRef } from "react";
import { INVITATION_CONFIG } from "@/config/invitation";
import { FloralCornerCluster, FloralCardCrest, FloralHeaderDivider } from "@/components/FloralDecorations";

interface ClosingSectionProps {
  onReplay: () => void;
}

export const ClosingSection: React.FC<ClosingSectionProps> = ({ onReplay }) => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
            }
          });
        },
        { threshold: 0.15 }
      );

      const current = footerRef.current;
      if (current) observer.observe(current);

      return () => {
        if (current) observer.unobserve(current);
      };
    } else {
      setIsVisible(true);
    }
  }, []);

  const shareOnWhatsapp = () => {
    const text = `🌸 *அன்புடன் அழைக்கின்றோம்!* 🌸\n\n*${INVITATION_CONFIG.baby.tamilTitle} (EAR PIERCING CEREMONY)*\n👑 *${INVITATION_CONFIG.baby.name} (${INVITATION_CONFIG.baby.tamilName})*\n\n📅 *நாள்:* ${INVITATION_CONFIG.event.tamilDateDisplay} (${INVITATION_CONFIG.event.tamilTimeDisplay})\n🏛️ *இடம்:* ${INVITATION_CONFIG.event.tamilFullVenueDisplay}\n\n✨ *டிஜிட்டல் அழைப்பிதழ் காண:* ${typeof window !== "undefined" ? window.location.href : "https://jeeshika-ear-piercing.vercel.app"}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <footer 
      ref={footerRef}
      className={`relative p-4 sm:p-6 pb-16 flex flex-col items-center text-center mt-6 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      
      {/* FINAL THANK YOU SCREEN - Luxury Blush Pink & Soft Gold Card */}
      <div className="w-full max-w-[390px] bg-gradient-to-b from-[#FFFDF9]/98 via-[#FFF5F8]/98 to-[#FFEBF1]/98 backdrop-blur-md border border-[#D4AF37]/65 rounded-3xl p-5 sm:p-6 shadow-[0_16px_40px_rgba(107,29,47,0.15)] relative overflow-hidden">
        
        {/* Botanical Floral Corner Accents */}
        <FloralCornerCluster position="top-right" size={75} />
        <FloralCornerCluster position="bottom-left" size={65} />

        {/* Sacred Auspicious Crest & Heart Medallion */}
        <div className="relative z-10">
          <FloralCardCrest />
          <div className="w-11 h-11 mx-auto rounded-full bg-gradient-to-tr from-[#996515] via-[#D4AF37] to-[#FFF2A6] flex items-center justify-center text-[#521120] text-lg shadow-[0_4px_12px_rgba(212,175,55,0.4)] my-2.5">
            ❤️
          </div>
        </div>

        {/* Section Heading: With Love & Blessings */}
        <div className="relative z-10">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#9B3459] uppercase block font-serif">
            WITH LOVE & BLESSINGS
          </span>
          <h3 className="text-xl sm:text-2xl font-tamil-title font-bold text-[#6B1D2F] mt-1 drop-shadow-sm">
            அன்பும் ஆசிகளும்
          </h3>
          <FloralHeaderDivider className="my-2.5" />
        </div>

        {/* Heartfelt Thank You Message */}
        <div className="relative z-10 py-2 px-1 space-y-2">
          <p className="text-[13px] sm:text-[14px] font-tamil font-semibold text-[#6B1D2F] leading-relaxed drop-shadow-xs">
            "தங்களின் மேலான வருகையும் நல்லாசிகளும் எங்கள் செல்வி ஜீஷிகாவின் இந்த இனிய விழாவை மேலும் சிறப்படையச் செய்யும்."
          </p>
          <p className="text-[11px] sm:text-[12px] font-serif italic text-[#8A263E] leading-normal font-medium">
            "Your presence and blessings make Baby Jeeshika's special day even more beautiful."
          </p>
        </div>

        {/* Closing Signature */}
        <div className="relative z-10 mt-3 pt-3 border-t border-[#E8D39A]/60">
          <span className="text-[11px] font-serif uppercase tracking-wider text-[#9B3459] block font-semibold">
            With Love,
          </span>
          <h4 className="text-base sm:text-lg font-serif font-bold text-[#6B1D2F] mt-0.5">
            Baby Jeeshika & Family
          </h4>
          <p className="text-[12px] font-tamil font-bold text-[#9D174D] mt-0.5">
            அன்புடன், பேபி. ஜீஷிகா & குடும்பத்தினர்
          </p>
        </div>

        <FloralHeaderDivider className="my-3 relative z-10" />

        {/* Action Buttons: WhatsApp Share & Replay Intro */}
        <div className="mt-2 space-y-2.5 relative z-10 w-full">
          <button
            onClick={shareOnWhatsapp}
            aria-label="Share on WhatsApp"
            className="w-full min-h-[44px] bg-gradient-to-r from-[#25D366] to-[#1EBE5D] hover:from-[#1EBE5D] hover:to-[#18A34F] text-white font-bold py-2.5 px-4 rounded-xl shadow-[0_4px_14px_rgba(37,211,102,0.35)] text-xs sm:text-sm flex items-center justify-center gap-2 transition-transform duration-200 active:scale-[0.98] font-tamil"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
            </svg>
            <span>வாட்ஸ்அப்பில் பகிர • SHARE ON WHATSAPP</span>
          </button>

          <button
            onClick={onReplay}
            aria-label="Replay intro animation"
            className="w-full min-h-[42px] bg-white/90 hover:bg-white text-[#6B1D2F] border border-[#D4AF37]/65 font-bold py-2 px-4 rounded-xl shadow-sm text-xs flex items-center justify-center gap-1.5 transition-transform duration-200 active:scale-[0.98] font-tamil"
          >
            <span>🔄</span>
            <span>மீண்டும் ஆரம்பத்திலிருந்து பார்க்க • REPLAY INTRO</span>
          </button>
        </div>

      </div>

    </footer>
  );
};
