import React, { useState } from 'react';
import { 
  Briefcase, 
  Bookmark, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  ArrowRight, 
  Building2, 
  Trash2,
  Send,
  Sparkles,
  AlertCircle,
  FileText,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  XCircle,
  Award,
  Video,
  Edit3,
  Check,
  Lock
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { DemoDataBadge } from '../../common/DemoDataBadge';
import { SecurityNoticeBanner } from '../../common/SecurityNoticeBanner';
import { ApplicationRecord } from '../../../types';

export const ApplicationsSavedView: React.FC = () => {
  const { 
    applications, 
    savedJobIds, 
    toggleSaveJob, 
    setCurrentRoute, 
    submitApplicationWithConsent,
    updateApplicationStage,
    withdrawApplication,
    jobs
  } = useApp();

  // Active filter stage
  const [activeStageFilter, setActiveStageFilter] = useState<'all' | 'saved' | 'applied' | 'interview' | 'selected' | 'rejected'>('all');
  
  // Selected Application for Stage Update modal
  const [editingApp, setEditingApp] = useState<ApplicationRecord | null>(null);
  const [modalStage, setModalStage] = useState<ApplicationRecord['stage']>('applied');
  const [modalNotes, setModalNotes] = useState<string>('');
  const [modalInterviewDate, setModalInterviewDate] = useState<string>('');
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);

  // Saved Jobs list
  const savedJobsList = jobs.filter(j => savedJobIds.includes(j.id));

  // Compute counts for the pipeline
  const savedCount = savedJobIds.length;
  const appliedCount = applications.filter(a => a.stage === 'applied' || (!a.stage && a.status === 'submitted')).length;
  const interviewCount = applications.filter(a => a.stage === 'interview' || a.status === 'interview_scheduled').length;
  const selectedCount = applications.filter(a => a.stage === 'selected' || a.status === 'selected').length;
  const rejectedCount = applications.filter(a => a.stage === 'rejected' || a.status === 'rejected').length;

  // Filtered applications
  const filteredApplications = applications.filter(app => {
    if (activeStageFilter === 'all') return true;
    if (activeStageFilter === 'saved') return false; // Handled separately
    if (activeStageFilter === 'applied') return app.stage === 'applied' || (!app.stage && app.status === 'submitted');
    if (activeStageFilter === 'interview') return app.stage === 'interview' || app.status === 'interview_scheduled';
    if (activeStageFilter === 'selected') return app.stage === 'selected' || app.status === 'selected';
    if (activeStageFilter === 'rejected') return app.stage === 'rejected' || app.status === 'rejected';
    return true;
  });

  const handleOpenEditModal = (app: ApplicationRecord) => {
    setEditingApp(app);
    setModalStage(app.stage || 'applied');
    setModalNotes(app.notes || '');
    setModalInterviewDate(app.interviewDate || '');
    setUpdateSuccess(false);
  };

  const handleSaveStageUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingApp) return;

    updateApplicationStage(editingApp.id, modalStage, modalNotes, modalInterviewDate);
    setUpdateSuccess(true);
    setTimeout(() => {
      setUpdateSuccess(false);
      setEditingApp(null);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title & Badge */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>VETERAN CAREER LIFECYCLE</span>
            </span>
            <DemoDataBadge />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Application Pipeline & Saved Roles
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Track your status through each career milestone: Saved → Applied → Interview → Selected / Rejected.
          </p>
        </div>

        <button
          onClick={() => setCurrentRoute('jobs')}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 shrink-0"
        >
          <Briefcase className="w-4 h-4" />
          <span>Explore Open Roles</span>
        </button>
      </div>

      <SecurityNoticeBanner compact />

      {/* Visual Pipeline Bar */}
      <div className="p-4 rounded-2xl bg-[#071328]/90 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Hiring Pipeline Stages
          </span>
          <span className="text-[11px] font-mono text-cyan-400">
            {applications.length} Active Transitions Logged
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs">
          {/* 1. Saved */}
          <button
            onClick={() => setActiveStageFilter('saved')}
            className={`p-3 rounded-xl border text-left transition-all ${
              activeStageFilter === 'saved'
                ? 'bg-slate-800 border-cyan-400 text-cyan-300 shadow-md'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase text-slate-500 font-semibold">1. Bookmarked</span>
              <Bookmark className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div className="text-xl font-bold text-white">{savedCount}</div>
            <span className="text-[10px] text-slate-500">Saved Jobs</span>
          </button>

          {/* 2. Applied */}
          <button
            onClick={() => setActiveStageFilter('applied')}
            className={`p-3 rounded-xl border text-left transition-all ${
              activeStageFilter === 'applied'
                ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300 shadow-md'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase text-slate-500 font-semibold">2. Transmitted</span>
              <Send className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-xl font-bold text-white">{appliedCount}</div>
            <span className="text-[10px] text-cyan-400">Applied</span>
          </button>

          {/* 3. Interview */}
          <button
            onClick={() => setActiveStageFilter('interview')}
            className={`p-3 rounded-xl border text-left transition-all ${
              activeStageFilter === 'interview'
                ? 'bg-amber-950/60 border-amber-400 text-amber-300 shadow-md'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase text-slate-500 font-semibold">3. Discussion</span>
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-xl font-bold text-white">{interviewCount}</div>
            <span className="text-[10px] text-amber-400">Interview</span>
          </button>

          {/* 4. Selected */}
          <button
            onClick={() => setActiveStageFilter('selected')}
            className={`p-3 rounded-xl border text-left transition-all ${
              activeStageFilter === 'selected'
                ? 'bg-emerald-950/60 border-emerald-400 text-emerald-300 shadow-md'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase text-slate-500 font-semibold">4. Confirmed</span>
              <Award className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-xl font-bold text-white">{selectedCount}</div>
            <span className="text-[10px] text-emerald-400">Selected</span>
          </button>

          {/* 5. Rejected / Closed */}
          <button
            onClick={() => setActiveStageFilter('rejected')}
            className={`p-3 rounded-xl border text-left transition-all col-span-2 sm:col-span-1 ${
              activeStageFilter === 'rejected'
                ? 'bg-red-950/60 border-red-400 text-red-300 shadow-md'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase text-slate-500 font-semibold">5. Concluded</span>
              <XCircle className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div className="text-xl font-bold text-white">{rejectedCount}</div>
            <span className="text-[10px] text-slate-400">Archived</span>
          </button>
        </div>
      </div>

      {/* Stage Filter Buttons & All Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setActiveStageFilter('all')}
            className={`px-3 py-1.5 rounded-lg border transition-colors ${
              activeStageFilter === 'all'
                ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            All Active ({applications.length + savedCount})
          </button>

          <button
            onClick={() => setActiveStageFilter('saved')}
            className={`px-3 py-1.5 rounded-lg border transition-colors ${
              activeStageFilter === 'saved'
                ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            Saved ({savedCount})
          </button>

          <button
            onClick={() => setActiveStageFilter('applied')}
            className={`px-3 py-1.5 rounded-lg border transition-colors ${
              activeStageFilter === 'applied'
                ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            Applied ({appliedCount})
          </button>

          <button
            onClick={() => setActiveStageFilter('interview')}
            className={`px-3 py-1.5 rounded-lg border transition-colors ${
              activeStageFilter === 'interview'
                ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            Interview ({interviewCount})
          </button>

          <button
            onClick={() => setActiveStageFilter('selected')}
            className={`px-3 py-1.5 rounded-lg border transition-colors ${
              activeStageFilter === 'selected'
                ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            Selected ({selectedCount})
          </button>
        </div>

        <span className="text-slate-500 text-[11px]">
          Click any application to update stage
        </span>
      </div>

      {/* Main List */}
      {activeStageFilter === 'saved' ? (
        /* SAVED JOBS VIEW */
        <div className="space-y-4">
          {savedJobsList.length === 0 ? (
            <div className="text-center py-12 p-6 rounded-2xl bg-[#071328]/80 border border-slate-800 space-y-3">
              <Bookmark className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No Saved Opportunities</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Bookmark interesting job roles from the jobs board to apply or review them later.
              </p>
              <button
                onClick={() => setCurrentRoute('jobs')}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors"
              >
                Explore Jobs
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedJobsList.map(job => (
                <div
                  key={job.id}
                  className="p-5 rounded-2xl bg-[#071328]/95 border border-slate-800 flex flex-col justify-between space-y-3 hover:border-cyan-500/40 transition-all"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-cyan-400 border border-cyan-500/20 uppercase font-semibold">
                          {job.type}
                        </span>
                        <h4 className="text-sm font-bold text-white mt-1">{job.title}</h4>
                      </div>
                      <button
                        onClick={() => toggleSaveJob(job.id)}
                        className="text-slate-400 hover:text-red-400 p-1 transition-colors"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-cyan-400 font-semibold mt-1">{job.company}</p>
                    <p className="text-xs text-slate-400 mt-1">{job.location} • {job.salaryRange}</p>
                    
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                      {job.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                    <span className="text-emerald-400 font-mono text-xs font-bold">
                      {job.veteranFriendlyScore}% Veteran Match
                    </span>

                    <button
                      onClick={() => {
                        submitApplicationWithConsent(job.id, job.title, job.company, true);
                        toggleSaveJob(job.id);
                        setActiveStageFilter('applied');
                      }}
                      className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Apply with Consent</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* APPLICATIONS PIPELINE VIEW */
        <div className="space-y-4">
          {filteredApplications.length === 0 ? (
            <div className="text-center py-12 p-6 rounded-2xl bg-[#071328]/80 border border-slate-800 space-y-3">
              <Briefcase className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No Applications in this Stage</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Discover accredited opportunities and submit your profile with explicit consent controls.
              </p>
              <button
                onClick={() => setCurrentRoute('jobs')}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors"
              >
                Browse Open Roles
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredApplications.map(app => {
                const currentStage = app.stage || (app.status === 'interview_scheduled' ? 'interview' : app.status === 'selected' ? 'selected' : app.status === 'rejected' ? 'rejected' : 'applied');

                return (
                  <div
                    key={app.id}
                    className="p-5 rounded-2xl bg-[#071328]/95 border border-slate-800 hover:border-slate-700 transition-all space-y-4 shadow-lg shadow-black/20"
                  >
                    {/* Top Row: Title, Company, Stage Indicator */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <DemoDataBadge size="sm" />
                          <span className="text-[11px] font-mono text-slate-400">
                            Transmitted: {app.appliedDate}
                          </span>
                          {app.consentProvided && (
                            <span className="text-[10px] font-mono text-cyan-300 flex items-center gap-0.5 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-500/30">
                              <Lock className="w-2.5 h-2.5" />
                              <span>Consent Verified</span>
                            </span>
                          )}
                        </div>
                        <h3 className="text-base font-bold text-white">{app.jobTitle}</h3>
                        <p className="text-xs text-cyan-400 font-semibold">{app.companyName || (app as any).company}</p>
                      </div>

                      {/* Stage Badge & Action Button */}
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border uppercase ${
                          currentStage === 'interview'
                            ? 'bg-amber-950/60 text-amber-300 border-amber-500/40'
                            : currentStage === 'selected'
                            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                            : currentStage === 'rejected'
                            ? 'bg-red-950/60 text-red-300 border-red-500/40'
                            : 'bg-cyan-950/60 text-cyan-300 border-cyan-500/40'
                        }`}>
                          {currentStage}
                        </span>

                        <button
                          onClick={() => handleOpenEditModal(app)}
                          className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700 flex items-center gap-1 transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Update Stage</span>
                        </button>
                      </div>
                    </div>

                    {/* Stepper Progression Track */}
                    <div className="pt-2 border-t border-slate-800/80">
                      <div className="flex items-center justify-between text-[11px] font-mono mb-1.5 text-slate-500">
                        <span className={currentStage === 'saved' ? 'text-cyan-400 font-bold' : ''}>1. Saved</span>
                        <ChevronRight className="w-3 h-3" />
                        <span className={currentStage === 'applied' ? 'text-cyan-400 font-bold' : ''}>2. Applied</span>
                        <ChevronRight className="w-3 h-3" />
                        <span className={currentStage === 'interview' ? 'text-amber-400 font-bold' : ''}>3. Interview</span>
                        <ChevronRight className="w-3 h-3" />
                        <span className={currentStage === 'selected' ? 'text-emerald-400 font-bold' : currentStage === 'rejected' ? 'text-red-400 font-bold' : ''}>
                          4. {currentStage === 'rejected' ? 'Concluded' : 'Selected'}
                        </span>
                      </div>

                      {/* Progress line */}
                      <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            currentStage === 'saved' ? 'w-1/4 bg-slate-400' :
                            currentStage === 'applied' ? 'w-2/4 bg-cyan-400' :
                            currentStage === 'interview' ? 'w-3/4 bg-amber-400' :
                            currentStage === 'selected' ? 'w-full bg-emerald-400' :
                            'w-full bg-red-400'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Interview Metadata or Stage Details */}
                    {currentStage === 'interview' && (
                      <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-amber-300 flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-amber-400" />
                            <span>Interview Scheduled: {app.interviewDate || 'Thursday, 10:30 AM IST'}</span>
                          </span>
                          <span className="text-[11px] font-mono text-amber-400/80">
                            Format: {app.interviewMode || 'Virtual (Microsoft Teams)'}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-amber-500/20">
                          <p className="text-[11px] text-slate-300">
                            {app.notes || 'Hiring manager will evaluate operations management & logistics experience.'}
                          </p>
                          <button
                            onClick={() => setCurrentRoute('cover_letter')}
                            className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1 shrink-0"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Launch Interview Prep</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {currentStage === 'selected' && (
                      <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <Award className="w-5 h-5 text-emerald-400 shrink-0" />
                          <div>
                            <span className="font-bold block text-white">Selection Offer Received!</span>
                            <span className="text-[11px] text-slate-300">{app.notes || 'Formal offer letter dispatched to your registered email.'}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => setCurrentRoute('resume_builder')}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs font-mono shrink-0"
                        >
                          View Transition Plan
                        </button>
                      </div>
                    )}

                    {currentStage === 'rejected' && (
                      <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/30 text-xs text-slate-300 space-y-1">
                        <span className="font-semibold text-red-300 block">Application Closed</span>
                        <p className="text-[11px] text-slate-400">
                          {app.feedbackNotes || app.notes || 'Position filled. Consider exploring additional certifications under Learning Hub.'}
                        </p>
                        <button
                          onClick={() => setCurrentRoute('learning_hub')}
                          className="text-cyan-400 hover:text-cyan-300 font-mono text-[11px] underline pt-1 block"
                        >
                          Discover Recommended Certifications →
                        </button>
                      </div>
                    )}

                    {/* General Footer Notes & Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 pt-1">
                      <span className="font-mono text-[11px]">
                        Resume Used: <strong className="text-slate-200">{app.resumeVersion || 'Civilian_Ops_Resume_v2.pdf'}</strong>
                      </span>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => withdrawApplication(app.id)}
                          className="text-slate-500 hover:text-red-400 text-[11px] transition-colors"
                        >
                          Withdraw
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* STAGE UPDATE MODAL */}
      {editingApp && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#071328] border border-slate-800 w-full max-w-md rounded-2xl shadow-2xl p-6 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest">
                  PIPELINE MANAGER
                </span>
                <h3 className="text-base font-bold text-white">{editingApp.jobTitle}</h3>
                <p className="text-xs text-slate-400">{editingApp.companyName}</p>
              </div>
              <button
                onClick={() => setEditingApp(null)}
                className="text-slate-400 hover:text-white text-sm p-1"
              >
                ✕
              </button>
            </div>

            {updateSuccess ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-sm font-bold text-white">Status Updated!</h4>
                <p className="text-xs text-slate-400">Application pipeline tracker updated.</p>
              </div>
            ) : (
              <form onSubmit={handleSaveStageUpdate} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 font-mono text-[11px] mb-1">Select Active Stage *</label>
                  <select
                    value={modalStage}
                    onChange={e => setModalStage(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-cyan-400 focus:outline-none capitalize font-semibold"
                  >
                    <option value="saved">1. Saved / Bookmarked</option>
                    <option value="applied">2. Applied (Application Transmitted)</option>
                    <option value="interview">3. Interview Scheduled / In Progress</option>
                    <option value="selected">4. Selected / Offer Extended</option>
                    <option value="rejected">5. Rejected / Concluded</option>
                  </select>
                </div>

                {modalStage === 'interview' && (
                  <div>
                    <label className="block text-slate-400 font-mono text-[11px] mb-1">Interview Date & Time</label>
                    <input
                      type="text"
                      value={modalInterviewDate}
                      onChange={e => setModalInterviewDate(e.target.value)}
                      placeholder="e.g. 18 March 2026, 11:00 AM IST"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-cyan-400 focus:outline-none font-mono"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-slate-400 font-mono text-[11px] mb-1">Candidate Notes & Feedback Log</label>
                  <textarea
                    rows={3}
                    value={modalNotes}
                    onChange={e => setModalNotes(e.target.value)}
                    placeholder="Log recruiter notes, questions asked, or offer terms..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setEditingApp(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold"
                  >
                    Save Progress
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
