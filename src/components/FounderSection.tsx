import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Award, 
  CheckCircle2, 
  MessageSquare, 
  Phone, 
  Briefcase, 
  Users, 
  Building2, 
  Sparkles, 
  BadgeCheck
} from 'lucide-react';
import { openWhatsApp, DISPLAY_PHONE, RAW_PHONE, FOUNDER_NAME, COMPANY_NAME, LOCATION_HQ } from '../utils/whatsappHelper';

export const FounderSection: React.FC = () => {
  const handleConnectFounder = () => {
    openWhatsApp(`Hello ${FOUNDER_NAME} Sir, I would like to connect with you directly regarding recruitment mentorship, active drives, or corporate hiring partnership.`);
  };

  return (
    <section id="founder" className="py-16 md:py-24 relative bg-[#090F21] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Executive Monogram Seal & Credentials */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Executive Monogram Card */}
            <div className="relative w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#1C2541] via-[#0F172A] to-[#0B132B] border border-amber-400/40 p-8 shadow-2xl shadow-black/60 overflow-hidden">
              {/* Subtle background ornamentation */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/5 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl" />

              {/* Verified Recruiter Top Badge */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Verified Executive Recruiter</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">Est. 2024</span>
              </div>

              {/* Executive Founder Portrait & Verified Recruiter Seal */}
              <div className="relative mx-auto mb-6">
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 p-1 shadow-2xl shadow-amber-500/25 flex items-center justify-center">
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-2 border-amber-400/60 flex items-center justify-center">
                    <img
                      src="/founder.jpg"
                      alt={FOUNDER_NAME}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        // Fallback to direct Google Drive image link
                        e.currentTarget.src = "https://lh3.googleusercontent.com/d/1aRutKgTAE7szt8S3WbfuRJRyI8Tk9ed7";
                      }}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 p-2 rounded-full shadow-lg border-2 border-[#0B132B]" title="Verified Recruiter Status">
                  <BadgeCheck className="w-4 h-4" />
                </div>
              </div>

              {/* Founder Details */}
              <div className="text-center space-y-1 mb-6">
                <h3 className="text-2xl font-extrabold text-white tracking-tight">
                  {FOUNDER_NAME}
                </h3>
                <p className="text-sm font-semibold text-amber-400">
                  Founder & Chief Executive Officer
                </p>
                <p className="text-xs text-sky-400/90 font-medium">
                  {COMPANY_NAME}
                </p>
                <div className="pt-2 flex items-center justify-center gap-1.5 text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  <span>{LOCATION_HQ}</span>
                </div>
              </div>

              {/* Quick Contact Card */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Direct Recruiter Line:</span>
                  <span className="font-mono font-bold text-amber-400">{DISPLAY_PHONE}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Status:</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Accepting Profiles & Drives
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Leadership Bio & Vision */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-sky-400 mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Leadership & Recruitment Philosophy</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Bridging the Gap Between Ambitious Talent & Top MNCs
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Founded in 2024 by <strong className="text-white font-semibold">Sandru Anudeep</strong> in Hyderabad, <strong className="text-amber-400 font-medium">TalentRise Training and Placements</strong> was established with a singular mission: eliminating recruitment ambiguity and connecting candidates directly to verified client walk-ins with personalized interview readiness.
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Under Sandru Anudeep's direct mentorship, TalentRise has achieved <strong className="text-emerald-400 font-semibold">over 300+ successful candidate closures</strong> across IT & Engineering (Capgemini CATIA), Technical Services, and Corporate Hiring drives.
            </p>

            {/* Core Leadership Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white mb-0.5">Zero-Spam Direct Pipeline</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">Direct walk-in schedules coordinate directly with client hiring managers.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white mb-0.5">1-on-1 Personalized Coaching</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">Hands-on Versant accent drilling, technical clarity, and salary negotiation.</p>
                </div>
              </div>
            </div>

            {/* Direct Connect CTA Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={handleConnectFounder}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 shadow-lg shadow-emerald-950/40 transition-all active:scale-95"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Connect with Sandru Anudeep on WhatsApp</span>
              </button>

              <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Direct: <strong className="text-white font-mono">{RAW_PHONE}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
