import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SectorType, JobDrive, PageType } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ActiveDrivesSection } from './components/ActiveDrivesSection';
import { ITDrivesPage } from './components/ITDrivesPage';
import { NonITDrivesPage } from './components/NonITDrivesPage';
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
  const [activePage, setActivePage] = useState<PageType>(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    const validPages: PageType[] = ['all', 'it', 'non-it', 'medical', 'mock-prep', 'founder', 'referrals', 'b2b'];
    if (validPages.includes(hash as PageType)) {
      return hash as PageType;
    }
    return 'all';
  });

  const [selectedSector, setSelectedSector] = useState<SectorType>('All');
  const [selectedJobForModal, setSelectedJobForModal] = useState<JobDrive | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [allJobs, setAllJobs] = useState<JobDrive[]>(() => getJobDrives());

  // Hash change synchronization for browser navigation (back/forward)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validPages: PageType[] = ['all', 'it', 'non-it', 'medical', 'mock-prep', 'founder', 'referrals', 'b2b'];
      if (validPages.includes(hash as PageType)) {
        setActivePage(hash as PageType);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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

  const handleNavigate = (page: PageType) => {
    setActivePage(page);
    window.location.hash = page === 'all' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSector = (sector: SectorType) => {
    setSelectedSector(sector);
    if (sector === 'IT') {
      handleNavigate('it');
    } else if (sector === 'Non-IT') {
      handleNavigate('non-it');
    } else if (sector === 'Healthcare') {
      handleNavigate('medical');
    } else {
      handleNavigate('all');
    }
  };

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Toast Notification Layer */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Sticky Header Navbar */}
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenAdmin={() => setIsAdminPortalOpen(true)}
        onSelectSectorFilter={handleSelectSector}
      />

      {/* Main Page Flow - Conditional on activePage */}
      <main className="flex-1">
        {activePage === 'all' && (
          <>
            {/* 1. Hero Section with Live Metrics */}
            <HeroSection
              onSelectSector={handleSelectSector}
              activeSector={selectedSector}
              onNavigate={handleNavigate}
            />

            {/* 2. Active Drives & Job Board */}
            <ActiveDrivesSection
              onOpenApplyModal={handleOpenApplyModal}
              selectedSector={selectedSector}
              onSelectSector={setSelectedSector}
            />

            {/* 3. Verified Candidate Testimonials & Wall of Placement */}
            <TestimonialsSection />
          </>
        )}

        {activePage === 'it' && (
          <ITDrivesPage
            jobs={allJobs}
            onOpenApplyModal={handleOpenApplyModal}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'non-it' && (
          <NonITDrivesPage
            jobs={allJobs}
            onOpenApplyModal={handleOpenApplyModal}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'medical' && (
          <MedicalSection
            onOpenApplyModal={handleOpenApplyModal}
            medicalJobs={medicalJobs}
            isStandalonePage={true}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'mock-prep' && (
          <MockPrepSection
            onSuccessToast={(title, msg) => addToast(title, msg, 'success')}
            isStandalonePage={true}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'founder' && (
          <FounderSection
            isStandalonePage={true}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'referrals' && (
          <ReferralBonusSection
            onSuccessToast={(title, msg) => addToast(title, msg, 'success')}
            isStandalonePage={true}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'b2b' && (
          <B2BStaffingSection
            onSuccessToast={(title, msg) => addToast(title, msg, 'success')}
            isStandalonePage={true}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminPortalOpen(true)}
        onSelectSectorFilter={handleSelectSector}
        onNavigate={handleNavigate}
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

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}
