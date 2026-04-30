"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const REVIEWS = [
  { name: "Азамат М.",     date: "2ГИС", rating: 5, text: "Получил права без всяких заморочек, теория и практика были сданы практически на отлично." },
  { name: "Изабела Т.",    date: "2ГИС", rating: 5, text: "Преподаватели супер... Золотые люди с золотым сердцем." },
  { name: "Kirill K.",     date: "2ГИС", rating: 5, text: "Сильные преподаватели, сильные инструктора — записывайтесь, не пожалеете." },
  { name: "Asem K.",       date: "2ГИС", rating: 5, text: "Отличная автошкола! Преподаватели объясняют понятно. Получила права без проблем." },
  { name: "Valeriia F.",   date: "2ГИС", rating: 5, text: "Качественная подготовка — сдала с первой попытки на 38/40. Рекомендую всем!" },
  { name: "Дильназ С.",    date: "2ГИС", rating: 5, text: "Благодаря этой школе с первой попытки получила права 🥳" },
  { name: "Elvira A.",     date: "2ГИС", rating: 5, text: "Сегодня я получила свои водительские права! Очень благодарна авто-школе." },
  { name: "Балнур Т.",     date: "2ГИС", rating: 5, text: "Благодаря вам смогла самостоятельно сдать на права. Спасибо всей команде!" },
  { name: "Дулат А.",      date: "2ГИС", rating: 5, text: "Лучшие! Мурат ага, спасибо огромное — получил права!" },
  { name: "Марлен М.",     date: "2ГИС", rating: 5, text: "Сдал все экзамены с первой попытки благодаря Жанбырбаю, Рашиду и Зауре." },
];

export default function Reviews() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c === 0 ? REVIEWS.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === REVIEWS.length - 1 ? 0 : c + 1));
  const visible = [0, 1, 2].map((o) => REVIEWS[(current + o) % REVIEWS.length]);

  return (
    <section id="reviews" className="py-12 sm:py-24" style={{ background: "#F9FAFB" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <div className="label-tag mb-5">Отзывы</div>
            <h2 className="font-extrabold leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#111827", letterSpacing: "-0.02em" }}>
              Что говорят курсанты
            </h2>
            <div className="flex items-center gap-3 mt-4 flex-wrap">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{ background: "#FEF9C3", border: "1px solid #FDE68A" }}>
                <span className="text-sm font-black" style={{ color: "#92400E" }}>★ 4.7</span>
                <span className="text-xs font-medium" style={{ color: "#A16207" }}>из 5</span>
              </div>
              <span className="text-xs" style={{ color: "#9CA3AF" }}>122 отзыва</span>
              <a
                href="https://2gis.kz/almaty/firm/9429940001593162/tab/reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold underline transition-colors"
                style={{ color: "#9CA3AF" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#111827")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9CA3AF")}
              >
                Все отзывы на 2ГИС →
              </a>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={prev}
              className="w-10 h-10 flex items-center justify-center rounded-sm transition-all"
              style={{ border: "1px solid #E5E7EB", color: "#9CA3AF", background: "#FFFFFF" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#111827"; (e.currentTarget as HTMLElement).style.color = "#111827"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#E5E7EB"; (e.currentTarget as HTMLElement).style.color = "#9CA3AF"; }}
              aria-label="Назад"><ChevronLeft size={18} />
            </button>
            <button onClick={next}
              className="w-10 h-10 flex items-center justify-center rounded-sm transition-all"
              style={{ background: "#111827", color: "#fff" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1F2937"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#111827"; }}
              aria-label="Вперёд"><ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {visible.map((r, i) => (
            <div key={`${r.name}-${i}`}
              className="flex flex-col p-6 rounded-sm"
              style={i === 1 ? {
                background: "#111827",
                border: "1px solid #111827",
              } : {
                background: "#FFFFFF",
                border: "1px solid #F1F5F9",
                boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
              }}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill={i === 1 ? "rgba(255,255,255,0.6)" : "#FBBF24"}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>

              <p className="text-sm leading-relaxed flex-1 mb-6"
                style={{ color: i === 1 ? "rgba(255,255,255,0.55)" : "#6B7280" }}>
                &ldquo;{r.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4"
                style={{ borderTop: `1px solid ${i === 1 ? "rgba(255,255,255,0.08)" : "#F1F5F9"}` }}>
                <div className="w-8 h-8 rounded-sm flex items-center justify-center font-black text-xs shrink-0"
                  style={i === 1
                    ? { background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }
                    : { background: "rgba(225,29,72,0.07)", color: "#E11D48" }}>
                  {r.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: i === 1 ? "#fff" : "#111827" }}>{r.name}</p>
                  <p className="mono mt-0.5">{r.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-8">
          {REVIEWS.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className="rounded-sm transition-all"
              style={{ width: i === current ? "24px" : "6px", height: "3px", background: i === current ? "#E11D48" : "#E5E7EB" }}
              aria-label={`Отзыв ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
