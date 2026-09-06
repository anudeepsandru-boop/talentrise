import React from 'react';
import { MNC_PARTNERS, MncPartner } from '../data/mncPartners';
import { openWhatsApp, FOUNDER_NAME } from '../utils/whatsappHelper';
import { Building2, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface MncHiringBannerProps {
  onSelectSector?: (sector: any) => void;
}

export const MncHiringBanner: React.FC<MncHiringBannerProps> = () => {
  const handleMncClick = (partner: MncPartner) => {
    openWhatsApp(
      `Hello ${FOUNDER_NAME} Sir, I am interested in applying for upcoming drives at ${partner.name} (${partner.hiringRoles}). Please let me know the eligibility criteria and interview schedule.`
    );
  };

  // Duplicate for seamless infinite marquee loop
  const marqueeItems = [...MNC_PARTNERS, ...MNC_PARTNERS];

  return (
    <section className="relative z-20 py-8 bg-gradient-to-b from-slate-900 via-purple-950/40 to-[#060913] border-y border-purple-900/30 overflow-hidden">
      {/* Background Subtle Mesh */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                  Actively Recruiting for Top MNCs
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Direct Client Schedules
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Official hiring partner & direct screening drives for 8+ Fortune 500 & Tier-1 global employers
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-end gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Verified Placements • Hyderabad & Pan-India</span>
          </div>
        </div>
      </div>

      {/* Floating Logos Marquee Rail */}
      <div className="relative w-full overflow-hidden py-2 mask-[linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
        <div className="animate-marquee flex items-center gap-4 sm:gap-6 pl-4">
          {marqueeItems.map((partner, idx) => (
            <div
              key={`${partner.id}-${idx}`}
              onClick={() => handleMncClick(partner)}
              className="group shrink-0 cursor-pointer w-64 sm:w-72 bg-white/95 hover:bg-white rounded-2xl p-4 border border-slate-200/90 shadow-md hover:shadow-xl hover:border-purple-400 transition-all transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                {/* Clean Crisp Logo Image */}
                <div className="h-10 w-32 bg-white rounded-lg p-1 flex items-center justify-start">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain filter group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 shrink-0">
                  {partner.badge}
                </span>
              </div>

              <div className="text-left">
                <p className="text-xs font-bold text-slate-900 group-hover:text-purple-700 transition-colors line-clamp-1">
                  {partner.hiringRoles}
                </p>
                <div className="mt-1 flex items-center justify-between text-[11px]">
                  <span className="font-extrabold text-emerald-600">
                    {partner.ctc}
                  </span>
                  <span className="text-slate-400 font-medium">
                    {partner.workMode}
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-purple-700 font-bold">
                <span>Direct Interview Slot</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
