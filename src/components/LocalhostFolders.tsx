import React, { useState } from 'react';
import { Cpu, Video, Compass, PhoneCall, MessageSquare, ArrowUpRight, Check, Zap, Play, Terminal, Shield, ExternalLink } from 'lucide-react';
import { playUiChime } from '../utils/audio';

interface FolderItem {
  id: string;
  tag: string;
  title: string;
  category: string;
  tabLabel: string;
  badge: string;
  summary: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  codePreview: string;
  terminalLang: string;
  liveStatus: string;
}

const folders: FolderItem[] = [
  {
    id: 'airix',
    tag: 'FLAGSHIP // 01',
    tabLabel: 'Airix Engine',
    title: 'Airix Product',
    category: 'Enterprise AI & Workflow Orchestration',
    badge: 'PRODUCTION SAAS',
    summary: 'A secure, high-throughput AI operating platform engineered by Kosal. Bridges fragmented enterprise data stores, Vector DBs, and operational channels into autonomous agent workflows with human-in-the-loop guardrails.',
    highlights: [
      'Hybrid RAG with dynamic re-ranking & dense embeddings',
      'Zero-data-leakage enterprise isolation and RBAC',
      'Autonomous multi-step tool execution with audit trails',
      'Sub-second context assembly over 10M+ documents',
    ],
    metrics: [
      { label: 'Query Latency', value: '84ms' },
      { label: 'Ingestion Speed', value: '40k docs/min' },
      { label: 'Accuracy Benchmark', value: '99.4% F1' },
    ],
    terminalLang: 'PYTHON / FASTAPI',
    codePreview: `from airix.core import RAGPipeline, EnterpriseAgent

pipeline = RAGPipeline(
    vector_dim=1536,
    rerank_model="kosal-hybrid-v2",
    guardrails=["rbac_strict", "pii_redact"]
)

@agent.on_event("enterprise.query")
async def handle_context(prompt: str, user_claims: Claims):
    ctx = await pipeline.assemble_context(prompt, user_claims)
    return await agent.dispatch_decision(ctx, stream=True)`,
    liveStatus: 'OPERATIONAL · CLOUD NATIVE',
  },
  {
    id: 'aivida',
    tag: 'FLAGSHIP // 02',
    tabLabel: 'Aivida AI',
    title: 'Aivida Product',
    category: 'Multimodal Video & Synthetic Avatar Pipeline',
    badge: 'GENERATIVE VIDEO',
    summary: 'A proprietary visual synthesis engine developed by Kosal. Turns text and audio scripts into hyper-realistic 4K synthetic avatar presentations with real-time WebRTC preview streaming and 40+ language lip sync.',
    highlights: [
      'Multi-lingual neural lip sync with sub-frame accuracy',
      'Deterministic keyframe motion anchors preventing visual drift',
      'Low-latency WebRTC GPU streaming pipeline',
      'Automated scene composition, subtitles & dynamic camera angles',
    ],
    metrics: [
      { label: 'Render Fidelity', value: '4K @ 60 FPS' },
      { label: 'Cost vs Studio', value: '-90%' },
      { label: 'Global Languages', value: '40+' },
    ],
    terminalLang: 'PYTORCH / CUDA',
    codePreview: `import torch
from aivida.synthesis import AvatarPipeline, WebRTCStreamer

pipeline = AvatarPipeline.from_pretrained("aivida-v3-cinematic")
streamer = WebRTCStreamer(target_fps=60, resolution=(3840, 2160))

async def generate_avatar_stream(script: str, voice_sample: bytes):
    phonemes = await pipeline.extract_phonemes(script)
    motion_tensor = pipeline.synthesize_motion(phonemes)
    return streamer.pipe_frames(motion_tensor, audio=voice_sample)`,
    liveStatus: 'DEPLOYED · GPU CLUSTER',
  },
  {
    id: 'astronomy',
    tag: 'FLAGSHIP // 03',
    tabLabel: 'Astronomy Spatial',
    title: 'Astronomy Product',
    category: 'Deep-Tech Spatial Telemetry & Celestial 3D Engine',
    badge: 'SCIENTIFIC COMPUTING',
    summary: 'A deep-tech celestial computation and WebGL telemetry engine built by Kosal. Computes and renders orbital trajectories, satellite ephemerides, and star clusters in real time with sub-arcsecond mathematical precision.',
    highlights: [
      'High-throughput orbital mechanics & Keplerian state vectors',
      'GPU instanced WebGL rendering of 100,000+ spatial bodies at 60 FPS',
      'Real-time Doppler shift and relativistic time correction',
      'Interactive celestial navigation and trajectory prediction',
    ],
    metrics: [
      { label: 'Rendered Bodies', value: '100,000+' },
      { label: 'Frame Rate', value: '60 FPS Fixed' },
      { label: 'Positional Precision', value: '< 0.01 arcsec' },
    ],
    terminalLang: 'GLSL / WEBGL / TS',
    codePreview: `precision highp float;
uniform vec3 u_celestial_coords;
uniform float u_julian_date;

attribute vec4 a_orbital_elements; // [a, e, i, Omega]

vec3 calculate_keplerian_position(vec4 elements, float t) {
    float M = elements.x + elements.y * t; // Mean anomaly
    float E = solve_kepler(M, elements.y); // Eccentric anomaly
    return project_spatial_coordinates(E, elements);
}`,
    liveStatus: 'ACTIVE · ORBITAL DATA',
  },
  {
    id: 'ai-calling',
    tag: 'FEATURE // 04',
    tabLabel: 'AI Voice Calling',
    title: 'AI Voice Calling Engine',
    category: 'Sub-500ms Human-Parity Conversational Voice Agent',
    badge: 'REAL-TIME TELEPHONY',
    summary: 'A real-time voice intelligence engine designed for autonomous inbound and outbound calls. Achieves sub-350ms turn-taking latency with natural interruption handling, neural speech synthesis, and live CRM calendar bookings.',
    highlights: [
      'Sub-350ms round-trip speech-to-speech turnaround',
      'Natural interruption handling and acoustic echo cancellation',
      'Live tool calling: Google Calendar, HubSpot, Stripe billing, PostgreSQL',
      'Multi-persona switching: SDR sales, technical concierge, clinical triage',
    ],
    metrics: [
      { label: 'Turn Latency', value: '< 340ms' },
      { label: 'Interruption Accuracy', value: '99.1%' },
      { label: 'Uptime SLA', value: '99.95%' },
    ],
    terminalLang: 'WEBSOCKET / SIP / VAD',
    codePreview: `const voiceSocket = new VoicePipelineClient({
  codec: "opus",
  sampleRate: 48000,
  vadSensitivity: 0.85,
  targetLatencyMs: 340
});

voiceSocket.on("user_speech_interrupted", async () => {
  await audioSink.flushBuffer();
  await llmStream.cancelGeneration();
  voiceSocket.resumeListening();
});`,
    liveStatus: 'LIVE TELEPHONY // SIP READY',
  },
  {
    id: 'engage-omni',
    tag: 'PLATFORM // 05',
    tabLabel: 'Engage Platform',
    title: 'Engage Omnichannel Automation',
    category: 'Official Instagram DMs & WhatsApp Cloud API Automation',
    badge: 'OMNICHANNEL AI',
    summary: 'An autonomous conversation machine uniting WhatsApp Cloud API and Instagram Graph API into a single high-conversion pipeline. Handles instantaneous order lookups, VIP lead captures, and human-in-the-loop agent escalations.',
    highlights: [
      'Official Meta Cloud API webhook pipelines with zero message drops',
      'Automated Instagram story mention & DM lead capture triggers',
      'Interactive rich cards with product catalogs, pay links, and shipment maps',
      'Unified multi-agent support dashboard with live sentiment analysis',
    ],
    metrics: [
      { label: 'Response Velocity', value: '< 900ms' },
      { label: 'Lead Conversion', value: '+42%' },
      { label: 'Handled Channels', value: 'WhatsApp + IG' },
    ],
    terminalLang: 'META GRAPH / WEBHOOK',
    codePreview: `export async function handleMetaWebhook(req: Request) {
  const payload = await req.json();
  const event = parseMetaEvent(payload);

  if (event.channel === "instagram_dm") {
    return await engageRouter.dispatchStoryReply(event);
  } else if (event.channel === "whatsapp_cloud") {
    return await engageRouter.dispatchCatalogOrder(event);
  }
}`,
    liveStatus: 'META VERIFIED PARTNER',
  },
];

