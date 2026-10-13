export type AppLang = 'cantonese' | 'zh_tw' | 'en';

/**
 * Universal text translation helper for Chinese / English dictionaries.
 * When a sentence is identical in Cantonese and Traditional Chinese (zh_tw),
 * specify `zh` once; it will automatically resolve for both 'cantonese' and 'zh_tw'.
 * If Cantonese has specific colloquial phrasing, specify `cantonese` to override `zh`.
 */
export interface TranslatableText {
  zh?: string;
  cantonese?: string;
  zh_tw?: string;
  en: string;
}

export function resolveText(item: TranslatableText, lang: AppLang): string {
  if (lang === 'en') return item.en;
  if (lang === 'cantonese') return item.cantonese ?? item.zh ?? item.zh_tw ?? '';
  return item.zh_tw ?? item.zh ?? item.cantonese ?? '';
}

/**
 * Helper to build a localized object for a specific language where common
 * Chinese strings only need to be written once in `zh`.
 */
export function buildLocalized<T extends Record<string, TranslatableText>>(
  defs: T,
  lang: AppLang
): { [K in keyof T]: string } {
  const result: Record<string, string> = {};
  for (const key of Object.keys(defs)) {
    result[key] = resolveText(defs[key], lang);
  }
  return result as { [K in keyof T]: string };
}

// ==========================================
// 1. APP & QUIZ GENERAL TRANSLATIONS
// ==========================================
export const APP_I18N_DEFS = {
  appName: {
    zh: 'INSIDE YOU (iNY) • 榮格八大認知功能評估',
    en: 'INSIDE YOU (iNY) • Jungian Cognitive Functions Assessment'
  },
  tagline: {
    zh: '結合影子人格（Shadow Functions）深度拆解',
    en: 'In-Depth Analysis Combining Shadow Functions'
  },
  startBtn: {
    zh: '96 題深度心理測驗',
    en: 'Start 96-Item In-Depth Assessment'
  },
  resumeBtn: {
    cantonese: '繼續上次測驗',
    zh_tw: '繼續上次未完成評估',
    en: 'Resume Incomplete Draft'
  },
  disclaimerNote: {
    cantonese: '本測驗屬自我反思工具，並非臨床或科學診斷。',
    zh_tw: '本測驗屬自我反思工具，並非臨床或科學診斷。',
    en: 'This assessment is a self-reflection tool, not a clinical or scientific diagnosis.'
  },
  unansweredNote: {
    cantonese: '未填寫題目將以「中立」計入',
    zh_tw: '未填答題目將以「中立」計入',
    en: 'Unanswered questions default to Neutral'
  },
  focusMode: {
    zh: '沉浸模式',
    en: 'Focus Mode'
  },
  listMode: {
    zh: '清單模式',
    en: 'List Mode'
  },
  autoAdvanceLabel: {
    zh: '選完自動下一題',
    en: 'Auto-Advance'
  },
  blindModeLabel: {
    zh: '盲測模式（隱藏功能代碼）',
    en: 'Blind Mode (Hide Function Codes)'
  },
  viewGrid: {
    zh: '題目導航',
    en: 'Question Index'
  },
  historyTitle: {
    zh: '歷史記錄',
    en: 'History'
  },
  reviewTitle: {
    cantonese: '覆核修改',
    zh_tw: '回顧覆核',
    en: 'Review Answers'
  },
  submitBtn: {
    cantonese: '計算認知功能結果',
    zh_tw: '生成認知功能評估報告',
    en: 'Generate Cognitive Report'
  },
  prevBtn: {
    zh: '上一題',
    en: 'Previous'
  },
  nextBtn: {
    zh: '下一題',
    en: 'Next'
  },
  questionOf: {
    zh: '題',
    en: 'Question'
  },
  resetProgress: {
    zh: '重設進度',
    en: 'Reset Progress'
  },
  backToTop: {
    zh: '回到頂端 ↑',
    en: 'Back to Top ↑'
  },
  shortcutsHint: {
    cantonese: '鍵盤快速鍵：按 [1-5] 選答案，[← / →] 切換上一題/下一題',
    zh_tw: '鍵盤快捷鍵：按數字鍵 [1-5] 直接作答，[← / →] 上一題/下一題',
    en: 'Keyboard shortcuts: Press [1-5] to answer, [← / →] to navigate'
  },
  aboutTitle: {
    zh: '榮格八大認知功能架構簡介',
    en: 'About Jungian 8 Cognitive Functions'
  },
  aboutDesc: {
    cantonese: '榮格心理學認為，人的認知由四大心理活動（感知：感覺與直覺；判斷：思考與情感）與兩種態度方向（外向與內向）組合而成，共 8 種核心功能：',
    zh_tw: '榮格心理學認為，人的心智由四大心理歷程（感知：感覺與直覺；判斷：思考與情感）與兩種態度方向（外向與內向）交織而成，共有 8 種核心功能：',
    en: 'Jungian analytical psychology outlines mental processes across Perceiving (Sensing/Intuition) and Judging (Thinking/Feeling), directed either Extraverted or Introverted, forming 8 distinct functions:'
  },
  perceivingLabel: {
    cantonese: '感知維度',
    zh_tw: '感知向度',
    en: 'Perceiving Axes'
  },
  judgingLabel: {
    cantonese: '判斷維度',
    zh_tw: '判斷向度',
    en: 'Judging Axes'
  },
  draftBanner: {
    cantonese: '發現先前未完成的草稿記錄',
    zh_tw: '已偵測到先前未完成的作答進度',
    en: 'Incomplete progress saved locally'
  },
  scalePill: {
    zh: '96 題標準量表',
    en: '96-Item Standard Scale'
  },
  durationPill: {
    zh: '約 8 - 12 分鐘',
    en: 'Approx. 8 - 12 Mins'
  },
  dualTrackPill: {
    zh: '雙模型對照',
    en: 'Dual-Model Comparison'
  },
  dualTrackTooltip: {
    zh: '點擊了解「雙模型對照」原理',
    en: 'Click to learn about Dual-Model Comparison methodology'
  }
};

