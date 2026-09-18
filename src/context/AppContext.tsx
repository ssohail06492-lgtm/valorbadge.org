import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  AppRoute, 
  Role, 
  SupportedLanguage, 
  SupportedCountry, 
  ServiceProfileData, 
  ApplicationRecord,
  JobOpportunity,
  JobAlert,
  JobReport,
  CompanyProfile
} from '../types';
import { DEMO_APPLICATIONS, DEMO_JOBS, DEMO_COMPANIES } from '../lib/demoData';
import { translate } from '../lib/i18n';
import { AuthSession, getStoredAuthSession, saveAuthSession, clearAuthSession } from '../lib/security';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'job' | 'scheme' | 'system' | 'message';
}

interface MessageThread {
  id: string;
  recipientName: string;
  companyName: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  messages: {
    id: string;
    sender: 'user' | 'other';
    text: string;
    timestamp: string;
  }[];
}

interface AppContextType {
  currentRoute: AppRoute;
  setCurrentRoute: (route: AppRoute) => void;
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  country: SupportedCountry;
  setCountry: (country: SupportedCountry) => void;
  profile: ServiceProfileData;
  updateProfile: (updates: Partial<ServiceProfileData>) => void;
  resetProfileToManual: () => void;
  loadDemoProfile: () => void;
  savedJobIds: string[];
  toggleSaveJob: (jobId: string) => void;
  applications: ApplicationRecord[];
  submitApplication: (jobId: string, jobTitle: string, companyName: string) => void;
  submitApplicationWithConsent: (jobId: string, jobTitle: string, companyName: string, consentGranted: boolean, resumeVersion?: string, notes?: string) => void;
  updateApplicationStage: (appId: string, stage: ApplicationRecord['stage'], notes?: string, interviewDate?: string) => void;
  withdrawApplication: (appId: string) => void;
  jobs: JobOpportunity[];
  addJobPosting: (job: Omit<JobOpportunity, 'id' | 'postedDate' | 'isDemoData'>) => void;
  updateJobPosting: (jobId: string, updates: Partial<JobOpportunity>) => void;
  deleteJobPosting: (jobId: string) => void;
  jobAlerts: JobAlert[];
  createJobAlert: (alert: Omit<JobAlert, 'id' | 'createdDate'>) => void;
  toggleJobAlert: (id: string) => void;
  deleteJobAlert: (id: string) => void;
  jobReports: JobReport[];
  reportJobScam: (report: Omit<JobReport, 'id' | 'reportedAt'>) => void;
  companies: CompanyProfile[];
  updateCompanyProfile: (companyId: string, updates: Partial<CompanyProfile>) => void;
  resetCompanyToManual: (companyId: string) => void;
  loadDemoCompany: (companyId: string) => void;
  reducedMotion: boolean;
  setReducedMotion: (val: boolean) => void;
  largeText: boolean;
  setLargeText: (val: boolean) => void;
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (val: boolean) => void;
  isLoadingSequence: boolean;
  triggerLoadingSequence: () => void;
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
  messages: MessageThread[];
  sendUserMessage: (threadId: string, text: string) => void;
  exportUserData: () => void;
  deleteAccountData: () => void;
  resetAllData: () => void;
  adminErrorAlert: string | null;
  setAdminErrorAlert: (msg: string | null) => void;
  t: (keyOrText: string) => string;
  authSession: AuthSession;
  login: (role: Role, email?: string, name?: string) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (val: boolean) => void;
  isSecuritySettingsOpen: boolean;
  setIsSecuritySettingsOpen: (val: boolean) => void;
  hasConsentedToPrivacy: boolean;
  setHasConsentedToPrivacy: (val: boolean) => void;
}

