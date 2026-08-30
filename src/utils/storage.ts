import { CandidateApplication, MockBookingSubmission, ReferralSubmission, CorporateInquiry } from '../types';

const STORAGE_KEYS = {
  APPLICATIONS: 'talentrise_applications_v1',
  MOCK_BOOKINGS: 'talentrise_mock_bookings_v1',
  REFERRALS: 'talentrise_referrals_v1',
  CORPORATE_INQUIRIES: 'talentrise_corporate_inquiries_v1',
};

// Seed sample applications
const INITIAL_APPLICATIONS: CandidateApplication[] = [
  {
    id: 'app-101',
    jobId: 'drive-tp-google',
    jobTitle: 'Customer Support Executive (Google Ads / Process)',
    company: 'Teleperformance',
    fullName: 'Ananya Deshmukh',
    phone: '+91 98490 11234',
    email: 'ananya.deshmukh@gmail.com',
    experience: 'Fresher (2024 Passout)',
    highestQualification: 'B.Com Computers',
    currentLocation: 'Hyderabad (Kukatpally)',
    sectorPreference: 'Non-IT',
    resumeLink: 'https://drive.google.com/file/d/sample-ananya-resume/view',
    additionalNotes: 'Fluent in English and Hindi. Available for direct walk-in this Friday.',
    submittedAt: new Date(Date.now() - 2 * 3600000).toISOString(),
    status: 'Scheduled for Drive',
  },
  {
    id: 'app-102',
    jobId: 'drive-kyndryl-cloud',
    jobTitle: 'Cloud Infrastructure & L1 Systems Support Engineer',
    company: 'Kyndryl Enterprise',
    fullName: 'Venkata Sai Kumar',
    phone: '+91 81254 99887',
    email: 'venkata.saikumar@yahoo.com',
    experience: '1.8 Years',
    highestQualification: 'B.Tech CSE',
    currentLocation: 'Hyderabad (Madhapur)',
    sectorPreference: 'IT',
    resumeLink: 'https://drive.google.com/file/d/sample-saikumar/view',
    additionalNotes: 'AWS Certified Cloud Practitioner with basic Linux scripting skills.',
    submittedAt: new Date(Date.now() - 5 * 3600000).toISOString(),
    status: 'Screened',
  },
  {
    id: 'app-103',
    jobId: 'drive-healthcare-medical-billing',
    jobTitle: 'US Healthcare AR Caller & Medical Billing Associate',
    company: 'Access Healthcare Process',
    fullName: 'Rhea Christina',
    phone: '+91 97033 44556',
    email: 'rhea.christina@outlook.com',
    experience: '0.6 Years (AR Trainee)',
    highestQualification: 'B.Pharm (2023)',
    currentLocation: 'Secunderabad',
    sectorPreference: 'Healthcare',
    resumeLink: 'https://drive.google.com/file/d/sample-rhea/view',
    additionalNotes: 'Comfortable with US night shifts and home cab drops.',
    submittedAt: new Date(Date.now() - 9 * 3600000).toISOString(),
    status: 'New',
  },
  {
    id: 'app-104',
    jobId: 'drive-accenture-customer-support',
    jobTitle: 'Customer Experience Associate (International Voice)',
    company: 'Accenture Operations',
    fullName: 'Siddharth Rao',
    phone: '+91 99890 22331',
    email: 'sid.rao@gmail.com',
    experience: '2.5 Years (International BPO)',
    highestQualification: 'BBA',
    currentLocation: 'Hyderabad (Banjara Hills)',
    sectorPreference: 'Non-IT',
    resumeLink: 'https://drive.google.com/file/d/sample-siddharth/view',
    additionalNotes: 'Versant score 65+ on previous assessment.',
    submittedAt: new Date(Date.now() - 14 * 3600000).toISOString(),
    status: 'Selected',
  }
];

const INITIAL_MOCK_BOOKINGS: MockBookingSubmission[] = [
  {
    id: 'mock-201',
    fullName: 'Harsha Vardhan Reddy',
    phone: '+91 90300 88776',
    email: 'harsha.v@gmail.com',
    targetRole: 'Google Process / Customer Support',
    targetSector: 'Non-IT',
    preferredDate: 'Tomorrow',
    preferredTimeSlot: '5:00 PM – 6:00 PM',
    focusModule: 'Versant, SVAR & Voice & Accent Assessment Coaching',
    currentStruggle: 'Getting stuck during repeat sentence and story retelling audio sections.',
    submittedAt: new Date(Date.now() - 3 * 3600000).toISOString(),
    status: 'Confirmed',
  },
  {
    id: 'mock-202',
    fullName: 'Naveen Chandra',
    phone: '+91 88866 54321',
    email: 'naveen.tech@gmail.com',
    targetRole: 'React & Node.js Developer',
    targetSector: 'IT',
    preferredDate: 'This Saturday',
    preferredTimeSlot: '11:00 AM – 12:00 PM',
    focusModule: 'Technical Fundamentals & Scenario-Based Interview Simulation',
    currentStruggle: 'Explaining state management and asynchronous lifecycle optimizations.',
    submittedAt: new Date(Date.now() - 7 * 3600000).toISOString(),
    status: 'Pending Slot',
  }
];

