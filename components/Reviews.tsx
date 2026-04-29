"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const REVIEWS = [
  { name: "Бекзат Н.",  date: "Апрель 2026", rating: 5, text: "Записался онлайн — всё оформили быстро. Инструктор спокойный, объясняет чётко. Сдал с первого раза. Лучший выбор!" },
  { name: "Айдана М.",  date: "Май 2025",    rating: 5, text: "Записалась через сайт, получила скидку 10%. Инструктор терпеливый, объяснял всё по шагам. Сдала с первого раза, очень довольна!" },
  { name: "Нурлан С.",  date: "Апрель 2025", rating: 5, text: "Взял пакет Стандарт+. Пять занятий на автодроме и пять в городе — идеальный баланс. Преподаватели грамотные." },
  { name: "Камила Р.",  date: "Март 2025",   rating: 5, text: "Привела подругу — обе получили по 10% скидки. Инструктор подобрал удобный график. Сдала с первого раза!" },
  { name: "Арман Д.",   date: "Февраль 2025", rating: 5, text: "Выбрал пакет Комфорт — 15 занятий хватило с запасом. Учился на автомате, всё объяснили чётко." },
  { name: "Зарина Т.",  date: "Январь 2025", rating: 5, text: "Долго боялась садиться за руль. Здесь всё объясняют спокойно, без давления. Теперь я с правами!" },
  { name: "Малика А.",  date: "Ноябрь 2024", rating: 5, text: "Изучала механику. Оказалось всё доступно! Сдала экзамен без пересдачи. Огромное спасибо!" },
];

export default function Reviews() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c === 0 ? REVIEWS.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === REVIEWS.length - 1 ? 0 : c + 1));
  const visible = [0, 1, 2].map((o) => REVIEWS[(current + o) % REVIEWS.length]);

  return (
    <section id="reviews" className="py-24" style={{ background: "#F9FAFB" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <div className="label-tag mb-5">Отзывы</div>
            <h2 className="font-extrabold leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#111827", letterSpacing: "-0.02em" }}>
              Что говорят курсанты
            </h2>
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
              <div className="flex gap-1 mb-5">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <div key={j} className="w-3 h-3 rounded-sm"
                    style={{ background: i === 1 ? "rgba(255,255,255,0.2)" : "#E11D48" }} />
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
