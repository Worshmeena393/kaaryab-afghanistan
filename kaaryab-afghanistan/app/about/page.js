import Link from "next/link";
import Hero from "@/components/Hero";

export default function About() {
  return (
    <div className="space-y-12">
      <Hero
        eyebrow="About KaarYab Afghanistan"
        title="Bridging Afghan talent to meaningful opportunities."
        description="KaarYab Afghanistan is a community-focused platform for students, young professionals, and learners who want access to jobs, internships, scholarships, and remote work opportunities."
        primaryLabel="Explore Opportunities"
        secondaryLabel="Share an Opportunity"
        className="bg-blue-600/10 dark:bg-slate-900/70 border border-blue-200 dark:border-slate-700"
      />

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <div className="rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 text-white p-10 shadow-xl flex-1 flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                <span className="text-3xl">🚀</span>
              </div>
              <h2 className="text-3xl font-bold">Our Mission</h2>
            </div>
            <p className="mt-4 text-blue-100 leading-relaxed text-lg">
              We empower Afghan youth by curating high-quality opportunities, simplifying discovery, and helping people save important roles for a stronger career journey.
            </p>
          </div>

          <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 shadow-lg flex-1 flex flex-col">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">What We Offer</h2>
            <div className="space-y-4 flex-1">
              {[
                { icon: "💼", title: "Curated Jobs & Internships", desc: "Across Afghanistan and remote-friendly roles" },
                { icon: "🎓", title: "Scholarship Alerts", desc: "Financial support and online certificates" },
                { icon: "⭐", title: "Saved Favorites", desc: "Easy access to opportunities you care about" },
                { icon: "🔍", title: "Smart Search", desc: "Filters and deadline tracking to stay ahead" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                    <p className="mt-1 text-slate-600 dark:text-slate-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 text-white p-10 shadow-xl flex-1 flex flex-col">
            <h2 className="text-2xl font-bold mb-6">Our Values</h2>
            <div className="space-y-5 flex-1">
              {[
                { icon: "🛡️", title: "Trust", desc: "We present opportunities clearly so users can feel confident about their next step." },
                { icon: "🌐", title: "Access", desc: "We make opportunity discovery easy, fast, and available to everyone in our community." },
                { icon: "📈", title: "Growth", desc: "We support personal and professional growth through real openings and learning pathways." },
                { icon: "💡", title: "Innovation", desc: "We continuously improve our platform to better serve Afghan youth." },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white/10 backdrop-blur">
                    <span className="text-xl">{item.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="mt-2 text-slate-300 leading-relaxed text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 shadow-lg flex-1 flex flex-col">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Our Impact</h2>
            <div className="grid grid-cols-2 gap-4 flex-1 content-center">
              {[
                { value: "500+", label: "Opportunities Listed" },
                { value: "1000+", label: "Community Members" },
                { value: "50+", label: "Partner Organizations" },
                { value: "24/7", label: "Platform Access" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
