import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Volume2, VolumeX, Zap, Sun, Moon } from 'lucide-react';
import { PerformanceMode, ThemeMode } from '../types';
import { toggleAudio, playUiChime } from '../utils/audio';

interface MobileNavProps {
  perfMode: PerformanceMode;
  setPerfMode: (mode: PerformanceMode) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  onOpenBrief: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  perfMode,
  setPerfMode,
  theme,
  setTheme,
  onOpenBrief,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAudio, setIsAudio] = useState(false);

  const handleAudio = () => {
    const s = toggleAudio();
    setIsAudio(s);
    playUiChime('click');
  };

  const navLinks = [
    { href: '#home', label: 'Home', num: '01' },
    { href: '#services', label: 'Services', num: '02' },
    { href: '#why-kosal', label: 'Why Kosal', num: '03' },
    { href: '#about', label: 'About Us', num: '04' },
    { href: '#contact', label: 'Project Brief', num: '05' },
  ];

  return (
    <>
      {/* Floating Bottom Action Dock (Visible only on mobile/tablet) */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-sm">
        <div className="p-2 rounded-full glass-panel border border-white/20 shadow-2xl flex items-center justify-between">
          <button
            onClick={() => {
              playUiChime('click');
              setIsOpen(!isOpen);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 dark:bg-white/10 light:bg-black/10 text-xs font-mono"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            <span>{isOpen ? 'CLOSE' : 'MENU'}</span>
          </button>

          <button
            onClick={() => {
              playUiChime('click');
              onOpenBrief();
            }}
            className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#0A6CDB] text-white font-mono text-xs font-semibold shadow-[0_0_15px_rgba(10,108,219,0.5)]"
          >
            <span>DISCUSS BRIEF</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Fullscreen Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-[#08080a]/95 backdrop-blur-2xl flex flex-col justify-between p-8 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#0A6CDB] flex items-center justify-center text-white">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              </div>
              <span className="font-manrope font-extrabold text-sm tracking-tight text-white">
                KOSAL IT SOLUTIONS
              </span>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full bg-white/10 text-zinc-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav List */}
          <nav className="flex flex-col gap-6 my-auto">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  playUiChime('click');
                  setIsOpen(false);
                }}
                className="flex items-center justify-between py-2 text-2xl font-manrope font-semibold text-zinc-300 hover:text-white border-b border-white/5"
              >
                <span>{link.label}</span>
                <span className="text-xs font-mono text-[#0A6CDB]">{link.num}</span>
              </a>
            ))}
          </nav>

          {/* Bottom Settings in Drawer */}
          <div className="space-y-4 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>AUDIO AMBIENCE</span>
              <button
                onClick={handleAudio}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10"
              >
                {isAudio ? <Volume2 className="w-4 h-4 text-[#0A6CDB]" /> : <VolumeX className="w-4 h-4" />}
                <span>{isAudio ? 'ON' : 'MUTED'}</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>PERFORMANCE LEVEL</span>
              <button
                onClick={() => {
                  const next = perfMode === 'low' ? 'high' : perfMode === 'high' ? 'ultra' : 'low';
                  setPerfMode(next);
                  playUiChime('click');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span className="uppercase">{perfMode}</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>COLOR PALETTE</span>
              <button
                onClick={() => {
                  setTheme(theme === 'dark' ? 'light' : 'dark');
                  playUiChime('click');
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span className="uppercase">{theme}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
