"use client";

import { useEffect, useState } from "react";
import { opportunities } from "@/data/opportunities";

export default function Dashboard() {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    // ❤️ FAVORITES ONLY (NO LOGIN)
    try {
      const data = JSON.parse(localStorage.getItem("favorites") || "[]");
      setSaved(data);
    } catch (e) {
      setSaved([]);
    }
  }, []);

  const total = opportunities.length;

  const jobs = opportunities.filter((i) => i.category === "Job").length;
  const internships = opportunities.filter(
    (i) => i.category === "Internship"
  ).length;
  const scholarships = opportunities.filter(
    (i) => i.category === "Scholarship"
  ).length;

  return (
    <div className="max-w-5xl mx-auto">

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
        Dashboard 📊
      </h1>

      {/* CARDS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="p-6 rounded-xl shadow bg-white hover:shadow-lg transition">
          <h2 className="text-gray-600">Total Opportunities</h2>
          <p className="text-3xl font-bold text-blue-600">{total}</p>
        </div>

        <div className="p-6 rounded-xl shadow bg-white hover:shadow-lg transition">
          <h2 className="text-gray-600">Jobs</h2>
          <p className="text-3xl font-bold text-green-600">{jobs}</p>
        </div>

        <div className="p-6 rounded-xl shadow bg-white hover:shadow-lg transition">
          <h2 className="text-gray-600">Internships</h2>
          <p className="text-3xl font-bold text-purple-600">{internships}</p>
        </div>

        <div className="p-6 rounded-xl shadow bg-white hover:shadow-lg transition">
          <h2 className="text-gray-600">Scholarships</h2>
          <p className="text-3xl font-bold text-yellow-600">{scholarships}</p>
        </div>

        <div className="p-6 rounded-xl shadow bg-white hover:shadow-lg transition">
          <h2 className="text-gray-600">Saved ❤️</h2>
          <p className="text-3xl font-bold text-red-600">{saved.length}</p>
        </div>

      </div>

    </div>
  );
}