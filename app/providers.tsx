"use client";

import { LangProvider } from "@/contexts/LangContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <LangProvider>{children}</LangProvider>;
}
