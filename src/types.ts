export type SectorType = 'IT' | 'Non-IT' | 'Healthcare' | 'All';

export interface JobDrive {
  id: string;
  title: string;
  companyOrProcess: string;
  clientBadge?: string;
  sector: 'IT' | 'Non-IT' | 'Healthcare';
  ctc: string;
  experience: string;
  location: string;
  workMode: 'On-site' | 'Hybrid' | 'Remote';
  shifts: string;
  openingsCount: number;
  urgentHiring: boolean;
  walkInDates?: string;
  eligibility: string[];
  keyRequirements: string[];
  rounds: string[];
  postedDaysAgo: string;
  featured?: boolean;
}

export interface CandidateApplication {
  id: string;
  jobId?: string;
  jobTitle?: string;
  company?: string;
  fullName: string;
  phone: string;
  email: string;
  experience: string;
  highestQualification: string;
  currentLocation: string;
  sectorPreference: 'IT' | 'Non-IT' | 'Healthcare';
  resumeLink?: string;
  additionalNotes?: string;
  submittedAt: string;
  status: 'New' | 'Screened' | 'Scheduled for Drive' | 'Selected';
}

export interface MockBookingSubmission {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  targetRole: string;
  targetSector: 'IT' | 'Non-IT' | 'Healthcare';
  preferredDate: string;
  preferredTimeSlot: string;
  focusModule: string;
  currentStruggle?: string;
  submittedAt: string;
  status: 'Pending Slot' | 'Confirmed' | 'Completed';
}

export interface ReferralSubmission {
  id: string;
  referrerName: string;
  referrerPhone: string;
  referrerUpiOrEmail?: string;
  candidateName: string;
  candidatePhone: string;
  candidateEmail?: string;
  candidateExperience: string;
  targetRoleOrSector: string;
  candidateQualification: string;
  notes?: string;
  submittedAt: string;
  bonusStatus: 'Submitted' | 'Interview In-Progress' | 'Placed - Bonus Eligible' | 'Bonus Disbursed';
  bonusAmountEstimate?: string;
}

export interface CorporateInquiry {
  id: string;
  companyName: string;
  hrContactName: string;
  officialEmail: string;
  phone: string;
  domain: 'IT & Cloud' | 'Non-IT & Voice Support' | 'Healthcare & Medical Billing' | 'Bulk Multi-Discipline';
  headcountNeeded: string;
  timeline: string;
  locationPreference: string;
  requirements: string;
  submittedAt: string;
  status: 'New Lead' | 'Discovery Call Scheduled' | 'Contract Signed';
}

export interface PlacementTestimonial {
  id: string;
  candidateName: string;
  initials: string;
  placedCompany: string;
  role: string;
  packageCTC: string;
  sector: 'IT' | 'Non-IT' | 'Healthcare';
  location: string;
  batchYear: string;
  quote: string;
  mentorFeedback: string;
  verificationBadge: string;
}

export interface MockPrepModule {
  id: string;
  title: string;
  badge: string;
  iconName: string;
  duration: string;
  description: string;
  keyTopics: string[];
  deliverables: string[];
  popularFor: string;
}
