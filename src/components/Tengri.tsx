interface TengriProps {
  size?: number;
  className?: string;
}

/** Tengri the lynx mascot — inline SVG, soft & clean with green eyes, blink + float */
export function Tengri({ size = 80, className = "" }: TengriProps) {
  return (
    <div
      className={`inline-block animate-float-slow ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 120 120" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="furBody" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FBE9D6" />
            <stop offset="100%" stopColor="#E8C9A8" />
          </radialGradient>
          <radialGradient id="furInner" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF6EC" />
            <stop offset="100%" stopColor="#F2DCC2" />
          </radialGradient>
          <radialGradient id="eyeGreen" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6EE7B7" />
            <stop offset="100%" stopColor="#10B981" />
          </radialGradient>
        </defs>

        {/* Ears */}
        <path d="M28 38 L22 14 L42 28 Z" fill="url(#furBody)" stroke="#C9A97D" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M92 38 L98 14 L78 28 Z" fill="url(#furBody)" stroke="#C9A97D" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M30 33 L26 20 L37 27 Z" fill="#F2C7A0" />
        <path d="M90 33 L94 20 L83 27 Z" fill="#F2C7A0" />
        {/* Ear tufts */}
        <path d="M22 14 L20 6 M22 14 L25 8" stroke="#3A2A1A" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M98 14 L100 6 M98 14 L95 8" stroke="#3A2A1A" strokeWidth="1.5" strokeLinecap="round" />

        {/* Head */}
        <ellipse cx="60" cy="62" rx="40" ry="38" fill="url(#furBody)" stroke="#C9A97D" strokeWidth="1.2" />
        {/* Cheeks/face inner */}
        <ellipse cx="60" cy="70" rx="30" ry="26" fill="url(#furInner)" />

        {/* Side cheek tufts */}
        <path d="M22 70 Q 18 78 24 84 Q 28 80 28 74 Z" fill="#F2DCC2" />
        <path d="M98 70 Q 102 78 96 84 Q 92 80 92 74 Z" fill="#F2DCC2" />

        {/* Spots */}
        <circle cx="40" cy="54" r="1.6" fill="#8B5E3C" opacity="0.55" />
        <circle cx="46" cy="48" r="1.2" fill="#8B5E3C" opacity="0.5" />
        <circle cx="80" cy="54" r="1.6" fill="#8B5E3C" opacity="0.55" />
        <circle cx="74" cy="48" r="1.2" fill="#8B5E3C" opacity="0.5" />

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
        <path d="M56 73 Q60 76 64 73 Q62 78 60 78 Q58 78 56 73 Z" fill="#3A2A1A" />
        {/* Mouth */}
        <path d="M60 78 Q60 82 56 84 M60 78 Q60 82 64 84" stroke="#3A2A1A" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        {/* Whiskers */}
        <path d="M40 78 L20 76 M40 80 L22 82 M80 78 L100 76 M80 80 L98 82" stroke="#8B7355" strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />
      </svg>
    </div>
  );
}
