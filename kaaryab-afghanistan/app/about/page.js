import Link from "next/link";
import Hero from "@/components/Hero";

export default function About() {
  return (
    <div className="space-y-16">
      <Hero
        eyebrow="About KaarYab Afghanistan"
        title="Bridging Afghan talent to meaningful opportunities."
        description="KaarYab Afghanistan is a community-focused platform for students, young professionals, and learners who want access to jobs, internships, scholarships, and remote work opportunities."
        primaryLabel="Explore Opportunities"
        secondaryLabel="Share an Opportunity"
        className="bg-gradient-to-br from-slate-50 to-blue-50 dark:bg-slate-900 border border-blue-100 dark:border-slate-700"
      />

      <section className="rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-12 shadow-2xl">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                <span className="text-3xl">🚀</span>
              </div>
              <h2 className="text-3xl font-bold">Our Mission</h2>
            </div>
            <p className="text-blue-100 leading-relaxed text-xl">
              We empower Afghan youth by curating high-quality opportunities, simplifying discovery, and helping people save important roles for a stronger career journey.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { number: "500+", label: "Opportunities" },
              { number: "1000+", label: "Members" },
              { number: "50+", label: "Partners" },
              { number: "24/7", label: "Support" },
            ].map((stat, idx) => (
              <div key={idx} className="rounded-2xl bg-white/10 backdrop-blur p-6 text-center">
                <p className="text-4xl font-extrabold">{stat.number}</p>
                <p className="text-blue-100 font-semibold mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-3">
        {[
          {
            icon: "💼",
            title: "Curated Opportunities",
            desc: "Jobs, internships, and scholarships tailored for Afghan youth across Afghanistan and remote-friendly roles.",
          },
          {
            icon: "🎓",
            title: "Education & Skills",
            desc: "Scholarships, online courses, and training programs to help you grow and achieve your career goals.",
          },
          {
            icon: "⭐",
            title: "Save & Organize",
            desc: "Easily bookmark and track your favorite opportunities, so you never miss an important deadline.",
          },
        ].map((item, idx) => (
          <div key={idx} className="rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-8 shadow-lg hover:-translate-y-2 transition">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 text-blue-600 dark:text-blue-400 mb-6">
              <span className="text-3xl">{item.icon}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[2rem] bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-12 shadow-lg">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-10 text-center">Our Core Values</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: "🛡️", title: "Trust", desc: "We present opportunities clearly so users can feel confident about their next step." },
            { icon: "🌐", title: "Access", desc: "We make opportunity discovery easy, fast, and available to everyone in our community." },
            { icon: "📈", title: "Growth", desc: "We support personal and professional growth through real openings and learning pathways." },
            { icon: "💡", title: "Innovation", desc: "We continuously improve our platform to better serve Afghan youth." },
          ].map((item, idx) => (
            <div key={idx} className="rounded-2xl bg-white dark:bg-slate-800 p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
                <span className="text-2xl">{item.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