const INITIAL_REFERRALS: ReferralSubmission[] = [
  {
    id: 'ref-301',
    referrerName: 'Karthik Varma (Alumni)',
    referrerPhone: '+91 98480 99881',
    referrerUpiOrEmail: 'karthik.varma@okaxis',
    candidateName: 'Akash Goud',
    candidatePhone: '+91 80088 12345',
    candidateEmail: 'akash.goud@gmail.com',
    candidateExperience: 'Fresher (B.Sc)',
    targetRoleOrSector: 'Customer Support / Google Process',
    candidateQualification: 'B.Sc Statistics (2024)',
    notes: 'Very energetic speaker with strong English fluency.',
    submittedAt: new Date(Date.now() - 6 * 3600000).toISOString(),
    bonusStatus: 'Interview In-Progress',
    bonusAmountEstimate: '₹2,000 Bonus on Closure',
  },
  {
    id: 'ref-302',
    referrerName: 'Sai Teja Mandava',
    referrerPhone: '+91 91212 34567',
    referrerUpiOrEmail: 'saiteja@paytm',
    candidateName: 'Tarun Kumar',
    candidatePhone: '+91 94400 67890',
    candidateEmail: 'tarun.kumar@gmail.com',
    candidateExperience: '2 Years Linux Support',
    targetRoleOrSector: 'Kyndryl Cloud Systems',
    candidateQualification: 'B.Tech IT',
    notes: 'Completed L1 round, awaiting client final offer.',
    submittedAt: new Date(Date.now() - 18 * 3600000).toISOString(),
    bonusStatus: 'Placed - Bonus Eligible',
    bonusAmountEstimate: '₹3,500 Bonus on Closure',
  }
];

const INITIAL_CORPORATE_INQUIRIES: CorporateInquiry[] = [
  {
    id: 'corp-401',
    companyName: 'Apex Cloud Solutions Pvt Ltd',
    hrContactName: 'Madhavan Nair (Lead Talent Acquisition)',
    officialEmail: 'm.nair@apexcloud.io',
    phone: '+91 98200 44550',
    domain: 'IT & Cloud',
    headcountNeeded: '15 – 25 Engineers',
    timeline: 'Immediate (Next 15 Days)',
    locationPreference: 'Hyderabad (Hitec City)',
    requirements: 'Need prescreened L1/L2 Linux & AWS support engineers with excellent communication.',
    submittedAt: new Date(Date.now() - 12 * 3600000).toISOString(),
    status: 'Discovery Call Scheduled',
  },
  {
    id: 'corp-402',
    companyName: 'MedCore RCM Healthcare Services',
    hrContactName: 'Sunita Rao (Head of Operations)',
    officialEmail: 'sunita.rao@medcoreglobal.com',
    phone: '+91 97000 88991',
    domain: 'Healthcare & Medical Billing',
    headcountNeeded: '30 – 50 AR Callers',
    timeline: 'Within 30 Days',
    locationPreference: 'Hyderabad / Begumpet',
    requirements: 'Bulk fresher batches with Life Sciences or Commerce degree for night shift US AR caller batch.',
    submittedAt: new Date(Date.now() - 20 * 3600000).toISOString(),
    status: 'New Lead',
  }
];

export function getApplications(): CandidateApplication[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(INITIAL_APPLICATIONS));
      return INITIAL_APPLICATIONS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_APPLICATIONS;
  }
}

export function saveApplication(app: Omit<CandidateApplication, 'id' | 'submittedAt' | 'status'> & { id?: string; submittedAt?: string; status?: CandidateApplication['status'] }): CandidateApplication {
  const current = getApplications();
  const newRecord: CandidateApplication = {
    id: app.id || `app-${Date.now()}`,
    submittedAt: app.submittedAt || new Date().toISOString(),
    status: app.status || 'New',
    fullName: app.fullName,
    phone: app.phone,
    email: app.email,
    experience: app.experience,
    highestQualification: app.highestQualification,
    currentLocation: app.currentLocation,
    sectorPreference: app.sectorPreference,
    jobId: app.jobId,
    jobTitle: app.jobTitle,
    company: app.company,
    resumeLink: app.resumeLink,
    additionalNotes: app.additionalNotes,
  };
  const updated = [newRecord, ...current];
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(updated));
  return newRecord;
}

export function updateApplicationStatus(id: string, status: CandidateApplication['status']): void {
  const current = getApplications();
  const updated = current.map(item => item.id === id ? { ...item, status } : item);
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(updated));
}

