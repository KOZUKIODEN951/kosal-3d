import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Sun, Moon, Zap, ArrowUpRight, Terminal } from 'lucide-react';
import { PerformanceMode, ThemeMode } from '../types';
import { toggleAudio, getAudioFrequencyData, playUiChime } from '../utils/audio';

interface NavbarProps {
  perfMode: PerformanceMode;
  setPerfMode: (mode: PerformanceMode) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  onOpenBrief: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  perfMode,
  setPerfMode,
  theme,
  setTheme,
  onOpenBrief,
}) => {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [tirunelveliTime, setTirunelveliTime] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animIdRef = useRef<number | null>(null);

  // Update live Tirunelveli (IST) time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setTirunelveliTime(new Intl.DateTimeFormat('en-GB', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Track scroll for sticky backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Real-time Canvas Audio Visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dataArray = new Uint8Array(16);

    const renderViz = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      getAudioFrequencyData(dataArray);

      const barCount = 10;
      const barWidth = 2.5;
      const gap = 2;
      const startX = (canvas.width - (barCount * (barWidth + gap))) / 2;

      for (let i = 0; i < barCount; i++) {
        let val = isAudioActive ? dataArray[i * 2] / 255 : 0.05 + Math.sin(Date.now() * 0.003 + i) * 0.04;
        val = Math.max(0.08, val);
        const barHeight = val * (canvas.height - 4);
        const y = (canvas.height - barHeight) / 2;

        ctx.fillStyle = isAudioActive ? (theme === 'light' ? '#0A6CDB' : '#5FA6F3') : (theme === 'light' ? '#9999aa' : '#555566');
        ctx.beginPath();
        ctx.roundRect(startX + i * (barWidth + gap), y, barWidth, barHeight, 1.5);
        ctx.fill();
      }

      animIdRef.current = requestAnimationFrame(renderViz);
    };

    renderViz();
    return () => {
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
    };
  }, [isAudioActive, theme]);

  const handleAudioToggle = () => {
    const state = toggleAudio();
    setIsAudioActive(state);
    playUiChime('click');
  };

  const cyclePerfMode = () => {
    playUiChime('click');
    if (perfMode === 'low') setPerfMode('high');
    else if (perfMode === 'high') setPerfMode('ultra');
    else setPerfMode('low');
  };

  const toggleTheme = () => {
    playUiChime('click');
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-3 backdrop-blur-xl bg-[#08080a]/80 dark:bg-[#08080a]/80 border-b border-white/5 light:bg-white/80 light:border-black/5'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo & Telemetry */}
        <div className="flex items-center gap-5">
          <a
            href="#home"
            className="flex items-center gap-3 group"
            onMouseEnter={() => playUiChime('hover')}
          >
            {/* Custom Glowing Kosal Geometric Emblem */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0A6CDB] to-[#9047FF] p-[1.5px] transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#0c0c10] dark:bg-[#0c0c10] light:bg-white rounded-[10px] flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-[#0A6CDB]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-manrope font-extrabold text-base tracking-tight text-white light:text-[#110C22]">
                KOSAL
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#0A6CDB]">
                IT SOLUTIONS
              </span>
            </div>
          </a>

          {/* System Telemetry Tag (Hidden on mobile) */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 dark:border-white/10 light:border-black/10 bg-white/5 dark:bg-white/5 light:bg-black/5 text-[11px] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-zinc-400">SYS: ACTIVE</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400">TIRUNELVELI: {tirunelveliTime || '16:30:00'} IST</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-xs tracking-wider uppercase font-mono">
          <a
            href="#services"
            className="text-zinc-400 hover:text-white light:text-zinc-600 light:hover:text-black transition-colors"
            onMouseEnter={() => playUiChime('hover')}
          >
            Services
          </a>
          <a
            href="#why-kosal"
            className="text-zinc-400 hover:text-white light:text-zinc-600 light:hover:text-black transition-colors"
            onMouseEnter={() => playUiChime('hover')}
          >
            Why Kosal
          </a>
          <a
            href="#about"
            className="text-zinc-400 hover:text-white light:text-zinc-600 light:hover:text-black transition-colors"
            onMouseEnter={() => playUiChime('hover')}
          >
            About
          </a>
          <a
            href="#brief"
            className="text-zinc-400 hover:text-white light:text-zinc-600 light:hover:text-black transition-colors"
            onMouseEnter={() => playUiChime('hover')}
          >
            Brief Builder
          </a>
        </nav>

        {/* Interactive Controls (Audio Synth, Perf Mode, Theme, CTA) */}
        <div className="flex items-center gap-3">
          {/* Audio Synthesizer Toggle & Visualizer */}
          <button
            onClick={handleAudioToggle}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 text-xs font-mono ${
              isAudioActive
                ? 'border-[#0A6CDB] bg-[#0A6CDB]/15 text-[#5FA6F3] shadow-[0_0_15px_rgba(10,108,219,0.3)]'
                : 'border-white/10 dark:border-white/10 light:border-black/10 text-zinc-400 hover:border-white/25'
            }`}
            title="Toggle Ambient Audio Synthesizer"
          >
            {isAudioActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 opacity-60" />}
            <canvas ref={canvasRef} width={45} height={16} className="w-[45px] h-[16px]" />
            <span className="hidden sm:inline text-[10px] tracking-wider uppercase">
              {isAudioActive ? 'SYNTH' : 'MUTE'}
            </span>
          </button>

          {/* Performance Mode Switcher */}
          <button
            onClick={cyclePerfMode}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-white/10 dark:border-white/10 light:border-black/10 text-xs font-mono text-zinc-400 hover:border-white/30 transition-colors"
            title="Toggle 3D Shaders Performance Level"
          >
            <Zap className={`w-3.5 h-3.5 ${perfMode === 'ultra' ? 'text-amber-400' : perfMode === 'high' ? 'text-[#0A6CDB]' : 'text-zinc-500'}`} />
            <span className="text-[10px] uppercase">{perfMode}</span>
          </button>

          {/* Dark / Light Mode */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-white/10 dark:border-white/10 light:border-black/10 text-zinc-400 hover:text-white light:hover:text-black transition-colors"
            title="Switch Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Discuss Project CTA */}
          <button
            onClick={() => {
              playUiChime('click');
              onOpenBrief();
            }}
            className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0A6CDB] hover:bg-[#085bb8] text-white font-medium text-xs font-mono tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(10,108,219,0.4)] hover:shadow-[0_0_25px_rgba(10,108,219,0.7)]"
          >
            <span>DISCUSS PROJECT</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
