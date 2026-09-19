import React, { useEffect, useRef } from 'react';
import { ThemeMode } from '../types';

interface StripeGradientWaveProps {
  theme?: ThemeMode;
}

export const StripeGradientWave: React.FC<StripeGradientWaveProps> = ({ theme = 'light' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.parentElement ? canvas.parentElement.clientWidth * dpr : window.innerWidth * dpr;
      canvas.height = canvas.parentElement ? canvas.parentElement.clientHeight * dpr : 600 * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Color palettes for Stripe-style fluid mesh
    const colorsLight = [
      { r: 10, g: 108, b: 219, a: 0.28 },   // Stripe Electric Blue
      { r: 99, g: 102, b: 241, a: 0.22 },  // Indigo
      { r: 236, g: 72, b: 153, a: 0.18 },  // Magenta Pink
      { r: 6, g: 182, b: 212, a: 0.24 },   // Cyan
      { r: 16, g: 185, b: 129, a: 0.14 },  // Emerald
    ];

    const colorsDark = [
      { r: 14, g: 116, b: 235, a: 0.45 },
      { r: 129, g: 140, b: 248, a: 0.35 },
      { r: 244, g: 114, b: 182, a: 0.25 },
      { r: 34, g: 211, b: 238, a: 0.35 },
      { r: 52, g: 211, b: 153, a: 0.2 },
    ];

    const render = () => {
      time += 0.008;
      const w = canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
      const h = canvas.height / (Math.min(window.devicePixelRatio || 1, 2));

      ctx.clearRect(0, 0, w, h);

      const colors = theme === 'dark' ? colorsDark : colorsLight;

      // Draw multi-layered diagonal flowing wave curves (Stripe signature)
      ctx.save();
      // Rotate slightly for the signature Stripe diagonal pitch
      ctx.translate(w / 2, h / 2);
      ctx.rotate((-12 * Math.PI) / 180);
      ctx.translate(-w / 2, -h / 2);

      const numWaves = 4;
      for (let i = 0; i < numWaves; i++) {
        const col = colors[i % colors.length];
        ctx.beginPath();

        const baseY = h * 0.25 + i * 70;
        ctx.moveTo(-100, baseY);

        for (let x = -100; x <= w + 100; x += 40) {
          const y =
            baseY +
            Math.sin(x * 0.003 + time * 1.2 + i * 1.5) * 60 +
            Math.cos(x * 0.005 - time * 0.8 + i) * 35;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(w + 100, h + 200);
        ctx.lineTo(-100, h + 200);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0, `rgba(${col.r}, ${col.g}, ${col.b}, ${col.a})`);
        const nextCol = colors[(i + 1) % colors.length];
        grad.addColorStop(1, `rgba(${nextCol.r}, ${nextCol.g}, ${nextCol.b}, 0.05)`);

        ctx.fillStyle = grad;
        ctx.filter = 'blur(45px)';
        ctx.fill();
      }

      ctx.restore();
      ctx.filter = 'none';

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [theme]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-90 transition-opacity duration-700"
        style={{ filter: 'blur(30px)' }}
      />
    </div>
  );
};
