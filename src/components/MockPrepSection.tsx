import React, { useState } from 'react';
import { 
  GraduationCap, 
  UserCheck, 
  Mic, 
  Code, 
  FileCheck, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  Send, 
  MessageSquare, 
  Sparkles, 
  X, 
  Award
} from 'lucide-react';
import { MockPrepModule, PageType } from '../types';
import { MOCK_PREP_MODULES } from '../data/mockPrep';
import { saveMockBooking } from '../utils/storage';
import { generateMockPrepMessage, openWhatsApp, FOUNDER_NAME } from '../utils/whatsappHelper';
import { PageHeaderBanner } from './PageHeaderBanner';

interface MockPrepSectionProps {
  onSuccessToast: (title: string, msg: string) => void;
  isStandalonePage?: boolean;
  onNavigate?: (page: PageType) => void;
}

export const MockPrepSection: React.FC<MockPrepSectionProps> = ({ 
  onSuccessToast,
  isStandalonePage = false,
  onNavigate
}) => {
  const [selectedModule, setSelectedModule] = useState<MockPrepModule>(MOCK_PREP_MODULES[1]); // Versant default
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingFormData, setBookingFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    targetRole: 'Customer Support / Google Process',
    targetSector: 'Non-IT' as 'IT' | 'Non-IT' | 'Healthcare',
    preferredDate: '',
    preferredTimeSlot: 'Evening (5:00 PM – 8:00 PM)',
    focusModule: selectedModule.title,
    currentStruggle: '',
  });

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserCheck': return UserCheck;
      case 'Mic': return Mic;
      case 'Code': return Code;
      case 'FileCheck': return FileCheck;
      default: return Sparkles;
    }
  };

  const handleOpenBooking = (module?: MockPrepModule) => {
    const mod = module || selectedModule;
    setSelectedModule(mod);
    setBookingFormData(prev => ({
      ...prev,
      focusModule: mod.title,
      targetSector: mod.id.includes('tech') ? 'IT' : mod.id.includes('versant') ? 'Non-IT' : 'Non-IT',
    }));
    setIsBookingModalOpen(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingFormData.fullName || !bookingFormData.phone) {
      alert('Please provide your name and contact phone number.');
      return;
    }

    try {
      saveMockBooking({
        fullName: bookingFormData.fullName.trim(),
        phone: bookingFormData.phone.trim(),
        email: bookingFormData.email.trim() || 'Not specified',
        targetRole: bookingFormData.targetRole,
        targetSector: bookingFormData.targetSector,
        preferredDate: bookingFormData.preferredDate || 'Earliest Slot',
        preferredTimeSlot: bookingFormData.preferredTimeSlot,
        focusModule: bookingFormData.focusModule,
        currentStruggle: bookingFormData.currentStruggle.trim(),
      });

      // Prepare WhatsApp URL and trigger
      const msg = generateMockPrepMessage({
        fullName: bookingFormData.fullName,
        phone: bookingFormData.phone,
        targetRole: bookingFormData.targetRole,
        targetSector: bookingFormData.targetSector,
        focusModule: bookingFormData.focusModule,
        preferredDate: bookingFormData.preferredDate,
        preferredSlot: bookingFormData.preferredTimeSlot,
        struggle: bookingFormData.currentStruggle,
      });

      setIsBookingModalOpen(false);
      onSuccessToast('Mock Prep Slot Requested!', 'Opening WhatsApp to confirm your preferred timing with Sandru Anudeep.');
      openWhatsApp(msg);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={isStandalonePage ? "min-h-screen bg-[#fafbff] pb-20" : ""}>
      {isStandalonePage && onNavigate && (
        <PageHeaderBanner
          currentPage="mock-prep"
          title="Mock Interview Preparation & 1-on-1 Coaching"
          subtitle="Master Versant voice assessments, technical system walkthroughs, HR screening, and resume framing directly with Founder Sandru Anudeep."
          badgeText="Placement Guarantee Readiness"
          onNavigate={onNavigate}
        />
      )}

      <section id="mock-prep" className={`py-16 md:py-24 relative bg-[#fafbff] scroll-mt-20 ${!isStandalonePage ? 'border-t border-slate-200/80' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          {!isStandalonePage && (
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-xs font-bold text-purple-700 mb-3 shadow-2xs">
                <GraduationCap className="w-4 h-4 text-purple-600" />
                <span>1-on-1 Personalized Mentorship by Sandru Anudeep</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                Mock Interview Preparation & Career Coaching
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed font-normal">
                90% of candidate rejections in MNC drives occur in the first 5 minutes of Versant voice screening or HR introduction. We coach you step-by-step so you walk into the drive with 100% confidence.
              </p>
            </div>
          )}

          {/* 4 Interactive Modules Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {MOCK_PREP_MODULES.map(mod => {
              const Icon = getModuleIcon(mod.iconName);
              const isSelected = selectedModule.id === mod.id;
              return (
                <button
                  key={mod.id}
                  onClick={() => setSelectedModule(mod)}
                  className={`text-left p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white border-purple-500 shadow-md ring-2 ring-purple-400/30'
                      : 'bg-white border-slate-200 hover:border-purple-200 hover:bg-slate-50/60 shadow-xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isSelected ? 'bg-purple-600 text-white font-bold' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                        {mod.badge.split('•')[0]}
                      </span>
                    </div>

                    <h3 className="text-sm font-extrabold text-slate-950 leading-snug mb-1">
                      {mod.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                      {mod.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-purple-700 font-bold">{mod.duration}</span>
                    <span className="text-pink-600 font-bold">{isSelected ? 'Active View' : 'Explore'}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Active Module Showcase Card */}
          <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left 2 Cols: Details */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-md text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
                    {selectedModule.badge}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-cyan-600" />
                    {selectedModule.duration}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 mb-2">
                    {selectedModule.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {selectedModule.description}
                  </p>
                </div>

                {/* Syllabus Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <h4 className="text-xs font-bold text-purple-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Key Coaching Focus
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-600">
                      {selectedModule.keyTopics.map((topic, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-relaxed font-normal">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <h4 className="text-xs font-bold text-cyan-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5" />
                      Takeaways & Deliverables
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-600">
                      {selectedModule.deliverables.map((del, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                          <span className="leading-relaxed font-normal">{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Col: Instant Booking CTA Box */}
              <div className="flex flex-col justify-between p-6 rounded-xl bg-purple-50/60 border border-purple-200/80">
                <div className="space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 font-mono">
                    Direct Mentorship Access
                  </span>
                  <h4 className="text-lg font-extrabold text-slate-950">
                    Schedule 1-on-1 with Sandru Anudeep
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Recommended for candidates appearing for upcoming drives at Capgemini CATIA, US Healthcare ITES, or MNC Corporate drives.
                  </p>

                  <div className="p-3 rounded-lg bg-white border border-purple-100 text-xs text-slate-600 space-y-1 shadow-2xs">
                    <p className="text-slate-400 text-[11px] font-semibold uppercase">Popular Target Roles:</p>
                    <p className="font-bold text-slate-900">{selectedModule.popularFor}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-2.5">
                  <button
                    onClick={() => handleOpenBooking(selectedModule)}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold bg-slate-950 hover:bg-slate-800 text-white shadow-sm transition-all active:scale-95"
                  >
                    <Calendar className="w-4 h-4 text-pink-400" />
                    <span>Book Mock Session</span>
                  </button>

                  <button
                    onClick={() => {
                      openWhatsApp(`Hello ${FOUNDER_NAME} Sir, I want to inquire about mock interview coaching for *${selectedModule.title}*. Please let me know your available slots.`);
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 shadow-sm transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-current" />
                    <span>Instant WhatsApp Booking</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form Modal */}
        {isBookingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
            <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-8">
              <div className="bg-slate-50 p-5 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 font-mono">
                    1-on-1 Mentorship Booking
                  </span>
                  <h3 className="text-base font-extrabold text-slate-950 mt-0.5">
                    Reserve Mock Interview Session
                  </h3>
                </div>
                <button
                  onClick={() => setIsBookingModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleBookingSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name <span className="text-pink-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={bookingFormData.fullName}
                    onChange={e => setBookingFormData({ ...bookingFormData, fullName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-purple-500 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      WhatsApp Number <span className="text-pink-600">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={bookingFormData.phone}
                      onChange={e => setBookingFormData({ ...bookingFormData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-purple-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="ramesh@gmail.com"
                      value={bookingFormData.email}
                      onChange={e => setBookingFormData({ ...bookingFormData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-purple-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Target Role / Drive
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Capgemini CATIA / US Healthcare AR"
                      value={bookingFormData.targetRole}
                      onChange={e => setBookingFormData({ ...bookingFormData, targetRole: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-purple-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Sector
                    </label>
                    <select
                      value={bookingFormData.targetSector}
                      onChange={e => setBookingFormData({ ...bookingFormData, targetSector: e.target.value as any })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-purple-500 focus:bg-white font-medium"
                    >
                      <option value="Non-IT">Non-IT / Voice BPO</option>
                      <option value="IT">IT Tech & Cloud</option>
                      <option value="Healthcare">Healthcare & Billing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Selected Focus Module
                  </label>
                  <select
                    value={bookingFormData.focusModule}
                    onChange={e => setBookingFormData({ ...bookingFormData, focusModule: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-purple-500 focus:bg-white font-medium"
                  >
                    {MOCK_PREP_MODULES.map(m => (
                      <option key={m.id} value={m.title}>{m.title}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Tomorrow / Saturday"
                      value={bookingFormData.preferredDate}
                      onChange={e => setBookingFormData({ ...bookingFormData, preferredDate: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-purple-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Preferred Time Slot
                    </label>
                    <select
                      value={bookingFormData.preferredTimeSlot}
                      onChange={e => setBookingFormData({ ...bookingFormData, preferredTimeSlot: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-purple-500 focus:bg-white font-medium"
                    >
                      <option value="Morning (10:00 AM – 1:00 PM)">Morning (10:00 AM – 1:00 PM)</option>
                      <option value="Afternoon (2:00 PM – 5:00 PM)">Afternoon (2:00 PM – 5:00 PM)</option>
                      <option value="Evening (5:00 PM – 8:00 PM)">Evening (5:00 PM – 8:00 PM)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    What is your biggest struggle right now? (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Getting nervous during Versant audio questions, English sentence pacing, or technical incident questions."
                    value={bookingFormData.currentStruggle}
                    onChange={e => setBookingFormData({ ...bookingFormData, currentStruggle: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-purple-500 focus:bg-white"
                  />
                </div>

                <div className="pt-3 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsBookingModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 shadow-md transition-all active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    <span>Confirm Slot via WhatsApp</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
