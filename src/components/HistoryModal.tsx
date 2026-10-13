import React from 'react';
import { AssessmentResult } from '../utils/calculator';
import { X, Trash2, Calendar, Award, ArrowRight } from 'lucide-react';
import { resolveText } from '../data/i18n';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: AssessmentResult[];
  onSelectResult: (result: AssessmentResult) => void;
  onClearHistory: () => void;
  onDeleteHistoryItem: (index: number) => void;
  lang: 'cantonese' | 'zh_tw' | 'en';
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  onSelectResult,
  onClearHistory,
  onDeleteHistoryItem,
  lang
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-slate-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-slate-900/90 flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              {resolveText({ cantonese: '歷史測驗記錄', zh_tw: '歷次測驗歷史記錄', en: 'Assessment History' }, lang)}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {resolveText({ zh: `共保存 ${history.length} 次評估記錄`, en: `Saved ${history.length} assessment records` }, lang)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {history.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              {resolveText({ cantonese: '目前尚無儲存的歷史記錄', zh_tw: '尚無保存的測驗記錄', en: 'No saved assessment records' }, lang)}
            </div>
          ) : (
            history.map((item, idx) => {
              const dateStr = new Date(item.completedAt).toLocaleString();
              return (
                <div
                  key={idx}
                  className="bg-slate-800/70 border border-white/5 rounded-xl p-3.5 sm:p-4 flex items-center justify-between gap-3 transition-all hover:bg-slate-800/90 hover:border-violet-500/30"
                >
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => {
                      onSelectResult(item);
                      onClose();
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg font-mono font-black text-white">
                        {item.grantType.code}
                      </span>
                      <span className="text-xs font-semibold text-violet-300">
                        {item.grantType.name[lang]}
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-500/20">
                        {lang === 'en' ? `${item.grantTypeMatchPct}% Match` : `${item.grantTypeMatchPct}% 契合度`}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {dateStr}
                      </span>
                      <span>•</span>
                      <span>{lang === 'en' ? `Behavioral: ${item.myersType}` : `行為表現派: ${item.myersType}`}</span>
                    </div>

                    <div className="flex items-center gap-1.5 mt-2">
                      {item.rankedFunctions.slice(0, 4).map((f) => (
                        <span
                          key={f.code}
                          className="text-xs px-2 py-0.5 rounded bg-slate-900 font-mono text-slate-300 border border-white/5"
                        >
                          {f.code}: {f.score}%
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        onSelectResult(item);
                        onClose();
                      }}
                      className="p-2 rounded-lg bg-violet-600/20 text-violet-300 hover:bg-violet-600 hover:text-white transition-all text-xs flex items-center gap-1 font-semibold"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteHistoryItem(idx)}
                      className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-all"
                      title={lang === 'en' ? 'Delete this record' : '刪除此筆記錄'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-slate-900 border-t border-white/10 flex items-center justify-between">
          {history.length > 0 && (
            <button
              onClick={onClearHistory}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              {resolveText({ cantonese: '清空所有記錄', zh_tw: '清空歷史記錄', en: 'Clear History' }, lang)}
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-auto px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-white/10"
          >
            {lang === 'en' ? 'Close' : '關閉'}
          </button>
        </div>
      </div>
    </div>
  );
};
