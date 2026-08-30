import React, { useState } from 'react';
import { 
  Gift, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  DollarSign, 
  Users, 
  Award, 
  ArrowRight
} from 'lucide-react';
import { saveReferral } from '../utils/storage';
import { generateReferralMessage, openWhatsApp, DISPLAY_PHONE, FOUNDER_NAME } from '../utils/whatsappHelper';

interface ReferralBonusSectionProps {
  onSuccessToast: (title: string, msg: string) => void;
}

export const ReferralBonusSection: React.FC<ReferralBonusSectionProps> = ({ onSuccessToast }) => {
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
    <section id="referrals" className="py-16 md:py-24 relative bg-[#0B132B] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left 5 Cols: Reward Explanation */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-400/10 border border-amber-400/30 text-xs font-semibold text-amber-300 mb-3">
                <Gift className="w-3.5 h-3.5 text-amber-400" />
                <span>Candidate Referral Program</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Refer a Friend & Earn Instant Placement Bonuses
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Know someone looking for high-paying roles at Teleperformance, Google Process, Accenture, Kyndryl, or US Healthcare Medical Billing in Hyderabad? Refer them to TalentRise!
            </p>

            {/* Reward Tiers Grid */}
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 font-bold flex items-center justify-center text-xs">
                    ₹₹
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Non-IT / BPO / Voice Closure</h4>
                    <p className="text-[11px] text-slate-400">TP Google Process, Accenture, Concentrix</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-amber-400">₹1,500 – ₹2,500</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs">
                    ₹₹₹
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Healthcare & Medical Billing</h4>
                    <p className="text-[11px] text-slate-400">AR Caller, Medical Coding Trainee</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400">₹2,000 – ₹3,500</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-sky-400 font-bold flex items-center justify-center text-xs">
                    ₹₹₹₹
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">IT & Cloud Systems Closure</h4>
                    <p className="text-[11px] text-slate-400">Kyndryl, Full Stack, Cloud Support</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-sky-400">₹3,000 – ₹5,000</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Transparent Tracking via UPI / Direct Transfer</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Referral payouts are disbursed immediately once your candidate clears the client interview and completes successful onboarding.
              </p>
            </div>
          </div>

          {/* Right 7 Cols: Interactive Referral Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#0F172A] border border-slate-800 p-6 sm:p-8 shadow-2xl">
              <div className="mb-6 pb-4 border-b border-slate-800">
                <h3 className="text-lg font-bold text-white">Submit Candidate Referral</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Your referral will be prioritized for tomorrow's walk-in screening slot by Sandru Anudeep.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center mx-auto mb-3">
                    <Gift className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">Referral Logged!</h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto mb-5">
                    Thank you for referring <strong className="text-amber-400">{formData.candidateName}</strong>. Our recruiter team will reach out directly to schedule their mock and client interview.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700"
                  >
                    Refer Another Candidate
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Referrer Details */}
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3">
                    <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                      1. Your Details (Referrer)
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                          Your Name <span className="text-amber-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Karthik Varma"
                          value={formData.referrerName}
                          onChange={e => setFormData({ ...formData, referrerName: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                          Your Phone / WhatsApp <span className="text-amber-400">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98480 12345"
                          value={formData.referrerPhone}
                          onChange={e => setFormData({ ...formData, referrerPhone: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Your UPI ID / Google Pay Number (For Bonus Credit)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. yourname@okaxis or 9848012345"
                        value={formData.referrerUpiOrEmail}
                        onChange={e => setFormData({ ...formData, referrerUpiOrEmail: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  {/* Candidate Details */}
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3">
                    <p className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">
                      2. Candidate Details (Friend / Colleague)
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                          Candidate Full Name <span className="text-amber-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Akash Goud"
                          value={formData.candidateName}
                          onChange={e => setFormData({ ...formData, candidateName: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                          Candidate Phone / WhatsApp <span className="text-amber-400">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 80088 12345"
                          value={formData.candidatePhone}
                          onChange={e => setFormData({ ...formData, candidatePhone: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                          Candidate Experience
                        </label>
                        <select
                          value={formData.candidateExperience}
                          onChange={e => setFormData({ ...formData, candidateExperience: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        >
                          <option value="Fresher (2024 Passout)">Fresher (2024 Passout)</option>
                          <option value="Fresher (2023 / Earlier)">Fresher (2023 / Earlier)</option>
                          <option value="1 – 2 Years Experience">1 – 2 Years Experience</option>
                          <option value="2 – 5 Years Experience">2 – 5 Years Experience</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                          Target Role / Sector
                        </label>
                        <select
                          value={formData.targetRoleOrSector}
                          onChange={e => setFormData({ ...formData, targetRoleOrSector: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        >
                          <option value="Non-IT Google Process / Voice BPO">Non-IT Google Process / Voice BPO</option>
                          <option value="US Healthcare & Medical Billing">US Healthcare & Medical Billing</option>
                          <option value="IT Cloud / Developer">IT Cloud / Developer</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Quick Notes / Candidate Strengths
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Excellent English fluency, available for immediate walk-in."
                      value={formData.notes}
                      onChange={e => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-lg shadow-amber-950/40 transition-all active:scale-95 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Referral & Send to WhatsApp</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
