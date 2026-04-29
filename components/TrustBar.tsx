"use client";

import { useState } from "react";
import { X, FileText, ShieldCheck, Clock, Car, Award, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TiltCard from "@/components/TiltCard";

const FACTS = [
  {
    icon: Clock,
    value: "12 лет",
    label: "обучаем водителей",
    accent: true,
  },
  {
    icon: Car,
    value: "Свой автопарк",
    label: "15+ современных авто",
    accent: false,
  },
  {
    icon: Award,
    value: "100%",
    label: "сертифицированные инструкторы",
    accent: true,
  },
];

export default function TrustBar() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="py-10" style={{ background: "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* ── Карточка «Надёжность» ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
            <TiltCard
              className="relative flex items-center gap-5 px-6 py-5 rounded-2xl overflow-hidden"
              style={{
                background: "#FFFFFF",
                border: "1px solid #F1F5F9",
                boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
              }}
            >
              {/* Tech corner text */}
              <span className="absolute top-2.5 right-3 font-mono select-none"
                style={{ fontSize: "9px", letterSpacing: "0.1em", color: "#D1D5DB", opacity: 0.7 }}>
                43.238°N·76.889°E
              </span>
              {/* Icon */}
              <div className="w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center"
                style={{ background: "rgba(225,29,72,0.06)", border: "1px solid rgba(225,29,72,0.12)" }}>
                <ShieldCheck size={26} style={{ color: "#E11D48" }} />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="font-black text-sm" style={{ color: "#0F172A" }}>
                    Лицензированная автошкола
                  </p>
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#16A34A" }} />
                </div>
                {/* Red license badge */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-2.5"
                  style={{ background: "#E11D48", boxShadow: "0 2px 8px rgba(225,29,72,0.3)" }}>
                  <ShieldCheck size={11} style={{ color: "#fff" }} />
                  <span className="text-[10px] font-black tracking-wide" style={{ color: "#fff" }}>
                    Гос. лицензия МВД РК · ДП № 00862
                  </span>
                </div>
                <br />
                <button
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold transition-all"
                  style={{ color: "#E11D48" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.75"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                >
                  <FileText size={12} />
                  Посмотреть документ
                  <ExternalLink size={11} />
                </button>
              </div>
            </TiltCard>
            </motion.div>

            {/* ── Блок «Цифры» ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
            <TiltCard
              className="relative grid grid-cols-3 rounded-2xl overflow-hidden"
              style={{
                border: "1px solid #F1F5F9",
                boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
              }}
            >
              {/* Tech corner text */}
              <span className="absolute bottom-1.5 right-3 font-mono select-none"
                style={{ fontSize: "9px", letterSpacing: "0.1em", color: "#D1D5DB", opacity: 0.7 }}>
                AMUR-AUTO-v2
              </span>
              {FACTS.map((f, i) => (
                <div
                  key={f.label}
                  className="flex flex-col items-center justify-center py-5 px-3 text-center"
                  style={{
                    background: "#FFFFFF",
                    borderRight: i < FACTS.length - 1 ? "1px solid #F1F5F9" : "none",
                  }}
                >
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-2"
                    style={{ background: f.accent ? "rgba(225,29,72,0.06)" : "#F9FAFB" }}>
                    <f.icon size={15} style={{ color: f.accent ? "#E11D48" : "#94A3B8" }} />
                  </div>
                  <p className="font-black text-sm leading-tight"
                    style={{ color: f.accent ? "#E11D48" : "#0F172A", letterSpacing: "-0.02em" }}>
                    {f.value}
                  </p>
                  <p className="text-[10px] font-medium mt-1 leading-snug" style={{ color: "#94A3B8" }}>
                    {f.label}
                  </p>
                </div>
              ))}
            </TiltCard>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Модальное окно ── */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(15,23,42,0.6)", backdropFilter: "blur(8px)" }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-lg rounded-3xl overflow-hidden"
              style={{
                background: "#FFFFFF",
                boxShadow: "0 32px 80px rgba(0,0,0,0.2)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-6 py-5"
                style={{ borderBottom: "1px solid #F1F5F9" }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(225,29,72,0.07)" }}>
                    <ShieldCheck size={18} style={{ color: "#E11D48" }} />
                  </div>
                  <div>
                    <p className="font-black text-sm" style={{ color: "#0F172A" }}>Лицензия автошколы</p>
                    <p className="text-xs" style={{ color: "#94A3B8" }}>МВД РК · ДП серия № 00862</p>
                  </div>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
                  style={{ background: "#F9FAFB" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#F1F5F9"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#F9FAFB"; }}
                >
                  <X size={16} style={{ color: "#64748B" }} />
                </button>
              </div>

              {/* Скан лицензии */}
              <div className="mx-6 my-5 rounded-2xl overflow-hidden"
                style={{ border: "1px solid #F1F5F9" }}>
                <img
                  src="/license.jpeg"
                  alt="Государственная лицензия АмурАвто"
                  style={{ width: "100%", display: "block", borderRadius: "16px" }}
                />
              </div>

              {/* Footer */}
              <div className="px-6 pb-5 flex items-center justify-between">
                <p className="text-xs" style={{ color: "#CBD5E1" }}>
                  Комитет дорожной полиции МВД РК · Категория B
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{ background: "rgba(22,163,74,0.08)", color: "#16A34A" }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#16A34A" }} />
                  Действующая
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
