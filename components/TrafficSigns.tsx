"use client";

import { useState, useMemo, useRef } from "react";
import { Search } from "lucide-react";
import { motion, useInView, AnimatePresence, type Variants } from "framer-motion";
import type { ReactElement } from "react";

/* ─────────── Types ─────────── */
type Category = "prohibitory" | "warning" | "priority";

interface Sign {
  id: string;
  name: string;
  category: Category;
  desc: string;
  fine?: string;
  tips?: string;
}

/* ─────────── Sign data ─────────── */
const SIGNS: Sign[] = [
  // ── Запрещающие ──────────────────────────────
  {
    id: "3.1",
    name: "Въезд запрещён",
    category: "prohibitory",
    desc: "Запрещает въезд всех транспортных средств в данном направлении. Устанавливается на дорогах с односторонним движением.",
    fine: "10 МРП (~36 920 ₸)",
    tips: "Часто стоит на выезде с односторонней улицы — всегда проверяйте знаки перед поворотом.",
  },
  {
    id: "3.2",
    name: "Движение запрещено",
    category: "prohibitory",
    desc: "Полный запрет движения всех транспортных средств в обоих направлениях.",
    fine: "10 МРП (~36 920 ₸)",
    tips: "Исключение — ТС спецслужб и жителей прилегающих домов при наличии разрешения.",
  },
  {
    id: "3.4",
    name: "Грузовым ТС запрещено",
    category: "prohibitory",
    desc: "Запрещает движение грузовых автомобилей с разрешённой максимальной массой более 3,5 т.",
    fine: "5 МРП (~18 460 ₸)",
    tips: "Легковые автомобили проехать могут — ограничение только для тяжёлых грузовиков.",
  },
  {
    id: "3.18",
    name: "Поворот направо запрещён",
    category: "prohibitory",
    desc: "Запрещает поворот направо на данном перекрёстке или въезде.",
    fine: "5 МРП (~18 460 ₸)",
    tips: "Временный знак (жёлтый фон) имеет приоритет над стационарным.",
  },
  {
    id: "3.19",
    name: "Поворот налево запрещён",
    category: "prohibitory",
    desc: "Запрещает поворот налево. Разворот в этом месте также запрещён.",
    fine: "5 МРП (~18 460 ₸)",
    tips: "Запрет поворота налево одновременно запрещает разворот — это одно нарушение.",
  },
  {
    id: "3.20",
    name: "Обгон запрещён",
    category: "prohibitory",
    desc: "Запрещает обгон всех транспортных средств, кроме тихоходных, безрельсовых и двухколёсных без коляски.",
    fine: "15 МРП (~55 380 ₸)",
    tips: "Обгон мотоциклов без коляски и тихоходов (до 30 км/ч) всё равно разрешён.",
  },
  {
    id: "3.24",
    name: "Ограничение скорости",
    category: "prohibitory",
    desc: "Запрещает движение со скоростью, превышающей указанную на знаке в км/ч.",
    fine: "5–30 МРП в зависимости от превышения",
    tips: "Действует до знака 3.25 «Конец ограничения скорости», ближайшего перекрёстка или конца населённого пункта.",
  },
  {
    id: "3.27",
    name: "Остановка запрещена",
    category: "prohibitory",
    desc: "Запрещает остановку и стоянку транспортных средств. Действует вдоль всей стороны дороги.",
    fine: "5 МРП (~18 460 ₸) + эвакуация",
    tips: "Нельзя даже кратковременно остановиться. Эвакуатор вызывают незамедлительно.",
  },
  {
    id: "3.28",
    name: "Стоянка запрещена",
    category: "prohibitory",
    desc: "Запрещает стоянку транспортных средств. Остановка (до 5 минут) разрешена.",
    fine: "5 МРП (~18 460 ₸) + эвакуация",
    tips: "В отличие от 3.27, кратковременная остановка до 5 минут допустима.",
  },
  // ── Предупреждающие ──────────────────────────
  {
    id: "1.1",
    name: "Железнодорожный переезд",
    category: "warning",
    desc: "Пересечение дороги с железнодорожным путём без шлагбаума. Водитель обязан самостоятельно убедиться в безопасности.",
    fine: "Проезд на запрещающий сигнал: 20 МРП",
    tips: "Перед переездом без шлагбаума — полная остановка и визуальный контроль в обе стороны.",
  },
  {
    id: "1.11",
    name: "Опасный поворот направо",
    category: "warning",
    desc: "Закругление дороги с малым радиусом или ограниченной видимостью вправо.",
    tips: "Снижайте скорость заблаговременно, держитесь правее своей полосы.",
  },
  {
    id: "1.12",
    name: "Опасный поворот налево",
    category: "warning",
    desc: "Кривая дорога с опасным поворотом налево. Требует снижения скорости и внимания.",
    tips: "На слепых поворотах встречный транспорт может выезжать на вашу полосу.",
  },
  {
    id: "1.17",
    name: "Искусственная неровность",
    category: "warning",
    desc: "Специально созданная неровность для принудительного снижения скорости. Рекомендуемая скорость — 20 км/ч.",
    tips: "Переезжайте медленно — повреждение подвески на скорости от 40 км/ч.",
  },
  {
    id: "1.20",
    name: "Сужение дороги",
    category: "warning",
    desc: "Уменьшение ширины проезжей части с одной или обеих сторон. Требует соблюдения бокового интервала.",
    tips: "Уступите дорогу тому, кто уже въехал на суженный участок.",
  },
  {
    id: "1.22",
    name: "Пешеходный переход",
    category: "warning",
    desc: "Нерегулируемый пешеходный переход. Водитель обязан уступить дорогу пешеходам.",
    fine: "Не уступить пешеходу: 10 МРП (~36 920 ₸)",
    tips: "Снижайте скорость заблаговременно, особенно в темноте — пешеходы плохо видны.",
  },
  {
    id: "1.23",
    name: "Дети",
    category: "warning",
    desc: "Участок дороги вблизи детского учреждения — школы, детского сада или детской площадки.",
    tips: "Будьте готовы к внезапному выбеганию детей. Вблизи школ — не более 20 км/ч.",
  },
  {
    id: "1.25",
    name: "Дорожные работы",
    category: "warning",
    desc: "Проведение ремонтных или строительных работ на проезжей части или вблизи неё.",
    tips: "В зоне работ обгон запрещён. Следуйте указаниям дорожного рабочего-регулировщика.",
  },
  {
    id: "1.31",
    name: "Скользкая дорога",
    category: "warning",
    desc: "Участок дороги с повышенной скользкостью покрытия — лёд, снег, мокрый асфальт, гравий.",
    tips: "Увеличьте дистанцию вдвое. Избегайте резкого торможения, разгона и поворотов.",
  },
  // ── Знаки приоритета ─────────────────────────
  {
    id: "2.1",
    name: "Главная дорога",
    category: "priority",
    desc: "Дорога с преимущественным правом проезда нерегулируемых перекрёстков. Жёлтый ромб с белой каймой.",
    tips: "Водители со второстепенных дорог обязаны уступить вам дорогу — но убедитесь, что они это делают.",
  },
  {
    id: "2.2",
    name: "Конец главной дороги",
    category: "priority",
    desc: "Конец дороги с преимущественным правом проезда перекрёстков.",
    tips: "После этого знака вы на равных правах с пересекающим потоком — будьте внимательны.",
  },
  {
    id: "2.3",
    name: "Уступите дорогу",
    category: "priority",
    desc: "Водитель обязан уступить дорогу транспортным средствам, движущимся по пересекаемой (главной) дороге.",
    fine: "Не уступить: 10 МРП (~36 920 ₸)",
    tips: "На равнозначном перекрёстке уступайте тому, кто едет справа от вас.",
  },
  {
    id: "2.5",
    name: "Движение без остановки запрещено",
    category: "priority",
    desc: "Требует полной остановки перед стоп-линией или краем пересекаемой проезжей части.",
    fine: "Не остановиться: 10 МРП (~36 920 ₸)",
    tips: "Автомобиль должен полностью остановиться — даже если дорога выглядит свободной.",
  },
  {
    id: "2.6",
    name: "Преимущество встречного",
    category: "priority",
    desc: "Запрещает въезд на узкий участок, если это создаст препятствие встречным транспортным средствам.",
    tips: "Подождите, пока весь встречный транспорт не проедет, затем двигайтесь.",
  },
  {
    id: "2.7",
    name: "Преимущество перед встречным",
    category: "priority",
    desc: "Вы имеете преимущество перед встречными транспортными средствами на узком участке дороги.",
    tips: "Встречный обязан уступить — но убедитесь, что он понял и остановился.",
  },
];

