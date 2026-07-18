"use client";

import { useMemo, useState } from "react";
import { getStoredOpportunities, deleteOpportunity } from "@/lib/storage";
import OpportunityCard from "@/components/OpportunityCard";

const categories = [
  "All",
  "Job",
  "Internship",
  "Scholarship",
  "Online course",
  "Remote work",
  "Volunteer work",
  "Advanced Training",
  "Professional Development",
];
const types = ["All", "Remote", "On-site", "Hybrid"];
const deadlineOptions = ["All", "Next 14 days", "Next 30 days"];
const sortOptions = ["Newest", "Deadline soon", "Deadline latest"];

export default function Opportunities() {
  const [opportunities, setOpportunities] = useState(getStoredOpportunities());
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");
  const [type, setType] = useState("All");
  const [deadline, setDeadline] = useState("All");
  const [sort, setSort] = useState("Newest");

  const locations = useMemo(
    () => ["All", ...Array.from(new Set(opportunities.map((item) => item.location))).sort()],
    [opportunities]
  );

  const filtered = useMemo(() => {
    return opportunities
      .filter((item) => {
        const query = search.toLowerCase();
        const matchesSearch =
          item.title.toLowerCase().includes(query) ||
          item.organization.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.tags?.some((tag) => tag.toLowerCase().includes(query));

        const matchesCategory = category === "All" || item.category === category;
        const matchesLocation = location === "All" || item.location === location;
        const matchesType = type === "All" || item.type === type;

        let matchesDeadline = true;
        if (deadline !== "All") {
          const days = Math.ceil((new Date(item.deadline) - new Date()) / 86400000);
          if (deadline === "Next 14 days") {
            matchesDeadline = days >= 0 && days <= 14;
          }
          if (deadline === "Next 30 days") {
            matchesDeadline = days >= 0 && days <= 30;
          }
        }

        return matchesSearch && matchesCategory && matchesLocation && matchesType && matchesDeadline;
      })
      .map((item) => ({
        ...item,
        deadlineDate: new Date(item.deadline),
      }));
  }, [category, deadline, location, opportunities, search, type]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sort === "Deadline soon") {
        return a.deadlineDate - b.deadlineDate;
      }
      if (sort === "Deadline latest") {
        return b.deadlineDate - a.deadlineDate;
      }
      return b.deadlineDate - a.deadlineDate;
    });
  }, [filtered, sort]);

  const removeOpportunity = (id) => {
    const updated = deleteOpportunity(id);
    setOpportunities(updated);
  };

  const counts = useMemo(() => ({
    total: opportunities.length,
    jobs: opportunities.filter((item) => item.category === "Job").length,
    internships: opportunities.filter((item) => item.category === "Internship").length,
    scholarships: opportunities.filter((item) => item.category === "Scholarship").length,
  }), [opportunities]);

  return (
    <div className="space-y-10">
      <div className="rounded-[2rem] bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">Opportunities</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-2xl">
              Filter and discover the latest jobs, internships, scholarships, and remote opportunities.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 w-full lg:w-auto">
            {[
              { label: "Total", value: counts.total, accent: "bg-slate-100 dark:bg-slate-900" },
              { label: "Jobs", value: counts.jobs, accent: "bg-sky-100 dark:bg-sky-900/40" },
              { label: "Internships", value: counts.internships, accent: "bg-emerald-100 dark:bg-emerald-900/40" },
              { label: "Scholarships", value: counts.scholarships, accent: "bg-yellow-100 dark:bg-yellow-900/40" },
            ].map((card) => (
              <div key={card.label} className={`rounded-3xl p-4 ${card.accent}`}>
                <p className="text-sm text-slate-500 dark:text-slate-300">{card.label}</p>
                <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{card.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[340px_1fr]">
        <aside className="rounded-[2rem] bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Search & filters</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Narrow results by keyword, category, location, type, and deadline.</p>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Search opportunities"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-3xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-slate-100"
            />

            <div className="grid gap-3">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-3xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-slate-100"
              >
                {categories.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>

              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-3xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-slate-100"
              >
                {locations.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-3xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-slate-100"
              >
                {types.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>

              <select
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full rounded-3xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-slate-100"
              >
                {deadlineOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full rounded-3xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-slate-100"
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        </aside>

        <div className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-slate-600 dark:text-slate-400">Showing {sorted.length} of {opportunities.length} opportunities.</p>
            <div className="flex flex-wrap gap-2">
              {deadlineOptions.slice(1).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setDeadline(option)}
                  className={`rounded-full px-4 py-2 text-sm ${deadline === option ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300"}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {sorted.length > 0 ? (
              sorted.map((item) => (
                <OpportunityCard key={item.id} item={item} onDelete={removeOpportunity} />
              ))
            ) : (
              <div className="col-span-full rounded-[1.5rem] border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center text-slate-500 dark:text-slate-400">
                No opportunities match your active filters. Try clearing the search or changing categories.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
