export type Role = 'user' | 'employer' | 'admin';

export type UserType = 
  | 'veteran' 
  | 'agniveer' 
  | 'eligible_service_personnel' 
  | 'employer';

export type CareerGoal = 
  | 'find_job' 
  | 'find_internship' 
  | 'start_business' 
  | 'continue_education' 
  | 'change_industry' 
  | 'improve_skills';

export type ProfileVisibility = 'private' | 'employers' | 'application_only';

export type SupportedLanguage = 
  | 'en' // English
  | 'hi' // Hindi
  | 'kn' // Kannada
  | 'te' // Telugu
  | 'ta' // Tamil
  | 'ml' // Malayalam
  | 'mr' // Marathi
  | 'bn' // Bengali
  | 'gu' // Gujarati
  | 'pa' // Punjabi
  | 'ur'; // Urdu

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
}

export type SupportedCountry = 'IN' | 'US' | 'GB' | 'AU' | 'CA';

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  year: string;
  fieldOfStudy?: string;
  grade?: string;
}

export interface CivilianExperienceEntry {
  id: string;
  role: string;
  company: string;
  duration: string;
  location?: string;
  description: string;
  keyContributions?: string[];
}

export interface ServiceProfileData {
  id: string;
  // 1. Basic Civilian Information
  fullName: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  preferredLanguage?: SupportedLanguage | string;
  preferredJobLocation?: string;
  userType: UserType;
  headline?: string;
  linkedinOrPortfolio?: string;

  // 2. Education
  highestQualification?: string;
  schoolCollegeInstitution?: string;
  courseStream?: string;
  graduationYear?: string;
  relevantSubjects?: string;
  education?: string; // Legacy support
  educationEntries?: EducationEntry[];

  // 3. Service Experience (Non-classified, non-operational)
  serviceOrganization?: string;
  serviceBranch?: string;
  rolePosition?: string;
  yearsOfExperience: number;
  generalResponsibilities: string;
  generalSkillsDeveloped?: string[];
  certifications: string[];
  awardsAchievements?: string[];
  achievements?: string[]; // Legacy alias

  // 4. Civilian Career Information
  careerInterests?: string[];
  preferredIndustries: string[];
  preferredJobRoles?: string[];
  skills?: string[];
  civilianCertifications?: string[];
  civilianExperience?: CivilianExperienceEntry[];
  trainingCompleted?: string[];
  coursesToLearn?: string[];

  // 5. Career Goals (Detailed Descriptions)
  careerGoalDescription?: string; // "What kind of career are you looking for?"
  skillsToDevelopDescription?: string; // "What skills do you want to develop?"
  industriesInterestDescription?: string; // "What industries interest you?"
  locationsConsiderDescription?: string; // "What locations would you consider?"
  shortAndLongTermGoalsDescription?: string; // "What are your short-term and long-term career goals?"

  // Legacy ontology fields support
  generalRoleCategory?: string;
  technicalSkills?: string[];
  leadership?: string[];
  logistics?: string[];
  administration?: string[];
  maintenance?: string[];
  safety?: string[];
  training?: string[];
  communication?: string[];
  languages?: string[];
  preferredLocations?: string[];
  workPreference?: 'remote' | 'hybrid' | 'on-site' | 'flexible';
  visibility: ProfileVisibility;
  allowAiEnhancement?: boolean;
  profileCompleted: boolean;
  disabilityStatus?: {
    hasDisability: boolean;
    category?: string;
    accommodationsNeeded?: string[];
  };
  lastUpdated: string;
  isDemoData?: boolean;
  isManualEntry?: boolean;
}

export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  companyId?: string;
  location: string;
  country: string;
  state: string;
  city?: string;
  type: 'full-time' | 'contract' | 'internship' | 'part-time' | 'apprenticeship';
  sector: 'government' | 'private' | 'psu';
  workplaceType: 'on-site' | 'hybrid' | 'remote';
  industry: string;
  experienceLevel: string;
  experienceRequirements?: string;
  educationRequired?: string;
  requiredSkills?: string[];
  responsibilities?: string;
  salaryRange: string;
  minSalary?: number; // In INR for sorting/filtering
  maxSalary?: number;
  benefits?: string;
  duration?: string; // For internship/apprenticeship
  applicationDeadline?: string;
  applicationInstructions?: string;
  description: string;
  eligibilitySummary?: string;
  applicationProcess?: string;
  officialUrl?: string;
  veteranFriendlyScore: number; // 0-100
  civilianSkillsMatched: string[];
  militaryBackgroundSuitability: string[];
  postedDate: string;
  isVerifiedEmployer: boolean;
  verificationStatus?: 'verified' | 'in_review' | 'unverified';
  isAccessibleRole?: boolean;
  isVeteranFriendly?: boolean;
  isDuplicateOrFlagged?: boolean;
  scamReportsCount?: number;
  status: 'active' | 'closed';
  isDemoData: boolean;
  isCompanyAuthored?: boolean;
}

