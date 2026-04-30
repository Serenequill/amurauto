"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { CheckCircle, XCircle, ArrowRight, RotateCcw } from "lucide-react";

/* ─── Premium card shadow (same as HeroSection) ─── */
const CARD_SHADOW =
  "0 2px 4px rgba(0,0,0,0.07), " +
  "0 8px 16px rgba(0,0,0,0.05), " +
  "0 28px 64px rgba(0,0,0,0.08), " +
  "inset 0 1px 0 rgba(255,255,255,0.95)";

/* ══════════════════════════════════════════
   SVG Traffic Signs
══════════════════════════════════════════ */

/* 3.1 Въезд запрещён — красный круг с белой полосой */
function SignKirpich() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#DC2626" />
      <circle cx="50" cy="50" r="46" stroke="white" strokeWidth="3" />
      <rect x="18" y="39" width="64" height="22" rx="2.5" fill="white" />
    </svg>
  );
}

/* 2.4 Уступите дорогу — перевёрнутый треугольник, одна красная рамка */
function SignYield() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,95 3,12 97,12" fill="white" stroke="#DC2626" strokeWidth="8" strokeLinejoin="round" />
    </svg>
  );
}

/* 3.24 Ограничение скорости 60 — белый круг с красным ободком */
function SignSpeed60() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="white" stroke="#DC2626" strokeWidth="9" />
      <text
        x="50"
        y="66"
        textAnchor="middle"
        fontSize="36"
        fontWeight="900"
        fontFamily="Arial, sans-serif"
        fill="#111827"
      >
        60
      </text>
    </svg>
  );
}

/* 2.1 Главная дорога — жёлтый ромб */
function SignMainRoad() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="18"
        y="18"
        width="64"
        height="64"
        rx="4"
        fill="#FBBF24"
        stroke="white"
        strokeWidth="4"
        transform="rotate(45 50 50)"
      />
    </svg>
  );
}

/* 5.19 Пешеходный переход — синий ПРЯМОУГОЛЬНИК (выше, чем шире) с пешеходом и зеброй */
function SignPedestrian() {
  return (
    <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="76" height="96" rx="6" fill="#2563EB" />
      {/* Head */}
      <circle cx="40" cy="17" r="7" fill="white" />
      {/* Body */}
      <line x1="40" y1="24" x2="40" y2="52" stroke="white" strokeWidth="6" strokeLinecap="round" />
      {/* Left arm — swinging forward */}
      <line x1="40" y1="34" x2="24" y2="44" stroke="white" strokeWidth="4.5" strokeLinecap="round" />
      {/* Right arm — behind */}
      <line x1="40" y1="34" x2="55" y2="30" stroke="white" strokeWidth="4.5" strokeLinecap="round" />
      {/* Left leg — stepping forward */}
      <line x1="40" y1="52" x2="28" y2="68" stroke="white" strokeWidth="5.5" strokeLinecap="round" />
      {/* Right leg — behind */}
      <line x1="40" y1="52" x2="52" y2="68" stroke="white" strokeWidth="5.5" strokeLinecap="round" />
      {/* Zebra stripes */}
      <rect x="10" y="74" width="60" height="6" rx="1" fill="white" opacity="0.9" />
      <rect x="10" y="84" width="60" height="6" rx="1" fill="white" opacity="0.9" />
      <rect x="10" y="94" width="60" height="4" rx="1" fill="white" opacity="0.7" />
    </svg>
  );
}

/* 1.15 Скользкая дорога — красный треугольник с машиной */
function SignSlippery() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon
        points="50,6 96,90 4,90"
        fill="white"
        stroke="#DC2626"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      {/* Car body */}
      <rect x="30" y="58" width="40" height="16" rx="3" fill="#374151" />
      {/* Car roof */}
      <rect x="36" y="49" width="24" height="12" rx="2" fill="#374151" />
      {/* Wheels */}
      <circle cx="39" cy="75" r="4.5" fill="#6B7280" />
      <circle cx="61" cy="75" r="4.5" fill="#6B7280" />
      {/* Skid marks */}
      <path d="M26 80 Q33 74 39 75" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
      <path d="M61 75 Q70 70 74 80" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ══════════════════════════════════════════
   Questions
