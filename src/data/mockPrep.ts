import { MockPrepModule } from '../types';

export const MOCK_PREP_MODULES: MockPrepModule[] = [
  {
    id: 'module-hr-polish',
    title: 'HR Screening & "Tell Me About Yourself" Mastery',
    badge: 'Module 1 • Foundation',
    iconName: 'UserCheck',
    duration: '45 Mins 1-on-1 Interactive Session',
    description: 'Transform your self-introduction from a robotic resume recital into an engaging career narrative that commands instant attention from MNC talent recruiters.',
    keyTopics: [
      'The 90-second "Hook-Story-Close" intro framework',
      'Handling gap years, backlogs, or career transitions with poise',
      'Articulating strengths, weaknesses, and salary expectation questions safely',
      'Body language, virtual eye contact, and video interview setup optimization',
    ],
    deliverables: [
      'Personalized script review & custom introduction cheat sheet',
      'Immediate live video feedback & tone correction',
      'Top 25 tricky HR behavioral questions question-bank',
    ],
    popularFor: 'Freshers, Career switchers & MNC Walk-in candidates',
  },
  {
    id: 'module-versant-accent',
    title: 'Versant, SVAR & Voice & Accent Assessment Coaching',
    badge: 'Module 2 • High Impact',
    iconName: 'Mic',
    duration: '60 Mins Intensive Drill',
    description: 'Cracking automated AI voice assessments (Versant, SVAR, Pearson) used across top MNC customer operations and voice drives.',
    keyTopics: [
      'Sentence mastery, repeat sentence accuracy, and phonetics tuning',
      'Eliminating Mother Tongue Influence (MTI) and fillers (uh, um, you know)',
      'Story retelling and short question instant response pacing techniques',
      'Microphone calibration and acoustic volume control secrets',
    ],
    deliverables: [
      'Real-time automated Versant test simulation score benchmark',
      'Pronunciation phonetic correction audio notes',
      'Standardized sentence repetition practice audio files',
    ],
    popularFor: 'International Voice, Customer Support & US Healthcare Voice applicants',
  },
  {
    id: 'module-tech-scenario',
    title: 'Technical Fundamentals & Scenario-Based Interview Simulation',
    badge: 'Module 3 • Tech & ITES',
    iconName: 'Code',
    duration: '60 Mins Deep Technical Drill',
    description: 'Targeted technical drill tailored for IT Engineering (CATIA, CAD, Core Design) and Software / Cloud technical roles.',
    keyTopics: [
      'Core engineering concepts and domain questioning (CATIA, CAD, Mechanical, IT)',
      'Incident management simulation: "How would you handle a down production server?"',
      'Live problem-solving clarity and whiteboard articulation',
      'Explaining real project challenges and overcoming design bottlenecks',
    ],
    deliverables: [
      'Detailed scorecard on logic, syntax, system design, and communication',
      'Curated list of client-specific technical question patterns',
      'Engineering portfolio audit and resume technical keywords optimization',
    ],
    popularFor: 'Capgemini CATIA candidates, Tech & Engineering applicants',
  },
  {
    id: 'module-salary-docs',
    title: 'Salary Negotiation & Document Verification Guidance',
    badge: 'Module 4 • Offer Stage',
    iconName: 'FileCheck',
    duration: '30 Mins Strategy Session',
    description: 'Ensure you maximize your compensation package while navigating background verification (BGV) requirements seamlessly without offer withdrawal risks.',
    keyTopics: [
      'Evaluating fixed vs. variable components, shift allowances & joining bonus',
      'Counter-offering strategies based on current market CTC standards in Hyderabad',
      'Pre-joining document readiness: relieving letters, payslips, PF passbook, EPFO UAN',
      'Handling dual offer letters and professional email resignation templates',
    ],
    deliverables: [
      'CTC breakdown calculator & negotiation email templates',
      'Pre-BGV document readiness audit checklist',
      'Immediate helpline during HR offer roll-out discussions',
    ],
    popularFor: 'Shortlisted candidates, experienced hires & multiple-offer holders',
  }
];
