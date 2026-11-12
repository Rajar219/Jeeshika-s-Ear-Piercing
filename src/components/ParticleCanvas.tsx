"use client";

import React, { useEffect, useRef } from "react";

export const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Respect user's prefers-reduced-motion accessibility setting
    if (typeof window !== "undefined") {
      const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (motionQuery.matches) {
        return;
      }
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = Math.min(window.innerWidth, 430);
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    // Soft Gold Floating Particle Class (drifts gently downwards with subtle shimmer)
    class GoldParticle {
      x: number = 0;
      y: number = 0;
      radius: number = 1.2;
      speedY: number = 0.35;
      swayAngle: number = 0;
      swaySpeed: number = 0.015;
      alpha: number = 0.5;
      baseAlpha: number = 0.5;

      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        if (!canvas) return;
        this.x = Math.random() * canvas.width;
        this.y = init ? Math.random() * canvas.height : -10;
        this.radius = Math.random() * 1.8 + 0.8;
        this.speedY = Math.random() * 0.4 + 0.2;
        this.swayAngle = Math.random() * Math.PI * 2;
        this.swaySpeed = Math.random() * 0.02 + 0.01;
        this.baseAlpha = Math.random() * 0.4 + 0.35;
        this.alpha = this.baseAlpha;
      }

      update() {
        if (!canvas) return;
        this.y += this.speedY;
        this.swayAngle += this.swaySpeed;
        this.x += Math.sin(this.swayAngle) * 0.5;
        this.alpha = this.baseAlpha + 0.25 * Math.sin(this.swayAngle * 2.5);

        if (this.y > canvas.height + 15 || this.x < -15 || this.x > canvas.width + 15) {
          this.reset(false);
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = `rgba(212, 175, 55, ${Math.max(0.1, Math.min(1, this.alpha))})`;
        c.shadowColor = "#D4AF37";
        c.shadowBlur = 5;
        c.fill();
        c.restore();
      }
    }

    // Realistic Floating Petal Class (light pink, ivory white, blush rose tones)
    type PetalTheme = "lightPink" | "ivoryWhite" | "blushRose";

    class Petal {
      x: number = 0;
      y: number = 0;
      size: number = 12;
      speedY: number = 0.7;
      speedX: number = 0;
      rotation: number = 0;
      rotationSpeed: number = 0.015;
      flip: number = 0;
      flipSpeed: number = 0.02;
      opacity: number = 0.8;
      theme: PetalTheme = "lightPink";

      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        if (!canvas) return;
        this.x = Math.random() * canvas.width;
        this.y = init ? Math.random() * canvas.height : -25;
        this.size = Math.random() * 8 + 8; // Varied natural sizes (8px to 16px)
        this.speedY = Math.random() * 0.6 + 0.4; // Gentle, peaceful descent
        this.speedX = Math.random() * 0.4 - 0.2;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.flip = Math.random() * Math.PI * 2;
        this.flipSpeed = Math.random() * 0.025 + 0.01;
        this.opacity = Math.random() * 0.3 + 0.55;

        // Varied natural flower petal tones
        const rand = Math.random();
        if (rand < 0.5) {
          this.theme = "lightPink";
        } else if (rand < 0.8) {
          this.theme = "ivoryWhite";
        } else {
          this.theme = "blushRose";
        }
      }

      update() {
        if (!canvas) return;
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.flip) * 0.5;
        this.rotation += this.rotationSpeed;
        this.flip += this.flipSpeed;

        if (this.y > canvas.height + 30) {
          this.reset(false);
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.translate(this.x, this.y);
        c.rotate(this.rotation);
        // Realistic 3D tumbling effect
        c.scale(Math.cos(this.flip), 1);
        c.globalAlpha = this.opacity;

        c.beginPath();
        c.moveTo(0, -this.size * 0.75);
        c.bezierCurveTo(this.size * 0.55, -this.size * 0.5, this.size * 0.7, this.size * 0.45, 0, this.size * 0.85);
        c.bezierCurveTo(-this.size * 0.7, this.size * 0.45, -this.size * 0.55, -this.size * 0.5, 0, -this.size * 0.75);
        c.closePath();

        const grad = c.createLinearGradient(0, -this.size, 0, this.size);
        if (this.theme === "ivoryWhite") {
          // Delicate pure ivory white with soft champagne/blush edge
          grad.addColorStop(0, "#FFFFFF");
          grad.addColorStop(0.7, "#FFFDF8");
          grad.addColorStop(1, "#FCE7ED");
        } else if (this.theme === "blushRose") {
          // Soft rose gold blush
          grad.addColorStop(0, "#FFCCD5");
          grad.addColorStop(0.6, "#F8BBD0");
          grad.addColorStop(1, "#F06292");
        } else {
          // Classic delicate light pink
          grad.addColorStop(0, "#FFF0F4");
          grad.addColorStop(0.5, "#FFD6E0");
          grad.addColorStop(1, "#F7A8B8");
        }

        c.fillStyle = grad;
        c.fill();

        // Subtle translucent petal vein accent
        c.beginPath();
        c.moveTo(0, -this.size * 0.5);
        c.quadraticCurveTo(this.size * 0.05, 0, 0, this.size * 0.6);
        c.strokeStyle = "rgba(255, 255, 255, 0.4)";
        c.lineWidth = 0.6;
        c.stroke();

        c.restore();
      }
    }

    // Adaptive particle counts: lighter on mobile screens to preserve smoothness
    const isMobile = window.innerWidth < 640;
    const petalCount = isMobile ? 7 : 12;
    const goldCount = isMobile ? 6 : 10;

    const petals = Array.from({ length: petalCount }, () => new Petal());
    const goldParticles = Array.from({ length: goldCount }, () => new GoldParticle());

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of petals) {
        p.update();
        p.draw(ctx);
      }

      for (const g of goldParticles) {
        g.update();
        g.draw(ctx);
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full max-w-[430px] mx-auto"
      aria-hidden="true"
    />
  );
};
