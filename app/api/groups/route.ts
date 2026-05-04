import { NextResponse } from "next/server";

export const revalidate = 300;

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTDGz1qaXRo4a3N3T49Vd0REKx6lv-HIH6THweqKUNN8LWCC9jVULPRb5o9xYOLxYCktvhorq-DhMFc/pub?output=csv";

export type Group = {
  id:        string;
  branch:    string;
  lang:      "RU" | "KZ";
  format:    string;
  days:      string;
  morning:   string;
  evening:   string;
  startDate: string;
};

/* ── CSV row parser (handles quoted fields) ── */
function parseRow(line: string): string[] {
  const values: string[] = [];
  let cur = "", inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') { inQ = !inQ; continue; }
    if (ch === "," && !inQ) { values.push(cur.trim()); cur = ""; continue; }
    cur += ch;
  }
  values.push(cur.trim());
  return values;
}

/* ── Normalize language: "KZ", "kz", "казах" → "KZ"; всё остальное → "RU" ── */
function normLang(raw: string): "RU" | "KZ" {
  const v = raw.toUpperCase().trim();
  if (v === "KZ" || v.startsWith("КАЗ") || v.startsWith("KAZ")) return "KZ";
  return "RU";
}

/* ── Normalize format: привести к одному из трёх значений ── */
function normFormat(raw: string): string {
  const v = raw.toLowerCase().trim();
  if (v.includes("выход"))    return "Выходного дня";
  if (v.includes("дистан") || v.includes("zoom") || v.includes("онлайн") || v.includes("online"))
                               return "Дистанционно";
  return "Оффлайн";
}

/* ── Найти значение по частичному совпадению заголовка ── */
function findByKey(
  headers: string[],
  vals: string[],
  ...keywords: string[]
): string {
  const idx = headers.findIndex((h) =>
    keywords.some((kw) => h.includes(kw))
  );
  return idx >= 0 ? (vals[idx] ?? "").trim() : "";
}

export async function GET() {
  try {
    const res = await fetch(CSV_URL, { next: { revalidate: 300 } });
    if (!res.ok) return NextResponse.json([]);

    const text  = await res.text();
    const lines = text.trim().split(/\r?\n/);
    if (lines.length < 2) return NextResponse.json([]);

    const headers = parseRow(lines[0]).map((h) =>
      h.toLowerCase().replace(/\s+/g, " ").trim()
    );

    const groups: Group[] = lines
      .slice(1)
      .map((line, idx) => {
        const vals = parseRow(line);

        // Ищем по ключевым словам в заголовке
        const branch    = findByKey(headers, vals, "филиал");
        const langRaw   = findByKey(headers, vals, "язык", "lang");
        const fmtRaw    = findByKey(headers, vals, "формат", "format");
        const days      = findByKey(headers, vals, "учебные", "дни", "days");
        const morning   = findByKey(headers, vals, "утро", "morning");
        const evening   = findByKey(headers, vals, "вечер", "evening");
        const startDate = findByKey(headers, vals, "дата", "старт", "start");

        if (!branch) return null;

        return {
          id:        String(idx + 1),
          branch,
          lang:      normLang(langRaw),
          format:    normFormat(fmtRaw),
          days,
          morning,
          evening,
          startDate,
        } satisfies Group;
      })
      .filter((g): g is Group => g !== null && g.branch !== "");

    return NextResponse.json(groups);
  } catch {
    return NextResponse.json([]);
  }
}