══════════════════════════════════════════ */
interface Question {
  id: number;
  Sign: () => React.ReactElement;
  signLabel: string;
  question: string;
  answers: string[];
  correct: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    Sign: SignKirpich,
    signLabel: "Знак 3.1",
    question: "Что означает этот знак?",
    answers: [
      "Въезд запрещён для всех ТС",
      "Остановка запрещена",
      "Парковка запрещена",
      "Движение только прямо",
    ],
    correct: 0,
    explanation:
      "Знак 3.1 «Въезд запрещён» («Кирпич») — запрещает въезд всем ТС, кроме маршрутных по маршруту. Штраф — 10 МРП.",
  },
  {
    id: 2,
    Sign: SignYield,
    signLabel: "Знак 2.4",
    question: "Что обязан сделать водитель при этом знаке?",
    answers: [
      "Полностью остановиться",
      "Пропустить ТС, имеющие преимущество",
      "Двигаться со скоростью 20 км/ч",
      "Включить аварийную сигнализацию",
    ],
    correct: 1,
    explanation:
      "Знак 2.4 «Уступите дорогу» — требует пропустить ТС на главной дороге. Полная остановка обязательна, только если есть помеха.",
  },
  {
    id: 3,
    Sign: SignSpeed60,
    signLabel: "Знак 3.24",
    question: "Что ограничивает этот знак?",
    answers: [
      "Минимальная скорость 60 км/ч",
      "Максимальная скорость 60 км/ч",
      "Рекомендуемая скорость 60 км/ч",
      "Ограничение только для грузовиков",
    ],
    correct: 1,
    explanation:
      "Знак 3.24 «Ограничение максимальной скорости» — запрещает движение быстрее 60 км/ч для всех ТС до следующего знака или конца зоны.",
  },
  {
    id: 4,
    Sign: SignMainRoad,
    signLabel: "Знак 2.1",
    question: "Что означает этот знак для водителя?",
    answers: [
      "Дорога с односторонним движением",
      "Преимущество у встречного транспорта",
      "Вы едете по главной дороге",
      "Начало кругового движения",
    ],
    correct: 2,
    explanation:
      "Знак 2.1 «Главная дорога» — сообщает, что вы на дороге с приоритетом. На перекрёстках вы имеете преимущество перед ТС со второстепенных дорог.",
  },
  {
    id: 5,
    Sign: SignPedestrian,
    signLabel: "Знак 5.19",
    question: "Что должен сделать водитель, увидев этот знак?",
    answers: [
      "Ускориться, чтобы освободить переход",
      "Уступить дорогу пешеходам",
      "Остановиться на 3 минуты",
      "Подать звуковой сигнал",
    ],
    correct: 1,
    explanation:
      "Знак 5.19 «Пешеходный переход» — водитель обязан уступить дорогу пешеходам, вступившим на переход или ожидающим его.",
  },
  {
    id: 6,
    Sign: SignSlippery,
    signLabel: "Знак 1.15",
    question: "О чём предупреждает этот знак?",
    answers: [
      "Крутой спуск впереди",
      "Скользкое дорожное покрытие",
      "Сильный боковой ветер",
      "Резкий поворот",
    ],
    correct: 1,
    explanation:
      "Знак 1.15 «Скользкая дорога» — предупреждает о пониженном сцеплении шин с покрытием. Необходимо снизить скорость и увеличить дистанцию.",
  },
];

const LETTERS = ["А", "Б", "В", "Г"];

/* ─── Framer Motion variants ─── */
const cardVariants: Variants = {
  enter:  { opacity: 0, x: 48, scale: 0.97 },
  center: { opacity: 1, x: 0,  scale: 1, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
  exit:   { opacity: 0, x: -48, scale: 0.97, transition: { duration: 0.26, ease: "easeIn" } },
};

const popIn: Variants = {
  hidden:  { scale: 0.5, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 340, damping: 22 } },
};

