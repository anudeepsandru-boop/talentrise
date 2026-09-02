import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Heart, 
  Lock,
  Briefcase,
  Headphones,
  HeartPulse,
  GraduationCap,
  Gift,
  Building2
} from 'lucide-react';
import { openWhatsApp, DISPLAY_PHONE, FOUNDER_NAME, LOCATION_HQ } from '../utils/whatsappHelper';
import { PageType, SectorType } from '../types';

interface FooterProps {
  onOpenAdmin: () => void;
  onSelectSectorFilter?: (sector: SectorType) => void;
  onNavigate?: (page: PageType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onSelectSectorFilter, onNavigate }) => {
  const handleNav = (page: PageType, sector?: SectorType) => {
    if (sector && onSelectSectorFilter) {
      onSelectSectorFilter(sector);
    }
    if (onNavigate) {
      onNavigate(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050811] border-t border-slate-800/80 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Col 1: Brand & Founder Credential (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white p-0.5 border border-cyan-500/40 flex items-center justify-center shadow-md overflow-hidden">
                <img
                  src="/logo.png"
                  alt="TalentRise Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-bold text-white tracking-tight">
                  Talent<span className="text-amber-400">Rise</span>
                </span>
                <p className="text-[11px] text-cyan-400 font-medium uppercase tracking-wider">
                  Training and Placements
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Hyderabad's dedicated training and placement consultancy connecting freshers and experienced candidates directly to Tier-1 MNC hiring drives and US Healthcare ITES pipelines.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-1.5 max-w-sm">
              <div className="flex items-center gap-2 text-white font-semibold text-xs">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Executive Leadership: {FOUNDER_NAME}</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Founder & CEO • 300+ Verified Candidate Closures Since 2024
              </p>
              <div className="pt-1 text-[11px] text-amber-400 font-mono">
                Direct Recruiter Line: {DISPLAY_PHONE}
              </div>
            </div>
          </div>

          {/* Col 2: Hiring Streams (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Hiring Streams
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNav('it', 'IT')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-2 text-left"
                >
                  <Briefcase className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>IT & Engineering (Capgemini CATIA)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('medical', 'Healthcare')}
                  className="hover:text-teal-400 transition-colors flex items-center gap-2 text-left"
                >
                  <HeartPulse className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>Medical & US Healthcare RCM (R1 RCM, IKS, Ascent)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('medical', 'Healthcare')}
                  className="hover:text-teal-400 transition-colors flex items-center gap-2 text-left"
                >
                  <HeartPulse className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>Medical Billing & AR Caller (Data Marshall)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('non-it', 'Non-IT')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-2 text-left"
                >
                  <Headphones className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Non-IT / BPO Operations</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('mock-prep')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-2 text-left"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Mock Interview Prep</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('referrals')}
                  className="hover:text-yellow-400 transition-colors flex items-center gap-2 text-left"
                >
                  <Gift className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                  <span>Referral Bonus Program</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Navigation & Contact (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Contact & Recruiter Desk
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{LOCATION_HQ}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="font-mono">{DISPLAY_PHONE}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <button
                  onClick={() => openWhatsApp(`Hello ${FOUNDER_NAME} Sir, I am contacting you from the TalentRise website footer.`)}
                  className="text-[#25D366] hover:underline font-semibold"
                >
                  Chat with Sandru Anudeep (+91 8328246487)
                </button>
              </div>
            </div>

            <div className="pt-3 flex items-center gap-2">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 hover:text-white transition-colors"
              >
                <Lock className="w-3 h-3 text-cyan-400" />
                <span>Recruiter Portal Login</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>
            © {new Date().getFullYear()} <strong className="text-slate-300">TalentRise Training and Placements</strong>. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <button onClick={() => handleNav('b2b')} className="hover:text-slate-300 transition-colors">
              B2B Corporate Staffing
            </button>
            <span>•</span>
            <button onClick={() => handleNav('founder')} className="hover:text-slate-300 transition-colors">
              Leadership
            </button>
            <span>•</span>
            <span>Hyderabad, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
