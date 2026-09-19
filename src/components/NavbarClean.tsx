import React, { useState, useEffect } from 'react';
import { Sun, Moon, ArrowRight, Menu, X } from 'lucide-react';
import { ThemeMode } from '../types';
import { playUiChime } from '../utils/audio';

interface NavbarCleanProps {
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  onOpenBrief: () => void;
}

export const NavbarClean: React.FC<NavbarCleanProps> = ({
  theme,
  setTheme,
  onOpenBrief,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [liveTime, setLiveTime] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      };
      setLiveTime(new Intl.DateTimeFormat('en-GB', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: 'Products', href: '#products' },
    { label: 'AI Voice Calling', href: '#ai-calling' },
    { label: 'Engage Platform', href: '#engage-platform' },
    { label: 'Services', href: '#services' },
    { label: 'Why Kosal', href: '#why-kosal' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          className="flex items-center gap-2.5 group"
          onMouseEnter={() => playUiChime('hover')}
        >
          <div className="w-8 h-8 rounded-lg bg-[#0A6CDB] flex items-center justify-center text-white font-bold transition-transform group-hover:scale-105">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-white leading-none">
              KOSAL
            </span>
            <span className="text-[9px] font-mono tracking-widest text-[#0A6CDB]">
              IT SOLUTIONS
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-mono font-medium text-slate-600 dark:text-slate-300">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onMouseEnter={() => playUiChime('hover')}
              className="hover:text-[#0A6CDB] dark:hover:text-[#38BDF8] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Live Telemetry Time */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>TIRUNELVELI: {liveTime} IST</span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => {
              playUiChime('click');
              setTheme(theme === 'dark' ? 'light' : 'dark');
            }}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => {
              playUiChime('click');
              onOpenBrief();
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0A6CDB] hover:bg-[#085bb8] text-white font-mono text-xs font-semibold shadow-md shadow-blue-500/20 transition-all"
          >
            <span>DISCUSS PROJECT</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-6 py-6 space-y-4 animate-fadeIn">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-slate-700 dark:text-slate-200 py-2 border-b border-slate-100 dark:border-slate-800"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBrief();
            }}
            className="w-full py-3 rounded-xl bg-[#0A6CDB] text-white font-mono text-xs font-semibold flex items-center justify-center gap-2"
          >
            <span>DISCUSS PROJECT</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </header>
  );
};
