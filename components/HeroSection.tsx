"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone, Award, Car, CheckCircle } from "lucide-react";
import Magnetic from "@/components/Magnetic";

const STATS = [
  { value: "1000+", label: "учеников" },
  { value: "6",     label: "филиалов" },
  { value: "15+",   label: "автомобилей" },
];


export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      style={{ background: "linear-gradient(160deg, #ffffff 0%, #fafbff 60%, #fff5f7 100%)" }}
    >
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #e2e8f0 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          opacity: 0.45,
        }}
      />
      {/* Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(circle at 80% 20%, rgba(225,29,72,0.06) 0%, transparent 60%)", filter: "blur(50px)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(circle at 20% 80%, rgba(99,102,241,0.05) 0%, transparent 60%)", filter: "blur(50px)" }} />

      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-12 gap-8 lg:gap-16 items-center min-h-[calc(100vh-5rem)]">

          {/* ══ LEFT — 6 cols ══ */}
          <div className="col-span-12 lg:col-span-6 flex flex-col justify-center">

            {/* Micro-hook */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-8 self-start px-4 py-2 rounded-full"
              style={{ background: "rgba(225,29,72,0.06)", border: "1px solid rgba(225,29,72,0.16)" }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: "#E11D48" }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#E11D48", letterSpacing: "0.1em" }}>
                Сдают с первого раза в Алматы
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="font-black leading-[1.08] mb-5"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", color: "#0F172A", letterSpacing: "-0.03em" }}
            >
              Сядь за руль{" "}
              <span style={{ color: "#E11D48" }}>уверенно</span>{" "}
              —{" "}<br className="hidden sm:block" />
              с первого раза
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg leading-relaxed mb-6 max-w-[460px]"
              style={{ color: "#64748B" }}
            >
              Теория, практика и подготовка к экзамену —
              доведём до{" "}
              <span style={{ color: "#0F172A", fontWeight: 600 }}>получения прав</span>
            </motion.p>

            {/* Urgency */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28 }}
              className="inline-flex items-center gap-2 mb-8 self-start px-4 py-2 rounded-xl"
              style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#F59E0B" }} />
              <span className="text-xs font-semibold" style={{ color: "#92400E" }}>
                Осталось <strong>12 мест</strong> на этот месяц
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.36 }}
              className="flex flex-wrap gap-3 mb-14"
            >
              <Magnetic>
                <a href="#register"
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl text-sm font-bold text-white transition-all duration-200"
                  style={{
                    background: "linear-gradient(135deg, #E11D48 0%, #BE123C 100%)",
                    boxShadow: "0 8px 24px rgba(225,29,72,0.32)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.boxShadow = "0 14px 36px rgba(225,29,72,0.42)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.boxShadow = "0 8px 24px rgba(225,29,72,0.32)";
                  }}
                >
                  Записаться на обучение
                  <ArrowRight size={16} />
                </a>
              </Magnetic>
              <a href="tel:87776667096"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl text-sm font-semibold transition-all duration-200"
                style={{
                  background: "#FFFFFF",
                  color: "#0F172A",
                  border: "1.5px solid #E2E8F0",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-2px)";
                  el.style.boxShadow = "0 6px 20px rgba(0,0,0,0.1)";
                  el.style.borderColor = "#CBD5E1";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "";
                  el.style.boxShadow = "0 2px 12px rgba(0,0,0,0.05)";
                  el.style.borderColor = "#E2E8F0";
                }}
              >
                <Phone size={15} />
                Получить консультацию
              </a>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex items-center gap-8 pt-8"
              style={{ borderTop: "1px solid #F1F5F9" }}
            >
              {STATS.map((s, i) => (
                <div key={s.label}>
                  <div className="text-2xl font-black" style={{ color: i === 0 ? "#E11D48" : "#0F172A", letterSpacing: "-0.03em" }}>
                    {s.value}
                  </div>
                  <div className="text-xs font-medium mt-0.5" style={{ color: "#94A3B8" }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ══ RIGHT — Dashboard + Timeline ══ */}
          <div className="hidden lg:flex col-span-12 lg:col-span-6 items-center justify-center relative" style={{ minHeight: "580px" }}>

            <div className="flex flex-col gap-4 w-full max-w-[380px]">

              {/* ── Dashboard card ── */}
              <motion.div
                initial={{ opacity: 0, y: 28, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.75, delay: 0.3 }}
                style={{
                  background: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid #E2E8F0",
                  borderRadius: "24px",
                  boxShadow: "0 24px 60px rgba(0,0,0,0.09), inset 0 1px 0 rgba(255,255,255,1)",
                  padding: "24px",
                }}
              >
                {/* Card header */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: "#94A3B8" }}>Прогресс ученика</p>
                    <p className="font-black text-base" style={{ color: "#0F172A", letterSpacing: "-0.02em" }}>Пакет «Стандарт+»</p>
                  </div>
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{ background: "rgba(22,163,74,0.08)", color: "#16A34A", border: "1px solid rgba(22,163,74,0.15)" }}>
                    ● Активен
                  </span>
                </div>

                {/* Overall progress */}
                <div className="mb-5">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-medium" style={{ color: "#64748B" }}>Общий прогресс</span>
                    <span className="text-xs font-black" style={{ color: "#E11D48" }}>62%</span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "#F1F5F9" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "62%" }}
                      transition={{ duration: 1.2, delay: 0.9 }}
                      style={{ height: "100%", borderRadius: "999px", background: "linear-gradient(90deg, #E11D48, #FB7185)" }}
                    />
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Теория", value: "28 ч", done: true },
                    { label: "Практика", value: "8/10", done: false },
                    { label: "До экзамена", value: "2 нед", done: false },
                  ].map((s) => (
                    <div key={s.label} className="flex flex-col items-center py-3 rounded-2xl"
                      style={{ background: s.done ? "rgba(22,163,74,0.06)" : "#F8FAFC", border: `1px solid ${s.done ? "rgba(22,163,74,0.12)" : "#F1F5F9"}` }}>
                      <span className="text-base font-black" style={{ color: s.done ? "#16A34A" : "#0F172A", letterSpacing: "-0.02em" }}>{s.value}</span>
                      <span className="text-[10px] font-medium mt-0.5" style={{ color: "#94A3B8" }}>{s.label}</span>
                    </div>
                  ))}
                </div>

                {/* Next lesson */}
                <div className="mt-4 flex items-center gap-3 px-4 py-3 rounded-2xl"
                  style={{ background: "rgba(225,29,72,0.05)", border: "1px solid rgba(225,29,72,0.1)" }}>
                  <div className="w-2 h-2 rounded-full animate-pulse shrink-0" style={{ background: "#E11D48" }} />
                  <p className="text-xs font-semibold" style={{ color: "#0F172A" }}>
                    Следующее занятие — <span style={{ color: "#E11D48" }}>завтра в 10:00</span>
                  </p>
                </div>
              </motion.div>

              {/* ── Timeline card ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.55 }}
                style={{
                  background: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid #E2E8F0",
                  borderRadius: "20px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,1)",
                  padding: "20px 24px",
                }}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: "#94A3B8" }}>
                  Путь обучения
                </p>
                <div className="flex items-center gap-0">
                  {[
                    { label: "Теория",   sub: "Пройдена",  done: true,    active: false },
                    { label: "Практика", sub: "8 из 10",   done: false,   active: true  },
                    { label: "Экзамен",  sub: "Впереди",   done: false,   active: false },
                  ].map((step, i) => (
                    <div key={step.label} className="flex items-center flex-1">
                      <div className="flex flex-col items-center flex-1">
                        {/* Circle */}
                        <div className="w-9 h-9 rounded-full flex items-center justify-center mb-2 transition-all"
                          style={{
                            background: step.done ? "#16A34A" : step.active ? "#E11D48" : "#F1F5F9",
                            border: step.active ? "2px solid #E11D48" : "none",
                            boxShadow: step.active ? "0 0 0 4px rgba(225,29,72,0.12)" : step.done ? "0 4px 12px rgba(22,163,74,0.25)" : "none",
                          }}>
                          {step.done
                            ? <CheckCircle size={16} color="#fff" />
                            : step.active
                              ? <Car size={15} color="#fff" />
                              : <Award size={15} style={{ color: "#CBD5E1" }} />
                          }
                        </div>
                        <p className="text-xs font-bold text-center" style={{ color: step.done ? "#16A34A" : step.active ? "#E11D48" : "#94A3B8" }}>
                          {step.label}
                        </p>
                        <p className="text-[10px] text-center mt-0.5" style={{ color: "#CBD5E1" }}>{step.sub}</p>
                      </div>
                      {/* Connector */}
                      {i < 2 && (
                        <div className="h-0.5 w-6 shrink-0 rounded-full mx-1"
                          style={{ background: i === 0 ? "#16A34A" : "#E5E7EB" }} />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Floating side badges */}
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
                  background: "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.95)",
                  boxShadow: "0 8px 28px rgba(0,0,0,0.09)",
                  whiteSpace: "nowrap",
                }}
              >
                <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: "rgba(22,163,74,0.08)" }}>
                  <CheckCircle size={13} style={{ color: "#16A34A" }} />
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider" style={{ color: "#94A3B8" }}>Результат</p>
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
                  background: "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.95)",
                  boxShadow: "0 8px 28px rgba(0,0,0,0.09)",
                  whiteSpace: "nowrap",
                }}
              >
                <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: "rgba(225,29,72,0.07)" }}>
                  <Car size={13} style={{ color: "#E11D48" }} />
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider" style={{ color: "#94A3B8" }}>Трансмиссия</p>
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
