"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSelector from "@/components/LanguageSelector";
import { useTranslation } from "@/lib/i18n";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const navLinks = [
    { href: "/", key: "home" },
    { href: "/about", key: "about" },
    { href: "/opportunities", key: "opportunities" },
    { href: "/dashboard", key: "dashboard" },
    { href: "/favorites", key: "favorites" },
    { href: "/messages", key: "messages" },
    { href: "/contact", key: "contact" },
  ];

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 p-3 shadow-lg shadow-blue-500/30">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2C13.2386 2 11 4.23858 11 7V8 7 10 8 12 9V26H10V27H22V26H20V9C20 8 21 7 21 7V7C21 4.23858 18.7614 2 16 2Z" fill="#ffffff" opacity="0.9" />
              <path d="M12 18H20V20H12V18ZM12 14H20V16H12V14Z" fill="#e0e7ff" />
              <path d="M24.5 5.5L26.5 7.5L22.5 11.5L20.5 9.5L24.5 5.5Z" fill="#ffffff" />
            </svg>
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">KaarYab Afghanistan</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t("home.findGoals")}
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 md:hidden"
          >
            <span className="sr-only">Toggle menu</span>
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
              <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <div className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  pathname === link.href
                    ? "bg-sky-600 text-white shadow-sm shadow-sky-500/20"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
                }`}
              >
                {t(`nav.${link.key}`)}
              </Link>
            ))}
            <Link
              href="/add-opportunity"
              className="rounded-full bg-gradient-to-r from-blue-600 to-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20"
            >
              {t("nav.addOpportunity")}
            </Link>
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-200/80 bg-slate-50 px-4 py-4 dark:border-slate-800/80 dark:bg-slate-950">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block rounded-3xl px-4 py-3 text-sm font-medium transition ${
                  pathname === link.href
                    ? "bg-slate-900 text-white"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
                }`}
              >
                {t(`nav.${link.key}`)}
              </Link>
            ))}
            <Link
              href="/add-opportunity"
              className="block rounded-3xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white"
            >
              {t("nav.addOpportunity")}
            </Link>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
