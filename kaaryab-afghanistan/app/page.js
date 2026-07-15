import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-14">
      <section className="rounded-[2rem] bg-blue-50 dark:bg-slate-900/80 border border-blue-100 dark:border-slate-700 p-10 md:p-16 shadow-sm">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600 dark:text-sky-400">
            KaarYab Afghanistan
          </p>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-slate-50">
            Discover opportunities for Afghan youth
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-slate-600 dark:text-slate-300">
            KaarYab Afghanistan helps students, graduates, and young professionals find remote work, internships, scholarships, and skill-building programs in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/opportunities" className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3 text-white shadow-lg shadow-blue-600/10 hover:bg-blue-700 transition">
              Browse Opportunities
            </Link>
            <Link href="/add-opportunity" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-3 text-slate-900 hover:bg-slate-100 transition dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900">
              Add Opportunity
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          { title: "Jobs", description: "Browse trusted full-time and part-time roles.", icon: "💼" },
          { title: "Scholarships", description: "Find funding and learning support programs.", icon: "🎓" },
          { title: "Internships", description: "Gain experience through real-world training.", icon: "📈" },
        ].map((feature) => (
          <div key={feature.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
            <div className="text-4xl">{feature.icon}</div>
            <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-slate-100">{feature.title}</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">{feature.description}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[1.5rem] border border-slate-200 bg-white p-10 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="md:flex md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Ready to build your future?</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-2xl">
              Save favorites, submit new opportunities, and explore curated openings for Afghanistan and online work.
            </p>
          </div>
          <Link href="/opportunities" className="mt-6 inline-flex items-center justify-center rounded-full bg-green-600 px-8 py-3 text-white hover:bg-green-700 transition md:mt-0">
            Start exploring
          </Link>
        </div>
      </section>
    </div>
  );
}
