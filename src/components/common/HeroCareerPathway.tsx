import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Cpu, 
  GraduationCap, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AppRoute } from '../../types';

interface Stage {
  id: string;
  label: string;
  title: string;
  sub: string;
  details: string;
  icon: React.ElementType;
  route: AppRoute;
  actionText: string;
  highlights: string[];
}

const STAGES: Stage[] = [
  {
    id: 'service',
    label: 'STAGE 01',
    title: 'SERVICE',
    sub: 'Armed Forces & Agniveer Background',
    details: 'Recognizes discipline, mission planning, tactical responsibility, leadership under pressure, and technical operational mastery.',
    icon: ShieldCheck,
    route: 'service_profile',
    actionText: 'Update Service Profile',
    highlights: ['Combat Arms & Technical Branches', 'Non-sensitive Service Records', 'Zero Classified Data Storage']
  },
  {
    id: 'skills',
    label: 'STAGE 02',
    title: 'SKILLS',
    sub: 'Military-to-Civilian Translation',
    details: 'Maps defense responsibilities into industry-standard civilian competencies like Supply Chain, Cyber Operations, Systems Maintenance, and Team Management.',
    icon: Cpu,
    route: 'skill_translator',
    actionText: 'Translate Your Skills',
    highlights: ['Standard O*NET/ESCO Alignment', 'Action-Verbed Bullet Points', 'Zero Military Jargon on Resumes']
  },
  {
    id: 'training',
    label: 'STAGE 03',
    title: 'TRAINING',
    sub: 'Bridge Skill Gaps & Certifications',
    details: 'Identifies specific gaps between military MOS and corporate role requirements, recommending DGR schemes and accredited certifications.',
    icon: GraduationCap,
    route: 'learning_hub',
    actionText: 'Explore Learning Hub',
    highlights: ['DGR & Resettlement Schemes', 'Cloud, AI & Tech Bootcamps', 'Six Sigma & Management Credentials']
  },
  {
    id: 'career',
    label: 'STAGE 04',
    title: 'CAREER',
    sub: 'Verified Placement & Advancement',
    details: 'Directly connects verified veterans with corporate partners, PSUs, and startups offering fair compensation, veteran-friendly cohorts, and career growth.',
    icon: Award,
    route: 'career_matches',
    actionText: 'View Matched Careers',
    highlights: ['Vetted Inclusive Employers', 'Scam-Shield Verified Openings', 'Ongoing Transition Mentorship']
  }
];

export const HeroCareerPathway: React.FC = () => {
  const { reducedMotion, setCurrentRoute } = useApp();
  const [activeStageId, setActiveStageId] = useState<string>('service');

  const currentStage = STAGES.find(s => s.id === activeStageId) || STAGES[0];

  return (
    <div className="w-full my-8 p-5 sm:p-7 md:p-8 rounded-2xl bg-[#061124]/95 border border-cyan-500/20 shadow-2xl backdrop-blur-md relative overflow-hidden">
      {/* Background glow streak */}
      <div className="absolute inset-x-0 -top-24 h-40 bg-cyan-500/10 blur-3xl pointer-events-none" />

      {/* Pathway Header Tag */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-800/80 mb-6">
        <div className="flex items-center space-x-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
          </span>
          <div>
            <p className="text-xs font-semibold tracking-widest text-cyan-400 uppercase font-mono">
              Core Transition Blueprint
            </p>
            <h2 className="text-lg sm:text-xl font-bold text-white font-display tracking-tight">
              Service → Skills → Training → Career
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentRoute('transition_plan')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-xs font-semibold font-mono active:scale-95 transition-all touch-manipulation"
          >
            <span>Open Transition Plan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Pathway Stages Grid with connecting dynamic pulses */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-3 items-stretch">
        
        {/* Horizontal glowing line on large screens */}
        <div className="hidden lg:block absolute top-[44px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-cyan-500/20 via-indigo-500/40 to-teal-400/40 z-0">
          {!reducedMotion && (
            <motion.div
              className="h-full w-24 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[1px]"
              animate={{
                x: ['0%', '350%'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )}
        </div>

        {STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          const isSelected = activeStageId === stage.id;

          return (
            <div
              key={stage.id}
              onClick={() => setActiveStageId(stage.id)}
              className={`relative z-10 p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between touch-manipulation ${
                isSelected 
                  ? 'bg-slate-900/95 border-cyan-400 shadow-lg shadow-cyan-500/20 -translate-y-1' 
                  : 'bg-[#07142a]/80 border-slate-800/90 hover:border-cyan-500/40 hover:bg-slate-900/60'
              }`}
            >
              <div>
                {/* Node icon & Step badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all ${
                    isSelected 
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' 
                      : 'bg-slate-900 border-slate-700 text-slate-400 group-hover:text-cyan-400'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-cyan-400">
                    {stage.label}
                  </span>
                </div>

                {/* Title & Sub */}
                <h3 className="text-base font-bold text-white tracking-wide font-display">
                  {stage.title}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed font-medium">
                  {stage.sub}
                </p>
              </div>

              {/* Progress indicator bar inside card */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className={isSelected ? 'text-cyan-400 font-semibold' : ''}>
                  {isSelected ? 'Active Phase' : 'Tap to inspect'}
                </span>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'rotate-90 text-cyan-400' : ''}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Stage Detail Drawer / Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStage.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: reducedMotion ? 0 : 0.2 }}
          className="mt-6 p-5 sm:p-6 rounded-xl bg-gradient-to-r from-[#071833] via-[#091f42] to-[#071731] border border-cyan-500/30 shadow-xl"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold uppercase border border-cyan-500/40">
                  {currentStage.label} BLUEPRINT
                </span>
                <span className="text-xs text-slate-400">
                  Phase Focus
                </span>
              </div>
              <h4 className="text-lg font-bold text-white font-display">
                {currentStage.title}: {currentStage.sub}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentStage.details}
              </p>

              {/* Highlights pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {currentStage.highlights.map((h, i) => (
                  <span 
                    key={i} 
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-300 text-[11px]"
                  >
                    <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                    {h}
                  </span>
                ))}
              </div>
            </div>

            {/* Stage Action CTA */}
            <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
              <button
                onClick={() => setCurrentRoute(currentStage.route)}
                className="w-full min-h-[44px] px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 touch-manipulation"
              >
                <span>{currentStage.actionText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentRoute('transition_plan')}
                className="w-full min-h-[44px] px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold active:scale-95 transition-all flex items-center justify-center touch-manipulation"
              >
                Detailed Roadmap
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Security & Non-Affiliation Footnote */}
      <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
        <span className="flex items-center gap-1 text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          Zero classified, operational, deployment, intelligence, or sensitive weapon data is requested or stored.
        </span>
        <span className="text-slate-400 font-mono text-[10px]">
          Independent veteran transition support platform
        </span>
      </div>
    </div>
  );
};