// ==========================================
// 2. 5-POINT SCALE OPTIONS
// ==========================================
export const SCALE_CONFIG_DEFS = [
  { val: 1, key: '1', zh: '非常不符合', en: 'Strongly Disagree' },
  { val: 2, key: '2', zh: '不太符合', en: 'Disagree' },
  { val: 3, key: '3', zh: '中立 / 視情況', en: 'Neutral / Depends' },
  { val: 4, key: '4', zh: '比較符合', en: 'Agree' },
  { val: 5, key: '5', zh: '非常符合', en: 'Strongly Agree' }
];

// ==========================================
// 3. REPORT VIEW TRANSLATIONS
// ==========================================
export const REPORT_I18N_DEFS = {
  primaryType: {
    zh: '主傾向型態',
    en: 'Primary Type'
  },
  secondaryType: {
    zh: '次傾向型態',
    en: 'Secondary Type'
  },
  myersDichotomy: {
    zh: '行為表現派（Myers 現實模型）',
    en: 'Behavioral-Expression Model (Myers Framework)'
  },
  runnerUp: {
    zh: '次傾向型態與契合度',
    en: 'Secondary Match & Consistency'
  },
  matchScore: {
    zh: '主傾向型態與契合度',
    en: 'Primary Type & Alignment'
  },
  overviewTab: {
    zh: '全覽雷達與摘要',
    en: 'Overview & Radar'
  },
  stacksTab: {
    zh: '四階功能與影子人格',
    en: 'Ego Stacks & Shadow Functions'
  },
  functionsTab: {
    zh: '8大功能詳細排名',
    en: '8 Functions Ranking'
  },
  dichotomyTab: {
    zh: '軸心能量分佈天平',
    en: 'Axis Energy Distribution'
  },
  archetypeTitle: {
    zh: '原型稱號',
    en: 'Archetype Title'
  },
  coreStrengths: {
    zh: '核心天賦與優勢',
    en: 'Core Strengths'
  },
  growthAdvice: {
    zh: '成長建議與盲點提示',
    en: 'Development Pathways & Blindspots'
  },
  famousFigures: {
    zh: '代表人物',
    en: 'Notable Figures'
  },
  copySummary: {
    zh: '複製評估摘要',
    en: 'Copy Profile Summary'
  },
  copiedText: {
    zh: '已複製到剪貼簿！',
    en: 'Copied to clipboard!'
  },
  retake: {
    zh: '重新測驗',
    en: 'Retake Assessment'
  },
  reviewQuestions: {
    cantonese: '查看題目答案',
    zh_tw: '回顧答題記錄',
    en: 'Review Answers'
  },
  heroRole: {
    zh: '主導功能',
    en: 'Dominant (Hero)'
  },
  parentRole: {
    zh: '輔助功能',
    en: 'Auxiliary (Parent)'
  },
  childRole: {
    zh: '第三功能',
    en: 'Tertiary (Child)'
  },
  inferiorRole: {
    zh: '劣勢功能',
    en: 'Inferior (Anima)'
  },
  shadowTitle: {
    zh: '影子人格（Shadow Functions）',
    en: 'Shadow Functions'
  },
  shadowNote: {
    zh: '屬理論推測，僅供參考',
    en: 'Theoretical inference, for reference only'
  },
  shadowDesc: {
    cantonese: '潛藏於潛意識深處的四個防禦機制，在壓力或極端狀態下被觸發。',
    zh_tw: '潛藏於潛意識深處的四個防禦機制，在壓力或極端情境下被喚醒。',
    en: 'Subconscious defense mechanisms activated under acute tension and stress.'
  },
  consciousDesc: {
    zh: '日常生活中最常調用並建立自我認同的核心功能體系。',
    en: 'Core cognitive processes most frequently deployed in conscious daily functioning.'
  },
  rankingDesc: {
    zh: '依據測驗 96 題答題加權計算之正規化百分比（0-100%）。',
    en: 'Normalized energy spectrum (0-100%) calculated across 96 questions.'
  },
  rank: {
    zh: '排名',
    en: 'Rank'
  },
  functionName: {
    zh: '功能名稱',
    en: 'Function'
  },
  score: {
    zh: '得分',
    en: 'Score'
  },
  description: {
    zh: '功能定義',
    en: 'Definition'
  },
  dichotomySubtitle: {
    cantonese: '基於各認知功能軸心能量分佈在二元維度上的加權統計。',
    zh_tw: '基於各認知功能軸心能量分佈在二元向度上的加權統計。',
    en: 'Calculated Axis Energy Distribution across binary cognitive polarities.'
  },
  prototypeFitNote: {
    zh: '與該型態原型嘅相似程度，並非準確率。',
    en: 'Degree of resemblance to the prototype, not an accuracy percentage.'
  },
  disclaimer: {
    zh: '本測驗屬自我反思工具，並非臨床或科學診斷。',
    en: 'This assessment is a self-reflection tool, not a clinical or scientific diagnosis.'
  },
  track1Title: {
    zh: '軌道一：數據邏輯派（Grant 規則模型）',
    en: 'Track 1: Data-Logic Model (Grant Framework)'
  },
  track1Tag: {
    zh: '內在思維骨架',
    en: 'Inner Cognitive Skeleton'
  },
  track2Title: {
    zh: '軌道二：行為表現派（Myers 現實模型）',
    en: 'Track 2: Behavioral-Expression Model (Myers Framework)'
  },
  track2Tag: {
    zh: '現實外顯習慣',
    en: 'Expressive Behavioral Style'
  },
  consistentMsg: {
    cantonese: '兩個模型結果相同，代表你嘅答案喺兩種計算方式下都指向同一類型。',
    zh_tw: '兩個模型結果相同，代表你的答案在兩種計算方式下都指向同一類型。',
    en: 'Both models converge on the exact same archetype. Your cognitive structure matches your external behavioral style consistently.'
  },
  divergentMsg: {
    cantonese: '兩個模型結果唔同，代表你嘅答案喺兩種計算方式下排序有差異，可以參考下面嘅百分比自行判斷。',
    zh_tw: '兩個模型結果不同，代表你的答案在兩種計算方式下排序有差異，可以參考下方的百分比自行判斷。',
    en: 'The two models indicate slight variance between your cognitive baseline and expressive behavior. Review the percentages below to interpret your profile.'
  },
  fallbackModalTitle: {
    zh: '手動複製測驗摘要',
    en: 'Copy Summary Manually'
  },
  fallbackModalDesc: {
    zh: '瀏覽器未能自動存取剪貼簿，請直接複製以下文字：',
    en: 'Clipboard access was unavailable. Please copy the text below:'
  },
  selectAll: {
    zh: '全選文字',
    en: 'Select All'
  },
  selected: {
    zh: '已選取',
    en: 'Selected'
  },
  close: {
    zh: '完成',
    en: 'Done'
  }
};

