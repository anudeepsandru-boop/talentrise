import React, { useState } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  BadgeCheck
} from 'lucide-react';
import { openWhatsApp, DISPLAY_PHONE, FOUNDER_NAME, COMPANY_NAME } from '../utils/whatsappHelper';

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState('');

  const quickTemplates = [
    {
      label: '💼 Apply for Capgemini CATIA Hiring Drive (₹5.5 LPA)',
      text: `Hello ${FOUNDER_NAME} Sir, I want to apply for the Capgemini CATIA Hiring Drive (Aeronautical & Mechanical). Please guide me with slot allocation and screening.`,
    },
    {
      label: '🎧 Non-IT / BPO Operations Walk-in inquiry',
      text: `Hello ${FOUNDER_NAME} Sir, I want to inquire about upcoming Non-IT / BPO operations openings in Hyderabad. Please share current schedules.`,
    },
    {
      label: '🎓 Enroll for Mock Interview Preparation (1-on-1)',
      text: `Hello ${FOUNDER_NAME} Sir, I would like to enroll for a 1-on-1 Mock Interview session with you for Technical / HR Polish.`,
    },
    {
      label: '🏢 Corporate B2B Staffing Inquiry',
      text: `Hello ${FOUNDER_NAME} Sir, We are looking to hire pre-screened talent via TalentRise for our corporate hiring requirements.`,
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
        <div className="mb-3 w-[340px] sm:w-[380px] rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Executive Founder Avatar */}
              <div className="relative">
                <img
                  src="/founder.jpg"
                  alt={FOUNDER_NAME}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = "https://lh3.googleusercontent.com/d/1aRutKgTAE7szt8S3WbfuRJRyI8Tk9ed7";
                  }}
                  className="w-10 h-10 rounded-full object-cover object-top border-2 border-purple-500 shadow-sm bg-slate-100"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-extrabold text-slate-950 leading-tight">{FOUNDER_NAME}</h4>
                  <BadgeCheck className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Online • Founder & Lead Recruiter</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-4 max-h-[380px] overflow-y-auto">
            {/* Direct Recruiter Note Bubble */}
            <div className="p-3.5 rounded-xl bg-purple-50/60 border border-purple-200/80 text-xs text-slate-700 space-y-1">
              <p className="font-bold text-purple-900">Welcome to {COMPANY_NAME}!</p>
              <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                Connect with me directly on WhatsApp for immediate screening, verified client drives, or mock interview slots.
              </p>
              <div className="pt-1 flex items-center gap-2 text-[10px] text-slate-500">
                <span>Direct Line: <strong className="text-slate-900 font-mono font-bold">{DISPLAY_PHONE}</strong></span>
              </div>
            </div>

            {/* 1-Click Templates */}
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">
                1-Click Quick Message Templates:
              </p>
              <div className="space-y-1.5">
                {quickTemplates.map((template, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleTemplateClick(template.text)}
                    className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50/50 border border-slate-200 hover:border-purple-300 text-xs text-slate-700 hover:text-purple-950 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[11px] group-hover:text-purple-800">{template.label}</span>
                      <Send className="w-3 h-3 text-slate-400 group-hover:text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1" />
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-3 pr-10 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white"
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
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold text-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform active:scale-95"
        aria-label="Chat on WhatsApp with Founder Sandru Anudeep"
      >
        {/* Pulsing Status Ping Ring */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
        </span>

        <MessageSquare className="w-5 h-5 fill-current text-slate-950" />
        <span className="tracking-tight font-extrabold">WhatsApp Founder</span>
      </button>
    </div>
  );
};
