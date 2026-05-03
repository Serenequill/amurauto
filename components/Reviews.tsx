"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "@/contexts/LangContext";

const REVIEWS = [
  { name: "Азамат М.",   rating: 5, text: "Получил права без всяких заморочек, теория и практика были сданы практически на отлично." },
  { name: "Изабела Т.",  rating: 5, text: "Преподаватели супер... Золотые люди с золотым сердцем." },
  { name: "Kirill K.",   rating: 5, text: "Сильные преподаватели, сильные инструктора — записывайтесь, не пожалеете." },
  { name: "Asem K.",     rating: 5, text: "Отличная автошкола! Преподаватели объясняют понятно. Получила права без проблем." },
  { name: "Valeriia F.", rating: 5, text: "Качественная подготовка — сдала с первой попытки на 38/40. Рекомендую всем!" },
  { name: "Дильназ С.",  rating: 5, text: "Благодаря этой школе с первой попытки получила права 🥳" },
  { name: "Elvira A.",   rating: 5, text: "Сегодня я получила свои водительские права! Очень благодарна авто-школе." },
  { name: "Балнур Т.",   rating: 5, text: "Благодаря вам смогла самостоятельно сдать на права. Спасибо всей команде!" },
  { name: "Дулат А.",    rating: 5, text: "Лучшие! Мурат ага, спасибо огромное — получил права!" },
  { name: "Марлен М.",   rating: 5, text: "Сдал все экзамены с первой попытки благодаря Жанбырбаю, Рашиду и Зауре." },
];

/* ─── 2GIS mini-logo ─── */
function TwoGisLogo() {
  return (
    <span
      className="inline-flex items-center justify-center shrink-0 font-black text-white"
      style={{ width: 16, height: 16, background: "#1DB248", borderRadius: "50%", fontSize: "8px" }}
    >
      2
    </span>
  );
}

/* ─── Stars ─── */
function Stars({ count, dark }: { count: number; dark?: boolean }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24"
          fill={dark ? "rgba(255,255,255,0.5)" : "#E11D48"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  const { t } = useLang();
  const r = t.reviews;

  const [current, setCurrent] = useState(0);
  const dragStartX = useRef(0);

  const prev = () => setCurrent((c) => (c === 0 ? REVIEWS.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === REVIEWS.length - 1 ? 0 : c + 1));
  const visible = [0, 1, 2].map((o) => REVIEWS[(current + o) % REVIEWS.length]);

  return (
    <section id="reviews" className="py-12 sm:py-24" style={{ background: "#F9FAFB" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <div className="label-tag mb-5">{r.tag}</div>
            <h2 className="font-black leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#111827", letterSpacing: "-0.025em" }}>
              {r.title}
            </h2>
            <div className="flex items-center gap-3 mt-4 flex-wrap">
              {/* Rating badge */}
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full"
                style={{ background: "rgba(225,29,72,0.08)", border: "1px solid rgba(225,29,72,0.2)" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#E11D48">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="text-sm font-black" style={{ color: "#E11D48" }}>4.7</span>
                <span className="text-xs font-medium" style={{ color: "rgba(225,29,72,0.6)" }}>{r.ratingOf}</span>
              </div>
              <span className="text-xs" style={{ color: "#9CA3AF" }}>{r.reviewCount}</span>
              <a href="https://2gis.kz/almaty/firm/9429940001593162/tab/reviews"
                target="_blank" rel="noopener noreferrer"
                className="text-xs font-semibold underline transition-colors"
                style={{ color: "#9CA3AF" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#111827")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9CA3AF")}>
                {r.allReviews}
              </a>
            </div>
          </div>

          {/* Nav buttons */}
          <div className="flex gap-2">
            <button onClick={prev}
              className="w-10 h-10 flex items-center justify-center rounded-full transition-all"
              style={{ border: "1px solid #E5E7EB", color: "#9CA3AF", background: "#FFFFFF" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#111827"; (e.currentTarget as HTMLElement).style.color = "#111827"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#E5E7EB"; (e.currentTarget as HTMLElement).style.color = "#9CA3AF"; }}
              aria-label={r.prevLabel}>
              <ChevronLeft size={18} />
            </button>
            <button onClick={next}
              className="w-10 h-10 flex items-center justify-center rounded-full transition-all"
              style={{ background: "#111827", color: "#fff" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1F2937"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#111827"; }}
              aria-label={r.nextLabel}>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Cards — with swipe support */}
        <div
          onTouchStart={(e) => { dragStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            const delta = e.changedTouches[0].clientX - dragStartX.current;
            if (delta < -50) next();
            else if (delta > 50) prev();
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {visible.map((rev, i) => {
                const isDark = i === 1;
                return (
                  <motion.div
                    key={`${rev.name}-${i}`}
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="flex flex-col p-6 cursor-default"
                    style={{
                      borderRadius: "2.5rem",
                      background: isDark ? "#1E293B" : "#FFFFFF",
                      border: isDark ? "none" : "1px solid #F1F5F9",
                      boxShadow: isDark
                        ? "0 20px 60px rgba(0,0,0,0.2)"
                        : "0 2px 20px rgba(0,0,0,0.04)",
                    }}
                  >
                    <Stars count={rev.rating} dark={isDark} />

                    <p className="text-sm leading-relaxed flex-1 my-5"
                      style={{ color: isDark ? "rgba(255,255,255,0.55)" : "#6B7280" }}>
                      &ldquo;{rev.text}&rdquo;
                    </p>

                    <div className="flex items-center gap-3 pt-4"
                      style={{ borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "#F1F5F9"}` }}>
                      {/* Avatar */}
                      <div className="w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shrink-0"
                        style={isDark
                          ? { background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }
                          : { background: "rgba(225,29,72,0.07)", color: "#E11D48" }}>
                        {rev.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm" style={{ color: isDark ? "#fff" : "#111827" }}>
                          {rev.name}
                        </p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <TwoGisLogo />
                          <span className="text-[10px] font-medium" style={{ color: isDark ? "rgba(255,255,255,0.3)" : "#9CA3AF" }}>
                            2ГИС
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* iOS-style dots */}
        <div className="flex justify-center gap-1.5 mt-8">
          {REVIEWS.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? "24px" : "6px",
                height: "6px",
                background: i === current ? "#E11D48" : "#E2E8F0",
              }}
              aria-label={r.dotLabel(i + 1)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
