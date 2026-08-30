import React from 'react';
import { 
  ArrowRight, 
  MessageSquare, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  Users, 
  Sparkles, 
  Zap, 
  Clock, 
  Briefcase, 
  Headphones, 
  Stethoscope, 
  Award
} from 'lucide-react';
import { openWhatsApp, DISPLAY_PHONE, FOUNDER_NAME } from '../utils/whatsappHelper';

interface HeroSectionProps {
  onSelectSector: (sector: 'IT' | 'Non-IT' | 'Healthcare' | 'All') => void;
  activeSector: 'IT' | 'Non-IT' | 'Healthcare' | 'All';
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectSector, activeSector }) => {
  const handleDirectWhatsApp = () => {
    openWhatsApp(`Hello ${FOUNDER_NAME} Sir, I am reaching out from the TalentRise portal. I would like to know about current open placement drives in Hyderabad and schedule a profile review.`);
  };

  const metrics = [
    {
      value: '300+',
      label: 'Verified Candidate Closures',
      sublabel: 'Across IT, BPO & Healthcare',
      icon: Users,
      highlight: 'text-amber-400',
    },
    {
      value: '15+',
      label: 'MNC Hiring Partners',
      sublabel: 'Tier-1 & Global Process Clients',
      icon: Building2,
      highlight: 'text-sky-400',
    },
    {
      value: '100%',
      label: 'Verified Client Drives',
      sublabel: 'Direct interview schedule, zero spam',
      icon: ShieldCheck,
      highlight: 'text-emerald-400',
    },
    {
      value: '24–48h',
      label: 'Fast-Track Screening',
      sublabel: 'Rapid feedback & mock coaching',
      icon: Zap,
      highlight: 'text-amber-400',
    },
  ];

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Verified Badge Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-amber-400/30 text-xs font-semibold text-amber-300 shadow-lg shadow-amber-950/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Founded in 2024 • Hyderabad HQ</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">Direct Recruiter: <strong className="text-white font-mono">{DISPLAY_PHONE}</strong></span>
          </div>

          {/* High-Impact Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
            Accelerate Your Career with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500">
              Direct Client Drives
            </span>{' '}
            & Verified Placements
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Empowering job seekers across Hyderabad and pan-India with <strong className="text-white font-semibold">300+ successful closures</strong> in IT Cloud, Non-IT Global Voice (Google Process, Teleperformance, Accenture), and US Healthcare Medical Billing — personally mentored by <strong className="text-amber-400 font-semibold">{FOUNDER_NAME}</strong>.
          </p>

          {/* Sector Quick-Filter Pills */}
          <div className="mb-10">
            <p className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-3">
              Explore Active Hiring Streams:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              <button
                onClick={() => onSelectSector('IT')}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                  activeSector === 'IT'
                    ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-900/40'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-700/80 hover:border-slate-600'
                }`}
              >
                <Briefcase className="w-4 h-4 text-sky-400" />
                <span>💼 IT & Cloud Tech</span>
                <span className="text-[11px] opacity-75 hidden sm:inline">(Capgemini, Kyndryl, CYE)</span>
              </button>

              <button
                onClick={() => onSelectSector('Non-IT')}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                  activeSector === 'Non-IT'
                    ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-lg shadow-amber-950/40 font-bold'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-700/80 hover:border-slate-600'
                }`}
              >
                <Headphones className="w-4 h-4 text-amber-400" />
                <span>🎧 Non-IT, Voice & Google Process</span>
                <span className="text-[11px] opacity-75 hidden sm:inline">(TP, Accenture, Genpact)</span>
              </button>

              <button
                onClick={() => onSelectSector('Healthcare')}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                  activeSector === 'Healthcare'
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-lg shadow-emerald-950/40'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-700/80 hover:border-slate-600'
                }`}
              >
                <Stethoscope className="w-4 h-4 text-emerald-400" />
                <span>🏥 Healthcare & Medical Billing</span>
                <span className="text-[11px] opacity-75 hidden sm:inline">(Freshers & Life Sciences)</span>
              </button>
            </div>
          </div>

          {/* Dual Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto mb-14">
            <a
              href="#drives"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg shadow-blue-900/30 hover:shadow-blue-800/50 transition-all transform active:scale-95"
            >
              <span>Explore Open Drives</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={handleDirectWhatsApp}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 shadow-lg shadow-emerald-950/40 hover:shadow-emerald-900/60 transition-all transform active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-current text-slate-950" />
              <span>Direct WhatsApp to {FOUNDER_NAME}</span>
            </button>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 max-w-6xl mx-auto">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors shadow-lg shadow-black/20"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-2xl sm:text-3xl font-extrabold font-mono ${metric.highlight}`}>
                    {metric.value}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">
                  {metric.label}
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                  {metric.sublabel}
                </p>
              </div>
            );
          })}
        </div>

        {/* Hiring Partners Ticker / Logos */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 text-center">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-4">
            Trusted Recruitment Pipelines & Client Drives Include
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 opacity-85">
            {[
              'Capgemini',
              'Teleperformance',
              'Google Process',
              'Accenture',
              'Kyndryl',
              'Concentrix',
              'Genpact',
              'CYE Global',
              'Access Healthcare',
              'Vee Technologies',
              'Omega Healthcare',
              'WNS',
            ].map((partner, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-amber-400 hover:border-slate-700 transition-colors"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
