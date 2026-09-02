import React from 'react';
import { 
  HeartPulse, 
  Car, 
  Coins, 
  Clock, 
  GraduationCap, 
  CheckCircle2, 
  MessageSquare, 
  ArrowRight, 
  Building2, 
  ShieldCheck, 
  Sparkles,
  MapPin,
  Flame,
  ArrowLeft
} from 'lucide-react';
import { JobDrive, PageType } from '../types';
import { openWhatsApp, FOUNDER_NAME } from '../utils/whatsappHelper';
import { PageHeaderBanner } from './PageHeaderBanner';

interface MedicalSectionProps {
  onOpenApplyModal: (job?: JobDrive) => void;
  medicalJobs: JobDrive[];
  isStandalonePage?: boolean;
  onNavigate?: (page: PageType) => void;
}

export const MedicalSection: React.FC<MedicalSectionProps> = ({
  onOpenApplyModal,
  medicalJobs,
  isStandalonePage = false,
  onNavigate
}) => {
  const handleQuickWhatsAppApply = (job: JobDrive) => {
    const text = `Hello ${FOUNDER_NAME} Sir, I want to apply for Medical/Healthcare Drive: ${job.title} (${job.id}) at ${job.companyOrProcess}. Location: ${job.location}, Package: ${job.ctc}. Please guide me for the 10-day process.`;
    openWhatsApp(text);
  };

  const handleGeneralMedicalInquiry = () => {
    const text = `Hello ${FOUNDER_NAME} Sir, I am interested in applying for the Medical & US Healthcare RCM drives in Hyderabad (R1 RCM / Ascent / Data Marshall / IKS Health). I am a 2023-2026 graduate.`;
    openWhatsApp(text);
  };

  return (
    <div className={isStandalonePage ? "min-h-screen bg-[#060913] pb-20" : ""}>
      {isStandalonePage && onNavigate && (
        <PageHeaderBanner
          currentPage="medical"
          title="Medical & US Healthcare RCM Hiring Drives"
          subtitle="Direct client placement pipeline with industry leaders in Hyderabad — R1 RCM, Ascent, Data Marshall, and IKS Health. Comprehensive training, 2-way cab, ₹2.40 - ₹2.80 LPA + lucrative incentives."
          badgeText="10-Day Fast-Track Hiring Process"
          onNavigate={onNavigate}
        />
      )}

      <section id="medical" className={`py-16 md:py-24 relative bg-[#060913] scroll-mt-20 ${!isStandalonePage ? 'border-t border-slate-800/80' : ''}`}>
        {/* Background Accent Glows */}
        <div className="absolute top-10 left-1/4 w-[500px] h-[300px] bg-teal-500/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[450px] h-[280px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          {!isStandalonePage && (
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/15 border border-teal-500/30 text-xs font-bold text-teal-300 mb-3 shadow-lg shadow-teal-950/20">
                  <HeartPulse className="w-4 h-4 text-teal-400 animate-pulse" />
                  <span>Dedicated Medical & Healthcare Vertical</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-emerald-400 font-semibold">10-Day Fast-Track Process</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Medical & US Healthcare RCM Hiring Drives
                </h2>
                <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
                  Launch your career in high-growth US Healthcare Revenue Cycle Management with global leaders in Hyderabad — <strong className="text-white">R1 RCM, Ascent, Data Marshall & IKS Health</strong>. Freshers and any degree graduates (2023–2026 passouts) are eligible with comprehensive domain training provided.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <button
                  onClick={handleGeneralMedicalInquiry}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 shadow-lg shadow-emerald-950/40 transition-all transform active:scale-95"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>WhatsApp Medical Recruiter</span>
                </button>
              </div>
            </div>
          )}

        {/* 4 Feature Value Highlights Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-teal-500/20 shadow-md">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center mb-2.5">
              <Coins className="w-4 h-4" />
            </div>
            <div className="text-white font-bold text-sm">₹2.4 – ₹2.8 LPA</div>
            <div className="text-[11px] text-slate-400 mt-0.5">+ Lucrative Monthly Incentives</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-teal-500/20 shadow-md">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center mb-2.5">
              <Car className="w-4 h-4" />
            </div>
            <div className="text-white font-bold text-sm">2-Way Cab Facility</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Safe Home Pick-Up & Drop</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-teal-500/20 shadow-md">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center mb-2.5">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div className="text-white font-bold text-sm">2023 – 2026 Passouts</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Any Graduate / Degree Eligible</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-teal-500/20 shadow-md">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center mb-2.5">
              <Clock className="w-4 h-4" />
            </div>
            <div className="text-white font-bold text-sm">10 Days Process Time</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Fast-Track Screening & Selection</div>
          </div>
        </div>

        {/* 4 Medical Job Drive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {medicalJobs.map(job => (
            <div
              key={job.id}
              className="flex flex-col justify-between rounded-2xl bg-[#0F172A] border border-teal-500/30 hover:border-teal-400 p-6 shadow-xl hover:shadow-2xl hover:shadow-teal-950/40 transition-all group"
            >
              <div>
                {/* Header Badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded font-mono font-bold text-xs bg-slate-800 text-teal-300 border border-teal-500/40">
                      {job.id}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold tracking-wide uppercase bg-teal-500/15 text-teal-300 border border-teal-500/30">
                      🏥 Medical & Healthcare
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      ⏱️ 10 Days Process
                    </span>
                  </div>

                  <span className="text-[11px] text-slate-400 font-mono">
                    {job.postedDaysAgo}
                  </span>
                </div>

                {/* Title & Company */}
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-teal-300 transition-colors">
                  {job.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-300 mt-1">
                  <Building2 className="w-3.5 h-3.5 text-teal-400" />
                  <span className="font-semibold">{job.companyOrProcess}</span>
                  {job.clientBadge && (
                    <>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-400">{job.clientBadge}</span>
                    </>
                  )}
                </div>

                {/* Key Details Grid */}
                <div className="grid grid-cols-2 gap-2.5 my-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Salary Package</span>
                    <span className="font-bold text-amber-400 text-xs sm:text-sm">{job.ctc}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Location</span>
                    <span className="font-semibold text-slate-200">{job.location}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Work Shifts & Perks</span>
                    <span className="font-semibold text-slate-200">{job.shifts}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Eligibility</span>
                    <span className="font-semibold text-teal-300">{job.experience}</span>
                  </div>
                </div>

                {/* Requirements / Highlights */}
                <div className="space-y-1.5 mb-5">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    Requirements & Candidate Perks:
                  </div>
                  {job.eligibility.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center gap-2.5">
                <button
                  onClick={() => onOpenApplyModal(job)}
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-md shadow-teal-950/30 transition-all transform active:scale-95"
                >
                  <span>Apply for {job.companyOrProcess}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleQuickWhatsAppApply(job)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/40 transition-colors"
                  title="Direct WhatsApp to Recruiter"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
};
