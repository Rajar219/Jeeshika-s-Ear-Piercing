import React from "react";

/**
 * Premium Botanical Floral Artwork System
 * Palette:
 * - Blush Pink Roses: #E8B7C4, #D9829B, #C25E7E, #FDE8ED
 * - White Jasmine Blossoms: #FFFFFF, #FFF9FA, #FFF275 (center)
 * - Champagne Gold Leaves & Vines: #E8D39A, #C9A34E, #996515, #D4AF37
 * - Soft Botanical Sage Foliage: #7D8F7B, #95A893, #60725E
 */

// Elegant Floral Corner Cluster for card corners
export const FloralCornerCluster: React.FC<{
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
  size?: number;
}> = ({ position = "top-right", className = "", size = 80 }) => {
  let transform = "";
  let posClass = "absolute z-0 pointer-events-none opacity-85";

  if (position === "top-right") {
    posClass += " -top-2 -right-2";
    transform = "none";
  } else if (position === "top-left") {
    posClass += " -top-2 -left-2";
    transform = "scaleX(-1)";
  } else if (position === "bottom-right") {
    posClass += " -bottom-2 -right-2";
    transform = "scaleY(-1)";
  } else if (position === "bottom-left") {
    posClass += " -bottom-2 -left-2";
    transform = "scale(-1, -1)";
  }

  return (
    <div className={`${posClass} ${className}`} style={{ transform }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Rose Gradient */}
          <radialGradient id="roseGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF0F3" />
            <stop offset="40%" stopColor="#E8B7C4" />
            <stop offset="75%" stopColor="#D9829B" />
            <stop offset="100%" stopColor="#B34B6E" />
          </radialGradient>
          {/* Gold Leaf Gradient */}
          <linearGradient id="goldLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#996515" />
          </linearGradient>
          {/* Sage Foliage Gradient */}
          <linearGradient id="sageLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B3C4B1" />
            <stop offset="100%" stopColor="#6C806A" />
          </linearGradient>
          {/* Jasmine Petal Gradient */}
          <linearGradient id="jasminePetal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FDEEF2" />
          </linearGradient>
        </defs>

        {/* Delicate Gold Vine Filigree */}
        <path
          d="M 95 10 C 80 15, 60 12, 45 28 C 35 38, 25 55, 10 90"
          stroke="url(#goldLeaf)"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 65 20 C 55 25, 45 40, 48 55"
          stroke="url(#goldLeaf)"
          strokeWidth="0.9"
          strokeLinecap="round"
          fill="none"
        />

        {/* Gold Leaves */}
        <path
          d="M 75 12 C 85 8, 92 14, 88 22 C 82 20, 78 16, 75 12 Z"
          fill="url(#goldLeaf)"
          opacity="0.9"
        />
        <path
          d="M 38 35 C 30 32, 28 42, 35 46 C 39 42, 40 38, 38 35 Z"
          fill="url(#goldLeaf)"
          opacity="0.9"
        />
        <path
          d="M 18 72 C 12 68, 10 78, 17 82 C 21 78, 20 74, 18 72 Z"
          fill="url(#goldLeaf)"
          opacity="0.85"
        />

        {/* Botanical Sage Leaves */}
        <path
          d="M 85 28 C 94 30, 96 42, 88 48 C 82 42, 80 34, 85 28 Z"
          fill="url(#sageLeaf)"
          opacity="0.85"
        />
        <path
          d="M 52 48 C 45 52, 46 64, 55 68 C 58 60, 56 52, 52 48 Z"
          fill="url(#sageLeaf)"
          opacity="0.85"
        />
        <path
          d="M 28 65 C 22 68, 24 78, 32 80 C 35 74, 33 68, 28 65 Z"
          fill="url(#sageLeaf)"
          opacity="0.8"
        />

        {/* Secondary Jasmine Flower (Small white star blossom) */}
        <g transform="translate(36, 22) scale(0.65)">
          <circle cx="0" cy="0" r="3" fill="#E8D39A" />
          <path d="M 0 -2 C 2 -9, -2 -9, 0 -2" fill="url(#jasminePetal)" />
          <path d="M 2 0 C 9 2, 9 -2, 2 0" fill="url(#jasminePetal)" />
          <path d="M 0 2 C 2 9, -2 9, 0 2" fill="url(#jasminePetal)" />
          <path d="M -2 0 C -9 2, -9 -2, -2 0" fill="url(#jasminePetal)" />
          <path d="M 1.5 1.5 C 7 7, 5 9, 1.5 1.5" fill="url(#jasminePetal)" />
          <path d="M -1.5 1.5 C -7 7, -5 9, -1.5 1.5" fill="url(#jasminePetal)" />
          <circle cx="0" cy="0" r="1.5" fill="#D4AF37" />
        </g>

        {/* Main Blush Rose Bloom */}
        <g transform="translate(68, 38)">
          {/* Outer Layer Petals */}
          <path d="M 0 -16 C 12 -16, 18 -6, 14 6 C 10 14, -4 16, -12 10 C -18 2, -14 -12, 0 -16 Z" fill="url(#roseGrad)" opacity="0.95" />
          {/* Middle Petals */}
          <path d="M -8 -8 C -4 -13, 8 -13, 11 -6 C 13 2, 6 10, -2 10 C -9 9, -11 -3, -8 -8 Z" fill="#D9829B" opacity="0.9" />
          <path d="M 6 -9 C 12 -4, 11 5, 4 8 C -2 10, -7 4, -4 -3 C -1 -8, 2 -10, 6 -9 Z" fill="#E8B7C4" />
          {/* Inner Swirl */}
          <path d="M 0 -5 C 4 -5, 6 -1, 3 3 C 0 6, -4 4, -3 0 C -2 -3, -1 -5, 0 -5 Z" fill="#9B3459" />
          <circle cx="0" cy="0" r="2.5" fill="#FFF0F3" />
        </g>

        {/* Little Rosebud */}
        <g transform="translate(24, 48)">
          <path d="M 0 0 C 5 -4, 9 0, 7 6 C 4 9, 0 8, 0 0 Z" fill="#D9829B" />
          <path d="M 2 2 C 5 -1, 7 2, 5 6 Z" fill="#FFF0F3" opacity="0.8" />
          {/* Sepal */}
          <path d="M -1 5 C 1 9, 5 8, 4 11 C 2 11, -1 8, -1 5 Z" fill="url(#goldLeaf)" />
        </g>

        {/* Delicate Golden Sparkle Specks */}
        <circle cx="82" cy="18" r="1.2" fill="#D4AF37" />
        <circle cx="48" cy="16" r="1" fill="#E8D39A" />
        <circle cx="16" cy="58" r="1.2" fill="#D4AF37" />
      </svg>
    </div>
  );
};

