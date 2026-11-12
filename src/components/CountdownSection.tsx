"use client";

import React, { useState, useEffect, useRef } from "react";
import { INVITATION_CONFIG } from "@/config/invitation";
import { FloralCornerCluster, FloralCardCrest, FloralHeaderDivider } from "@/components/FloralDecorations";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

export const CountdownSection: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isComplete: false,
  });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
    const targetDate = new Date(INVITATION_CONFIG.event.isoDateTime).getTime();

    const calculateTimeLeft = (): TimeLeft => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return { days, hours, minutes, seconds, isComplete: false };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Subtle fade-in when section enters viewport
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

      const current = sectionRef.current;
      if (current) observer.observe(current);

      return () => {
        clearInterval(timer);
        if (current) observer.unobserve(current);
      };
    } else {
      setIsVisible(true);
      return () => clearInterval(timer);
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`relative px-3.5 py-4 sm:p-6 flex flex-col items-center my-3 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* Luxury Glassmorphic Countdown Card */}
      <div className="w-full max-w-[390px] bg-gradient-to-b from-[#FFFDF9]/95 via-[#FFF6F8]/95 to-[#FFF0F4]/95 backdrop-blur-md border border-[#D4AF37]/55 rounded-3xl px-4 py-5 sm:p-6 shadow-[0_16px_36px_rgba(107,29,47,0.12)] relative overflow-hidden text-center">
        
        {/* Botanical Floral Corner Accents */}
        <FloralCornerCluster position="top-right" size={65} />
        <FloralCornerCluster position="bottom-left" size={60} />

        {/* Section Heading */}
        <div className="mb-4 relative z-10">
          <FloralCardCrest />
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#9B3459] uppercase block font-serif">
            COUNTDOWN TO AUSPICIOUS MOMENT
          </span>
          <h3 className="text-xl sm:text-2xl font-tamil-title font-bold text-[#6B1D2F] mt-1 drop-shadow-sm">
            சுபமுகூர்த்த நேரக் கணிப்பு
          </h3>
          <FloralHeaderDivider className="my-2" />
        </div>

        {timeLeft.isComplete ? (
          /* When Countdown Reaches Zero */
          <div className="relative z-10 py-4 px-3 bg-gradient-to-r from-[#FFF5F7] via-white to-[#FFF5F7] border border-[#D4AF37]/60 rounded-2xl shadow-sm">
            <span className="text-2xl block mb-1">🎉</span>
            <h4 className="text-lg font-serif font-bold text-[#6B1D2F]">
              The Celebration Begins!
            </h4>
            <p className="text-xs font-tamil font-bold text-[#9D174D] mt-1">
              சுப நிகழ்வு ஆரம்பமாகிறது!
            </p>
          </div>
        ) : (
          /* Live 4-Unit Countdown Timer */
          <div className="relative z-10">
            <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
              
              {/* Days */}
              <div className="bg-gradient-to-b from-white to-[#FFF5F7] border border-[#E8D39A]/80 rounded-2xl p-2 sm:p-2.5 shadow-sm flex flex-col items-center">
                <span className="text-xl sm:text-2xl font-serif font-black text-[#6B1D2F] leading-none drop-shadow-sm">
                  {String(timeLeft.days).padStart(2, "0")}
                </span>
                <span className="text-[9px] font-tamil font-bold text-[#9D174D] mt-1.5 leading-none">
                  நாட்கள்
                </span>
                <span className="text-[8px] font-serif font-semibold text-[#8A263E] uppercase tracking-wider mt-0.5 leading-none">
                  DAYS
                </span>
              </div>

              {/* Hours */}
              <div className="bg-gradient-to-b from-white to-[#FFF5F7] border border-[#E8D39A]/80 rounded-2xl p-2 sm:p-2.5 shadow-sm flex flex-col items-center">
                <span className="text-xl sm:text-2xl font-serif font-black text-[#6B1D2F] leading-none drop-shadow-sm">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span className="text-[9px] font-tamil font-bold text-[#9D174D] mt-1.5 leading-none">
                  மணிகள்
                </span>
                <span className="text-[8px] font-serif font-semibold text-[#8A263E] uppercase tracking-wider mt-0.5 leading-none">
                  HOURS
                </span>
              </div>

              {/* Minutes */}
              <div className="bg-gradient-to-b from-white to-[#FFF5F7] border border-[#E8D39A]/80 rounded-2xl p-2 sm:p-2.5 shadow-sm flex flex-col items-center">
                <span className="text-xl sm:text-2xl font-serif font-black text-[#6B1D2F] leading-none drop-shadow-sm">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span className="text-[9px] font-tamil font-bold text-[#9D174D] mt-1.5 leading-none">
                  நிமிடங்கள்
                </span>
                <span className="text-[8px] font-serif font-semibold text-[#8A263E] uppercase tracking-wider mt-0.5 leading-none">
                  MINUTES
                </span>
              </div>

              {/* Seconds */}
              <div className="bg-gradient-to-b from-white to-[#FFF5F7] border border-[#E8D39A]/80 rounded-2xl p-2 sm:p-2.5 shadow-sm flex flex-col items-center">
                <span className="text-xl sm:text-2xl font-serif font-black text-[#D4AF37] leading-none drop-shadow-sm">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
                <span className="text-[9px] font-tamil font-bold text-[#9D174D] mt-1.5 leading-none">
                  வினாடிகள்
                </span>
                <span className="text-[8px] font-serif font-semibold text-[#8A263E] uppercase tracking-wider mt-0.5 leading-none">
                  SECONDS
                </span>
              </div>

            </div>

            {/* Sub-label under countdown */}
            <p className="text-[11px] font-serif text-[#7A2638] mt-3 font-medium">
              18th January 2027 • 12:00 PM
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
