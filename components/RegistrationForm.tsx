"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ChevronDown, MapPin, BookOpen } from "lucide-react";
import { useLang } from "@/contexts/LangContext";

const BRANCHES = [
  { label: "Толе би — ул. Толе би, 214а",       phone: "77776667096" },
  { label: "Аксай — мкр. Аксай-1, 15Б",         phone: "77772001660" },
  { label: "Геологов — ул. Геологов, 2/3",       phone: "77075606911" },
  { label: "Акан Серы — ул. Акан Серы, 11",      phone: "77772511115" },
  { label: "Жарокова — ул. Жарокова, 322а",      phone: "77071515991" },
  { label: "Авто Лидер — 4-й мкр., 2Б",         phone: "77478101035" },
];

type Form = { name: string; phone: string; branch: string; format: string };

/* ─── Honeypot: бот заполнит это поле, человек — никогда ─── */
const HONEYPOT_FIELD = "website"; // привлекательное имя для ботов

/* ─── Confetti particle ─── */
const CONFETTI_COLORS = ["#E11D48", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6", "#EC4899"];

function Confetti() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 28 }).map((_, i) => {
        const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
        const x = 20 + Math.random() * 60;
        const isRect = i % 3 !== 0;
        return (
          <motion.div
            key={i}
            initial={{ x: `${x}%`, y: "60%", opacity: 1, rotate: 0, scale: 1 }}
            animate={{
              y: `${-10 - (i % 5) * 15}%`,
              opacity: 0,
              rotate: (i % 2 === 0 ? 1 : -1) * (80 + (i % 4) * 40),
              scale: 0.5,
            }}
            transition={{ duration: 0.7 + (i % 5) * 0.15, delay: (i % 7) * 0.06, ease: "easeOut" }}
            style={{
              position: "absolute",
              width: isRect ? 8 : 6,
              height: isRect ? 5 : 6,
              background: color,
              borderRadius: isRect ? 2 : "50%",
            }}
          />
        );
      })}
    </div>
  );
}

