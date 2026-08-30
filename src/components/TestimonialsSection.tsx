import React from 'react';
import { 
  Quote, 
  CheckCircle2, 
  Building2, 
  Award, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  MessageSquare
} from 'lucide-react';
import { TESTIMONIALS } from '../data/testimonials';
import { openWhatsApp, DISPLAY_PHONE, FOUNDER_NAME } from '../utils/whatsappHelper';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 relative bg-[#0B132B] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-xs font-semibold text-amber-300 mb-3 shadow-lg shadow-amber-950/20">
            <Award className="w-4 h-4" />
            <span>300+ Verified Candidate Success Stories</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Verified Placements & Candidate Reviews
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
            Real feedback from graduates and professionals placed at top MNCs and healthcare organizations across Hyderabad through <strong className="text-amber-400 font-semibold">{FOUNDER_NAME}</strong>'s direct mentorship.
          </p>
        </div>

        {/* Testimonials Bento / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map(item => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-2xl bg-[#0F172A] border border-slate-800 hover:border-amber-400/40 p-6 shadow-xl transition-all duration-200 group"
            >
              <div>
                {/* Top Badge: Placement Verification */}
                <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800/80">
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{item.verificationBadge}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{item.batchYear}</span>
                </div>

                {/* Quote */}
                <div className="relative mb-6">
                  <Quote className="w-6 h-6 text-amber-400/30 absolute -top-1 -left-1" />
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-5 italic">
                    "{item.quote}"
                  </p>
                </div>

                {/* Mentor Feedback Snippet */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 mb-5 text-[11px]">
                  <span className="text-amber-400 font-bold block mb-0.5">
                    Coach Feedback by {FOUNDER_NAME}:
                  </span>
                  <span className="text-slate-300">{item.mentorFeedback}</span>
                </div>
              </div>

              {/* Candidate Info Bottom */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 font-bold font-mono text-xs flex items-center justify-center shadow-md">
                    {item.initials}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">{item.candidateName}</h4>
                    <p className="text-xs text-sky-400 font-semibold">{item.role}</p>
                    <p className="text-[11px] text-slate-400">{item.placedCompany}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase">CTC Package</span>
                  <span className="text-sm font-bold font-mono text-amber-400">{item.packageCTC}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Direct WhatsApp Callout */}
        <div className="mt-12 text-center">
          <button
            onClick={() => openWhatsApp(`Hello ${FOUNDER_NAME} Sir, I saw the candidate success reviews and want to be part of the upcoming placement drive.`)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 shadow-lg shadow-emerald-950/40 transition-all active:scale-95"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Join 300+ Placed Candidates • WhatsApp {FOUNDER_NAME}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
