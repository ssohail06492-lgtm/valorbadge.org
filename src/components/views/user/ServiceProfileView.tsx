import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Save, 
  Check, 
  Plus, 
  X, 
  AlertTriangle, 
  Lock, 
  FileText, 
  Info,
  MapPin,
  Briefcase,
  Trash2,
  GraduationCap,
  Award,
  Sliders,
  Accessibility,
  Edit2,
  RefreshCw,
  Compass,
  Building2,
  CheckCircle2,
  Phone,
  Mail,
  User,
  Globe,
  HelpCircle,
  Eye,
  EyeOff,
  Search,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { SecurityNoticeBanner } from '../../common/SecurityNoticeBanner';
import { DemoDataBadge } from '../../common/DemoDataBadge';
import { ServiceProfileData, ProfileVisibility, EducationEntry, CivilianExperienceEntry } from '../../../types';

export const ServiceProfileView: React.FC = () => {
  const { 
    profile, 
    updateProfile, 
    resetProfileToManual, 
    loadDemoProfile, 
    currentRole, 
    setCurrentRole, 
    setCurrentRoute 
  } = useApp();

  const [formData, setFormData] = useState<ServiceProfileData>({ ...profile });
  const [activeTab, setActiveTab] = useState<'all' | 'contact' | 'education' | 'service' | 'career' | 'goals'>('all');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isDirty, setIsDirty] = useState(false);

  // Modals
  const [confirmClearModal, setConfirmClearModal] = useState(false);
  const [confirmDeleteEduId, setConfirmDeleteEduId] = useState<string | null>(null);
  const [confirmDeleteCivId, setConfirmDeleteCivId] = useState<string | null>(null);

  // Tag inputs
  const [newGeneralSkill, setNewGeneralSkill] = useState('');
  const [newServiceCert, setNewServiceCert] = useState('');
  const [newAward, setNewAward] = useState('');
  const [newCareerInterest, setNewCareerInterest] = useState('');
  const [newIndustry, setNewIndustry] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [newCivCert, setNewCivCert] = useState('');
  const [newTraining, setNewTraining] = useState('');
  const [newCourseToLearn, setNewCourseToLearn] = useState('');

  // Editing modals / state for education & civilian experience
  const [editingEdu, setEditingEdu] = useState<EducationEntry | null>(null);
  const [isAddingEdu, setIsAddingEdu] = useState(false);
  const [eduForm, setEduForm] = useState<EducationEntry>({
    id: '',
    degree: '',
    institution: '',
    year: '',
    fieldOfStudy: '',
    grade: ''
  });

  const [editingCiv, setEditingCiv] = useState<CivilianExperienceEntry | null>(null);
  const [isAddingCiv, setIsAddingCiv] = useState(false);
  const [civForm, setCivForm] = useState<CivilianExperienceEntry>({
    id: '',
    role: '',
    company: '',
    duration: '',
    location: '',
    description: '',
    keyContributions: []
  });
  const [civContributionInput, setCivContributionInput] = useState('');

  // Synchronize when external profile changes
  useEffect(() => {
    setFormData({ ...profile });
    setIsDirty(false);
  }, [profile]);

  const handleChange = <K extends keyof ServiceProfileData>(field: K, value: ServiceProfileData[K]) => {
    if (currentRole === 'employer') return;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setIsDirty(true);
    setValidationErrors([]);
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];

    if (!formData.fullName.trim()) {
      errors.push('Full Name is required.');
    }

    if (!formData.email.trim()) {
      errors.push('Email Address is required.');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errors.push('Please provide a valid email format (e.g., name@domain.com).');
      }
    }

    if (!formData.phone.trim()) {
      errors.push('Phone Number is required.');
    } else if (formData.phone.replace(/[\s+-]/g, '').length < 8) {
      errors.push('Please enter a valid telephone number with country/area code.');
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (currentRole === 'employer') {
      setValidationErrors(['Access Restricted: Only the veteran candidate can update this profile. Recruiter accounts have view-only permissions.']);
      return;
    }
    if (!validateForm()) {
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    updateProfile({
      ...formData,
      profileCompleted: true,
      isManualEntry: !formData.isDemoData
    });

    setSavedSuccess(true);
    setIsDirty(false);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const handleCancelRevert = () => {
    setFormData({ ...profile });
    setIsDirty(false);
    setValidationErrors([]);
  };

  const handleClearToManual = () => {
    if (currentRole === 'employer') return;
    resetProfileToManual();
    setConfirmClearModal(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleLoadDemo = () => {
    if (currentRole === 'employer') return;
    loadDemoProfile();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Tag helper
  const addTagItem = (key: keyof ServiceProfileData, val: string, clearInput: () => void) => {
    if (!val.trim()) return;
    const currentList = (formData[key] as string[]) || [];
    if (!currentList.includes(val.trim())) {
      handleChange(key, [...currentList, val.trim()] as unknown as ServiceProfileData[typeof key]);
    }
    clearInput();
  };

  const removeTagItem = (key: keyof ServiceProfileData, valToRemove: string) => {
    const currentList = (formData[key] as string[]) || [];
    handleChange(key, currentList.filter(item => item !== valToRemove) as unknown as ServiceProfileData[typeof key]);
  };

  // Education CRUD
  const handleOpenAddEdu = () => {
    setEduForm({
      id: `edu-${Date.now()}`,
      degree: '',
      institution: '',
      year: new Date().getFullYear().toString(),
      fieldOfStudy: '',
      grade: ''
    });
    setIsAddingEdu(true);
    setEditingEdu(null);
  };

  const handleOpenEditEdu = (entry: EducationEntry) => {
    setEduForm({ ...entry });
    setEditingEdu(entry);
    setIsAddingEdu(false);
  };

  const handleSaveEdu = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eduForm.degree || !eduForm.institution) return;

    const currentList = formData.educationEntries || [];
    if (editingEdu) {
      handleChange(
        'educationEntries',
        currentList.map(item => (item.id === eduForm.id ? eduForm : item))
      );
    } else {
      handleChange('educationEntries', [...currentList, eduForm]);
    }

    setEditingEdu(null);
    setIsAddingEdu(false);
  };

  const handleDeleteEdu = (id: string) => {
    const currentList = formData.educationEntries || [];
    handleChange('educationEntries', currentList.filter(item => item.id !== id));
    setConfirmDeleteEduId(null);
  };

  // Civilian Experience CRUD
  const handleOpenAddCiv = () => {
    setCivForm({
      id: `civ-${Date.now()}`,
      role: '',
      company: '',
      duration: '',
      location: '',
      description: '',
      keyContributions: []
    });
    setCivContributionInput('');
    setIsAddingCiv(true);
    setEditingCiv(null);
  };

  const handleOpenEditCiv = (entry: CivilianExperienceEntry) => {
    setCivForm({ ...entry, keyContributions: entry.keyContributions || [] });
    setCivContributionInput('');
    setEditingCiv(entry);
    setIsAddingCiv(false);
  };

  const handleSaveCiv = (e: React.FormEvent) => {
    e.preventDefault();
    if (!civForm.role || !civForm.company) return;

    const currentList = formData.civilianExperience || [];
    if (editingCiv) {
      handleChange(
        'civilianExperience',
        currentList.map(item => (item.id === civForm.id ? civForm : item))
      );
    } else {
      handleChange('civilianExperience', [...currentList, civForm]);
    }

    setEditingCiv(null);
    setIsAddingCiv(false);
  };

  const handleDeleteCiv = (id: string) => {
    const currentList = formData.civilianExperience || [];
    handleChange('civilianExperience', currentList.filter(item => item.id !== id));
    setConfirmDeleteCivId(null);
  };

  const addContributionToCivForm = () => {
    if (!civContributionInput.trim()) return;
    setCivForm(prev => ({
      ...prev,
      keyContributions: [...(prev.keyContributions || []), civContributionInput.trim()]
    }));
    setCivContributionInput('');
  };

  const removeContributionFromCivForm = (index: number) => {
    setCivForm(prev => ({
      ...prev,
      keyContributions: (prev.keyContributions || []).filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Role Access Notice (If accessed while in Employer mode) */}
      {currentRole === 'employer' && (
        <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-white">Viewing as Corporate Recruiter / Employer</p>
              <p className="text-xs text-amber-300/90 mt-0.5">
                Veteran personal profile details are privately owned by candidates. To edit your corporate presence and post jobs, use Company Profile.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setCurrentRole('user')}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-xs font-semibold border border-amber-500/40 transition-colors"
            >
              Switch to Veteran Mode
            </button>
            <button
              onClick={() => setCurrentRoute('company_profile')}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-colors"
            >
              Go to Company Profile
            </button>
          </div>
        </div>
      )}

      {/* Header Banner & CRUD Action Bar */}
      <div className="p-6 rounded-2xl bg-[#061022]/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>USER / VETERAN CAREER PROFILE</span>
              </span>

              {formData.isDemoData ? (
                <DemoDataBadge />
              ) : (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Verified User Manual Profile</span>
                </span>
              )}

              {isDirty && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30 animate-pulse">
                  Unsaved Changes
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              {formData.fullName ? `${formData.fullName}'s Professional Profile` : 'Manual Career Profile'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Enter and review your verified civilian details, education, non-classified service history, and long-term career aspirations.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {currentRole === 'employer' ? (
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-3 py-2 rounded-xl bg-amber-950/60 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>View-Only Profile</span>
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentRole('user')}
                  className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/20"
                >
                  Switch to Veteran Role
                </button>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5 active:scale-95"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>

                {isDirty && (
                  <button
                    type="button"
                    onClick={handleCancelRevert}
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
                  title="Load realistic demonstration profile data"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Load Demo Data</span>
                </button>

                <button
                  type="button"
                  onClick={() => setConfirmClearModal(true)}
                  className="px-3.5 py-2.5 rounded-xl bg-red-950/40 hover:bg-red-950/70 text-red-300 text-xs font-mono border border-red-800/40 transition-colors flex items-center gap-1.5"
                  title="Clear form to empty manual state"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                  <span>Clear to Empty</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Section Navigation Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-mono text-slate-400 mr-2">Jump to Section:</span>
          {[
            { id: 'all', label: 'All Sections' },
            { id: 'contact', label: '1. Basic Civilian Info' },
            { id: 'education', label: '2. Education' },
            { id: 'service', label: '3. Service Experience' },
            { id: 'career', label: '4. Civilian Career Info' },
            { id: 'goals', label: '5. Career Goals' },
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

      {/* Security & Non-classified Notice Banner */}
      <SecurityNoticeBanner />

      {/* Success Notification */}
      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs sm:text-sm font-medium flex items-center justify-between gap-3 shadow-lg shadow-emerald-950/40 animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <Check className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Profile successfully saved! Your civilian resume, job recommendations, and skill taxonomy have been synchronized.</span>
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
            <span>Please correct the following before saving:</span>
          </div>
          <ul className="list-disc list-inside space-y-0.5 text-xs text-red-200/90 pl-1">
            {validationErrors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">

        {/* ========================================================================= */}
        {/* SECTION 1: Basic Civilian Information */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'contact') && (
          <div id="section-1" className="p-6 sm:p-7 rounded-2xl bg-[#061022]/85 border border-slate-800 space-y-6 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                  SECTION 1
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white font-display flex items-center gap-2">
                  <span>Basic Civilian Information</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    Candidate Identity
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Your primary contact and civilian geographical details used by recruiters.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                  Full Name <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={e => handleChange('fullName', e.target.value)}
                    placeholder="e.g., Rajesh Kumar Verma"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none placeholder-slate-600"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                  Email Address <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => handleChange('email', e.target.value)}
                    placeholder="e.g., rajesh.verma@example.com"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none placeholder-slate-600"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                  Phone Number <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => handleChange('phone', e.target.value)}
                    placeholder="e.g., +91 98765 43210"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none placeholder-slate-600"
                  />
                </div>
              </div>

              {/* Country */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                  Country
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={formData.country}
                    onChange={e => handleChange('country', e.target.value)}
                    placeholder="e.g., India"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none placeholder-slate-600"
                  />
                </div>
              </div>

              {/* State / Region */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                  State / Region
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={formData.state}
                    onChange={e => handleChange('state', e.target.value)}
                    placeholder="e.g., Karnataka, Maharashtra, Delhi"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none placeholder-slate-600"
                  />
                </div>
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={e => handleChange('city', e.target.value)}
                  placeholder="e.g., Bengaluru, Pune, Gurugram"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none placeholder-slate-600"
                />
              </div>

              {/* Preferred Language */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                  Preferred Language
                </label>
                <select
                  value={formData.preferredLanguage || 'English'}
                  onChange={e => handleChange('preferredLanguage', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi (हिंदी)</option>
                  <option value="Punjabi">Punjabi (ਪੰਜਾਬੀ)</option>
                  <option value="Bengali">Bengali (বাংলা)</option>
                  <option value="Marathi">Marathi (मराठी)</option>
                  <option value="Tamil">Tamil (தமிழ்)</option>
                  <option value="Telugu">Telugu (తెలుగు)</option>
                  <option value="Kannada">Kannada (ಕನ್ನಡ)</option>
                  <option value="Malayalam">Malayalam (മലയാളം)</option>
                </select>
              </div>

              {/* Preferred Job Location */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                  Preferred Job Location
                </label>
                <input
                  type="text"
                  value={formData.preferredJobLocation || ''}
                  onChange={e => handleChange('preferredJobLocation', e.target.value)}
                  placeholder="e.g., Bengaluru (Hybrid) / Pan-India"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none placeholder-slate-600"
                />
              </div>

              {/* Profile Visibility / Privacy Control */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                  Profile Privacy & Visibility
                </label>
                <select
                  value={formData.visibility}
                  onChange={e => handleChange('visibility', e.target.value as ProfileVisibility)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                >
                  <option value="employers">Visible to Verified Employers Only</option>
                  <option value="application_only">Application Only (Hidden until applied)</option>
                  <option value="private">Private (Confidential / Only you)</option>
                </select>
              </div>

            </div>

            {/* Headline / Summary */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                Professional Headline / Civilian Title
              </label>
              <input
                type="text"
                value={formData.headline || ''}
                onChange={e => handleChange('headline', e.target.value)}
                placeholder="e.g., Ex-Junior Commissioned Officer | Logistics & Fleet Operations Command Lead"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none placeholder-slate-600"
              />
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 2: Education */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'education') && (
          <div id="section-2" className="p-6 sm:p-7 rounded-2xl bg-[#061022]/85 border border-slate-800 space-y-6 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                  SECTION 2
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white font-display flex items-center gap-2">
                  <span>Education & Academic Qualifications</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    Civilian Equivalencies
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Highest degree, institutions, courses, and recognized special education certificates.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenAddEdu}
                className="px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-semibold border border-cyan-500/40 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Additional Education</span>
              </button>
            </div>

            {/* Primary Education Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                  Highest Qualification
                </label>
                <input
                  type="text"
                  value={formData.highestQualification || formData.education || ''}
                  onChange={e => {
                    handleChange('highestQualification', e.target.value);
                    handleChange('education', e.target.value);
                  }}
                  placeholder="e.g., Bachelor of Technology (Mechanical)"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none placeholder-slate-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                  School / College / Institution
                </label>
                <input
                  type="text"
                  value={formData.schoolCollegeInstitution || ''}
                  onChange={e => handleChange('schoolCollegeInstitution', e.target.value)}
                  placeholder="e.g., College of Military Engineering / JNU"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none placeholder-slate-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                  Course / Stream
                </label>
                <input
                  type="text"
                  value={formData.courseStream || ''}
                  onChange={e => handleChange('courseStream', e.target.value)}
                  placeholder="e.g., Mechanical Engineering & Material Science"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none placeholder-slate-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                  Graduation Year
                </label>
                <input
                  type="text"
                  value={formData.graduationYear || ''}
                  onChange={e => handleChange('graduationYear', e.target.value)}
                  placeholder="e.g., 2016"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none placeholder-slate-600"
                />
              </div>
            </div>

            {/* Relevant Subjects */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                Relevant Subjects / Key Academic Focus
              </label>
              <input
                type="text"
                value={formData.relevantSubjects || ''}
                onChange={e => handleChange('relevantSubjects', e.target.value)}
                placeholder="e.g., Supply Chain Management, Thermodynamics, Industrial Automation, Workshop Technology"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none placeholder-slate-600"
              />
            </div>

            {/* Additional Education Entries List */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                  Additional Qualifications & Diplomas ({formData.educationEntries?.length || 0})
                </span>
              </div>

              {(!formData.educationEntries || formData.educationEntries.length === 0) ? (
                <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-center text-xs text-slate-400">
                  No additional education entries added yet. Click &quot;Add Additional Education&quot; to include diplomas, 10+2 certificates, or special service courses.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {formData.educationEntries.map(entry => (
                    <div
                      key={entry.id}
                      className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/80 flex flex-col justify-between space-y-2 hover:border-cyan-500/40 transition-colors"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-bold text-white">{entry.degree}</h4>
                          <span className="text-xs font-mono text-cyan-400 shrink-0">{entry.year}</span>
                        </div>
                        <p className="text-xs text-slate-300 mt-0.5">{entry.institution}</p>
                        {entry.fieldOfStudy && (
                          <p className="text-xs text-slate-400 mt-1">
                            <span className="text-slate-500 font-mono">Stream:</span> {entry.fieldOfStudy}
                          </p>
                        )}
                        {entry.grade && (
                          <p className="text-xs text-slate-400">
                            <span className="text-slate-500 font-mono">Grade:</span> {entry.grade}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800/80">
                        <button
                          type="button"
                          onClick={() => handleOpenEditEdu(entry)}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1 transition-colors"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteEduId(entry.id)}
                          className="px-2.5 py-1 rounded bg-red-950/40 hover:bg-red-950 text-red-300 text-xs font-medium flex items-center gap-1 transition-colors"
                        >
                          <Trash2 className="w-3 h-3 text-red-400" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal: Add/Edit Education Entry */}
            {(isAddingEdu || editingEdu) && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="w-full max-w-lg bg-[#08152e] border border-slate-700 rounded-2xl p-6 space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-cyan-400" />
                      <span>{editingEdu ? 'Edit Education Entry' : 'Add Academic Qualification'}</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingEdu(false);
                        setEditingEdu(null);
                      }}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase">
                        Degree / Qualification Name <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={eduForm.degree}
                        onChange={e => setEduForm({ ...eduForm, degree: e.target.value })}
                        placeholder="e.g., Diploma in Mechanical Engineering"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase">
                        School / College / Institution <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={eduForm.institution}
                        onChange={e => setEduForm({ ...eduForm, institution: e.target.value })}
                        placeholder="e.g., State Board of Technical Education"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase">
                          Graduation Year
                        </label>
                        <input
                          type="text"
                          value={eduForm.year}
                          onChange={e => setEduForm({ ...eduForm, year: e.target.value })}
                          placeholder="e.g., 2018"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase">
                          Grade / Division
                        </label>
                        <input
                          type="text"
                          value={eduForm.grade || ''}
                          onChange={e => setEduForm({ ...eduForm, grade: e.target.value })}
                          placeholder="e.g., First Class / 82%"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase">
                        Field of Study / Stream
                      </label>
                      <input
                        type="text"
                        value={eduForm.fieldOfStudy || ''}
                        onChange={e => setEduForm({ ...eduForm, fieldOfStudy: e.target.value })}
                        placeholder="e.g., Mechanical Engineering & Quality Assurance"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingEdu(false);
                        setEditingEdu(null);
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveEdu}
                      className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold"
                    >
                      Save Qualification
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 3: Service Experience (Non-Classified Guidance Prominent) */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'service') && (
          <div id="section-3" className="p-6 sm:p-7 rounded-2xl bg-[#061022]/85 border border-slate-800 space-y-6 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                  SECTION 3
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white font-display flex items-center gap-2">
                  <span>Service Experience (Non-Classified General Translation)</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    Military → Civilian
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  High-level managerial, technical, and logistical competencies translated into industry-recognized terminology.
                </p>
              </div>
            </div>

            {/* Crucial Security Guard Notice */}
            <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p>
                <strong>Security Reminder:</strong> Do NOT enter operational deployments, classified locations, units, weapons telemetry, tactical intelligence, or protected military systems. Focus entirely on general supervision, process governance, logistical scheduling, and technical maintenance.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              
              {/* Service Organization */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                  Service Organization
                </label>
                <select
                  value={formData.serviceOrganization || 'Indian Army'}
                  onChange={e => handleChange('serviceOrganization', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                >
                  <option value="Indian Army">Indian Army</option>
                  <option value="Indian Navy">Indian Navy</option>
                  <option value="Indian Air Force">Indian Air Force</option>
                  <option value="Indian Coast Guard">Indian Coast Guard</option>
                  <option value="Paramilitary / CAPF">Paramilitary / CAPF</option>
                  <option value="Agniveer Cohort">Agniveer Cohort</option>
                  <option value="Other Defense Branch">Other Defense Branch</option>
                </select>
              </div>

              {/* Role / Position */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                  Role / Position Held
                </label>
                <input
                  type="text"
                  value={formData.rolePosition || ''}
                  onChange={e => handleChange('rolePosition', e.target.value)}
                  placeholder="e.g., Subedar / JCO In-charge (Quartermaster Depot Operations)"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none placeholder-slate-600"
                />
              </div>

              {/* Years of Experience */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                  Years of Service Experience
                </label>
                <input
                  type="number"
                  min="0"
                  max="45"
                  value={formData.yearsOfExperience}
                  onChange={e => handleChange('yearsOfExperience', parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            {/* General Responsibilities (Clean Expandable Text Area) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300 font-mono uppercase">
                  General Responsibilities & Leadership Scope
                </label>
                <span className="text-[11px] font-mono text-slate-400">
                  {formData.generalResponsibilities?.length || 0} characters
                </span>
              </div>
              <textarea
                rows={4}
                value={formData.generalResponsibilities}
                onChange={e => handleChange('generalResponsibilities', e.target.value)}
                placeholder="Describe your day-to-day general supervisory duties, team size managed, safety adherence, fleet/inventory handling, and material accounting without operational specifics..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none resize-y min-h-[100px] leading-relaxed placeholder-slate-600"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Tip: Emphasize civilian equivalents like supply chain metrics, team performance reviews, SOP formulation, preventative audits, and vendor management.
              </p>
            </div>

            {/* General Skills Developed (Tags) */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                General Skills Developed in Service
              </label>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={newGeneralSkill}
                  onChange={e => setNewGeneralSkill(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTagItem('generalSkillsDeveloped', newGeneralSkill, () => setNewGeneralSkill(''));
                    }
                  }}
                  placeholder="e.g., Fleet Maintenance Protocol, Crisis Resource Allocation"
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none placeholder-slate-600"
                />
                <button
                  type="button"
                  onClick={() => addTagItem('generalSkillsDeveloped', newGeneralSkill, () => setNewGeneralSkill(''))}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold border border-slate-700 transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Skill</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.generalSkillsDeveloped?.map(skill => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-200 text-xs font-mono"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => removeTagItem('generalSkillsDeveloped', skill)}
                      className="text-cyan-400 hover:text-red-400 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Service Certifications (Tags) */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                Military / Service Certifications & Special Courses
              </label>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={newServiceCert}
                  onChange={e => setNewServiceCert(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTagItem('certifications', newServiceCert, () => setNewServiceCert(''));
                    }
                  }}
                  placeholder="e.g., Six Sigma Green Belt (Civilian Equivalence), ISO 9001:2015 Quality Auditor"
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none placeholder-slate-600"
                />
                <button
                  type="button"
                  onClick={() => addTagItem('certifications', newServiceCert, () => setNewServiceCert(''))}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold border border-slate-700 transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Cert</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.certifications?.map(cert => (
                  <span
                    key={cert}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-indigo-950/60 border border-indigo-500/30 text-indigo-200 text-xs font-mono"
                  >
                    <span>{cert}</span>
                    <button
                      type="button"
                      onClick={() => removeTagItem('certifications', cert)}
                      className="text-indigo-400 hover:text-red-400 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Awards & Achievements (Tags) */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                Commendations, Citations & Recognitions
              </label>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={newAward}
                  onChange={e => setNewAward(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTagItem('awardsAchievements', newAward, () => setNewAward(''));
                    }
                  }}
                  placeholder="e.g., General Officer Commanding-in-Chief Commendation Card, Zero-Deficit Material Citation"
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none placeholder-slate-600"
                />
                <button
                  type="button"
                  onClick={() => addTagItem('awardsAchievements', newAward, () => setNewAward(''))}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold border border-slate-700 transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Citation</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {(formData.awardsAchievements || formData.achievements || []).map(award => (
                  <span
                    key={award}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-950/60 border border-amber-500/30 text-amber-200 text-xs font-mono"
                  >
                    <Award className="w-3 h-3 text-amber-400" />
                    <span>{award}</span>
                    <button
                      type="button"
                      onClick={() => {
                        removeTagItem('awardsAchievements', award);
                        removeTagItem('achievements', award);
                      }}
                      className="text-amber-400 hover:text-red-400 transition-colors ml-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 4: Civilian Career Information */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'career') && (
          <div id="section-4" className="p-6 sm:p-7 rounded-2xl bg-[#061022]/85 border border-slate-800 space-y-6 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                  SECTION 4
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white font-display flex items-center gap-2">
                  <span>Civilian Career Information</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    Corporate Readiness
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Interests, target industries, desired job roles, outside civilian experience, and training completed.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenAddCiv}
                className="px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-semibold border border-cyan-500/40 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Civilian Experience</span>
              </button>
            </div>

            {/* Career Interests (Tags) */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                Career Interests
              </label>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={newCareerInterest}
                  onChange={e => setNewCareerInterest(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTagItem('careerInterests', newCareerInterest, () => setNewCareerInterest(''));
                    }
                  }}
                  placeholder="e.g., Supply Chain Logistics, Warehouse Command, Fleet Governance"
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none placeholder-slate-600"
                />
                <button
                  type="button"
                  onClick={() => addTagItem('careerInterests', newCareerInterest, () => setNewCareerInterest(''))}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold border border-slate-700 transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.careerInterests?.map(interest => (
                  <span
                    key={interest}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono"
                  >
                    <span>{interest}</span>
                    <button
                      type="button"
                      onClick={() => removeTagItem('careerInterests', interest)}
                      className="text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Preferred Industries (Tags) */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                Preferred Industries
              </label>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={newIndustry}
                  onChange={e => setNewIndustry(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTagItem('preferredIndustries', newIndustry, () => setNewIndustry(''));
                    }
                  }}
                  placeholder="e.g., Logistics & Supply Chain, E-Commerce Fulfillment, Heavy Manufacturing"
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none placeholder-slate-600"
                />
                <button
                  type="button"
                  onClick={() => addTagItem('preferredIndustries', newIndustry, () => setNewIndustry(''))}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold border border-slate-700 transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.preferredIndustries?.map(industry => (
                  <span
                    key={industry}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-cyan-950/50 border border-cyan-500/30 text-cyan-200 text-xs font-mono"
                  >
                    <span>{industry}</span>
                    <button
                      type="button"
                      onClick={() => removeTagItem('preferredIndustries', industry)}
                      className="text-cyan-400 hover:text-red-400 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Preferred Job Roles (Tags) */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                Preferred Job Roles
              </label>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={newRole}
                  onChange={e => setNewRole(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTagItem('preferredJobRoles', newRole, () => setNewRole(''));
                    }
                  }}
                  placeholder="e.g., Logistics Operations Manager, Fleet Safety Director, Distribution Hub Lead"
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none placeholder-slate-600"
                />
                <button
                  type="button"
                  onClick={() => addTagItem('preferredJobRoles', newRole, () => setNewRole(''))}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold border border-slate-700 transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.preferredJobRoles?.map(role => (
                  <span
                    key={role}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono"
                  >
                    <span>{role}</span>
                    <button
                      type="button"
                      onClick={() => removeTagItem('preferredJobRoles', role)}
                      className="text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Skills & Civilian Certifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                  Civilian Technical & Management Skills
                </label>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={e => setNewSkill(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTagItem('skills', newSkill, () => setNewSkill(''));
                      }
                    }}
                    placeholder="e.g., ERP / SAP Material Management, Vendor SLA Governance"
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none placeholder-slate-600"
                  />
                  <button
                    type="button"
                    onClick={() => addTagItem('skills', newSkill, () => setNewSkill(''))}
                    className="px-3 py-2 rounded-xl bg-slate-800 text-cyan-300 text-xs font-semibold"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(formData.skills || formData.technicalSkills || []).map(skill => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-[11px] font-mono"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => {
                          removeTagItem('skills', skill);
                          removeTagItem('technicalSkills', skill);
                        }}
                        className="hover:text-red-400"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                  Civilian Certifications
                </label>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={newCivCert}
                    onChange={e => setNewCivCert(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTagItem('civilianCertifications', newCivCert, () => setNewCivCert(''));
                      }
                    }}
                    placeholder="e.g., APICS CSCP, National Safety Council Industrial Safety"
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none placeholder-slate-600"
                  />
                  <button
                    type="button"
                    onClick={() => addTagItem('civilianCertifications', newCivCert, () => setNewCivCert(''))}
                    className="px-3 py-2 rounded-xl bg-slate-800 text-cyan-300 text-xs font-semibold"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {formData.civilianCertifications?.map(cert => (
                    <span
                      key={cert}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-[11px] font-mono"
                    >
                      <span>{cert}</span>
                      <button
                        type="button"
                        onClick={() => removeTagItem('civilianCertifications', cert)}
                        className="hover:text-red-400"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Experience Outside Service (Civilian Roles) */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                  Experience Outside Service ({formData.civilianExperience?.length || 0})
                </span>
              </div>

              {(!formData.civilianExperience || formData.civilianExperience.length === 0) ? (
                <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-center text-xs text-slate-400">
                  No civilian experience entries added yet. Click &quot;Add Civilian Experience&quot; to include transition internships, apprenticeships, or civilian jobs.
                </div>
              ) : (
                <div className="space-y-3">
                  {formData.civilianExperience.map(exp => (
                    <div
                      key={exp.id}
                      className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/80 space-y-2 hover:border-cyan-500/40 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                        <div>
                          <h4 className="text-sm font-bold text-white">{exp.role}</h4>
                          <p className="text-xs text-cyan-400 font-medium">{exp.company} {exp.location ? `— ${exp.location}` : ''}</p>
                        </div>
                        <span className="text-xs font-mono text-slate-400 shrink-0">{exp.duration}</span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">{exp.description}</p>

                      {exp.keyContributions && exp.keyContributions.length > 0 && (
                        <ul className="list-disc list-inside space-y-0.5 text-xs text-slate-400 pl-1">
                          {exp.keyContributions.map((c, i) => (
                            <li key={i}>{c}</li>
                          ))}
                        </ul>
                      )}

                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800/80">
                        <button
                          type="button"
                          onClick={() => handleOpenEditCiv(exp)}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1 transition-colors"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteCivId(exp.id)}
                          className="px-2.5 py-1 rounded bg-red-950/40 hover:bg-red-950 text-red-300 text-xs font-medium flex items-center gap-1 transition-colors"
                        >
                          <Trash2 className="w-3 h-3 text-red-400" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Training Completed & Courses to Learn */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-slate-800">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                  Training & Workshops Completed
                </label>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={newTraining}
                    onChange={e => setNewTraining(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTagItem('trainingCompleted', newTraining, () => setNewTraining(''));
                      }
                    }}
                    placeholder="e.g., Advanced Supply Chain Strategy & ERP Logistics"
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none placeholder-slate-600"
                  />
                  <button
                    type="button"
                    onClick={() => addTagItem('trainingCompleted', newTraining, () => setNewTraining(''))}
                    className="px-3 py-2 rounded-xl bg-slate-800 text-cyan-300 text-xs font-semibold"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {formData.trainingCompleted?.map(item => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-[11px] font-mono"
                    >
                      <span>{item}</span>
                      <button
                        type="button"
                        onClick={() => removeTagItem('trainingCompleted', item)}
                        className="hover:text-red-400"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                  Courses & Skills You Want to Learn
                </label>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={newCourseToLearn}
                    onChange={e => setNewCourseToLearn(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTagItem('coursesToLearn', newCourseToLearn, () => setNewCourseToLearn(''));
                      }
                    }}
                    placeholder="e.g., AI-driven Predictive Supply Chain Automation"
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none placeholder-slate-600"
                  />
                  <button
                    type="button"
                    onClick={() => addTagItem('coursesToLearn', newCourseToLearn, () => setNewCourseToLearn(''))}
                    className="px-3 py-2 rounded-xl bg-slate-800 text-cyan-300 text-xs font-semibold"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {formData.coursesToLearn?.map(item => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-[11px] font-mono"
                    >
                      <span>{item}</span>
                      <button
                        type="button"
                        onClick={() => removeTagItem('coursesToLearn', item)}
                        className="hover:text-red-400"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal: Add/Edit Civilian Experience */}
            {(isAddingCiv || editingCiv) && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="w-full max-w-lg bg-[#08152e] border border-slate-700 rounded-2xl p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-cyan-400" />
                      <span>{editingCiv ? 'Edit Civilian Experience' : 'Add Civilian Experience'}</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingCiv(false);
                        setEditingCiv(null);
                      }}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase">
                        Role / Designation <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={civForm.role}
                        onChange={e => setCivForm({ ...civForm, role: e.target.value })}
                        placeholder="e.g., Logistics Operations Consultant"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase">
                        Company / Organization <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={civForm.company}
                        onChange={e => setCivForm({ ...civForm, company: e.target.value })}
                        placeholder="e.g., Karnataka Regional Supply Consortium"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase">
                          Duration
                        </label>
                        <input
                          type="text"
                          value={civForm.duration}
                          onChange={e => setCivForm({ ...civForm, duration: e.target.value })}
                          placeholder="e.g., Nov 2025 - Present"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase">
                          Location
                        </label>
                        <input
                          type="text"
                          value={civForm.location || ''}
                          onChange={e => setCivForm({ ...civForm, location: e.target.value })}
                          placeholder="e.g., Bengaluru, Karnataka"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase">
                        Workplace Description & Responsibilities
                      </label>
                      <textarea
                        rows={3}
                        value={civForm.description}
                        onChange={e => setCivForm({ ...civForm, description: e.target.value })}
                        placeholder="Summarize key tasks, team leadership, and processes managed..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none resize-y"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase">
                        Key Contributions / Achievements
                      </label>
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="text"
                          value={civContributionInput}
                          onChange={e => setCivContributionInput(e.target.value)}
                          placeholder="e.g., Reduced freight turnaround cycle times by 18%"
                          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={addContributionToCivForm}
                          className="px-3 py-2 rounded-xl bg-slate-800 text-cyan-300 text-xs font-semibold"
                        >
                          Add
                        </button>
                      </div>

                      <ul className="space-y-1">
                        {civForm.keyContributions?.map((item, idx) => (
                          <li key={idx} className="flex items-center justify-between gap-2 p-1.5 rounded bg-slate-900 text-xs text-slate-300">
                            <span>• {item}</span>
                            <button
                              type="button"
                              onClick={() => removeContributionFromCivForm(idx)}
                              className="text-slate-500 hover:text-red-400"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingCiv(false);
                        setEditingCiv(null);
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveCiv}
                      className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold"
                    >
                      Save Experience
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 5: Career Goals (Detailed Descriptions) */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'goals') && (
          <div id="section-5" className="p-6 sm:p-7 rounded-2xl bg-[#061022]/85 border border-slate-800 space-y-6 shadow-md">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                SECTION 5
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white font-display flex items-center gap-2">
                <span>Career Goals & Detailed Aspirations</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  Long-form Narratives
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Express your civilian vision in detail. These qualitative statements help our matching engine align you with leadership pathways and corporate sponsors.
              </p>
            </div>

            <div className="space-y-6">
              
              {/* Prompt 1: What kind of career are you looking for? */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-200 font-mono uppercase">
                    1. What kind of career are you looking for?
                  </label>
                  <span className="text-[11px] font-mono text-slate-400">
                    {formData.careerGoalDescription?.length || 0} chars
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={formData.careerGoalDescription || ''}
                  onChange={e => handleChange('careerGoalDescription', e.target.value)}
                  placeholder="Describe your ideal role, desired work environment, team dynamic, level of operational autonomy, and how you want to apply your service discipline..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none resize-y min-h-[90px] leading-relaxed placeholder-slate-600"
                />
              </div>

              {/* Prompt 2: What skills do you want to develop? */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-200 font-mono uppercase">
                    2. What skills do you want to develop?
                  </label>
                  <span className="text-[11px] font-mono text-slate-400">
                    {formData.skillsToDevelopDescription?.length || 0} chars
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={formData.skillsToDevelopDescription || ''}
                  onChange={e => handleChange('skillsToDevelopDescription', e.target.value)}
                  placeholder="Detail the technical proficiencies, software platforms (e.g., SAP S/4HANA, PowerBI), business leadership credentials, or industry certifications you plan to acquire..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none resize-y min-h-[90px] leading-relaxed placeholder-slate-600"
                />
              </div>

              {/* Prompt 3: What industries interest you? */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-200 font-mono uppercase">
                    3. What industries interest you?
                  </label>
                  <span className="text-[11px] font-mono text-slate-400">
                    {formData.industriesInterestDescription?.length || 0} chars
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={formData.industriesInterestDescription || ''}
                  onChange={e => handleChange('industriesInterestDescription', e.target.value)}
                  placeholder="Explain why specific sectors appeal to you (e.g., 3PL logistics, renewable energy distribution, aerospace defense offsets, robotics warehouse automation)..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none resize-y min-h-[90px] leading-relaxed placeholder-slate-600"
                />
              </div>

              {/* Prompt 4: What locations would you consider? */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-200 font-mono uppercase">
                    4. What locations would you consider?
                  </label>
                  <span className="text-[11px] font-mono text-slate-400">
                    {formData.locationsConsiderDescription?.length || 0} chars
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={formData.locationsConsiderDescription || ''}
                  onChange={e => handleChange('locationsConsiderDescription', e.target.value)}
                  placeholder="List your preferred cities, regions, willingness to relocate, home-base preferences, travel readiness, or preferences for remote/hybrid flexibility..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none resize-y min-h-[90px] leading-relaxed placeholder-slate-600"
                />
              </div>

              {/* Prompt 5: Short-term and long-term career goals */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-200 font-mono uppercase">
                    5. What are your short-term and long-term career goals?
                  </label>
                  <span className="text-[11px] font-mono text-slate-400">
                    {formData.shortAndLongTermGoalsDescription?.length || 0} chars
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={formData.shortAndLongTermGoalsDescription || ''}
                  onChange={e => handleChange('shortAndLongTermGoalsDescription', e.target.value)}
                  placeholder="Short-term (1-2 years): Describe immediate transition milestones and corporate integration. Long-term (3-5+ years): Describe executive or senior directorship targets..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none resize-y min-h-[110px] leading-relaxed placeholder-slate-600"
                />
              </div>

            </div>
          </div>
        )}

        {/* Bottom Floating/Sticky Save Action Footer (Only for Veteran Candidate) */}
        {currentRole !== 'employer' && (
          <div className="sticky bottom-4 z-30 p-4 rounded-2xl bg-[#08152e]/95 backdrop-blur-md border border-cyan-500/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Info className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>
                {isDirty ? 'You have unsaved changes.' : 'Your profile is currently up to date.'}
              </span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              {isDirty && (
                <button
                  type="button"
                  onClick={handleCancelRevert}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
                >
                  Revert Edits
                </button>
              )}

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-1.5 active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>Save & Update Profile</span>
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Confirmation Modal: Clear Profile to Empty Manual */}
      {confirmClearModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#09152b] border border-red-500/40 rounded-2xl p-6 space-y-4 shadow-2xl animate-scaleIn">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="text-base font-bold text-white">Reset Profile to Empty Manual Form?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              This will clear all demonstration or pre-filled values, allowing you to input every piece of personal, academic, and service data completely by hand from a blank slate.
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
                Yes, Start Empty Form
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal: Delete Education Entry */}
      {confirmDeleteEduId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#09152b] border border-red-500/40 rounded-2xl p-5 space-y-3 shadow-2xl animate-scaleIn">
            <div className="flex items-center gap-2 text-red-400">
              <Trash2 className="w-5 h-5 shrink-0" />
              <h3 className="text-sm font-bold text-white">Delete Academic Qualification?</h3>
            </div>
            <p className="text-xs text-slate-300">
              Are you sure you want to remove this education entry? This change will be applied immediately.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setConfirmDeleteEduId(null)}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteEdu(confirmDeleteEduId)}
                className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold"
              >
                Delete Entry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal: Delete Civilian Entry */}
      {confirmDeleteCivId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#09152b] border border-red-500/40 rounded-2xl p-5 space-y-3 shadow-2xl animate-scaleIn">
            <div className="flex items-center gap-2 text-red-400">
              <Trash2 className="w-5 h-5 shrink-0" />
              <h3 className="text-sm font-bold text-white">Delete Civilian Experience?</h3>
            </div>
            <p className="text-xs text-slate-300">
              Are you sure you want to remove this experience entry?
            </p>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setConfirmDeleteCivId(null)}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteCiv(confirmDeleteCivId)}
                className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold"
              >
                Delete Entry
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
