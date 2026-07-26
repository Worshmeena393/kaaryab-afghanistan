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
    return opportunities
      .map((item) => ({ ...item, daysLeft: Math.max(0, Math.ceil((new Date(item.deadline) - new Date()) / 86400000)) }))
      .filter((item) => item.daysLeft <= 30)
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

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-36 rounded-3xl bg-slate-200/60 dark:bg-slate-800/60 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <DashboardCard title={t("dashboard.totalOpportunities")} value={opportunities.length} icon={totalIcon} gradient="from-blue-500 via-blue-600 to-indigo-700" />
          <DashboardCard title={t("dashboard.yourFavorites")} value={saved.length} icon={favIcon} gradient="from-pink-500 via-rose-500 to-red-600" />
          <DashboardCard title={t("dashboard.messages")} value={messages.length} icon={msgIcon} gradient="from-emerald-500 via-teal-600 to-green-700" />
          <DashboardCard title={t("opportunities.job")} value={stats.jobs} icon={jobIcon} gradient="from-indigo-500 via-violet-600 to-purple-700" />
          <DashboardCard title={t("opportunities.internship")} value={stats.internships} icon={internshipIcon} gradient="from-amber-500 via-orange-500 to-red-500" />
          <DashboardCard title={t("opportunities.scholarship")} value={stats.scholarships} icon={scholarshipIcon} gradient="from-fuchsia-500 via-purple-600 to-indigo-700" />
        </div>
      )}

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
            {!loading && upcoming.length > 0 ? (
              upcoming.map((item) => (
                <Link
                  key={item.id}
                  href={`/opportunities/${item.id}`}
                  className="block rounded-xl border border-slate-200 dark:border-slate-800 p-5 bg-slate-50 dark:bg-slate-800/50 hover:shadow-md hover:bg-white dark:hover:bg-slate-800 transition group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">{item.title}</p>
                      <p className="mt-1 truncate text-sm text-slate-500 dark:text-slate-400">{item.organization} • {item.location}</p>
                    </div>
                    <span className={`shrink-0 rounded-full px-3 py-1 text-sm font-medium ${item.daysLeft <= 7 ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-200" : "bg-blue-600/10 text-blue-700 dark:bg-blue-500/15 dark:text-blue-200"}`}>
                      {item.daysLeft} {t("dashboard.daysLeft")}
                    </span>
                  </div>
                  <p className="mt-3 text-slate-600 dark:text-slate-300">{t("detail.deadline")}: {item.deadline}</p>
                </Link>
              ))
            ) : loading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-20 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="py-4">
                <EmptyState
                  icon="📅"
                  tone="gray"
                  title={t("dashboard.noDeadlines30Days")}
                />
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

      {!loading && (
        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 shadow-lg">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Category Distribution</h2>
                <p className="mt-2 text-slate-600 dark:text-slate-400">Opportunities grouped by category</p>
              </div>
              <span className="rounded-full bg-indigo-100 text-indigo-700 px-4 py-2 text-sm font-medium dark:bg-indigo-900/40 dark:text-indigo-200">
                {opportunities.length} total
              </span>
            </div>

            {categoryDistribution.length > 0 ? (
              <div className="mt-8 space-y-5">
                {categoryDistribution.map((row) => (
                  <div key={row.category}>
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {t(getCategoryKey(row.category))}
                      </span>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 tabular-nums">
                        {row.count} · {row.pct}%
                      </span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-500"
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

          <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 shadow-lg">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t("dashboard.recentlyAdded")}</h2>
                <p className="mt-2 text-slate-600 dark:text-slate-400">Latest opportunities submitted</p>
              </div>
              <Link href="/opportunities" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                {t("home.viewAll")} →
              </Link>
            </div>

            {recent.length > 0 ? (
              <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-800/60 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      <tr>
                        <th className="px-5 py-4 font-semibold">Title</th>
                        <th className="px-5 py-4 font-semibold">Category</th>
                        <th className="px-5 py-4 font-semibold">Deadline</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {recent.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                          <td className="px-5 py-4">
                            <Link href={`/opportunities/${item.id}`} className="font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 truncate block max-w-[220px]">
                              {item.title}
                            </Link>
                            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 truncate">{item.organization}</p>
                          </td>
                          <td className="px-5 py-4">
                            <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200 px-3 py-1 text-xs font-semibold">
                              {t(getCategoryKey(item.category))}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">{item.deadline}</td>
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
