import React, { useState } from 'react';
import { 
  X, 
  ArrowLeftRight, 
  Sparkles, 
  Check, 
  AlertCircle, 
  BookOpen, 
  Info 
} from 'lucide-react';
import { CAREER_DATABASE, compareTwoCareers, CareerDetail } from '../../../lib/careerDatabase';

interface CareerComparisonModalProps {
  careerAId?: string;
  careerBId?: string;
  onClose: () => void;
}

export const CareerComparisonModal: React.FC<CareerComparisonModalProps> = ({
  careerAId,
  careerBId,
  onClose
}) => {
  const [selectedA, setSelectedA] = useState<string>(
    careerAId || CAREER_DATABASE[0].id
  );
  const [selectedB, setSelectedB] = useState<string>(
    careerBId || CAREER_DATABASE[1]?.id || CAREER_DATABASE[0].id
  );

  const comparison = compareTwoCareers(selectedA, selectedB);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="comparison-title"
    >
      <div className="w-full max-w-4xl my-8 bg-[#071328] border border-slate-700/80 rounded-2xl shadow-2xl text-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-[#061022] flex items-center justify-between gap-4 sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold flex items-center gap-1">
                <ArrowLeftRight className="w-3.5 h-3.5" />
                <span>SIDE-BY-SIDE CAREER COMPARISON</span>
              </span>
            </div>
            <h2 id="comparison-title" className="text-lg sm:text-xl font-bold text-white font-display">
              Evaluate Pathways & Bridging Requirements
            </h2>
          </div>

          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors"
            aria-label="Close comparison dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Career Selectors */}
        <div className="p-4 sm:p-5 bg-slate-900/90 border-b border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="compare-a-select" className="text-[11px] font-mono uppercase text-cyan-400 font-bold block mb-1.5">
              Career Option A:
            </label>
            <select
              id="compare-a-select"
              value={selectedA}
              onChange={(e) => setSelectedA(e.target.value)}
              className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400"
            >
              {CAREER_DATABASE.map(c => (
                <option key={c.id} value={c.id}>
                  {c.title} ({c.category})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="compare-b-select" className="text-[11px] font-mono uppercase text-indigo-400 font-bold block mb-1.5">
              Career Option B:
            </label>
            <select
              id="compare-b-select"
              value={selectedB}
              onChange={(e) => setSelectedB(e.target.value)}
              className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-400"
            >
              {CAREER_DATABASE.map(c => (
                <option key={c.id} value={c.id}>
                  {c.title} ({c.category})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Table / Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          
          {comparison ? (
            <div className="space-y-4">
              
              {/* Titles Display */}
              <div className="grid grid-cols-2 gap-4 pb-3 border-b border-slate-800 text-center sm:text-left">
                <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/30">
                  <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">Option A</span>
                  <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">{comparison.careerA.title}</h3>
                </div>
                <div className="p-3 rounded-xl bg-indigo-950/20 border border-indigo-500/30">
                  <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold block">Option B</span>
                  <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">{comparison.careerB.title}</h3>
                </div>
              </div>

              {/* Comparison Rows */}
              <div className="divide-y divide-slate-800/80">
                {comparison.comparisonPoints.map((pt, idx) => (
                  <div key={idx} className="py-3.5 space-y-1.5">
                    <span className="text-xs font-mono font-bold uppercase text-slate-300 block">
                      {pt.attribute}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-200">
                        {pt.valueA}
                      </div>
                      <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-200">
                        {pt.valueB}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI/System Disclaimer */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2 mt-4">
                <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong>AI System Notice:</strong> {comparison.aiNotice}
                </span>
              </div>

            </div>
          ) : (
            <p className="text-sm text-slate-400 text-center py-8">
              Select two valid careers to compare.
            </p>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#061022] flex justify-end">
          <button
            onClick={onClose}
            className="min-h-[44px] px-5 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-white transition-colors"
          >
            Close Comparison
          </button>
        </div>

      </div>
    </div>
  );
};
