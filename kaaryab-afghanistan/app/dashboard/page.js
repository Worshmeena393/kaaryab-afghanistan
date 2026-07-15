"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getFavorites, getMessages, getStoredOpportunities } from "@/lib/storage";

export default function Dashboard() {
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
            <p className="uppercase tracking-[0.3em] text-sm text-sky-100/80">Dashboard</p>
            <h1 className="mt-3 text-4xl font-extrabold">Your opportunity overview</h1>
            <p className="mt-4 max-w-2xl text-slate-100/90">Monitor opportunity count, saved favorites, messages, and deadlines in one place.</p>
          </div>
          <Link href="/add-opportunity" className="inline-flex items-center justify-center rounded-full bg-white/10 px-6 py-3 text-white ring-1 ring-white/30 hover:bg-white/20 transition">
            Add opportunity
          </Link>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {[
          { title: "Total opportunities", value: opportunities.length, color: "from-slate-100 to-slate-50 text-slate-900" },
          { title: "Saved favorites", value: saved.length, color: "from-sky-100 to-sky-50 text-slate-900" },
          { title: "Messages", value: messages.length, color: "from-emerald-100 to-emerald-50 text-slate-900" },
          { title: "Jobs", value: stats.jobs, color: "from-blue-100 to-blue-50 text-slate-900" },
          { title: "Internships", value: stats.internships, color: "from-purple-100 to-purple-50 text-slate-900" },
          { title: "Scholarships", value: stats.scholarships, color: "from-yellow-100 to-yellow-50 text-slate-900" },
        ].map((card) => (
          <div key={card.title} className={`rounded-[1.75rem] bg-gradient-to-br ${card.color} p-6 shadow-sm border border-slate-200/80`}>
            <p className="text-sm uppercase tracking-[0.2em]">{card.title}</p>
            <p className="mt-4 text-3xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-[2rem] bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Upcoming deadlines</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">Keep track of the next opportunities closing soon.</p>
            </div>
            <span className="rounded-full bg-blue-100 text-blue-700 px-4 py-2 text-sm dark:bg-blue-900/40 dark:text-blue-200">Next 30 days</span>
          </div>
          <div className="mt-8 space-y-4">
            {upcoming.length > 0 ? (
              upcoming.map((item) => (
                <div key={item.id} className="rounded-3xl border border-slate-200 dark:border-slate-800 p-5 bg-slate-50 dark:bg-slate-900">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-slate-900 dark:text-white">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.organization} • {item.location}</p>
                    </div>
                    <span className="rounded-full bg-blue-600/10 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-500/15 dark:text-blue-200">{item.daysLeft}d left</span>
                  </div>
                  <p className="mt-3 text-slate-600 dark:text-slate-300">Deadline: {item.deadline}</p>
                </div>
              ))
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 p-8 text-center text-slate-500 dark:text-slate-400">
                No deadlines in the next 30 days.
              </div>
            )}
          </div>
        </section>

        <section className="rounded-[2rem] bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Insights & actions</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Use the dashboard to review saved items, respond to messages, or add new opportunities.</p>

          <div className="mt-8 grid gap-4">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 p-5 bg-slate-50 dark:bg-slate-900">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Saved items</p>
              <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">{saved.length}</p>
              <p className="mt-2 text-slate-600 dark:text-slate-300">Items you marked as favorites are available across the platform.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 p-5 bg-slate-50 dark:bg-slate-900">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Messages</p>
              <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">{messages.length}</p>
              <p className="mt-2 text-slate-600 dark:text-slate-300">Review recent messages and applicant notes from the community.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