export const DEFAULT_PROFILE: ServiceProfileData = {
  id: 'usr_mock_001',
  // 1. Basic Civilian Information
  fullName: 'Rajesh K. Verma',
  email: 'rajesh.verma@example.com',
  phone: '+91 98765 43210',
  country: 'India',
  state: 'Karnataka',
  city: 'Bengaluru',
  preferredLanguage: 'English',
  preferredJobLocation: 'Bengaluru (Hybrid / On-site)',
  userType: 'veteran',
  headline: 'Ex-Junior Commissioned Officer (JCO) | Logistics & Supply Chain Operations Lead',
  linkedinOrPortfolio: 'https://linkedin.com/in/rajesh-verma-logistics-demo',

  // 2. Education
  highestQualification: 'Bachelor of Technology (Mechanical)',
  schoolCollegeInstitution: 'College of Military Engineering / Jawaharlal Nehru University',
  courseStream: 'Mechanical Engineering & Material Science',
  graduationYear: '2016',
  relevantSubjects: 'Thermodynamics, Industrial Automation, Workshop Technology, Supply Chain Management',
  education: 'Bachelor of Technology (Mechanical)',
  educationEntries: [
    {
      id: 'edu-1',
      degree: 'Bachelor of Technology (Mechanical)',
      institution: 'College of Military Engineering / JNU',
      year: '2016',
      fieldOfStudy: 'Mechanical Engineering & Material Systems',
      grade: 'First Class with Distinction'
    },
    {
      id: 'edu-2',
      degree: 'Senior Secondary Certificate (10+2 Science)',
      institution: 'Kendriya Vidyalaya ASC Centre',
      year: '2012',
      fieldOfStudy: 'Physics, Chemistry, Mathematics',
      grade: '88.4%'
    }
  ],

  // 3. Service Experience (Non-classified, civilian translated)
  serviceOrganization: 'Indian Army',
  serviceBranch: 'Army Service Corps (ASC)',
  rolePosition: 'Subedar / JCO In-charge (Quartermaster Depot Operations)',
  yearsOfExperience: 9,
  generalResponsibilities: 'Directed end-to-end supply chain logistics, distribution fleet operations, material inventory audits, and safety compliance across regional depot nodes.',
  generalSkillsDeveloped: [
    'Multi-node Freight Scheduling',
    'Inventory Accounting & Reconciliation',
    'Fleet Maintenance Protocols',
    'Zero-Incident Safety Adherence',
    'Crisis Resource Allocation'
  ],
  certifications: [
    'Six Sigma Green Belt (Civilian Equivalence)',
    'Certificate in Supply Chain Fundamentals',
    'ISO 9001:2015 Quality Management Auditor'
  ],
  awardsAchievements: [
    'General Officer Commanding-in-Chief Commendation Card for Logistics Efficiency',
    'Zero-Deficit Material Audit Citation (3 Consecutive Financial Years)'
  ],
  achievements: [
    'General Officer Commanding-in-Chief Commendation Card for Logistics Efficiency',
    'Zero-Deficit Material Audit Citation (3 Consecutive Financial Years)'
  ],

  // 4. Civilian Career Information
  careerInterests: ['Supply Chain Logistics', 'Fleet Management', 'Warehouse Operations Command', 'Operational Excellence'],
  preferredIndustries: ['Logistics & Supply Chain', 'E-Commerce Fulfillment', 'Automotive & Heavy Manufacturing', 'Infrastructure'],
  preferredJobRoles: ['Logistics Operations Manager', 'Supply Chain Lead', 'Fleet Safety Manager', 'Distribution Hub Director'],
  skills: [
    'ERP / SAP Material Management (MM)',
    'Fleet Telematics & Route Optimization',
    'Vendor SLA Governance',
    'Budget & Resource Forecasting',
    'Cross-functional Team Leadership'
  ],
  civilianCertifications: [
    'APICS Certified Supply Chain Professional (In Progress)',
    'National Safety Council Industrial Safety Certification'
  ],
  civilianExperience: [
    {
      id: 'civ-exp-1',
      role: 'Logistics Operations Consultant (Transition Fellowship)',
      company: 'Karnataka Regional Supply Consortium',
      duration: 'Nov 2025 - Present',
      location: 'Bengaluru, Karnataka',
      description: 'Consulted on regional depot throughput optimization, standard operating procedures, and truck turnaround time reduction.',
      keyContributions: [
        'Reduced freight turnaround cycle times by 18% across 4 primary transit yards',
        'Introduced barcode scanning protocols replacing legacy manual manifests'
      ]
    }
  ],
  trainingCompleted: [
    'Advanced Supply Chain Strategy & ERP Logistics',
    'Civilian Executive Leadership & Communication',
    'Occupational Health & Environmental Safety (OHSAS)'
  ],
  coursesToLearn: [
    'AI-driven Predictive Supply Chain & Inventory Automation',
    'Corporate ESG Reporting & Sustainable Fleet Transitions'
  ],

  // 5. Career Goals (Detailed Descriptions)
  careerGoalDescription: 'Seeking a senior managerial role in supply chain operations, fulfillment logistics, or plant operations where my 9 years of disciplined military convoy, inventory, and depot command translate directly into high-efficiency, cost-optimized civilian outcomes.',
  skillsToDevelopDescription: 'Deepen proficiency in enterprise cloud ERP systems (SAP S/4HANA), data-driven telematics visualization, and modern green-logistics fleet electrification.',
  industriesInterestDescription: 'Primarily interested in fast-growing third-party logistics (3PL), e-commerce fulfillment networks, defense manufacturing offsets, and automated warehouse hubs.',
  locationsConsiderDescription: 'Prefer Bengaluru, Pune, Hyderabad, or Chennai, with openness to hybrid or regional travel as needed.',
  shortAndLongTermGoalsDescription: 'Short-term (1-2 years): Excel as an Operations Hub or Fleet Logistics Manager delivering 99.5%+ SLA compliance and seamless team integration. Long-term (3-5 years): Advance to Regional Director of Supply Chain or Vice President of Operations overseeing multi-state logistics infrastructure.',

  // Legacy fields
  generalRoleCategory: 'Army Service Corps / Quartermaster Logistics',
  technicalSkills: ['Multi-node Supply Chain', 'Inventory Audit', 'Vendor Management', 'Fleet Telemetry'],
  leadership: ['Team Leadership (35 Personnel)', 'Crisis Management', 'Operational Discipline', 'Mentoring Junior Cadres'],
  logistics: ['Inventory Accounting', 'Depot Storage Protocol', 'Cold Chain Distribution', 'Freight Scheduling'],
  administration: ['Standard Operating Procedures', 'Budget Allocation', 'Statutory Records Maintenance'],
  maintenance: ['Preventative Fleet Maintenance', 'Equipment Readiness Checks'],
  safety: ['Hazardous Materials Handling', 'Zero-Accident Protocol Compliance', 'Emergency Evacuation Drills'],
  training: ['Technical Onboarding', 'Safety Drills Facilitation'],
  communication: ['Clear Executive Briefings', 'Cross-Department Coordination'],
  languages: ['English', 'Hindi', 'Kannada'],
  preferredLocations: ['Bengaluru', 'Pune', 'Hyderabad'],
  workPreference: 'hybrid',
  visibility: 'employers',
  allowAiEnhancement: true,
  profileCompleted: true,
  hasConsentedToPrivacy: true,
  consentTimestamp: '2026-03-12T10:00:00.000Z',
  lastUpdated: '2026-03-12',
  isDemoData: true,
  isManualEntry: false
};

