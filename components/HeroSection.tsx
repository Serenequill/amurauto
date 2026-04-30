"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

/* ─── Palette ─── */
const BLUE   = "#378ADD";
const AMBER  = "#BA7517";
const TEXT   = "#1A1A1A";
const TEXT2  = "#666666";

const STATS = [
  { value: "2 400+", label: "учеников" },
  { value: "6",      label: "филиалов" },
  { value: "12",     label: "лет опыта" },
];

/* ───────────────────────────────────────────
   3D Car Geometry — abstract SVG side-view
────────────────────────────────────────────*/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CarScene({ y }: { y: any }) {
  return (
    <motion.div
      style={{ y }}
      className="relative w-full h-full flex items-center justify-center select-none"
      role="img"
      aria-label="Абстрактный силуэт автомобиля"
    >
      <svg viewBox="0 0 480 460" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-w-[520px]">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="18" result="blur" />
          </filter>
          <filter id="softblur">
            <feGaussianBlur stdDeviation="8" />
          </filter>
          <linearGradient id="roadGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={BLUE} stopOpacity="0.06" />
            <stop offset="100%" stopColor={BLUE} stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={BLUE} stopOpacity="0.14" />
            <stop offset="100%" stopColor={BLUE} stopOpacity="0.06" />
          </linearGradient>
        </defs>

        {/* ── Ambient depth blob ── */}
        <ellipse cx="240" cy="310" rx="180" ry="40" fill={BLUE} opacity="0.04" filter="url(#glow)" />

        {/* ── Background dot ring ── */}
        <circle cx="240" cy="230" r="190" stroke={BLUE} strokeOpacity="0.07" strokeWidth="0.5" strokeDasharray="3 12" />
        <circle cx="240" cy="230" r="155" stroke={BLUE} strokeOpacity="0.05" strokeWidth="0.5" strokeDasharray="2 8" />

        {/* ── Road surface ── */}
        <rect x="0" y="318" width="480" height="142" fill="url(#roadGrad)" />
        <line x1="0" y1="318" x2="480" y2="318" stroke={BLUE} strokeOpacity="0.12" strokeWidth="0.5" />

        {/* Dashed center line */}
        {[0,1,2,3,4,5,6].map(i => (
          <rect key={i} x={30 + i * 66} y="355" width="36" height="2" rx="1"
            fill={BLUE} opacity="0.1" />
        ))}

        {/* Horizon glow */}
        <ellipse cx="240" cy="318" rx="220" ry="6" fill={BLUE} opacity="0.04" filter="url(#softblur)" />

        {/* ── Car body (main) ── */}
        <rect x="62" y="262" width="356" height="60" rx="14"
          fill="url(#bodyGrad)"
          stroke={BLUE} strokeOpacity="0.22" strokeWidth="0.5" />

        {/* ── Cabin / roof ── */}
        <path d="M 118 262 L 136 192 L 316 192 L 344 262 Z"
          fill={BLUE} fillOpacity="0.09"
          stroke={BLUE} strokeOpacity="0.2" strokeWidth="0.5" />

        {/* Windshield (front) */}
        <path d="M 296 262 L 313 198 L 336 196 L 344 262 Z"
          fill={BLUE} fillOpacity="0.18"
          stroke={BLUE} strokeOpacity="0.15" strokeWidth="0.5" />

        {/* Rear window */}
        <path d="M 118 262 L 136 198 L 164 196 L 158 262 Z"
          fill={BLUE} fillOpacity="0.1"
          stroke={BLUE} strokeOpacity="0.12" strokeWidth="0.5" />

        {/* Side windows (middle) */}
        <path d="M 162 262 L 160 196 L 210 194 L 215 262 Z"
          fill={BLUE} fillOpacity="0.07"
          stroke={BLUE} strokeOpacity="0.1" strokeWidth="0.5" />
        <path d="M 219 262 L 215 194 L 290 194 L 293 262 Z"
          fill={BLUE} fillOpacity="0.07"
          stroke={BLUE} strokeOpacity="0.1" strokeWidth="0.5" />

        {/* Door lines */}
        <line x1="160" y1="262" x2="160" y2="318" stroke={BLUE} strokeOpacity="0.12" strokeWidth="0.5" />
        <line x1="218" y1="262" x2="218" y2="318" stroke={BLUE} strokeOpacity="0.12" strokeWidth="0.5" />
        <line x1="294" y1="262" x2="294" y2="318" stroke={BLUE} strokeOpacity="0.12" strokeWidth="0.5" />

        {/* ── Headlight ── */}
        <rect x="406" y="276" width="18" height="10" rx="2"
          fill={BLUE} fillOpacity="0.5"
          stroke={BLUE} strokeOpacity="0.4" strokeWidth="0.5" />
        <rect x="406" y="290" width="14" height="6" rx="1"
          fill={BLUE} fillOpacity="0.25" />
        {/* Headlight beam */}
        <path d="M 424 279 L 460 262 M 424 283 L 460 276 M 424 287 L 460 295"
          stroke={BLUE} strokeOpacity="0.08" strokeWidth="0.5" />

        {/* ── Taillight ── */}
        <rect x="58" y="276" width="16" height="10" rx="2"
          fill={AMBER} fillOpacity="0.55"
          stroke={AMBER} strokeOpacity="0.4" strokeWidth="0.5" />
        <rect x="60" y="290" width="10" height="6" rx="1"
          fill={AMBER} fillOpacity="0.3" />

        {/* ── Front wheel ── */}
        <circle cx="358" cy="320" r="38" fill="rgba(20,24,36,0.06)" stroke={BLUE} strokeOpacity="0.28" strokeWidth="0.5" />
        <circle cx="358" cy="320" r="24" fill={BLUE} fillOpacity="0.05" stroke={BLUE} strokeOpacity="0.2" strokeWidth="0.5" />
        <circle cx="358" cy="320" r="8"  fill={BLUE} fillOpacity="0.18" />
        {/* Spokes */}
        {[0,60,120,180,240,300].map(angle => {
          const rad = angle * Math.PI / 180;
          return (
            <line key={angle}
              x1={358 + Math.cos(rad) * 8} y1={320 + Math.sin(rad) * 8}
              x2={358 + Math.cos(rad) * 22} y2={320 + Math.sin(rad) * 22}
              stroke={BLUE} strokeOpacity="0.2" strokeWidth="0.5" />
          );
        })}

        {/* ── Rear wheel ── */}
        <circle cx="122" cy="320" r="38" fill="rgba(20,24,36,0.06)" stroke={BLUE} strokeOpacity="0.28" strokeWidth="0.5" />
        <circle cx="122" cy="320" r="24" fill={BLUE} fillOpacity="0.05" stroke={BLUE} strokeOpacity="0.2" strokeWidth="0.5" />
        <circle cx="122" cy="320" r="8"  fill={BLUE} fillOpacity="0.18" />
        {[0,60,120,180,240,300].map(angle => {
          const rad = angle * Math.PI / 180;
          return (
            <line key={angle}
              x1={122 + Math.cos(rad) * 8} y1={320 + Math.sin(rad) * 8}
              x2={122 + Math.cos(rad) * 22} y2={320 + Math.sin(rad) * 22}
              stroke={BLUE} strokeOpacity="0.2" strokeWidth="0.5" />
          );
        })}

        {/* ── Speed lines (motion trails on left) ── */}
        {[268, 282, 296, 308, 318].map((py, i) => (
          <line key={i}
            x1={8} y1={py} x2={54 - i * 4} y2={py}
            stroke={BLUE} strokeOpacity={0.16 - i * 0.025} strokeWidth="0.5" />
        ))}

        {/* ── Exhaust smoke dots ── */}
        <circle cx="56" cy="304" r="3.5" fill={BLUE} fillOpacity="0.15" />
        <circle cx="46" cy="301" r="2.5" fill={BLUE} fillOpacity="0.09" />
        <circle cx="36" cy="297" r="1.8" fill={BLUE} fillOpacity="0.05" />

        {/* ── Decorative corner elements ── */}
        {/* Top-left cluster */}
        <circle cx="68" cy="100" r="3" fill={BLUE} fillOpacity="0.25" />
        <circle cx="82" cy="100" r="2" fill={BLUE} fillOpacity="0.15" />
        <circle cx="93" cy="100" r="1.5" fill={BLUE} fillOpacity="0.09" />
        <line x1="68" y1="100" x2="110" y2="140" stroke={BLUE} strokeOpacity="0.07" strokeWidth="0.5" strokeDasharray="2 5" />

        {/* Top-right cluster */}
        <circle cx="420" cy="130" r="2.5" fill={AMBER} fillOpacity="0.3" />
        <circle cx="408" cy="130" r="1.8" fill={AMBER} fillOpacity="0.18" />
        <line x1="420" y1="130" x2="390" y2="168" stroke={AMBER} strokeOpacity="0.08" strokeWidth="0.5" strokeDasharray="2 5" />

        {/* Bottom-right dot */}
        <circle cx="448" cy="390" r="2" fill={BLUE} fillOpacity="0.2" />
        <circle cx="438" cy="395" r="1.5" fill={BLUE} fillOpacity="0.12" />

        {/* Small cross marks */}
        <g transform="translate(62,152)" opacity="0.15">
          <line x1="-5" y1="0" x2="5" y2="0" stroke={BLUE} strokeWidth="0.5" />
          <line x1="0" y1="-5" x2="0" y2="5" stroke={BLUE} strokeWidth="0.5" />
        </g>
        <g transform="translate(418,242)" opacity="0.12">
          <line x1="-4" y1="0" x2="4" y2="0" stroke={AMBER} strokeWidth="0.5" />
          <line x1="0" y1="-4" x2="0" y2="4" stroke={AMBER} strokeWidth="0.5" />
        </g>
      </svg>
    </motion.div>
  );
}

