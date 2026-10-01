import React from 'react';

interface AdvyxLogoProps {
  variant?: 'wordmark' | 'badge' | 'minimal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  isDark?: boolean;
}

export const AdvyxLogo: React.FC<AdvyxLogoProps> = ({
  variant = 'badge',
  size = 'md',
  className = '',
  isDark = false,
}) => {
  const sizeMap = {
    sm: { width: 105, height: 26, badgeW: 32, badgeH: 32, textClass: 'text-sm' },
    md: { width: 135, height: 34, badgeW: 40, badgeH: 40, textClass: 'text-base' },
    lg: { width: 180, height: 45, badgeW: 52, badgeH: 52, textClass: 'text-xl' },
    xl: { width: 240, height: 60, badgeW: 64, badgeH: 64, textClass: 'text-2xl' },
  };

  const { width, height, textClass } = sizeMap[size];

  /**
   * Authentic Vector SVG of ADVYX
   * Faithfully recreated from LOGO ADVYX-01:
   * - Letter A: Solid upper pyramid (NO counter hole), vertical top-left facet,
   *   horizontal crossbar, and the signature inverted triangle (▼) beneath the crossbar.
   * - Letter D: Bold geometric sans curvature with inner counter.
   * - Letter V: Crisp symmetrical diagonal strokes.
   * - Letter Y: Centered meeting point and vertical lower stem.
   * - Letter X: Distinctive detached lower-right foot separated by a clean horizontal gap.
   */
  const AdvyxWordmarkSVG = ({ fill = '#FFFFFF' }: { fill?: string }) => (
    <svg
      viewBox="0 0 475 100"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-colors duration-300"
      aria-label="ADVYX"
    >
      {/* --- LETTER A (100% Authentic to LOGO ADVYX-01) --- */}
      {/* Single seamless path: solid upper body, legs, crossbar, and inverted triangle under crossbar */}
      <path
        d="M10 88L46 20V12H62L98 88H80L62 52L54 86L46 52L28 88H10Z"
        fill={fill}
      />

      {/* --- LETTER D --- */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M116 12H154C184 12 198 28 198 50C198 72 184 88 154 88H116V12ZM138 32H152C168 32 176 39 176 50C176 61 168 68 152 68H138V32Z"
        fill={fill}
      />

      {/* --- LETTER V --- */}
      <path
        d="M208 12H229L247 70L265 12H286L258 88H236L208 12Z"
        fill={fill}
      />

      {/* --- LETTER Y --- */}
      <path
        d="M296 12H318L336 48L354 12H376L347 58V88H325V58L296 12Z"
        fill={fill}
      />

      {/* --- LETTER X (with iconic detached bottom-right foot) --- */}
      {/* Main continuous stroke from top-right to bottom-left */}
      <path
        d="M446 12H468L422 88H400L446 12Z"
        fill={fill}
      />
      {/* Top-left arm extending into center intersection */}
      <path
        d="M386 12H408L435 52L422 66L386 12Z"
        fill={fill}
      />
      {/* Detached bottom-right angled foot, separated by a crisp horizontal gap */}
      <path
        d="M442 74H464L474 88H452L442 74Z"
        fill={fill}
      />
    </svg>
  );

  // Badge variant: The royal blue brand box matching LOGO ADVYX-01
  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-3 ${className}`}>
        {/* Brand Square Box matching LOGO ADVYX-01 (#2374B8) */}
        <div
          className="rounded-xl flex items-center justify-center p-1.5 shadow-sm transition-transform hover:scale-105"
          style={{
            backgroundColor: '#2374B8',
            width: sizeMap[size].badgeW,
            height: sizeMap[size].badgeH,
          }}
        >
          {/* Authentic ADVYX A mark:
              Solid upper body, crossbar, and downward-pointing inverted triangle beneath the crossbar */}
          <svg viewBox="0 0 64 64" className="w-full h-full text-white" fill="none">
            <path
              d="M12 52L28 17V12H36L52 52H43L37 34L32 50L27 34L21 52H12Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>

        {/* Wordmark typography */}
        <div className="flex flex-col">
          <span
            className={`font-extrabold tracking-wider leading-none font-display ${textClass} ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}
          >
            ADVYX
          </span>
          <span className="text-[9px] tracking-wider uppercase opacity-50 font-medium mt-1">
            Digital Growth Agency
          </span>
        </div>
      </div>
    );
  }

  // Minimal / pure wordmark variant
  if (variant === 'minimal') {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <AdvyxWordmarkSVG fill="#2374B8" />
      </div>
    );
  }

  // Wordmark mode (adapts to light/dark)
  const fillColor = isDark ? '#FFFFFF' : '#101928';
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <AdvyxWordmarkSVG fill={fillColor} />
    </div>
  );
};
