import React, { useState } from 'react';
import { 
  Building2, 
  Briefcase, 
  Users, 
  Plus, 
  Search, 
  ShieldCheck, 
  Check, 
  Eye, 
  Filter, 
  CheckCircle2, 
  ExternalLink,
  MessageSquare,
  Trash2,
  MapPin,
  DollarSign,
  Clock,
  Edit3,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { DemoDataBadge } from '../../common/DemoDataBadge';
import { SecurityNoticeBanner } from '../../common/SecurityNoticeBanner';
import { DEMO_CANDIDATES } from '../../../lib/demoData';
import { JobOpportunity } from '../../../types';

export const EmployerDashboardView: React.FC = () => {
  const { setCurrentRoute, jobs, addJobPosting, deleteJobPosting, companies } = useApp();
  const [activeTab, setActiveTab] = useState<'candidates' | 'postings'>('candidates');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [newJobSuccess, setNewJobSuccess] = useState(false);

  // New job form state
  const [jobTitle, setJobTitle] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [jobSalary, setJobSalary] = useState('₹10,00,000 - ₹14,00,000 / annum');
  const [jobIndustry, setJobIndustry] = useState('Logistics & Supply Chain');
  const [jobType, setJobType] = useState<JobOpportunity['type']>('full-time');
  const [jobDescription, setJobDescription] = useState('');
  const [jobResponsibilities, setJobResponsibilities] = useState('');
  const [jobEducation, setJobEducation] = useState('Graduation / Military Technical Equivalent');
  const [jobExperience, setJobExperience] = useState('3-5 Years Service');
  const [skillsList, setSkillsList] = useState('Operations, Fleet Management, Team Leadership');
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const filteredCandidates = DEMO_CANDIDATES.filter(cand => {
    const matchesSearch = cand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cand.civilianTargetRole.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = selectedBranch === 'All' || cand.militaryBranch.includes(selectedBranch);
    return matchesSearch && matchesBranch;
  });

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: string[] = [];
    if (!jobTitle.trim()) errors.push('Job Title is required.');
    if (!jobLocation.trim()) errors.push('Location is required.');
    if (!jobDescription.trim()) errors.push('Job Description is required.');

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors([]);

    addJobPosting({
      title: jobTitle.trim(),
      company: companies[0]?.companyName || 'Nexus Supply Chain Solutions',
      companyId: companies[0]?.id || 'comp-1',
      location: jobLocation.trim(),
      country: 'IN',
      state: 'Maharashtra',
      city: jobLocation.trim().split(',')[0],
      industry: jobIndustry,
      type: jobType,
      sector: 'private',
      workplaceType: 'hybrid',
      description: jobDescription.trim() || `Exciting operational leadership role in ${jobIndustry}.`,
      responsibilities: jobResponsibilities.trim() || 'Lead cross-functional operations and safety compliance.',
      educationRequired: jobEducation,
      experienceLevel: jobExperience,
      requiredSkills: skillsList.split(',').map(s => s.trim()).filter(Boolean),
      civilianSkillsMatched: skillsList.split(',').map(s => s.trim()).filter(Boolean),
      militaryBackgroundSuitability: ['All Defense Arms', 'Agniveer Cohort'],
      veteranFriendlyScore: 95,
      salaryRange: jobSalary || 'Competitive',
      isVerifiedEmployer: true,
      verificationStatus: 'verified',
      isAccessibleRole: true,
      isVeteranFriendly: true,
      status: 'active',
      isCompanyAuthored: true
    });

    setNewJobSuccess(true);
    setTimeout(() => {
      setNewJobSuccess(false);
      setShowPostJobModal(false);
      setJobTitle('');
      setJobLocation('');
      setJobDescription('');
      setJobResponsibilities('');
    }, 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              CORPORATE TALENT SUITE
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Verified Employer</span>
            </span>
            <DemoDataBadge />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Veteran & Agniveer Talent Acquisition Portal
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Discover verified ex-service personnel, manage job requisitions, and review ontology-translated candidate competencies.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setCurrentRoute('company_profile')}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 font-mono text-xs flex items-center gap-2 transition-colors"
          >
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span>Manage Company Profile</span>
          </button>

          <button
            onClick={() => setShowPostJobModal(true)}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 shrink-0 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Requisition</span>
          </button>
        </div>
      </div>

      <SecurityNoticeBanner compact />

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#071328]/80 border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Active Job Postings</span>
          <p className="text-2xl font-bold text-white font-mono">{jobs.length}</p>
          <span className="text-[10px] text-cyan-400">All verified veteran-friendly</span>
        </div>

        <div className="p-4 rounded-xl bg-[#071328]/80 border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Applications Received</span>
          <p className="text-2xl font-bold text-white font-mono">42</p>
          <span className="text-[10px] text-emerald-400">+8 new this week</span>
        </div>

        <div className="p-4 rounded-xl bg-[#071328]/80 border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Interviews Scheduled</span>
          <p className="text-2xl font-bold text-white font-mono">11</p>
          <span className="text-[10px] text-amber-400">Next tomorrow at 11 AM</span>
        </div>

        <div className="p-4 rounded-xl bg-[#071328]/80 border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Pledge Compliance</span>
          <p className="text-2xl font-bold text-emerald-400 font-mono">100%</p>
          <span className="text-[10px] text-slate-400">Zero recruitment fees enforced</span>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex border-b border-slate-800">
        <button
          onClick={() => setActiveTab('candidates')}
          className={`px-6 py-3 font-display text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'candidates'
              ? 'border-cyan-400 text-cyan-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Talent Search & Candidate Pipeline ({DEMO_CANDIDATES.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('postings')}
          className={`px-6 py-3 font-display text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'postings'
              ? 'border-cyan-400 text-cyan-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Active Requisitions ({jobs.length})</span>
        </button>
      </div>

      {activeTab === 'candidates' ? (
        <div className="space-y-6">
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#071328]/50 p-4 rounded-2xl border border-slate-800">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search candidate by civilian role, core skills, or rank..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={selectedBranch}
                onChange={e => setSelectedBranch(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
              >
                <option value="All">All Service Arms</option>
                <option value="Army">Indian Army</option>
                <option value="Navy">Indian Navy</option>
                <option value="Air Force">Indian Air Force</option>
                <option value="Agniveer">Agniveer Cohort</option>
              </select>
            </div>
          </div>

          {/* Candidate Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCandidates.map(cand => (
              <div
                key={cand.id}
                className="p-5 rounded-2xl bg-[#071328]/90 border border-slate-800 hover:border-cyan-500/40 transition-colors flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-base font-bold text-white font-display">{cand.name}</h4>
                      <p className="text-xs text-cyan-400 font-mono mt-0.5">{cand.civilianTargetRole}</p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {cand.militaryBranch}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                    <span className="text-cyan-400 font-semibold">Ex-Service Personnel</span>
                    <span>•</span>
                    <span>{cand.yearsOfService} yrs service</span>
                  </div>

                  {/* Translated competencies */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">
                      Translated Civilian Competencies:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cand.translatedSkills.map(sk => (
                        <span
                          key={sk}
                          className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-300 border border-cyan-500/20"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">{cand.location}</span>
                  <button
                    onClick={() => setCurrentRoute('messages')}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>Contact</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobs.map(job => (
              <div
                key={job.id}
                className="p-5 rounded-2xl bg-[#071328]/90 border border-slate-800 flex flex-col justify-between space-y-3 hover:border-cyan-500/40 transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-white">{job.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5 font-medium">{job.company}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 uppercase">
                        {job.type}
                      </span>
                      <button
                        type="button"
                        onClick={() => deleteJobPosting(job.id)}
                        className="p-1 rounded hover:bg-red-950/60 text-slate-500 hover:text-red-400 transition-colors"
                        title="Delete Requisition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                      {job.salaryRange}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mt-2.5 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-cyan-400 font-mono">Verified Opportunity</span>
                  <button
                    onClick={() => setCurrentRoute('company_profile')}
                    className="text-slate-300 hover:text-white font-semibold flex items-center gap-1"
                  >
                    <span>Manage in Company Profile</span>
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Post Job Modal */}
      {showPostJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="max-w-lg w-full p-6 rounded-2xl bg-[#09152b] border border-slate-700 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white font-display">
                Create Veteran Job Requisition
              </h3>
              <button onClick={() => setShowPostJobModal(false)} className="text-slate-400 hover:text-white text-xs">
                ✕
              </button>
            </div>

            {newJobSuccess ? (
              <div className="p-6 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">Requisition Published!</h4>
                <p className="text-xs text-slate-400">
                  Your job listing is now live on the ValorBadge Veteran board with the Verified Employer badge.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCreateJob} className="space-y-4 text-xs">
                {formErrors.length > 0 && (
                  <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs space-y-1">
                    <p className="font-semibold flex items-center gap-1.5 text-red-400">
                      <AlertCircle className="w-4 h-4" />
                      <span>Please correct the following:</span>
                    </p>
                    <ul className="list-disc list-inside space-y-0.5 text-[11px] text-red-300">
                      {formErrors.map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div>
                  <label className="block font-mono uppercase text-slate-300 mb-1">Job Title *</label>
                  <input
                    type="text"
                    required
                    value={jobTitle}
                    onChange={e => setJobTitle(e.target.value)}
                    placeholder="e.g. Lead Logistics Superintendent"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono uppercase text-slate-300 mb-1">Location *</label>
                    <input
                      type="text"
                      required
                      value={jobLocation}
                      onChange={e => setJobLocation(e.target.value)}
                      placeholder="e.g. Pune, MH (On-site)"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-mono uppercase text-slate-300 mb-1">Opportunity Type</label>
                    <select
                      value={jobType}
                      onChange={e => setJobType(e.target.value as JobOpportunity['type'])}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                    >
                      <option value="full-time">Full-Time</option>
                      <option value="part-time">Part-Time</option>
                      <option value="internship">Internship</option>
                      <option value="apprenticeship">Apprenticeship</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono uppercase text-slate-300 mb-1">Annual CTC / Salary</label>
                    <input
                      type="text"
                      value={jobSalary}
                      onChange={e => setJobSalary(e.target.value)}
                      placeholder="e.g. ₹12 - 16 LPA"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-mono uppercase text-slate-300 mb-1">Industry</label>
                    <input
                      type="text"
                      value={jobIndustry}
                      onChange={e => setJobIndustry(e.target.value)}
                      placeholder="e.g. Logistics & Supply Chain"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono uppercase text-slate-300 mb-1">Job Description</label>
                  <textarea
                    rows={3}
                    value={jobDescription}
                    onChange={e => setJobDescription(e.target.value)}
                    placeholder="Provide overview of the role..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-cyan-400 focus:outline-none resize-y"
                  />
                </div>

                <div>
                  <label className="block font-mono uppercase text-slate-300 mb-1">Key Responsibilities</label>
                  <textarea
                    rows={2}
                    value={jobResponsibilities}
                    onChange={e => setJobResponsibilities(e.target.value)}
                    placeholder="• Lead team operations\n• Supervise inventory compliance"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-cyan-400 focus:outline-none resize-y"
                  />
                </div>

                <div>
                  <label className="block font-mono uppercase text-slate-300 mb-1">Required Skills (Comma separated)</label>
                  <input
                    type="text"
                    value={skillsList}
                    onChange={e => setSkillsList(e.target.value)}
                    placeholder="e.g. Operations, Fleet Management, Team Leadership"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPostJobModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold"
                  >
                    Publish Requisition
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
