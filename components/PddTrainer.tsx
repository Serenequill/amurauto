"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Trophy } from "lucide-react";

/* ─────────── Data ─────────── */
interface Question {
  id: number;
  question: string;
  answers: string[];
  correct: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Можно ли остановиться под знаком «Остановка запрещена» на 2 минуты, чтобы высадить пассажира?",
    answers: ["Да, если не более 5 минут", "Да, если не создаёт помех", "Нет, остановка запрещена полностью", "Только водителям такси"],
    correct: 2,
    explanation: "Знак 3.27 запрещает любую остановку — даже кратковременную. Штраф: 3 МРП (~11 076 ₸).",
  },
  {
    id: 2,
    question: "Обязаны ли вы полностью останавливаться перед знаком «Уступите дорогу»?",
    answers: ["Да, всегда", "Нет — только если есть другие машины", "Да, только ночью", "Только при мигающем жёлтом"],
    correct: 1,
    explanation: "Знак 2.4 требует лишь пропустить других участников. Если дорога пуста — полная остановка не обязательна.",
  },
  {
    id: 3,
    question: "Кто может заехать под знак «Въезд запрещён» («Кирпич»)?",
    answers: ["Жильцы соседних домов", "Водители такси", "Маршрутные транспортные средства", "Никто"],
    correct: 2,
    explanation: "Знак 3.1 не распространяется на маршрутные ТС (автобусы, троллейбусы), следующие по маршруту.",
  },
  {
    id: 4,
    question: "После знака «Движение прямо» можно ли повернуть направо во двор?",
    answers: ["Да, поворот во дворы разрешён", "Нет, только прямо", "Можно с включённым поворотником", "Только мотоциклам"],
    correct: 0,
    explanation: "Знак 4.1.1 запрещает лишь левые повороты и развороты. Поворот направо во дворы — разрешён.",
  },
  {
    id: 5,
    question: "Какой штраф грозит за парковку на месте для инвалидов без специального знака?",
    answers: ["3 МРП (~11 076 ₸)", "10 МРП (~36 920 ₸)", "50 МРП (~184 600 ₸)", "Штрафа нет"],
    correct: 1,
    explanation: "Парковка в местах для инвалидов без разрешения — 10 МРП (~36 920 ₸), независимо от времени стоянки.",
  },
];

const LETTERS = ["А", "Б", "В", "Г"];

/* ─────────── Variants ─────────── */
const slideIn: Variants = {
  enter:  { x: 60, opacity: 0 },
  center: { x: 0,  opacity: 1, transition: { duration: 0.35, ease: "easeOut" } },
  exit:   { x: -60, opacity: 0, transition: { duration: 0.25, ease: "easeIn" } },
};

const popIn: Variants = {
  hidden:  { scale: 0.6, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 320, damping: 20 } },
};

