"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BookOpen, Cpu, Car, Trophy } from "lucide-react";

const STAGES = [
  {
    id: 1,
    icon: BookOpen,
    tag: "THEORY_MODULE",
    title: "Теория",
    subtitle: "Правила дорожного движения",
    description:
      "Просторные кондиционируемые классы. Преподаватели высшей категории. Уникальная тестовая программа для подготовки к ПДД — не имеющая аналогов.",
    duration: "~1 месяц",
    hours: "36 ч.",
  },
  {
    id: 2,
    icon: Cpu,
    tag: "SIM_MODULE",
    title: "Тренажёр",
    subtitle: "Симулятор вождения",
    description:
      "Современные симуляторы для освоения базовых навыков управления. Без стресса на дороге — идеальный первый шаг к реальному вождению.",
    duration: "~2 недели",
    hours: "12 ч.",
  },
  {
    id: 3,
    icon: Car,
    tag: "DRIVE_MODULE",
    title: "Автодром + Город",
    subtitle: "Практическое вождение",
    description:
      "15 учебных автомобилей — самый большой парк в Алматы. Автодром для базовых манёвров, затем реальный город. Инструкторы с австрийскими сертификатами.",
    duration: "~1 месяц",
    hours: "24 ч.",
  },
  {
    id: 4,
    icon: Trophy,
    tag: "EXAM_MODULE",
    title: "Экзамен",
    subtitle: "100% сдача ПДД",
    description:
      "Наша программа подготовки не имеет аналогов — каждый курсант успешно сдаёт экзамен с первого раза. Вы уйдёте с правами.",
    duration: "Финал",
    hours: "PASS",
  },
];

export default function CourseTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.15"],
  });
  const lineH = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: "#050505" }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(204,255,0,0.03) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20 text-center">
          <div
            className="font-mono text-[11px] tracking-[0.25em] mb-3"
            style={{ color: "rgba(204,255,0,0.45)" }}
          >
            ◈ COURSE_ROUTE // GPS_TRACK
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            Маршрут{" "}
            <span style={{ color: "#ccff00" }}>обучения</span>
          </h2>
          <p
            className="mt-4 text-base max-w-md mx-auto"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Пошаговый путь от нуля до прав — 2.5 месяца чёткой программы
          </p>
        </div>

        <div className="relative">
          {/* ── Timeline track (dimmed) ── */}
          <div
            className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-px"
            style={{
              background: "rgba(204,255,0,0.08)",
              transform: "translateX(-0.5px)",
            }}
          />

          {/* ── Animated fill (scroll-driven) ── */}
          <motion.div
            className="absolute left-[27px] md:left-1/2 top-0 w-px origin-top"
            style={{
              height: lineH,
              background:
                "linear-gradient(to bottom, #ccff00, rgba(204,255,0,0.25))",
              boxShadow: "0 0 8px rgba(204,255,0,0.4)",
              translateX: "-0.5px",
            }}
          />

          {/* ── Stages ── */}
          <div className="space-y-16">
            {STAGES.map((stage, i) => {
              const Icon = stage.icon;
              const isRight = i % 2 === 1;
              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, delay: 0.05 }}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    isRight ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
                >
                  {/* Card */}
                  <div
                    className={`flex-1 md:max-w-[calc(50%-52px)] rounded-2xl p-6 transition-all group ${
                      isRight ? "md:ml-[52px]" : "md:mr-[52px]"
                    }`}
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(204,255,0,0.1)",
                      backdropFilter: "blur(12px)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "rgba(204,255,0,0.3)";
                      (e.currentTarget as HTMLElement).style.background =
                        "rgba(204,255,0,0.04)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "rgba(204,255,0,0.1)";
                      (e.currentTarget as HTMLElement).style.background =
                        "rgba(255,255,255,0.02)";
                    }}
                  >
                    <div
                      className="font-mono text-[9px] tracking-[0.22em] mb-3"
                      style={{ color: "rgba(204,255,0,0.38)" }}
                    >
                      {stage.tag}
                    </div>
                    <h3 className="text-xl font-black text-white mb-0.5">
                      {stage.title}
                    </h3>
                    <p
                      className="text-sm font-medium mb-3"
                      style={{ color: "#ccff00" }}
                    >
                      {stage.subtitle}
                    </p>
                    <p
                      className="text-sm leading-relaxed mb-5"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      {stage.description}
                    </p>
                    <div className="flex gap-3">
                      <span
                        className="px-3 py-1 rounded-full font-mono text-[10px]"
                        style={{
                          background: "rgba(204,255,0,0.06)",
                          border: "1px solid rgba(204,255,0,0.18)",
                          color: "rgba(204,255,0,0.65)",
                        }}
                      >
                        {stage.duration}
                      </span>
                      <span
                        className="px-3 py-1 rounded-full font-mono text-[10px]"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          color: "rgba(255,255,255,0.35)",
                        }}
                      >
                        {stage.hours}
                      </span>
                    </div>
                  </div>

                  {/* ── Icon circle (desktop: absolute center; mobile: left) ── */}
                  <div
                    className="shrink-0 z-10 w-14 h-14 rounded-full flex items-center justify-center
                               md:absolute md:left-1/2 md:top-5 md:-translate-x-1/2"
                    style={{
                      background: "#050505",
                      border: "1.5px solid #ccff00",
                      boxShadow: "0 0 22px rgba(204,255,0,0.28)",
                    }}
                  >
                    <Icon size={22} style={{ color: "#ccff00" }} />
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
