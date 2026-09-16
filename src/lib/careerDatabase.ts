// Searchable Career Database, Pathway Framework & Algorithmic Matching Engine
// Covers 17 industry categories, detailed career blueprints, and side-by-side comparison

export type CareerCategory =
  | 'Engineering'
  | 'Electrical'
  | 'Electronics'
  | 'Manufacturing'
  | 'Logistics'
  | 'Operations'
  | 'IT'
  | 'Cybersecurity'
  | 'Aviation'
  | 'Administration'
  | 'Finance'
  | 'Sales'
  | 'Education'
  | 'Healthcare'
  | 'Safety'
  | 'Project Management'
  | 'Entrepreneurship';

export interface CareerDetail {
  id: string;
  title: string;
  category: CareerCategory;
  industry: string;
  overview: string;
  whyItMaySuitUser: string;
  transferableSkills: string[];
  requiredEducation: string;
  commonCertifications: string[];
  skillsRequired: string[];
  skillGaps: string[];
  recommendedLearning: {
    title: string;
    duration: string;
    level: string;
  }[];
  typicalEntryLevelRoles: string[];
  possibleProgression: {
    stage: string;
    role: string;
    timeline: string;
  }[];
  relatedJobs: string[];
  salaryBenchmark: string; // Clearly labeled as benchmark estimate
  workEnvironment: string;
  experienceLevel: string;
  pathwayExample: {
    currentExperience: string;
    transferableSkills: string;
    skillGap: string;
    learning: string;
    entryLevelCareer: string;
    experiencePhase: string;
    careerProgression: string;
  };
}

