import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Cpu, Briefcase, Award } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface LoadingSequenceProps {
  onComplete?: () => void;
  standalone?: boolean;
}

export const LoadingSequence: React.FC<LoadingSequenceProps> = ({ onComplete, standalone = false }) => {
  const { t } = useApp();
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    // Sequence timing:
    // 0: logo appears (0ms)
    // 1: subtle ring forms (400ms)
    // 2: connected nodes appear (900ms)
    // 3: career pathway brief animates (1500ms)
    // 4: finish (2200ms)
    const t1 = setTimeout(() => setStep(1), 400);
    const t2 = setTimeout(() => setStep(2), 900);
    const t3 = setTimeout(() => setStep(3), 1500);
    const t4 = setTimeout(() => {
      setStep(4);
      if (onComplete) onComplete();
    }, 2200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        id="valorbadge-loading-sequence"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`${
          standalone ? 'relative min-h-[300px]' : 'fixed inset-0 z-50'
        } bg-[#040914] flex flex-col items-center justify-center p-6`}
      >
        <div className="relative flex flex-col items-center">
          {/* Subtle Ring animation (Step 1+) */}
          {step >= 1 && (
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, rotate: 360 }}
              transition={{ duration: 2, ease: 'easeOut', repeat: Infinity }}
              className="absolute -inset-8 rounded-full border border-cyan-500/20 border-dashed"
            />
          )}

          {/* Logo badge (Step 0+) */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-600 via-slate-900 to-indigo-600 p-[2px] shadow-2xl shadow-cyan-500/30 mb-6"
          >
            <div className="w-full h-full bg-[#061022] rounded-2xl flex items-center justify-center">
              <ShieldCheck className="w-10 h-10 text-cyan-400" />
            </div>
          </motion.div>

          {/* Brand Name & Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 className="text-2xl font-bold tracking-tight text-white font-display">
              Valor<span className="text-cyan-400">Badge</span>
            </h1>
            <p className="text-xs text-slate-400 font-mono tracking-widest uppercase mt-1">
              {t('Your Service. Your Skills. Your Next Mission.')}
            </p>
          </motion.div>

          {/* Connected Nodes & Pathway (Step 2 & 3) */}
          <div className="flex items-center gap-3">
            {[
              { label: 'SERVICE', icon: ShieldCheck },
              { label: 'SKILLS', icon: Cpu },
              { label: 'EXPERIENCE', icon: Briefcase },
              { label: 'CAREER', icon: Award }
            ].map((node, i) => {
              const Icon = node.icon;
              const isActive = step >= 2;
              const isPathwayActive = step >= 3;
              return (
                <React.Fragment key={node.label}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: isActive ? 1 : 0.2, 
                      scale: isActive ? 1 : 0.8,
                      borderColor: isPathwayActive ? '#06b6d4' : '#1e293b' 
                    }}
                    transition={{ delay: i * 0.15 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-mono text-slate-400 mt-1 uppercase font-semibold">
                      {t(node.label)}
                    </span>
                  </motion.div>
                  {i < 3 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isPathwayActive ? 1 : 0.3 }}
                      className="w-6 h-0.5 bg-gradient-to-r from-cyan-500 to-indigo-500 origin-left"
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <div className="mt-8 flex items-center space-x-2 text-xs text-slate-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>{t('Initializing secure translation environment...')}</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
