"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

export default function Footer() {
  const { t } = useTranslation();

  const sections = [
    {
      title: t("nav.home"),
      items: [
        { href: "/about", label: t("nav.about") },
        { href: "/opportunities", label: t("nav.opportunities") },
        { href: "/dashboard", label: t("nav.dashboard") },
      ],
    },
    {
      title: t("categories.training"),
      items: [
        { href: "/opportunities?category=Internship", label: t("opportunities.internship") },
        { href: "/opportunities?category=Scholarship", label: t("opportunities.scholarship") },
        { href: "/opportunities?category=Online%20course", label: t("filters.onlineCourse") },
      ],
    },
  ];

  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" />
                </svg>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                KaarYab
              </span>
              <span className="ml-1 text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                Afghanistan
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {t("footer.tagline")}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["EN", "فارسی", "پښتو"].map((lang) => (
                <span key={lang} className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                {section.title}
              </h4>
              <ul className="mt-4 space-y-2">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm px-6 py-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {t("footer.copyright")}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            📚 {t("footer.note")}
          </p>
        </div>
      </div>
    </footer>
  );
}
