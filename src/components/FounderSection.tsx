import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Award, 
  MessageSquare, 
  Phone, 
  Users, 
  Sparkles, 
  BadgeCheck
} from 'lucide-react';
import { PageType } from '../types';
import { PageHeaderBanner } from './PageHeaderBanner';
import { openWhatsApp, DISPLAY_PHONE, RAW_PHONE, FOUNDER_NAME, COMPANY_NAME, LOCATION_HQ } from '../utils/whatsappHelper';

interface FounderSectionProps {
  isStandalonePage?: boolean;
  onNavigate?: (page: PageType) => void;
}

export const FounderSection: React.FC<FounderSectionProps> = ({
  isStandalonePage = false,
  onNavigate
}) => {
  const handleConnectFounder = () => {
    openWhatsApp(`Hello ${FOUNDER_NAME} Sir, I would like to connect with you directly regarding recruitment mentorship, active drives, or corporate hiring partnership.`);
  };

  return (
    <div className={isStandalonePage ? "min-h-screen bg-[#fafbff] pb-20" : ""}>
      {isStandalonePage && onNavigate && (
        <PageHeaderBanner
          currentPage="founder"
          title="Executive Leadership & Recruiter Desk"
          subtitle="Direct mentorship and executive guidance under Sandru Anudeep — Founder & CEO of TalentRise Training and Placements."
          badgeText="Verified Executive Leadership"
          onNavigate={onNavigate}
        />
      )}

      <section id="founder" className={`py-16 md:py-24 relative bg-[#fafbff] scroll-mt-20 ${!isStandalonePage ? 'border-t border-slate-200/80' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Executive Monogram Seal & Credentials */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
              {/* Executive Monogram Card */}
              <div className="relative w-full max-w-sm rounded-3xl bg-white border border-purple-200/90 p-8 shadow-xl shadow-purple-500/5 overflow-hidden">
                {/* Subtle background ornamentation */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-400/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none" />

                {/* Verified Recruiter Top Badge */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                    <span>Verified Executive Recruiter</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-400">Est. 2024</span>
                </div>

                {/* Executive Founder Portrait & Verified Recruiter Seal */}
                <div className="relative mx-auto mb-6">
                  <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-cyan-400 p-1 shadow-xl shadow-purple-500/20 flex items-center justify-center">
                    <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 border-2 border-white flex items-center justify-center">
                      <img
                        src="/founder.jpg"
                        alt={FOUNDER_NAME}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.src = "https://lh3.googleusercontent.com/d/1aRutKgTAE7szt8S3WbfuRJRyI8Tk9ed7";
                        }}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-2 rounded-full shadow-lg border-2 border-white" title="Verified Recruiter Status">
                    <BadgeCheck className="w-4 h-4" />
                  </div>
                </div>

                {/* Founder Details */}
                <div className="text-center space-y-1 mb-6">
                  <h3 className="text-2xl font-extrabold text-slate-950 tracking-tight">
                    {FOUNDER_NAME}
                  </h3>
                  <p className="text-sm font-bold text-purple-700">
                    Founder & Chief Executive Officer
                  </p>
                  <p className="text-xs text-slate-500 font-semibold">
                    {COMPANY_NAME}
                  </p>
                  <div className="pt-2 flex items-center justify-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>{LOCATION_HQ}</span>
                  </div>
                </div>

                {/* Quick Contact Card */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Direct Recruiter Line:</span>
                    <span className="font-mono font-bold text-slate-900">{DISPLAY_PHONE}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Status:</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Accepting Profiles & Drives
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Leadership Bio & Vision */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-xs font-bold text-purple-700 mb-3 shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>Leadership & Recruitment Philosophy</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                  Bridging the Gap Between Ambitious Talent & Top MNCs
                </h2>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Founded in 2024 by <strong className="text-slate-900 font-bold">Sandru Anudeep</strong> in Hyderabad, <strong className="text-purple-700 font-bold">TalentRise Training and Placements</strong> was established with a singular mission: eliminating recruitment ambiguity and connecting candidates directly to verified client walk-ins with personalized interview readiness.
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Under Sandru Anudeep's direct mentorship, TalentRise has achieved <strong className="text-emerald-600 font-bold">over 300+ successful candidate closures</strong> across IT & Engineering (Capgemini CATIA), Technical Services, and Corporate Hiring drives.
              </p>

              {/* Core Leadership Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3 shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 mb-0.5">Zero-Spam Direct Pipeline</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-normal">Direct walk-in schedules coordinate directly with client hiring managers.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3 shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 mb-0.5">1-on-1 Personalized Coaching</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-normal">Hands-on Versant accent drilling, technical clarity, and salary negotiation.</p>
                  </div>
                </div>
              </div>

              {/* Direct Connect CTA Button */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={handleConnectFounder}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 shadow-md shadow-emerald-500/20 transition-all active:scale-95"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Connect with Sandru Anudeep on WhatsApp</span>
                </button>

                <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 shadow-xs">
                  <Phone className="w-3.5 h-3.5 text-purple-600" />
                  <span>Direct: <strong className="text-slate-950 font-mono font-bold">{RAW_PHONE}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
