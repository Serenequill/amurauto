"use client";

import { motion } from "framer-motion";
import { CreditCard, CalendarCheck, ShieldCheck, ArrowRight } from "lucide-react";

const STEPS = [
  { icon: CreditCard,    title: "Первый взнос",      desc: "Вносите часть суммы при записи — и сразу начинаете обучение" },
  { icon: CalendarCheck, title: "Оплата в процессе", desc: "Остаток оплачиваете частями в удобное время" },
  { icon: ShieldCheck,   title: "Без переплат",       desc: "Никаких процентов — только стоимость курса" },
];

export default function Installments() {
  return (
    <section className="py-0" style={{ background: "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden"
          style={{ background: "#0F172A", borderRadius: "3rem" }}
        >
          {/* Decorative label */}
          <div
            className="absolute top-7 right-8 mono text-[9px] tracking-[0.22em] select-none pointer-events-none hidden sm:block"
            style={{ color: "#FFFFFF", opacity: 0.12 }}
          >
            ИНДИВИДУАЛЬНЫЙ ГРАФИК ОПЛАТЫ
          </div>

          <div className="relative px-8 sm:px-12 py-12 sm:py-14">

            {/* Header row */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-12">
              <div className="lg:max-w-xl">
                <div
                  className="inline-block text-[10px] font-black uppercase tracking-[0.22em] mb-5 px-3.5 py-1.5 rounded-full"
                  style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.3)" }}
                >
                  Удобная оплата
                </div>
                <h2
                  className="font-black text-white leading-none"
                  style={{ fontSize: "clamp(2.4rem, 5vw, 3.5rem)", letterSpacing: "-0.035em" }}
                >
                  Оплата частями —
                  <br />
                  <span style={{ color: "rgba(255,255,255,0.28)" }}>без переплат</span>
                </h2>
                <p className="text-sm mt-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.32)" }}>
                  Начните учиться уже сегодня. Условия обговариваются индивидуально с менеджером.
                </p>
              </div>

              {/* CTA — rounded-full red */}
              <motion.a
                href="tel:87776667096"
                whileHover="hover"
                initial="rest"
                className="inline-flex items-center gap-3 px-7 py-4 font-black text-sm rounded-full self-start shrink-0"
                style={{
                  background: "linear-gradient(160deg,#C41E3A 0%,#9E1239 55%,#7D0E2D 100%)",
                  color: "#fff",
                  boxShadow: "0 4px 28px rgba(196,30,58,0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
                }}
              >
                <motion.span
                  variants={{ rest: { scale: 1 }, hover: { scale: 1.04 } }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                >
                  Узнать условия
                </motion.span>
                <motion.span
                  variants={{ rest: { x: 0 }, hover: { x: 4 } }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <ArrowRight size={15} />
                </motion.span>
              </motion.a>
            </div>

            {/* Step cards — transparent + backdrop-blur */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{
                    background: "rgba(255,255,255,0.08)",
                    borderColor: "rgba(255,255,255,0.12)",
                  }}
                  className="p-5 flex items-start gap-4 cursor-default"
                  style={{
                    borderRadius: "1.5rem",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    backdropFilter: "blur(8px)",
                    transition: "background 0.22s ease, border-color 0.22s ease",
                  }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center shrink-0 rounded-xl"
                    style={{
                      background: "rgba(196,30,58,0.18)",
                      border: "1px solid rgba(196,30,58,0.28)",
                    }}
                  >
                    <step.icon size={18} style={{ color: "#F87171" }} />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm mb-1">{step.title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.32)" }}>
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
