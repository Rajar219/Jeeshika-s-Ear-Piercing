"use client";

import React from "react";
import { INVITATION_CONFIG } from "@/config/invitation";
import { FloralCornerCluster, FloralCardCrest, FloralHeaderDivider } from "@/components/FloralDecorations";

export const EventDetailsSection: React.FC = () => {
  const downloadIcs = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Baby Jeeshika Ear Piercing//EN",
      "BEGIN:VEVENT",
      "SUMMARY:Baby Jeeshika - Ear Piercing Ceremony (செவிப்பொன் சேர்ப்பு விழா)",
      "DESCRIPTION:Ear Piercing Ceremony of Baby Jeeshika",
      `LOCATION:${INVITATION_CONFIG.event.fullVenueDisplay}`,
      "DTSTART:20270118T063000Z",
      "DTEND:20270118T073000Z",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "Baby_Jeeshika_Ear_Piercing.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative p-6 flex flex-col items-center my-4">
      
      {/* Event Details Card with Floral Styling */}
      <div className="w-full max-w-[390px] bg-gradient-to-b from-[#FFFDF9]/95 via-[#FFF6F8]/95 to-[#FFF0F4]/95 backdrop-blur-md border border-[#D4AF37]/55 rounded-3xl p-6 shadow-[0_16px_36px_rgba(107,29,47,0.12)] relative overflow-hidden">
        
        {/* Botanical Floral Corner Accents */}
        <FloralCornerCluster position="top-right" size={75} />
        <FloralCornerCluster position="bottom-left" size={65} />

        {/* Section Heading */}
        <div className="text-center mb-5 relative z-10">
          <FloralCardCrest />
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#9B3459] uppercase block font-serif">
            THE CELEBRATION
          </span>
          <h3 className="text-2xl md:text-3xl font-tamil-title font-bold text-[#6B1D2F] mt-1 drop-shadow-sm">
            செவிப்பொன் சேர்ப்பு சுப நிகழ்வு
          </h3>
          <FloralHeaderDivider className="my-2" />
        </div>

        {/* Tamil & English Event Details */}
        <div className="space-y-3.5 text-xs text-[#521120] relative z-10">
          
          {/* Date */}
          <div className="bg-gradient-to-r from-[#FFF5F7] via-white to-[#FFF5F7] p-3.5 rounded-2xl border border-[#E8D39A]/75 shadow-sm flex items-start gap-3">
            <span className="text-2xl mt-0.5">📅</span>
            <div>
              <span className="font-bold text-[#6B1D2F] block font-tamil text-[14px]">
                திங்கட்கிழமை • 18 ஜனவரி 2027
              </span>
              <span className="font-serif font-bold text-xs text-[#9D174D] block mt-0.5">
                Monday, 18th January 2027
              </span>
            </div>
          </div>

          {/* Time */}
          <div className="bg-gradient-to-r from-[#FFF5F7] via-white to-[#FFF5F7] p-3.5 rounded-2xl border border-[#E8D39A]/75 shadow-sm flex items-start gap-3">
            <span className="text-2xl mt-0.5">🕛</span>
            <div>
              <span className="font-bold text-[#6B1D2F] block font-tamil text-[14px]">
                மதியம் 12:00 முதல் 1:00 மணி வரை
              </span>
              <span className="font-serif font-bold text-xs text-[#9D174D] block mt-0.5">
                12:00 PM to 1:00 PM
              </span>
            </div>
          </div>

          {/* Venue with Pictorial Temple Representation */}
          <div className="bg-gradient-to-r from-[#FFF5F7] via-white to-[#FFF5F7] p-3.5 rounded-2xl border border-[#E8D39A]/75 shadow-sm space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-2xl mt-0.5">🛕</span>
              <div>
                <span className="font-bold text-[#6B1D2F] block font-tamil text-[14px] leading-snug">
                  {INVITATION_CONFIG.event.tamilFullVenueDisplay}
                </span>
                <span className="font-serif font-bold text-xs text-[#9D174D] block mt-0.5">
                  {INVITATION_CONFIG.event.fullVenueDisplay}
                </span>
              </div>
            </div>

            {/* Pictorial Temple Representation */}
            <div className="relative w-full rounded-xl overflow-hidden border border-[#D4AF37]/50 shadow-[0_4px_14px_rgba(107,29,47,0.08)] bg-[#FFFDF9] group">
              <img 
                src="/temple_illustration.jpg" 
                alt="Sri Angalaparameshwari Temple" 
                className="w-full h-auto object-cover max-h-[220px] transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="bg-gradient-to-t from-[#521120]/95 via-[#6B1D2F]/80 to-transparent p-2.5 pt-6 absolute bottom-0 inset-x-0 text-center">
                <span className="text-[12px] font-tamil font-bold text-[#FFF8E7] drop-shadow-md block">
                  🛕 ஶ்ரீ அங்காளபரமேஸ்வரி திருக்கோவில்
                </span>
                <span className="text-[10px] font-serif font-bold tracking-wider text-[#E8D39A] uppercase block mt-0.5">
                  Kokkalai, Marapparai • Tamil Nadu
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Action Buttons: Google Maps & Add to Calendar */}
        <div className="mt-5 flex gap-2 relative z-10">
          <a
            href={INVITATION_CONFIG.event.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-gradient-to-r from-[#1A73E8] to-[#1557B0] hover:from-[#1557B0] hover:to-[#0D47A1] text-white font-bold py-2.5 px-3 rounded-xl shadow-md text-xs flex items-center justify-center gap-1.5 transition font-tamil"
          >
            <span>📍</span>
            <span>Google Maps வழிகாட்டல்</span>
          </a>

          <button
            onClick={downloadIcs}
            className="flex-1 bg-gradient-to-r from-[#6B1D2F] via-[#8A263E] to-[#6B1D2F] hover:from-[#521120] hover:to-[#6B1D2F] text-[#FFF8E7] border border-[#D4AF37]/50 font-bold py-2.5 px-3 rounded-xl shadow-md text-xs flex items-center justify-center gap-1.5 transition font-tamil"
          >
            <span>📅</span>
            <span>காலெண்டரில் சேர்க்க</span>
          </button>
        </div>

      </div>

    </section>
  );
};
