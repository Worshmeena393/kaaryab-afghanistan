"use client";

import { createContext, useContext, useState, useEffect } from "react";
import en from "@/locales/en.json";
import fa from "@/locales/fa.json";
import ps from "@/locales/ps.json";

const LANGUAGE_KEY = "kaarYab-language";

const translations = {
  en,
  fa,
  ps,
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState("en");

  // Initialize on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(LANGUAGE_KEY);
      if (stored && ["en", "fa", "ps"].includes(stored)) {
        setLanguageState(stored);
        setDocumentDirection(stored);
      }
    }
  }, []);

  const setLanguage = (lang) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem(LANGUAGE_KEY, lang);
      setDocumentDirection(lang);
    }
  };

  const setDocumentDirection = (lang) => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "en" ? "ltr" : "rtl";
  };

  const t = (key) => {
    const keys = key.split(".");
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}
