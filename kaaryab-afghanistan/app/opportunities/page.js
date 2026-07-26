"use client";

export const dynamic = "force-dynamic";

import { useMemo, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getStoredOpportunities, deleteOpportunity } from "@/lib/storage";
import OpportunityCard from "@/components/OpportunityCard";
import SearchFilter from "@/components/SearchFilter";
import EmptyState from "@/components/EmptyState";
import { useTranslation } from "@/lib/i18n";

const getDeadlineKey = (deadline) => {
  switch (deadline) {
    case "All":
      return "opportunities.all";
    case "Next 14 days":
      return "filters.next14Days";
    case "Next 30 days":
      return "filters.next30Days";
    default:
      return "opportunities.all";
  }
};

function OpportunitiesContent() {
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const [opportunities, setOpportunities] = useState(getStoredOpportunities());
  const [filters, setFilters] = useState({
    search: "",
    category: "All",
    workType: "All",
    location: "",
    deadline: "all",
    sortBy: "newest",
  });

  useEffect(() => {
    const searchQuery = searchParams.get("search");
    const categoryQuery = searchParams.get("category");
    setFilters((prev) => ({
      ...prev,
      ...(searchQuery ? { search: searchQuery } : null),
      ...(categoryQuery ? { category: categoryQuery } : null),
    }));
    setOpportunities(getStoredOpportunities());
  }, [searchParams]);

  const filtered = useMemo(() => {
    const query = filters.search.toLowerCase();
    return opportunities
      .filter((item) => {
        const matchesSearch =
          !query ||
          item.title.toLowerCase().includes(query) ||
          item.organization.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.tags?.some((tag) => tag.toLowerCase().includes(query));

        const matchesCategory = filters.category === "All" || item.category === filters.category;
        const matchesWorkType = filters.workType === "All" || item.type === filters.workType;
        const matchesLocation =
          !filters.location ||
          item.location.toLowerCase().includes(filters.location.toLowerCase());

        let matchesDeadline = true;
        if (filters.deadline !== "all") {
          const maxDays = Number(filters.deadline) || 30;
          const days = Math.ceil((new Date(item.deadline) - new Date()) / 86400000);
          matchesDeadline = days >= 0 && days <= maxDays;
        }

        return matchesSearch && matchesCategory && matchesWorkType && matchesLocation && matchesDeadline;
      })
      .map((item) => ({ ...item, deadlineDate: new Date(item.deadline) }));
  }, [filters, opportunities]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (filters.sortBy === "deadlineSoon") return a.deadlineDate - b.deadlineDate;
      if (filters.sortBy === "deadlineLatest") return b.deadlineDate - a.deadlineDate;
      return b.deadlineDate - a.deadlineDate;
    });
  }, [filtered, filters.sortBy]);

  const removeOpportunity = (id) => {
    const updated = deleteOpportunity(id);
    setOpportunities(updated);
  };

  const counts = useMemo(
    () => ({
      total: opportunities.length,
      jobs: opportunities.filter((item) => item.category === "Job").length,
      internships: opportunities.filter((item) => item.category === "Internship").length,
      scholarships: opportunities.filter((item) => item.category === "Scholarship").length,
    }),
    [opportunities]
  );

  return (
    <div className="space-y-12">
      <div className="relative rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700" />
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 p-8 sm:p-12">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
                <span className="text-sm font-medium text-blue-100">✨ {t("home.free")}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
                {t("home.heroTitle")}
              </h1>
              <p className="mt-4 text-lg text-blue-100 max-w-2xl">
                {t("home.heroSubtitle")}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
              {[
                { label: t("home.totalOpportunities"), value: counts.total, icon: "📋" },
                { label: t("opportunities.job"), value: counts.jobs, icon: "💼" },
                { label: t("opportunities.internship"), value: counts.internships, icon: "📈" },
                { label: t("home.scholarships"), value: counts.scholarships, icon: "🎓" },
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
        <SearchFilter filters={filters} onChange={setFilters} resultCount={sorted.length} />

        <div className="space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
            <div>
              <p className="text-slate-900 dark:text-white font-bold text-xl flex items-center gap-2">
                <span>📋</span> {t("filters.allOpportunities")}: {sorted.length} / {opportunities.length}
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                {sorted.length === 0 ? t("home.findGoals") : t("home.verifiedDesc")}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Next 14 days", "Next 30 days"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      deadline: option === "Next 14 days" ? "14" : "30",
                    }))
                  }
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    filters.deadline === (option === "Next 14 days" ? "14" : "30")
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {t(getDeadlineKey(option))}
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
              <div className="col-span-full">
                <EmptyState
                  icon="🔍"
                  tone="blue"
                  title={t("detail.notFound")}
                  description={t("home.findGoals")}
                  actionLabel={`✨ ${t("filters.clearFilters")}`}
                  onAction={() =>
                    setFilters({
                      search: "",
                      category: "All",
                      workType: "All",
                      location: "",
                      deadline: "all",
                      sortBy: "newest",
                    })
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function OpportunitiesLoading() {
  return (
    <div className="space-y-12">
      <div className="relative rounded-3xl overflow-hidden h-64 sm:h-80 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 animate-pulse" />
      <div className="grid gap-6 xl:grid-cols-[320px_1fr] items-start">
        <div className="h-[520px] rounded-3xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
        <div className="space-y-8">
          <div className="h-32 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-72 rounded-3xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OpportunitiesPage() {
  return (
    <Suspense fallback={<OpportunitiesLoading />}>
      <OpportunitiesContent />
    </Suspense>
  );
}
