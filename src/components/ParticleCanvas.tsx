"use client";

import React, { useEffect, useRef } from "react";

export const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };

    resize();
    window.addEventListener("resize", resize);

    // Gold Sparkle Class
    class Sparkle {
      x: number = 0;
      y: number = 0;
      radius: number = 1;
      speedY: number = 0.5;
      swayAngle: number = 0;
      swaySpeed: number = 0.02;
      alpha: number = 0.5;

      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        if (!canvas) return;
        this.x = Math.random() * canvas.width;
        this.y = init ? Math.random() * canvas.height : canvas.height + 10;
        this.radius = Math.random() * 2.2 + 0.8;
        this.speedY = Math.random() * 0.6 + 0.25;
        this.swayAngle = Math.random() * Math.PI * 2;
        this.swaySpeed = Math.random() * 0.03 + 0.01;
        this.alpha = Math.random() * 0.7 + 0.25;
      }

      update() {
        if (!canvas) return;
        this.y -= this.speedY;
        this.swayAngle += this.swaySpeed;
        this.x += Math.sin(this.swayAngle) * 0.7;
        this.alpha = 0.4 + 0.35 * Math.sin(this.swayAngle * 2);

        if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
          this.reset(false);
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = `rgba(212, 175, 55, ${this.alpha})`;
        c.shadowColor = "#D4AF37";
        c.shadowBlur = 6;
        c.fill();
        c.restore();
      }
    }

    // 2.5D Fluttering Pink Rose Petal Class
    class Petal {
      x: number = 0;
      y: number = 0;
      size: number = 12;
      speedY: number = 0.8;
      speedX: number = 0;
      rotation: number = 0;
      rotationSpeed: number = 0.02;
      flip: number = 0;
      flipSpeed: number = 0.02;
      opacity: number = 0.8;

      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        if (!canvas) return;
        this.x = Math.random() * canvas.width;
        this.y = init ? Math.random() * canvas.height : -25;
        this.size = Math.random() * 10 + 9;
        this.speedY = Math.random() * 0.9 + 0.5;
        this.speedX = Math.random() * 0.6 - 0.3;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.025;
        this.flip = Math.random() * Math.PI * 2;
        this.flipSpeed = Math.random() * 0.03 + 0.01;
        this.opacity = Math.random() * 0.35 + 0.6;
      }

      update() {
        if (!canvas) return;
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.flip) * 0.6;
        this.rotation += this.rotationSpeed;
        this.flip += this.flipSpeed;

        if (this.y > canvas.height + 25) {
          this.reset(false);
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.translate(this.x, this.y);
        c.rotate(this.rotation);
        c.scale(Math.cos(this.flip), 1);
        c.globalAlpha = this.opacity;

        c.beginPath();
        c.moveTo(0, -this.size * 0.7);
        c.bezierCurveTo(this.size * 0.6, -this.size * 0.4, this.size * 0.65, this.size * 0.4, 0, this.size * 0.75);
        c.bezierCurveTo(-this.size * 0.65, this.size * 0.4, -this.size * 0.6, -this.size * 0.4, 0, -this.size * 0.7);
        
        const grad = c.createLinearGradient(0, -this.size, 0, this.size);
        grad.addColorStop(0, "#FFCCD5");
        grad.addColorStop(1, "#FAD2E1");
        c.fillStyle = grad;
        c.fill();

        c.restore();
      }
    }

    const sparkles = Array.from({ length: 32 }, () => new Sparkle());
    const petals = Array.from({ length: 16 }, () => new Petal());

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const s of sparkles) {
        s.update();
        s.draw(ctx);
      }

      for (const p of petals) {
        p.update();
        p.draw(ctx);
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
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
};