export const EMPTY_MANUAL_PROFILE: ServiceProfileData = {
  id: 'usr_manual_entry',
  fullName: '',
  email: '',
  phone: '',
  country: 'India',
  state: '',
  city: '',
  preferredLanguage: 'English',
  preferredJobLocation: '',
  userType: 'veteran',
  highestQualification: '',
  schoolCollegeInstitution: '',
  courseStream: '',
  graduationYear: '',
  relevantSubjects: '',
  educationEntries: [],
  serviceOrganization: '',
  serviceBranch: '',
  rolePosition: '',
  yearsOfExperience: 0,
  generalResponsibilities: '',
  generalSkillsDeveloped: [],
  certifications: [],
  awardsAchievements: [],
  careerInterests: [],
  preferredIndustries: [],
  preferredJobRoles: [],
  skills: [],
  civilianCertifications: [],
  civilianExperience: [],
  trainingCompleted: [],
  coursesToLearn: [],
  careerGoalDescription: '',
  skillsToDevelopDescription: '',
  industriesInterestDescription: '',
  locationsConsiderDescription: '',
  shortAndLongTermGoalsDescription: '',
  generalRoleCategory: '',
  technicalSkills: [],
  leadership: [],
  logistics: [],
  administration: [],
  maintenance: [],
  safety: [],
  training: [],
  communication: [],
  languages: [],
  preferredLocations: [],
  workPreference: 'hybrid',
  visibility: 'private',
  allowAiEnhancement: false,
  profileCompleted: false,
  hasConsentedToPrivacy: false,
  lastUpdated: new Date().toISOString().split('T')[0],
  isDemoData: false,
  isManualEntry: true
};

