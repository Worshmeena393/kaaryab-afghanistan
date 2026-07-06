export default function Home() {
  return (
    <div className="space-y-12">

      {/* HERO SECTION */}
      <div className="text-center py-16 bg-blue-50 rounded-xl">

        <h1 className="text-5xl font-bold text-blue-600 mb-4">
          KaarYab Afghanistan 🚀
        </h1>

        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          A modern platform to find jobs, internships, and scholarships
          and build your future in Afghanistan.
        </p>

        <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg">
          Explore Opportunities
        </button>

      </div>

      {/* FEATURES */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-bold mb-2">💼 Jobs</h2>
          <p>Find latest job opportunities from trusted companies.</p>
        </div>

        <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-bold mb-2">🎓 Scholarships</h2>
          <p>Get access to local and international scholarships.</p>
        </div>

        <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-bold mb-2">📈 Internships</h2>
          <p>Start your career with real-world experience.</p>
        </div>

      </div>

      {/* CALL TO ACTION */}
      <div className="text-center bg-gray-100 p-10 rounded-xl">

        <h2 className="text-2xl font-bold mb-2">
          Ready to start your journey?
        </h2>

        <p className="text-gray-600 mb-4">
          Join thousands of students and job seekers.
        </p>

        <a
          href="/opportunities"
          className="bg-green-600 text-white px-6 py-3 rounded-lg inline-block"
        >
          Browse Opportunities
        </a>

      </div>

    </div>
  );
}