// Elegant Floral Divider for headings and sections
export const FloralHeaderDivider: React.FC<{
  className?: string;
  width?: string | number;
}> = ({ className = "", width = "100%" }) => {
  return (
    <div className={`flex items-center justify-center my-3 ${className}`} style={{ width }}>
      <svg
        width="240"
        height="28"
        viewBox="0 0 240 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="max-w-full"
      >
        <defs>
          <linearGradient id="divGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
            <stop offset="35%" stopColor="#D4AF37" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#E8D39A" />
            <stop offset="65%" stopColor="#D4AF37" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="divRose" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF0F3" />
            <stop offset="50%" stopColor="#E8B7C4" />
            <stop offset="100%" stopColor="#C25E7E" />
          </radialGradient>
        </defs>

        {/* Main Delicate Dividing Lines */}
        <line x1="10" y1="14" x2="95" y2="14" stroke="url(#divGold)" strokeWidth="1" strokeLinecap="round" />
        <line x1="145" y1="14" x2="230" y2="14" stroke="url(#divGold)" strokeWidth="1" strokeLinecap="round" />

        {/* Left Foliage & Bud */}
        <path d="M 85 14 C 80 10, 74 11, 72 14 C 74 17, 80 18, 85 14 Z" fill="#95A893" opacity="0.8" />
        <path d="M 75 14 C 70 8, 64 10, 65 14 Z" fill="#D4AF37" opacity="0.85" />
        <circle cx="92" cy="11" r="2" fill="#E8B7C4" />

        {/* Right Foliage & Bud */}
        <path d="M 155 14 C 160 10, 166 11, 168 14 C 166 17, 160 18, 155 14 Z" fill="#95A893" opacity="0.8" />
        <path d="M 165 14 C 170 8, 176 10, 175 14 Z" fill="#D4AF37" opacity="0.85" />
        <circle cx="148" cy="11" r="2" fill="#E8B7C4" />

        {/* Center Floral Crest: Rose with Gold Flanks */}
        <g transform="translate(120, 14)">
          {/* Jasmine Petals */}
          <circle cx="-11" cy="0" r="3" fill="#FFFFFF" stroke="#E8D39A" strokeWidth="0.5" />
          <circle cx="11" cy="0" r="3" fill="#FFFFFF" stroke="#E8D39A" strokeWidth="0.5" />
          <circle cx="-11" cy="0" r="1" fill="#D4AF37" />
          <circle cx="11" cy="0" r="1" fill="#D4AF37" />

          {/* Central Rose */}
          <circle cx="0" cy="0" r="7.5" fill="url(#divRose)" />
          <path d="M -4 -3 C -1 -6, 4 -6, 5 -2 C 6 2, 2 5, -2 4 C -5 3, -6 -1, -4 -3 Z" fill="#9B3459" opacity="0.75" />
          <circle cx="0" cy="0" r="2" fill="#FFFDF8" />
        </g>
      </svg>
    </div>
  );
};

