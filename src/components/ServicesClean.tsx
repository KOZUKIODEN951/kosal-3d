import React from 'react';
import { Layers, Bot, RefreshCw, Smartphone, ServerCog, Users, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { playUiChime } from '../utils/audio';

interface ServicesCleanProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesClean: React.FC<ServicesCleanProps> = ({ onSelectService }) => {
  const services = [
    {
      id: 'mvp-saas',
      icon: <Layers className="w-5 h-5 text-[#0A6CDB]" />,
      title: 'MVP & SaaS Development',
      desc: 'Turn validated product concepts into production-ready architectures with high security and rapid deployment.',
      highlights: ['Multi-tenant DB', 'Stripe Billing', 'Automated CI/CD'],
    },
    {
      id: 'ai-automation',
      icon: <Bot className="w-5 h-5 text-[#9047FF]" />,
      title: 'AI & Workflow Automation',
      desc: 'Deploy custom LLMs, autonomous agents, and voice pipelines designed around your existing data pipelines.',
      highlights: ['Sub-500ms Voice AI', 'Hybrid RAG', 'Enterprise Guardrails'],
    },
    {
      id: 'web-modernization',
      icon: <RefreshCw className="w-5 h-5 text-[#0EA5E9]" />,
      title: 'Application Modernization',
      desc: 'Refactor legacy codebases into modular, cloud-native architectures with 95+ Lighthouse performance.',
      highlights: ['Zero-Downtime Shift', 'Lighthouse 95+', 'Microfrontends'],
    },
    {
      id: 'mobile',
      icon: <Smartphone className="w-5 h-5 text-emerald-500" />,
      title: 'Mobile Product Engineering',
      desc: 'Native and cross-platform iOS and Android apps with 120Hz gesture fluidities and offline-first syncing.',
      highlights: ['iOS & Android', 'Offline-First', 'Biometrics & Push'],
    },
    {
      id: 'backend-integrations',
      icon: <ServerCog className="w-5 h-5 text-amber-500" />,
      title: 'Backend & High-Throughput APIs',
      desc: 'Scalable distributed microservices, event streams (Kafka/RabbitMQ), and compliant enterprise integrations.',
      highlights: ['REST & GraphQL', 'Kafka Streaming', 'SOC2 Compliance'],
    },
    {
      id: 'dedicated-team',
      icon: <Users className="w-5 h-5 text-rose-500" />,
      title: 'Dedicated Engineering Squads',
      desc: 'Senior full-stack architects and designers integrated seamlessly into your sprint rhythms and Slack.',
      highlights: ['Direct Senior Talent', 'Daily Demos', 'Flexible Sprints'],
    },
  ];

  return (
    <section id="services" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#0A6CDB] text-xs font-mono mb-4">
          <Layers className="w-3.5 h-3.5" />
          <span>CAPABILITIES // CORE ENGINEERING DISCIPLINES</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
          Product engineering <br />
          <span className="text-[#0A6CDB]">from discovery to production scale.</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
          Choose a targeted sprint delivery or partner with a dedicated Kosal team for end-to-end product realization.
        </p>
      </div>

      {/* Grid of 6 Clean Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((svc) => (
          <div
            key={svc.id}
            onMouseEnter={() => playUiChime('hover')}
            className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#0A6CDB]/50 dark:hover:border-[#0A6CDB]/50 hover:shadow-lg transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                {svc.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-[#0A6CDB] transition-colors">
                {svc.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                {svc.desc}
              </p>

              <div className="space-y-2 mb-6">
                {svc.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                playUiChime('click');
                onSelectService(svc.title);
              }}
              className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-mono tracking-wider text-[#0A6CDB] flex items-center justify-between group-hover:underline"
            >
              <span>DISCUSS THIS SERVICE</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
