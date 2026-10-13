import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { QUESTIONS_DATA, QuestionItem } from './data/questions';
import { FUNCTIONS_INFO, CognitiveFunction, MBTI_TYPES } from './data/mbtiData';
import { calculateCognitiveFunctions, AssessmentResult } from './utils/calculator';
import { ReportView } from './components/ReportView';
import { QuestionGridModal } from './components/QuestionGridModal';
import { QuestionsReviewModal } from './components/QuestionsReviewModal';
import { HistoryModal } from './components/HistoryModal';
import { DualTrackModal } from './components/DualTrackModal';
import { AboutInySection } from './components/AboutInySection';
import { FaqSection } from './components/FaqSection';
import { InyLogo } from './components/InyLogo';
import {
  Brain,
  Compass,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  History,
  Grid,
  CheckCircle2,
  Clock,
  Globe,
  Sliders,
  Bookmark,
  BookOpen,
  ArrowRight,
  Eye,
  EyeOff,
  Flame,
  Check
} from 'lucide-react';

import { AppLang, buildLocalized, APP_I18N_DEFS, SCALE_CONFIG_DEFS } from './data/i18n';

type Lang = AppLang;
type QuizMode = 'focus' | 'list';

const STORAGE_KEYS = {
  DRAFT_ANSWERS: 'jungian_mbti_draft_answers_v1',
  CURRENT_INDEX: 'jungian_mbti_current_index_v1',
  HISTORY: 'jungian_mbti_history_v1',
  LANG: 'jungian_mbti_lang_v1',
  SETTINGS: 'jungian_mbti_settings_v1'
};

const SCALE_COLOR_MAP: Record<number, { activeClass: string; hoverClass: string }> = {
  1: { activeClass: 'bg-rose-600 text-white ring-2 ring-rose-400', hoverClass: 'hover:border-rose-500/50 hover:bg-rose-950/20' },
  2: { activeClass: 'bg-amber-600 text-white ring-2 ring-amber-400', hoverClass: 'hover:border-amber-500/50 hover:bg-amber-950/20' },
  3: { activeClass: 'bg-slate-700 text-white ring-2 ring-slate-400', hoverClass: 'hover:border-slate-500/50 hover:bg-slate-800' },
  4: { activeClass: 'bg-teal-600 text-white ring-2 ring-teal-400', hoverClass: 'hover:border-teal-500/50 hover:bg-teal-950/20' },
  5: { activeClass: 'bg-violet-600 text-white ring-2 ring-violet-400', hoverClass: 'hover:border-violet-500/50 hover:bg-violet-950/20' }
};

const SCALE_CONFIG = SCALE_CONFIG_DEFS.map((item) => ({
  val: item.val,
  key: item.key,
  cantonese: item.zh,
  zh_tw: item.zh,
  en: item.en,
  ...SCALE_COLOR_MAP[item.val]
}));

