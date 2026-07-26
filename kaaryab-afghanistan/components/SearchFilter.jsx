"use client";

import { useTranslation } from "@/lib/i18n";

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

const workTypes = ["All", "Remote", "On-site", "Hybrid"];

const deadlineOptions = [
  { value: "all", label: "all" },
  { value: "7", label: "7 days" },
  { value: "14", label: "14 days" },
  { value: "30", label: "30 days" },
];

const getCategoryKey = (category) => {
  switch (category) {
    case "All":
      return "opportunities.all";
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

const getTypeKey = (type) => {
  switch (type) {
    case "All":
      return "opportunities.all";
    case "Remote":
      return "opportunities.remote";
    case "On-site":
      return "opportunities.onSite";
    case "Hybrid":
      return "opportunities.hybrid";
    default:
      return "opportunities.all";
  }
};

const deadlineLabels = {
  all: "filters.deadline",
  "7": "filters.deadline",
  "14": "filters.next14Days",
  "30": "filters.next30Days",
};

export default function SearchFilter({ filters, onChange, resultCount }) {
  const { t } = useTranslation();
  const set = (key, value) => onChange({ ...filters, [key]: value });

  return (
    <aside className="sticky top-24 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-lg">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t("filters.search")}</h2>
        {typeof resultCount === "number" && (
          <span className="rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-200 px-3 py-1 text-xs font-bold tabular-nums">
            {resultCount}
          </span>
        )}
      </div>

      <div className="mt-5 space-y-5">
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {t("filters.search")}
          </label>
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => set("search", e.target.value)}
              placeholder={t("filters.searchPlaceholder")}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-10 pr-3 py-3 text-sm text-slate-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {t("filters.category")}
          </label>
          <select
            value={filters.category}
            onChange={(e) => set("category", e.target.value)}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-3 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{t(getCategoryKey(c))}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {t("filters.workType")}
          </label>
          <select
            value={filters.workType}
            onChange={(e) => set("workType", e.target.value)}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-3 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            {workTypes.map((w) => (
              <option key={w} value={w}>{t(getTypeKey(w))}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {t("filters.location")}
          </label>
          <input
            type="text"
            value={filters.location}
            onChange={(e) => set("location", e.target.value)}
            placeholder={t("filters.locationPlaceholder")}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-3 text-sm text-slate-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {t("filters.deadline")}
          </label>
          <select
            value={filters.deadline}
            onChange={(e) => set("deadline", e.target.value)}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-3 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            {deadlineOptions.map((d) => (
              <option key={d.value} value={d.value}>{d.value === "all" ? t("opportunities.all") : t(deadlineLabels[d.value] || "filters.deadline")}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {t("filters.sortBy")}
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => set("sortBy", e.target.value)}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-3 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="newest">{t("filters.newest")}</option>
            <option value="deadlineSoon">{t("filters.deadlineSoon")}</option>
            <option value="deadlineLatest">{t("filters.deadlineLatest")}</option>
          </select>
        </div>

        <button
          type="button"
          onClick={() =>
            onChange({
              search: "",
              category: "All",
              workType: "All",
              location: "",
              deadline: "all",
              sortBy: "newest",
            })
          }
          className="w-full rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 px-3 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          {t("filters.clearFilters")}
        </button>
      </div>
    </aside>
  );
}
