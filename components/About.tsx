"use client";

import { Users, MapPin, Car } from "lucide-react";

const STATS = [
  { icon: MapPin, value: "6",    label: "Филиалов в Алматы" },
  { icon: Car,    value: "15+",  label: "Учебных автомобилей" },
  { icon: Users,  value: "100%", label: "Сдача экзамена ПДД" },
];

export default function About() {
  return (
    <section id="about" className="py-24" style={{ background: "#F9FAFB" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Text — 6 cols */}
          <div className="lg:col-span-6">
            <div className="label-tag mb-5">О нас</div>
            <h2 className="font-extrabold leading-tight mb-8"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#111827", letterSpacing: "-0.02em" }}>
              Лучшая автошкола в Алматы
            </h2>

            <div className="space-y-4 text-sm leading-relaxed" style={{ color: "#6B7280" }}>
              <p>
                <strong style={{ color: "#111827" }}>АмурАвто</strong> — автошкола с 6 филиалами
                по всему Алматы. Теоретические занятия проходят в просторных, светлых,
                кондиционируемых классах.
              </p>
              <p>
                Преподаватели высшей категории. Тестовая программа для подготовки к ПДД,{" "}
                <strong style={{ color: "#E11D48" }}>не имеющая аналогов</strong> — 100% наших
                курсантов успешно сдают экзамен.
              </p>
              <p>
                Практика на 15 учебных автомобилях в отличном состоянии —{" "}
                <strong style={{ color: "#111827" }}>самый большой парк в Алматы</strong>.
              </p>
            </div>

            {/* Quote */}
            <div className="mt-8 pl-5 py-4" style={{ borderLeft: "2px solid #E11D48" }}>
              <p className="text-sm italic" style={{ color: "#9CA3AF" }}>
                «Автошкола — это не ресторан. Здесь обучаются один раз в жизни —
                поэтому выбирайте лучшую!»
              </p>
            </div>

            <a href="#register"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 text-sm rounded-sm btn-primary"
            >
              Записаться на обучение
            </a>
          </div>

          {/* Stats — 5 cols offset 1 */}
          <div className="lg:col-span-5 lg:col-start-8 flex flex-col gap-3">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label}
                className="card flex items-center gap-5 p-7 rounded-sm"
                style={{ background: "#FFFFFF" }}
              >
                <div className="w-10 h-10 flex items-center justify-center shrink-0 rounded-sm"
                  style={{ background: "rgba(225,29,72,0.05)", border: "1px solid rgba(225,29,72,0.12)" }}>
                  <Icon size={18} style={{ color: "#E11D48" }} />
                </div>
                <div>
                  <div className="font-black text-2xl" style={{ color: "#111827", letterSpacing: "-0.02em" }}>{value}</div>
                  <div className="text-xs font-medium mt-0.5" style={{ color: "#9CA3AF" }}>{label}</div>
                </div>
              </div>
            ))}

            {/* Location tag */}
            <div className="px-5 py-4 rounded-sm flex items-center gap-3" style={{ background: "#FFFFFF", border: "1px solid #F1F5F9" }}>
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: "#E11D48" }} />
              <span className="mono">43.2567°N 76.9286°E · г. Алматы</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
