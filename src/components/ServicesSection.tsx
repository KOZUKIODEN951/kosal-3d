import React, { useState } from 'react';
import { Layers, Bot, RefreshCw, Smartphone, ServerCog, Users, ArrowUpRight, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { ServiceItem } from '../types';
import { playUiChime } from '../utils/audio';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

const servicesData: ServiceItem[] = [
  {
    id: 'mvp-saas',
    number: '01',
    title: 'MVP & SaaS Development',
    shortDesc: 'Turn a validated idea into a production-ready product with a clear path from first release to scale.',
    fullDesc: 'We build end-to-end SaaS products designed for high conversion, rock-solid security, and seamless horizontal scale. From initial wireframing and database modeling through multi-tenant cloud architecture, we ship production software in weeks, not quarters.',
    deliverables: [
      'Multi-tenant architecture & DB design',
      'Stripe & payment gateway subscriptions',
      'Automated CI/CD deployment pipelines',
      'Comprehensive test coverage & telemetry',
    ],
    techStack: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    highlight: 'Weeks to Production',
  },
  {
    id: 'ai-automation',
    number: '02',
    title: 'AI & Workflow Automation',
    shortDesc: 'Reduce repetitive work with practical AI and automation designed around your existing operations.',
    fullDesc: 'Cut operational bottlenecks by integrating intelligent LLM agents, retrieval-augmented generation (RAG), and deterministic workflow automations directly into your team tools and internal systems.',
    deliverables: [
      'Custom LLM orchestration & fine-tuning',
      'Retrieval-Augmented Generation (RAG)',
      'Autonomous business workflow bots',
      'Enterprise security & data isolation',
    ],
    techStack: ['Python', 'OpenAI', 'LangChain', 'FastAPI', 'Redis', 'Pinecone'],
    highlight: 'Measurable Efficiency',
  },
  {
    id: 'web-modernization',
    number: '03',
    title: 'Web Application Modernization',
    shortDesc: 'Improve ageing applications for better performance, usability, maintainability, and future growth.',
    fullDesc: 'Transform monolithic, slow, or brittle web apps into lightning-fast, modular cloud-native platforms without halting business operations. We incrementally refactor legacy codebases to restore developer velocity and customer delight.',
    deliverables: [
      'Zero-downtime strangler pattern migration',
      'Performance optimization (Lighthouse 95+)',
      'Modern UI/UX design system migration',
      'Security patch & dependency modernization',
    ],
    techStack: ['TypeScript', 'Tailwind', 'GraphQL', 'Vite', 'Cloudflare'],
    highlight: 'Zero Downtime Shift',
  },
  {
    id: 'mobile',
    number: '04',
    title: 'Mobile Product Development',
    shortDesc: 'Build dependable iOS and Android experiences for customers, employees, and teams in the field.',
    fullDesc: 'Craft high-performance native and cross-platform mobile apps with silky 120Hz gesture interactions, reliable offline data caching, and frictionless onboarding flows.',
    deliverables: [
      'Cross-platform iOS & Android releases',
      'Offline-first synchronization engines',
      'Biometric authentication & deep linking',
      'App Store & Play Store compliance pass',
    ],
    techStack: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Supabase'],
    highlight: 'Offline-First Sync',
  },
  {
    id: 'backend-integrations',
    number: '05',
    title: 'Backend & Integrations',
    shortDesc: 'Connect platforms, data, payments, and business systems through secure services and well-defined APIs.',
    fullDesc: 'Architect robust distributed microservices, event queues, and compliant enterprise integrations. We connect your software to ERPs, CRMs, third-party payment rails, and banking APIs with high throughput and military-grade encryption.',
    deliverables: [
      'High-throughput REST & GraphQL APIs',
      'Event-driven architecture (Kafka/RabbitMQ)',
      'Webhook synchronization & caching',
      'SOC2 / GDPR compliance architecture',
    ],
    techStack: ['Go', 'Node.js', 'PostgreSQL', 'Redis', 'Kafka', 'Kubernetes'],
    highlight: 'Ultra-Low Latency',
  },
  {
    id: 'dedicated-team',
    number: '06',
    title: 'Dedicated Product Teams',
    shortDesc: 'Add a focused engineering team that works with your priorities, delivery rhythm, and internal stakeholders.',
    fullDesc: 'Scale your engineering output with an integrated squad of senior engineers, product designers, and QA specialists who adopt your delivery rhythm, standups, and codebase conventions from day one.',
    deliverables: [
      'Hand-picked senior engineers & architects',
      'Direct communication in your Slack/Linear',
      'Continuous daily PR reviews & demos',
      'Transparent hourly or monthly sprint pricing',
    ],
    techStack: ['Agile / Scrum', 'Linear', 'GitHub', 'Figma', 'CI/CD'],
    highlight: 'Seamless Sync',
  },
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeModal, setActiveModal] = useState<ServiceItem | null>(null);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'mvp-saas':
        return <Layers className="w-6 h-6 text-[#0A6CDB]" />;
      case 'ai-automation':
        return <Bot className="w-6 h-6 text-[#9047FF]" />;
      case 'web-modernization':
        return <RefreshCw className="w-6 h-6 text-[#38BDF8]" />;
      case 'mobile':
        return <Smartphone className="w-6 h-6 text-emerald-400" />;
      case 'backend-integrations':
        return <ServerCog className="w-6 h-6 text-amber-400" />;
      case 'dedicated-team':
        return <Users className="w-6 h-6 text-pink-400" />;
      default:
        return <Layers className="w-6 h-6 text-[#0A6CDB]" />;
    }
  };

  return (
    <section id="services" className="relative py-28 sm:py-36 px-6 sm:px-12 max-w-7xl mx-auto z-10">
      {/* Section Header with Monospace Tags */}
      <div className="flex flex-col items-start gap-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A6CDB]/15 border border-[#0A6CDB]/30 text-[#0A6CDB] dark:text-[#5FA6F3] text-xs font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0A6CDB] animate-ping"></span>
          <span>CAPABILITIES MATRIX // 06 DISCIPLINES</span>
        </div>

        <h2 className="font-manrope font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight">
          Product engineering <br />
          <span className="font-editorial italic font-normal text-[#0A6CDB] dark:text-[#5FA6F3]">
            from idea to scale.
          </span>
        </h2>

        <p className="text-zinc-400 light:text-zinc-600 text-base sm:text-lg max-w-2xl leading-relaxed">
          Choose a focused engagement or work with one dedicated Kosal team across the complete product lifecycle.
        </p>
      </div>

      {/* 3D Grid of Interactive Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesData.map((svc) => (
          <div
            key={svc.id}
            onMouseEnter={() => playUiChime('hover')}
            className="group relative rounded-3xl p-7 flex flex-col justify-between transition-all duration-500 glass-panel glass-panel-hover"
          >
            {/* Top Bar inside card */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/10 dark:bg-white/5 light:bg-black/5 flex items-center justify-center border border-white/10 transition-transform group-hover:scale-110 duration-300">
                  {getServiceIcon(svc.id)}
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/5 border border-white/10 text-zinc-400">
                    {svc.highlight}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">#{svc.number}</span>
                </div>
              </div>

              <h3 className="font-manrope font-bold text-xl sm:text-2xl text-white light:text-black mb-3 group-hover:text-[#0A6CDB] transition-colors">
                {svc.title}
              </h3>

              <p className="text-zinc-400 light:text-zinc-600 text-sm leading-relaxed mb-6">
                {svc.shortDesc}
              </p>

              {/* Deliverable pills */}
              <div className="space-y-2 mb-6">
                {svc.deliverables.slice(0, 2).map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-zinc-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0A6CDB] shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-white/10 dark:border-white/10 light:border-black/10 flex items-center justify-between">
              <button
                onClick={() => {
                  playUiChime('click');
                  setActiveModal(svc);
                }}
                className="text-xs font-mono tracking-wider text-zinc-400 hover:text-white light:hover:text-black flex items-center gap-1 transition-colors"
              >
                <span>DEEP DIVE</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  playUiChime('click');
                  onSelectService(svc.title);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0A6CDB]/15 text-[#0A6CDB] dark:text-[#5FA6F3] hover:bg-[#0A6CDB] hover:text-white transition-all text-xs font-mono tracking-wider"
              >
                <span>INITIATE</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Deep-Dive Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl rounded-3xl glass-panel p-8 sm:p-10 border border-white/20 shadow-2xl">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#0A6CDB]/20 flex items-center justify-center">
                {getServiceIcon(activeModal.id)}
              </div>
              <span className="text-xs font-mono text-[#0A6CDB] tracking-widest uppercase">
                SERVICE DEEP DIVE // #{activeModal.number}
              </span>
            </div>

            <h3 className="font-manrope font-bold text-2xl sm:text-3xl mb-4 text-white light:text-black">
              {activeModal.title}
            </h3>

            <p className="text-zinc-300 light:text-zinc-700 text-sm sm:text-base leading-relaxed mb-6">
              {activeModal.fullDesc}
            </p>

            <div className="mb-6">
              <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3">
                Key Deliverables
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeModal.deliverables.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 light:bg-black/5 text-xs text-zinc-300 light:text-zinc-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3">
                Technology Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeModal.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-[#0A6CDB]/15 text-[#5FA6F3] border border-[#0A6CDB]/30 text-xs font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-4 border-t border-white/10">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-mono text-zinc-400 hover:text-white"
              >
                CLOSE
              </button>
              <button
                onClick={() => {
                  onSelectService(activeModal.title);
                  setActiveModal(null);
                }}
                className="px-6 py-2.5 rounded-xl bg-[#0A6CDB] hover:bg-[#085bb8] text-white text-xs font-mono tracking-wider transition-all"
              >
                START WITH THIS SERVICE &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
