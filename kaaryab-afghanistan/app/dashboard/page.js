"use client";

import { useEffect, useState } from "react";
import { opportunities } from "@/data/opportunities";

export default function Dashboard() {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("favorites") || "[]");
      setSaved(data);
    } catch (e) {
      setSaved([]);
    }
  }, []);

  const total = opportunities.length;

  const jobs = opportunities.filter((i) => i.category === "Job").length;
  const internships = opportunities.filter((i) => i.category === "Internship").length;
  const scholarships = opportunities.filter((i) => i.category === "Scholarship").length;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard 📊</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

        <div className="p-4 border rounded">
          <h2>Total Opportunities</h2>
          <p className="text-2xl text-blue-600">{total}</p>
        </div>

        <div className="p-4 border rounded">
          <h2>Jobs</h2>
          <p className="text-2xl text-green-600">{jobs}</p>
        </div>

        <div className="p-4 border rounded">
          <h2>Internships</h2>
          <p className="text-2xl text-purple-600">{internships}</p>
        </div>

        <div className="p-4 border rounded">
          <h2>Scholarships</h2>
          <p className="text-2xl text-yellow-600">{scholarships}</p>
        </div>

        <div className="p-4 border rounded">
          <h2>Saved ❤️</h2>
          <p className="text-2xl text-red-600">{saved.length}</p>
        </div>

      </div>
    </div>
  );
}