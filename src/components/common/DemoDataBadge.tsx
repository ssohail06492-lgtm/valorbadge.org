import React from 'react';

interface DemoDataBadgeProps {
  size?: 'sm' | 'md';
  className?: string;
}

export const DemoDataBadge: React.FC<DemoDataBadgeProps> = ({ size = 'sm', className = '' }) => {
  const isSm = size === 'sm';
  return (
    <span
      className={`inline-flex items-center gap-1 font-mono uppercase tracking-wider font-semibold rounded border border-amber-500/40 bg-amber-500/15 text-amber-300 ${
        isSm ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
      } ${className}`}
      title="Fictional illustrative record for demonstration. Real backend integration ready."
    >
      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
      DEMO DATA
    </span>
  );
};
