import React from 'react';
import { 
  X, 
  Briefcase, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  TrendingUp, 
  Award, 
  GraduationCap, 
  Building2, 
  ArrowRight,
  ShieldAlert,
  Info
} from 'lucide-react';
import { CareerDetail } from '../../../lib/careerDatabase';

interface CareerDetailModalProps {
  career: CareerDetail | null;
  onClose: () => void;
  onSelectForComparison?: (career: CareerDetail) => void;
  onViewPathway?: (careerId: string) => void;
}

export const CareerDetailModal: React.FC<CareerDetailModalProps> = ({
  career,
  onClose,
  onSelectForComparison,
  onViewPathway
}) => {
  if (!career) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="career-modal-title"
    >
      <div 
        className="w-full max-w-3xl my-8 bg-[#071328] border border-slate-700/80 rounded-2xl shadow-2xl text-slate-100 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-[#061022] flex items-start justify-between gap-4 sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                {career.category}
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-xs text-slate-400">
                {career.industry}
              </span>
            </div>
            <h2 id="career-modal-title" className="text-xl sm:text-2xl font-bold text-white font-display">
              {career.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors"
            aria-label="Close career details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Overview */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold uppercase text-slate-300">
              Career Overview
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
              {career.overview}
            </p>
          </div>

          {/* Why it may suit the user */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold uppercase text-cyan-400 flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>Why This Career Suits Service Personnel</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-cyan-950/20 p-3.5 rounded-xl border border-cyan-500/20">
              {career.whyItMaySuitUser}
            </p>
          </div>

          {/* Key Metrics: Salary Benchmark & Environment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">
                Compensation Benchmark:
              </span>
              <span className="text-sm font-bold text-white font-mono mt-0.5 block">
                {career.salaryBenchmark}
              </span>
              <span className="text-[10px] text-slate-400 italic">
                Indicative market estimate; not an employment guarantee
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">
                Work Environment:
              </span>
              <span className="text-sm font-bold text-slate-200 mt-0.5 block">
                {career.workEnvironment}
              </span>
              <span className="text-[10px] text-slate-400">
                Experience Level: {career.experienceLevel}
              </span>
            </div>
          </div>

          {/* Transferable Skills & Required Skills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Transferable Skills */}
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Transferable Service Skills</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {career.transferableSkills.map(sk => (
                  <span key={sk} className="text-xs px-2.5 py-1 rounded bg-emerald-950/30 border border-emerald-500/20 text-emerald-200">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Skills Required */}
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Civilian Skills Required</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {career.skillsRequired.map(sk => (
                  <span key={sk} className="text-xs px-2.5 py-1 rounded bg-cyan-950/30 border border-cyan-500/20 text-cyan-200">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Skill Gaps & Recommended Learning */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-500/30 space-y-3">
            <span className="text-xs font-mono font-bold text-amber-300 uppercase flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span>Typical Skill Gaps & Recommended Learning</span>
            </span>

            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-slate-400">Identified Gaps to Bridge:</span>
              <div className="flex flex-wrap gap-1.5">
                {career.skillGaps.map(gap => (
                  <span key={gap} className="text-xs px-2.5 py-1 rounded bg-amber-950/40 border border-amber-500/30 text-amber-200 font-medium">
                    {gap}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-2">
              <span className="text-[11px] font-mono text-slate-400">Target Upskilling Modules:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {career.recommendedLearning.map((course, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-black/40 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">{course.title}</p>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {course.duration} • {course.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <span className="text-xs font-mono font-bold text-slate-300 uppercase flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Required Education</span>
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {career.requiredEducation}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <span className="text-xs font-mono font-bold text-slate-300 uppercase flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-cyan-400" />
                <span>Common Certifications</span>
              </span>
              <div className="flex flex-wrap gap-1">
                {career.commonCertifications.map(cert => (
                  <span key={cert} className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Entry Level Roles & Possible Progression */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
              <span>Entry-Level Roles & Progression Roadmap</span>
            </span>

            <div className="space-y-1">
              <span className="text-[11px] text-slate-400 font-mono">Typical Entry Portals:</span>
              <p className="text-xs text-slate-200 font-medium">
                {career.typicalEntryLevelRoles.join(' • ')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800">
              {career.possibleProgression.map((stage, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-black/40 border border-slate-800 text-xs">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase block font-bold">
                    {stage.stage}
                  </span>
                  <p className="font-semibold text-white mt-0.5">{stage.role}</p>
                  <span className="text-[10px] text-slate-400 font-mono">{stage.timeline}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related Jobs */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono text-slate-400 uppercase">Related Civilian Jobs:</span>
            {career.relatedJobs.map(job => (
              <span key={job} className="text-xs px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                {job}
              </span>
            ))}
          </div>

          {/* Official Disclaimer */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>
              <strong>Transparency Notice:</strong> ValorBadge provides career blueprints for guidance only. Salary numbers and hiring forecasts are indicative benchmarks and do not guarantee an offer of employment.
            </span>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-[#061022] flex items-center justify-between flex-wrap gap-2">
          <button
            onClick={onClose}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-semibold text-slate-300 transition-colors"
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            {onSelectForComparison && (
              <button
                onClick={() => {
                  onSelectForComparison(career);
                  onClose();
                }}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-950/30 text-xs font-semibold transition-colors"
              >
                Compare This Career
              </button>
            )}

            {onViewPathway && (
              <button
                onClick={() => {
                  onViewPathway(career.id);
                  onClose();
                }}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all flex items-center gap-1.5"
              >
                <span>View Full Pathway</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
