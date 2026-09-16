import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  Briefcase, 
  Plus, 
  AlertCircle, 
  Save, 
  Globe, 
  Mail, 
  MapPin, 
  FileText, 
  Users, 
  Eye, 
  HelpCircle,
  ExternalLink,
  Award,
  Sparkles,
  Phone,
  User,
  Trash2,
  Edit3,
  Search,
  X,
  RefreshCw,
  Clock,
  DollarSign,
  AlertTriangle,
  RotateCcw,
  SlidersHorizontal
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { DemoDataBadge } from '../../common/DemoDataBadge';
import { SecurityNoticeBanner } from '../../common/SecurityNoticeBanner';
import { CompanyProfile, JobOpportunity } from '../../../types';

interface LocalJobFormData {
  title: string;
  company: string;
  companyId: string;
  location: string;
  country: string;
  state: string;
  city: string;
  industry: string;
  type: JobOpportunity['type'];
  sector: JobOpportunity['sector'];
  workplaceType: JobOpportunity['workplaceType'];
  description: string;
  responsibilities: string;
  educationRequired: string;
  experienceLevel: string;
  requiredSkills: string[];
  salaryRange: string;
  benefits: string[];
  duration: string;
  applicationDeadline: string;
  applicationInstructions: string;
  officialUrl: string;
  isVerifiedEmployer: boolean;
  isAccessibleRole: boolean;
  isVeteranFriendly: boolean;
}

