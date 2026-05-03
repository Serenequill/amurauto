"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { CheckCircle, XCircle, ArrowRight, RotateCcw } from "lucide-react";
import { useLang } from "@/contexts/LangContext";

/* ─── Same shadow as Hero dashboard card ─── */
const CARD_SHADOW =
  "0 2px 4px rgba(0,0,0,0.07), " +
  "0 8px 16px rgba(0,0,0,0.05), " +
  "0 28px 64px rgba(0,0,0,0.08), " +
  "inset 0 1px 0 rgba(255,255,255,0.95)";

const SIGN_SHADOW =
  "0 4px 12px rgba(0,0,0,0.08), " +
  "0 16px 40px rgba(0,0,0,0.06), " +
  "inset 0 1px 0 rgba(255,255,255,0.9)";

/* ══════════════════════════════════════
   SVG Traffic Signs
══════════════════════════════════════ */
function SignKirpich() {
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="46" fill="#DC2626" />
      <circle cx="50" cy="50" r="46" stroke="white" strokeWidth="3" />
      <rect x="18" y="39" width="64" height="22" rx="2.5" fill="white" />
    </svg>
  );
}
function SignYield() {
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <polygon points="50,95 3,12 97,12" fill="white" stroke="#DC2626" strokeWidth="8" strokeLinejoin="round" />
    </svg>
  );
}
function SignSpeed60() {
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="46" fill="white" stroke="#DC2626" strokeWidth="9" />
      <text x="50" y="66" textAnchor="middle" fontSize="36" fontWeight="900" fontFamily="Arial,sans-serif" fill="#111827">60</text>
    </svg>
  );
}
function SignMainRoad() {
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <rect x="18" y="18" width="64" height="64" rx="4" fill="#FBBF24" stroke="white" strokeWidth="4" transform="rotate(45 50 50)" />
    </svg>
  );
}
function SignPedestrian() {
  return (
    <svg viewBox="0 0 80 100" fill="none">
      <rect x="2" y="2" width="76" height="96" rx="6" fill="#2563EB" />
      <circle cx="40" cy="17" r="7" fill="white" />
      <line x1="40" y1="24" x2="40" y2="52" stroke="white" strokeWidth="6" strokeLinecap="round" />
      <line x1="40" y1="34" x2="24" y2="44" stroke="white" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="40" y1="34" x2="55" y2="30" stroke="white" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="40" y1="52" x2="28" y2="68" stroke="white" strokeWidth="5.5" strokeLinecap="round" />
      <line x1="40" y1="52" x2="52" y2="68" stroke="white" strokeWidth="5.5" strokeLinecap="round" />
      <rect x="10" y="74" width="60" height="6" rx="1" fill="white" opacity="0.9" />
      <rect x="10" y="84" width="60" height="6" rx="1" fill="white" opacity="0.9" />
      <rect x="10" y="94" width="60" height="4" rx="1" fill="white" opacity="0.7" />
    </svg>
  );
}
function SignSlippery() {
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <polygon points="50,6 96,90 4,90" fill="white" stroke="#DC2626" strokeWidth="5" strokeLinejoin="round" />
      <rect x="30" y="58" width="40" height="16" rx="3" fill="#374151" />
      <rect x="36" y="49" width="24" height="12" rx="2" fill="#374151" />
      <circle cx="39" cy="75" r="4.5" fill="#6B7280" />
      <circle cx="61" cy="75" r="4.5" fill="#6B7280" />
      <path d="M26 80 Q33 74 39 75" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
      <path d="M61 75 Q70 70 74 80" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ══════════════════════════════════════
   Question base (visual + answer key only)
   Text comes from t.pdd.questions[i]
══════════════════════════════════════ */
const QUESTIONS_BASE = [
  { Sign: SignKirpich,   correct: 0 },
  { Sign: SignYield,     correct: 1 },
  { Sign: SignSpeed60,   correct: 1 },
  { Sign: SignMainRoad,  correct: 2 },
  { Sign: SignPedestrian,correct: 1 },
  { Sign: SignSlippery,  correct: 1 },
] as const;

const LETTERS = ["А", "Б", "В", "Г"];

const slideVariants: Variants = {
  enter:  { opacity: 0, x: 32, scale: 0.98 },
  center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.34, ease: [0.22,1,0.36,1] } },
  exit:   { opacity: 0, x: -32, scale: 0.98, transition: { duration: 0.22, ease: "easeIn" } },
};

