import React from 'react';
import { X, Sparkles, Compass, Lightbulb, Users, Cpu, ShieldCheck } from 'lucide-react';
import { buildLocalized, DUAL_TRACK_MODAL_DEFS } from '../data/i18n';

interface DualTrackModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'cantonese' | 'zh_tw' | 'en';
}

export const DualTrackModal: React.FC<DualTrackModalProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  if (!isOpen) return null;

  const content = buildLocalized(DUAL_TRACK_MODAL_DEFS, lang);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-slate-900 border border-white/10 rounded-2xl p-5 sm:p-7 shadow-2xl text-slate-200 overflow-y-auto scrollbar-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Main Title & Intro */}
        <div className="flex items-center gap-2.5 mb-2.5 pr-8">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-slate-950 font-bold shadow-md flex-shrink-0">
            <Compass className="w-4 h-4" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            {content.title}
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
          {content.intro}
        </p>

        {/* Expert 1: Grant Stack */}
        <div className="bg-slate-800/80 border-l-4 border-emerald-500 rounded-r-2xl p-4 sm:p-5 mb-4 border-t border-r border-b border-white/5 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-1.5">
            <h4 className="text-sm sm:text-base font-bold text-emerald-300 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-emerald-400" />
              {content.expert1Title}
            </h4>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-300 border border-emerald-500/30 font-semibold">
              完美主義教官
            </span>
          </div>

          <div className="text-xs font-semibold text-emerald-200/90 font-mono">
            {content.expert1Sub}
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-white">{content.expert1How}</strong>
            {content.expert1Desc}
          </p>

          <div className="pt-2 border-t border-white/5 text-xs text-emerald-400/90 font-medium">
            🎯 {content.expert1Fit}
          </div>
        </div>

        {/* Expert 2: Myers Model */}
        <div className="bg-slate-800/80 border-l-4 border-violet-500 rounded-r-2xl p-4 sm:p-5 mb-5 border-t border-r border-b border-white/5 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-1.5">
            <h4 className="text-sm sm:text-base font-bold text-violet-300 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-violet-400" />
              {content.expert2Title}
            </h4>
            <span className="text-xs px-2 py-0.5 rounded bg-violet-950/70 text-violet-300 border border-violet-500/30 font-semibold">
              實戰派教練
            </span>
          </div>

          <div className="text-xs font-semibold text-violet-200/90 font-mono">
            {content.expert2Sub}
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-white">{content.expert2How}</strong>
            {content.expert2Desc}
          </p>

          <div className="pt-2 border-t border-white/5 text-xs text-violet-300/90 font-medium">
            🎯 {content.expert2Fit}
          </div>
        </div>

        {/* Pro Tip Box: Why compare both? */}
        <div className="rounded-2xl bg-slate-950/80 border border-white/10 p-4 sm:p-5 mb-6 space-y-3">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-xs sm:text-sm">
            <Lightbulb className="w-4 h-4 flex-shrink-0" />
            <span>{content.tipHeading}</span>
          </div>

          <div className="bg-slate-900/90 rounded-xl p-3 border border-white/5 text-xs space-y-1">
            <div className="font-bold text-emerald-300 flex items-center gap-1">
              <span>🌟</span>
              <span>{content.consistentTitle}</span>
            </div>
            <p className="text-slate-300 leading-relaxed pl-5">
              {content.consistentDesc}
            </p>
          </div>

          <div className="bg-slate-900/90 rounded-xl p-3 border border-white/5 text-xs space-y-1">
            <div className="font-bold text-violet-300 flex items-center gap-1">
              <span>🎭</span>
              <span>{content.clashTitle}</span>
            </div>
            <p className="text-slate-300 leading-relaxed pl-5">
              {content.clashDesc}
            </p>
          </div>
        </div>

        {/* Bottom CTA button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 transition-all shadow-lg shadow-emerald-950/40 active:scale-95"
          >
            {content.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
