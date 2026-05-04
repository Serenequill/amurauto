import { NextResponse } from "next/server";

export const revalidate = 300; // кэш 5 минут

// Публичная Google Таблица (опубликована как CSV)
const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTDGz1qaXRo4a3N3T49Vd0REKx6lv-HIH6THweqKUNN8LWCC9jVULPRb5o9xYOLxYCktvhorq-DhMFc/pub?output=csv";

export type Group = {
  id: string;
  branch:    string;   // Филиал
  lang:      "RU" | "KZ";
  format:    string;   // Оффлайн | Дистанционно | Выходного дня
  days:      string;   // Учебные дни
  morning:   string;   // Утро
  evening:   string;   // Вечер
  startDate: string;   // Дата старта
};

/* ── CSV parser ── */
function parseRow(line: string): string[] {
  const values: string[] = [];
  let cur = "";
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') { inQ = !inQ; continue; }
    if (ch === "," && !inQ) { values.push(cur.trim()); cur = ""; continue; }
    cur += ch;
  }
  values.push(cur.trim());
  return values;
}

export async function GET() {
  try {
    const res = await fetch(CSV_URL, { next: { revalidate: 300 } });
    if (!res.ok) return NextResponse.json([]);

    const text = await res.text();
    const lines = text.trim().split(/\r?\n/);
    if (lines.length < 2) return NextResponse.json([]);

    // Заголовки (первая строка) → нормализуем
    const headers = parseRow(lines[0]).map((h) =>
      h.toLowerCase().replace(/\s+/g, " ").trim()
    );

    const groups: Group[] = lines
      .slice(1)
      .map((line, idx) => {
        const vals = parseRow(line);
        const get = (key: string) =>
          (vals[headers.indexOf(key)] ?? "").trim();

        const branch    = get("филиал");
        const langRaw   = get("язык").toUpperCase();
        const format    = get("формат");
        const days      = get("учебные дни");
        const morning   = get("утро");
        const evening   = get("вечер");
        const startDate = get("дата старта");

        if (!branch) return null;

        return {
          id:        String(idx + 1),
          branch,
          lang:      langRaw === "KZ" ? "KZ" : "RU",
          format:    format || "Оффлайн",
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
