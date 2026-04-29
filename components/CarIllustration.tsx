export default function CarIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 400"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#CC1414" />
          <stop offset="50%" stopColor="#A50F0F" />
          <stop offset="100%" stopColor="#6B0808" />
        </linearGradient>
        <linearGradient id="glassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1E1E1E" />
          <stop offset="100%" stopColor="#0A0A0A" />
        </linearGradient>
        <radialGradient id="wheelGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2A2A2A" />
          <stop offset="60%" stopColor="#111111" />
          <stop offset="100%" stopColor="#0A0A0A" />
        </radialGradient>
        <radialGradient id="headlightGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FEF3C7" stopOpacity="1" />
          <stop offset="40%" stopColor="#FBBF24" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#CC1414" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="shadowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="300" cy="322" rx="240" ry="20" fill="url(#shadowGrad)" />

      {/* Headlight beam */}
      <g className="animate-headlight">
        <ellipse cx="80" cy="242" rx="100" ry="32" fill="url(#headlightGrad)" opacity="0.65" />
      </g>

      {/* Lower body */}
      <path
        d="M 90 272 Q 95 252 115 247 L 175 242 Q 195 217 225 202 L 380 202 Q 415 202 440 232 L 495 247 Q 515 252 520 272 L 520 296 Q 520 306 510 306 L 100 306 Q 90 306 90 296 Z"
        fill="url(#bodyGrad)"
      />

      {/* Roof / cabin */}
      <path
        d="M 200 242 Q 215 207 245 207 L 365 207 Q 395 207 415 237 L 415 242 Z"
        fill="url(#glassGrad)"
      />

      {/* Door divider */}
      <line x1="305" y1="209" x2="305" y2="242" stroke="#0A0A0A" strokeWidth="2" />

      {/* Highlight stripe */}
      <path
        d="M 100 270 L 510 270"
        stroke="#FF4444"
        strokeWidth="1.5"
        opacity="0.35"
      />

      {/* Window reflection */}
      <path
        d="M 215 232 L 250 217 L 290 217 L 270 237 Z"
        fill="#ffffff"
        opacity="0.1"
      />

      {/* Door handles */}
      <rect x="260" y="264" width="20" height="3" rx="1.5" fill="#0A0A0A" />
      <rect x="345" y="264" width="20" height="3" rx="1.5" fill="#0A0A0A" />

      {/* Headlight */}
      <ellipse cx="105" cy="257" rx="14" ry="9" fill="#FEF3C7" />
      <ellipse cx="105" cy="257" rx="9" ry="6" fill="#ffffff" />

      {/* Taillight */}
      <rect x="495" y="254" width="18" height="10" rx="3" fill="#CC1414" />

      {/* School sign on roof */}
      <rect x="278" y="192" width="64" height="18" rx="3" fill="#CC1414" stroke="#0A0A0A" strokeWidth="1.5" />
      <text
        x="310"
        y="205"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="11"
        fontWeight="900"
        fontFamily="system-ui"
      >
        AMUR
      </text>

      {/* Front wheel */}
      <circle cx="170" cy="306" r="38" fill="url(#wheelGrad)" />
      <circle cx="170" cy="306" r="22" fill="#111111" />
      <circle cx="170" cy="306" r="6" fill="#CC1414" />
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <line
          key={`f-${angle}`}
          x1="170"
          y1="306"
          x2={170 + 18 * Math.cos((angle * Math.PI) / 180)}
          y2={306 + 18 * Math.sin((angle * Math.PI) / 180)}
          stroke="#2A2A2A"
          strokeWidth="3"
        />
      ))}

      {/* Rear wheel */}
      <circle cx="445" cy="306" r="38" fill="url(#wheelGrad)" />
      <circle cx="445" cy="306" r="22" fill="#111111" />
      <circle cx="445" cy="306" r="6" fill="#CC1414" />
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <line
          key={`r-${angle}`}
          x1="445"
          y1="306"
          x2={445 + 18 * Math.cos((angle * Math.PI) / 180)}
          y2={306 + 18 * Math.sin((angle * Math.PI) / 180)}
          stroke="#2A2A2A"
          strokeWidth="3"
        />
      ))}
    </svg>
  );
}
