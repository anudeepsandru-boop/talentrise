import React, { useState, useEffect } from 'react';
import { SectorType, JobDrive } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ActiveDrivesSection } from './components/ActiveDrivesSection';
import { MedicalSection } from './components/MedicalSection';
import { MockPrepSection } from './components/MockPrepSection';
import { FounderSection } from './components/FounderSection';
import { ReferralBonusSection } from './components/ReferralBonusSection';
import { B2BStaffingSection } from './components/B2BStaffingSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { JobApplyModal } from './components/JobApplyModal';
import { AdminPortalModal } from './components/AdminPortalModal';
import { ToastContainer, ToastMessage } from './components/Toast';
import { getJobDrives, TALENTRISE_EVENTS } from './utils/storage';

export default function App() {
  const [selectedSector, setSelectedSector] = useState<SectorType>('All');
  const [selectedJobForModal, setSelectedJobForModal] = useState<JobDrive | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [allJobs, setAllJobs] = useState<JobDrive[]>(() => getJobDrives());

  useEffect(() => {
    const handleJobsUpdated = () => {
      setAllJobs(getJobDrives());
    };
    window.addEventListener(TALENTRISE_EVENTS.JOBS_UPDATED, handleJobsUpdated);
    return () => window.removeEventListener(TALENTRISE_EVENTS.JOBS_UPDATED, handleJobsUpdated);
  }, []);

  const medicalJobs = allJobs.filter(j => j.sector === 'Healthcare');

  const addToast = (title: string, message?: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastMessage = { id, title, message, type };
    setToasts(prev => [...prev, newToast]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleOpenApplyModal = (job?: JobDrive) => {
    setSelectedJobForModal(job || null);
    setIsApplyModalOpen(true);
  };

  const handleSelectSector = (sector: SectorType) => {
    setSelectedSector(sector);
    if (sector === 'Healthcare') {
      const el = document.getElementById('medical');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    // Smooth scroll to drives section
    const el = document.getElementById('drives');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B132B] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Toast Notification Layer */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Sticky Header Navbar */}
      <Navbar
        onOpenAdmin={() => setIsAdminPortalOpen(true)}
        onSelectSectorFilter={handleSelectSector}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 1. Hero Section with Live Metrics */}
        <HeroSection
          onSelectSector={handleSelectSector}
          activeSector={selectedSector}
        />

        {/* 2. Active Drives & Job Board */}
        <ActiveDrivesSection
          onOpenApplyModal={handleOpenApplyModal}
          selectedSector={selectedSector}
          onSelectSector={setSelectedSector}
        />

        {/* 3. Dedicated Medical & US Healthcare RCM Section */}
        <MedicalSection
          onOpenApplyModal={handleOpenApplyModal}
          medicalJobs={medicalJobs}
        />

        {/* 4. Mock Interview Preparation & 1-on-1 Coaching */}
        <MockPrepSection
          onSuccessToast={(title, msg) => addToast(title, msg, 'success')}
        />

        {/* 5. Founder & Leadership (Sandru Anudeep - Executive Seal) */}
        <FounderSection />

        {/* 6. Candidate Referral Bonus Program */}
        <ReferralBonusSection
          onSuccessToast={(title, msg) => addToast(title, msg, 'success')}
        />

        {/* 7. B2B Corporate Staffing & Vendor Solutions */}
        <B2BStaffingSection
          onSuccessToast={(title, msg) => addToast(title, msg, 'success')}
        />

        {/* 8. Verified Candidate Testimonials & Wall of Placement */}
        <TestimonialsSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminPortalOpen(true)}
        onSelectSectorFilter={handleSelectSector}
      />

      {/* Interactive Floating WhatsApp Recruiter Widget */}
      <WhatsAppWidget />

      {/* Candidate Job Application Modal */}
      <JobApplyModal
        job={selectedJobForModal}
        isOpen={isApplyModalOpen}
        onClose={() => {
          setIsApplyModalOpen(false);
          setSelectedJobForModal(null);
        }}
        onSuccessToast={(title, msg) => addToast(title, msg, 'success')}
      />

      {/* Recruiter Admin Portal Modal */}
      <AdminPortalModal
        isOpen={isAdminPortalOpen}
        onClose={() => setIsAdminPortalOpen(false)}
      />
    </div>
  );
}
