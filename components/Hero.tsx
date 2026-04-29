"use client";

import { ArrowRight } from "lucide-react";

/* ─── helpers ─── */
function pt(cx: number, cy: number, r: number, deg: number): [number, number] {
  const rad = (deg * Math.PI) / 180;
  return [+(cx + r * Math.cos(rad)).toFixed(2), +(cy + r * Math.sin(rad)).toFixed(2)];
}

/* ─── speedometer constants ─── */
const CX = 250, CY = 250;
const R  = 182; // main arc radius

// arc: SVG 120° → 60° clockwise (300° span)
const [ax0, ay0] = pt(CX, CY, R, 120);
const [ax1, ay1] = pt(CX, CY, R, 60);

// 16 ticks every 20° from 120° to 420° (=60°)
const TICKS = Array.from({ length: 16 }, (_, i) => ({
  deg: 120 + i * 20,
  major: i % 3 === 0, // major every 3rd → every 60°
}));

const LABELS = [
  { i: 0,  text: "0"   },
  { i: 3,  text: "40"  },
  { i: 6,  text: "80"  },
  { i: 9,  text: "120" },
  { i: 12, text: "160" },
  { i: 15, text: "200" },
];

// 75% progress arc endpoint: 120° + 0.75×300° = 345°
const [prog75x, prog75y] = pt(CX, CY, R, 345);

// Radar fan: leading line points to 270° (up), 45° clockwise trail to 315°
const [fanLx, fanLy] = pt(CX, CY, 175, 270);
const [fanTx, fanTy] = pt(CX, CY, 175, 315);

const SPOKES = [0, 45, 90, 135];
const RINGS  = [70, 112, 150, 192];