/* ══════════════════════════════════════════
   Main Component
══════════════════════════════════════════ */
export default function PddTrainer() {
  const [idx, setIdx]           = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore]       = useState(0);
  const [finished, setFinished] = useState(false);
  const [shakingIdx, setShakingIdx] = useState<number | null>(null);

  const q        = QUESTIONS[idx];
  const answered = selected !== null;
  const total    = QUESTIONS.length;

  /* Auto-advance after correct answer */
  useEffect(() => {
    if (selected === null) return;
    const isCorrect = selected === q.correct;
    const delay = isCorrect ? 1400 : 2000;
    const t = setTimeout(() => {
      if (idx === total - 1) {
        setFinished(true);
      } else {
        setIdx((i) => i + 1);
        setSelected(null);
        setShakingIdx(null);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [selected, idx, q.correct, total]);

  const handleAnswer = (i: number) => {
    if (answered) return;
    setSelected(i);
    if (i === q.correct) {
      setScore((s) => s + 1);
    } else {
      setShakingIdx(i);
    }
  };

  const reset = () => {
    setIdx(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setShakingIdx(null);
  };

  /* Result label */
  const pct = Math.round((score / total) * 100);
  const resultLabel =
    score === total ? "Отлично! Вы готовы к экзамену 🏆" :
    score >= total * 0.7 ? "Хороший результат! Ещё чуть-чуть 🎯" :
    "Не расстраивайтесь — приходите учиться 🚗";
  const resultColor =
    score === total ? "#16A34A" : score >= total * 0.7 ? "#D97706" : "#DC2626";

  return (
    <section
      id="signs"
      className="relative py-12 sm:py-24 overflow-hidden"
      style={{ background: "#F9FAFB" }}
    >
      {/* Subtle background blob */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(225,29,72,0.035) 0%, transparent 65%)" }}
      />

      <div className="max-w-xl mx-auto px-4 sm:px-6 relative">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="label-tag justify-center mb-4">Тест ПДД</div>
          <h2
            className="font-extrabold leading-tight"
            style={{ fontSize: "clamp(1.9rem, 4vw, 2.6rem)", color: "#111827", letterSpacing: "-0.02em" }}
          >
            Узнай знак — проверь себя
          </h2>
          <p className="text-sm mt-3" style={{ color: "#9CA3AF" }}>
            6 дорожных знаков · Кликни на правильный ответ
          </p>
        </motion.div>

        <AnimatePresence mode="wait">

          {/* ── Finished screen ── */}
          {finished ? (
            <motion.div
              key="finish"
              initial={{ opacity: 0, scale: 0.95, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -16 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-center p-8 sm:p-12"
              style={{
                background: "rgba(250,249,247,0.98)",
                borderRadius: "2.5rem",
                boxShadow: CARD_SHADOW,
              }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.15 }}
                className="text-6xl mb-6"
              >
                {score === total ? "🏆" : score >= total * 0.7 ? "🎯" : "🚗"}
              </motion.div>

              <h3 className="text-3xl font-black mb-2" style={{ color: "#111827" }}>
                {score} / {total} правильных
              </h3>
              <p className="text-base font-semibold mb-6" style={{ color: resultColor }}>
                {resultLabel}
              </p>

              {/* Score bar */}
              <div className="w-full h-2.5 rounded-full mb-8 overflow-hidden" style={{ background: "#F3F4F6" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: resultColor }}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="#register"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-bold text-white text-sm transition-all"
                  style={{
                    background: "linear-gradient(160deg, #C41E3A 0%, #9E1239 50%, #7D0E2D 100%)",
                    boxShadow: "0 4px 14px rgba(158,18,57,0.35)",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ""; }}
                >
                  Записаться на обучение
                  <ArrowRight size={16} />
                </a>
                <button
                  onClick={reset}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-semibold text-sm transition-all"
                  style={{ border: "1.5px solid #E2E8F0", color: "#6B7280", background: "#fff" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#9E1239";
                    (e.currentTarget as HTMLElement).style.color = "#9E1239";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#E2E8F0";
                    (e.currentTarget as HTMLElement).style.color = "#6B7280";
                  }}
                >
                  <RotateCcw size={15} />
                  Пройти заново
                </button>
              </div>
            </motion.div>

          ) : (
            /* ── Question card ── */
            <motion.div
              key={idx}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{
                background: "rgba(250,249,247,0.98)",
                borderRadius: "2.5rem",
                boxShadow: CARD_SHADOW,
                overflow: "hidden",
              }}
            >
              {/* Progress dots */}
              <div className="flex items-center justify-center gap-2 pt-7 pb-1 px-8">
                {QUESTIONS.map((_, i) => (
                  <div
                    key={i}
                    className="transition-all duration-300"
                    style={{
                      width: i === idx ? 22 : 8,
                      height: 8,
                      borderRadius: 99,
                      background:
                        i < idx ? "#16A34A"
                        : i === idx ? "#9E1239"
                        : "#E2E8F0",
                    }}
                  />
                ))}
              </div>

              <div className="px-6 sm:px-10 pb-8 pt-4">
                {/* Counter */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#9CA3AF" }}>
                    Вопрос {idx + 1} / {total}
                  </span>
                  <span
                    className="text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{ background: "rgba(158,18,57,0.07)", color: "#9E1239" }}
                  >
                    {score} правильных
                  </span>
                </div>

                {/* Sign */}
                <div className="flex flex-col items-center mb-6">
                  <motion.div
                    key={`sign-${idx}`}
                    initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                    className="w-36 h-36 sm:w-40 sm:h-40 drop-shadow-md"
                  >
                    <q.Sign />
                  </motion.div>
                  <span
                    className="mt-2 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "#CBD5E1" }}
                  >
                    {q.signLabel}
                  </span>
                </div>

                {/* Question */}
                <h3
                  className="font-bold leading-snug text-center mb-6"
                  style={{ fontSize: "clamp(1rem, 2.5vw, 1.15rem)", color: "#111827" }}
                >
                  {q.question}
                </h3>

                {/* Answer grid — 2×2 */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {q.answers.map((ans, i) => {
                    const isCorrect  = i === q.correct;
                    const isSelected = i === selected;
                    const isWrong    = answered && isSelected && !isCorrect;
                    const isRight    = answered && isCorrect;
                    const isDimmed   = answered && !isCorrect && !isSelected;

                    let bg     = "#FFFFFF";
                    let border = "#E2E8F0";
                    let color  = "#374151";
                    let badgeBg   = "#F1F5F9";
                    let badgeClr  = "#94A3B8";

                    if (isRight) {
                      bg = "rgba(22,163,74,0.07)";
                      border = "rgba(22,163,74,0.45)";
                      color = "#15803D";
                      badgeBg  = "#16A34A";
                      badgeClr = "#fff";
                    } else if (isWrong) {
                      bg = "rgba(220,38,38,0.07)";
                      border = "rgba(220,38,38,0.4)";
                      color = "#B91C1C";
                      badgeBg  = "#DC2626";
                      badgeClr = "#fff";
                    } else if (isDimmed) {
                      color = "#CBD5E1";
                      border = "#F1F5F9";
                    }

                    return (
                      <motion.button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        disabled={answered}
                        whileHover={!answered ? { scale: 1.025, y: -1 } : {}}
                        whileTap={!answered ? { scale: 0.975 } : {}}
                        className={isWrong ? "animate-shake" : ""}
                        style={{
                          background: bg,
                          border: `1.5px solid ${border}`,
                          borderRadius: "1rem",
                          padding: "12px 12px",
                          cursor: answered ? "default" : "pointer",
                          textAlign: "left",
                          display: "flex",
                          flexDirection: "column",
                          gap: 8,
                          transition: "background 0.25s, border-color 0.25s",
                          minHeight: 80,
                        }}
                      >
                        {/* Letter badge + icon row */}
                        <div className="flex items-center justify-between">
                          <span
                            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black transition-colors"
                            style={{ background: badgeBg, color: badgeClr, flexShrink: 0 }}
                          >
                            {LETTERS[i]}
                          </span>

                          <AnimatePresence>
                            {answered && isCorrect && (
                              <motion.span variants={popIn} initial="hidden" animate="visible">
                                <CheckCircle size={16} style={{ color: "#16A34A" }} />
                              </motion.span>
                            )}
                            {isWrong && (
                              <motion.span variants={popIn} initial="hidden" animate="visible">
                                <XCircle size={16} style={{ color: "#DC2626" }} />
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Answer text */}
                        <span
                          className="text-xs font-semibold leading-snug"
                          style={{ color, transition: "color 0.25s" }}
                        >
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
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div
                        className="rounded-2xl p-4 text-xs leading-relaxed"
                        style={{
                          background: selected === q.correct
                            ? "rgba(22,163,74,0.06)"
                            : "rgba(220,38,38,0.06)",
                          border: `1.5px solid ${selected === q.correct ? "rgba(22,163,74,0.2)" : "rgba(220,38,38,0.2)"}`,
                          color: "#374151",
                        }}
                      >
                        <span
                          className="font-bold"
                          style={{ color: selected === q.correct ? "#15803D" : "#B91C1C" }}
                        >
                          {selected === q.correct ? "Верно! " : "Не совсем. "}
                        </span>
                        {q.explanation}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Auto-advance hint */}
                {answered && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-center text-xs mt-3"
                    style={{ color: "#CBD5E1" }}
                  >
                    {idx === total - 1 ? "Результат через секунду…" : "Следующий вопрос через секунду…"}
                  </motion.p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
