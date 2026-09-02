import React from 'react';
import { 
  ChevronRight, 
  ArrowLeft, 
  Briefcase, 
  Sparkles, 
  Headphones, 
  HeartPulse, 
  GraduationCap, 
  UserCheck, 
  Gift, 
  Building2 
} from 'lucide-react';
import { PageType } from '../types';

interface PageHeaderBannerProps {
  currentPage: PageType;
  title: string;
  subtitle: string;
  badgeText?: string;
  badgeColor?: string;
  onNavigate: (page: PageType) => void;
}

export const PageHeaderBanner: React.FC<PageHeaderBannerProps> = ({
  currentPage,
  title,
  subtitle,
  badgeText,
  badgeColor = 'cyan',
  onNavigate,
}) => {
  const quickLinks: { id: PageType; label: string; icon: React.ElementType }[] = [
    { id: 'all', label: 'All Drives', icon: Briefcase },
    { id: 'it', label: 'IT & Engg', icon: Sparkles },
    { id: 'non-it', label: 'Non-IT', icon: Headphones },
    { id: 'medical', label: 'Medical & RCM', icon: HeartPulse },
    { id: 'mock-prep', label: 'Mock Prep', icon: GraduationCap },
    { id: 'founder', label: 'Leadership', icon: UserCheck },
    { id: 'referrals', label: 'Referrals', icon: Gift },
    { id: 'b2b', label: 'B2B Staffing', icon: Building2 },
  ];

  return (
    <div className="relative pt-28 pb-10 md:pt-32 md:pb-12 tech-grid-bg border-b border-slate-800/80 overflow-hidden">
      {/* Background Cyber Accents */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[250px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[350px] h-[200px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb row */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <nav className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <button
              onClick={() => onNavigate('all')}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <span>Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-cyan-300 font-semibold">{title}</span>
          </nav>

          <button
            onClick={() => onNavigate('all')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Drives</span>
          </button>
        </div>

        {/* Title and Subtitle */}
        <div className="max-w-3xl">
          {badgeText && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-xs font-semibold text-cyan-300 shadow-sm shadow-cyan-950/40 mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span>{badgeText}</span>
            </div>
          )}

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
            {title}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        </div>

        {/* Quick Route Switches */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-500 shrink-0 mr-2">
            Switch View:
          </span>
          {quickLinks.map(link => {
            const Icon = link.icon;
            const isCurrent = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isCurrent
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-sm shadow-cyan-950/40'
                    : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{link.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
