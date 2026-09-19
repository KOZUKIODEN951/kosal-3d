import React, { useState } from 'react';
import { MessageSquare, Send, CheckCheck, Sparkles, ShoppingBag, Truck, Calendar, Bot, ArrowRight, Check } from 'lucide-react';
import { playUiChime } from '../utils/audio';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
  card?: {
    title: string;
    desc: string;
    btn: string;
  };
}

export const EngagePlatformDemo: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState<'whatsapp' | 'instagram'>('whatsapp');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Hi Sarah! Welcome to Lumina Store. How can our automated concierge assist you today?',
      time: '11:42 AM',
      card: {
        title: 'Spring 2026 Collection',
        desc: 'Explore our latest arrivals with 20% launch discount.',
        btn: 'Browse Catalog',
      },
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendPrompt = (promptText: string, botResponseText: string, card?: Message['card']) => {
    playUiChime('click');
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: promptText,
      time: '11:43 AM',
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      playUiChime('hover');
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponseText,
        time: '11:43 AM',
        card,
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 900);
  };

  const resetChat = (channel: 'whatsapp' | 'instagram') => {
    playUiChime('click');
    setActiveChannel(channel);
    if (channel === 'whatsapp') {
      setMessages([
        {
          id: '1',
          sender: 'bot',
          text: 'Hi Sarah! Welcome to Lumina Store on WhatsApp. How can our automated concierge assist you today?',
          time: '11:42 AM',
          card: {
            title: 'Spring 2026 Collection',
            desc: 'Explore our latest arrivals with 20% launch discount.',
            btn: 'Browse Catalog',
          },
        },
      ]);
    } else {
      setMessages([
        {
          id: '1',
          sender: 'bot',
          text: 'Hey Sarah! Thanks for reacting to our Instagram Story! 🔥 Here is your VIP promo code and private checkout link.',
          time: '11:42 AM',
          card: {
            title: 'VIP Instagram Story Drop',
            desc: 'Exclusive access unlocked for verified followers.',
            btn: 'Claim 20% Off',
          },
        },
      ]);
    }
  };

  return (
    <section id="engage-platform" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-800">
      {/* Section Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>KOSAL ENGAGE // OMNICHANNEL CONVERSATIONAL ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Engage Platform. <br />
            <span className="text-[#0A6CDB]">Full Automation for WhatsApp &amp; Instagram.</span>
          </h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
          Kosal’s proprietary Engage platform unifies Instagram DMs and WhatsApp Cloud APIs into an automated revenue and support machine — driving 10x response velocity, zero dropped leads, and seamless human agent handoff.
        </p>
      </div>

      {/* Main Interactive Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-slate-50 dark:bg-slate-900/50 p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
        {/* Left Column: Interactive Smartphone Mockup */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-[360px] rounded-[36px] bg-slate-900 p-3 shadow-2xl border-4 border-slate-800">
            {/* Screen Inner */}
            <div className="w-full h-[580px] rounded-[28px] bg-[#0b141a] dark:bg-[#080d11] flex flex-col justify-between overflow-hidden relative">
              {/* App Top Bar */}
              <div className={`p-4 flex items-center justify-between text-white ${activeChannel === 'whatsapp' ? 'bg-[#1f2c34]' : 'bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]'}`}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                    {activeChannel === 'whatsapp' ? <MessageSquare className="w-4 h-4 text-emerald-400" /> : <InstagramIcon className="w-4 h-4 text-white" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold leading-tight">Lumina Concierge</div>
                    <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      <span>Automated · Verified</span>
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 uppercase tracking-wider">
                  {activeChannel}
                </span>
              </div>

              {/* Chat Message Stream */}
              <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col max-w-[85%] ${m.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                  >
                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-[#005c4b] text-white rounded-tr-none'
                          : 'bg-[#202c33] text-slate-100 rounded-tl-none'
                      }`}
                    >
                      <p>{m.text}</p>
                      {m.card && (
                        <div className="mt-2.5 p-2.5 rounded-xl bg-black/30 border border-white/10">
                          <div className="font-bold text-[11px] text-white">{m.card.title}</div>
                          <div className="text-[10px] text-slate-300 mt-0.5">{m.card.desc}</div>
                          <button className="mt-2 w-full py-1.5 rounded-lg bg-[#0A6CDB] text-white text-[10px] font-semibold">
                            {m.card.btn}
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-[9px] text-slate-400 mt-1 px-1">
                      <span>{m.time}</span>
                      {m.sender === 'user' && <CheckCheck className="w-3 h-3 text-cyan-400" />}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-[#202c33] text-slate-400 w-fit text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                )}
              </div>

              {/* Bottom Simulated Input Bar */}
              <div className="p-3 bg-[#1f2c34] flex items-center gap-2">
                <div className="flex-1 py-2 px-3 rounded-full bg-[#2a3942] text-xs text-slate-400">
                  Select a workflow below...
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                  <Send className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Workflow Triggers & Platform Architecture */}
        <div className="lg:col-span-6 space-y-6">
          {/* Channel Switcher */}
          <div>
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block mb-3">
              SWITCH CHANNEL ENVIRONMENT:
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => resetChat('whatsapp')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-mono text-xs font-semibold transition-all ${
                  activeChannel === 'whatsapp'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Cloud API</span>
              </button>

              <button
                onClick={() => resetChat('instagram')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-mono text-xs font-semibold transition-all ${
                  activeChannel === 'instagram'
                    ? 'bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white shadow-lg shadow-pink-500/25'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Instagram Graph DMs</span>
              </button>
            </div>
          </div>

          {/* Interactive Trigger Buttons */}
          <div>
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block mb-3">
              TRIGGER AUTOMATED ACTION FLOW:
            </span>
            <div className="space-y-2.5">
              <button
                onClick={() =>
                  handleSendPrompt(
                    'Can I track my order #KOS-9481?',
                    'Your order #KOS-9481 is currently out for delivery via Express Air. Expected delivery: Today by 4:30 PM IST.',
                    {
                      title: 'Live Shipment Tracking',
                      desc: 'Courier: BlueDart Express · Driver en route',
                      btn: 'View Live Map',
                    }
                  )
                }
                className="w-full text-left p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#0A6CDB] flex items-center justify-between text-xs text-slate-800 dark:text-slate-200 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Truck className="w-4 h-4 text-blue-500" />
                  <span>"Can I track my order #KOS-9481?" (Instant Logistics Lookup)</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0A6CDB] transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() =>
                  handleSendPrompt(
                    'I want to schedule an engineering demo with your team',
                    "I'd love to connect you with our lead architect. Choose your preferred time slot below for a 30-minute product session:",
                    {
                      title: 'Engineering Deep Dive',
                      desc: 'Slots open for tomorrow at 2:00 PM & 4:30 PM',
                      btn: 'Confirm Time Slot',
                    }
                  )
                }
                className="w-full text-left p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#0A6CDB] flex items-center justify-between text-xs text-slate-800 dark:text-slate-200 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-purple-500" />
                  <span>"I want to schedule an engineering demo" (Calendar Booking Flow)</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0A6CDB] transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() =>
                  handleSendPrompt(
                    'Send me your full product pricing & enterprise deck',
                    "Here is the complete Kosal Enterprise Product Portfolio and rate card. A copy has also been dispatched to your email:",
                    {
                      title: 'Kosal Enterprise Suite 2026',
                      desc: 'PDF Brochure & Architecture Blueprint (3.8 MB)',
                      btn: 'Download PDF',
                    }
                  )
                }
                className="w-full text-left p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#0A6CDB] flex items-center justify-between text-xs text-slate-800 dark:text-slate-200 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-4 h-4 text-amber-500" />
                  <span>"Send me your full enterprise deck" (Lead Capture & PDF Dispatch)</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0A6CDB] transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Key Capabilities Badges */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase">
              ENGAGE PLATFORM ARCHITECTURE
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Official Meta Cloud API</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Zero-Latency Webhooks</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Unified Multi-Agent Inbox</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>HubSpot / CRM Auto-Sync</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
