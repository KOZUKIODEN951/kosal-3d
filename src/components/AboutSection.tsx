import React from 'react';
import { Award, Compass, Building2, MapPin, Globe, Sparkles } from 'lucide-react';
import { playUiChime } from '../utils/audio';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-28 sm:py-36 px-6 sm:px-12 max-w-7xl mx-auto z-10">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A6CDB]/15 border border-[#0A6CDB]/30 text-[#0A6CDB] dark:text-[#5FA6F3] text-xs font-mono mb-6">
        <Compass className="w-3.5 h-3.5" />
        <span>ABOUT KOSAL IT SOLUTIONS // FOUNDED JUNE 2025</span>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
        <div className="lg:col-span-6">
          <h2 className="font-manrope font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] mb-6">
            Product thinking. <br />
            <span className="text-[#0A6CDB] dark:text-[#5FA6F3]">Reliable engineering.</span> <br />
            <span className="font-editorial italic font-normal text-emerald-400">
              Measurable outcomes.
            </span>
          </h2>

          <div className="p-6 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0A6CDB]/20 flex items-center justify-center text-[#0A6CDB] shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                HEADQUARTERS // GLOBAL DELIVERY
              </div>
              <div className="text-sm font-semibold text-white light:text-black">
                Samathanapuram, Palayamkottai, Tirunelveli — 627 002, India
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6 text-zinc-300 light:text-zinc-700 text-base sm:text-lg leading-relaxed">
          <p>
            <strong className="text-white light:text-black">Kosal IT Solutions LLP</strong> is a founder-led product engineering company based in India and working with forward-thinking businesses across worldwide markets.
          </p>
          <p>
            We turn ambitious product visions and complex operational challenges into dependable SaaS, AI, web, and mobile software that can sustainably scale with your business.
          </p>
          <p>
            From initial discovery and high-fidelity user experience through resilient cloud engineering, launch day, and continuous improvement—one unified team stays accountable for every single line of code shipped.
          </p>
        </div>
      </div>

      {/* 3 Core Identity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onMouseEnter={() => playUiChime('hover')}
          className="p-8 rounded-3xl glass-panel glass-panel-hover"
        >
          <div className="w-12 h-12 rounded-2xl bg-white/10 dark:bg-white/5 flex items-center justify-center mb-6">
            <Building2 className="w-6 h-6 text-[#0A6CDB]" />
          </div>
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">
            LEGAL REGISTRATION
          </div>
          <h3 className="font-manrope font-bold text-2xl text-white light:text-black mb-3">
            Founded in 2025
          </h3>
          <p className="text-zinc-400 light:text-zinc-600 text-sm leading-relaxed">
            Kosal IT Solutions LLP was officially incorporated on 6 June 2025 in Tirunelveli, India, dedicated to high-standard modern engineering.
          </p>
        </div>

        <div
          onMouseEnter={() => playUiChime('hover')}
          className="p-8 rounded-3xl glass-panel glass-panel-hover"
        >
          <div className="w-12 h-12 rounded-2xl bg-white/10 dark:bg-white/5 flex items-center justify-center mb-6">
            <Award className="w-6 h-6 text-[#9047FF]" />
          </div>
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">
            LIFECYCLE ACCOUNTABILITY
          </div>
          <h3 className="font-manrope font-bold text-2xl text-white light:text-black mb-3">
            End-to-End Delivery
          </h3>
          <p className="text-zinc-400 light:text-zinc-600 text-sm leading-relaxed">
            We do not hand off half-baked designs. We drive discovery, UI/UX, full-stack implementation, automated QA, and continuous cloud optimization.
          </p>
        </div>

        <div
          onMouseEnter={() => playUiChime('hover')}
          className="p-8 rounded-3xl glass-panel glass-panel-hover"
        >
          <div className="w-12 h-12 rounded-2xl bg-white/10 dark:bg-white/5 flex items-center justify-center mb-6">
            <Globe className="w-6 h-6 text-emerald-400" />
          </div>
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">
            DISTRIBUTED SYNERGY
          </div>
          <h3 className="font-manrope font-bold text-2xl text-white light:text-black mb-3">
            Built for Collaboration
          </h3>
          <p className="text-zinc-400 light:text-zinc-600 text-sm leading-relaxed">
            Transparent async communication, live weekly demos, and practical engineering rhythm designed seamlessly for distributed global teams.
          </p>
        </div>
      </div>
    </section>
  );
};