export const CompanyProfileView: React.FC = () => {
  const { 
    companies, 
    updateCompanyProfile, 
    resetCompanyToManual, 
    loadDemoCompany, 
    jobs, 
    addJobPosting, 
    updateJobPosting, 
    deleteJobPosting, 
    currentRole, 
    setCurrentRole, 
    setCurrentRoute 
  } = useApp();

  // Selected company (default to first or active)
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>(companies[0]?.id || 'comp-1');
  const activeCompany = companies.find(c => c.id === selectedCompanyId) || companies[0];

  // Navigation tab
  const [activeTab, setActiveTab] = useState<'profile' | 'narratives' | 'postings' | 'verification'>('profile');

  // Form state for Company Profile
  const [formData, setFormData] = useState<CompanyProfile>({ ...activeCompany });
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isDirty, setIsDirty] = useState(false);

  // Modals
  const [confirmClearModal, setConfirmClearModal] = useState(false);
  const [confirmDeleteJobId, setConfirmDeleteJobId] = useState<string | null>(null);

  // Job Search & Filtering in Postings tab
  const [jobSearchQuery, setJobSearchQuery] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('all');

  // Job Opportunity Modal (Add / Edit)
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [jobFormErrors, setJobFormErrors] = useState<string[]>([]);
  const [newRequiredSkill, setNewRequiredSkill] = useState('');
  const [newBenefit, setNewBenefit] = useState('');

  const [jobFormData, setJobFormData] = useState<LocalJobFormData>({
    title: '',
    company: activeCompany?.companyName || '',
    companyId: activeCompany?.id || '',
    location: '',
    country: 'IN',
    state: '',
    city: '',
    industry: activeCompany?.industry || 'Logistics & Supply Chain',
    type: 'full-time',
    sector: 'private',
    workplaceType: 'hybrid',
    description: '',
    responsibilities: '',
    educationRequired: 'Graduation / Military Technical Equivalent',
    experienceLevel: '3-5 Years Service',
    requiredSkills: [],
    salaryRange: '₹8,00,000 - ₹12,00,000 / annum',
    benefits: [],
    duration: '',
    applicationDeadline: '30 Days from posting',
    applicationInstructions: 'Submit verified civilian translation. Direct recruiter interview round scheduled within 7 working days.',
    officialUrl: activeCompany?.website || 'https://example.com/careers',
    isVerifiedEmployer: true,
    isAccessibleRole: true,
    isVeteranFriendly: true
  });

  // Sync formData when activeCompany changes
  useEffect(() => {
    if (activeCompany) {
      setFormData({ ...activeCompany });
      setIsDirty(false);
    }
  }, [selectedCompanyId, companies]);

  const handleFieldChange = <K extends keyof CompanyProfile>(field: K, value: CompanyProfile[K]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setIsDirty(true);
    setValidationErrors([]);
  };

  const validateCompanyForm = (): boolean => {
    const errors: string[] = [];
    if (!formData.companyName.trim()) {
      errors.push('Company Name is required.');
    }
    if (!formData.officialEmail.trim()) {
      errors.push('Official Contact Email is required.');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.officialEmail.trim())) {
        errors.push('Official Email must be a valid email format.');
      }
    }
    if (!formData.industry.trim()) {
      errors.push('Industry category is required.');
    }
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSaveProfile = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validateCompanyForm()) {
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    updateCompanyProfile(activeCompany.id, {
      ...formData,
      isCompanyAuthored: true
    });

    setSavedSuccess(true);
    setIsDirty(false);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const handleResetForm = () => {
    setFormData({ ...activeCompany });
    setIsDirty(false);
    setValidationErrors([]);
  };

  const handleClearToManual = () => {
    resetCompanyToManual(activeCompany.id);
    setConfirmClearModal(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleLoadDemo = () => {
    loadDemoCompany(activeCompany.id);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Job postings filtering
  const companyJobs = jobs.filter(j => 
    j.companyId === activeCompany.id || 
    j.company?.toLowerCase() === activeCompany.companyName.toLowerCase()
  );

  const filteredCompanyJobs = companyJobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(jobSearchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(jobSearchQuery.toLowerCase()) ||
      (job.description && job.description.toLowerCase().includes(jobSearchQuery.toLowerCase()));
    
    const matchesType = jobTypeFilter === 'all' || job.type === jobTypeFilter;
    return matchesSearch && matchesType;
  });

  // Open Add Job Modal
  const handleOpenAddJob = () => {
    setJobFormData({
      title: '',
      company: activeCompany.companyName,
      companyId: activeCompany.id,
      location: activeCompany.city ? `${activeCompany.city}, ${activeCompany.state || activeCompany.country}` : 'India',
      country: activeCompany.country || 'IN',
      state: activeCompany.state || '',
      city: activeCompany.city || '',
      industry: activeCompany.industry || 'Logistics & Supply Chain',
      type: 'full-time',
      sector: 'private',
      workplaceType: 'hybrid',
      description: '',
      responsibilities: '',
      educationRequired: 'Bachelor / Military Technical Equivalent',
      experienceLevel: '3-5 Years Service Experience',
      requiredSkills: ['Operations Management', 'Process Governance'],
      salaryRange: '₹8,00,000 - ₹14,00,000 / annum',
      benefits: ['Medical Health Cover', 'Transition Mentorship', 'Provident Fund'],
      duration: '',
      applicationDeadline: '30 Days',
      applicationInstructions: 'Apply with verified civilian resume translation.',
      officialUrl: activeCompany.website || 'https://example.com/careers',
      isVerifiedEmployer: true,
      isAccessibleRole: true,
      isVeteranFriendly: true
    });
    setEditingJobId(null);
    setJobFormErrors([]);
    setIsJobModalOpen(true);
  };

  // Open Edit Job Modal
  const handleOpenEditJob = (job: JobOpportunity) => {
    setJobFormData({
      title: job.title,
      company: job.company,
      companyId: job.companyId || activeCompany.id,
      location: job.location,
      country: job.country || 'IN',
      state: job.state || '',
      city: job.city || '',
      industry: job.industry,
      type: job.type,
      sector: job.sector,
      workplaceType: job.workplaceType || 'hybrid',
      description: job.description,
      responsibilities: job.responsibilities || '',
      educationRequired: job.educationRequired || 'Bachelor / Military Technical Equivalent',
      experienceLevel: job.experienceLevel,
      requiredSkills: job.requiredSkills || job.civilianSkillsMatched || [],
      salaryRange: job.salaryRange,
      benefits: job.benefits ? [job.benefits] : [],
      duration: job.duration || '',
      applicationDeadline: job.applicationDeadline || '',
      applicationInstructions: job.applicationInstructions || job.applicationProcess || '',
      officialUrl: job.officialUrl || '',
      isVerifiedEmployer: job.isVerifiedEmployer ?? true,
      isAccessibleRole: job.isAccessibleRole ?? true,
      isVeteranFriendly: job.isVeteranFriendly ?? true
    });
    setEditingJobId(job.id);
    setJobFormErrors([]);
    setIsJobModalOpen(true);
  };

  const handleSaveJobPosting = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: string[] = [];
    if (!jobFormData.title.trim()) errors.push('Job Title is required.');
    if (!jobFormData.location.trim()) errors.push('Location is required.');
    if (!jobFormData.description.trim()) errors.push('Job Description is required.');

    if (errors.length > 0) {
      setJobFormErrors(errors);
      return;
    }

    const payload: Omit<JobOpportunity, 'id' | 'postedDate' | 'isDemoData'> = {
      title: jobFormData.title,
      company: jobFormData.company,
      companyId: jobFormData.companyId,
      location: jobFormData.location,
      country: jobFormData.country,
      state: jobFormData.state,
      city: jobFormData.city,
      industry: jobFormData.industry,
      type: jobFormData.type,
      sector: jobFormData.sector,
      workplaceType: jobFormData.workplaceType,
      description: jobFormData.description,
      responsibilities: jobFormData.responsibilities,
      educationRequired: jobFormData.educationRequired,
      experienceLevel: jobFormData.experienceLevel,
      requiredSkills: jobFormData.requiredSkills,
      salaryRange: jobFormData.salaryRange,
      benefits: jobFormData.benefits.join(', '),
      duration: jobFormData.duration,
      applicationDeadline: jobFormData.applicationDeadline,
      applicationInstructions: jobFormData.applicationInstructions,
      officialUrl: jobFormData.officialUrl,
      isVerifiedEmployer: jobFormData.isVerifiedEmployer,
      verificationStatus: 'verified',
      isAccessibleRole: jobFormData.isAccessibleRole,
      isVeteranFriendly: jobFormData.isVeteranFriendly,
      civilianSkillsMatched: jobFormData.requiredSkills,
      militaryBackgroundSuitability: ['All Defense Arms', 'Agniveer Cohort'],
      veteranFriendlyScore: 95,
      status: 'active',
      isCompanyAuthored: true
    };

    if (editingJobId) {
      updateJobPosting(editingJobId, payload);
    } else {
      addJobPosting(payload);
    }

    setIsJobModalOpen(false);
    setEditingJobId(null);
  };

  const handleDeleteJob = (id: string) => {
    deleteJobPosting(id);
    setConfirmDeleteJobId(null);
  };

  const addRequiredSkill = () => {
    if (!newRequiredSkill.trim()) return;
    if (!jobFormData.requiredSkills?.includes(newRequiredSkill.trim())) {
      setJobFormData(prev => ({
        ...prev,
        requiredSkills: [...(prev.requiredSkills || []), newRequiredSkill.trim()]
      }));
    }
    setNewRequiredSkill('');
  };

  const removeRequiredSkill = (skill: string) => {
    setJobFormData(prev => ({
      ...prev,
      requiredSkills: (prev.requiredSkills || []).filter(s => s !== skill)
    }));
  };

  const addBenefit = () => {
    if (!newBenefit.trim()) return;
    if (!jobFormData.benefits?.includes(newBenefit.trim())) {
      setJobFormData(prev => ({
        ...prev,
        benefits: [...(prev.benefits || []), newBenefit.trim()]
      }));
    }
    setNewBenefit('');
  };

  const removeBenefit = (item: string) => {
    setJobFormData(prev => ({
      ...prev,
      benefits: (prev.benefits || []).filter(b => b !== item)
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Access Control Notice for Candidate / Veteran Mode */}
      {currentRole === 'user' && (
        <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 text-cyan-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-white">Viewing Company in Public / Candidate Mode</p>
              <p className="text-xs text-cyan-300/90 mt-0.5">
                Corporate editing, publishing openings, and modifying employer policies are restricted to authorized recruiters. You can view the public company profile, or switch roles to test corporate administration.
              </p>
            </div>
          </div>
          <button
            onClick={() => setCurrentRole('employer')}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shrink-0 active:scale-95"
          >
            Switch to Employer Mode
          </button>
        </div>
      )}

      {/* Header Banner & CRUD Action Bar */}
      <div className="p-6 rounded-2xl bg-[#061022]/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                <span>EMPLOYER / COMPANY MANAGEMENT</span>
              </span>

              {formData.isDemoData ? (
                <DemoDataBadge />
              ) : (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Verified Corporate Account</span>
                </span>
              )}

              {isDirty && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30 animate-pulse">
                  Unsaved Changes
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              {formData.companyName ? formData.companyName : 'Manual Company Profile'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Manage verified corporate information, veteran hiring initiatives, accessibility provisions, and job/internship listings.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {currentRole === 'employer' && (
              <>
                <button
                  type="button"
                  onClick={() => handleSaveProfile()}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5 active:scale-95"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Company Profile</span>
                </button>

                {isDirty && (
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Cancel</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleLoadDemo}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 text-xs font-mono border border-slate-700 transition-colors flex items-center gap-1.5"
                  title="Load realistic demo company data"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Load Demo Company</span>
                </button>

                <button
                  type="button"
                  onClick={() => setConfirmClearModal(true)}
                  className="px-3.5 py-2.5 rounded-xl bg-red-950/40 hover:bg-red-950/70 text-red-300 text-xs font-mono border border-red-800/40 transition-colors flex items-center gap-1.5"
                  title="Clear company profile to blank manual entry"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                  <span>Clear to Empty</span>
                </button>
              </>
            )}

            {currentRole === 'user' && (
              <button
                type="button"
                onClick={() => setCurrentRoute('jobs')}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors flex items-center gap-1.5"
              >
                <Briefcase className="w-4 h-4 text-cyan-400" />
                <span>Browse All Jobs</span>
              </button>
            )}
          </div>
        </div>

        {/* Company Switcher (for multi-tenant demo preview) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">Select Corporate Entity:</span>
            <select
              value={selectedCompanyId}
              onChange={e => setSelectedCompanyId(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
            >
              {companies.map(c => (
                <option key={c.id} value={c.id}>
                  {c.companyName} ({c.industry || 'Logistics'})
                </option>
              ))}
            </select>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'profile', label: '1. Basic Company Details' },
              { id: 'narratives', label: '2. Workplace & Initiatives' },
              { id: 'postings', label: `3. Job Opportunities (${companyJobs.length})` },
              { id: 'verification', label: '4. Verification & Trust' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <SecurityNoticeBanner />

      {/* Saved Success Toast */}
      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs sm:text-sm font-medium flex items-center justify-between gap-3 shadow-lg shadow-emerald-950/40 animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Company profile successfully updated! Changes are reflected in candidate search and vacancy listings.</span>
          </div>
          <button onClick={() => setSavedSuccess(false)} className="text-emerald-400 hover:text-emerald-200">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Validation Errors Notice */}
      {validationErrors.length > 0 && (
        <div className="p-4 rounded-xl bg-red-950/70 border border-red-500/50 text-red-200 text-xs sm:text-sm space-y-1 shadow-lg shadow-red-950/40 animate-shake">
          <div className="flex items-center gap-2 font-bold text-red-300">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span>Please correct the following:</span>
          </div>
          <ul className="list-disc list-inside space-y-0.5 text-xs text-red-200/90 pl-1">
            {validationErrors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 1: Basic Company Details */}
      {/* ========================================================================= */}
      {activeTab === 'profile' && (
        <div className="p-6 sm:p-7 rounded-2xl bg-[#061022]/85 border border-slate-800 space-y-6 shadow-md">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              SECTION 1
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white font-display">
              Basic Company & Recruiter Information
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Enter official identification, location, contact, and workforce sizing details.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {/* Company Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                Company Name <span className="text-cyan-400">*</span>
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  disabled={currentRole !== 'employer'}
                  value={formData.companyName}
                  onChange={e => handleFieldChange('companyName', e.target.value)}
                  placeholder="e.g., Nexus Supply Chain Solutions"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none disabled:opacity-60"
                />
              </div>
            </div>

            {/* Industry */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                Industry Sector <span className="text-cyan-400">*</span>
              </label>
              <input
                type="text"
                disabled={currentRole !== 'employer'}
                value={formData.industry}
                onChange={e => handleFieldChange('industry', e.target.value)}
                placeholder="e.g., Logistics & Supply Chain, Defense Tech, Manufacturing"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none disabled:opacity-60"
              />
            </div>

            {/* Website */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                Company Website
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="url"
                  disabled={currentRole !== 'employer'}
                  value={formData.website || ''}
                  onChange={e => handleFieldChange('website', e.target.value)}
                  placeholder="e.g., https://nexus-logistics.in"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none disabled:opacity-60"
                />
              </div>
            </div>

            {/* Country */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                Country
              </label>
              <input
                type="text"
                disabled={currentRole !== 'employer'}
                value={formData.country || 'India'}
                onChange={e => handleFieldChange('country', e.target.value)}
                placeholder="e.g., India"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none disabled:opacity-60"
              />
            </div>

            {/* State / Region */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                State / Region
              </label>
              <input
                type="text"
                disabled={currentRole !== 'employer'}
                value={formData.state || ''}
                onChange={e => handleFieldChange('state', e.target.value)}
                placeholder="e.g., Karnataka, Maharashtra, Haryana"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none disabled:opacity-60"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                City / Corporate Headquarters
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  disabled={currentRole !== 'employer'}
                  value={formData.city || formData.hqLocation || ''}
                  onChange={e => {
                    handleFieldChange('city', e.target.value);
                    handleFieldChange('hqLocation', e.target.value);
                  }}
                  placeholder="e.g., Bengaluru, Pune, Gurugram"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none disabled:opacity-60"
                />
              </div>
            </div>

            {/* Company Size */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                Company Size
              </label>
              <select
                disabled={currentRole !== 'employer'}
                value={formData.companySize || '51-200 Employees'}
                onChange={e => handleFieldChange('companySize', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none disabled:opacity-60"
              >
                <option value="1-50 Employees">1-50 Employees (Startup / SME)</option>
                <option value="51-200 Employees">51-200 Employees (Growing Enterprise)</option>
                <option value="201-1000 Employees">201-1000 Employees (Mid-Market)</option>
                <option value="1000+ Employees">1000+ Employees (Large Conglomerate / MNC)</option>
              </select>
            </div>

            {/* Recruiter Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                Primary Recruiter / HR Contact Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  disabled={currentRole !== 'employer'}
                  value={formData.recruiterName || ''}
                  onChange={e => handleFieldChange('recruiterName', e.target.value)}
                  placeholder="e.g., Meera Sundaram"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none disabled:opacity-60"
                />
              </div>
            </div>

            {/* Recruiter Designation */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                Recruiter Designation
              </label>
              <input
                type="text"
                disabled={currentRole !== 'employer'}
                value={formData.recruiterDesignation || ''}
                onChange={e => handleFieldChange('recruiterDesignation', e.target.value)}
                placeholder="e.g., Head of Veteran Talent Acquisition"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none disabled:opacity-60"
              />
            </div>

            {/* Official Contact Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                Official Contact Email <span className="text-cyan-400">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  disabled={currentRole !== 'employer'}
                  value={formData.officialEmail}
                  onChange={e => handleFieldChange('officialEmail', e.target.value)}
                  placeholder="e.g., careers@nexus-logistics.in"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none disabled:opacity-60"
                />
              </div>
            </div>

            {/* Official Phone */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                Official Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="tel"
                  disabled={currentRole !== 'employer'}
                  value={formData.officialPhone || ''}
                  onChange={e => handleFieldChange('officialPhone', e.target.value)}
                  placeholder="e.g., +91 80 4123 9800"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none disabled:opacity-60"
                />
              </div>
            </div>

            {/* CIN / GSTIN Verification Token */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                Corporate CIN / GSTIN
              </label>
              <input
                type="text"
                disabled={currentRole !== 'employer'}
                value={formData.cinGstin || ''}
                onChange={e => handleFieldChange('cinGstin', e.target.value)}
                placeholder="e.g., U63090KA2018PTC112345"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none font-mono disabled:opacity-60"
              />
            </div>

          </div>

          {/* Company Brief Overview */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
              Company Brief Overview
            </label>
            <textarea
              rows={3}
              disabled={currentRole !== 'employer'}
              value={formData.description}
              onChange={e => handleFieldChange('description', e.target.value)}
              placeholder="Provide a concise 2-3 sentence overview of what your company does and your operating scale..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none resize-y disabled:opacity-60"
            />
          </div>

          {/* Quick Informational Sections: Veteran, Internship, Apprenticeship, Accessibility */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-slate-800">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                Veteran Hiring Summary
              </label>
              <textarea
                rows={3}
                disabled={currentRole !== 'employer'}
                value={formData.veteranHiringInfo || ''}
                onChange={e => handleFieldChange('veteranHiringInfo', e.target.value)}
                placeholder="Summarize your veteran inclusion policy, onboarding buddies, or reserved cohorts..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none resize-y disabled:opacity-60"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                Accessibility & Accommodation Summary
              </label>
              <textarea
                rows={3}
                disabled={currentRole !== 'employer'}
                value={formData.accessibilityInfo || ''}
                onChange={e => handleFieldChange('accessibilityInfo', e.target.value)}
                placeholder="Describe wheelchair ramps, ergonomic workstations, hearing assistive technologies, or adaptive scheduling..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none resize-y disabled:opacity-60"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                Internship Information
              </label>
              <textarea
                rows={3}
                disabled={currentRole !== 'employer'}
                value={formData.internshipInfo || ''}
                onChange={e => handleFieldChange('internshipInfo', e.target.value)}
                placeholder="Details on transition internships, paid stipends, and full-time conversion opportunities..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none resize-y disabled:opacity-60"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                Apprenticeship Information
              </label>
              <textarea
                rows={3}
                disabled={currentRole !== 'employer'}
                value={formData.apprenticeshipInfo || ''}
                onChange={e => handleFieldChange('apprenticeshipInfo', e.target.value)}
                placeholder="National Apprenticeship Promotion Scheme (NAPS) tracks, technical trade conversions..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none resize-y disabled:opacity-60"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: Workplace & Long-form Detailed Descriptions */}
      {/* ========================================================================= */}
      {activeTab === 'narratives' && (
        <div className="p-6 sm:p-7 rounded-2xl bg-[#061022]/85 border border-slate-800 space-y-6 shadow-md">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              SECTION 2
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white font-display">
              Detailed Workplace Descriptions & Initiatives
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Allow veterans and candidates to understand your corporate culture, training opportunities, and recruitment pipeline in depth.
            </p>
          </div>

          <div className="space-y-6">
            
            {/* Workplace Description */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-200 font-mono uppercase">
                Workplace Culture & Operational Environment
              </label>
              <textarea
                rows={4}
                disabled={currentRole !== 'employer'}
                value={formData.workplaceDescription || ''}
                onChange={e => handleFieldChange('workplaceDescription', e.target.value)}
                placeholder="Describe your operational facilities, depot centers, offices, team values, safety protocols, and daily cadence..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none resize-y disabled:opacity-60 leading-relaxed"
              />
            </div>

            {/* Career Opportunities */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-200 font-mono uppercase">
                Available Career Opportunities & Growth Trajectories
              </label>
              <textarea
                rows={4}
                disabled={currentRole !== 'employer'}
                value={formData.careerOpportunitiesDescription || ''}
                onChange={e => handleFieldChange('careerOpportunitiesDescription', e.target.value)}
                placeholder="Outline the typical career ladders available for veterans, promotion paths, and operational leadership roles..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none resize-y disabled:opacity-60 leading-relaxed"
              />
            </div>

            {/* Skills Looked For */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-200 font-mono uppercase">
                Skills & Mindset You Look For in Candidates
              </label>
              <textarea
                rows={4}
                disabled={currentRole !== 'employer'}
                value={formData.skillsLookedForDescription || ''}
                onChange={e => handleFieldChange('skillsLookedForDescription', e.target.value)}
                placeholder="Describe the specific leadership traits, operational discipline, process orientation, and technical capabilities your hiring managers value..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none resize-y disabled:opacity-60 leading-relaxed"
              />
            </div>

            {/* Veteran-Friendly Initiatives */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-200 font-mono uppercase">
                Veteran-Friendly Initiatives & Transition Support
              </label>
              <textarea
                rows={4}
                disabled={currentRole !== 'employer'}
                value={formData.veteranInitiativesDescription || ''}
                onChange={e => handleFieldChange('veteranInitiativesDescription', e.target.value)}
                placeholder="Detail your veteran employee resource groups (ERGs), transition buddy programs, executive mentorship, and defense-to-civilian conversion programs..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none resize-y disabled:opacity-60 leading-relaxed"
              />
            </div>

            {/* Internship Programs */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-200 font-mono uppercase">
                Internship Programs for Veterans & Transitioning Personnel
              </label>
              <textarea
                rows={4}
                disabled={currentRole !== 'employer'}
                value={formData.internshipProgramsDescription || ''}
                onChange={e => handleFieldChange('internshipProgramsDescription', e.target.value)}
                placeholder="Describe your paid fellowship structures, duration (e.g., 3-6 months), project assignments, and hiring conversion rates..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none resize-y disabled:opacity-60 leading-relaxed"
              />
            </div>

            {/* Apprenticeship Programs */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-200 font-mono uppercase">
                Apprenticeship & Technical Conversion Programs
              </label>
              <textarea
                rows={4}
                disabled={currentRole !== 'employer'}
                value={formData.apprenticeshipProgramsDescription || ''}
                onChange={e => handleFieldChange('apprenticeshipProgramsDescription', e.target.value)}
                placeholder="Information on shop-floor mechanical apprenticeships, automation technician tracks, and certification sponsorships..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none resize-y disabled:opacity-60 leading-relaxed"
              />
            </div>

            {/* Training Opportunities */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-200 font-mono uppercase">
                Training & Upskilling Opportunities Provided
              </label>
              <textarea
                rows={4}
                disabled={currentRole !== 'employer'}
                value={formData.trainingOpportunitiesDescription || ''}
                onChange={e => handleFieldChange('trainingOpportunitiesDescription', e.target.value)}
                placeholder="Describe company-sponsored software training, Six Sigma courses, leadership bootcamps, or educational tuition reimbursements..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none resize-y disabled:opacity-60 leading-relaxed"
              />
            </div>

            {/* Application Process */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-200 font-mono uppercase">
                Application & Interview Process Steps
              </label>
              <textarea
                rows={4}
                disabled={currentRole !== 'employer'}
                value={formData.applicationProcessDescription || ''}
                onChange={e => handleFieldChange('applicationProcessDescription', e.target.value)}
                placeholder="Step 1: Resume screening → Step 2: Operations review → Step 3: Cultural round → Step 4: Offer letter. Detail timeline and feedback guarantees..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none resize-y disabled:opacity-60 leading-relaxed"
              />
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: Job Opportunities (CRUD Postings) */}
      {/* ========================================================================= */}
      {activeTab === 'postings' && (
        <div className="p-6 sm:p-7 rounded-2xl bg-[#061022]/85 border border-slate-800 space-y-6 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                SECTION 3
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white font-display flex items-center gap-2">
                <span>Job & Internship Opportunities</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  {companyJobs.length} Active
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Companies manually create and manage each opening with detailed responsibilities, qualifications, and benefits.
              </p>
            </div>

            {currentRole === 'employer' && (
              <button
                type="button"
                onClick={handleOpenAddJob}
                className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all flex items-center gap-1.5 self-start sm:self-auto active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Opportunity</span>
              </button>
            )}
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                value={jobSearchQuery}
                onChange={e => setJobSearchQuery(e.target.value)}
                placeholder="Search job title, location, or keywords..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-8 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
              />
              {jobSearchQuery && (
                <button
                  type="button"
                  onClick={() => setJobSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={jobTypeFilter}
                onChange={e => setJobTypeFilter(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
              >
                <option value="all">All Opportunity Types</option>
                <option value="full-time">Full-Time</option>
                <option value="part-time">Part-Time</option>
                <option value="internship">Internship</option>
                <option value="apprenticeship">Apprenticeship</option>
                <option value="contract">Contract</option>
              </select>

              {(jobSearchQuery || jobTypeFilter !== 'all') && (
                <button
                  type="button"
                  onClick={() => {
                    setJobSearchQuery('');
                    setJobTypeFilter('all');
                  }}
                  className="px-2.5 py-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs whitespace-nowrap"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Job Listings Grid */}
          {filteredCompanyJobs.length === 0 ? (
            <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-3">
              <Briefcase className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-sm font-semibold text-white">No opportunities found matching your filters</p>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                {companyJobs.length === 0 
                  ? 'No job openings currently published for this company. Click "Create New Opportunity" to post a role.'
                  : 'Try adjusting your search keywords or opportunity type filter.'}
              </p>
              {currentRole === 'employer' && companyJobs.length === 0 && (
                <button
                  type="button"
                  onClick={handleOpenAddJob}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all"
                >
                  Create First Opportunity
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCompanyJobs.map(job => (
                <div
                  key={job.id}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-700/80 space-y-4 hover:border-cyan-500/50 transition-all shadow-md"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold text-white">{job.title}</h3>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 uppercase">
                          {job.type}
                        </span>
                        {job.isVerifiedEmployer && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-emerald-400" />
                            Verified Opportunity
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                          {job.salaryRange}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {job.experienceLevel}
                        </span>
                      </div>
                    </div>

                    {/* CRUD Buttons for Job */}
                    <div className="flex items-center gap-2 shrink-0 self-start">
                      {currentRole === 'employer' ? (
                        <>
                          <button
                            type="button"
                            onClick={() => handleOpenEditJob(job)}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1 transition-colors"
                          >
                            <Edit3 className="w-3 h-3 text-cyan-400" />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteJobId(job.id)}
                            className="px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-950 text-red-300 text-xs font-semibold border border-red-800/40 flex items-center gap-1 transition-colors"
                          >
                            <Trash2 className="w-3 h-3 text-red-400" />
                            <span>Delete</span>
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setCurrentRoute('jobs')}
                          className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-colors"
                        >
                          View in Jobs Hub
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {job.description}
                  </p>

                  {job.responsibilities && (
                    <div className="text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                      <span className="font-mono uppercase text-slate-300 font-semibold block mb-1">Key Responsibilities:</span>
                      <p className="leading-relaxed whitespace-pre-line">{job.responsibilities}</p>
                    </div>
                  )}

                  {/* Skills & Benefits */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-800/80">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] font-mono text-slate-500 mr-1">Skills:</span>
                      {(job.requiredSkills || job.civilianSkillsMatched)?.map(skill => (
                        <span key={skill} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] font-mono">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {job.applicationDeadline && (
                      <span className="text-[11px] font-mono text-slate-400">
                        Deadline: <span className="text-cyan-400">{job.applicationDeadline}</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: Verification & Trust */}
      {/* ========================================================================= */}
      {activeTab === 'verification' && (
        <div className="p-6 sm:p-7 rounded-2xl bg-[#061022]/85 border border-slate-800 space-y-6 shadow-md">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              SECTION 4
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white font-display">
              Corporate Verification & Trust Governance
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              ValorBadge enforces strict zero-scam compliance, zero fee collection from veterans, and verified corporate entity checks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <ShieldCheck className="w-5 h-5" />
                <span>Verification Status: Verified Active</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                This corporate identity has completed document inspection, CIN validation, and HR contact verification. Postings from this company carry the Verified Shield badge.
              </p>
              <div className="pt-2 text-xs font-mono text-slate-400 space-y-1">
                <div>CIN Token: <span className="text-white">{formData.cinGstin || 'Verified'}</span></div>
                <div>Official Domain: <span className="text-white">{formData.website || 'Verified'}</span></div>
                <div>Pledge Signatory: <span className="text-emerald-400">Signed Veteran Hiring Charter</span></div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>Veteran Zero-Fee Guarantee</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                By publishing opportunities on ValorBadge, employers legally attest that no recruitment, application, placement, or training fees will ever be levied against veterans or transition candidates.
              </p>
              <div className="pt-2 text-xs text-slate-400">
                Any violation triggers immediate suspension and reporting to statutory defense welfare authorities.
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Floating Save Bar (Only for Employer role) */}
      {currentRole === 'employer' && (
        <div className="sticky bottom-4 z-30 p-4 rounded-2xl bg-[#08152e]/95 backdrop-blur-md border border-cyan-500/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              {isDirty ? 'Unsaved company profile updates detected.' : 'Company profile is synchronized.'}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {isDirty && (
              <button
                type="button"
                onClick={handleResetForm}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
              >
                Revert Edits
              </button>
            )}

            <button
              type="button"
              onClick={() => handleSaveProfile()}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-1.5 active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Save Company Profile</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: Create / Edit Job Opportunity */}
      {/* ========================================================================= */}
      {isJobModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#08152e] border border-slate-700 rounded-2xl p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-cyan-400" />
                <span>{editingJobId ? 'Edit Opportunity' : 'Create New Opportunity'}</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsJobModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {jobFormErrors.length > 0 && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-200">
                <ul className="list-disc list-inside space-y-0.5">
                  {jobFormErrors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            <form onSubmit={handleSaveJobPosting} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Title */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase">
                    Job / Opportunity Title <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={jobFormData.title}
                    onChange={e => setJobFormData({ ...jobFormData, title: e.target.value })}
                    placeholder="e.g., Regional Logistics Operations Manager"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                {/* Opportunity Type */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase">
                    Opportunity Type
                  </label>
                  <select
                    value={jobFormData.type}
                    onChange={e => setJobFormData({ ...jobFormData, type: e.target.value as JobOpportunity['type'] })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="full-time">Full-Time</option>
                    <option value="part-time">Part-Time</option>
                    <option value="internship">Internship (Transition Fellowship)</option>
                    <option value="apprenticeship">Apprenticeship</option>
                    <option value="contract">Contract</option>
                  </select>
                </div>

                {/* Sector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase">
                    Sector
                  </label>
                  <select
                    value={jobFormData.sector}
                    onChange={e => setJobFormData({ ...jobFormData, sector: e.target.value as JobOpportunity['sector'] })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="private">Private Corporate</option>
                    <option value="psu">PSU / Government Allied</option>
                    <option value="defense_allied">Defense Offset / Allied</option>
                    <option value="ngo">Non-Profit / NGO</option>
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase">
                    Location (City, State) <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={jobFormData.location}
                    onChange={e => setJobFormData({ ...jobFormData, location: e.target.value })}
                    placeholder="e.g., Bengaluru, Karnataka"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                {/* Salary Range */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase">
                    Salary / Compensation Range
                  </label>
                  <input
                    type="text"
                    value={jobFormData.salaryRange}
                    onChange={e => setJobFormData({ ...jobFormData, salaryRange: e.target.value })}
                    placeholder="e.g., ₹10,00,000 - ₹14,00,000 / annum"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                {/* Required Education */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase">
                    Required Education
                  </label>
                  <input
                    type="text"
                    value={jobFormData.educationRequired}
                    onChange={e => setJobFormData({ ...jobFormData, educationRequired: e.target.value })}
                    placeholder="e.g., Graduation / Military Technical Equivalent"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                {/* Experience Requirements */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase">
                    Experience Requirements
                  </label>
                  <input
                    type="text"
                    value={jobFormData.experienceLevel}
                    onChange={e => setJobFormData({ ...jobFormData, experienceLevel: e.target.value })}
                    placeholder="e.g., 3-5 Years Service Experience"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                {/* Internship / Apprenticeship Duration */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase">
                    Duration (If Internship / Apprenticeship)
                  </label>
                  <input
                    type="text"
                    value={jobFormData.duration || ''}
                    onChange={e => setJobFormData({ ...jobFormData, duration: e.target.value })}
                    placeholder="e.g., 6 Months Paid Transition Track"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                {/* Application Deadline */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase">
                    Application Deadline
                  </label>
                  <input
                    type="text"
                    value={jobFormData.applicationDeadline || ''}
                    onChange={e => setJobFormData({ ...jobFormData, applicationDeadline: e.target.value })}
                    placeholder="e.g., 30 April 2026 / Rolling"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

              </div>

              {/* Complete Job Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase">
                  Complete Job Description <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={jobFormData.description}
                  onChange={e => setJobFormData({ ...jobFormData, description: e.target.value })}
                  placeholder="Provide comprehensive details about the role, department goals, operational scope, and culture..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none resize-y"
                />
              </div>

              {/* Responsibilities */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase">
                  Specific Responsibilities
                </label>
                <textarea
                  rows={3}
                  value={jobFormData.responsibilities || ''}
                  onChange={e => setJobFormData({ ...jobFormData, responsibilities: e.target.value })}
                  placeholder="• Manage multi-node depot throughput\n• Oversee fleet maintenance compliance\n• Coordinate inventory audits"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none resize-y"
                />
              </div>

              {/* Required Skills (Tags) */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase">
                  Required Skills
                </label>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={newRequiredSkill}
                    onChange={e => setNewRequiredSkill(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addRequiredSkill();
                      }
                    }}
                    placeholder="e.g., SAP ERP, Fleet Routing, Team Leadership"
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={addRequiredSkill}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 text-cyan-300 text-xs font-semibold"
                  >
                    Add Skill
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {jobFormData.requiredSkills?.map(skill => (
                    <span key={skill} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] font-mono">
                      <span>{skill}</span>
                      <button type="button" onClick={() => removeRequiredSkill(skill)} className="hover:text-red-400">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase">
                  Benefits & Perks
                </label>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={newBenefit}
                    onChange={e => setNewBenefit(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addBenefit();
                      }
                    }}
                    placeholder="e.g., Health Insurance, Relocation Bonus, Transition Mentorship"
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={addBenefit}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 text-cyan-300 text-xs font-semibold"
                  >
                    Add Benefit
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {jobFormData.benefits?.map(b => (
                    <span key={b} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] font-mono">
                      <span>{b}</span>
                      <button type="button" onClick={() => removeBenefit(b)} className="hover:text-red-400">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Application Instructions & Official Link */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase">
                    Application Instructions
                  </label>
                  <input
                    type="text"
                    value={jobFormData.applicationInstructions}
                    onChange={e => setJobFormData({ ...jobFormData, applicationInstructions: e.target.value })}
                    placeholder="e.g., Apply with verified civilian resume translation."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase">
                    Official Application Link
                  </label>
                  <input
                    type="url"
                    value={jobFormData.officialUrl}
                    onChange={e => setJobFormData({ ...jobFormData, officialUrl: e.target.value })}
                    placeholder="e.g., https://example.com/careers/apply"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsJobModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-cyan-500/20 active:scale-95"
                >
                  {editingJobId ? 'Update Opportunity' : 'Publish Opportunity'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal: Clear Company to Empty Manual */}
      {confirmClearModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#09152b] border border-red-500/40 rounded-2xl p-6 space-y-4 shadow-2xl animate-scaleIn">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="text-base font-bold text-white">Reset Company Profile to Blank Form?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              This will clear all demonstration values for this company, allowing your corporate team to enter every piece of company history, recruiter contacts, and initiative descriptions completely manually.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setConfirmClearModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
              >
                Keep Existing
              </button>
              <button
                type="button"
                onClick={handleClearToManual}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors"
              >
                Yes, Start Blank Form
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal: Delete Job Opportunity */}
      {confirmDeleteJobId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#09152b] border border-red-500/40 rounded-2xl p-5 space-y-3 shadow-2xl animate-scaleIn">
            <div className="flex items-center gap-2 text-red-400">
              <Trash2 className="w-5 h-5 shrink-0" />
              <h3 className="text-sm font-bold text-white">Delete Job Opportunity?</h3>
            </div>
            <p className="text-xs text-slate-300">
              Are you sure you want to withdraw and permanently delete this opportunity posting? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setConfirmDeleteJobId(null)}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteJob(confirmDeleteJobId)}
                className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold"
              >
                Delete Opportunity
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
