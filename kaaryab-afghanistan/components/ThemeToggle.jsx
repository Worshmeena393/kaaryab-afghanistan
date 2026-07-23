"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const stored = localStorage.getItem("kaarYab-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored || (prefersDark ? "dark" : "light");
    setMode(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
    console.log("Initial theme:", initial);
    console.log("HTML has dark class:", document.documentElement.classList.contains("dark"));
  }, []);

  const toggleMode = () => {
    const next = mode === "dark" ? "light" : "dark";
    setMode(next);
    localStorage.setItem("kaarYab-theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
    console.log("Theme toggled to:", next);
    console.log("HTML has dark class:", document.documentElement.classList.contains("dark"));
  };

  return (
    <button
      type="button"
      onClick={toggleMode}
      className="rounded-full border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200"
    >
      {mode === "dark" ? "Light" : "Dark"}
    </button>
  );
}
