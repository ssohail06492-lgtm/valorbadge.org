import React from 'react';
import { ShieldCheck, Lock, Globe, HeartHandshake } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AppRoute } from '../../types';

export const Footer: React.FC = () => {
  const { setCurrentRoute } = useApp();

  const handleNav = (r: AppRoute) => {
    setCurrentRoute(r);
  };

  return (
    <footer className="w-full bg-[#040915] border-t border-slate-800/80 pt-12 pb-24 xl:pb-12 text-slate-400 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/70">
          
          {/* Col 1: Brand & Identity */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white font-display tracking-tight">
                Valor<span className="text-cyan-400">Badge</span>
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium">
              “Your Service. Your Skills. Your Next Mission.”
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering veterans, ex-servicemen, eligible service personnel, and Agniveers to articulate operational excellence into high-impact civilian leadership.
            </p>
          </div>

          {/* Col 2: Transition Tools */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Career Transition
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => handleNav('skill_translator')} className="hover:text-cyan-300 transition-colors">
                  Military-to-Civilian Translator
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('jobs')} className="hover:text-cyan-300 transition-colors">
                  Verified Civilian Jobs
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('internships')} className="hover:text-cyan-300 transition-colors">
                  Agniveer Trainee Pathways
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('government_schemes')} className="hover:text-cyan-300 transition-colors">
                  Government Welfare & DGR Schemes
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('veteran_help_center')} className="hover:text-cyan-300 transition-colors">
                  Veteran Help Center & Scam Defense
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('disability_support')} className="hover:text-cyan-300 transition-colors">
                  Disability & Accessibility Support
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('resume_builder')} className="hover:text-cyan-300 transition-colors">
                  Civilian Resume Builder
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('valor_ai')} className="hover:text-cyan-300 transition-colors">
                  ValorAI Career Advisor
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Platform */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Platform & Partners
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => handleNav('how_it_works')} className="hover:text-cyan-300 transition-colors">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-cyan-300 transition-colors">
                  About ValorBadge
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('for_employers')} className="hover:text-cyan-300 transition-colors">
                  For Employers & Recruiters
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-cyan-300 transition-colors">
                  Contact & Veteran Support
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('privacy_center')} className="hover:text-cyan-300 transition-colors">
                  Privacy Center & Controls
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust, Security & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Data Minimization & Trust</span>
            </h4>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] leading-relaxed text-slate-400">
              ValorBadge enforces strict zero-tactical data storage. We never collect, store, or solicit classified military deployments, weapon telemetry, or operational secrets.
            </div>
            <div className="flex items-center space-x-2 text-[11px] text-cyan-400/90">
              <Globe className="w-3.5 h-3.5" />
              <span>Initial Region: Republic of India</span>
            </div>
          </div>

        </div>

        {/* Mandatory Official Legal Disclaimer */}
        <div className="py-6 border-b border-slate-800/70">
          <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800/90 text-xs text-slate-400 leading-relaxed flex items-start space-x-3">
            <ShieldCheck className="w-5 h-5 text-cyan-500/80 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-300 font-semibold uppercase tracking-wider text-[11px] block mb-1">
                Official Independent Platform Disclaimer
              </strong>
              <p>
                “ValorBadge is an independent platform and is not officially affiliated with or endorsed by the Indian Army or any government organization unless formal authorization is obtained.”
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 ValorBadge. All rights reserved. Precision Career Transition.</p>
          <div className="flex flex-wrap items-center gap-4">
            <button onClick={() => handleNav('privacy')} className="hover:text-slate-200 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => handleNav('terms')} className="hover:text-slate-200 transition-colors">
              Terms of Service
            </button>
            <button onClick={() => handleNav('about')} className="hover:text-slate-200 transition-colors">
              Accessibility Statement
            </button>
            <button onClick={() => handleNav('contact')} className="hover:text-slate-200 transition-colors">
              Help Center
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
