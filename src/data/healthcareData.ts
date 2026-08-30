export interface HealthcareTrack {
  id: string;
  title: string;
  targetDegree: string;
  averageStartingPackage: string;
  shiftTiming: string;
  trainingDuration: string;
  coreResponsibilities: string[];
  growthPath: string[];
}

export const HEALTHCARE_TRACKS: HealthcareTrack[] = [
  {
    id: 'track-ar-caller',
    title: 'Accounts Receivable (AR) Caller & Denial Management',
    targetDegree: 'B.Pharm, B.Sc, B.Com, BBA, BA, B.Tech (All Streams)',
    averageStartingPackage: '₹2.8 LPA – ₹4.5 LPA + Performance Incentives',
    shiftTiming: 'US Shift (6:30 PM – 3:30 AM) with Doorstep Drop',
    trainingDuration: '15–21 Days Paid Domain Training by Partner MNC',
    coreResponsibilities: [
      'Calling US Health Insurance payers (Blue Cross Blue Shield, Medicare, Medicaid, UnitedHealth, Aetna) to verify claim adjudication',
      'Identifying claim denial reason codes (CO-16, PR-1, CO-45, PR-96) and initiating corrective resubmissions',
      'Resolving patient account balance disputes and working on aging accounts receivable buckets (30, 60, 90+ days)',
      'Documenting claim notes inside electronic healthcare management systems',
    ],
    growthPath: [
      'AR Trainee Associate → Senior AR Executive → Quality Analyst (QA) → Team Lead → Operations Manager',
    ],
  },
  {
    id: 'track-medical-billing',
    title: 'Medical Billing & Charge Entry Specialist',
    targetDegree: 'B.Com, B.Sc Computers, B.Pharm, Life Sciences',
    averageStartingPackage: '₹2.6 LPA – ₹4.2 LPA',
    shiftTiming: 'Semi-Night / US Shift with Safety Transport',
    trainingDuration: '2 Weeks Intensive Billing Software Training',
    coreResponsibilities: [
      'Entering patient demographic details, insurance coverage policies, and clinical charge sheets into EHR software',
      'Validating medical claim scrubbers and clearing front-end transmission errors before EDI submission',
      'Posting electronic remittance advice (ERA) and manual Explanation of Benefits (EOB) payment vouchers',
      'Reconciling co-pays, deductibles, and co-insurance amounts accurately',
    ],
    growthPath: [
      'Billing Associate → Senior Payment Poster → Revenue Cycle Specialist → Billing SME',
    ],
  },
  {
    id: 'track-medical-coding',
    title: 'Medical Coding (ICD-10-CM & CPT Specialist)',
    targetDegree: 'B.Pharm, M.Pharm, B.Sc Nursing, B.Sc Biotech, Microbiology, BDS',
    averageStartingPackage: '₹3.2 LPA – ₹5.8 LPA (₹6.5+ LPA for CPC certified)',
    shiftTiming: 'Day Shift / General Shift (8:00 AM – 5:00 PM)',
    trainingDuration: '30 Days Comprehensive Clinical Anatomy & Coding Drill',
    coreResponsibilities: [
      'Reading and translating patient medical charts, clinical procedures, and lab reports into standard ICD-10 diagnosis codes',
      'Assigning CPT / HCPCS procedure codes for inpatient and outpatient hospital encounters',
      'Ensuring strict adherence to HIPAA guidelines and American Academy of Professional Coders (AAPC) guidelines',
      'Maintaining 98%+ coding accuracy to prevent insurance claim audits',
    ],
    growthPath: [
      'Junior Coder → Certified CPC Coder → Medical Coding Auditor → Lead Trainer → RCM Consultant',
    ],
  }
];

export const US_HEALTHCARE_ADVANTAGES = [
  {
    title: 'High Career Stability & Non-Cyclical Demand',
    desc: 'US Healthcare expenditure is evergreen and resistant to typical IT hiring freezes or recessions.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Massive Fresher Hiring (Life Sciences & Commerce)',
    desc: 'Life Sciences graduates (B.Pharm/B.Sc) and Commerce graduates get instant career launches with zero prior experience.',
    icon: 'GraduationCap',
  },
  {
    title: 'Free Cab Transport & Generous Shift Allowances',
    desc: 'All US Shift processes include doorstep home drop cabs, food subsidies, and attractive monthly night shift allowances.',
    icon: 'Car',
  },
  {
    title: 'Global Certification & US Domain Expertise',
    desc: 'Opportunities for sponsored AAPC certifications (CPC, CRC, CPMA) leading to lucrative international appraisals.',
    icon: 'Award',
  },
];
