import React, { useState, useMemo } from 'react';
import { 
  Briefcase, 
  Search, 
  Building2, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  Code2, 
  Cpu, 
  ShieldCheck
} from 'lucide-react';
import { JobDrive, PageType } from '../types';
import { PageHeaderBanner } from './PageHeaderBanner';
import { openWhatsApp, FOUNDER_NAME } from '../utils/whatsappHelper';

interface ITDrivesPageProps {
  jobs: JobDrive[];
  onOpenApplyModal: (job?: JobDrive) => void;
  onNavigate: (page: PageType) => void;
}

export const ITDrivesPage: React.FC<ITDrivesPageProps> = ({
  jobs,
  onOpenApplyModal,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWorkMode, setSelectedWorkMode] = useState('All');

  const itJobs = useMemo(() => {
    return jobs
      .filter(j => j.sector === 'IT')
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
    const text = `Hello ${FOUNDER_NAME} Sir, I am contacting you regarding IT Drive: ${job.title} (${job.id}) at ${job.companyOrProcess}. Location: ${job.location}, CTC: ${job.ctc}. Please guide me on interview rounds.`;
    openWhatsApp(text);
  };

  return (
    <div className="min-h-screen bg-[#fafbff] pb-20">
      {/* Header Banner */}
      <PageHeaderBanner
        currentPage="it"
        title="IT & Engineering Placement Drives"
        subtitle="Exclusive client walk-in drives and direct interview schedules with Tier-1 technology leaders in Hyderabad — Capgemini CATIA, Associate Software Engineering, Enterprise Cloud & Specialized Engineering."
        badgeText="Verified Enterprise Tech Pipeline"
        onNavigate={onNavigate}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Technology Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="p-5 rounded-2xl bg-white border border-cyan-200/80 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-slate-950 font-extrabold text-sm">Capgemini CATIA V5</h3>
                <span className="text-[11px] text-cyan-700 font-mono font-bold">Specialized Mechanical & CAD</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Direct client drive for B.Tech Mechanical & Automobile engineers with CATIA modeling skills and immediate joining in Hyderabad.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-purple-200/80 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-slate-950 font-extrabold text-sm">Associate Software Engineers</h3>
                <span className="text-[11px] text-purple-700 font-mono font-bold">Full-Stack & Cloud Services</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fresher & experienced openings across Capgemini, Tier-1 IT services, and product partners with ₹3.50 – ₹14.00 LPA CTC packages.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-pink-200/80 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-pink-50 text-pink-700 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-slate-950 font-extrabold text-sm">1-on-1 Technical Mock Prep</h3>
                <span className="text-[11px] text-pink-700 font-mono font-bold">Founder Mentorship</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Rigorous coding walkthroughs, system design basics, and HR round clearing guidance before every client drive.
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm mb-8 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search IT drives by role (CATIA, ASE, Guidewire), company, or skills..."
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

        {/* IT Job Cards Grid */}
        {itJobs.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl bg-white border border-slate-200">
            <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 mb-1">No IT drives match your filters</h3>
            <p className="text-xs text-slate-500 mb-4">Try clearing your search query or view all open drives.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedWorkMode('All');
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 text-purple-700 text-xs font-bold hover:bg-slate-200"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {itJobs.map(job => (
              <div
                key={job.id}
                className="flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 hover:border-purple-300 p-5 sm:p-6 shadow-sm hover:shadow-xl hover:shadow-purple-500/5 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-slate-100 text-slate-700 border border-slate-200">
                        {job.id}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase bg-cyan-50 text-cyan-700 border border-cyan-200">
                        IT & Tech
                      </span>
                    </div>
                    {job.postedDaysAgo && job.postedDaysAgo !== 'Released Today' && (
                      <span className="text-[11px] text-slate-400 font-mono font-medium">
                        {job.postedDaysAgo}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-950 group-hover:text-purple-700 transition-colors leading-snug">
                    {job.title}
                  </h3>

                  <div className="flex items-center gap-2 mt-1 mb-4 text-slate-600 text-xs sm:text-sm">
                    <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="font-bold text-slate-800">{job.companyOrProcess}</span>
                  </div>

                  {/* Highlights */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs mb-4">
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

                  {/* Shift info */}
                  <div className="flex items-center gap-2 text-xs text-slate-600 mb-4 pb-3 border-b border-slate-100">
                    <Clock className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                    <span>{job.shifts}</span>
                  </div>

                  {/* Requirements */}
                  <div className="space-y-1.5 mb-5 text-xs text-slate-600">
                    <p className="font-bold text-slate-500 uppercase text-[10px] tracking-wider">
                      Key Technical Requirements:
                    </p>
                    {job.keyRequirements.slice(0, 3).map((req, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => onOpenApplyModal(job)}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold bg-slate-950 hover:bg-slate-800 text-white shadow-sm transition-all active:scale-95"
                  >
                    <span>Apply for Drive</span>
                    <ArrowRight className="w-4 h-4 text-cyan-400" />
                  </button>

                  <button
                    onClick={() => handleWhatsAppInquiry(job)}
                    title="Direct WhatsApp Recruiter for IT Drive"
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