/* ─────────── Component ─────────── */
export default function PddTrainer() {
  const [started, setStarted]   = useState(false);
  const [idx, setIdx]           = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore]       = useState(0);
  const [finished, setFinished] = useState(false);

  const q        = QUESTIONS[idx];
  const answered = selected !== null;
  const isRight  = answered && selected === q.correct;

  const handleAnswer = (i: number) => {
    if (answered) return;
    setSelected(i);
    if (i === q.correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (idx === QUESTIONS.length - 1) { setFinished(true); return; }
    setIdx((i) => i + 1);
    setSelected(null);
  };

  const reset = () => { setIdx(0); setSelected(null); setScore(0); setFinished(false); setStarted(false); };

  const level      = score >= 5 ? "Профи 🏆" : score >= 3 ? "Хорошо 🎯" : "Новичок 🚗";
  const levelColor = score >= 5 ? "#16a34a"  : score >= 3 ? "#d97706"    : "#E11D48";

  return (
    <section id="signs" className="relative py-20 overflow-hidden" style={{ background: "#F9FAFB" }}>
      <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(225,29,72,0.04) 0%, transparent 70%)" }} />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <span
            className="inline-block text-sm font-semibold uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
            style={{ color: "#E11D48", background: "rgba(225,29,72,0.08)" }}
          >
            Мини-квиз
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mb-2" style={{ color: "#111827" }}>
            Проверь <span style={{ color: "#E11D48" }}>себя</span>
          </h2>
          <p className="text-base" style={{ color: "#6b7280" }}>
            5 вопросов по ПДД — узнай, готов ли ты к экзамену
          </p>
        </div>

        <AnimatePresence mode="wait">
          {/* ── Start screen ── */}
          {!started && !finished && (
            <motion.div
              key="start"
              variants={slideIn}
              initial="enter"
              animate="center"
              exit="exit"
              className="rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden"
              style={{ background: "#FFFFFF", border: "1px solid #F1F5F9", boxShadow: "0 2px 24px rgba(0,0,0,0.05)" }}
            >
              <div className="text-5xl mb-6">🚦</div>
              <h3
                className="font-black leading-tight mb-4"
                style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "#111827", maxWidth: 440, margin: "0 auto 1rem" }}
              >
                Проверь свои знания ПДД и получи скидку на обучение
              </h3>
              <p className="text-base mb-8" style={{ color: "#6b7280" }}>
                5 вопросов — всего 2 минуты. Готов?
              </p>
              <button
                onClick={() => setStarted(true)}
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-2xl font-bold text-lg text-white transition-all"
                style={{ background: "#E11D48" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#be123c"; (e.currentTarget as HTMLElement).style.transform = "scale(1.03)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#E11D48"; (e.currentTarget as HTMLElement).style.transform = ""; }}
              >
                Начать тест
                <ArrowRight size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {/* ── Results ── */}
          {started && finished ? (
            <motion.div
              key="results"
              variants={slideIn}
              initial="enter"
              animate="center"
              exit="exit"
              className="rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden"
              style={{ background: "#FFFFFF", border: "1px solid #F1F5F9", boxShadow: "0 2px 24px rgba(0,0,0,0.05)" }}
            >
              <motion.div variants={popIn} initial="hidden" animate="visible" className="text-6xl mb-5">
                {score >= 5 ? "🏆" : score >= 3 ? "🎯" : "🚗"}
              </motion.div>

              <h3 className="text-3xl font-black mb-2" style={{ color: "#111827" }}>
                {score} / 5 правильных
              </h3>
              <p className="text-lg font-bold mb-6" style={{ color: levelColor }}>{level}</p>

              {/* Progress bar */}
              <div className="w-full rounded-full h-2.5 mb-8 overflow-hidden" style={{ background: "#f3f4f6" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: levelColor }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(score / 5) * 100}%` }}
                  transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
                />
              </div>

              <p className="text-base leading-relaxed mb-8" style={{ color: "#6b7280", maxWidth: 400, margin: "0 auto 2rem" }}>
                {score >= 5
                  ? "Отлично! Вы знаете ПДД на отлично — записывайтесь на вождение."
                  : score >= 3
                  ? "Неплохой результат! Немного практики — и будете готовы к экзамену."
                  : "Не расстраивайтесь — правила осваиваются. Запишитесь и начните учиться сегодня!"}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="#register"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-bold text-white text-base transition-all"
                  style={{ background: "#E11D48" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#be123c"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#E11D48"; }}
                >
                  Записаться на обучение
                  <ArrowRight size={17} />
                </a>
                <button
                  onClick={reset}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-semibold text-base transition-all"
                  style={{ border: "1.5px solid #e5e7eb", color: "#6b7280", background: "#fff" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#E11D48"; (e.currentTarget as HTMLElement).style.color = "#E11D48"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#e5e7eb"; (e.currentTarget as HTMLElement).style.color = "#6b7280"; }}
                >
                  <RotateCcw size={16} />
                  Пройти ещё раз
                </button>
              </div>
            </motion.div>
          ) : started ? (
            /* ── Quiz card ── */
            <motion.div
              key={idx}
              variants={slideIn}
              initial="enter"
              animate="center"
              exit="exit"
              className="rounded-3xl overflow-hidden relative"
            >
              {/* Progress bar */}
              <div className="w-full h-1.5" style={{ background: "#f3f4f6" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "#E11D48" }}
                  animate={{ width: `${((idx + (answered ? 1 : 0)) / QUESTIONS.length) * 100}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>

              <div className="p-6 sm:p-10">
                {/* Top bar */}
                <div className="flex items-center justify-between mb-7">
                  <span className="text-sm font-medium" style={{ color: "#9ca3af" }}>
                    Вопрос {idx + 1} из {QUESTIONS.length}
                  </span>
                  <div
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold"
                    style={{ background: "rgba(225,29,72,0.08)", color: "#E11D48" }}
                  >
                    <Trophy size={13} />
                    {score} / {QUESTIONS.length}
                  </div>
                </div>

                {/* Question */}
                <h3 className="text-xl sm:text-2xl font-black leading-snug mb-7" style={{ color: "#111827" }}>
                  {q.question}
                </h3>

                {/* Answers */}
                <div className="flex flex-col gap-3 mb-6">
                  {q.answers.map((ans, i) => {
                    const isCorrect  = i === q.correct;
                    const isSelected = i === selected;
                    let bg = "#fafafa", border = "#e5e7eb", color = "#111827";
                    if (answered) {
                      if (isCorrect)                    { bg = "#f0fdf4"; border = "#86efac"; color = "#15803d"; }
                      else if (isSelected && !isCorrect){ bg = "#fff1f2"; border = "#fca5a5"; color = "#b91c1c"; }
                      else                              { bg = "#fafafa"; border = "#e5e7eb"; color = "#9ca3af"; }
                    }

                    return (
                      <motion.button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        disabled={answered}
                        whileHover={!answered ? { scale: 1.015 } : {}}
                        whileTap={!answered ? { scale: 0.985 } : {}}
                        className="w-full text-left px-5 py-4 rounded-2xl font-medium text-sm flex items-center gap-3 transition-colors"
                        style={{ background: bg, border: `1.5px solid ${border}`, color, cursor: answered ? "default" : "pointer" }}
                      >
                        {/* Letter badge */}
                        <span
                          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 transition-colors"
                          style={{
                            background: answered && isCorrect ? "#16a34a"
                              : answered && isSelected && !isCorrect ? "#E11D48"
                              : "rgba(225,29,72,0.1)",
                            color: answered && (isCorrect || isSelected) ? "#fff" : "#E11D48",
                          }}
                        >
                          {LETTERS[i]}
                        </span>

                        <span className="flex-1">{ans}</span>

                        <AnimatePresence>
                          {answered && isCorrect && (
                            <motion.span variants={popIn} initial="hidden" animate="visible">
                              <CheckCircle size={18} style={{ color: "#16a34a" }} />
                            </motion.span>
                          )}
                          {answered && isSelected && !isCorrect && (
                            <motion.span variants={popIn} initial="hidden" animate="visible">
                              <XCircle size={18} style={{ color: "#E11D48" }} />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Explanation */}
                <AnimatePresence>
                  {answered && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="rounded-2xl p-4 mb-5 text-sm leading-relaxed"
                      style={{
                        background: isRight ? "rgba(22,163,74,0.06)" : "rgba(225,29,72,0.06)",
                        border: `1.5px solid ${isRight ? "rgba(22,163,74,0.2)" : "rgba(225,29,72,0.2)"}`,
                        color: "#374151",
                      }}
                    >
                      <span className="font-bold" style={{ color: isRight ? "#15803d" : "#b91c1c" }}>
                        {isRight ? "Верно! " : "Не совсем. "}
                      </span>
                      {q.explanation}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Next button */}
                <AnimatePresence>
                  {answered && (
                    <motion.button
                      onClick={handleNext}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base text-white transition-all"
                      style={{ background: "#E11D48" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#be123c"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#E11D48"; }}
                    >
                      {idx === QUESTIONS.length - 1 ? "Посмотреть результат" : "Следующий вопрос"}
                      <ArrowRight size={17} />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
