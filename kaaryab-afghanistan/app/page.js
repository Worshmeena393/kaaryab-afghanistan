import Link from "next/link";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="space-y-14">
      <Hero
        eyebrow="KaarYab Afghanistan"
        title="Discover opportunities for Afghan youth"
        description="KaarYab Afghanistan helps students, graduates, and young professionals find remote work, internships, scholarships, and skill-building programs in one place."
        className="bg-blue-50 dark:bg-slate-900/80 border border-blue-100 dark:border-slate-700"
      />

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-700 p-10 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold">Find Your Path</h3>
          </div>
          <p className="text-blue-100 leading-relaxed">Discover curated opportunities tailored for Afghan youth. From remote jobs to scholarships, we connect you with roles that match your skills and aspirations.</p>
          <Link href="/opportunities" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 font-medium backdrop-blur transition hover:bg-white/30">
            Browse Opportunities
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>

        <div className="rounded-[2rem] bg-gradient-to-br from-emerald-500 to-teal-600 p-10 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur">
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="text-xl font-semibold">Share Opportunities</h3>
          </div>
          <p className="text-emerald-100 leading-relaxed">Know about a job, internship, or scholarship? Help our community grow by sharing opportunities and supporting fellow Afghans in their career journey.</p>
          <Link href="/add-opportunity" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 font-medium backdrop-blur transition hover:bg-white/30">
            Submit Opportunity
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          </Link>
        </div>
      </section>

    </div>
  );
}
