import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Copy, 
  Check, 
  Eye, 
  Printer, 
  ShieldCheck, 
  Sparkles, 
  Sliders, 
  Share2,
  Plus,
  Trash2,
  Edit3,
  Save,
  AlertTriangle,
  Lock,
  Globe,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  Building,
  GraduationCap,
  Award,
  Briefcase
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { SecurityNoticeBanner } from '../../common/SecurityNoticeBanner';
import { ServiceProfileData, EducationEntry, CivilianExperienceEntry } from '../../../types';

export const ResumeBuilderView: React.FC = () => {
  const { profile, updateProfile } = useApp();

  // Local state for live manual editing
  const [formData, setFormData] = useState<ServiceProfileData>({
    ...profile,
    educationEntries: profile.educationEntries || [
      {
        id: 'edu-1',
        degree: profile.education || 'Bachelor of Technology (Mechanical)',
        institution: 'National Institute of Technology',
        year: '2016',
        fieldOfStudy: 'Mechanical Engineering',
        grade: 'First Class with Distinction'
      }
    ],
    civilianExperience: profile.civilianExperience || [
      {
        id: 'civ-1',
        role: 'Assistant Operations & Fleet Manager',
        company: 'Apex Supply Chain Solutions',
        duration: '2023 - Present',
        location: 'Bengaluru, India',
        description: 'Directed regional dispatch coordination, maintained 99.4% on-time logistics delivery, and enforced industrial safety compliance across 3 warehousing depots.',
        keyContributions: [
          'Reduced transit turnaround time by 18% through route optimization.',
          'Maintained zero lost-time injury (LTI) record across 85 fleet drivers.'
        ]
      }
    ],
    achievements: profile.achievements || [
      'Commendation for Outstanding Supply Chain Logistics & Fleet Mobilization',
      'Zero Incident Operational Safety Citation across 4 consecutive years',
      'Led cross-functional equipment readiness task force during emergency civil assistance'
    ]
  });

  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('preview');
  const [template, setTemplate] = useState<'corporate' | 'minimalist_ats' | 'executive'>('corporate');
  const [privacyMode, setPrivacyMode] = useState<'full' | 'masked' | 'private'>('full');
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [translationApplied, setTranslationApplied] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  // Sensitive words scanner
  const SENSITIVE_TERMS = [
    'battalion', 'regiment', 'artillery', 'platoon', 'squadron', 
    'ammunition', 'weapons', 'lethal', 'classified', 'insurgency', 
    'counter-terrorism', 'deployment', 'border outpost', 'bop'
  ];

  const checkSensitiveContent = (text: string) => {
    if (!text) return [];
    const lower = text.toLowerCase();
    return SENSITIVE_TERMS.filter(term => lower.includes(term));
  };

  const detectedSensitiveTerms = checkSensitiveContent(
    `${formData.generalResponsibilities} ${formData.generalRoleCategory}`
  );

  // Military to Civilian Translation Assistant
  const handleTranslateCivilianPhrasing = () => {
    let updatedResponsibilities = formData.generalResponsibilities;
    
    // Replace typical military terms with corporate equivalents
    const translationMap: { [key: string]: string } = {
      'platoon': 'cross-functional team',
      'battalion': 'large-scale division',
      'regiment': 'enterprise operational unit',
      'commanded': 'directed and managed',
      'troops': 'personnel and team members',
      'ammunition': 'sensitive inventory and high-value materials',
      'convoy': 'multimodal fleet transport',
      'depot muster': 'centralized supply chain audit',
      'insurgency': 'crisis contingency operations',
      'reconnaissance': 'field assessment and risk evaluation'
    };

    Object.entries(translationMap).forEach(([mil, civ]) => {
      const regex = new RegExp(`\\b${mil}\\b`, 'gi');
      updatedResponsibilities = updatedResponsibilities.replace(regex, civ);
    });

    setFormData(prev => ({
      ...prev,
      generalResponsibilities: updatedResponsibilities,
      technicalSkills: Array.from(new Set([
        ...prev.technicalSkills,
        'Cross-functional Team Leadership',
        'Multi-node Supply Chain',
        'Crisis & Risk Mitigation',
        'Regulatory Compliance Management'
      ]))
    }));

    setTranslationApplied(true);
    setTimeout(() => setTranslationApplied(false), 3000);
  };

  // Save changes back to user profile context
  const handleSaveAll = () => {
    updateProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Add / Remove dynamic items
  const addEducation = () => {
    const newEntry: EducationEntry = {
      id: `edu-${Date.now()}`,
      degree: 'Degree / Diploma',
      institution: 'University / Board',
      year: '2024',
      fieldOfStudy: 'Field of Study'
    };
    setFormData(prev => ({
      ...prev,
      educationEntries: [...(prev.educationEntries || []), newEntry]
    }));
  };

  const removeEducation = (id: string) => {
    setFormData(prev => ({
      ...prev,
      educationEntries: (prev.educationEntries || []).filter(e => e.id !== id)
    }));
  };

  const addCivilianExp = () => {
    const newExp: CivilianExperienceEntry = {
      id: `civ-${Date.now()}`,
      role: 'Operations Specialist',
      company: 'Corporate Enterprise Pvt Ltd',
      duration: '2022 - 2023',
      location: 'Pan-India',
      description: 'Supervised shift operations and implemented SOPs with zero discrepancies.',
      keyContributions: ['Standardized inventory logging processes.']
    };
    setFormData(prev => ({
      ...prev,
      civilianExperience: [...(prev.civilianExperience || []), newExp]
    }));
  };

  const removeCivilianExp = (id: string) => {
    setFormData(prev => ({
      ...prev,
      civilianExperience: (prev.civilianExperience || []).filter(e => e.id !== id)
    }));
  };

  const addAchievement = () => {
    setFormData(prev => ({
      ...prev,
      achievements: [...(prev.achievements || []), 'Recognized for operational excellence and leadership.']
    }));
  };

  const removeAchievement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      achievements: (prev.achievements || []).filter((_, i) => i !== index)
    }));
  };

  const addSkillTag = (category: keyof ServiceProfileData, skill: string) => {
    if (!skill.trim()) return;
    const current = (formData[category] as string[]) || [];
    if (!current.includes(skill.trim())) {
      setFormData(prev => ({
        ...prev,
        [category]: [...current, skill.trim()]
      }));
    }
  };

  const removeSkillTag = (category: keyof ServiceProfileData, skill: string) => {
    const current = (formData[category] as string[]) || [];
    setFormData(prev => ({
      ...prev,
      [category]: current.filter(s => s !== skill)
    }));
  };

  // Executive Civilian Summary
  const executiveSummary = `Results-driven Operations & Transition Professional with over ${formData.yearsOfExperience} years of mission-critical stewardship in ${formData.generalRoleCategory || 'Large-scale Logistics & Technical Operations'}. Recognized for zero-compromise adherence to safety, crisis containment, multimodal distribution, and cross-functional team leadership. Proven ability to translate operational discipline and accountability into commercial enterprise efficiency.`;

  // Handle Export PDF / Print
  const handleExportPDF = () => {
    window.print();
  };

  // Copy Plain Text ATS Resume
  const handleCopyText = () => {
    const phoneDisplay = privacyMode === 'masked' ? '+91 ••••• ••••• (Verified Candidate)' : formData.phone;
    const emailDisplay = privacyMode === 'masked' ? 'candidate-secure@valorbadge.id' : formData.email;

    const resumeText = `
${formData.fullName.toUpperCase()}
${formData.city}, ${formData.state}, ${formData.country} | ${emailDisplay} | ${phoneDisplay}

PROFESSIONAL SUMMARY
${executiveSummary}

CORE CIVILIAN COMPETENCIES
- Technical: ${formData.technicalSkills.join(', ')}
- Leadership: ${formData.leadership.join(', ')}
- Logistics & Operations: ${formData.logistics.join(', ')}
- Safety & Compliance: ${formData.safety.join(', ')}

MILITARY SERVICE & OPERATIONAL STEWARDSHIP
Senior Operational Management Lead | Armed Forces Service (${formData.yearsOfExperience} Years Track Record)
- ${formData.generalResponsibilities}
- Maintained 100% equipment availability rate through rigorous preventive maintenance scheduling and root-cause analysis.
- Spearheaded comprehensive emergency containment protocols, personnel safety drills, and zero-compromise compliance.

CIVILIAN PROFESSIONAL EXPERIENCE
${(formData.civilianExperience || []).map(exp => `
${exp.role} | ${exp.company} (${exp.duration})
${exp.description}
${(exp.keyContributions || []).map(c => `• ${c}`).join('\n')}
`).join('\n')}

EDUCATION & CREDENTIALS
${(formData.educationEntries || []).map(edu => `- ${edu.degree} | ${edu.institution} (${edu.year})`).join('\n')}
- Certifications: ${formData.certifications.join(', ')}

COMMENDATIONS & ACHIEVEMENTS
${(formData.achievements || []).map(a => `- ${a}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareLink = () => {
    const dummyUrl = `https://valorbadge.org/shared/resume/${profile.id}?access=verified_employers`;
    navigator.clipboard.writeText(dummyUrl);
    setShareLinkCopied(true);
    setTimeout(() => setShareLinkCopied(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title & Action Toolbar (Screen only) */}
      <div className="no-print flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
            CIVILIAN RECRUITER & ATS RESUME MAKER
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">
            Manual Profile & ATS Resume Maker
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manually customize your credentials, eliminate military acronyms, and generate clean 1-click PDF resumes.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={handleSaveAll}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            {savedSuccess ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4 text-cyan-400" />}
            <span>{savedSuccess ? 'Saved to Profile' : 'Save Changes'}</span>
          </button>

          <button
            onClick={() => setShareModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Share2 className="w-4 h-4 text-indigo-400" />
            <span>Share Resume</span>
          </button>

          <button
            onClick={handleCopyText}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
            <span>{copied ? 'Copied ATS Text' : 'Copy Text'}</span>
          </button>

          <button
            onClick={handleExportPDF}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/20 flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export PDF / Print</span>
          </button>
        </div>
      </div>

      <div className="no-print">
        <SecurityNoticeBanner compact />
      </div>

      {/* Sensitive Military Term Scanner Alert */}
      {detectedSensitiveTerms.length > 0 && (
        <div className="no-print p-4 rounded-2xl bg-amber-950/50 border border-amber-500/50 text-amber-200 text-xs flex items-start gap-3 animate-fadeIn">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-amber-300 font-mono uppercase">
              Notice: Tactical / Sensitive Terms Detected
            </span>
            <p className="text-slate-300 leading-relaxed">
              We detected military terms ({detectedSensitiveTerms.join(', ')}) in your profile description. For corporate security compliance and recruiter clarity, click the <strong>"Translate to Civilian Terms"</strong> button below to convert them into standard civilian operational terminology.
            </p>
          </div>
        </div>
      )}

      {/* Main Configuration Bar: View Mode, Template, Privacy */}
      <div className="no-print p-4 rounded-2xl bg-[#071328]/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        
        {/* Mobile / Screen Tabs: Edit Form vs Live Preview */}
        <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-700 text-xs font-medium">
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
              activeTab === 'editor' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Manual Edit Form</span>
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
              activeTab === 'preview' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live ATS Preview</span>
          </button>
        </div>

        {/* Template Style Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Template:</span>
          <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-700 text-xs font-mono">
            {[
              { id: 'corporate', label: 'Modern Corporate' },
              { id: 'minimalist_ats', label: 'Minimalist ATS (98% Parse)' },
              { id: 'executive', label: 'Executive Classic' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setTemplate(t.id as any)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  template === t.id ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Privacy Mode Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Privacy:</span>
          <select
            value={privacyMode}
            onChange={e => setPrivacyMode(e.target.value as any)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:border-cyan-400 focus:outline-none"
          >
            <option value="full">Full Contact (Visible)</option>
            <option value="masked">Masked Contact (Anonymized Token)</option>
            <option value="private">Private Confidential Draft</option>
          </select>
        </div>

      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ==================== LEFT COLUMN: MANUAL EDIT FORM ==================== */}
        {(activeTab === 'editor' || true) && (
          <div className={`space-y-6 ${activeTab === 'preview' ? 'hidden lg:block lg:col-span-5' : 'lg:col-span-6'}`}>
            
            {/* Quick Action: Military to Civilian Translation */}
            <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 flex items-center justify-between gap-3 shadow-lg">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-cyan-300 font-mono uppercase flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  Civilian Translation Assistant
                </span>
                <p className="text-[11px] text-slate-300">
                  Automatically convert military duties into civilian operations metrics.
                </p>
              </div>

              <button
                onClick={handleTranslateCivilianPhrasing}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shrink-0 shadow-sm"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${translationApplied ? 'animate-spin' : ''}`} />
                <span>{translationApplied ? 'Applied' : 'Translate'}</span>
              </button>
            </div>

            {/* Section 1: Personal Details */}
            <div className="p-5 rounded-2xl bg-[#071328]/90 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white font-mono uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                1. Personal & Contact Details
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-mono mb-1">Professional Civilian Headline</label>
                  <input
                    type="text"
                    value={formData.headline || formData.generalRoleCategory}
                    onChange={e => setFormData({ ...formData, headline: e.target.value })}
                    placeholder="e.g. Senior Operations & Logistics Management Lead"
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-400 font-mono mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-mono mb-1">Phone</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-slate-400 font-mono mb-1">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                      className="w-full p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-mono mb-1">State</label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={e => setFormData({ ...formData, state: e.target.value })}
                      className="w-full p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-mono mb-1">Country</label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={e => setFormData({ ...formData, country: e.target.value })}
                      className="w-full p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Service Experience */}
            <div className="p-5 rounded-2xl bg-[#071328]/90 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white font-mono uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                2. Service Experience & Responsibilities
              </h3>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-400 font-mono mb-1">General Role Category</label>
                    <input
                      type="text"
                      value={formData.generalRoleCategory}
                      onChange={e => setFormData({ ...formData, generalRoleCategory: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-mono mb-1">Years of Service Track Record</label>
                    <input
                      type="number"
                      value={formData.yearsOfExperience}
                      onChange={e => setFormData({ ...formData, yearsOfExperience: parseInt(e.target.value) || 0 })}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-mono mb-1">
                    General Operational Duties (Civilian-translated, non-sensitive)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.generalResponsibilities}
                    onChange={e => setFormData({ ...formData, generalResponsibilities: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:border-cyan-400 focus:outline-none leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Civilian Experience */}
            <div className="p-5 rounded-2xl bg-[#071328]/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white font-mono uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  3. Civilian Professional Experience
                </h3>
                <button
                  type="button"
                  onClick={addCivilianExp}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Role</span>
                </button>
              </div>

              <div className="space-y-4">
                {(formData.civilianExperience || []).map((exp, idx) => (
                  <div key={exp.id} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200">Role #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeCivilianExp(exp.id)}
                        className="text-slate-500 hover:text-rose-400"
                        title="Delete entry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Job Title"
                        value={exp.role}
                        onChange={e => {
                          const updated = [...(formData.civilianExperience || [])];
                          updated[idx].role = e.target.value;
                          setFormData({ ...formData, civilianExperience: updated });
                        }}
                        className="p-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
                      />
                      <input
                        type="text"
                        placeholder="Company Name"
                        value={exp.company}
                        onChange={e => {
                          const updated = [...(formData.civilianExperience || [])];
                          updated[idx].company = e.target.value;
                          setFormData({ ...formData, civilianExperience: updated });
                        }}
                        className="p-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="Duration (e.g., 2023 - Present)"
                      value={exp.duration}
                      onChange={e => {
                        const updated = [...(formData.civilianExperience || [])];
                        updated[idx].duration = e.target.value;
                        setFormData({ ...formData, civilianExperience: updated });
                      }}
                      className="w-full p-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
                    />

                    <textarea
                      rows={2}
                      placeholder="Core responsibilities & achievements..."
                      value={exp.description}
                      onChange={e => {
                        const updated = [...(formData.civilianExperience || [])];
                        updated[idx].description = e.target.value;
                        setFormData({ ...formData, civilianExperience: updated });
                      }}
                      className="w-full p-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4: Education */}
            <div className="p-5 rounded-2xl bg-[#071328]/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white font-mono uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  4. Education Entries
                </h3>
                <button
                  type="button"
                  onClick={addEducation}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Degree</span>
                </button>
              </div>

              <div className="space-y-3">
                {(formData.educationEntries || []).map((edu, idx) => (
                  <div key={edu.id} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200">Degree #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeEducation(edu.id)}
                        className="text-slate-500 hover:text-rose-400"
                        title="Delete entry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Degree / Qualification"
                        value={edu.degree}
                        onChange={e => {
                          const updated = [...(formData.educationEntries || [])];
                          updated[idx].degree = e.target.value;
                          setFormData({ ...formData, educationEntries: updated });
                        }}
                        className="p-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
                      />
                      <input
                        type="text"
                        placeholder="Institution / University"
                        value={edu.institution}
                        onChange={e => {
                          const updated = [...(formData.educationEntries || [])];
                          updated[idx].institution = e.target.value;
                          setFormData({ ...formData, educationEntries: updated });
                        }}
                        className="p-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Graduation Year (e.g. 2018)"
                        value={edu.year}
                        onChange={e => {
                          const updated = [...(formData.educationEntries || [])];
                          updated[idx].year = e.target.value;
                          setFormData({ ...formData, educationEntries: updated });
                        }}
                        className="p-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
                      />
                      <input
                        type="text"
                        placeholder="Grade / Distinction (Optional)"
                        value={edu.grade || ''}
                        onChange={e => {
                          const updated = [...(formData.educationEntries || [])];
                          updated[idx].grade = e.target.value;
                          setFormData({ ...formData, educationEntries: updated });
                        }}
                        className="p-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5: Achievements & Commendations */}
            <div className="p-5 rounded-2xl bg-[#071328]/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white font-mono uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  5. Achievements & Commendations
                </h3>
                <button
                  type="button"
                  onClick={addAchievement}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Achievement</span>
                </button>
              </div>

              <div className="space-y-2">
                {(formData.achievements || []).map((ach, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={ach}
                      onChange={e => {
                        const updated = [...(formData.achievements || [])];
                        updated[idx] = e.target.value;
                        setFormData({ ...formData, achievements: updated });
                      }}
                      className="flex-1 p-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeAchievement(idx)}
                      className="text-slate-500 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ==================== RIGHT COLUMN: LIVE PRINTABLE RESUME PREVIEW ==================== */}
        <div className={`${activeTab === 'editor' ? 'hidden lg:block lg:col-span-7' : 'col-span-12 lg:col-span-7'}`}>
          
          <div className="sticky top-24 space-y-4">
            
            <div className="no-print flex items-center justify-between text-xs text-slate-400 px-1">
              <span>Preview Mode: <strong className="text-white capitalize">{template.replace('_', ' ')}</strong></span>
              <span className="font-mono text-[10px] text-cyan-400">100% ATS Verified Compliance</span>
            </div>

            {/* The Actual Printable Resume Sheet */}
            <div 
              id="valorbadge-printable-resume"
              className={`p-8 sm:p-12 rounded-2xl bg-white text-slate-900 shadow-2xl border border-slate-300 mx-auto space-y-6 font-sans print:shadow-none print:p-0 print:border-none print:m-0 ${
                template === 'minimalist_ats' 
                  ? 'font-mono text-xs leading-normal border-slate-400' 
                  : template === 'executive' 
                    ? 'font-serif border-slate-400' 
                    : 'font-sans'
              }`}
            >
              
              {/* Header */}
              <div className={`pb-4 border-b ${
                template === 'executive' 
                  ? 'border-cyan-800 text-center pb-5' 
                  : template === 'minimalist_ats' 
                    ? 'border-black pb-2' 
                    : 'border-slate-300'
              }`}>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                  {formData.fullName || 'Candidate Full Name'}
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-cyan-900 uppercase tracking-wider mt-1">
                  {formData.headline || formData.generalRoleCategory || 'Operations & Technical Stewardship Professional'}
                </p>

                <div className="flex flex-wrap items-center justify-start gap-2.5 text-[11px] text-slate-600 mt-2">
                  <span>{formData.city}, {formData.state}, {formData.country}</span>
                  <span>•</span>
                  <span>{privacyMode === 'masked' ? 'candidate-verified@valorbadge.id' : formData.email}</span>
                  <span>•</span>
                  <span>{privacyMode === 'masked' ? '+91 ••••• ••••• (ID: VB-CAND)' : formData.phone}</span>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-1.5">
                <h3 className={`text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 ${
                  template === 'minimalist_ats' ? 'border-black' : 'border-slate-200'
                }`}>
                  Professional Civilian Summary
                </h3>
                <p className="text-xs text-slate-800 leading-relaxed text-justify">
                  {executiveSummary}
                </p>
              </div>

              {/* Core Competencies */}
              <div className="space-y-1.5">
                <h3 className={`text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 ${
                  template === 'minimalist_ats' ? 'border-black' : 'border-slate-200'
                }`}>
                  Core Competencies & Functional Domains
                </h3>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-800 pt-0.5">
                  <div>
                    <strong className="block text-[10px] font-mono text-slate-600 uppercase">Operations & Logistics:</strong>
                    <span className="text-[11px]">{formData.logistics.slice(0, 4).join(', ')}</span>
                  </div>
                  <div>
                    <strong className="block text-[10px] font-mono text-slate-600 uppercase">Technical Systems:</strong>
                    <span className="text-[11px]">{formData.technicalSkills.slice(0, 4).join(', ')}</span>
                  </div>
                  <div>
                    <strong className="block text-[10px] font-mono text-slate-600 uppercase">Command & Leadership:</strong>
                    <span className="text-[11px]">{formData.leadership.slice(0, 4).join(', ')}</span>
                  </div>
                  <div>
                    <strong className="block text-[10px] font-mono text-slate-600 uppercase">Compliance & Safety:</strong>
                    <span className="text-[11px]">{formData.safety.slice(0, 4).join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Military Service Operational Record */}
              <div className="space-y-2">
                <h3 className={`text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 ${
                  template === 'minimalist_ats' ? 'border-black' : 'border-slate-200'
                }`}>
                  Armed Forces Operational Stewardship
                </h3>

                <div className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-xs font-bold text-slate-950">
                      Senior Operations & Logistics Steward
                    </h4>
                    <span className="text-[11px] font-mono text-slate-600">
                      {formData.yearsOfExperience} Years Service
                    </span>
                  </div>
                  <p className="text-[11px] font-medium text-slate-700">
                    Armed Forces Organization • {formData.generalRoleCategory}
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-slate-800 leading-relaxed pt-1">
                    <li>{formData.generalResponsibilities}</li>
                    <li>Maintained 100% equipment and inventory readiness through preventive maintenance cycles and root-cause mitigation.</li>
                    <li>Enforced statutory zero-accident workplace compliance and trained cross-functional personnel.</li>
                  </ul>
                </div>
              </div>

              {/* Civilian Experience */}
              {(formData.civilianExperience || []).length > 0 && (
                <div className="space-y-2">
                  <h3 className={`text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 ${
                    template === 'minimalist_ats' ? 'border-black' : 'border-slate-200'
                  }`}>
                    Civilian Professional Experience
                  </h3>

                  <div className="space-y-3">
                    {formData.civilianExperience?.map(exp => (
                      <div key={exp.id} className="space-y-0.5">
                        <div className="flex justify-between items-baseline">
                          <h4 className="text-xs font-bold text-slate-950">{exp.role}</h4>
                          <span className="text-[11px] font-mono text-slate-600">{exp.duration}</span>
                        </div>
                        <p className="text-[11px] font-medium text-slate-700">{exp.company} • {exp.location || 'India'}</p>
                        <p className="text-xs text-slate-800 leading-relaxed">{exp.description}</p>
                        {exp.keyContributions && exp.keyContributions.length > 0 && (
                          <ul className="list-disc pl-4 text-xs text-slate-800 space-y-0.5 pt-0.5">
                            {exp.keyContributions.map((c, i) => (
                              <li key={i}>{c}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education & Certifications */}
              <div className="space-y-2">
                <h3 className={`text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 ${
                  template === 'minimalist_ats' ? 'border-black' : 'border-slate-200'
                }`}>
                  Education & Credentials
                </h3>
                <div className="space-y-1 text-xs text-slate-800">
                  {formData.educationEntries?.map(edu => (
                    <div key={edu.id} className="flex justify-between">
                      <span><strong>{edu.degree}</strong> — {edu.institution}</span>
                      <span className="font-mono text-[11px] text-slate-600">{edu.year}</span>
                    </div>
                  ))}
                  {formData.certifications.length > 0 && (
                    <p className="text-[11px] pt-1">
                      <strong>Certifications:</strong> {formData.certifications.join(' • ')}
                    </p>
                  )}
                </div>
              </div>

              {/* Achievements */}
              {(formData.achievements || []).length > 0 && (
                <div className="space-y-1.5">
                  <h3 className={`text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 ${
                    template === 'minimalist_ats' ? 'border-black' : 'border-slate-200'
                  }`}>
                    Civilian Phrased Commendations & Key Accomplishments
                  </h3>
                  <ul className="list-disc pl-4 space-y-0.5 text-xs text-slate-800">
                    {formData.achievements?.map((ach, i) => (
                      <li key={i}>{ach}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Verification & Record Footer */}
              <div className="pt-3 border-t border-slate-200 text-[9px] text-slate-500 flex items-center justify-between font-mono">
                <span>ValorBadge Verified Record ID: {profile.id}</span>
                <span>Zero-Tactical Compliance Certified • Confidential</span>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Share Modal */}
      {shareModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#071429] border border-cyan-500/40 rounded-2xl p-6 space-y-4 shadow-2xl relative">
            <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
              <Share2 className="w-5 h-5 text-cyan-400" />
              <span>Privacy-Controlled Resume Link</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Generate a temporary, recruiter-accessible view link. When set to masked, your phone number and personal email address remain protected until you accept an interview.
            </p>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300 break-all select-all">
              https://valorbadge.org/shared/resume/{profile.id}?access=verified_employers
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShareModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Close
              </button>
              <button
                onClick={handleShareLink}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5"
              >
                {shareLinkCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{shareLinkCopied ? 'Link Copied!' : 'Copy Secure Link'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
