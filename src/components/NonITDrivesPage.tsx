import React, { useState, useMemo } from 'react';
import { 
  Headphones, 
  Search, 
  Building2, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  Car, 
  ShieldCheck, 
  Flame, 
  Sparkles,
  Plane,
  Briefcase
} from 'lucide-react';
import { JobDrive, PageType } from '../types';
import { PageHeaderBanner } from './PageHeaderBanner';
import { openWhatsApp, FOUNDER_NAME } from '../utils/whatsappHelper';

interface NonITDrivesPageProps {
  jobs: JobDrive[];
  onOpenApplyModal: (job?: JobDrive) => void;
  onNavigate: (page: PageType) => void;
}

export const NonITDrivesPage: React.FC<NonITDrivesPageProps> = ({
  jobs,
  onOpenApplyModal,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWorkMode, setSelectedWorkMode] = useState('All');

  const nonItJobs = useMemo(() => {
    return jobs
      .filter(j => j.sector === 'Non-IT')
      .filter(j => {
        if (selectedWorkMode !== 'All' && j.workMode !== selectedWorkMode) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = j.title.toLowerCase().includes(q);
          const matchCompany = j.companyOrProcess.toLowerCase().includes(q);
          const matchSkills = j.keyRequirements.some(r => r.toLowerCase().includes(q));
          const matchId = j.id.toLowerCase().includes(q);
          return matchTitle || matchCompany || matchSkills || matchId;
        }
        return true;
      });
  }, [jobs, searchQuery, selectedWorkMode]);

  const handleWhatsAppInquiry = (job: JobDrive) => {
    const text = `Hello ${FOUNDER_NAME} Sir, I am interested in applying for Non-IT Drive: ${job.title} (${job.id}) at ${job.companyOrProcess}. Location: ${job.location}, CTC: ${job.ctc}. Please share interview schedule.`;
    openWhatsApp(text);
  };

  return (
    <div className="min-h-screen bg-[#060913] pb-20">
      {/* Header Banner */}
      <PageHeaderBanner
        currentPage="non-it"
        title="Non-IT & Corporate Operations Drives"
        subtitle="Premier customer operations, content moderation, travel booking & compliance, and managerial placement drives in Hyderabad with top-tier MNCs — Teleperformance, Concentrix, WNS Global, Cognizant, and Wipro."
        badgeText="Active Walk-ins & Client Interviews"
        onNavigate={onNavigate}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Value Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/30 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                <Plane className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Teleperformance Travel Industry</h3>
                <span className="text-[11px] text-emerald-400 font-mono font-semibold">Freshers & Exp • ₹2.60 - ₹3.40 LPA</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dedicated travel ticketing, itinerary coordination, and compliance desk with 2-way home cabs and fast turnaround.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-cyan-500/30 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Google Content Moderation</h3>
                <span className="text-[11px] text-cyan-400 font-mono font-semibold">Concentrix & Cognizant Partners</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tier-1 client processes in Hyderabad for digital safety, policy enforcement, and geospatial data tagging.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-amber-500/30 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">2-Way Home Transportation</h3>
                <span className="text-[11px] text-amber-400 font-mono font-semibold">Safe & Timely Commutes</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Door-to-door cab pickups across major Hyderabad zones (Gachibowli, Madhapur, Hitec City, Uppal, Secunderabad).
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl mb-8 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search Non-IT drives by role (Travel, Moderator, Manager), company, or skill..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-700/70 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          <select
            value={selectedWorkMode}
            onChange={e => setSelectedWorkMode(e.target.value)}
            className="w-full sm:w-auto bg-slate-950/80 border border-slate-700/70 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-300 focus:outline-none focus:border-emerald-400"
          >
            <option value="All">All Work Modes</option>
            <option value="On-site">On-site (Hyderabad)</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Remote">Remote</option>
          </select>
        </div>

        {/* Non-IT Job Cards Grid */}
        {nonItJobs.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl bg-slate-900/50 border border-slate-800">
            <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">No Non-IT drives match your filters</h3>
            <p className="text-xs text-slate-400 mb-4">Try adjusting your keywords or clearing the search box.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedWorkMode('All');
              }}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nonItJobs.map(job => (
              <div
                key={job.id}
                className="flex flex-col justify-between rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 p-5 sm:p-6 shadow-xl hover:shadow-2xl hover:shadow-emerald-950/30 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-slate-800 text-amber-300 border border-slate-700/80">
                        {job.id}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        Non-IT / BPO
                      </span>
                      {job.urgentHiring && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-500/15 text-red-400 border border-red-500/30">
                          <Flame className="w-3 h-3 fill-current" />
                          Urgent
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {job.postedDaysAgo}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug">
                    {job.title}
                  </h3>

                  <div className="flex items-center gap-2 mt-1 mb-4 text-slate-300 text-xs sm:text-sm">
                    <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="font-semibold text-slate-200">{job.companyOrProcess}</span>
                  </div>

                  {/* Highlights */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs mb-4">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Package / CTC</span>
                      <span className="font-bold text-emerald-400">{job.ctc}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Experience</span>
                      <span className="font-semibold text-slate-200">{job.experience}</span>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <span className="text-[10px] text-slate-400 block uppercase">Location</span>
                      <span className="font-semibold text-slate-200 truncate block">{job.location}</span>
                    </div>
                  </div>

                  {/* Shift info */}
                  <div className="flex items-center gap-2 text-xs text-slate-300 mb-4 pb-3 border-b border-slate-800/80">
                    <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{job.shifts}</span>
                  </div>

                  {/* Requirements */}
                  <div className="space-y-1.5 mb-5 text-xs text-slate-300">
                    <p className="font-semibold text-slate-400 uppercase text-[10px] tracking-wider">
                      Role Highlights & Eligibility:
                    </p>
                    {job.keyRequirements.slice(0, 3).map((req, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2">
                  <button
                    onClick={() => onOpenApplyModal(job)}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/40 transition-all active:scale-95"
                  >
                    <span>Apply for Drive</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleWhatsAppInquiry(job)}
                    title="Direct WhatsApp Recruiter for Non-IT Drive"
                    className="p-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 shadow-md transition-all active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
