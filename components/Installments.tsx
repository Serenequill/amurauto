"use client";

import { motion } from "framer-motion";
import { CreditCard, CalendarCheck, ShieldCheck, Phone } from "lucide-react";

const STEPS = [
  { icon: CreditCard,    title: "Первый взнос",      desc: "Вносите часть суммы при записи — и сразу начинаете обучение" },
  { icon: CalendarCheck, title: "Оплата в процессе", desc: "Остаток оплачиваете частями в удобное время" },
  { icon: ShieldCheck,   title: "Без переплат",       desc: "Никаких процентов — только стоимость курса" },
];

export default function Installments() {
  return (
    <section className="py-0" style={{ background: "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-sm"
          style={{ background: "#111827", border: "1px solid #111827" }}
        >
          <div className="relative px-8 sm:px-12 py-10 sm:py-12">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-10">
              <div className="lg:max-w-md">
                <div className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1"
                  style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}>
                  Удобная оплата
                </div>
                <h2 className="font-extrabold leading-tight text-white"
                  style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", letterSpacing: "-0.02em" }}>
                  Оплата частями —<br />
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>без переплат и процентов</span>
                </h2>
                <p className="text-sm mt-3 font-normal" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Начните учиться уже сегодня. Условия обговариваются индивидуально с менеджером.
                </p>
              </div>

              <a href="tel:87776667096"
                className="inline-flex items-center gap-3 px-6 py-3.5 font-bold text-sm transition-all self-start rounded-sm btn-primary"
              >
                <Phone size={16} />Узнать условия
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {STEPS.map((step, i) => (
                <motion.div key={step.title}
                  initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="p-5 flex items-start gap-4 rounded-sm"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="w-10 h-10 flex items-center justify-center shrink-0 rounded-sm"
                    style={{ background: "rgba(255,255,255,0.06)" }}>
                    <step.icon size={18} color="rgba(255,255,255,0.5)" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm mb-1">{step.title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>{step.desc}</p>
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
