import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getTranslation } from '../../lib/i18n';

interface SecurityNoticeBannerProps {
  compact?: boolean;
}

export const SecurityNoticeBanner: React.FC<SecurityNoticeBannerProps> = ({ compact = false }) => {
  const { language } = useApp();
  const t = getTranslation(language);

  if (compact) {
    return (
      <div 
        id="valorbadge-security-notice-compact"
        className="w-full bg-amber-950/40 border border-amber-500/30 rounded-lg p-3 flex items-start space-x-3 text-amber-200/90 text-xs"
        role="alert"
        aria-live="polite"
      >
        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-300 font-semibold">{t.privacyWarningTitle}: </strong>
          <span>{t.privacyWarning}</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      id="valorbadge-security-notice-full"
      className="w-full bg-gradient-to-r from-amber-950/30 via-slate-900/60 to-amber-950/30 border border-amber-500/30 rounded-xl p-4 md:p-5 shadow-lg relative overflow-hidden"
      role="alert"
      aria-live="polite"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start space-x-3.5">
          <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
              <span>{t.privacyWarningTitle}</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Official Guideline
              </span>
            </h4>
            <p className="text-xs text-amber-200/90 mt-1 leading-relaxed max-w-4xl">
              {t.privacyWarning}
            </p>
          </div>
        </div>

        <div className="hidden lg:flex items-center text-xs text-slate-400 bg-slate-950/60 px-3 py-2 rounded-lg border border-slate-800 shrink-0 gap-2">
          <Info className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Only standard civilian resume & skill equivalence data is collected.</span>
        </div>
      </div>
    </div>
  );
};