export const LocalhostFolders: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('airix');
  const activeFolder = folders.find((f) => f.id === activeId) || folders[0];

  return (
    <section id="products" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto">
      {/* Section Eyebrow & Title in LocalhostHQ / Stripe Style */}
      <div className="mb-14 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-mono font-medium tracking-wider mb-4 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#0A6CDB] animate-ping"></span>
          <span>FLAGSHIP OFFERINGS // PRODUCTION DELIVERIES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
          Unconventional products, <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-[#0A6CDB] via-indigo-500 to-[#9047FF] bg-clip-text text-transparent">
            engineered to production scale.
          </span>
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
          Explore the real-world products architected and launched by Kosal across enterprise AI, synthetic video, celestial computing, and omnichannel communication.
        </p>
      </div>

      {/* LocalhostHQ Signature Physical Folder Tabs */}
      <div className="relative w-full">
        {/* Folder Tab Row */}
        <div className="flex flex-wrap items-end gap-1.5 sm:gap-2 px-2 sm:px-6 relative z-10 -mb-[2px] overflow-x-auto">
          {folders.map((folder, index) => {
            const isSelected = folder.id === activeId;
            return (
              <button
                key={folder.id}
                onClick={() => {
                  playUiChime('click');
                  setActiveId(folder.id);
                }}
                className={`group relative flex items-center gap-2 px-4 sm:px-6 py-3 rounded-t-2xl font-mono text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-t-2 border-l-2 border-r-2 border-[#0A6CDB] shadow-md -translate-y-1'
                    : 'bg-slate-200/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-300/80 dark:hover:bg-slate-700/80 border-t border-l border-r border-transparent'
                }`}
              >
                {/* Visual folder tab icon */}
                <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#0A6CDB]' : 'bg-slate-400'}`}></span>
                <span className="whitespace-nowrap">{folder.tabLabel}</span>
                <span className="hidden md:inline text-[10px] font-normal opacity-60">[{String(index + 1).padStart(2, '0')}]</span>
              </button>
            );
          })}
        </div>

        {/* LocalhostHQ Retro-Modern Window Container */}
        <div className="relative rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
          {/* Mac / Terminal Styled Window Top Bar */}
          <div className="px-6 py-3.5 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Traffic light window controls */}
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              </div>
              <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 mx-1 hidden sm:block"></div>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 hidden sm:inline">
                kosal://workspaces/{activeFolder.id}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold uppercase">{activeFolder.liveStatus}</span>
            </div>
          </div>

          {/* Interior Layout: 2 Columns */}
          <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Product Spec & Value Proposition */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#0A6CDB]/10 text-[#0A6CDB] font-mono text-xs font-bold border border-[#0A6CDB]/20">
                  {activeFolder.badge}
                </span>
                <span className="text-xs font-mono text-slate-400">{activeFolder.category}</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                {activeFolder.title}
              </h3>

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                {activeFolder.summary}
              </p>

              {/* Core Engineering Achievements */}
              <div className="space-y-2.5 pt-2">
                <span className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                  KEY ARCHITECTURAL HIGHLIGHTS:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeFolder.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Metrics Row */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-3 gap-4">
                {activeFolder.metrics.map((m, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                    <div className="text-lg sm:text-xl font-extrabold text-[#0A6CDB] dark:text-[#38BDF8]">
                      {m.value}
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Interactive Terminal & Code Inspection */}
            <div className="lg:col-span-6 space-y-4">
              <div className="rounded-2xl bg-slate-950 text-slate-200 p-5 font-mono text-xs border border-slate-800 shadow-xl relative overflow-hidden">
                {/* Subtle Glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#0A6CDB]/15 blur-3xl pointer-events-none"></div>

                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <Terminal className="w-3.5 h-3.5 text-[#0A6CDB]" />
                    <span>PRODUCTION_SOURCE // {activeFolder.terminalLang}</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    BENCHMARK VERIFIED
                  </span>
                </div>

                <pre className="overflow-x-auto text-[11.5px] leading-relaxed text-slate-300 font-mono py-1">
                  <code>{activeFolder.codePreview}</code>
                </pre>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    <span>SOC2 & Enterprise Compliant Architecture</span>
                  </span>
                  <span className="text-slate-500">Latency: Sub-Second</span>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div className="text-xs font-mono text-slate-600 dark:text-slate-400">
                  Have a similar requirement for your enterprise?
                </div>
                <a
                  href="#contact"
                  onClick={() => playUiChime('click')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0A6CDB] hover:bg-[#085bb8] text-white font-mono text-xs font-semibold tracking-wider transition-all"
                >
                  <span>DISCUSS SPEC</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
