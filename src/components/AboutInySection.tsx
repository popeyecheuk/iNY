import React from 'react';
import { Compass, Shield, Sparkles, ArrowRight, Activity, Eye, Brain } from 'lucide-react';
import { InyLogo } from './InyLogo';

interface AboutInySectionProps {
  lang: 'cantonese' | 'zh_tw' | 'en';
  onOpenDualTrackModal?: () => void;
  onStartQuiz?: () => void;
}

export const AboutInySection: React.FC<AboutInySectionProps> = ({
  lang,
  onOpenDualTrackModal,
  onStartQuiz
}) => {
  const content = {
    cantonese: {
      badge: '關於 iNY (Inside You)',
      title: '走進真實心智宇宙，拒絕簡化標籤',
      subtitle:
        'iNY 專注於榮格心理學的原創深度解構，結合雙軌演算法，為你揭示意識與潛意識交織的完整人格圖譜。',
      pillars: [
        {
          id: 'dual-track',
          icon: Compass,
          color: 'from-emerald-500 to-teal-500',
          borderColor: 'border-emerald-500/30',
          tag: '雙模型對照架構',
          title: '雙模型對照分析核心（數據邏輯派（Grant 規則模型）與行為表現派（Myers 現實模型））',
          desc:
            '傳統測驗常給出互相矛盾的四字母結果。iNY 創新採用「數據邏輯派（Grant 規則模型）」與「行為表現派（Myers 現實模型）」雙模型對照——前者拆解大腦最嚴謹的學理交替齒輪，後者統計日常情境中的真實外顯加權。兩派對照，方能洞悉你「內心思維」與「現實習慣」的真實反差。'
        },
        {
          id: 'shadow',
          icon: Shield,
          color: 'from-amber-500 to-orange-500',
          borderColor: 'border-amber-500/30',
          tag: '潛意識探索',
          title: '照亮大腦地下室（影子人格（Shadow Functions）與軸心能量分佈）',
          desc:
            '健全的心智絕非只有陽光面。iNY 透過 8 大認知功能（Fe, Ti, Ne, Ni, Se, Si, Te, Fi）的軸心能量分佈與四維向度天平，不單解析日常調用的 4 個意識功能，更深入探索深藏於潛意識深處的第 5 至第 8 影子人格（Shadow Functions）。在壓力、危機或自我防禦時，理解你的影子人格（Shadow Functions），是邁向人格整合與情緒自主的關鍵。'
        },
        {
          id: 'agency',
          icon: Sparkles,
          color: 'from-violet-500 to-indigo-500',
          borderColor: 'border-violet-500/30',
          tag: '自主人格主權',
          title: '以數據為參考，賦予你自主判斷的主權',
          desc:
            '測驗結果不是用來將你框限在刻板印象的模具，而是一張高解析度的自我探索參考圖。iNY 提供以百分比呈現的正規化分數與全維度雷達圖，將詮釋與覺察的權力交還給你自己，協助你在生活、職場與人際關係中，有意識地調用天賦、包容盲點。'
        }
      ],
      methodologyBtn: '了解雙模型對照分析原理',
      startBtn: '開始 96 題深度評估'
    },
    zh_tw: {
      badge: '關於 iNY (Inside You)',
      title: '走進真實心智宇宙，拒絕簡化標籤',
      subtitle:
        'iNY 專注於榮格分析心理學的原創深度解構，結合雙軌演算法，為你揭示意識與潛意識交織的完整心智圖譜。',
      pillars: [
        {
          id: 'dual-track',
          icon: Compass,
          color: 'from-emerald-500 to-teal-500',
          borderColor: 'border-emerald-500/30',
          tag: '雙模型對照架構',
          title: '雙模型對照分析核心（數據邏輯派（Grant 規則模型）與行為表現派（Myers 現實模型））',
          desc:
            '傳統測驗常讓人感到模稜兩可。iNY 創新採用「數據邏輯派（Grant 規則模型）」與「行為表現派（Myers 現實模型）」雙模型對照——前者拆解大腦最嚴謹的學理交替骨架，後者統計日常生活情境中的真實外顯偏好。兩派相互對照，方能洞察你「內在思維」與「現實習慣」的真實反差與豐富層次。'
        },
        {
          id: 'shadow',
          icon: Shield,
          color: 'from-amber-500 to-orange-500',
          borderColor: 'border-amber-500/30',
          tag: '潛意識探索',
          title: '照亮大腦地下室（影子人格（Shadow Functions）與軸心能量分佈）',
          desc:
            '完整的人格絕非只有光明面。iNY 透過 8 大認知功能（Fe, Ti, Ne, Ni, Se, Si, Te, Fi）的軸心能量分佈與四大向度天平，不僅剖析日常最擅長的 4 個意識功能，更深入探索潛藏於潛意識深處的第 5 至第 8 影子人格（Shadow Functions）。在面對高度壓力、外界質疑或心理防禦時，理解你的影子人格（Shadow Functions）正是走向成熟與自我整合的基石。'
        },
        {
          id: 'agency',
          icon: Sparkles,
          color: 'from-violet-500 to-indigo-500',
          borderColor: 'border-violet-500/30',
          tag: '自主人格主權',
          title: '以數據為參考，賦予你自主判斷的主權',
          desc:
            '測驗結果不是用來將你框架在二分法標籤中，而是一張高解析度的自我探索參考圖。iNY 提供以百分比呈現的正規化分數與全覽雷達圖，將詮釋與覺察的權利交還給每位使用者，引導你在生活、職場與人際互動中，有意識地發揮優勢、接納盲點。'
        }
      ],
      methodologyBtn: '了解雙模型對照分析原理',
      startBtn: '開始 96 題深度評估'
    },
    en: {
      badge: 'About iNY (Inside You)',
      title: 'Explore Your Inner Universe Beyond Simplistic Labels',
      subtitle:
        'iNY synthesizes classic Jungian analytical psychology with dual-track algorithmic modeling to map your multidimensional cognitive architecture.',
      pillars: [
        {
          id: 'dual-track',
          icon: Compass,
          color: 'from-emerald-500 to-teal-500',
          borderColor: 'border-emerald-500/30',
          tag: 'Dual-Model Core',
          title: 'Dual-Model Comparison: Data-Logic Model (Grant Framework) vs Behavioral-Expression Model (Myers Framework)',
          desc:
            'Standard 4-letter tests frequently produce conflicting outcomes. iNY resolves this through simultaneous validation across the Data-Logic Model (Grant Framework) and the Behavioral-Expression Model (Myers Framework). The former assesses the rigorous alternating functional architecture of cognition, while the latter measures empirical behavioral patterns in daily scenarios. Evaluating both frameworks reveals the rich dynamic between cognitive structure and outward habits.'
        },
        {
          id: 'shadow',
          icon: Shield,
          color: 'from-amber-500 to-orange-500',
          borderColor: 'border-amber-500/30',
          tag: 'Shadow Psychology',
          title: 'Illuminating the Subconscious: Shadow Functions & Axis Energy Distribution',
          desc:
            'A comprehensive psychological portrait spans conscious and subconscious realms. In addition to measuring your 4 conscious ego functions across Fe, Ti, Ne, Ni, Se, Si, Te, Fi, iNY charts the Axis Energy Distribution and investigates the 5th through 8th Shadow Functions. Recognizing your Shadow Functions under acute stress or defensiveness unlocks profound individuation and self-integration.'
        },
        {
          id: 'agency',
          icon: Sparkles,
          color: 'from-violet-500 to-indigo-500',
          borderColor: 'border-violet-500/30',
          tag: 'Cognitive Sovereignty',
          title: 'Data-Referenced Insights Empowering Personal Growth',
          desc:
            'Assessment outcomes are not designed to confine personal identity to rigid stereotypes, serving instead as a high-resolution map for self-discovery. iNY provides normalized scores presented as percentages and an 8-function radar map, placing insightful awareness directly in your hands to cultivate your natural strengths and bridge blind spots across career, relationships, and life.'
        }
      ],
      methodologyBtn: 'Explore Dual-Model Comparison Methodology',
      startBtn: 'Start 96-Item In-Depth Assessment'
    }
  }[lang];

  return (
    <section className="relative overflow-hidden rounded-2xl bg-slate-900/90 border border-white/10 p-6 md:p-8 shadow-xl backdrop-blur-md">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 space-y-6">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-3.5 px-5 py-2 rounded-full bg-slate-800/80 border border-white/10 text-sm sm:text-base font-semibold text-slate-200 mb-4 shadow-sm">
            <InyLogo size={36} className="h-7 sm:h-8 w-auto block flex-shrink-0" />
            <span>{content.badge}</span>
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            {content.title}
          </h2>

          <p className="text-xs md:text-sm text-slate-300 mt-2 leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {content.pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className={`relative bg-slate-800/60 rounded-xl border border-white/5 p-5 flex flex-col justify-between transition-all hover:bg-slate-800/80 hover:${pillar.borderColor} hover:-translate-y-0.5`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${pillar.color} flex items-center justify-center text-slate-950 font-bold shadow-md`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold font-mono text-slate-300 px-2 py-0.5 rounded bg-slate-900/60 border border-white/5">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-100 mb-2 leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action strip */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/5">
          {onOpenDualTrackModal && (
            <button
              onClick={onOpenDualTrackModal}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 transition-all active:scale-95 cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>{content.methodologyBtn}</span>
            </button>
          )}

          {onStartQuiz && (
            <button
              onClick={onStartQuiz}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-md shadow-violet-950/40 transition-all active:scale-95 cursor-pointer ml-auto"
            >
              <span>{content.startBtn}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
