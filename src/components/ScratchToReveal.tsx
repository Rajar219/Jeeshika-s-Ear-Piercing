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

  const WIDTH = 300;
  const HEIGHT = 280;

  // Perfect Heart Path in 300x280 box
  const heartPathD = "M 150,260 C 150,260 20,180 20,95 C 20,40 65,15 112,42 C 138,58 150,80 150,80 C 150,80 162,58 188,42 C 235,15 280,40 280,95 C 280,180 150,260 150,260 Z";

  const triggerReveal = useCallback(() => {
    if (isRevealed) return;
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
  }, [isRevealed, onCelebrationTrigger]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    // Draw the luxury scratch coating
    ctx.save();
    const p = new Path2D(heartPathD);
    ctx.clip(p);

    // Royal Blush Pink & Champagne Gold Foil Gradient
    const grad = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
    grad.addColorStop(0, "#FAD2E1");
    grad.addColorStop(0.35, "#E8B7C4");
    grad.addColorStop(0.7, "#DDA0B2");
    grad.addColorStop(1, "#C97891");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Subtle metallic gold speckles
    for (let i = 0; i < 110; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * WIDTH, Math.random() * HEIGHT, Math.random() * 2 + 0.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 235, 160, 0.7)";
      ctx.fill();
    }

    // Inner gold decorative heart border
    ctx.strokeStyle = "rgba(212, 175, 55, 0.5)";
    ctx.lineWidth = 2.5;
    ctx.stroke(p);

    // Prompt Text on Scratch Layer
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

    let isDrawing = false;
    let lastPoint: { x: number; y: number } | null = null;

    const getPos = (e: MouseEvent | TouchEvent | PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = WIDTH / rect.width;
      const scaleY = HEIGHT / rect.height;

      if ("touches" in e) {
        const touch = e.touches[0] || (e as TouchEvent).changedTouches?.[0];
        if (touch) {
          return {
            x: (touch.clientX - rect.left) * scaleX,
            y: (touch.clientY - rect.top) * scaleY,
          };
        }
        return { x: 0, y: 0 };
      }
      return {
        x: ((e as MouseEvent).clientX - rect.left) * scaleX,
        y: ((e as MouseEvent).clientY - rect.top) * scaleY,
      };
    };

    const scratch = (x: number, y: number) => {
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();

      if (lastPoint) {
        ctx.lineWidth = 54;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      } else {
        ctx.arc(x, y, 28, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      lastPoint = { x, y };
    };

    // Calculate Scratched Percentage from the active heart area
    const checkProgress = () => {
      if (isRevealed) return;
      try {
        const imgData = ctx.getImageData(35, 45, WIDTH - 70, HEIGHT - 90);
        const data = imgData.data;
        let transparentPixels = 0;
        let totalSampled = 0;

        for (let i = 3; i < data.length; i += 16) {
          totalSampled++;
          if (data[i] < 128) {
            transparentPixels++;
          }
        }

        const pct = Math.round((transparentPixels / totalSampled) * 100);
        setScratchPercent(pct);

        // Smooth responsive threshold: 38% triggers completion and celebration
        if (pct >= 38 && !isRevealed) {
          triggerReveal();
        }
      } catch (err) {
        console.warn("Scratch check:", err);
      }
    };

    // Unified Pointer Events (Mouse, Touch, Stylus)
    const onPointerDown = (e: PointerEvent) => {
      isDrawing = true;
      try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
      const { x, y } = getPos(e);
      lastPoint = { x, y };
      scratch(x, y);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDrawing) return;
      const { x, y } = getPos(e);
      scratch(x, y);
      checkProgress();
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isDrawing) return;
      isDrawing = false;
      lastPoint = null;
      try { canvas.releasePointerCapture(e.pointerId); } catch (_) {}
      checkProgress();
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
    };
  }, [isRevealed, triggerReveal]);

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
          <span className="text-sm font-serif font-bold tracking-[0.25em] text-[#9B3459] uppercase block mb-1">
            MONDAY
          </span>

          {/* 18 JANUARY 2027 */}
          <div className="my-1.5 border-t border-b border-[#D4AF37]/50 py-2.5 w-4/5 text-center">
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
          style={{ clipPath: "url(#revealHeartClip)" }}
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
