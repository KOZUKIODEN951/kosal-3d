import React from 'react';
import { ArrowUp, Terminal, Shield, Sparkles } from 'lucide-react';
import { playUiChime } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    playUiChime('click');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 dark:border-white/10 light:border-black/10 pt-20 pb-12 px-6 sm:px-12 max-w-7xl mx-auto z-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        {/* Brand statement */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0A6CDB] to-[#9047FF] p-[1.5px]">
              <div className="w-full h-full bg-[#0c0c10] dark:bg-[#0c0c10] light:bg-white rounded-[9px] flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-[#0A6CDB]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              </div>
            </div>
            <span className="font-manrope font-extrabold text-xl tracking-tight text-white light:text-black">
              Kosal IT Solutions LLP
            </span>
          </div>

          <p className="text-zinc-400 light:text-zinc-600 text-sm leading-relaxed max-w-sm">
            Product engineering for dependable SaaS, AI, web, and mobile software. High fidelity digital experiences designed and shipped with precision.
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>CORPORATE ID: INCORPORATED 06 JUNE 2025</span>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="md:col-span-3 space-y-4">
          <div className="text-xs font-mono text-[#0A6CDB] uppercase tracking-wider">
            NAVIGATION
          </div>
          <ul className="space-y-2.5 text-sm font-mono text-zinc-400 light:text-zinc-600">
            <li>
              <a href="#home" className="hover:text-white light:hover:text-black transition-colors">
                // 01 Home
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-white light:hover:text-black transition-colors">
                // 02 Services
              </a>
            </li>
            <li>
              <a href="#why-kosal" className="hover:text-white light:hover:text-black transition-colors">
                // 03 Why Kosal
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-white light:hover:text-black transition-colors">
                // 04 About Us
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white light:hover:text-black transition-colors">
                // 05 Project Brief
              </a>
            </li>
            <li>
              <span className="text-[#0A6CDB] cursor-pointer hover:underline">
                // 06 Ladder Academy &nearr;
              </span>
            </li>
          </ul>
        </div>

        {/* Contact & Location */}
        <div className="md:col-span-4 space-y-4">
          <div className="text-xs font-mono text-[#0A6CDB] uppercase tracking-wider">
            REGISTERED OFFICE
          </div>
          <address className="not-italic text-sm text-zinc-400 light:text-zinc-600 leading-relaxed font-mono">
            219/B, Tiruchendur Road,<br />
            Samathanapuram, Palayamkottai,<br />
            Tirunelveli – 627 002, Tamil Nadu, India.
          </address>
          <div className="space-y-1 font-mono text-xs">
            <div>
              <span className="text-zinc-500">Phone: </span>
              <a href="tel:+916383437327" className="text-white light:text-black hover:text-[#0A6CDB]">
                +91 63834 37327
              </a>
            </div>
            <div>
              <span className="text-zinc-500">Email: </span>
              <a href="mailto:info@kosal.io" className="text-white light:text-black hover:text-[#0A6CDB]">
                info@kosal.io
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Giant Background Watermark Display (Emotion Agency Signature) */}
      <div className="overflow-hidden select-none py-6 my-6 border-y border-white/5 opacity-25 hover:opacity-40 transition-opacity">
        <div className="font-manrope font-black text-5xl sm:text-7xl lg:text-9xl tracking-tighter text-center whitespace-nowrap bg-gradient-to-r from-zinc-700 via-white to-zinc-700 light:from-zinc-300 light:via-black light:to-zinc-300 bg-clip-text text-transparent">
          KOSAL IT SOLUTIONS
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
        <div>
          © {new Date().getFullYear()} Kosal IT Solutions LLP. All rights reserved.
        </div>

        <div className="flex items-center gap-6">
          <span>TIRUNELVELI, TAMIL NADU, INDIA</span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            title="Back to Top"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
