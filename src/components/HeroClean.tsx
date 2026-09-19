import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Activity } from 'lucide-react';
import { Minimalist3DGlobe } from '../canvas/Minimalist3DGlobe';
import { StripeGradientWave } from '../canvas/StripeGradientWave';
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
      {/* Stripe Signature Dynamic Gradient Wave Canvas */}
      <StripeGradientWave theme={theme} />

      {/* Ambient Mesh Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[400px] bg-gradient-to-tr from-[#0A6CDB]/20 via-[#9047FF]/15 to-cyan-400/20 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Hero Content (LocalhostHQ + Stripe Typography Rhythm) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Eyebrow Pill in LocalhostHQ / Stripe Style */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#0A6CDB] animate-pulse"></span>
            <span>FOR THE 0 TO 1 PHASE // DIGITAL ENGINEERING LAB</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.06]">
            Engineering new forms of <br />
            <span className="bg-gradient-to-r from-[#0A6CDB] via-[#38BDF8] to-[#9047FF] bg-clip-text text-transparent">
              intelligent software
            </span>{' '}
            and systems.
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-xl leading-relaxed max-w-2xl font-normal">
            Kosal is a founder-led product engineering lab building dependable software for ambitious companies — from autonomous AI voice pipelines to flagship platforms like <strong className="text-slate-900 dark:text-white font-semibold">Airix</strong>, <strong className="text-slate-900 dark:text-white font-semibold">Aivida</strong>, and <strong className="text-slate-900 dark:text-white font-semibold">Astronomy</strong>.
          </p>

          {/* Pill CTAs (LocalhostHQ & Stripe Style) */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => {
                playUiChime('click');
                onOpenBrief();
              }}
              className="px-7 py-3.5 rounded-full bg-[#0A6CDB] hover:bg-[#085bb8] text-white font-medium text-sm font-mono tracking-wider flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all hover:translate-y-[-1px]"
            >
              <span>INITIATE PROJECT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                playUiChime('click');
                onExploreDemos();
              }}
              className="px-7 py-3.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 hover:border-slate-400 text-slate-700 dark:text-slate-200 font-mono text-sm tracking-wider transition-all hover:translate-y-[-1px] shadow-sm"
            >
              EXPLORE PRODUCTS &darr;
            </button>
          </div>

          {/* Stripe-style Clean Metrics Row */}
          <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-3 gap-6 max-w-lg">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                &lt; 350ms
              </div>
              <div className="text-xs font-mono text-slate-500 mt-0.5">Voice AI Latency</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                100%
              </div>
              <div className="text-xs font-mono text-slate-500 mt-0.5">Meta Cloud Automation</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
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
