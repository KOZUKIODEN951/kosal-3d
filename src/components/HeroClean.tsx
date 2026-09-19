import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Activity } from 'lucide-react';
import { Minimalist3DGlobe } from '../canvas/Minimalist3DGlobe';
import { ThemeMode } from '../types';
import { playUiChime } from '../utils/audio';

interface HeroCleanProps {
  theme: ThemeMode;
  onOpenBrief: () => void;
  onExploreDemos: () => void;
}

export const HeroClean: React.FC<HeroCleanProps> = ({
  theme,
  onOpenBrief,
  onExploreDemos,
}) => {
  return (
    <section id="home" className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Background Subtle Stripe Mesh Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#0A6CDB]/15 via-[#9047FF]/10 to-cyan-400/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Hero Content */}
        <div className="lg:col-span-7 space-y-8">
          {/* Subtle Clean Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-xs font-mono text-slate-700 dark:text-slate-300">
            <span className="w-2 h-2 rounded-full bg-[#0A6CDB] animate-pulse"></span>
            <span>FOUNDER-LED PRODUCT ENGINEERING LAB</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.08]">
            We engineer <br />
            <span className="bg-gradient-to-r from-[#0A6CDB] via-[#38BDF8] to-[#9047FF] bg-clip-text text-transparent">
              intelligent products
            </span>{' '}
            that scale.
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-xl leading-relaxed max-w-2xl font-normal">
            Kosal helps startups and growing enterprises design, build, and modernize SaaS, AI voice systems, and omnichannel automation — including flagship platforms like <strong className="text-slate-900 dark:text-white font-semibold">Airix</strong>, <strong className="text-slate-900 dark:text-white font-semibold">Aivida</strong>, and <strong className="text-slate-900 dark:text-white font-semibold">Astronomy</strong>.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => {
                playUiChime('click');
                onOpenBrief();
              }}
              className="px-6 py-3.5 rounded-xl bg-[#0A6CDB] hover:bg-[#085bb8] text-white font-medium text-sm font-mono tracking-wider flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all hover:translate-y-[-1px]"
            >
              <span>DISCUSS YOUR PRODUCT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                playUiChime('click');
                onExploreDemos();
              }}
              className="px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-slate-400 text-slate-700 dark:text-slate-200 font-mono text-sm tracking-wider transition-colors"
            >
              INTERACTIVE DEMOS &darr;
            </button>
          </div>

          {/* Clean Trust & Metrics Row */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-3 gap-6 max-w-lg">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                &lt; 350ms
              </div>
              <div className="text-xs font-mono text-slate-500 mt-0.5">Voice AI Latency</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                100%
              </div>
              <div className="text-xs font-mono text-slate-500 mt-0.5">Omnichannel Auto</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                2025
              </div>
              <div className="text-xs font-mono text-slate-500 mt-0.5">Founded in India</div>
            </div>
          </div>
        </div>

        {/* Right 3D Wireframe Data Sphere */}
        <div className="lg:col-span-5 flex justify-center relative">
          <div className="w-full max-w-[520px]">
            <Minimalist3DGlobe theme={theme} />
          </div>
        </div>
      </div>
    </section>
  );
};
