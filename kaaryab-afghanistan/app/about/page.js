export default function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* TITLE */}
      <h1 className="text-4xl font-bold text-blue-600 text-center">
        About KaarYab Afghanistan
      </h1>

      {/* INTRO */}
      <p className="text-gray-600 text-lg text-center">
        KaarYab Afghanistan is a modern platform built to connect students,
        job seekers, and professionals with real opportunities.
      </p>

      {/* MISSION CARD */}
      <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
        <h2 className="text-xl font-bold mb-2">🎯 Our Mission</h2>
        <p className="text-gray-600">
          Our mission is to bridge the gap between talent and opportunity in Afghanistan
          by providing easy access to jobs, internships, and scholarships.
        </p>
      </div>

      {/* WHAT WE OFFER */}
      <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
        <h2 className="text-xl font-bold mb-3">💼 What We Offer</h2>

        <ul className="space-y-2 text-gray-600 list-disc pl-5">
          <li>Latest job opportunities</li>
          <li>Internship programs</li>
          <li>Scholarship updates</li>
          <li>Smart search & filtering system</li>
          <li>Saved favorites system</li>
        </ul>
      </div>

      {/* VISION */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-2">🚀 Our Vision</h2>
        <p>
          To become Afghanistan’s leading digital platform for career growth
          and educational opportunities.
        </p>
      </div>

    </div>
  );
}