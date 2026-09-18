import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Briefcase, 
  Sparkles, 
  Cpu, 
  FileText, 
  Building2, 
  Lock,
  ChevronRight,
  Bot,
  MapPin
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { HeroCareerPathway } from '../../common/HeroCareerPathway';
import { SecurityNoticeBanner } from '../../common/SecurityNoticeBanner';
import { DemoDataBadge } from '../../common/DemoDataBadge';
import { DEMO_JOBS } from '../../../lib/demoData';

export const LandingView: React.FC = () => {
  const { setCurrentRoute, setIsOnboardingOpen, t } = useApp();

  const steps = [
    {
      num: '01',
      title: t('serviceProfile'),
      desc: 'Enter your service branch, duration, and general operational duties into our safe, zero-tactical profile system.',
      route: 'service_profile' as const
    },
    {
      num: '02',
      title: t('translateSkills'),
      desc: 'Our ontology framework automatically maps military commands, logistics, and drills into standard civilian competencies.',
      route: 'skill_translator' as const
    },
    {
      num: '03',
      title: t('careerMatches'),
      desc: 'Explore high-demand corporate and industrial roles tailored to your exact leadership level and technical aptitude.',
      route: 'career_matches' as const
    },
    {
      num: '04',
      title: t('resumeBuilder'),
      desc: 'Generate recruiter-ready civilian resumes with ATS-friendly corporate phrasing, eliminating military jargon.',
      route: 'resume_builder' as const
    },
    {
      num: '05',
      title: t('jobs'),
      desc: 'Browse jobs and internships from companies seeking veteran discipline, crisis management, and integrity.',
      route: 'jobs' as const
    },
    {
      num: '06',
      title: t('forEmployers'),
      desc: 'Communicate directly with verified corporate hiring managers and HR teams via secure messaging.',
      route: 'messages' as const
    }
  ];

  const features = [
    {
      title: t('translateSkills'),
      desc: 'Turn general service experience into civilian-friendly professional skills without compromising operational security.',
      icon: Cpu,
      route: 'skill_translator' as const,
      badge: 'Core Technology'
    },
    {
      title: t('careerMatches'),
      desc: 'Discover careers based on skills, education and service experience with quantitative match scores.',
      icon: Sparkles,
      route: 'career_matches' as const,
      badge: 'Algorithmic'
    },
    {
      title: t('resumeBuilder'),
      desc: 'Create professional civilian resumes formatted to impress modern corporate hiring panels.',
      icon: FileText,
      route: 'resume_builder' as const,
      badge: 'Interactive'
    },
    {
      title: t('jobs'),
      desc: 'Discover relevant employment opportunities from veteran-friendly verified corporate partners.',
      icon: Briefcase,
      route: 'jobs' as const,
      badge: 'Curated'
    },
    {
      title: t('governmentSchemes'),
      desc: 'Find potentially relevant central schemes, DGR resettlement courses, and state-level welfare programs.',
      icon: ShieldCheck,
      route: 'government_schemes' as const,
      badge: 'Public Welfare'
    },
    {
      title: t('talkToValorAI'),
      desc: 'Get personalized career transition guidance, salary benchmarks, and interview preparation advice.',
      icon: Bot,
      route: 'valor_ai' as const,
      badge: 'Interactive AI'
    },
    {
      title: t('forEmployers'),
      desc: 'Allow companies to discover, evaluate, and hire veteran talent for operations, logistics, and tech leadership.',
      icon: Building2,
      route: 'for_employers' as const,
      badge: 'Enterprise'
    }
  ];

  return (
    <div className="w-full space-y-16 py-6 sm:py-10">
      
      {/* 1. HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Security Alert Header */}
        <div className="mb-6">
          <SecurityNoticeBanner />
        </div>

        <div className="text-center max-w-4xl mx-auto pt-4 pb-2">
          
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-mono uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
            <span>{t('Empowering Veterans & Agniveers for Civilian Careers')}</span>
          </div>

          {/* Main Title & Tagline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight font-display leading-[1.1] mb-4">
            Valor<span className="text-cyan-400">Badge</span>
          </h1>

          <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-200 tracking-tight font-display mb-4">
            “{t('tagline')}”
          </p>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
            {t('turn your service experience into civilian career opportunities. a dedicated, privacy-first transition platform for veterans, agniveers, and service personnel.')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
            <button
              onClick={() => setIsOnboardingOpen(true)}
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-bold text-sm sm:text-base tracking-wide shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 min-h-[46px] touch-manipulation"
            >
              <span>{t('getStarted')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrentRoute('jobs')}
              className="px-7 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-cyan-500/50 font-bold text-sm sm:text-base tracking-wide transition-all flex items-center gap-2 min-h-[46px] touch-manipulation"
            >
              <Briefcase className="w-4 h-4 text-cyan-400" />
              <span>{t('exploreJobs')}</span>
            </button>

            <button
              onClick={() => setCurrentRoute('for_employers')}
              className="px-7 py-3.5 rounded-xl bg-slate-950/70 hover:bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700 font-semibold text-sm sm:text-base tracking-wide transition-all flex items-center gap-2 min-h-[46px] touch-manipulation"
            >
              <Building2 className="w-4 h-4 text-slate-400" />
              <span>{t('forEmployers')}</span>
            </button>
          </div>

        </div>

        {/* Signature Animated Career Pathway (SERVICE ↓ SKILLS ↓ EXPERIENCE ↓ CAREER) */}
        <div className="mt-10">
          <HeroCareerPathway />
        </div>

      </section>

      {/* 2. HOW VALORBADGE WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
            {t('Structured Transition Architecture')}
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white font-display mt-2">
            {t('howItWorks')}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            {t('a step-by-step career path turning military discipline and operational logistics into verified civilian leadership opportunities.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((step) => (
            <div
              key={step.num}
              onClick={() => setCurrentRoute(step.route)}
              className="p-6 rounded-2xl bg-[#071328]/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/40 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black font-mono text-cyan-400/80 group-hover:text-cyan-300 transition-colors">
                    {step.num}
                  </span>
                  <span className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {t(step.desc)}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center text-xs text-cyan-400 font-semibold">
                <span>{t('Explore Step')}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CAPABILITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
            {t('Comprehensive Capabilities')}
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white font-display mt-2">
            {t('Engineered for Military-to-Civilian Success')}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            {t('every feature is calibrated to bridge military terminology with corporate recruiting criteria.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                onClick={() => setCurrentRoute(feat.route)}
                className="p-6 rounded-2xl bg-gradient-to-b from-[#08152c]/90 to-[#050f22]/90 border border-slate-800/90 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-950/40 group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
                      {t(feat.badge)}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {t(feat.desc)}
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs sm:text-sm text-cyan-400 font-semibold">
                  <span>{t('Open Module')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. LIVE PREVIEWS: JOBS & SCHEMES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#061226]/80 border border-slate-800 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                  {t('Preview Feed')}
                </span>
                <DemoDataBadge />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                {t('Latest Veteran-Friendly Civilian Opportunities')}
              </h3>
            </div>
            <button
              onClick={() => setCurrentRoute('jobs')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs sm:text-sm font-bold text-cyan-300 transition-colors flex items-center gap-1.5 min-h-[40px] touch-manipulation"
            >
              <span>{t('View All Opportunities')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {DEMO_JOBS.slice(0, 2).map((job) => (
              <div
                key={job.id}
                className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-base font-bold text-white">{t(job.title)}</h4>
                    <DemoDataBadge size="sm" />
                  </div>
                  <p className="text-xs sm:text-sm text-cyan-400 font-semibold">{job.company}</p>
                  <p className="text-xs text-slate-300 flex items-center gap-1 mt-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{t(job.location)} • {job.salaryRange}</span>
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2.5 line-clamp-2 leading-relaxed">
                    {t(job.description)}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3.5">
                    {job.civilianSkillsMatched.slice(0, 2).map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-2.5 py-1 rounded-md bg-cyan-950/40 text-cyan-300 border border-cyan-500/20"
                      >
                        {t(skill)}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    {job.veteranFriendlyScore}% {t('% Match')}
                  </span>
                  <button
                    onClick={() => setCurrentRoute('jobs')}
                    className="text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    <span>{t('View Role')}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. COMMITMENT TO DATA PRIVACY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-[#071328] via-[#091b38] to-[#071328] border border-cyan-500/20 p-6 sm:p-10 shadow-2xl">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
              {t('Zero Tactical Data Storage Guarantee')}
            </h3>
            <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
              {t('valorbadge strictly isolates all military-civilian translation logic to high-level managerial, logistical, and technical competencies. we never collect or store operational data, deployment zones, weapon classifications, or classified communications.')}
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setCurrentRoute('privacy_center')}
                className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm font-bold text-cyan-300 hover:bg-slate-800 transition-colors min-h-[42px] touch-manipulation"
              >
                {t('Inspect Privacy Center')}
              </button>
              <button
                onClick={() => setCurrentRoute('privacy')}
                className="px-6 py-3 rounded-xl bg-transparent border border-slate-800 text-xs sm:text-sm font-semibold text-slate-300 hover:text-slate-100 transition-colors min-h-[42px] touch-manipulation"
              >
                {t('Read Security Policy')}
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
