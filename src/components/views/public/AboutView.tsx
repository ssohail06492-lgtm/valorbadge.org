import React from 'react';
import { ShieldCheck, HeartHandshake, Eye, Award, CheckCircle, ShieldAlert } from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export const AboutView: React.FC = () => {
  const { setCurrentRoute, t } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Brand Header */}
      <div className="text-center space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-2">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          {t('About ValorBadge')}
        </h1>
        <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase font-semibold">
          {t('“Your Service. Your Skills. Your Next Mission.”')}
        </p>
      </div>

      {/* Mandatory Disclaimer Box */}
      <div className="p-5 rounded-xl bg-slate-900/90 border border-amber-500/30 text-xs text-slate-300 leading-relaxed space-y-2">
        <div className="flex items-center space-x-2 text-amber-400 font-bold font-mono">
          <ShieldAlert className="w-4 h-4" />
          <span>{t('INDEPENDENT PLATFORM NOTICE')}</span>
        </div>
        <p>
          {t('ValorBadge is an independent platform and is not officially affiliated with or endorsed by the Indian Army or any government organization unless formal authorization is obtained.')}
        </p>
        <p className="text-slate-400">
          {t('We do not claim official military partnership or government authority. Our sole mission is to provide technology, ontology translation, and career advocacy for retiring personnel, veterans, and Agniveers entering the commercial workforce.')}
        </p>
      </div>

      {/* Purpose & Mission */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white font-display">
          {t('Our Purpose & Core Principles')}
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          {t('Every year, thousands of highly disciplined, technically competent, and mission-tested armed forces personnel and Agniveers transition into civilian life. Despite having proven capabilities in crisis management, large-scale supply chain logistics, equipment maintenance, and personnel administration, they often encounter friction when applying to commercial corporations.')}
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">
          {t('Corporate recruitment systems rely on commercial keywords and automated resume parsers (ATS). ValorBadge bridges this linguistic and institutional divide by providing accurate military-to-civilian skill ontologies, recruiter-ready resume drafting, verified employer matching, and AI-assisted interview guidance.')}
        </p>
      </div>

      {/* Three Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Eye className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">{t('Privacy-First Architecture')}</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {t('Zero-tactical data storage. We never collect classified deployments, operational plans, or weapon telemetry.')}
          </p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">{t('Veteran & Agniveer Centric')}</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {t('Purpose-built workflows addressing the specific career goals of seasoned JCO/ORs, commissioned officers, and 4-year Agniveers.')}
          </p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">{t('Verified Employer Network')}</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {t('Corporate partners are vetted for legitimate veteran hiring initiatives, safe workspaces, and career progression frameworks.')}
          </p>
        </div>
      </div>

      {/* Contact Link */}
      <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
        <span>{t('Have questions or partner inquiries?')}</span>
        <button
          onClick={() => setCurrentRoute('contact')}
          className="text-cyan-400 hover:text-cyan-300 font-semibold"
        >
          {t('Contact Support →')}
        </button>
      </div>

    </div>
  );
};