export default function App() {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LANG);
      return (saved as Lang) || 'cantonese';
    } catch {
      return 'cantonese';
    }
  });

  const [mode, setMode] = useState<QuizMode>('focus');
  const [autoAdvance, setAutoAdvance] = useState<boolean>(true);
  const [blindMode, setBlindMode] = useState<boolean>(true); // Hide function code during test for unbiased answers

  const [answers, setAnswers] = useState<Record<number, number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DRAFT_ANSWERS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_INDEX);
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [history, setHistory] = useState<AssessmentResult[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HISTORY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currentResult, setCurrentResult] = useState<AssessmentResult | null>(null);
  const [viewState, setViewState] = useState<'intro' | 'quiz' | 'report'>('intro');

  // Modals
  const [isGridModalOpen, setIsGridModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isDualTrackIntroModalOpen, setIsDualTrackIntroModalOpen] = useState(false);

  // Persistence (wrapped in try/catch to gracefully fall back to in-memory state)
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LANG, lang);
    } catch {
      // In private browsing or storage full, silently continue with memory state
    }
  }, [lang]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.DRAFT_ANSWERS, JSON.stringify(answers));
    } catch {
      // Ignore storage write failure
    }
  }, [answers]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_INDEX, currentIndex.toString());
    } catch {
      // Ignore storage write failure
    }
  }, [currentIndex]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
    } catch {
      // Ignore storage write failure
    }
  }, [history]);

  // Answered stats
  const answeredCount = Object.keys(answers).length;
  const totalCount = QUESTIONS_DATA.length;
  const progressPct = Math.round((answeredCount / totalCount) * 100);

  // Handle single question answer in focus mode
  const handleAnswer = useCallback((qId: number, val: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: val }));

    if (autoAdvance && mode === 'focus') {
      if (currentIndex < QUESTIONS_DATA.length - 1) {
        setTimeout(() => {
          setCurrentIndex((prev) => Math.min(QUESTIONS_DATA.length - 1, prev + 1));
        }, 160);
      }
    }
  }, [autoAdvance, currentIndex, mode]);

  // Keyboard navigation & answering in Focus Mode
  useEffect(() => {
    if (viewState !== 'quiz' || isGridModalOpen || isReviewModalOpen || isHistoryModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const currentQ = QUESTIONS_DATA[currentIndex];
      if (!currentQ) return;

      if (['1', '2', '3', '4', '5'].includes(e.key)) {
        e.preventDefault();
        handleAnswer(currentQ.id, parseInt(e.key, 10));
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        setCurrentIndex((prev) => Math.min(QUESTIONS_DATA.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewState, currentIndex, isGridModalOpen, isReviewModalOpen, isHistoryModalOpen, handleAnswer]);

  // Calculate & finalize
  const handleSubmit = () => {
    const res = calculateCognitiveFunctions(answers);
    setCurrentResult(res);
    setHistory((prev) => [res, ...prev.slice(0, 19)]); // keep recent 20
    setViewState('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentIndex(0);
    setCurrentResult(null);
    setViewState('quiz');
  };

  const handleResetDraft = () => {
    setAnswers({});
    setCurrentIndex(0);
    setCurrentResult(null);
    try {
      localStorage.removeItem(STORAGE_KEYS.DRAFT_ANSWERS);
      localStorage.removeItem(STORAGE_KEYS.CURRENT_INDEX);
    } catch {
      // Ignore storage remove failure
    }
  };

  const handleStartQuiz = () => {
    setViewState('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Translations from centralized dictionary
  const t = buildLocalized(APP_I18N_DEFS, lang);

  const currentFocusQuestion = QUESTIONS_DATA[currentIndex];

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col font-sans selection:bg-violet-500 selection:text-white antialiased">
      {/* Top Floating Glass Navigation Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div
            onClick={() => setViewState('intro')}
            className="flex items-end gap-2.5 sm:gap-3 cursor-pointer group select-none transition-transform hover:opacity-95 active:scale-95"
            title="INSIDE YOU (iNY)"
          >
            <div className="flex items-end">
              <InyLogo variant="mark" size={48} className="h-7 sm:h-8 w-auto block" />
            </div>
            <span
              className="font-extrabold tracking-wider text-slate-100 text-[13px] group-hover:text-sky-300 transition-colors uppercase font-display leading-none mb-[2px]"
              style={{ fontSize: '13px' }}
            >
              INSIDE YOU
            </span>
          </div>

          {/* Center progress if in quiz */}
          {viewState === 'quiz' && (
            <div className="flex-1 max-w-xs mx-2 hidden md:block">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-400 font-mono">
                  {currentIndex + 1} / {totalCount}
                </span>
                <span className="text-emerald-400 font-mono font-bold">
                  {progressPct}% ({answeredCount}/{totalCount})
                </span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-emerald-400 transition-all duration-300 rounded-full"
                  style={{ width: `${(answeredCount / totalCount) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Right Action buttons */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="relative flex items-center bg-slate-900 border border-white/10 rounded-xl p-0.5">
              <button
                onClick={() => setLang('cantonese')}
                className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all ${
                  lang === 'cantonese'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="廣東話"
              >
                粵語
              </button>
              <button
                onClick={() => setLang('zh_tw')}
                className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all ${
                  lang === 'zh_tw'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="繁體中文"
              >
                繁中
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all ${
                  lang === 'en'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="English"
              >
                EN
              </button>
            </div>

            {/* Quick Grid Navigator button */}
            <button
              onClick={() => setIsGridModalOpen(true)}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/10 transition-all flex items-center gap-1.5 text-xs font-semibold"
              title={t.viewGrid}
            >
              <Grid className="w-4 h-4 text-violet-400" />
              <span className="hidden sm:inline font-mono text-xs">
                {answeredCount}/96
              </span>
            </button>

            {/* History Button */}
            <button
              onClick={() => setIsHistoryModalOpen(true)}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/10 transition-all flex items-center gap-1 text-xs"
              title={t.historyTitle}
            >
              <History className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6 md:py-8">
        {/* ================= VIEW 1: INTRO / LANDING ================= */}
        {viewState === 'intro' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Hero Card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/70 to-slate-900 border border-white/10 p-6 md:p-10 shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 max-w-3xl">
                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                  {lang === 'cantonese' ? (
                    <>
                      探索<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-sky-300 to-emerald-400">更真實的自己</span>
                    </>
                  ) : lang === 'zh_tw' ? (
                    <>
                      探索<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-sky-300 to-emerald-400">更真實的自己</span>
                    </>
                  ) : (
                    <>
                      Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-sky-300 to-emerald-400">Your Truest Self</span>
                    </>
                  )}
                </h1>

                <p className="text-sm md:text-base text-slate-300 mt-3 leading-relaxed">
                  {t.tagline}
                </p>

                {/* Features pills */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-5">
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800/80 border border-white/10 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span className="truncate">{t.scalePill}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800/80 border border-white/10 text-xs text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                    <span className="truncate">{t.durationPill}</span>
                  </div>
                  <div
                    onClick={() => setIsDualTrackIntroModalOpen(true)}
                    className="flex items-center justify-between gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-white/10 hover:border-emerald-500/40 text-xs text-slate-300 transition-all cursor-pointer group"
                    title={t.dualTrackTooltip}
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <Compass className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-45 transition-transform flex-shrink-0" />
                      <span className="truncate">{t.dualTrackPill}</span>
                    </div>
                    <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center justify-center flex-shrink-0">
                      ?
                    </span>
                  </div>
                </div>

                {/* Primary CTA button */}
                <div className="flex flex-wrap items-center gap-3 mt-7">
                  <button
                    onClick={handleStartQuiz}
                    className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-900/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>{answeredCount > 0 ? t.resumeBtn : t.startBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {answeredCount > 0 && (
                    <button
                      onClick={handleResetDraft}
                      className="flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/10 transition-all active:scale-95"
                      title="清除當前進度並重設"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{lang === 'cantonese' ? '重設進度' : lang === 'zh_tw' ? '重設進度' : 'Reset Progress'}</span>
                    </button>
                  )}
                </div>

                {/* Self-reflection disclaimer */}
                <p className="text-xs text-slate-400 mt-2.5">
                  {t.disclaimerNote}
                </p>
              </div>
            </div>

            {/* 8 Functions Overview Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                    <Compass className="w-5 h-5 text-violet-400" />
                    {t.aboutTitle}
                  </h2>
                  <p className="text-xs md:text-sm text-slate-400 mt-1">
                    {t.aboutDesc}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {(Object.keys(FUNCTIONS_INFO) as CognitiveFunction[]).map((fnCode) => {
                  const fn = FUNCTIONS_INFO[fnCode];
                  return (
                    <div
                      key={fnCode}
                      className="bg-slate-900/80 border border-white/10 rounded-2xl p-4 flex flex-col justify-between transition-all hover:border-violet-500/40 hover:-translate-y-0.5"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className="text-base font-black font-mono px-2 py-0.5 rounded-md"
                            style={{ color: fn.color, backgroundColor: `${fn.color}15` }}
                          >
                            {fnCode}
                          </span>
                          <span className="text-xs font-medium text-slate-400">
                            {fn.orientation} • {fn.category}
                          </span>
                        </div>

                        <h3 className="text-sm font-bold text-slate-200 mb-1">
                          {fn.name[lang]}
                        </h3>

                        <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                          {fn.shortDesc[lang]}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-3 pt-2.5 border-t border-white/5">
                        {(fn.keywords[lang] || fn.keywords.en).slice(0, 3).map((kw) => (
                          <span
                            key={kw}
                            className="text-xs px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-medium"
                          >
                            #{kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* About iNY Section */}
            <AboutInySection
              lang={lang}
              onOpenDualTrackModal={() => setIsDualTrackIntroModalOpen(true)}
              onStartQuiz={handleStartQuiz}
            />

            {/* Q&A Section (SEO & Common Questions) */}
            <FaqSection lang={lang} />
          </div>
        )}

        {/* ================= VIEW 2: QUIZ ================= */}
        {viewState === 'quiz' && (
          <div className="space-y-6 animate-fadeIn pb-24">
            {/* Mode & Preference Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/90 border border-white/10 rounded-2xl text-xs backdrop-blur-md">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMode('focus')}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                    mode === 'focus'
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white bg-slate-800/60'
                  }`}
                >
                  {t.focusMode}
                </button>
                <button
                  onClick={() => setMode('list')}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                    mode === 'list'
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white bg-slate-800/60'
                  }`}
                >
                  {t.listMode}
                </button>
              </div>

              <div className="flex items-center gap-4 text-slate-400 ml-auto">
                {mode === 'focus' && (
                  <label className="flex items-center gap-1.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={autoAdvance}
                      onChange={(e) => setAutoAdvance(e.target.checked)}
                      className="rounded bg-slate-800 border-white/10 text-violet-600 focus:ring-0"
                    />
                    <span>{t.autoAdvanceLabel}</span>
                  </label>
                )}

                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={blindMode}
                    onChange={(e) => setBlindMode(e.target.checked)}
                    className="rounded bg-slate-800 border-white/10 text-violet-600 focus:ring-0"
                  />
                  <span>{t.blindModeLabel}</span>
                </label>
              </div>
            </div>

            {/* FOCUS MODE: ONE QUESTION AT A TIME */}
            {mode === 'focus' && currentFocusQuestion && (
              <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden backdrop-blur-md transition-all">
                <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/5 rounded-full blur-3xl pointer-events-none"></div>

                {/* Question meta header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-violet-600/20 text-violet-300 border border-violet-500/30 text-xs font-mono font-bold flex items-center justify-center">
                      #{currentFocusQuestion.id}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {currentIndex + 1} / {totalCount} {t.questionOf}
                    </span>
                  </div>

                  {!blindMode && (
                    <span
                      className="px-2.5 py-1 rounded-md text-xs font-mono font-bold"
                      style={{
                        color: FUNCTIONS_INFO[currentFocusQuestion.function].color,
                        backgroundColor: `${FUNCTIONS_INFO[currentFocusQuestion.function].color}15`
                      }}
                    >
                      {currentFocusQuestion.function} • {FUNCTIONS_INFO[currentFocusQuestion.function].name[lang]}
                    </span>
                  )}
                </div>

                {/* Question statement */}
                <div className="min-h-[120px] flex flex-col justify-center my-4">
                  <h2 className="text-xl md:text-2xl font-bold text-white leading-relaxed tracking-tight">
                    {lang === 'cantonese'
                      ? currentFocusQuestion.cantonese
                      : lang === 'zh_tw'
                      ? currentFocusQuestion.zh_tw
                      : currentFocusQuestion.en}
                  </h2>

                  {/* Secondary translation for clarity */}
                  {lang !== 'en' && (
                    <p className="text-xs md:text-sm text-slate-400 mt-2 font-mono italic">
                      "{currentFocusQuestion.en}"
                    </p>
                  )}
                  {lang === 'cantonese' && (
                    <p className="text-xs text-slate-400 mt-1">
                      書面標準：{currentFocusQuestion.zh_tw}
                    </p>
                  )}
                </div>

                {/* 5 Likert Option Buttons */}
                <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5 mt-6 sm:mt-8">
                  {SCALE_CONFIG.map((opt) => {
                    const isSelected = answers[currentFocusQuestion.id] === opt.val;
                    const label = opt[lang];

                    return (
                      <button
                        key={opt.val}
                        onClick={() => handleAnswer(currentFocusQuestion.id, opt.val)}
                        className={`group relative py-3 px-1 sm:p-4 rounded-xl border transition-all text-center flex flex-col items-center justify-center gap-1 sm:gap-2 active:scale-95 ${
                          isSelected
                            ? `${opt.activeClass} shadow-lg scale-[1.02]`
                            : `bg-slate-800/80 border-white/5 text-slate-300 ${opt.hoverClass} hover:text-white`
                        }`}
                      >
                        <span className={`w-8 h-8 sm:w-6 sm:h-6 rounded-lg sm:rounded-md flex items-center justify-center font-mono text-base sm:text-xs font-black sm:font-bold ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-slate-900 text-slate-300 group-hover:text-white'
                        }`}>
                          {opt.key}
                        </span>
                        <span className="text-xs md:text-sm font-semibold hidden sm:block">
                          {label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Mobile-only scale endpoints indicator */}
                <div className="flex sm:hidden justify-between items-center text-xs text-slate-400 mt-2 px-1">
                  <span>1 ({SCALE_CONFIG[0][lang]})</span>
                  <span>5 ({SCALE_CONFIG[4][lang]})</span>
                </div>

                {/* Navigation controls */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                  <button
                    onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                    disabled={currentIndex === 0}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-slate-300 border border-white/5 transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>{t.prevBtn}</span>
                  </button>

                  <p className="text-xs text-slate-400 hidden md:block">
                    {t.shortcutsHint}
                  </p>

                  <button
                    onClick={() => setCurrentIndex((prev) => Math.min(QUESTIONS_DATA.length - 1, prev + 1))}
                    disabled={currentIndex === QUESTIONS_DATA.length - 1}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-slate-300 border border-white/5 transition-all"
                  >
                    <span>{t.nextBtn}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* LIST MODE: DISPLAY ALL 96 QUESTIONS AT ONCE */}
            {mode === 'list' && (
              <div className="space-y-4">
                {/* Full list status banner */}
                <div className="p-3.5 bg-slate-900/90 border border-white/10 rounded-2xl flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="font-semibold text-white">
                      {lang === 'cantonese'
                        ? '96 題全覽總表（一次過顯示晒）'
                        : lang === 'zh_tw'
                        ? '96 題全覽總表（一次過完整顯示）'
                        : 'Full 96-Question Complete List'}
                    </span>
                  </div>
                  <span className="text-emerald-400 font-mono font-bold">
                    {answeredCount} / 96 ({progressPct}%)
                  </span>
                </div>

                <div className="space-y-3">
                  {QUESTIONS_DATA.map((q) => {
                    const currentVal = answers[q.id];
                    const qText = lang === 'cantonese' ? q.cantonese : lang === 'zh_tw' ? q.zh_tw : q.en;

                    return (
                      <div
                        key={q.id}
                        className="bg-slate-900/90 border border-white/10 rounded-2xl p-4 md:p-5 transition-all hover:border-violet-500/20"
                      >
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-start gap-2.5">
                            <span className="w-6 h-6 rounded-md bg-violet-600/20 text-violet-300 border border-violet-500/30 text-xs font-mono font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                              {q.id}
                            </span>
                            <div>
                              <p className="text-sm md:text-base font-semibold text-slate-200">
                                {qText}
                              </p>
                              {lang !== 'en' && (
                                <p className="text-xs text-slate-400 mt-0.5 italic">
                                  {q.en}
                                </p>
                              )}
                            </div>
                          </div>

                          {!blindMode && (
                            <span
                              className="px-2 py-0.5 rounded text-xs font-mono font-bold flex-shrink-0"
                              style={{
                                color: FUNCTIONS_INFO[q.function].color,
                                backgroundColor: `${FUNCTIONS_INFO[q.function].color}15`
                              }}
                            >
                              {q.function}
                            </span>
                          )}
                        </div>

                        {/* 5 Likert Buttons: Single row of 5 options */}
                        <div className="grid grid-cols-5 gap-1.5 sm:gap-2 pt-2 border-t border-white/5">
                          {SCALE_CONFIG.map((opt) => {
                            const isSelected = currentVal === opt.val;
                            return (
                              <button
                                key={opt.val}
                                onClick={() => handleAnswer(q.id, opt.val)}
                                className={`py-2 px-1 rounded-xl text-xs font-medium transition-all text-center flex flex-col items-center justify-center gap-0.5 active:scale-95 ${
                                  isSelected
                                    ? `${opt.activeClass} shadow-md`
                                    : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-white/5'
                                }`}
                              >
                                <span className="font-mono font-bold text-xs">{opt.key}</span>
                                <span className="hidden sm:inline text-xs text-slate-300 truncate">{opt[lang]}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom of list message */}
                <div className="p-4 bg-slate-900/70 border border-white/10 rounded-2xl flex items-center justify-between text-xs text-slate-400">
                  <span>
                    {lang === 'cantonese'
                      ? '已到 96 題最底端 • 請點擊下方「計算認知功能結果」'
                      : lang === 'zh_tw'
                      ? '已到 96 題最底端 • 請點擊下方「生成認知功能評估報告」'
                      : 'End of 96 questions reached • Click "Generate Cognitive Report" below'}
                  </span>
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-white/10 transition-all active:scale-95"
                  >
                    {lang === 'en' ? 'Back to Top ↑' : '回到頂端 ↑'}
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Floating Glass Action Bar for Submitting */}
            <div className="fixed bottom-4 left-4 right-4 max-w-4xl mx-auto z-30">
              <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-3 md:p-4 shadow-2xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsGridModalOpen(true)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-white/5 transition-all"
                  >
                    <Grid className="w-3.5 h-3.5 text-violet-400" />
                    <span>{t.viewGrid}</span>
                  </button>

                  <div className="text-xs text-slate-400 hidden sm:block">
                    {lang === 'cantonese'
                      ? `已填答 ${answeredCount} / ${totalCount} 題`
                      : lang === 'zh_tw'
                      ? `已填答 ${answeredCount} / ${totalCount} 題`
                      : `${answeredCount} of ${totalCount} answered`}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSubmit}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-lg ${
                      answeredCount === totalCount
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-emerald-950/50 scale-[1.02]'
                        : 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-950/50'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{t.submitBtn}</span>
                    {answeredCount < totalCount && (
                      <span className="text-xs opacity-75 hidden md:inline">
                        ({t.unansweredNote})
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= VIEW 3: REPORT ================= */}
        {viewState === 'report' && currentResult && (
          <ReportView
            result={currentResult}
            lang={lang}
            onRetake={handleRetake}
            onReviewAnswers={() => setIsReviewModalOpen(true)}
          />
        )}
      </main>

      {/* Persistent Site Footer */}
      <footer className="border-t border-white/10 bg-slate-950/80 py-8 text-xs text-slate-400 mt-auto">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <InyLogo variant="mark" size={36} className="h-6 w-auto block" />
            <span className="font-extrabold text-slate-300 tracking-wider">INSIDE YOU</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">
              {lang === 'cantonese'
                ? '榮格八大認知功能深度評估平台'
                : lang === 'zh_tw'
                ? '榮格八大認知功能深度評估平台'
                : 'Jungian 8 Cognitive Functions Assessment'}
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-xs">
            <span>© {new Date().getFullYear()} INSIDE YOU (iNY)</span>
            <span>•</span>
            <span>
              {lang === 'en'
                ? 'Data-Logic Model & Behavioral-Expression Model'
                : '數據邏輯派（Grant 規則模型）與行為表現派（Myers 現實模型）'}
            </span>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      <QuestionGridModal
        isOpen={isGridModalOpen}
        onClose={() => setIsGridModalOpen(false)}
        answers={answers}
        currentIndex={currentIndex}
        onSelectQuestion={(idx) => {
          setCurrentIndex(idx);
          if (viewState !== 'quiz') setViewState('quiz');
        }}
        lang={lang}
      />

      <QuestionsReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => {
          setIsReviewModalOpen(false);
          // Recalculate with updated answers
          if (currentResult) {
            const updated = calculateCognitiveFunctions(answers);
            setCurrentResult(updated);
          }
        }}
        answers={answers}
        onUpdateAnswer={(qId, val) => {
          setAnswers((prev) => ({ ...prev, [qId]: val }));
        }}
        lang={lang}
      />

      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        history={history}
        onSelectResult={(res) => {
          setCurrentResult(res);
          setAnswers(res.answers || {});
          setViewState('report');
        }}
        onClearHistory={() => setHistory([])}
        onDeleteHistoryItem={(idx) => {
          setHistory((prev) => prev.filter((_, i) => i !== idx));
        }}
        lang={lang}
      />

      <DualTrackModal
        isOpen={isDualTrackIntroModalOpen}
        onClose={() => setIsDualTrackIntroModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
