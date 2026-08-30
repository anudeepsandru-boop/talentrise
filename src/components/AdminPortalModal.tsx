import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Unlock, 
  X, 
  Search, 
  Download, 
  FileText, 
  MessageSquare, 
  Phone, 
  Mail, 
  User, 
  Calendar, 
  CheckCircle2, 
  Filter, 
  RefreshCw, 
  ShieldCheck, 
  Layers, 
  Trash2, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { CandidateApplication, MockBookingSubmission, ReferralSubmission, CorporateInquiry } from '../types';
import { 
  getApplications, 
  getMockBookings, 
  getReferrals, 
  getCorporateInquiries, 
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

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'applications' | 'mocks' | 'referrals' | 'b2b'>('applications');
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState<string>('All');

  // Live datasets
  const [applications, setApplications] = useState<CandidateApplication[]>([]);
  const [mocks, setMocks] = useState<MockBookingSubmission[]>([]);
  const [referrals, setReferrals] = useState<ReferralSubmission[]>([]);
  const [corporate, setCorporate] = useState<CorporateInquiry[]>([]);

  const loadData = () => {
    setApplications(getApplications());
    setMocks(getMockBookings());
    setReferrals(getReferrals());
    setCorporate(getCorporateInquiries());
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'admin123') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Incorrect passcode. Use: admin123');
    }
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#0F172A] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-4 sm:my-8 flex flex-col max-h-[92vh]">
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-[#0B132B] to-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white leading-tight">
                  TalentRise Recruiter Admin Portal
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-400/15 text-amber-400 border border-amber-400/30">
                  CONFIDENTIAL
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Lead Recruiter Desk: {FOUNDER_NAME} ({DISPLAY_PHONE})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-amber-400 shadow-xl">
              <Lock className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-bold text-white">Recruiter Access Verification</h4>
              <p className="text-xs text-slate-400">
                Enter your administrative passcode to view candidate applications, mock slots, and referral bonuses.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-3 text-left">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Passcode (Default: <code className="text-amber-400 font-mono">admin123</code>)
                </label>
                <input
                  type="password"
                  autoFocus
                  placeholder="Enter passcode..."
                  value={passcode}
                  onChange={e => setPasscode(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>

              {errorMsg && (
                <p className="text-xs text-red-400 font-medium">{errorMsg}</p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl text-sm font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md transition-all active:scale-95"
              >
                Authorize & Open Portal
              </button>
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
                  Referrals & Bonuses ({referrals.length})
                </button>
                <button
                  onClick={() => setActiveTab('b2b')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    activeTab === 'b2b'
                      ? 'bg-amber-400 text-slate-950 shadow'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  B2B Corporate Inquiries ({corporate.length})
                </button>
              </div>

              {/* Export Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportCSV}
                  title="Export Applications to CSV"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/30 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CSV</span>
                </button>
                <button
                  onClick={handleExportJSON}
                  title="Export Full Backup as JSON"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600/20 text-sky-300 border border-blue-500/40 hover:bg-blue-600/30 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Backup JSON</span>
                </button>
                <button
                  onClick={loadData}
                  title="Refresh Data"
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Tab 1: Candidate Applications */}
            {activeTab === 'applications' && (
              <div className="flex-1 flex flex-col min-h-0">
                {/* Search & Sector Bar */}
                <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row items-center gap-3 shrink-0">
                  <div className="relative flex-1 w-full">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search applicant name, phone, or target role..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <select
                      value={sectorFilter}
                      onChange={e => setSectorFilter(e.target.value)}
                      className="bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-amber-400"
                    >
                      <option value="All">All Sectors</option>
                      <option value="Non-IT">Non-IT / Voice</option>
                      <option value="IT">IT Tech</option>
                      <option value="Healthcare">Healthcare</option>
                    </select>
                  </div>
                </div>

                {/* Table Content Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {filteredApps.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 text-xs">
                      No candidate applications match your current filter.
                    </div>
                  ) : (
                    filteredApps.map(app => (
                      <div
                        key={app.id}
                        className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:border-slate-700 transition-colors"
                      >
                        {/* Candidate Details */}
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-sm font-bold text-white">{app.fullName}</h4>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                app.sectorPreference === 'IT'
                                  ? 'bg-blue-500/20 text-sky-400'
                                  : app.sectorPreference === 'Non-IT'
                                  ? 'bg-amber-500/20 text-amber-400'
                                  : 'bg-emerald-500/20 text-emerald-400'
                              }`}
                            >
                              {app.sectorPreference}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {new Date(app.submittedAt).toLocaleDateString()}
                            </span>
                          </div>

                          <div className="text-xs text-slate-300 flex flex-wrap items-center gap-x-4 gap-y-1">
                            <span className="font-semibold text-amber-300">
                              {app.jobTitle || 'General Pool'}
                            </span>
                            <span>Exp: {app.experience}</span>
                            <span>Deg: {app.highestQualification}</span>
                            <span>Loc: {app.currentLocation}</span>
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

            {/* Tab 2: Mock Bookings */}
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

            {/* Tab 3: Referrals */}
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

            {/* Tab 4: Corporate B2B */}
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
