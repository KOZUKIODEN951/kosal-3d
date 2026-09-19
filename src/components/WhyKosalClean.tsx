import React from 'react';
import { Search, ClipboardCheck, ShieldCheck, RefreshCw, Check, X, Building2, MapPin, Award } from 'lucide-react';
import { playUiChime } from '../utils/audio';

export const WhyKosalClean: React.FC = () => {
  const pillars = [
    {
      icon: <Search className="w-5 h-5 text-[#0A6CDB]" />,
      title: 'Founder-Led Discovery',
      desc: 'We analyze the core business problem, users, constraints, and revenue drivers before writing a single line of code.',
    },
    {
      icon: <ClipboardCheck className="w-5 h-5 text-[#9047FF]" />,
      title: 'Transparent Delivery',
      desc: 'Clear priorities, continuous staging environments, and daily async demonstrations keep you in full control.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
      title: 'Production Reliability',
      desc: 'Enterprise security, comprehensive test coverage, maintainability, and operational SLA are engineered in from day 1.',
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-amber-500" />,
      title: 'Flexible Collaboration',
      desc: 'Kick off with an agile sprint or embed a dedicated engineering team that matches your growth cadence.',
    },
  ];

  return (
    <section id="why-kosal" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#0A6CDB] text-xs font-mono mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>THE KOSAL STANDARD // RELIABLE BY DESIGN</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            We listen first. <br />
            <span className="text-[#0A6CDB]">Then we build with purpose.</span>
          </h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
          The goal is not simply to ship more software. It is to make the right architectural decisions and deliver technology your team can rely on after launch.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {pillars.map((p, i) => (
          <div
            key={i}
            onMouseEnter={() => playUiChime('hover')}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
              {p.icon}
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{p.title}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>

      {/* Corporate Info Row */}
      <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-start gap-4">
          <Building2 className="w-6 h-6 text-[#0A6CDB] shrink-0 mt-1" />
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase">LEGAL ENTITY</div>
            <div className="font-bold text-sm text-slate-900 dark:text-white mt-1">Kosal IT Solutions LLP</div>
            <p className="text-xs text-slate-500 mt-0.5">Incorporated on 6 June 2025</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <MapPin className="w-6 h-6 text-purple-500 shrink-0 mt-1" />
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase">HEADQUARTERS</div>
            <div className="font-bold text-sm text-slate-900 dark:text-white mt-1">Tirunelveli, India</div>
            <p className="text-xs text-slate-500 mt-0.5">Samathanapuram, Palayamkottai</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Award className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase">DELIVERY PHILOSOPHY</div>
            <div className="font-bold text-sm text-slate-900 dark:text-white mt-1">Founder Accountability</div>
            <p className="text-xs text-slate-500 mt-0.5">Zero middlemen · Direct senior engineers</p>
          </div>
        </div>
      </div>
    </section>
  );
};
