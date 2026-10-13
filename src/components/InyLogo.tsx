import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  variant?: 'full' | 'mark'; // 'full' includes "INSIDE YOU", 'mark' is just "iNY"
  invert?: boolean; // light vs dark background adaptation
}

/**
 * INSIDE YOU (iNY) Official Brand Logo
 * Recreates the exact minimalist typography and glowing blue "i" dot from the design:
 * - Glowing celestial cyan/blue sphere dot on the letter "i"
 * - Warm stone/taupe stem for "i" (rounded pill)
 * - Modern dark slate-charcoal rounded lowercase-styled "N" and "Y"
 * - Sleek geometric uppercase subtitle "INSIDE YOU"
 */
export function InyLogo({
  className = '',
  size = 40,
  variant = 'full',
  invert = false
}: LogoProps) {
  const mainTextColor = invert ? '#1e293b' : '#f8fafc';
  const stemColor = '#a89f91'; // refined warm stone / taupe beige from original design
  const subtextColor = invert ? '#64748b' : '#94a3b8';

  if (variant === 'mark') {
    return (
      <svg
        viewBox="0 0 172 91"
        width={size}
        height={Math.round((size * 91) / 172)}
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="iNY Logo Mark"
      >
        <defs>
          {/* Glowing dot over 'i' */}
          <radialGradient id="inyDotGlowMark" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#bae6fd" />
            <stop offset="45%" stopColor="#38bdf8" />
            <stop offset="75%" stopColor="#0284c7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
          </radialGradient>
          <filter id="inyDotFilterMark" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Letter 'i' Dot: Soft glowing blue sphere */}
        <g filter="url(#inyDotFilterMark)">
          <circle cx="24" cy="22" r="14" fill="#38bdf8" opacity="0.4" />
          <circle cx="24" cy="22" r="9" fill="url(#inyDotGlowMark)" />
          <circle cx="22" cy="20" r="3" fill="#ffffff" opacity="0.6" />
        </g>

        {/* Letter 'i' Stem: Taupe/Stone rounded pill */}
        <rect
          x="18"
          y="38"
          width="12"
          height="52"
          rx="6"
          fill={stemColor}
        />

        {/* Letter 'N' */}
        <path
          d="M48 90 V38 C48 35 50 33 53 33 H55 C58 33 60 35 62 37.5 L86 73 V38 C86 35 88 33 91 33 H93 C96 33 98 35 98 38 V90 C98 93 96 95 93 95 H91 C88 95 86 93 84 90.5 L60 55 V90 C60 93 58 95 55 95 H53 C50 95 48 93 48 90 Z"
          fill={mainTextColor}
        />

        {/* Letter 'Y' */}
        <path
          d="M106 38 C106 35 108 33 111 33 H113 C116 33 118 35 120 37.5 L133 58.5 L146 37.5 C148 35 150 33 153 33 H155 C158 33 160 35 160 38 C160 39.5 159 41 158 42.5 L139 71 V90 C139 93 137 95 134 95 H132 C129 95 127 93 127 90 V71 L108 42.5 C107 41 106 39.5 106 38 Z"
          fill={mainTextColor}
        />
      </svg>
    );
  }

  // Full Lockup: iNY + INSIDE YOU subtitle
  return (
    <svg
      viewBox="0 0 240 145"
      width={size}
      height={Math.round((size * 145) / 240)}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="INSIDE YOU (iNY) Logo"
    >
      <defs>
        {/* Glowing aura for the dot */}
        <radialGradient id="inyDotGlowFull" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#bae6fd" />
          <stop offset="45%" stopColor="#38bdf8" />
          <stop offset="75%" stopColor="#0284c7" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
        </radialGradient>
        <filter id="inyDotFilterFull" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* --- iNY Main Letters --- */}
      {/* Letter 'i' Dot: Soft luminous celestial blue sphere with glow */}
      <g filter="url(#inyDotFilterFull)">
        <circle cx="48" cy="28" r="17" fill="#38bdf8" opacity="0.35" />
        <circle cx="48" cy="28" r="10.5" fill="url(#inyDotGlowFull)" />
        <circle cx="45.5" cy="25.5" r="3.2" fill="#ffffff" opacity="0.65" />
      </g>

      {/* Letter 'i' Stem: Warm Taupe / Stone rounded capsule */}
      <rect
        x="41.5"
        y="46"
        width="13"
        height="54"
        rx="6.5"
        fill={stemColor}
      />

      {/* Letter 'N' */}
      <path
        d="M74 97 V46 C74 42.5 76.5 40 80 40 H82.5 C85.5 40 88 42 90 45 L118 84.5 V46 C118 42.5 120.5 40 124 40 H126.5 C130 40 132.5 42.5 132.5 46 V97 C132.5 100.5 130 103 126.5 103 H124 C121 103 118.5 101 116.5 98 L88.5 58.5 V97 C88.5 100.5 86 103 82.5 103 H80 C76.5 103 74 100.5 74 97 Z"
        fill={mainTextColor}
      />

      {/* Letter 'Y' */}
      <path
        d="M141.5 46 C141.5 42.5 144 40 147.5 40 H150 C153.5 40 156 42 158 45 L173.5 69.5 L189 45 C191 42 193.5 40 197 40 H199.5 C203 40 205.5 42.5 205.5 46 C205.5 48 204.5 49.5 203 52 L180.5 83.5 V97 C180.5 100.5 178 103 174.5 103 H172.5 C169 103 166.5 100.5 166.5 97 V83.5 L144 52 C142.5 49.5 141.5 48 141.5 46 Z"
        fill={mainTextColor}
      />

      {/* --- Subtitle: INSIDE YOU --- */}
      <text
        x="120"
        y="132"
        textAnchor="middle"
        fill={subtextColor}
        fontSize="17.5"
        fontWeight="600"
        letterSpacing="6.5"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      >
        INSIDE YOU
      </text>
    </svg>
  );
}