const INITIAL_JOB_ALERTS: JobAlert[] = [
  {
    id: 'alert-1',
    title: 'Supply Chain & Operations in South India',
    roleKeywords: 'Logistics, Fleet, Operations Manager',
    location: 'Bengaluru, Hyderabad, Chennai',
    industry: 'Logistics',
    opportunityType: 'All',
    minSalary: 800000,
    frequency: 'instant',
    isActive: true,
    createdDate: '2026-03-01'
  },
  {
    id: 'alert-2',
    title: 'Agniveer Corporate Pathways & Internships',
    roleKeywords: 'Agniveer, Trainee, Apprenticeship, Junior Executive',
    location: 'Pan-India',
    industry: 'All',
    opportunityType: 'internship',
    minSalary: 350000,
    frequency: 'daily',
    isActive: true,
    createdDate: '2026-03-05'
  }
];

const INITIAL_JOB_REPORTS: JobReport[] = [
  {
    id: 'report-1',
    jobId: 'demo-job-10',
    jobTitle: 'Junior Corporate Operations Executive',
    company: 'Unverified Third-Party Staffing Agency',
    reason: 'fee_requested',
    details: 'Received an SMS requesting an upfront processing fee of ₹1,500. Suspicious unverified third-party entity.',
    reportedAt: '2026-03-11'
  }
];

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'New High-Match Job Found (96% Match)',
    message: 'Nexus Supply Chain Logistics posted "Operations & Fleet Logistics Manager" in Bengaluru matching your Quartermaster profile.',
    timestamp: '2 hours ago',
    read: false,
    type: 'job'
  },
  {
    id: 'notif-2',
    title: 'DGR Course Registration Window',
    message: 'Directorate General Resettlement online certification application window is opening soon.',
    timestamp: '1 day ago',
    read: false,
    type: 'scheme'
  },
  {
    id: 'notif-3',
    title: 'Welcome to ValorBadge',
    message: 'Your service experience has been successfully indexed into civilian-equivalent skills.',
    timestamp: '3 days ago',
    read: true,
    type: 'system'
  }
];

