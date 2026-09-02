import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  MessageSquare, 
  Building2, 
  ArrowUpRight,
  Image as ImageIcon,
  Flame,
  X
} from 'lucide-react';
import { JobDrive, SectorType } from '../types';
import { getJobDrives, TALENTRISE_EVENTS } from '../utils/storage';
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
  const [allJobs, setAllJobs] = useState<JobDrive[]>(() => getJobDrives());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWorkMode, setSelectedWorkMode] = useState<string>('All');
  const [previewPosterJob, setPreviewPosterJob] = useState<JobDrive | null>(null);

  useEffect(() => {
    const handleJobsUpdated = () => {
      setAllJobs(getJobDrives());
    };
    window.addEventListener(TALENTRISE_EVENTS.JOBS_UPDATED, handleJobsUpdated);
    return () => window.removeEventListener(TALENTRISE_EVENTS.JOBS_UPDATED, handleJobsUpdated);
  }, []);

  const filteredJobs = useMemo(() => {
    return allJobs.filter(job => {
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
  }, [allJobs, selectedSector, selectedWorkMode, searchQuery]);

  const handleQuickWhatsAppApply = (job: JobDrive) => {
    const msg = generateJobQuickApplyMessage(job.title, job.companyOrProcess, job.ctc, job.location);
    openWhatsApp(msg);
  };

  const tabs: { id: SectorType; label: string; count: number }[] = [
    { id: 'All', label: 'All Drives', count: allJobs.length },
    { id: 'IT', label: 'IT & Engineering', count: allJobs.filter(j => j.sector === 'IT').length },
    { id: 'Non-IT', label: 'Non-IT / Operations', count: allJobs.filter(j => j.sector === 'Non-IT').length },
    { id: 'Healthcare', label: 'Medical & Healthcare RCM', count: allJobs.filter(j => j.sector === 'Healthcare').length },
  ];

  return (
    <section id="drives" className="py-16 md:py-24 relative bg-[#fafbff] scroll-mt-20 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-xs font-bold text-purple-700 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Verified Client Drives • Daily Walk-Ins</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Active Hiring Drives & Job Board
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl font-normal">
              Curated direct client drives in Hyderabad. Fast-track profile forwarding and 1-on-1 interview mentoring directly with client hiring managers.
            </p>
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Showing <strong className="text-slate-950 font-mono font-bold">{filteredJobs.length}</strong> active openings</span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm mb-8 space-y-4">
          {/* Sector Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-3">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => onSelectSector(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedSector === tab.id
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-950'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                    selectedSector === tab.id
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 text-slate-600'
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
                placeholder="Search by role, company (e.g. Capgemini, Access Healthcare), skill, or location..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-700 font-semibold"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedWorkMode}
                onChange={e => setSelectedWorkMode(e.target.value)}
                className="w-full sm:w-auto bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-purple-500 focus:bg-white font-medium"
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
          <div className="text-center py-16 px-4 rounded-2xl bg-white border border-slate-200">
            <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 mb-1">No drives matching your search</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-4">
              We frequently add private client walk-in drives. Chat directly with Sandru Anudeep to get custom matching drives.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectSector('All');
                setSelectedWorkMode('All');
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 text-purple-700 hover:bg-slate-200"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
            {filteredJobs.map(job => (
              <div
                key={job.id}
                className="flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 hover:border-purple-300 p-5 sm:p-6 shadow-sm hover:shadow-xl hover:shadow-purple-500/5 transition-all group"
              >
                <div>
                  {/* Card Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-slate-100 text-slate-700 border border-slate-200">
                        {job.id}
                      </span>

                      <span
                        className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold tracking-wide uppercase ${
                          job.sector === 'IT'
                            ? 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                            : job.sector === 'Non-IT'
                            ? 'bg-pink-50 text-pink-700 border border-pink-200'
                            : 'bg-purple-50 text-purple-700 border border-purple-200'
                        }`}
                      >
                        {job.sector === 'IT' ? 'IT & Tech' : job.sector === 'Non-IT' ? 'Non-IT / BPO' : 'Healthcare'}
                      </span>

                      {job.urgentHiring && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          <Flame className="w-3 h-3 fill-current text-rose-600" />
                          Urgent Walk-in
                        </span>
                      )}

                      {job.clientBadge && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                          {job.clientBadge}
                        </span>
                      )}
                    </div>

                    <span className="text-[11px] text-slate-400 shrink-0 font-mono font-medium">
                      {job.postedDaysAgo}
                    </span>
                  </div>

                  {/* Title & Company */}
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-950 group-hover:text-purple-700 transition-colors leading-snug">
                    {job.title}
                  </h3>

                  <div className="flex items-center gap-2 mt-1 mb-4 text-slate-600 text-xs sm:text-sm">
                    <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="font-bold text-slate-800">{job.companyOrProcess}</span>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-3 rounded-xl bg-slate-50/90 border border-slate-200/80 text-xs mb-4">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-semibold">Package / CTC</span>
                      <span className="font-extrabold text-purple-700">{job.ctc}</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-semibold">Experience</span>
                      <span className="font-bold text-slate-800">{job.experience}</span>
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <span className="text-[10px] text-slate-400 block uppercase font-semibold">Location</span>
                      <span className="font-bold text-slate-800 truncate block">{job.location}</span>
                    </div>
                  </div>

                  {/* Shift & Openings Detail */}
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-600 mb-4 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                      <span>{job.shifts}</span>
                    </div>
                    {job.walkInDates && (
                      <div className="flex items-center gap-1.5 text-purple-700 font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                        <span>{job.walkInDates}</span>
                      </div>
                    )}
                  </div>

                  {/* Requirements Snippet */}
                  <div className="space-y-1.5 mb-5 text-xs text-slate-600">
                    <p className="font-bold text-slate-500 uppercase text-[10px] tracking-wider">
                      Key Eligibility & Responsibilities:
                    </p>
                    {job.keyRequirements.slice(0, 2).map((req, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed font-normal">{req}</span>
                      </div>
                    ))}
                  </div>

                  {/* Optional Poster Image Attachment Preview */}
                  {job.posterImage && (
                    <div className="mb-4">
                      <button
                        type="button"
                        onClick={() => setPreviewPosterJob(job)}
                        className="w-full flex items-center justify-between p-2 rounded-xl bg-purple-50/70 hover:bg-purple-100/70 border border-purple-200/80 text-xs text-purple-800 transition-colors font-semibold"
                      >
                        <div className="flex items-center gap-2">
                          <ImageIcon className="w-3.5 h-3.5 text-purple-600" />
                          <span>View Attached Requirement Poster</span>
                        </div>
                        <span className="text-[10px] text-purple-700 underline font-mono">Enlarge ↗</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <button
                    onClick={() => handleQuickWhatsAppApply(job)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 shadow-md shadow-emerald-500/20 transition-all active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>Quick Apply via WhatsApp</span>
                  </button>

                  <button
                    onClick={() => onOpenApplyModal(job)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-950 hover:bg-slate-800 text-white shadow-sm transition-colors"
                  >
                    <span>Apply on Portal</span>
                    <ArrowUpRight className="w-4 h-4 text-cyan-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Direct Custom Requirement Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-purple-50 via-pink-50/40 to-cyan-50/60 border border-purple-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg sm:text-xl font-extrabold text-slate-950">
              Don't see your target company or specialized profile?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              We maintain active recruiter tie-ups with 15+ MNCs in Hyderabad. Send your resume directly to Founder Sandru Anudeep for fast-track manual matching.
            </p>
          </div>

          <button
            onClick={() => openWhatsApp(`Hello ${FOUNDER_NAME} Sir, I have a specific career background and would like to check if you have upcoming drives or direct client walk-ins matching my profile.`)}
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-slate-950 hover:bg-slate-800 text-white shadow-md shadow-slate-900/20 transition-all active:scale-95"
          >
            <MessageSquare className="w-4 h-4 text-pink-400" />
            <span>Direct Profile Review on WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Poster Image Lightbox Modal */}
      {previewPosterJob && previewPosterJob.posterImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="relative max-w-2xl w-full bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
              <div>
                <h4 className="text-sm font-bold text-slate-950">{previewPosterJob.title}</h4>
                <p className="text-xs text-slate-500">{previewPosterJob.companyOrProcess}</p>
              </div>
              <button
                onClick={() => setPreviewPosterJob(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex items-center justify-center bg-slate-100">
              <img
                src={previewPosterJob.posterImage}
                alt="Requirement Poster"
                className="max-h-[65vh] w-auto object-contain rounded-lg border border-slate-200 shadow-sm"
              />
            </div>
            <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">Original Recruiter Flyer Attachment</span>
              <button
                onClick={() => {
                  const job = previewPosterJob;
                  setPreviewPosterJob(null);
                  onOpenApplyModal(job);
                }}
                className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs shadow-sm"
              >
                Apply for this Drive Now
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
