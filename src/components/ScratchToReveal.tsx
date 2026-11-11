"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { INVITATION_CONFIG } from "@/config/invitation";

interface ScratchProps {
  onCelebrationTrigger?: () => void;
}

export const ScratchToReveal: React.FC<ScratchProps> = ({ onCelebrationTrigger }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const isRevealedRef = useRef(false);

  const WIDTH = 300;
  const HEIGHT = 280;

  // Perfect Heart SVG Path Definition in 300x280 box
  const heartPathD = "M 150,260 C 150,260 20,180 20,95 C 20,40 65,15 112,42 C 138,58 150,80 150,80 C 150,80 162,58 188,42 C 235,15 280,40 280,95 C 280,180 150,260 150,260 Z";

  // Standard Canvas 2D Heart Path (Universal mobile & Android support without Path2D dependency)
  const drawHeartPath = (c: CanvasRenderingContext2D) => {
    c.beginPath();
    c.moveTo(150, 260);
    c.bezierCurveTo(150, 260, 20, 180, 20, 95);
    c.bezierCurveTo(20, 40, 65, 15, 112, 42);
    c.bezierCurveTo(138, 58, 150, 80, 150, 80);
    c.bezierCurveTo(150, 80, 162, 58, 188, 42);
    c.bezierCurveTo(235, 15, 280, 40, 280, 95);
    c.bezierCurveTo(280, 180, 150, 260, 150, 260);
    c.closePath();
  };

  const triggerReveal = useCallback(() => {
    if (isRevealedRef.current) return;
    isRevealedRef.current = true;
    setIsRevealed(true);
    setScratchPercent(100);

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.transition = "opacity 0.6s ease-out";
      canvas.style.opacity = "0";
      canvas.style.pointerEvents = "none";
    }

    if (onCelebrationTrigger) {
      onCelebrationTrigger();
    }
  }, [onCelebrationTrigger]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use willReadFrequently to optimize getImageData on mobile browsers
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // High-DPI support for razor-sharp scratch layer on modern mobile screens
    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 3) : 1;
    canvas.width = WIDTH * dpr;
    canvas.height = HEIGHT * dpr;
    canvas.style.width = `${WIDTH}px`;
    canvas.style.height = `${HEIGHT}px`;

    ctx.save();
    ctx.scale(dpr, dpr);

    // 1. Clip inside heart shape using standard Canvas 2D path
    drawHeartPath(ctx);
    ctx.clip();

    // 2. Royal Blush Pink & Champagne Gold Foil Gradient
    const grad = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
    grad.addColorStop(0, "#FAD2E1");
    grad.addColorStop(0.35, "#E8B7C4");
    grad.addColorStop(0.7, "#DDA0B2");
    grad.addColorStop(1, "#C97891");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // 3. Subtle metallic gold speckles
    for (let i = 0; i < 110; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * WIDTH, Math.random() * HEIGHT, Math.random() * 2 + 0.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 235, 160, 0.7)";
      ctx.fill();
    }

    // 4. Inner gold decorative heart border
    drawHeartPath(ctx);
    ctx.strokeStyle = "rgba(212, 175, 55, 0.5)";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // 5. Prompt Text on Scratch Layer
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.font = "26px sans-serif";
    ctx.fillText("🪙", 150, 95);

    ctx.font = "bold 13px 'JeeshikaTamil', sans-serif";
    ctx.fillStyle = "#6B1D2F";
    ctx.fillText("இதயத்தைத் தேய்த்துப் பாருங்கள்", 150, 134);

    ctx.font = "bold 11px sans-serif";
    ctx.fillStyle = "#521120";
    ctx.fillText("✨ SCRATCH HERE TO REVEAL ✨", 150, 158);

    ctx.font = "18px sans-serif";
    ctx.fillText("👆", 150, 192);

    ctx.restore();

    let isScratching = false;
    let lastPoint: { x: number; y: number } | null = null;
    let checkAnimFrameId: number | null = null;

    // Safe coordinate calculation with bound checking
    const getCoords = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect || rect.width <= 0 || rect.height <= 0) {
        return { x: 150, y: 140 };
      }
      const scaleX = WIDTH / rect.width;
      const scaleY = HEIGHT / rect.height;
      const x = (clientX - rect.left) * scaleX;
      const y = (clientY - rect.top) * scaleY;
      return {
        x: Number.isFinite(x) ? Math.max(0, Math.min(WIDTH, x)) : 150,
        y: Number.isFinite(y) ? Math.max(0, Math.min(HEIGHT, y)) : 140,
      };
    };

    const scratch = (x: number, y: number) => {
      if (!Number.isFinite(x) || !Number.isFinite(y)) return;
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();

      if (lastPoint && Number.isFinite(lastPoint.x) && Number.isFinite(lastPoint.y)) {
        ctx.lineWidth = 50;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      } else {
        ctx.arc(x, y, 25, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      lastPoint = { x, y };
    };

    // Calculate Scratched Percentage from the active heart area
    const checkProgress = () => {
      if (isRevealedRef.current) return;
      try {
        const sx = Math.floor(35 * dpr);
        const sy = Math.floor(45 * dpr);
        const sw = Math.floor((WIDTH - 70) * dpr);
        const sh = Math.floor((HEIGHT - 90) * dpr);

        if (sw <= 0 || sh <= 0) return;

        const imgData = ctx.getImageData(sx, sy, sw, sh);
        const data = imgData.data;
        let transparentPixels = 0;
        let totalSampled = 0;

        for (let i = 3; i < data.length; i += 16) {
          totalSampled++;
          if (data[i] < 128) {
            transparentPixels++;
          }
        }

        if (totalSampled === 0) return;
        const pct = Math.round((transparentPixels / totalSampled) * 100);
        setScratchPercent(pct);

        // 38% triggers completion and celebration
        if (pct >= 38 && !isRevealedRef.current) {
          triggerReveal();
        }
      } catch (err) {
        console.warn("Scratch check progress error:", err);
      }
    };

    const throttledCheckProgress = () => {
      if (checkAnimFrameId !== null) return;
      checkAnimFrameId = requestAnimationFrame(() => {
        checkAnimFrameId = null;
        checkProgress();
      });
    };

    // Unified Pointer Event Handlers
    const onPointerDown = (e: PointerEvent) => {
      isScratching = true;
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch (_) {}
      const pt = getCoords(e.clientX, e.clientY);
      lastPoint = pt;
      scratch(pt.x, pt.y);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isScratching) return;
      const pt = getCoords(e.clientX, e.clientY);
      scratch(pt.x, pt.y);
      throttledCheckProgress();
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isScratching) return;
      isScratching = false;
      lastPoint = null;
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch (_) {}
      checkProgress();
    };

    // Touch Event Handlers for guaranteed mobile Android / iOS fallback
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        if (e.cancelable) e.preventDefault();
        isScratching = true;
        const touch = e.touches[0];
        const pt = getCoords(touch.clientX, touch.clientY);
        lastPoint = pt;
        scratch(pt.x, pt.y);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isScratching) return;
      if (e.touches.length > 0) {
        if (e.cancelable) e.preventDefault();
        const touch = e.touches[0];
        const pt = getCoords(touch.clientX, touch.clientY);
        scratch(pt.x, pt.y);
        throttledCheckProgress();
      }
    };

    const onTouchEnd = () => {
      if (!isScratching) return;
      isScratching = false;
      lastPoint = null;
      checkProgress();
    };

    // Attach listeners
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);

    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd);
    canvas.addEventListener("touchcancel", onTouchEnd);

    return () => {
      if (checkAnimFrameId !== null) {
        cancelAnimationFrame(checkAnimFrameId);
      }
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);

      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
      canvas.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [triggerReveal]);

  return (
    <section className="relative p-6 flex flex-col items-center text-center my-6">
      
      {/* Headings */}
      <div className="mb-4 max-w-[340px]">
        <span className="text-[10px] font-bold tracking-[0.2em] text-[#9B3459] uppercase block font-serif">
          {INVITATION_CONFIG.scratch.englishHeading}
        </span>
        <h3 className="text-2xl font-tamil font-bold text-[#6B1D2F] mt-1 leading-snug">
          {INVITATION_CONFIG.scratch.heading}
        </h3>
        <p className="text-xs text-[#7A2638] font-tamil font-normal mt-1">
          {INVITATION_CONFIG.scratch.instruction}
        </p>
      </div>

      {/* SVG Clip Path & Gold Gradient Definition */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <clipPath id="revealHeartClip" clipPathUnits="userSpaceOnUse">
            <path d={heartPathD} />
          </clipPath>
          <linearGradient id="goldHeartBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2A6" />
            <stop offset="35%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#AA771C" />
            <stop offset="100%" stopColor="#FFEAA7" />
          </linearGradient>
        </defs>
      </svg>

      {/* Heart Scratch Container */}
      <div 
        ref={containerRef}
        className="relative w-[300px] h-[280px] mx-auto filter drop-shadow-[0_14px_28px_rgba(107,29,47,0.22)] select-none"
      >
        
        {/* UNDERNEATH LAYER: ONLY DATE - BALANCED & SPACIOUS */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[#FFFDF9] via-[#FDF0F3] to-[#FCE8ED] flex flex-col items-center justify-center p-6 text-center select-none"
          style={{ clipPath: "url(#revealHeartClip)" }}
        >
          {/* MONDAY */}
          <span className="text-sm font-serif font-bold tracking-[0.28em] text-[#9B3459] uppercase block mb-1.5">
            MONDAY
          </span>

          {/* 18 JANUARY 2027 */}
          <div className="my-1 border-t border-b border-[#D4AF37]/50 py-2.5 w-4/5 flex flex-col items-center justify-center">
            <h4 className="text-3xl md:text-[34px] font-serif font-black text-[#6B1D2F] leading-none tracking-tight">
              18 JANUARY
            </h4>
            <span className="text-2xl font-serif font-black text-[#9D174D] block mt-1.5">
              2027
            </span>
          </div>
        </div>

        {/* TOP LAYER: Scratch Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-20 cursor-pointer touch-none"
          style={{ 
            clipPath: "url(#revealHeartClip)",
            touchAction: "none"
          }}
        />

        {/* PERMANENT METALLIC CHAMPAGNE-GOLD HEART OUTLINE */}
        <svg 
          width={WIDTH} 
          height={HEIGHT} 
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="absolute inset-0 pointer-events-none z-30 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
        >
          <path
            d={heartPathD}
            fill="none"
            stroke="url(#goldHeartBorder)"
            strokeWidth="5"
            strokeLinejoin="round"
          />
        </svg>

      </div>

      {/* Interactive Helper Text & Instant Reveal Button */}
      <div className="mt-3 flex flex-col items-center gap-1.5 text-xs text-[#7A2638] font-tamil font-normal">
        {scratchPercent < 38 && !isRevealed ? (
          <span>🪙 தேய்த்த நிலை: {scratchPercent}% (விரலால் தேய்க்கவும்)</span>
        ) : (
          <span className="text-emerald-700 font-bold">✨ தேதி வெற்றிகரமாக திறக்கப்பட்டது! ✨</span>
        )}

        {!isRevealed && (
          <button
            onClick={triggerReveal}
            className="mt-1 text-[11px] font-tamil font-bold text-[#9D174D] bg-white/85 hover:bg-white border border-[#D4AF37]/70 rounded-full px-3.5 py-1 shadow-sm transition active:scale-95"
          >
            ✨ தேதியை உடனே திறக்க தட்டவும்
          </button>
        )}
      </div>

    </section>
  );
};
