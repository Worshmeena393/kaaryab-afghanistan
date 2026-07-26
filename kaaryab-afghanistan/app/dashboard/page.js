"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getFavorites, getMessages, getStoredOpportunities } from "@/lib/storage";
import { useTranslation } from "@/lib/i18n";
import DashboardCard from "@/components/DashboardCard";
import EmptyState from "@/components/EmptyState";

const getCategoryKey = (category) => {
  switch (category) {
    case "Job":
      return "opportunities.job";
    case "Internship":
      return "opportunities.internship";
    case "Scholarship":
      return "opportunities.scholarship";
    case "Online course":
      return "filters.onlineCourse";
    case "Remote work":
      return "opportunities.remoteWork";
    case "Volunteer work":
      return "opportunities.volunteerWork";
    case "Advanced Training":
      return "opportunities.advancedTraining";
    case "Professional Development":
      return "opportunities.professionalDevelopment";
    default:
      return "opportunities.all";
  }
};

const totalIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const favIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const msgIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const jobIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const internshipIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
    <path d="M3 3v18h18" />
    <path d="M18 9l-5-5-5 5" />
    <path d="M13 4v8" />
  </svg>
);

const scholarshipIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

export default function Dashboard() {
  const { t } = useTranslation();
  const [opportunities, setOpportunities] = useState([]);
  const [saved, setSaved] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpportunities(getStoredOpportunities());
      setSaved(getFavorites());
      setMessages(getMessages());
      setLoading(false);
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  const stats = useMemo(() => {
    const jobs = opportunities.filter((item) => item.category === "Job").length;
    const internships = opportunities.filter((item) => item.category === "Internship").length;
    const scholarships = opportunities.filter((item) => item.category === "Scholarship").length;
    const remote = opportunities.filter((item) => item.type === "Remote").length;
    return { jobs, internships, scholarships, remote };
  }, [opportunities]);

  const upcoming = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return opportunities
      .map((item) => {
        const deadlineDate = new Date(item.deadline);
        deadlineDate.setHours(0, 0, 0, 0);
        const msDiff = deadlineDate.getTime() - now.getTime();
        const daysLeft = Math.ceil(msDiff / 86400000);
        return { ...item, daysLeft };
      })
      .filter((item) => item.daysLeft >= 0 && item.daysLeft <= 30)
      .sort((a, b) => a.daysLeft - b.daysLeft)
      .slice(0, 4);
  }, [opportunities]);

  const recent = useMemo(() => {
    return [...opportunities].slice().reverse().slice(0, 5);
  }, [opportunities]);

  const categoryDistribution = useMemo(() => {
    const order = ["Job", "Internship", "Scholarship", "Online course", "Remote work", "Volunteer work", "Advanced Training", "Professional Development"];
    const counts = order.map((cat) => ({
      category: cat,
      count: opportunities.filter((item) => item.category === cat).length,
    }));
    const total = opportunities.length || 1;
    return counts
      .filter((c) => c.count > 0)
      .map((c) => ({ ...c, pct: Math.round((c.count / total) * 100) }));
  }, [opportunities]);

  return (
    <div className="space-y-8 md:space-y-10 lg:space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 pb-16 md:pb-20">
      <div className="rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[2.5rem] bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 text-white p-5 sm:p-7 md:p-10 shadow-xl overflow-hidden relative">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-indigo-400/20 rounded-full blur-3xl" aria-hidden="true" />
        <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="uppercase tracking-[0.25em] text-xs sm:text-sm text-sky-100/80 font-semibold">{t("dashboard.title")}</p>
            <h1 className="mt-2 sm:mt-3 font-extrabold leading-[1.1] text-[clamp(1.75rem,4vw,2.75rem)]">{t("dashboard.yourOpportunityOverview")}</h1>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-100/90 leading-relaxed">{t("dashboard.subtitle")}</p>
          </div>
          <Link
            href="/add-opportunity"
            className="inline-flex items-center justify-center rounded-full bg-white/15 px-5 sm:px-6 py-3 sm:py-3.5 text-white ring-1 ring-white/30 hover:bg-white/25 hover:ring-white/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 min-h-[48px] font-semibold text-sm sm:text-base self-start md:self-center"
          >
            <span className="mr-2 text-base">+</span>
            {t("nav.addOpportunity")}
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-32 sm:h-36 rounded-2xl sm:rounded-3xl bg-slate-200/60 dark:bg-slate-800/60 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-5 grid-cols-2 lg:grid-cols-3">
          <DashboardCard title={t("dashboard.totalOpportunities")} value={opportunities.length} icon={totalIcon} gradient="from-blue-500 via-blue-600 to-indigo-700" />
          <DashboardCard title={t("dashboard.yourFavorites")} value={saved.length} icon={favIcon} gradient="from-pink-500 via-rose-500 to-red-600" />
          <DashboardCard title={t("dashboard.messages")} value={messages.length} icon={msgIcon} gradient="from-emerald-500 via-teal-600 to-green-700" />
          <DashboardCard title={t("opportunities.job")} value={stats.jobs} icon={jobIcon} gradient="from-indigo-500 via-violet-600 to-purple-700" />
          <DashboardCard title={t("opportunities.internship")} value={stats.internships} icon={internshipIcon} gradient="from-amber-500 via-orange-500 to-red-500" />
          <DashboardCard title={t("opportunities.scholarship")} value={stats.scholarships} icon={scholarshipIcon} gradient="from-fuchsia-500 via-purple-600 to-indigo-700" />
        </div>
      )}

      <div className="grid gap-5 md:gap-6 lg:gap-8 grid-cols-1 lg:grid-cols-2">
        <section className="rounded-2xl sm:rounded-[1.75rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-7 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-300">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </span>
              </div>
              <h2 className="font-bold text-slate-900 dark:text-white text-[clamp(1.1rem,2.5vw,1.5rem)]">{t("dashboard.upcomingDeadlines")}</h2>
              <p className="mt-1.5 text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">{t("dashboard.subtitle")}</p>
            </div>
            <span className="shrink-0 inline-flex items-center rounded-full bg-blue-100 text-blue-700 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold dark:bg-blue-900/40 dark:text-blue-200 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse" />
              {t("dashboard.next30Days")}
            </span>
          </div>
          <div className="mt-5 sm:mt-7 md:mt-8 space-y-3 sm:space-y-4">
            {!loading && upcoming.length > 0 ? (
              upcoming.map((item) => (
                <Link
                  key={item.id}
                  href={`/opportunities/${item.id}`}
                  className="block rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 bg-slate-50/70 dark:bg-slate-800/40 hover:shadow-lg hover:bg-white dark:hover:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-700/60 hover:-translate-y-0.5 transition-all duration-300 group min-h-[64px]"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <div className="min-w-0 flex-1 flex gap-3 sm:gap-4 items-start">
                      <div className={`shrink-0 mt-0.5 inline-flex flex-col items-center justify-center rounded-xl px-2.5 py-2 sm:px-3 sm:py-2.5 ${item.daysLeft <= 3 ? "bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-md" : item.daysLeft <= 7 ? "bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md" : "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md"}`}>
                        <span className="text-xs sm:text-sm font-bold opacity-90 leading-none">
                          {item.daysLeft === 0 ? "TODAY" : item.daysLeft === 1 ? "TMRW" : "DAYS"}
                        </span>
                        <span className="text-lg sm:text-2xl font-black leading-tight">
                          {item.daysLeft <= 1 ? "·" : item.daysLeft}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition text-sm sm:text-base md:text-[0.95rem] leading-snug line-clamp-2">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate">
                          {item.organization} <span className="hidden sm:inline">•</span> <span className="sm:hidden block" />{item.location}
                        </p>
                        <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 font-medium">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 sm:w-3.5 sm:h-3.5">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                          {t("detail.deadline")}: <span className="tabular-nums">{item.deadline}</span>
                        </p>
                      </div>
                    </div>
                    <span className={`sm:mt-1 self-start sm:self-auto shrink-0 inline-flex items-center rounded-full px-3 py-1 text-xs sm:text-sm font-bold ${
                      item.daysLeft === 0
                        ? "bg-red-600 text-white animate-pulse"
                        : item.daysLeft <= 3
                        ? "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-200"
                        : item.daysLeft <= 7
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200"
                        : "bg-blue-600/10 text-blue-700 dark:bg-blue-500/15 dark:text-blue-200"
                    }`}>
                      {item.daysLeft === 0 ? t("card.expiringSoon") : item.daysLeft === 1 ? `${item.daysLeft} ${t("dashboard.daysLeft").replace("days", "day")}` : `${item.daysLeft} ${t("dashboard.daysLeft")}`}
                    </span>
                  </div>
                </Link>
              ))
            ) : loading ? (
              <div className="space-y-3 sm:space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-20 sm:h-24 rounded-xl sm:rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="py-4 sm:py-6">
                <EmptyState
                  icon="📅"
                  tone="gray"
                  title={t("dashboard.noDeadlines30Days")}
                  description="Add new opportunities with upcoming deadlines to see them appear here."
                  actionLabel={t("nav.addOpportunity")}
                  actionHref="/add-opportunity"
                />
              </div>
            )}
          </div>
        </section>

        <section className="rounded-2xl sm:rounded-[1.75rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-7 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M3 3v18h18" />
                <path d="M7 14l4-4 4 4 5-5" />
              </svg>
            </span>
          </div>
          <h2 className="font-bold text-slate-900 dark:text-white text-[clamp(1.1rem,2.5vw,1.5rem)]">{t("dashboard.insightsActions")}</h2>
          <p className="mt-1.5 text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">{t("dashboard.dashboardDesc")}</p>

          <div className="mt-5 sm:mt-7 grid gap-3 sm:gap-4">
            <Link
              href="/favorites"
              className="group rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:border-pink-300 dark:hover:border-pink-700/50 hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 font-bold">{t("dashboard.yourFavorites")}</p>
                  <p className="mt-2 sm:mt-3 font-black text-slate-900 dark:text-white text-[clamp(1.75rem,5vw,2.75rem)] leading-none">{saved.length}</p>
                </div>
                <div className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-300">⭐</div>
              </div>
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                {t("favorites.subtitle")}
                <span className="text-pink-500 group-hover:translate-x-1 transition-transform">→</span>
              </p>
            </Link>
            <Link
              href="/messages"
              className="group rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-700/50 hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 font-bold">{t("messages.title")}</p>
                  <p className="mt-2 sm:mt-3 font-black text-slate-900 dark:text-white text-[clamp(1.75rem,5vw,2.75rem)] leading-none">{messages.length}</p>
                </div>
                <div className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-300">💬</div>
              </div>
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                {t("messages.subtitle")}
                <span className="text-emerald-500 group-hover:translate-x-1 transition-transform">→</span>
              </p>
            </Link>
          </div>
        </section>
      </div>

      {!loading && (
        <div className="grid gap-5 md:gap-6 lg:gap-8 grid-cols-1 lg:grid-cols-2">
          <section className="rounded-2xl sm:rounded-[1.75rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-7 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <line x1="18" y1="20" x2="18" y2="10" />
                      <line x1="12" y1="20" x2="12" y2="4" />
                      <line x1="6" y1="20" x2="6" y2="14" />
                    </svg>
                  </span>
                </div>
                <h2 className="font-bold text-slate-900 dark:text-white text-[clamp(1.1rem,2.5vw,1.5rem)]">Category Distribution</h2>
                <p className="mt-1.5 text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">Opportunities grouped by category</p>
              </div>
              <span className="shrink-0 rounded-full bg-indigo-100 text-indigo-700 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold dark:bg-indigo-900/40 dark:text-indigo-200 whitespace-nowrap">
                {opportunities.length} total
              </span>
            </div>

            {categoryDistribution.length > 0 ? (
              <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
                {categoryDistribution.map((row) => (
                  <div key={row.category}>
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {t(getCategoryKey(row.category))}
                      </span>
                      <span className="text-[11px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 tabular-nums whitespace-nowrap">
                        {row.count} · {row.pct}%
                      </span>
                    </div>
                    <div className="h-2.5 sm:h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-700 ease-out"
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6">
                <EmptyState tone="gray" icon="📊" title="No categories yet" description="Add a few opportunities to visualize distribution." />
              </div>
            )}
          </section>

          <section className="rounded-2xl sm:rounded-[1.75rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-7 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </span>
                </div>
                <h2 className="font-bold text-slate-900 dark:text-white text-[clamp(1.1rem,2.5vw,1.5rem)]">{t("dashboard.recentlyAdded")}</h2>
                <p className="mt-1.5 text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">Latest opportunities submitted</p>
              </div>
              <Link href="/opportunities" className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline whitespace-nowrap inline-flex items-center gap-1 min-h-[44px] justify-center">
                {t("home.viewAll")}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>

            {recent.length > 0 ? (
              <div className="mt-5 sm:mt-7 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="overflow-x-auto -mx-5 sm:-mx-7 md:-mx-8 px-5 sm:px-7 md:px-8 table-scroll">
                  <table className="w-full min-w-[380px] text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-800/60 text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      <tr>
                        <th className="px-3 sm:px-5 py-3 sm:py-4 font-bold whitespace-nowrap">Title</th>
                        <th className="px-3 sm:px-5 py-3 sm:py-4 font-bold whitespace-nowrap">Category</th>
                        <th className="px-3 sm:px-5 py-3 sm:py-4 font-bold whitespace-nowrap">Deadline</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {recent.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                          <td className="px-3 sm:px-5 py-3 sm:py-4">
                            <Link href={`/opportunities/${item.id}`} className="font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 block truncate max-w-[160px] sm:max-w-[240px] text-xs sm:text-sm">
                              {item.title}
                            </Link>
                            <p className="mt-0.5 text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">{item.organization}</p>
                          </td>
                          <td className="px-3 sm:px-5 py-3 sm:py-4 whitespace-nowrap">
                            <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200 px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-bold">
                              {t(getCategoryKey(item.category))}
                            </span>
                          </td>
                          <td className="px-3 sm:px-5 py-3 sm:py-4 text-slate-600 dark:text-slate-300 whitespace-nowrap text-[11px] sm:text-xs tabular-nums">{item.deadline}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="mt-6">
                <EmptyState tone="gray" icon="📝" title="No submissions yet" description="Opportunities you add will appear here." />
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