// Dichotomy descriptions for ReportView Tab 4
export const DICHOTOMY_DESCS = {
  EI: {
    left: { zh: '獲取外部能量與行動', en: 'External energy engagement & action' },
    right: { zh: '深入內心獨處與沈澱', en: 'Internal introspection & depth' }
  },
  NS: {
    left: { zh: '概念抽象、未來可能性', en: 'Abstract ideation & future foresight' },
    right: { zh: '具體細節、過往與當下實踐', en: 'Concrete facts & empirical grounding' }
  },
  TF: {
    left: { zh: '理性邏輯、條理與真理', en: 'Logical systems, truth & principles' },
    right: { zh: '人際價值觀、同理心與和諧', en: 'Interpersonal values, empathy & harmony' }
  },
  JP: {
    left: { zh: '結構規劃、目標明確', en: 'Structured planning & decisive focus' },
    right: { zh: '靈活自由、適應變化', en: 'Flexible exploration & adaptable flow' }
  }
};

// ==========================================
// 4. MODALS TRANSLATIONS
// ==========================================
export const MODALS_I18N = {
  grid: {
    title: {
      cantonese: '題目導航列表 (96 題)',
      zh_tw: '題目導航索引 (96 題)',
      en: 'Question Index (96 items)'
    },
    answered: { zh: '已填答', en: 'Answered' },
    current: { zh: '當前選中', en: 'Current' },
    unanswered: { zh: '未完成', en: 'Unanswered' },
    jumpHint: {
      cantonese: '點擊題目編號可立即切換題目',
      zh_tw: '點擊題目號碼可即時跳轉至該題',
      en: 'Click any item number to jump directly'
    },
    close: { zh: '返回作答', en: 'Back to Quiz' }
  },
  review: {
    title: {
      cantonese: '答題記錄覆核與微調',
      zh_tw: '答題記錄回顧與調整',
      en: 'Review & Adjust Answers'
    },
    desc: {
      cantonese: '你可以即時更改任何題目的得分，結果將自動更新。',
      zh_tw: '您可以即時微調任何題目的評分，結果將自動更新。',
      en: 'You can adjust any answer; results update immediately.'
    },
    searchPlaceholder: {
      cantonese: '搜尋關鍵字或題號...',
      zh_tw: '搜尋題目內容或題號...',
      en: 'Search questions...'
    },
    done: {
      cantonese: '完成並檢視報告',
      zh_tw: '完成並查看報告',
      en: 'Done & View Report'
    }
  },
  history: {
    title: {
      cantonese: '歷史測驗記錄',
      zh_tw: '歷次測驗歷史記錄',
      en: 'Assessment History'
    },
    empty: {
      cantonese: '目前尚無儲存的歷史記錄',
      zh_tw: '尚無保存的測驗記錄',
      en: 'No saved assessment records'
    },
    clearAll: { zh: '清空所有記錄', en: 'Clear History' },
    confirmClear: {
      cantonese: '確定要清除所有歷史記錄？此動作無法復原。',
      zh_tw: '確定要清除所有歷次測驗記錄？此操作無法還原。',
      en: 'Are you sure you want to clear all history? This cannot be undone.'
    },
    viewReport: { zh: '查看此報告', en: 'View Report' },
    close: { zh: '關閉', en: 'Close' }
  }
};