export interface JobAlert {
  id: string;
  title: string;
  roleKeywords: string;
  location: string;
  industry: string;
  opportunityType: string;
  minSalary: number;
  frequency: 'instant' | 'daily' | 'weekly';
  isActive: boolean;
  createdDate: string;
}

export interface JobReport {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  reason: 'fee_requested' | 'unverified_domain' | 'false_quota_claim' | 'duplicate_spam' | 'inaccurate_details' | 'other';
  details: string;
  reportedAt: string;
}

export interface CompanyProfile {
  id: string;
  companyName: string;
  description: string;
  industry: string;
  website: string;
  country: string;
  state: string;
  city: string;
  companySize: string; // e.g. "1-50", "51-200", "201-1000", "1000-5000", "5000+ Employees"
  recruiterName: string;
  recruiterDesignation: string;
  officialEmail: string;
  officialPhone: string;

  // Company Information & Veteran Policies
  companyInformation: string;
  veteranHiringInfo: string;
  internshipInfo: string;
  apprenticeshipInfo: string;
  accessibilityInfo: string;

  // Detailed Description Areas
  workplaceDescription?: string;
  careerOpportunitiesDescription?: string;
  skillsLookedForDescription?: string;
  veteranInitiativesDescription?: string;
  internshipProgramsDescription?: string;
  apprenticeshipProgramsDescription?: string;
  trainingOpportunitiesDescription?: string;
  applicationProcessDescription?: string;

  // Verification & Metadata
  cinGstin?: string;
  hqLocation?: string;
  verificationStatus: 'verified' | 'in_review' | 'unverified';
  veteranHiringPledge: boolean;
  totalOpenings?: number;
  reservedCohortQuota?: string;
  workplaceAccommodationsOffered?: string[];
  lastAuditDate?: string;
  isDemoData?: boolean;
  isCompanyAuthored?: boolean;
  lastUpdated?: string;
}

export interface GovernmentScheme {
  id: string;
  title: string;
  agency: string;
  country: string;
  stateOrRegion?: string;
  schemeType: 'central' | 'state';
  category: 'resettlement' | 'education' | 'entrepreneurship' | 'pension_welfare' | 'skill_training' | 'jobs' | 'disability' | 'training' | 'self_employment' | 'welfare';
  targetBeneficiaries: string[];
  benefitsSummary: string;
  eligibilityCriteria: string[];
  applicationProcess: string;
  applicationSteps?: string[];
  documentsRequired?: string[];
  officialPortalUrl: string;
  lastVerifiedDate: string;
  isDemoData: boolean;
}

export interface LearningCourse {
  id: string;
  title: string;
  provider: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  civilianSkillGroup: string;
  isFree: boolean;
  certificationOffered: boolean;
  description: string;
  isDemoData: boolean;
}

export interface ApplicationRecord {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  appliedDate: string;
  status: 'submitted' | 'under_review' | 'interview_scheduled' | 'interview' | 'selected' | 'rejected' | 'archived' | 'saved' | 'applied';
  stage?: 'saved' | 'applied' | 'interview' | 'selected' | 'rejected';
  resumeVersion: string;
  notes: string;
  interviewDate?: string;
  interviewMode?: 'virtual' | 'on-site' | 'phone';
  consentProvided?: boolean;
  feedback?: string;
  lastUpdated?: string;
  isDemoData: boolean;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  target: string;
  severity: 'info' | 'warning' | 'critical';
  details: string;
}

export interface SystemHealthMetric {
  service: string;
  status: 'healthy' | 'degraded' | 'offline';
  latencyMs: number;
  uptimePercent: number;
  lastChecked: string;
}

export type AppRoute =
  // Public
  | 'landing'
  | 'how_it_works'
  | 'about'
  | 'for_employers'
  | 'privacy'
  | 'terms'
  | 'contact'
  // User
  | 'dashboard'
  | 'transition_plan'
  | 'service_profile'
  | 'skill_translator'
  | 'career_matches'
  | 'jobs'
  | 'internships'
  | 'government_schemes'
  | 'learning_hub'
  | 'resume_builder'
  | 'cover_letter'
  | 'interview_coach'
  | 'valor_ai'
  | 'applications'
  | 'saved_jobs'
  | 'messages'
  | 'notifications'
  | 'profile_settings'
  | 'privacy_center'
  | 'veteran_help_center'
  | 'disability_support'
  // Employer
  | 'employer_dashboard'
  | 'company_profile'
  | 'create_job'
  | 'manage_jobs'
  | 'candidate_search'
  | 'employer_applications'
  | 'employer_messages'
  | 'employer_verification'
  // Admin
  | 'admin_dashboard'
  | 'user_management'
  | 'employer_verification_admin'
  | 'job_verification'
  | 'scheme_management'
  | 'reports'
  | 'audit_logs'
  | 'content_management'
  | 'system_health';
