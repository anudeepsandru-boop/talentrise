import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  ShieldCheck, 
  Heart, 
  ExternalLink,
  Lock
} from 'lucide-react';
import { openWhatsApp, DISPLAY_PHONE, RAW_PHONE, FOUNDER_NAME, COMPANY_NAME, LOCATION_HQ } from '../utils/whatsappHelper';

interface FooterProps {
  onOpenAdmin: () => void;
  onSelectSectorFilter: (sector: 'IT' | 'Non-IT' | 'Healthcare' | 'All') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onSelectSectorFilter }) => {
  return (
    <footer className="bg-[#080E1F] border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Col 1: Brand & Founder Credential (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white p-0.5 border border-amber-400/50 flex items-center justify-center shadow-md overflow-hidden">
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
                <p className="text-[11px] text-sky-400 font-medium uppercase tracking-wider">
                  Training and Placements
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Hyderabad's dedicated training and placement consultancy connecting freshers and experienced candidates directly to Tier-1 MNC hiring drives and US Healthcare ITES pipelines.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1.5 max-w-sm">
              <div className="flex items-center gap-2 text-white font-semibold text-xs">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
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

          {/* Col 2: Hiring Sectors (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Hiring Streams
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#drives"
                  onClick={() => onSelectSectorFilter('IT')}
                  className="hover:text-sky-400 transition-colors block"
                >
                  💼 IT & Engineering (Capgemini CATIA)
                </a>
              </li>
              <li>
                <a
                  href="#medical"
                  onClick={() => onSelectSectorFilter('Healthcare')}
                  className="hover:text-teal-400 transition-colors block"
                >
                  🏥 Medical & US Healthcare RCM (R1 RCM, IKS, Ascent)
                </a>
              </li>
              <li>
                <a
                  href="#medical"
                  onClick={() => onSelectSectorFilter('Healthcare')}
                  className="hover:text-teal-400 transition-colors block"
                >
                  🏥 Medical Billing & AR Caller Trainees (Data Marshall)
                </a>
              </li>
              <li>
                <a
                  href="#drives"
                  onClick={() => onSelectSectorFilter('Non-IT')}
                  className="hover:text-amber-400 transition-colors block"
                >
                  🎧 Non-IT / BPO Operations
                </a>
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
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
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
                <Lock className="w-3 h-3 text-amber-400" />
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
            <span>Founder & CEO: <strong className="text-amber-400">{FOUNDER_NAME}</strong></span>
            <span>•</span>
            <span>Hyderabad, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
