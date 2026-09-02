import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  Send, 
  Handshake
} from 'lucide-react';
import { PageType } from '../types';
import { PageHeaderBanner } from './PageHeaderBanner';
import { saveCorporateInquiry } from '../utils/storage';
import { generateB2BInquiryMessage, openWhatsApp } from '../utils/whatsappHelper';

interface B2BStaffingSectionProps {
  onSuccessToast: (title: string, msg: string) => void;
  isStandalonePage?: boolean;
  onNavigate?: (page: PageType) => void;
}

export const B2BStaffingSection: React.FC<B2BStaffingSectionProps> = ({ 
  onSuccessToast,
  isStandalonePage = false,
  onNavigate
}) => {
  const [formData, setFormData] = useState({
    companyName: '',
    hrContactName: '',
    officialEmail: '',
    phone: '',
    domain: 'Non-IT & Voice Support' as 'IT & Cloud' | 'Non-IT & Voice Support' | 'Healthcare & Medical Billing' | 'Bulk Multi-Discipline',
    headcountNeeded: '10 – 30 Positions',
    timeline: 'Immediate (Next 15 Days)',
    locationPreference: 'Hyderabad',
    requirements: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.hrContactName || !formData.officialEmail || !formData.phone) {
      alert('Please fill in your company and contact information.');
      return;
    }

    setIsSubmitting(true);
    try {
      saveCorporateInquiry({
        companyName: formData.companyName.trim(),
        hrContactName: formData.hrContactName.trim(),
        officialEmail: formData.officialEmail.trim(),
        phone: formData.phone.trim(),
        domain: formData.domain,
        headcountNeeded: formData.headcountNeeded,
        timeline: formData.timeline,
        locationPreference: formData.locationPreference,
        requirements: formData.requirements.trim(),
      });

      const msg = generateB2BInquiryMessage({
        companyName: formData.companyName,
        hrContactName: formData.hrContactName,
        officialEmail: formData.officialEmail,
        phone: formData.phone,
        domain: formData.domain,
        headcount: formData.headcountNeeded,
        timeline: formData.timeline,
      });

      setSubmitted(true);
      onSuccessToast('Corporate Inquiry Logged!', 'Forwarding your staffing requirement directly to Sandru Anudeep on WhatsApp.');
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
          currentPage="b2b"
          title="B2B Corporate Staffing & Vendor Solutions"
          subtitle="Pre-screened bulk candidate pipelines, specialized IT hiring, and SLA-driven enterprise recruitment in Hyderabad under founder guidance."
          badgeText="Enterprise Recruitment Partner"
          onNavigate={onNavigate}
        />
      )}

      <section id="b2b" className={`py-16 md:py-24 relative bg-[#fafbff] scroll-mt-20 ${!isStandalonePage ? 'border-t border-slate-200/80' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left 6 Cols: B2B Overview */}
            <div className="lg:col-span-6 space-y-6">
              {!isStandalonePage && (
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-xs font-bold text-purple-700 mb-3 shadow-2xs">
                    <Handshake className="w-3.5 h-3.5 text-purple-600" />
                    <span>Enterprise & Vendor Recruitment Solutions</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                    B2B Corporate Staffing & Vendor Partnerships
                  </h2>
                </div>
              )}

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Are you an HR Director, Talent Acquisition Lead, or MSP Agency looking for rapid, pre-screened batch closures in Hyderabad? TalentRise operates direct recruitment pipelines tailored to strict MNC SLAs.
              </p>

              <div className="space-y-3.5">
                {[
                  {
                    title: 'Pre-Screened Candidates with Zero Dropout',
                    desc: 'All candidates undergo mandatory Versant phonetics screening, background readiness checks, and document verification prior to walk-in.',
                  },
                  {
                    title: 'Sub-Vendor & Lateral Staffing Agility',
                    desc: 'Ability to deploy 50+ candidates within 72–96 hours for high-volume customer support, IT operations, or medical billing ramps.',
                  },
                  {
                    title: 'Strict Compliance & Transparent Commercials',
                    desc: 'Standardized MSA contracts, transparent replacement guarantees, and responsive account management with Sandru Anudeep.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 mb-0.5">{item.title}</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-normal">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 6 Cols: Corporate Inquiry Form */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-sm">
                <div className="mb-6 pb-4 border-b border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 font-mono">
                    Direct HR & Vendor Desk
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-950 mt-0.5">Request Corporate Staffing Proposal</h3>
                </div>

                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center mx-auto mb-3">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-extrabold text-slate-950 mb-1">Inquiry Received</h4>
                    <p className="text-xs text-slate-600 max-w-md mx-auto mb-5 font-normal">
                      Thank you, <strong className="text-purple-700">{formData.hrContactName}</strong>. Founder Sandru Anudeep will review your staffing requirement and initiate contact within 2-4 business hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-950 text-white hover:bg-slate-800 shadow-sm"
                    >
                      Submit Another Requirement
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Company Name <span className="text-pink-600">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Enterprise / Tech Org"
                          value={formData.companyName}
                          onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-purple-500 focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          HR Contact Name <span className="text-pink-600">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Priya Nair (Lead TA)"
                          value={formData.hrContactName}
                          onChange={e => setFormData({ ...formData, hrContactName: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-purple-500 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Official Work Email <span className="text-pink-600">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="priya.nair@company.com"
                          value={formData.officialEmail}
                          onChange={e => setFormData({ ...formData, officialEmail: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-purple-500 focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Contact Phone / WhatsApp <span className="text-pink-600">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-purple-500 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Hiring Domain
                        </label>
                        <select
                          value={formData.domain}
                          onChange={e => setFormData({ ...formData, domain: e.target.value as any })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-purple-500 focus:bg-white font-medium"
                        >
                          <option value="Non-IT & Voice Support">Non-IT & Voice / Google Process</option>
                          <option value="Healthcare & Medical Billing">Healthcare & Medical Billing</option>
                          <option value="IT & Cloud">IT & Cloud Infrastructure</option>
                          <option value="Bulk Multi-Discipline">Bulk Multi-Discipline Ramp</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Headcount Required
                        </label>
                        <select
                          value={formData.headcountNeeded}
                          onChange={e => setFormData({ ...formData, headcountNeeded: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-purple-500 focus:bg-white font-medium"
                        >
                          <option value="5 – 15 Positions">5 – 15 Positions</option>
                          <option value="15 – 35 Positions">15 – 35 Positions</option>
                          <option value="35 – 75+ Positions (Bulk)">35 – 75+ Positions (Bulk)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Role Specifics / SLA / Shift Requirements
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Need immediate candidates with 58+ Versant score for night shift with door cab drop."
                        value={formData.requirements}
                        onChange={e => setFormData({ ...formData, requirements: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-purple-500 focus:bg-white"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-bold bg-slate-950 hover:bg-slate-800 text-white shadow-sm transition-all active:scale-95 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4 text-cyan-400" />
                      <span>Submit Staffing RFP to Sandru Anudeep</span>
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
