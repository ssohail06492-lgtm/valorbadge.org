import React from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Cpu, 
  Briefcase, 
  FileText, 
  Users, 
  CheckCircle,
  Lock,
  Target
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { SecurityNoticeBanner } from '../../common/SecurityNoticeBanner';

export const HowItWorksView: React.FC = () => {
  const { setCurrentRoute, setIsOnboardingOpen, t } = useApp();

  const workflow = [
    {
      step: '01',
      title: 'Build Your Service Profile',
      desc: 'Fill out standard civilian resume sections including years of service, general role domain (e.g. Logistics, Signals, EME, Infantry Management), non-classified responsibilities, and educational background.',
      details: [
        'Strict zero-tactical data input guards prevent sensitive military disclosures',
        'Simple dropdowns for general role categories without needing regiment/deployment details',
        'Automatic profile completion metrics to track resume readiness'
      ],
      icon: ShieldCheck,
      route: 'service_profile' as const
    },
    {
      step: '02',
      title: 'Translate Service Experience into Civilian Competencies',
      desc: 'Our proprietary skill ontology engine maps military responsibilities into industry-standard civilian equivalents that corporate recruiters and ATS scanners recognize.',
      details: [
        'Converts squad command into Project Management & Agile Leadership',
        'Translates quartermaster duty into Supply Chain & Inventory Accounting',
        'Formats signal communication into Enterprise NOC & Telecommunications diagnostics'
      ],
      icon: Cpu,
      route: 'skill_translator' as const
    },
    {
      step: '03',
      title: 'Discover Algorithmic Career Matches',
      desc: 'Compare your translated skill profile with civilian career clusters. View salary benchmarks, high-demand sectors, and exact gap-filling recommendations.',
      details: [
        'Calculates veteran-friendly match percentages based on competencies',
        'Identifies roles in Logistics, Manufacturing, IT, Aerospace, and Security Operations',
        'Shows career transition trajectories for 3-year and 5-year growth'
      ],
      icon: Target,
      route: 'career_matches' as const
    },
    {
      step: '04',
      title: 'Generate Recruiter-Grade Civilian Resumes',
      desc: 'Create clean, ATS-compliant civilian resumes with one click. Eliminates military acronyms and highlights commercial leadership metrics.',
      details: [
        'Automated conversion of military jargon into commercial impact statements',
        'Clean, modern layout exportable to PDF or copyable text',
        'Privacy-shielded contact information settings'
      ],
      icon: FileText,
      route: 'resume_builder' as const
    },
    {
      step: '05',
      title: 'Explore Opportunities & Government Schemes',
      desc: 'Apply directly to verified employers looking for disciplined veterans and Agniveers. Access Directorate General Resettlement (DGR) training and entrepreneurship grants.',
      details: [
        'Verified corporate employers committed to veteran hiring programs',
        'Curated index of Central & State ex-servicemen resettlement programs',
        'Agniveer specialized internship and fast-track transition tracks'
      ],
      icon: Briefcase,
      route: 'jobs' as const
    },
    {
      step: '06',
      title: 'Engage Directly with Verified Hiring Teams',
      desc: 'Communicate with verified talent acquisition partners, schedule interviews, and receive personalized coaching via ValorAI.',
      details: [
        'Direct messaging without exposing personal phone numbers prematurely',
        'Interview practice tailored to civilian corporate cultural expectations',
        'Real-time status tracking for submitted applications'
      ],
      icon: Users,
      route: 'messages' as const
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <span>{t('STEP-BY-STEP METHODOLOGY')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          {t('How ValorBadge Works')}
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          {t('From uniform to corporate leadership: a safe, structured, and privacy-first methodology designed specifically for armed forces veterans and Agniveers.')}
        </p>
      </div>

      <SecurityNoticeBanner />

      {/* Steps List */}
      <div className="space-y-6">
        {workflow.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={item.step}
              className="p-6 rounded-2xl bg-[#071328]/80 border border-slate-800 hover:border-cyan-500/30 transition-all flex flex-col md:flex-row gap-6 items-start"
            >
              <div className="flex items-center space-x-4 shrink-0">
                <span className="text-3xl font-black font-mono text-cyan-400">
                  {item.step}
                </span>
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Icon className="w-6 h-6" />
                </div>
              </div>

              <div className="flex-1 space-y-3">
                <h3 className="text-lg font-bold text-white">
                  {t(item.title)}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {t(item.desc)}
                </p>

                <div className="space-y-1.5 pt-1">
                  {item.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-start space-x-2 text-xs text-slate-400">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{t(detail)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setCurrentRoute(item.route)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>{t('Launch this step')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-500/30 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white font-display">
          {t('Ready to Begin Your Next Mission?')}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          {t('Start with our 2-minute onboarding flow to immediately translate your skills into high-paying civilian career pathways.')}
        </p>
        <button
          onClick={() => setIsOnboardingOpen(true)}
          className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/20 transition-all inline-flex items-center gap-2"
        >
          <span>{t('Start Onboarding Now')}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
