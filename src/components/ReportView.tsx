import React, { useState } from 'react';
import { AssessmentResult, ARCHETYPE_ROLES, SHADOW_ROLES } from '../utils/calculator';
import { FUNCTIONS_INFO, CognitiveFunction, MBTI_TYPES } from '../data/mbtiData';
import { QUESTIONS_DATA, QuestionItem } from '../data/questions';
import { RadarChart } from './RadarChart';
import { DualTrackModal } from './DualTrackModal';
import { EnergyBar, DichotomyBalanceCard } from './EnergyBar';
import {
  AppLang,
  resolveText,
  buildLocalized,
  REPORT_I18N_DEFS,
  DICHOTOMY_DESCS
} from '../data/i18n';
import {
  Share2,
  RotateCcw,
  Sparkles,
  Award,
  Compass,
  Layers,
  BarChart3,
  Check,
  Info,
  Flame,
  Shield,
  Lightbulb,
  Copy,
  X
} from 'lucide-react';

interface ReportViewProps {
  result: AssessmentResult;
  lang: 'cantonese' | 'zh_tw' | 'en';
  onRetake: () => void;
  onReviewAnswers: () => void;
}

export const ReportView: React.FC<ReportViewProps> = ({
  result,
  lang,
  onRetake,
  onReviewAnswers
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'stacks' | 'functions' | 'dichotomy'>('overview');
  const [copied, setCopied] = useState(false);
  const [isDualTrackModalOpen, setIsDualTrackModalOpen] = useState(false);
  const [selectedTypeKey, setSelectedTypeKey] = useState<'primary' | 'runnerUp' | 'myers'>('primary');

  const t = {
    ...buildLocalized(REPORT_I18N_DEFS, lang),
    title: lang === 'en' ? 'Jungian Cognitive Functions Assessment Report' : '榮格八大認知功能評估報告',
    primaryMatch: lang === 'en' ? 'Data-Logic Model (Grant Framework)' : '數據邏輯派（Grant 規則模型）',
    dichotomyDescEI: {
      left: resolveText(DICHOTOMY_DESCS.EI.left, lang),
      right: resolveText(DICHOTOMY_DESCS.EI.right, lang)
    },
    dichotomyDescNS: {
      left: resolveText(DICHOTOMY_DESCS.NS.left, lang),
      right: resolveText(DICHOTOMY_DESCS.NS.right, lang)
    },
    dichotomyDescTF: {
      left: resolveText(DICHOTOMY_DESCS.TF.left, lang),
      right: resolveText(DICHOTOMY_DESCS.TF.right, lang)
    },
    dichotomyDescJP: {
      left: resolveText(DICHOTOMY_DESCS.JP.left, lang),
      right: resolveText(DICHOTOMY_DESCS.JP.right, lang)
    }
  };

  const type = result.grantType;
  const runnerUp = result.runnerUpType;
  const hasMyersType = Boolean(result.myersType && MBTI_TYPES[result.myersType]);
  const myersTypeData = hasMyersType ? MBTI_TYPES[result.myersType] : null;

  const activeType =
    selectedTypeKey === 'primary'
      ? type
      : selectedTypeKey === 'runnerUp'
      ? runnerUp
      : (myersTypeData || type);

  const typeThemes = {
    primary: {
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      badgeText: lang === 'en' ? 'Primary Type' : '主傾向型態',
      accentText: 'text-emerald-300',
      cardActive: 'border-emerald-500/80 bg-emerald-950/40 ring-1 ring-emerald-500/50 shadow-lg shadow-emerald-950/50',
      cardHover: 'hover:border-emerald-500/40 hover:bg-slate-800/90',
      glow: 'bg-emerald-600/15',
      icon: Sparkles
    },
    runnerUp: {
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      badgeText: lang === 'en' ? 'Secondary Type' : '次傾向型態',
      accentText: 'text-amber-300',
      cardActive: 'border-amber-500/80 bg-amber-950/40 ring-1 ring-amber-500/50 shadow-lg shadow-amber-950/50',
      cardHover: 'hover:border-amber-500/40 hover:bg-slate-800/90',
      glow: 'bg-amber-600/15',
      icon: Award
    },
    myers: {
      badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
      badgeText: lang === 'en' ? 'Behavioral-Expression Model' : '行為表現派（Myers 現實模型）',
      accentText: 'text-sky-300',
      cardActive: 'border-sky-500/80 bg-sky-950/40 ring-1 ring-sky-500/50 shadow-lg shadow-sky-950/50',
      cardHover: 'hover:border-sky-500/40 hover:bg-slate-800/90',
      glow: 'bg-sky-600/15',
      icon: Compass
    }
  };

  const currentTheme = typeThemes[selectedTypeKey];
  const BadgeIcon = currentTheme.icon;

  const [copyFallbackText, setCopyFallbackText] = useState<string | null>(null);

  const handleCopySummary = () => {
    const isEn = lang === 'en';
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;

    const totalQuestions = QUESTIONS_DATA.length || 96;
    const answersRecord = result.answers || {};
    const answeredCount = Object.keys(answersRecord).filter(
      (id) => answersRecord[Number(id)] !== undefined && answersRecord[Number(id)] !== null
    ).length;
    const unansweredCount = Math.max(0, totalQuestions - answeredCount);

    const questionsByFunction: Record<string, QuestionItem[]> = {};
    QUESTIONS_DATA.forEach((q) => {
      if (!questionsByFunction[q.function]) {
        questionsByFunction[q.function] = [];
      }
      questionsByFunction[q.function].push(q);
    });
    Object.keys(questionsByFunction).forEach((fn) => {
      questionsByFunction[fn].sort((a, b) => a.id - b.id);
    });

    const lines = isEn
      ? [
          '# Jungian Cognitive Functions Assessment Result (for AI analysis)',
          '',
          '## Test Info',
          '- Test: INSIDE YOU (iNY)',
          '- Items: 96 questions, 1-5 Likert scale, about 11 to 13 items per function',
          `- Date: ${dateStr}`,
          `- Unanswered items: ${unansweredCount}`,
          '',
          '## Eight Function Scores (0-100)',
          ...result.rankedFunctions.map((f, i) => `${i + 1}. ${f.code} ${f.score}`),
          '',
          '## Four Dichotomies (Myers model, each pair sums to 100)',
          `- E ${result.dichotomy.E} / I ${result.dichotomy.I}`,
          `- N ${result.dichotomy.N} / S ${result.dichotomy.S}`,
          `- T ${result.dichotomy.T} / F ${result.dichotomy.F}`,
          `- J ${result.dichotomy.J} / P ${result.dichotomy.P}`,
          '',
          '## Type Comparison',
          `- Grant model: primary ${result.grantType.code} (${result.grantTypeMatchPct}% match), secondary ${result.runnerUpType.code} (${result.runnerUpMatchPct}% match)`,
          `- Myers model: ${result.myersType}`,
          '',
          '## Item Scores by Function (in question order, "-" = unanswered)',
          ...result.rankedFunctions.map((f) => {
            const fnQuestions = questionsByFunction[f.code] || [];
            const itemScores = fnQuestions.map((q) => {
              const val = answersRecord[q.id];
              return val === undefined || val === null ? '-' : String(val);
            });
            return `- ${f.code} (${fnQuestions.length} items): ${itemScores.join(',')}`;
          }),
          '',
          '## Notes',
          "- Function score = sum of that function's item scores, converted to 0-100 by item count.",
          '- Match % = similarity to the type\'s archetype, not an accuracy rate.',
          '- This assessment is a self-reflection tool, not a clinical or scientific diagnosis.'
        ]
      : [
          '# 榮格八大認知功能測驗結果（供 AI 分析）',
          '',
          '## 測驗資料',
          '- 測驗：INSIDE YOU (iNY)',
          '- 題數：96 題，1 至 5 分李克特量表，每項功能約 11 至 13 題',
          `- 日期：${dateStr}`,
          `- 未作答題數：${unansweredCount}`,
          '',
          '## 八大功能分數（0 至 100）',
          ...result.rankedFunctions.map((f, i) => `${i + 1}. ${f.code} ${f.score}`),
          '',
          '## 四維度傾向（Myers 模型，兩邊相加為 100）',
          `- E ${result.dichotomy.E} / I ${result.dichotomy.I}`,
          `- N ${result.dichotomy.N} / S ${result.dichotomy.S}`,
          `- T ${result.dichotomy.T} / F ${result.dichotomy.F}`,
          `- J ${result.dichotomy.J} / P ${result.dichotomy.P}`,
          '',
          '## 型態對照',
          `- Grant 規則模型：首選 ${result.grantType.code}（契合度 ${result.grantTypeMatchPct}%），次選 ${result.runnerUpType.code}（契合度 ${result.runnerUpMatchPct}%）`,
          `- Myers 模型：${result.myersType}`,
          '',
          '## 各功能逐題分數（按題號次序，- 代表未作答）',
          ...result.rankedFunctions.map((f) => {
            const fnQuestions = questionsByFunction[f.code] || [];
            const itemScores = fnQuestions.map((q) => {
              const val = answersRecord[q.id];
              return val === undefined || val === null ? '-' : String(val);
            });
            return `- ${f.code}（${fnQuestions.length} 題）：${itemScores.join(',')}`;
          }),
          '',
          '## 說明',
          '- 功能分數 = 該功能題目分數加總，按題數換算成 0 至 100。',
          '- 契合度 = 與型態原型的相似程度，並非準確率。',
          '- 本測驗屬自我反思工具，並非臨床或科學診斷。'
        ];
    const textToCopy = lines.join('\n');

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        })
        .catch(() => {
          setCopyFallbackText(textToCopy);
        });
    } else {
      setCopyFallbackText(textToCopy);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-24 animate-fadeIn">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/60 to-slate-900 border border-white/10 p-6 md:p-8 shadow-2xl mb-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className={`absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-all duration-500 ${currentTheme.glow}`}></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold border transition-all duration-300 ${currentTheme.badgeBg}`}>
                <BadgeIcon className="w-3.5 h-3.5" />
                {currentTheme.badgeText}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {new Date(result.completedAt).toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white font-mono">
                {activeType.code}
              </h1>
              <span className={`text-lg md:text-xl font-bold transition-colors duration-300 ${currentTheme.accentText}`}>
                {activeType.name[lang]}
              </span>
            </div>

            <p className="text-sm md:text-base font-medium text-slate-300 mt-1">
              {activeType.archetype[lang]}
            </p>
            <p className="text-xs md:text-sm text-slate-400 mt-2 max-w-xl italic">
              "{activeType.tagline[lang]}"
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto">
            {/* 主傾向型態與契合度 */}
            <button
              type="button"
              aria-pressed={selectedTypeKey === 'primary'}
              onClick={() => setSelectedTypeKey('primary')}
              className={`backdrop-blur-md border rounded-xl p-3 flex items-center justify-between gap-4 min-w-[210px] text-left transition-all duration-200 cursor-pointer active:scale-[0.98] ${
                selectedTypeKey === 'primary'
                  ? typeThemes.primary.cardActive
                  : `bg-slate-800/80 border-white/10 ${typeThemes.primary.cardHover}`
              }`}
              title={lang === 'en' ? 'Click to view Primary Type & Match' : '點選切換檢視主傾向型態'}
            >
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full transition-all ${selectedTypeKey === 'primary' ? 'bg-emerald-400 ring-2 ring-emerald-400/40 scale-110' : 'bg-slate-500'}`}></span>
                <span className="text-xs text-slate-300 font-medium">{t.matchScore}</span>
              </div>
              <span className="text-sm font-bold text-emerald-400 font-mono">
                {type.code} ({result.grantTypeMatchPct}%)
              </span>
            </button>

            {/* 次傾向型態與契合度 */}
            <button
              type="button"
              aria-pressed={selectedTypeKey === 'runnerUp'}
              onClick={() => setSelectedTypeKey('runnerUp')}
              className={`backdrop-blur-md border rounded-xl p-3 flex items-center justify-between gap-4 min-w-[210px] text-left transition-all duration-200 cursor-pointer active:scale-[0.98] ${
                selectedTypeKey === 'runnerUp'
                  ? typeThemes.runnerUp.cardActive
                  : `bg-slate-800/80 border-white/10 ${typeThemes.runnerUp.cardHover}`
              }`}
              title={lang === 'en' ? 'Click to view Secondary Type & Match' : '點選切換檢視次傾向型態'}
            >
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full transition-all ${selectedTypeKey === 'runnerUp' ? 'bg-amber-400 ring-2 ring-amber-400/40 scale-110' : 'bg-slate-500'}`}></span>
                <span className="text-xs text-slate-300 font-medium">{t.runnerUp}</span>
              </div>
              <span className="text-sm font-bold text-amber-400 font-mono">
                {runnerUp.code} ({result.runnerUpMatchPct}%)
              </span>
            </button>

            {/* 行為表現派結果 */}
            <button
              type="button"
              disabled={!hasMyersType}
              aria-pressed={selectedTypeKey === 'myers'}
              onClick={() => hasMyersType && setSelectedTypeKey('myers')}
              className={`backdrop-blur-md border rounded-xl p-3 flex items-center justify-between gap-4 min-w-[210px] text-left transition-all duration-200 ${
                !hasMyersType
                  ? 'bg-slate-800/40 border-white/5 opacity-40 cursor-not-allowed'
                  : selectedTypeKey === 'myers'
                  ? `${typeThemes.myers.cardActive} cursor-pointer active:scale-[0.98]`
                  : `bg-slate-800/80 border-white/10 ${typeThemes.myers.cardHover} cursor-pointer active:scale-[0.98]`
              }`}
              title={
                !hasMyersType
                  ? (lang === 'en' ? 'Myers Type data not found' : '無對應之 Myers 型態資料')
                  : lang === 'en'
                  ? 'Click to view Behavioral Model'
                  : '點選切換檢視行為表現派結果'
              }
            >
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full transition-all ${
                  !hasMyersType
                    ? 'bg-slate-600'
                    : selectedTypeKey === 'myers'
                    ? 'bg-sky-400 ring-2 ring-sky-400/40 scale-110'
                    : 'bg-slate-500'
                }`}></span>
                <span className="text-xs text-slate-300 font-medium">{t.myersDichotomy}</span>
              </div>
              <span className={`text-sm font-bold font-mono ${!hasMyersType ? 'text-slate-500' : 'text-sky-300'}`}>
                {result.myersType}
              </span>
            </button>

            <p className="text-xs text-slate-400 text-right pr-1">
              {lang === 'en'
                ? '* Resemblance to type archetype, not an accuracy score.'
                : '* 與該型態原型嘅相似程度，並非準確率。'}
            </p>
          </div>
        </div>

        {/* Action button bar */}
        <div className="relative z-10 flex flex-wrap items-center gap-2.5 mt-6 pt-5 border-t border-white/10">
          <button
            onClick={handleCopySummary}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white transition-all shadow-md active:scale-95"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Share2 className="w-3.5 h-3.5" />}
            {copied ? t.copiedText : t.copySummary}
          </button>

          <button
            onClick={onReviewAnswers}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 transition-all active:scale-95"
          >
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            {t.reviewQuestions}
          </button>

          <button
            onClick={onRetake}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/5 transition-all ml-auto active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {t.retake}
          </button>
        </div>
      </div>

      {/* 雙模型對照分析（內在思維與現實表現）卡片 */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-900/90 border border-white/10 p-5 md:p-6 shadow-xl mb-6 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-slate-950 font-bold shadow-md">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base md:text-lg font-bold text-white tracking-tight">
                  {lang === 'cantonese'
                    ? '雙模型對照分析（內在思維與現實表現）'
                    : lang === 'zh_tw'
                    ? '雙模型對照分析（內在思維與現實表現）'
                    : 'Dual-Model Comparison (Inner Cognition vs External Traits)'}
                </h2>
                <button
                  onClick={() => setIsDualTrackModalOpen(true)}
                  className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-slate-950 border border-emerald-500/30 text-xs font-bold flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-90"
                  title="點擊了解詳細原理"
                >
                  ?
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'cantonese'
                  ? '同時採用數據邏輯派（Grant 規則模型）與行為表現派（Myers 現實模型）進行雙模型對照'
                  : lang === 'zh_tw'
                  ? '同時採用數據邏輯派（Grant 規則模型）與行為表現派（Myers 現實模型）進行雙模型對照'
                  : 'Comparing Data-Logic Model (Grant Framework) against Behavioral-Expression Model (Myers Framework)'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsDualTrackModalOpen(true)}
            className="self-start sm:self-center px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-900/60 transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95"
          >
            <Info className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Methodology Details' : '原理詳解'}</span>
          </button>
        </div>

        {/* 雙軌對照雙欄 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* 軌道一：數據邏輯派（Grant 規則模型） */}
          <div className="bg-slate-800/70 border border-white/5 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  {lang === 'cantonese'
                    ? '軌道一：數據邏輯派（Grant 規則模型）'
                    : lang === 'zh_tw'
                    ? '軌道一：數據邏輯派（Grant 規則模型）'
                    : 'Track 1: Data-Logic Model (Grant Framework)'}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/25 font-semibold">
                  {lang === 'cantonese' ? '內在思維骨架' : lang === 'zh_tw' ? '內在思維骨架' : 'Inner Cognitive Engine'}
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-black font-mono text-white">
                  {type.code}
                </span>
                <span className="text-xs font-semibold text-slate-300">
                  {type.name[lang]}
                </span>
                <span className="ml-auto text-xs font-mono font-bold text-emerald-400">
                  {lang === 'en' ? `Match ${result.grantTypeMatchPct}%` : `契合度 ${result.grantTypeMatchPct}%`}
                </span>
              </div>
              <p className="text-xs text-slate-400 text-right mb-2">
                {lang === 'en'
                  ? 'Degree of resemblance to type archetype, not an accuracy score.'
                  : '與該型態原型嘅相似程度，並非準確率。'}
              </p>

              <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                {lang === 'cantonese'
                  ? '如「完美主義教官」，嚴格按照內外向交替規則排列 4 個核心功能：'
                  : lang === 'zh_tw'
                  ? '如「完美主義教官」，嚴格按照內外向交替規則排列 4 個核心認知功能：'
                  : 'Like a rigorous theorist, strictly enforces alternating polarity across the 4 core functions:'}
              </p>
            </div>

            <div className="flex items-center gap-1.5 pt-2.5 border-t border-white/5 overflow-x-auto scrollbar-none">
              {type.stack.map((fn, idx) => (
                <span
                  key={fn}
                  className="text-xs font-mono font-bold px-2 py-1 rounded-md bg-slate-900 border border-white/10 text-slate-200 flex items-center gap-1"
                >
                  <span className="text-xs text-slate-400">#{idx + 1}</span>
                  <span style={{ color: FUNCTIONS_INFO[fn].color }}>{fn}</span>
                </span>
              ))}
            </div>
          </div>

          {/* 軌道二：行為表現派（Myers 現實模型） */}
          <div className="bg-slate-800/70 border border-white/5 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-violet-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-violet-400"></span>
                  {lang === 'cantonese'
                    ? '軌道二：行為表現派（Myers 現實模型）'
                    : lang === 'zh_tw'
                    ? '軌道二：行為表現派（Myers 現實模型）'
                    : 'Track 2: Behavioral-Expression Model (Myers Framework)'}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-violet-500/15 text-violet-300 border border-violet-500/25 font-semibold">
                  {lang === 'cantonese' ? '現實行為表現' : lang === 'zh_tw' ? '現實行為表現' : 'Observed Behaviors'}
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-black font-mono text-sky-300">
                  {result.myersType}
                </span>
                <span className="text-xs font-semibold text-slate-300">
                  {MBTI_TYPES[result.myersType]?.name[lang] || result.myersType}
                </span>
              </div>

              <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                {lang === 'cantonese'
                  ? '如「實戰派教練」，特別加權你在現實生活與日常溝通中最常展現的行為習慣：'
                  : lang === 'zh_tw'
                  ? '如「實戰派教練」，特別加權您在現實生活中最常表現出來的行為與社交傾向：'
                  : 'Like an empirical coach, weights your observable habits and everyday situational choices:'}
              </p>
            </div>

            <div className="grid grid-cols-4 gap-1.5 pt-2.5 border-t border-white/5 text-center">
              {(() => {
                const char1 = (result.myersType?.[0] as 'E' | 'I') || (result.dichotomy.E >= 50 ? 'E' : 'I');
                const char2 = (result.myersType?.[1] as 'N' | 'S') || (result.dichotomy.N >= 50 ? 'N' : 'S');
                const char3 = (result.myersType?.[2] as 'T' | 'F') || (result.dichotomy.T >= 50 ? 'T' : 'F');
                const char4 = (result.myersType?.[3] as 'J' | 'P') || (result.dichotomy.J >= 50 ? 'J' : 'P');
                return (
                  <>
                    <div className="bg-slate-900 border border-white/5 rounded p-1">
                      <span className="text-xs text-slate-400 block font-mono">
                        {char1}
                      </span>
                      <span className="text-xs font-mono font-bold text-sky-400">
                        {result.dichotomy[char1]}%
                      </span>
                    </div>
                    <div className="bg-slate-900 border border-white/5 rounded p-1">
                      <span className="text-xs text-slate-400 block font-mono">
                        {char2}
                      </span>
                      <span className="text-xs font-mono font-bold text-violet-400">
                        {result.dichotomy[char2]}%
                      </span>
                    </div>
                    <div className="bg-slate-900 border border-white/5 rounded p-1">
                      <span className="text-xs text-slate-400 block font-mono">
                        {char3}
                      </span>
                      <span className="text-xs font-mono font-bold text-blue-400">
                        {result.dichotomy[char3]}%
                      </span>
                    </div>
                    <div className="bg-slate-900 border border-white/5 rounded p-1">
                      <span className="text-xs text-slate-400 block font-mono">
                        {char4}
                      </span>
                      <span className="text-xs font-mono font-bold text-teal-400">
                        {result.dichotomy[char4]}%
                      </span>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>

        {/* 雙模型對照總結判定 */}
        <div className={`p-3.5 rounded-xl border flex items-start gap-3 ${
          type.code === result.myersType
            ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
            : 'bg-violet-950/40 border-violet-500/30 text-violet-200'
        }`}>
          <div className={`p-1.5 rounded-lg flex-shrink-0 ${
            type.code === result.myersType ? 'bg-emerald-500/20 text-emerald-300' : 'bg-violet-500/20 text-violet-300'
          }`}>
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-xs leading-relaxed">
            {type.code === result.myersType ? (
              <p>
                <strong>
                  {lang === 'en' ? '💡 Consistent: ' : '💡 兩個模型結果相同（Consistent）：'}
                </strong>
                {lang === 'cantonese'
                  ? '兩個模型結果相同，代表你嘅答案喺兩種計算方式下都指向同一類型。'
                  : lang === 'zh_tw'
                  ? '兩個模型結果相同，代表你的答案在兩種計算方式下都指向同一類型。'
                  : 'Both models yield identical results, indicating that your answers converge on the same type under both calculation frameworks.'}
              </p>
            ) : (
              <p>
                <strong>
                  {lang === 'en' ? '💡 Different Results: ' : '💡 兩個模型結果不同（Different Results）：'}
                </strong>
                {lang === 'cantonese'
                  ? '兩個模型結果唔同，代表你嘅答案喺兩種計算方式下排序有差異，可以參考下面嘅百分比自行判斷。'
                  : lang === 'zh_tw'
                  ? '兩個模型結果不同，代表你的答案在兩種計算方式下排序有差異，可以參考下方的百分比自行判斷。'
                  : 'The two models yield differing results, indicating variance in function rank ordering across the two calculations. Refer to the percentages below for self-evaluation.'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto p-1.5 bg-slate-900/90 backdrop-blur-md rounded-xl border border-white/10 mb-6 scrollbar-none">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-violet-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Compass className="w-4 h-4" />
          {t.overviewTab}
        </button>

        <button
          onClick={() => setActiveTab('stacks')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'stacks'
              ? 'bg-violet-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Layers className="w-4 h-4" />
          {t.stacksTab}
        </button>

        <button
          onClick={() => setActiveTab('functions')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'functions'
              ? 'bg-violet-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          {t.functionsTab}
        </button>

        <button
          onClick={() => setActiveTab('dichotomy')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'dichotomy'
              ? 'bg-violet-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Award className="w-4 h-4" />
          {t.dichotomyTab}
        </button>
      </div>

      {/* Tab Content 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Radar Chart & Top 4 Stack summary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/10 p-5 flex flex-col items-center justify-center">
              <h3 className="text-sm font-bold text-slate-200 mb-2 flex items-center gap-2 self-start">
                <Compass className="w-4 h-4 text-violet-400" />
                {lang === 'en' ? '8 Cognitive Functions Radar' : '8大認知功能雷達圖'}
              </h3>
              <RadarChart scores={result.normalizedScores} lang={lang} />
            </div>

            <div className="lg:col-span-6 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/10 p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-400" />
                  {lang === 'en' ? 'Function Stacks' : '榮格功能位階簡圖'}
                </h3>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  {activeType.stack.map((fnCode, idx) => {
                    const fnInfo = FUNCTIONS_INFO[fnCode];
                    const score = result.normalizedScores[fnCode];
                    const roleTitle = [t.heroRole, t.parentRole, t.childRole, t.inferiorRole][idx];

                    return (
                      <div
                        key={fnCode}
                        className="bg-slate-800/70 border border-white/5 rounded-xl p-3 flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-slate-300 tracking-wider">
                            {roleTitle}
                          </span>
                          <span
                            className="text-xs font-bold font-mono px-1.5 py-0.5 rounded"
                            style={{ color: fnInfo.color, backgroundColor: `${fnInfo.color}15` }}
                          >
                            {score}%
                          </span>
                        </div>
                        <div className="text-base font-bold font-mono text-white flex items-center gap-1.5">
                          <span style={{ color: fnInfo.color }}>{fnCode}</span>
                          <span className="text-xs font-normal text-slate-300">
                            {fnInfo.name[lang].split(' ')[1]}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                          {fnInfo.shortDesc[lang]}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Notable figures */}
              <div className="pt-3 border-t border-white/10">
                <span className="text-xs font-semibold text-slate-400 block mb-2">
                  {t.famousFigures}:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeType.famousExamples.map((name) => (
                    <span
                      key={name}
                      className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-white/5 font-medium"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Strengths and Growth Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/10 p-5">
              <h3 className="text-sm font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                {t.coreStrengths}
              </h3>
              <ul className="space-y-2.5">
                {activeType.strengths[lang].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/10 p-5">
              <h3 className="text-sm font-bold text-amber-400 mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                {t.growthAdvice}
              </h3>
              <ul className="space-y-2.5">
                {activeType.growthAreas[lang].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 2: Stacks & Shadow */}
      {activeTab === 'stacks' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Conscious Stacks (Hero, Parent, Child, Inferior) */}
          <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/10 p-5 md:p-6">
            <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-400" />
              {lang === 'en' ? 'Primary Ego Stack' : '意識四階功能'}
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              {t.consciousDesc}
            </p>

            <div className="space-y-4">
              {activeType.stack.map((fnCode, idx) => {
                const fnInfo = FUNCTIONS_INFO[fnCode];
                const score = result.normalizedScores[fnCode];
                const roleDef = ARCHETYPE_ROLES[idx];
                const desc = lang === 'cantonese' ? roleDef.descCantonese : lang === 'en' ? roleDef.descEn : roleDef.descZh;
                const roleTitle = roleDef.roleName ? roleDef.roleName[lang] : roleDef.role;

                return (
                  <div
                    key={fnCode}
                    className="bg-slate-800/60 border border-white/5 rounded-xl p-4 transition-all hover:border-violet-500/30"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-slate-700/80 text-xs font-mono font-bold flex items-center justify-center text-slate-300">
                          {idx + 1}
                        </span>
                        <span className="text-sm font-bold text-violet-300">
                          {roleTitle}
                        </span>
                        <span className="text-xs text-slate-400">
                          — {fnInfo.name[lang]}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div
                          role="progressbar"
                          aria-valuenow={score}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${roleTitle} (${fnCode} ${fnInfo.name[lang]})`}
                          className="w-24 bg-slate-700 h-2 rounded-full overflow-hidden"
                        >
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${score}%`, backgroundColor: fnInfo.color }}
                          ></div>
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-200 min-w-[32px] text-right">
                          {score}%
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 mb-2 font-medium">
                      {desc}
                    </p>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {fnInfo.fullDesc[lang]}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {(fnInfo.keywords[lang] || fnInfo.keywords.en).map((kw) => (
                        <span
                          key={kw}
                          className="text-xs px-2 py-0.5 rounded bg-slate-900/60 text-slate-300 border border-white/5 font-medium"
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

          {/* Shadow Stacks */}
          <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/10 p-5 md:p-6">
            <h3 className="text-base font-bold text-amber-300 mb-1 flex items-center gap-2 flex-wrap">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>{t.shadowTitle}</span>
              <span className="text-xs font-normal text-amber-400/80 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                {lang === 'en' ? 'Theoretical inference, for reference only' : '屬理論推測，僅供參考'}
              </span>
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              {t.shadowDesc}
            </p>

            <div className="space-y-4">
              {activeType.shadowStack.map((fnCode, idx) => {
                const fnInfo = FUNCTIONS_INFO[fnCode];
                const score = result.normalizedScores[fnCode];
                const roleDef = SHADOW_ROLES[idx];
                const desc = lang === 'cantonese' ? roleDef.descCantonese : lang === 'en' ? roleDef.descEn : roleDef.descZh;
                const roleTitle = roleDef.roleName ? roleDef.roleName[lang] : roleDef.role;

                return (
                  <div
                    key={fnCode}
                    className="bg-slate-800/40 border border-white/5 rounded-xl p-4 transition-all hover:border-amber-500/30"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-amber-950/40 border border-amber-500/20 text-xs font-mono font-bold flex items-center justify-center text-amber-300">
                          {idx + 5}
                        </span>
                        <span className="text-sm font-bold text-amber-300">
                          {roleTitle}
                        </span>
                        <span className="text-xs text-slate-400">
                          — {fnInfo.name[lang]}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div
                          role="progressbar"
                          aria-valuenow={score}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${roleTitle} (${fnCode} ${fnInfo.name[lang]})`}
                          className="w-24 bg-slate-700 h-2 rounded-full overflow-hidden"
                        >
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${score}%`, backgroundColor: fnInfo.color }}
                          ></div>
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-200 min-w-[32px] text-right">
                          {score}%
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 mb-2 font-medium">
                      {desc}
                    </p>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {fnInfo.fullDesc[lang]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 3: 8 Functions Ranking */}
      {activeTab === 'functions' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/10 p-5 md:p-6">
            <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-violet-400" />
              {lang === 'en' ? '8 Functions Ranking & Scores' : '8大認知功能總排名與得分'}
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              {t.rankingDesc}
            </p>

            <div className="space-y-3">
              {result.rankedFunctions.map((item, index) => {
                const fnInfo = FUNCTIONS_INFO[item.code];
                return (
                  <div
                    key={item.code}
                    className="bg-slate-800/70 border border-white/5 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all hover:bg-slate-800/90"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-lg text-xs font-mono font-bold flex items-center justify-center ${
                        index === 0
                          ? 'bg-amber-400 text-slate-950 font-black'
                          : index === 1
                          ? 'bg-slate-300 text-slate-950'
                          : index === 2
                          ? 'bg-amber-700/80 text-white'
                          : 'bg-slate-700 text-slate-400'
                      }`}>
                        #{index + 1}
                      </span>

                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className="text-base font-bold font-mono"
                            style={{ color: fnInfo.color }}
                          >
                            {item.code}
                          </span>
                          <span className="text-sm font-semibold text-slate-200">
                            {fnInfo.name[lang]}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-white/5">
                            {fnInfo.orientation} • {fnInfo.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 max-w-xl">
                          {fnInfo.shortDesc[lang]}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                      <div
                        role="progressbar"
                        aria-valuenow={item.score}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${item.code} (${fnInfo.name[lang]})`}
                        className="w-32 bg-slate-950 h-2.5 rounded-full overflow-hidden border border-white/5"
                      >
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${item.score}%`,
                            backgroundColor: fnInfo.color
                          }}
                        ></div>
                      </div>
                      <span className="text-base font-bold font-mono text-white min-w-[45px] text-right">
                        {item.score}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 4: Myers Dichotomy */}
      {activeTab === 'dichotomy' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/10 p-5 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
              <div>
                <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
                  <Award className="w-4 h-4 text-sky-400" />
                  {lang === 'en' ? 'Axis Energy Distribution' : '軸心能量分佈天平'}
                </h3>
                <p className="text-xs text-slate-400">
                  {t.dichotomySubtitle}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* E vs I */}
              <DichotomyBalanceCard
                leftLabel={lang === 'en' ? 'Extraversion (E)' : '外向 (E)'}
                leftPct={result.dichotomy.E}
                leftColorClass="bg-sky-500"
                leftActiveTextClass="text-sky-300 font-bold"
                leftDesc={t.dichotomyDescEI.left}
                rightLabel={lang === 'en' ? 'Introversion (I)' : '內向 (I)'}
                rightPct={result.dichotomy.I}
                rightColorClass="bg-indigo-500"
                rightActiveTextClass="text-indigo-300 font-bold"
                rightDesc={t.dichotomyDescEI.right}
                ariaLabel={lang === 'en' ? 'Extraversion (E) vs Introversion (I) Axis' : '外向 (E) vs 內向 (I) 軸'}
              />

              {/* N vs S */}
              <DichotomyBalanceCard
                leftLabel={lang === 'en' ? 'Intuition (N)' : '直覺 (N)'}
                leftPct={result.dichotomy.N}
                leftColorClass="bg-violet-500"
                leftActiveTextClass="text-violet-300 font-bold"
                leftDesc={t.dichotomyDescNS.left}
                rightLabel={lang === 'en' ? 'Sensing (S)' : '實感 (S)'}
                rightPct={result.dichotomy.S}
                rightColorClass="bg-emerald-500"
                rightActiveTextClass="text-emerald-300 font-bold"
                rightDesc={t.dichotomyDescNS.right}
                ariaLabel={lang === 'en' ? 'Intuition (N) vs Sensing (S) Axis' : '直覺 (N) vs 實感 (S) 軸'}
              />

              {/* T vs F */}
              <DichotomyBalanceCard
                leftLabel={lang === 'en' ? 'Thinking (T)' : '思考 (T)'}
                leftPct={result.dichotomy.T}
                leftColorClass="bg-blue-500"
                leftActiveTextClass="text-blue-300 font-bold"
                leftDesc={t.dichotomyDescTF.left}
                rightLabel={lang === 'en' ? 'Feeling (F)' : '情感 (F)'}
                rightPct={result.dichotomy.F}
                rightColorClass="bg-pink-500"
                rightActiveTextClass="text-pink-300 font-bold"
                rightDesc={t.dichotomyDescTF.right}
                ariaLabel={lang === 'en' ? 'Thinking (T) vs Feeling (F) Axis' : '思考 (T) vs 情感 (F) 軸'}
              />

              {/* J vs P */}
              <DichotomyBalanceCard
                leftLabel={lang === 'en' ? 'Judging (J)' : '判斷 (J)'}
                leftPct={result.dichotomy.J}
                leftColorClass="bg-teal-500"
                leftActiveTextClass="text-teal-300 font-bold"
                leftDesc={t.dichotomyDescJP.left}
                rightLabel={lang === 'en' ? 'Perceiving (P)' : '感知 (P)'}
                rightPct={result.dichotomy.P}
                rightColorClass="bg-amber-500"
                rightActiveTextClass="text-amber-300 font-bold"
                rightDesc={t.dichotomyDescJP.right}
                ariaLabel={lang === 'en' ? 'Judging (J) vs Perceiving (P) Axis' : '判斷 (J) vs 感知 (P) 軸'}
              />
            </div>
          </div>
        </div>
      )}

      {/* 免責聲明 */}
      <div className="mt-10 pt-6 border-t border-white/5 text-center">
        <p className="text-xs text-slate-400 tracking-wide">
          {lang === 'en'
            ? 'This assessment is a self-reflection tool, not a clinical or scientific diagnosis.'
            : '本測驗屬自我反思工具，並非臨床或科學診斷。'}
        </p>
      </div>

      {/* 手動複製彈出視窗（當剪貼簿 API 失敗時） */}
      {copyFallbackText && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-lg w-full shadow-2xl relative">
            <button
              onClick={() => setCopyFallbackText(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30 flex items-center justify-center">
                <Copy className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  {lang === 'en' ? 'Copy Summary Manually' : '手動複製測驗摘要'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {lang === 'en'
                    ? 'Automatic clipboard access was blocked. Please copy the text below:'
                    : '系統無法自動存取剪貼簿，請長按或全選下方文字進行複製：'}
                </p>
              </div>
            </div>

            <textarea
              readOnly
              rows={8}
              value={copyFallbackText}
              onFocus={(e) => e.target.select()}
              className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-violet-500 selection:bg-violet-600 selection:text-white resize-none"
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  try {
                    navigator.clipboard.writeText(copyFallbackText);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2500);
                  } catch {}
                  setCopyFallbackText(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white transition-all shadow-md"
              >
                {lang === 'en' ? 'Done' : '完成'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dual Track Explanation Modal */}
      <DualTrackModal
        isOpen={isDualTrackModalOpen}
        onClose={() => setIsDualTrackModalOpen(false)}
        lang={lang}
      />
    </div>
  );
};