/* ─── Shake wrapper ─── */
function ShakeField({ shake, children }: { shake: boolean; children: React.ReactNode }) {
  return (
    <motion.div
      animate={shake ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function RegistrationForm() {
  const { t } = useLang();
  const f = t.form;

  const [form, setForm]       = useState<Form>({ name: "", phone: "", branch: "", format: "" });
  const [sent, setSent]       = useState(false);
  const [errors, setErrors]   = useState<Partial<Form>>({});
  const [shaking, setShaking] = useState<Partial<Record<keyof Form, boolean>>>({});
  const [honeypot, setHoneypot] = useState(""); // всегда должно быть пустым

  const set = <K extends keyof Form>(key: K, val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const triggerShake = useCallback((keys: (keyof Form)[]) => {
    const s: Partial<Record<keyof Form, boolean>> = {};
    keys.forEach((k) => (s[k] = true));
    setShaking(s);
    setTimeout(() => setShaking({}), 500);
  }, []);

  const validate = () => {
    const e: Partial<Form> = {};
    if (!form.name.trim())  e.name   = f.errorName;
    if (!form.phone.trim()) e.phone  = f.errorPhone;
    if (!form.branch)       e.branch = f.errorBranch;
    if (!form.format)       e.format = f.errorFormat;
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Бот заполнил honeypot — тихо имитируем успех, ничего не отправляем
    if (honeypot) {
      setSent(true);
      return;
    }

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      triggerShake(Object.keys(errs) as (keyof Form)[]);
      return;
    }
    const branch = BRANCHES.find((b) => b.label === form.branch);
    const formatLabel = f.formats.find((fmt) => fmt.value === form.format)?.label ?? form.format;
    const text = encodeURIComponent(f.waMessage(form.name, form.phone, form.branch, formatLabel));
    window.open(`https://wa.me/${branch?.phone}?text=${text}`, "_blank");
    setSent(true);
  };

  const inputBase = (err: boolean, focused: boolean = false) => ({
    width: "100%",
    borderRadius: "1rem",
    padding: "13px 16px",
    fontSize: "14px",
    outline: "none",
    background: "#FFFFFF",
    border: `1.5px solid ${err ? "#E11D48" : focused ? "#DC2626" : "#E5E7EB"}`,
    boxShadow: focused ? "0 0 0 3px rgba(220,38,38,0.12)" : err ? "0 0 0 3px rgba(225,29,72,0.08)" : "none",
    color: "#111827",
    transition: "border-color 0.2s, box-shadow 0.2s",
    fontFamily: "var(--font-inter), sans-serif",
  });

  return (
    <section id="register" className="py-12 sm:py-24" style={{ background: "#FFFFFF" }}>
      <div className="max-w-2xl mx-auto px-6 sm:px-8">

        {/* Header */}
        <div className="mb-10">
          <div className="label-tag mb-5">{f.tag}</div>
          <h2 className="font-black leading-tight mb-3"
            style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#111827", letterSpacing: "-0.025em" }}>
            {f.title}
          </h2>
          <p className="text-sm" style={{ color: "#9CA3AF" }}>
            {f.subtitle}
          </p>
        </div>

        {/* Card — rounded-[3rem], floating red shadow */}
        <div
          style={{
            borderRadius: "3rem",
            padding: "2rem",
            background: "#FFFFFF",
            border: "1px solid #F1F5F9",
            boxShadow: "0 8px 48px rgba(225,29,72,0.09), 0 2px 16px rgba(0,0,0,0.05)",
          }}
        >
          <AnimatePresence mode="wait">
            {sent ? (
              /* ── Success state ── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-center py-12"
              >
                <div className="text-5xl mb-6 select-none">✅</div>
                <h3 className="text-xl font-black mb-3" style={{ color: "#111827" }}>
                  {f.successTitle}
                </h3>
                <p className="text-sm" style={{ color: "#9CA3AF" }}>
                  {f.successLine1}
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", phone: "", branch: "", format: "" }); }}
                  className="mt-8 text-sm font-semibold underline underline-offset-2"
                  style={{ color: "#E11D48" }}
                >
                  {f.anotherRequest}
                </button>
              </motion.div>
            ) : (
              /* ── Form ── */
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-5"
                noValidate
              >
                {/* ── Honeypot: скрыто от людей, ловушка для ботов ── */}
                <div
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden", opacity: 0, pointerEvents: "none" }}
                  tabIndex={-1}
                >
                  <label htmlFor={HONEYPOT_FIELD}>Не заполняйте это поле</label>
                  <input
                    id={HONEYPOT_FIELD}
                    name={HONEYPOT_FIELD}
                    type="text"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    autoComplete="off"
                    tabIndex={-1}
                  />
                </div>

                {/* Name + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-2 uppercase tracking-widest" style={{ color: "#9CA3AF" }}>
                      {f.labelName}
                    </label>
                    <ShakeField shake={!!shaking.name}>
                      <InputField
                        type="text"
                        placeholder={f.placeholderName}
                        value={form.name}
                        onChange={(v) => set("name", v)}
                        error={!!errors.name}
                        inputBase={inputBase}
                      />
                    </ShakeField>
                    {errors.name && <p className="text-xs mt-1.5" style={{ color: "#E11D48" }}>{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2 uppercase tracking-widest" style={{ color: "#9CA3AF" }}>
                      {f.labelPhone}
                    </label>
                    <ShakeField shake={!!shaking.phone}>
                      <InputField
                        type="tel"
                        placeholder={f.placeholderPhone}
                        value={form.phone}
                        onChange={(v) => set("phone", v)}
                        error={!!errors.phone}
                        inputBase={inputBase}
                      />
                    </ShakeField>
                    {errors.phone && <p className="text-xs mt-1.5" style={{ color: "#E11D48" }}>{errors.phone}</p>}
                  </div>
                </div>

                {/* Branch select */}
                <div>
                  <label className="block text-xs font-semibold mb-2 uppercase tracking-widest" style={{ color: "#9CA3AF" }}>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={11} style={{ color: "#E11D48" }} />{f.labelBranch}
                    </span>
                  </label>
                  <ShakeField shake={!!shaking.branch}>
                    <div className="relative">
                      <SelectField
                        value={form.branch}
                        onChange={(v) => set("branch", v)}
                        error={!!errors.branch}
                        inputBase={inputBase}
                        options={BRANCHES.map((b) => b.label)}
                        placeholder={f.placeholderBranch}
                      />
                      <ChevronDown size={15} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#9CA3AF" }} />
                    </div>
                  </ShakeField>
                  {errors.branch && <p className="text-xs mt-1.5" style={{ color: "#E11D48" }}>{errors.branch}</p>}
                </div>

                {/* Format */}
                <div>
                  <label className="block text-xs font-semibold mb-3 uppercase tracking-widest" style={{ color: "#9CA3AF" }}>
                    <span className="inline-flex items-center gap-1.5">
                      <BookOpen size={11} style={{ color: "#E11D48" }} />{f.labelFormat}
                    </span>
                  </label>
                  <ShakeField shake={!!shaking.format}>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {f.formats.map((fmt) => {
                        const active = form.format === fmt.value;
                        return (
                          <motion.button
                            key={fmt.value}
                            type="button"
                            whileTap={{ scale: 0.95 }}
                            onClick={() => set("format", fmt.value)}
                            className="text-left px-4 py-3.5 transition-all"
                            style={{
                              borderRadius: "1.25rem",
                              border: `2px solid ${active ? "#E11D48" : errors.format ? "rgba(225,29,72,0.25)" : "#E5E7EB"}`,
                              background: active ? "#FFF1F2" : "#FFFFFF",
                              boxShadow: active ? "0 0 0 3px rgba(225,29,72,0.1)" : "none",
                            }}
                          >
                            <p className="font-semibold text-sm" style={{ color: active ? "#111827" : "#374151" }}>
                              {fmt.label}
                            </p>
                            <p className="text-xs mt-0.5" style={{ color: active ? "#E11D48" : "#9CA3AF" }}>
                              {fmt.desc}
                            </p>
                          </motion.button>
                        );
                      })}
                    </div>
                  </ShakeField>
                  {errors.format && <p className="text-xs mt-1.5" style={{ color: "#E11D48" }}>{errors.format}</p>}
                  <p className="text-xs mt-2" style={{ color: "#9CA3AF" }}>
                    {f.scheduleNote}
                  </p>
                </div>

                {/* Discount hint */}
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                  style={{ background: "rgba(225,29,72,0.04)", border: "1px solid rgba(225,29,72,0.1)" }}>
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#E11D48" }} />
                  <p className="text-xs" style={{ color: "#6B7280" }}>
                    {f.discount}{" "}
                    <span className="font-bold" style={{ color: "#E11D48" }}>{f.discountVal}</span>{" "}{f.discountEnd}
                  </p>
                </div>

                {/* Submit — red, rounded-full, flying airplane */}
                <motion.button
                  type="submit"
                  whileHover="hover"
                  initial="rest"
                  className="w-full flex items-center justify-center gap-3 py-4 font-black text-sm rounded-full text-white overflow-hidden relative"
                  style={{
                    background: "linear-gradient(160deg,#C41E3A 0%,#E11D48 50%,#9E1239 100%)",
                    boxShadow: "0 4px 24px rgba(225,29,72,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
                  }}
                >
                  {f.submit}
                  <motion.span
                    variants={{
                      rest: { x: 0, y: 0, opacity: 1 },
                      hover: { x: 6, y: -6, opacity: 0 },
                    }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                  >
                    <Send size={15} />
                  </motion.span>
                </motion.button>

                <p className="text-xs text-center" style={{ color: "#D1D5DB" }}>
                  {f.privacy}{" "}
                  <a href="/privacy" className="underline" style={{ color: "#9CA3AF" }}>
                    {f.privacyLink}
                  </a>
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

/* ─── Helpers ─── */
type InputProps = {
  type: string; placeholder: string; value: string;
  onChange: (v: string) => void; error: boolean;
  inputBase: (err: boolean, focused?: boolean) => React.CSSProperties;
};

function InputField({ type, placeholder, value, onChange, error, inputBase }: InputProps) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={inputBase(error, focused)}
    />
  );
}

type SelectProps = {
  value: string; onChange: (v: string) => void; error: boolean;
  inputBase: (err: boolean, focused?: boolean) => React.CSSProperties;
  options: string[]; placeholder: string;
};

function SelectField({ value, onChange, error, inputBase, options, placeholder }: SelectProps) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{ ...inputBase(error, focused), paddingRight: "40px", appearance: "none", WebkitAppearance: "none" }}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}
