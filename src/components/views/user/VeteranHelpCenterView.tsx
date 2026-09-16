import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  ArrowRight, 
  ShieldAlert, 
  ShieldCheck, 
  FileText, 
  Briefcase, 
  Cpu, 
  GraduationCap, 
  Languages, 
  Accessibility, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink,
  BookOpen,
  ChevronRight,
  MessageSquare,
  Sparkles,
  PhoneCall,
  Check,
  Info
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { SecurityNoticeBanner } from '../../common/SecurityNoticeBanner';
import { AppRoute } from '../../../types';

interface TransitionProblemCard {
  id: string;
  category: 'jobs' | 'resume' | 'skills' | 'training' | 'benefits' | 'disability' | 'language' | 'scams';
  title: string;
  icon: React.ElementType;
  problem: string;
  solution: string;
  resources: { name: string; type: string; linkRoute?: AppRoute; url?: string }[];
  nextStepText: string;
  nextStepActionRoute: AppRoute;
  actionButtonLabel: string;
  quickTips: string[];
}

export const VeteranHelpCenterView: React.FC = () => {
  const { setCurrentRoute } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [scamFeeChecked, setScamFeeChecked] = useState(false);
  const [scamWhatsappChecked, setScamWhatsappChecked] = useState(false);
  const [scamDocsChecked, setScamDocsChecked] = useState(false);
  const [scamSalaryChecked, setScamSalaryChecked] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);
  const [reportNote, setReportNote] = useState('');

  const problemCards: TransitionProblemCard[] = [
    {
      id: 'problem-civilian-jobs',
      category: 'jobs',
      title: 'Finding Civilian Jobs & Navigating Corporate Hiring',
      icon: Briefcase,
      problem: 'Military veterans and Agniveers often find corporate job descriptions confusing, struggle with unfamiliar recruiter jargon, and experience slow recruitment feedback cycles compared to military postings.',
      solution: 'Target defense-friendly employers who actively value operational rigor, safety standards, and mission reliability. Use skill matching rather than military title searches (e.g. search "Operations Manager", "Fleet Logistics", "Plant Safety", "Facilities Director").',
      resources: [
        { name: 'ValorBadge Verified Jobs Feed', type: 'Platform Feature', linkRoute: 'jobs' },
        { name: 'Directorate General Resettlement (DGR) Quotas', type: 'Government Rule', url: 'https://dgrindia.gov.in' },
        { name: 'Corporate Diversity & Veteran Hiring Programs Guide', type: 'Resource Article' }
      ],
      nextStepText: 'Browse open roles pre-matched to military logistics, engineering, technical communication, and administrative backgrounds.',
      nextStepActionRoute: 'jobs',
      actionButtonLabel: 'View Matched Jobs',
      quickTips: [
        'Apply within 48 hours of job postings for highest visibility.',
        'Target industries where discipline and safety are mission-critical: Logistics, Aviation, Data Centers, Heavy Manufacturing, and Critical Infrastructure.'
      ]
    },
    {
      id: 'problem-resume-translation',
      category: 'resume',
      title: 'Resume Translation & Eliminating Military Jargon',
      icon: FileText,
      problem: 'Recruiters and civilian Applicant Tracking Systems (ATS) reject resumes filled with military abbreviations (e.g., "CO", "JCO", "Havildar", "CQMS", "depot muster", "convoy commander"), causing high rejection rates.',
      solution: 'Translate military duties into standardized civilian corporate competencies (e.g., change "Directed 40-man infantry platoon" to "Managed cross-functional team of 40 personnel, achieving 100% operational readiness and compliance").',
      resources: [
        { name: 'ValorBadge ATS-Friendly Resume Builder', type: 'Tool', linkRoute: 'resume_builder' },
        { name: 'Military-to-Civilian Acronym Translation Guide', type: 'Cheat Sheet', linkRoute: 'skill_translator' },
        { name: 'Civ-Standard Action Verbs Directory', type: 'Guide' }
      ],
      nextStepText: 'Use the 1-click ATS Resume Maker to format your experience into clean civilian templates.',
      nextStepActionRoute: 'resume_builder',
      actionButtonLabel: 'Open Resume Builder',
      quickTips: [
        'Never list weapons, deployment locations, or tactical mission names.',
        'Quantify achievements using numbers, budgets, fleet sizes, and zero-accident safety records.'
      ]
    },
    {
      id: 'problem-skill-gaps',
      category: 'skills',
      title: 'Bridging Corporate Skill & Software Gaps',
      icon: Cpu,
      problem: 'Veterans have exceptional discipline and leadership, but may lack hands-on experience with modern commercial digital tools such as Jira, SAP/ERP, Excel advanced models, or Agile project methodology.',
      solution: 'Map existing military SOP and checklist execution directly into Agile/Scrum ceremonies and modern digital workflows. Short 2 to 4-week certifications can bridge the software gap rapidly.',
      resources: [
        { name: 'ValorBadge Skill Translator Matrix', type: 'Platform Tool', linkRoute: 'skill_translator' },
        { name: 'Agile & Logistics Transition Micro-Courses', type: 'Learning Module', linkRoute: 'learning_hub' },
        { name: 'Skill India Digital Ex-Servicemen Portal', type: 'External Resource', url: 'https://www.skillindiadigital.gov.in' }
      ],
      nextStepText: 'Analyze your current skills against top civilian roles and identify 1-2 rapid certifications to bridge the gap.',
      nextStepActionRoute: 'skill_translator',
      actionButtonLabel: 'Translate My Skills',
      quickTips: [
        'Free courses on Excel and project fundamentals take under 10 hours and boost resume scores significantly.',
        'Highlight adaptability and fast onboarding: veterans learn new systems 40% faster than average trainees.'
      ]
    },
    {
      id: 'problem-training-resettlement',
      category: 'training',
      title: 'Training & Resettlement Courses (DGR & PMKVY)',
      icon: GraduationCap,
      problem: 'Many transitioning personnel and Agniveers are unaware of sponsored resettlement courses or don’t know how to register for DGR executive programs at IIMs, XLRI, and national institutes.',
      solution: 'Enroll in authorized DGR courses during your final color service or within 3 years of release. Take advantage of PMKVY (Pradhan Mantri Kaushal Vikas Yojana) subsidized certifications.',
      resources: [
        { name: 'DGR Officer & JCO/OR Annual Course Calendar', type: 'Gov Resource', url: 'https://dgrindia.gov.in' },
        { name: 'ValorBadge Learning Hub', type: 'Course Directory', linkRoute: 'learning_hub' },
        { name: 'Agniveer NSQF Level Equivalence Handbook', type: 'Government Publication' }
      ],
      nextStepText: 'Explore curated learning pathways specifically sequenced for military transitioners.',
      nextStepActionRoute: 'learning_hub',
      actionButtonLabel: 'Explore Learning Hub',
      quickTips: [
        'Apply for DGR courses 6 to 9 months before your scheduled release date.',
        'Choose management or technical streams that offer campus corporate placement drives.'
      ]
    },
    {
      id: 'problem-gov-benefits',
      category: 'benefits',
      title: 'Navigating Government Welfare, Quotas & Pensions',
      icon: CheckCircle2,
      problem: 'Ex-Servicemen and Agniveers find it difficult to navigate scattered portals across KSB, DESW, SPARSH, and state-level Rajya Sainik Boards to claim benefits and reservation quotas.',
      solution: 'Use our single consolidated Government Schemes Directory to search by state, category, and beneficiary status with step-by-step application instructions and official links.',
      resources: [
        { name: 'Government Schemes & Reservation Quotas', type: 'Directory', linkRoute: 'government_schemes' },
        { name: 'Kendriya Sainik Board (KSB)', type: 'Official Portal', url: 'https://ksb.gov.in' },
        { name: 'SPARSH Defence Pension Portal', type: 'Official Portal', url: 'https://sparsh.defencepension.gov.in' }
      ],
      nextStepText: 'Review your eligible state and central quotas for jobs, education scholarships, and self-employment loans.',
      nextStepActionRoute: 'government_schemes',
      actionButtonLabel: 'Browse Schemes Directory',
      quickTips: [
        'Always register your discharge book at your local Zila Sainik Board immediately upon retirement.',
        'Keep your digital Pension Payment Order (e-PPO) and ESM Identity Card safely scanned.'
      ]
    },
    {
      id: 'problem-disability-support',
      category: 'disability',
      title: 'Disability-Friendly Employment & Medical Support',
      icon: Accessibility,
      problem: 'War-disabled personnel, medically boarded soldiers, and veterans with physical limitations face anxiety about workplace accessibility, discrimination, or finding suitable desk/remote roles.',
      solution: 'Access verified remote positions, wheelchair-accessible facilities, and government reservation quotas under the Rights of Persons with Disabilities (RPwD) Act and Armed Forces Flag Day Fund grants.',
      resources: [
        { name: 'ValorBadge Dedicated Disability Support Center', type: 'Platform Hub', linkRoute: 'disability_support' },
        { name: 'Artificial Limbs Centre (ALC Pune) & ALIMCO Assistive Aids', type: 'Gov Resource', url: 'https://alimco.in' },
        { name: 'AFFDF Disability Financial Grant Scheme (KSB)', type: 'Grant', url: 'https://ksb.gov.in' }
      ],
      nextStepText: 'View accessible remote roles, assistive technology resources, and privacy-controlled workplace accommodations.',
      nextStepActionRoute: 'disability_support',
      actionButtonLabel: 'Open Disability Support',
      quickTips: [
        'ValorBadge never forces disclosure of medical history—only optional accommodation preferences.',
        'Remote tech and analytics roles offer full compensation parity with zero commute stress.'
      ]
    },
    {
      id: 'problem-language-barriers',
      category: 'language',
      title: 'Overcoming Language & Corporate Communication Barriers',
      icon: Languages,
      problem: 'Service personnel who conducted daily operations in Hindi or regional languages may lack confidence during English-language corporate interviews and email correspondence.',
      solution: 'Practice with our localized bilingual guides. Focus on clear, structured communication (STAR format: Situation, Task, Action, Result) rather than complex vocabulary.',
      resources: [
        { name: 'ValorBadge Interview Coach & Speech Prep', type: 'Tool', linkRoute: 'interview_coach' },
        { name: 'Corporate Email & Communication Templates', type: 'Resource' },
        { name: 'Bilingual Military-to-Corporate Lexicon', type: 'Downloadable PDF' }
      ],
      nextStepText: 'Practice common behavioral interview questions with structured civilian response framing.',
      nextStepActionRoute: 'interview_coach',
      actionButtonLabel: 'Open Interview Coach',
      quickTips: [
        'Corporate interviewers care about clarity, honesty, and accountability far more than fluent accents.',
        'Use the STAR technique: Describe the situation, your objective, the concrete steps you executed, and the measurable outcome.'
      ]
    },
    {
      id: 'problem-scam-awareness',
      category: 'scams',
      title: 'Fake-Job, Scam Defense & Fee-Fraud Awareness',
      icon: ShieldAlert,
      problem: 'Fraudulent agents and scam recruitment rings prey on veterans and retiring Agniveers by promising guaranteed PSU, airport, or railway security jobs in exchange for "registration fees" or "uniform security deposits".',
      solution: 'Legitimate employers NEVER charge job seekers any fee, registration charge, or training deposit. Always verify company registration and report suspicious job postings immediately.',
      resources: [
        { name: 'Interactive Scam Detector Tool (Below)', type: 'Safety Check' },
        { name: 'Ministry of Labour National Career Service Advisory', type: 'Official Warning', url: 'https://www.ncs.gov.in' },
        { name: 'ValorBadge Community Scam Reporting Hotline', type: 'Direct Tool' }
      ],
      nextStepText: 'Use the Scam Detector below to check if a job offer has red flags before responding.',
      nextStepActionRoute: 'privacy_center',
      actionButtonLabel: 'Review Security Guidelines',
      quickTips: [
        'Rule #1: If anyone asks you to pay money to get a job, it is 100% a scam.',
        'Never surrender original service records, discharge books, or blank signed cheques.'
      ]
    }
  ];

  // Scam risk calculation
  const scamRiskCount = [scamFeeChecked, scamWhatsappChecked, scamDocsChecked, scamSalaryChecked].filter(Boolean).length;

  const filteredProblems = problemCards.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.solution.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleReportScam = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSuccess(true);
    setTimeout(() => {
      setReportSuccess(false);
      setReportModalOpen(false);
      setReportNote('');
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              VETERAN ADVISORY & SUPPORT HUB
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Veteran Transition Help Center
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Practical solutions, verified resources, and clear next steps for every challenge of your civilian career transition.
          </p>
        </div>

        <button
          onClick={() => setReportModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 text-xs font-bold flex items-center gap-2 transition-colors shrink-0"
        >
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span>Report Suspicious Job / Scam</span>
        </button>
      </div>

      <SecurityNoticeBanner compact />

      {/* Interactive Scam Detector Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#120a1f] via-[#091328] to-[#071326] border border-amber-500/40 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-amber-400">
          <ShieldAlert className="w-5 h-5" />
          <h2 className="text-base sm:text-lg font-bold text-white font-display">
            Interactive Fake-Job & Scam Verification Tool
          </h2>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          Transitioning personnel are frequently targeted by unauthorized recruitment middlemen. Check any suspicious offer below to instantly analyze risk indicators:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 cursor-pointer hover:border-slate-700 transition-colors">
            <input
              type="checkbox"
              checked={scamFeeChecked}
              onChange={e => setScamFeeChecked(e.target.checked)}
              className="mt-0.5 rounded bg-slate-800 border-slate-600 text-cyan-500 focus:ring-0"
            />
            <span>Are they asking for a "Registration Fee", "Uniform Security Deposit", or "Training Cost"?</span>
          </label>

          <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 cursor-pointer hover:border-slate-700 transition-colors">
            <input
              type="checkbox"
              checked={scamWhatsappChecked}
              onChange={e => setScamWhatsappChecked(e.target.checked)}
              className="mt-0.5 rounded bg-slate-800 border-slate-600 text-cyan-500 focus:ring-0"
            />
            <span>Was the interview conducted entirely over WhatsApp or Telegram without an official email domain?</span>
          </label>

          <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 cursor-pointer hover:border-slate-700 transition-colors">
            <input
              type="checkbox"
              checked={scamDocsChecked}
              onChange={e => setScamDocsChecked(e.target.checked)}
              className="mt-0.5 rounded bg-slate-800 border-slate-600 text-cyan-500 focus:ring-0"
            />
            <span>Are they asking you to hand over original Service Discharge Books or blank signed papers?</span>
          </label>

          <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 cursor-pointer hover:border-slate-700 transition-colors">
            <input
              type="checkbox"
              checked={scamSalaryChecked}
              onChange={e => setScamSalaryChecked(e.target.checked)}
              className="mt-0.5 rounded bg-slate-800 border-slate-600 text-cyan-500 focus:ring-0"
            />
            <span>Does the offer guarantee immediate appointment without any technical interview or evaluation?</span>
          </label>
        </div>

        {/* Real-time Risk Verdict */}
        <div className={`p-4 rounded-xl border transition-all ${
          scamRiskCount === 0 
            ? 'bg-slate-900/90 border-slate-700 text-slate-300'
            : scamRiskCount >= 2 
              ? 'bg-rose-950/80 border-rose-500/60 text-rose-200' 
              : 'bg-amber-950/80 border-amber-500/60 text-amber-200'
        }`}>
          <div className="flex items-center gap-2 font-bold text-xs">
            {scamRiskCount === 0 ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">No immediate warning indicators selected. Always verify company email domain.</span>
              </>
            ) : scamRiskCount >= 2 ? (
              <>
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span className="text-rose-400">CRITICAL WARNING: HIGH PROBABILITY OF FRAUDULENT SCAM ({scamRiskCount} Red Flags Detected)</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span className="text-amber-400">CAUTION ADVISED: 1 Red Flag Detected. Do not pay any money.</span>
              </>
            )}
          </div>
          {scamRiskCount > 0 && (
            <p className="text-xs mt-1 text-slate-300">
              Legitimate employers will never ask candidates to pay for employment. Stop communication and report this listing immediately.
            </p>
          )}
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="p-4 rounded-2xl bg-[#071328]/90 border border-slate-800 space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search problems by keyword (e.g., civilian resume, skill gaps, DGR courses, scams, disability, English)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-200 placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {[
            { id: 'all', label: 'All Transition Topics' },
            { id: 'jobs', label: 'Finding Civilian Jobs' },
            { id: 'resume', label: 'Resume & Jargon' },
            { id: 'skills', label: 'Skill Gaps' },
            { id: 'training', label: 'DGR & Training' },
            { id: 'benefits', label: 'Gov Benefits & Quotas' },
            { id: 'disability', label: 'Disability Support' },
            { id: 'language', label: 'Language & Comms' },
            { id: 'scams', label: 'Scam Awareness' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Problem Cards: Exact Problem -> Solution -> Resources -> Next Step Layout */}
      <div className="space-y-6">
        {filteredProblems.map(item => {
          const IconComp = item.icon;

          return (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-[#071328]/90 border border-slate-800 hover:border-cyan-500/40 transition-all shadow-xl space-y-5"
            >
              
              {/* Problem Title & Category Icon */}
              <div className="flex items-start gap-4 border-b border-slate-800/80 pb-4">
                <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                  <IconComp className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase font-semibold">
                    TRANSITION ADVISORY #{item.category.toUpperCase()}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* 4-Part Structured Section: Problem -> Solution -> Resources -> Next Step */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 1. Problem */}
                <div className="p-4 rounded-xl bg-slate-900/70 border border-rose-500/20 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-rose-400">
                    <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                    <span>1. Problem</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.problem}
                  </p>
                </div>

                {/* 2. Solution */}
                <div className="p-4 rounded-xl bg-slate-900/70 border border-emerald-500/20 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>2. Solution</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.solution}
                  </p>
                </div>

              </div>

              {/* 3. Resources & Quick Tips */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-cyan-400">
                  <BookOpen className="w-4 h-4" />
                  <span>3. Verified Resources & Guides</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {item.resources.map((res, i) => (
                    <div 
                      key={i} 
                      onClick={() => {
                        if (res.linkRoute) setCurrentRoute(res.linkRoute);
                        if (res.url) window.open(res.url, '_blank', 'noreferrer noopener');
                      }}
                      className={`p-3 rounded-lg border text-xs flex flex-col justify-between cursor-pointer transition-all ${
                        res.linkRoute || res.url 
                          ? 'bg-slate-900 border-slate-700 hover:border-cyan-400 hover:bg-slate-800 text-slate-200' 
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <span className="font-semibold text-slate-200">{res.name}</span>
                      <div className="flex items-center justify-between mt-2 text-[10px] text-cyan-400 font-mono">
                        <span>{res.type}</span>
                        {(res.linkRoute || res.url) && <ChevronRight className="w-3 h-3" />}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Tips */}
                {item.quickTips && (
                  <div className="pt-2 border-t border-slate-800/80 space-y-1">
                    <span className="text-[11px] font-mono text-slate-400 font-semibold block">
                      Field-Tested Veteran Advice:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {item.quickTips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* 4. Next Step & Action Button */}
              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-cyan-300">
                    <ArrowRight className="w-3.5 h-3.5" />
                    <span>4. Recommended Next Step</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.nextStepText}
                  </p>
                </div>

                <button
                  onClick={() => setCurrentRoute(item.nextStepActionRoute)}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-cyan-500/20 shrink-0"
                >
                  <span>{item.actionButtonLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Report Scam Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#071429] border border-amber-500/40 rounded-2xl p-6 space-y-5 shadow-2xl relative">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  Report a Suspicious Recruiter or Scam
                </h3>
                <p className="text-xs text-slate-400">
                  Protect other service members and veterans from fraudulent agents.
                </p>
              </div>
            </div>

            {reportSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Thank you! Your report has been logged and our verification team will investigate this employer.</span>
              </div>
            ) : (
              <form onSubmit={handleReportScam} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-mono mb-1">Company / Agent Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Defense Placement Services"
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-mono mb-1">Contact Details (Phone / WhatsApp / Email)</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 ... or email address"
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-mono mb-1">What did they demand or promise?</label>
                  <textarea
                    rows={3}
                    required
                    value={reportNote}
                    onChange={e => setReportNote(e.target.value)}
                    placeholder="e.g. Asked for ₹5,000 for appointment letter, claimed Indian Army partnership..."
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setReportModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                  >
                    Submit Report
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
