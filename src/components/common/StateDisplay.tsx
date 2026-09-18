import React from 'react';
import { motion } from 'motion/react';
import { 
  Loader2, 
  AlertTriangle, 
  CheckCircle2, 
  FolderOpen, 
  RefreshCw, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export type StateDisplayType = 'loading' | 'empty' | 'success' | 'error';

interface StateDisplayProps {
  type: StateDisplayType;
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryLabel?: string;
  onSecondaryAction?: () => void;
  icon?: React.ElementType;
  compact?: boolean;
  className?: string;
}

export const StateDisplay: React.FC<StateDisplayProps> = ({
  type,
  title,
  message,
  actionLabel,
  onAction,
  secondaryLabel,
  onSecondaryAction,
  icon: CustomIcon,
  compact = false,
  className = ''
}) => {
  const { reducedMotion, t } = useApp();

  // Preset definitions based on state type
  const configs = {
    loading: {
      defaultTitle: 'Processing Secure Record...',
      defaultMessage: 'Connecting encrypted career databases and verifying match indicators.',
      icon: Loader2,
      iconColor: 'text-cyan-400',
      badgeColor: 'border-cyan-500/30 bg-cyan-950/40 text-cyan-300',
      spin: true
    },
    empty: {
      defaultTitle: 'No Records Found',
      defaultMessage: 'There are no active records matching your current criteria or filters.',
      icon: FolderOpen,
      iconColor: 'text-slate-400',
      badgeColor: 'border-slate-700/60 bg-slate-900/60 text-slate-300',
      spin: false
    },
    success: {
      defaultTitle: 'Action Completed Successfully',
      defaultMessage: 'Your transition record has been updated and securely synchronized.',
      icon: CheckCircle2,
      iconColor: 'text-emerald-400',
      badgeColor: 'border-emerald-500/30 bg-emerald-950/40 text-emerald-300',
      spin: false
    },
    error: {
      defaultTitle: 'Operation Could Not Complete',
      defaultMessage: 'A temporary issue occurred while loading this section. Your saved records are safe.',
      icon: AlertTriangle,
      iconColor: 'text-rose-400',
      badgeColor: 'border-rose-500/30 bg-rose-950/40 text-rose-300',
      spin: false
    }
  };

  const config = configs[type];
  const IconComponent = CustomIcon || config.icon;
  const rawTitle = title || config.defaultTitle;
  const rawMessage = message || config.defaultMessage;
  const displayTitle = t(rawTitle);
  const displayMessage = t(rawMessage);

  return (
    <div 
      className={`rounded-2xl border transition-all ${
        type === 'error' 
          ? 'bg-[#0b0c16]/95 border-rose-500/30' 
          : type === 'success'
          ? 'bg-[#06141c]/95 border-emerald-500/30'
          : 'bg-[#071328]/90 border-slate-800/90'
      } ${compact ? 'p-5 sm:p-6' : 'p-8 sm:p-12'} text-center flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-sm ${className}`}
    >
      {/* Background ambient accent */}
      <div 
        className={`absolute -top-12 inset-x-0 h-24 blur-3xl pointer-events-none opacity-20 ${
          type === 'error' ? 'bg-rose-500' : type === 'success' ? 'bg-emerald-500' : 'bg-cyan-500'
        }`} 
      />

      {/* State Icon Container */}
      <div className="relative mb-4">
        <div 
          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center border shadow-lg ${
            type === 'error'
              ? 'bg-rose-950/40 border-rose-500/40 shadow-rose-950/40'
              : type === 'success'
              ? 'bg-emerald-950/40 border-emerald-500/40 shadow-emerald-950/40'
              : 'bg-slate-900/90 border-cyan-500/30 shadow-cyan-950/30'
          }`}
        >
          {config.spin && !reducedMotion ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            >
              <IconComponent className={`w-7 h-7 sm:w-8 sm:h-8 ${config.iconColor}`} />
            </motion.div>
          ) : (
            <IconComponent className={`w-7 h-7 sm:w-8 sm:h-8 ${config.iconColor}`} />
          )}
        </div>

        {/* Pulse ring for loading */}
        {type === 'loading' && !reducedMotion && (
          <span className="absolute -inset-1 rounded-2xl border border-cyan-400/30 animate-ping opacity-40 pointer-events-none" />
        )}
      </div>

      {/* State Badge */}
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold border mb-2 ${config.badgeColor}`}>
        <ShieldCheck className="w-3 h-3" />
        {t(type)} {t('State')}
      </span>

      {/* Title */}
      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight font-display mb-1 max-w-md">
        {displayTitle}
      </h3>

      {/* Message */}
      <p className="text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed mb-6">
        {displayMessage}
      </p>

      {/* Action Controls */}
      {(onAction || onSecondaryAction) && (
        <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-xs sm:max-w-md">
          {onAction && actionLabel && (
            <button
              onClick={onAction}
              className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 touch-manipulation"
            >
              {type === 'error' ? <RefreshCw className="w-4 h-4" /> : null}
              <span>{t(actionLabel)}</span>
              {type !== 'error' ? <ArrowRight className="w-3.5 h-3.5" /> : null}
            </button>
          )}

          {onSecondaryAction && secondaryLabel && (
            <button
              onClick={onSecondaryAction}
              className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-700/80 font-semibold text-xs active:scale-95 transition-all flex items-center justify-center touch-manipulation"
            >
              {t(secondaryLabel)}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
