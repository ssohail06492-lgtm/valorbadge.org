import React, { useState } from 'react';
import { 
  ArrowDown, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  Briefcase, 
  TrendingUp, 
  Award, 
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { CAREER_DATABASE, CareerDetail } from '../../../lib/careerDatabase';

interface CareerPathwayVisualizerProps {
  initialCareerId?: string;
}

export const CareerPathwayVisualizer: React.FC<CareerPathwayVisualizerProps> = ({ initialCareerId }) => {
  const [selectedCareerId, setSelectedCareerId] = useState<string>(
    initialCareerId || CAREER_DATABASE[0].id
  );

  const activeCareer = CAREER_DATABASE.find(c => c.id === selectedCareerId) || CAREER_DATABASE[0];
  const pathway = activeCareer.pathwayExample;

  const steps = [
    {
      stage: 'STAGE 1',
      title: 'CURRENT EXPERIENCE',
      content: pathway.currentExperience,
      icon: Award,
      badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/30'
    },
    {
      stage: 'STAGE 2',
      title: 'TRANSFERABLE SKILLS',
      content: pathway.transferableSkills,
      icon: CheckCircle2,
      badgeColor: 'border-indigo-500/40 text-indigo-300 bg-indigo-950/30'
    },
    {
      stage: 'STAGE 3',
      title: 'SKILL GAP',
      content: pathway.skillGap,
      icon: Layers,
      badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/30'
    },
    {
      stage: 'STAGE 4',
      title: 'LEARNING & CERTIFICATION',
      content: pathway.learning,
      icon: BookOpen,
      badgeColor: 'border-sky-500/40 text-sky-300 bg-sky-950/30'
    },
    {
      stage: 'STAGE 5',
      title: 'ENTRY-LEVEL CAREER',
      content: pathway.entryLevelCareer,
      icon: Briefcase,
      badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/30'
    },
    {
      stage: 'STAGE 6',
      title: 'EXPERIENCE & DELIVERABLES',
      content: pathway.experiencePhase,
      icon: TrendingUp,
      badgeColor: 'border-blue-500/40 text-blue-300 bg-blue-950/30'
    },
    {
      stage: 'STAGE 7',
      title: 'CAREER PROGRESSION',
      content: pathway.careerProgression,
      icon: Sparkles,
      badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-950/30'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header and Career Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
        <div>
          <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">
            VISUAL CAREER PATHWAY MODEL
          </span>
          <h3 className="text-base font-bold text-white font-display">
            Selected Pathway: {activeCareer.title}
          </h3>
          <p className="text-xs text-slate-400">
            Industry: <strong className="text-slate-200">{activeCareer.industry}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="pathway-select" className="text-xs text-slate-400 whitespace-nowrap">
            Switch Track:
          </label>
          <select
            id="pathway-select"
            value={selectedCareerId}
            onChange={(e) => setSelectedCareerId(e.target.value)}
            className="min-h-[44px] px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
          >
            {CAREER_DATABASE.map(c => (
              <option key={c.id} value={c.id}>
                {c.title} ({c.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Visual Pipeline */}
      {/* Mobile-first: stacked vertically with connecting line and touch-friendly cards */}
      <div className="relative pl-4 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-6 sm:before:left-10 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-indigo-500 before:to-emerald-500">
        {steps.map((step, idx) => {
          const StepIcon = step.icon;
          return (
            <div key={idx} className="relative group">
              {/* Connector Node */}
              <div className="absolute -left-6 sm:-left-10 top-3.5 w-5 h-5 rounded-full bg-[#050b14] border-2 border-cyan-400 flex items-center justify-center z-10">
                <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
              </div>

              {/* Step Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#071328]/95 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400 tracking-wider">
                      {step.stage}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-white font-mono uppercase tracking-wide">
                      {step.title}
                    </h4>
                  </div>
                  <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-md border ${step.badgeColor} font-semibold flex items-center gap-1`}>
                    <StepIcon className="w-3 h-3" />
                    <span>Step {idx + 1} of 7</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 font-medium pl-1 leading-relaxed">
                  {step.content}
                </p>
              </div>

              {/* Downward Indicator Arrow for Mobile Visual Flow */}
              {idx < steps.length - 1 && (
                <div className="flex justify-center -mb-3 mt-1 sm:hidden">
                  <ArrowDown className="w-3.5 h-3.5 text-slate-600" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progression Milestones Grid from Database */}
      <div className="p-5 rounded-2xl bg-[#071328]/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase text-slate-300">
            Standard Corporate Career Progression Timeline:
          </span>
          <span className="text-[10px] font-mono text-cyan-400">Industry Typical</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {activeCareer.possibleProgression.map((prog, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                  {prog.stage}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {prog.timeline}
                </span>
              </div>
              <p className="text-xs font-bold text-white">
                {prog.role}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
