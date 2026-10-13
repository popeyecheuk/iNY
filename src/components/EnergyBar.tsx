import React from 'react';

export interface EnergyBarProps {
  /** Percentage of the left attribute (0 - 100) */
  leftPct: number;
  /** Percentage of the right attribute (0 - 100) */
  rightPct: number;
  /**
   * Tailwind class for the left bar fill (e.g. "bg-sky-500" or gradient)
   * If gradient, can specify e.g. "bg-gradient-to-r from-blue-600 to-blue-400"
   */
  leftColorClass: string;
  /** Tailwind class for the right bar fill */
  rightColorClass: string;
  /** Height class for the bar track, default "h-3" */
  heightClass?: string;
  /** Show the center white vertical divider indicator, default true */
  showCenterDivider?: boolean;
  /** Optional container extra classes */
  className?: string;
  /** Accessibility label describing the axis or function */
  ariaLabel?: string;
  /** Explicit current value for accessibility (defaults to leftPct) */
  ariaValueNow?: number;
}

/**
 * Reusable two-sided energy balance bar component
 * Used across Dichotomy Balance views.
 */
export const EnergyBar: React.FC<EnergyBarProps> = ({
  leftPct,
  rightPct,
  leftColorClass,
  rightColorClass,
  heightClass = 'h-3',
  showCenterDivider = false,
  className = '',
  ariaLabel,
  ariaValueNow
}) => {
  return (
    <div
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuenow={ariaValueNow !== undefined ? ariaValueNow : leftPct}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`relative ${heightClass} bg-slate-950 rounded-full overflow-hidden flex ${
        showCenterDivider ? 'border border-white/5 shadow-inner' : ''
      } ${className}`}
    >
      <div
        className={`h-full ${leftColorClass} transition-all duration-500`}
        style={{ width: `${leftPct}%` }}
      />
      <div
        className={`h-full ${rightColorClass} transition-all duration-500`}
        style={{ width: `${rightPct}%` }}
      />
      {showCenterDivider && (
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/40 pointer-events-none -translate-x-1/2" />
      )}
    </div>
  );
};

export interface DichotomyBalanceCardProps {
  leftLabel: string;
  leftPct: number;
  leftColorClass: string;
  leftActiveTextClass?: string;
  leftDesc?: string;

  rightLabel: string;
  rightPct: number;
  rightColorClass: string;
  rightActiveTextClass?: string;
  rightDesc?: string;

  heightClass?: string;
  showCenterDivider?: boolean;
  ariaLabel?: string;
}

/**
 * Reusable card wrapper displaying a pair of dichotomy polarities with title percentages,
 * visual dual-sided EnergyBar, and descriptive subtexts.
 */
export const DichotomyBalanceCard: React.FC<DichotomyBalanceCardProps> = ({
  leftLabel,
  leftPct,
  leftColorClass,
  leftActiveTextClass = 'text-sky-300 font-bold',
  leftDesc,
  rightLabel,
  rightPct,
  rightColorClass,
  rightActiveTextClass = 'text-indigo-300 font-bold',
  rightDesc,
  heightClass = 'h-3',
  showCenterDivider = false,
  ariaLabel
}) => {
  return (
    <div className="bg-slate-800/60 border border-white/5 rounded-xl p-4">
      <div className="flex justify-between items-center text-xs font-semibold mb-2">
        <span
          className={`flex items-center gap-1.5 ${
            leftPct >= 50 ? leftActiveTextClass : 'text-slate-400'
          }`}
        >
          {leftLabel}: {leftPct}%
        </span>
        <span
          className={`flex items-center gap-1.5 ${
            rightPct >= 50 ? rightActiveTextClass : 'text-slate-400'
          }`}
        >
          {rightLabel}: {rightPct}%
        </span>
      </div>
      <EnergyBar
        leftPct={leftPct}
        rightPct={rightPct}
        leftColorClass={leftColorClass}
        rightColorClass={rightColorClass}
        heightClass={heightClass}
        showCenterDivider={showCenterDivider}
        ariaLabel={ariaLabel || `${leftLabel} / ${rightLabel}`}
        ariaValueNow={leftPct}
      />
      {(leftDesc || rightDesc) && (
        <div className="flex justify-between text-xs text-slate-300 mt-1">
          <span>{leftDesc}</span>
          <span>{rightDesc}</span>
        </div>
      )}
    </div>
  );
};
