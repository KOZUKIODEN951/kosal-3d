import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle, Mail, Phone, Clock, Sparkles } from 'lucide-react';
import { BriefFormData } from '../types';
import { playUiChime } from '../utils/audio';

interface BriefBuilderSectionProps {
  preselectedService?: string;
}

export const BriefBuilderSection: React.FC<BriefBuilderSectionProps> = ({
  preselectedService = '',
}) => {
  const [formData, setFormData] = useState<BriefFormData>({
    fullName: '',
    workEmail: '',
    company: '',
    service: preselectedService || 'mvp-saas',
    projectDetails: '',
    timeline: '1-3-months',
    budget: '10k-25k',
    consent: true,
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync if preselectedService changes
  React.useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    playUiChime('click');

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      playUiChime('success');

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0A6CDB', '#9047FF', '#38BDF8', '#ffffff'],
        });
      } catch (err) {
        // fallback if canvas-confetti is restricted
      }
    }, 800);
  };

  const servicesList = [
    { value: 'mvp-saas', label: 'MVP & SaaS development' },
    { value: 'ai-automation', label: 'AI & workflow automation' },
    { value: 'web-modernization', label: 'Web application modernization' },
    { value: 'mobile', label: 'Mobile product development' },
    { value: 'backend-integrations', label: 'Backend & integrations' },
    { value: 'dedicated-team', label: 'Dedicated product team' },
    { value: 'other', label: 'Something else' },
  ];

  const timelines = [
    { value: 'asap', label: 'As soon as possible' },
    { value: '1-3-months', label: '1–3 months' },
    { value: '3-6-months', label: '3–6 months' },
    { value: '6-plus-months', label: '6+ months' },
    { value: 'exploring', label: 'Still exploring' },
  ];

  const budgets = [
    { value: 'prefer-not', label: 'Prefer not to say' },
    { value: 'under-10k', label: '< $10,000' },
    { value: '10k-25k', label: '$10k – $25,000' },
    { value: '25k-50k', label: '$25k – $50,000' },
    { value: '50k-plus', label: '$50,000+' },
    { value: 'ongoing', label: 'Ongoing Partnership' },
  ];

  return (
    <section id="contact" className="relative py-28 sm:py-36 px-6 sm:px-12 max-w-7xl mx-auto z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Editorial Info */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A6CDB]/15 border border-[#0A6CDB]/30 text-[#0A6CDB] dark:text-[#5FA6F3] text-xs font-mono mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COMMENCE ENGAGEMENT // SLA: &lt; 24 HOURS</span>
            </div>

            <h2 className="font-manrope font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] mb-6">
              Tell us what <br />
              <span className="font-editorial italic font-normal text-[#0A6CDB] dark:text-[#5FA6F3]">
                you're building.
              </span>
            </h2>

            <p className="text-zinc-400 light:text-zinc-600 text-base leading-relaxed">
              Share your product vision, workflow bottlenecks, or engineering goals. A Kosal principal architect will review your brief and respond with practical next steps and an architecture roadmap within one business day.
            </p>
          </div>

          {/* Contact Direct Cards */}
          <div className="space-y-4">
            <a
              href="mailto:info@kosal.io"
              className="flex items-center gap-4 p-4 rounded-2xl glass-panel hover:border-[#0A6CDB]/50 transition-colors group"
            >
              <div className="w-11 h-11 rounded-xl bg-[#0A6CDB]/20 text-[#0A6CDB] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono text-zinc-500 uppercase">DIRECT EMAIL</div>
                <div className="text-sm font-semibold text-white light:text-black">info@kosal.io</div>
              </div>
            </a>

            <a
              href="tel:+916383437327"
              className="flex items-center gap-4 p-4 rounded-2xl glass-panel hover:border-[#0A6CDB]/50 transition-colors group"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono text-zinc-500 uppercase">DIRECT PHONE / WHATSAPP</div>
                <div className="text-sm font-semibold text-white light:text-black">+91 63834 37327</div>
              </div>
            </a>

            <div className="flex items-center gap-4 p-4 rounded-2xl glass-panel">
              <div className="w-11 h-11 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono text-zinc-500 uppercase">GUARANTEED SLA</div>
                <div className="text-sm font-semibold text-white light:text-black">Response in &lt; 24 hours</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="lg:col-span-7">
          <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-white/15 relative overflow-hidden shadow-2xl">
            {submitted ? (
              <div className="py-16 text-center space-y-6 animate-fadeIn">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="font-manrope font-bold text-3xl text-white light:text-black">
                  Project Brief Received!
                </h3>
                <p className="text-zinc-400 light:text-zinc-600 max-w-md mx-auto text-sm leading-relaxed">
                  Thank you, <span className="text-white light:text-black font-semibold">{formData.fullName}</span>. Our engineering team has received your brief for <span className="text-[#0A6CDB] font-semibold">{formData.company}</span>. We will review your requirements and reach out at <span className="text-white light:text-black font-mono">{formData.workEmail}</span> within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl border border-white/20 hover:bg-white/10 text-xs font-mono text-zinc-300"
                >
                  SUBMIT ANOTHER BRIEF
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/10 dark:border-white/10 light:border-black/10 focus:border-[#0A6CDB] outline-none text-sm text-white light:text-black transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/10 dark:border-white/10 light:border-black/10 focus:border-[#0A6CDB] outline-none text-sm text-white light:text-black transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    Company / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Acme Technologies Inc."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/10 dark:border-white/10 light:border-black/10 focus:border-[#0A6CDB] outline-none text-sm text-white light:text-black transition-colors"
                  />
                </div>

                {/* Service Selection Pills */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    What do you need help with? *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {servicesList.map((svc) => (
                      <button
                        key={svc.value}
                        type="button"
                        onClick={() => {
                          playUiChime('click');
                          setFormData({ ...formData, service: svc.value });
                        }}
                        className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all ${
                          formData.service === svc.value
                            ? 'bg-[#0A6CDB] text-white shadow-[0_0_15px_rgba(10,108,219,0.4)]'
                            : 'bg-white/5 light:bg-black/5 border border-white/10 hover:border-white/30 text-zinc-400'
                        }`}
                      >
                        {svc.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project Details Textarea */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    minLength={20}
                    value={formData.projectDetails}
                    onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                    placeholder="Describe what you're building, target users, technical constraints, and desired outcomes..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/10 dark:border-white/10 light:border-black/10 focus:border-[#0A6CDB] outline-none text-sm text-white light:text-black transition-colors resize-none"
                  />
                  <span className="text-[11px] font-mono text-zinc-500">
                    Include the current stage, technology preferences, and operational constraints.
                  </span>
                </div>

                {/* Timeline Selection */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    Preferred Timeline
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {timelines.map((tl) => (
                      <button
                        key={tl.value}
                        type="button"
                        onClick={() => {
                          playUiChime('click');
                          setFormData({ ...formData, timeline: tl.value });
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                          formData.timeline === tl.value
                            ? 'bg-[#0A6CDB] text-white'
                            : 'bg-white/5 light:bg-black/5 border border-white/10 text-zinc-400'
                        }`}
                      >
                        {tl.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Selection */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    Estimated Budget
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {budgets.map((b) => (
                      <button
                        key={b.value}
                        type="button"
                        onClick={() => {
                          playUiChime('click');
                          setFormData({ ...formData, budget: b.value });
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                          formData.budget === b.value
                            ? 'bg-[#9047FF] text-white shadow-[0_0_15px_rgba(144,71,255,0.4)]'
                            : 'bg-white/5 light:bg-black/5 border border-white/10 text-zinc-400'
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="consent"
                    required
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded text-[#0A6CDB] focus:ring-[#0A6CDB]"
                  />
                  <label htmlFor="consent" className="text-xs text-zinc-400 leading-normal">
                    I agree that Kosal IT Solutions LLP may use these details to review technical feasibility and respond to my enquiry.
                  </label>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#0A6CDB] via-[#085bb8] to-[#9047FF] text-white font-semibold text-sm font-mono tracking-wider flex items-center justify-center gap-2 hover:opacity-95 transition-opacity shadow-[0_4px_30px_rgba(10,108,219,0.5)] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>PROCESSING BRIEF...</span>
                  ) : (
                    <>
                      <span>TRANSMIT PROJECT BRIEF</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
