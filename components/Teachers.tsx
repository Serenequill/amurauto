"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ─────────────────────────────────────────
   Добавляйте преподавателей сюда.
   photo — путь к файлу в папке /public
   Если фото нет — оставьте photo: null
──────────────────────────────────────────*/
const TEACHERS = [
  {
    name: "Еременко Наталья Викторовна",
    title: "Преподаватель по теории",
    experience: 5,
    photo: "/teachers/Наталья.JPEG",
    bio: "Высокий уровень подготовки курсантов и стабильные результаты. Умеет понятно и грамотно объяснять материал. Благодаря профессиональному подходу, требовательности и поддержке, курсанты уверенно осваивают теорию и успешно сдают экзамены.",
  },
];

function plural(n: number) {
  if (n % 10 === 1 && n % 100 !== 11) return "год";
  if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)) return "года";
  return "лет";
}

export default function Teachers() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c === 0 ? TEACHERS.length - 1 : c - 1));
  };
  const next = () => {
    setDirection(1);
    setCurrent((c) => (c === TEACHERS.length - 1 ? 0 : c + 1));
  };

  const t = TEACHERS[current];

  return (
    <section id="teachers" className="py-12 sm:py-24" style={{ background: "#F9FAFB" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
          <div>
            <div className="label-tag mb-5">Команда</div>
            <h2 className="font-extrabold leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#111827", letterSpacing: "-0.02em" }}>
              Преподаватели по теории
            </h2>
          </div>

          {/* Navigation arrows */}
          {TEACHERS.length > 1 && (
            <div className="flex items-center gap-2">
              <button onClick={prev}
                className="w-10 h-10 flex items-center justify-center rounded-full transition-all"
                style={{ border: "1px solid #E5E7EB", color: "#9CA3AF", background: "#FFFFFF" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#111827"; (e.currentTarget as HTMLElement).style.color = "#111827"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#E5E7EB"; (e.currentTarget as HTMLElement).style.color = "#9CA3AF"; }}
              >
                <ChevronLeft size={18} />
              </button>
              <button onClick={next}
                className="w-10 h-10 flex items-center justify-center rounded-full transition-all"
                style={{ background: "#111827", color: "#fff" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1F2937"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#111827"; }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={{
                enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {/* Current card — always shown */}
              <div
                className="flex flex-col rounded-2xl overflow-hidden transition-all"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #F1F5F9",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                }}
              >
                {/* Photo */}
                <div className="relative w-full" style={{ aspectRatio: "3/4", background: "#F3F4F6" }}>
                  {t.photo ? (
                    <Image src={t.photo} alt={t.name} fill className="object-cover object-top" />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                      <div className="w-20 h-20 rounded-full flex items-center justify-center"
                        style={{ background: "#FFFFFF", border: "1px solid #E5E7EB" }}>
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <span className="text-xs font-medium" style={{ color: "#D1D5DB" }}>Фото появится скоро</span>
                    </div>
                  )}
                  {/* Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold"
                    style={{ background: "#111827", color: "#FFFFFF" }}>
                    {t.experience} {plural(t.experience)}
                  </div>
                </div>

                {/* Info */}
                <div className="px-5 py-5 flex flex-col gap-3">
                  <div>
                    <p className="font-bold text-base leading-snug" style={{ color: "#111827" }}>{t.name}</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#E11D48" }} />
                      <p className="text-xs font-medium" style={{ color: "#9CA3AF" }}>
                        {t.title} · стаж {t.experience} {plural(t.experience)}
                      </p>
                    </div>
                  </div>
                  {t.bio && (
                    <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>{t.bio}</p>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        {TEACHERS.length > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {TEACHERS.map((_, i) => (
              <button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className="rounded-full transition-all"
                style={{ width: i === current ? "24px" : "8px", height: "8px", background: i === current ? "#E11D48" : "#E5E7EB" }}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