const INITIAL_MESSAGES: MessageThread[] = [
  {
    id: 'thread-1',
    recipientName: 'Kavita Sundaram',
    companyName: 'Nexus Supply Chain Logistics',
    lastMessage: 'Hello Rajesh, we reviewed your logistics profile and would like to schedule a conversation regarding the Fleet Operations Lead role.',
    timestamp: 'Yesterday',
    unreadCount: 1,
    messages: [
      {
        id: 'm1',
        sender: 'other',
        text: 'Hello Rajesh, thank you for your interest in Nexus Logistics. We specifically value veterans with ASC supply experience.',
        timestamp: 'Yesterday 10:15 AM'
      },
      {
        id: 'm2',
        sender: 'other',
        text: 'Hello Rajesh, we reviewed your logistics profile and would like to schedule a conversation regarding the Fleet Operations Lead role.',
        timestamp: 'Yesterday 10:18 AM'
      }
    ]
  },
  {
    id: 'thread-2',
    recipientName: 'Arjun Mehra',
    companyName: 'AeroTech Industrial Manufacturing',
    lastMessage: 'Your civilian safety translation looks very comprehensive. Could you let us know your availability next week?',
    timestamp: '3 days ago',
    unreadCount: 0,
    messages: [
      {
        id: 'm3',
        sender: 'other',
        text: 'Hi Rajesh, I noticed your certifications in safety protocols and heavy fleet readiness.',
        timestamp: '3 days ago 02:30 PM'
      },
      {
        id: 'm4',
        sender: 'user',
        text: 'Thank you Arjun. My military training focused extensively on preventative audits and zero-incident standards.',
        timestamp: '3 days ago 03:00 PM'
      },
      {
        id: 'm5',
        sender: 'other',
        text: 'Your civilian safety translation looks very comprehensive. Could you let us know your availability next week?',
        timestamp: '3 days ago 04:12 PM'
      }
    ]
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRouteState] = useState<AppRoute>('landing');
  const [currentRole, setCurrentRole] = useState<Role>('user');
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const savedLang = localStorage.getItem('valorbadge_lang') as SupportedLanguage;
      if (savedLang) return savedLang;
    } catch {
      // ignore
    }
    return 'en';
  });
  const [country, setCountry] = useState<SupportedCountry>('IN');
  const [savedJobIds, setSavedJobIds] = useState<string[]>(['demo-job-1', 'demo-job-3']);
  const [applications, setApplications] = useState<ApplicationRecord[]>(DEMO_APPLICATIONS);
  const [jobs, setJobs] = useState<JobOpportunity[]>(DEMO_JOBS);
  const [jobAlerts, setJobAlerts] = useState<JobAlert[]>(INITIAL_JOB_ALERTS);
  const [jobReports, setJobReports] = useState<JobReport[]>(INITIAL_JOB_REPORTS);
  const [companies, setCompanies] = useState<CompanyProfile[]>(DEMO_COMPANIES);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [largeText, setLargeText] = useState<boolean>(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [isLoadingSequence, setIsLoadingSequence] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [messages, setMessages] = useState<MessageThread[]>(INITIAL_MESSAGES);
  const [adminErrorAlert, setAdminErrorAlert] = useState<string | null>(null);

  // Auth & Security state
  const [authSession, setAuthSession] = useState<AuthSession>(() => getStoredAuthSession());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isSecuritySettingsOpen, setIsSecuritySettingsOpen] = useState<boolean>(false);

  // Consent & Privacy state
  const [hasConsentedToPrivacy, setHasConsentedToPrivacyState] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('valorbadge_privacy_consent');
      if (stored !== null) return stored === 'true';
    } catch {
      // ignore
    }
    return true; // default demo is consented
  });

  const setHasConsentedToPrivacy = (val: boolean) => {
    setHasConsentedToPrivacyState(val);
    try {
      localStorage.setItem('valorbadge_privacy_consent', String(val));
    } catch {
      // ignore
    }
    if (val) {
      updateProfile({ hasConsentedToPrivacy: true, consentTimestamp: new Date().toISOString() });
    }
  };

  const t = (keyOrText: string) => translate(keyOrText, language);

  const login = (role: Role, email = 'rajesh.sharma@example.com', name = 'Subedar Rajesh Sharma (Retd.)') => {
    const newSession: AuthSession = {
      isAuthenticated: true,
      role,
      userEmail: email,
      userName: name,
      sessionExpiry: Date.now() + 24 * 60 * 60 * 1000
    };
    saveAuthSession(newSession);
    setAuthSession(newSession);
    setCurrentRole(role);
  };

  const logout = () => {
    clearAuthSession();
    setAuthSession({
      isAuthenticated: false,
      role: 'user',
      userEmail: '',
      userName: '',
      sessionExpiry: 0
    });
    setCurrentRole('user');
    setCurrentRouteState('landing');
  };

  const [profile, setProfile] = useState<ServiceProfileData>(() => {
    try {
      const saved = localStorage.getItem('valorbadge_profile');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return DEFAULT_PROFILE;
  });

  // Load language preference
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('valorbadge_lang') as SupportedLanguage;
      if (savedLang) {
        setLanguageState(savedLang);
      }
    } catch {
      // ignore
    }

    // Detect OS reduced motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReducedMotion(true);
    }
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
    try {
      localStorage.setItem('valorbadge_lang', lang);
    } catch {
      // ignore
    }
  };

  const updateProfile = (updates: Partial<ServiceProfileData>) => {
    setProfile(prev => {
      const next = { ...prev, ...updates, lastUpdated: new Date().toISOString().split('T')[0] };
      try {
        localStorage.setItem('valorbadge_profile', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const resetProfileToManual = () => {
    const cleanProfile: ServiceProfileData = {
      ...EMPTY_MANUAL_PROFILE,
      id: `usr_${Date.now()}`,
      hasConsentedToPrivacy: false
    };
    setProfile(cleanProfile);
    setHasConsentedToPrivacyState(false);
    try {
      localStorage.setItem('valorbadge_profile', JSON.stringify(cleanProfile));
      localStorage.removeItem('valorbadge_privacy_consent');
    } catch {
      // ignore
    }
  };

  const loadDemoProfile = () => {
    setProfile(DEFAULT_PROFILE);
    setHasConsentedToPrivacyState(true);
    try {
      localStorage.setItem('valorbadge_profile', JSON.stringify(DEFAULT_PROFILE));
      localStorage.setItem('valorbadge_privacy_consent', 'true');
    } catch {
      // ignore
    }
  };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobIds(prev => 
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  const submitApplication = (jobId: string, jobTitle: string, companyName: string) => {
    submitApplicationWithConsent(jobId, jobTitle, companyName, true, 'Civilian_Ops_Resume_v2.pdf');
  };

  const submitApplicationWithConsent = (
    jobId: string, 
    jobTitle: string, 
    companyName: string, 
    consentGranted: boolean, 
    resumeVersion: string = 'Civilian_Ops_Resume_v2.pdf',
    notes: string = 'Application submitted with user-controlled civilian credentials.'
  ) => {
    const newApp: ApplicationRecord = {
      id: `app-${Date.now()}`,
      jobId,
      jobTitle,
      companyName,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'submitted',
      stage: 'applied',
      resumeVersion,
      notes,
      consentProvided: consentGranted,
      lastUpdated: new Date().toISOString().split('T')[0],
      isDemoData: true
    };
    setApplications(prev => [newApp, ...prev.filter(a => a.jobId !== jobId)]);

    // Notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `Application Transmitted: ${jobTitle}`,
      message: `Your verified civilian translation was securely routed to ${companyName}. No classified defense data was exposed.`,
      timestamp: 'Just now',
      read: false,
      type: 'job'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const updateApplicationStage = (
    appId: string,
    stage: ApplicationRecord['stage'],
    notes?: string,
    interviewDate?: string
  ) => {
    setApplications(prev => prev.map(app => {
      if (app.id !== appId) return app;
      const statusMap: Record<string, ApplicationRecord['status']> = {
        saved: 'submitted',
        applied: 'submitted',
        interview: 'interview_scheduled',
        selected: 'selected',
        rejected: 'rejected'
      };
      return {
        ...app,
        stage,
        status: (stage && statusMap[stage]) || app.status,
        notes: notes !== undefined ? notes : app.notes,
        interviewDate: interviewDate !== undefined ? interviewDate : app.interviewDate,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
    }));
  };

  const withdrawApplication = (appId: string) => {
    setApplications(prev => prev.map(app => 
      app.id === appId ? { ...app, status: 'archived', lastUpdated: new Date().toISOString().split('T')[0] } : app
    ));
  };

  const addJobPosting = (newJobData: Omit<JobOpportunity, 'id' | 'postedDate' | 'isDemoData'>) => {
    const created: JobOpportunity = {
      ...newJobData,
      id: `job-${Date.now()}`,
      postedDate: 'Just now',
      isDemoData: false,
      isCompanyAuthored: true
    };
    setJobs(prev => [created, ...prev]);
  };

  const updateJobPosting = (jobId: string, updates: Partial<JobOpportunity>) => {
    setJobs(prev => prev.map(job => job.id === jobId ? { ...job, ...updates } : job));
  };

  const deleteJobPosting = (jobId: string) => {
    setJobs(prev => prev.filter(job => job.id !== jobId));
  };

  const createJobAlert = (alertData: Omit<JobAlert, 'id' | 'createdDate'>) => {
    const newAlert: JobAlert = {
      ...alertData,
      id: `alert-${Date.now()}`,
      createdDate: new Date().toISOString().split('T')[0]
    };
    setJobAlerts(prev => [newAlert, ...prev]);
    // Notify user
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: `Job Alert Activated: ${alertData.title}`,
        message: `We will notify you ${alertData.frequency} when opportunities matching "${alertData.roleKeywords}" become available.`,
        timestamp: 'Just now',
        read: false,
        type: 'job'
      },
      ...prev
    ]);
  };

  const toggleJobAlert = (id: string) => {
    setJobAlerts(prev => prev.map(a => a.id === id ? { ...a, isActive: !a.isActive } : a));
  };

  const deleteJobAlert = (id: string) => {
    setJobAlerts(prev => prev.filter(a => a.id !== id));
  };

  const reportJobScam = (reportData: Omit<JobReport, 'id' | 'reportedAt'>) => {
    const newReport: JobReport = {
      ...reportData,
      id: `rep-${Date.now()}`,
      reportedAt: new Date().toISOString().split('T')[0]
    };
    setJobReports(prev => [newReport, ...prev]);
    // Flag in jobs state
    setJobs(prev => prev.map(j => {
      if (j.id === reportData.jobId) {
        return {
          ...j,
          isDuplicateOrFlagged: true,
          scamReportsCount: (j.scamReportsCount || 0) + 1
        };
      }
      return j;
    }));
    // Security notice notification
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'Report Received — Safety Shield Active',
        message: `Thank you for reporting "${reportData.jobTitle}". Our Trust & Safety team has flagged the posting for compliance inspection. ValorBadge enforces zero fees for veterans.`,
        timestamp: 'Just now',
        read: false,
        type: 'system'
      },
      ...prev
    ]);
  };

  const updateCompanyProfile = (companyId: string, updates: Partial<CompanyProfile>) => {
    setCompanies(prev => prev.map(c => c.id === companyId ? { ...c, ...updates, lastUpdated: new Date().toISOString().split('T')[0] } : c));
  };

  const resetCompanyToManual = (companyId: string) => {
    setCompanies(prev => prev.map(c => {
      if (c.id === companyId) {
        return {
          id: c.id,
          companyName: '',
          description: '',
          industry: '',
          website: '',
          country: 'India',
          state: '',
          city: '',
          companySize: '51-200 Employees',
          recruiterName: '',
          recruiterDesignation: '',
          officialEmail: '',
          officialPhone: '',
          companyInformation: '',
          veteranHiringInfo: '',
          internshipInfo: '',
          apprenticeshipInfo: '',
          accessibilityInfo: '',
          workplaceDescription: '',
          careerOpportunitiesDescription: '',
          skillsLookedForDescription: '',
          veteranInitiativesDescription: '',
          internshipProgramsDescription: '',
          apprenticeshipProgramsDescription: '',
          trainingOpportunitiesDescription: '',
          applicationProcessDescription: '',
          verificationStatus: 'in_review',
          veteranHiringPledge: false,
          totalOpenings: 0,
          isDemoData: false,
          isCompanyAuthored: true,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return c;
    }));
  };

  const loadDemoCompany = (companyId: string) => {
    const demo = DEMO_COMPANIES.find(c => c.id === companyId) || DEMO_COMPANIES[0];
    if (demo) {
      setCompanies(prev => prev.map(c => c.id === companyId ? { ...demo, id: companyId } : c));
    }
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const sendUserMessage = (threadId: string, text: string) => {
    if (!text.trim()) return;
    setMessages(prev => prev.map(thread => {
      if (thread.id === threadId) {
        const newMsg = {
          id: `msg-${Date.now()}`,
          sender: 'user' as const,
          text: text.trim(),
          timestamp: 'Just now'
        };
        return {
          ...thread,
          lastMessage: text.trim(),
          timestamp: 'Just now',
          messages: [...thread.messages, newMsg]
        };
      }
      return thread;
    }));
  };

  const exportUserData = () => {
    const payload = {
      exportMetadata: {
        platform: 'ValorBadge',
        exportDate: new Date().toISOString(),
        formatVersion: '1.0',
        notice: 'Personal civilian career transition data export. Contains no operational or classified military data.'
      },
      profile,
      applications,
      savedJobIds,
      notifications
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ValorBadge_Data_Export_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const deleteAccountData = () => {
    localStorage.removeItem('valorbadge_profile');
    localStorage.removeItem('valorbadge_lang');
    localStorage.removeItem('valorbadge_applications');
    localStorage.removeItem('valorbadge_saved_jobs');
    localStorage.removeItem('valorbadge_alerts');
    localStorage.removeItem('valorbadge_reports');
    localStorage.removeItem('valorbadge_privacy_consent');
    setHasConsentedToPrivacyState(false);
    setProfile({
      ...DEFAULT_PROFILE,
      fullName: '',
      email: '',
      phone: '',
      city: '',
      state: '',
      skills: [],
      generalSkillsDeveloped: [],
      technicalSkills: [],
      leadership: [],
      logistics: [],
      administration: [],
      maintenance: [],
      safety: [],
      certifications: [],
      civilianExperience: [],
      educationEntries: [],
      achievements: [],
      preferredIndustries: [],
      preferredLocations: [],
      profileCompleted: false
    });
    setApplications([]);
    setSavedJobIds([]);
    setJobAlerts([]);
    setCurrentRouteState('landing');
  };

  const triggerLoadingSequence = () => {
    setIsLoadingSequence(true);
    setTimeout(() => {
      setIsLoadingSequence(false);
    }, 2400);
  };

  // Route setter with role enforcement
  const setCurrentRoute = (route: AppRoute) => {
    const adminRoutes: AppRoute[] = [
      'admin_dashboard',
      'user_management',
      'employer_verification_admin',
      'job_verification',
      'scheme_management',
      'reports',
      'audit_logs',
      'content_management',
      'system_health'
    ];

    if (adminRoutes.includes(route) && currentRole !== 'admin') {
      setAdminErrorAlert(`Access to ${route.replace(/_/g, ' ')} requires Administrator role permissions. Switch your role to Admin in the top bar to inspect these tools.`);
      return;
    }
    setAdminErrorAlert(null);
    setCurrentRouteState(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        setCurrentRoute,
        currentRole,
        setCurrentRole,
        language,
        setLanguage,
        country,
        setCountry,
        profile,
        updateProfile,
        resetProfileToManual,
        loadDemoProfile,
        savedJobIds,
        toggleSaveJob,
        applications,
        submitApplication,
        submitApplicationWithConsent,
        updateApplicationStage,
        withdrawApplication,
        jobs,
        addJobPosting,
        updateJobPosting,
        deleteJobPosting,
        jobAlerts,
        createJobAlert,
        toggleJobAlert,
        deleteJobAlert,
        jobReports,
        reportJobScam,
        companies,
        updateCompanyProfile,
        resetCompanyToManual,
        loadDemoCompany,
        reducedMotion,
        setReducedMotion,
        largeText,
        setLargeText,
        isOnboardingOpen,
        setIsOnboardingOpen,
        isLoadingSequence,
        triggerLoadingSequence,
        notifications,
        markNotificationAsRead,
        clearNotifications,
        messages,
        sendUserMessage,
        exportUserData,
        deleteAccountData,
        resetAllData: deleteAccountData,
        adminErrorAlert,
        setAdminErrorAlert,
        t,
        authSession,
        login,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isSecuritySettingsOpen,
        setIsSecuritySettingsOpen,
        hasConsentedToPrivacy,
        setHasConsentedToPrivacy
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
