import React, { useState } from 'react';
import { Search, ClipboardCheck, ShieldCheck, RefreshCw, Check, X, Sparkles, Terminal } from 'lucide-react';
import { playUiChime } from '../utils/audio';

export const WhyKosalSection: React.FC = () => {
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    {
      id: 'discovery',
      icon: <Search className="w-6 h-6 text-[#0A6CDB]" />,
      title: 'Founder-led discovery',
      tag: '01 // DISCOVERY',
      summary: 'We begin with the business problem, users, constraints, and desired outcome before defining the build.',
      metrics: 'No boilerplate answers · Deep technical feasibility analysis',
    },
    {
      id: 'transparent',
      icon: <ClipboardCheck className="w-6 h-6 text-[#9047FF]" />,
      title: 'Transparent delivery',
      tag: '02 // VISIBILITY',
      summary: 'Clear priorities, visible progress, and regular demonstrations keep stakeholders close to every decision.',
      metrics: 'Continuous staging deployments · Direct architect Slack channels',
    },
    {
      id: 'production',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: 'Production-ready engineering',
      tag: '03 // ARCHITECTURE',
      summary: 'Security, maintainability, testing, and operational reliability are considered throughout delivery.',
      metrics: 'Comprehensive automated test suites · Enterprise security audits',
    },
    {
      id: 'collaboration',
      icon: <RefreshCw className="w-6 h-6 text-amber-400" />,
      title: 'Flexible collaboration',
      tag: '04 // PARTNERSHIP',
      summary: 'Start with a focused project or extend the partnership as your product, team, and roadmap evolve.',
      metrics: 'Sprint-based scaling · Rapid kickoff in < 5 business days',
    },
  ];

  const comparisonData = [
    {
      metric: 'Accountability',
      traditional: 'Junior outsourced devs with high turnover and lost context',
      kosal: 'Founder-led senior engineers committed from day 1 to scale',
    },
    {
      metric: 'Communication',
      traditional: 'Middlemen project managers causing 48h latency delays',
      kosal: 'Direct engineer-to-founder dialogue with daily progress demos',
    },
    {
      metric: 'Code Quality',
      traditional: 'Spaghetti code built just to hit a deadline; expensive refactor',
      kosal: 'Modular, test-driven, production-ready architecture with zero fluff',
    },
    {
      metric: 'Delivery Rhythm',
      traditional: 'Vague milestones with unpredictable surprises at launch',
      kosal: 'Continuous deployment to live staging with bi-weekly sprint releases',
    },
  ];

  return (
    <section id="why-kosal" className="relative py-28 sm:py-36 px-6 sm:px-12 max-w-7xl mx-auto z-10">
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A6CDB]/15 border border-[#0A6CDB]/30 text-[#0A6CDB] dark:text-[#5FA6F3] text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE KOSAL STANDARD // 04 PILLARS</span>
          </div>

          <h2 className="font-manrope font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1]">
            We listen first. <br />
            <span className="font-editorial italic font-normal text-[#0A6CDB] dark:text-[#5FA6F3]">
              Then we build
            </span>{' '}
            with purpose.
          </h2>
        </div>

        <p className="text-zinc-400 light:text-zinc-600 text-base sm:text-lg leading-relaxed max-w-xl">
          The goal is not simply to ship more software. It is to make the right product decisions and deliver technology your team can rely on after launch.
        </p>
      </div>

      {/* 4 Pillars Interactive Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {pillars.map((p, idx) => (
          <div
            key={p.id}
            onMouseEnter={() => {
              playUiChime('hover');
              setActivePillar(idx);
            }}
            className={`p-7 rounded-3xl glass-panel transition-all duration-500 cursor-pointer flex flex-col justify-between ${
              activePillar === idx
                ? 'border-[#0A6CDB] shadow-[0_10px_40px_-10px_rgba(10,108,219,0.3)] bg-white/10 dark:bg-white/10'
                : 'hover:border-white/20 opacity-85 hover:opacity-100'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/10 dark:bg-white/5 flex items-center justify-center border border-white/10">
                  {p.icon}
                </div>
                <span className="text-[11px] font-mono text-zinc-500 tracking-wider">
                  {p.tag}
                </span>
              </div>

              <h3 className="font-manrope font-bold text-xl text-white light:text-black mb-3">
                {p.title}
              </h3>

              <p className="text-zinc-400 light:text-zinc-600 text-sm leading-relaxed mb-6">
                {p.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 text-[11px] font-mono text-[#0A6CDB] dark:text-[#5FA6F3]">
              {p.metrics}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Comparative Matrix (Emotion Agency High-End Telemetry Aesthetic) */}
      <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/15">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div>
            <div className="text-xs font-mono text-[#0A6CDB] uppercase tracking-wider mb-1">
              BENCHMARK EVALUATION
            </div>
            <h3 className="font-manrope font-bold text-2xl text-white light:text-black">
              Traditional Outsourcing vs. Kosal Product Engineering
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>VERIFIED BENCHMARKS</span>
          </div>
        </div>

        <div className="space-y-6">
          {comparisonData.map((item, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-black/5 hover:bg-white/10 transition-colors"
            >
              <div className="md:col-span-3 text-sm font-mono text-zinc-300 light:text-zinc-700 font-semibold">
                {item.metric}
              </div>

              <div className="md:col-span-4 flex items-start gap-2 text-xs text-rose-400/80">
                <X className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{item.traditional}</span>
              </div>

              <div className="hidden md:block md:col-span-1 text-center text-zinc-600 font-mono text-xs">
                VS
              </div>

              <div className="md:col-span-4 flex items-start gap-2 text-xs text-emerald-400">
                <Check className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                <span>{item.kosal}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
