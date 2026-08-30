import React, { useState } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  CheckCheck, 
  Sparkles, 
  ShieldCheck, 
  User, 
  Zap, 
  PhoneCall,
  BadgeCheck
} from 'lucide-react';
import { openWhatsApp, DISPLAY_PHONE, FOUNDER_NAME, COMPANY_NAME, RAW_PHONE } from '../utils/whatsappHelper';

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState('');

  const quickTemplates = [
    {
      label: '🎧 Apply for Non-IT Drives (TP / Accenture / Genpact)',
      text: `Hello ${FOUNDER_NAME} Sir, I want to apply for upcoming Non-IT drives (Teleperformance Google Process / Accenture / Genpact / Concentrix) in Hyderabad. Please share the walk-in schedule.`,
    },
    {
      label: '💼 Looking for IT & Cloud opportunities (Kyndryl / Dev)',
      text: `Hello ${FOUNDER_NAME} Sir, I am looking for IT / Cloud Infrastructure or Software Developer opportunities in Hyderabad. Please review my profile.`,
    },
    {
      label: '🏥 Medical Billing & Healthcare drives inquiry',
      text: `Hello ${FOUNDER_NAME} Sir, I am interested in US Healthcare ITES and Medical Billing / AR Caller drives in Hyderabad.`,
    },
    {
      label: '🎓 Enroll for Mock Interview Preparation (1-on-1)',
      text: `Hello ${FOUNDER_NAME} Sir, I would like to enroll for a 1-on-1 Mock Interview session with you for Versant / HR Polish.`,
    },
  ];

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMessage.trim()) return;
    openWhatsApp(customMessage.trim());
    setCustomMessage('');
    setIsOpen(false);
  };

  const handleTemplateClick = (text: string) => {
    openWhatsApp(text);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Expandable Chat Dialog Popup */}
      {isOpen && (
        <div className="mb-3 w-[340px] sm:w-[380px] rounded-2xl bg-[#0F172A] border border-slate-700/80 shadow-2xl shadow-black/80 overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0B132B] to-slate-900 p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Executive Founder Avatar */}
              <div className="relative">
                <img
                  src="/founder.jpg"
                  alt={FOUNDER_NAME}
                  className="w-10 h-10 rounded-full object-cover object-top border-2 border-amber-400 shadow-md bg-slate-900"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#0F172A]" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-white leading-tight">{FOUNDER_NAME}</h4>
                  <BadgeCheck className="w-4 h-4 text-sky-400" />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online • Founder & Lead Recruiter</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-4 max-h-[380px] overflow-y-auto">
            {/* Direct Recruiter Note Bubble */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 space-y-1">
              <p className="font-semibold text-amber-400">Welcome to {COMPANY_NAME}!</p>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Connect with me directly on WhatsApp for immediate screening, verified client drives, or mock interview slots.
              </p>
              <div className="pt-1 flex items-center gap-2 text-[10px] text-slate-400">
                <span>Direct Line: <strong className="text-white font-mono">{DISPLAY_PHONE}</strong></span>
              </div>
            </div>

            {/* 1-Click Templates */}
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                1-Click Quick Message Templates:
              </p>
              <div className="space-y-1.5">
                {quickTemplates.map((template, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleTemplateClick(template.text)}
                    className="w-full text-left p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800/80 hover:border-amber-400/40 text-xs text-slate-300 hover:text-white transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[11px] group-hover:text-amber-300">{template.label}</span>
                      <Send className="w-3 h-3 text-slate-400 group-hover:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Input */}
            <form onSubmit={handleSendCustom} className="pt-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type your message to Sandru Anudeep..."
                  value={customMessage}
                  onChange={e => setCustomMessage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-3 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                />
                <button
                  type="submit"
                  disabled={!customMessage.trim()}
                  className="absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-[#25D366] text-slate-950 hover:bg-[#20bd5a] disabled:opacity-30 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold text-sm shadow-2xl shadow-emerald-950/80 hover:shadow-emerald-900 transition-all duration-300 transform active:scale-95"
        aria-label="Chat on WhatsApp with Founder Sandru Anudeep"
      >
        {/* Pulsing Status Ping Ring */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#0B132B]" />
        </span>

        <MessageSquare className="w-5 h-5 fill-current text-slate-950" />
        <span className="tracking-tight">WhatsApp Founder</span>
      </button>
    </div>
  );
};
