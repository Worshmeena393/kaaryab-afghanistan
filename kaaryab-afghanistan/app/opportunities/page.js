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
      {/* Hero Header Section */}
      <div className="relative rounded-3xl overflow-hidden">
        {/* Background decorative gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700"></div>
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
        
        <div className="relative z-10 p-8 sm:p-12">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
                <span className="text-sm font-medium text-blue-100">✨ Updated daily</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
                Find Your Next <br /><span className="text-blue-200">Opportunity</span>
              </h1>
              <p className="mt-4 text-lg text-blue-100 max-w-2xl">
                Discover curated jobs, internships, scholarships, and remote work tailored for Afghan youth to build their future.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
              {[
                { label: "Total", value: counts.total, icon: "📋" },
                { label: "Jobs", value: counts.jobs, icon: "💼" },
                { label: "Internships", value: counts.internships, icon: "📈" },
                { label: "Scholarships", value: counts.scholarships, icon: "🎓" },
              ].map((card) => (
                <div key={card.label} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 text-center">
                  <span className="text-3xl sm:text-4xl">{card.icon}</span>
                  <p className="text-2xl sm:text-3xl font-bold text-white mt-2">{card.value}</p>
                  <p className="text-xs sm:text-sm text-blue-100 mt-1">{card.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[320px_1fr] items-start">
        {/* Filters Sidebar */}
        <aside className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xl space-y-6 h-fit">
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>🔍</span> Search & Filters
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm">
              Narrow results to find exactly what you're looking for.
            </p>
          </div>

          <div className="space-y-5">
            {/* Search Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <span>🔎</span> Search
              </label>
              <input
                type="text"
                placeholder="Search by title, org, or keywords..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-all duration-200"
              />
            </div>

            {/* Category Select */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <span>📂</span> Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-all duration-200"
              >
                {categories.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Location Select */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <span>📍</span> Location
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-all duration-200"
              >
                {locations.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Work Type Select */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <span>💻</span> Work Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-all duration-200"
              >
                {types.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Deadline Select */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <span>⏰</span> Deadline
              </label>
              <select
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-all duration-200"
              >
                {deadlineOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Sort Select */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <span>🔃</span> Sort By
              </label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-all duration-200"
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Clear Filters Button */}
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("All");
                setLocation("All");
                setType("All");
                setDeadline("All");
                setSort("Newest");
              }}
              className="w-full rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
            >
              🗑️ Clear all filters
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Results Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
            <div>
              <p className="text-slate-900 dark:text-white font-bold text-xl flex items-center gap-2">
                <span>📋</span> Showing {sorted.length} of {opportunities.length} opportunities
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                {sorted.length === 0 ? "Try adjusting your filters" : "Use quick filters below to narrow down further"}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {deadlineOptions.slice(1).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setDeadline(option)}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${deadline === option ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Opportunities Grid */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {sorted.length > 0 ? (
              sorted.map((item) => (
                <OpportunityCard key={item.id} item={item} onDelete={removeOpportunity} />
              ))
            ) : (
              <div className="col-span-full rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700 p-16 text-center bg-slate-50 dark:bg-slate-900/50">
                <div className="flex flex-col items-center gap-5">
                  <div className="h-20 w-20 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                    <span className="text-4xl">🔍</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">No opportunities found</h3>
                  <p className="text-slate-600 dark:text-slate-400 max-w-md text-lg">
                    No opportunities match your active filters. Try clearing the search or changing categories.
                  </p>
                  <button
                    onClick={() => {
                      setSearch("");
                      setCategory("All");
                      setLocation("All");
                      setType("All");
                      setDeadline("All");
                    }}
                    className="mt-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold hover:from-blue-700 hover:to-indigo-800 shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    ✨ Clear All Filters
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
