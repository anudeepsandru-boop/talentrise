import React, { useState } from 'react';
import { MNC_PARTNERS, MncPartner } from '../data/mncPartners';
import { openWhatsApp, FOUNDER_NAME } from '../utils/whatsappHelper';
import { Building2, Sparkles, ExternalLink, X, ChevronUp, ChevronDown, CheckCircle2 } from 'lucide-react';

interface FloatingMncShowcaseProps {
  onSelectMnc?: (mncName: string) => void;
}

export const FloatingMncShowcase: React.FC<FloatingMncShowcaseProps> = ({ onSelectMnc }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMnc, setSelectedMnc] = useState<MncPartner | null>(null);

  const handleApplyMnc = (partner: MncPartner) => {
    openWhatsApp(
      `Hello ${FOUNDER_NAME} Sir, I saw that TalentRise is recruiting for ${partner.name}. I am interested in ${partner.hiringRoles} with expected CTC around ${partner.ctc}. Please guide me on direct interview schedule and slot allocation.`
    );
  };

  return (
    <>
      {/* Floating Bottom-Left MNC Hiring Dock */}
      <div className="fixed bottom-6 left-4 sm:left-6 z-40 max-w-xs sm:max-w-sm">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-3 px-3.5 sm:px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-purple-300 shadow-xl shadow-purple-900/10 hover:shadow-purple-600/20 hover:border-purple-500 transition-all transform hover:-translate-y-0.5"
            title="Click to view all 8 MNCs actively hiring"
          >
            {/* Animated Logo Stack Preview */}
            <div className="flex -space-x-2 overflow-hidden py-0.5">
              <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 shadow-xs flex items-center justify-center p-0.5">
                <img src="/logos/cognizant.svg" alt="Cognizant" className="w-full h-full object-contain" />
              </div>
              <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 shadow-xs flex items-center justify-center p-0.5">
                <img src="/logos/capgemini.svg" alt="Capgemini" className="w-full h-full object-contain" />
              </div>
              <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 shadow-xs flex items-center justify-center p-0.5">
                <img src="/logos/wipro.svg" alt="Wipro" className="w-full h-full object-contain" />
              </div>
              <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 shadow-xs flex items-center justify-center p-0.5">
                <img src="/logos/teleperformance.svg" alt="Teleperformance" className="w-full h-full object-contain" />
              </div>
            </div>

            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-xs font-black text-slate-900 leading-tight">
                  Recruiting for MNCs
                </p>
              </div>
              <p className="text-[10px] text-purple-700 font-bold leading-tight">
                8 Tier-1 Global Giants
              </p>
            </div>

            <div className="p-1 rounded-lg bg-purple-50 text-purple-700 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <ChevronUp className="w-4 h-4" />
            </div>
          </button>
        ) : (
          /* Expanded Floating MNC Board */
          <div className="w-[320px] sm:w-[380px] max-h-[85vh] flex flex-col bg-white rounded-2xl shadow-2xl border-2 border-purple-200 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
            {/* Header */}
            <div className="p-3.5 bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-white/15 backdrop-blur-xs">
                  <Building2 className="w-4 h-4 text-purple-200" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black tracking-tight leading-tight">
                    Actively Recruiting for Top MNCs
                  </h4>
                  <p className="text-[10px] text-purple-200">
                    Direct Client Schedules & Guaranteed Slot Booking
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-white/20 text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Notice */}
            <div className="px-3.5 py-1.5 bg-amber-50 border-b border-amber-200 flex items-center gap-2 text-[11px] text-amber-900 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Direct interview slot booking with Sandru Anudeep</span>
            </div>

            {/* Scrollable MNC Cards Grid */}
            <div className="p-3 overflow-y-auto max-h-[380px] space-y-2.5 divide-y divide-slate-100">
              {MNC_PARTNERS.map(partner => (
                <div
                  key={partner.id}
                  className="pt-2.5 first:pt-0 group flex items-center justify-between gap-3 hover:bg-slate-50 p-2 rounded-xl transition-all"
                >
                  {/* Logo Frame */}
                  <div className="w-24 h-12 shrink-0 bg-white rounded-lg border border-slate-200 p-1.5 flex items-center justify-center shadow-xs">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {partner.name}
                      </p>
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full font-bold bg-purple-50 text-purple-700 border border-purple-200 shrink-0">
                        {partner.badge}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 truncate">
                      {partner.hiringRoles}
                    </p>
                    <p className="text-[11px] font-bold text-emerald-600">
                      {partner.ctc}
                    </p>
                  </div>

                  {/* Apply Button */}
                  <button
                    onClick={() => handleApplyMnc(partner)}
                    className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 shrink-0 shadow-xs flex items-center gap-1"
                    title={`Apply for ${partner.name} drive`}
                  >
                    <span>Apply</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer Action */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-600 text-[11px]">
                8 Active Enterprise Drives
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-purple-700 font-bold hover:underline text-[11px]"
              >
                Minimize Window
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
