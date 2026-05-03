"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { ru, kz, type Dict, type Lang } from "@/lib/i18n";

interface LangContextValue {
  lang:    Lang;
  setLang: (l: Lang) => void;
  t:       Dict;
}

const LangContext = createContext<LangContextValue>({
  lang:    "ru",
  setLang: () => {},
  t:       ru,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ru");

  /* Restore from localStorage on first render */
  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang") as Lang | null;
      if (saved === "ru" || saved === "kz") setLangState(saved);
    } catch {}
  }, []);

  /* Sync <html lang="..."> with current language */
  useEffect(() => {
    document.documentElement.lang = lang === "kz" ? "kk" : "ru";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("lang", l); } catch {}
  };

  const t = lang === "kz" ? kz : ru;

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
