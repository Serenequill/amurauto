"use client";

import { motion } from "framer-motion";
import { MapPin, Car, Users, GraduationCap, ArrowRight } from "lucide-react";
import { useLang } from "@/contexts/LangContext";

const STAT_ICONS = [MapPin, Car, Users];

export default function About() {
  const { t } = useLang();
  const a = t.about;

  return (
    <section id="about" className="py-12 sm:py-24" style={{ background: "#F9FAFB" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* ── Text column ── */}
          <div className="lg:col-span-6">
            <div className="label-tag mb-5">{a.tag}</div>

            <h2
              className="font-black leading-tight mb-3"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)", color: "#111827", letterSpacing: "-0.025em" }}
            >
              {a.title.split("\n").map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </h2>

            <p className="text-base font-semibold mb-8" style={{ color: "#E11D48" }}>
              {a.subtitle}
            </p>

            <div className="space-y-5 text-sm leading-relaxed" style={{ color: "#6B7280" }}>
              <p>{a.p1}</p>
              <p>
                <strong style={{ color: "#111827" }}>{a.p2a}</strong>{" "}{a.p2b}{" "}
                <strong style={{ color: "#E11D48" }}>{a.p2accent}</strong>{" "}{a.p2c}
              </p>
              <p>
                {a.p3a}{" "}
                <strong style={{ color: "#111827" }}>{a.p3accent}</strong>{a.p3b}
              </p>
            </div>

            {/* АКПП / МКПП badge */}
            <div className="mt-7">
              <div
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs font-black uppercase tracking-wider"
                style={{ background: "#111827", color: "#FFFFFF" }}
              >
                <GraduationCap size={13} />
                {a.transmission}
              </div>
            </div>

            {/* Schedule note */}
            <div className="mt-6 flex items-start gap-3">
              <div
                className="shrink-0 mt-1 rounded-full"
                style={{ width: 3, height: 36, background: "#E11D48" }}
              />
              <p className="text-sm leading-relaxed" style={{ color: "#9CA3AF" }}>
                {a.schedule}
              </p>
            </div>

            {/* Red slogan */}
            <p
              className="font-black mt-8 leading-none"
              style={{
                fontSize: "clamp(1.5rem, 3.2vw, 2.1rem)",
                color: "#E11D48",
                letterSpacing: "-0.02em",
              }}
            >
              {a.slogan}
            </p>

            {/* CTA */}
            <motion.a
              href="#register"
              whileHover="hover"
              initial="rest"
              className="inline-flex items-center gap-2.5 mt-8 px-7 py-4 text-sm font-black rounded-full"
              style={{
                background: "#111827",
                color: "#FFFFFF",
                boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
              }}
            >
              {a.cta}
              <motion.span
                variants={{ rest: { x: 0 }, hover: { x: 4 } }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <ArrowRight size={15} />
              </motion.span>
            </motion.a>
          </div>

          {/* ── Stats column ── */}
          <div className="lg:col-span-5 lg:col-start-8 flex flex-col gap-4">
            {a.stats.map(({ value, label }, i) => {
              const Icon = STAT_ICONS[i];
              return (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-5 p-7"
                style={{
                  background: "#FFFFFF",
                  borderRadius: "1.5rem",
                  border: "1px solid #F1F5F9",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  className="w-11 h-11 flex items-center justify-center shrink-0 rounded-xl"
                  style={{ background: "rgba(225,29,72,0.06)", border: "1px solid rgba(225,29,72,0.12)" }}
                >
                  <Icon size={20} style={{ color: "#E11D48" }} />
                </div>
                <div>
                  <div
                    className="font-black text-2xl"
                    style={{ color: "#111827", letterSpacing: "-0.025em" }}
                  >
                    {value}
                  </div>
                  <div className="text-xs font-medium mt-0.5" style={{ color: "#9CA3AF" }}>{label}</div>
                </div>
              </motion.div>
              );
            })}

            {/* Location tag */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="px-5 py-4 flex items-center gap-3"
              style={{
                background: "#FFFFFF",
                borderRadius: "1.25rem",
                border: "1px solid #F1F5F9",
              }}
            >
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: "#E11D48" }} />
              <span className="mono">{a.location}</span>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
