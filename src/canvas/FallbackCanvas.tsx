import React, { useEffect, useRef } from 'react';
import { PerformanceMode, ThemeMode } from '../types';

interface FallbackCanvasProps {
  scrollProgress: number;
  mousePos: { x: number; y: number };
  perfMode: PerformanceMode;
  theme: ThemeMode;
}

export const FallbackCanvas: React.FC<FallbackCanvasProps> = ({
  scrollProgress,
  mousePos,
  perfMode,
  theme,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Cosmic dust particles
    const particleCount = perfMode === 'low' ? 70 : 160;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.5 + 0.4,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      time += 0.022;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      // 2. Position on Desktop (Well-spaced to the right of text)
      let targetX = width > 1100 ? width * 0.76 : width > 768 ? width * 0.70 : width * 0.5;
      let targetY = height * 0.50;
      let baseRadius = width > 1024 ? Math.min(width, height) * 0.19 : Math.min(width, height) * 0.24;

      if (time < 0.05) {
        console.log('[CANVAS DIAG]', { width, height, innerW: window.innerWidth, innerH: window.innerHeight, targetX, baseRadius });
      }

      if (scrollProgress >= 0.25 && scrollProgress < 0.5) {
        // Services stage: moves to left
        targetX = width > 1024 ? width * 0.22 : width * 0.5;
        targetY = height * 0.45;
      } else if (scrollProgress >= 0.5 && scrollProgress < 0.75) {
        // Why Kosal stage: centered
        targetX = width * 0.5;
        targetY = height * 0.5;
        baseRadius *= 1.2;
      } else if (scrollProgress >= 0.75) {
        // Brief stage: upper right
        targetX = width > 1024 ? width * 0.78 : width * 0.5;
        targetY = height * 0.38;
        baseRadius *= 0.85;
      }

      // Smooth cursor parallax
      const cx = targetX + mousePos.x * 20;
      const cy = targetY - mousePos.y * 20;

      // 3. Ambient Radiant Backlight
      const coronaGrad = ctx.createRadialGradient(cx, cy, baseRadius * 0.2, cx, cy, baseRadius * 2.0);
      coronaGrad.addColorStop(0, theme === 'light' ? 'rgba(10, 108, 219, 0.2)' : 'rgba(10, 108, 219, 0.35)');
      coronaGrad.addColorStop(0.4, theme === 'light' ? 'rgba(144, 71, 255, 0.1)' : 'rgba(144, 71, 255, 0.18)');
      coronaGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = coronaGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius * 2.0, 0, Math.PI * 2);
      ctx.fill();

      // 4. Gyroscopic Orbital Rings
      const drawRing = (
        rx: number,
        ry: number,
        angle: number,
        strokeColor: string,
        lineWidth: number,
        shadowColor: string
      ) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;
        ctx.shadowColor = shadowColor;
        ctx.shadowBlur = 20;
        ctx.stroke();
        ctx.restore();
      };

      // Ring 1 (Electric Cobalt)
      drawRing(
        baseRadius * 1.55,
        baseRadius * 0.42,
        time * 0.32 + mousePos.x * 0.2,
        '#0A6CDB',
        2.4,
        '#0A6CDB'
      );

      // Ring 2 (Cosmic Violet)
      drawRing(
        baseRadius * 1.35,
        baseRadius * 0.35,
        -time * 0.26 + Math.PI / 3.2,
        '#9047FF',
        1.8,
        '#9047FF'
      );

      // Ring 3 (Luminous Cyan)
      drawRing(
        baseRadius * 1.18,
        baseRadius * 0.26,
        time * 0.42 + Math.PI / 1.7,
        '#38BDF8',
        1.5,
        '#38BDF8'
      );

      // 5. Morphing Liquid Chrome & Glass Sphere
      ctx.save();
      ctx.beginPath();

      const pointCount = 80;
      const angleStep = (Math.PI * 2) / pointCount;

      for (let i = 0; i < pointCount; i++) {
        const theta = i * angleStep;
        const noise =
          Math.sin(theta * 3 + time * 1.4) * (baseRadius * 0.07) +
          Math.cos(theta * 5 - time * 1.8) * (baseRadius * 0.04) +
          Math.sin(theta * 2 + mousePos.x * 2.0) * (baseRadius * 0.03);

        const r = baseRadius + noise;
        const x = cx + Math.cos(theta) * r;
        const y = cy + Math.sin(theta) * r;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();

      // Multi-layer Iridescent Fluid Shader Simulation
      const fluidGrad = ctx.createRadialGradient(
        cx - baseRadius * 0.3,
        cy - baseRadius * 0.35,
        baseRadius * 0.05,
        cx,
        cy,
        baseRadius * 1.05
      );

      if (theme === 'light') {
        fluidGrad.addColorStop(0, '#ffffff');
        fluidGrad.addColorStop(0.2, '#93c5fd');
        fluidGrad.addColorStop(0.5, '#0A6CDB');
        fluidGrad.addColorStop(0.8, '#1e3a8a');
        fluidGrad.addColorStop(1, '#0f172a');
      } else {
        fluidGrad.addColorStop(0, '#ffffff');
        fluidGrad.addColorStop(0.12, '#a5b4fc');
        fluidGrad.addColorStop(0.35, '#818cf8');
        fluidGrad.addColorStop(0.65, '#0A6CDB');
        fluidGrad.addColorStop(0.88, '#1e1b4b');
        fluidGrad.addColorStop(1, '#050714');
      }

      ctx.fillStyle = fluidGrad;
      ctx.shadowColor = '#0A6CDB';
      ctx.shadowBlur = 30;
      ctx.fill();

      // Specular Glass Arc (Gleaming reflection)
      ctx.beginPath();
      ctx.ellipse(
        cx - baseRadius * 0.28,
        cy - baseRadius * 0.32,
        baseRadius * 0.35,
        baseRadius * 0.16,
        -Math.PI / 4,
        0,
        Math.PI * 2
      );
      const specGrad = ctx.createRadialGradient(
        cx - baseRadius * 0.28,
        cy - baseRadius * 0.32,
        0,
        cx - baseRadius * 0.28,
        cy - baseRadius * 0.32,
        baseRadius * 0.35
      );
      specGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      specGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.45)');
      specGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = specGrad;
      ctx.fill();

      // Rim Fresnel Ring (Glowing iridescent outer rim)
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius * 0.98, 0, Math.PI * 2);
      ctx.strokeStyle = theme === 'light' ? 'rgba(10, 108, 219, 0.6)' : 'rgba(56, 189, 248, 0.7)';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#38BDF8';
      ctx.shadowBlur = 15;
      ctx.stroke();

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [scrollProgress, mousePos, perfMode, theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[3] w-full h-full"
    />
  );
};
