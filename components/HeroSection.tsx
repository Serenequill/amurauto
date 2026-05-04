"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone, Award, Car, CheckCircle, ShieldCheck } from "lucide-react";
import Magnetic from "@/components/Magnetic";
import { useLang } from "@/contexts/LangContext";

/* ─── Palette ─── */
const RED      = "#9E1239";
const RED_DARK = "#7D0E2D";
const RED_SOFT = "rgba(158,18,57,0.07)";
const RED_GLOW = "rgba(158,18,57,0.30)";

/* ─── Two-layer premium shadow ─── */
const CARD_SHADOW =
  "0 2px 4px rgba(0,0,0,0.07), " +
  "0 8px 16px rgba(0,0,0,0.05), " +
  "0 28px 64px rgba(0,0,0,0.08), " +
  "inset 0 1px 0 rgba(255,255,255,0.95)";

const CARD_SHADOW_SM =
  "0 1px 3px rgba(0,0,0,0.06), " +
  "0 6px 20px rgba(0,0,0,0.07), " +
  "inset 0 1px 0 rgba(255,255,255,0.95)";

export default function HeroSection() {
  const { t } = useLang();
  const h = t.hero;

  return (
    <section
      id="hero"
      className="relative lg:min-h-screen flex items-center overflow-hidden pt-[100px]"
      style={{ background: "linear-gradient(160deg, #ffffff 0%, #faf9f7 55%, #fdf5f7 100%)" }}
    >
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #dde3ec 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          opacity: 0.38,
        }}
      />

      {/* Depth blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(circle at 80% 20%, rgba(158,18,57,0.055) 0%, transparent 60%)", filter: "blur(60px)" }} />
      <div className="absolute pointer-events-none"
        style={{ top: "15%", left: "-5%", width: "520px", height: "380px",
          background: "radial-gradient(ellipse at center, rgba(158,18,57,0.04) 0%, transparent 70%)",
          filter: "blur(70px)" }} />

      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-12 gap-8 lg:gap-16 items-center lg:min-h-[calc(100vh-5rem)]">

          {/* ══ LEFT ══ */}
          <div className="col-span-12 lg:col-span-6 flex flex-col justify-center">

            {/* Бренд-бейдж — нейтральный */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="inline-flex items-center gap-2 mb-7 self-start px-4 py-2 rounded-full"
              style={{ background: "rgba(15,23,42,0.05)", border: "1px solid rgba(15,23,42,0.09)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#334155" }} />
              <span className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "#334155", letterSpacing: "0.11em" }}>
                {h.badge}
              </span>
            </motion.div>

            {/* ── Заголовок ── */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="font-black mb-5"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", color: "#0F172A",
                letterSpacing: "-0.03em", lineHeight: 1.18 }}
            >
              {h.title1}{" "}
              <span style={{
                background: `linear-gradient(135deg, #C41E3A 0%, ${RED} 55%, ${RED_DARK} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                {h.titleAccent}
              </span>
              <br />
              {h.title2}
            </motion.h1>

            {/* ── Подзаголовок — сильный текст ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-7 max-w-[440px]"
            >
              <p className="text-lg" style={{ color: "#94A3B8", lineHeight: 1.85, fontWeight: 400 }}>
                {h.sub1}
              </p>
              <p className="text-xs mt-3 font-medium"
                style={{ color: "#CBD5E1", letterSpacing: "0.06em" }}>
                {h.sub2}
              </p>
            </motion.div>

            {/* Urgency */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28 }}
              className="inline-flex items-center gap-2.5 mb-8 self-start px-4 py-2.5 rounded-xl"
              style={{
                background: "rgba(255,251,235,0.8)",
                border: "1px solid rgba(245,158,11,0.18)",
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
                {h.urgency(12)}
              </span>
            </motion.div>

            {/* ── CTA — с внутренним бликом ── */}
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
                    background: `linear-gradient(160deg, #C41E3A 0%, ${RED} 50%, ${RED_DARK} 100%)`,
                    boxShadow: `0 2px 4px rgba(0,0,0,0.12), 0 8px 24px ${RED_GLOW}, inset 0 1px 0 rgba(255,255,255,0.15)`,
                    transition: "transform 0.22s ease, box-shadow 0.22s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(-2px)";
                    el.style.boxShadow = `0 4px 8px rgba(0,0,0,0.14), 0 16px 40px ${RED_GLOW}, inset 0 1px 0 rgba(255,255,255,0.18)`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "";
                    el.style.boxShadow = `0 2px 4px rgba(0,0,0,0.12), 0 8px 24px ${RED_GLOW}, inset 0 1px 0 rgba(255,255,255,0.15)`;
                  }}
                >
                  {h.cta1}
                  <ArrowRight size={16} />
                </a>
              </Magnetic>

              <a
                href="tel:87776667096"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-sm font-medium"
                style={{
                  background: "#FFFFFF",
                  color: "#334155",
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)",
                  transition: "transform 0.22s ease, box-shadow 0.22s ease, border-color 0.2s",
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
                {h.cta2}
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex items-center gap-6 pt-7"
              style={{ borderTop: "1px solid #F1F5F9" }}
            >
              {h.stats.map((s, i) => (
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

          {/* ══ RIGHT — Premium cards (шире на ~10%) ══ */}
          <div className="flex col-span-12 lg:col-span-6 items-center justify-center relative overflow-hidden lg:overflow-visible"
            style={{ minHeight: "auto" }}>

            <div className="flex flex-col gap-4 w-full max-w-[415px]">

              {/* ── Dashboard card ── */}
              <motion.div
                initial={{ opacity: 0, y: 56, scale: 0.93 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: "rgba(250,249,247,0.96)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid rgba(0,0,0,0.045)",
                  borderRadius: "24px",
                  boxShadow: CARD_SHADOW,
                  padding: "26px",
                }}
              >
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5"
                      style={{ color: "#CBD5E1" }}>{h.card.progressLabel}</p>
                    <p className="font-black text-base"
                      style={{ color: "#0F172A", letterSpacing: "-0.02em" }}>{h.card.plan}</p>
                  </div>
                  {/* "Активен" с glow-пульсацией */}
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{
                      background: "rgba(22,163,74,0.07)",
                      color: "#16A34A",
                      border: "1px solid rgba(22,163,74,0.12)",
                      boxShadow: "0 0 0 3px rgba(22,163,74,0.06), 0 0 14px rgba(22,163,74,0.1)",
                    }}>
                    <span className="relative flex w-1.5 h-1.5">
                      <span className="animate-ping absolute inline-flex w-full h-full rounded-full opacity-50"
                        style={{ background: "#16A34A" }} />
                      <span className="relative inline-flex w-1.5 h-1.5 rounded-full"
                        style={{ background: "#16A34A" }} />
                    </span>
                    {h.card.active}
                  </span>
                </div>

                {/* ── Прогресс-бар с шиммером ── */}
                <div className="mb-5">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-medium" style={{ color: "#94A3B8" }}>{h.card.totalProgress}</span>
                    <span className="text-xs font-black" style={{ color: "#0F172A" }}>62%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "#F1F5F9" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "62%" }}
                      transition={{ duration: 1.2, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      className="relative overflow-hidden"
                      style={{
                        height: "100%", borderRadius: 999,
                        background: `linear-gradient(90deg, ${RED_DARK} 0%, ${RED} 50%, #E05A78 100%)`,
                      }}
                    >
                      {/* Shimmer sweep */}
                      <motion.div
                        animate={{ x: ["-120%", "220%"] }}
                        transition={{ duration: 1.6, delay: 2.2, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" }}
                        style={{
                          position: "absolute", inset: 0, width: "45%",
                          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                          borderRadius: 999,
                        }}
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Mini stats */}
                <div className="grid grid-cols-3 gap-2.5 mb-4">
                  {h.card.mini.map((s) => (
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

                {/* Следующее занятие */}
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                  style={{ background: RED_SOFT, border: "1px solid rgba(158,18,57,0.08)" }}>
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
                    style={{ background: RED }} />
                  <p className="text-xs font-medium" style={{ color: "#334155" }}>
                    {h.card.nextLesson}{" "}
                    <span style={{ color: RED, fontWeight: 700 }}>{h.card.nextTime}</span>
                  </p>
                </div>
              </motion.div>

              {/* ── Timeline card ── */}
              <motion.div
                initial={{ opacity: 0, y: 44, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: "rgba(250,249,247,0.96)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid rgba(0,0,0,0.045)",
                  borderRadius: "20px",
                  boxShadow: CARD_SHADOW_SM,
                  padding: "20px 26px",
                }}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest mb-4"
                  style={{ color: "#CBD5E1" }}>{h.card.pathLabel}</p>
                <div className="flex items-center">
                  {h.card.steps.map((step, i) => (
                    <div key={step.label} className="flex items-center flex-1">
                      <div className="flex flex-col items-center flex-1">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center mb-2"
                          style={{
                            background: step.done ? "#16A34A" : step.active ? RED : "#F1F5F9",
                            border: step.active ? `2px solid ${RED}` : "none",
                            boxShadow: step.active
                              ? `0 0 0 4px rgba(158,18,57,0.1), 0 4px 12px rgba(158,18,57,0.2)`
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
                          style={{ background: i === 0 ? "rgba(22,163,74,0.4)" : "#E5E7EB" }} />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Floating badge — 100% ПДД */}
            <motion.div
              className="max-lg:hidden"
              initial={{ opacity: 0, x: -20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
                className="absolute flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl"
                style={{
                  top: "8%", left: "-10%",
                  background: "rgba(255,255,255,0.94)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(0,0,0,0.05)",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.06), 0 12px 28px rgba(0,0,0,0.09)",
                  whiteSpace: "nowrap",
                }}
              >
                <div className="w-7 h-7 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(22,163,74,0.08)" }}>
                  <CheckCircle size={13} style={{ color: "#16A34A" }} />
                </div>
                <div>
                  <p className="text-[9px] font-medium uppercase tracking-wider"
                    style={{ color: "#CBD5E1" }}>{h.badges.result}</p>
                  <p className="text-xs font-bold" style={{ color: "#0F172A" }}>{h.badges.resultValue}</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating badge — Трансмиссия */}
            <motion.div
              className="max-lg:hidden"
              initial={{ opacity: 0, x: 20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity }}
                className="absolute flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl"
                style={{
                  bottom: "20%", right: "-8%",
                  background: "rgba(255,255,255,0.94)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(0,0,0,0.05)",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.06), 0 12px 28px rgba(0,0,0,0.09)",
                  whiteSpace: "nowrap",
                }}
              >
                <div className="w-7 h-7 rounded-xl flex items-center justify-center"
                  style={{ background: RED_SOFT }}>
                  <Car size={13} style={{ color: RED }} />
                </div>
                <div>
                  <p className="text-[9px] font-medium uppercase tracking-wider"
                    style={{ color: "#CBD5E1" }}>{h.badges.trans}</p>
                  <p className="text-xs font-bold" style={{ color: "#0F172A" }}>{h.badges.transValue}</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating badge — Лицензия (новый, держит вес правой части) */}
            <motion.div
              className="max-lg:hidden"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 5.5, ease: "easeInOut", repeat: Infinity }}
                className="absolute flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl"
                style={{
                  bottom: "3%", left: "5%",
                  background: "rgba(255,255,255,0.94)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(0,0,0,0.05)",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.06), 0 12px 28px rgba(0,0,0,0.09)",
                  whiteSpace: "nowrap",
                }}
              >
                <div className="w-7 h-7 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(15,23,42,0.06)" }}>
                  <ShieldCheck size={13} style={{ color: "#334155" }} />
                </div>
                <div>
                  <p className="text-[9px] font-medium uppercase tracking-wider"
                    style={{ color: "#CBD5E1" }}>{h.badges.license}</p>
                  <p className="text-xs font-bold" style={{ color: "#0F172A" }}>{h.badges.licenseValue}</p>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
