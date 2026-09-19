import React from 'react';
import { ArrowUp } from 'lucide-react';
import { playUiChime } from '../utils/audio';

export const FooterClean: React.FC = () => {
  const scrollToTop = () => {
    playUiChime('click');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-16 px-6 sm:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
        {/* Brand Column */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0A6CDB] flex items-center justify-center text-white font-bold">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
              Kosal IT Solutions LLP
            </span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
            Founder-led product engineering company based in Tirunelveli, India. Building dependable SaaS, AI voice systems, and enterprise automation engines.
          </p>

          <div className="text-[11px] font-mono text-slate-400">
            INCORPORATED 06 JUNE 2025 · TIRUNELVELI, INDIA
          </div>
        </div>

        {/* Flagship Products */}
        <div className="md:col-span-3 space-y-3">
          <div className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Flagship Products
          </div>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-mono">
            <li><a href="#products" className="hover:text-[#0A6CDB]">Airix AI Engine</a></li>
            <li><a href="#products" className="hover:text-[#0A6CDB]">Aivida Generative Video</a></li>
            <li><a href="#products" className="hover:text-[#0A6CDB]">Astronomy Deep-Tech</a></li>
            <li><a href="#ai-calling" className="hover:text-[#0A6CDB]">AI Voice Calling Agent</a></li>
            <li><a href="#engage-platform" className="hover:text-[#0A6CDB]">Engage (IG &amp; WhatsApp)</a></li>
          </ul>
        </div>

        {/* Capabilities */}
        <div className="md:col-span-2 space-y-3">
          <div className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Capabilities
          </div>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-mono">
            <li><a href="#services" className="hover:text-[#0A6CDB]">MVP &amp; SaaS</a></li>
            <li><a href="#services" className="hover:text-[#0A6CDB]">Cloud Modernization</a></li>
            <li><a href="#services" className="hover:text-[#0A6CDB]">Mobile Apps</a></li>
            <li><a href="#services" className="hover:text-[#0A6CDB]">Dedicated Squads</a></li>
            <li><a href="/ladder-academy" className="hover:text-[#0A6CDB]">Ladder Academy &nearr;</a></li>
          </ul>
        </div>

        {/* Registered Office */}
        <div className="md:col-span-3 space-y-3">
          <div className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Registered Office
          </div>
          <address className="not-italic text-xs text-slate-600 dark:text-slate-400 font-mono leading-relaxed">
            219/B, Tiruchendur Road,<br />
            Samathanapuram, Palayamkottai,<br />
            Tirunelveli – 627 002, India.<br />
            <span className="block mt-2">Tel: +91 63834 37327</span>
            <span>Email: info@kosal.io</span>
          </address>
        </div>
      </div>

      <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
        <div>
          © 2026 Kosal IT Solutions LLP. All rights reserved.
        </div>
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