/* ══════════════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════════════ */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center bg-[#0A0A0A] overflow-hidden grain pt-20"
    >
      {/* ── Background atmosphere ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-red-900/12 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-red-900/8 rounded-full blur-3xl" />
        {/* Micro grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(204,20,20,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(204,20,20,0.9) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">

          {/* ══════════════════════
              LEFT — text content
          ══════════════════════ */}
          <div className="lg:col-span-7 space-y-8">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass-red rounded-full px-4 py-1.5">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
              <span className="text-red-300 text-xs font-mono tracking-[0.2em] uppercase">
                Автошкола · Алматы · CAT-B
              </span>
            </div>

            {/* ── Headline ── */}
            <h1 className="font-black leading-[1.02] tracking-tight">
              <span className="block text-[clamp(2.8rem,7vw,5.5rem)] text-white">
                Твой путь к правам
              </span>
              <span
                className="block text-[clamp(2.8rem,7vw,5.5rem)]"
                style={{
                  background: "linear-gradient(90deg, #ffffff 0%, #ff5555 45%, #CC1414 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                начинается здесь.
              </span>
            </h1>

            {/* Description — terminal style */}
            <div className="space-y-2 font-mono text-base text-gray-400">
              <p>
                <span className="text-red-500 mr-2">▸</span>
                Профессиональные инструкторы с австрийскими сертификатами.
              </p>
              <p>
                <span className="text-red-500 mr-2">▸</span>
                Современный автопарк — 15 машин, лучший в Алматы.
              </p>
              <p>
                <span className="text-red-500 mr-2">▸</span>
                <span className="text-white font-semibold">100% сдача</span> экзамена ПДД.
              </p>
            </div>

            {/* ── Glassmorphism CTA ── */}
            <div className="flex flex-wrap items-center gap-5">
              <a
                href="#pricing"
                className="group relative overflow-hidden rounded-full px-9 py-4 select-none cursor-pointer
                           transition-all duration-400
                           hover:scale-[1.03]"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.2), 0 0 0 0 rgba(204,20,20,0)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.border = "1px solid rgba(204,20,20,0.55)";
                  el.style.boxShadow =
                    "inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.2), 0 0 35px rgba(204,20,20,0.25)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.border = "1px solid rgba(255,255,255,0.12)";
                  el.style.boxShadow =
                    "inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.2), 0 0 0 0 rgba(204,20,20,0)";
                }}
              >
                {/* Top light edge */}
                <span className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
                {/* Diagonal gloss panel */}
                <span
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "linear-gradient(118deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 40%, transparent 60%)",
                  }}
                />
                {/* Hover shine sweep */}
                <span className="absolute inset-0 rounded-full overflow-hidden">
                  <span
                    className="absolute top-0 h-full w-2/5 -skew-x-12
                               bg-gradient-to-r from-transparent via-white/10 to-transparent
                               -translate-x-full group-hover:translate-x-[300%]
                               transition-transform duration-700"
                  />
                </span>
                {/* Label */}
                <span className="relative flex items-center gap-3 text-white font-bold text-lg font-mono">
                  Начать обучение
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform duration-200"
                  />
                </span>
              </a>

              <a
                href="#contacts"
                className="text-gray-500 hover:text-red-400 font-mono text-sm transition-colors flex items-center gap-1.5"
              >
                <span className="text-red-700 font-bold">//</span> Записаться бесплатно
              </a>
            </div>

            {/* ── Mini stats ── */}
            <div className="flex flex-wrap gap-8 pt-6 border-t border-white/5">
              {[
                { v: "100%",   l: "сдача ПДД" },
                { v: "15+",    l: "учебных авто" },
                { v: "5",      l: "филиалов" },
                { v: "2.5мес", l: "полный курс" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="text-2xl font-black gradient-text font-mono">{s.v}</p>
                  <p className="text-gray-600 text-xs font-mono mt-0.5 tracking-wider">{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ══════════════════════
              RIGHT — Speedometer/Radar SVG
          ══════════════════════ */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[440px]">
              {/* Outer glow blob behind SVG */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-72 h-72 bg-red-900/25 rounded-full blur-3xl" />
              </div>

              <svg
                viewBox="0 0 500 500"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto relative z-10"
              >
                <defs>
                  {/* Soft glow */}
                  <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="3.5" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  {/* Strong glow */}
                  <filter id="glow2" x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur stdDeviation="7" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>

                  {/* Speedometer arc gradient */}
                  <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="rgba(204,20,20,0.2)" />
                    <stop offset="40%"  stopColor="#CC1414" />
                    <stop offset="100%" stopColor="rgba(204,20,20,0.25)" />
                  </linearGradient>

                  {/* Progress arc gradient */}
                  <linearGradient id="progGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="rgba(204,20,20,0.4)" />
                    <stop offset="70%"  stopColor="#FF4444" />
                    <stop offset="100%" stopColor="#CC1414" />
                  </linearGradient>

                  {/* Needle gradient (tip bright → tail fade) */}
                  <linearGradient id="needleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%"   stopColor="#FF5555" />
                    <stop offset="65%"  stopColor="#CC1414" />
                    <stop offset="100%" stopColor="rgba(204,20,20,0.1)" />
                  </linearGradient>

                  {/* Radar fan gradient */}
                  <radialGradient id="fanGrad" cx="50%" cy="100%" r="100%">
                    <stop offset="0%"   stopColor="rgba(204,20,20,0)" />
                    <stop offset="100%" stopColor="rgba(204,20,20,0.22)" />
                  </radialGradient>

                  {/* Center hub gradient */}
                  <radialGradient id="hubGrad" cx="40%" cy="40%" r="60%">
                    <stop offset="0%"   stopColor="#333" />
                    <stop offset="100%" stopColor="#0A0A0A" />
                  </radialGradient>
                </defs>

                {/* ── Grid spokes ── */}
                {SPOKES.flatMap((deg) =>
                  [deg, deg + 180].map((d) => {
                    const [x1, y1] = pt(CX, CY, 32, d);
                    const [x2, y2] = pt(CX, CY, 204, d);
                    return (
                      <line
                        key={d}
                        x1={x1} y1={y1} x2={x2} y2={y2}
                        stroke="rgba(204,20,20,0.09)"
                        strokeWidth="1"
                      />
                    );
                  })
                )}

                {/* ── Concentric rings (pulsing opacity) ── */}
                {RINGS.map((r, i) => (
                  <circle
                    key={r}
                    cx={CX} cy={CY} r={r}
                    fill="none"
                    stroke="rgba(204,20,20,0.13)"
                    strokeWidth="1"
                    style={{
                      animation: `pulse-glow-ring ${2 + i * 0.45}s ease-in-out infinite`,
                      animationDelay: `${i * 0.25}s`,
                    }}
                  />
                ))}

                {/* ── Ping rings (expand + fade) ── */}
                {[0, 1.1, 2.2].map((delay) => (
                  <circle
                    key={delay}
                    cx={CX} cy={CY} r="148"
                    fill="none"
                    stroke="rgba(204,20,20,0.45)"
                    strokeWidth="1.2"
                    style={{
                      transformOrigin: `${CX}px ${CY}px`,
                      animation: "radar-ping 3s ease-out infinite",
                      animationDelay: `${delay}s`,
                    }}
                  />
                ))}

                {/* ── Radar sweep (rotating fan) ── */}
                <g
                  style={{
                    transformOrigin: `${CX}px ${CY}px`,
                    animation: "radar-spin 5s linear infinite",
                  }}
                >
                  <path
                    d={`M ${CX} ${CY} L ${fanLx} ${fanLy} A 175 175 0 0 1 ${fanTx} ${fanTy} Z`}
                    fill="url(#fanGrad)"
                  />
                  <line
                    x1={CX} y1={CY} x2={fanLx} y2={fanLy}
                    stroke="rgba(204,20,20,0.65)"
                    strokeWidth="1.5"
                    filter="url(#glow)"
                  />
                </g>

                {/* ── Base speedometer arc (full range, dim) ── */}
                <path
                  d={`M ${ax0} ${ay0} A ${R} ${R} 0 1 1 ${ax1} ${ay1}`}
                  fill="none"
                  stroke="rgba(204,20,20,0.20)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                {/* ── Progress arc (0 → 75%) ── */}
                <path
                  d={`M ${ax0} ${ay0} A ${R} ${R} 0 1 1 ${prog75x} ${prog75y}`}
                  fill="none"
                  stroke="url(#progGrad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  filter="url(#glow2)"
                />

                {/* ── Bright outer rim ── */}
                <path
                  d={`M ${ax0} ${ay0} A ${R} ${R} 0 1 1 ${ax1} ${ay1}`}
                  fill="none"
                  stroke="url(#arcGrad)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  filter="url(#glow)"
                />

                {/* ── Tick marks ── */}
                {TICKS.map(({ deg, major }, idx) => {
                  const [ix, iy] = pt(CX, CY, R - (major ? 15 : 8), deg);
                  const [ox, oy] = pt(CX, CY, R + (major ? 11 : 5), deg);
                  return (
                    <line
                      key={idx}
                      x1={ix} y1={iy} x2={ox} y2={oy}
                      stroke={major ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.18)"}
                      strokeWidth={major ? 2 : 1}
                      strokeLinecap="round"
                    />
                  );
                })}

                {/* ── Speed labels ── */}
                {LABELS.map(({ i, text }) => {
                  const [lx, ly] = pt(CX, CY, R - 32, 120 + i * 20);
                  return (
                    <text
                      key={i}
                      x={lx} y={ly}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="rgba(255,255,255,0.4)"
                      fontSize="12"
                      fontFamily="monospace"
                      fontWeight="700"
                    >
                      {text}
                    </text>
                  );
                })}

                {/* ── KM/H unit label ── */}
                <text
                  x={CX} y={CY + 58}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.22)"
                  fontSize="11"
                  fontFamily="monospace"
                  letterSpacing="4"
                >
                  KM/H
                </text>

                {/* ── Digital speed readout ── */}
                <text
                  x={CX} y={CY + 28}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="44"
                  fontWeight="900"
                  fontFamily="monospace"
                  filter="url(#glow)"
                >
                  142
                </text>

                {/* ── Needle ── */}
                <g
                  style={{
                    transformOrigin: `${CX}px ${CY}px`,
                    animation: "needle-sweep 3.5s cubic-bezier(0.22, 1, 0.36, 1) forwards",
                  }}
                >
                  {/* Glow shadow */}
                  <line
                    x1={CX} y1={CY + 22} x2={CX} y2={CY - 145}
                    stroke="rgba(204,20,20,0.4)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    filter="url(#glow2)"
                  />
                  {/* Needle body */}
                  <line
                    x1={CX} y1={CY + 22} x2={CX} y2={CY - 145}
                    stroke="url(#needleGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* Counterweight dot */}
                  <circle cx={CX} cy={CY + 19} r="3.5" fill="rgba(204,20,20,0.5)" />
                </g>

                {/* ── Center hub ── */}
                <circle cx={CX} cy={CY} r="16" fill="url(#hubGrad)" stroke="rgba(204,20,20,0.35)" strokeWidth="2" />
                <circle cx={CX} cy={CY} r="8"  fill="#CC1414" filter="url(#glow)" />
                <circle cx={CX} cy={CY} r="3"  fill="white" />

                {/* ── HUD corner brackets ── */}
                {[
                  [88, 88, 1, 1],
                  [412, 88, -1, 1],
                  [88, 412, 1, -1],
                  [412, 412, -1, -1],
                ].map(([x, y, sx, sy], i) => (
                  <g key={i} transform={`scale(${sx} ${sy}) translate(${sx < 0 ? -500 : 0} ${sy < 0 ? -500 : 0})`}>
                    <path
                      d={`M ${x} ${y + 22} L ${x} ${y} L ${x + 22} ${y}`}
                      stroke="rgba(204,20,20,0.45)"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </g>
                ))}

                {/* ── HUD text labels ── */}
                <text x="96"  y="84"  fill="rgba(204,20,20,0.5)" fontSize="9" fontFamily="monospace">AMUR-AUTO</text>
                <text x="404" y="84"  fill="rgba(204,20,20,0.5)" fontSize="9" fontFamily="monospace" textAnchor="end">SYS.ONLINE</text>
                <text x="96"  y="422" fill="rgba(204,20,20,0.5)" fontSize="9" fontFamily="monospace">ALM·2025</text>
                <text x="404" y="422" fill="rgba(204,20,20,0.5)" fontSize="9" fontFamily="monospace" textAnchor="end">CAT-B</text>
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
