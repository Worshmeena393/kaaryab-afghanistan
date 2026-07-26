"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { opportunities as sampleOpportunities } from "@/data/opportunities";
import OpportunityCard from "@/components/OpportunityCard";
import { useTranslation } from "@/lib/i18n";

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();
  const featuredOpportunities = sampleOpportunities.slice(0, 3);

  // Calculate stats
  const totalOpportunities = sampleOpportunities.length;
  const scholarshipCount = sampleOpportunities.filter(
    (o) => o.category === "Scholarship"
  ).length;

  const categories = [
    {
      key: "scholarships",
      icon: "🎓",
      count: scholarshipCount,
      color: "from-purple-500 to-indigo-600 dark:from-purple-400 dark:to-indigo-500",
      filter: "Scholarship",
    },
    {
      key: "remoteJobs",
      icon: "💻",
      count: sampleOpportunities.filter(
        (o) => o.category === "Job" || o.category === "Remote work"
      ).length,
      color: "from-blue-500 to-cyan-600 dark:from-blue-400 dark:to-cyan-500",
      filter: "Remote work",
    },
    {
      key: "internships",
      icon: "📈",
      count: sampleOpportunities.filter((o) => o.category === "Internship")
        .length,
      color: "from-green-500 to-emerald-600 dark:from-green-400 dark:to-emerald-500",
      filter: "Internship",
    },
    {
      key: "training",
      icon: "📚",
      count: sampleOpportunities.filter(
        (o) =>
          o.category === "Advanced Training" ||
          o.category === "Professional Development"
      ).length,
      color: "from-orange-500 to-red-600 dark:from-orange-400 dark:to-red-500",
      filter: "Advanced Training",
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/opportunities?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push("/opportunities");
    }
  };

  const handleCategoryClick = (filter) => {
    router.push(`/opportunities?category=${encodeURIComponent(filter)}`);
  };

  return (
    <div className="space-y-12 md:space-y-20">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-12 px-5 sm:px-6 sm:py-16 md:py-20 md:px-10 lg:py-24 lg:px-12">
        {/* Decorative Elements */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-6xl mx-auto text-center space-y-6 sm:space-y-10">
          {/* Header */}
          <div className="space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
              <span className="text-xs sm:text-sm font-semibold">✨ KaarYab Afghanistan</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              {t("home.heroTitle")}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
              {t("home.heroSubtitle")}
            </p>
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-2xl p-2 shadow-2xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
          >
            <div className="flex-1 flex items-center gap-3 px-3 sm:px-4 py-1">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("home.searchPlaceholder")}
                className="flex-1 py-2 sm:py-3 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder-slate-400 text-sm sm:text-base min-w-0"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold shadow-lg transition-all duration-300 hover:shadow-xl min-h-[44px]"
            >
              {t("home.searchButton")}
            </button>
          </form>

          {/* Statistics Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 max-w-3xl mx-auto">
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-center sm:justify-start gap-3 sm:gap-4">
              <div className="text-2xl sm:text-3xl flex-shrink-0">📋</div>
              <div className="text-left">
                <p className="text-2xl sm:text-3xl font-bold">{totalOpportunities}+</p>
                <p className="text-xs sm:text-sm text-blue-100">{t("home.totalOpportunities")}</p>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-center sm:justify-start gap-3 sm:gap-4">
              <div className="text-2xl sm:text-3xl flex-shrink-0">🎓</div>
              <div className="text-left">
                <p className="text-2xl sm:text-3xl font-bold">{scholarshipCount}+</p>
                <p className="text-xs sm:text-sm text-blue-100">{t("home.scholarships")}</p>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-center sm:justify-start gap-3 sm:gap-4 sm:col-span-3 md:col-span-1 md:mx-auto md:w-full">
              <div className="text-2xl sm:text-3xl flex-shrink-0">💎</div>
              <div className="text-left">
                <p className="text-2xl sm:text-3xl font-bold">100%</p>
                <p className="text-xs sm:text-sm text-blue-100">{t("home.free")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Quick Links Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 mb-8 sm:mb-10">
          <h2 className="font-bold text-xl sm:text-2xl md:text-3xl mb-1 text-blue-600 dark:text-blue-400">
            {t("home.exploreCategory")}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300">
            {t("home.findGoals")}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => handleCategoryClick(category.filter)}
              className="group text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 sm:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-[180px] w-full"
            >
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl sm:text-3xl mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                {category.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1">
                {t(`categories.${category.key}`)}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
              {category.count} {t("card.opportunitiesAvailable")}
            </p>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Opportunities Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <h2 className="font-bold text-xl sm:text-2xl md:text-3xl mb-1 text-blue-600 dark:text-blue-400">
              {t("home.featuredOpportunities")}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300">
              {t("home.exploreHandpicked")}
            </p>
          </div>
          <Link
            href="/opportunities"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-2 self-start sm:self-center text-sm sm:text-base"
          >
            {t("home.viewAll")}
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
        <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredOpportunities.map((item) => (
            <OpportunityCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Why KaarYab Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-6 sm:pb-10">
        <div className="text-center space-y-3 mb-8 sm:mb-12">
          <h2 className="font-bold text-xl sm:text-2xl md:text-3xl mb-1 text-blue-600 dark:text-blue-400">
            {t("home.whyKaarYab")}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300">
            {t("home.builtForPurpose")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
          <div className="text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 sm:p-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl mb-4 sm:mb-6">
              ✅
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {t("home.verifiedRoles")}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              {t("home.verifiedDesc")}
            </p>
          </div>
          <div className="text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 sm:p-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl mb-4 sm:mb-6">
              🌍
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {t("home.remoteFocus")}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              {t("home.remoteDesc")}
            </p>
          </div>
          <div className="text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 sm:p-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl mb-4 sm:mb-6">
              📚
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {t("home.freeResources")}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              {t("home.freeDesc")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