export const DUAL_TRACK_MODAL_DEFS = {
  title: {
    cantonese: '歡迎嚟到「雙模型對照分析（內在思維與現實表現）」！',
    zh_tw: '歡迎來到「雙模型對照分析（內在思維與現實表現）」！',
    en: 'Welcome to Dual-Model Comparison (Inner Cognition vs External Traits)!'
  },
  intro: {
    cantonese: '當你做完測驗之後，系統唔會淨係用單一標準俾個答案你，而係會同時派出兩位專家，用完全唔同嘅邏輯幫你「把脈看診」：',
    zh_tw: '當你完成測驗後，系統不會只用一種標準來給你答案，而是會同時派出身上的兩位專家，用完全不同的邏輯來幫你「看診」：',
    en: 'Upon evaluating your assessment, our engine cross-examines your responses from two distinct complementary frameworks:'
  },
  expert1Title: {
    zh: '1. 第一位專家：「數據邏輯派（Grant 規則模型）」',
    en: '1. Primary Framework: Data-Logic Model (Grant Framework)'
  },
  expert1Sub: {
    cantonese: '佢嘅邏輯：「完美主義的機械齒輪論」',
    zh_tw: '他的邏輯：「完美主義的機械齒輪論」',
    en: 'Methodology: Theoretical Alternating Polarity & Cognitive Stacking'
  },
  expert1How: {
    cantonese: '點樣運作：',
    zh_tw: '如何運作：',
    en: 'How it operates:'
  },
  expert1Desc: {
    cantonese: '佢係一位好嚴格嘅教官。佢認為一個人嘅大腦運作必須極之精準、好似精密齒輪咁咬合。無論你平時答題點樣跳，佢都會跟足一套嚴謹交替公式（內向同外向必須完美穿插），將你嘅各項分數「強制排列組合」成最符合學理標準嘅 4 個功能陣型（例如標準嘅 ESFJ 或 INTJ 等）。',
    zh_tw: '他是一位嚴格的教官。他認為一個人的大腦運作必須非常精準、完美咬合。不管你平時作答怎麼跳動，他都會依照一套嚴格的交替公式（內向與外向必須完美穿插），把你的各項分數「強制排列組合成」一個最符合學理標準的 4 個功能陣型（例如標準的 ESFJ 或 INTJ 等）。',
    en: 'Evaluates the theoretical architecture of your mind. Following strict cognitive alternation (I/E), it configures your normalized scores into the textbook 4-function stack to expose your underlying intellectual blueprint.'
  },
  expert1Fit: {
    cantonese: '適合用嚟了解：你大腦喺理論同結構層面上，最完美嘅運作骨架長成點樣。',
    zh_tw: '適合用來了解：你的大腦在理論上、結構上，最完美的運作骨架長什麼樣子。',
    en: 'Best for understanding: The structural, theoretical blueprint of your core cognition.'
  },
  expert2Title: {
    zh: '2. 第二位專家：「行為表現派（Myers 現實模型）」',
    en: '2. Secondary Framework: Behavioral-Expression Model (Myers Framework)'
  },
  expert2Sub: {
    cantonese: '佢嘅邏輯：「現實世界的加權投影論」',
    zh_tw: '他的邏輯：「現實世界的加權投影論」',
    en: 'Methodology: Empirical Weighted Dichotomy Distribution'
  },
  expert2How: {
    cantonese: '點樣運作：',
    zh_tw: '如何運作：',
    en: 'How it operates:'
  },
  expert2Desc: {
    cantonese: '佢係一位實戰派教練。佢覺得教官嘅規定太過死板！佢完全唔同你講究咩完美的齒輪咬合，而係直接統計你喺各個題目入面嘅真實偏好總得分，睇你日常生活中最常展現、最直覺嘅行為傾向係乜，直接對應出你嘅性格字母。',
    zh_tw: '他是一位實戰派教練。他覺得教官的規定太死板了！他完全不跟你講究什麼完美的齒輪咬合，而是直接統計你在各個題目中的真實偏好總得分，看你日常生活中最常展現、最直覺的行為傾向是什麼，直接對應出你的性格字母。',
    en: 'Assesses observable behavioral habits. Rather than enforcing rigid alternating polarities, it tabulates cumulative responses across dichotomy axes to measure where your intuitive actions lean in everyday situations.'
  },
  expert2Fit: {
    cantonese: '適合用嚟了解：你喺現實世界入面，最真實嘅心理狀態、行為習慣同外顯表現傾向。',
    zh_tw: '適合用來了解：你在現實世界中，最真實的心理狀態、行為習慣與外顯表現傾向。',
    en: 'Best for understanding: Your real-world interpersonal presence, behavioral tendencies, and observable habits.'
  },
  tipHeading: {
    cantonese: '💡 點解網站要同時睇晒呢兩派？（給新手的貼心提醒）',
    zh_tw: '💡 為什麼網站要同時看這兩派？（給新手的貼心提醒）',
    en: '💡 Why cross-verify both tracks? (Pro Advice)'
  },
  consistentTitle: {
    zh: '如果兩派算出的結果完全一致：',
    en: 'If both frameworks align seamlessly:'
  },
  consistentDesc: {
    cantonese: '恭喜你！呢個代表你的內心思維與外在表現完美融合，你的性格特質非常鮮明、毫無懸念。',
    zh_tw: '恭喜你！這代表你的內心思維與外在表現完美融合，你的性格特質非常鮮明、毫無懸念。',
    en: 'Your subconscious architecture and outward behaviors are in harmonious synchrony—your personality traits demonstrate exceptional coherence and clarity.'
  },
  clashTitle: {
    zh: '如果兩派算出的結果「打架（不一樣）」：',
    en: 'If the two frameworks diverge:'
  },
  clashDesc: {
    cantonese: '千祈咪緊張，呢個絕對唔係測驗壞咗！反而係最有趣嘅地方。代表你係一個充滿反差與多元性嘅人——你大腦底層嘅運作邏輯（數據邏輯派），可能同你喺日常生活中展現出嚟嘅樣貌（行為表現派）唔太一樣。你可能同時擁有理性與感性、或者內向與外向交織嘅豐富靈魂！',
    zh_tw: '別緊張，這絕對不是測驗壞了！這反而是最有趣的地方。這代表你是一個充滿反差與多元性的人——你大腦底層的運作邏輯（數據邏輯派），可能和你在日常生活中展現出來的樣子（行為表現派）不太一樣。你可能同時擁有理性與感性、或是內向與外向交織的豐富靈魂！',
    en: 'This divergence reflects meaningful psychological depth rather than an inconsistency. It signifies rich dynamic duality: your internal cognitive blueprint operates distinctively from your everyday external coping habits.'
  },
  closeBtn: {
    zh: '我知道了，開始看診',
    en: "Understood, Let's Review"
  }
};
