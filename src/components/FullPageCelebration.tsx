"use client";

import React, { useEffect, useRef } from "react";

interface CelebrationProps {
  active: boolean;
  onFinish?: () => void;
}

export const FullPageCelebration: React.FC<CelebrationProps> = ({ active, onFinish }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animId: number;
    let startTime = Date.now();
    const DURATION = 4600; // 4.6 seconds of energetic fireworks

    // Particle Structures
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      size: number;
      decay: number;
      gravity: number;
      drag: number;
      isSpark?: boolean;
    }

    const particles: Particle[] = [];

    // Helper to spawn Pusvaanam (Flowerpot Fountain) at bottom
    const spawnPusvaanam = (baseX: number) => {
      const colors = ["#FFF8D0", "#FFE066", "#FFD700", "#FFB347", "#FFA07A", "#FF6B8B"];
      for (let i = 0; i < 75; i++) {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.7; // Shooting upward
        const speed = Math.random() * 14 + 10;
        particles.push({
          x: baseX + (Math.random() - 0.5) * 20,
          y: canvas.height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1.0,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 3 + 1.2,
          decay: Math.random() * 0.016 + 0.012,
          gravity: 0.32,
          drag: 0.985,
          isSpark: true,
        });
      }
    };

    // Helper to spawn Aerial Firework Burst
    const spawnAerialBurst = (bx: number, by: number) => {
      const burstColors = [
        ["#FFF2A6", "#D4AF37", "#FFD700"],
        ["#FFB5C5", "#E8B7C4", "#FF6B8B"],
        ["#FFFFFF", "#FFE58F", "#E8D39A"],
      ];
      const palette = burstColors[Math.floor(Math.random() * burstColors.length)];

      for (let i = 0; i < 85; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 9 + 2;
        particles.push({
          x: bx,
          y: by,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1.0,
          color: palette[Math.floor(Math.random() * palette.length)],
          size: Math.random() * 3 + 1.5,
          decay: Math.random() * 0.02 + 0.015,
          gravity: 0.12,
          drag: 0.965,
          isSpark: false,
        });
      }
    };

    // Initial immediate bursts
    spawnAerialBurst(canvas.width * 0.5, canvas.height * 0.32);
    spawnAerialBurst(canvas.width * 0.3, canvas.height * 0.25);
    spawnAerialBurst(canvas.width * 0.7, canvas.height * 0.28);
    spawnPusvaanam(canvas.width * 0.35);
    spawnPusvaanam(canvas.width * 0.65);

    // Continuous waves of fireworks during the 4.6s window
    let nextBurstTime = 300;
    let nextPusvaanamTime = 250;

    const render = () => {
      const elapsed = Date.now() - startTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (elapsed < DURATION - 800) {
        if (elapsed > nextBurstTime) {
          spawnAerialBurst(
            canvas.width * (0.2 + Math.random() * 0.6),
            canvas.height * (0.18 + Math.random() * 0.32)
          );
          nextBurstTime = elapsed + Math.random() * 450 + 250;
        }

        if (elapsed > nextPusvaanamTime) {
          spawnPusvaanam(canvas.width * (0.2 + Math.random() * 0.6));
          nextPusvaanamTime = elapsed + Math.random() * 350 + 200;
        }
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        if (p.isSpark) {
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 4;
        }
        ctx.fill();
        ctx.restore();
      }

      if (elapsed < DURATION || particles.length > 0) {
        animId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (onFinish) {
          setTimeout(onFinish, 0);
        }
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [active, onFinish]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
    />
  );
};

