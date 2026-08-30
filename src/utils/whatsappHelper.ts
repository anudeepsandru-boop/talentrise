/**
 * TalentRise Training and Placements WhatsApp Integration Utility
 * Direct line to Founder & CEO: Sandru Anudeep (+91 8328246487)
 */

export const RECRUITER_WHATSAPP_NUMBER = '918328246487';
export const DISPLAY_PHONE = '+91 8328246487';
export const RAW_PHONE = '8328246487';
export const FOUNDER_NAME = 'Sandru Anudeep';
export const COMPANY_NAME = 'TalentRise Training and Placements';
export const LOCATION_HQ = 'Hyderabad, Telangana, India';

export function createWhatsAppUrl(message: string): string {
  const cleanMessage = message.trim();
  const encoded = encodeURIComponent(cleanMessage);
  return `https://wa.me/${RECRUITER_WHATSAPP_NUMBER}?text=${encoded}`;
}

export function openWhatsApp(message: string): void {
  const url = createWhatsAppUrl(message);
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function generateJobQuickApplyMessage(jobTitle: string, company: string, ctc: string, location: string): string {
  return `Hello Sandru Anudeep Sir,

I am interested in applying for the active drive via TalentRise:
📌 *Role*: ${jobTitle}
🏢 *Company / Process*: ${company}
💰 *Package*: ${ctc}
📍 *Location*: ${location}

Please share the walk-in / screening schedule and eligibility criteria. Here are my quick details:
- Name: 
- Total Experience: 
- Current Location: 
- Highest Qualification: 
- Available for Immediate Join / Drive: Yes

Looking forward to your guidance!`;
}

export function generateApplicationSubmitMessage(data: {
  fullName: string;
  phone: string;
  email: string;
  jobTitle?: string;
  company?: string;
  experience: string;
  highestQualification: string;
  sectorPreference: string;
  resumeLink?: string;
}): string {
  return `*New Candidate Application | TalentRise Portal*

*Candidate Name*: ${data.fullName}
*Phone*: ${data.phone}
*Email*: ${data.email}
*Target Role*: ${data.jobTitle || 'General Pool'} (${data.company || data.sectorPreference})
*Experience*: ${data.experience}
*Qualification*: ${data.highestQualification}
*Sector*: ${data.sectorPreference}
${data.resumeLink ? `*Resume Link*: ${data.resumeLink}` : ''}

Hello Sandru Anudeep Sir, I have submitted my profile on the TalentRise portal. Kindly review and let me know the next drive slot.`;
}

export function generateMockPrepMessage(data: {
  fullName: string;
  phone: string;
  targetRole: string;
  targetSector: string;
  focusModule: string;
  preferredDate?: string;
  preferredSlot?: string;
  struggle?: string;
}): string {
  return `*Mock Interview & Mentorship Booking Request*

*Candidate Name*: ${data.fullName}
*Contact*: ${data.phone}
*Target Role / Industry*: ${data.targetRole} (${data.targetSector})
*Focus Module*: ${data.focusModule}
*Preferred Date/Slot*: ${data.preferredDate || 'Earliest available'} ${data.preferredSlot ? `(${data.preferredSlot})` : ''}
${data.struggle ? `*Key Area of Focus*: ${data.struggle}` : ''}

Hello Sandru Anudeep Sir, I would like to schedule a 1-on-1 mock interview preparation session with you. Please confirm your available slot.`;
}

export function generateReferralMessage(data: {
  referrerName: string;
  referrerPhone: string;
  candidateName: string;
  candidatePhone: string;
  candidateExperience: string;
  targetRole: string;
}): string {
  return `*Candidate Referral Submission | TalentRise Bonus Program*

*Referrer Name*: ${data.referrerName}
*Referrer Contact*: ${data.referrerPhone}

*Referred Candidate Details*:
- Candidate Name: ${data.candidateName}
- Candidate Contact: ${data.candidatePhone}
- Total Experience: ${data.candidateExperience}
- Target Role / Sector: ${data.targetRole}

Hello Sandru Anudeep Sir, I am referring this candidate for TalentRise hiring drives. Kindly initiate screening.`;
}

export function generateB2BInquiryMessage(data: {
  companyName: string;
  hrContactName: string;
  officialEmail: string;
  phone: string;
  domain: string;
  headcount: string;
  timeline: string;
}): string {
  return `*B2B Corporate Staffing Inquiry | TalentRise*

*Company / Agency*: ${data.companyName}
*HR / Point of Contact*: ${data.hrContactName}
*Official Email*: ${data.officialEmail}
*Phone*: ${data.phone}
*Hiring Domain*: ${data.domain}
*Required Headcount*: ${data.headcount}
*Target Timeline*: ${data.timeline}

Hello Sandru Anudeep Sir, our recruitment team wants to partner with TalentRise for corporate staffing / bulk hiring drives. Please share your candidate pipeline and commercials.`;
}
