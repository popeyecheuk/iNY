import React from 'react';
import { QUESTIONS_DATA, QuestionItem } from '../data/questions';
import { CognitiveFunction, FUNCTIONS_INFO } from '../data/mbtiData';
import { X, CheckCircle2, Circle } from 'lucide-react';
import { resolveText } from '../data/i18n';

interface QuestionGridModalProps {
  isOpen: boolean;
  onClose: () => void;
  answers: Record<number, number>;
  currentIndex: number;
  onSelectQuestion: (index: number) => void;
  lang: 'cantonese' | 'zh_tw' | 'en';
}

export const QuestionGridModal: React.FC<QuestionGridModalProps> = ({
  isOpen,
  onClose,
  answers,
  currentIndex,
  onSelectQuestion,
  lang
}) => {
  if (!isOpen) return null;

  const answeredCount = Object.keys(answers).length;
  const totalCount = QUESTIONS_DATA.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-slate-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-white/10 bg-slate-900/90">
          <div>
            <h2 className="text-base md:text-lg font-bold text-white">
              {resolveText({ cantonese: '題目導航列表 (96 題)', zh_tw: '題目導航索引 (96 題)', en: 'Question Index (96 items)' }, lang)}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {resolveText({ zh: `已完成 ${answeredCount} / ${totalCount} 題`, en: `Completed ${answeredCount} of ${totalCount}` }, lang)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Legend */}
        <div className="px-5 py-2.5 bg-slate-950/40 border-b border-white/5 flex flex-wrap items-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-violet-600"></span>
            <span>{resolveText({ zh: '已填答', en: 'Answered' }, lang)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-slate-800 border border-white/20"></span>
            <span>{resolveText({ zh: '未填答', en: 'Unanswered' }, lang)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded ring-2 ring-emerald-400 bg-violet-600"></span>
            <span>{resolveText({ zh: '當前題目', en: 'Current' }, lang)}</span>
          </div>
        </div>

        {/* 96 Grid */}
        <div className="flex-1 overflow-y-auto p-4 md:p-5">
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-2">
            {QUESTIONS_DATA.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined;
              const isCurrent = idx === currentIndex;
              const val = answers[q.id];

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    onSelectQuestion(idx);
                    onClose();
                  }}
                  title={
                    lang === 'en'
                      ? `Question ${q.id}: ${isAnswered ? `${val} pts` : 'Unanswered'}`
                      : `第 ${q.id} 題：${isAnswered ? `${val} 分` : '未作答'}`
                  }
                  className={`relative flex flex-col items-center justify-center h-12 rounded-xl text-xs font-mono font-bold transition-all ${
                    isCurrent
                      ? 'ring-2 ring-emerald-400 bg-violet-600 text-white scale-105 z-10 shadow-lg'
                      : isAnswered
                      ? 'bg-violet-950/80 hover:bg-violet-800 text-violet-200 border border-violet-500/40'
                      : 'bg-slate-800/80 hover:bg-slate-700 text-slate-400 border border-white/5'
                  }`}
                >
                  <span>{q.id}</span>
                  {isAnswered && (
                    <span className="text-xs text-emerald-400 font-mono mt-0.5">
                      {lang === 'en' ? `${val}pt` : `${val}分`}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-900 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-white/10"
          >
            {lang === 'en' ? 'Close' : '關閉'}
          </button>
        </div>
      </div>
    </div>
  );
};
