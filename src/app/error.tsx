"use client";

import React, { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Caught client runtime error:", error);
  }, [error]);

  return (
    <div 
      translate="no" 
      className="notranslate min-h-screen bg-gradient-to-b from-[#FFF5F7] via-[#FDF0F3] to-[#FCE8ED] flex items-center justify-center p-6 text-center"
    >
      <div className="max-w-[360px] w-full bg-white/95 backdrop-blur-md border-2 border-[#D4AF37]/70 rounded-3xl p-6 shadow-2xl">
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-[#996515] via-[#D4AF37] to-[#FFF2A6] flex items-center justify-center text-[#521120] text-2xl shadow-md mb-4">
          🌸
        </div>
        <h2 className="text-xl font-bold text-[#6B1D2F] font-serif">
          பேபி. ஜீஷிகா
        </h2>
        <p className="text-sm font-semibold text-[#8A263E] mt-1">
          செவிப்பொன் சேர்ப்பு விழா
        </p>
        <p className="text-xs text-[#7A2638] mt-3 leading-relaxed">
          அழைப்பிதழை மீண்டும் ஏற்ற கீழே உள்ள பொத்தானைத் தொடவும்.
        </p>
        <button
          onClick={() => {
            if (typeof window !== "undefined") {
              window.location.reload();
            } else {
              reset();
            }
          }}
          className="mt-5 w-full bg-gradient-to-r from-[#6B1D2F] to-[#8A263E] text-[#FFF8E7] border border-[#D4AF37] py-2.5 px-4 rounded-xl font-bold text-xs shadow-md active:scale-95 transition"
        >
          🔄 மீண்டும் ஏற்றுக • RELOAD INVITATION
        </button>
      </div>
    </div>
  );
}
