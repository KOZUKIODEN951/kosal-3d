import React, { useEffect, useRef } from 'react';
import { ThemeMode } from '../types';

interface Minimalist3DGlobeProps {
  theme: ThemeMode;
}

interface NodePoint {
  x: number;
  y: number;
  z: number;
  label: string;
  color: string;
}

export const Minimalist3DGlobe: React.FC<Minimalist3DGlobeProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let rotX = 0.25;
    let rotY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let isHovering = false;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      isHovering = true;
    };

    const handleMouseLeave = () => {
      isHovering = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // 5 Key Product Nodes orbiting the globe
    const productNodes: NodePoint[] = [
      { x: 0.8, y: 0.3, z: 0.5, label: 'AIRIX', color: '#0A6CDB' },
      { x: -0.6, y: 0.7, z: 0.3, label: 'AIVIDA', color: '#9047FF' },
      { x: 0.2, y: -0.8, z: 0.5, label: 'ASTRONOMY', color: '#0EA5E9' },
      { x: -0.7, y: -0.4, z: -0.5, label: 'AI VOICE', color: '#10B981' },
      { x: 0.4, y: 0.6, z: -0.6, label: 'ENGAGE OMNI', color: '#F59E0B' },
    ];

    // Background stars / dots
    const dotsCount = 140;
    const dots: { theta: number; phi: number; r: number }[] = [];
    for (let i = 0; i < dotsCount; i++) {
      dots.push({
        theta: Math.random() * Math.PI * 2,
        phi: Math.acos(Math.random() * 2 - 1),
        r: 1,
      });
    }

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Smooth rotation with mouse influence
      rotY += 0.008;
      if (isHovering) {
        rotX += (mouseY * 0.4 - rotX) * 0.05;
        rotY += mouseX * 0.01;
      }

      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.38;

      // Project 3D sphere point to 2D
      const project = (x: number, y: number, z: number) => {
        // Rotate around X
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const y1 = y * cosX - z * sinX;
        const z1 = y * sinX + z * cosX;

        // Rotate around Y
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const x2 = x * cosY + z1 * sinY;
        const z2 = -x * sinY + z1 * cosY;

        const fov = 2.8;
        const scale = fov / (fov + z2 * 0.8);
        return {
          px: cx + x2 * radius * scale,
          py: cy + y1 * radius * scale,
          scale,
          visible: z2 > -1.5,
          depth: z2,
        };
      };

      // 1. Subtle ambient glow
      const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius * 1.5);
      glowGrad.addColorStop(0, theme === 'light' ? 'rgba(10, 108, 219, 0.08)' : 'rgba(10, 108, 219, 0.18)');
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // 2. Latitude & Longitude Wireframe Rings
      const ringColor = theme === 'light' ? 'rgba(10, 108, 219, 0.14)' : 'rgba(95, 166, 243, 0.2)';
      ctx.strokeStyle = ringColor;
      ctx.lineWidth = 1;

      // Latitude circles
      const latSteps = 7;
      for (let i = 1; i < latSteps; i++) {
        const phi = (i / latSteps) * Math.PI - Math.PI / 2;
        const rSub = Math.cos(phi);
        const ySub = Math.sin(phi);

        ctx.beginPath();
        const segments = 48;
        for (let j = 0; j <= segments; j++) {
          const theta = (j / segments) * Math.PI * 2;
          const p = project(Math.cos(theta) * rSub, ySub, Math.sin(theta) * rSub);
          if (j === 0) ctx.moveTo(p.px, p.py);
          else ctx.lineTo(p.px, p.py);
        }
        ctx.stroke();
      }

      // Outer boundary glow ring
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = theme === 'light' ? 'rgba(10, 108, 219, 0.25)' : 'rgba(95, 166, 243, 0.35)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // 3. Constellation Dots
      dots.forEach((d) => {
        const x = Math.sin(d.phi) * Math.cos(d.theta);
        const y = Math.cos(d.phi);
        const z = Math.sin(d.phi) * Math.sin(d.theta);
        const p = project(x, y, z);

        if (p.depth > -0.6) {
          const alpha = Math.max(0.1, (p.depth + 1) / 2);
          ctx.beginPath();
          ctx.arc(p.px, p.py, 1.2 * p.scale, 0, Math.PI * 2);
          ctx.fillStyle = theme === 'light' ? `rgba(10, 108, 219, ${alpha * 0.4})` : `rgba(160, 200, 255, ${alpha * 0.6})`;
          ctx.fill();
        }
      });

      // 4. Product Telemetry Nodes & Arcs
      const projectedNodes = productNodes.map((n) => {
        const len = Math.sqrt(n.x * n.x + n.y * n.y + n.z * n.z);
        const nx = (n.x / len) * 1.05;
        const ny = (n.y / len) * 1.05;
        const nz = (n.z / len) * 1.05;
        return {
          ...n,
          ...project(nx, ny, nz),
        };
      });

      // Connecting Arcs between nodes
      ctx.lineWidth = 1.2;
      for (let i = 0; i < projectedNodes.length; i++) {
        const next = projectedNodes[(i + 1) % projectedNodes.length];
        const current = projectedNodes[i];

        if (current.depth > -0.8 && next.depth > -0.8) {
          ctx.beginPath();
          ctx.moveTo(current.px, current.py);
          ctx.quadraticCurveTo(cx, cy, next.px, next.py);
          ctx.strokeStyle = theme === 'light' ? 'rgba(10, 108, 219, 0.22)' : 'rgba(144, 71, 255, 0.3)';
          ctx.stroke();
        }
      }

      // Render Nodes & Labels
      projectedNodes.forEach((n) => {
        if (n.depth > -0.7) {
          const alpha = Math.max(0.2, (n.depth + 1) / 2);

          // Outer pulse ring
          ctx.beginPath();
          ctx.arc(n.px, n.py, 8 * n.scale, 0, Math.PI * 2);
          ctx.strokeStyle = `${n.color}44`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Core node
          ctx.beginPath();
          ctx.arc(n.px, n.py, 4 * n.scale, 0, Math.PI * 2);
          ctx.fillStyle = n.color;
          ctx.shadowColor = n.color;
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Telemetry Label
          ctx.font = `600 ${Math.round(11 * n.scale)}px "JetBrains Mono", monospace`;
          ctx.fillStyle = theme === 'light' ? '#0f172a' : '#ffffff';
          ctx.fillText(n.label, n.px + 12 * n.scale, n.py + 4 * n.scale);
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [theme]);

  return (
    <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[540px] flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />
    </div>
  );
};
