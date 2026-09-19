import React, { useState } from 'react';
import { Cpu, Video, Compass, ExternalLink, CheckCircle2, ArrowUpRight, Zap, Database, Eye } from 'lucide-react';
import { FlagshipProduct } from '../types';
import { playUiChime } from '../utils/audio';

const productsData: FlagshipProduct[] = [
  {
    id: 'airix',
    name: 'Airix Product',
    category: 'Enterprise AI & Workflow Engine',
    badge: 'FLAGSHIP SAAS',
    tagline: 'Intelligent AI orchestration and contextual workflow automation.',
    description: 'Airix is an enterprise-grade AI operating platform designed and delivered by Kosal. It bridges fragmented business data across microservices into an intelligent copilot that executes multi-step business decisions, summarizes massive documents, and triggers autonomous pipeline actions.',
    keyFeatures: [
      'Hybrid RAG (Retrieval-Augmented Generation) with semantic re-ranking',
      'Autonomous agent execution with human-in-the-loop validation',
      'Zero-data-leakage enterprise security and role-based access control (RBAC)',
      'Sub-second context assembly across enterprise databases & Slack',
    ],
    techStack: ['Python', 'FastAPI', 'LangChain', 'Next.js', 'PostgreSQL (pgvector)', 'Redis'],
    metrics: '10x Faster Ingestion · 99.4% Extraction Precision',
    status: 'PRODUCTION DEPLOYED',
  },
  {
    id: 'aivida',
    name: 'Aivida Product',
    category: 'Multimodal Video & Visual Intelligence',
    badge: 'GENERATIVE VIDEO AI',
    tagline: 'Hyper-realistic synthetic video synthesis and media generation.',
    description: 'Aivida represents Kosal’s breakthrough in visual intelligence and synthetic video pipelines. The platform generates studio-grade synthetic avatar presentations, automated video localization, and visual narrative generation from raw text scripts in minutes rather than weeks.',
    keyFeatures: [
      'Multi-lingual lip-sync synchronization in 40+ global languages',
      'Dynamic keyframe generation with deterministic motion anchors',
      'Real-time WebRTC preview engine with low-latency GPU streaming',
      'Automated scene composition, subtitles, and audio soundscapes',
    ],
    techStack: ['PyTorch', 'ComfyUI / Diffusers', 'CUDA', 'Node.js', 'React', 'AWS GPU Cluster'],
    metrics: '90% Cost Reduction vs Studio · 4K 60FPS Output',
    status: 'PRODUCTION DEPLOYED',
  },
  {
    id: 'astronomy',
    name: 'Astronomy Product',
    category: 'Deep-Tech Telemetry & Spatial Computing',
    badge: 'SCIENTIFIC COMPUTING',
    tagline: 'Interactive cosmic spatial computing & celestial data exploration.',
    description: 'Developed for high-precision celestial tracking and scientific data visualization, the Astronomy product visualizes planetary orbits, star catalog coordinates, and real-time astrophysics telemetry in an interactive, fluid WebGL spatial canvas built for both researchers and learners.',
    keyFeatures: [
      'Real-time ephemeris calculations and orbit trajectory projections',
      'Hardware-accelerated 3D celestial sphere mapping over 100,000+ star entities',
      'Interactive timeline scrubbing across millennia of astrophysical events',
      'Collaborative observation logging and telescope telemetry sync',
    ],
    techStack: ['Three.js', 'WebGL', 'TypeScript', 'Tailwind', 'Rust (Wasm)', 'NASA JPL API'],
    metrics: '100k+ Celestial Objects at 60 FPS · Sub-Arcsecond Accuracy',
    status: 'PRODUCTION DEPLOYED',
  },
];

