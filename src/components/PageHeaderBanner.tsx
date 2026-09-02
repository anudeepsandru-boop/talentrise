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
    <div className="relative pt-28 pb-10 md:pt-36 md:pb-12 tech-mesh-bg border-b border-slate-200/80 overflow-hidden">
      {/* Subtle Atmospheric Light Glows */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[250px] bg-cyan-400/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[350px] h-[200px] bg-fuchsia-400/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb row */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <button
              onClick={() => onNavigate('all')}
              className="hover:text-purple-600 transition-colors flex items-center gap-1.5 font-semibold"
            >
              <span>Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-purple-700 font-bold">{title}</span>
          </nav>

          <button
            onClick={() => onNavigate('all')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-950 border border-slate-200 text-xs font-bold shadow-2xs transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Drives</span>
          </button>
        </div>

        {/* Title and Subtitle */}
        <div className="max-w-3xl">
          {badgeText && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-xs font-bold text-purple-700 shadow-2xs mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
              </span>
              <span>{badgeText}</span>
            </div>
          )}

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight mb-3">
            {title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
            {subtitle}
          </p>
        </div>

        {/* Quick Route Switches */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs uppercase tracking-wider font-bold text-slate-400 shrink-0 mr-2">
            Switch View:
          </span>
          {quickLinks.map(link => {
            const Icon = link.icon;
            const isCurrent = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  isCurrent
                    ? 'bg-slate-950 text-white border border-slate-950 shadow-sm'
                    : 'bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-950 border border-slate-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-pink-400' : 'text-slate-400'}`} />
                <span>{link.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
