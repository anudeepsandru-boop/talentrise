import React from 'react';
import { 
  Stethoscope, 
  ShieldCheck, 
  Award, 
  GraduationCap, 
  Car, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  Sparkles, 
  BookOpen, 
  TrendingUp
} from 'lucide-react';
import { HEALTHCARE_TRACKS, US_HEALTHCARE_ADVANTAGES } from '../data/healthcareData';
import { openWhatsApp, DISPLAY_PHONE, FOUNDER_NAME } from '../utils/whatsappHelper';

interface HealthcareSpotlightProps {
  onOpenApplyModal: () => void;
}

export const HealthcareSpotlight: React.FC<HealthcareSpotlightProps> = ({ onOpenApplyModal }) => {
  const handleWhatsAppInquiry = (trackTitle?: string) => {
    const text = trackTitle
      ? `Hello ${FOUNDER_NAME} Sir, I am interested in US Healthcare ITES drives for *${trackTitle}*. Please share upcoming screening dates and eligibility.`
      : `Hello ${FOUNDER_NAME} Sir, I want to apply for US Healthcare & Medical Billing drives for freshers in Hyderabad.`;
    openWhatsApp(text);
  };

  return (
    <section id="healthcare" className="py-16 md:py-24 relative bg-[#090F21] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Spotlight Banner Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400 mb-3 shadow-lg shadow-emerald-950/20">
            <Stethoscope className="w-4 h-4" />
            <span>Dedicated Placement Pipeline • Life Sciences & Freshers</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            US Healthcare ITES & Medical Billing Spotlight
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
            High-growth, non-cyclical global industry. Special hiring pipeline for <strong className="text-emerald-400">B.Pharm, M.Pharm, B.Sc Life Sciences, B.Com & Any Graduates</strong> in Hyderabad with 100% paid client training.
          </p>
        </div>

        {/* 4 Core Advantages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {US_HEALTHCARE_ADVANTAGES.map((adv, idx) => {
            const icons = [ShieldCheck, GraduationCap, Car, Award];
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/30 transition-all shadow-lg"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1 leading-snug">{adv.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{adv.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Specialized Career Tracks */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span>Core Healthcare Tracks with Active Drives</span>
            </h3>
            <span className="text-xs text-emerald-400 font-semibold hidden sm:inline">
              Daily Screening in Hyderabad
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {HEALTHCARE_TRACKS.map(track => (
              <div
                key={track.id}
                className="flex flex-col justify-between rounded-2xl bg-[#0F172A] border border-slate-800 hover:border-emerald-500/40 p-6 shadow-xl transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      RCM & Payers
                    </span>
                    <span className="text-xs font-bold text-amber-400">{track.averageStartingPackage}</span>
                  </div>

                  <h4 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug mb-2">
                    {track.title}
                  </h4>

                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1.5 mb-4">
                    <div>
                      <span className="text-slate-400 text-[10px] block uppercase">Target Degrees:</span>
                      <span className="text-slate-200 font-semibold">{track.targetDegree}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block uppercase">Shift / Transport:</span>
                      <span className="text-sky-300 font-medium">{track.shiftTiming}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block uppercase">Onboarding Prep:</span>
                      <span className="text-emerald-400 font-medium">{track.trainingDuration}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-5 text-xs text-slate-300">
                    <p className="font-semibold text-slate-400 uppercase text-[10px]">Domain Responsibilities:</p>
                    {track.coreResponsibilities.slice(0, 3).map((resp, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => handleWhatsAppInquiry(track.title)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 transition-all shadow-md"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-current" />
                    <span>Inquire Drive</span>
                  </button>
                  <button
                    onClick={onOpenApplyModal}
                    className="py-2.5 px-3 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                  >
                    Apply on Portal
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Life Sciences Fast-Track Direct Box */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-[#0F172A] border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Graduated in 2021 – 2024 with B.Pharm, B.Sc, or Life Sciences?
            </span>
            <h4 className="text-xl sm:text-2xl font-bold text-white">
              Launch Your Healthcare Career with 0 Days Placement Delay
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              TalentRise has placed over 100+ freshers into leading US Healthcare RCM processes across Hyderabad. We prepare you on US healthcare terminology, HIPAA compliance, and interview question sets before the drive.
            </p>
          </div>

          <button
            onClick={() => handleWhatsAppInquiry()}
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-950/50 transition-all active:scale-95"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Connect on Healthcare Drives</span>
          </button>
        </div>
      </div>
    </section>
  );
};
