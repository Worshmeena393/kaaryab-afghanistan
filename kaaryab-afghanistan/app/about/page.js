import Link from "next/link";

export default function About() {
  return (
    <div className="space-y-12">
      <section className="rounded-[2rem] bg-blue-600/10 dark:bg-slate-900/70 border border-blue-200 dark:border-slate-700 p-10 shadow-sm">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.24em] font-semibold text-blue-700 dark:text-sky-300">About KaarYab Afghanistan</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">Bridging Afghan talent to meaningful opportunities.</h1>
          <p className="mt-6 text-slate-600 dark:text-slate-300 text-lg leading-8">
            KaarYab Afghanistan is a community-focused platform for students, young professionals, and learners who want access to jobs, internships, scholarships, and remote work opportunities.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/opportunities" className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition">
              Explore Opportunities
            </Link>
            <Link href="/add-opportunity" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-slate-900 hover:bg-slate-100 transition dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900">
              Share an Opportunity
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.9fr]">
        <div className="space-y-6">
          <div className="rounded-[1.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Our mission</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300 leading-7">
              We empower Afghan youth by curating high-quality opportunities, simplifying discovery, and helping people save important roles for a stronger career journey.
            </p>
          </div>

          <div className="rounded-[1.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">What we offer</h2>
            <ul className="mt-5 space-y-3 text-slate-600 dark:text-slate-300 list-disc pl-5 leading-7">
              <li>Curated job and internship listings across Afghanistan and remote-friendly roles.</li>
              <li>Scholarship alerts for students seeking financial support and online certificates.</li>
              <li>Saved favorites and easy access to the opportunities you care about.</li>
              <li>Simple search, filters, and deadline tracking to stay ahead.</li>
            </ul>
          </div>
        </div>

        <div className="rounded-[1.5rem] bg-gradient-to-br from-sky-500 to-blue-700 text-white p-8 shadow-lg">
          <h2 className="text-2xl font-bold">Our values</h2>
          <div className="mt-6 space-y-4">
            <div>
              <h3 className="font-semibold text-lg">Trust</h3>
              <p className="mt-2 text-slate-100/90">We present opportunities clearly so users can feel confident about their next step.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Access</h3>
              <p className="mt-2 text-slate-100/90">We make opportunity discovery easy, fast, and available to everyone in our community.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Growth</h3>
              <p className="mt-2 text-slate-100/90">We support personal and professional growth through real openings and learning pathways.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          { title: "Opportunity types", value: "Jobs, internships, scholarships", accent: "bg-blue-600/10 text-blue-700 dark:bg-blue-500/15" },
          { title: "Easy discovery", value: "Search filters + saved favorites", accent: "bg-emerald-600/10 text-emerald-700 dark:bg-emerald-500/15" },
          { title: "Remote-ready", value: "Remote and online roles", accent: "bg-slate-600/10 text-slate-700 dark:bg-slate-500/15" },
        ].map((card) => (
          <div key={card.title} className="rounded-[1.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <p className={`text-sm font-semibold uppercase tracking-[0.24em] ${card.accent}`}>{card.title}</p>
            <p className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">{card.value}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
