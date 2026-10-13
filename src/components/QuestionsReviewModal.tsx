import React, { useState } from 'react';
import { QUESTIONS_DATA, QuestionItem } from '../data/questions';
import { CognitiveFunction, FUNCTIONS_INFO } from '../data/mbtiData';
import { X, Search, Filter, CheckCircle2, AlertCircle } from 'lucide-react';

import { resolveText } from '../data/i18n';

interface QuestionsReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  answers: Record<number, number>;
  onUpdateAnswer: (questionId: number, value: number) => void;
  lang: 'cantonese' | 'zh_tw' | 'en';
}

const REVIEW_SCALE_DEFS = [
  { value: 1, zh: '非常不符合', en: 'Strongly Disagree' },
  { value: 2, zh: '不太符合', en: 'Disagree' },
  { value: 3, cantonese: '中立 / 一般', zh_tw: '中立 / 視情況', en: 'Neutral' },
  { value: 4, zh: '比較符合', en: 'Agree' },
  { value: 5, zh: '非常符合', en: 'Strongly Agree' }
];

export const QuestionsReviewModal: React.FC<QuestionsReviewModalProps> = ({
  isOpen,
  onClose,
  answers,
  onUpdateAnswer,
  lang
}) => {
  const [selectedFunction, setSelectedFunction] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const currentScale = REVIEW_SCALE_DEFS.map((opt) => ({
    value: opt.value,
    label: resolveText(opt, lang)
  }));

  const filteredQuestions = QUESTIONS_DATA.filter((q) => {
    if (selectedFunction !== 'ALL' && q.function !== selectedFunction) return false;
    if (searchQuery.trim()) {
      const qText = `${q.id} ${q.en} ${q.zh_tw} ${q.cantonese}`.toLowerCase();
      if (!qText.includes(searchQuery.toLowerCase().trim())) return false;
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-slate-900/90 flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              {resolveText({ cantonese: '答題記錄覆核與微調', zh_tw: '答題記錄回顧與調整', en: 'Review & Adjust Answers' }, lang)}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {resolveText({ cantonese: '你可以即時更改任何題目的得分，結果將自動更新。', zh_tw: '您可以即時微調任何題目的評分，結果將自動更新。', en: 'You can adjust any answer; results update immediately.' }, lang)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="p-3 sm:p-4 bg-slate-950/50 border-b border-white/5 flex flex-wrap items-center gap-2">
          {/* Function Filter Pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {['ALL', 'Ne', 'Ni', 'Se', 'Si', 'Te', 'Ti', 'Fe', 'Fi'].map((fn) => (
              <button
                key={fn}
                onClick={() => setSelectedFunction(fn)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                  selectedFunction === fn
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                {fn}
              </button>
            ))}
          </div>

          <div className="ml-auto w-full sm:w-auto relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={resolveText({ cantonese: '搜尋關鍵字或題號...', zh_tw: '搜尋題目內容或題號...', en: 'Search questions...' }, lang)}
              className="w-full bg-slate-800 border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
          </div>
        </div>

        {/* Question List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              {resolveText({ zh: '沒有符合條件的題目', en: 'No matching questions' }, lang)}
            </div>
          ) : (
            filteredQuestions.map((q) => {
              const currentVal = answers[q.id];
              const fnInfo = FUNCTIONS_INFO[q.function];
              const qText = lang === 'cantonese' ? q.cantonese : lang === 'zh_tw' ? q.zh_tw : q.en;

              return (
                <div
                  key={q.id}
                  className="bg-slate-800/70 border border-white/5 rounded-xl p-3.5 sm:p-4 transition-all hover:bg-slate-800/90"
                >
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-md bg-slate-900 border border-white/10 text-xs font-mono font-bold text-slate-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                        {q.id}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-slate-200 leading-snug">
                          {qText}
                        </p>
                        {lang !== 'en' && (
                          <p className="text-xs text-slate-400 mt-0.5">
                            {q.en}
                          </p>
                        )}
                      </div>
                    </div>

                    <span
                      className="px-2 py-0.5 rounded text-xs font-mono font-bold flex-shrink-0"
                      style={{ color: fnInfo.color, backgroundColor: `${fnInfo.color}15` }}
                    >
                      {q.function}
                    </span>
                  </div>

                  {/* 5-button Likert choices */}
                  <div className="grid grid-cols-5 gap-1.5 pt-2 border-t border-white/5">
                    {currentScale.map((opt) => {
                      const isSelected = currentVal === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => onUpdateAnswer(q.id, opt.value)}
                          className={`py-1.5 px-1 rounded-lg text-xs font-medium transition-all text-center ${
                            isSelected
                              ? 'bg-violet-600 text-white font-bold ring-1 ring-violet-400'
                              : 'bg-slate-900/60 hover:bg-slate-700/80 text-slate-400 border border-white/5'
                          }`}
                        >
                          <div className="font-mono text-xs">{opt.value}</div>
                          <div className="truncate hidden sm:block text-xs">{opt.label}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-slate-900 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {resolveText({
              cantonese: `顯示 ${filteredQuestions.length} / 96 題`,
              zh_tw: `共顯示 ${filteredQuestions.length} / 96 題`,
              en: `Showing ${filteredQuestions.length} of 96`
            }, lang)}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white shadow-md transition-all"
          >
            {resolveText({ cantonese: '完成並檢視報告', zh_tw: '完成並查看報告', en: 'Done & View Report' }, lang)}
          </button>
        </div>
      </div>
    </div>
  );
};
