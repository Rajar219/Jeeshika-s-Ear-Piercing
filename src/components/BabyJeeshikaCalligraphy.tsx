"use client";

import React from "react";

interface BabyJeeshikaCalligraphyProps {
  className?: string;
}

/**
 * Exact Baby Jeeshika Transparent PNG Name Artwork:
 * - Replaces Tamil and English baby-name text with the exact uploaded PNG artwork
 * - Preserves exact Tamil lettering, spelling, calligraphy, 3D gold bevel, colors, decorative crown, hearts, and bow
 * - Transparent background without white box, black shadow, extra glow, or unwanted border
 * - Fluidly responsive across all mobile screen sizes without cropping or stretching
 */
export const BabyJeeshikaCalligraphy: React.FC<BabyJeeshikaCalligraphyProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`w-full flex items-center justify-center my-1 select-none pointer-events-none ${className}`}
      style={{ isolation: "isolate" }}
    >
      <img
        src="/baby_jeeshika_name_art.png"
        alt="பேபி. ஜீஷிகா - Baby Jeeshika"
        width={1024}
        height={384}
        className="w-full max-w-[335px] sm:max-w-[370px] h-auto object-contain block mx-auto"
        loading="eager"
        decoding="async"
      />
    </div>
  );
};
