export type CognitiveFunction = 'Ne' | 'Ni' | 'Se' | 'Si' | 'Te' | 'Ti' | 'Fe' | 'Fi';

export interface FunctionInfo {
  code: CognitiveFunction;
  name: {
    en: string;
    zh_tw: string;
    cantonese: string;
  };
  shortDesc: {
    en: string;
    zh_tw: string;
    cantonese: string;
  };
  fullDesc: {
    en: string;
    zh_tw: string;
    cantonese: string;
  };
  keywords: {
    en: string[];
    zh_tw: string[];
    cantonese: string[];
  };
  color: string; // Tailwind hex / class
  accentBg: string;
  category: 'Perceiving' | 'Judging';
  orientation: 'Extraverted' | 'Introverted';
}

export const FUNCTIONS_INFO: Record<CognitiveFunction, FunctionInfo> = {
  Ne: {
    code: 'Ne',
    name: {
      en: 'Extraverted Intuition (Ne)',
      zh_tw: '外向直覺 (Ne)',
      cantonese: '外向直覺 (Ne)'
    },
    shortDesc: {
      en: 'Pattern synthesizer, ideator, sees endless external possibilities.',
      zh_tw: '可能性探索者，擅長概念聯想、腦力激盪與跨界發現。',
      cantonese: '腦筋急轉彎，擅長跨界聯想、搵新點子同發掘無限可能。'
    },
    fullDesc: {
      en: 'Extraverted Intuition perceives abstract possibilities in the external environment. It connects seemingly unrelated ideas, generates alternatives rapidly, thrives on novelty, and asks "What if?".',
      zh_tw: 'Ne 聚焦於外部世界潛藏的關聯與未來可能性。習慣跳躍性思考，從現有資訊激發出無數新奇點子，重視靈感探索與開放式嘗試。',
      cantonese: 'Ne 好善於由外在環境發現無限可能。鍾意天馬行空、舉一反三，對新鮮未試過嘅新點子充滿好奇，好享受 brain-storming。'
    },
    keywords: {
      en: ['Brainstorming', 'Pattern Synthesis', 'Innovation', 'Possibilities'],
      zh_tw: ['腦力激盪', '概念聯想', '創新變革', '天馬行空'],
      cantonese: ['腦力激盪', '概念聯想', '創新變革', '天馬行空']
    },
    color: '#38BDF8', // Sky
    accentBg: 'rgba(56, 189, 248, 0.15)',
    category: 'Perceiving',
    orientation: 'Extraverted'
  },
  Ni: {
    code: 'Ni',
    name: {
      en: 'Introverted Intuition (Ni)',
      zh_tw: '內向直覺 (Ni)',
      cantonese: '內向直覺 (Ni)'
    },
    shortDesc: {
      en: 'Visionary oracle, subconscious synthesis, singular future insight.',
      zh_tw: '深層洞察者，憑潛意識整合萬象，洞悉事物根本趨勢與預言。',
      cantonese: '第六感預言家，透過潛意識融會貫通，睇通全局底層脈絡。'
    },
    fullDesc: {
      en: 'Introverted Intuition synthesizes data through internal subconscious processing. It crystallizes chaotic patterns into a singular overarching vision, deep symbolic meaning, and long-term foresight.',
      zh_tw: 'Ni 運作於內在潛意識，擅長收斂複雜瑣碎的細節，提煉出核心本質或未來宏觀圖景。常有突如其來的靈感頓悟與超前直覺。',
      cantonese: 'Ni 係一種收斂式嘅深層頓悟，善於將雜亂事物提煉出一個終極願景或真理。好信任第六感，睇得好長遠。'
    },
    keywords: {
      en: ['Deep Insight', 'Long-term Vision', 'Intuitive Synthesis', 'Symbolism'],
      zh_tw: ['深層洞見', '長遠願景', '直覺頓悟', '哲理象徵'],
      cantonese: ['深層洞見', '長遠願景', '直覺頓悟', '哲理象徵']
    },
    color: '#818CF8', // Indigo
    accentBg: 'rgba(129, 140, 248, 0.15)',
    category: 'Perceiving',
    orientation: 'Introverted'
  },
  Se: {
    code: 'Se',
    name: {
      en: 'Extraverted Sensing (Se)',
      zh_tw: '外向感覺 (Se)',
      cantonese: '外向感覺 (Se)'
    },
    shortDesc: {
      en: 'Real-time explorer, sensory immersion, acute responsiveness.',
      zh_tw: '當下冒險家，全感官體驗世界，應變迅捷且務實貼地。',
      cantonese: '現場行動派，活在當下享受感官刺激，突發反應極之快。'
    },
    fullDesc: {
      en: 'Extraverted Sensing engages dynamically with current physical reality. It perceives things as they are right now with sharp acute senses, craving real-world action, aesthetic presence, and spontaneous agility.',
      zh_tw: 'Se 全身心擁抱現實時空，對周遭聲色光影有敏銳捕捉力。重視當下體驗、實操行動與即時反應，不喜空談虛幻。',
      cantonese: 'Se 完完全全活在當下，對身邊實質環境嘅變化敏銳度極高。行動力爆燈，追求真實體驗同刺激，好務實貼地。'
    },
    keywords: {
      en: ['Present Focus', 'Sensory Acuity', 'Rapid Reflexes', 'Action & Thrill'],
      zh_tw: ['活在當下', '感官敏銳', '即時應變', '冒險行動'],
      cantonese: ['活在當下', '感官敏銳', '即時應變', '冒險行動']
    },
    color: '#F59E0B', // Amber
    accentBg: 'rgba(245, 158, 11, 0.15)',
    category: 'Perceiving',
    orientation: 'Extraverted'
  },
  Si: {
    code: 'Si',
    name: {
      en: 'Introverted Sensing (Si)',
      zh_tw: '內向感覺 (Si)',
      cantonese: '內向感覺 (Si)'
    },
    shortDesc: {
      en: 'Memory anchor, detail guardian, duty & precedent archivist.',
      zh_tw: '記憶守護者，重視先例細節與身體反饋，追求秩序與穩定。',
      cantonese: '細節守護神，好重傳統經驗同回憶，追求穩陣、可靠同規律。'
    },
    fullDesc: {
      en: 'Introverted Sensing compares incoming experiences against a detailed mental archive of past impressions. It prizes stability, continuity, bodily awareness, proven methods, and precision.',
      zh_tw: 'Si 建立在過去的經驗庫存之上，比對當前狀況與過往記憶的異同。重視責任、規律習慣、可靠流程與細節完整性。',
      cantonese: 'Si 習慣將眼前嘅事物同自己記憶庫中嘅舊經驗做對比。好注重傳統經驗、責任心同生活作息嘅規律穩定。'
    },
    keywords: {
      en: ['Past Archive', 'Precision & Detail', 'Stability', 'Proven Routine'],
      zh_tw: ['經驗沉澱', '嚴謹細緻', '穩定可靠', '常規秩序'],
      cantonese: ['經驗沉澱', '嚴謹細緻', '穩定可靠', '常規秩序']
    },
    color: '#10B981', // Emerald
    accentBg: 'rgba(168, 185, 129, 0.15)',
    category: 'Perceiving',
    orientation: 'Introverted'
  },
  Te: {
    code: 'Te',
    name: {
      en: 'Extraverted Thinking (Te)',
      zh_tw: '外向思考 (Te)',
      cantonese: '外向思考 (Te)'
    },
    shortDesc: {
      en: 'Executive architect, operational efficiency, metrics & objective results.',
      zh_tw: '高效執行者，以客觀事實與數據為準繩，重構系統與提升成效。',
      cantonese: '效率執行狂人，睇重客觀數據、條理分明同實際產出效益。'
    },
    fullDesc: {
      en: 'Extraverted Thinking organizes the outer world logically and efficiently. It assesses situations by objective criteria, measurable metrics, structured plans, and pragmatic execution.',
      zh_tw: 'Te 致力於把外部混亂梳理為高效有序的體系。注重客觀指標、邏輯辯論、KPI 與時間管理，目標導向且雷厲風行。',
      cantonese: 'Te 講求實幹、效率同結構化。好鍾意安排工作流程，做事目標明確，講嘢開門見山，用數字同事實說話。'
    },
    keywords: {
      en: ['Efficiency', 'Objective Metrics', 'Structured Execution', 'Goal-Driven'],
      zh_tw: ['效率優化', '客觀事實', '組織掌控', '目標導向'],
      cantonese: ['效率優化', '客觀事實', '組織掌控', '目標導向']
    },
    color: '#3B82F6', // Blue
    accentBg: 'rgba(59, 130, 246, 0.15)',
    category: 'Judging',
    orientation: 'Extraverted'
  },
  Ti: {
    code: 'Ti',
    name: {
      en: 'Introverted Thinking (Ti)',
      zh_tw: '內向思考 (Ti)',
      cantonese: '內向思考 (Ti)'
    },
    shortDesc: {
      en: 'First-principles analyst, internal logic builder, precise dissection.',
      zh_tw: '底層邏輯拆解者，建構自主認知模型，追根究底求證真相。',
      cantonese: '底層邏輯哲學家，鍾意自己拆解事物原理，追求絕對嚴密理性。'
    },
    fullDesc: {
      en: 'Introverted Thinking builds an internal framework of precision and logical consistency. It constantly analyzes definitions, deconstructs how things work at the foundational level, and prizes truth over utility.',
      zh_tw: 'Ti 著重於內在邏輯的自洽與純粹。面對任何觀點皆習慣從第一性原理層層拆解，剔除矛盾，享受純粹理解事物運作機制的樂趣。',
      cantonese: 'Ti 追求思想內部嘅絕對自洽。遇到問題會習慣一層層拆解到最核心，釐清每個概念細節，講求原則同真理。'
    },
    keywords: {
      en: ['First Principles', 'Logical Consistency', 'Critical Thinking', 'Deduction'],
      zh_tw: ['底層原理', '邏輯自洽', '批判思維', '獨立推演'],
      cantonese: ['底層原理', '邏輯自洽', '批判思維', '獨立推演']
    },
    color: '#EC4899', // Pink
    accentBg: 'rgba(236, 72, 153, 0.15)',
    category: 'Judging',
    orientation: 'Introverted'
  },
  Fe: {
    code: 'Fe',
    name: {
      en: 'Extraverted Feeling (Fe)',
      zh_tw: '外向情感 (Fe)',
      cantonese: '外向情感 (Fe)'
    },
    shortDesc: {
      en: 'Harmonizer, social empath, collective values & emotional connector.',
      zh_tw: '人際協調者，敏銳捕捉他人情感需求，致力維護群體共識與和諧。',
      cantonese: '氣氛協調大師，好識睇人眼色，重視團隊和睦同他人感受。'
    },
    fullDesc: {
      en: 'Extraverted Feeling focuses on external social values and group dynamics. It instinctively reads others’ emotional cues, fosters connection, resolves conflicts, and ensures everyone feels heard and included.',
      zh_tw: 'Fe 關注群體的情感流動與人際平衡。善於同理他人處境，透過溫暖支持與溝通協調凝聚人心，重視社交禮貌與團隊氛圍。',
      cantonese: 'Fe 對身邊人嘅情緒變化極之敏感。擅長照顧大家嘅心情，凝聚團隊氣氛，好願意付出令大家都開心。'
    },
    keywords: {
      en: ['Interpersonal Harmony', 'Empathy', 'Social Consensus', 'Warm Support'],
      zh_tw: ['人際和諧', '共情包容', '群體共識', '溫暖支持'],
      cantonese: ['人際和諧', '共情包容', '群體共識', '溫暖支持']
    },
    color: '#14B8A6', // Teal
    accentBg: 'rgba(20, 184, 166, 0.15)',
    category: 'Judging',
    orientation: 'Extraverted'
  },
  Fi: {
    code: 'Fi',
    name: {
      en: 'Introverted Feeling (Fi)',
      zh_tw: '內向情感 (Fi)',
      cantonese: '內向情感 (Fi)'
    },
    shortDesc: {
      en: 'Authentic soul, moral compass, deep individuality & unwavering values.',
      zh_tw: '真實靈魂追尋者，恪守內在道德底線，珍視個體獨特性與赤子之心。',
      cantonese: '真我守護者，堅持內心原則道德底線，討厭虛偽，重視獨特性。'
    },
    fullDesc: {
      en: 'Introverted Feeling evaluates life through deeply personal, subjective moral frameworks. It seeks absolute authenticity, guards core ethical convictions, respects genuine individuality, and refuses superficial conformity.',
      zh_tw: 'Fi 擁有極其深刻且純粹的內在價值體系。不隨波逐流，對真誠與虛偽有天生的鑑別力，堅持做最真實的自己並捍衛信念。',
      cantonese: 'Fi 內心有一套神聖不可侵犯嘅價值觀。做人好真誠，寧可特立獨行都唔肯盲目迎合社會假面，同理心深刻而專注。'
    },
    keywords: {
      en: ['Core Authenticity', 'Moral Compass', 'Ethical Conviction', 'Unique Individuality'],
      zh_tw: ['恪守本心', '真誠純粹', '道德底線', '獨特自我'],
      cantonese: ['恪守本心', '真誠純粹', '道德底線', '獨特自我']
    },
    color: '#A855F7', // Purple
    accentBg: 'rgba(168, 85, 247, 0.15)',
    category: 'Judging',
    orientation: 'Introverted'
  }
};

