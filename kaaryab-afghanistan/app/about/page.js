"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

export default function About() {
  const { t } = useTranslation();

  const stats = [
    { number: "500+", label: t("home.totalOpportunities") },
    { number: "1000+", label: t("about.members") },
    { number: "50+", label: t("about.partners") },
    { number: "24/7", label: t("about.support") },
  ];

  return (
    <div className="space-y-10 md:space-y-14 pt-8 md:space-y-16 md:pt-12">
      <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-blue-50 px-5 sm:px-6 py-10 sm:py-14 shadow-sm dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 md:px-10 md:py-20">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-blue-500/10 to-transparent dark:from-blue-400/10" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] sm:tracking-[0.24em] text-blue-600 dark:text-sky-400">
            {t("about.title")}
          </p>
          <h1 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t("about.heroTitle")}
          </h1>
          <p className="mx-auto mt-4 sm:mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            {t("about.heroSubtitle")}
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-6 sm:p-8 md:p-12 text-white shadow-xl">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-indigo-400/10 blur-3xl" />
        <div className="relative grid items-center gap-8 md:gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-5 sm:mb-7 inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-white/15 text-xl sm:text-2xl ring-1 ring-white/20 backdrop-blur-sm">
              <span aria-hidden="true">🚀</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight">
              {t("about.missionTitle")}
            </h2>
            <p className="mt-4 sm:mt-5 max-w-2xl text-sm sm:text-base md:text-lg leading-7 md:leading-8 text-blue-50">
              {t("about.missionText")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group rounded-2xl border border-white/15 bg-white/5 p-4 sm:p-6 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
              >
                <p className="bg-gradient-to-b from-white to-blue-100 bg-clip-text text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-transparent">
                  {stat.number}
                </p>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm md:text-base font-medium text-blue-100">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white px-5 sm:px-6 md:px-10 py-8 sm:py-10 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] sm:tracking-[0.24em] text-blue-600 dark:text-sky-400">
              {t("about.ctaEyebrow")}
            </p>
            <h2 className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {t("about.ctaTitle")}
            </h2>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-base leading-7 text-slate-600 dark:text-slate-300">
              {t("about.ctaText")}
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/opportunities"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 sm:px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 min-h-[44px]"
            >
              {t("favorites.browseOpportunities")}
            </Link>
            <Link
              href="/add-opportunity"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 sm:px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 min-h-[44px]"
            >
              {t("nav.addOpportunity")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