export const ProductShowcase: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('airix');
  const activeProduct = productsData.find((p) => p.id === selectedId) || productsData[0];

  return (
    <section id="products" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="max-w-3xl mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#0A6CDB] text-xs font-mono mb-4">
          <Cpu className="w-3.5 h-3.5" />
          <span>PORTFOLIO // FLAGSHIP ENGINEERING DELIVERIES</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
          Engineered by Kosal. <br />
          <span className="text-[#0A6CDB]">Production Software Built From Zero to Scale.</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
          We don’t just write boilerplate code. We engineer bespoke platforms that solve complex technical hurdles across enterprise AI, generative video, and deep scientific computing.
        </p>
      </div>

      {/* Product Selector Tabs (Stripe / LocalhostHQ Clean Style) */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto gap-4">
        {productsData.map((prod) => (
          <button
            key={prod.id}
            onClick={() => {
              playUiChime('click');
              setSelectedId(prod.id);
            }}
            className={`pb-4 px-2 text-sm font-semibold whitespace-nowrap transition-all border-b-2 flex items-center gap-2.5 ${
              selectedId === prod.id
                ? 'border-[#0A6CDB] text-[#0A6CDB]'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {prod.id === 'airix' && <Cpu className="w-4 h-4" />}
            {prod.id === 'aivida' && <Video className="w-4 h-4" />}
            {prod.id === 'astronomy' && <Compass className="w-4 h-4" />}
            <span>{prod.name}</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {prod.badge}
            </span>
          </button>
        ))}
      </div>

      {/* Active Product Deep-Dive Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Info Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              {activeProduct.status}
            </span>
            <span className="text-xs font-mono text-slate-500">{activeProduct.category}</span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            {activeProduct.name}
          </h3>

          <p className="text-lg font-medium text-[#0A6CDB] dark:text-[#5FA6F3]">
            {activeProduct.tagline}
          </p>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {activeProduct.description}
          </p>

          {/* Key Deliverables / Features */}
          <div className="space-y-2.5 pt-2">
            <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider">
              Core Engineering Achievements:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {activeProduct.keyFeatures.map((feat, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div className="pt-2">
            <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">
              Architecture Stack:
            </h4>
            <div className="flex flex-wrap gap-2">
              {activeProduct.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Interactive Visual Card */}
        <div className="lg:col-span-5">
          <div className="bg-slate-950 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[380px]">
            {/* Background glowing gradient */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#0A6CDB]/20 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6 text-xs font-mono text-slate-400">
                <span>SYSTEM ARCHITECTURE PREVIEW</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> VERIFIED
                </span>
              </div>

              {/* Dynamic Mockup Content per product */}
              {activeProduct.id === 'airix' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                      <span>RAG PIPELINE STREAM</span>
                      <span className="text-[#0A6CDB]">84ms</span>
                    </div>
                    <div className="text-xs font-mono text-slate-200">
                      &gt; query.vectorize(dim=1536)<br />
                      &gt; hybrid_search(top_k=5, rerank=true)<br />
                      &gt; stream_response(chunks=128)
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                      <span className="block text-[10px] font-mono text-slate-400">INGESTION</span>
                      <span className="text-sm font-bold text-white">40k docs/min</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                      <span className="block text-[10px] font-mono text-slate-400">ACCURACY</span>
                      <span className="text-sm font-bold text-emerald-400">99.4% F1</span>
                    </div>
                  </div>
                </div>
              )}

              {activeProduct.id === 'aivida' && (
                <div className="space-y-4">
                  <div className="h-32 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center relative overflow-hidden">
                    <div className="text-center">
                      <Video className="w-8 h-8 text-[#9047FF] mx-auto mb-2 animate-pulse" />
                      <span className="text-xs font-mono text-slate-300">GPU Neural Rendering · 60 FPS</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                      <span className="block text-[10px] font-mono text-slate-400">RENDER SPEED</span>
                      <span className="text-sm font-bold text-white">0.3x Realtime</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                      <span className="block text-[10px] font-mono text-slate-400">AVATARS</span>
                      <span className="text-sm font-bold text-purple-400">Photorealistic</span>
                    </div>
                  </div>
                </div>
              )}

              {activeProduct.id === 'astronomy' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300">
                    <div className="flex items-center justify-between text-slate-400 mb-2">
                      <span>ORBITAL COORDINATES</span>
                      <span className="text-cyan-400">LIVE Wasm</span>
                    </div>
                    <div>RA: 18h 36m 56s · Dec: +38° 47′ 01″</div>
                    <div className="text-slate-500 mt-1">Telemetry Source: NASA JPL Horizons</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                      <span className="block text-[10px] font-mono text-slate-400">STAR BODIES</span>
                      <span className="text-sm font-bold text-white">100,000+</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                      <span className="block text-[10px] font-mono text-slate-400">PRECISION</span>
                      <span className="text-sm font-bold text-cyan-400">&lt; 0.01 arcsec</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Highlight */}
            <div className="pt-4 border-t border-slate-800 text-xs font-mono text-[#0A6CDB] flex items-center justify-between">
              <span>{activeProduct.metrics}</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
