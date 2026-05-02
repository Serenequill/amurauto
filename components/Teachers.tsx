"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/*──────────────────────────────────────────
  Добавляйте преподавателей сюда.
  photo — путь к файлу в /public (PNG лучше)
  Если фото нет — оставьте photo: null
──────────────────────────────────────────*/
const TEACHERS = [
  {
    name: "Еременко Наталья Викторовна",
    title: "Преподаватель по теории",
    experience: 5,
    photo: "/teachers/IMG_3898.JPEG",
    bio: "Высокий уровень подготовки курсантов и стабильные результаты. Умеет понятно и грамотно объяснять материал. Благодаря профессиональному подходу курсанты уверенно осваивают теорию и успешно сдают экзамены.",
  },
];

function plural(n: number) {
  if (n % 10 === 1 && n % 100 !== 11) return "год";
  if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)) return "года";
  return "лет";
}

const CARD_W = 300;
const CARD_GAP = 24;

function TeacherCard({ teacher }: { teacher: (typeof TEACHERS)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        boxShadow: hovered
          ? "0 32px 80px rgba(225,29,72,0.55), 0 8px 32px rgba(225,29,72,0.3)"
          : "0 16px 48px rgba(225,29,72,0.3), 0 4px 20px rgba(0,0,0,0.25)",
      }}
      transition={{ duration: 0.3 }}
      className="relative flex flex-col shrink-0 overflow-hidden"
      style={{
        borderRadius: "3.5rem",
        width: `${CARD_W}px`,
        background: "#E11D48",
      }}
    >
      {/* Photo — inset with padding so red shows around it */}
      <div className="px-5 pt-6" style={{ height: 370 }}>
        <motion.div
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.38, ease: "easeOut" }}
          className="relative w-full h-full overflow-hidden"
          style={{ borderRadius: "2.5rem" }}
        >
          {teacher.photo ? (
            <Image
              src={teacher.photo}
              alt={teacher.name}
              fill
              className="object-cover object-top"
              priority
            />
          ) : (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ background: "rgba(0,0,0,0.15)" }}
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.45)" }}>Фото появится скоро</span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Info */}
      <div className="px-6 py-6">
        {/* Experience badge */}
        <div
          className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.16em] px-3 py-1.5 rounded-full mb-4"
          style={{ background: "rgba(0,0,0,0.2)", color: "rgba(255,255,255,0.75)" }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.6)" }}
          />
          Стаж {teacher.experience} {plural(teacher.experience)}
        </div>

        <p
          className="font-black text-white leading-tight"
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)", letterSpacing: "-0.02em" }}
        >
          {teacher.name}
        </p>
        <p className="text-xs mt-1.5 font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>
          {teacher.title}
        </p>
        {teacher.bio && (
          <p className="text-xs mt-3 leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
            {teacher.bio}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function Teachers() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(TEACHERS.length - 1, c + 1));

  const offset = -(current * (CARD_W + CARD_GAP));

  return (
    <section id="teachers" className="py-12 sm:py-24" style={{ background: "#0F172A" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
          <div>
            <div
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] mb-5"
              style={{ color: "#E11D48" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#E11D48" }} />
              Команда
            </div>
            <h2
              className="font-black leading-tight text-white"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.025em" }}
            >
              Преподаватели по теории
            </h2>
            <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.3)" }}>
              {TEACHERS.length} {TEACHERS.length === 1 ? "преподаватель" : "преподавателя"} · Высшая категория
            </p>
          </div>

          {/* Arrows — only when multiple teachers */}
          {TEACHERS.length > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                disabled={current === 0}
                className="w-10 h-10 flex items-center justify-center rounded-full transition-all"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: current === 0 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.6)",
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                disabled={current === TEACHERS.length - 1}
                className="w-10 h-10 flex items-center justify-center rounded-full transition-all"
                style={{
                  background: current === TEACHERS.length - 1 ? "rgba(225,29,72,0.3)" : "#E11D48",
                  color: "#fff",
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* ── Carousel ── */}
        <div className="overflow-hidden">
          <motion.div
            className="flex"
            style={{ gap: CARD_GAP }}
            animate={{ x: offset }}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
          >
            {TEACHERS.map((t) => (
              <TeacherCard key={t.name} teacher={t} />
            ))}
          </motion.div>
        </div>

        {/* ── Dots ── */}
        {TEACHERS.length > 1 && (
          <div className="flex gap-1.5 mt-10">
            {TEACHERS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="rounded-full transition-all"
                style={{
                  width: i === current ? 24 : 6,
                  height: 6,
                  background: i === current ? "#E11D48" : "rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