export const CAREER_DATABASE: CareerDetail[] = [
  {
    id: 'career-ops-coord',
    title: 'Operations Coordinator',
    category: 'Operations',
    industry: 'Corporate & Field Operations',
    overview: 'Coordinates cross-departmental operations, workforce rosters, shift handovers, and compliance workflows to ensure seamless daily business execution.',
    whyItMaySuitUser: 'Military personnel excel in high-accountability shift handovers, drill-like punctuality, and coordinating complex daily tasks under variable constraints.',
    transferableSkills: ['Team leadership', 'Coordination', 'Planning', 'Process management', 'Problem solving', 'Communication'],
    requiredEducation: 'Bachelor’s degree in any discipline or equivalent Armed Forces technical/administrative graduation credential.',
    commonCertifications: ['CAPM (Certified Associate in Project Management)', 'Lean Six Sigma Yellow/Green Belt'],
    skillsRequired: ['Shift Roster Scheduling', 'SOP Adherence', 'ERP/CRM Navigation', 'Vendor Coordination', 'Incident Escalation'],
    skillGaps: ['Advanced MS Excel (VLOOKUP, Pivot)', 'ERP fundamentals (SAP/Oracle)', 'Civilian Business Writing'],
    recommendedLearning: [
      { title: 'Excel for Business Operations', duration: '3 Weeks', level: 'Beginner' },
      { title: 'Enterprise Resource Planning (ERP) Introduction', duration: '4 Weeks', level: 'Beginner' },
      { title: 'Corporate Project Management Fundamentals', duration: '4 Weeks', level: 'Intermediate' }
    ],
    typicalEntryLevelRoles: ['Operations Executive', 'Facility Shift Supervisor', 'Logistics Operations Trainee'],
    possibleProgression: [
      { stage: 'Entry', role: 'Operations Associate', timeline: '0-2 Years' },
      { stage: 'Mid', role: 'Operations Coordinator', timeline: '2-5 Years' },
      { stage: 'Senior', role: 'Operations Manager', timeline: '5-8 Years' },
      { stage: 'Leadership', role: 'Director of Operations', timeline: '8+ Years' }
    ],
    relatedJobs: ['Facility Operations Lead', 'Supply Chain Coordinator', 'Shift Manager'],
    salaryBenchmark: '₹5,50,000 - ₹9,00,000 / annum (Estimate)',
    workEnvironment: 'Hybrid / On-site Corporate Hub',
    experienceLevel: '2-5 Years Service / Civilian Equivalence',
    pathwayExample: {
      currentExperience: 'Infantry / General Service Operations',
      transferableSkills: 'Team Leadership + Task Planning',
      skillGap: 'Excel + ERP Basics',
      learning: 'Modern Operations & Project Management',
      entryLevelCareer: 'Operations Coordinator',
      experiencePhase: 'Managing corporate shift cycles and client SLAs',
      careerProgression: 'Operations Manager → Head of Business Operations'
    }
  },
  {
    id: 'career-supply-chain',
    title: 'Supply Chain & Inventory Specialist',
    category: 'Logistics',
    industry: 'Logistics & Warehousing',
    overview: 'Oversees inventory reconciliation, warehouse floor throughput, freight dispatch, vendor SLA compliance, and multi-depot distribution.',
    whyItMaySuitUser: 'Veterans with quartermaster, ASC, or unit storage experience bring unmatched rigor to inventory accounting, theft prevention, and logistical timelines.',
    transferableSkills: ['Inventory management', 'Supply coordination', 'Transportation coordination', 'Planning', 'Safety awareness'],
    requiredEducation: 'Degree or Diploma in Logistics, Commerce, or Military equivalent service trade qualification.',
    commonCertifications: ['APICS CSCP / CPIM', 'Certified Logistics Technician', 'Six Sigma Green Belt'],
    skillsRequired: ['Warehouse Management Systems (WMS)', 'Cycle Counting', 'Freight Routing', 'Consignment Reconciliation', 'Cold-Chain Auditing'],
    skillGaps: ['Civilian GST E-Way Bill Regulations', 'Modern WMS software (SAP WM, Manhattan)', 'Customs Tariff Documentation'],
    recommendedLearning: [
      { title: 'Modern Supply Chain & WMS Principles', duration: '6 Weeks', level: 'Intermediate' },
      { title: 'Commercial Logistics & E-Commerce Fulfillment', duration: '4 Weeks', level: 'Intermediate' }
    ],
    typicalEntryLevelRoles: ['Inventory Controller', 'Warehouse Supervisor', 'Dispatch Officer'],
    possibleProgression: [
      { stage: 'Entry', role: 'Logistics Assistant / Inventory Executive', timeline: '0-2 Years' },
      { stage: 'Mid', role: 'Logistics Coordinator', timeline: '2-4 Years' },
      { stage: 'Senior', role: 'Logistics & Warehouse Manager', timeline: '4-7 Years' },
      { stage: 'Leadership', role: 'VP of Supply Chain & Fulfillment', timeline: '8+ Years' }
    ],
    relatedJobs: ['Warehouse Operations Lead', 'Procurement Specialist', 'Fleet Manager'],
    salaryBenchmark: '₹6,00,000 - ₹11,50,000 / annum (Estimate)',
    workEnvironment: 'Distribution Center / Central Depot / Hybrid',
    experienceLevel: '3-8 Years Service',
    pathwayExample: {
      currentExperience: 'Logistics & Quartermaster Experience',
      transferableSkills: 'Planning + Supply Coordination',
      skillGap: 'Excel + Commercial ERP',
      learning: 'WMS Certification & Supply Chain Management',
      entryLevelCareer: 'Logistics Coordinator',
      experiencePhase: 'Regional Hub Throughput & Vendor Management',
      careerProgression: 'Operations Executive → Supply Chain Director'
    }
  },
  {
    id: 'career-ehs-safety',
    title: 'Industrial Health, Safety & Environmental (HSE) Officer',
    category: 'Safety',
    industry: 'Manufacturing, Heavy Engineering & Infrastructure',
    overview: 'Enforces workplace safety standards, leads emergency evacuation protocols, investigates industrial incidents, and conducts regulatory audits.',
    whyItMaySuitUser: 'Armed forces training instills an instinctive safety-first discipline, hazard risk assessment, and crisis command during emergencies.',
    transferableSkills: ['Safety awareness', 'Risk identification', 'Compliance', 'Reporting', 'Team leadership'],
    requiredEducation: 'Degree or Diploma in Engineering, Science, or recognized Industrial Safety Diploma.',
    commonCertifications: ['NEBOSH IGC', 'IOSH Managing Safely', 'OSHA 30-Hour Compliance'],
    skillsRequired: ['Job Safety Analysis (JSA)', 'Hazard Identification & Risk Assessment (HIRA)', 'Fire Safety SOPs', 'Statutory Factory Rules'],
    skillGaps: ['Civilian Factory Act / Pollution Control Board regulations', 'NEBOSH Exam Terminology', 'Environmental ESG reporting'],
    recommendedLearning: [
      { title: 'NEBOSH International General Certificate Prep', duration: '8 Weeks', level: 'Intermediate' },
      { title: 'Civilian Industrial Safety & Incident Root Cause Analysis', duration: '4 Weeks', level: 'Beginner' }
    ],
    typicalEntryLevelRoles: ['Safety Supervisor', 'EHS Associate', 'Fire Safety Marshal'],
    possibleProgression: [
      { stage: 'Entry', role: 'Safety Executive', timeline: '0-2 Years' },
      { stage: 'Mid', role: 'EHS Officer', timeline: '2-5 Years' },
      { stage: 'Senior', role: 'Head of Industrial Safety', timeline: '5-9 Years' },
      { stage: 'Leadership', role: 'Chief Safety & Sustainability Officer', timeline: '10+ Years' }
    ],
    relatedJobs: ['Loss Prevention Manager', 'Quality & Safety Auditor', 'Risk Control Specialist'],
    salaryBenchmark: '₹7,00,000 - ₹14,00,000 / annum (Estimate)',
    workEnvironment: 'Manufacturing Plants / Infrastructure Projects / On-site',
    experienceLevel: '3-10 Years Service',
    pathwayExample: {
      currentExperience: 'Weapons / Explosives / Workshop Safety Experience',
      transferableSkills: 'Safety Awareness + Risk Identification',
      skillGap: 'NEBOSH + Factory Act Regulations',
      learning: 'Industrial EHS Certification Course',
      entryLevelCareer: 'Safety Supervisor',
      experiencePhase: 'Plant Audit & Fire Safety Drills',
      careerProgression: 'EHS Manager → Corporate Safety Director'
    }
  },
  {
    id: 'career-network-ops',
    title: 'Network Operations Center (NOC) Engineer',
    category: 'IT',
    industry: 'IT, Cloud & Telecom',
    overview: 'Monitors enterprise data center networks, diagnoses routing and connectivity incidents, handles escalation runbooks, and ensures continuous uptime.',
    whyItMaySuitUser: 'Corps of Signals and telecom operators possess deep familiarity with transmission links, antenna alignment, diagnostic telemetry, and 24/7 watchkeeping.',
    transferableSkills: ['Troubleshooting', 'Maintenance', 'Technical documentation', 'Reporting', 'Decision-making'],
    requiredEducation: 'Diploma / Degree in Electronics, Telecommunications, Computer Science, or Signals trade certificate.',
    commonCertifications: ['Cisco CCNA', 'CompTIA Network+', 'AWS Certified Cloud Practitioner'],
    skillsRequired: ['TCP/IP & OSI Model', 'Router/Switch Configuration', 'Packet Capture Diagnostics', 'Incident Ticket Management'],
    skillGaps: ['Civilian Cloud Networking (AWS VPC/Azure)', 'Enterprise SIEM Monitoring Tools (Splunk, Datadog)', 'Linux Command Line Scripting'],
    recommendedLearning: [
      { title: 'Cisco CCNA Fast-Track for Veterans', duration: '8 Weeks', level: 'Intermediate' },
      { title: 'Cloud Infrastructure & Linux Essentials', duration: '6 Weeks', level: 'Beginner' }
    ],
    typicalEntryLevelRoles: ['Junior NOC Analyst', 'Network Support Associate', 'Field Telecom Technician'],
    possibleProgression: [
      { stage: 'Entry', role: 'NOC Tier 1 Analyst', timeline: '0-2 Years' },
      { stage: 'Mid', role: 'Network Engineer (Tier 2/3)', timeline: '2-5 Years' },
      { stage: 'Senior', role: 'NOC Lead / Infrastructure Architect', timeline: '5-8 Years' },
      { stage: 'Leadership', role: 'VP of Global Infrastructure & Network Operations', timeline: '9+ Years' }
    ],
    relatedJobs: ['Telecom Infrastructure Lead', 'Systems Administrator', 'Cloud Operations Engineer'],
    salaryBenchmark: '₹6,50,000 - ₹13,00,000 / annum (Estimate)',
    workEnvironment: 'Hybrid / 24x7 Rotational NOC Hub',
    experienceLevel: '2-7 Years Service',
    pathwayExample: {
      currentExperience: 'Signals / Radio / Satellite Operations',
      transferableSkills: 'Troubleshooting + Telemetry Analysis',
      skillGap: 'Cisco CCNA + Cloud VPC',
      learning: 'Enterprise Network & Cloud Foundations',
      entryLevelCareer: 'NOC Tier-1 Analyst',
      experiencePhase: 'Incident triage and uptime maintenance',
      careerProgression: 'Senior Network Engineer → Head of Network Infrastructure'
    }
  },
  {
    id: 'career-cybersecurity-analyst',
    title: 'Information Security & SOC Analyst',
    category: 'Cybersecurity',
    industry: 'Cybersecurity & Financial Services',
    overview: 'Safeguards corporate digital assets by detecting intrusions, triaging security alerts, investigating phishing attempts, and maintaining defense runbooks.',
    whyItMaySuitUser: 'Military cyber, intelligence, and communications backgrounds align naturally with defensive mindset, threat attribution, and security perimeter vigilance.',
    transferableSkills: ['Risk identification', 'Troubleshooting', 'Compliance', 'Reporting', 'Decision-making'],
    requiredEducation: 'B.Tech/B.Sc in Computer Science, IT, or certified service cyber defense course.',
    commonCertifications: ['CompTIA Security+', 'Certified SOC Analyst (CSA)', 'CEH (Certified Ethical Hacker)'],
    skillsRequired: ['SIEM Tool Analysis', 'Threat Hunting', 'Firewall Policy Auditing', 'Phishing & Malware Triaging'],
    skillGaps: ['Commercial SIEM tools (Splunk, Microsoft Sentinel)', 'Corporate GDPR/ISO 27001 audit controls', 'Python scripting for security'],
    recommendedLearning: [
      { title: 'CompTIA Security+ Certification Boot Camp', duration: '6 Weeks', level: 'Intermediate' },
      { title: 'Hands-on SOC Analyst Lab & SIEM Fundamentals', duration: '6 Weeks', level: 'Intermediate' }
    ],
    typicalEntryLevelRoles: ['SOC Tier 1 Analyst', 'Junior Vulnerability Analyst', 'Cybersecurity Associate'],
    possibleProgression: [
      { stage: 'Entry', role: 'Junior SOC Analyst', timeline: '0-2 Years' },
      { stage: 'Mid', role: 'Incident Responder / Cyber Security Engineer', timeline: '2-5 Years' },
      { stage: 'Senior', role: 'SOC Manager / Threat Intelligence Lead', timeline: '5-8 Years' },
      { stage: 'Leadership', role: 'Chief Information Security Officer (CISO)', timeline: '8+ Years' }
    ],
    relatedJobs: ['Information Assurance Specialist', 'Network Security Engineer', 'IT Compliance Manager'],
    salaryBenchmark: '₹7,50,000 - ₹16,00,000 / annum (Estimate)',
    workEnvironment: 'Secure Operation Center (SOC) / Hybrid',
    experienceLevel: '3-8 Years Service',
    pathwayExample: {
      currentExperience: 'Signals / EW / Communications Security',
      transferableSkills: 'Risk Identification + Threat Triage',
      skillGap: 'Commercial SIEM + Python for Cyber',
      learning: 'CompTIA Security+ and Hands-on SOC Training',
      entryLevelCareer: 'Junior SOC Analyst',
      experiencePhase: 'Live alert triaging and perimeter defense',
      careerProgression: 'Cyber Incident Responder → Lead Security Architect'
    }
  },
  {
    id: 'career-plant-maintenance',
    title: 'Plant & Heavy Machinery Maintenance Engineer',
    category: 'Manufacturing',
    industry: 'Heavy Manufacturing & Automotive',
    overview: 'Directs preventative maintenance cycles, repairs hydraulic, pneumatic, and electromechanical systems, and minimizes assembly line downtime.',
    whyItMaySuitUser: 'Corps of EME, naval marine engineers, and air force technical technicians have mastered maintenance schedules, precision tool control, and zero-defect inspections.',
    transferableSkills: ['Maintenance', 'Equipment maintenance', 'Troubleshooting', 'Technical documentation', 'Safety awareness'],
    requiredEducation: 'Diploma / Degree in Mechanical, Automobile, or Electrical Engineering or equivalent service trade diploma.',
    commonCertifications: ['Certified Reliability Leader (CRL)', 'Six Sigma Green Belt', 'Hydraulics & PLC Troubleshooting'],
    skillsRequired: ['Preventative Maintenance (PM) Schedules', 'Root Cause Analysis (RCA)', 'Pneumatic & Hydraulic Circuits', 'Workshop Tool Calibration'],
    skillGaps: ['Civilian Industrial PLCs (Siemens, Allen-Bradley)', 'Total Productive Maintenance (TPM) audit documentation', 'SCADA Interfaces'],
    recommendedLearning: [
      { title: 'PLC & SCADA Automation for Maintenance Engineers', duration: '6 Weeks', level: 'Intermediate' },
      { title: 'Total Productive Maintenance (TPM) in Modern Manufacturing', duration: '4 Weeks', level: 'Beginner' }
    ],
    typicalEntryLevelRoles: ['Maintenance Engineer', 'Field Service Technician', 'Workshop Supervisor'],
    possibleProgression: [
      { stage: 'Entry', role: 'Plant Maintenance Technician / Engineer', timeline: '0-3 Years' },
      { stage: 'Mid', role: 'Maintenance Lead / Reliability Engineer', timeline: '3-6 Years' },
      { stage: 'Senior', role: 'Plant Engineering Manager', timeline: '6-9 Years' },
      { stage: 'Leadership', role: 'Vice President of Manufacturing Operations', timeline: '10+ Years' }
    ],
    relatedJobs: ['Equipment Reliability Specialist', 'Diagnostic Field Engineer', 'Toolroom Supervisor'],
    salaryBenchmark: '₹6,00,000 - ₹12,50,000 / annum (Estimate)',
    workEnvironment: 'Industrial Manufacturing Floor / Workshop',
    experienceLevel: '3-9 Years Service',
    pathwayExample: {
      currentExperience: 'EME / Armoured Vehicle / Marine Machinery Maintenance',
      transferableSkills: 'Mechanical Overhaul + Diagnostic Troubleshooting',
      skillGap: 'Industrial PLC + TPM Auditing',
      learning: 'Industrial Automation & Reliability Engineering',
      entryLevelCareer: 'Plant Maintenance Engineer',
      experiencePhase: 'Preventative cycles and downtime minimization',
      careerProgression: 'Equipment Reliability Lead → Manufacturing Operations Head'
    }
  },
  {
    id: 'career-facility-mgmt',
    title: 'Corporate Real Estate & Facility Operations Manager',
    category: 'Engineering',
    industry: 'Commercial Real Estate & Tech Campuses',
    overview: 'Manages physical security, building automation systems, diesel generator backup power, vendor contracts, and daily property operations for tech parks.',
    whyItMaySuitUser: 'Military cantonment and base engineering personnel have extensive experience managing living campuses, utility infrastructure, and vendor discipline.',
    transferableSkills: ['Team leadership', 'Coordination', 'Maintenance', 'Safety awareness', 'Office coordination'],
    requiredEducation: 'Graduate in Engineering, Science, Management, or equivalent Armed Forces credentials.',
    commonCertifications: ['Certified Facility Manager (CFM)', 'BIFM/IWFM Certification'],
    skillsRequired: ['Building Management Systems (BMS)', 'Physical Access Control', 'HVAC & Power Backup Operations', 'Vendor AMC Oversight'],
    skillGaps: ['Corporate Real Estate Lease Terminology', 'Green Building LEED/GRIHA Standards', 'Commercial Budget Allocation Tools'],
    recommendedLearning: [
      { title: 'Certified Facility Manager (CFM) Civilian Transition', duration: '8 Weeks', level: 'Intermediate' },
      { title: 'Smart Building Technologies & Energy Management', duration: '4 Weeks', level: 'Beginner' }
    ],
    typicalEntryLevelRoles: ['Assistant Facility Manager', 'Property Operations Lead', 'Infrastructure Executive'],
    possibleProgression: [
      { stage: 'Entry', role: 'Assistant Facility Manager', timeline: '0-2 Years' },
      { stage: 'Mid', role: 'Facility Operations Manager', timeline: '2-5 Years' },
      { stage: 'Senior', role: 'Senior Facilities Director', timeline: '5-9 Years' },
      { stage: 'Leadership', role: 'Head of Corporate Real Estate & Workplace Strategy', timeline: '10+ Years' }
    ],
    relatedJobs: ['Physical Security Director', 'Estate Operations Manager', 'Workplace Experience Lead'],
    salaryBenchmark: '₹8,00,000 - ₹16,00,000 / annum (Estimate)',
    workEnvironment: 'Commercial IT Park / Corporate Campus',
    experienceLevel: '4-12 Years Service',
    pathwayExample: {
      currentExperience: 'Base Administration / Military Engineer Services (MES)',
      transferableSkills: 'Campus Logistics + Facility Maintenance',
      skillGap: 'LEED Certification + Commercial Lease AMC',
      learning: 'Modern Commercial Facility Management Program',
      entryLevelCareer: 'Assistant Facility Manager',
      experiencePhase: 'Utility uptime and vendor SLA management',
      careerProgression: 'Facility Director → VP Corporate Workplace Services'
    }
  },
  {
    id: 'career-aviation-tech',
    title: 'Aviation Line Maintenance Specialist',
    category: 'Aviation',
    industry: 'Civil Aviation & MRO (Maintenance, Repair, Overhaul)',
    overview: 'Conducts pre-flight inspections, line maintenance checks, avionics diagnostics, and regulatory maintenance logs under DGCA guidelines.',
    whyItMaySuitUser: 'Air Force and Naval Aviation technicians already possess high-caliber precision, strict checklist culture, and rigorous tool tracking habits.',
    transferableSkills: ['Maintenance', 'Troubleshooting', 'Technical documentation', 'Compliance', 'Safety awareness'],
    requiredEducation: 'Diploma / Degree in Aeronautical, Mechanical, or Avionics Engineering or Air Force trade certification.',
    commonCertifications: ['DGCA Basic AME License (Category A/B)', 'Human Factors in Aviation'],
    skillsRequired: ['Aircraft Systems Troubleshooting', 'DGCA Regulatory Compliance', 'Airframe & Powerplant Inspection', 'Maintenance Log Recordkeeping'],
    skillGaps: ['Commercial Airline Fleet Specifics (Airbus A320 / Boeing 737)', 'DGCA Module Examination Papers', 'Civil Airline Maintenance Software (AMOS)'],
    recommendedLearning: [
      { title: 'DGCA Aircraft Maintenance Engineer Fast-Track Transition', duration: '12 Weeks', level: 'Advanced' },
      { title: 'Civil Aviation Quality & Human Factors Compliance', duration: '4 Weeks', level: 'Intermediate' }
    ],
    typicalEntryLevelRoles: ['Junior Aircraft Maintenance Technician', 'Avionics Shop Assistant', 'Line Maintenance Trainee'],
    possibleProgression: [
      { stage: 'Entry', role: 'Line Maintenance Technician', timeline: '0-3 Years' },
      { stage: 'Mid', role: 'Licensed Aircraft Maintenance Engineer (AME)', timeline: '3-6 Years' },
      { stage: 'Senior', role: 'Base Maintenance Manager', timeline: '6-10 Years' },
      { stage: 'Leadership', role: 'Chief Engineer / Director of Airline Quality & Safety', timeline: '10+ Years' }
    ],
    relatedJobs: ['MRO Workshop Lead', 'Avionics Calibration Engineer', 'Ground Support Equipment (GSE) Lead'],
    salaryBenchmark: '₹7,00,000 - ₹15,00,000 / annum (Estimate)',
    workEnvironment: 'Airport Hangars & Tarmac / MRO Facilities',
    experienceLevel: '4-10 Years Service',
    pathwayExample: {
      currentExperience: 'Air Force / Naval Aviation Technical Service',
      transferableSkills: 'Precision Maintenance + Checklist Discipline',
      skillGap: 'DGCA Licensing Modules + Commercial AMOS Tools',
      learning: 'Commercial Aviation Maintenance Transition Program',
      entryLevelCareer: 'Aviation Line Maintenance Technician',
      experiencePhase: 'Turnaround checks and defect rectification',
      careerProgression: 'Licensed AME → MRO Base Maintenance Manager'
    }
  },
  {
    id: 'career-project-mgr',
    title: 'Associate Project Manager',
    category: 'Project Management',
    industry: 'Technology, Consulting & Infrastructure',
    overview: 'Coordinates project timelines, tracks milestone deliverables, manages risk registers, aligns cross-functional resources, and communicates progress to stakeholders.',
    whyItMaySuitUser: 'Military missions are quintessential projects: strict deadlines, resource constraints, multi-unit coordination, and proactive risk contingency planning.',
    transferableSkills: ['Planning', 'Scheduling', 'Coordination', 'Problem solving', 'Decision-making', 'Presentation'],
    requiredEducation: 'Bachelor’s degree in any discipline.',
    commonCertifications: ['PMP (Project Management Professional)', 'CAPM', 'Scrum Master (CSM)'],
    skillsRequired: ['Work Breakdown Structure (WBS)', 'Milestone Tracking', 'Risk Register Management', 'Jira/Asana Workflow', 'Status Briefings'],
    skillGaps: ['Agile / Scrum ceremonies', 'Jira / Confluence tooling', 'Civilian Budget Earned Value Management'],
    recommendedLearning: [
      { title: 'PMP Certification Transition Course for Armed Forces', duration: '8 Weeks', level: 'Intermediate' },
      { title: 'Agile & Scrum Master Foundations with Jira', duration: '4 Weeks', level: 'Beginner' }
    ],
    typicalEntryLevelRoles: ['Project Coordinator', 'PMO Analyst', 'Scrum Master Associate'],
    possibleProgression: [
      { stage: 'Entry', role: 'Project Coordinator', timeline: '0-2 Years' },
      { stage: 'Mid', role: 'Project Manager', timeline: '2-5 Years' },
      { stage: 'Senior', role: 'Senior Program Manager', timeline: '5-8 Years' },
      { stage: 'Leadership', role: 'Director of PMO / Portfolio Strategy', timeline: '8+ Years' }
    ],
    relatedJobs: ['Program Operations Lead', 'Business Analyst', 'Delivery Manager'],
    salaryBenchmark: '₹8,00,000 - ₹17,00,000 / annum (Estimate)',
    workEnvironment: 'Hybrid / Corporate Office',
    experienceLevel: '4-10 Years Service',
    pathwayExample: {
      currentExperience: 'Military Operational Planning & Execution',
      transferableSkills: 'Strategic Planning + Resource Coordination',
      skillGap: 'Agile Scrum + Jira Project Software',
      learning: 'PMP Exam Prep & Modern Agile Frameworks',
      entryLevelCareer: 'Associate Project Coordinator',
      experiencePhase: 'Cross-functional delivery and stakeholder briefings',
      careerProgression: 'Project Manager → Portfolio Program Director'
    }
  },
  {
    id: 'career-admin-executive',
    title: 'HR Operations & General Administration Manager',
    category: 'Administration',
    industry: 'Corporate & Institutional Services',
    overview: 'Manages employee documentation, statutory labor compliance, onboarding logistics, office administrative services, and policy enforcement.',
    whyItMaySuitUser: 'Personnel branch, adjutant office, and clerk veterans possess extraordinary discretion, policy adherence, and methodical record management.',
    transferableSkills: ['Documentation', 'Reporting', 'Record management', 'Office coordination', 'Compliance'],
    requiredEducation: 'Graduate in Arts, Commerce, Business Administration or Armed Forces educational equivalence.',
    commonCertifications: ['SHRM-CP', 'Certified Administrative Professional (CAP)'],
    skillsRequired: ['HR Information Systems (HRIS)', 'Statutory Compliance (PF/ESI/Gratuity)', 'Executive Communications', 'Vendor Facilities Contracts'],
    skillGaps: ['Civilian Labor Law specifics', 'Modern HRIS software (Workday, Darwinbox)', 'Corporate Payroll Tax Structuring'],
    recommendedLearning: [
      { title: 'Civilian Corporate HR Operations & Compliance', duration: '6 Weeks', level: 'Beginner' },
      { title: 'HRIS Systems & Payroll Management Essentials', duration: '4 Weeks', level: 'Intermediate' }
    ],
    typicalEntryLevelRoles: ['HR Operations Associate', 'Executive Assistant', 'Office Coordinator'],
    possibleProgression: [
      { stage: 'Entry', role: 'HR & Admin Executive', timeline: '0-2 Years' },
      { stage: 'Mid', role: 'HR Operations Manager', timeline: '2-5 Years' },
      { stage: 'Senior', role: 'Head of People Operations', timeline: '5-9 Years' },
      { stage: 'Leadership', role: 'Chief Administrative Officer (CAO)', timeline: '9+ Years' }
    ],
    relatedJobs: ['Compliance Coordinator', 'Talent Acquisition Partner', 'Executive Office Manager'],
    salaryBenchmark: '₹5,00,000 - ₹10,00,000 / annum (Estimate)',
    workEnvironment: 'Corporate Office / Hybrid',
    experienceLevel: '3-8 Years Service',
    pathwayExample: {
      currentExperience: 'Military Personnel / Adjutant Records Duty',
      transferableSkills: 'Confidential Records + Policy Compliance',
      skillGap: 'Civilian Labor Laws + Modern HRIS Systems',
      learning: 'Corporate HR Operations & Compliance Course',
      entryLevelCareer: 'HR & Administrative Executive',
      experiencePhase: 'Onboarding flows and statutory audit reconciliations',
      careerProgression: 'Admin Operations Manager → Head of Administration'
    }
  },
  {
    id: 'career-entrepreneurship',
    title: 'Defense Logistics & Security Venture Founder',
    category: 'Entrepreneurship',
    industry: 'Startups, Logistics & Defense Tech',
    overview: 'Builds independent commercial enterprises providing drone surveillance, fleet logistics, facility protection, or defense manufacturing supply.',
    whyItMaySuitUser: 'Veterans have unmatched tenacity, operational leadership, and deep practical insight into equipment reliability and supply chain pain points.',
    transferableSkills: ['Team leadership', 'Decision-making', 'Problem solving', 'Coordination', 'Risk identification'],
    requiredEducation: 'Open background; supported by business incubator or entrepreneurial training schemes.',
    commonCertifications: ['DGR Entrepreneurship Development Program (EDP)', 'Startup India Incubator Certification'],
    skillsRequired: ['Business Plan Financial Modeling', 'Government e-Marketplace (GeM) Bidding', 'Investor Pitching', 'Hiring & Culture Building'],
    skillGaps: ['Commercial Taxation & Company Registration', 'Digital Marketing & Lead Generation', 'Cap Table Management'],
    recommendedLearning: [
      { title: 'DGR Entrepreneurship Development & GeM Portal Masterclass', duration: '6 Weeks', level: 'Beginner' },
      { title: 'Startup Financial Modeling & Business Planning', duration: '4 Weeks', level: 'Intermediate' }
    ],
    typicalEntryLevelRoles: ['Small Business Proprietor', 'Franchise Partner', 'Independent Consultant'],
    possibleProgression: [
      { stage: 'Stage 1', role: 'Venture Founder / Bootstrapped Enterprise', timeline: 'Year 1-2' },
      { stage: 'Stage 2', role: 'Growing SME / Government Vendor (GeM)', timeline: 'Year 2-4' },
      { stage: 'Stage 3', role: 'Scaled Industry Supplier / Corporate Partner', timeline: 'Year 4+' }
    ],
    relatedJobs: ['Business Development Director', 'Defense Tech Consultant', 'Operations Partner'],
    salaryBenchmark: 'Variable Entrepreneurial Income / Equity Driven',
    workEnvironment: 'Self-Directed / On-site Operations',
    experienceLevel: 'Any Service Background',
    pathwayExample: {
      currentExperience: 'Field Leadership & Logistics Experience',
      transferableSkills: 'Leadership + High-pressure Problem Solving',
      skillGap: 'Company Registration + GeM Bidding',
      learning: 'DGR Entrepreneurship & Government Procurement Bootcamp',
      entryLevelCareer: 'Enterprise Founder',
      experiencePhase: 'Securing early commercial vendor contracts',
      careerProgression: 'Expanding regional operations and enterprise staffing'
    }
  }
];

