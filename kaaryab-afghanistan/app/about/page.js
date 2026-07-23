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

  const values = [
    { icon: "🛡️", title: t("about.trust"), desc: t("about.trustDesc") },
    { icon: "🌐", title: t("about.access"), desc: t("about.accessDesc") },
    { icon: "📈", title: t("about.growth"), desc: t("about.growthDesc") },
    { icon: "💡", title: t("about.innovation"), desc: t("about.innovationDesc") },
  ];

  return (
    <div className="space-y-14 pt-2 md:space-y-16 md:pt-4">
      <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-blue-50 px-6 py-14 shadow-sm dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 md:px-10 md:py-20">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-blue-500/10 to-transparent dark:from-blue-400/10" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600 dark:text-sky-400">
            {t("about.title")}
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-6xl">
            {t("about.heroTitle")}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            {t("about.heroSubtitle")}
          </p>
        </div>
      </section>

      <section className="rounded-[2rem] bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-8 text-white shadow-2xl md:p-12">
        <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-2xl backdrop-blur">
              <span aria-hidden="true">🚀</span>
            </div>
            <h2 className="text-3xl font-bold md:text-4xl">{t("about.missionTitle")}</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-blue-100 md:text-lg">
              {t("about.missionText")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/15 bg-white/10 p-5 text-center backdrop-blur"
              >
                <p className="text-3xl font-extrabold md:text-4xl">{stat.number}</p>
                <p className="mt-2 text-sm font-semibold text-blue-100 md:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600 dark:text-sky-400">
            {t("about.valuesEyebrow")}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
            {t("about.ourCoreValues")}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
            {t("about.valuesIntro")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {values.map((item) => (
            <div
              key={item.title}
              className="h-full rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <span className="text-2xl" aria-hidden="true">
                  {item.icon}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white px-6 py-10 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:px-10">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600 dark:text-sky-400">
              {t("about.ctaEyebrow")}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
              {t("about.ctaTitle")}
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
              {t("about.ctaText")}
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/opportunities"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              {t("favorites.browseOpportunities")}
            </Link>
            <Link
              href="/add-opportunity"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
            >
              {t("nav.addOpportunity")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
