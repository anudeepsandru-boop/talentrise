import React, { useState } from 'react';
import { X, Send, MessageSquare, CheckCircle, Upload, User, Phone, Mail, MapPin } from 'lucide-react';
import { JobDrive, CandidateApplication } from '../types';
import { saveApplication } from '../utils/storage';
import { generateApplicationSubmitMessage, openWhatsApp } from '../utils/whatsappHelper';

interface JobApplyModalProps {
  job: JobDrive | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccessToast: (title: string, msg: string) => void;
}

export const JobApplyModal: React.FC<JobApplyModalProps> = ({ job, isOpen, onClose, onSuccessToast }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    experience: 'Fresher (2023 / 2024 Passout)',
    highestQualification: 'B.Tech / B.E',
    currentLocation: 'Hyderabad',
    sectorPreference: (job?.sector || 'Non-IT') as 'IT' | 'Non-IT' | 'Healthcare',
    resumeLink: '',
    additionalNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<CandidateApplication | null>(null);

  // Sync sectorPreference whenever job changes
  React.useEffect(() => {
    if (job?.sector) {
      setFormData(prev => ({
        ...prev,
        sectorPreference: job.sector as 'IT' | 'Non-IT' | 'Healthcare'
      }));
    }
  }, [job]);

  // Reset submission state when modal closes/opens
  React.useEffect(() => {
    if (!isOpen) {
      setSubmittedApp(null);
    }
  }, [isOpen]);

  const qualificationOptions = [
    'B.Tech / B.E (CSE / IT / ECE / Mechanical / Civil)',
    'B.Sc (Computer Science / Data / Maths)',
    'B.Sc (Life Sciences / Biotech / Microbiology / Chemistry)',
    'B.Pharm / M.Pharm / Pharma.D',
    'B.Com / B.Com Computers / M.Com',
    'BBA / MBA / PGDM',
    'MCA / BCA',
    'Any Degree / Under-Graduate',
  ];

  const experienceOptions = [
    'Fresher (2024 Passout)',
    'Fresher (2023 / Earlier Passout)',
    '0.6 – 1 Year Experience',
    '1 – 2 Years Experience',
    '2 – 4 Years Experience',
    '4+ Years Senior Experience',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.email) {
      alert('Please fill in your Name, Phone Number, and Email Address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const saved = saveApplication({
        jobId: job?.id,
        jobTitle: job?.title || 'General Hiring Pool',
        company: job?.companyOrProcess || 'TalentRise Partner Drive',
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        experience: formData.experience,
        highestQualification: formData.highestQualification,
        currentLocation: formData.currentLocation.trim(),
        sectorPreference: formData.sectorPreference,
        resumeLink: formData.resumeLink.trim(),
        additionalNotes: formData.additionalNotes.trim(),
      });

      setSubmittedApp(saved);
      onSuccessToast('Application Submitted Successfully!', 'Your profile is saved and forwarded to the recruiter team.');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForwardToWhatsApp = () => {
    if (!submittedApp) return;
    const msg = generateApplicationSubmitMessage({
      fullName: submittedApp.fullName,
      phone: submittedApp.phone,
      email: submittedApp.email,
      jobTitle: submittedApp.jobTitle,
      company: submittedApp.company,
      experience: submittedApp.experience,
      highestQualification: submittedApp.highestQualification,
      sectorPreference: submittedApp.sectorPreference,
      resumeLink: submittedApp.resumeLink,
    });
    openWhatsApp(msg);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="bg-slate-50 p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 font-mono">
                TalentRise Candidate Portal
              </span>
              {job?.id && (
                <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-purple-50 text-purple-700 border border-purple-200">
                  {job.id}
                </span>
              )}
            </div>
            <h3 className="text-lg font-extrabold text-slate-950 mt-0.5">
              {job ? `Apply: ${job.title}` : 'Direct Candidate Profile Submission'}
            </h3>
            {job && (
              <p className="text-xs text-slate-500 mt-0.5">
                Company: <span className="text-slate-900 font-bold">{job.companyOrProcess}</span> • {job.location} • CTC: <span className="text-purple-700 font-bold">{job.ctc}</span>
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submittedApp ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-extrabold text-slate-950 mb-2">Application Received!</h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto mb-6 font-normal">
                Thank you, <strong className="text-purple-700 font-bold">{submittedApp.fullName}</strong>. Your profile for <strong className="text-slate-900 font-bold">{submittedApp.jobTitle}</strong> has been logged in the TalentRise recruiter system.
              </p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2 mb-6 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Application ID:</span>
                  <span className="font-mono text-purple-700 font-bold">{submittedApp.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Target Role:</span>
                  <span className="text-slate-900 font-bold">{submittedApp.jobTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Contact:</span>
                  <span className="text-slate-800 font-mono font-semibold">{submittedApp.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Review SLA:</span>
                  <span className="text-emerald-700 font-bold">24 - 48 Hours</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleForwardToWhatsApp}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 shadow-md transition-all"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Notify Sandru Anudeep on WhatsApp</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-3 rounded-xl text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  Done / Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Full Name <span className="text-pink-600">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    WhatsApp / Contact Number <span className="text-pink-600">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Email Address <span className="text-pink-600">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul.sharma@gmail.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Current Location / City <span className="text-pink-600">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hyderabad (Kukatpally / Hitec City)"
                      value={formData.currentLocation}
                      onChange={e => setFormData({ ...formData, currentLocation: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Total Experience Level
                  </label>
                  <select
                    value={formData.experience}
                    onChange={e => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-purple-500 focus:bg-white font-medium"
                  >
                    {experienceOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Highest Qualification
                  </label>
                  <select
                    value={formData.highestQualification}
                    onChange={e => setFormData({ ...formData, highestQualification: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-purple-500 focus:bg-white font-medium"
                  >
                    {qualificationOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Sector Preference
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['IT', 'Non-IT', 'Healthcare'] as const).map(sec => (
                    <button
                      type="button"
                      key={sec}
                      onClick={() => setFormData({ ...formData, sectorPreference: sec })}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                        formData.sectorPreference === sec
                          ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {sec === 'IT' ? '💼 IT Tech' : sec === 'Non-IT' ? '🎧 Non-IT / BPO' : '🏥 Healthcare'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Resume Link (Google Drive / Dropbox / LinkedIn URL)
                </label>
                <div className="relative">
                  <Upload className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="url"
                    placeholder="https://drive.google.com/file/d/.../view"
                    value={formData.resumeLink}
                    onChange={e => setFormData({ ...formData, resumeLink: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Make sure the Google Drive link is set to "Anyone with the link can view".</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Additional Notes / Notice Period / Immediate Join
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Immediate joiner, willing to work rotational night shifts, interested in Versant mock prep."
                  value={formData.additionalNotes}
                  onChange={e => setFormData({ ...formData, additionalNotes: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-950 hover:bg-slate-800 text-white shadow-sm transition-all active:scale-95 disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-pink-400" />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Application'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
