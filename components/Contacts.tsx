"use client";

import { useState } from "react";
import { Send, Phone } from "lucide-react";
import SmartMap from "./SmartMap";

export default function Contacts() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    const text = encodeURIComponent(
      `Здравствуйте! Хочу записаться на обучение.\n\n` +
      `Имя: ${form.name}\n` +
      `Телефон: ${form.phone}\n` +
      (form.message.trim() ? `Сообщение: ${form.message}\n` : "") +
      `\n(заявка с сайта amurauto.kz)`
    );
    window.open(`https://wa.me/77776667096?text=${text}`, "_blank");
    setSent(true);
  };

  return (
    <section
      id="contacts"
      className="py-24 relative overflow-hidden"
      style={{ background: "#050505" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 80%, rgba(204,255,0,0.025) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 text-center">
          <div
            className="font-mono text-[11px] tracking-[0.25em] mb-3"
            style={{ color: "rgba(204,255,0,0.45)" }}
          >
            ◈ CONTACT_MODULE // 5 BRANCHES ACTIVE
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            Мы рядом —{" "}
            <span style={{ color: "#ccff00" }}>5 филиалов</span>
          </h2>
          <p className="mt-3 text-base" style={{ color: "rgba(255,255,255,0.35)" }}>
            Единый колл-центр:{" "}
            <a
              href="tel:87776667096"
              className="font-semibold transition-colors"
              style={{ color: "#ccff00" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.textShadow =
                  "0 0 12px rgba(204,255,0,0.7)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.textShadow = "none")
              }
            >
              8-777-666-70-96
            </a>
          </p>
        </div>

        {/* Smart Map */}
        <div className="mb-14">
          <SmartMap />
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          <h3
            className="text-xl font-bold text-white mb-6 font-mono"
            style={{ color: "rgba(204,255,0,0.8)" }}
          >
            ◈ ЗАПИСАТЬСЯ НА ОБУЧЕНИЕ
          </h3>

          {sent ? (
            <div
              className="rounded-2xl p-12 text-center"
              style={{
                background: "rgba(204,255,0,0.04)",
                border: "1px solid rgba(204,255,0,0.25)",
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(204,255,0,0.1)", border: "1px solid rgba(204,255,0,0.3)" }}
              >
                <Send size={28} style={{ color: "#ccff00" }} />
              </div>
              <h4 className="text-white font-bold text-xl mb-2">
                Заявка отправлена!
              </h4>
              <p style={{ color: "rgba(255,255,255,0.4)" }}>
                Мы свяжемся с вами в ближайшее время.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl p-8 space-y-5"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(204,255,0,0.1)",
              }}
            >
              <div>
                <label
                  className="text-sm mb-1.5 block"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  Ваше имя
                </label>
                <input
                  type="text"
                  required
                  placeholder="Как вас зовут?"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none transition-all text-sm"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(204,255,0,0.5)";
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(255,255,255,0.08)";
                  }}
                />
              </div>
              <div>
                <label
                  className="text-sm mb-1.5 block"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  Телефон
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+7 777 000-00-00"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none transition-all text-sm"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(204,255,0,0.5)";
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(255,255,255,0.08)";
                  }}
                />
              </div>
              <div>
                <label
                  className="text-sm mb-1.5 block"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  Вопрос или комментарий{" "}
                  <span style={{ color: "rgba(255,255,255,0.2)" }}>
                    (необязательно)
                  </span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Какой пакет вас интересует? Удобное время?"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none transition-all text-sm resize-none"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(204,255,0,0.5)";
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(255,255,255,0.08)";
                  }}
                />
              </div>
              <button
                type="submit"
                className="w-full font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                style={{ background: "#ccff00", color: "#050505" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 24px rgba(204,255,0,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <Send size={18} />
                Отправить заявку
              </button>
              <p
                className="text-xs text-center"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                Нажимая кнопку, вы соглашаетесь с{" "}
              <a href="/privacy" className="underline transition-colors" style={{ color: "rgba(204,255,0,0.5)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ccff00")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(204,255,0,0.5)")}>
                политикой обработки персональных данных
              </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
