import React, { useState, useEffect, useRef } from 'react';
import { 
  Lock, 
  X, 
  Search, 
  Download, 
  FileText, 
  MessageSquare, 
  Phone, 
  Mail, 
  Calendar, 
  CheckCircle2, 
  Filter, 
  RefreshCw, 
  ShieldCheck, 
  Layers, 
  Trash2, 
  ExternalLink,
  PlusCircle,
  UploadCloud,
  Image as ImageIcon,
  Sparkles,
  Briefcase,
  Check,
  AlertCircle,
  Eye,
  EyeOff,
  KeyRound,
  LogOut,
  Power,
  CopyPlus
} from 'lucide-react';
import { CandidateApplication, MockBookingSubmission, ReferralSubmission, CorporateInquiry, JobDrive } from '../types';
import { 
  getApplications, 
  getMockBookings, 
  getReferrals, 
  getCorporateInquiries, 
  getJobDrives,
  saveJobDrive,
  deleteJobDrive,
  updateApplicationStatus, 
  updateMockStatus, 
  updateReferralStatus, 
  exportDataAsJSON, 
  exportApplicationsAsCSV 
} from '../utils/storage';
import { openWhatsApp, DISPLAY_PHONE, FOUNDER_NAME } from '../utils/whatsappHelper';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ADMIN_SESSION_KEY = 'talentrise_admin_session_v2';

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({ isOpen, onClose }) => {
  // Authentication & Passcode State
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications' | 'mocks' | 'referrals' | 'b2b'>('jobs');
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState<string>('All');
  const [jobSuccessMessage, setJobSuccessMessage] = useState('');

  // Live datasets
  const [applications, setApplications] = useState<CandidateApplication[]>([]);
  const [mocks, setMocks] = useState<MockBookingSubmission[]>([]);
  const [referrals, setReferrals] = useState<ReferralSubmission[]>([]);
  const [corporate, setCorporate] = useState<CorporateInquiry[]>([]);
  const [jobDrives, setJobDrives] = useState<JobDrive[]>([]);

  // Job Posting Form State
  const [jobTitle, setJobTitle] = useState('');
  const [companyOrProcess, setCompanyOrProcess] = useState('');
  const [clientBadge, setClientBadge] = useState('Urgent Direct Walk-in');
  const [sector, setSector] = useState<'IT' | 'Non-IT' | 'Healthcare'>('Non-IT');
  const [ctc, setCtc] = useState('₹3.5 LPA - ₹4.5 LPA');
  const [experience, setExperience] = useState('Freshers & Experienced (0-2 Yrs)');
  const [location, setLocation] = useState('Hyderabad (Hitec City / Madhapur)');
  const [workMode, setWorkMode] = useState<'On-site' | 'Hybrid' | 'Remote'>('On-site');
  const [shifts, setShifts] = useState('24/7 Rotational with Two-way Home Cab');
  const [openingsCount, setOpeningsCount] = useState<number>(30);
  const [walkInDates, setWalkInDates] = useState('Mon - Sat (10:00 AM - 3:00 PM)');
  const [eligibilityText, setEligibilityText] = useState('Any Graduate (2020-2024 passouts)\nGood English verbal & written communication\nBasic computer navigation');
  const [requirementsText, setRequirementsText] = useState('Handling customer queries via voice / chat with active listening\nMaintaining high first-contact resolution metrics\nQuick learner with team collaboration skills');
  const [roundsText, setRoundsText] = useState('HR Screening Round\nVersant Voice & Accent Assessment\nClient Operations Manager Round');
  const [urgentHiring, setUrgentHiring] = useState(true);
  const [featured, setFeatured] = useState(true);
  const [posterImageBase64, setPosterImageBase64] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check saved session on mount
  useEffect(() => {
    try {
      const savedSession = localStorage.getItem(ADMIN_SESSION_KEY);
      if (savedSession) {
        const sessionData = JSON.parse(savedSession);
        // Valid if within 7 days
        if (sessionData && sessionData.auth === true && (Date.now() - sessionData.timestamp < 7 * 24 * 3600 * 1000)) {
          setIsAuthenticated(true);
        }
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const loadData = () => {
    setApplications(getApplications());
    setMocks(getMockBookings());
    setReferrals(getReferrals());
    setCorporate(getCorporateInquiries());
    setJobDrives(getJobDrives());
  };

  useEffect(() => {
    if (isAuthenticated && isOpen) {
      loadData();
    }
  }, [isAuthenticated, isOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const inputPass = passcode.trim();

    const validPasscodes = [
      'admin123',
      'talentrise2024',
      'talentrise',
      'anudeep@talentrise',
      '832824',
      '8328246487',
      'recruiter123'
    ];

    if (validPasscodes.includes(inputPass)) {
      setIsAuthenticated(true);
      setErrorMsg('');
      setPasscode('');
      try {
        localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({
          auth: true,
          timestamp: Date.now()
        }));
      } catch (e) {
        // ignore
      }
    } else {
      setErrorMsg('Invalid administrative passcode. Please check your credentials.');
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem(ADMIN_SESSION_KEY);
    } catch (e) {
      // ignore
    }
    setIsAuthenticated(false);
    setPasscode('');
    setErrorMsg('');
  };

  const handleStatusChange = (appId: string, newStatus: CandidateApplication['status']) => {
    updateApplicationStatus(appId, newStatus);
    loadData();
  };

  const handleDirectWhatsAppApplicant = (candidateName: string, phone: string, jobTitle?: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const targetPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
    const text = encodeURIComponent(
      `Hello ${candidateName}, this is ${FOUNDER_NAME} from TalentRise Training and Placements regarding your application for ${jobTitle || 'our active hiring drives'}. Are you available for a quick screening discussion today?`
    );
    window.open(`https://wa.me/${targetPhone}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handlePosterFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, JPEG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setPosterImageBase64(result);

      if (!jobTitle) {
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        setJobTitle(`Hiring Drive: ${cleanName}`);
      }
    };
    reader.onerror = () => {
      alert('Error reading image file. Please try another picture.');
    };
    reader.readAsDataURL(file);
  };

  const handleSaveJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle.trim() || !companyOrProcess.trim()) {
      alert('Please provide both a Job Title and Company / Process name.');
      return;
    }

    const eligibilityList = eligibilityText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const requirementsList = requirementsText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const roundsList = roundsText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const newJob = saveJobDrive({
      title: jobTitle.trim(),
      companyOrProcess: companyOrProcess.trim(),
      clientBadge: clientBadge.trim() || 'Direct Walk-in',
      sector,
      ctc: ctc.trim() || 'Best in Industry',
      experience: experience.trim() || '0 - 2 Years',
      location: location.trim() || 'Hyderabad',
      workMode,
      shifts: shifts.trim() || 'Rotational Shifts',
      openingsCount: Number(openingsCount) || 10,
      urgentHiring,
      walkInDates: walkInDates.trim() || 'Immediate Scheduling via TalentRise',
      eligibility: eligibilityList.length ? eligibilityList : ['Any Graduate / Relevant stream'],
      keyRequirements: requirementsList.length ? requirementsList : ['Strong communication and domain aptitude'],
      rounds: roundsList.length ? roundsList : ['HR Screening', 'Client Fitment Round'],
      featured,
      posterImage: posterImageBase64 || undefined,
    });

    loadData();
    setJobSuccessMessage(`Job drive "${newJob.title}" published successfully! Live on website.`);
    setTimeout(() => setJobSuccessMessage(''), 5000);

    setJobTitle('');
    setCompanyOrProcess('');
    setPosterImageBase64('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Quick Duplicate & Edit Job
  const handleDuplicateJob = (job: JobDrive) => {
    setJobTitle(`${job.title} (New Batch)`);
    setCompanyOrProcess(job.companyOrProcess);
    setSector(job.sector);
    setCtc(job.ctc);
    setExperience(job.experience);
    setLocation(job.location);
    setWorkMode(job.workMode);
    setShifts(job.shifts);
    setOpeningsCount(job.openingsCount);
    setClientBadge('Urgent Direct Walk-in');
    setUrgentHiring(true);
    setFeatured(true);
    setEligibilityText(job.eligibility.join('\n'));
    setRequirementsText(job.keyRequirements.join('\n'));
    setRoundsText(job.rounds.join('\n'));
    if (job.posterImage) setPosterImageBase64(job.posterImage);

    setJobSuccessMessage(`Loaded "${job.title}" into creation form. Modify details and publish.`);
    setTimeout(() => setJobSuccessMessage(''), 4000);
  };

  // Quick Close / Re-open Drive Toggle
  const handleToggleUrgentOrClose = (job: JobDrive) => {
    const isCurrentlyUrgent = job.urgentHiring;
    saveJobDrive({
      ...job,
      urgentHiring: !isCurrentlyUrgent,
      clientBadge: isCurrentlyUrgent ? 'Positions Filled / Closed' : 'Urgent Direct Walk-in'
    });
    loadData();
    setJobSuccessMessage(
      isCurrentlyUrgent
        ? `Marked "${job.title}" as Closed/Filled.`
        : `Marked "${job.title}" as Urgent Active Hiring.`
    );
    setTimeout(() => setJobSuccessMessage(''), 4000);
  };

  const handleDeleteJob = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to permanently remove "${title}"? It will be taken down immediately from the homepage.`)) {
      deleteJobDrive(id);
      loadData();
      setJobSuccessMessage(`Job opening "${title}" removed immediately.`);
      setTimeout(() => setJobSuccessMessage(''), 4000);
    }
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportCSV = () => {
    const csv = exportApplicationsAsCSV();
    downloadFile(csv, `talentrise_candidates_${new Date().toISOString().slice(0,10)}.csv`, 'text/csv;charset=utf-8;');
  };

  const handleExportJSON = () => {
    const json = exportDataAsJSON();
    downloadFile(json, `talentrise_full_backup_${new Date().toISOString().slice(0,10)}.json`, 'application/json');
  };

  // Filtered Applications
  const filteredApps = applications.filter(app => {
    if (sectorFilter !== 'All' && app.sectorPreference !== sectorFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = app.fullName.toLowerCase().includes(q);
      const matchPhone = app.phone.toLowerCase().includes(q);
      const matchRole = (app.jobTitle || '').toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchRole) return false;
    }
    return true;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#0F172A] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-4 sm:my-8 flex flex-col max-h-[92vh]">
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-[#0B132B] to-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white p-0.5 border border-amber-400/60 overflow-hidden flex items-center justify-center">
              <img src="/logo.png" alt="TalentRise" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white leading-tight">
                  TalentRise Recruiter Admin Portal
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-400/15 text-amber-400 border border-amber-400/30">
                  RECRUITER ACCESS
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Lead Recruiter Desk: {FOUNDER_NAME} ({DISPLAY_PHONE})
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-red-300 bg-red-950/40 hover:bg-red-900/60 border border-red-800/50 transition-colors"
                title="Logout admin session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {!isAuthenticated ? (
          /* Secure Passcode Authentication Screen */
          <div className="p-6 sm:p-10 text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-amber-400 shadow-xl relative">
              <KeyRound className="w-8 h-8" />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center border-2 border-[#0F172A]">
                <ShieldCheck className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="space-y-1.5">
              <h4 className="text-xl font-bold text-white">TalentRise Recruiter Access</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enter your administrative credentials to post daily hiring drives, upload requirement flyers, and manage candidate pipelines.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>Recruiter Master Passcode</span>
                  <span className="text-[10px] text-amber-400 font-mono">TalentRise Admin</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    autoFocus
                    placeholder="Enter admin passcode..."
                    value={passcode}
                    onChange={e => setPasscode(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {errorMsg && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-red-950/40 border border-red-800/60 text-xs text-red-300">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl text-sm font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Authorize & Open Portal</span>
              </button>

              <div className="pt-2 text-center">
                <p className="text-[11px] text-slate-500">
                  Authorized for <strong className="text-slate-400">{FOUNDER_NAME}</strong> & TalentRise Recruiting Team ({DISPLAY_PHONE})
                </p>
              </div>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            {/* Dashboard Subheader & Navigation Tabs */}
            <div className="px-6 py-3 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('applications')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    activeTab === 'applications'
                      ? 'bg-amber-400 text-slate-950 shadow'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  Candidate Applications ({applications.length})
                </button>
                <button
                  onClick={() => setActiveTab('jobs')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'jobs'
                      ? 'bg-amber-400 text-slate-950 shadow'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Post & Manage Jobs ({jobDrives.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab('mocks')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    activeTab === 'mocks'
                      ? 'bg-amber-400 text-slate-950 shadow'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  Mock Prep Slots ({mocks.length})
                </button>
                <button
                  onClick={() => setActiveTab('referrals')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    activeTab === 'referrals'
                      ? 'bg-amber-400 text-slate-950 shadow'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  Referrals ({referrals.length})
                </button>
                <button
                  onClick={() => setActiveTab('b2b')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    activeTab === 'b2b'
                      ? 'bg-amber-400 text-slate-950 shadow'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  Corporate B2B ({corporate.length})
                </button>
              </div>

              {/* Data Export Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>CSV Export</span>
                </button>
                <button
                  onClick={handleExportJSON}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-sky-400" />
                  <span>Full Backup</span>
                </button>
              </div>
            </div>

            {/* Tab 1: Candidate Applications */}
            {activeTab === 'applications' && (
              <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                {/* Search & Sector Filters */}
                <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex flex-col sm:flex-row items-center gap-3 shrink-0">
                  <div className="relative flex-1 w-full">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search candidates by name, phone, or target role..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <select
                      value={sectorFilter}
                      onChange={e => setSectorFilter(e.target.value)}
                      className="bg-slate-900 border border-slate-700 text-xs text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-amber-400 w-full sm:w-auto"
                    >
                      <option value="All">All Sectors</option>
                      <option value="Non-IT">Non-IT / BPO</option>
                      <option value="IT">IT & Cloud</option>
                      <option value="Healthcare">Healthcare</option>
                    </select>

                    <button
                      onClick={loadData}
                      title="Refresh Candidate Pipeline"
                      className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-amber-400 transition-colors shrink-0"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Applications List */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5">
                  {filteredApps.length === 0 ? (
                    <div className="text-center py-16 space-y-2">
                      <p className="text-sm text-slate-400">No candidate applications found matching criteria.</p>
                    </div>
                  ) : (
                    filteredApps.map(app => (
                      <div
                        key={app.id}
                        className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-sm font-bold text-white">{app.fullName}</h4>
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-sky-400 border border-blue-500/20">
                              {app.sectorPreference}
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono">
                              {new Date(app.submittedAt).toLocaleDateString()}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-emerald-400" />
                              <strong className="text-white font-mono">{app.phone}</strong>
                            </span>
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3 text-sky-400" />
                              <span className="text-slate-300">{app.email}</span>
                            </span>
                            <span className="text-amber-400 font-medium">
                              Exp: {app.experience}
                            </span>
                            <span className="text-slate-400">
                              Edu: {app.highestQualification}
                            </span>
                          </div>

                          <div className="text-xs text-slate-400">
                            Target Job: <strong className="text-white">{app.jobTitle || 'Direct Walk-in Application'}</strong> ({app.company || 'TalentRise Pipeline'})
                          </div>

                          {app.resumeLink && (
                            <div className="pt-1">
                              <a
                                href={app.resumeLink}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-sky-400 hover:underline"
                              >
                                <ExternalLink className="w-3 h-3" />
                                <span>Open Candidate Resume Link</span>
                              </a>
                            </div>
                          )}

                          {app.additionalNotes && (
                            <p className="text-[11px] text-slate-400 italic mt-0.5">
                              "{app.additionalNotes}"
                            </p>
                          )}
                        </div>

                        {/* Status & Actions */}
                        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                          <div>
                            <select
                              value={app.status}
                              onChange={e => handleStatusChange(app.id, e.target.value as any)}
                              className="bg-slate-950 border border-slate-700 text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-400"
                            >
                              <option value="New">New</option>
                              <option value="Screened">Screened</option>
                              <option value="Scheduled for Drive">Scheduled for Drive</option>
                              <option value="Selected">Selected</option>
                            </select>
                          </div>

                          <button
                            onClick={() => handleDirectWhatsAppApplicant(app.fullName, app.phone, app.jobTitle)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 shadow transition-all"
                          >
                            <MessageSquare className="w-3.5 h-3.5 fill-current" />
                            <span>WhatsApp</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: Post & Manage Jobs (Form + Picture Upload + Drive Manager) */}
            {activeTab === 'jobs' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8">
                {jobSuccessMessage && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold animate-in fade-in">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>{jobSuccessMessage}</span>
                  </div>
                )}

                {/* Job Posting Form */}
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
                    <div>
                      <h4 className="text-base font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span>Post New Client Drive / Walk-in Opening</span>
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Fill in job details or upload a requirement flyer picture. It goes live instantly on the homepage job board.
                      </p>
                    </div>
                  </div>

                  {/* Section A: Upload Picture of Requirement / Flyer */}
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-dashed border-amber-400/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400 flex items-center gap-2">
                        <UploadCloud className="w-4 h-4" />
                        <span>Option 1: Upload Requirement Poster / Picture</span>
                      </span>
                      {posterImageBase64 && (
                        <button
                          type="button"
                          onClick={() => setPosterImageBase64('')}
                          className="text-[11px] text-red-400 hover:text-red-300 underline"
                        >
                          Remove Attached Poster
                        </button>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="flex-1 w-full">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handlePosterFileUpload}
                          className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-400 file:text-slate-950 hover:file:bg-amber-300 cursor-pointer bg-slate-900 p-2 rounded-xl border border-slate-800"
                        />
                        <p className="text-[11px] text-slate-500 mt-1">
                          Attach client requirement screenshot, WhatsApp flyer, or job banner (PNG / JPG). Candidates will be able to view the flyer on the job board.
                        </p>
                      </div>

                      {posterImageBase64 && (
                        <div className="shrink-0 w-24 h-24 rounded-lg bg-slate-900 border border-slate-700 overflow-hidden relative group">
                          <img
                            src={posterImageBase64}
                            alt="Requirement Preview"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-[10px] text-white font-mono">Attached</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Section B: Detailed Form Inputs */}
                  <form onSubmit={handleSaveJob} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Job Title */}
                      <div className="lg:col-span-2">
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Job Role / Title *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Customer Support Executive (Google Ads / Process)"
                          value={jobTitle}
                          onChange={e => setJobTitle(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      {/* Hiring Client / Company */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Client / Company Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Teleperformance / Kyndryl / Genpact"
                          value={companyOrProcess}
                          onChange={e => setCompanyOrProcess(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      {/* Sector */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Sector Category
                        </label>
                        <select
                          value={sector}
                          onChange={e => setSector(e.target.value as any)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                        >
                          <option value="Non-IT">Non-IT & BPO / Voice Operations</option>
                          <option value="IT">IT & Cloud Systems</option>
                          <option value="Healthcare">Healthcare & Medical Billing</option>
                        </select>
                      </div>

                      {/* Client Badge */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Badge Label
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. MNC Client Drive / Google Process / Urgent"
                          value={clientBadge}
                          onChange={e => setClientBadge(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      {/* CTC */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          CTC Salary Package
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. ₹3.5 LPA - ₹5.0 LPA + Incentives"
                          value={ctc}
                          onChange={e => setCtc(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      {/* Experience */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Experience Required
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Freshers (2022-2024) & 0-3 Yrs"
                          value={experience}
                          onChange={e => setExperience(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      {/* Location */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Work Location
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Hyderabad (Hitec City / Madhapur)"
                          value={location}
                          onChange={e => setLocation(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      {/* Work Mode */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Work Mode
                        </label>
                        <select
                          value={workMode}
                          onChange={e => setWorkMode(e.target.value as any)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                        >
                          <option value="On-site">On-site</option>
                          <option value="Hybrid">Hybrid</option>
                          <option value="Remote">Remote</option>
                        </select>
                      </div>

                      {/* Shifts */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Shifts & Cab Facilities
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 24/7 Rotational with Two-way Cab / Day Shift"
                          value={shifts}
                          onChange={e => setShifts(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      {/* Openings Count */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Total Openings
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="500"
                          value={openingsCount}
                          onChange={e => setOpeningsCount(Number(e.target.value))}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      {/* Walk-in Dates */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Walk-In Schedule / Timing
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Mon - Fri (10:00 AM to 3:00 PM)"
                          value={walkInDates}
                          onChange={e => setWalkInDates(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    {/* Eligibility criteria & Requirements */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Eligibility Criteria (1 line per bullet)
                        </label>
                        <textarea
                          rows={3}
                          value={eligibilityText}
                          onChange={e => setEligibilityText(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Key Responsibilities (1 line per bullet)
                        </label>
                        <textarea
                          rows={3}
                          value={requirementsText}
                          onChange={e => setRequirementsText(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Interview Rounds (1 line per round)
                        </label>
                        <textarea
                          rows={3}
                          value={roundsText}
                          onChange={e => setRoundsText(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    {/* Checkboxes & Submit */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-800">
                      <div className="flex items-center gap-6 text-xs text-slate-300">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={urgentHiring}
                            onChange={e => setUrgentHiring(e.target.checked)}
                            className="rounded text-amber-400 focus:ring-0 bg-slate-950 border-slate-700"
                          />
                          <span>Urgent Hiring Priority</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={featured}
                            onChange={e => setFeatured(e.target.checked)}
                            className="rounded text-amber-400 focus:ring-0 bg-slate-950 border-slate-700"
                          />
                          <span>Featured Drive Badge</span>
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-lg shadow-amber-950/40 transition-all active:scale-95"
                      >
                        <PlusCircle className="w-4 h-4" />
                        <span>Publish Drive to Job Board</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* Section C: Live Drives Manager */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-sky-400" />
                        <span>Currently Active Client Drives ({jobDrives.length})</span>
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Dynamic daily control: Post new batches, close filled positions immediately, or duplicate requirements.
                      </p>
                    </div>
                    <span className="text-[11px] text-emerald-400 font-medium px-2 py-0.5 bg-emerald-950/40 border border-emerald-800/40 rounded">
                      Live on Homepage
                    </span>
                  </div>

                  {jobDrives.length === 0 ? (
                    <div className="p-8 text-center bg-slate-900/60 rounded-xl border border-slate-800 text-slate-400 text-xs">
                      No active job postings. Create one above to publish immediately to your candidates.
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {jobDrives.map(job => {
                        const isClosed = !job.urgentHiring && job.clientBadge.toLowerCase().includes('closed');
                        return (
                          <div
                            key={job.id}
                            className={`p-3.5 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-3 transition-all ${
                              isClosed
                                ? 'bg-slate-950/80 border-slate-800/60 opacity-75'
                                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <div className="space-y-1.5 min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className={`text-sm font-bold ${isClosed ? 'text-slate-400 line-through' : 'text-white'}`}>
                                  {job.title}
                                </span>
                                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-400/10 text-amber-400 border border-amber-400/20">
                                  {job.companyOrProcess}
                                </span>
                                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-sky-400">
                                  {job.sector}
                                </span>
                                {job.urgentHiring && (
                                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-500/15 text-red-400 border border-red-500/30 animate-pulse">
                                    URGENT
                                  </span>
                                )}
                                {isClosed && (
                                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-800 text-slate-400">
                                    CLOSED / FILLED
                                  </span>
                                )}
                              </div>
                              <div className="flex flex-wrap items-center gap-x-3 text-xs text-slate-400">
                                <span>CTC: <strong className="text-slate-200">{job.ctc}</strong></span>
                                <span>• Location: <strong className="text-slate-200">{job.location}</strong></span>
                                <span>• Openings: <strong className="text-white font-mono">{job.openingsCount}</strong></span>
                                {job.posterImage && (
                                  <span className="text-sky-400 flex items-center gap-1 font-mono text-[10px]">
                                    <ImageIcon className="w-3 h-3" /> Poster Flyer Attached
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap">
                              {/* Quick Close / Reopen Toggle */}
                              <button
                                type="button"
                                onClick={() => handleToggleUrgentOrClose(job)}
                                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors flex items-center gap-1 ${
                                  job.urgentHiring
                                    ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30'
                                    : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                                }`}
                                title={job.urgentHiring ? 'Mark as Closed immediately' : 'Reactivate urgent hiring'}
                              >
                                <Power className="w-3.5 h-3.5" />
                                <span>{job.urgentHiring ? 'Close Immediately' : 'Re-open Drive'}</span>
                              </button>

                              {/* Duplicate into Form */}
                              <button
                                type="button"
                                onClick={() => handleDuplicateJob(job)}
                                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1"
                                title="Duplicate requirement to post new batch"
                              >
                                <CopyPlus className="w-3.5 h-3.5 text-sky-400" />
                                <span>Duplicate</span>
                              </button>

                              {/* Delete Drive */}
                              <button
                                type="button"
                                onClick={() => handleDeleteJob(job.id, job.title)}
                                className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
                                title="Permanently remove job opening"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab 3: Mock Bookings */}
            {activeTab === 'mocks' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-3">
                {mocks.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-xs">No mock bookings logged yet.</div>
                ) : (
                  mocks.map(mock => (
                    <div key={mock.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{mock.fullName}</h4>
                          <span className="text-xs text-amber-400 font-medium">({mock.targetRole})</span>
                        </div>
                        <p className="text-xs text-slate-300">
                          Focus: <strong className="text-sky-300">{mock.focusModule}</strong>
                        </p>
                        <p className="text-xs text-slate-400">
                          Slot: {mock.preferredDate} ({mock.preferredTimeSlot}) • Phone: <strong className="text-white">{mock.phone}</strong>
                        </p>
                        {mock.currentStruggle && (
                          <p className="text-xs text-slate-400 italic">"{mock.currentStruggle}"</p>
                        )}
                      </div>
                      <button
                        onClick={() => handleDirectWhatsAppApplicant(mock.fullName, mock.phone, mock.focusModule)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#25D366] text-slate-950 self-start sm:self-center"
                      >
                        <MessageSquare className="w-3.5 h-3.5 fill-current" />
                        <span>Schedule Slot</span>
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab 4: Referrals */}
            {activeTab === 'referrals' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-3">
                {referrals.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-xs">No referrals logged yet.</div>
                ) : (
                  referrals.map(ref => (
                    <div key={ref.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400">Referrer:</span>
                          <strong className="text-amber-400 text-sm">{ref.referrerName}</strong>
                          <span className="text-xs text-slate-400">({ref.referrerPhone})</span>
                        </div>
                        <p className="text-xs text-slate-200">
                          Referred Candidate: <strong className="text-white">{ref.candidateName}</strong> ({ref.candidatePhone})
                        </p>
                        <p className="text-xs text-slate-400">
                          Target Role: {ref.targetRoleOrSector} • Status: <span className="text-emerald-400 font-semibold">{ref.bonusStatus}</span>
                        </p>
                        {ref.referrerUpiOrEmail && (
                          <p className="text-[11px] text-amber-300 font-mono">UPI / Payout: {ref.referrerUpiOrEmail}</p>
                        )}
                      </div>
                      <button
                        onClick={() => handleDirectWhatsAppApplicant(ref.candidateName, ref.candidatePhone, ref.targetRoleOrSector)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#25D366] text-slate-950 self-start sm:self-center"
                      >
                        <MessageSquare className="w-3.5 h-3.5 fill-current" />
                        <span>Call Candidate</span>
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab 5: Corporate B2B */}
            {activeTab === 'b2b' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-3">
                {corporate.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-xs">No corporate staffing inquiries logged yet.</div>
                ) : (
                  corporate.map(c => (
                    <div key={c.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-white">{c.companyName}</h4>
                        <p className="text-xs text-sky-400">
                          Contact: {c.hrContactName} ({c.officialEmail} • {c.phone})
                        </p>
                        <p className="text-xs text-slate-300">
                          Domain: {c.domain} • Headcount: <strong className="text-amber-400">{c.headcountNeeded}</strong> • Timeline: {c.timeline}
                        </p>
                        {c.requirements && (
                          <p className="text-xs text-slate-400 italic">"{c.requirements}"</p>
                        )}
                      </div>
                      <button
                        onClick={() => handleDirectWhatsAppApplicant(c.hrContactName, c.phone, `${c.companyName} Staffing Requirement`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white self-start sm:self-center"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Contact HR Lead</span>
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
