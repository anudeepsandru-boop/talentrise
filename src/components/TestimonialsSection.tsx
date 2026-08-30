import React from 'react';
import { 
  CheckCircle2, 
  Mail,
  Award, 
  MessageSquare
} from 'lucide-react';
import { TESTIMONIALS } from '../data/testimonials';
import { openWhatsApp, FOUNDER_NAME } from '../utils/whatsappHelper';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 relative bg-[#0B132B] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-xs font-semibold text-amber-300 mb-3 shadow-lg shadow-amber-950/20">
            <Award className="w-4 h-4" />
            <span>Verified Candidate Placement Reviews</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Placed Candidate Feedback
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
            Genuine testimonials from candidates successfully placed in Non-IT and corporate client drives through <strong className="text-amber-400 font-semibold">{FOUNDER_NAME}</strong>'s direct mentorship and client mapping.
          </p>
        </div>

        {/* Testimonials 4-Card Grid matching user screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-2xl bg-white text-slate-900 border border-slate-200/80 p-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-200"
            >
              <div>
                {/* Header: Amber Quote Icon & Category Pill */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                    <span className="text-2xl font-serif font-black leading-none select-none">“</span>
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-slate-100 text-slate-700">
                    {item.categoryBadge}
                  </span>
                </div>

                {/* Quote Body */}
                <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              {/* Bottom Candidate Meta */}
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center gap-1.5 mb-1">
                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    {item.candidateName}
                  </h4>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-100 flex-shrink-0" />
                </div>
                <p className="text-xs text-slate-500 font-medium mb-3">
                  {item.roleSubtitle}
                </p>
                <a
                  href={`mailto:${item.candidateEmail}`}
                  className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-medium hover:underline break-all"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                  <span>{item.candidateEmail}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Direct WhatsApp CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => openWhatsApp(`Hello ${FOUNDER_NAME} Sir, I saw the candidate placement feedback and want to attend the upcoming placement drives.`)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 shadow-lg shadow-emerald-950/40 transition-all active:scale-95 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Connect with {FOUNDER_NAME} • WhatsApp Placement Assistance</span>
          </button>
        </div>
      </div>
    </section>
  );
};

