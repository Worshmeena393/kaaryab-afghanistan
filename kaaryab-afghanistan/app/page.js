"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { opportunities as sampleOpportunities } from "@/data/opportunities";
import OpportunityCard from "@/components/OpportunityCard";

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const featuredOpportunities = sampleOpportunities.slice(0, 3);

  // Calculate stats
  const totalOpportunities = sampleOpportunities.length;
  const scholarshipCount = sampleOpportunities.filter(
    (o) => o.category === "Scholarship"
  ).length;

  const categories = [
    {
      name: "Scholarships",
      icon: "🎓",
      count: scholarshipCount,
      color: "from-purple-500 to-indigo-600",
      filter: "Scholarship",
    },
    {
      name: "Remote Jobs",
      icon: "💻",
      count: sampleOpportunities.filter(
        (o) => o.category === "Job" || o.category === "Remote work"
      ).length,
      color: "from-blue-500 to-cyan-600",
      filter: "Remote work",
    },
    {
      name: "Internships",
      icon: "📈",
      count: sampleOpportunities.filter((o) => o.category === "Internship")
        .length,
      color: "from-green-500 to-emerald-600",
      filter: "Internship",
    },
    {
      name: "Training",
      icon: "📚",
      count: sampleOpportunities.filter(
        (o) =>
          o.category === "Advanced Training" ||
          o.category === "Professional Development"
      ).length,
      color: "from-orange-500 to-red-600",
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
    <div className="space-y-20">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-16 px-6 md:py-24 md:px-12">
        {/* Decorative Elements */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-6xl mx-auto text-center space-y-10">
          {/* Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
              <span className="text-sm font-semibold">✨ KaarYab Afghanistan</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Discover opportunities for <span className="text-blue-200">Afghan youth</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
              KaarYab Afghanistan helps students, graduates, and young professionals find remote work, internships, scholarships, and skill-building programs in one place.
            </p>
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-2xl p-2 shadow-2xl flex items-center gap-2"
          >
            <div className="flex-1 flex items-center gap-3 px-4">
              <svg
                className="w-6 h-6 text-slate-400"
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
                placeholder="Search opportunities, scholarships, jobs..."
                className="flex-1 py-3 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder-slate-400 text-base"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              Search
            </button>
          </form>

          {/* Statistics Badges */}
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-6 py-4 flex items-center gap-4">
              <div className="text-3xl">📋</div>
              <div className="text-left">
                <p className="text-3xl font-bold">{totalOpportunities}+</p>
                <p className="text-sm text-blue-100">Opportunities</p>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-6 py-4 flex items-center gap-4">
              <div className="text-3xl">🎓</div>
              <div className="text-left">
                <p className="text-3xl font-bold">{scholarshipCount}+</p>
                <p className="text-sm text-blue-100">Scholarships</p>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-6 py-4 flex items-center gap-4">
              <div className="text-3xl">💎</div>
              <div className="text-left">
                <p className="text-3xl font-bold">100%</p>
                <p className="text-sm text-blue-100">Free</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Quick Links Section */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="text-center space-y-3 mb-10">
          <h2 className="font-bold text-2xl md:text-3xl mb-1 text-slate-900 dark:!text-yellow-400">
            Explore by Category
          </h2>
          <p className="text-sm md:text-base text-slate-600 dark:!text-yellow-200">
            Find opportunities tailored to your goals
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category.filter)}
              className="group text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                {category.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {category.name}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                {category.count} opportunities available
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Opportunities Section */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="font-bold text-2xl md:text-3xl mb-1 text-slate-900 dark:!text-yellow-400">
              Featured Opportunities
            </h2>
            <p className="text-sm md:text-base text-slate-600 dark:!text-yellow-200">
              Explore handpicked roles and programs for you
            </p>
          </div>
          <Link
            href="/opportunities"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-2"
          >
            View All Opportunities
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredOpportunities.map((item) => (
            <OpportunityCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Why KaarYab Section */}
      <section className="max-w-6xl mx-auto px-6 pb-10">
        <div className="text-center space-y-3 mb-12">
          <h2 className="font-bold text-2xl md:text-3xl mb-1 text-slate-900 dark:!text-yellow-400">
            Why KaarYab?
          </h2>
          <p className="text-sm md:text-base text-slate-600 dark:!text-yellow-200">
            Built with purpose for the future of Afghanistan
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-8">
            <div className="w-20 h-20 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-4xl mb-6">
              ✅
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Verified Roles
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              All opportunities are carefully reviewed and verified for authenticity and quality.
            </p>
          </div>
          <div className="text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-8">
            <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-4xl mb-6">
              🌍
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Remote Focus
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Prioritizing remote and flexible opportunities so you can work and learn from anywhere.
            </p>
          </div>
          <div className="text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-8">
            <div className="w-20 h-20 mx-auto bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-4xl mb-6">
              📚
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Free Resources
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Everything on KaarYab is completely free — no hidden fees, no premium subscriptions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
