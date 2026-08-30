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
  HelpCircle, 
  X, 
  Award
} from 'lucide-react';
import { MockPrepModule, MockBookingSubmission } from '../types';
import { MOCK_PREP_MODULES } from '../data/mockPrep';
import { saveMockBooking } from '../utils/storage';
import { generateMockPrepMessage, openWhatsApp, DISPLAY_PHONE, FOUNDER_NAME } from '../utils/whatsappHelper';

interface MockPrepSectionProps {
  onSuccessToast: (title: string, msg: string) => void;
}

export const MockPrepSection: React.FC<MockPrepSectionProps> = ({ onSuccessToast }) => {
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
    <section id="mock-prep" className="py-16 md:py-24 relative bg-[#0B132B] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-xs font-semibold text-amber-300 mb-3 shadow-lg shadow-amber-950/20">
            <GraduationCap className="w-4 h-4" />
            <span>1-on-1 Personalized Mentorship by Sandru Anudeep</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Mock Interview Preparation & Career Coaching
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
            90% of candidate rejections in MNC drives occur in the first 5 minutes of Versant voice screening or HR introduction. We coach you step-by-step so you walk into the drive with 100% confidence.
          </p>
        </div>

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
                    ? 'bg-slate-900 border-amber-400 shadow-xl shadow-amber-950/40 ring-1 ring-amber-400/40'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {mod.badge.split('•')[0]}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white leading-snug mb-1">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                    {mod.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-amber-400 font-medium">{mod.duration}</span>
                  <span className="text-sky-400 font-semibold">{isSelected ? 'Active View' : 'Explore'}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Active Module Showcase Card */}
        <div className="rounded-2xl bg-gradient-to-br from-[#0F172A] to-slate-900 border border-slate-700/80 p-6 sm:p-8 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-md text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {selectedModule.badge}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-sky-400" />
                  {selectedModule.duration}
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {selectedModule.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedModule.description}
                </p>
              </div>

              {/* Syllabus Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Key Coaching Focus
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {selectedModule.keyTopics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" />
                    Takeaways & Deliverables
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {selectedModule.deliverables.map((del, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Col: Instant Booking CTA Box */}
            <div className="flex flex-col justify-between p-6 rounded-xl bg-slate-950 border border-slate-800">
              <div className="space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  Direct Mentorship Access
                </span>
                <h4 className="text-lg font-bold text-white">
                  Schedule 1-on-1 with Sandru Anudeep
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Recommended for candidates appearing for upcoming drives at Teleperformance Google Process, Accenture, Kyndryl, or US Healthcare ITES.
                </p>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <p className="text-slate-400 text-[11px]">Popular Target Roles:</p>
                  <p className="font-semibold text-white">{selectedModule.popularFor}</p>
                </div>
              </div>

              <div className="mt-6 space-y-2.5">
                <button
                  onClick={() => handleOpenBooking(selectedModule)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-lg shadow-amber-950/40 transition-all active:scale-95"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Mock Session</span>
                </button>

                <button
                  onClick={() => {
                    openWhatsApp(`Hello ${FOUNDER_NAME} Sir, I want to inquire about mock interview coaching for *${selectedModule.title}*. Please let me know your available slots.`);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-[#25D366]/20 hover:bg-[#25D366]/30 text-emerald-300 border border-[#25D366]/40 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Instant WhatsApp Booking</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[#0F172A] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-8">
            <div className="bg-gradient-to-r from-[#0B132B] to-slate-900 p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  1-on-1 Mentorship Booking
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  Reserve Mock Interview Session
                </h3>
              </div>
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={bookingFormData.fullName}
                  onChange={e => setBookingFormData({ ...bookingFormData, fullName: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    WhatsApp Number <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={bookingFormData.phone}
                    onChange={e => setBookingFormData({ ...bookingFormData, phone: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="ramesh@gmail.com"
                    value={bookingFormData.email}
                    onChange={e => setBookingFormData({ ...bookingFormData, email: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Target Role / Drive
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Teleperformance Google Process"
                    value={bookingFormData.targetRole}
                    onChange={e => setBookingFormData({ ...bookingFormData, targetRole: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Sector
                  </label>
                  <select
                    value={bookingFormData.targetSector}
                    onChange={e => setBookingFormData({ ...bookingFormData, targetSector: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Non-IT">Non-IT / Voice BPO</option>
                    <option value="IT">IT Tech & Cloud</option>
                    <option value="Healthcare">Healthcare & Billing</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Selected Focus Module
                </label>
                <select
                  value={bookingFormData.focusModule}
                  onChange={e => setBookingFormData({ ...bookingFormData, focusModule: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  {MOCK_PREP_MODULES.map(m => (
                    <option key={m.id} value={m.title}>{m.title}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Tomorrow / Saturday"
                    value={bookingFormData.preferredDate}
                    onChange={e => setBookingFormData({ ...bookingFormData, preferredDate: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={bookingFormData.preferredTimeSlot}
                    onChange={e => setBookingFormData({ ...bookingFormData, preferredTimeSlot: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Morning (10:00 AM – 1:00 PM)">Morning (10:00 AM – 1:00 PM)</option>
                    <option value="Afternoon (2:00 PM – 5:00 PM)">Afternoon (2:00 PM – 5:00 PM)</option>
                    <option value="Evening (5:00 PM – 8:00 PM)">Evening (5:00 PM – 8:00 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  What is your biggest struggle right now? (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Getting nervous during Versant audio questions, English sentence pacing, or technical incident questions."
                  value={bookingFormData.currentStruggle}
                  onChange={e => setBookingFormData({ ...bookingFormData, currentStruggle: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
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
  );
};