/* ─── Bento stat card ─── */
function BentoCard({
  value, label, wide = false, delay = 0,
}: {
  value: string; label: string; wide?: boolean; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={wide ? "col-span-2" : "col-span-1"}
      style={{
        padding: "20px 22px",
        borderRadius: 16,
        background: "rgba(255,255,255,0.6)",
        border: "0.5px solid rgba(55,138,221,0.14)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "0 2px 16px rgba(55,138,221,0.05), inset 0 1px 0 rgba(255,255,255,0.9)",
        transition: "border-color 0.25s, box-shadow 0.25s",
        cursor: "default",
      }}
      whileHover={{
        borderColor: "rgba(55,138,221,0.3)",
        boxShadow: "0 6px 24px rgba(55,138,221,0.09), inset 0 1px 0 rgba(255,255,255,0.9)",
      }}
    >
      <div style={{
        fontSize: wide ? 32 : 28,
        fontWeight: 700,
        color: TEXT,
        letterSpacing: "-0.03em",
        lineHeight: 1,
      }}>
        {value}
      </div>
      <div style={{
        fontSize: 11,
        color: TEXT2,
        fontWeight: 400,
        letterSpacing: "0.13em",
        textTransform: "uppercase",
        marginTop: 6,
      }}>
        {label}
      </div>
    </motion.div>
  );
}

