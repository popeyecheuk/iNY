import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

interface FaqSectionProps {
  lang: 'cantonese' | 'zh_tw' | 'en';
}

export const FaqSection: React.FC<FaqSectionProps> = ({ lang }) => {
  // Open the first question by default for great discoverability
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  const faqData = {
    cantonese: {
      badge: '常見問題 • 深度指南',
      title: '常見問題（Q&A 深度解析）',
      subtitle: '深入拆解榮格認知功能體系、雙模型對照架構與影子人格（Shadow Functions）核心原理。',
      items: [
        {
          q: '什麼是榮格 8 大認知功能測驗？與坊間 16 型人格有何不同？',
          a: '常見的 16 型人格測試常被簡化為二元性格標籤（例如非黑即白的 E 與 I）。而榮格八大認知功能（Fe, Ti, Ne, Ni, Se, Si, Te, Fi）才是分析心理學的底層基石。卡爾·榮格（Carl Jung）提出人類的心智運作由感知（感覺與直覺）與判斷（思考與情感）構成，並朝向內向或外向兩個態度維度開展。評估這 8 大功能的強度位階，才能洞察大腦處理資訊與做決策的底層機制，而非停留於表面刻板標籤。'
        },
        {
          id: 'dual-track-diff',
          q: '數據邏輯派（Grant 規則模型）與行為表現派（Myers 現實模型）有什麼差別？',
          a: '這正是 iNY 雙模型對照分析架構的核心。「數據邏輯派（Grant 規則模型）」遵循嚴格的內外向交替功能棧（例如 INTJ 必然為 Ni-Te-Fi-Se），代表你在心智理論模型下的核心運作骨架；而「行為表現派（Myers 現實模型）」則直接統計日常情境題目中的真實偏好加權（E-I, N-S, T-F, J-P），反映你在日常生活中的外在行為習慣。兩派結果若有不同，正代表你的內心思維與外在行為具備豐富的反差與多元性。'
        },
        {
          id: 'shadow-explanation',
          q: '為什麼測驗結果會出現影子人格（Shadow Functions）？',
          a: '健全的心智絕非只有意識的光明面。在榮格與約翰·畢比（John Beebe）的模型中，除了意識層面最常調用的 4 個核心功能（主導、輔助、第三、劣勢）外，其餘 4 個方向相反的功能潛藏於潛意識深處，統稱為「影子人格（Shadow Functions）」（第 5 宿敵、第 6 挑剔者、第 7 欺詐者、第 8 破壞者）。當面臨高壓衝擊、受到威脅或自我防禦時，這些未被完全馴化的影子能量便會湧現。覺察影子人格（Shadow Functions），是邁向人格整合與情緒自主的關鍵必經之路。'
        },
        {
          id: 'score-calculation',
          q: 'iNY 測驗是如何計算我的軸心能量分佈與百分比的？',
          a: 'iNY 共有 96 道情境題目，每項功能約 11 至 13 題，用 1 至 5 分嘅李克特量表作答。系統將各功能嘅題目分數加總，再按題數轉換成 0% 至 100% 嘅能量百分比，繪製出你嘅雷達圖。之後分別用 Grant 規則模型同 Myers 現實模型計算，得出兩份對照結果。未作答嘅題目會以中立計算。'
        },
        {
          id: 'test-duration',
          q: '測驗需要花費多長時間？中途未填答題目會如何計分？',
          a: '96 題深度評估通常需要約 8 至 12 分鐘。平台提供「盲測模式」（隱藏題目所屬功能代碼，避免心理暗示）與「沉浸模式」（自動切換下一題）。系統具備本機自動保存機制，中途退出隨時可返回繼續；若有跳過或未填寫的題目，系統將預設以「中立（Neutral）」計入。'
        }
      ]
    },
    zh_tw: {
      badge: '常見問題 • 深度指南',
      title: '常見問題（Q&A 深度解析）',
      subtitle: '深入拆解榮格認知功能體系、雙模型對照架構與影子人格（Shadow Functions）核心原理。',
      items: [
        {
          q: '什麼是榮格 8 大認知功能測驗？與坊間 16 型人格有何不同？',
          a: '常見的 16 型人格測試常被簡化為二元性格標籤（例如非黑即白的 E 與 I）。而榮格八大認知功能（Fe, Ti, Ne, Ni, Se, Si, Te, Fi）才是分析心理學的底層基石。卡爾·榮格（Carl Jung）提出人類的心智歷程由感知（感覺與直覺）與判斷（思考與情感）交織而成，並朝向內向或外向兩個態度維度開展。評估這 8 大功能的強弱排序，才能看見大腦處理資訊與決策的底層機制，而非表面刻板標籤。'
        },
        {
          id: 'dual-track-diff',
          q: '數據邏輯派（Grant 規則模型）與行為表現派（Myers 現實模型）有什麼差別？',
          a: '這正是 iNY 雙模型對照分析架構的核心。「數據邏輯派（Grant 規則模型）」遵循嚴格的內外向交替規則功能棧（例如 INTJ 必然為 Ni-Te-Fi-Se），代表你在心智理論模型下的核心運作骨架；而「行為表現派（Myers 現實模型）」則直接統計日常情境題目中的真實偏好加權（E-I, N-S, T-F, J-P），反映你在日常生活中的外在行為習慣。兩派結果若有不同，正代表你的內在思維與外在行為具備豐富的反差與多元性。'
        },
        {
          id: 'shadow-explanation',
          q: '為什麼測驗結果會出現影子人格（Shadow Functions）？',
          a: '完整的心智絕非只有光明面。在榮格與約翰·畢比（John Beebe）的原型模型中，除了意識層面最常調用的 4 個核心功能（主導、輔助、第三、劣勢）外，其餘 4 個方向相反的功能潛藏於潛意識深處，統稱為「影子人格（Shadow Functions）」（第 5 宿敵、第 6 挑剔者、第 7 欺詐者、第 8 破壞者）。當面臨高壓情境、受到質疑或陷入心理防禦時，這些平時未被完全馴化的影子能量便會湧現。覺察影子人格（Shadow Functions），是邁向心智整合與自我成熟的基石。'
        },
        {
          id: 'score-calculation',
          q: 'iNY 測驗是如何計算我的軸心能量分佈與百分比的？',
          a: 'iNY 共有 96 道情境題目，每項功能約 11 至 13 題，採用 1 至 5 分的李克特量表作答。系統將各功能的題目分數加總，再按題數轉換成 0% 至 100% 的能量百分比，繪製出你的雷達圖。之後分別用 Grant 規則模型與 Myers 現實模型計算，得出兩份對照結果。未作答的題目會以中立計算。'
        },
        {
          id: 'test-duration',
          q: '測驗需要花費多長時間？中途未填答題目會如何計分？',
          a: '96 題深度評估通常需要約 8 至 12 分鐘。平台提供「盲測模式」（隱藏題目所屬功能代碼，避免心理暗示）與「沉浸模式」（作答後自動切換下一題）。系統具備本機自動保存機制，中途離開可隨時返回接續；若有跳過或未填答題目，系統將預設以「中立（Neutral）」計入。'
        }
      ]
    },
    en: {
      badge: 'Frequently Asked Questions • FAQ',
      title: 'Frequently Asked Questions (Q&A & Method Guide)',
      subtitle: 'Comprehensive clarity on Jungian cognitive architecture, dual-track algorithms, and Shadow Functions.',
      items: [
        {
          q: 'What are the 8 Jungian Cognitive Functions, and how do they differ from binary 4-letter tests?',
          a: 'Standard 4-letter personality tests frequently reduce human temperament to rigid dichotomies (such as E vs I). In analytical psychology, Carl Jung discovered that human cognition is driven by 8 dynamic functions combining Perceiving (Sensing/Intuition) and Judging (Thinking/Feeling) across Extraverted or Introverted attitudes: Fe, Ti, Ne, Ni, Se, Si, Te, Fi. Evaluating functional hierarchy unlocks how your mind synthesizes input and reaches decisions at a structural level.'
        },
        {
          id: 'dual-track-diff',
          q: 'What is the distinction between Data-Logic Model (Grant Framework) and Behavioral-Expression Model (Myers Framework)?',
          a: 'This serves as the core of iNY\'s Dual-Model Comparison. The Data-Logic Model (Grant Framework) adheres to rigorous alternating functional polarity (e.g. INTJ structured as Ni-Te-Fi-Se), representing your theoretical cognitive architecture. Conversely, the Behavioral-Expression Model (Myers Framework) tabulates empirical responses across dichotomy axes to capture observable interpersonal and situational habits. Divergence between both tracks illustrates compelling nuance between internal cognitive blueprints and external expressions.'
        },
        {
          id: 'shadow-explanation',
          q: 'Why does the report uncover Shadow Functions?',
          a: 'Psychological balance encompasses both conscious clarity and subconscious depths. In John Beebe\'s archetype taxonomy, beyond your 4 conscious ego functions, 4 opposing processes inhabit the subconscious as Shadow Functions (5th Opposing, 6th Critical Parent, 7th Trickster, 8th Demon). Under intense stress or defensive posture, these latent energies emerge. Consciously integrating your Shadow Functions is essential for individuation and mature self-leadership.'
        },
        {
          id: 'score-calculation',
          q: 'How does iNY evaluate Axis Energy Distribution and percentage metrics?',
          a: 'iNY features 96 situational questions, with approximately 11 to 13 items per function answered on a 1-to-5 Likert scale. The system sums the scores for each function\'s questions and converts them into a 0% to 100% energy percentage based on item count to plot your radar chart. Results are then calculated separately using both the Grant Rule Model and the Myers Reality Model to generate two contrasting profiles. Unanswered questions are calculated as neutral.'
        },
        {
          id: 'test-duration',
          q: 'What is the estimated completion time, and how are unanswered items calculated?',
          a: 'The 96-item in-depth assessment requires approximately 8 to 12 minutes. Features include Blind Mode (concealing function codes to eliminate confirmation bias) and Focus Mode (auto-advancing questions). Your progress autosaves continuously in local storage; any unanswered items automatically default to Neutral.'
        }
      ]
    }
  }[lang];

  return (
    <section className="relative overflow-hidden rounded-2xl bg-slate-900/90 border border-white/10 p-6 md:p-8 shadow-xl backdrop-blur-md">
      <div className="max-w-2xl mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-white/10 text-xs font-semibold text-slate-300 mb-3">
          <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
          <span>{faqData.badge}</span>
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
          {faqData.title}
        </h2>

        <p className="text-xs md:text-sm text-slate-300 mt-2 leading-relaxed">
          {faqData.subtitle}
        </p>
      </div>

      <div className="space-y-3">
        {faqData.items.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-slate-800/80 border-violet-500/40 shadow-md'
                  : 'bg-slate-800/40 border-white/5 hover:border-white/15 hover:bg-slate-800/60'
              }`}
            >
              <button
                onClick={() => toggleItem(idx)}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer transition-colors"
                aria-expanded={isOpen}
              >
                <span className="text-xs sm:text-sm font-bold text-slate-200 flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-md bg-slate-700/80 text-xs font-mono font-bold flex items-center justify-center text-slate-300 flex-shrink-0">
                    Q{idx + 1}
                  </span>
                  <span>{item.q}</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-violet-400' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3 animate-fadeIn">
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