// Subtle Botanical Vine Connector between Sections
export const BotanicalVineConnector: React.FC<{
  className?: string;
  height?: number;
}> = ({ className = "", height = 48 }) => {
  return (
    <div className={`flex flex-col items-center justify-center my-1 pointer-events-none ${className}`}>
      <svg
        width="32"
        height={height}
        viewBox="0 0 32 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="vineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {/* Curving Stem */}
        <path
          d="M 16 0 C 13 12, 19 24, 16 48"
          stroke="url(#vineGrad)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Leaves */}
        <path
          d="M 15 14 C 10 11, 8 16, 12 18 C 14 17, 15 15, 15 14 Z"
          fill="#D4AF37"
          opacity="0.75"
        />
        <path
          d="M 17 28 C 22 25, 24 30, 20 32 C 18 31, 17 29, 17 28 Z"
          fill="#95A893"
          opacity="0.8"
        />
        {/* Small Petal Droplet */}
        <circle cx="16" cy="24" r="2" fill="#E8B7C4" opacity="0.9" />
      </svg>
    </div>
  );
};

// Delicate Floral Crest for Card Headers
export const FloralCardCrest: React.FC<{
  className?: string;
}> = ({ className = "" }) => {
  return (
    <div className={`flex justify-center mb-1 pointer-events-none ${className}`}>
      <svg
        width="110"
        height="22"
        viewBox="0 0 110 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 10 11 C 25 10, 40 14, 48 11"
          stroke="#D4AF37"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <path
          d="M 100 11 C 85 10, 70 14, 62 11"
          stroke="#D4AF37"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <path d="M 32 11 C 28 8, 25 10, 26 12 Z" fill="#95A893" />
        <path d="M 78 11 C 82 8, 85 10, 84 12 Z" fill="#95A893" />
        
        {/* Center Trio of Blossom Buds */}
        <circle cx="49" cy="11" r="2.2" fill="#E8B7C4" />
        <circle cx="55" cy="10" r="3.5" fill="#C25E7E" />
        <circle cx="55" cy="10" r="1.5" fill="#FFF0F3" />
        <circle cx="61" cy="11" r="2.2" fill="#E8B7C4" />
      </svg>
    </div>
  );
};

