import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  MapPin, 
  Building2, 
  Bookmark, 
  BookmarkCheck, 
  Check, 
  ExternalLink, 
  Filter, 
  SlidersHorizontal,
  ShieldCheck,
  ShieldAlert,
  Send,
  AlertTriangle,
  Bell,
  Plus,
  Eye,
  Flag,
  CheckCircle2,
  X,
  Lock,
  Sparkles,
  DollarSign,
  GraduationCap,
  Clock,
  Accessibility,
  HelpCircle,
  Award
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { DemoDataBadge } from '../../common/DemoDataBadge';
import { SecurityNoticeBanner } from '../../common/SecurityNoticeBanner';
import { JobOpportunity, JobAlert } from '../../../types';

interface JobsInternshipsViewProps {
  initialType?: 'all' | 'internship' | 'full-time' | 'apprenticeship';
}

export const JobsInternshipsView: React.FC<JobsInternshipsViewProps> = ({ initialType = 'all' }) => {
  const { 
    savedJobIds, 
    toggleSaveJob, 
    submitApplicationWithConsent, 
    applications, 
    jobs,
    jobAlerts,
    createJobAlert,
    toggleJobAlert,
    deleteJobAlert,
    reportJobScam,
    setCurrentRoute
  } = useApp();

  // Search & Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>(initialType);
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedSalary, setSelectedSalary] = useState<string>('all');
  const [selectedExperience, setSelectedExperience] = useState<string>('all');
  const [selectedEducation, setSelectedEducation] = useState<string>('all');
  const [veteranFriendlyOnly, setVeteranFriendlyOnly] = useState<boolean>(false);
  const [accessibleOnly, setAccessibleOnly] = useState<boolean>(false);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'fit' | 'recent' | 'salary_high' | 'salary_low' | 'title'>('fit');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);

  // Modals state
  const [selectedJobForDetail, setSelectedJobForDetail] = useState<JobOpportunity | null>(null);
  const [selectedJobForApply, setSelectedJobForApply] = useState<JobOpportunity | null>(null);
  const [selectedJobForReport, setSelectedJobForReport] = useState<JobOpportunity | null>(null);
  const [showAlertsModal, setShowAlertsModal] = useState<boolean>(false);

  // Apply with Consent form state
  const [consentChecked, setConsentChecked] = useState<boolean>(true);
  const [selectedResume, setSelectedResume] = useState<string>('Civilian_Operations_Resume_v2.pdf');
  const [applyNotes, setApplyNotes] = useState<string>('');
  const [appliedNotification, setAppliedNotification] = useState<string | null>(null);

  // Scam Report form state
  const [scamReason, setScamReason] = useState<'fee_requested' | 'unverified_email' | 'fake_quota' | 'duplicate_expired' | 'misleading_terms' | 'other'>('fee_requested');
  const [scamDetails, setScamDetails] = useState<string>('');
  const [reportSuccess, setReportSuccess] = useState<boolean>(false);

  // New Alert form state
  const [newAlertTitle, setNewAlertTitle] = useState('');
  const [newAlertKeywords, setNewAlertKeywords] = useState('');
  const [newAlertLocation, setNewAlertLocation] = useState('Pan-India');
  const [newAlertFrequency, setNewAlertFrequency] = useState<'instant' | 'daily' | 'weekly'>('daily');
  const [alertSuccess, setAlertSuccess] = useState(false);

  // Industries list
  const industries = [
    { value: 'all', label: 'All Industries' },
    { value: 'Logistics', label: 'Logistics & Supply Chain' },
    { value: 'Defense', label: 'Defense Tech & Aerospace' },
    { value: 'Cybersecurity', label: 'IT & Cybersecurity' },
    { value: 'Manufacturing', label: 'Heavy Manufacturing' },
    { value: 'Operations', label: 'Corporate Operations' },
    { value: 'Energy', label: 'Energy & Power (PSU)' }
  ];

  // Locations list
  const locations = [
    { value: 'all', label: 'All Locations' },
    { value: 'Bengaluru', label: 'Bengaluru, Karnataka' },
    { value: 'Pune', label: 'Pune, Maharashtra' },
    { value: 'Hyderabad', label: 'Hyderabad, Telangana' },
    { value: 'Delhi', label: 'Delhi NCR / Gurugram / Noida' },
    { value: 'Mumbai', label: 'Mumbai, Maharashtra' },
    { value: 'Chennai', label: 'Chennai, Tamil Nadu' },
    { value: 'Remote', label: 'Remote / Pan-India' }
  ];

  // Filter logic
  const filteredJobs = jobs.filter(job => {
    // Search
    const term = searchTerm.toLowerCase();
    const matchesSearch = !searchTerm || 
      job.title.toLowerCase().includes(term) ||
      job.company.toLowerCase().includes(term) ||
      job.location.toLowerCase().includes(term) ||
      (job.civilianSkillsMatched || []).some(s => s.toLowerCase().includes(term));

    // Type
    const matchesType = selectedType === 'all' || job.type === selectedType;

    // Sector
    const matchesSector = selectedSector === 'all' || job.sector === selectedSector;

    // Location
    const matchesLocation = selectedLocation === 'all' || 
      job.location.toLowerCase().includes(selectedLocation.toLowerCase()) ||
      (selectedLocation === 'Remote' && (job.workplaceType === 'remote' || job.location.toLowerCase().includes('pan-india')));

    // Industry
    const matchesIndustry = selectedIndustry === 'all' || (job.industry || '').toLowerCase().includes(selectedIndustry.toLowerCase());

    // Salary filter
    let matchesSalary = true;
    if (selectedSalary === 'under_5') {
      matchesSalary = (job.maxSalary || 0) <= 500000;
    } else if (selectedSalary === '5_to_12') {
      matchesSalary = (job.minSalary || 0) <= 1200000 && (job.maxSalary || 0) >= 500000;
    } else if (selectedSalary === '12_to_18') {
      matchesSalary = (job.minSalary || 0) <= 1800000 && (job.maxSalary || 0) >= 1200000;
    } else if (selectedSalary === 'above_18') {
      matchesSalary = (job.maxSalary || 0) >= 1800000;
    }

    // Experience filter
    let matchesExp = true;
    const expLower = (job.experienceLevel || '').toLowerCase();
    if (selectedExperience === 'agniveer') {
      matchesExp = expLower.includes('agniveer') || expLower.includes('0-3') || expLower.includes('entry');
    } else if (selectedExperience === 'mid') {
      matchesExp = expLower.includes('3-') || expLower.includes('4-') || expLower.includes('5-') || expLower.includes('jco');
    } else if (selectedExperience === 'senior') {
      matchesExp = expLower.includes('8+') || expLower.includes('10+') || expLower.includes('officer') || expLower.includes('senior');
    }

    // Education filter
    let matchesEdu = true;
    const eduLower = (job.educationRequired || '').toLowerCase();
    if (selectedEducation === 'army_cert') {
      matchesEdu = eduLower.includes('army') || eduLower.includes('10th') || eduLower.includes('12th');
    } else if (selectedEducation === 'diploma') {
      matchesEdu = eduLower.includes('diploma') || eduLower.includes('iti');
    } else if (selectedEducation === 'graduate') {
      matchesEdu = eduLower.includes('graduate') || eduLower.includes('b.tech') || eduLower.includes('degree');
    }

    // Toggles
    const matchesVeteran = !veteranFriendlyOnly || job.isVeteranFriendly;
    const matchesAccessible = !accessibleOnly || job.isAccessibleRole;
    const matchesVerified = !verifiedOnly || job.verificationStatus === 'verified';

    return matchesSearch && matchesType && matchesSector && matchesLocation && matchesIndustry && matchesSalary && matchesExp && matchesEdu && matchesVeteran && matchesAccessible && matchesVerified;
  });

  // Sorting
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === 'fit') {
      return (b.veteranFriendlyScore || 0) - (a.veteranFriendlyScore || 0);
    }
    if (sortBy === 'recent') {
      return a.postedDate.includes('Just now') ? -1 : 1;
    }
    if (sortBy === 'salary_high') {
      return (b.maxSalary || 0) - (a.maxSalary || 0);
    }
    if (sortBy === 'salary_low') {
      return (a.minSalary || 0) - (b.minSalary || 0);
    }
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  // Check if applied
  const isJobApplied = (jobId: string) => applications.some(a => a.jobId === jobId);

  // Apply handler
  const handleOpenApplyModal = (job: JobOpportunity) => {
    setSelectedJobForApply(job);
    setConsentChecked(true);
    setApplyNotes('');
  };

  const handleConfirmApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJobForApply) return;

    submitApplicationWithConsent(
      selectedJobForApply.id,
      selectedJobForApply.title,
      selectedJobForApply.company,
      consentChecked,
      selectedResume,
      applyNotes || 'Submitted through ValorBadge verified career pipeline with candidate privacy consent.'
    );

    setAppliedNotification(selectedJobForApply.title);
    setSelectedJobForApply(null);
    setTimeout(() => setAppliedNotification(null), 4000);
  };

  // Scam report handler
  const handleOpenReportModal = (job: JobOpportunity) => {
    setSelectedJobForReport(job);
    setScamReason('fee_requested');
    setScamDetails('');
    setReportSuccess(false);
  };

  const handleSubmitScamReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJobForReport) return;

    reportJobScam({
      jobId: selectedJobForReport.id,
      jobTitle: selectedJobForReport.title,
      company: selectedJobForReport.company,
      reason: scamReason,
      details: scamDetails || 'Candidate reported suspicious recruitment terms.'
    });

    setReportSuccess(true);
    setTimeout(() => {
      setReportSuccess(false);
      setSelectedJobForReport(null);
    }, 2000);
  };

  // Create Job Alert handler
  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlertTitle || !newAlertKeywords) return;

    createJobAlert({
      title: newAlertTitle,
      roleKeywords: newAlertKeywords,
      location: newAlertLocation,
      industry: selectedIndustry !== 'all' ? selectedIndustry : 'All Industries',
      opportunityType: selectedType !== 'all' ? selectedType : 'All',
      minSalary: 600000,
      frequency: newAlertFrequency,
      isActive: true
    });

    setAlertSuccess(true);
    setTimeout(() => {
      setAlertSuccess(false);
      setNewAlertTitle('');
      setNewAlertKeywords('');
    }, 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              <span>EMPLOYMENT & INTERNSHIPS DISCOVERY</span>
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/20">
              Government + Private Opportunities
            </span>
            <DemoDataBadge />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Jobs, Internships & Apprenticeships
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Vetted vacancies from accredited corporates and public sector undertakings specifically seeking armed forces veterans and Agniveer cohorts.
          </p>
        </div>

        {/* Action Buttons: Job Alerts & Application Tracker */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setShowAlertsModal(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-cyan-300 flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Bell className="w-3.5 h-3.5 text-cyan-400" />
            <span>Job Alerts ({jobAlerts.filter(a => a.isActive).length})</span>
          </button>

          <button
            onClick={() => setCurrentRoute('applications')}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Application Tracker ({applications.length})</span>
          </button>
        </div>
      </div>

      {/* Trust & Safety Charter Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#06192e] to-[#081525] border border-cyan-500/30 text-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white font-mono uppercase tracking-wider text-[11px]">
                ValorBadge Trust & Safety Charter
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                Zero-Fee Guarantee
              </span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Never pay any registration fee, interview hall pass charge, or uniform deposit. Genuine employers and PSUs never ask candidates for money. ValorBadge does not guarantee employment or compensation.
            </p>
          </div>
        </div>

        <button
          onClick={() => setCurrentRoute('veteran_help_center')}
          className="text-cyan-400 hover:text-cyan-300 font-mono text-[11px] flex items-center gap-1 shrink-0 underline decoration-cyan-500/50 underline-offset-4"
        >
          <span>Scam Defense Guide</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>

      <SecurityNoticeBanner compact />

      {/* Application Success Toast */}
      {appliedNotification && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs flex items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Application for <strong>{appliedNotification}</strong> submitted! Track review stage in your candidate dashboard.
            </span>
          </div>
          <button
            onClick={() => setCurrentRoute('applications')}
            className="text-emerald-200 underline font-mono text-[11px]"
          >
            View Tracker
          </button>
        </div>
      )}

      {/* Primary Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#071328]/90 border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Search Input */}
          <div className="relative md:col-span-4">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search title, company, skills, or city..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          {/* Type Segment Control */}
          <div className="md:col-span-5 flex rounded-xl bg-slate-900 p-1 border border-slate-700 text-xs font-mono overflow-x-auto">
            {[
              { id: 'all', label: 'All' },
              { id: 'full-time', label: 'Jobs' },
              { id: 'internship', label: 'Internships' },
              { id: 'apprenticeship', label: 'Apprenticeships' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                className={`px-3 py-1 rounded-lg transition-colors font-semibold shrink-0 ${
                  selectedType === t.id ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Sector Filter Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedSector}
              onChange={e => setSelectedSector(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:border-cyan-400 focus:outline-none capitalize"
            >
              <option value="all">All Sectors (Govt + Private)</option>
              <option value="government">Government Only</option>
              <option value="psu">PSU (Public Sector Undertaking)</option>
              <option value="private">Private Industry</option>
            </select>
          </div>
        </div>

        {/* Secondary Filter Row & Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            {/* Location */}
            <select
              value={selectedLocation}
              onChange={e => setSelectedLocation(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:border-cyan-400 focus:outline-none"
            >
              {locations.map(loc => (
                <option key={loc.value} value={loc.value}>{loc.label}</option>
              ))}
            </select>

            {/* Industry */}
            <select
              value={selectedIndustry}
              onChange={e => setSelectedIndustry(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:border-cyan-400 focus:outline-none"
            >
              {industries.map(ind => (
                <option key={ind.value} value={ind.value}>{ind.label}</option>
              ))}
            </select>

            {/* Salary */}
            <select
              value={selectedSalary}
              onChange={e => setSelectedSalary(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:border-cyan-400 focus:outline-none"
            >
              <option value="all">Any Salary Range</option>
              <option value="under_5">Up to ₹5 Lakh / yr</option>
              <option value="5_to_12">₹5 - ₹12 Lakh / yr</option>
              <option value="12_to_18">₹12 - ₹18 Lakh / yr</option>
              <option value="above_18">₹18+ Lakh / yr</option>
            </select>

            {/* Advanced Toggle */}
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-1 transition-colors ${
                showAdvancedFilters ? 'bg-cyan-950 text-cyan-300 border-cyan-500/40' : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>Filters</span>
            </button>
          </div>

          {/* Quick Badges Toggles & Sorting */}
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 select-none">
              <input
                type="checkbox"
                checked={veteranFriendlyOnly}
                onChange={e => setVeteranFriendlyOnly(e.target.checked)}
                className="w-3.5 h-3.5 accent-cyan-400 rounded"
              />
              <span className="font-mono text-[11px] text-cyan-300">Veteran Priority</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 select-none">
              <input
                type="checkbox"
                checked={accessibleOnly}
                onChange={e => setAccessibleOnly(e.target.checked)}
                className="w-3.5 h-3.5 accent-teal-400 rounded"
              />
              <span className="font-mono text-[11px] text-teal-300 flex items-center gap-1">
                <Accessibility className="w-3 h-3" />
                <span>Accessible Roles</span>
              </span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 select-none">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={e => setVerifiedOnly(e.target.checked)}
                className="w-3.5 h-3.5 accent-emerald-400 rounded"
              />
              <span className="font-mono text-[11px] text-emerald-300 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Verified Only</span>
              </span>
            </label>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-1.5 pl-2 border-l border-slate-800">
              <span className="text-slate-500 font-mono text-[11px]">Sort:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-cyan-300 focus:outline-none"
              >
                <option value="fit">Veteran Match Score</option>
                <option value="recent">Most Recent</option>
                <option value="salary_high">Salary: High to Low</option>
                <option value="salary_low">Salary: Low to High</option>
                <option value="title">Title: A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Expanded Advanced Filters */}
        {showAdvancedFilters && (
          <div className="pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs animate-fadeIn">
            <div>
              <label className="block text-slate-400 font-mono text-[11px] mb-1">Target Experience Bracket</label>
              <select
                value={selectedExperience}
                onChange={e => setSelectedExperience(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white focus:border-cyan-400 focus:outline-none"
              >
                <option value="all">All Experience Levels</option>
                <option value="agniveer">Agniveer Cohorts (0 - 3 Years / Fresh Intake)</option>
                <option value="mid">Mid-Career Ex-Service (4 - 8 Years / NCO)</option>
                <option value="senior">Senior Veterans (9+ Years / JCO / Officers)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-mono text-[11px] mb-1">Education Requirements</label>
              <select
                value={selectedEducation}
                onChange={e => setSelectedEducation(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white focus:border-cyan-400 focus:outline-none"
              >
                <option value="all">Any Education Requirement</option>
                <option value="army_cert">10th / 12th + Army Special Certificate</option>
                <option value="diploma">ITI / Polytechnic / Military Diploma</option>
                <option value="graduate">Civilian Graduate / B.Tech / Postgraduate</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedType('all');
                  setSelectedSector('all');
                  setSelectedLocation('all');
                  setSelectedIndustry('all');
                  setSelectedSalary('all');
                  setSelectedExperience('all');
                  setSelectedEducation('all');
                  setVeteranFriendlyOnly(false);
                  setAccessibleOnly(false);
                  setVerifiedOnly(false);
                }}
                className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Opportunities Count */}
      <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
        <span>Displaying <strong>{sortedJobs.length}</strong> opportunities matching criteria</span>
        <span>Showing real-time vetted listings</span>
      </div>

      {/* Jobs Grid */}
      {sortedJobs.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-2xl bg-[#071328]/80 border border-slate-800 space-y-3">
          <Briefcase className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Vacancies Match Your Filter</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Try broadening your location, industry, or salary parameters to discover more veteran-accredited roles.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedType('all');
              setSelectedSector('all');
              setSelectedLocation('all');
              setSelectedIndustry('all');
            }}
            className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400"
          >
            Clear Search & Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedJobs.map(job => {
            const isSaved = savedJobIds.includes(job.id);
            const applied = isJobApplied(job.id);

            return (
              <div
                key={job.id}
                className={`p-6 rounded-2xl bg-[#071328]/95 border transition-all flex flex-col justify-between space-y-4 ${
                  job.isDuplicateOrFlagged 
                    ? 'border-amber-500/40 bg-amber-950/10' 
                    : 'border-slate-800 hover:border-cyan-500/40 shadow-lg shadow-black/20'
                }`}
              >
                <div>
                  {/* Card Header Badges */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <DemoDataBadge size="sm" />
                      
                      {/* Sector Badge */}
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                        job.sector === 'government'
                          ? 'bg-amber-950/60 text-amber-300 border border-amber-500/30'
                          : job.sector === 'psu'
                          ? 'bg-blue-950/60 text-blue-300 border border-blue-500/30'
                          : 'bg-slate-900 text-cyan-300 border border-cyan-500/20'
                      }`}>
                        {job.sector === 'psu' ? 'PSU' : job.sector}
                      </span>

                      {/* Type Badge */}
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700 uppercase">
                        {job.type}
                      </span>

                      {/* Verification Status */}
                      {job.verificationStatus === 'verified' ? (
                        <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-0.5 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-500/20">
                          <ShieldCheck className="w-3 h-3" />
                          <span>Verified</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-amber-400 flex items-center gap-0.5 bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-500/20">
                          <ShieldAlert className="w-3 h-3" />
                          <span>Unverified</span>
                        </span>
                      )}

                      {/* Accessible Role */}
                      {job.isAccessibleRole && (
                        <span className="text-[10px] font-mono text-teal-400 flex items-center gap-0.5 bg-teal-950/40 px-1.5 py-0.5 rounded border border-teal-500/20" title="Accessible & Disability Friendly">
                          <Accessibility className="w-3 h-3" />
                          <span>Accessible</span>
                        </span>
                      )}
                    </div>

                    {/* Bookmark Button */}
                    <button
                      onClick={() => toggleSaveJob(job.id)}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 transition-colors"
                      aria-label="Bookmark Opportunity"
                      title={isSaved ? 'Remove Bookmark' : 'Bookmark Opportunity'}
                    >
                      {isSaved ? (
                        <BookmarkCheck className="w-4 h-4 text-cyan-400" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Flagged / Scam Warning */}
                  {job.isDuplicateOrFlagged && (
                    <div className="p-2.5 rounded-xl bg-amber-950/70 border border-amber-500/40 text-amber-300 text-[11px] flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                      <span>Flagged for review. Ensure official portal verification before sharing documents.</span>
                    </div>
                  )}

                  {/* Role Title & Company */}
                  <h3 
                    onClick={() => setSelectedJobForDetail(job)}
                    className="text-base font-bold text-white hover:text-cyan-300 cursor-pointer transition-colors"
                  >
                    {job.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-cyan-400 font-semibold">{job.company}</p>
                    <span className="text-slate-600">•</span>
                    <span className="text-[11px] text-slate-400">{job.industry}</span>
                  </div>

                  {/* Location & Compensation */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mt-2.5">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{job.location} ({job.workplaceType})</span>
                    </span>
                    <span>•</span>
                    <span className="font-mono text-emerald-400 font-semibold flex items-center gap-0.5">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{job.salaryRange}</span>
                    </span>
                  </div>

                  {/* Education & Experience info */}
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 mt-2">
                    <span className="flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      <GraduationCap className="w-3 h-3 text-cyan-400" />
                      <span>{job.educationRequired}</span>
                    </span>
                    <span className="flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      <span>{job.experienceLevel}</span>
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mt-3 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>

                  {/* Military Suitability & Skills */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-mono text-[11px]">Veteran Alignment Fit:</span>
                      <span className="font-mono font-bold text-emerald-400">
                        {job.veteranFriendlyScore}% Match
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {job.civilianSkillsMatched.slice(0, 4).map(skill => (
                        <span
                          key={skill}
                          className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-300 border border-cyan-500/20"
                        >
                          {skill}
                        </span>
                      ))}
                      {job.civilianSkillsMatched.length > 4 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-500">
                          +{job.civilianSkillsMatched.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedJobForDetail(job)}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono flex items-center gap-1 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>

                    <button
                      onClick={() => handleOpenReportModal(job)}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-red-950/50 text-slate-500 hover:text-red-400 text-xs transition-colors"
                      title="Report Scam or Fake Listing"
                    >
                      <Flag className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {job.officialUrl && (
                      <a
                        href={job.officialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 text-xs font-mono flex items-center gap-1"
                        title="Official Application Portal"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Official</span>
                      </a>
                    )}

                    <button
                      disabled={applied}
                      onClick={() => handleOpenApplyModal(job)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        applied
                          ? 'bg-slate-800 text-slate-400 cursor-default'
                          : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
                      }`}
                    >
                      {applied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Applied</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Apply</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* MODAL 1: Comprehensive Job Details Modal */}
      {selectedJobForDetail && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#071328] border border-slate-800 w-full max-w-3xl rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                    ROLE SPECIFICATION
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-cyan-500/20 uppercase">
                    {selectedJobForDetail.sector}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700 uppercase">
                    {selectedJobForDetail.type}
                  </span>
                  {selectedJobForDetail.verificationStatus === 'verified' && (
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-0.5 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified Employer</span>
                    </span>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                  {selectedJobForDetail.title}
                </h2>
                <p className="text-sm text-cyan-400 font-semibold mt-1">
                  {selectedJobForDetail.company} • {selectedJobForDetail.location} ({selectedJobForDetail.workplaceType})
                </p>
              </div>

              <button
                onClick={() => setSelectedJobForDetail(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Zero Fee Warning Banner */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero Candidate Fee Policy. Never pay for applications or equipment.</span>
              </span>
              <button
                onClick={() => {
                  const j = selectedJobForDetail;
                  setSelectedJobForDetail(null);
                  handleOpenReportModal(j);
                }}
                className="text-red-400 hover:text-red-300 font-mono text-[11px] flex items-center gap-1"
              >
                <Flag className="w-3 h-3" />
                <span>Report Listing</span>
              </button>
            </div>

            {/* Key Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-slate-500 font-mono text-[11px] block">Compensation</span>
                <span className="font-bold text-emerald-400 font-mono mt-0.5 block">{selectedJobForDetail.salaryRange}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-slate-500 font-mono text-[11px] block">Education</span>
                <span className="font-semibold text-white mt-0.5 block">{selectedJobForDetail.educationRequired}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-slate-500 font-mono text-[11px] block">Experience</span>
                <span className="font-semibold text-white mt-0.5 block">{selectedJobForDetail.experienceLevel}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-slate-500 font-mono text-[11px] block">Veteran Fit</span>
                <span className="font-bold text-cyan-400 font-mono mt-0.5 block">{selectedJobForDetail.veteranFriendlyScore}% Score</span>
              </div>
            </div>

            {/* Full Role Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">Position Overview</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedJobForDetail.description}
              </p>
            </div>

            {/* Eligibility Summary */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">Eligibility & Military Background</h4>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1.5">
                <p>{selectedJobForDetail.eligibilitySummary}</p>
                <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-1.5">
                  <span className="text-slate-500 text-[11px] font-mono">Recommended Branches:</span>
                  {selectedJobForDetail.militaryBackgroundSuitability.map(branch => (
                    <span key={branch} className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/20 font-mono">
                      {branch}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Civilian Skills Required */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">Translated Civilian Competencies</h4>
              <div className="flex flex-wrap gap-2">
                {selectedJobForDetail.civilianSkillsMatched.map(skill => (
                  <span
                    key={skill}
                    className="text-xs px-2.5 py-1 rounded-lg bg-cyan-950/40 text-cyan-300 border border-cyan-500/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Application Process Steps */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">Application Steps & Hiring Pipeline</h4>
              <p className="text-xs text-slate-300 p-3 rounded-xl bg-slate-900 border border-slate-800">
                {selectedJobForDetail.applicationProcess}
              </p>
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              {selectedJobForDetail.officialUrl ? (
                <a
                  href={selectedJobForDetail.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-700 text-xs font-mono flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Visit Official Portal</span>
                </a>
              ) : <div />}

              <div className="w-full sm:w-auto flex items-center gap-3">
                <button
                  onClick={() => setSelectedJobForDetail(null)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                >
                  Close
                </button>

                <button
                  disabled={isJobApplied(selectedJobForDetail.id)}
                  onClick={() => {
                    const j = selectedJobForDetail;
                    setSelectedJobForDetail(null);
                    handleOpenApplyModal(j);
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
                >
                  {isJobApplied(selectedJobForDetail.id) ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-950" />
                      <span>Already Applied</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Apply via ValorBadge</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: Apply with Explicit Consent Modal */}
      {selectedJobForApply && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#071328] border border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl p-6 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest">
                  APPLICATION WITH CONSENT
                </span>
                <h3 className="text-lg font-bold text-white">
                  {selectedJobForApply.title}
                </h3>
                <p className="text-xs text-slate-400">{selectedJobForApply.company}</p>
              </div>
              <button
                onClick={() => setSelectedJobForApply(null)}
                className="text-slate-400 hover:text-white text-sm p-1"
              >
                ✕
              </button>
            </div>

            {/* Privacy Protection Callout */}
            <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-slate-300 flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-white text-[11px] uppercase font-mono tracking-wider">
                  Veteran Privacy Guarantee
                </span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Only translated civilian competencies and your chosen resume file are transmitted. Tactical military units, internal defense IDs, and sensitive data remain shielded.
                </p>
              </div>
            </div>

            <form onSubmit={handleConfirmApply} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-mono text-[11px] mb-1">Select Resume Version</label>
                <select
                  value={selectedResume}
                  onChange={e => setSelectedResume(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-cyan-400 focus:outline-none font-mono"
                >
                  <option value="Civilian_Operations_Resume_v2.pdf">Civilian_Operations_Resume_v2.pdf (Verified Translation)</option>
                  <option value="Executive_Logistics_Profile_2026.pdf">Executive_Logistics_Profile_2026.pdf (Detailed SOP Dossier)</option>
                  <option value="Technical_Specialist_Resume.pdf">Technical_Specialist_Resume.pdf (Technical Equivalence)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-mono text-[11px] mb-1">
                  Optional Candidate Note for Hiring Team
                </label>
                <textarea
                  rows={3}
                  value={applyNotes}
                  onChange={e => setApplyNotes(e.target.value)}
                  placeholder="Share a brief civilian transition summary or location availability..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              {/* Explicit Consent Checkbox */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consentCheck"
                  checked={consentChecked}
                  onChange={e => setConsentChecked(e.target.checked)}
                  className="w-4 h-4 accent-cyan-400 rounded mt-0.5 cursor-pointer"
                  required
                />
                <label htmlFor="consentCheck" className="text-slate-300 text-xs leading-relaxed cursor-pointer select-none">
                  <strong className="text-white">Grant Explicit Profile Sharing Consent:</strong> I authorize ValorBadge to transmit my translated civilian profile, contact email, and resume to {selectedJobForApply.company} strictly for this role.
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedJobForApply(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!consentChecked}
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-cyan-500/20"
                >
                  Confirm & Transmit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Scam & Fraud Reporting Modal */}
      {selectedJobForReport && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#071328] border border-slate-800 w-full max-w-md rounded-2xl shadow-2xl p-6 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Flag className="w-5 h-5 text-red-400" />
                <h3 className="text-base font-bold text-white">Report Opportunity</h3>
              </div>
              <button
                onClick={() => setSelectedJobForReport(null)}
                className="text-slate-400 hover:text-white text-sm p-1"
              >
                ✕
              </button>
            </div>

            {reportSuccess ? (
              <div className="py-6 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-sm font-bold text-white">Listing Flagged for Inspection</h4>
                <p className="text-xs text-slate-400">
                  Thank you for keeping the veteran community safe. Our Trust & Safety team will audit this vacancy.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitScamReport} className="space-y-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[11px] font-mono text-slate-400 block">Reporting vacancy:</span>
                  <span className="font-bold text-white block mt-0.5">{selectedJobForReport.title}</span>
                  <span className="text-cyan-400 text-[11px]">{selectedJobForReport.company}</span>
                </div>

                <div>
                  <label className="block text-slate-400 font-mono text-[11px] mb-1">Reason for Report *</label>
                  <select
                    value={scamReason}
                    onChange={e => setScamReason(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-red-400 focus:outline-none"
                  >
                    <option value="fee_requested">Asked for money / registration / interview fee (Scam)</option>
                    <option value="unverified_email">Suspicious email / non-official domain</option>
                    <option value="fake_quota">Fake defense quota / misleading military tie-in</option>
                    <option value="duplicate_expired">Expired or duplicate vacancy</option>
                    <option value="misleading_terms">Inaccurate salary or misleading job location</option>
                    <option value="other">Other compliance violation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-mono text-[11px] mb-1">Details & Evidence</label>
                  <textarea
                    rows={3}
                    value={scamDetails}
                    onChange={e => setScamDetails(e.target.value)}
                    placeholder="Describe what occurred (e.g. Received SMS asking for ₹500 fee, fake interviewer phone number)..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:border-red-400 focus:outline-none"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedJobForReport(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold transition-colors"
                  >
                    Submit Report
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL 4: Job Alerts & Notifications Management */}
      {showAlertsModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#071328] border border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl p-6 sm:p-7 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white">Job Alerts & Notifications</h3>
              </div>
              <button
                onClick={() => setShowAlertsModal(false)}
                className="text-slate-400 hover:text-white text-sm p-1"
              >
                ✕
              </button>
            </div>

            {/* Active Alerts List */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Active Match Triggers ({jobAlerts.length})
              </h4>

              {jobAlerts.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No custom alerts configured yet.</p>
              ) : (
                jobAlerts.map(alert => (
                  <div
                    key={alert.id}
                    className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{alert.title}</span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          alert.isActive ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {alert.isActive ? 'Active' : 'Paused'}
                        </span>
                      </div>
                      <p className="text-slate-400 text-[11px]">Keywords: <strong className="text-cyan-300">{alert.roleKeywords}</strong></p>
                      <p className="text-slate-500 text-[10px]">{alert.location} • {alert.frequency} alerts</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => toggleJobAlert(alert.id)}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono"
                      >
                        {alert.isActive ? 'Pause' : 'Resume'}
                      </button>
                      <button
                        onClick={() => deleteJobAlert(alert.id)}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-400 text-[11px]"
                        title="Delete Alert"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Create New Alert Form */}
            <div className="pt-4 border-t border-slate-800 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5" />
                <span>Create New Real-time Alert</span>
              </h4>

              {alertSuccess ? (
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Job alert created! You will receive notifications when matching vacancies appear.</span>
                </div>
              ) : (
                <form onSubmit={handleCreateAlert} className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 font-mono text-[11px] mb-1">Alert Name *</label>
                      <input
                        type="text"
                        required
                        value={newAlertTitle}
                        onChange={e => setNewAlertTitle(e.target.value)}
                        placeholder="e.g. Pune Defense Drone Tech Roles"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-mono text-[11px] mb-1">Keywords / Role Titles *</label>
                      <input
                        type="text"
                        required
                        value={newAlertKeywords}
                        onChange={e => setNewAlertKeywords(e.target.value)}
                        placeholder="e.g. UAV, Avionics, Signal, Fleet"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-mono text-[11px] mb-1">Preferred Location</label>
                      <input
                        type="text"
                        value={newAlertLocation}
                        onChange={e => setNewAlertLocation(e.target.value)}
                        placeholder="e.g. Bengaluru, Pune, Pan-India"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-mono text-[11px] mb-1">Notification Frequency</label>
                      <select
                        value={newAlertFrequency}
                        onChange={e => setNewAlertFrequency(e.target.value as any)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-cyan-400 focus:outline-none capitalize"
                      >
                        <option value="instant">Instant Real-time Dispatch</option>
                        <option value="daily">Daily Morning Digest</option>
                        <option value="weekly">Weekly Rollup</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20"
                    >
                      Save & Activate Alert
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
