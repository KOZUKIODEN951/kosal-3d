import React, { useState, useEffect, useRef } from 'react';
import { Phone, PhoneOff, Mic, Volume2, Sparkles, CheckCircle2, Activity, Play, Pause, Zap } from 'lucide-react';
import { playUiChime } from '../utils/audio';

export const VoiceCallingDemo: React.FC = () => {
  const [callState, setCallState] = useState<'idle' | 'calling' | 'connected'>('idle');
  const [activePersona, setActivePersona] = useState<'sales' | 'support' | 'appointment'>('sales');
  const [transcriptIndex, setTranscriptIndex] = useState<number>(0);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  const personas = {
    sales: {
      name: 'Elena (Enterprise Inbound SDR)',
      scenario: 'High-intent lead qualification & meeting scheduling',
      latency: '340ms',
      transcripts: [
        { speaker: 'agent', text: "Hi Alex! Elena here from Kosal. I noticed you were exploring our AI automation infrastructure for your SaaS platform. How can I help you scale today?", time: '0:02' },
        { speaker: 'user', text: "Hey Elena! We're building a multi-tenant platform and need autonomous voice dispatching. Can your system handle sub-500ms turn-taking?", time: '0:08' },
        { speaker: 'agent', text: "Absolutely. Our voice pipeline achieves 340ms round-trip latency with neural speech synthesis and streaming WebSocket VAD. We can book a live technical deep-dive with our principal architect this Thursday at 3 PM IST. Does that work for you?", time: '0:15' },
        { speaker: 'user', text: "Thursday at 3 PM works perfectly. Send over the calendar invite.", time: '0:22' },
        { speaker: 'agent', text: "Confirmed! I've automatically dispatched the calendar invite to alex@company.com and updated your CRM profile. Excited to partner with you!", time: '0:28' }
      ]
    },
    support: {
      name: 'Marcus (24/7 Tier-1 Technical Concierge)',
      scenario: 'Autonomous troubleshooting & account resolution',
      latency: '290ms',
      transcripts: [
        { speaker: 'agent', text: "Thank you for calling Kosal Support. I see an alert regarding API rate-limiting on endpoint /v2/telemetry. Are you experiencing elevated 429 errors?", time: '0:02' },
        { speaker: 'user', text: "Yes, our background ingestion spikes hit the limit during peak batch jobs.", time: '0:07' },
        { speaker: 'agent', text: "I've dynamically authorized an emergency burst quota of 50,000 req/min for the next 4 hours and queued our adaptive Redis rate-limiter patch.", time: '0:14' },
        { speaker: 'user', text: "That was instant. Dashboard just turned green. Thank you!", time: '0:19' },
        { speaker: 'agent', text: "Glad to help! A full post-incident diagnostic log has been delivered to your Slack channel.", time: '0:24' }
      ]
    },
    appointment: {
      name: 'Priya (Smart Clinical Dispatcher)',
      scenario: 'Healthcare & enterprise scheduling workflow',
      latency: '310ms',
      transcripts: [
        { speaker: 'agent', text: "Namaste! This is Priya from Kosal Clinic Systems. Am I speaking with Rahul regarding your quarterly health consultation?", time: '0:02' },
        { speaker: 'user', text: "Yes Priya. I need to reschedule my Friday appointment to Saturday morning.", time: '0:07' },
        { speaker: 'agent', text: "I have Dr. Ananya available on Saturday at 10:30 AM or 11:15 AM at the Palayamkottai center. Which one suits your schedule best?", time: '0:13' },
        { speaker: 'user', text: "10:30 AM is ideal.", time: '0:17' },
        { speaker: 'agent', text: "Done! Your slot for Saturday, 10:30 AM is locked. WhatsApp confirmation and digital pass have been dispatched to your mobile.", time: '0:23' }
      ]
    }
  };

  const activeData = personas[activePersona];

  // Call timer and transcript step progression
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (callState === 'connected') {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [callState]);

  useEffect(() => {
    let transcriptTimer: NodeJS.Timeout;
    if (callState === 'connected') {
      transcriptTimer = setInterval(() => {
        setTranscriptIndex((prev) => {
          if (prev < activeData.transcripts.length - 1) return prev + 1;
          return prev;
        });
      }, 4000);
    }
    return () => clearInterval(transcriptTimer);
  }, [callState, activeData]);

  const handleStartCall = () => {
    playUiChime('click');
    setCallState('calling');
    setTranscriptIndex(0);
    setCallDuration(0);

    setTimeout(() => {
      setCallState('connected');
      playUiChime('success');
    }, 1800);
  };

  const handleEndCall = () => {
    playUiChime('click');
    setCallState('idle');
    setTranscriptIndex(0);
    setCallDuration(0);
  };

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section id="ai-calling" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono mb-4">
          <Zap className="w-3.5 h-3.5" />
          <span>PROPRIETARY AI VOICE PIPELINE // ULTRA-LOW LATENCY</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
          Autonomous AI Voice Calling. <br />
          <span className="text-[#0A6CDB]">Sub-500ms Human-Parity Turn-Taking.</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
          Engineered by Kosal, our voice agents execute complex inbound/outbound phone conversations, schedule calendar appointments, resolve technical support tickets, and synchronize with CRMs in real time.
        </p>
      </div>

      {/* Main Interactive Simulator Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-slate-50 dark:bg-slate-900/60 p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
        {/* Left Column: Interactive Phone Simulator */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between min-h-[480px]">
          {/* Header in simulator */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${callState === 'connected' ? 'bg-emerald-500 animate-pulse' : callState === 'calling' ? 'bg-amber-500 animate-ping' : 'bg-slate-400'}`}></span>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
                  {callState === 'connected' ? `CONNECTED (${formatSeconds(callDuration)})` : callState === 'calling' ? 'DIALING NEURAL PIPELINE...' : 'STANDBY READY'}
                </span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                LATENCY: {activeData.latency}
              </span>
            </div>

            {/* Caller Info */}
            <div className="text-center py-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-[#0A6CDB] to-[#9047FF] p-[2px] mb-4">
                <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center">
                  <Mic className={`w-7 h-7 ${callState === 'connected' ? 'text-[#0A6CDB] animate-pulse' : 'text-slate-400'}`} />
                </div>
              </div>
              <h4 className="font-bold text-lg text-slate-900 dark:text-white">{activeData.name}</h4>
              <p className="text-xs text-slate-500 mt-1">{activeData.scenario}</p>
            </div>

            {/* Live Waveform Visualizer Simulation */}
            <div className="py-6 flex items-center justify-center gap-1.5 h-16">
              {Array.from({ length: 24 }).map((_, i) => (
                <span
                  key={i}
                  className={`w-1 rounded-full transition-all duration-150 ${
                    callState === 'connected'
                      ? 'bg-gradient-to-t from-[#0A6CDB] to-[#9047FF]'
                      : 'bg-slate-200 dark:bg-slate-800'
                  }`}
                  style={{
                    height: callState === 'connected' ? `${Math.max(8, Math.sin(callDuration * 3 + i * 0.4) * 38 + 12)}px` : '6px',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
            {callState === 'idle' ? (
              <button
                onClick={handleStartCall}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm font-mono tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>START SIMULATED CALL</span>
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`flex-1 py-3 rounded-xl border text-xs font-mono font-medium flex items-center justify-center gap-2 transition-colors ${
                    isMuted ? 'bg-amber-500/10 border-amber-500/30 text-amber-600' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{isMuted ? 'UNMUTE' : 'MUTE'}</span>
                </button>
                <button
                  onClick={handleEndCall}
                  className="flex-1 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-mono text-xs font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span>DISCONNECT</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live Transcript & Persona Switcher */}
        <div className="lg:col-span-7 space-y-6">
          {/* Persona selector pills */}
          <div>
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block mb-3">
              SELECT REAL-WORLD SCENARIO:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  playUiChime('click');
                  setActivePersona('sales');
                  setTranscriptIndex(0);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all ${
                  activePersona === 'sales'
                    ? 'bg-[#0A6CDB] text-white shadow-md shadow-blue-500/20'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                Enterprise SDR (Sales)
              </button>
              <button
                onClick={() => {
                  playUiChime('click');
                  setActivePersona('support');
                  setTranscriptIndex(0);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all ${
                  activePersona === 'support'
                    ? 'bg-[#0A6CDB] text-white shadow-md shadow-blue-500/20'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                24/7 Tech Support
              </button>
              <button
                onClick={() => {
                  playUiChime('click');
                  setActivePersona('appointment');
                  setTranscriptIndex(0);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all ${
                  activePersona === 'appointment'
                    ? 'bg-[#0A6CDB] text-white shadow-md shadow-blue-500/20'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                Clinical Dispatcher
              </button>
            </div>
          </div>

          {/* Live Transcript Stream */}
          <div className="bg-white dark:bg-slate-950 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 min-h-[300px] flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 text-xs font-mono text-slate-500">
              <span>REAL-TIME STREAMING TRANSCRIPTION</span>
              <span className="text-emerald-500 font-semibold flex items-center gap-1">
                <Activity className="w-3.5 h-3.5" /> LIVE WEBSOCKET
              </span>
            </div>

            <div className="space-y-3 my-4 max-h-[240px] overflow-y-auto pr-2">
              {activeData.transcripts.slice(0, transcriptIndex + 1).map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl text-xs leading-relaxed animate-fadeIn ${
                    item.speaker === 'agent'
                      ? 'bg-blue-50/80 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 text-slate-800 dark:text-blue-100'
                      : 'bg-slate-100 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 ml-6'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1 text-[10px] font-mono opacity-60">
                    <span className="uppercase font-bold">{item.speaker === 'agent' ? activeData.name : 'Caller (Alex)'}</span>
                    <span>{item.time}</span>
                  </div>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>

            {/* Architecture Highlights Bar */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
              <div>
                <span className="block text-[10px] font-mono text-slate-400">TURN-TAKING</span>
                <span className="text-xs font-bold text-slate-800 dark:text-white">&lt; 350ms</span>
              </div>
              <div>
                <span className="block text-[10px] font-mono text-slate-400">TOOL CALLING</span>
                <span className="text-xs font-bold text-slate-800 dark:text-white">Live CRM/Cal</span>
              </div>
              <div>
                <span className="block text-[10px] font-mono text-slate-400">VOICE ENGINE</span>
                <span className="text-xs font-bold text-slate-800 dark:text-white">Neural Speech</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
