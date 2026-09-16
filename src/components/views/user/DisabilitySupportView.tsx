import React, { useState } from 'react';
import { 
  Accessibility, 
  ShieldCheck, 
  Eye, 
  Sliders, 
  Laptop, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  HeartHandshake, 
  CheckCircle2, 
  ExternalLink, 
  Save, 
  Lock, 
  Sparkles, 
  Check, 
  Search,
  ArrowRight,
  Headphones,
  Maximize2
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { SecurityNoticeBanner } from '../../common/SecurityNoticeBanner';
import { DEMO_JOBS, DEMO_SCHEMES } from '../../../lib/demoData';

export const DisabilitySupportView: React.FC = () => {
  const { 
    profile, 
    updateProfile, 
    setCurrentRoute, 
    largeText, 
    setLargeText, 
    reducedMotion, 
    setReducedMotion 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'recommendations' | 'jobs' | 'training' | 'benefits' | 'accommodations'>('recommendations');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Minimal Medical Accommodation Data (Consent-driven, minimum footprint)
  const currentAccommodations = profile.disabilityStatus?.accommodationsNeeded || [];
  const [selectedAccommodations, setSelectedAccommodations] = useState<string[]>(currentAccommodations);
  const [broadCategory, setBroadCategory] = useState<string>(profile.disabilityStatus?.category || 'prefer_not_to_say');

  const accommodationOptions = [
    '100% Remote / Work from Home',
    'Wheelchair Accessible Office & Restrooms',
    'Ergonomic Desk & Orthopedic Seating',
    'Screen Reader & Assistive Magnification Support',
    'Speech-to-Text & Dictation Software Compatible',
    'Low Physical Exertion / Stationary Desk Role',
    'Flexible Shift Timings & Rest Breaks',
    'Noise-Cancelling / Low Sensory Distraction Workstation'
  ];

  const handleToggleAccommodation = (acc: string) => {
    setSelectedAccommodations(prev => 
      prev.includes(acc) ? prev.filter(a => a !== acc) : [...prev, acc]
    );
  };

  const handleSaveAccommodations = () => {
    updateProfile({
      disabilityStatus: {
        hasDisability: true,
        category: broadCategory,
        accommodationsNeeded: selectedAccommodations
      }
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Filter accessible jobs
  const accessibleJobs = DEMO_JOBS.filter(j => j.isAccessibleRole || j.workplaceType === 'remote' || j.workplaceType === 'hybrid');

  // Accessible career recommendations
  const accessibleCareers = [
    {
      title: 'Remote Cyber Threat Intelligence Analyst',
      suitability: 'High',
      type: '100% Remote / Low Physical Mobility',
      skills: ['Incident Triage', 'Log Telemetry Analysis', 'SOP Adherence', 'Information Integrity'],
      description: 'Desk-based cybersecurity monitoring with full screen-reader and dual-monitor support. Translates military intelligence and signals background with zero physical strain.',
      salary: '₹10,00,000 - ₹15,00,000 / annum',
      route: 'jobs'
    },
    {
      title: 'Digital Logistics Dispatch & Freight Coordinator',
      suitability: 'High',
      type: 'Hybrid / Ergonomic Desk Role',
      skills: ['Fleet Dispatch', 'Vendor Management', 'Inventory Reconciliation', 'Telephone Coordination'],
      description: 'Coordinates cargo schedules and warehouse dispatches using ERP software and telecommunications. High synergy with Army Service Corps and Quartermaster experience.',
      salary: '₹8,00,000 - ₹12,00,000 / annum',
      route: 'jobs'
    },
    {
      title: 'Quality Assurance & Regulatory Compliance Specialist',
      suitability: 'Very High',
      type: 'Remote or Accessible Corporate Facility',
      skills: ['Audit Checklists', 'ISO Documentation', 'Process Governance', 'Root Cause Analysis'],
      description: 'Enforces corporate safety and process standards. Leverages military discipline, meticulous inspection habits, and zero-compromise documentation accuracy.',
      salary: '₹9,00,000 - ₹14,00,000 / annum',
      route: 'jobs'
    },
    {
      title: 'Technical CAD & Engineering Documentation Drafter',
      suitability: 'High',
      type: 'Stationary Desk Role / Assistive Input Friendly',
      skills: ['CAD Schematics', 'Technical Specifications', 'Asset Maintenance Logs'],
      description: 'Converts equipment maintenance logs and engineering drawings into digital databases. Ideal for Corps of Engineers or EME technical veterans.',
      salary: '₹7,50,000 - ₹11,00,000 / annum',
      route: 'jobs'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" id="disability-support-root">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              ACCESSIBILITY & DISABILITY SERVICES
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Disability Support & Accessible Career Pathways
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Tailored employment, assistive technology, government disability grants, and workplace accommodation controls.
          </p>
        </div>

        {/* Quick Accessibility Toggles */}
        <div className="flex flex-wrap items-center gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => setLargeText(!largeText)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors flex items-center gap-1.5 ${
              largeText ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
            aria-pressed={largeText}
            title="Toggle Large Text Mode"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Large Text: {largeText ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={() => setReducedMotion(!reducedMotion)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors flex items-center gap-1.5 ${
              reducedMotion ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
            aria-pressed={reducedMotion}
            title="Toggle Reduced Motion"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Reduced Motion: {reducedMotion ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>

      <SecurityNoticeBanner compact />

      {/* MINIMUM MEDICAL INFORMATION POLICY BANNER */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#06182e] via-[#091e40] to-[#06182e] border border-cyan-500/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0">
          <Lock className="w-5 h-5 text-cyan-400" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-cyan-300 font-mono uppercase">
              MINIMUM DATA COLLECTION PRINCIPLE
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            ValorBadge protects veteran privacy: <strong>we never ask for medical diagnoses, disability percentage certificates, or private hospital records.</strong> We only collect optional workplace accommodation preferences (e.g. wheelchair access, remote setup) that you voluntarily choose to share with employers.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-[#071328]/90 border border-slate-800">
        {[
          { id: 'recommendations', label: 'Career Recommendations', icon: Sparkles },
          { id: 'jobs', label: 'Accessible Jobs & Remote', icon: Briefcase },
          { id: 'accommodations', label: 'Workplace Accommodations', icon: Sliders },
          { id: 'training', label: 'Accessible Training', icon: GraduationCap },
          { id: 'benefits', label: 'Gov Disability Grants', icon: HeartHandshake },
        ].map(tab => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-2 transition-all ${
                activeTab === tab.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <TabIcon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: ACCESSIBLE CAREER RECOMMENDATIONS */}
      {activeTab === 'recommendations' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white font-display">
              Recommended Civilian Roles for Service Members with Disabilities
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Curated corporate positions that prioritize intellectual rigor, documentation, and analysis over physical strain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {accessibleCareers.map((car, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#071328]/90 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-4 flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-bold uppercase">
                      {car.type}
                    </span>
                    <span className="text-xs font-mono text-emerald-400 font-semibold">
                      {car.suitability} Suitability
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white font-display">
                    {car.title}
                  </h3>

                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {car.description}
                  </p>

                  <div className="mt-4 p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                      Transferable Civilian Skills:
                    </span>
                    <p className="text-xs text-cyan-300">
                      {car.skills.join(' • ')}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">{car.salary}</span>
                  <button
                    onClick={() => setCurrentRoute('jobs')}
                    className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <span>View Matching Jobs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: ACCESSIBLE JOBS & REMOTE POSITIONS */}
      {activeTab === 'jobs' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white font-display">
                Accessible & Remote Verified Jobs
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Positions with confirmed wheelchair accessibility, remote/hybrid arrangements, or assistive tech accommodations.
              </p>
            </div>
            <button
              onClick={() => setCurrentRoute('jobs')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              Browse All Jobs →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {accessibleJobs.map(job => (
              <div
                key={job.id}
                className="p-6 rounded-2xl bg-[#071328]/90 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4 shadow-lg"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 uppercase font-bold">
                      {job.workplaceType === 'remote' ? '100% Remote Desk Role' : 'Accessible Facility'}
                    </span>
                    <span className="text-xs font-mono text-cyan-400 font-bold">
                      {job.veteranFriendlyScore}% Fit
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white font-display">
                    {job.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">
                    {job.company} • {job.location}
                  </p>

                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                    {job.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {job.civilianSkillsMatched.slice(0, 3).map((sk, idx) => (
                      <span key={idx} className="text-[10px] font-medium text-cyan-300 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">{job.salaryRange}</span>
                  <button
                    onClick={() => setCurrentRoute('jobs')}
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-sm"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: WORKPLACE ACCOMMODATIONS (MINIMAL PRIVACY-SAFE ENTRY) */}
      {activeTab === 'accommodations' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#071328]/90 border border-slate-800 space-y-6 shadow-xl max-w-3xl mx-auto">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sliders className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white font-display">
                Privacy-Controlled Workplace Accommodations
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Select only the practical accommodations you need at work. Employers only see your requested equipment/facility needs, never your medical history.
            </p>
          </div>

          {savedSuccess && (
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Accommodations successfully saved and synchronized with your candidate profile.</span>
            </div>
          )}

          {/* Broad Non-Diagnostic Category */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-300 uppercase font-bold block">
              Optional Broad Category (Non-diagnostic):
            </label>
            <select
              value={broadCategory}
              onChange={e => setBroadCategory(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:border-cyan-400 focus:outline-none"
            >
              <option value="prefer_not_to_say">Prefer Not to Specify</option>
              <option value="locomotor">Locomotor / Mobility Related</option>
              <option value="visual">Visual Impairment / Assistive Screen Reader</option>
              <option value="hearing">Hearing Impairment / Captioning</option>
              <option value="neurodivergent">Neurodiversity / Low Sensory Ergonomics</option>
              <option value="general_health">Chronic Service Condition / Low Physical Strain</option>
            </select>
          </div>

          {/* Checkbox Options */}
          <div className="space-y-3">
            <span className="text-xs font-mono text-slate-300 uppercase font-bold block">
              Requested Workplace Adjustments:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {accommodationOptions.map(acc => (
                <label
                  key={acc}
                  className={`flex items-start gap-2.5 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedAccommodations.includes(acc)
                      ? 'bg-cyan-950/40 border-cyan-500/50 text-white font-medium'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedAccommodations.includes(acc)}
                    onChange={() => handleToggleAccommodation(acc)}
                    className="mt-0.5 rounded bg-slate-800 border-slate-600 text-cyan-500 focus:ring-0"
                  />
                  <span>{acc}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-mono">
              Visibility: Stored securely in profile preferences
            </span>
            <button
              onClick={handleSaveAccommodations}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md shadow-cyan-500/20 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Accommodations</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: ACCESSIBLE TRAINING & SKILL BUILDING */}
      {activeTab === 'training' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white font-display">
              Accessible & Self-Paced Training Programs
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Screen-reader verified courses, high-contrast slides, and flexible completion timelines for veterans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-[#071328]/90 border border-slate-800 space-y-3 shadow-lg">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">
                <Laptop className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">
                Cyber Incident Triage & SOC Fundamentals
              </h3>
              <p className="text-xs text-slate-300">
                100% online self-paced coursework designed with text transcripts, keyboard shortcuts, and screen-reader compatibility.
              </p>
              <span className="text-[10px] font-mono text-cyan-400 font-semibold block">
                Duration: 4 Weeks • Free Certification
              </span>
              <button
                onClick={() => setCurrentRoute('learning_hub')}
                className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 text-xs font-semibold"
              >
                Open in Learning Hub
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-[#071328]/90 border border-slate-800 space-y-3 shadow-lg">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">
                Industrial Safety Standards & ISO 45001 Compliance
              </h3>
              <p className="text-xs text-slate-300">
                Audit checklist masterclass. Focuses on document verification and governance from an accessible desktop workstation.
              </p>
              <span className="text-[10px] font-mono text-cyan-400 font-semibold block">
                Duration: 3 Weeks • Industry Recognized
              </span>
              <button
                onClick={() => setCurrentRoute('learning_hub')}
                className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 text-xs font-semibold"
              >
                Open in Learning Hub
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-[#071328]/90 border border-slate-800 space-y-3 shadow-lg">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">
                <Headphones className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">
                Civilian Technical Communication & Audio Modules
              </h3>
              <p className="text-xs text-slate-300">
                Audio-first transition course translating tactical communications into clear executive summaries and stakeholder updates.
              </p>
              <span className="text-[10px] font-mono text-cyan-400 font-semibold block">
                Duration: 2 Weeks • Audio + Subtitled
              </span>
              <button
                onClick={() => setCurrentRoute('learning_hub')}
                className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 text-xs font-semibold"
              >
                Open in Learning Hub
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: GOVERNMENT DISABILITY ASSISTANCE & SCHEMES */}
      {activeTab === 'benefits' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white font-display">
              Government Grants & Assistive Aid Schemes for Disabled Soldiers
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Statutory central benefits, medical assistance funds, and assistive device centers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#071328]/90 border border-slate-800 space-y-3 shadow-lg">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 uppercase font-bold">
                  Central MoD Grant
                </span>
              </div>
              <h3 className="text-base font-bold text-white">
                Armed Forces Flag Day Fund (AFFDF) Disability Financial Assistance
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Direct monthly grants and one-time assistance for disabled Ex-Servicemen and war-wounded personnel not receiving full disability pensions. Managed by Kendriya Sainik Board (KSB).
              </p>
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">Portal: ksb.gov.in</span>
                <a
                  href="https://ksb.gov.in"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold flex items-center gap-1.5"
                >
                  <span>Verify on KSB Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#071328]/90 border border-slate-800 space-y-3 shadow-lg">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 uppercase font-bold">
                  Assistive Devices & Rehabilitation
                </span>
              </div>
              <h3 className="text-base font-bold text-white">
                Artificial Limbs Centre (ALC Pune) & ALIMCO Assistive Technology
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Specialized fitting and maintenance of motorized wheelchairs, state-of-the-art myoelectric prosthetics, orthopedic footwear, and visual assistive aids for service-disabled personnel.
              </p>
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">Official Body: ALIMCO / ALC</span>
                <a
                  href="https://alimco.in"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold flex items-center gap-1.5"
                >
                  <span>Visit ALIMCO Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
