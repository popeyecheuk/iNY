import { QUESTIONS_DATA, QuestionItem } from '../data/questions';
import { CognitiveFunction, MBTI_TYPES, MbtiTypeDetails } from '../data/mbtiData';

export interface AssessmentResult {
  rawScores: Record<CognitiveFunction, number>;
  normalizedScores: Record<CognitiveFunction, number>; // 0 - 100
  rankedFunctions: { code: CognitiveFunction; score: number; raw: number }[];
  grantType: MbtiTypeDetails;
  grantTypeMatchPct: number;
  runnerUpType: MbtiTypeDetails;
  runnerUpMatchPct: number;
  myersType: string;
  dichotomy: {
    E: number;
    I: number;
    N: number;
    S: number;
    T: number;
    F: number;
    J: number;
    P: number;
  };
  answers: Record<number, number>; // questionId -> value (1-5)
  completedAt: string;
}

export function calculateCognitiveFunctions(answers: Record<number, number>): AssessmentResult {
  const rawScores: Record<CognitiveFunction, number> = {
    Ne: 0,
    Ni: 0,
    Se: 0,
    Si: 0,
    Te: 0,
    Ti: 0,
    Fe: 0,
    Fi: 0
  };

  const functionCounts: Record<CognitiveFunction, number> = {
    Ne: 0,
    Ni: 0,
    Se: 0,
    Si: 0,
    Te: 0,
    Ti: 0,
    Fe: 0,
    Fi: 0
  };

  QUESTIONS_DATA.forEach((q: QuestionItem) => {
    const val = answers[q.id] || 3; // default neutral 3 if unanswered
    rawScores[q.function] += val;
    functionCounts[q.function] += 1;
  });

  const normalizedScores: Record<CognitiveFunction, number> = {
    Ne: 0,
    Ni: 0,
    Se: 0,
    Si: 0,
    Te: 0,
    Ti: 0,
    Fe: 0,
    Fi: 0
  };

  // 12 questions per function, values 1 to 5: min raw = 12, max raw = 60
  (Object.keys(rawScores) as CognitiveFunction[]).forEach((fn) => {
    const count = functionCounts[fn] || 12;
    const minPossible = count * 1;
    const maxPossible = count * 5;
    const raw = rawScores[fn];
    const normalized = Math.round(((raw - minPossible) / (maxPossible - minPossible)) * 100);
    normalizedScores[fn] = Math.max(0, Math.min(100, normalized));
  });

  // Ranked functions
  const rankedFunctions = (Object.keys(normalizedScores) as CognitiveFunction[])
    .map((code) => ({
      code,
      score: normalizedScores[code],
      raw: rawScores[code]
    }))
    .sort((a, b) => b.score - a.score);

  // Grant Stack Alignment Score calculation for each MBTI type
  const typeScores = Object.keys(MBTI_TYPES).map((typeKey) => {
    const typeDef = MBTI_TYPES[typeKey];
    const [dom, aux, tert, inf] = typeDef.stack;
    const [opp, witch, trickster, demon] = typeDef.shadowStack;

    // Weights: Dominant 40%, Aux 30%, Tertiary 20%, Inferior 10%
    // Bonus for dominant being near the top of user's ranked functions
    const domScore = normalizedScores[dom];
    const auxScore = normalizedScores[aux];
    const tertScore = normalizedScores[tert];
    const infScore = normalizedScores[inf];

    let match = domScore * 0.45 + auxScore * 0.32 + tertScore * 0.15 + infScore * 0.08;

    // Rank consistency bonuses / penalties
    const domRank = rankedFunctions.findIndex((f) => f.code === dom);
    const auxRank = rankedFunctions.findIndex((f) => f.code === aux);
    if (domRank === 0) match += 6; // User's #1 function is dominant
    if (domRank <= 1) match += 4;
    if (auxRank <= 2) match += 3;

    // Penalty if trickster or demon score is vastly higher than dominant
    if (normalizedScores[trickster] > domScore + 15) match -= 6;
    if (normalizedScores[demon] > domScore + 15) match -= 6;

    return {
      typeKey,
      matchPct: Math.max(10, Math.min(99, Math.round(match))),
      typeDef
    };
  });

  typeScores.sort((a, b) => b.matchPct - a.matchPct);

  const bestMatch = typeScores[0];
  const secondMatch = typeScores[1] || typeScores[0];

  // Myers Dichotomy
  const eSum = rawScores.Ne + rawScores.Se + rawScores.Te + rawScores.Fe;
  const iSum = rawScores.Ni + rawScores.Si + rawScores.Ti + rawScores.Fi;
  const nSum = rawScores.Ne + rawScores.Ni;
  const sSum = rawScores.Se + rawScores.Si;
  const tSum = rawScores.Te + rawScores.Ti;
  const fSum = rawScores.Fe + rawScores.Fi;

  // Judging vs Perceiving: extraverted judging (Te + Fe) vs extraverted perceiving (Ne + Se)
  const ejSum = rawScores.Te + rawScores.Fe;
  const epSum = rawScores.Ne + rawScores.Se;

  const totalEI = Math.max(1, eSum + iSum);
  const totalNS = Math.max(1, nSum + sSum);
  const totalTF = Math.max(1, tSum + fSum);
  const totalJP = Math.max(1, ejSum + epSum);

  const ePct = Math.round((eSum / totalEI) * 100);
  const iPct = 100 - ePct;
  const nPct = Math.round((nSum / totalNS) * 100);
  const sPct = 100 - nPct;
  const tPct = Math.round((tSum / totalTF) * 100);
  const fPct = 100 - tPct;
  const jPct = Math.round((ejSum / totalJP) * 100);
  const pPct = 100 - jPct;

  const myersLetter1 = ePct >= 50 ? 'E' : 'I';
  const myersLetter2 = nPct >= 50 ? 'N' : 'S';
  const myersLetter3 = tPct >= 50 ? 'T' : 'F';
  const myersLetter4 = jPct >= 50 ? 'J' : 'P';
  const myersType = `${myersLetter1}${myersLetter2}${myersLetter3}${myersLetter4}`;

  return {
    rawScores,
    normalizedScores,
    rankedFunctions,
    grantType: bestMatch.typeDef,
    grantTypeMatchPct: bestMatch.matchPct,
    runnerUpType: secondMatch.typeDef,
    runnerUpMatchPct: secondMatch.matchPct,
    myersType,
    dichotomy: {
      E: ePct,
      I: iPct,
      N: nPct,
      S: sPct,
      T: tPct,
      F: fPct,
      J: jPct,
      P: pPct
    },
    answers,
    completedAt: new Date().toISOString()
  };
}

