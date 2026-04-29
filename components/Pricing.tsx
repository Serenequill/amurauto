"use client";

import { motion } from "framer-motion";
import { Check, Gift, Users, Globe } from "lucide-react";

const PLANS = [
  {
    name: "Стандарт",
    price: "120 000",
    tag: "Старт",
    details: "5 занятий · Автодром",
    highlight: false,
    includes: [
      "Теория + практика",
      "5 занятий по 90 минут",
      "Занятия на автодроме",
      "Сертифицированный инструктор",
    ],
    gift: null,
  },
  {
    name: "Стандарт+",
    price: "160 000",
    tag: "Популярный",
    details: "10 занятий · Автодром + Город",
    highlight: true,
    includes: [
      "Теория + практика",
      "5 занятий на автодроме по 90 минут",
      "5 занятий в городе по 60 минут",
      "Сертифицированный инструктор",
    ],
    gift: "Учебник в подарок",
  },
  {
    name: "Комфорт",
    price: "200 000",
    tag: "Максимум",
    details: "15 занятий · Автодром + Город",
    highlight: false,
    includes: [
      "Теория + практика",
      "15 занятий: автодром + город",
      "Кол-во занятий по автодрому и городу — индивидуально",
      "Сертифицированный инструктор",
    ],
    gift: "Тесты ПДД в подарок",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-12 sm:py-24" style={{ background: "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="mb-16">
          <div className="label-tag mb-5">Стоимость</div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="font-extrabold leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#111827", letterSpacing: "-0.02em" }}>
              Прайс
            </h2>
            <p className="text-sm max-w-xs" style={{ color: "#9CA3AF" }}>
              Длительность полного курса — 2.5 месяца
            </p>
          </div>
        </div>

        {/* Discount banners */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
          {[
            { icon: Users, title: "Приведи друга", desc: "Оба получите скидку на обучение", badge: "−10%" },
            { icon: Globe, title: "Запись с сайта", desc: "Скидка при подаче заявки онлайн", badge: "−10%" },
          ].map((d, i) => (
            <motion.div key={d.title}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
              className="card flex items-center gap-4 px-5 py-4 rounded-sm"
            >
              <div className="w-10 h-10 flex items-center justify-center shrink-0 rounded-sm"
                style={{ background: "rgba(225,29,72,0.06)" }}>
                <d.icon size={18} style={{ color: "#E11D48" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm" style={{ color: "#111827" }}>{d.title}</p>
                <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>{d.desc}</p>
              </div>
              <div className="shrink-0 text-sm font-black px-3 py-1 rounded-sm"
                style={{ background: "rgba(225,29,72,0.06)", color: "#E11D48", border: "1px solid rgba(225,29,72,0.15)" }}>
                {d.badge}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PLANS.map((plan, idx) => (
            <motion.div key={plan.name}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative flex flex-col rounded-sm overflow-hidden"
              style={plan.highlight ? {
                background: "#1E293B",
                border: "1px solid #1E293B",
              } : {
                background: "#FFFFFF",
                border: "1px solid #F1F5F9",
                boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
              }}
            >
              {/* Top label */}
              <div className="px-6 py-3 flex items-center justify-between"
                style={{ borderBottom: `1px solid ${plan.highlight ? "rgba(255,255,255,0.07)" : "#F9FAFB"}` }}>
                <span className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: plan.highlight ? "rgba(255,255,255,0.4)" : "#9CA3AF" }}>
                  {plan.tag}
                </span>
                <span className="text-xs font-medium"
                  style={{ color: plan.highlight ? "rgba(255,255,255,0.3)" : "#D1D5DB" }}>
                  {plan.details}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-bold text-lg mb-4"
                  style={{ color: plan.highlight ? "#fff" : "#111827" }}>
                  {plan.name}
                </h3>

                <div className="mb-6">
                  <span className="font-black" style={{ fontSize: "2.2rem", color: plan.highlight ? "#fff" : "#111827", letterSpacing: "-0.02em" }}>
                    {plan.price}
                  </span>
                  <span className="text-lg ml-1 font-medium" style={{ color: plan.highlight ? "rgba(255,255,255,0.3)" : "#D1D5DB" }}>₸</span>
                </div>

                <ul className="flex flex-col gap-2.5 flex-1 mb-5">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check size={14} className="mt-0.5 shrink-0" style={{ color: plan.highlight ? "rgba(255,255,255,0.5)" : "#E11D48" }} />
                      <span className="text-sm" style={{ color: plan.highlight ? "rgba(255,255,255,0.6)" : "#6B7280" }}>{item}</span>
                    </li>
                  ))}
                </ul>

                {plan.gift && (
                  <div className="flex items-center gap-2 text-xs font-semibold mb-4 px-3 py-2 rounded-sm"
                    style={plan.highlight
                      ? { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }
                      : { background: "rgba(225,29,72,0.05)", color: "#E11D48", border: "1px solid rgba(225,29,72,0.12)" }}>
                    <Gift size={13} />{plan.gift}
                  </div>
                )}

                <a href="#register"
                  className="block text-center font-black py-4 text-sm rounded-sm transition-all tracking-wide"
                  style={plan.highlight
                    ? { background: "#E11D48", color: "#fff", boxShadow: "0 4px 14px rgba(225,29,72,0.35)", fontSize: "0.9rem" }
                    : { background: "#111827", color: "#FFFFFF", fontSize: "0.9rem" }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    if (plan.highlight) { el.style.background = "#BE123C"; el.style.boxShadow = "0 6px 20px rgba(225,29,72,0.45)"; }
                    else { el.style.background = "#1F2937"; }
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    if (plan.highlight) { el.style.background = "#E11D48"; el.style.boxShadow = "0 4px 14px rgba(225,29,72,0.35)"; }
                    else { el.style.background = "#111827"; }
                  }}
                >
                  Записаться →
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-xs mt-6" style={{ color: "#D1D5DB" }}>
          * Теоретический курс входит в стоимость. Дополнительные занятия докупаются отдельно.
        </p>
      </div>
    </section>
  );
}
