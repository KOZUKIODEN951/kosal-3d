import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, Mail, Phone, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { BriefFormData } from '../types';
import { playUiChime } from '../utils/audio';

interface BriefBuilderCleanProps {
  preselectedItem?: string;
}

export const BriefBuilderClean: React.FC<BriefBuilderCleanProps> = ({ preselectedItem = '' }) => {
  const [formData, setFormData] = useState<BriefFormData>({
    fullName: '',
    workEmail: '',
    company: '',
    productOrService: preselectedItem || 'ai-calling',
    projectDetails: '',
    timeline: '1-3-months',
    budget: '10k-25k',
    consent: true,
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (preselectedItem) {
      setFormData((prev) => ({ ...prev, productOrService: preselectedItem }));
    }
  }, [preselectedItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    playUiChime('click');

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      playUiChime('success');

      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0A6CDB', '#9047FF', '#10B981', '#F59E0B'],
        });
      } catch (err) {}
    }, 700);
  };

  const productOptions = [
    { id: 'ai-calling', label: 'AI Voice Calling System' },
    { id: 'engage-omni', label: 'Engage WhatsApp & Instagram Platform' },
    { id: 'airix-saas', label: 'Airix AI Integration / SaaS' },
    { id: 'aivida-video', label: 'Aivida Video & Avatar Pipeline' },
    { id: 'astronomy-data', label: 'Astronomy / Deep-Tech Platform' },
    { id: 'custom-mvp', label: 'Custom MVP / Full-Stack Build' },
  ];

  const timelines = [
    { id: 'asap', label: 'As soon as possible' },
    { id: '1-3-months', label: '1–3 months' },
    { id: '3-6-months', label: '3–6 months' },
    { id: 'exploring', label: 'Exploring / Advisory' },
  ];

  const budgets = [
    { id: 'under-10k', label: '< $10,000' },
    { id: '10k-25k', label: '$10k – $25k' },
    { id: '25k-50k', label: '$25k – $50k' },
    { id: '50k-plus', label: '$50,000+' },
  ];

  return (
    <section id="contact" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-800">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Editorial Info */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#0A6CDB] text-xs font-mono mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>START A CONVERSATION // &lt; 24H SLA</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 leading-[1.1]">
              Tell us what <br />
              <span className="text-[#0A6CDB]">you're building.</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
              Whether you need to deploy autonomous AI voice callers, omnichannel Instagram/WhatsApp automation with Engage, or architect platforms like Airix and Aivida — our principal engineers will review your brief within 24 hours.
            </p>
          </div>

          <div className="space-y-4">
            <a
              href="mailto:info@kosal.io"
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-4 hover:border-[#0A6CDB] transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-[#0A6CDB] flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">DIRECT EMAIL</div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">info@kosal.io</div>
              </div>
            </a>

            <a
              href="tel:+916383437327"
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-4 hover:border-emerald-500 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">DIRECT PHONE / WHATSAPP</div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">+91 63834 37327</div>
              </div>
            </a>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">RESPONSE TIME</div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">&lt; 24 Hours Guaranteed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Project Brief Transmitted
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-slate-900 dark:text-white">{formData.fullName}</span>. Our engineering leads are analyzing your brief for <span className="font-semibold text-[#0A6CDB]">{formData.company}</span> and will reply directly at <span className="font-mono text-slate-800 dark:text-slate-200">{formData.workEmail}</span>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-600 dark:text-slate-300"
                >
                  TRANSMIT ANOTHER BRIEF
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-500 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:border-[#0A6CDB]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-500 mb-1.5">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      placeholder="rahul@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:border-[#0A6CDB]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-500 mb-1.5">
                    Company / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Lumina Tech Global"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:border-[#0A6CDB]"
                  />
                </div>

                {/* What are you interested in? */}
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-500 mb-2">
                    Select Product or Capability *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {productOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          playUiChime('click');
                          setFormData({ ...formData, productOrService: opt.id });
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                          formData.productOrService === opt.id
                            ? 'bg-[#0A6CDB] text-white shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project Details */}
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-500 mb-1.5">
                    Project Scope &amp; Constraints *
                  </label>
                  <textarea
                    rows={4}
                    required
                    minLength={20}
                    value={formData.projectDetails}
                    onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                    placeholder="Describe what you want to build, user requirements, timeline goals, and any current system constraints..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:border-[#0A6CDB] resize-none"
                  />
                </div>

                {/* Timeline & Budget Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-500 mb-2">
                      Timeline
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {timelines.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => {
                            playUiChime('click');
                            setFormData({ ...formData, timeline: t.id });
                          }}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-mono ${
                            formData.timeline === t.id
                              ? 'bg-slate-900 text-white dark:bg-white dark:text-black'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-500 mb-2">
                      Estimated Budget
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {budgets.map((b) => (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => {
                            playUiChime('click');
                            setFormData({ ...formData, budget: b.id });
                          }}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-mono ${
                            formData.budget === b.id
                              ? 'bg-[#0A6CDB] text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#0A6CDB] hover:bg-[#085bb8] text-white font-mono text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-50 transition-all"
                >
                  {isSubmitting ? (
                    <span>TRANSMITTING BRIEF...</span>
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
