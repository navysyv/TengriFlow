interface TengriProps {
  size?: number;
  className?: string;
}

/** Tengri the lynx mascot — friendly, soft, rounded, warm brown fur, big shiny green eyes, gentle smile. */
export function Tengri({ size = 80, className = "" }: TengriProps) {
  return (
    <div
      className={`inline-block animate-float-slow ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 120 120" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Warm caramel fur */}
          <radialGradient id="fur" cx="50%" cy="38%" r="68%">
            <stop offset="0%" stopColor="#E0A36A" />
            <stop offset="100%" stopColor="#A06A38" />
          </radialGradient>
          {/* Light cream belly / face inner */}
          <radialGradient id="cream" cx="50%" cy="55%" r="58%">
            <stop offset="0%" stopColor="#FFF1DA" />
            <stop offset="100%" stopColor="#F1D2A4" />
          </radialGradient>
          {/* Bright friendly green eyes */}
          <radialGradient id="eye" cx="40%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#A7F3D0" />
            <stop offset="60%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#0F8F5E" />
          </radialGradient>
          <radialGradient id="cheek" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFB8A8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#FFB8A8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ears — rounded, friendly */}
        <path d="M30 36 Q24 14 40 24 Q42 30 36 38 Z" fill="url(#fur)" stroke="#6B3F1C" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M90 36 Q96 14 80 24 Q78 30 84 38 Z" fill="url(#fur)" stroke="#6B3F1C" strokeWidth="1.2" strokeLinejoin="round" />
        {/* Inner ears — soft pink */}
        <path d="M32 33 Q29 22 37 28 Q38 32 35 36 Z" fill="#FFC9A8" />
        <path d="M88 33 Q91 22 83 28 Q82 32 85 36 Z" fill="#FFC9A8" />
        {/* Tiny ear tufts */}
        <path d="M28 16 L26 9 M32 14 L33 8" stroke="#5C3A1E" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M92 16 L94 9 M88 14 L87 8" stroke="#5C3A1E" strokeWidth="1.4" strokeLinecap="round" />

        {/* Head — rounder, softer */}
        <ellipse cx="60" cy="64" rx="42" ry="40" fill="url(#fur)" stroke="#6B3F1C" strokeWidth="1.2" />
        {/* Cream face/belly area */}
        <ellipse cx="60" cy="74" rx="32" ry="26" fill="url(#cream)" />

        {/* Soft cheek tufts */}
        <path d="M20 70 Q 14 80 22 86 Q 28 82 28 74 Z" fill="#F1D2A4" />
        <path d="M100 70 Q 106 80 98 86 Q 92 82 92 74 Z" fill="#F1D2A4" />

        {/* Subtle spots — gentle pattern */}
        <circle cx="40" cy="50" r="1.8" fill="#5C3A1E" opacity="0.4" />
        <circle cx="48" cy="44" r="1.3" fill="#5C3A1E" opacity="0.35" />
        <circle cx="80" cy="50" r="1.8" fill="#5C3A1E" opacity="0.4" />
        <circle cx="72" cy="44" r="1.3" fill="#5C3A1E" opacity="0.35" />
        <circle cx="52" cy="38" r="1.1" fill="#5C3A1E" opacity="0.3" />
        <circle cx="68" cy="38" r="1.1" fill="#5C3A1E" opacity="0.3" />

        {/* Rosy cheeks */}
        <ellipse cx="34" cy="74" rx="7" ry="5" fill="url(#cheek)" />
        <ellipse cx="86" cy="74" rx="7" ry="5" fill="url(#cheek)" />

        {/* EYES — big, bright, friendly with shine */}
        <g className="animate-blink" style={{ transformOrigin: "46px 62px" }}>
          {/* eye white */}
          <ellipse cx="46" cy="62" rx="8" ry="9" fill="white" />
          {/* iris */}
          <circle cx="46" cy="63" r="6.5" fill="url(#eye)" />
          {/* pupil */}
          <ellipse cx="46" cy="63" rx="2.4" ry="3.2" fill="#0A1F14" />
          {/* big shine */}
          <circle cx="48.2" cy="60.8" r="1.8" fill="white" />
          {/* tiny shine */}
          <circle cx="44.5" cy="65" r="0.9" fill="white" opacity="0.85" />
        </g>
        <g className="animate-blink" style={{ transformOrigin: "74px 62px" }}>
          <ellipse cx="74" cy="62" rx="8" ry="9" fill="white" />
          <circle cx="74" cy="63" r="6.5" fill="url(#eye)" />
          <ellipse cx="74" cy="63" rx="2.4" ry="3.2" fill="#0A1F14" />
          <circle cx="76.2" cy="60.8" r="1.8" fill="white" />
          <circle cx="72.5" cy="65" r="0.9" fill="white" opacity="0.85" />
        </g>

        {/* Cute heart-shaped nose */}
        <path d="M60 75 Q56 73 56 76 Q56 79 60 81 Q64 79 64 76 Q64 73 60 75 Z" fill="#3A2014" />

        {/* Gentle smile — soft curve */}
        <path d="M60 81 Q60 85 55 86" stroke="#3A2014" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M60 81 Q60 85 65 86" stroke="#3A2014" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        {/* Tiny smile lift at corners */}
        <path d="M55 86 Q53 86.5 52 85.5" stroke="#3A2014" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <path d="M65 86 Q67 86.5 68 85.5" stroke="#3A2014" strokeWidth="1.4" fill="none" strokeLinecap="round" />

        {/* Whiskers — soft */}
        <path d="M40 80 L22 78 M40 82 L24 84 M80 80 L98 78 M80 82 L96 84" stroke="#8B5A2B" strokeWidth="0.7" strokeLinecap="round" opacity="0.55" />
      </svg>
    </div>
  );
}
