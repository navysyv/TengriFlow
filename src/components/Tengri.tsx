interface TengriProps {
  size?: number;
  className?: string;
}

/** Tengri the lynx mascot — natural brown fur, lighter belly, darker spots, green eyes. */
export function Tengri({ size = 80, className = "" }: TengriProps) {
  return (
    <div
      className={`inline-block animate-float-slow ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 120 120" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Warm brown/orange fur */}
          <radialGradient id="furBody" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#C8854A" />
            <stop offset="100%" stopColor="#8B5A2B" />
          </radialGradient>
          {/* Lighter belly / face inner */}
          <radialGradient id="furInner" cx="50%" cy="55%" r="55%">
            <stop offset="0%" stopColor="#F5DCB8" />
            <stop offset="100%" stopColor="#D9B084" />
          </radialGradient>
          <radialGradient id="eyeGreen" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6EE7B7" />
            <stop offset="100%" stopColor="#10B981" />
          </radialGradient>
        </defs>

        {/* Ears */}
        <path d="M28 38 L22 14 L42 28 Z" fill="url(#furBody)" stroke="#5C3A1E" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M92 38 L98 14 L78 28 Z" fill="url(#furBody)" stroke="#5C3A1E" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M30 33 L26 20 L37 27 Z" fill="#E8B888" />
        <path d="M90 33 L94 20 L83 27 Z" fill="#E8B888" />
        {/* Ear tufts */}
        <path d="M22 14 L20 6 M22 14 L25 8" stroke="#2A1810" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M98 14 L100 6 M98 14 L95 8" stroke="#2A1810" strokeWidth="1.6" strokeLinecap="round" />

        {/* Head */}
        <ellipse cx="60" cy="62" rx="40" ry="38" fill="url(#furBody)" stroke="#5C3A1E" strokeWidth="1.2" />
        {/* Lighter belly/face */}
        <ellipse cx="60" cy="72" rx="30" ry="24" fill="url(#furInner)" />

        {/* Side cheek tufts (lighter) */}
        <path d="M22 70 Q 18 78 24 84 Q 28 80 28 74 Z" fill="#E8C9A0" />
        <path d="M98 70 Q 102 78 96 84 Q 92 80 92 74 Z" fill="#E8C9A0" />

        {/* Darker spots on the brown fur */}
        <circle cx="38" cy="50" r="2" fill="#3A2410" opacity="0.55" />
        <circle cx="46" cy="44" r="1.4" fill="#3A2410" opacity="0.5" />
        <circle cx="32" cy="58" r="1.6" fill="#3A2410" opacity="0.5" />
        <circle cx="82" cy="50" r="2" fill="#3A2410" opacity="0.55" />
        <circle cx="74" cy="44" r="1.4" fill="#3A2410" opacity="0.5" />
        <circle cx="88" cy="58" r="1.6" fill="#3A2410" opacity="0.5" />
        <circle cx="50" cy="38" r="1.2" fill="#3A2410" opacity="0.45" />
        <circle cx="70" cy="38" r="1.2" fill="#3A2410" opacity="0.45" />

        {/* Eyes - green, with blink */}
        <g className="animate-blink" style={{ transformOrigin: "47px 60px" }}>
          <ellipse cx="47" cy="60" rx="6" ry="7" fill="white" />
          <circle cx="47" cy="60" r="5" fill="url(#eyeGreen)" />
          <circle cx="47" cy="60" r="2" fill="#0F2D1F" />
          <circle cx="48.5" cy="58.5" r="1" fill="white" />
        </g>
        <g className="animate-blink" style={{ transformOrigin: "73px 60px" }}>
          <ellipse cx="73" cy="60" rx="6" ry="7" fill="white" />
          <circle cx="73" cy="60" r="5" fill="url(#eyeGreen)" />
          <circle cx="73" cy="60" r="2" fill="#0F2D1F" />
          <circle cx="74.5" cy="58.5" r="1" fill="white" />
        </g>

        {/* Nose */}
        <path d="M56 73 Q60 76 64 73 Q62 78 60 78 Q58 78 56 73 Z" fill="#2A1810" />
        {/* Mouth */}
        <path d="M60 78 Q60 82 56 84 M60 78 Q60 82 64 84" stroke="#2A1810" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        {/* Whiskers */}
        <path d="M40 78 L20 76 M40 80 L22 82 M80 78 L100 76 M80 80 L98 82" stroke="#5C3A1E" strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />
      </svg>
    </div>
  );
}
