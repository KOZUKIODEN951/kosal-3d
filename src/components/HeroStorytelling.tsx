import React, { useState, useEffect } from 'react';
import { ArrowDown, Sparkles, Shield, Cpu, Layers } from 'lucide-react';
import { playUiChime } from '../utils/audio';

interface HeroStorytellingProps {
  scrollProgress: number;
  onExploreServices: () => void;
  onOpenBrief: () => void;
}

export const HeroStorytelling: React.FC<HeroStorytellingProps> = ({
  scrollProgress,
  onExploreServices,
  onOpenBrief,
}) => {
  // Determine active story stage (0, 1, or 2)
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    if (scrollProgress < 0.3) {
      setActiveStage(0);
    } else if (scrollProgress < 0.6) {
      setActiveStage(1);
    } else {
      setActiveStage(2);
    }
  }, [scrollProgress]);

  return (
    <section id="home" className="relative w-full min-h-[220vh] pointer-events-none">
      {/* Sticky Fullscreen Storytelling Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between px-6 sm:px-12 py-24 sm:py-28 overflow-hidden">
        {/* Stage Progress Bar (Emotion Agency style) */}
        <div className="pointer-events-auto flex items-center justify-between max-w-7xl mx-auto w-full border-b border-white/10 dark:border-white/10 light:border-black/10 pb-4">
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-[#0A6CDB] font-semibold">STAGE // 0{activeStage + 1}</span>
            <span className="text-zinc-500">/ 03</span>
            <span className="hidden sm:inline text-zinc-400">
              {activeStage === 0
                ? 'CORE MISSION'
                : activeStage === 1
                ? 'ENGINEERING PHILOSOPHY'
                : 'STRATEGIC OUTCOMES'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {[0, 1, 2].map((idx) => (
              <div
                key={idx}
                className={`h-1 rounded-full transition-all duration-500 ${
                  activeStage === idx
                    ? 'w-10 bg-[#0A6CDB]'
                    : activeStage > idx
                    ? 'w-4 bg-zinc-400'
                    : 'w-4 bg-zinc-700 light:bg-zinc-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Story Stage Content Overlays */}
        <div className="max-w-7xl mx-auto w-full relative z-10 flex-1 flex items-center">
          {/* STAGE 1: Core Mission */}
          <div
            className={`transition-all duration-700 absolute left-0 max-w-2xl ${
              activeStage === 0
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 -translate-y-8 pointer-events-none'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A6CDB]/15 border border-[#0A6CDB]/30 text-[#0A6CDB] dark:text-[#5FA6F3] text-xs font-mono mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FOUNDER-LED PRODUCT ENGINEERING</span>
            </div>

            <h1 className="font-manrope font-bold text-4xl sm:text-6xl lg:text-7xl leading-[1.08] tracking-tight mb-6">
              Build and scale <br />
              <span className="font-editorial italic font-normal bg-gradient-to-r from-white via-[#72b3ff] to-[#0A6CDB] light:from-[#110C22] light:via-[#0A6CDB] light:to-[#9047FF] bg-clip-text text-transparent">
                dependable
              </span>{' '}
              digital products.
            </h1>

            <p className="text-zinc-400 light:text-zinc-600 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
              Kosal helps startups and growing businesses design, build, and modernize SaaS, AI, web, and mobile products—from discovery to production.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  playUiChime('click');
                  onOpenBrief();
                }}
                className="px-6 py-3.5 rounded-2xl bg-[#0A6CDB] hover:bg-[#085bb8] text-white font-medium text-sm font-mono tracking-wider transition-all shadow-[0_4px_25px_rgba(10,108,219,0.45)] hover:shadow-[0_4px_30px_rgba(10,108,219,0.7)]"
              >
                DISCUSS YOUR PRODUCT
              </button>
              <button
                onClick={() => {
                  playUiChime('click');
                  onExploreServices();
                }}
                className="px-6 py-3.5 rounded-2xl border border-white/15 dark:border-white/15 light:border-black/15 hover:bg-white/5 light:hover:bg-black/5 text-sm font-mono tracking-wider transition-colors"
              >
                EXPLORE SERVICES
              </button>
            </div>
          </div>

          {/* STAGE 2: Engineering Philosophy */}
          <div
            className={`transition-all duration-700 absolute left-0 max-w-2xl ${
              activeStage === 1
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 -translate-y-8 pointer-events-none'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-400 text-xs font-mono mb-6">
              <Shield className="w-3.5 h-3.5" />
              <span>THE KOSAL PRINCIPLE</span>
            </div>

            <h2 className="font-manrope font-bold text-4xl sm:text-6xl lg:text-7xl leading-[1.08] tracking-tight mb-6">
              We listen first. <br />
              <span className="font-editorial italic font-normal text-[#0A6CDB] dark:text-[#5FA6F3]">
                Then we build
              </span>{' '}
              with purpose.
            </h2>

            <p className="text-zinc-400 light:text-zinc-600 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
              The goal is not simply to ship more software. It is to make the right product decisions and deliver technology your team can rely on after launch.
            </p>

            <div className="grid grid-cols-2 gap-4 max-w-md">
              <div className="p-4 rounded-xl border border-white/10 dark:border-white/10 light:border-black/10 bg-white/5 dark:bg-white/5 light:bg-black/5">
                <div className="text-xs font-mono text-zinc-500 uppercase">Architecture</div>
                <div className="font-semibold text-sm mt-1 text-white light:text-black">Zero Tech Debt By Design</div>
              </div>
              <div className="p-4 rounded-xl border border-white/10 dark:border-white/10 light:border-black/10 bg-white/5 dark:bg-white/5 light:bg-black/5">
                <div className="text-xs font-mono text-zinc-500 uppercase">Velocity</div>
                <div className="font-semibold text-sm mt-1 text-white light:text-black">Founder-Direct Cadence</div>
              </div>
            </div>
          </div>

          {/* STAGE 3: Measurable Outcomes */}
          <div
            className={`transition-all duration-700 absolute left-0 max-w-2xl ${
              activeStage === 2
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 -translate-y-8 pointer-events-none'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-6">
              <Cpu className="w-3.5 h-3.5" />
              <span>MEASURABLE OUTCOMES</span>
            </div>

            <h2 className="font-manrope font-bold text-4xl sm:text-6xl lg:text-7xl leading-[1.08] tracking-tight mb-6">
              Product thinking. <br />
              <span className="text-[#0A6CDB] dark:text-[#5FA6F3]">Reliable engineering.</span> <br />
              <span className="font-editorial italic font-normal text-emerald-400">
                Measurable outcomes.
              </span>
            </h2>

            <p className="text-zinc-400 light:text-zinc-600 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
              From discovery and user experience through engineering, launch, and continuous improvement, one unified team stays accountable.
            </p>

            <button
              onClick={() => {
                playUiChime('click');
                onOpenBrief();
              }}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#0A6CDB] to-[#9047FF] text-white font-medium text-sm font-mono tracking-wider transition-all shadow-[0_4px_25px_rgba(10,108,219,0.45)]"
            >
              LAUNCH YOUR NEXT INITIATIVE &rarr;
            </button>
          </div>
        </div>

        {/* Bottom Scroll Hint & 3D Interactive Callout */}
        <div className="pointer-events-auto flex items-center justify-between max-w-7xl mx-auto w-full text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0A6CDB] animate-pulse"></span>
            <span>INTERACTIVE 3D ARTIFACT · DRAG TO ROTATE &amp; SCROLL TO MORPH</span>
          </div>

          <div className="flex items-center gap-2">
            <span>SCROLL DOWN</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};
