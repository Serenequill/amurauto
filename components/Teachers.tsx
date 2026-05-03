"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "@/contexts/LangContext";

/*──────────────────────────────────────────
  Добавляйте преподавателей сюда.
  photo — путь к файлу в /public (PNG лучше)
  Если фото нет — оставьте photo: null
──────────────────────────────────────────*/
const TEACHERS_BASE = [
  {
    name:       "Еременко Наталья Викторовна",
    experience: 5,
    photo:      "/teachers/teacher_natalia.jpg",
  },
];

const CARD_W = 300;
const CARD_GAP = 24;

function TeacherCard({
  teacher,
  title,
  bio,
  experienceLabel,
  photoSoon,
}: {
  teacher: (typeof TEACHERS_BASE)[0];
  title: string;
  bio: string;
  experienceLabel: string;
  photoSoon: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col shrink-0 overflow-hidden"
      style={{
        borderRadius: "3.5rem",
        width: `${CARD_W}px`,
        background: "#E11D48",
        boxShadow: hovered
          ? "0 32px 80px rgba(225,29,72,0.55), 0 8px 32px rgba(225,29,72,0.3)"
          : "0 16px 48px rgba(225,29,72,0.3), 0 4px 20px rgba(0,0,0,0.25)",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* Photo */}
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
              <span className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.45)" }}>{photoSoon}</span>
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
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.6)" }} />
          {experienceLabel}
        </div>

        <p
          className="font-black text-white leading-tight"
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)", letterSpacing: "-0.02em" }}
        >
          {teacher.name}
        </p>
        <p className="text-xs mt-1.5 font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>
          {title}
        </p>
        {bio && (
          <p className="text-xs mt-3 leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
            {bio}
          </p>
        )}
      </div>
    </div>
  );
}

export default function Teachers() {
  const { t } = useLang();
  const tr = t.teachers;

  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(TEACHERS_BASE.length - 1, c + 1));
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
              {tr.tag}
            </div>
            <h2
              className="font-black leading-tight text-white"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.025em" }}
            >
              {tr.title}
            </h2>
            <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.3)" }}>
              {tr.subtitle(TEACHERS_BASE.length)}
            </p>
          </div>

          {/* Arrows — only when multiple teachers */}
          {TEACHERS_BASE.length > 1 && (
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
                disabled={current === TEACHERS_BASE.length - 1}
                className="w-10 h-10 flex items-center justify-center rounded-full transition-all"
                style={{
                  background: current === TEACHERS_BASE.length - 1 ? "rgba(225,29,72,0.3)" : "#E11D48",
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
            {TEACHERS_BASE.map((teacher, i) => {
              const dict = tr.teachers[i] ?? tr.teachers[0];
              return (
                <TeacherCard
                  key={teacher.name}
                  teacher={teacher}
                  title={dict.title}
                  bio={dict.bio}
                  experienceLabel={tr.experience(teacher.experience)}
                  photoSoon={tr.photoSoon}
                />
              );
            })}
          </motion.div>
        </div>

        {/* ── Dots ── */}
        {TEACHERS_BASE.length > 1 && (
          <div className="flex gap-1.5 mt-10">
            {TEACHERS_BASE.map((_, i) => (
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
