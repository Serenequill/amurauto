"use client";

import { useState } from "react";
import { Send, CheckCircle, ChevronDown, MapPin, BookOpen } from "lucide-react";

const BRANCHES = [
  { label: "Толе би — ул. Толе би, 214а",       phone: "77776667096" },
  { label: "Аксай — мкр. Аксай-1, 15Б",         phone: "77772001660" },
  { label: "Геологов — ул. Геологов, 2/3",       phone: "77075606911" },
  { label: "Акан Серы — ул. Акан Серы, 11",      phone: "77772511115" },
  { label: "Жарокова — ул. Жарокова, 322а",      phone: "77071515991" },
  { label: "Авто Лидер — 4-й мкр., 2Б",         phone: "77478101035" },
];

const FORMATS = [
  { value: "offline", label: "Очно",            desc: "Занятия в аудитории по расписанию" },
  { value: "online",  label: "Дистанционно",    desc: "С преподавателем онлайн по расписанию" },
  { value: "weekend", label: "Выходного дня",   desc: "Занятия в сб–вс по расписанию" },
];

type Form = { name: string; phone: string; branch: string; format: string };

export default function RegistrationForm() {
  const [form, setForm] = useState<Form>({ name: "", phone: "", branch: "", format: "" });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Partial<Form>>({});

  const set = <K extends keyof Form>(key: K, val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const validate = () => {
    const e: Partial<Form> = {};
    if (!form.name.trim())  e.name   = "Введите имя";
    if (!form.phone.trim()) e.phone  = "Введите телефон";
    if (!form.branch)       e.branch = "Выберите филиал";
    if (!form.format)       e.format = "Выберите формат";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    const branch = BRANCHES.find((b) => b.label === form.branch);
    const formatLabel = FORMATS.find((f) => f.value === form.format)?.label ?? form.format;
    const text = encodeURIComponent(
      `Здравствуйте! Хочу записаться на обучение.\n\n` +
      `Имя: ${form.name}\n` +
      `Телефон: ${form.phone}\n` +
      `Филиал: ${form.branch}\n` +
      `Формат: ${formatLabel}\n\n` +
      `(заявка с сайта amurauto.kz)`
    );
    window.open(`https://wa.me/${branch?.phone}?text=${text}`, "_blank");
    setSent(true);
  };

  const inputStyle = (err: boolean) => ({
    width: "100%",
    borderRadius: "4px",
    padding: "12px 14px",
    fontSize: "14px",
    outline: "none",
    background: "#FFFFFF",
    border: `1px solid ${err ? "#E11D48" : "#E5E7EB"}`,
    color: "#111827",
    transition: "border-color 0.2s",
    fontFamily: "var(--font-inter), sans-serif",
  });

  return (
    <section id="register" className="py-12 sm:py-24" style={{ background: "#FFFFFF" }}>
      <div className="max-w-2xl mx-auto px-6 sm:px-8">

        {/* Header */}
        <div className="mb-10">
          <div className="label-tag mb-5">Запись</div>
          <h2 className="font-extrabold leading-tight mb-3"
            style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#111827", letterSpacing: "-0.02em" }}>
            Записаться на обучение
          </h2>
          <p className="text-sm" style={{ color: "#9CA3AF" }}>
            Выберите филиал и формат обучения — ответим в WhatsApp
          </p>
        </div>

        {/* Card */}
        <div className="rounded-sm p-8" style={{ background: "#FFFFFF", border: "1px solid #F1F5F9", boxShadow: "0 4px 32px rgba(0,0,0,0.06)" }}>
          {sent ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-5 rounded-sm"
                style={{ background: "rgba(225,29,72,0.06)", border: "1px solid rgba(225,29,72,0.15)" }}>
                <CheckCircle size={32} style={{ color: "#E11D48" }} />
              </div>
              <h3 className="text-2xl font-black mb-2" style={{ color: "#111827" }}>Заявка принята!</h3>
              <p className="text-sm mb-6" style={{ color: "#9CA3AF" }}>
                Менеджер ответит вам в WhatsApp.
              </p>
              <div className="inline-block text-left px-5 py-4 rounded-sm mb-6 space-y-1.5"
                style={{ background: "#F9FAFB", border: "1px solid #F1F5F9" }}>
                <p className="text-sm" style={{ color: "#6B7280" }}>
                  <span className="font-semibold" style={{ color: "#111827" }}>Филиал:</span> {form.branch}
                </p>
                <p className="text-sm" style={{ color: "#6B7280" }}>
                  <span className="font-semibold" style={{ color: "#111827" }}>Формат:</span>{" "}
                  {FORMATS.find((f) => f.value === form.format)?.label}
                </p>
              </div>
              <br />
              <button onClick={() => { setSent(false); setForm({ name: "", phone: "", branch: "", format: "" }); }}
                className="text-sm font-semibold underline underline-offset-2"
                style={{ color: "#E11D48" }}>
                Оставить ещё одну заявку
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-2 uppercase tracking-widest" style={{ color: "#9CA3AF" }}>
                    Ваше имя *
                  </label>
                  <input type="text" placeholder="Как вас зовут?" value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    style={inputStyle(!!errors.name)}
                    onFocus={(e) => { if (!errors.name) (e.currentTarget as HTMLElement).style.borderColor = "#111827"; }}
                    onBlur={(e) => { if (!errors.name) (e.currentTarget as HTMLElement).style.borderColor = "#E5E7EB"; }}
                  />
                  {errors.name && <p className="text-xs mt-1.5" style={{ color: "#E11D48" }}>{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2 uppercase tracking-widest" style={{ color: "#9CA3AF" }}>
                    Телефон *
                  </label>
                  <input type="tel" placeholder="+7 777 000-00-00" value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    style={inputStyle(!!errors.phone)}
                    onFocus={(e) => { if (!errors.phone) (e.currentTarget as HTMLElement).style.borderColor = "#111827"; }}
                    onBlur={(e) => { if (!errors.phone) (e.currentTarget as HTMLElement).style.borderColor = "#E5E7EB"; }}
                  />
                  {errors.phone && <p className="text-xs mt-1.5" style={{ color: "#E11D48" }}>{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-2 uppercase tracking-widest" style={{ color: "#9CA3AF" }}>
                  <span className="inline-flex items-center gap-1.5"><MapPin size={11} style={{ color: "#E11D48" }} />Филиал *</span>
                </label>
                <div className="relative">
                  <select value={form.branch} onChange={(e) => set("branch", e.target.value)}
                    style={{ ...inputStyle(!!errors.branch), paddingRight: "40px", appearance: "none", WebkitAppearance: "none" }}
                    onFocus={(e) => { if (!errors.branch) (e.currentTarget as HTMLElement).style.borderColor = "#111827"; }}
                    onBlur={(e) => { if (!errors.branch) (e.currentTarget as HTMLElement).style.borderColor = "#E5E7EB"; }}
                  >
                    <option value="" style={{ background: "#FFFFFF" }}>— выберите ближайший филиал —</option>
                    {BRANCHES.map((b) => <option key={b.label} value={b.label} style={{ background: "#FFFFFF" }}>{b.label}</option>)}
                  </select>
                  <ChevronDown size={15} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#9CA3AF" }} />
                </div>
                {errors.branch && <p className="text-xs mt-1.5" style={{ color: "#E11D48" }}>{errors.branch}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold mb-3 uppercase tracking-widest" style={{ color: "#9CA3AF" }}>
                  <span className="inline-flex items-center gap-1.5"><BookOpen size={11} style={{ color: "#E11D48" }} />Формат *</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {FORMATS.map((f) => {
                    const active = form.format === f.value;
                    return (
                      <button key={f.value} type="button" onClick={() => set("format", f.value)}
                        className="text-left px-4 py-3.5 rounded-sm transition-all"
                        style={{
                          border: `1px solid ${active ? "#111827" : errors.format ? "rgba(225,29,72,0.3)" : "#E5E7EB"}`,
                          background: active ? "#111827" : "#FFFFFF",
                        }}>
                        <p className="font-semibold text-sm" style={{ color: active ? "#fff" : "#111827" }}>{f.label}</p>
                        <p className="text-xs mt-0.5" style={{ color: active ? "rgba(255,255,255,0.4)" : "#9CA3AF" }}>{f.desc}</p>
                      </button>
                    );
                  })}
                </div>
                {errors.format && <p className="text-xs mt-1.5" style={{ color: "#E11D48" }}>{errors.format}</p>}
                <p className="text-xs mt-2" style={{ color: "#9CA3AF" }}>
                  Расписание теории устанавливается заранее. График практических занятий согласовывается индивидуально с инструктором.
                </p>
              </div>

              {/* Discount hint */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-sm"
                style={{ background: "rgba(225,29,72,0.04)", border: "1px solid rgba(225,29,72,0.1)" }}>
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#E11D48" }} />
                <p className="text-xs" style={{ color: "#6B7280" }}>
                  При записи через сайт — скидка{" "}
                  <span className="font-bold" style={{ color: "#E11D48" }}>−10%</span> автоматически
                </p>
              </div>

              <button type="submit"
                className="w-full flex items-center justify-center gap-3 py-4 font-bold text-sm rounded-sm transition-all btn-primary"
              >
                <Send size={16} />
                Отправить заявку
              </button>

              <p className="text-xs text-center" style={{ color: "#D1D5DB" }}>
                Нажимая кнопку, вы соглашаетесь с <a href="/privacy" className="underline" style={{ color: "#9CA3AF" }}>политикой обработки персональных данных</a>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
