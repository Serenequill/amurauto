"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "Сколько длится полный курс обучения?",
    a: "Полный курс — 2,5 месяца. Включает теорию (28 часов), практику (10 занятий с инструктором) и подготовку к экзамену в ГАИ.",
  },
  {
    q: "Что если не сдам экзамен с первого раза?",
    a: "Проводим дополнительные занятия по теории и практике бесплатно до тех пор, пока вы не сдадите. Ваши права — наша ответственность.",
  },
  {
    q: "Есть ли рассрочка и как она оформляется?",
    a: "Да, рассрочка без процентов и без банка — оформляем прямо в офисе. Первый взнос от 30%, остаток равными частями в течение курса.",
  },
  {
    q: "Можно ли учиться дистанционно?",
    a: "Да. Теория доступна в онлайн-формате с живым преподавателем по расписанию. Практика проходит очно на учебном автомобиле.",
  },
  {
    q: "На каких автомобилях проходит практика — автомат или механика?",
    a: "У нас есть оба варианта. При записи выбираете нужный тип трансмиссии. Все учебные автомобили оборудованы дополнительными педалями инструктора.",
  },
  {
    q: "Какой филиал выбрать?",
    a: "Выбирайте ближайший к дому или работе — у нас 6 точек по всему Алматы: Толе би, Аксай, Геологов, Акан Серы, Жарокова, Авто Лидер. При записи через сайт — скидка 10%.",
  },
  {
    q: "Какие документы нужны для записи?",
    a: "Удостоверение личности (или паспорт) и медицинская справка формы 083-у. Справку можно получить в любой лицензированной клинике.",
  },
  {
    q: "С какого возраста можно записаться?",
    a: "С 16 лет — с письменного согласия родителей. С 18 лет — самостоятельно. Ограничений по верхнему возрасту нет.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-12 sm:py-24" style={{ background: "#FFFFFF" }}>
      <div className="max-w-3xl mx-auto px-6 sm:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="label-tag mb-5">Вопросы</div>
          <h2
            className="font-extrabold leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#111827", letterSpacing: "-0.02em" }}
          >
            Частые вопросы
          </h2>
          <p className="text-sm mt-3" style={{ color: "#9CA3AF" }}>
            Если не нашли ответ — напишите нам в WhatsApp, ответим за пару минут
          </p>
        </motion.div>

        {/* Items */}
        <div className="flex flex-col divide-y" style={{ borderTop: "1px solid #F1F5F9", borderBottom: "1px solid #F1F5F9" }}>
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                >
                  <span
                    className="text-sm font-semibold leading-snug"
                    style={{ color: isOpen ? "#E11D48" : "#111827", transition: "color 0.2s" }}
                  >
                    {item.q}
                  </span>
                  <span
                    className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                    style={{
                      background: isOpen ? "#E11D48" : "#F3F4F6",
                      transition: "background 0.2s, transform 0.3s",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    <Plus size={14} style={{ color: isOpen ? "#fff" : "#6B7280" }} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <p className="text-sm leading-relaxed pb-5" style={{ color: "#6B7280" }}>
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
