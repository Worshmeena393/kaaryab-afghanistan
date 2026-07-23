"use client";

import Link from "next/link";
import Hero from "@/components/Hero";
import { opportunities as sampleOpportunities } from "@/data/opportunities";
import OpportunityCard from "@/components/OpportunityCard";

export default function Home() {
  const opportunities = sampleOpportunities.slice(0, 3);

  return (
    <div className="space-y-16">
      <Hero
        eyebrow="KaarYab Afghanistan"
        title="Discover opportunities for Afghan youth"
        description="KaarYab Afghanistan helps students, graduates, and young professionals find remote work, internships, scholarships, and skill-building programs in one place."
        className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:bg-slate-900 border border-blue-100 dark:border-slate-700"
      />

      <section className="space-y-10 rounded-[2rem] bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-8 md:p-10 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Featured Opportunities</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Explore handpicked roles and programs for you</p>
          </div>
          <Link href="/opportunities" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-2">
            View All Opportunities
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {opportunities.map((item) => (
            <OpportunityCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
