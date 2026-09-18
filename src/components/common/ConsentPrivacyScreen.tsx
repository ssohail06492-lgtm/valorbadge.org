import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Check, 
  FileText, 
  ArrowRight, 
  AlertTriangle, 
  Info, 
  X,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ConsentPrivacyScreenProps {
  onContinue: () => void;
  onCancel?: () => void;
  title?: string;
  subtitle?: string;
  compact?: boolean;
}

export const ConsentPrivacyScreen: React.FC<ConsentPrivacyScreenProps> = ({
  onContinue,
  onCancel,
  title = 'Consent & Privacy Agreement',
  subtitle = 'Review our data minimization commitments and defense security directives before creating your career profile.',
  compact = false
}) => {
  const { hasConsentedToPrivacy, setHasConsentedToPrivacy, setCurrentRoute, t } = useApp();
  const [isAgreed, setIsAgreed] = useState<boolean>(hasConsentedToPrivacy);
  const [showPolicyModal, setShowPolicyModal] = useState<boolean>(false);

  const handleContinueClick = () => {
    if (!isAgreed) return;
    setHasConsentedToPrivacy(true);
    onContinue();
  };

  return (
    <div id="consent-privacy-screen" className="w-full space-y-5">
      {/* Top Banner & Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>{t('Privacy-First Career Transition')}</span>
        </div>

        <h2 id="consent-screen-title" className="text-xl sm:text-2xl font-bold text-white font-display tracking-tight">
          {t(title)}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          {t(subtitle)}
        </p>
      </div>

      {/* 1. Core Commitment: Only Info Needed for Career Support & No Unnecessary Data */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
            <Lock className="w-4 h-4" />
          </div>
          <div className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-white font-display">
              {t('Information Collected Only for Career Support')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t('ValorBadge strictly adheres to a data minimization principle. We collect and process only the information needed for career support—including military skill translation, civilian job matching, government scheme eligibility checks, and connecting with verified veteran-friendly employers.')}
            </p>
          </div>
        </div>

        {/* Breakdown: What We Collect vs What We Do Not Collect */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
          <div className="p-3.5 rounded-lg bg-[#061426] border border-cyan-500/20 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-cyan-300 uppercase tracking-wide font-mono text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{t('What We Collect (Career Support Only)')}</span>
            </div>
            <ul className="space-y-1 text-slate-300 list-disc list-inside leading-relaxed">
              <li>{t('General civilian contact info (Full name, email, phone)')}</li>
              <li>{t('Civilian education, degrees, and academic streams')}</li>
              <li>{t('Broad service branch and non-classified functional domain')}</li>
              <li>{t('Civilian-equivalent competencies, skills, and certifications')}</li>
              <li>{t('Job preferences, preferred industries, and target cities')}</li>
            </ul>
          </div>

          <div className="p-3.5 rounded-lg bg-[#140c10] border border-rose-500/20 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-rose-300 uppercase tracking-wide font-mono text-[11px]">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>{t('What We Strictly Do Not Collect (Prohibited)')}</span>
            </div>
            <ul className="space-y-1 text-slate-300 list-disc list-inside leading-relaxed">
              <li>{t('NO Military Service Numbers or defense personnel IDs')}</li>
              <li>{t('NO National ID numbers (Aadhaar, PAN, SSN)')}</li>
              <li>{t('NO Bank accounts, credit cards, or financial data')}</li>
              <li>{t('NO Biometrics or medical diagnostics records')}</li>
              <li>{t('NO Family particulars or non-career personal details')}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 2. Critical Defense Security Directive: NO Classified/Operational/Deployment/Weapon Info */}
      <div 
        id="defense-security-advisory-box"
        className="p-4 sm:p-5 rounded-xl bg-gradient-to-br from-amber-950/40 via-slate-900/90 to-amber-950/30 border-2 border-amber-500/40 shadow-lg shadow-amber-950/20 space-y-3"
      >
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold">
                {t('MANDATORY DEFENSE SECURITY DIRECTIVE')}
              </span>
              <span className="text-xs text-amber-200/80 font-mono">{t('National Defense & Official Secrets Compliance')}</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-amber-300 font-display">
              {t('Do not enter classified, operational, deployment, weapon, security-sensitive, or sensitive location information.')}
            </h3>
            <p className="text-xs sm:text-sm text-amber-200/90 mt-1 leading-relaxed">
              {t('For your national security oaths and legal compliance, you must NEVER enter, paste, or describe any restricted categories.')}
            </p>
          </div>
        </div>

        {/* Prohibited items list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs text-amber-100/95 font-medium">
          <div className="flex items-start gap-2 bg-black/40 p-2.5 rounded-lg border border-amber-500/20">
            <span className="text-rose-400 font-bold text-sm leading-none mt-0.5">✕</span>
            <span><strong>{t('Classified or Restricted Information:')}</strong> {t('Secret or confidential government and military records.')}</span>
          </div>
          <div className="flex items-start gap-2 bg-black/40 p-2.5 rounded-lg border border-amber-500/20">
            <span className="text-rose-400 font-bold text-sm leading-none mt-0.5">✕</span>
            <span><strong>{t('Operational Details:')}</strong> {t('Combat tactics, reconnaissance procedures, mission codenames, or strategies.')}</span>
          </div>
          <div className="flex items-start gap-2 bg-black/40 p-2.5 rounded-lg border border-amber-500/20">
            <span className="text-rose-400 font-bold text-sm leading-none mt-0.5">✕</span>
            <span><strong>{t('Deployment Information:')}</strong> {t('Patrol routes, deployment rosters, battle stations, or combat timelines.')}</span>
          </div>
          <div className="flex items-start gap-2 bg-black/40 p-2.5 rounded-lg border border-amber-500/20">
            <span className="text-rose-400 font-bold text-sm leading-none mt-0.5">✕</span>
            <span><strong>{t('Weapon Systems & Armaments:')}</strong> {t('Weapon specs, munitions, missile telemetry, or electronic warfare systems.')}</span>
          </div>
          <div className="flex items-start gap-2 bg-black/40 p-2.5 rounded-lg border border-amber-500/20">
            <span className="text-rose-400 font-bold text-sm leading-none mt-0.5">✕</span>
            <span><strong>{t('Security-Sensitive Information:')}</strong> {t('Intelligence sources, cryptographic keys, or security clearances.')}</span>
          </div>
          <div className="flex items-start gap-2 bg-black/40 p-2.5 rounded-lg border border-amber-500/20">
            <span className="text-rose-400 font-bold text-sm leading-none mt-0.5">✕</span>
            <span><strong>{t('Sensitive Locations:')}</strong> {t('Forward operational bases, radar grid coordinates, or tactical installations.')}</span>
          </div>
        </div>

        {/* Positive translation guidance */}
        <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200/95 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>{t('Civilian Translation Safe Zone:')}</strong> {t('Express your experience through general civilian terms.')}
          </p>
        </div>
      </div>

      {/* 3. Interactive Controls: Checkbox, Privacy Policy Button, Continue Button */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-900/90 border border-cyan-500/30 space-y-4">
        {/* I Agree Checkbox */}
        <div className="flex items-start gap-3 select-none">
          <div className="pt-0.5">
            <input
              type="checkbox"
              id="consent-privacy-i-agree-checkbox"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              className="w-5 h-5 rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-400 focus:ring-offset-slate-900 cursor-pointer accent-cyan-500"
            />
          </div>
          <label 
            htmlFor="consent-privacy-i-agree-checkbox" 
            className="text-xs sm:text-sm text-slate-200 cursor-pointer leading-relaxed"
          >
            <strong className="text-white font-semibold block sm:inline mr-1">
              {t('I Agree:')}
            </strong>
            {t('I understand that ValorBadge collects only information needed for career support and does not collect unnecessary personal data. I certify that I will NOT enter classified, operational, deployment, weapon, security-sensitive, or sensitive location information when creating or updating my profile.')}
          </label>
        </div>

        {/* Actions: Privacy Policy Button and Continue Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-800">
          <div className="flex items-center gap-2">
            {/* Privacy Policy Button */}
            <button
              type="button"
              id="consent-privacy-policy-btn"
              onClick={() => setShowPolicyModal(true)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-cyan-200 border border-slate-700 hover:border-cyan-500/40 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shadow-sm min-h-[42px]"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>{t('Privacy Policy')}</span>
            </button>

            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-3.5 py-2.5 rounded-xl text-slate-400 hover:text-white text-xs font-medium transition-colors"
              >
                {t('Cancel')}
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {!isAgreed && (
              <span className="text-[11px] text-amber-400/90 font-mono hidden sm:inline">
                * {t('Please check "I Agree" to proceed')}
              </span>
            )}

            {/* Continue Button */}
            <button
              type="button"
              id="consent-privacy-continue-btn"
              onClick={handleContinueClick}
              disabled={!isAgreed}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-lg min-h-[42px] ${
                isAgreed
                  ? 'bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 shadow-cyan-500/25 cursor-pointer active:scale-98'
                  : 'bg-slate-800 text-slate-500 border border-slate-700/60 cursor-not-allowed opacity-60'
              }`}
            >
              <span>{t('Continue')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Embedded Privacy Policy Modal / Drawer */}
      {showPolicyModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-modal-title"
        >
          <div className="w-full max-w-2xl bg-[#091426] border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-8 max-h-[85vh]">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 id="privacy-modal-title" className="text-base font-bold text-white font-display">
                    {t('ValorBadge Privacy Policy & Data Minimization Framework')}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    {t('Version 1.2 • Updated for Veteran Career Protection')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPolicyModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                aria-label={t('close')}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <section className="space-y-2">
                <h4 className="font-bold text-white text-sm font-display flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>{t('1. Purpose of Data Processing')}</span>
                </h4>
                <p>
                  {t('ValorBadge processes candidate data solely to assist military veterans, ex-service personnel, and Agniveers in transitioning to civilian careers.')}
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-white text-sm font-display flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-cyan-400" />
                  <span>{t('2. Strict Data Minimization Guarantee')}</span>
                </h4>
                <p>
                  {t('We collect only what is strictly necessary. We do not require, collect, or store any unnecessary personal data.')}
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-white text-sm font-display flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>{t('3. Classified Defense Information Prohibition')}</span>
                </h4>
                <p>
                  {t('Do not enter classified, operational, deployment, weapon, security-sensitive, or sensitive location information.')}
                </p>
              </section>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">{t('Want to inspect the full dedicated legal page?')}</span>
                <button
                  type="button"
                  onClick={() => {
                    setShowPolicyModal(false);
                    setCurrentRoute('privacy');
                  }}
                  className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 hover:underline"
                >
                  <span>{t('Open Full Legal Page')}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-900/60 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setShowPolicyModal(false)}
                className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors"
              >
                {t('Close & Return')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
