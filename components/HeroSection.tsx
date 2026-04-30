"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone, Award, Car, CheckCircle } from "lucide-react";
import Magnetic from "@/components/Magnetic";

/* ─────────────────────────────────────────
   Palette — глубокий бордовый вместо яркого
────────────────────────────────────────── */
const RED      = "#9E1239";   // главный — бордово-малиновый
const RED_DARK = "#7D0E2D";   // hover / тёмный вариант
const RED_GLOW = "rgba(158,18,57,0.28)";
const RED_SOFT = "rgba(158,18,57,0.07)";

/* Layered shadow — дорогой эффект */
const CARD_SHADOW =
  "0 1px 2px rgba(0,0,0,0.04), " +
  "0 4px 8px rgba(0,0,0,0.04), " +
  "0 12px 32px rgba(0,0,0,0.07), " +
  "0 32px 56px rgba(0,0,0,0.04), " +
  "inset 0 1px 0 rgba(255,255,255,1)";

const STATS = [
  { value: "1000+", label: "учеников" },
  { value: "6",     label: "филиалов" },
  { value: "15+",   label: "автомобилей" },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative lg:min-h-screen flex items-center overflow-hidden pt-16"
      style={{ background: "linear-gradient(160deg, #ffffff 0%, #faf9f7 60%, #fdf5f7 100%)" }}
    >
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #dde3ec 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          opacity: 0.4,
        }}
      />

      {/* Depth blobs — обновлённый цвет */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: `radial-gradient(circle at 80% 20%, ${RED_SOFT} 0%, transparent 60%)`, filter: "blur(60px)" }} />
      <div className="absolute pointer-events-none"
        style={{ top: "15%", left: "-5%", width: "520px", height: "380px",
          background: `radial-gradient(ellipse at center, rgba(158,18,57,0.04) 0%, transparent 70%)`,
          filter: "blur(70px)" }} />

      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-12 gap-8 lg:gap-16 items-center lg:min-h-[calc(100vh-5rem)]">

          {/* ══ LEFT ══ */}
          <div className="col-span-12 lg:col-span-6 flex flex-col justify-center">

            {/* ── Бренд-бейдж — нейтральный, не красный ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="inline-flex items-center gap-2 mb-7 self-start px-4 py-2 rounded-full"
              style={{
                background: "rgba(15,23,42,0.05)",
                border: "1px solid rgba(15,23,42,0.1)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#0F172A" }} />
              <span className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "#334155", letterSpacing: "0.11em" }}>
                №1 по сдаче с первого раза · Алматы
              </span>
            </motion.div>

            {/* ── Заголовок — увеличенный межстрочник ── */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="font-black mb-5"
              style={{
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                color: "#0F172A",
                letterSpacing: "-0.03em",
                lineHeight: 1.18,   /* воздух между строками */
              }}
            >
              Сядь за руль{" "}
              {/* "уверенно" — единственный яркий акцент */}
              <span style={{ color: RED, letterSpacing: "0.01em" }}>уверенно</span>{" "}
              —{" "}<br className="hidden sm:block" />
              с первого раза
            </motion.h1>

            {/* ── Подзаголовок — светлее + больше воздуха ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-7 max-w-[440px]"
            >
              <p className="text-lg" style={{ color: "#94A3B8", lineHeight: 1.85, fontWeight: 400 }}>
                Теория, практика и подготовка к экзамену — доведём до получения прав.
              </p>
              {/* Микро-слоган бренда */}
              <p className="text-xs mt-3 font-medium"
                style={{ color: "#CBD5E1", letterSpacing: "0.06em" }}>
                Система, которая доводит до прав
              </p>
            </motion.div>

            {/* ── Urgency — пульсирующий индикатор (оставляем) ── */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28 }}
              className="inline-flex items-center gap-2.5 mb-8 self-start px-4 py-2.5 rounded-xl"
              style={{
                background: "rgba(255,251,235,0.8)",
                border: "1px solid rgba(245,158,11,0.2)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              <span className="relative flex items-center justify-center w-2.5 h-2.5 shrink-0">
                <span className="absolute inline-flex w-full h-full rounded-full opacity-50 animate-ping"
                  style={{ background: "#F59E0B" }} />
                <span className="relative inline-flex w-2 h-2 rounded-full" style={{ background: "#F59E0B" }} />
              </span>
              <span className="text-xs font-medium" style={{ color: "#92400E" }}>
                Осталось <strong style={{ fontWeight: 700 }}>12 мест</strong> на этот месяц
              </span>
            </motion.div>

            {/* ── CTA — глубокий бордовый градиент ── */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.36 }}
              className="flex flex-wrap gap-3 mb-12"
            >
              <Magnetic>
                <a
                  href="#register"
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl text-sm font-bold text-white"
                  style={{
                    background: `linear-gradient(135deg, #B91C3D 0%, ${RED} 55%, ${RED_DARK} 100%)`,
                    boxShadow: `0 4px 6px rgba(0,0,0,0.07), 0 10px 24px ${RED_GLOW}`,
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(-2px) scale(1.02)";
                    el.style.boxShadow = `0 8px 12px rgba(0,0,0,0.08), 0 20px 40px ${RED_GLOW}`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "";
                    el.style.boxShadow = `0 4px 6px rgba(0,0,0,0.07), 0 10px 24px ${RED_GLOW}`;
                  }}
                >
                  Записаться на обучение
                  <ArrowRight size={16} />
                </a>
              </Magnetic>

              {/* Вторичная кнопка — воздушнее, тоньше бордер */}
              <a
                href="tel:87776667096"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-sm font-medium"
                style={{
                  background: "#FFFFFF",
                  color: "#334155",
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-2px)";
                  el.style.boxShadow = "0 4px 8px rgba(0,0,0,0.06), 0 12px 24px rgba(0,0,0,0.07)";
                  el.style.borderColor = "#CBD5E1";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "";
                  el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)";
                  el.style.borderColor = "#E2E8F0";
                }}
              >
                <Phone size={15} />
                Получить консультацию
              </a>
            </motion.div>

            {/* ── Статистика — все цифры тёмные, подписи светлее ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex items-center gap-6 pt-7"
              style={{ borderTop: "1px solid #F1F5F9" }}
            >
              {STATS.map((s, i) => (
                <div key={s.label} className="flex items-center gap-6">
                  {i > 0 && (
                    <div style={{ width: 1, height: 22, background: "#E2E8F0", flexShrink: 0 }} />
                  )}
                  <div>
                    <div className="font-black"
                      style={{ fontSize: "1.85rem", color: "#0F172A", letterSpacing: "-0.04em", lineHeight: 1 }}>
                      {s.value}
                    </div>
                    <div className="text-[10px] font-medium uppercase tracking-widest mt-1"
                      style={{ color: "#CBD5E1", letterSpacing: "0.13em" }}>
                      {s.label}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ══ RIGHT — Premium cards ══ */}
          <div className="hidden lg:flex col-span-12 lg:col-span-6 items-center justify-center relative"
            style={{ minHeight: "580px" }}>

            <div className="flex flex-col gap-4 w-full max-w-[380px]">

              {/* ── Dashboard card — off-white, layered shadow, glass ── */}
              <motion.div
                initial={{ opacity: 0, y: 28, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.75, delay: 0.3 }}
                style={{
                  background: "rgba(250,249,247,0.96)",   /* тёплый off-white */
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid rgba(0,0,0,0.05)",   /* почти невидимый */
                  borderRadius: "24px",
                  boxShadow: CARD_SHADOW,
                  padding: "24px",
                }}
              >
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5"
                      style={{ color: "#CBD5E1" }}>Прогресс ученика</p>
                    <p className="font-black text-base"
                      style={{ color: "#0F172A", letterSpacing: "-0.02em" }}>Пакет «Стандарт+»</p>
                  </div>
                  {/* "Активен" — пульсирующая точка */}
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{ background: "rgba(22,163,74,0.07)", color: "#16A34A",
                      border: "1px solid rgba(22,163,74,0.12)" }}>
                    <span className="relative flex w-1.5 h-1.5">
                      <span className="animate-ping absolute inline-flex w-full h-full rounded-full opacity-50"
                        style={{ background: "#16A34A" }} />
                      <span className="relative inline-flex w-1.5 h-1.5 rounded-full"
                        style={{ background: "#16A34A" }} />
                    </span>
                    Активен
                  </span>
                </div>

                {/* Progress bar — дышащая анимация */}
                <div className="mb-5">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-medium" style={{ color: "#94A3B8" }}>Общий прогресс</span>
                    <span className="text-xs font-black" style={{ color: "#0F172A" }}>62%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "#F1F5F9" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: ["0%", "62%", "63%", "62%"] }}
                      transition={{
                        duration: 1.8, delay: 0.9,
                        times: [0, 0.65, 0.82, 1],
                        repeat: Infinity,
                        repeatDelay: 5,
                        repeatType: "loop",
                      }}
                      style={{
                        height: "100%", borderRadius: 999,
                        background: `linear-gradient(90deg, ${RED}, #E05A78)`,
                      }}
                    />
                  </div>
                </div>

                {/* Mini stats — убраны лишние бордеры */}
                <div className="grid grid-cols-3 gap-2.5 mb-4">
                  {[
                    { label: "Теория",      value: "28 ч",  done: true  },
                    { label: "Практика",    value: "8/10",  done: false },
                    { label: "До экзамена", value: "2 нед", done: false },
                  ].map((s) => (
                    <div key={s.label} className="flex flex-col items-center py-3 rounded-2xl"
                      style={{
                        background: s.done ? "rgba(22,163,74,0.05)" : "rgba(248,250,252,0.8)",
                        border: `1px solid ${s.done ? "rgba(22,163,74,0.1)" : "rgba(0,0,0,0.04)"}`,
                      }}>
                      <span className="text-sm font-black"
                        style={{ color: s.done ? "#16A34A" : "#0F172A", letterSpacing: "-0.02em" }}>
                        {s.value}
                      </span>
                      <span className="text-[9px] font-medium mt-0.5" style={{ color: "#CBD5E1" }}>
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Следующее занятие — красная точка = микро-акцент ✓ */}
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                  style={{ background: RED_SOFT, border: `1px solid rgba(158,18,57,0.08)` }}>
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
                    style={{ background: RED }} />
                  <p className="text-xs font-medium" style={{ color: "#334155" }}>
                    Следующее занятие —{" "}
                    <span style={{ color: RED, fontWeight: 700 }}>завтра в 10:00</span>
                  </p>
                </div>
              </motion.div>

              {/* ── Timeline card ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.55 }}
                style={{
                  background: "rgba(250,249,247,0.96)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid rgba(0,0,0,0.05)",
                  borderRadius: "20px",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 6px 20px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,1)",
                  padding: "20px 24px",
                }}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest mb-4"
                  style={{ color: "#CBD5E1" }}>Путь обучения</p>
                <div className="flex items-center">
                  {[
                    { label: "Теория",   sub: "Пройдена",  done: true,  active: false },
                    { label: "Практика", sub: "8 из 10",   done: false, active: true  },
                    { label: "Экзамен",  sub: "Впереди",   done: false, active: false },
                  ].map((step, i) => (
                    <div key={step.label} className="flex items-center flex-1">
                      <div className="flex flex-col items-center flex-1">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center mb-2"
                          style={{
                            background: step.done ? "#16A34A" : step.active ? RED : "#F1F5F9",
                            border: step.active ? `2px solid ${RED}` : "none",
                            boxShadow: step.active
                              ? `0 0 0 4px rgba(158,18,57,0.1)`
                              : step.done ? "0 4px 12px rgba(22,163,74,0.2)" : "none",
                          }}>
                          {step.done
                            ? <CheckCircle size={16} color="#fff" />
                            : step.active ? <Car size={15} color="#fff" />
                            : <Award size={15} style={{ color: "#CBD5E1" }} />}
                        </div>
                        <p className="text-xs font-semibold text-center"
                          style={{ color: step.done ? "#16A34A" : step.active ? RED : "#94A3B8" }}>
                          {step.label}
                        </p>
                        <p className="text-[10px] text-center mt-0.5" style={{ color: "#CBD5E1" }}>
                          {step.sub}
                        </p>
                      </div>
                      {i < 2 && (
                        <div className="h-px w-6 shrink-0 rounded-full mx-1"
                          style={{ background: i === 0 ? "#16A34A" : "#E5E7EB" }} />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Floating badges */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.85 }}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
                className="absolute flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl"
                style={{
                  top: "8%", left: "-10%",
                  background: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(0,0,0,0.05)",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.04), 0 12px 28px rgba(0,0,0,0.08)",
                  whiteSpace: "nowrap",
                }}
              >
                <div className="w-7 h-7 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(22,163,74,0.08)" }}>
                  <CheckCircle size={13} style={{ color: "#16A34A" }} />
                </div>
                <div>
                  <p className="text-[9px] font-medium uppercase tracking-wider"
                    style={{ color: "#CBD5E1" }}>Результат</p>
                  <p className="text-xs font-bold" style={{ color: "#0F172A" }}>100% сдают ПДД</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity }}
                className="absolute flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl"
                style={{
                  bottom: "12%", right: "-8%",
                  background: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(0,0,0,0.05)",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.04), 0 12px 28px rgba(0,0,0,0.08)",
                  whiteSpace: "nowrap",
                }}
              >
                <div className="w-7 h-7 rounded-xl flex items-center justify-center"
                  style={{ background: RED_SOFT }}>
                  <Car size={13} style={{ color: RED }} />
                </div>
                <div>
                  <p className="text-[9px] font-medium uppercase tracking-wider"
                    style={{ color: "#CBD5E1" }}>Трансмиссия</p>
                  <p className="text-xs font-bold" style={{ color: "#0F172A" }}>Автомат / механика</p>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
