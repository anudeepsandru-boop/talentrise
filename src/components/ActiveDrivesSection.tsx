import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Briefcase, 
  Clock, 
  DollarSign, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  MessageSquare, 
  Send, 
  Layers, 
  ChevronRight, 
  Flame, 
  Building2, 
  Car, 
  ArrowUpRight
} from 'lucide-react';
import { JobDrive, SectorType } from '../types';
import { JOB_DRIVES } from '../data/jobDrives';
import { generateJobQuickApplyMessage, openWhatsApp, DISPLAY_PHONE, FOUNDER_NAME } from '../utils/whatsappHelper';

interface ActiveDrivesSectionProps {
  onOpenApplyModal: (job: JobDrive) => void;
  selectedSector: SectorType;
  onSelectSector: (sector: SectorType) => void;
}

export const ActiveDrivesSection: React.FC<ActiveDrivesSectionProps> = ({
  onOpenApplyModal,
  selectedSector,
  onSelectSector,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWorkMode, setSelectedWorkMode] = useState<string>('All');
  const [selectedExperience, setSelectedExperience] = useState<string>('All');

  const filteredJobs = useMemo(() => {
    return JOB_DRIVES.filter(job => {
      // Sector filter
      if (selectedSector !== 'All' && job.sector !== selectedSector) {
        return false;
      }
      // Work mode filter
      if (selectedWorkMode !== 'All' && job.workMode !== selectedWorkMode) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(q);
        const matchesCompany = job.companyOrProcess.toLowerCase().includes(q);
        const matchesLocation = job.location.toLowerCase().includes(q);
        const matchesEligibility = job.eligibility.some(e => e.toLowerCase().includes(q));
        const matchesReqs = job.keyRequirements.some(r => r.toLowerCase().includes(q));
        if (!matchesTitle && !matchesCompany && !matchesLocation && !matchesEligibility && !matchesReqs) {
          return false;
        }
      }
      return true;
    });
  }, [selectedSector, selectedWorkMode, searchQuery]);

  const handleQuickWhatsAppApply = (job: JobDrive) => {
    const msg = generateJobQuickApplyMessage(job.title, job.companyOrProcess, job.ctc, job.location);
    openWhatsApp(msg);
  };

  const tabs: { id: SectorType; label: string; count: number }[] = [
    { id: 'All', label: 'All Drives', count: JOB_DRIVES.length },
    { id: 'IT', label: 'IT & Cloud Tech', count: JOB_DRIVES.filter(j => j.sector === 'IT').length },
    { id: 'Non-IT', label: 'Non-IT & BPO / Voice', count: JOB_DRIVES.filter(j => j.sector === 'Non-IT').length },
    { id: 'Healthcare', label: 'Healthcare & Medical Billing', count: JOB_DRIVES.filter(j => j.sector === 'Healthcare').length },
  ];

  return (
    <section id="drives" className="py-16 md:py-24 relative bg-[#0B132B]/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-sky-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Client Drives • Daily Walk-Ins</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Active Hiring Drives & Job Board
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-2xl">
              Curated direct client drives in Hyderabad. Fast-track profile forwarding directly to hiring managers with <strong className="text-amber-400 font-medium">0% consultancy fees charged to candidates</strong>.
            </p>
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Showing <strong className="text-white font-mono">{filteredJobs.length}</strong> active openings</span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl mb-8 space-y-4">
          {/* Sector Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-800/80 pb-3">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => onSelectSector(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedSector === tab.id
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-950/40'
                    : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                    selectedSector === tab.id
                      ? 'bg-slate-950/20 text-slate-950'
                      : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search and Secondary Filter Row */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search by role, company (e.g. Teleperformance, Kyndryl), skill, or location..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-700/70 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
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

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedWorkMode}
                onChange={e => setSelectedWorkMode(e.target.value)}
                className="w-full sm:w-auto bg-slate-950/80 border border-slate-700/70 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-300 focus:outline-none focus:border-amber-400"
              >
                <option value="All">All Work Modes</option>
                <option value="On-site">On-site (Hyderabad)</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
          </div>
        </div>

        {/* Job Cards Grid */}
        {filteredJobs.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl bg-slate-900/50 border border-slate-800">
            <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No drives matching your search</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-4">
              We frequently add private client walk-in drives. Chat directly with Sandru Anudeep to get custom matching drives.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectSector('All');
                setSelectedWorkMode('All');
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-amber-400 hover:bg-slate-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
            {filteredJobs.map(job => (
              <div
                key={job.id}
                className="flex flex-col justify-between rounded-2xl bg-[#0F172A] border border-slate-800 hover:border-slate-700/80 p-5 sm:p-6 shadow-xl hover:shadow-2xl hover:shadow-black/40 transition-all group"
              >
                <div>
                  {/* Card Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide uppercase ${
                          job.sector === 'IT'
                            ? 'bg-blue-500/15 text-sky-400 border border-blue-500/30'
                            : job.sector === 'Non-IT'
                            ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                            : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        }`}
                      >
                        {job.sector === 'IT' ? '💼 IT & Tech' : job.sector === 'Non-IT' ? '🎧 Non-IT / BPO' : '🏥 Healthcare ITES'}
                      </span>

                      {job.urgentHiring && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-500/15 text-red-400 border border-red-500/30">
                          <Flame className="w-3 h-3 fill-current" />
                          Urgent Walk-in
                        </span>
                      )}

                      {job.clientBadge && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                          {job.clientBadge}
                        </span>
                      )}
                    </div>

                    <span className="text-[11px] text-slate-400 shrink-0 font-mono">
                      {job.postedDaysAgo}
                    </span>
                  </div>

                  {/* Title & Company */}
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                    {job.title}
                  </h3>

                  <div className="flex items-center gap-2 mt-1 mb-4 text-slate-300 text-xs sm:text-sm">
                    <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="font-semibold text-slate-200">{job.companyOrProcess}</span>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 text-xs mb-4">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Package / CTC</span>
                      <span className="font-bold text-amber-400">{job.ctc}</span>
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

                  {/* Shift & Openings Detail */}
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-300 mb-4 pb-3 border-b border-slate-800/80">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span>{job.shifts}</span>
                    </div>
                    {job.walkInDates && (
                      <div className="flex items-center gap-1.5 text-amber-300">
                        <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{job.walkInDates}</span>
                      </div>
                    )}
                  </div>

                  {/* Requirements Snippet */}
                  <div className="space-y-1.5 mb-5 text-xs text-slate-300">
                    <p className="font-semibold text-slate-400 uppercase text-[10px] tracking-wider">
                      Key Eligibility & Responsibilities:
                    </p>
                    {job.keyRequirements.slice(0, 2).map((req, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <button
                    onClick={() => handleQuickWhatsAppApply(job)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 shadow-md shadow-emerald-950/30 transition-all active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>Quick Apply via WhatsApp</span>
                  </button>

                  <button
                    onClick={() => onOpenApplyModal(job)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-600 transition-colors"
                  >
                    <span>Apply on Portal</span>
                    <ArrowUpRight className="w-4 h-4 text-amber-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Direct Custom Requirement Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-[#0F172A] border border-blue-500/20 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg sm:text-xl font-bold text-white">
              Don't see your target company or specialized profile?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              We maintain active recruiter tie-ups with 15+ MNCs in Hyderabad. Send your resume directly to Founder Sandru Anudeep for fast-track manual matching.
            </p>
          </div>

          <button
            onClick={() => openWhatsApp(`Hello ${FOUNDER_NAME} Sir, I have a specific career background and would like to check if you have upcoming drives or direct client walk-ins matching my profile.`)}
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-lg shadow-amber-950/40 transition-all active:scale-95"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Direct Profile Review on WhatsApp</span>
          </button>
        </div>
      </div>
    </section>
  );
};
