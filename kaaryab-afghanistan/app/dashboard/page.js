"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getFavorites, getMessages, getStoredOpportunities } from "@/lib/storage";
import { useTranslation } from "@/lib/i18n";

export default function Dashboard() {
  const { t } = useTranslation();
  const [opportunities, setOpportunities] = useState([]);
  const [saved, setSaved] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setOpportunities(getStoredOpportunities());
    setSaved(getFavorites());
    setMessages(getMessages());
  }, []);

  const stats = useMemo(() => {
    const jobs = opportunities.filter((item) => item.category === "Job").length;
    const internships = opportunities.filter((item) => item.category === "Internship").length;
    const scholarships = opportunities.filter((item) => item.category === "Scholarship").length;
    const remote = opportunities.filter((item) => item.type === "Remote").length;
    return { jobs, internships, scholarships, remote };
  }, [opportunities]);

  const upcoming = useMemo(() => {
    return opportunities
      .map((item) => ({ ...item, daysLeft: Math.max(0, Math.ceil((new Date(item.deadline) - new Date()) / 86400000)) }))
      .filter((item) => item.daysLeft <= 30)
      .sort((a, b) => a.daysLeft - b.daysLeft)
      .slice(0, 4);
  }, [opportunities]);

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      <div className="rounded-[2rem] bg-gradient-to-r from-sky-600 to-blue-700 text-white p-10 shadow-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="uppercase tracking-[0.3em] text-sm text-sky-100/80">{t("dashboard.title")}</p>
            <h1 className="mt-3 text-4xl font-extrabold">{t("dashboard.yourOpportunityOverview")}</h1>
            <p className="mt-4 max-w-2xl text-slate-100/90">{t("dashboard.subtitle")}</p>
          </div>
          <Link href="/add-opportunity" className="inline-flex items-center justify-center rounded-full bg-white/10 px-6 py-3 text-white ring-1 ring-white/30 hover:bg-white/20 transition">
            {t("nav.addOpportunity")}
          </Link>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {[
          { title: t("dashboard.totalOpportunities"), value: opportunities.length, icon: "📋", color: "from-slate-100 to-slate-50 text-slate-900" },
          { title: t("dashboard.yourFavorites"), value: saved.length, icon: "⭐", color: "from-sky-100 to-sky-50 text-slate-900" },
          { title: t("dashboard.messages"), value: messages.length, icon: "💬", color: "from-emerald-100 to-emerald-50 text-slate-900" },
          { title: t("opportunities.job"), value: stats.jobs, icon: "💼", color: "from-blue-100 to-blue-50 text-slate-900" },
          { title: t("opportunities.internship"), value: stats.internships, icon: "📈", color: "from-purple-100 to-purple-50 text-slate-900" },
          { title: t("opportunities.scholarship"), value: stats.scholarships, icon: "🎓", color: "from-yellow-100 to-yellow-50 text-slate-900" },
        ].map((card) => (
          <div key={card.title} className={`rounded-2xl bg-gradient-to-br ${card.color} p-8 shadow-lg border border-slate-200/80`}>
            <div className="flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.2em] font-medium">{card.title}</p>
              <span className="text-2xl">{card.icon}</span>
            </div>
            <p className="mt-4 text-4xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 shadow-lg">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t("dashboard.upcomingDeadlines")}</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">{t("dashboard.subtitle")}</p>
            </div>
            <span className="rounded-full bg-blue-100 text-blue-700 px-4 py-2 text-sm font-medium dark:bg-blue-900/40 dark:text-blue-200">{t("dashboard.next30Days")}</span>
          </div>
          <div className="mt-8 space-y-4">
            {upcoming.length > 0 ? (
              upcoming.map((item) => (
                <div key={item.id} className="rounded-xl border border-slate-200 dark:border-slate-800 p-5 bg-slate-50 dark:bg-slate-800/50 hover:shadow-md transition">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-slate-900 dark:text-white">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.organization} • {item.location}</p>
                    </div>
                    <span className="rounded-full bg-blue-600/10 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-500/15 dark:text-blue-200">{item.daysLeft} {t("dashboard.daysLeft")}</span>
                  </div>
                  <p className="mt-3 text-slate-600 dark:text-slate-300">{t("detail.deadline")}: {item.deadline}</p>
                </div>
              ))
            ) : (
              <div className="rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 p-10 text-center text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50">
                <div className="flex flex-col items-center gap-3">
                  <span className="text-3xl">📅</span>
                  <p className="font-medium">{t("dashboard.noDeadlines30Days")}</p>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 shadow-lg">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t("dashboard.insightsActions")}</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">{t("dashboard.dashboardDesc")}</p>

          <div className="mt-8 grid gap-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-6 bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 font-medium">{t("dashboard.yourFavorites")}</p>
                  <p className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">{saved.length}</p>
                </div>
                <span className="text-4xl">⭐</span>
              </div>
              <p className="mt-3 text-slate-600 dark:text-slate-300">{t("favorites.subtitle")}</p>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-6 bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 font-medium">{t("messages.title")}</p>
                  <p className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">{messages.length}</p>
                </div>
                <span className="text-4xl">💬</span>
              </div>
              <p className="mt-3 text-slate-600 dark:text-slate-300">{t("messages.subtitle")}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
