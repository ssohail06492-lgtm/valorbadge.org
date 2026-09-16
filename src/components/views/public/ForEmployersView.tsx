import React from 'react';
import { 
  Building2, 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  Briefcase, 
  TrendingUp, 
  Award,
  Lock
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export const ForEmployersView: React.FC = () => {
  const { setCurrentRole, setCurrentRoute } = useApp();

  const handleRecruiterPortal = () => {
    setCurrentRole('employer');
    setCurrentRoute('employer_dashboard');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <span>CORPORATE HIRING & TALENT ACQUISITION</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          Hire Proven Leaders, Technicians & Agniveers
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Access a pre-screened pipeline of military veterans and former Agniveers possessing unmatched integrity, calm crisis decision-making, and heavy operations experience.
        </p>
      </div>

      {/* Value Propositions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#071328]/80 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Unrivaled Execution & Reliability</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Armed forces personnel are trained to deliver results under extreme pressure, with zero absenteeism, clear chain of communication, and absolute ownership of outcomes.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#071328]/80 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Briefcase className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Ontology-Translated Resumes</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            No confusing military jargon. Candidates are presented with standardized civilian competency maps (Supply Chain, Agile Leadership, Telemetry, Safety Compliance).
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#071328]/80 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Agniveer Fast-Track Cohorts</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Hire energetic, tech-adept young professionals who have completed 4 years of intense military service, eager to accelerate into corporate logistics, operations, and IT.
          </p>
        </div>
      </div>

      {/* Employer Verification Workflow */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-[#08152c] to-[#040a16] border border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white font-display">
              Verified Veteran-Friendly Employer Program
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Employers undergo business verification (CIN / GSTIN) and commit to supportive workplace onboarding to receive the ValorBadge Verified Employer Shield.
            </p>
          </div>
          <button
            onClick={handleRecruiterPortal}
            className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2"
          >
            <span>Open Employer Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80 text-xs">
          <div className="flex items-start space-x-2 text-slate-300">
            <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>Post Unlimited Veteran & Agniveer Roles</span>
          </div>
          <div className="flex items-start space-x-2 text-slate-300">
            <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>Search Candidates by Military Category</span>
          </div>
          <div className="flex items-start space-x-2 text-slate-300">
            <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>Direct In-App Candidate Messaging</span>
          </div>
          <div className="flex items-start space-x-2 text-slate-300">
            <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>Zero Recruitment Agency Markups</span>
          </div>
        </div>
      </div>

    </div>
  );
};