export const ARCHETYPE_ROLES = [
  {
    role: '主導功能',
    roleName: {
      cantonese: '主導功能',
      zh_tw: '主導功能',
      en: 'Dominant (Hero)'
    },
    index: 0,
    descZh: '你的核心本能與舒適區，運用最自然流暢的力量。',
    descCantonese: '你最自然爆發嘅超能力，用得最順手自如。',
    descEn: 'Your lead instinct and ego champion, operated automatically.'
  },
  {
    role: '輔助功能',
    roleName: {
      cantonese: '輔助功能',
      zh_tw: '輔助功能',
      en: 'Auxiliary (Parent)'
    },
    index: 1,
    descZh: '成熟的良師益友，平衡主導功能，提供深思與指引。',
    descCantonese: '平衡大局嘅智慧夥伴，幫你穩住陣腳，指引方向。',
    descEn: 'The supporting anchor balancing your dominant worldview.'
  },
  {
    role: '第三功能',
    roleName: {
      cantonese: '第三功能',
      zh_tw: '第三功能',
      en: 'Tertiary (Child)'
    },
    index: 2,
    descZh: '充滿玩心但偶爾脆弱的孩子氣面貌，放鬆時展現。',
    descCantonese: '放鬆玩樂時展現嘅赤子童心，偶爾會有啲脆弱。',
    descEn: 'Playful relief function; fun yet occasionally vulnerable.'
  },
  {
    role: '劣勢功能',
    roleName: {
      cantonese: '劣勢功能',
      zh_tw: '劣勢功能',
      en: 'Inferior (Anima)'
    },
    index: 3,
    descZh: '壓抑但渴望整合的阿尼瑪/阿尼姆斯，壓力下的盲點。',
    descCantonese: '壓力下最容易爆發嘅隱藏盲點，但亦係終身修行之處。',
    descEn: 'The gateway to the subconscious; triggers under acute stress.'
  }
];

export const SHADOW_ROLES = [
  {
    role: '第5功能：對立面',
    roleName: {
      cantonese: '第5功能：對立面',
      zh_tw: '第5功能：對立面',
      en: '5th Function: Opposing'
    },
    index: 0,
    descZh: '對立面的頑抗者，當主導受阻時常引發防衛心。',
    descCantonese: '宿敵防衛盾，當你受到威脅時會用嚟頂住。',
    descEn: 'Defensive reflex when the hero’s vision feels contested.'
  },
  {
    role: '第6功能：挑剔者',
    roleName: {
      cantonese: '第6功能：挑剔者',
      zh_tw: '第6功能：挑剔者',
      en: '6th Function: Critical Parent'
    },
    index: 1,
    descZh: '內心嚴苛的審查者，容易用來批判自我或挑剔他人。',
    descCantonese: '心魔批判官，成日暗中審判自己或者挑剔人哋。',
    descEn: 'The inner critical judge; lectures flaws in self and others.'
  },
  {
    role: '第7功能：欺詐者',
    roleName: {
      cantonese: '第7功能：欺詐者',
      zh_tw: '第7功能：欺詐者',
      en: '7th Function: Trickster'
    },
    index: 2,
    descZh: '雙重困境與惡作劇之源，常讓人產生誤判與迷惘。',
    descCantonese: '盲點騙子，最唔擅長處理，容易搞到精神混亂。',
    descEn: 'Deceptive blindspot; creates paradoxical double-binds.'
  },
  {
    role: '第8功能：破壞者',
    roleName: {
      cantonese: '第8功能：破壞者',
      zh_tw: '第8功能：破壞者',
      en: '8th Function: Demon'
    },
    index: 3,
    descZh: '深層毀滅與重生之門，極度崩潰時爆發的破壞力。',
    descCantonese: '深層毀滅與重生，極端崩潰嗰陣先會見到嘅暗黑人格。',
    descEn: 'The deepest shadow; can trigger transformational rebirth or total demolition.'
  }
];