/* ─────────── Animation variants ─────────── */
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.055, delayChildren: 0.05 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.38, ease: "easeOut" },
  },
};

/* ─────────── Individual sign SVGs ─────────── */
function SignSVG({ sign }: { sign: Sign }) {
  const svgMap: Record<string, ReactElement> = {
    /* ── PROHIBITORY ── */
    "3.1": (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <circle cx="40" cy="40" r="36" fill="#E11D48" />
        <rect x="13" y="32" width="54" height="16" rx="8" fill="white" />
      </svg>
    ),
    "3.2": (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <circle cx="40" cy="40" r="36" fill="white" stroke="#E11D48" strokeWidth="7" />
        <rect x="15" y="33" width="50" height="14" rx="7" fill="#E11D48" />
        <rect x="33" y="15" width="14" height="50" rx="7" fill="#E11D48" />
      </svg>
    ),
    "3.4": (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <circle cx="40" cy="40" r="36" fill="white" stroke="#E11D48" strokeWidth="5" />
        {/* Truck body */}
        <rect x="14" y="37" width="32" height="13" rx="2" fill="#374151" />
        {/* Cab */}
        <rect x="44" y="39" width="20" height="11" rx="2" fill="#374151" />
        <rect x="46" y="37" width="16" height="8" rx="1" fill="#6b7280" />
        {/* Wheels */}
        <circle cx="22" cy="52" r="4" fill="#111827" />
        <circle cx="36" cy="52" r="4" fill="#111827" />
        <circle cx="55" cy="52" r="4" fill="#111827" />
        {/* Red diagonal */}
        <line x1="14" y1="64" x2="66" y2="18" stroke="#E11D48" strokeWidth="5" strokeLinecap="round" />
      </svg>
    ),
    "3.18": (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <circle cx="40" cy="40" r="36" fill="white" stroke="#E11D48" strokeWidth="5" />
        <path d="M32 55 L32 36 Q32 26 42 26 L54 26" stroke="#374151" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <polygon points="50,19 62,26 50,33" fill="#374151" />
        <line x1="14" y1="64" x2="66" y2="18" stroke="#E11D48" strokeWidth="5" strokeLinecap="round" />
      </svg>
    ),
    "3.19": (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <circle cx="40" cy="40" r="36" fill="white" stroke="#E11D48" strokeWidth="5" />
        <path d="M48 55 L48 36 Q48 26 38 26 L26 26" stroke="#374151" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <polygon points="30,19 18,26 30,33" fill="#374151" />
        <line x1="14" y1="64" x2="66" y2="18" stroke="#E11D48" strokeWidth="5" strokeLinecap="round" />
      </svg>
    ),
    "3.20": (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <circle cx="40" cy="40" r="36" fill="white" stroke="#E11D48" strokeWidth="5" />
        {/* Car 1 — dark, being overtaken */}
        <rect x="12" y="40" width="18" height="11" rx="2" fill="#374151" />
        <rect x="15" y="34" width="12" height="8" rx="1" fill="#6b7280" />
        <circle cx="15" cy="52" r="3.5" fill="#111827" />
        <circle cx="27" cy="52" r="3.5" fill="#111827" />
        {/* Car 2 — red, overtaking */}
        <rect x="42" y="36" width="18" height="11" rx="2" fill="#E11D48" />
        <rect x="45" y="30" width="12" height="8" rx="1" fill="#f87171" />
        <circle cx="45" cy="48" r="3.5" fill="#be123c" />
        <circle cx="57" cy="48" r="3.5" fill="#be123c" />
        {/* Red diagonal */}
        <line x1="14" y1="65" x2="67" y2="17" stroke="#E11D48" strokeWidth="5" strokeLinecap="round" />
      </svg>
    ),
    "3.24": (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <circle cx="40" cy="40" r="36" fill="white" stroke="#E11D48" strokeWidth="6" />
        <text x="40" y="51" textAnchor="middle" fontSize="28" fontWeight="900" fill="#111827" fontFamily="Arial, sans-serif">
          60
        </text>
      </svg>
    ),
    "3.27": (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <circle cx="40" cy="40" r="36" fill="#3b82f6" stroke="#E11D48" strokeWidth="5" />
        <line x1="20" y1="62" x2="62" y2="20" stroke="#E11D48" strokeWidth="9" strokeLinecap="round" />
      </svg>
    ),
    "3.28": (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <circle cx="40" cy="40" r="36" fill="#3b82f6" stroke="#E11D48" strokeWidth="5" />
        <line x1="20" y1="62" x2="62" y2="20" stroke="#E11D48" strokeWidth="7" strokeLinecap="round" />
        <line x1="20" y1="20" x2="62" y2="62" stroke="#E11D48" strokeWidth="7" strokeLinecap="round" />
      </svg>
    ),
    /* ── WARNING ── */
    "1.1": (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <polygon points="40,5 75,70 5,70" fill="#FCD34D" stroke="#E11D48" strokeWidth="4" strokeLinejoin="round" />
        {/* Locomotive */}
        <rect x="26" y="39" width="28" height="17" rx="2" fill="#374151" />
        <rect x="30" y="31" width="20" height="10" rx="2" fill="#374151" />
        <rect x="22" y="48" width="3" height="8" rx="1" fill="#6b7280" />
        <circle cx="31" cy="57" r="4" fill="#1f2937" />
        <circle cx="49" cy="57" r="4" fill="#1f2937" />
        <circle cx="48" cy="34" r="2.5" fill="#FCD34D" />
        <rect x="28" y="42" width="24" height="3" rx="1" fill="#6b7280" />
      </svg>
    ),
    "1.11": (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <polygon points="40,5 75,70 5,70" fill="#FCD34D" stroke="#E11D48" strokeWidth="4" strokeLinejoin="round" />
        <path d="M33 63 Q33 34 52 34" stroke="#374151" strokeWidth="6" strokeLinecap="round" fill="none" />
        <polygon points="48,26 62,36 56,44" fill="#374151" />
      </svg>
    ),
    "1.12": (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <polygon points="40,5 75,70 5,70" fill="#FCD34D" stroke="#E11D48" strokeWidth="4" strokeLinejoin="round" />
        <path d="M47 63 Q47 34 28 34" stroke="#374151" strokeWidth="6" strokeLinecap="round" fill="none" />
        <polygon points="32,26 18,36 24,44" fill="#374151" />
      </svg>
    ),
    "1.17": (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <polygon points="40,5 75,70 5,70" fill="#FCD34D" stroke="#E11D48" strokeWidth="4" strokeLinejoin="round" />
        {/* Speed bump arch */}
        <path d="M19 58 Q40 28 61 58" stroke="#374151" strokeWidth="6" fill="none" strokeLinecap="round" />
        <line x1="17" y1="58" x2="63" y2="58" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
    "1.20": (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <polygon points="40,5 75,70 5,70" fill="#FCD34D" stroke="#E11D48" strokeWidth="4" strokeLinejoin="round" />
        {/* Road narrowing */}
        <line x1="23" y1="63" x2="36" y2="38" stroke="#374151" strokeWidth="5" strokeLinecap="round" />
        <line x1="57" y1="63" x2="44" y2="38" stroke="#374151" strokeWidth="5" strokeLinecap="round" />
        <line x1="36" y1="38" x2="44" y2="38" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
    "1.22": (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <polygon points="40,5 75,70 5,70" fill="#FCD34D" stroke="#E11D48" strokeWidth="4" strokeLinejoin="round" />
        {/* Walking person */}
        <circle cx="40" cy="30" r="5.5" fill="#374151" />
        <line x1="40" y1="36" x2="40" y2="51" stroke="#374151" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="29" y1="44" x2="51" y2="42" stroke="#374151" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="40" y1="51" x2="32" y2="63" stroke="#374151" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="40" y1="51" x2="49" y2="63" stroke="#374151" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    ),
    "1.23": (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <polygon points="40,5 75,70 5,70" fill="#FCD34D" stroke="#E11D48" strokeWidth="4" strokeLinejoin="round" />
        {/* Running child */}
        <circle cx="38" cy="28" r="5" fill="#374151" />
        {/* Body leaning forward */}
        <path d="M38 33 L34 48" stroke="#374151" strokeWidth="4" strokeLinecap="round" />
        {/* Arms */}
        <line x1="31" y1="41" x2="46" y2="38" stroke="#374151" strokeWidth="3.5" strokeLinecap="round" />
        {/* Legs running */}
        <line x1="34" y1="48" x2="27" y2="61" stroke="#374151" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="34" y1="48" x2="42" y2="59" stroke="#374151" strokeWidth="3.5" strokeLinecap="round" />
        {/* Backpack */}
        <rect x="38" y="34" width="7" height="9" rx="2" fill="#6b7280" />
      </svg>
    ),
    "1.25": (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <polygon points="40,5 75,70 5,70" fill="#FCD34D" stroke="#E11D48" strokeWidth="4" strokeLinejoin="round" />
        {/* Worker */}
        <circle cx="38" cy="29" r="5.5" fill="#374151" />
        {/* Hard hat */}
        <path d="M32 28 Q38 20 44 28" stroke="#374151" strokeWidth="3" fill="#F59E0B" strokeLinecap="round" />
        <line x1="38" y1="35" x2="38" y2="50" stroke="#374151" strokeWidth="4" strokeLinecap="round" />
        <line x1="29" y1="43" x2="50" y2="40" stroke="#374151" strokeWidth="3.5" strokeLinecap="round" />
        {/* Shovel */}
        <line x1="50" y1="40" x2="58" y2="27" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="60" cy="24" rx="5" ry="4" fill="#374151" transform="rotate(-30 60 24)" />
        <line x1="38" y1="50" x2="32" y2="63" stroke="#374151" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="38" y1="50" x2="46" y2="63" stroke="#374151" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    ),
    "1.31": (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <polygon points="40,5 75,70 5,70" fill="#FCD34D" stroke="#E11D48" strokeWidth="4" strokeLinejoin="round" />
        {/* Car */}
        <rect x="22" y="40" width="28" height="13" rx="3" fill="#374151" />
        <rect x="26" y="33" width="20" height="9" rx="2" fill="#6b7280" />
        <circle cx="27" cy="54" r="4" fill="#1f2937" />
        <circle cx="43" cy="54" r="4" fill="#1f2937" />
        {/* Skid marks / ice tracks */}
        <path d="M20 57 Q28 53 36 56" stroke="#374151" strokeWidth="2" fill="none" strokeDasharray="3,2" strokeLinecap="round" />
        <path d="M21 62 Q29 58 37 61" stroke="#374151" strokeWidth="2" fill="none" strokeDasharray="3,2" strokeLinecap="round" />
        {/* Snowflake hint */}
        <text x="53" y="48" fontSize="12" fill="#374151" textAnchor="middle">❄</text>
      </svg>
    ),
    /* ── PRIORITY ── */
    "2.1": (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <rect x="16" y="16" width="48" height="48" rx="3" fill="#F59E0B" stroke="white" strokeWidth="5" transform="rotate(45 40 40)" />
      </svg>
    ),
    "2.2": (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        {/* Diamond outline */}
        <polygon points="40,5 75,40 40,75 5,40" fill="white" />
        {/* Yellow upper half */}
        <polygon points="40,5 75,40 40,40 5,40" fill="#F59E0B" />
        {/* Border on top of fill */}
        <polygon points="40,5 75,40 40,75 5,40" fill="none" stroke="#9ca3af" strokeWidth="3" />
        {/* Dividing line */}
        <line x1="5" y1="40" x2="75" y2="40" stroke="#9ca3af" strokeWidth="1.5" />
      </svg>
    ),
    "2.3": (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <polygon points="5,10 75,10 40,72" fill="white" stroke="#E11D48" strokeWidth="5" strokeLinejoin="round" />
      </svg>
    ),
    "2.5": (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <polygon points="27,5 53,5 71,23 71,57 53,75 27,75 9,57 9,23" fill="#E11D48" />
        <text x="40" y="48" textAnchor="middle" fontSize="16" fontWeight="900" fill="white" fontFamily="Arial, sans-serif" letterSpacing="1">
          СТОП
        </text>
        <line x1="22" y1="56" x2="58" y2="56" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    "2.6": (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <rect x="6" y="6" width="68" height="68" rx="10" fill="white" stroke="#e5e7eb" strokeWidth="2" />
        {/* Wide blue arrow UP — oncoming has priority */}
        <polygon points="40,12 54,34 46,34 46,60 34,60 34,34 26,34" fill="#2563eb" />
        {/* Narrow red arrow DOWN — you give way */}
        <polygon points="40,64 47,50 44,50 44,28 36,28 36,50 33,50" fill="#E11D48" />
      </svg>
    ),
    "2.7": (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <rect x="6" y="6" width="68" height="68" rx="10" fill="white" stroke="#e5e7eb" strokeWidth="2" />
        {/* Wide blue arrow DOWN — you have priority */}
        <polygon points="40,68 54,46 46,46 46,20 34,20 34,46 26,46" fill="#2563eb" />
        {/* Narrow red arrow UP — oncoming gives way */}
        <polygon points="40,16 47,30 44,30 44,52 36,52 36,30 33,30" fill="#E11D48" />
      </svg>
    ),
  };

  return (
    svgMap[sign.id] ?? (
      /* Fallback for any sign without a custom SVG */
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <circle cx="40" cy="40" r="36" fill="white" stroke="#9ca3af" strokeWidth="3" />
        <text x="40" y="45" textAnchor="middle" fontSize="13" fill="#374151" fontWeight="700" fontFamily="Arial, sans-serif">
          {sign.id}
        </text>
      </svg>
    )
  );
}

/* ─────────── Sign Card ─────────── */
const CAT_COLOR: Record<Category, string> = {
  prohibitory: "#E11D48",
  warning: "#D97706",
  priority: "#2563eb",
};

function SignCard({ sign }: { sign: Sign }) {
  const [expanded, setExpanded] = useState(false);
  const color = CAT_COLOR[sign.category];

  return (
    <motion.div variants={cardVariants}>
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full text-left rounded-2xl p-4 transition-all"
        style={{
          background: "#fff",
          border: expanded ? `2px solid ${color}` : "1.5px solid #f3f4f6",
          boxShadow: expanded
            ? `0 6px 24px ${color}22`
            : "0 1px 3px rgba(0,0,0,0.07)",
        }}
        onMouseEnter={(e) => {
          if (!expanded) {
            (e.currentTarget as HTMLElement).style.borderColor = `${color}55`;
            (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${color}18`;
          }
        }}
        onMouseLeave={(e) => {
          if (!expanded) {
            (e.currentTarget as HTMLElement).style.borderColor = "#f3f4f6";
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 1px 3px rgba(0,0,0,0.07)";
          }
        }}
      >
        {/* Sign icon */}
        <div className="w-16 h-16 mx-auto mb-3 drop-shadow-sm">
          <SignSVG sign={sign} />
        </div>

        {/* Number badge */}
        <div
          className="text-xs font-black text-center mb-1 font-mono tracking-wide"
          style={{ color }}
        >
          № {sign.id}
        </div>

        {/* Name */}
        <p
          className="text-xs text-center font-semibold leading-tight"
          style={{ color: "#111827" }}
        >
          {sign.name}
        </p>

        {/* Arrow indicator */}
        <div className="flex justify-center mt-2">
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.22 }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              style={{ opacity: 0.4 }}
            >
              <path
                d="M3 5l4 4 4-4"
                stroke="#111827"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>

        {/* Expandable detail panel */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="detail"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.26, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <div
                className="mt-3 pt-3 space-y-2.5"
                style={{ borderTop: `1px solid ${color}22` }}
              >
                {/* Description */}
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "#6b7280" }}
                >
                  {sign.desc}
                </p>

                {/* Fine */}
                {sign.fine && (
                  <div
                    className="flex items-start gap-1.5 rounded-lg px-2.5 py-2"
                    style={{ background: "rgba(217,119,6,0.08)" }}
                  >
                    <span className="text-sm leading-none mt-0.5">💰</span>
                    <p
                      className="text-xs font-semibold leading-snug"
                      style={{ color: "#92400e" }}
                    >
                      {sign.fine}
                    </p>
                  </div>
                )}

                {/* Tips */}
                {sign.tips && (
                  <div
                    className="flex items-start gap-1.5 rounded-lg px-2.5 py-2"
                    style={{ background: `${color}0d` }}
                  >
                    <span className="text-sm leading-none mt-0.5">💡</span>
                    <p
                      className="text-xs leading-snug italic"
                      style={{ color: "#374151" }}
                    >
                      {sign.tips}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}

/* ─────────── Tabs config ─────────── */
type Tab = "all" | Category;

const TABS: { id: Tab; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "prohibitory", label: "Запрещающие" },
  { id: "warning", label: "Предупреждающие" },
  { id: "priority", label: "Приоритет" },
];

/* ─────────── Main section ─────────── */
export default function TrafficSigns() {
  const [tab, setTab] = useState<Tab>("all");
  const [query, setQuery] = useState("");

  /* Scroll-into-view trigger for the stagger animation */
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.08 });

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return SIGNS.filter((s) => {
      const matchCat = tab === "all" || s.category === tab;
      const matchQ =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.id.includes(q) ||
        s.desc.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [tab, query]);

  /* Count per category for tab badges */
  const counts = useMemo(
    () => ({
      all: SIGNS.length,
      prohibitory: SIGNS.filter((s) => s.category === "prohibitory").length,
      warning: SIGNS.filter((s) => s.category === "warning").length,
      priority: SIGNS.filter((s) => s.category === "priority").length,
    }),
    []
  );

  return (
    <section id="signs" className="py-20" style={{ background: "#f9fafb" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <span
            className="inline-block text-sm font-semibold uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
            style={{ color: "#E11D48", background: "rgba(225,29,72,0.08)" }}
          >
            Справочник ПДД
          </span>
          <h2
            className="text-3xl sm:text-4xl font-black mb-3"
            style={{ color: "#111827" }}
          >
            Знаки{" "}
            <span style={{ color: "#E11D48" }}>дорожного движения</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "#6b7280" }}>
            {SIGNS.length} основных знаков ПДД — нажмите на любой знак, чтобы
            узнать описание, штраф и практический совет
          </p>
        </motion.div>

        {/* ── Search + Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.12 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2"
              style={{ color: "#9ca3af" }}
            />
            <input
              type="text"
              placeholder="Поиск по названию или номеру…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-colors"
              style={{
                background: "#fff",
                border: "1.5px solid #e5e7eb",
                color: "#111827",
              }}
              onFocus={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor = "#E11D48")
              }
              onBlur={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor = "#e5e7eb")
              }
            />
          </div>

          {/* Category tabs */}
          <div
            className="flex gap-1 p-1 rounded-xl overflow-x-auto shrink-0"
            style={{ background: "#fff", border: "1.5px solid #e5e7eb" }}
          >
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-1.5"
                style={
                  tab === t.id
                    ? { background: "#E11D48", color: "#fff" }
                    : { color: "#6b7280" }
                }
              >
                {t.label}
                <span
                  className="text-xs px-1.5 py-0.5 rounded-full font-bold"
                  style={
                    tab === t.id
                      ? { background: "rgba(255,255,255,0.25)", color: "#fff" }
                      : { background: "#f3f4f6", color: "#9ca3af" }
                  }
                >
                  {counts[t.id]}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Signs grid with stagger ── */}
        <div ref={sectionRef}>
          {filtered.length === 0 ? (
            <div className="text-center py-16" style={{ color: "#9ca3af" }}>
              <div className="text-4xl mb-3">🔍</div>
              <p className="font-medium">
                Знаки не найдены. Попробуйте другой запрос.
              </p>
            </div>
          ) : (
            <motion.div
              key={tab} /* re-triggers stagger on tab switch */
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
            >
              {filtered.map((sign) => (
                <SignCard key={sign.id} sign={sign} />
              ))}
            </motion.div>
          )}
        </div>

        {/* ── Footer note ── */}
        <p className="text-center text-xs mt-8" style={{ color: "#9ca3af" }}>
          Показано{" "}
          <span className="font-semibold" style={{ color: "#6b7280" }}>
            {filtered.length}
          </span>{" "}
          из {SIGNS.length} знаков · Штрафы указаны согласно КоАП РК (1 МРП ≈ 3 692 ₸)
        </p>
      </div>
    </section>
  );
}