export interface MbtiTypeDetails {
  code: string;
  name: {
    en: string;
    zh_tw: string;
    cantonese: string;
  };
  archetype: {
    en: string;
    zh_tw: string;
    cantonese: string;
  };
  tagline: {
    en: string;
    zh_tw: string;
    cantonese: string;
  };
  stack: [CognitiveFunction, CognitiveFunction, CognitiveFunction, CognitiveFunction];
  shadowStack: [CognitiveFunction, CognitiveFunction, CognitiveFunction, CognitiveFunction];
  strengths: {
    en: string[];
    zh_tw: string[];
    cantonese: string[];
  };
  growthAreas: {
    en: string[];
    zh_tw: string[];
    cantonese: string[];
  };
  famousExamples: string[];
  bannerColor: string;
}

export const MBTI_TYPES: Record<string, MbtiTypeDetails> = {
  INTJ: {
    code: 'INTJ',
    name: { en: 'Mastermind / Architect', zh_tw: '策略家 / 建築師', cantonese: '幕後策劃者 / 智多星' },
    archetype: { en: 'The Visionary Strategist', zh_tw: '遠見策略家', cantonese: '遠見策劃家' },
    tagline: {
      en: 'Synthesizing complex ideas into actionable long-range master plans.',
      zh_tw: '將宏觀洞察轉化為精密周全的長期戰略藍圖。',
      cantonese: '將天馬行空嘅洞察轉化做精密無比嘅長遠計劃。'
    },
    stack: ['Ni', 'Te', 'Fi', 'Se'],
    shadowStack: ['Ne', 'Ti', 'Fe', 'Si'],
    strengths: {
      en: ['Strategic foresight', 'Ruthless efficiency', 'Independent conviction', 'Complex system design'],
      zh_tw: ['宏觀戰略眼光', '高效執行力', '堅定獨立信念', '複雜系統架構能力'],
      cantonese: ['極強長遠眼光', '執行快狠準', '唔隨波逐流', '擅長架構複雜大局']
    },
    growthAreas: {
      en: ['Accepting unpredictable human emotions', 'Avoiding intellectual arrogance', 'Grounding in present physical senses'],
      zh_tw: ['包容不可預測的情感需求', '避免理性優越感', '多關注當下感官與身體狀況'],
      cantonese: ['接納人際情緒嘅不可控', '避免太自負', '多啲放鬆感受當下現實']
    },
    famousExamples: ['Elon Musk', 'Friedrich Nietzsche', 'Isaac Newton', 'Christopher Nolan'],
    bannerColor: 'from-indigo-600 to-slate-900'
  },
  INTP: {
    code: 'INTP',
    name: { en: 'Logician / Thinker', zh_tw: '邏輯學家 / 思想家', cantonese: '邏輯分析家 / 哲學家' },
    archetype: { en: 'The Universal Theorist', zh_tw: '宇宙原理解析者', cantonese: '真理解構者' },
    tagline: {
      en: 'Deconstructing the fundamental machinery of thought and universe.',
      zh_tw: '層層拆解世界的底層邏輯，建立精確的認知體系。',
      cantonese: '拆解事物底層最根本嘅邏輯，求真大於一切。'
    },
    stack: ['Ti', 'Ne', 'Si', 'Fe'],
    shadowStack: ['Te', 'Ni', 'Se', 'Fi'],
    strengths: {
      en: ['First-principles reasoning', 'Unbiased objectivity', 'Inventive curiosity', 'Pattern synthesis'],
      zh_tw: ['第一性原理思維', '客觀公正求真', '開拓性好奇心', '多維度模型建立'],
      cantonese: ['第一性原理邏輯', '講求客觀公正', '對新原理好奇', '多角度拆解難題']
    },
    growthAreas: {
      en: ['Bridging logic into practical execution', 'Nurturing interpersonal empathy', 'Avoiding analysis paralysis'],
      zh_tw: ['將純粹邏輯落地為實際成果', '加強同理心與人際連結', '克服想太多而不行動的拖延'],
      cantonese: ['將想法落實成行動', '多啲照顧其他人感受', '唔好諗過多反而癱瘓冇起步']
    },
    famousExamples: ['Albert Einstein', 'Charles Darwin', 'Ada Lovelace', 'Bill Gates'],
    bannerColor: 'from-pink-600 to-indigo-950'
  },
  ENTJ: {
    code: 'ENTJ',
    name: { en: 'Commander / Fieldmarshal', zh_tw: '指揮官 / 統帥', cantonese: '霸氣指揮官 / 領軍者' },
    archetype: { en: 'The Decisive Commander', zh_tw: '鐵腕戰略統率', cantonese: '大刀闊斧領袖' },
    tagline: {
      en: 'Orchestrating resources and vision into undeniable real-world dominance.',
      zh_tw: '統合願景與資源，果斷引領變革並達成宏大目標。',
      cantonese: '整合資源同願景，帶領團隊大刀闊斧斬將奪旗。'
    },
    stack: ['Te', 'Ni', 'Se', 'Fi'],
    shadowStack: ['Ti', 'Ne', 'Si', 'Fe'],
    strengths: {
      en: ['Unmatched organizational drive', 'Clear strategic direction', 'Charismatic decisiveness', 'System builder'],
      zh_tw: ['無與倫比的組織推動力', '精準戰略眼光', '果斷決策魄力', '大規模資源調度'],
      cantonese: ['超強組織同推動力', '眼光放得好遠', '做決定快狠準', '天生領軍氣場']
    },
    growthAreas: {
      en: ['Listening to internal ethical sentiment', 'Patience with slower pacing', 'Preventing burnout'],
      zh_tw: ['傾聽內心真正的價值感受', '對進度較慢的夥伴保持耐心', '預防高壓過勞'],
      cantonese: ['多啲傾聽自己心底感覺', '對身邊人多一分耐心', '唔好 chur 到自己同人太盡']
    },
    famousExamples: ['Steve Jobs', 'Margaret Thatcher', 'Julius Caesar', 'Napoleon Bonaparte'],
    bannerColor: 'from-blue-600 to-violet-950'
  },
  ENTP: {
    code: 'ENTP',
    name: { en: 'Visionary / Debater', zh_tw: '發明家 / 辯論家', cantonese: '百變鬼才 / 點子王' },
    archetype: { en: 'The Innovative Provocateur', zh_tw: '顛覆常規的思想冒險家', cantonese: '打破常規破局者' },
    tagline: {
      en: 'Challenging orthodoxies with boundless sparks of ingenuity.',
      zh_tw: '以敏銳智力與無限創意質疑定規，開拓前所未有的可能。',
      cantonese: '用無窮無盡嘅好橋質疑傳統，鍾意突破思維框框。'
    },
    stack: ['Ne', 'Ti', 'Fe', 'Si'],
    shadowStack: ['Ni', 'Te', 'Fi', 'Se'],
    strengths: {
      en: ['Quick-witted dialectic', 'Breakthrough innovation', 'Charismatic adaptability', 'Conceptual fearlessness'],
      zh_tw: ['機敏辯才與洞見', '顛覆性創新靈感', '靈活適應力', '敢於挑戰權威'],
      cantonese: ['轉數極快口才好', '創意點子源源不絕', '適應力超強', '敢於打破框框']
    },
    growthAreas: {
      en: ['Following through on initial sparks', 'Respecting routine and details', 'Not arguing merely to win'],
      zh_tw: ['將初始靈感堅持收尾到底', '尊重常規制度與微小細節', '避免純粹為了爭辯而爭辯'],
      cantonese: ['將開頭嘅 Plan 做到底', '尊重細節同日常規矩', '唔好為駁而駁整親人感情']
    },
    famousExamples: ['Leonardo da Vinci', 'Richard Feynman', 'Socrates', 'Mark Twain'],
    bannerColor: 'from-cyan-600 to-indigo-950'
  },
  INFJ: {
    code: 'INFJ',
    name: { en: 'Advocate / Counselor', zh_tw: '提倡者 / 引路人', cantonese: '心靈燈塔 / 守護者' },
    archetype: { en: 'The Mystic Humanist', zh_tw: '神祕的人道主義者', cantonese: '深沉心靈引路人' },
    tagline: {
      en: 'Guiding humanity toward harmony through profound prophetic insights.',
      zh_tw: '以深邃洞見與無私同理，默默引領人際和諧與靈魂成長。',
      cantonese: '用深刻嘅直覺同溫暖同理心，引導人走出迷惘。'
    },
    stack: ['Ni', 'Fe', 'Ti', 'Se'],
    shadowStack: ['Ne', 'Fi', 'Te', 'Si'],
    strengths: {
      en: ['Profound empathy', 'Visionary idealism', 'Deep structural insight', 'Quiet inspiring magnetism'],
      zh_tw: ['深層情感共鳴', '崇高的理想主義', '通透的人性洞察', '潤物無聲的影響力'],
      cantonese: ['極致深刻同理心', '眼光超然理想主義', '睇通人性深處', '溫柔但堅定']
    },
    growthAreas: {
      en: ['Setting emotional boundaries', 'Avoiding overwhelming idealism', 'Releasing perfectionism in reality'],
      zh_tw: ['設定人際情感界線以防消耗', '避免理想主義落空的幻滅感', '接納現實中的不完美'],
      cantonese: ['設立個人情感邊界防透支', '唔好將世界諗得太完美', '學識放鬆落地生活']
    },
    famousExamples: ['Carl Jung', 'Mahatma Gandhi', 'Fyodor Dostoevsky', 'Nelson Mandela'],
    bannerColor: 'from-teal-600 to-indigo-950'
  },
  INFP: {
    code: 'INFP',
    name: { en: 'Mediator / Idealist', zh_tw: '調停者 / 夢想家', cantonese: '溫柔詩人 / 追夢者' },
    archetype: { en: 'The Authentic Healer', zh_tw: '真摯的心靈療癒者', cantonese: '真我治癒者' },
    tagline: {
      en: 'Honoring individual sacred truth and weaving poetic meaning into life.',
      zh_tw: '恪守內在神聖信念，為世界賦予純粹的詩意與溫柔。',
      cantonese: '守護心底最純淨嘅信念，用溫柔善良對待世界。'
    },
    stack: ['Fi', 'Ne', 'Si', 'Te'],
    shadowStack: ['Fe', 'Ni', 'Se', 'Ti'],
    strengths: {
      en: ['Pure ethical integrity', 'Creative depth', 'Compassionate sensitivity', 'Unwavering loyalty to values'],
      zh_tw: ['純粹的道德信念', '豐富的文藝想像', '敏銳溫柔的同理', '對自我價值的忠誠'],
      cantonese: ['極高道德潔癖與真誠', '想像力豐富有詩意', '體貼溫柔善解人意', '堅持真我不隨俗']
    },
    growthAreas: {
      en: ['Stepping up to assertive action', 'Not internalizing external slights', 'Embracing objective structures'],
      zh_tw: ['強化果斷行動力', '避免過度內化外界負面評價', '適應客觀現實的條例架構'],
      cantonese: ['增強執行同拍板能力', '唔好乜都往心入面擺', '學識用客觀理性面對現實']
    },
    famousExamples: ['J.R.R. Tolkien', 'Vincent van Gogh', 'William Shakespeare', 'Audrey Hepburn'],
    bannerColor: 'from-purple-600 to-slate-900'
  },
  ENFJ: {
    code: 'ENFJ',
    name: { en: 'Protagonist / Teacher', zh_tw: '主人公 / 導師', cantonese: '靈魂導師 / 領袖' },
    archetype: { en: 'The Inspiring Catalyst', zh_tw: '鼓舞人心的催化者', cantonese: '感召力領袖' },
    tagline: {
      en: 'Uniting hearts and unlocking human potential through radiant empathy.',
      zh_tw: '以熱忱與感染力凝聚群體，啟發每個人實現最好的自我。',
      cantonese: '用熱情同感染力團結大家，激發每個人最大嘅潛能。'
    },
    stack: ['Fe', 'Ni', 'Se', 'Ti'],
    shadowStack: ['Fi', 'Ne', 'Si', 'Te'],
    strengths: {
      en: ['Magnetic charisma', 'Natural mentor instincts', 'Consensus building', 'Emotional eloquence'],
      zh_tw: ['強大號召力與魅力', '天生引路導師特質', '善於凝聚團體共識', '卓越人際溝通'],
      cantonese: ['領袖魅力自帶光環', '天生好識激勵人', '擅長化解人際分歧', '熱情溫暖有大愛']
    },
    growthAreas: {
      en: ['Remembering self-care before others', 'Accepting when people choose other paths', 'Tolerating necessary conflict'],
      zh_tw: ['照顧他人前優先自愛', '學會放下過度的責任感', '勇於面對無可避免的衝突'],
      cantonese: ['記得照顧自己需要先', '唔好咩包袱都攬上身', '唔好害怕必要嘅摩擦']
    },
    famousExamples: ['Barack Obama', 'Oprah Winfrey', 'Martin Luther King Jr.', 'Maya Angelou'],
    bannerColor: 'from-emerald-600 to-indigo-950'
  },
  ENFP: {
    code: 'ENFP',
    name: { en: 'Campaigner / Champion', zh_tw: '競選者 / 探索者', cantonese: '熱血冒險家 / 靈魂捕手' },
    archetype: { en: 'The Radiant Pathfinder', zh_tw: '點亮希望的啟蒙者', cantonese: '充滿熱情探險家' },
    tagline: {
      en: 'Celebrating vibrant connections and uncovering magic in everyday possibilities.',
      zh_tw: '擁抱生命中的火花與奇蹟，以熱情串聯人與無限可能。',
      cantonese: '擁抱生命中嘅奇蹟同火花，用真誠熱情感染身邊每個人。'
    },
    stack: ['Ne', 'Fi', 'Te', 'Si'],
    shadowStack: ['Ni', 'Fe', 'Ti', 'Se'],
    strengths: {
      en: ['Infectious enthusiasm', 'Deep human resonance', 'Boundary-pushing creativity', 'Spontaneous optimism'],
      zh_tw: ['具感染力的樂觀熱情', '深刻的情感共鳴', '天馬行空的創新力', '熱愛探索未知'],
      cantonese: ['極具感染力熱情', '好快同人建立深層連結', '創意無限鬼馬精靈', '樂觀勇敢追夢']
    },
    growthAreas: {
      en: ['Finishing initiated endeavors', 'Grounding attention in repetitive tasks', 'Emotional moderation'],
      zh_tw: ['避免開局無數卻虎頭蛇尾', '培養耐受重複細節的定力', '學會沉澱過度興奮的情緒'],
      cantonese: ['唔好開咗頭就三分鐘熱度', '耐下心做重複枯燥細節', '學識沉澱情緒']
    },
    famousExamples: ['Robin Williams', 'Walt Disney', 'Anne Frank', 'Oscar Wilde'],
    bannerColor: 'from-amber-500 to-purple-950'
  },
  ISTJ: {
    code: 'ISTJ',
    name: { en: 'Inspector / Logistician', zh_tw: '物流師 / 稽核者', cantonese: '中流砥柱 / 守序者' },
    archetype: { en: 'The Pillar of Reliability', zh_tw: '誠信可靠的中流砥柱', cantonese: '最穩陣嘅中流砥柱' },
    tagline: {
      en: 'Upholding duty, precision, and order with unyielding dedication.',
      zh_tw: '恪盡職守、言出必行，以嚴謹制度維繫社會穩健基石。',
      cantonese: '言出必行、一絲不苟，用最可靠嘅肩膀撐起所有承諾。'
    },
    stack: ['Si', 'Te', 'Fi', 'Ne'],
    shadowStack: ['Se', 'Ti', 'Fe', 'Ni'],
    strengths: {
      en: ['Rock-solid reliability', 'Systematic precision', 'Uncompromising integrity', 'Crisis calmness'],
      zh_tw: ['堅如磐石的信賴感', '嚴謹系統化管理', '誠實守信守原則', '按部就班處變不驚'],
      cantonese: ['穩陣可靠靠得住', '做事細緻一絲不苟', '信守承諾極重原則', '臨危不亂好冷靜']
    },
    growthAreas: {
      en: ['Embracing unexpected change', 'Validating others’ emotional perspectives', 'Trying novel methods'],
      zh_tw: ['提升面對突發變動的包容度', '多體諒他人的感性需求', '大膽嘗試未經測試的新方法'],
      cantonese: ['放開懷抱適應突發轉變', '多啲體貼人情味', '願意試下新方法']
    },
    famousExamples: ['George Washington', 'Warren Buffett', 'Queen Elizabeth II', 'Angela Merkel'],
    bannerColor: 'from-slate-600 to-slate-900'
  },
  ISFJ: {
    code: 'ISFJ',
    name: { en: 'Defender / Protector', zh_tw: '守衛者 / 奉獻者', cantonese: '默默守護者 / 暖心後盾' },
    archetype: { en: 'The Devoted Caretaker', zh_tw: '溫暖深情的守護天使', cantonese: '細水長流守護者' },
    tagline: {
      en: 'Quietly sustaining lives and traditions with compassionate loyalty.',
      zh_tw: '默默付出、細緻體貼，以溫柔耐心守護身邊每一個所愛之人。',
      cantonese: '默默耕耘、無微不至，用溫柔同細心守護身邊所有人。'
    },
    stack: ['Si', 'Fe', 'Ti', 'Ne'],
    shadowStack: ['Se', 'Fi', 'Te', 'Ni'],
    strengths: {
      en: ['Thoughtful attentiveness', 'Loyal constancy', 'Practical service', 'Harmony preservation'],
      zh_tw: ['體貼入微的關懷', '始終如一的忠誠', '務實周到的支持', '善於維護家庭與團隊和諧'],
      cantonese: ['體貼入微超細心', '專一忠誠值得信賴', '默默支持貼心周到', '重感情愛護家人朋友']
    },
    growthAreas: {
      en: ['Voice your own needs clearly', 'Saying no without guilt', 'Releasing fear of future unknowns'],
      zh_tw: ['勇敢表達自己的需求', '學會無愧疚地說「不」', '減少對未來不確定性的過度擔憂'],
      cantonese: ['大膽講出自己需要', '學識拒絕人唔好內疚', '唔好為未來未知太焦慮']
    },
    famousExamples: ['Mother Teresa', 'Rosa Parks', 'Beyoncé', 'Kate Middleton'],
    bannerColor: 'from-emerald-700 to-teal-950'
  },
  ESTJ: {
    code: 'ESTJ',
    name: { en: 'Executive / Director', zh_tw: '總經理 / 執行官', cantonese: '鐵腕執行官 / 組織家' },
    archetype: { en: 'The Standard Bearer', zh_tw: '秩序與規範的締造者', cantonese: '秩序與效率執法者' },
    tagline: {
      en: 'Establishing clear order, accountability, and productive momentum.',
      zh_tw: '樹立清晰規章與責任，以強大執行力引領團隊穩定向前。',
      cantonese: '定下清楚規矩同目標，用雷厲風行嘅手段帶領大家向前衝。'
    },
    stack: ['Te', 'Si', 'Ne', 'Fi'],
    shadowStack: ['Ti', 'Se', 'Ni', 'Fe'],
    strengths: {
      en: ['Exceptional organization', 'Direct accountability', 'Pragmatic leadership', 'Loyal follow-through'],
      zh_tw: ['卓越的組織調度', '直接明確的責任制', '務實穩健的領導風範', '言出必踐的執行力'],
      cantonese: ['組織調度極強', '講嘢爽快責任分明', '務實穩陣有威嚴', '辦事講效率有交代']
    },
    growthAreas: {
      en: ['Adapting to emotional nuance', 'Listening before mandating', 'Allowing room for unconventional ideas'],
      zh_tw: ['多體察他人的細膩情緒', '在發號施令前多傾聽反饋', '給予非傳統點子嘗試的空間'],
      cantonese: ['講嘢唔好太硬梆梆', '落指令前聽下大家意見', '多包容天馬行空嘅新做法']
    },
    famousExamples: ['Henry Ford', 'John D. Rockefeller', 'Judge Judy', 'Colin Powell'],
    bannerColor: 'from-blue-700 to-indigo-950'
  },
  ESFJ: {
    code: 'ESFJ',
    name: { en: 'Consul / Provider', zh_tw: '執政官 / 東道主', cantonese: '熱情款待者 / 大家長' },
    archetype: { en: 'The Community Pillar', zh_tw: '溫馨社群的凝聚者', cantonese: '人緣爆棚聚會核心' },
    tagline: {
      en: 'Creating belonging, warmth, and supportive harmony in community.',
      zh_tw: '以熱忱與同理心串聯人群，營造互助溫暖的大家庭氛圍。',
      cantonese: '熱情好客，照顧周到，好識帶動團隊大家庭般嘅凝聚力。'
    },
    stack: ['Fe', 'Si', 'Ne', 'Ti'],
    shadowStack: ['Fi', 'Se', 'Ni', 'Te'],
    strengths: {
      en: ['Generous hospitality', 'Social coordination', 'Attentive caregiving', 'Strong team spirit'],
      zh_tw: ['熱情慷慨的待人之道', '人際關係的潤滑劑', '周到體貼的照顧', '強大的團隊凝聚力'],
      cantonese: ['好客熱情人緣好', '超識搞人際氣氛', '照顧人無微不至', '團結大家有凝聚力']
    },
    growthAreas: {
      en: ['Not over-worrying about social opinion', 'Accepting rational criticism', 'Setting emotional limits'],
      zh_tw: ['不過度在意他人眼光或評價', '理性看待建設性批評', '保護自身精力不受情緒勒索'],
      cantonese: ['唔好太在乎其他人眼光', '以客觀平常心接受批評', '保護好自己精神健康']
    },
    famousExamples: ['Taylor Swift', 'Jennifer Garner', 'Hugh Jackman', 'Steve Harvey'],
    bannerColor: 'from-teal-700 to-emerald-950'
  },
  ISTP: {
    code: 'ISTP',
    name: { en: 'Virtuoso / Craftsman', zh_tw: '鑑賞家 / 巧匠', cantonese: '極限工匠 / 冷靜解題王' },
    archetype: { en: 'The Tactical Artisan', zh_tw: '冷靜靈活的技術大師', cantonese: '冷靜貼地實踐派' },
    tagline: {
      en: 'Mastering tools, physical logic, and agile crisis troubleshooting.',
      zh_tw: '精通實體機制與工具，在危機突發時冷靜敏捷解決難題。',
      cantonese: '動手能力極強，精通物理結構原理，遇到危機冷靜破局。'
    },
    stack: ['Ti', 'Se', 'Ni', 'Fe'],
    shadowStack: ['Te', 'Si', 'Ne', 'Fi'],
    strengths: {
      en: ['Hands-on mastery', 'Composed crisis management', 'Spontaneous resourcefulness', 'Uncluttered logic'],
      zh_tw: ['動手解決問題的高手', '危機中極致冷靜', '靈活應變就地取材', '乾脆俐落的內部邏輯'],
      cantonese: ['動手能力超強', '大難臨頭最淡定', '就地取材應變靈活', '邏輯清晰唔拖泥帶水']
    },
    growthAreas: {
      en: ['Communicating feelings explicitly', 'Planning for longer horizon', 'Nurturing close social bonds'],
      zh_tw: ['主動表達內心感受', '提升對長遠未來的規劃意識', '維繫親密的人際連結'],
      cantonese: ['多啲開口表達自己感受', '放長眼光做長遠規劃', '多花心思經營人際關係']
    },
    famousExamples: ['Clint Eastwood', 'Bruce Lee', 'Tom Cruise', 'Michael Jordan'],
    bannerColor: 'from-amber-600 to-slate-900'
  },
  ISFP: {
    code: 'ISFP',
    name: { en: 'Adventurer / Artist', zh_tw: '冒險家 / 藝術家', cantonese: '美學漫遊者 / 自由靈魂' },
    archetype: { en: 'The Sensitive Creator', zh_tw: '感知美感的溫柔創作者', cantonese: '忠於自我美學家' },
    tagline: {
      en: 'Living fully through authentic artistic presence and quiet tenderness.',
      zh_tw: '用敏銳感官捕捉世界之美，以真誠與溫柔展現獨特生命色彩。',
      cantonese: '用極佳品味感受世界，溫柔細膩，追求最真實自由嘅人生。'
    },
    stack: ['Fi', 'Se', 'Ni', 'Te'],
    shadowStack: ['Fe', 'Si', 'Ne', 'Ti'],
    strengths: {
      en: ['Aesthetic sophistication', 'Genuine authenticity', 'Gentle open-mindedness', 'Deep present joy'],
      zh_tw: ['出色的美學品味', '不假思索的真誠', '包容開放的心胸', '享受當下的純粹快樂'],
      cantonese: ['美感品味極好', '做人坦白唔扮嘢', '思想開放包容度大', '活在當下享受生活']
    },
    growthAreas: {
      en: ['Expressing constructive boundary pushback', 'Building structured long-term habits', 'Not taking conflict internally'],
      zh_tw: ['勇敢表達不同立場與底線', '建立有紀律的長期習慣', '避免將一般爭執轉化為自我懷疑'],
      cantonese: ['有底線就要出聲捍衛', '建立規律嘅長遠習慣', '唔好把外界衝突過度內化']
    },
    famousExamples: ['Frida Kahlo', 'Michael Jackson', 'David Bowie', 'Bob Dylan'],
    bannerColor: 'from-violet-600 to-pink-950'
  },
  ESTP: {
    code: 'ESTP',
    name: { en: 'Entrepreneur / Dynamo', zh_tw: '企業家 / 實踐者', cantonese: '冒險破局者 / 社交焦點' },
    archetype: { en: 'The Dynamic Catalyst', zh_tw: '大膽無畏的現場破局者', cantonese: '大膽敢衝冒險王' },
    tagline: {
      en: 'Leaping into action, seizing immediate opportunities, electrifying the room.',
      zh_tw: '勇於冒險、抓住瞬間機遇，以強大存在感與活力點燃全場。',
      cantonese: '身手敏捷、敢搏敢衝，擅長把握眼前機會，喺人群中光芒四射。'
    },
    stack: ['Se', 'Ti', 'Fe', 'Ni'],
    shadowStack: ['Si', 'Te', 'Fi', 'Ne'],
    strengths: {
      en: ['Bold opportunism', 'Direct problem-solving', 'Magnetic stage presence', 'Sensory quickness'],
      zh_tw: ['敏銳捕捉眼前良機', '乾脆高效解決問題', '自帶光芒的個人魅力', '身手與反應敏捷'],
      cantonese: ['捉緊商機把握當下', '解決現實問題好爽快', '全場焦點魅力四射', '反應神速極有活力']
    },
    growthAreas: {
      en: ['Reflecting on downstream impacts', 'Sustaining focus without thrill', 'Deep introspection'],
      zh_tw: ['行事前多深思長遠後果', '在缺乏刺激時仍保持專注', '培養內省與深度思考'],
      cantonese: ['衝動前諗多一步後果', '平淡枯燥時要定得住心', '抽時間做深度內省']
    },
    famousExamples: ['Ernest Hemingway', 'Donald Trump', 'Theodore Roosevelt', 'Madonna'],
    bannerColor: 'from-orange-600 to-slate-900'
  },
  ESFP: {
    code: 'ESFP',
    name: { en: 'Entertainer / Performer', zh_tw: '表演者 / 聚光者', cantonese: '全場焦點 / 開心果' },
    archetype: { en: 'The Spontaneous Luminary', zh_tw: '熱情奔放的生命舞台主角', cantonese: '活力四射開心果' },
    tagline: {
      en: 'Sharing boundless joy, spontaneous warmth, and vibrant showmanship.',
      zh_tw: '用滿腔熱情與幽默感染身邊每個人，把生活過成精彩的慶典。',
      cantonese: '散發滿滿正能量同歡笑，將生活變成一場精彩絕倫嘅狂歡。'
    },
    stack: ['Se', 'Fi', 'Te', 'Ni'],
    shadowStack: ['Si', 'Fe', 'Ti', 'Ne'],
    strengths: {
      en: ['Radiant enthusiasm', 'Empathetic generosity', 'Present-moment vitality', 'Natural showmanship'],
      zh_tw: ['耀眼的活力熱情', '慷慨真摯的共情力', '全心投入當下的生命力', '天生舞台魅力'],
      cantonese: ['天生自帶歡樂氣場', '真誠善良熱心腸', '享受當下活得精彩', '好有感染力有星味']
    },
    growthAreas: {
      en: ['Preparing for rainy days', 'Handling difficult administrative duties', 'Deep long-range vision'],
      zh_tw: ['未雨綢繆做好長遠儲備', '耐心面對枯燥行政職責', '培養深層長遠的戰略眼光'],
      cantonese: ['居安思危做好儲蓄規劃', '耐住性子處理瑣碎事務', '學習深謀遠慮']
    },
    famousExamples: ['Marilyn Monroe', 'Elvis Presley', 'Adele', 'Elton John'],
    bannerColor: 'from-rose-600 to-amber-950'
  }
};
