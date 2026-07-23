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
    <div className="space-y-12">
      <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-10 shadow-xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold">Opportunities</h1>
            <p className="mt-3 text-blue-100 max-w-2xl text-lg">
              Filter and discover the latest jobs, internships, scholarships, and remote opportunities for Afghan youth.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 w-full lg:w-auto">
            {[
              { label: "Total", value: counts.total, icon: "📋", bg: "bg-white/20" },
              { label: "Jobs", value: counts.jobs, icon: "💼", bg: "bg-white/20" },
              { label: "Internships", value: counts.internships, icon: "📈", bg: "bg-white/20" },
              { label: "Scholarships", value: counts.scholarships, icon: "🎓", bg: "bg-white/20" },
            ].map((card) => (
              <div key={card.label} className={`rounded-2xl p-5 backdrop-blur ${card.bg}`}>
                <p className="text-sm text-blue-100">{card.label}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-2xl">{card.icon}</span>
                  <p className="text-3xl font-bold">{card.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[340px_1fr]">
        <aside className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-lg space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Search & Filters</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Narrow results by keyword, category, location, type, and deadline.</p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search opportunities..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  {categories.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Location</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  {locations.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Work Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  {types.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Deadline</label>
                <select
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  {deadlineOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Sort By</label>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  {sortOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </aside>

        <div className="space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div>
              <p className="text-slate-900 dark:text-white font-semibold text-lg">Showing {sorted.length} of {opportunities.length} opportunities</p>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Use filters to narrow your search</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {deadlineOptions.slice(1).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setDeadline(option)}
                  className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${deadline === option ? "bg-blue-600 text-white shadow-md" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"}`}
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
              <div className="col-span-full rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 p-16 text-center bg-slate-50 dark:bg-slate-900/50">
                <div className="flex flex-col items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                    <span className="text-3xl">🔍</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">No opportunities found</h3>
                  <p className="text-slate-600 dark:text-slate-400 max-w-md">No opportunities match your active filters. Try clearing the search or changing categories.</p>
                  <button
                    onClick={() => {
                      setSearch("");
                      setCategory("All");
                      setLocation("All");
                      setType("All");
                      setDeadline("All");
                    }}
                    className="mt-4 px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
