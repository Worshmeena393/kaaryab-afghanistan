"use client";

import Link from "next/link";

export default function Hero({
  eyebrow,
  title,
  description,
  primaryHref = "/opportunities",
  primaryLabel = "Browse Opportunities",
  secondaryHref = "/add-opportunity",
  secondaryLabel = "Add Opportunity",
  className = "",
}) {
  return (
    <section className={`${className} rounded-[2rem] p-10 md:p-16 shadow-sm`}>
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600 dark:text-sky-400">{eyebrow}</p>
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-slate-50">{title}</h1>
        <p className="mx-auto max-w-3xl text-lg text-slate-600 dark:text-slate-300">{description}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={primaryHref} className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3 text-white shadow-lg shadow-blue-600/10 hover:bg-blue-700 transition">
            {primaryLabel}
          </Link>
          <Link href={secondaryHref} className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-3 text-slate-900 hover:bg-slate-100 transition dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900">
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
