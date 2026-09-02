import React, { useState } from 'react';
import { 
  Gift, 
  Sparkles, 
  Send, 
  CheckCircle2
} from 'lucide-react';
import { PageType } from '../types';
import { PageHeaderBanner } from './PageHeaderBanner';
import { saveReferral } from '../utils/storage';
import { generateReferralMessage, openWhatsApp } from '../utils/whatsappHelper';

interface ReferralBonusSectionProps {
  onSuccessToast: (title: string, msg: string) => void;
  isStandalonePage?: boolean;
  onNavigate?: (page: PageType) => void;
}

export const ReferralBonusSection: React.FC<ReferralBonusSectionProps> = ({ 
  onSuccessToast,
  isStandalonePage = false,
  onNavigate
}) => {
  const [formData, setFormData] = useState({
    referrerName: '',
    referrerPhone: '',
    referrerUpiOrEmail: '',
    candidateName: '',
    candidatePhone: '',
    candidateEmail: '',
    candidateExperience: 'Fresher (2023 / 2024)',
    targetRoleOrSector: 'Non-IT Google Process / Voice BPO',
    candidateQualification: 'B.Tech / Degree',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.referrerName || !formData.referrerPhone || !formData.candidateName || !formData.candidatePhone) {
      alert('Please fill in your details and the candidate details.');
      return;
    }

    setIsSubmitting(true);
    try {
      saveReferral({
        referrerName: formData.referrerName.trim(),
        referrerPhone: formData.referrerPhone.trim(),
        referrerUpiOrEmail: formData.referrerUpiOrEmail.trim(),
        candidateName: formData.candidateName.trim(),
        candidatePhone: formData.candidatePhone.trim(),
        candidateEmail: formData.candidateEmail.trim(),
        candidateExperience: formData.candidateExperience,
        targetRoleOrSector: formData.targetRoleOrSector,
        candidateQualification: formData.candidateQualification,
        notes: formData.notes.trim(),
      });

      const msg = generateReferralMessage({
        referrerName: formData.referrerName,
        referrerPhone: formData.referrerPhone,
        candidateName: formData.candidateName,
        candidatePhone: formData.candidatePhone,
        candidateExperience: formData.candidateExperience,
        targetRole: formData.targetRoleOrSector,
      });

      setSubmitted(true);
      onSuccessToast('Referral Recorded Successfully!', 'Opening WhatsApp to notify Sandru Anudeep for priority candidate screening.');
      openWhatsApp(msg);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={isStandalonePage ? "min-h-screen bg-[#fafbff] pb-20" : ""}>
      {isStandalonePage && onNavigate && (
        <PageHeaderBanner
          currentPage="referrals"
          title="Candidate Referral Bonus Program"
          subtitle="Earn direct UPI cash rewards between ₹1,000 to ₹5,000 for every successfully placed friend or classmate in IT, Non-IT, or Healthcare drives."
          badgeText="Instant Cash Rewards"
          onNavigate={onNavigate}
        />
      )}

      <section id="referrals" className={`py-16 md:py-24 relative bg-[#fafbff] scroll-mt-20 ${!isStandalonePage ? 'border-t border-slate-200/80' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left 5 Cols: Reward Explanation */}
            <div className="lg:col-span-5 space-y-6">
              {!isStandalonePage && (
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-xs font-bold text-purple-700 mb-3 shadow-2xs">
                    <Gift className="w-3.5 h-3.5 text-purple-600" />
                    <span>Candidate Referral Program</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                    Refer a Friend & Earn Instant Placement Bonuses
                  </h2>
                </div>
              )}

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Know someone looking for high-paying roles in Capgemini CATIA Engineering, US Healthcare Medical Billing, or MNC Corporate drives in Hyderabad? Refer them to TalentRise!
              </p>

              {/* Program Highlights & Features */}
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3.5 shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 font-bold flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Direct Client Walk-in Priority</h4>
                    <p className="text-xs text-slate-500 mt-0.5 font-normal">
                      Referred candidates are directly scheduled for screening rounds and mock interview preparation.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3.5 shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-700 font-bold flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Free Interview Coaching & Resume Polish</h4>
                    <p className="text-xs text-slate-500 mt-0.5 font-normal">
                      Every candidate receives complimentary Versant voice guidance and technical screening before client submission.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200/80 text-xs text-slate-700 space-y-1.5 shadow-2xs">
                <div className="flex items-center gap-2 text-purple-800 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-purple-600" />
                  <span>Transparent Tracking via UPI / Direct Transfer</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                  Referral payouts are disbursed immediately once your candidate clears the client interview and completes successful onboarding.
                </p>
              </div>
            </div>

            {/* Right 7 Cols: Interactive Referral Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-sm">
                <div className="mb-6 pb-4 border-b border-slate-100">
                  <h3 className="text-lg font-extrabold text-slate-950">Submit Candidate Referral</h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-normal">
                    Your referral will be prioritized for tomorrow's walk-in screening slot by Sandru Anudeep.
                  </p>
                </div>

                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center mx-auto mb-3">
                      <Gift className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-extrabold text-slate-950 mb-1">Referral Logged!</h4>
                    <p className="text-xs text-slate-600 max-w-md mx-auto mb-5">
                      Thank you for referring <strong className="text-purple-700">{formData.candidateName}</strong>. Our recruiter team will reach out directly to schedule their mock and client interview.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-950 text-white hover:bg-slate-800 shadow-sm"
                    >
                      Refer Another Candidate
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Referrer Details */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                      <p className="text-[11px] font-bold text-purple-700 uppercase tracking-wider font-mono">
                        1. Your Details (Referrer)
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Your Name <span className="text-pink-600">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Karthik Varma"
                            value={formData.referrerName}
                            onChange={e => setFormData({ ...formData, referrerName: e.target.value })}
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Your Phone / WhatsApp <span className="text-pink-600">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 98480 12345"
                            value={formData.referrerPhone}
                            onChange={e => setFormData({ ...formData, referrerPhone: e.target.value })}
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-purple-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Your UPI ID / Google Pay Number (For Bonus Credit)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. yourname@okaxis or 9848012345"
                          value={formData.referrerUpiOrEmail}
                          onChange={e => setFormData({ ...formData, referrerUpiOrEmail: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>

                    {/* Candidate Details */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                      <p className="text-[11px] font-bold text-cyan-700 uppercase tracking-wider font-mono">
                        2. Candidate Details (Friend / Colleague)
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Candidate Full Name <span className="text-pink-600">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Akash Goud"
                            value={formData.candidateName}
                            onChange={e => setFormData({ ...formData, candidateName: e.target.value })}
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Candidate Phone / WhatsApp <span className="text-pink-600">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 80088 12345"
                            value={formData.candidatePhone}
                            onChange={e => setFormData({ ...formData, candidatePhone: e.target.value })}
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-purple-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Candidate Experience
                          </label>
                          <select
                            value={formData.candidateExperience}
                            onChange={e => setFormData({ ...formData, candidateExperience: e.target.value })}
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-purple-500 font-medium"
                          >
                            <option value="Fresher (2024 Passout)">Fresher (2024 Passout)</option>
                            <option value="Fresher (2023 / Earlier)">Fresher (2023 / Earlier)</option>
                            <option value="1 – 2 Years Experience">1 – 2 Years Experience</option>
                            <option value="2 – 5 Years Experience">2 – 5 Years Experience</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Target Role / Sector
                          </label>
                          <select
                            value={formData.targetRoleOrSector}
                            onChange={e => setFormData({ ...formData, targetRoleOrSector: e.target.value })}
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-purple-500 font-medium"
                          >
                            <option value="Non-IT Google Process / Voice BPO">Non-IT Google Process / Voice BPO</option>
                            <option value="US Healthcare & Medical Billing">US Healthcare & Medical Billing</option>
                            <option value="IT Cloud / Developer">IT Cloud / Developer</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Quick Notes / Candidate Strengths
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Excellent English fluency, available for immediate walk-in."
                        value={formData.notes}
                        onChange={e => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-bold bg-slate-950 hover:bg-slate-800 text-white shadow-sm transition-all active:scale-95 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4 text-pink-400" />
                      <span>Submit Referral & Send to WhatsApp</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