/* ─── Main Component ─── */
export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [ctaHovered, setCtaHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const geoY  = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%",  "6%"]);

  const headLines = ["Сядь за руль", "уверенно —", "с первого раза"];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative lg:min-h-screen flex items-center overflow-hidden pt-16"
      style={{ background: "linear-gradient(135deg, #F8FAFB 0%, #EEF2F7 100%)" }}
    >
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(55,138,221,0.13) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.55,
        }}
      />

      {/* Ambient blobs */}
      <div className="absolute pointer-events-none"
        style={{ top: "20%", left: "30%", width: 560, height: 360,
          background: "radial-gradient(ellipse, rgba(55,138,221,0.06) 0%, transparent 70%)",
          filter: "blur(80px)", transform: "translate(-50%,-50%)" }} />
      <div className="absolute pointer-events-none"
        style={{ bottom: "20%", right: "20%", width: 360, height: 260,
          background: "radial-gradient(ellipse, rgba(186,117,23,0.05) 0%, transparent 70%)",
          filter: "blur(60px)", transform: "translate(50%,50%)" }} />

      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center lg:min-h-[calc(100vh-5rem)]">

          {/* ══ LEFT — 3D geometry ══ */}
          <div className="hidden lg:flex items-center justify-center order-2 lg:order-1 relative"
            style={{ minHeight: 480 }}>
            <CarScene y={geoY} />
          </div>

          {/* ══ RIGHT — Text ══ */}
          <motion.div style={{ y: textY }} className="order-1 lg:order-2 flex flex-col">

            {/* ── Badge ── */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 mb-7 self-start px-4 py-2 rounded-full"
              style={{ background: "rgba(55,138,221,0.06)", border: "0.5px solid rgba(55,138,221,0.2)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: BLUE }} />
              <span className="text-xs font-medium uppercase tracking-widest"
                style={{ color: BLUE, letterSpacing: "0.12em" }}>
                Категория B · Алматы
              </span>
            </motion.div>

            {/* ── Headline — line-by-line slide from below ── */}
            <div className="mb-5">
              {headLines.map((line, i) => (
                <div key={i} style={{ overflow: "hidden" }}>
                  <motion.div
                    initial={{ y: "108%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.75, delay: 0.1 + i * 0.11, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="block leading-[1.08]" style={{
                      fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
                      fontWeight: 700,
                      color: i === 1 ? BLUE : TEXT,
                      letterSpacing: "-0.03em",
                    }}>
                      {line}
                    </span>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* ── Subtitle — fade + slide up ── */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
              className="mb-7 max-w-[420px]"
              style={{ fontSize: 16, color: TEXT2, fontWeight: 400, lineHeight: 1.7 }}
            >
              Теория, практика и подготовка к экзамену —{" "}
              доведём до получения прав за 2.5 месяца.
            </motion.p>

            {/* ── Urgency pill — live pulsing dot ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.54, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 mb-8 self-start px-4 py-2.5 rounded-xl"
              style={{
                background: "rgba(255,251,235,0.85)",
                border: "0.5px solid rgba(186,117,23,0.28)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                boxShadow: "0 2px 12px rgba(186,117,23,0.07)",
              }}
            >
              {/* Pulsing live dot */}
              <span className="relative flex items-center justify-center w-2.5 h-2.5 shrink-0">
                <span className="absolute inline-flex w-full h-full rounded-full animate-ping"
                  style={{ background: AMBER, opacity: 0.5 }} />
                <span className="relative inline-flex w-2 h-2 rounded-full"
                  style={{ background: AMBER }} />
              </span>
              <span className="text-xs" style={{ color: "#92400E", fontWeight: 400 }}>
                Осталось{" "}
                <span style={{ fontWeight: 600, color: "#78350F" }}>12 мест</span>
                {" "}на этот месяц
              </span>
            </motion.div>

            {/* ── CTAs ── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.64, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-5 mb-8"
            >
              {/* Primary CTA — animated arrow */}
              <a
                href="#register"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm overflow-hidden"
                style={{
                  background: "transparent",
                  border: `0.5px solid ${BLUE}`,
                  color: BLUE,
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                  transition: "background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  setCtaHovered(true);
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(55,138,221,0.07)";
                  el.style.transform = "translateY(-2px)";
                  el.style.boxShadow = "0 12px 24px rgba(55,138,221,0.12)";
                }}
                onMouseLeave={(e) => {
                  setCtaHovered(false);
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "transparent";
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                }}
              >
                Записаться на обучение
                {/* Animated arrow */}
                <span style={{ display: "inline-flex", overflow: "hidden", width: 14, height: 14 }}>
                  <motion.svg
                    width="14" height="14" viewBox="0 0 14 14" fill="none"
                    animate={{ x: ctaHovered ? 3 : 0, opacity: ctaHovered ? 1 : 0.7 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                  >
                    <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </motion.svg>
                </span>
              </a>

              {/* Phone link */}
              <a href="tel:87776667096"
                className="inline-flex items-center gap-1.5 text-sm"
                style={{ color: TEXT2, fontWeight: 400, transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = TEXT)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = TEXT2)}
              >
                <span style={{ color: BLUE, fontSize: 16, lineHeight: 1 }}>→</span>
                8-777-666-70-96
              </a>
            </motion.div>

            {/* ── Bento stats grid ── */}
            <div className="grid grid-cols-2 gap-3">
              <BentoCard value="2 400+" label="учеников выпущено" delay={0.76} />
              <BentoCard value="6"      label="филиалов в Алматы" delay={0.84} />
              <BentoCard value="12"     label="лет на рынке"      delay={0.92} wide />
            </div>

          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="hidden lg:flex items-center gap-2.5 absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={13} style={{ color: BLUE, opacity: 0.45 }} />
          </motion.div>
          <span style={{ fontSize: 12, color: TEXT2, fontWeight: 400,
            letterSpacing: "0.1em", opacity: 0.7 }}>
            Scroll to explore
          </span>
        </motion.div>
      </div>
    </section>
  );
}