export interface CareerMatchAnalysis {
  career: CareerDetail;
  matchScore: number; // 0-100% estimate
  whyThisMatches: string[];
  skillGaps: string[];
  recommendedLearning: {
    title: string;
    duration: string;
    level: string;
  }[];
  suitabilitySummary: string;
  disclaimer: string;
}

// Algorithmic Career Matching Engine
// Calculates a multi-factor score based on user profile
// Formally labeled as an AI/system estimate, NOT a guarantee.
export function calculateCareerMatches(
  userSkills: string[],
  userEducation: string,
  userYearsExp: number,
  preferredIndustries: string[] = [],
  preferredLocations: string[] = [],
  workPreference: string = 'hybrid'
): CareerMatchAnalysis[] {
  const disclaimerText = 'This match percentage is an automated AI / system estimate based on your self-reported skills and background. It does not constitute a promise or guarantee of employment.';

  return CAREER_DATABASE.map(career => {
    let score = 50; // base score

    const whyMatches: string[] = [];
    const missingSkills: string[] = [];

    // 1. Skill overlap check
    const normalizedUserSkills = userSkills.map(s => s.toLowerCase());
    let skillHitCount = 0;

    career.transferableSkills.forEach(reqSkill => {
      const match = normalizedUserSkills.some(us => 
        us.includes(reqSkill.toLowerCase()) || reqSkill.toLowerCase().includes(us)
      );
      if (match) {
        skillHitCount++;
        whyMatches.push(reqSkill);
      }
    });

    if (skillHitCount > 0) {
      score += Math.min(30, skillHitCount * 7);
    } else {
      // General match based on baseline discipline
      whyMatches.push('Operational discipline and procedural execution');
    }

    // Identify skill gaps
    career.skillGaps.forEach(gap => {
      missingSkills.push(gap);
    });

    // 2. Industry preference boost
    if (preferredIndustries.length > 0) {
      const matchesIndustry = preferredIndustries.some(ind => 
        ind.toLowerCase().includes(career.category.toLowerCase()) || 
        career.industry.toLowerCase().includes(ind.toLowerCase())
      );
      if (matchesIndustry) {
        score += 10;
        whyMatches.push(`Aligns with your preference for ${career.category}`);
      }
    }

    // 3. Experience alignment
    if (userYearsExp >= 3) {
      score += 6;
    }

    // Cap match score between 65 and 96 for realism (never 100% since civilian bridging is required)
    const finalScore = Math.min(95, Math.max(65, score));

    return {
      career,
      matchScore: finalScore,
      whyThisMatches: Array.from(new Set(whyMatches)),
      skillGaps: missingSkills,
      recommendedLearning: career.recommendedLearning,
      suitabilitySummary: career.whyItMaySuitUser,
      disclaimer: disclaimerText
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
}

export interface CareerComparisonResult {
  careerA: CareerDetail;
  careerB: CareerDetail;
  comparisonPoints: {
    attribute: string;
    valueA: string;
    valueB: string;
  }[];
  aiNotice: string;
}

export function compareTwoCareers(careerAId: string, careerBId: string): CareerComparisonResult | null {
  const careerA = CAREER_DATABASE.find(c => c.id === careerAId);
  const careerB = CAREER_DATABASE.find(c => c.id === careerBId);

  if (!careerA || !careerB) return null;

  return {
    careerA,
    careerB,
    comparisonPoints: [
      {
        attribute: 'Primary Industry & Domain',
        valueA: `${careerA.category} (${careerA.industry})`,
        valueB: `${careerB.category} (${careerB.industry})`
      },
      {
        attribute: 'Core Transferable Skills',
        valueA: careerA.transferableSkills.slice(0, 4).join(', '),
        valueB: careerB.transferableSkills.slice(0, 4).join(', ')
      },
      {
        attribute: 'Education Requirements',
        valueA: careerA.requiredEducation,
        valueB: careerB.requiredEducation
      },
      {
        attribute: 'Experience Benchmark',
        valueA: careerA.experienceLevel,
        valueB: careerB.experienceLevel
      },
      {
        attribute: 'Critical Skill Gaps to Bridge',
        valueA: careerA.skillGaps.join(', '),
        valueB: careerB.skillGaps.join(', ')
      },
      {
        attribute: 'Target Civilian Certifications',
        valueA: careerA.commonCertifications.join(', '),
        valueB: careerB.commonCertifications.join(', ')
      },
      {
        attribute: 'Work Environment',
        valueA: careerA.workEnvironment,
        valueB: careerB.workEnvironment
      },
      {
        attribute: 'Typical Entry-Level Route',
        valueA: careerA.typicalEntryLevelRoles.join(' / '),
        valueB: careerB.typicalEntryLevelRoles.join(' / ')
      },
      {
        attribute: 'Estimated Compensation Benchmark',
        valueA: careerA.salaryBenchmark,
        valueB: careerB.salaryBenchmark
      }
    ],
    aiNotice: 'Information shown is compiled from standardized civilian job market benchmarks and AI system estimates. Salary and progression metrics are indicative benchmarks and do not represent guaranteed outcomes.'
  };
}
