"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useLang } from "@/contexts/LangContext";

export default function FAQ() {
  const { t } = useLang();
  const f = t.faq;
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
          <div className="label-tag mb-5">{f.tag}</div>
          <h2
            className="font-black leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#111827", letterSpacing: "-0.025em" }}
          >
            {f.title}
          </h2>
          <p className="text-sm mt-3" style={{ color: "#9CA3AF" }}>
            {f.subtitle}{" "}
            <a
              href="https://wa.me/77776667096"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline transition-colors"
              style={{ color: "#E11D48" }}
            >
              {f.subtitleLink}
            </a>
            {f.subtitleEnd}
          </p>
        </motion.div>

        {/* Bento card wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            borderRadius: "2.5rem",
            background: "#FFFFFF",
            border: "1px solid #F1F5F9",
            boxShadow: "0 4px 32px rgba(0,0,0,0.04)",
            overflow: "hidden",
          }}
        >
          {f.items.map((item, i) => {
            const isOpen = open === i;
            const isLast = i === f.items.length - 1;

            return (
              <div
                key={i}
                style={{
                  borderBottom: isLast ? "none" : "1px solid #F8FAFC",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left"
                >
                  <motion.span
                    className="text-sm font-semibold leading-snug"
                    animate={{ paddingLeft: isOpen ? "0px" : "0px" }}
                    whileHover={{ paddingLeft: "12px" }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    style={{ color: isOpen ? "#E11D48" : "#111827" }}
                  >
                    {item.q}
                  </motion.span>

                  <motion.span
                    className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                    animate={{
                      background: isOpen ? "#E11D48" : "#F3F4F6",
                      rotate: isOpen ? 45 : 0,
                    }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <Plus size={14} style={{ color: isOpen ? "#fff" : "#E11D48" }} />
                  </motion.span>
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
                      <p
                        className="text-sm leading-relaxed px-7 pb-5"
                        style={{ color: "#6B7280" }}
                      >
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
