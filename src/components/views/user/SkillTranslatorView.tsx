import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowDown,
  Check, 
  Sparkles, 
  FileText, 
  ShieldAlert, 
  ShieldCheck, 
  Copy, 
  CheckCheck,
  Briefcase,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  Send,
  Layers,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { SecurityNoticeBanner } from '../../common/SecurityNoticeBanner';
import { DemoDataBadge } from '../../common/DemoDataBadge';
import { 
  detectSensitiveMilitaryInfo, 
  extractTransferableSkills, 
  SKILL_TAXONOMY,
  SkillCategory,
  SensitiveCheckResult,
  SkillExtractionResult
} from '../../../lib/skillTaxonomy';
import { SKILL_TRANSLATION_DATABASE } from '../../../lib/demoData';

export const SkillTranslatorView: React.FC = () => {
  const { profile, updateProfile, setCurrentRoute } = useApp();
  
  // User input state
  const [userInput, setUserInput] = useState<string>('Managed a team and coordinated daily tasks.');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [translationResult, setTranslationResult] = useState<SkillExtractionResult | null>(() => 
    extractTransferableSkills('Managed a team and coordinated daily tasks.')
  );
  const [sensitiveAlert, setSensitiveAlert] = useState<SensitiveCheckResult | null>(null);
  
  // Structured taxonomy category browsing
  const [activeCategoryTab, setActiveCategoryTab] = useState<SkillCategory>('LEADERSHIP');
  const [copiedBulletIdx, setCopiedBulletIdx] = useState<number | null>(null);
  const [appliedNotice, setAppliedNotice] = useState<boolean>(false);

  // Quick preset general descriptions
  const sampleInputs = [
    { label: 'Team & Coordination', text: 'Managed a team and coordinated daily tasks.' },
    { label: 'Logistics & Warehouse', text: 'Supervised inventory audits, storage safety protocols, and supply dispatches.' },
    { label: 'Technical Maintenance', text: 'Conducted diagnostic troubleshooting, equipment maintenance, and technical documentation.' },
    { label: 'Safety & Compliance', text: 'Enforced safety awareness, risk identification, and emergency drill compliance.' }
  ];

  const handleTranslate = () => {
    // Step 1: Privacy and sensitive information check
    const check = detectSensitiveMilitaryInfo(userInput);
    
    if (check.isSensitive) {
      setSensitiveAlert(check);
      setTranslationResult(null);
      return;
    }

    setSensitiveAlert(null);
    setIsProcessing(true);

    setTimeout(() => {
      const result = extractTransferableSkills(userInput);
      setTranslationResult(result);
      setIsProcessing(false);
    }, 200);
  };

  const handleEditInformation = () => {
    setSensitiveAlert(null);
  };

  const handleCopyBullet = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedBulletIdx(idx);
    setTimeout(() => setCopiedBulletIdx(null), 2000);
  };

  const handleApplyToProfile = () => {
    if (!translationResult) return;
    
    const newTechnical = Array.from(new Set([
      ...(profile.technicalSkills || []),
      ...translationResult.allSkillsList.slice(0, 4)
    ]));

    const newGeneralSkills = Array.from(new Set([
      ...(profile.generalSkillsDeveloped || []),
      ...(profile.skills || []),
      ...translationResult.allSkillsList.slice(0, 4)
    ]));

    updateProfile({
      technicalSkills: newTechnical,
      skills: newGeneralSkills,
      generalSkillsDeveloped: newGeneralSkills,
      generalResponsibilities: userInput
    });

    setAppliedNotice(true);
    setTimeout(() => setAppliedNotice(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              TRANSFERABLE SKILL ONTOLOGY
            </span>
            <DemoDataBadge />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Translate Your Service Into Civilian Skills
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Enter a general, non-sensitive description of your duties to discover verified transferable civilian competencies and career pathways.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentRoute('career_matches')}
            className="min-h-[44px] px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-cyan-300 hover:bg-slate-800 transition-colors flex items-center gap-1.5"
          >
            <Briefcase className="w-4 h-4" />
            <span>Career Matches</span>
          </button>
          <button
            onClick={() => setCurrentRoute('resume_builder')}
            className="min-h-[44px] px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4" />
            <span>Resume Builder</span>
          </button>
        </div>
      </div>

      {/* Mandatory Security Warning */}
      <SecurityNoticeBanner compact />

      {/* Input Section with Real-Time Sensitive Information Check */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#071328]/95 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <label htmlFor="service-description-input" className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
            <span>Enter General Service Duties</span>
            <span className="text-[11px] font-normal text-slate-400 lowercase">(non-sensitive description)</span>
          </label>
          <span className="text-[11px] text-cyan-400 font-mono">
            Zero-Tactical Safe Processing
          </span>
        </div>

        {/* Text Area */}
        <div className="relative">
          <textarea
            id="service-description-input"
            rows={3}
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
              if (sensitiveAlert) setSensitiveAlert(null);
            }}
            placeholder="e.g. Managed a team and coordinated daily tasks."
            className="w-full p-3.5 sm:p-4 rounded-xl bg-slate-950/90 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors resize-y min-h-[90px]"
          />
        </div>

        {/* Quick-fill General Samples */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">
            Or select a general example:
          </span>
          <div className="flex flex-wrap gap-2">
            {sampleInputs.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setUserInput(s.text);
                  setSensitiveAlert(null);
                  const result = extractTransferableSkills(s.text);
                  setTranslationResult(result);
                }}
                className="min-h-[36px] px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 text-[11px] font-medium text-slate-300 hover:text-white transition-colors"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
          <span className="text-[11px] text-slate-400">
            Rule: Generates skills only from details you provide.
          </span>
          <button
            onClick={handleTranslate}
            disabled={isProcessing || !userInput.trim()}
            className="min-h-[44px] px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isProcessing ? 'Translating...' : 'Translate to Civilian Skills'}</span>
          </button>
        </div>
      </div>

      {/* Sensitive Information Alert (PART 9 Requirement) */}
      {sensitiveAlert && (
        <div 
          role="alert"
          className="p-5 rounded-2xl bg-rose-950/60 border-2 border-rose-500 text-rose-200 space-y-4 animate-fadeIn"
        >
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Sensitive Military Information Detected
              </h2>
              <p className="text-xs text-rose-200 leading-relaxed font-semibold">
                “{sensitiveAlert.warningMessage}”
              </p>
              {sensitiveAlert.matchedTerms.length > 0 && (
                <p className="text-[11px] text-rose-300/90 mt-1">
                  Detected pattern(s): <span className="font-mono underline">{sensitiveAlert.matchedTerms.join(', ')}</span>
                </p>
              )}
            </div>
          </div>

          <div className="pt-2 border-t border-rose-800/60 flex items-center justify-between flex-wrap gap-2">
            <span className="text-[11px] text-rose-300">
              ValorBadge strictly safeguards national and operational security.
            </span>
            <button
              onClick={handleEditInformation}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-rose-900/80 hover:bg-rose-800 text-white font-bold text-xs border border-rose-500 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Edit Information</span>
            </button>
          </div>
        </div>
      )}

      {/* Synchronized Feedback Notice */}
      {appliedNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Transferable skills successfully synced to your Service Profile!</span>
        </div>
      )}

      {/* Visual Transformation Pipeline (PART 8: SERVICE EXPERIENCE ↓ TRANSFERABLE SKILLS ↓ CIVILIAN CAREER) */}
      {translationResult && !sensitiveAlert && (
        <div className="space-y-6">
          
          <div className="text-center sm:text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              TRANSFORMATION VISUAL PIPELINE
            </span>
            <h2 className="text-lg font-bold text-white font-display mt-0.5">
              Three-Stage Competency Mapping
            </h2>
          </div>

          <div className="p-6 rounded-2xl bg-[#061022]/90 border border-slate-800 space-y-6">
            
            {/* Stage 1: SERVICE EXPERIENCE */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase font-bold text-cyan-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  <span>1. SERVICE EXPERIENCE</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">User Input Verified</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 font-medium italic bg-black/40 p-3 rounded-lg border border-slate-800/80">
                “{userInput}”
              </p>
            </div>

            {/* Downward Connector Arrow */}
            <div className="flex justify-center -my-2">
              <div className="p-1.5 rounded-full bg-slate-900 border border-slate-700 text-cyan-400 shadow-md">
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </div>
            </div>

            {/* Stage 2: TRANSFERABLE SKILLS */}
            <div className="p-5 rounded-xl bg-slate-900/80 border border-cyan-500/30 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-[11px] font-mono uppercase font-bold text-cyan-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-300"></span>
                  <span>2. TRANSFERABLE SKILLS (Extracted directly from input)</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {translationResult.allSkillsList.length} Competencies Identified
                </span>
              </div>

              {/* Categorized Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {translationResult.extractedSkills.map(group => (
                  <div key={group.category} className="p-3 rounded-lg bg-black/30 border border-slate-800 space-y-2">
                    <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 block tracking-wider">
                      {group.category}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {group.skills.map(sk => (
                        <span 
                          key={sk} 
                          className="text-xs px-2.5 py-1 rounded bg-cyan-950/40 border border-cyan-500/30 text-cyan-200 font-medium flex items-center gap-1"
                        >
                          <Check className="w-3 h-3 text-cyan-400" />
                          <span>{sk}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Downward Connector Arrow */}
            <div className="flex justify-center -my-2">
              <div className="p-1.5 rounded-full bg-slate-900 border border-slate-700 text-cyan-400 shadow-md">
                <ArrowDown className="w-4 h-4" />
              </div>
            </div>

            {/* Stage 3: CIVILIAN CAREER */}
            <div className="p-5 rounded-xl bg-slate-900/80 border border-emerald-500/30 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-[11px] font-mono uppercase font-bold text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>3. CIVILIAN CAREER PATHWAY</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Calculated from Your Provided Competencies
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {translationResult.suggestedCivilianRoles.map((role, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-xl bg-black/30 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                          {role.industry}
                        </span>
                        <h3 className="text-sm font-bold text-white mt-0.5">
                          {role.title}
                        </h3>
                      </div>
                      <div className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 font-bold">
                        {role.matchConfidence}% Fit
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {role.reason}
                    </p>
                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                      <button
                        onClick={() => setCurrentRoute('career_matches')}
                        className="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                      >
                        <span>View Career Match</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Generated Civilian Resume Bullets */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-mono font-bold uppercase text-slate-300 block">
                ATS-Compliant Civilian Bullet Points (No Military Jargon):
              </span>
              <div className="space-y-2">
                {translationResult.generatedBulletPoints.map((bullet, idx) => (
                  <div 
                    key={idx} 
                    className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-start justify-between gap-3"
                  >
                    <span className="leading-relaxed">“{bullet}”</span>
                    <button
                      onClick={() => handleCopyBullet(bullet, idx)}
                      className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold shrink-0"
                    >
                      {copiedBulletIdx === idx ? (
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{copiedBulletIdx === idx ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={handleApplyToProfile}
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Apply Extracted Skills to Profile</span>
              </button>

              <button
                onClick={() => setCurrentRoute('career_matches')}
                className="min-h-[44px] px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-2"
              >
                <span>Explore Matched Careers</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      )}

      {/* PART 10: Structured Transferable Skill Database Explorer */}
      <div className="p-6 rounded-2xl bg-[#071328]/90 border border-slate-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold block">
              TAXONOMY DIRECTORY
            </span>
            <h2 className="text-base sm:text-lg font-bold text-white font-display">
              Structured Transferable Skill Database
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            7 Standard Competency Domains
          </span>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {(Object.keys(SKILL_TAXONOMY) as SkillCategory[]).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategoryTab(cat)}
              className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategoryTab === cat
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Active Category Skills */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-3">
          <span className="text-xs font-mono uppercase text-slate-400 font-semibold block">
            Core Transferable Competencies under {activeCategoryTab}:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {SKILL_TAXONOMY[activeCategoryTab].map(skill => (
              <div 
                key={skill}
                className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="text-xs font-medium text-slate-200">{skill}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">Civilian</span>
              </div>
            ))}
          </div>
        </div>

        {/* Grounding Principle Note */}
        <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            <strong>ValorBadge Grounding Rule:</strong> We never assume or auto-assign a skill simply because of military experience. Competencies are mapped strictly based on duties and qualifications provided by the individual.
          </span>
        </div>
      </div>

    </div>
  );
};
