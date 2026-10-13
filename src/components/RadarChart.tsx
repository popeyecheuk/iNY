import React from 'react';
import { CognitiveFunction, FUNCTIONS_INFO } from '../data/mbtiData';

interface RadarChartProps {
  scores: Record<CognitiveFunction, number>; // 0 - 100
  lang: 'cantonese' | 'zh_tw' | 'en';
}

const FUNCTIONS_ORDER: CognitiveFunction[] = ['Ne', 'Ni', 'Te', 'Ti', 'Se', 'Si', 'Fe', 'Fi'];

export const RadarChart: React.FC<RadarChartProps> = ({ scores, lang }) => {
  const size = 340;
  const center = size / 2;
  const radius = 115;
  const total = FUNCTIONS_ORDER.length;

  const getCoordinates = (index: number, value: number) => {
    const angle = (Math.PI * 2 / total) * index - Math.PI / 2;
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const getLabelCoordinates = (index: number, offset = 26) => {
    const angle = (Math.PI * 2 / total) * index - Math.PI / 2;
    const r = radius + offset;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Levels rings
  const levels = [25, 50, 75, 100];

  // Polygon points
  const points = FUNCTIONS_ORDER.map((fn, i) => {
    const val = Math.max(10, scores[fn] || 0);
    const { x, y } = getCoordinates(i, val);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="relative flex flex-col items-center justify-center p-2">
      <svg width={size} height={size} className="overflow-visible select-none drop-shadow-md">
        <defs>
          <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#6366F1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.5" />
          </linearGradient>
          <filter id="radarGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Concentric rings */}
        {levels.map((level) => {
          const ringPoints = FUNCTIONS_ORDER.map((_, i) => {
            const { x, y } = getCoordinates(i, level);
            return `${x},${y}`;
          }).join(' ');
          return (
            <polygon
              key={level}
              points={ringPoints}
              fill={level === 100 ? 'rgba(30, 41, 59, 0.4)' : 'none'}
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1"
              strokeDasharray={level < 100 ? '3 3' : undefined}
            />
          );
        })}

        {/* Axis lines */}
        {FUNCTIONS_ORDER.map((_, i) => {
          const { x, y } = getCoordinates(i, 100);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="1"
            />
          );
        })}

        {/* Filled Data Polygon */}
        <polygon
          points={points}
          fill="url(#radarGradient)"
          stroke="#A78BFA"
          strokeWidth="2.5"
          filter="url(#radarGlow)"
          className="transition-all duration-700 ease-out"
        />

        {/* Dots on each axis */}
        {FUNCTIONS_ORDER.map((fn, i) => {
          const val = Math.max(10, scores[fn] || 0);
          const { x, y } = getCoordinates(i, val);
          const fnInfo = FUNCTIONS_INFO[fn];
          return (
            <g key={fn} className="group cursor-pointer">
              <circle
                cx={x}
                cy={y}
                r="4.5"
                fill={fnInfo.color}
                stroke="#0F172A"
                strokeWidth="2"
                className="transition-all duration-300 group-hover:scale-150"
              />
            </g>
          );
        })}

        {/* Labels around perimeter */}
        {FUNCTIONS_ORDER.map((fn, i) => {
          const { x, y } = getLabelCoordinates(i, 22);
          const score = scores[fn] || 0;
          const fnInfo = FUNCTIONS_INFO[fn];

          return (
            <g key={`lbl-${fn}`} transform={`translate(${x}, ${y})`}>
              <rect
                x="-26"
                y="-13"
                width="52"
                height="26"
                rx="6"
                fill="#1E293B"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1"
              />
              <text
                x="0"
                y="-1"
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill={fnInfo.color}
                className="font-mono tracking-tight"
              >
                {fn}
              </text>
              <text
                x="0"
                y="9"
                textAnchor="middle"
                fontSize="9"
                fontWeight="600"
                fill="#94A3B8"
                className="font-mono"
              >
                {score}%
              </text>
            </g>
          );
        })}
      </svg>

      <div className="flex flex-wrap items-center justify-center gap-2 mt-2 text-xs text-slate-400">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-sky-400"></span> Perceiving: Ne, Ni, Se, Si
        </span>
        <span className="text-slate-600">•</span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-purple-400"></span> Judging: Te, Ti, Fe, Fi
        </span>
      </div>
    </div>
  );
};
