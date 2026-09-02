import React from 'react';
import { 
  ArrowRight, 
  MessageSquare, 
  ShieldCheck, 
  Building2, 
  Users, 
  Zap, 
  Briefcase, 
  Headphones, 
  Stethoscope, 
  Flame
} from 'lucide-react';
import { openWhatsApp, DISPLAY_PHONE, FOUNDER_NAME } from '../utils/whatsappHelper';
import { PageType, SectorType } from '../types';

interface HeroSectionProps {
  onSelectSector: (sector: SectorType) => void;
  activeSector: SectorType;
  onNavigate?: (page: PageType) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectSector, activeSector, onNavigate }) => {
  const handleDirectWhatsApp = () => {
    openWhatsApp(`Hello ${FOUNDER_NAME} Sir, I am reaching out from the TalentRise portal. I would like to know about current open placement drives in Hyderabad and schedule a profile review.`);
  };

  const handleSectorClick = (sector: SectorType, targetPage: PageType) => {
    onSelectSector(sector);
    if (onNavigate && targetPage !== 'all') {
      onNavigate(targetPage);
    }
  };

  const metrics = [
    {
      value: '300+',
      label: 'Verified Candidate Closures',
      sublabel: 'Across IT, Engineering & MNCs',
      icon: Users,
      highlight: 'text-purple-600',
      iconBg: 'bg-purple-50 text-purple-600',
    },
    {
      value: '15+',
      label: 'MNC Hiring Partners',
      sublabel: 'Tier-1 & Global Enterprise Clients',
      icon: Building2,
      highlight: 'text-cyan-600',
      iconBg: 'bg-cyan-50 text-cyan-600',
    },
    {
      value: '100%',
      label: 'Verified Client Drives',
      sublabel: 'Direct interview schedule, zero spam',
      icon: ShieldCheck,
      highlight: 'text-emerald-600',
      iconBg: 'bg-emerald-50 text-emerald-600',
    },
    {
      value: '24–48h',
      label: 'Fast-Track Screening',
      sublabel: 'Rapid feedback & mock coaching',
      icon: Zap,
      highlight: 'text-pink-600',
      iconBg: 'bg-pink-50 text-pink-600',
    },
  ];

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden tech-mesh-bg">
      {/* Soft Luminous Atmospheric Glows (Matching the Magenta/Purple & Cyan spectrum) */}
      <div className="absolute top-10 right-10 w-[550px] h-[400px] bg-gradient-to-br from-fuchsia-400/20 via-pink-400/15 to-purple-400/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-20 left-10 w-[500px] h-[380px] bg-gradient-to-br from-cyan-400/15 via-sky-400/10 to-blue-400/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Verified Badge Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-purple-200/90 text-xs font-bold text-purple-900 shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Founded in 2024 • Hyderabad HQ</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600">Direct Recruiter: <strong className="text-slate-950 font-mono">{DISPLAY_PHONE}</strong></span>
          </div>

          {/* High-Impact High-Contrast Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.12] mb-6">
            Accelerate Your Career with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-600">
              Direct Client Drives
            </span>{' '}
            & Verified Placements
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Empowering job seekers across Hyderabad and pan-India with <strong className="text-slate-950 font-semibold">300+ successful closures</strong> in IT Engineering (Capgemini CATIA), Technical Services, and Corporate Placements — personally mentored by <strong className="text-purple-700 font-semibold">{FOUNDER_NAME}</strong>.
          </p>

          {/* Sector Quick-Filter Pills with Single Icons */}
          <div className="mb-10">
            <p className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-3">
              Explore Active Hiring Streams:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              <button
                onClick={() => handleSectorClick('All', 'all')}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
                  activeSector === 'All'
                    ? 'bg-slate-950 text-white border-slate-950 shadow-md shadow-slate-950/20'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-purple-300'
                }`}
              >
                <Flame className="w-4 h-4 text-pink-500" />
                <span>All Open Drives</span>
              </button>

              <button
                onClick={() => handleSectorClick('IT', 'it')}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
                  activeSector === 'IT'
                    ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/25'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-purple-300'
                }`}
              >
                <Briefcase className="w-4 h-4 text-cyan-500" />
                <span>IT & Engineering Drives</span>
                <span className="text-[11px] opacity-80 hidden sm:inline">(Capgemini CATIA)</span>
              </button>

              <button
                onClick={() => handleSectorClick('Non-IT', 'non-it')}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
                  activeSector === 'Non-IT'
                    ? 'bg-pink-600 text-white border-pink-600 shadow-md shadow-pink-600/25'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-purple-300'
                }`}
              >
                <Headphones className="w-4 h-4 text-pink-500" />
                <span>Non-IT Operations</span>
              </button>

              <button
                onClick={() => handleSectorClick('Healthcare', 'medical')}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
                  activeSector === 'Healthcare'
                    ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-600/25'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-purple-300'
                }`}
              >
                <Stethoscope className="w-4 h-4 text-teal-600" />
                <span>Medical & RCM</span>
                <span className="text-[11px] opacity-80 hidden sm:inline">(R1 RCM, IKS, Ascent)</span>
              </button>
            </div>
          </div>

          {/* Dual Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto mb-14">
            <a
              href="#drives"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-slate-950 hover:bg-slate-800 text-white shadow-md shadow-slate-900/20 transition-all transform active:scale-95"
            >
              <span>Explore Open Drives</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </a>

            <button
              onClick={handleDirectWhatsApp}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 shadow-md shadow-emerald-500/20 transition-all transform active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-current text-slate-950" />
              <span>Direct WhatsApp to {FOUNDER_NAME}</span>
            </button>
          </div>
        </div>

        {/* Live Metrics Grid with Clean White Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 max-w-6xl mx-auto">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-slate-200/90 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-500/5 transition-all shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-2xl sm:text-3xl font-extrabold font-mono ${metric.highlight}`}>
                    {metric.value}
                  </span>
                  <div className={`w-8 h-8 rounded-lg ${metric.iconBg} flex items-center justify-center`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-950 leading-snug">
                  {metric.label}
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                  {metric.sublabel}
                </p>
              </div>
            );
          })}
        </div>

        {/* Hiring Partners Ticker / Logos */}
        <div className="mt-12 pt-8 border-t border-slate-200 text-center">
          <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-4">
            Trusted Recruitment Pipelines & Client Drives Include
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {[
              'Capgemini',
              'Teleperformance',
              'Google Process',
              'Accenture',
              'Concentrix',
              'Genpact',
              'Access Healthcare',
              'Vee Technologies',
              'Omega Healthcare',
              'WNS',
            ].map((partner, i) => (
              <span
                key={i}
                className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-purple-700 hover:border-purple-300 shadow-2xs transition-colors"
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