const popIn: Variants = {
  hidden:  { scale: 0.5, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 340, damping: 22 } },
};

/* ══════════════════════════════════════
   Main Component
══════════════════════════════════════ */
export default function PddTrainer() {
  const { t } = useLang();
  const p = t.pdd;

  /* Merge visual base with translated text */
  const QUESTIONS = QUESTIONS_BASE.map((base, i) => ({
    ...base,
    ...p.questions[i],
  }));

  const [idx, setIdx]           = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore]       = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers]   = useState<(boolean | null)[]>(Array(QUESTIONS.length).fill(null));

  const q        = QUESTIONS[idx];
  const answered = selected !== null;
  const total    = QUESTIONS.length;

  useEffect(() => {
    if (selected === null) return;
    const isCorrect = selected === q.correct;
    const t = setTimeout(() => {
      if (idx === total - 1) { setFinished(true); return; }
      setIdx((i) => i + 1);
      setSelected(null);
    }, isCorrect ? 1400 : 2000);
    return () => clearTimeout(t);
  }, [selected, idx, q.correct, total]);

  const handleAnswer = (i: number) => {
    if (answered) return;
    const isCorrect = i === q.correct;
    setSelected(i);
    if (isCorrect) setScore((s) => s + 1);
    setAnswers((prev) => { const a = [...prev]; a[idx] = isCorrect; return a; });
  };

  const reset = () => {
    setIdx(0); setSelected(null); setScore(0);
    setFinished(false); setAnswers(Array(QUESTIONS.length).fill(null));
  };

  const pct = Math.round((score / total) * 100);
  const resultColor = score === total ? "#16A34A" : score >= total * 0.7 ? "#D97706" : "#DC2626";
  const resultLabel = score === total ? p.resultTexts.perfect
    : score >= total * 0.7 ? p.resultTexts.good
    : p.resultTexts.low;

  return (
    <section
      id="signs"
      className="relative py-16 sm:py-28 overflow-hidden"
      style={{
        background: "#F8FAFC",
        backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(220,38,38,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-xl mx-auto px-4 sm:px-6 relative">

        {/* ── Big Bento panel ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: "rgba(250,249,247,0.98)",
            borderRadius: "3rem",
            boxShadow: CARD_SHADOW,
            border: "1px solid #F1F5F9",
            overflow: "hidden",
          }}
        >
          {/* ── Panel header bar (like Hero card) ── */}
          <div
            className="flex items-center justify-between px-6 sm:px-8 py-4"
            style={{ borderBottom: "1px solid #F1F5F9" }}
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#DC2626" }} />
              <span className="mono text-[10px] uppercase tracking-[0.16em]" style={{ color: "#9CA3AF" }}>
                {p.trainerLabel}
              </span>
            </div>
            <span className="mono text-[10px]" style={{ color: "#D1D5DB" }}>
              KZ · 2026
            </span>
          </div>

          <div className="px-6 sm:px-8 pt-8 pb-8">

            {/* ── Title ── */}
            <div className="text-center mb-7">
              <h2
                className="font-black leading-none tracking-tight"
                style={{ fontSize: "clamp(1.9rem, 6vw, 2.8rem)", color: "#111827", letterSpacing: "-0.03em" }}
              >
                {p.title1}{" "}
                <span style={{ color: "#DC2626" }}>
                  {p.titleAccent}
                </span>
                {" "}{p.title2}
              </h2>
              <p className="text-xs mt-3" style={{ color: "#94A3B8" }}>
                {p.subtitle}
              </p>

              {/* Progress dots */}
              <div className="flex items-center justify-center gap-2 mt-5">
                {QUESTIONS.map((_, i) => {
                  const done    = answers[i] !== null;
                  const correct = answers[i] === true;
                  const current = i === idx && !finished;
                  return (
                    <motion.div
                      key={i}
                      animate={{
                        scale: current ? [1, 1.25, 1] : 1,
                        backgroundColor: done
                          ? (correct ? "#16A34A" : "#DC2626")
                          : current ? "#DC2626" : "#E2E8F0",
                      }}
                      transition={current
                        ? { duration: 1.1, repeat: Infinity, ease: "easeInOut" }
                        : { duration: 0.3 }}
                      style={{ width: current ? 26 : 9, height: 9, borderRadius: 99 }}
                    />
                  );
                })}
              </div>
            </div>

            {/* ── Divider ── */}
            <div style={{ borderTop: "1px solid #F1F5F9", marginBottom: "1.5rem" }} />

            <AnimatePresence mode="wait">

              {/* ── Finished ── */}
              {finished ? (
                <motion.div
                  key="finish"
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center py-6"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.15 }}
                    className="text-6xl mb-5"
                  >
                    {score === total ? "🏆" : score >= total * 0.7 ? "🎯" : "🚗"}
                  </motion.div>

                  <p className="mono text-[10px] uppercase tracking-widest mb-2" style={{ color: "#9CA3AF" }}>
                    {p.resultLabel}
                  </p>
                  <h3 className="text-3xl font-black mb-1" style={{ color: "#111827" }}>
                    {score} / {total}
                  </h3>
                  <p className="text-sm font-semibold mb-6" style={{ color: resultColor }}>
                    {resultLabel}
                  </p>

                  <div className="w-full h-1.5 rounded-full mb-8 overflow-hidden" style={{ background: "#F1F5F9" }}>
                    <motion.div className="h-full rounded-full" style={{ background: resultColor }}
                      initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }} />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.a href="#register" whileHover={{ y: -2 }}
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-white text-sm"
                      style={{ background: "linear-gradient(160deg,#C41E3A 0%,#9E1239 50%,#7D0E2D 100%)", boxShadow: "0 4px 14px rgba(158,18,57,0.35)" }}>
                      {p.ctaEnroll} <ArrowRight size={15} />
                    </motion.a>
                    <motion.button onClick={reset} whileHover={{ y: -1 }}
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full font-semibold text-sm"
                      style={{ border: "1.5px solid #E2E8F0", color: "#6B7280", background: "#fff" }}>
                      <RotateCcw size={14} /> {p.ctaRetry}
                    </motion.button>
                  </div>
                </motion.div>

              ) : (
                /* ── Question ── */
                <motion.div key={idx} variants={slideVariants} initial="enter" animate="center" exit="exit">

                  {/* Counter row */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="mono text-[10px] uppercase tracking-widest" style={{ color: "#CBD5E1" }}>
                      {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                    </span>
                    <span className="text-xs font-bold px-3 py-1 rounded-full"
                      style={{ background: "rgba(220,38,38,0.07)", color: "#DC2626" }}>
                      {p.scoreLabel(score)}
                    </span>
                  </div>

                  {/* ── Floating sign box ── */}
                  <div className="flex flex-col items-center mb-6">
                    <motion.div
                      key={`box-${idx}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="relative"
                      style={{
                        background: "#FFFFFF",
                        borderRadius: "1.5rem",
                        boxShadow: SIGN_SHADOW,
                        border: "1px solid #F1F5F9",
                        padding: "1.5rem",
                        width: 160,
                        height: 160,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {/* Subtle corner tech marks */}
                      <span className="absolute top-2 left-2.5 mono text-[8px]" style={{ color: "#E2E8F0" }}>◈</span>
                      <span className="absolute top-2 right-2.5 mono text-[8px]" style={{ color: "#E2E8F0" }}>◈</span>

                      <motion.div
                        animate={selected === null
                          ? { y: [0, -8, 0] }
                          : { y: 0, scale: 1.06 }}
                        transition={selected === null
                          ? { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
                          : { duration: 0.28, ease: "easeOut" }}
                        style={{ width: 100, height: 100 }}
                        className="drop-shadow-md"
                      >
                        <q.Sign />
                      </motion.div>
                    </motion.div>

                    <span className="mt-3 mono text-[9px] uppercase tracking-[0.18em]" style={{ color: "#CBD5E1" }}>
                      {q.signLabel}
                    </span>
                  </div>

                  {/* Question text */}
                  <h3 className="font-bold text-center mb-6 leading-snug"
                    style={{ fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)", color: "#111827" }}>
                    {q.question}
                  </h3>

                  {/* ── Answer buttons 2×2 ── */}
                  <div className="grid grid-cols-2 gap-2.5 mb-5">
                    {q.answers.map((ans, i) => {
                      const isCorrect  = i === q.correct;
                      const isSelected = i === selected;
                      const isWrong    = answered && isSelected && !isCorrect;
                      const isRight    = answered && isCorrect;
                      const isDimmed   = answered && !isCorrect && !isSelected;

                      let bg = "#FFFFFF", border = "#E2E8F0", color = "#374151";
                      let badgeBg = "#F8FAFC", badgeColor = "#94A3B8";

                      if (isRight)  { bg = "rgba(22,163,74,0.07)";  border = "rgba(22,163,74,0.35)";  color = "#15803D"; badgeBg = "#16A34A"; badgeColor = "#fff"; }
                      if (isWrong)  { bg = "rgba(220,38,38,0.07)";  border = "rgba(220,38,38,0.35)";  color = "#B91C1C"; badgeBg = "#DC2626"; badgeColor = "#fff"; }
                      if (isDimmed) { bg = "#FAFAFA"; border = "#F1F5F9"; color = "#CBD5E1"; badgeColor = "#E2E8F0"; }

                      return (
                        <motion.button
                          key={i}
                          onClick={() => handleAnswer(i)}
                          disabled={answered}
                          whileHover={!answered ? { scale: 1.02, y: -1 } : {}}
                          whileTap={!answered ? { scale: 0.97 } : {}}
                          animate={isRight ? {
                            boxShadow: ["0 0 0 0px rgba(22,163,74,0)","0 0 0 6px rgba(22,163,74,0.15)","0 0 0 0px rgba(22,163,74,0)"]
                          } : {}}
                          transition={isRight ? { duration: 0.55, delay: 0.1 } : {}}
                          className={isWrong ? "animate-shake" : ""}
                          style={{
                            background: bg,
                            border: `1.5px solid ${border}`,
                            borderRadius: "1rem",
                            padding: "12px 10px",
                            cursor: answered ? "default" : "pointer",
                            textAlign: "left",
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                            minHeight: 82,
                            transition: "background 0.2s, border-color 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            if (!answered) (e.currentTarget as HTMLElement).style.background = "rgba(220,38,38,0.04)";
                          }}
                          onMouseLeave={(e) => {
                            if (!answered) (e.currentTarget as HTMLElement).style.background = "#FFFFFF";
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0"
                              style={{ background: badgeBg, color: badgeColor, transition: "background 0.2s" }}>
                              {LETTERS[i]}
                            </span>
                            <AnimatePresence>
                              {isRight && (
                                <motion.span variants={popIn} initial="hidden" animate="visible">
                                  <CheckCircle size={14} style={{ color: "#16A34A" }} />
                                </motion.span>
                              )}
                              {isWrong && (
                                <motion.span variants={popIn} initial="hidden" animate="visible">
                                  <XCircle size={14} style={{ color: "#DC2626" }} />
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </div>
                          <span className="text-[11px] font-semibold leading-snug" style={{ color, transition: "color 0.2s" }}>
                            {ans}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  <AnimatePresence>
                    {answered && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.26, ease: "easeOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="rounded-2xl p-4 text-xs leading-relaxed" style={{
                          background: selected === q.correct ? "rgba(22,163,74,0.06)" : "rgba(220,38,38,0.06)",
                          border: `1px solid ${selected === q.correct ? "rgba(22,163,74,0.18)" : "rgba(220,38,38,0.18)"}`,
                          color: "#374151",
                        }}>
                          <span className="font-bold" style={{ color: selected === q.correct ? "#15803D" : "#B91C1C" }}>
                            {selected === q.correct ? p.correct : p.wrong}
                          </span>
                          {q.explanation}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {answered && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                      className="text-center mono text-[10px] mt-3" style={{ color: "#D1D5DB" }}>
                      {idx === total - 1 ? p.counterLast : p.counterNext}
                    </motion.p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Panel footer ── */}
          <div className="flex items-center justify-between px-6 sm:px-8 py-3"
            style={{ borderTop: "1px solid #F1F5F9" }}>
            <span className="mono text-[9px] uppercase tracking-widest" style={{ color: "#E2E8F0" }}>
              {p.footerLabel}
            </span>
            <span className="mono text-[9px]" style={{ color: "#E2E8F0" }}>
              {score}/{total} · {Math.round((score/total)*100)}%
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