export function getMockBookings(): MockBookingSubmission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MOCK_BOOKINGS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.MOCK_BOOKINGS, JSON.stringify(INITIAL_MOCK_BOOKINGS));
      return INITIAL_MOCK_BOOKINGS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_MOCK_BOOKINGS;
  }
}

export function saveMockBooking(booking: Omit<MockBookingSubmission, 'id' | 'submittedAt' | 'status'>): MockBookingSubmission {
  const current = getMockBookings();
  const newRecord: MockBookingSubmission = {
    id: `mock-${Date.now()}`,
    submittedAt: new Date().toISOString(),
    status: 'Pending Slot',
    ...booking,
  };
  const updated = [newRecord, ...current];
  localStorage.setItem(STORAGE_KEYS.MOCK_BOOKINGS, JSON.stringify(updated));
  return newRecord;
}

export function updateMockStatus(id: string, status: MockBookingSubmission['status']): void {
  const current = getMockBookings();
  const updated = current.map(item => item.id === id ? { ...item, status } : item);
  localStorage.setItem(STORAGE_KEYS.MOCK_BOOKINGS, JSON.stringify(updated));
}

export function getReferrals(): ReferralSubmission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.REFERRALS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.REFERRALS, JSON.stringify(INITIAL_REFERRALS));
      return INITIAL_REFERRALS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_REFERRALS;
  }
}

export function saveReferral(referral: Omit<ReferralSubmission, 'id' | 'submittedAt' | 'bonusStatus'>): ReferralSubmission {
  const current = getReferrals();
  const newRecord: ReferralSubmission = {
    id: `ref-${Date.now()}`,
    submittedAt: new Date().toISOString(),
    bonusStatus: 'Submitted',
    bonusAmountEstimate: '₹2,000 – ₹5,000 on Placement',
    ...referral,
  };
  const updated = [newRecord, ...current];
  localStorage.setItem(STORAGE_KEYS.REFERRALS, JSON.stringify(updated));
  return newRecord;
}

export function updateReferralStatus(id: string, bonusStatus: ReferralSubmission['bonusStatus']): void {
  const current = getReferrals();
  const updated = current.map(item => item.id === id ? { ...item, bonusStatus } : item);
  localStorage.setItem(STORAGE_KEYS.REFERRALS, JSON.stringify(updated));
}

export function getCorporateInquiries(): CorporateInquiry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CORPORATE_INQUIRIES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CORPORATE_INQUIRIES, JSON.stringify(INITIAL_CORPORATE_INQUIRIES));
      return INITIAL_CORPORATE_INQUIRIES;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_CORPORATE_INQUIRIES;
  }
}

export function saveCorporateInquiry(inquiry: Omit<CorporateInquiry, 'id' | 'submittedAt' | 'status'>): CorporateInquiry {
  const current = getCorporateInquiries();
  const newRecord: CorporateInquiry = {
    id: `corp-${Date.now()}`,
    submittedAt: new Date().toISOString(),
    status: 'New Lead',
    ...inquiry,
  };
  const updated = [newRecord, ...current];
  localStorage.setItem(STORAGE_KEYS.CORPORATE_INQUIRIES, JSON.stringify(updated));
  return newRecord;
}

export function updateCorporateStatus(id: string, status: CorporateInquiry['status']): void {
  const current = getCorporateInquiries();
  const updated = current.map(item => item.id === id ? { ...item, status } : item);
  localStorage.setItem(STORAGE_KEYS.CORPORATE_INQUIRIES, JSON.stringify(updated));
}

export function exportDataAsJSON(): string {
  const allData = {
    exportedAt: new Date().toISOString(),
    company: 'TalentRise Training and Placements',
    founder: 'Sandru Anudeep',
    contact: '+91 8328246487',
    applications: getApplications(),
    mockBookings: getMockBookings(),
    referrals: getReferrals(),
    corporateInquiries: getCorporateInquiries(),
  };
  return JSON.stringify(allData, null, 2);
}

export function exportApplicationsAsCSV(): string {
  const apps = getApplications();
  const headers = ['ID', 'Candidate Name', 'Phone', 'Email', 'Job Title', 'Company', 'Experience', 'Qualification', 'Location', 'Sector', 'Status', 'Submitted At'];
  const rows = apps.map(a => [
    a.id,
    `"${a.fullName}"`,
    `"${a.phone}"`,
    `"${a.email}"`,
    `"${a.jobTitle || 'General'}"`,
    `"${a.company || 'N/A'}"`,
    `"${a.experience}"`,
    `"${a.highestQualification}"`,
    `"${a.currentLocation}"`,
    `"${a.sectorPreference}"`,
    `"${a.status}"`,
    `"${new Date(a.submittedAt).toLocaleString()}"`,
  ]);
  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}
