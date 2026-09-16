import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Briefcase, 
  Cpu, 
  FileText, 
  Award, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Layers,
  MapPin
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { DemoDataBadge } from '../../common/DemoDataBadge';
import { SecurityNoticeBanner } from '../../common/SecurityNoticeBanner';
import { DEMO_JOBS, DEMO_SCHEMES, SKILL_TRANSLATION_DATABASE } from '../../../lib/demoData';

export const DashboardView: React.FC = () => {
  const { profile, setCurrentRoute, setIsOnboardingOpen, applications, savedJobIds } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Privacy Notice Banner */}
      <SecurityNoticeBanner compact />

      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#071732] via-[#091e42] to-[#061226] border border-cyan-500/30 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center space-x-2.5 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[11px] font-mono font-bold uppercase border border-cyan-500/40">
                {profile.userType ? profile.userType.replace(/_/g, ' ') : 'Veteran'} Portal
              </span>
              <span className="text-xs text-slate-400 font-mono">
                ID: {profile.id}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Welcome back, {profile.fullName || 'Service Member'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Your service background in <span className="text-cyan-300 font-medium">{profile.generalRoleCategory || 'Armed Forces'}</span> is translated into 5 civilian competency clusters.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setCurrentRoute('skill_translator')}
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all flex items-center gap-1.5"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Skill Translator</span>
            </button>
            <button
              onClick={() => setCurrentRoute('resume_builder')}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Resume Builder</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div 
          onClick={() => setCurrentRoute('career_matches')}
          className="p-4 rounded-xl bg-[#071328]/80 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Career Matches</span>
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-bold text-white font-mono">14</p>
          <span className="text-[10px] text-cyan-400">92%+ match rating</span>
        </div>

        <div 
          onClick={() => setCurrentRoute('jobs')}
          className="p-4 rounded-xl bg-[#071328]/80 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Open Jobs</span>
            <Briefcase className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-bold text-white font-mono">48</p>
          <span className="text-[10px] text-slate-400">In your preferred cities</span>
        </div>

        <div 
          onClick={() => setCurrentRoute('applications')}
          className="p-4 rounded-xl bg-[#071328]/80 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Applications</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-bold text-white font-mono">{applications.length}</p>
          <span className="text-[10px] text-amber-400">1 interview scheduled</span>
        </div>

        <div 
          onClick={() => setCurrentRoute('government_schemes')}
          className="p-4 rounded-xl bg-[#071328]/80 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Eligible Schemes</span>
            <ShieldCheck className="w-4 h-4 text-teal-400" />
          </div>
          <p className="text-2xl font-bold text-white font-mono">6</p>
          <span className="text-[10px] text-teal-400">Central & State (DGR)</span>
        </div>
      </div>

      {/* Main Grid: Translated Skills Overview & Top Recommended Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 cols): Translated Civilian Competency Profile */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="p-6 rounded-2xl bg-[#071328]/80 border border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div>
                <h3 className="text-base font-bold text-white font-display">
                  Your Translated Civilian Competencies
                </h3>
                <p className="text-xs text-slate-400">
                  Derived from your military background without disclosing classified operations.
                </p>
              </div>
              <button
                onClick={() => setCurrentRoute('service_profile')}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                Edit Profile →
              </button>
            </div>

            <div className="space-y-4">
              {/* Category 1: Technical & Logistics */}
              <div>
                <span className="text-xs font-mono font-bold uppercase text-slate-300 block mb-2">
                  Technical & Logistics Core
                </span>
                <div className="flex flex-wrap gap-2">
                  {profile.technicalSkills.map((sk) => (
                    <span
                      key={sk}
                      className="text-xs px-3 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-300"
                    >
                      {sk}
                    </span>
                  ))}
                  {profile.logistics.map((sk) => (
                    <span
                      key={sk}
                      className="text-xs px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Category 2: Leadership & Safety */}
              <div>
                <span className="text-xs font-mono font-bold uppercase text-slate-300 block mb-2">
                  Leadership & Operational Governance
                </span>
                <div className="flex flex-wrap gap-2">
                  {profile.leadership.map((sk) => (
                    <span
                      key={sk}
                      className="text-xs px-3 py-1 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-indigo-300"
                    >
                      {sk}
                    </span>
                  ))}
                  {profile.safety.map((sk) => (
                    <span
                      key={sk}
                      className="text-xs px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Profile Visibility: <strong className="text-white capitalize">{profile.visibility.replace('_', ' ')}</strong></span>
              <button
                onClick={() => setCurrentRoute('privacy_center')}
                className="text-cyan-400 hover:text-cyan-300"
              >
                Change in Privacy Center
              </button>
            </div>
          </div>

          {/* Recommended Jobs Card */}
          <div className="p-6 rounded-2xl bg-[#071328]/80 border border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white font-display">
                  Top Recommended Opportunities
                </h3>
                <DemoDataBadge />
              </div>
              <button
                onClick={() => setCurrentRoute('jobs')}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                View All →
              </button>
            </div>

            <div className="space-y-3">
              {DEMO_JOBS.slice(0, 3).map((job) => (
                <div
                  key={job.id}
                  className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div>
                    <h4 className="text-sm font-bold text-white">{job.title}</h4>
                    <p className="text-xs text-cyan-400 font-medium">{job.company}</p>
                    <p className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.salaryRange}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 px-2 py-1 rounded border border-emerald-500/30">
                      {job.veteranFriendlyScore}% Fit
                    </span>
                    <button
                      onClick={() => setCurrentRoute('jobs')}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500/15 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 text-xs font-bold transition-colors"
                    >
                      Inspect
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (1 col): Transition Next Actions & ValorAI Quick Launcher */}
        <div className="space-y-6">
          
          {/* ValorAI Assistant Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#081b38] to-[#061226] border border-cyan-500/30 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">ValorAI Career Advisor</h4>
                <p className="text-[11px] text-cyan-300">Ready to assist your transition</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Ask ValorAI how to describe specific military achievements on your civilian resume or prepare for behavioral interview questions.
            </p>
            <button
              onClick={() => setCurrentRoute('valor_ai')}
              className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20"
            >
              <span>Consult ValorAI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Resettlement & Government Schemes Card */}
          <div className="p-6 rounded-2xl bg-[#071328]/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white font-display">Government Schemes</h4>
              <DemoDataBadge size="sm" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Discover official Directorate General Resettlement (DGR) training courses and Agniveer skill credit portals.
            </p>
            <div className="space-y-2">
              {DEMO_SCHEMES.slice(0, 2).map((s) => (
                <div key={s.id} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
                  <span className="font-semibold text-white block mb-0.5">{s.title}</span>
                  <span className="text-[10px] text-cyan-400 font-mono block">{s.category.toUpperCase()}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setCurrentRoute('government_schemes')}
              className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
            >
              Browse All Schemes
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
