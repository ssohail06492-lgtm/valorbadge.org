import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Cpu, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  ArrowRight, 
  Compass, 
  AlertTriangle, 
  FileText, 
  Briefcase, 
  ExternalLink,
  Sparkles,
  ChevronRight,
  RefreshCw,
  SlidersHorizontal,
  Lock
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { HeroCareerPathway } from '../../common/HeroCareerPathway';
import { StateDisplay } from '../../common/StateDisplay';
import { SecurityNoticeBanner } from '../../common/SecurityNoticeBanner';
import { DemoDataBadge } from '../../common/DemoDataBadge';

interface TransitionMilestone {
  id: string;
  stage: 'service' | 'skills' | 'training' | 'career';
  timeframe: '30_days' | '60_days' | '90_days' | '180_days';
  title: string;
  description: string;
  actionLabel: string;
  actionRoute: string;
  completed: boolean;
}

export const TransitionPlanView: React.FC = () => {
  const { profile, setCurrentRoute, reducedMotion } = useApp();

  const [selectedTimeline, setSelectedTimeline] = useState<'all' | '30_days' | '60_days' | '90_days' | '180_days'>('all');
  const [selectedStage, setSelectedStage] = useState<'all' | 'service' | 'skills' | 'training' | 'career'>('all');
  const [targetRole, setTargetRole] = useState<string>('Supply Chain & Operations Manager');
  const [simulatedState, setSimulatedState] = useState<'idle' | 'loading' | 'error'>('idle');

  // Interactive milestone checklist
  const [milestones, setMilestones] = useState<TransitionMilestone[]>([
    {
      id: 'm1',
      stage: 'service',
      timeframe: '30_days',
      title: 'Define Non-Sensitive Military Trade Category',
      description: 'Document civilian-relevant duties in logistics, technical support, administration or operations without recording tactical locations or classified equipment.',
      actionLabel: 'Edit Profile',
      actionRoute: 'service_profile',
      completed: true
    },
    {
      id: 'm2',
      stage: 'skills',
      timeframe: '30_days',
      title: 'Generate Standard Civilian Competency Matrix',
      description: 'Convert military trade jargon into 5 core corporate competency clusters (Leadership, Supply Chain, Operations, Security, Communications).',
      actionLabel: 'Launch Skill Translator',
      actionRoute: 'skill_translator',
      completed: true
    },
    {
      id: 'm3',
      stage: 'skills',
      timeframe: '60_days',
      title: 'Build ATS-Optimized Civilian Resume',
      description: 'Format achievements with metrics (e.g., managed $2M inventory, 99.4% uptime) eliminating military acronyms that confuse civilian recruiters.',
      actionLabel: 'Open Resume Builder',
      actionRoute: 'resume_builder',
      completed: false
    },
    {
      id: 'm4',
      stage: 'training',
      timeframe: '60_days',
      title: 'Enroll in DGR Resettlement or Accredited Tech Course',
      description: 'Select government-approved or industry certifications (PMP, Six Sigma, AWS Cloud, or Logistics Management) to close domain skill gaps.',
      actionLabel: 'Browse Learning Hub',
      actionRoute: 'learning_hub',
      completed: false
    },
    {
      id: 'm5',
      stage: 'training',
      timeframe: '90_days',
      title: 'Check Government Resettlement & Quota Schemes',
      description: 'Identify Central/State concessions, PSU age relaxation, and reservation quotas applicable to your discharge category.',
      actionLabel: 'View Schemes',
      actionRoute: 'government_schemes',
      completed: true
    },
    {
      id: 'm6',
      stage: 'career',
      timeframe: '90_days',
      title: 'Practice Corporate Behavioral Interviews with ValorAI',
      description: 'Refine STAR method answers explaining how battlefield/peace-station leadership translates to corporate conflict resolution and deadline management.',
      actionLabel: 'Interview Coach',
      actionRoute: 'valor_ai',
      completed: false
    },
    {
      id: 'm7',
      stage: 'career',
      timeframe: '180_days',
      title: 'Submit Direct Applications to Verified Inclusive Employers',
      description: 'Apply to verified organizations pledged to hire veterans and Agniveers with transparent salary ranges and zero placement fees.',
      actionLabel: 'Explore Jobs Feed',
      actionRoute: 'jobs',
      completed: false
    }
  ]);

  const toggleMilestone = (id: string) => {
    setMilestones(prev =>
      prev.map(m => (m.id === id ? { ...m, completed: !m.completed } : m))
    );
  };

  const completedCount = milestones.filter(m => m.completed).length;
  const readinessPercent = Math.round((completedCount / milestones.length) * 100);

  const filteredMilestones = milestones.filter(m => {
    if (selectedTimeline !== 'all' && m.timeframe !== selectedTimeline) return false;
    if (selectedStage !== 'all' && m.stage !== selectedStage) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Privacy & Zero-Classified-Data Banner */}
      <SecurityNoticeBanner compact />

      {/* Hero Header Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#071936] via-[#092248] to-[#06142a] border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        {/* Background glow streak */}
        <div className="absolute inset-x-0 -top-24 h-40 bg-cyan-500/15 blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[11px] font-mono font-bold uppercase border border-cyan-500/40">
                TRANSITION COMMAND CENTER
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Candidate: {profile.fullName || 'Service Member'}
              </span>
              <DemoDataBadge />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
              Personalized Civilian Transition Plan
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              A structured, step-by-step roadmap mapping your armed forces experience into high-demand civilian professions. Follow milestones across <strong className="text-cyan-300">Service</strong>, <strong className="text-cyan-300">Skills</strong>, <strong className="text-cyan-300">Training</strong>, and <strong className="text-cyan-300">Career</strong>.
            </p>

            {/* Target Role Selector */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400">Target Track:</span>
              <select
                value={targetRole}
                onChange={e => setTargetRole(e.target.value)}
                className="bg-slate-900/90 border border-slate-700 text-cyan-300 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-cyan-400"
              >
                <option value="Supply Chain & Operations Manager">Supply Chain & Operations Manager</option>
                <option value="Corporate Security & Risk Specialist">Corporate Security & Risk Specialist</option>
                <option value="Network Infrastructure Administrator">Network Infrastructure Administrator</option>
                <option value="Fleet & Equipment Operations Lead">Fleet & Equipment Operations Lead</option>
                <option value="Human Resources & Team Operations">Human Resources & Team Operations</option>
                <option value="Technical Project Manager">Technical Project Manager</option>
              </select>
            </div>
          </div>

          {/* Readiness Meter Card */}
          <div className="w-full lg:w-72 p-4 rounded-xl bg-[#050e1d]/90 border border-slate-700/90 flex flex-col items-center text-center shadow-lg">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
              TRANSITION READINESS SCORE
            </span>
            <div className="relative my-2 flex items-center justify-center">
              <div className="text-4xl font-extrabold font-mono text-cyan-400">
                {readinessPercent}%
              </div>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${readinessPercent}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-300">
              <strong className="text-white">{completedCount}</strong> of <strong className="text-white">{milestones.length}</strong> core milestones checked
            </p>
            <span className="text-[10px] text-cyan-300 mt-1">
              {readinessPercent >= 70 ? 'High Civilian Placement Readiness' : 'In Active Preparation Phase'}
            </span>
          </div>
        </div>
      </div>

      {/* Main “Service → Skills → Training → Career” Visual Pathway */}
      <div>
        <HeroCareerPathway />
      </div>

      {/* Simulated State Tester (Demonstrating Loading / Error / Empty states) */}
      {simulatedState === 'loading' && (
        <StateDisplay
          type="loading"
          title="Recalculating Transition Pathway..."
          message="Optimizing milestones against current corporate hiring quotas and skill taxonomy."
          actionLabel="Cancel Simulation"
          onAction={() => setSimulatedState('idle')}
        />
      )}

      {simulatedState === 'error' && (
        <StateDisplay
          type="error"
          title="Could Not Refresh Milestones"
          message="Unable to communicate with the skill taxonomy matrix. Local records are preserved."
          actionLabel="Retry Synchronization"
          onAction={() => setSimulatedState('idle')}
          secondaryLabel="Dismiss"
          onSecondaryAction={() => setSimulatedState('idle')}
        />
      )}

      {/* Filter & Controls Toolbar */}
      {simulatedState === 'idle' && (
        <div className="p-4 rounded-xl bg-[#071328]/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Stage Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-mono text-[11px] mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
              Stage:
            </span>
            {(['all', 'service', 'skills', 'training', 'career'] as const).map(stage => (
              <button
                key={stage}
                onClick={() => setSelectedStage(stage)}
                className={`px-2.5 py-1 rounded-lg capitalize font-medium transition-all ${
                  selectedStage === stage
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {stage}
              </button>
            ))}
          </div>

          {/* Timeline Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-mono text-[11px] mr-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              Timeline:
            </span>
            {[
              { id: 'all', label: 'All' },
              { id: '30_days', label: '0-30 Days' },
              { id: '60_days', label: '30-60 Days' },
              { id: '90_days', label: '60-90 Days' },
              { id: '180_days', label: '90-180 Days' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedTimeline(t.id as any)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedTimeline === t.id
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Milestones List & Empty State Check */}
      {simulatedState === 'idle' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Actionable Transition Roadmap</span>
              <span className="text-xs font-mono text-slate-400 font-normal">
                ({filteredMilestones.length} milestones)
              </span>
            </h3>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSimulatedState('loading')}
                className="text-[11px] text-slate-400 hover:text-cyan-300 flex items-center gap-1 font-mono"
                title="Test loading state"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Simulate Sync</span>
              </button>
            </div>
          </div>

          {filteredMilestones.length === 0 ? (
            <StateDisplay
              type="empty"
              title="No Milestones in this Filter"
              message="Try selecting 'All' stages or timelines to see your full transition pathway."
              actionLabel="Reset Filters"
              onAction={() => {
                setSelectedStage('all');
                setSelectedTimeline('all');
              }}
            />
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {filteredMilestones.map((item, idx) => (
                <div
                  key={item.id}
                  className={`p-4 sm:p-5 rounded-xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    item.completed
                      ? 'bg-[#061426]/70 border-emerald-500/30'
                      : 'bg-[#071328]/90 border-slate-800 hover:border-cyan-500/40 hover:-translate-y-0.5'
                  }`}
                >
                  <div className="flex items-start space-x-3.5">
                    {/* Checkbox trigger */}
                    <button
                      onClick={() => toggleMilestone(item.id)}
                      className={`mt-0.5 w-6 h-6 rounded-lg border flex items-center justify-center transition-all shrink-0 active:scale-95 ${
                        item.completed
                          ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                          : 'bg-slate-900 border-slate-700 text-transparent hover:border-cyan-400'
                      }`}
                      aria-label={`Mark milestone ${item.title} as ${item.completed ? 'incomplete' : 'complete'}`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                          item.stage === 'service'
                            ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/40'
                            : item.stage === 'skills'
                            ? 'bg-indigo-950/60 text-indigo-300 border border-indigo-500/40'
                            : item.stage === 'training'
                            ? 'bg-amber-950/60 text-amber-300 border border-amber-500/40'
                            : 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40'
                        }`}>
                          {item.stage}
                        </span>

                        <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {item.timeframe.replace('_', ' ')}
                        </span>

                        {item.completed && (
                          <span className="text-[10px] text-emerald-400 font-mono font-semibold">
                            ✓ Verified Complete
                          </span>
                        )}
                      </div>

                      <h4 className={`text-sm sm:text-base font-bold ${
                        item.completed ? 'text-slate-300 line-through' : 'text-white font-display'
                      }`}>
                        {item.title}
                      </h4>

                      <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Milestone direct action button */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                    <button
                      onClick={() => setCurrentRoute(item.actionRoute as any)}
                      className="min-h-[44px] px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 hover:border-cyan-500/40 text-xs font-semibold active:scale-95 transition-all flex items-center gap-1.5 touch-manipulation"
                    >
                      <span>{item.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4 Pillars Quick Navigation Hub */}
      <div className="p-6 rounded-2xl bg-[#061124]/90 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white font-display">
          Quick Navigation: Complete Transition Suite
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Skill Translator', route: 'skill_translator', icon: Cpu, desc: 'Military to corporate O*NET' },
            { label: 'Learning Hub', route: 'learning_hub', icon: GraduationCap, desc: 'DGR & tech certifications' },
            { label: 'Government Schemes', route: 'government_schemes', icon: ShieldCheck, desc: 'Resettlement quotas & grants' },
            { label: 'Resume Builder', route: 'resume_builder', icon: FileText, desc: 'Civilian-friendly PDF export' },
          ].map(tool => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.route}
                onClick={() => setCurrentRoute(tool.route as any)}
                className="p-3.5 rounded-xl bg-[#07142a] border border-slate-800 hover:border-cyan-500/40 text-left transition-all group active:scale-95 touch-manipulation"
              >
                <Icon className="w-5 h-5 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-white font-display">{tool.label}</p>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">{tool.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Disclaimers & Security Protocol */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 space-y-1.5">
        <p className="font-semibold text-slate-300 flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-cyan-400" />
          Mandatory Transition Privacy Standard
        </p>
        <p>
          ValorBadge is an independent non-governmental transition support platform. It is not affiliated with or endorsed by the Indian Army, Navy, Air Force, or Ministry of Defence.
        </p>
        <p>
          We strictly prohibit recording classified unit deployments, operational logistics, weapon telemetry, intelligence reports, or sensitive locations.
        </p>
      </div>
    </div>
  );
};
